/* ═══ CareerPulse · Tableau de bord administrateur (serveur) ═══
   Réservé à un seul compte : celui dont l'identifiant (UID) est dans la variable Vercel ADMIN_UID.
   Utilise la même clé que le webhook : FIREBASE_SERVICE_ACCOUNT.
   Modération : les actions (suspendre, bloquer, supprimer, lire une conversation) sont enregistrées
   dans la collection « journal_moderation » (qui, quoi, quand, pourquoi). */

const crypto = require('crypto');
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
const PUB = { organismes: { col: 'formations', cle: 'orgUid' }, employeurs: { col: 'offres_emploi', cle: 'empUid' } };
const CONV = { conversations: { pro: 'orgUid', nom: 'orgNom', type: 'Centre' }, emploi_conversations: { pro: 'empUid', nom: 'empNom', type: 'Employeur' } };
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
function jourParis(d) { return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d); }
function iso(v) { if (!v) return ''; if (v.toDate) return v.toDate().toISOString(); if (typeof v === 'number') return new Date(v).toISOString(); return String(v); }
function texte(v, n) { return String(v == null ? '' : v).slice(0, n || 200); }
function query(req) { try { return Object.fromEntries(new URL(req.url, 'http://x').searchParams); } catch (e) { return {}; } }

async function tousLesComptes() {
  const liste = []; let page;
  do { const r = await _auth.listUsers(1000, page); r.users.forEach((u) => liste.push(u)); page = r.pageToken; } while (page);
  return liste;
}
async function journal(admin, action, cible, motif, extra) {
  await _db.collection('journal_moderation').add(Object.assign({ admin, action, cible: cible || '', motif: texte(motif, 500), at: new Date().toISOString() }, extra || {}));
}

/* ── Données du tableau de bord ── */
async function donnees(adminUid) {
  const [orgs, emps, sat, comptes, reps, mods, forms, offres] = await Promise.all([
    _db.collection('organismes').get(), _db.collection('employeurs').get(), _db.collection('satisfaction').get(), tousLesComptes(),
    _db.collection('reports').get(), _db.collection('moderation').get(), _db.collection('formations').get(), _db.collection('offres_emploi').get()
  ]);
  const comptesParUid = {}; comptes.forEach((u) => { comptesParUid[u.uid] = u; });
  const MOD = {}; mods.forEach((d) => { MOD[d.id] = d.data() || {}; });

  /* Publications par pro */
  const pubs = {};
  const compter = (snap, cle) => snap.forEach((d) => { const o = d.data() || {}, u = o[cle]; if (!u) return; pubs[u] = pubs[u] || { total: 0, publiees: 0 }; pubs[u].total++; if (o.statut === 'publiee') pubs[u].publiees++; });
  compter(forms, 'orgUid'); compter(offres, 'empUid');

  const pros = [], uidsPro = new Set(); let revenu = 0;
  const lire = (snap, col) => snap.forEach((d) => {
    const o = d.data() || {}, a = o.abo || {}, m = MOD[d.id] || {};
    uidsPro.add(d.id);
    let statutAbo = a.statut || (o.accesOffert ? 'offert' : 'aucun');
    if (statutAbo === 'essai' && a.fin && new Date(a.fin).getTime() <= Date.now()) statutAbo = 'expire';
    if (statutAbo === 'actif' && !m.etat) revenu += a.plan === 'an' ? PRIX[col].an / 12 : PRIX[col].mois;
    pros.push({
      col, uid: d.id, type: col === 'organismes' ? 'Centre' : 'Employeur',
      nom: o.nom || '', siret: o.siret || '', nda: o.nda || '', qualiopi: o.qualiopi || '', ville: o.ville || '', email: o.email || '',
      tel: o.tel || '', secteur: o.secteur || '', contact: o.contactNom || '', fonction: o.contactFonction || '', site: o.site || '', logo: o.logo || '',
      verifie: !!o.verifie, statutDemande: o.statutDemande || '', demandeAt: o.demandeAt || '', valideAt: o.valideAt || '', creeParAdmin: !!o.creeParAdmin,
      aboMaj: iso(o.aboMaj), etat: m.etat || '', etatMotif: m.motif || '', etatAt: m.at || '',
      pubs: pubs[d.id] || { total: 0, publiees: 0 },
      abo: { statut: statutAbo, plan: a.plan || '', fin: a.fin || '', resiliation: !!a.resiliation }
    });
  });
  lire(orgs, 'organismes'); lire(emps, 'employeurs');

  const semaine = Date.now() - 7 * JOUR, mois = Date.now() - 30 * JOUR;
  let membres = 0, nouveaux7 = 0, nouveaux30 = 0, verifies = 0, actifs7 = 0;
  const liste = [];
  comptes.forEach((u) => {
    if (uidsPro.has(u.uid) || u.uid === adminUid) return;
    membres++;
    const cree = new Date(u.metadata.creationTime).getTime(), vu = u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).getTime() : 0;
    if (cree >= semaine) nouveaux7++; if (cree >= mois) nouveaux30++; if (u.emailVerified) verifies++; if (vu >= semaine) actifs7++;
    const m = MOD[u.uid] || {};
    liste.push({ uid: u.uid, nom: u.displayName || '', email: u.email || '', cree: new Date(cree).toISOString(), vu: vu ? new Date(vu).toISOString() : '', verifie: !!u.emailVerified, etat: m.etat || (u.disabled ? 'suspendu' : ''), etatMotif: m.motif || '', etatAt: m.at || '' });
  });
  liste.sort((a, b) => new Date(b.cree) - new Date(a.cree));

  /* Comptes suspendus / bloqués */
  const moderes = [];
  mods.forEach((d) => { const m = d.data() || {}; if (m.etat === 'suspendu' || m.etat === 'bloque') moderes.push({ uid: d.id, etat: m.etat, motif: m.motif || '', at: m.at || '', type: m.type || 'Membre', col: m.col || '', nom: m.nom || '', email: m.email || '' }); });
  moderes.sort((a, b) => String(b.at).localeCompare(String(a.at)));

  /* Signalements */
  const nomDe = (uid) => { if (!uid) return ''; const p = pros.find((x) => x.uid === uid); if (p) return p.nom || p.email; const u = comptesParUid[uid]; return u ? (u.displayName || u.email || '') : ''; };
  const signalements = [];
  reps.forEach((d) => {
    const r = d.data() || {}, cible = r.orgUid || r.empUid || r.cibleUid || r.candUid || '';
    const p = pros.find((x) => x.uid === cible);
    signalements.push({
      id: d.id, type: r.type || 'autre', motif: texte(r.motif, 120), commentaire: texte(r.commentaire, 800), contexte: texte(r.contexte, 60),
      convId: r.convId || '', propId: r.propId || '', at: r.createdAt || r.at || '', traite: !!r.traite, traiteAt: r.traiteAt || '', note: texte(r.noteAdmin, 300),
      auteurUid: r.reporterUid || '', auteur: nomDe(r.reporterUid), cibleUid: cible, cible: nomDe(cible), cibleType: p ? p.type : (cible ? 'Membre' : ''), cibleCol: p ? p.col : ''
    });
  });
  signalements.sort((a, b) => String(b.at).localeCompare(String(a.at)));

  const avis = {}, avisListe = [];
  sat.forEach((d) => {
    const o = d.data() || {}, k = o.cible || 'autre';
    avisListe.push({ cible: k, label: o.label || o.page || '', note: Number(o.note) || 0, at: o.at || '' });
    if (!avis[k]) avis[k] = { n: 0, note: 0, qualite: 0, efficacite: 0, utilite: 0 };
    const a = avis[k]; a.n++; ['note', 'qualite', 'efficacite', 'utilite'].forEach((c) => { a[c] += Number(o[c]) || 0; });
  });
  Object.keys(avis).forEach((k) => { const a = avis[k]; ['note', 'qualite', 'efficacite', 'utilite'].forEach((c) => { a[c] = a.n ? Math.round((a[c] / a.n) * 10) / 10 : 0; }); });
  avisListe.sort((a, b) => String(b.at).localeCompare(String(a.at)));

  const jours = []; for (let i = 29; i >= 0; i--) jours.push(jourParis(new Date(Date.now() - i * JOUR)));
  const docs = await _db.getAll(...jours.map((j) => _db.collection('stats_visites').doc(j)));
  const visites = jours.map((j, i) => ({ jour: j, n: (docs[i].exists && Number(docs[i].data().n)) || 0 }));
  const mrr = Math.round(revenu * 100) / 100;
  await _db.collection('stats_revenu').doc(jours[jours.length - 1]).set({ mrr, actifs: pros.filter((p) => p.abo.statut === 'actif').length, essais: pros.filter((p) => p.abo.statut === 'essai').length }, { merge: true });
  const rdocs = await _db.getAll(...jours.map((j) => _db.collection('stats_revenu').doc(j)));
  const revenus = jours.map((j, i) => (rdocs[i].exists ? { jour: j, mrr: Number(rdocs[i].data().mrr) || 0 } : { jour: j, mrr: null }));

  return {
    maj: new Date().toISOString(), pros, revenuMensuel: mrr, revenus,
    membres: { total: membres, nouveaux7, nouveaux30, verifies, actifs7, liste: liste.slice(0, 3000) },
    avis, avisListe: avisListe.slice(0, 300), visites, signalements: signalements.slice(0, 500), moderes,
    publications: { formations: forms.size, offres: offres.size }
  };
}

/* ── Fiche détaillée d'un espace Pro ── */
async function fiche(col, uid) {
  if (!PUB[col]) throw new Error('col');
  const [doc, pubSnap, convSnap, repSnap, mod] = await Promise.all([
    _db.collection(col).doc(uid).get(),
    _db.collection(PUB[col].col).where(PUB[col].cle, '==', uid).get(),
    _db.collection(col === 'organismes' ? 'conversations' : 'emploi_conversations').where(col === 'organismes' ? 'orgUid' : 'empUid', '==', uid).get(),
    _db.collection('reports').get(),
    _db.collection('moderation').doc(uid).get()
  ]);
  if (!doc.exists) return null;
  const o = doc.data() || {};
  const pubs = []; pubSnap.forEach((d) => { const p = d.data() || {}; pubs.push({ id: d.id, titre: p.titre || p.intitule || '(sans titre)', statut: p.statut || '', ville: p.ville || '', contrat: p.contrat || '', duree: p.duree || '', prix: p.prix || p.tarif || '', lien: p.lien || '', maj: p.updatedAt || p.createdAt || '', description: texte(p.description || p.desc || p.programme, 600) }); });
  pubs.sort((a, b) => String(b.maj).localeCompare(String(a.maj)));
  let nMsg = 0, ouvertes = 0, dernier = '';
  convSnap.forEach((d) => { const c = d.data() || {}; nMsg += Array.isArray(c.messages) ? c.messages.length : 0; if (c.statut !== 'close') ouvertes++; const l = iso(c.lastAt); if (l > dernier) dernier = l; });
  const reps = []; repSnap.forEach((d) => { const r = d.data() || {}; if ([r.orgUid, r.empUid, r.cibleUid].includes(uid)) reps.push({ id: d.id, motif: texte(r.motif, 120), at: r.createdAt || r.at || '', traite: !!r.traite }); });
  let compte = null; try { const u = await _auth.getUser(uid); compte = { cree: u.metadata.creationTime, vu: u.metadata.lastSignInTime || '', desactive: !!u.disabled }; } catch (e) {}
  const m = mod.exists ? mod.data() : {};
  const brut = {}; ['nom', 'siret', 'nda', 'qualiopi', 'ville', 'email', 'tel', 'secteur', 'contactNom', 'contactFonction', 'site', 'logo', 'statutDemande', 'demandeAt', 'valideAt', 'refuseAt', 'engagement'].forEach((k) => { if (o[k]) brut[k] = texte(o[k], 300); });
  return { col, uid, infos: brut, verifie: !!o.verifie, abo: o.abo || {}, stripe: o.stripe ? { client: o.stripe.client || '' } : null, publications: pubs, conversations: { total: convSnap.size, ouvertes, messages: nMsg, dernier }, signalements: reps, compte, etat: m.etat || '', etatMotif: m.motif || '', etatAt: m.at || '' };
}

/* ── Conversations : uniquement les informations générales (pas le contenu) ── */
async function conversations(col, apres) {
  if (!CONV[col]) throw new Error('col');
  let q = _db.collection(col).orderBy('lastAt', 'desc').limit(50);
  if (apres) q = q.startAfter(apres);
  const snap = await q.get(), out = [];
  snap.forEach((d) => {
    const c = d.data() || {}, msgs = Array.isArray(c.messages) ? c.messages : [];
    out.push({ id: d.id, col, proUid: c[CONV[col].pro] || '', pro: c[CONV[col].nom] || '', proType: CONV[col].type, candUid: c.candUid || '', cand: c.candLabel || 'Membre',
      sujet: texte(c.poste || (c.mission && c.mission.titre) || c.formationTitre || c.titre || '', 120), type: c.type || '', statut: c.statut || 'ouverte', bloque: !!c.bloque,
      messages: msgs.length, cree: iso(c.createdAt), dernier: iso(c.lastAt) });
  });
  return { liste: out, suite: out.length === 50 ? out[out.length - 1].dernier : '' };
}

/* ── Modération des comptes ── */
async function infosCompte(uid) {
  for (const col of ['organismes', 'employeurs']) { const d = await _db.collection(col).doc(uid).get(); if (d.exists) return { col, type: col === 'organismes' ? 'Centre' : 'Employeur', nom: (d.data() || {}).nom || '', email: (d.data() || {}).email || '', doc: d }; }
  let u = null; try { u = await _auth.getUser(uid); } catch (e) {}
  return { col: '', type: 'Membre', nom: u ? u.displayName || '' : '', email: u ? u.email || '' : '' };
}
async function masquerPublications(col, uid, garder) {
  if (!PUB[col]) return [];
  const snap = await _db.collection(PUB[col].col).where(PUB[col].cle, '==', uid).where('statut', '==', 'publiee').get(), ids = [];
  const b = _db.batch(); snap.forEach((d) => { ids.push(d.id); b.set(d.ref, { statut: 'suspendue', suspenduAt: new Date().toISOString() }, { merge: true }); });
  if (ids.length) await b.commit();
  return garder ? ids : [];
}
async function moderer(admin, act, uid, motif) {
  const c = await infosCompte(uid), ref = _db.collection('moderation').doc(uid), maintenant = new Date().toISOString();
  if (act === 'suspendre' || act === 'bloquer') {
    const etat = act === 'suspendre' ? 'suspendu' : 'bloque', avant = (await ref.get()).data() || {};
    try { await _auth.updateUser(uid, { disabled: true }); await _auth.revokeRefreshTokens(uid); } catch (e) {}
    let pubs = avant.pubsMasquees || [], proActifAvant = avant.proActifAvant;
    if (c.col) {
      pubs = pubs.concat(await masquerPublications(c.col, uid, true));
      if (proActifAvant === undefined) proActifAvant = !!(c.doc.data() || {}).proActif;
      await _db.collection(c.col).doc(uid).set({ proActif: false, suspendu: true }, { merge: true });
    }
    await ref.set({ etat, motif: texte(motif, 500), at: maintenant, type: c.type, col: c.col, nom: c.nom, email: c.email, pubsMasquees: pubs, proActifAvant: proActifAvant === undefined ? null : proActifAvant }, { merge: true });
  } else if (act === 'reactiver') {
    const m = (await ref.get()).data() || {};
    try { await _auth.updateUser(uid, { disabled: false }); } catch (e) {}
    if (c.col) {
      await _db.collection(c.col).doc(uid).set({ proActif: m.proActifAvant !== false, suspendu: false }, { merge: true });
      const ids = m.pubsMasquees || [];
      if (ids.length && PUB[c.col]) { const b = _db.batch(); ids.forEach((id) => b.set(_db.collection(PUB[c.col].col).doc(id), { statut: 'publiee' }, { merge: true })); await b.commit(); }
    }
    await ref.set({ etat: '', motif: '', at: maintenant, reactiveAt: maintenant, pubsMasquees: [] }, { merge: true });
  } else if (act === 'supprimer') {
    if (c.col) {
      const snap = await _db.collection(PUB[c.col].col).where(PUB[c.col].cle, '==', uid).get();
      const b = _db.batch(); snap.forEach((d) => b.delete(d.ref)); if (snap.size) await b.commit();
      await _db.collection(c.col).doc(uid).delete();
    }
    for (const p of [['users', uid], ['profils', uid], ['fiches_freelance', uid], ['fiches_candidat', uid], ['candidats_of', uid]]) {
      try { await _db.recursiveDelete(_db.collection(p[0]).doc(p[1])); } catch (e) {}
    }
    try { await _auth.deleteUser(uid); } catch (e) {}
    await ref.set({ etat: 'supprime', motif: texte(motif, 500), at: maintenant, type: c.type, nom: c.nom, email: c.email }, { merge: true });
  } else throw new Error('action');
  await journal(admin, act, uid, motif, { type: c.type, nom: c.nom });
}

async function ajouterPro(admin, b) {
  const col = b.col === 'organismes' ? 'organismes' : b.col === 'employeurs' ? 'employeurs' : '';
  const email = texte(b.email, 200).trim().toLowerCase(), nom = texte(b.nom, 150).trim(), siret = texte(b.siret, 20).replace(/\s/g, '');
  if (!col || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !nom) return { code: 400, erreur: 'Indique le type, le nom et un e-mail valide.' };
  if (siret && !/^\d{14}$/.test(siret)) return { code: 400, erreur: 'Le SIRET doit contenir 14 chiffres.' };
  let u;
  try { u = await _auth.createUser({ email, displayName: nom, password: crypto.randomBytes(18).toString('base64url'), emailVerified: false }); }
  catch (e) { return { code: 409, erreur: e && e.code === 'auth/email-already-exists' ? 'Un compte existe déjà avec cet e-mail.' : 'Création du compte impossible.' }; }
  const t = new Date().toISOString();
  const doc = { nom, email, siret, ville: texte(b.ville, 100), tel: texte(b.tel, 30), verifie: true, proActif: true, statutDemande: 'validee', demandeAt: t, valideAt: t, creeParAdmin: true };
  if (col === 'employeurs') { doc.secteur = texte(b.secteur, 100); doc.contactNom = texte(b.contact, 100); } else { doc.nda = texte(b.nda, 20).replace(/\s/g, ''); }
  await _db.collection(col).doc(u.uid).set(doc);
  let lien = ''; try { lien = await _auth.generatePasswordResetLink(email); } catch (e) {}
  await journal(admin, 'ajouter_pro', u.uid, '', { type: col === 'organismes' ? 'Centre' : 'Employeur', nom });
  return { code: 200, ok: true, uid: u.uid, lien };
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

    if (req.method === 'GET') {
      const q = query(req);
      if (q.vue === 'fiche') { const f = await fiche(q.col, q.uid); return f ? envoyer(res, 200, f) : envoyer(res, 404, { erreur: 'Compte introuvable' }); }
      if (q.vue === 'conversations') return envoyer(res, 200, await conversations(q.col, q.apres || ''));
      if (q.vue === 'registre') return envoyer(res, 200, require('./_registre.js'));
      return envoyer(res, 200, await donnees(admin));
    }

    if (req.method === 'POST') {
      const b = await lireJson(req), a = b.action;
      if (a === 'valider' || a === 'refuser') {
        if (!PUB[b.col] || !b.uid || typeof b.uid !== 'string') return envoyer(res, 400, { erreur: 'Demande invalide' });
        const ref = _db.collection(b.col).doc(b.uid), doc = await ref.get();
        if (!doc.exists) return envoyer(res, 404, { erreur: 'Compte introuvable' });
        const t = new Date().toISOString();
        if (a === 'valider') await ref.set({ verifie: true, proActif: true, statutDemande: 'validee', valideAt: t }, { merge: true });
        else await ref.set({ verifie: false, proActif: false, statutDemande: 'refusee', refuseAt: t }, { merge: true });
        await journal(moi.uid, a, b.uid, b.motif || '');
        return envoyer(res, 200, { ok: true });
      }
      if (['suspendre', 'bloquer', 'reactiver', 'supprimer'].includes(a)) {
        if (!b.uid || typeof b.uid !== 'string' || b.uid === admin) return envoyer(res, 400, { erreur: 'Demande invalide' });
        if (a === 'supprimer' && b.confirmation !== 'SUPPRIMER') return envoyer(res, 400, { erreur: 'Confirmation manquante' });
        await moderer(moi.uid, a, b.uid, b.motif || '');
        return envoyer(res, 200, { ok: true });
      }
      if (a === 'ajouter_pro') { const r = await ajouterPro(moi.uid, b); return envoyer(res, r.code, r); }
      if (a === 'signalement') {
        if (!b.id || typeof b.id !== 'string') return envoyer(res, 400, { erreur: 'Demande invalide' });
        const ref = _db.collection('reports').doc(b.id); if (!(await ref.get()).exists) return envoyer(res, 404, { erreur: 'Signalement introuvable' });
        await ref.set({ traite: !!b.traite, traiteAt: b.traite ? new Date().toISOString() : '', noteAdmin: texte(b.note, 300) }, { merge: true });
        return envoyer(res, 200, { ok: true });
      }
      if (a === 'lire_conversation') {
        if (!CONV[b.col] || !b.id || typeof b.id !== 'string') return envoyer(res, 400, { erreur: 'Demande invalide' });
        const motif = texte(b.motif, 300).trim();
        if (motif.length < 5) return envoyer(res, 400, { erreur: 'Indique le motif de la modération.' });
        const d = await _db.collection(b.col).doc(b.id).get();
        if (!d.exists) return envoyer(res, 404, { erreur: 'Conversation introuvable' });
        await journal(moi.uid, 'lire_conversation', b.col + '/' + b.id, motif);
        const c = d.data() || {};
        return envoyer(res, 200, { messages: (c.messages || []).map((m) => ({ de: m.from || '', texte: texte(m.text, 3000), at: iso(m.at) })), pro: c[CONV[b.col].nom] || '', cand: c.candLabel || 'Membre' });
      }
      return envoyer(res, 400, { erreur: 'Action inconnue' });
    }
    return envoyer(res, 405, { erreur: 'Méthode non autorisée' });
  } catch (e) {
    console.error('[admin]', e && e.message);
    return envoyer(res, 500, { erreur: 'Erreur serveur' });
  }
}

module.exports = handler;
module.exports._test = { set: (db, auth) => { _db = db; _auth = auth; } };
