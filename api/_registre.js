/* ═══ CareerPulse · Registre des traitements (RGPD art. 30) ═══
   Document interne : envoyé uniquement au compte administrateur par /api/admin?vue=registre.
   Le fichier commence par « _ » : Vercel ne le publie pas comme adresse du site.
   Pour le mettre à jour : modifiez ce fichier et la date « maj ». */
module.exports = {
  maj: '2026-10-29',
  responsable: [
    ['Responsable', 'Prince Mickaël Moudilou EI (micro-entrepreneur), éditeur de CareerPulse'],
    ['Adresse', '18 Place Champlain, 14000 Caen'],
    ['SIREN / SIRET', '101 467 942 / 101 467 942 00013'],
    ['Contact données personnelles', 'contact@careerpulse.fr · 06 33 35 02 06'],
    ['Délégué à la protection des données (DPO)', 'Non désigné (non obligatoire pour cette activité)'],
    ['Site', 'careerpulse.fr (pages index, menu, EVA)']
  ],
  traitements: [
    { n: 1, nom: 'Comptes et profils membres', fin: 'Créer le compte, personnaliser l\'espace', base: 'Contrat (CGU)', pers: 'Membres (16 ans et plus)', don: 'Prénom, nom, e-mail, profil, ville, compétences, parcours', dest: 'CareerPulse, Google (Firebase)', hors: 'Oui (DPF ou clauses types)', duree: 'Tant que le compte vit, suppression après 3 ans sans connexion (nettoyage automatique)' },
    { n: 2, nom: 'Profil visible des recruteurs', fin: 'Être trouvé par les employeurs et centres', base: 'Consentement', pers: 'Membres', don: 'Prénom + initiale, numéro CareerPulse, catégorie, compétences', dest: 'Employeurs et centres vérifiés', hors: 'Oui', duree: 'Jusqu\'au retrait de la visibilité' },
    { n: 3, nom: 'Documents des membres', fin: 'Ranger et partager CV, lettres, diplômes', base: 'Contrat', pers: 'Membres', don: 'Fichiers déposés', dest: 'CareerPulse, Google (Firebase), pros choisis par le membre', hors: 'Oui', duree: 'Jusqu\'à suppression par le membre ou du compte' },
    { n: 4, nom: 'Messagerie et candidatures', fin: 'Échanger avec les pros, postuler', base: 'Contrat', pers: 'Membres, contacts des pros', don: 'Messages, poste, coordonnées partagées, pièces jointes', dest: 'Le pro concerné, CareerPulse (modération)', hors: 'Oui', duree: '6 mois après le dernier message (centres), 2 ans (employeurs), suppression automatique' },
    { n: 5, nom: 'Recommandations (% de correspondance)', fin: 'Proposer des offres et formations adaptées', base: 'Intérêt légitime', pers: 'Membres', don: 'Profil et critères des offres et formations', dest: 'Aucun (calcul à l\'affichage)', hors: 'Non', duree: 'Non conservé' },
    { n: 6, nom: 'Assistantes IA EVA et Lisa', fin: 'Répondre aux questions', base: 'Contrat', pers: 'Membres et visiteurs', don: 'Questions posées, profil choisi', dest: 'Vercel, Groq, OpenRouter et le modèle appelé', hors: 'Oui', duree: 'Pas d\'historique conservé par CareerPulse' },
    { n: 7, nom: 'Portfolio EVA', fin: 'Agenda, documents, contacts, tâches', base: 'Contrat', pers: 'Membres', don: 'Ce que le membre saisit', dest: 'Google (Firebase)', hors: 'Oui', duree: 'Jusqu\'à suppression (« Supprimer mes infos ») ou du compte' },
    { n: 8, nom: 'Comptes employeurs et centres', fin: 'Ouvrir et vérifier les espaces Pro', base: 'Contrat', pers: 'Contacts des entreprises et organismes', don: 'Nom, e-mail, téléphone, SIRET, NDA, Qualiopi', dest: 'CareerPulse, Google (Firebase)', hors: 'Oui', duree: 'Durée du compte + 5 ans' },
    { n: 9, nom: 'Abonnements et facturation', fin: 'Encaisser et facturer les abonnements Pro', base: 'Obligation légale', pers: 'Clients pros', don: 'Identité pro, montants, dates', dest: 'Stripe, comptabilité', hors: 'Oui', duree: '10 ans (pièces comptables)' },
    { n: 10, nom: 'Avis, signalements, modération', fin: 'Sécurité du service', base: 'Intérêt légitime', pers: 'Membres et pros', don: 'Contenu, auteur, motif, date', dest: 'CareerPulse', hors: 'Oui', duree: 'Avis : 2 ans (automatique). Signalements : 2 ans' },
    { n: 11, nom: 'Preuves de consentement', fin: 'Prouver l\'acceptation des CGU, CGV et partages', base: 'Obligation légale', pers: 'Membres et pros', don: 'Type de choix, valeur, version, date', dest: 'CareerPulse', hors: 'Oui', duree: 'Durée du consentement + 5 ans' },
    { n: 12, nom: 'Sécurité et journaux techniques', fin: 'Protéger le site', base: 'Intérêt légitime', pers: 'Visiteurs', don: 'Adresse IP, navigateur, journaux', dest: 'Vercel, Google', hors: 'Oui', duree: '12 mois maximum' }
  ],
  horsChamp: 'Le bilan et le journal bien-être d\'EVA restent dans le navigateur du membre : CareerPulse n\'y a pas accès.',
  soustraitants: [
    ['Google (Firebase : Auth, Firestore, Storage)', 'Comptes, base de données, fichiers', 'UE et États-Unis', 'Conditions de traitement des données Google Cloud'],
    ['Vercel', 'Hébergement, fonctions serveur', 'États-Unis', 'DPA Vercel'],
    ['Stripe', 'Paiement des abonnements Pro', 'UE et États-Unis', 'Inclus dans les conditions Stripe'],
    ['Groq, OpenRouter (et le modèle appelé)', 'Réponses d\'EVA et de Lisa', 'États-Unis', 'DPA OpenRouter, refus d\'entraînement à activer'],
    ['Hostinger', 'Nom de domaine et messagerie e-mail', 'Union européenne', 'Conditions Hostinger']
  ],
  securite: [
    'Connexion par compte personnel, e-mail vérifié pour les membres, comptes pros validés à la main (SIRET)',
    'Échanges chiffrés (HTTPS)',
    'Règles d\'accès Firestore par propriétaire',
    'Clé Firebase admin et secrets rangés uniquement dans Vercel, jamais dans le code',
    'Espace admin réservé à un seul compte (ADMIN_UID), avec journal de modération',
    'Suppression automatique chaque nuit des données expirées (/api/purge)',
    'Suppression de compte en libre-service (/api/compte)',
    'Polices hébergées sur le site, aucun traceur publicitaire'
  ],
  fuite: 'En cas de fuite de données : prévenir la CNIL sous 72 heures (notifications.cnil.fr), puis les personnes concernées si le risque est élevé.',
  todo: [
    'Accepter les conditions de traitement des données dans la console Google Cloud (Firebase)',
    'Activer le refus d\'entraînement dans les réglages OpenRouter',
    'Vérifier la certification Data Privacy Framework de Google, Vercel, Stripe et OpenRouter sur dataprivacyframework.gov',
    'Relire ce registre tous les 6 mois'
  ]
};
