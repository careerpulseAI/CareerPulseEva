/* ═══ CareerPulse · Webhook Stripe ═══
   Stripe prévient ce fichier à chaque paiement, essai, échec ou résiliation.
   Il met à jour le champ « abo » du compte Pro dans Firebase :
     employeurs/{uid}.abo  ou  organismes/{uid}.abo   →  { statut, fin, plan }
   statut : 'essai' (essai gratuit), 'actif' (payé), 'expire' (impayé ou résilié)

   Variables à créer dans Vercel (Settings → Environment Variables) :
     STRIPE_SECRET_KEY        → clé secrète Stripe  (sk_live_…)
     STRIPE_WEBHOOK_SECRET    → clé du webhook       (whsec_…)
     FIREBASE_SERVICE_ACCOUNT → contenu complet du fichier .json du compte de service Firebase
   Aucune clé n'est écrite dans ce fichier. */

const Stripe = require('stripe');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

let _stripe = null, _db = null;
function stripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return _stripe;
}
function db() {
  if (!_db) {
    if (!getApps().length) initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
    _db = getFirestore();
  }
  return _db;
}

/* Montants en centimes → espace Pro */
const ESPACE = { 5000: 'employeurs', 50000: 'employeurs', 1500: 'organismes', 15000: 'organismes' };

function lireCorps(req) {
  return new Promise((ok, ko) => {
    const morceaux = [];
    req.on('data', (c) => morceaux.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on('end', () => ok(Buffer.concat(morceaux)));
    req.on('error', ko);
  });
}

function iso(sec) { return sec ? new Date(sec * 1000).toISOString() : null; }

/* Abonnement Stripe → champ abo de CareerPulse */
function versAbo(sub) {
  const item = (sub.items && sub.items.data && sub.items.data[0]) || {};
  const price = item.price || {};
  const plan = price.recurring && price.recurring.interval === 'year' ? 'an' : 'mois';
  const finPeriode = item.current_period_end || sub.current_period_end;
  let statut;
  if (sub.status === 'trialing') statut = 'essai';
  else if (sub.status === 'active') statut = 'actif';
  else if (sub.status === 'incomplete') return null; /* paiement en cours : on attend */
  else statut = 'expire'; /* past_due, unpaid, canceled, incomplete_expired, paused */
  const fin = statut === 'essai' ? iso(sub.trial_end) : statut === 'actif' ? iso(finPeriode) : iso(sub.ended_at || finPeriode);
  return {
    abo: { statut, fin, plan, resiliation: !!(sub.cancel_at_period_end || sub.cancel_at), stripeStatut: sub.status },
    col: ESPACE[price.unit_amount] || null
  };
}

/* Retrouve le compte : d'abord par le lien client Stripe, sinon par l'uid transmis au paiement */
async function compte(customerId, uid, colPrevu) {
  const base = db();
  if (customerId) {
    const lien = await base.collection('stripe_clients').doc(customerId).get();
    if (lien.exists) return lien.data();
  }
  if (!uid) return null;
  const ordre = colPrevu === 'organismes' ? ['organismes', 'employeurs'] : ['employeurs', 'organismes'];
  for (const col of ordre) {
    const d = await base.collection(col).doc(uid).get();
    if (d.exists) return { uid, col };
  }
  return null;
}

async function synchroniser(subId, uid) {
  const sub = typeof subId === 'string' ? await stripe().subscriptions.retrieve(subId) : subId;
  const r = versAbo(sub);
  if (!r) return 'ignoré (paiement en cours)';
  const c = await compte(sub.customer, uid, r.col);
  if (!c) return 'compte introuvable';
  const base = db();
  await base.collection(c.col).doc(c.uid).set({
    abo: r.abo,
    stripe: { client: sub.customer, abonnement: sub.id },
    aboMaj: FieldValue.serverTimestamp()
  }, { merge: true });
  await base.collection('stripe_clients').doc(sub.customer).set({ uid: c.uid, col: c.col }, { merge: true });
  return c.col + '/' + c.uid + ' → ' + r.abo.statut;
}

async function traiter(event) {
  const o = event.data.object;
  switch (event.type) {
    case 'checkout.session.completed':
      if (o.mode !== 'subscription' || !o.subscription) return 'ignoré';
      return synchroniser(o.subscription, o.client_reference_id || null);
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      return synchroniser(o, null);
    case 'invoice.paid':
    case 'invoice.payment_failed': {
      const subId = o.subscription || (o.parent && o.parent.subscription_details && o.parent.subscription_details.subscription);
      return subId ? synchroniser(subId, null) : 'ignoré';
    }
    default:
      return 'ignoré';
  }
}

async function handler(req, res) {
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('Méthode non autorisée'); }
  let event;
  try {
    const corps = await lireCorps(req);
    event = stripe().webhooks.constructEvent(corps, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    res.statusCode = 400; return res.end('Signature invalide');
  }
  try {
    const r = await traiter(event);
    console.log('[stripe]', event.type, r);
    res.statusCode = 200; res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ recu: true }));
  } catch (e) {
    console.error('[stripe] erreur', event.type, e && e.message);
    res.statusCode = 500; return res.end('Erreur');
  }
}

module.exports = handler;
module.exports.config = { api: { bodyParser: false } };
module.exports._test = { versAbo, traiter, set: (s, d) => { _stripe = s; _db = d; } };
