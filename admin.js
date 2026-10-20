/* ═══ CareerPulse · Tableau de bord administrateur (serveur) ═══
   Réservé à un seul compte : celui dont l'identifiant (UID) est dans la variable Vercel ADMIN_UID.
   Utilise la même clé que le webhook : FIREBASE_SERVICE_ACCOUNT. */

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

let _db = null, _auth = null;
function init() {
  if (!_db) {
    if (!getApps().length) initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
    _db = getFirestore(); _auth = getAuth();
  }
}

const PRIX = { employeurs: { mois: 50, an: 500 }, organismes: { mois: 15, an: 150 } };
const JOUR = 864e5;

function envoyer(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

function lireJson(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return Promise.resolve(req.body);
  return new Promise((ok) => {
    const m = []; req.on('data', (c) => m.push(Buffer.from(c)));
    req.on('end', () => { try { ok(JSON.parse(Buffer.concat(m).toString() || '{}')); } catch (e) { ok({}); } });
    req.on('error', () => ok({}));
  });
}

function jourParis(d) {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

async function tousLesComptes() {
  const liste = []; let page;
  do {
    const r = await _auth.listUsers(1000, page);
    r.users.forEach((u) => liste.push(u));
    page = r.pageToken;
  } while (page);
  return liste;
}

async function donnees() {
  const [orgs, emps, sat, comptes] = await Promise.all([
    _db.collection('organismes').get(),
    _db.collection('employeurs').get(),
    _db.collection('satisfaction').get(),
    tousLesComptes()
  ]);

  /* Espaces Pro */
  const pros = [], uidsPro = new Set();
  let revenu = 0;
  const lire = (snap, col) => snap.forEach((d) => {
    const o = d.data() || {}, a = o.abo || {};
    uidsPro.add(d.id);
    let statutAbo = a.statut || (o.proActif ? 'offert' : 'aucun');
    if (statutAbo === 'essai' && a.fin && new Date(a.fin).getTime() <= Date.now()) statutAbo = 'expire';
    if (statutAbo === 'actif') revenu += a.plan === 'an' ? PRIX[col].an / 12 : PRIX[col].mois;
    pros.push({
      col, uid: d.id, type: col === 'organismes' ? 'Centre' : 'Employeur',
      nom: o.nom || '', siret: o.siret || '', nda: o.nda || '', ville: o.ville || '', email: o.email || '',
      tel: o.tel || '', secteur: o.secteur || '', contact: o.contactNom || '', site: o.site || '',
      verifie: !!o.verifie, statutDemande: o.statutDemande || '', demandeAt: o.demandeAt || '',
      abo: { statut: statutAbo, plan: a.plan || '', fin: a.fin || '', resiliation: !!a.resiliation }
    });
  });
  lire(orgs, 'organismes'); lire(emps, 'employeurs');

  /* Membres = tous les comptes, sauf les espaces Pro */
  const semaine = Date.now() - 7 * JOUR, mois = Date.now() - 30 * JOUR;
  let membres = 0, nouveaux7 = 0, nouveaux30 = 0, verifies = 0, actifs7 = 0;
  const derniers = [];
  comptes.forEach((u) => {
    if (uidsPro.has(u.uid)) return;
    membres++;
    const cree = new Date(u.metadata.creationTime).getTime();
    const vu = u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).getTime() : 0;
    if (cree >= semaine) nouveaux7++;
    if (cree >= mois) nouveaux30++;
    if (u.emailVerified) verifies++;
    if (vu >= semaine) actifs7++;
    derniers.push({ nom: u.displayName || '', email: u.email || '', cree: u.metadata.creationTime });
  });
  derniers.sort((a, b) => new Date(b.cree) - new Date(a.cree));

  /* Avis */
  const avis = {};
  sat.forEach((d) => {
    const o = d.data() || {}, k = o.cible || 'autre';
    if (!avis[k]) avis[k] = { n: 0, note: 0, qualite: 0, efficacite: 0, utilite: 0 };
    const a = avis[k]; a.n++;
    ['note', 'qualite', 'efficacite', 'utilite'].forEach((c) => { a[c] += Number(o[c]) || 0; });
  });
  Object.keys(avis).forEach((k) => { const a = avis[k]; ['note', 'qualite', 'efficacite', 'utilite'].forEach((c) => { a[c] = a.n ? Math.round((a[c] / a.n) * 10) / 10 : 0; }); });

  /* Visiteurs (30 derniers jours) */
  const jours = [];
  for (let i = 29; i >= 0; i--) jours.push(jourParis(new Date(Date.now() - i * JOUR)));
  const refs = jours.map((j) => _db.collection('stats_visites').doc(j));
  const docs = await _db.getAll(...refs);
  const visites = jours.map((j, i) => ({ jour: j, n: (docs[i].exists && Number(docs[i].data().n)) || 0 }));

  return {
    maj: new Date().toISOString(),
    pros, revenuMensuel: Math.round(revenu * 100) / 100,
    membres: { total: membres, nouveaux7, nouveaux30, verifies, actifs7, derniers: derniers.slice(0, 8) },
    avis, visites
  };
}

async function handler(req, res) {
  try {
    init();
    const jeton = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!jeton) return envoyer(res, 401, { erreur: 'Connexion requise' });
    let moi;
    try { moi = await _auth.verifyIdToken(jeton); } catch (e) { return envoyer(res, 401, { erreur: 'Session expirée, reconnecte-toi' }); }
    const admin = String(process.env.ADMIN_UID || '').trim();
    if (!admin) return envoyer(res, 403, { erreur: 'ADMIN_UID manquant', uid: moi.uid });
    if (moi.uid !== admin) return envoyer(res, 403, { erreur: 'Accès refusé' });

    if (req.method === 'GET') return envoyer(res, 200, await donnees());

    if (req.method === 'POST') {
      const b = await lireJson(req);
      if (!['organismes', 'employeurs'].includes(b.col) || !b.uid || typeof b.uid !== 'string') return envoyer(res, 400, { erreur: 'Demande invalide' });
      const ref = _db.collection(b.col).doc(b.uid), doc = await ref.get();
      if (!doc.exists) return envoyer(res, 404, { erreur: 'Compte introuvable' });
      const maintenant = new Date().toISOString();
      if (b.action === 'valider') await ref.set({ verifie: true, proActif: true, statutDemande: 'validee', valideAt: maintenant }, { merge: true });
      else if (b.action === 'refuser') await ref.set({ verifie: false, proActif: false, statutDemande: 'refusee', refuseAt: maintenant }, { merge: true });
      else return envoyer(res, 400, { erreur: 'Action inconnue' });
      return envoyer(res, 200, { ok: true });
    }
    return envoyer(res, 405, { erreur: 'Méthode non autorisée' });
  } catch (e) {
    console.error('[admin]', e && e.message);
    return envoyer(res, 500, { erreur: 'Erreur serveur' });
  }
}

module.exports = handler;
module.exports._test = { set: (db, auth) => { _db = db; _auth = auth; } };
