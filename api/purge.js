/* ═══ CareerPulse · Nettoyage automatique de nuit (Vercel Cron) ═══
   Supprime les documents dont le champ « expireAt » est dépassé (politique de confidentialité) :
   - conversations (centres)        : 6 mois après le dernier message
   - emploi_conversations (emploi)  : 2 ans après le dernier message, pièces jointes comprises
   - avis_freelance                 : 2 ans après publication
   - users / profils                : 3 ans sans connexion → données du membre + compte de connexion
     (jamais un compte employeur ou centre, jamais le compte administrateur)
   Utilise la même clé que admin.js et le webhook : FIREBASE_SERVICE_ACCOUNT.
   Protégé par CRON_SECRET (Vercel l'envoie tout seul lors de l'exécution programmée).
   Test sans rien supprimer : /api/purge?dry=1 */

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

let _db = null, _auth = null;
function init() {
  if (!_db) {
    if (!getApps().length) initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
    _db = getFirestore(); _auth = getAuth();
  }
}

const SIMPLES = ['conversations', 'emploi_conversations', 'avis_freelance'];
const PAR_PASSAGE = 300;

function envoyer(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
function query(req) { try { return Object.fromEntries(new URL(req.url, 'http://x').searchParams); } catch (e) { return {}; } }

async function expires(col) {
  return (await _db.collection(col).where('expireAt', '<', Timestamp.now()).limit(PAR_PASSAGE).get()).docs;
}
async function estPro(uid) {
  for (const col of ['organismes', 'employeurs']) { if ((await _db.collection(col).doc(uid).get()).exists) return true; }
  return false;
}

async function handler(req, res) {
  const secret = String(process.env.CRON_SECRET || '');
  if (!secret || String(req.headers.authorization || '') !== 'Bearer ' + secret) return envoyer(res, 401, { erreur: 'Non autorisé' });
  const dry = query(req).dry === '1';
  const rapport = { ok: true, test: dry, at: new Date().toISOString(), supprimes: {}, comptesFermes: 0, erreurs: [] };
  try {
    init();
    /* Conversations et avis : le document et ses sous-collections (pièces jointes) */
    for (const col of SIMPLES) {
      try {
        const docs = await expires(col);
        if (!dry) for (const d of docs) await _db.recursiveDelete(d.ref);
        rapport.supprimes[col] = docs.length;
      } catch (e) { rapport.erreurs.push(col + ' : ' + (e && e.message)); }
    }
    /* Comptes membres inactifs depuis 3 ans */
    const admin = String(process.env.ADMIN_UID || '').trim();
    const uids = new Set();
    for (const col of ['users', 'profils']) {
      try { (await expires(col)).forEach((d) => uids.add(d.id)); }
      catch (e) { rapport.erreurs.push(col + ' : ' + (e && e.message)); }
    }
    let n = 0;
    for (const uid of uids) {
      try {
        if (uid === admin || await estPro(uid)) continue;
        /* Sécurité : on vérifie la dernière connexion réelle avant de fermer le compte */
        let u = null; try { u = await _auth.getUser(uid); } catch (e) {}
        const vu = u && u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).getTime() : 0;
        if (vu && Date.now() - vu < 1095 * 864e5) continue;
        if (!dry) {
          for (const p of ['users', 'profils', 'fiches_freelance', 'fiches_candidat', 'candidats_of']) {
            try { await _db.recursiveDelete(_db.collection(p).doc(uid)); } catch (e) {}
          }
          if (u) { try { await _auth.deleteUser(uid); } catch (e) {} }
          await _db.collection('journal_moderation').add({ admin: 'nettoyage-automatique', action: 'supprimer_inactif', cible: uid, motif: '3 ans sans connexion (politique de confidentialité)', at: new Date().toISOString() });
        }
        n++;
      } catch (e) { rapport.erreurs.push('compte ' + uid + ' : ' + (e && e.message)); }
    }
    rapport.comptesFermes = n;
  } catch (e) {
    rapport.ok = false; rapport.erreurs.push(e && e.message);
  }
  console.log('[purge]', JSON.stringify(rapport));
  return envoyer(res, rapport.ok ? 200 : 500, rapport);
}

module.exports = handler;
module.exports.config = { maxDuration: 60 };
module.exports._test = { set: (db, auth) => { _db = db; _auth = auth; } };
