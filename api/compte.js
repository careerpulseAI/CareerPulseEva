/* ═══ CareerPulse · Suppression de compte par le membre lui-même (droit à l'effacement, RGPD art. 17) ═══
   Le membre connecté envoie son jeton Firebase ; le serveur vérifie qui il est puis efface :
   ses données (users, profils, fiches, candidatures aux centres), ses conversations, les avis le concernant,
   et enfin son compte de connexion. Les comptes employeurs et centres passent par contact@careerpulse.fr.
   Utilise la même clé que admin.js : FIREBASE_SERVICE_ACCOUNT. */

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

async function effacerParChamp(col, champ, uid) {
  const snap = await _db.collection(col).where(champ, '==', uid).get();
  for (const d of snap.docs) { try { await _db.recursiveDelete(d.ref); } catch (e) {} }
  return snap.size;
}

async function handler(req, res) {
  if (req.method !== 'POST') return envoyer(res, 405, { erreur: 'Méthode non autorisée' });
  try {
    init();
    const jeton = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!jeton) return envoyer(res, 401, { erreur: 'Connexion requise' });
    let moi;
    try { moi = await _auth.verifyIdToken(jeton); } catch (e) { return envoyer(res, 401, { erreur: 'Session expirée : reconnecte-toi puis recommence.' }); }
    const b = await lireJson(req);
    if (b.action !== 'supprimer' || b.confirmation !== 'SUPPRIMER') return envoyer(res, 400, { erreur: 'Confirmation manquante' });
    const uid = moi.uid;
    if (uid === String(process.env.ADMIN_UID || '').trim()) return envoyer(res, 403, { erreur: 'Compte administrateur : suppression impossible ici.' });
    for (const col of ['employeurs', 'organismes']) {
      if ((await _db.collection(col).doc(uid).get()).exists) return envoyer(res, 403, { erreur: 'Compte professionnel : écrivez à contact@careerpulse.fr pour le supprimer.' });
    }
    /* Données du membre */
    for (const col of ['users', 'profils', 'fiches_freelance', 'fiches_candidat', 'candidats_of']) {
      try { await _db.recursiveDelete(_db.collection(col).doc(uid)); } catch (e) {}
    }
    /* Conversations (avec pièces jointes) et avis le concernant */
    const conv = (await effacerParChamp('conversations', 'candUid', uid)) + (await effacerParChamp('emploi_conversations', 'candUid', uid));
    const avis = await effacerParChamp('avis_freelance', 'frlUid', uid);
    /* Compte de connexion */
    await _auth.deleteUser(uid);
    await _db.collection('journal_moderation').add({ admin: uid, action: 'suppression_par_le_membre', cible: uid, motif: 'Demande du membre depuis son espace (RGPD art. 17)', at: new Date().toISOString(), conversations: conv, avis });
    return envoyer(res, 200, { ok: true });
  } catch (e) {
    console.error('[compte]', e && e.message);
    return envoyer(res, 500, { erreur: 'Suppression impossible pour le moment. Écris à contact@careerpulse.fr.' });
  }
}

module.exports = handler;
module.exports.config = { maxDuration: 60 };
module.exports._test = { set: (db, auth) => { _db = db; _auth = auth; } };
