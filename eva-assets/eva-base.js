
// ══════════════════════════════════════════════════════════════════
//  EVA COACH — BASE ORIGINALE + 3 OUTILS
//  OUTIL 1 : Tickets avec code guichet + mémoire conversation
//  OUTIL 2 : Menu situation guidée + sous-catégories
//  OUTIL 3 : Surveys inline 2-3 questions dans la conversation
//  BASE : EVA_BRAIN + double moteur local/API — INTACTS
// ══════════════════════════════════════════════════════════════════

// ── STATE ────────────────────────────────────────────────────────
var ecHistory = [];
var ecTyping = false;
var ecUserName = '';
var ecPhase = 'intro'; // intro | chat
var ecCurrentTicketId = null;
var ecSurveyActive = false;
var ecSurveyCount = 0; // compteur pour déclencher survey toutes les 3 réponses
var ecSelectedSit = null;
var ecSelectedSubcat = null;

// ── OUTIL 1 : SYSTÈME DE TICKETS ────────────────────────────────

// Générer code style guichet : EVA-2024-0047
function ecGenTicketCode(){
  var year = new Date().getFullYear();
  var num = String(Math.floor(Math.random()*9000)+1000).padStart(4,'0');
  return 'EVA-'+year+'-'+num;
}

function ecLoadTickets(){
  try{ return JSON.parse(localStorage.getItem('cp_eva_tickets')||'[]'); }
  catch(e){ return []; }
}
function ecSaveTickets(tickets){
  try{ localStorage.setItem('cp_eva_tickets', JSON.stringify(tickets)); }catch(e){}
}

function ecCreateTicket(subject){
  var tickets = ecLoadTickets();
  var code = ecGenTicketCode();
  // S'assurer que le code est unique
  while(tickets.find(function(t){return t.code===code;})){
    code = ecGenTicketCode();
  }
  var ticket = {
    code: code,
    subject: subject || 'Conversation Eva',
    situation: ecSelectedSit || '',
    subcat: ecSelectedSubcat || '',
    date: new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'}),
    time: new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),
    status: 'open',
    history: [],
    userName: ecUserName || ''
  };
  tickets.unshift(ticket);
  ecSaveTickets(tickets);
  ecCurrentTicketId = code;
  ecUpdateDrawer();
  ecUpdateBadge();
  return code;
}

function ecSaveCurrentTicket(){
  if(!ecCurrentTicketId) return;
  var tickets = ecLoadTickets();
  var idx = tickets.findIndex(function(t){return t.code===ecCurrentTicketId;});
  if(idx<0) return;
  tickets[idx].history = ecHistory.slice();
  tickets[idx].status = 'saved';
  tickets[idx].userName = ecUserName;
  tickets[idx].lastMsg = ecHistory.length ? ecHistory[ecHistory.length-1].content.substring(0,80)+'…' : '';
  ecSaveTickets(tickets);
  ecUpdateDrawer();
  toast('✓ Ticket '+ecCurrentTicketId+' sauvegardé');
}

function ecDeleteTicket(code, e){
  e.stopPropagation();
  if(!confirm('Supprimer le ticket '+code+' ?')) return;
  var tickets = ecLoadTickets().filter(function(t){return t.code!==code;});
  ecSaveTickets(tickets);
  if(ecCurrentTicketId===code) ecCurrentTicketId=null;
  ecUpdateDrawer();
  ecUpdateBadge();
  toast('Ticket supprimé');
}

function ecOpenTicket(code){
  var tickets = ecLoadTickets();
  var ticket = tickets.find(function(t){return t.code===code;});
  if(!ticket) return;
  ecCloseDrawer();
  // Restaurer la conversation
  ecCurrentTicketId = code;
  ecUserName = ticket.userName || '';
  ecHistory = ticket.history ? ticket.history.slice() : [];
  ecSelectedSit = ticket.situation || null;
  ecSelectedSubcat = ticket.subcat || null;
  // Afficher les messages
  var msgs = document.getElementById('ec-msgs');
  msgs.innerHTML = '';
  ecHistory.forEach(function(m){
    ecAddBubble(m.role==='user'?'user':'bot', m.content, true);
  });
  // Message de reprise
  ecShowTypingDelay(function(){
    var reopen = '📂 Ticket **'+code+'** rouvert.\n\nOn reprend où on s\'était arrêté'+(ecUserName?', **'+ecUserName+'**':'')+' — pose-moi ta question !';
    ecAddBubble('bot', reopen);
    ecHistory.push({role:'assistant',content:reopen});
    ecUnlockInput();
  },700);
  ecPhase = ecUserName ? 'chat' : 'intro';
  ecLockInput();
  // Marquer comme ouvert
  tickets.forEach(function(t){if(t.code===code) t.status='open';});
  ecSaveTickets(tickets);
  ecUpdateDrawer();
}

function ecNewTicket(){
  window._evaInSession=true;
  ecCloseDrawer();
  ecHistory = [];
  ecUserName = '';
  ecPhase = 'intro';
  ecCurrentTicketId = null;
  ecSelectedSit = null;
  ecSelectedSubcat = null;
  var msgs = document.getElementById('ec-msgs');
  msgs.innerHTML = '';
  var chips = document.getElementById('ec-chips');
  if(chips) chips.style.display='none';
  ecLockInput();
  // Ouvrir le panel de filtrage
  setTimeout(function(){ ecOpenProfilingPanel(); }, 200);
}

function ecUpdateDrawer(){
  var tickets = ecLoadTickets();
  var list = document.getElementById('ec-tkt-list');
  var empty = document.getElementById('ec-tkt-empty');
  if(!list) return;
  if(!tickets.length){
    if(empty) empty.style.display='block';
    return;
  }
  if(empty) empty.style.display='none';
  // Générer les cartes
  var html = '<div class="ec-tkt-section">Conversations récentes</div>';
  tickets.forEach(function(t){
    var isActive = t.code === ecCurrentTicketId;
    html += '<div class="ec-tkt-card'+(isActive?' active':'')+'" onclick="ecOpenTicket(\''+t.code+'\')">'
      +'<div class="ec-tkt-code">'
      +'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9z"/><polyline points="15 5 15 9 19 9"/></svg>'
      +'<span class="ec-tkt-code-badge">'+t.code+'</span>'
      +'<span class="ec-tkt-status '+(t.status==='saved'?'saved':'open')+'">'+(t.status==='saved'?'Sauvegardé':'Ouvert')+'</span>'
      +'</div>'
      +'<div class="ec-tkt-subject">'+t.subject+'</div>'
      +'<div class="ec-tkt-meta">'
      +'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
      +t.date+' · '+t.time
      +(t.userName?' · <b>'+t.userName+'</b>':'')
      +'</div>'
      +(t.lastMsg?'<div style="font-size:.58rem;color:#94a3b8;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+t.lastMsg+'</div>':'')
      +'<div class="ec-tkt-actions">'
      +'<button class="ec-tkt-act open" onclick="ecOpenTicket(\''+t.code+'\')">'
      +'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
      +'Ouvrir</button>'
      +'<button class="ec-tkt-act save" onclick="ecSaveCurrentTicket();event.stopPropagation()">'
      +'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'
      +'Sauvegarder</button>'
      +'<button class="ec-tkt-act del" onclick="ecDeleteTicket(\''+t.code+'\',event)">'
      +'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>'
      +'Suppr.</button>'
      +'</div>'
      +'</div>';
  });
  list.innerHTML = html;
}

function ecUpdateBadge(){
  var tickets = ecLoadTickets();
  var b = document.getElementById('ec-tkt-badge-hd');
  if(!b) return;
  if(tickets.length>0){ b.style.display='inline-flex'; b.textContent=tickets.length; }
  else b.style.display='none';
}

function ecToggleDrawer(){
  var d = document.getElementById('ec-tkt-drawer');
  var o = document.getElementById('ec-tkt-overlay');
  if(d.classList.contains('open')){ ecCloseDrawer(); }
  else {
    ecUpdateDrawer();
    d.classList.add('open');
    o.classList.add('open');
    document.body.style.overflow='hidden';
  }
}
function ecCloseDrawer(){
  document.getElementById('ec-tkt-drawer').classList.remove('open');
  document.getElementById('ec-tkt-overlay').classList.remove('open');
  document.body.style.overflow='';
}

// ══════════════════════════════════════════════════════════════
//  SYSTÈME DE FILTRAGE EVA — MULTI-ÉTAPES COMPLET
//  4 profils · sous-profils · sous-thèmes · questions · ticket
// ══════════════════════════════════════════════════════════════

var EC_PROFILING = {

  // ── ÉTAPE 1 : PROFILS PRINCIPAUX ──
  profils: [
    { key:'demandeur', ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', lbl:'Demandeur d\'emploi', desc:'ARE · RSA · ASS · Recherche active' },
    { key:'freelance',  ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', lbl:'Freelance / Indépendant', desc:'Créer · Développer · Statut juridique' },
    { key:'reconversion', ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>', lbl:'Reconversion', desc:'Bilan · CPF · Formation · Transition' },
    { key:'etudiant',  ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>', lbl:'Étudiant / Jeune', desc:'Stage · Alternance · 1er emploi · Orientation' }
  ],

  // ── ÉTAPE 2 : SOUS-PROFILS ──
  sousProfils: {
    'demandeur': [
      { key:'are', lbl:'Indemnisé ARE (chômage)', desc:'Allocation retour à l\'emploi · France Travail' },
      { key:'rsa', lbl:'Bénéficiaire RSA', desc:'Revenu solidarité active · CAF · Contrat engagement' },
      { key:'ass', lbl:'ASS (fin de droits ARE)', desc:'Allocation solidarité spécifique · après ARE' },
      { key:'sans-alloc', lbl:'Sans allocation', desc:'Primo-demandeur · rupture récente · pas de droits' },
      { key:'licenciement', lbl:'Licenciement / Rupture en cours', desc:'Procédure · négociation · droits' }
    ],
    'freelance': [
      { key:'lancer', lbl:'Je veux me lancer', desc:'Projet · création · statut à choisir' },
      { key:'developper', lbl:'Déjà lancé — développer', desc:'Missions · tarifs · croissance' },
      { key:'difficulte', lbl:'En difficulté', desc:'CA insuffisant · dettes · restructuration' },
      { key:'chomeur-cree', lbl:'Chômeur qui crée', desc:'ARCE · ACRE · cumul ARE + entreprise' }
    ],
    'reconversion': [
      { key:'en-poste', lbl:'En poste (reconversion douce)', desc:'Transition progressive · CPF · PTP' },
      { key:'au-chomage', lbl:'Au chômage', desc:'Reconversion urgente · AIF · financement France Travail' },
      { key:'reprise-etudes', lbl:'Reprise d\'études', desc:'Formation longue · financement · VAE' },
      { key:'apres-burnout', lbl:'Après burn-out / inaptitude', desc:'Reconstruction · bilan · nouvelle voie' }
    ],
    'etudiant': [
      { key:'lyceen', lbl:'Lycéen / Orientation', desc:'Parcoursup · filières · bac' },
      { key:'etudiant-sup', lbl:'Étudiant (Bac+1 à Bac+5)', desc:'Stage · alternance · financement' },
      { key:'jeune-diplome', lbl:'Jeune diplômé — 1er emploi', desc:'Droits · négociation · intégration' }
    ]
  },

  // ── ÉTAPE 3 : SOUS-THÈMES ──
  sousThemes: {
    // Demandeur
    'are': ['Calcul & montant ARE','Durée d\'indemnisation','Activité réduite (cumul ARE + travail)','Dégressivité (7e mois)','Prolongation ARE via formation','Différé d\'indemnisation','Bascule ASS après ARE','Aides logement (APL/ALS)','CSS — mutuelle gratuite'],
    'rsa': ['Inscription France Travail obligatoire','Contrat d\'engagement (15-20h/semaine)','Cumul RSA + travail','Sortie du RSA','Orientation organisme référent','Aides logement CAF','Prime d\'activité'],
    'ass': ['Conditions d\'accès ASS','Montant ASS (19,48€/jour 2026)','Durée & renouvellement','Cumul ASS + emploi partiel','Bascule RSA','Aides logement & CSS'],
    'sans-alloc': ['Inscription France Travail','Aides d\'urgence (fonds social CAF)','Droits malgré absence d\'allocation','APL & aides logement','CSS complémentaire santé'],
    'licenciement': ['Rupture conventionnelle CDI','Licenciement économique','Licenciement pour faute','Inaptitude médicale','Contestation prud\'hommes','Calcul indemnités légales','Clause de non-concurrence'],
    // Freelance
    'lancer': ['Choisir son statut (micro/SASU/EURL/EI)','ACRE — exonération cotisations 50%','Accompagnement CCI','Prêt d\'honneur / BPI France','Aides régionales création','Immatriculation Guichet unique','Premier client — stratégie'],
    'developper': ['Trouver des missions & clients','Fixer son TJM / tarifs','Facturation & comptabilité','TVA & déclaration URSSAF','Protéger son activité (prévoyance)','Portage salarial — avantages','Réseau & LinkedIn'],
    'difficulte': ['Restructurer son activité','Dettes URSSAF — étalement','Radiation & fermeture','Reconversion depuis freelance','Aides de solidarité'],
    'chomeur-cree': ['ARCE — 60% ARE en capital','ACRE — exonération charges','Cumul ARE + création','Conditions & démarches','Choisir ARCE vs maintien ARE'],
    // Reconversion
    'en-poste': ['Bilan de compétences CPF','CEP — Conseiller Évolution Pro (gratuit)','PTP — Projet de Transition Pro','CPF & Mon Compte Formation','Plan de développement compétences','Transition en douceur — démission sécurisée'],
    'au-chomage': ['Bilan de compétences (AIF France Travail)','CPF demandeur d\'emploi (gratuit)','Formation prescrite France Travail','VAE — Validation acquis expérience','AIF — Aide individuelle formation','Secteurs qui recrutent'],
    'reprise-etudes': ['Financement formation longue (OPCO)','Période de reconversion (loi 2025)','VAE pour obtenir un diplôme','Prêt étudiant & bourses adulte','Cumul ARE + formation'],
    'apres-burnout': ['Inaptitude & reclassement','Bilan de compétences thérapeutique','CEP pour reconstruire un projet','Droits en arrêt maladie prolongé','Transition vers nouvelle voie'],
    // Étudiant
    'lyceen': ['Parcoursup — stratégie & vœux','Choisir sa filière (BTS/BUT/Licence)','Alternance dès le lycée (CAP/Bac Pro)','Aides financières lycéens','Bourses & aides régionales'],
    'etudiant-sup': ['Trouver un stage (droits & gratification)','Alternance — trouver une entreprise','Rédiger son CV étudiant','Lettre de motivation convaincante','APL & aides logement CAF','CSS — complémentaire santé étudiante','Bourses CROUS — conditions & montants'],
    'jeune-diplome': ['Négocier son premier salaire','Comprendre sa fiche de paie','Période d\'essai — droits & rupture','Mutuelle employeur obligatoire','Retraite — commencer à cotiser','Prime d\'activité si salaire modeste','Harcèlement & droits en entreprise']
  },

  // ── QUESTIONS PAR PROFIL — enrichies ──
  questions: {
    'demandeur': [
      { id:'prenom', label:'Ton prénom', placeholder:'Ex : Sophie', type:'text' },
      { id:'ville', label:'Ta ville / région', placeholder:'Ex : Lyon, Île-de-France…', type:'text' },
      { id:'age', label:'Ton âge', placeholder:'Ex : 32', type:'text' },
      { id:'dernier-poste', label:'Ton dernier poste occupé', placeholder:'Ex : Comptable, Vendeur, Infirmière…', type:'text' },
      { id:'secteur-vise', label:'Secteur visé ou métier recherché', placeholder:'Ex : Commerce, Santé, Informatique…', type:'text' },
      { id:'duree-recherche', label:'Depuis combien de temps tu cherches ?', placeholder:'Ex : 2 mois, 6 mois, 1 an…', type:'text' },
      { id:'duree-chomage', label:'Durée d\'indemnisation ARE restante', placeholder:'Ex : 8 mois, fin dans 3 mois…', type:'text' },
      { id:'niveau-etudes', label:'Ton niveau d\'études', placeholder:'Ex : Bac+2, Licence, CAP, Autodidacte…', type:'text' },
      { id:'situation-familiale', label:'Situation familiale', placeholder:'Ex : Célibataire, Marié(e) 2 enfants…', type:'text' },
      { id:'contraintes', label:'Contraintes ou freins à l\'emploi', placeholder:'Ex : Mobilité limitée, Permis requis, Langue…', type:'text' }
    ],
    'freelance': [
      { id:'prenom', label:'Ton prénom', placeholder:'Ex : Marc', type:'text' },
      { id:'ville', label:'Ta ville / région', placeholder:'Ex : Paris, Bordeaux…', type:'text' },
      { id:'age', label:'Ton âge', placeholder:'Ex : 28', type:'text' },
      { id:'secteur', label:'Ton secteur / domaine d\'activité', placeholder:'Ex : Développement web, Consulting RH, Design…', type:'text' },
      { id:'statut-actuel', label:'Ton statut actuel (si déjà lancé)', placeholder:'Ex : Auto-entrepreneur, SASU, Salarié…', type:'text' },
      { id:'ca-vise', label:'CA mensuel visé ou actuel', placeholder:'Ex : 3000€/mois, 60K/an…', type:'text' },
      { id:'nb-clients', label:'Nombre de clients actuels', placeholder:'Ex : 0, 1-2, 5 clients réguliers…', type:'text' },
      { id:'charges', label:'Charges mensuelles estimées', placeholder:'Ex : 500€, 1500€…', type:'text' },
      { id:'anciennete', label:'Ancienneté en freelance', placeholder:'Ex : Débutant, 2 ans, 5 ans…', type:'text' }
    ],
    'reconversion': [
      { id:'prenom', label:'Ton prénom', placeholder:'Ex : Camille', type:'text' },
      { id:'ville', label:'Ta ville / région', placeholder:'Ex : Toulouse, Grand Est…', type:'text' },
      { id:'age', label:'Ton âge', placeholder:'Ex : 40', type:'text' },
      { id:'metier-actuel', label:'Ton métier actuel ou dernier poste', placeholder:'Ex : Comptable, Militaire, Enseignant…', type:'text' },
      { id:'metier-vise', label:'Métier visé ou domaine souhaité', placeholder:'Ex : Développeur, Coach, Aide-soignant…', type:'text' },
      { id:'delai', label:'Dans quel délai tu veux changer ?', placeholder:'Ex : 6 mois, 1 an, dès que possible…', type:'text' },
      { id:'anciennete-metier', label:'Ancienneté dans ton métier actuel', placeholder:'Ex : 5 ans, 12 ans…', type:'text' },
      { id:'cpf-solde', label:'Solde CPF disponible (si connu)', placeholder:'Ex : 2000€, 5000€, Je ne sais pas…', type:'text' },
      { id:'frein-reconversion', label:'Principal frein à ta reconversion', placeholder:'Ex : Finances, Famille, Peur de recommencer…', type:'text' }
    ],
    'etudiant': [
      { id:'prenom', label:'Ton prénom', placeholder:'Ex : Thomas', type:'text' },
      { id:'ville', label:'Ta ville / région', placeholder:'Ex : Nantes, Lille…', type:'text' },
      { id:'age', label:'Ton âge', placeholder:'Ex : 21', type:'text' },
      { id:'niveau', label:'Ton niveau d\'études actuel', placeholder:'Ex : Licence 2, Master 1, Terminale…', type:'text' },
      { id:'domaine', label:'Ton domaine / filière', placeholder:'Ex : Informatique, Commerce, Santé…', type:'text' },
      { id:'recherche', label:'Ce que tu cherches précisément', placeholder:'Ex : Stage de 6 mois, Alternance dès septembre…', type:'text' },
      { id:'boursier', label:'Es-tu boursier(e) CROUS ?', placeholder:'Ex : Oui échelon 3, Non, Je vérifie…', type:'text' },
      { id:'experience', label:'Expériences professionnelles déjà acquises', placeholder:'Ex : 1 stage 3 mois, Job étudiant, Aucune…', type:'text' }
    ]
  }
};

// ── STATE DU PROFILING ──
var _ecProf = {
  step: 0,       // 0=intro 1=profil 2=sous-profil 3=sous-theme 4=questions
  profil: null,
  sousProfil: null,
  sousTheme: null,
  answers: {},
  introAnswers: { prenom:'', objectif:'' }
};

function ecOpenProfilingPanel(){
  _ecProf = { step:0, profil:null, sousProfil:null, sousTheme:null, answers:{}, introAnswers:{ prenom:'', objectif:'' } };
  var p = document.getElementById('ec-profiling-panel');
  if(p) p.classList.add('active');
  ecProfRender();
}
function ecCloseProfilingPanel(){
  var p = document.getElementById('ec-profiling-panel');
  if(p) p.classList.remove('active');
}

// ══ PROFILING PANEL — ENGINE PREMIUM ══
var _PICO = {
  'demandeur':'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  'freelance':'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  'reconversion':'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
  'etudiant':'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  'chk':'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
};
var _PAZ = {
  0:{q:'Bienvenue ! Je suis Eva, ton assistante.', lbs:['A','B']},
  1:{q:'Quelle est ta situation ?',       lbs:['A','B','C','D']},
  2:{q:'Précise ta situation',            lbs:['A','B','C','D','E']},
  3:{q:'Sur quel sujet as-tu besoin d\'aide ?', lbs:['A','B','C','D','E','F','G']},
  4:{q:'Quelques infos pour personnaliser', lbs:['A','B','C','D','E','F']}
};

/* ── Génère le bloc mail récap Eva ── */
function _ecMailRecap(){
  var a = _ecProf.introAnswers;
  var p = _ecProf;
  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  var timeStr = now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  var lines = [];
  if(a.prenom) lines.push('<span class="ec-mail-recap-line">Prénom : <strong>'+a.prenom+'</strong></span>');
  if(a.objectif) lines.push('<span class="ec-mail-recap-line">Objectif : <strong>'+a.objectif+'</strong></span>');
  if(p.profil){
    var pObj = EC_PROFILING.profils.find(function(x){return x.key===p.profil;});
    if(pObj) lines.push('<span class="ec-mail-recap-line">Profil : <strong>'+pObj.lbl+'</strong></span>');
  }
  if(p.sousProfil){
    var spArr = EC_PROFILING.sousProfils[p.profil]||[];
    var spObj = spArr.find(function(x){return x.key===p.sousProfil;});
    if(spObj) lines.push('<span class="ec-mail-recap-line">Situation : <strong>'+spObj.lbl+'</strong></span>');
  }
  if(p.sousTheme) lines.push('<span class="ec-mail-recap-line">Sujet : <strong>'+p.sousTheme+'</strong></span>');
  // Questions personnalisées déjà répondues
  var qa = p.answers||{};
  if(qa.ville) lines.push('<span class="ec-mail-recap-line">Ville : <strong>'+qa.ville+'</strong></span>');
  if(qa.age) lines.push('<span class="ec-mail-recap-line">Âge : <strong>'+qa.age+' ans</strong></span>');
  if(qa['duree-chomage']) lines.push('<span class="ec-mail-recap-line">Durée chômage : <strong>'+qa['duree-chomage']+'</strong></span>');
  if(qa['metier-actuel']) lines.push('<span class="ec-mail-recap-line">Métier actuel : <strong>'+qa['metier-actuel']+'</strong></span>');
  if(qa['secteur']) lines.push('<span class="ec-mail-recap-line">Secteur : <strong>'+qa['secteur']+'</strong></span>');
  if(qa['niveau-etudes']) lines.push('<span class="ec-mail-recap-line">Niveau d\'études : <strong>'+qa['niveau-etudes']+'</strong></span>');
  if(qa['situation-familiale']) lines.push('<span class="ec-mail-recap-line">Situation familiale : <strong>'+qa['situation-familiale']+'</strong></span>');
  if(lines.length === 0) return '';
  return '<div class="ec-mail-recap">'
    +'<div class="ec-mail-recap-head">'
    +'<span class="ec-mail-recap-from">Eva CareerPulse</span>'
    +'<span class="ec-mail-recap-date">'+dateStr+' · '+timeStr+'</span>'
    +'</div>'
    +lines.join('')
    +'</div>';
}
var _ecTT = null;
function _ecType(txt, cb){
  var el=document.getElementById('ec-prof-question');
  if(!el) return;
  if(_ecTT) clearInterval(_ecTT);
  var i=0; el.innerHTML='<span class="ec-prof-cursor"></span>';
  _ecTT=setInterval(function(){
    if(i>=txt.length){ clearInterval(_ecTT);
      el.innerHTML=txt+'<span class="ec-prof-cursor"></span>';
      if(cb)cb(); return;
    }
    el.innerHTML=txt.substring(0,++i)+'<span class="ec-prof-cursor"></span>';
  },26);
}
function _ecAZ(step, selIdx, total){
  var sc=document.getElementById('ec-prof-stepcount');
  if(sc) sc.textContent=('0'+(step+1)).slice(-2)+' / 05';
  var az=_PAZ[step]||_PAZ[1];
  var pct= selIdx>=0 ? Math.round(((selIdx+1)/az.lbs.length)*100) : 0;
  var fill=document.getElementById('ec-prof-az-fill');
  var knob=document.getElementById('ec-prof-az-knob');
  var lbls=document.getElementById('ec-prof-az-labels');
  if(fill) fill.style.width=pct+'%';
  if(knob) knob.style.left=pct+'%';
  var displayPct = pct > 0 ? pct : (selIdx === -1 ? 0 : 1);
  if(lbls) lbls.innerHTML='<span class="ec-prof-az-pct">'+(displayPct>0?displayPct+'%':'')+'</span><span class="ec-prof-az-hint">Étape '+(step+1)+' / 5</span>';
  var back=document.getElementById('ec-prof-back-btn');
  if(back) back.style.display=step>1?'flex':'none';
}

function ecProfRender(){
  var body=document.getElementById('ec-prof-body');
  var next=document.getElementById('ec-prof-next-btn');
  if(!body||!next) return;
  next.disabled=true;
  next.innerHTML='Continuer <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';

  if(_ecProf.step===0){
    _ecType('Bienvenue ! Je suis Eva 👋');
    var introFilled = (_ecProf.introAnswers.prenom||'').trim().length>=2;
    _ecAZ(0, introFilled?1:-1, 2);
    body.innerHTML=
      '<div style="font-size:.67rem;color:rgba(248,250,255,.38);line-height:1.65;margin-bottom:16px">Quelques questions rapides pour personnaliser ton accompagnement.</div>'
      +'<div class="ec-pinput-wrap">'
        +'<div class="ec-pinput-lbl">Ton prénom</div>'
        +'<input class="ec-pinput" type="text" placeholder="Ex : Sophie, Marc, Camille…" value="'+(_ecProf.introAnswers.prenom||'')+'"'
        +' oninput="_ecIntroA(\'prenom\',this.value)" autocomplete="given-name" autofocus/>'
      +'</div>'
      +'<div class="ec-pinput-wrap">'
        +'<div class="ec-pinput-lbl">Quel est ton objectif principal ?</div>'
        +'<div style="display:flex;flex-direction:column;gap:7px;margin-top:4px">'
          +['Trouver un emploi rapidement','Comprendre mes droits','Reconversion professionnelle','Créer mon activité','Optimiser mes aides','Négocier mon salaire'].map(function(opt){
            var sel=_ecProf.introAnswers.objectif===opt;
            return '<div style="padding:11px 14px;border-radius:8px;border:1px solid rgba(139,92,246,'+(sel?'.4':'.12')+');background:rgba(139,92,246,'+(sel?'.1':'.03')+');cursor:pointer;font-size:.74rem;font-weight:'+(sel?'700':'500')+';color:rgba(248,250,255,'+(sel?'.95':'.5')+');display:flex;align-items:center;gap:10px;transition:all .14s" onclick="_ecIntroObj(\''+opt+'\',this)">'
              +'<span style="width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(139,92,246,'+(sel?'.8':'.3')+');display:flex;align-items:center;justify-content:center;flex-shrink:0;background:'+(sel?'#7c3aed':'transparent')+';">'+(sel?'<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>':'')+'</span>'
              +opt
            +'</div>';
          }).join('')
        +'</div>'
      +'</div>';
    next.disabled=(_ecProf.introAnswers.prenom||'').trim().length<2;
  }
  else if(_ecProf.step===1){
    _ecType(_PAZ[1].q);
    _ecAZ(1, EC_PROFILING.profils.findIndex(function(p){return p.key===_ecProf.profil;}), 4);
    body.innerHTML=_ecMailRecap()+EC_PROFILING.profils.map(function(p,idx){
      var s=_ecProf.profil===p.key;
      return '<div class="ec-pcard'+(s?' sel':'')+'" onclick="ecPSP(\''+p.key+'\','+idx+',this)">'
        +'<div class="ec-pcard-ico">'+(_PICO[p.key]||'')+'</div>'
        +'<div style="flex:1"><div class="ec-pcard-lbl">'+p.lbl+'</div><div class="ec-pcard-desc">'+p.desc+'</div></div>'
        +'<div class="ec-pcard-check">'+(s?_PICO.chk:'')+'</div></div>';
    }).join('');
    if(_ecProf.profil) next.disabled=false;
  }
  else if(_ecProf.step===2){
    var sp=EC_PROFILING.sousProfils[_ecProf.profil]||[];
    _ecType(_PAZ[2].q);
    _ecAZ(2, sp.findIndex(function(s){return s.key===_ecProf.sousProfil;}), sp.length);
    body.innerHTML=_ecMailRecap()+sp.map(function(s,idx){
      var sel=_ecProf.sousProfil===s.key;
      var letter=String.fromCharCode(65+idx);
      return '<div class="ec-pcard'+(sel?' sel':'')+'" onclick="ecPSS(\''+s.key+'\','+idx+',this)">'
        +'<div style="width:26px;height:26px;border-radius:6px;border:1.5px solid rgba(139,92,246,'+(sel?'.6':'.2')+');display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.6rem;font-weight:900;color:rgba(167,139,250,'+(sel?'1':'.5')+');background:rgba(124,58,237,'+(sel?'.15':'0')+');">'
        +letter+'</div>'
        +'<div style="flex:1"><div class="ec-pcard-lbl">'+s.lbl+'</div><div class="ec-pcard-desc">'+s.desc+'</div></div>'
        +'<div class="ec-pcard-check">'+(sel?_PICO.chk:'')+'</div></div>';
    }).join('');
    if(_ecProf.sousProfil) next.disabled=false;
  }
  else if(_ecProf.step===3){
    var st=EC_PROFILING.sousThemes[_ecProf.sousProfil]||[];
    var tr=['Aides logement (APL / ALS / ALF)','CSS — complémentaire santé solidaire','Prime d\'activité','Aide mobilité France Travail','Action Logement','AAH & MDPH','Aide juridictionnelle'];
    var all=st.concat(tr);
    _ecType(_PAZ[3].q);
    _ecAZ(3, all.indexOf(_ecProf.sousTheme), all.length);
    var stSel = st.indexOf(_ecProf.sousTheme) >= 0;
    var trSel = tr.indexOf(_ecProf.sousTheme) >= 0;
    function makePills(arr){ return arr.map(function(s){ return '<div class="ec-ppill'+(_ecProf.sousTheme===s?' sel':'')+'" onclick="ecPST(\''+s.replace(/'/g,"\\'")+'\',this)">'+s+'</div>'; }).join(''); }
    body.innerHTML=_ecMailRecap()
      +'<div style="font-size:.62rem;color:rgba(248,250,255,.3);margin-bottom:12px;line-height:1.5">Sélectionne <strong style="color:#a78bfa">un seul sujet</strong> dans l\'une des familles ci-dessous.</div>'
      +'<div class="ec-acc-family">'
        +'<div class="ec-acc-head'+(stSel?' open':'')+'" onclick="ecAccToggle(this)">'
          +'<span class="ec-acc-head-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg></span>'
          +'<span class="ec-acc-head-txt">Ton sujet principal</span>'
          +'<span class="ec-acc-head-badge'+(stSel?' sel':'')+'">'+st.length+' sujets</span>'
          +'<span class="ec-acc-chevron"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></span>'
        +'</div>'
        +'<div class="ec-acc-body'+(stSel?' open':'')+'">'
          +'<div class="ec-acc-pills">'+makePills(st)+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="ec-acc-family">'
        +'<div class="ec-acc-head'+(trSel?' open':'')+'" onclick="ecAccToggle(this)">'
          +'<span class="ec-acc-head-ico"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></span>'
          +'<span class="ec-acc-head-txt">Démarches & aides sociales</span>'
          +'<span class="ec-acc-head-badge'+(trSel?' sel':'')+'">'+tr.length+' sujets</span>'
          +'<span class="ec-acc-chevron"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></span>'
        +'</div>'
        +'<div class="ec-acc-body'+(trSel?' open':'')+'">'
          +'<div class="ec-acc-pills">'+makePills(tr)+'</div>'
        +'</div>'
      +'</div>';
    if(_ecProf.sousTheme) next.disabled=false;
  }
  else if(_ecProf.step===4){
    var qs=EC_PROFILING.questions[_ecProf.profil]||[];
    if((_ecProf.introAnswers.prenom||'').trim() && !_ecProf.answers['prenom']){
      _ecProf.answers['prenom']=_ecProf.introAnswers.prenom;
    }
    _ecType('Derniers détails — Eva prépare ton dossier complet');
    var filled=Object.keys(_ecProf.answers).filter(function(k){return (_ecProf.answers[k]||'').trim();}).length;
    _ecAZ(4, filled-1, qs.length);
    next.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg> Générer mon dossier Eva';
    var qsFiltered = qs.filter(function(q){ return q.id !== 'prenom' || !(_ecProf.introAnswers.prenom||'').trim(); });
    body.innerHTML=_ecMailRecap()
      +'<div style="font-size:.62rem;color:rgba(248,250,255,.3);margin-bottom:12px;line-height:1.55">Plus tu renseigens d\'infos, plus Eva peut établir un <strong style="color:#a78bfa">diagnostic précis</strong>.</div>'
      +qsFiltered.map(function(q){
        return '<div class="ec-pinput-wrap">'
          +'<div class="ec-pinput-lbl">'+q.label+'</div>'
          +(q.type==='select' && q.options
            ? '<select class="ec-pinput" onchange="ecPSA(\''+q.id+'\',this.value)"><option value="">-- Choisir --</option>'+q.options.map(function(o){return '<option value="'+o+'"'+((_ecProf.answers[q.id]===o)?' selected':'')+'>'+o+'</option>';}).join('')+'</select>'
            : '<input class="ec-pinput" type="text" placeholder="'+q.placeholder+'" value="'+(_ecProf.answers[q.id]||'')+'"'
            +' oninput="ecPSA(\''+q.id+'\',this.value)" autocomplete="off"/>'
          )
          +'</div>';
      }).join('');
    next.disabled=(_ecProf.answers['prenom']||'').trim().length<2;
  }
}

function _ecIntroA(id,val){
  _ecProf.introAnswers[id]=val;
  _ecProf.answers[id]=val;
  document.getElementById('ec-prof-next-btn').disabled=(_ecProf.introAnswers.prenom||'').trim().length<2;
  var introFilled=(_ecProf.introAnswers.prenom||'').trim().length>=2;
  _ecAZ(0, introFilled?1:-1, 2);
}
function _ecIntroObj(val,el){
  _ecProf.introAnswers.objectif=val;
  el.closest('.ec-pinput-wrap').querySelectorAll('[onclick^="_ecIntroObj"]').forEach(function(r){
    r.style.borderColor='rgba(139,92,246,.12)';r.style.background='rgba(139,92,246,.03)';
    r.style.color='rgba(248,250,255,.5)';r.style.fontWeight='500';
    var sp=r.querySelector('span');if(sp){sp.style.borderColor='rgba(139,92,246,.3)';sp.style.background='transparent';sp.innerHTML='';}
  });
  el.style.borderColor='rgba(139,92,246,.4)';el.style.background='rgba(139,92,246,.1)';
  el.style.color='rgba(248,250,255,.95)';el.style.fontWeight='700';
  var sp=el.querySelector('span');if(sp){sp.style.borderColor='rgba(139,92,246,.8)';sp.style.background='#7c3aed';sp.innerHTML='<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';}
  _ecAZ(0,1,2);
}
function ecAccToggle(headEl){
  var family = headEl.closest('.ec-acc-family');
  var body = family.querySelector('.ec-acc-body');
  var isOpen = headEl.classList.contains('open');
  // Close all in same parent
  var parent = family.parentNode;
  parent.querySelectorAll('.ec-acc-head').forEach(function(h){ h.classList.remove('open'); });
  parent.querySelectorAll('.ec-acc-body').forEach(function(b){ b.classList.remove('open'); });
  // Toggle this one
  if(!isOpen){ headEl.classList.add('open'); body.classList.add('open'); }
}
function ecPSP(key,idx,el){
  _ecProf.profil=key;_ecProf.sousProfil=null;_ecProf.sousTheme=null;
  document.querySelectorAll('#ec-prof-body .ec-pcard').forEach(function(c){c.classList.remove('sel');c.querySelector('.ec-pcard-check').innerHTML='';});
  el.classList.add('sel');el.querySelector('.ec-pcard-check').innerHTML=_PICO.chk;
  _ecAZ(1,idx,4);document.getElementById('ec-prof-next-btn').disabled=false;
}
function ecPSS(key,idx,el){
  _ecProf.sousProfil=key;_ecProf.sousTheme=null;
  var sp=EC_PROFILING.sousProfils[_ecProf.profil]||[];
  document.querySelectorAll('#ec-prof-body .ec-pcard').forEach(function(c){c.classList.remove('sel');c.querySelector('.ec-pcard-check').innerHTML='';});
  el.classList.add('sel');el.querySelector('.ec-pcard-check').innerHTML=_PICO.chk;
  _ecAZ(2,idx,sp.length);document.getElementById('ec-prof-next-btn').disabled=false;
}
function ecPST(val,el){
  _ecProf.sousTheme=val;
  var st=EC_PROFILING.sousThemes[_ecProf.sousProfil]||[];
  var tr=['Aides logement (APL / ALS / ALF)','CSS — complémentaire santé solidaire','Prime d\'activité','Aide mobilité France Travail','Action Logement','AAH & MDPH','Aide juridictionnelle'];
  document.querySelectorAll('#ec-prof-body .ec-ppill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  _ecAZ(3,st.concat(tr).indexOf(val),st.length+tr.length);
  document.getElementById('ec-prof-next-btn').disabled=false;
}
function ecPSA(id,val){
  _ecProf.answers[id]=val;
  var qs=EC_PROFILING.questions[_ecProf.profil]||[];
  var filled=Object.keys(_ecProf.answers).filter(function(k){return (_ecProf.answers[k]||'').trim();}).length;
  _ecAZ(4,filled-1,qs.length);
  document.getElementById('ec-prof-next-btn').disabled=(_ecProf.answers['prenom']||'').trim().length<2;
}
// Compat aliases
function ecProfSelProfil(k,el){ecPSP(k,0,el);}
function ecProfSelSousProfil(k,el){ecPSS(k,0,el);}
function ecProfSelTheme(v,el){ecPST(v,el);}
function ecProfSaveAnswer(id,v){ecPSA(id,v);}
function ecProfBack(){ if(_ecProf.step>0){_ecProf.step--;ecProfRender();} }
function ecProfNext(){ if(_ecProf.step<4){_ecProf.step++;ecProfRender();}else{ecProfFinish();} }

function ecProfFinish(){
  var a = _ecProf.answers;
  var prenom = a['prenom']||'Visiteur';
  prenom = prenom.charAt(0).toUpperCase()+prenom.slice(1).toLowerCase();
  ecUserName = prenom;

  // Trouver le libellé profil
  var profilObj = EC_PROFILING.profils.find(function(p){return p.key===_ecProf.profil;})||{lbl:_ecProf.profil,ico:'📋'};
  var spObj = (EC_PROFILING.sousProfils[_ecProf.profil]||[]).find(function(s){return s.key===_ecProf.sousProfil;})||{lbl:_ecProf.sousProfil||'—'};

  // Générer le ticket
  var num = Math.floor(1000+Math.random()*9000);
  var alpha='ABCDEFGHJKLMNPQRSTUVWXYZ';
  var suf = alpha[Math.floor(Math.random()*alpha.length)]+alpha[Math.floor(Math.random()*alpha.length)];
  var code = 'EVA-'+num+'-'+suf;
  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  var timeStr = now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});

  try{ localStorage.setItem('cp_eva_code', code); }catch(e){}
  try{ localStorage.setItem('cp_eva_profile', JSON.stringify(_ecProf)); }catch(e){}

  // Fermer le panel profiling
  ecCloseProfilingPanel();

  // Afficher ticket
  var codeEl = document.getElementById('ec-tkt-code-display');
  if(codeEl) codeEl.textContent = code;
  var infosEl = document.getElementById('ec-tkt-infos-display');
  if(infosEl){
    var rows = [
      ['Titulaire', prenom],
      ['Profil', profilObj.ico+' '+profilObj.lbl],
      ['Situation', spObj.lbl],
      ['Sujet', (_ecProf.sousTheme||'—').substring(0,34)],
      ['Ville', a['ville']||'—'],
      ['Âge', a['age']||'—'],
      ['Émis le', dateStr+' · '+timeStr],
      ['Plateforme', 'CareerPulse · Eva']
    ];
    infosEl.innerHTML = rows.map(function(r){
      return '<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">'+r[0]+'</span><span class="ec-ticket-info-val">'+r[1]+'</span></div>';
    }).join('');
  }
  var ov = document.getElementById('ec-ticket-overlay');
  if(ov) ov.classList.add('show');

  // Préparer le contexte Eva
  window._evaContextProf = {
    prenom: prenom,
    profil: profilObj.lbl,
    sousProfil: spObj.lbl,
    sousTheme: _ecProf.sousTheme,
    answers: a,
    code: code
  };
}

// Appel après fermeture ticket — Eva arrive dossier en main, diagnostic immédiat
function ecCloseTicket(){
  var ov = document.getElementById('ec-ticket-overlay');
  if(ov) ov.classList.remove('show');
  var ctx = window._evaContextProf || {};
  var prenom = ctx.prenom || ecUserName || 'toi';
  var a = ctx.answers || {};
  ecPhase = 'chat';
  window._evaInSession = true;
  ecCreateTicket('Session de '+prenom);

  // Construire résumé dossier détaillé
  var dossierLines = [];
  if(ctx.profil) dossierLines.push('→ **Profil :** '+ctx.profil);
  if(ctx.sousProfil) dossierLines.push('→ **Situation :** '+ctx.sousProfil);
  if(ctx.sousTheme) dossierLines.push('→ **Sujet principal :** '+ctx.sousTheme);
  if(a.ville) dossierLines.push('→ **Localisation :** '+a.ville);
  if(a.age) dossierLines.push('→ **Âge :** '+a.age+' ans');
  if(a['dernier-poste']) dossierLines.push('→ **Dernier poste :** '+a['dernier-poste']);
  if(a['secteur-vise']||a.secteur) dossierLines.push('→ **Secteur visé :** '+(a['secteur-vise']||a.secteur));
  if(a['duree-recherche']) dossierLines.push('→ **Durée de recherche :** '+a['duree-recherche']);
  if(a['duree-chomage']) dossierLines.push('→ **ARE restante :** '+a['duree-chomage']);
  if(a['metier-actuel']) dossierLines.push('→ **Métier actuel :** '+a['metier-actuel']);
  if(a['metier-vise']) dossierLines.push('→ **Métier visé :** '+a['metier-vise']);
  if(a['niveau-etudes']||a.niveau) dossierLines.push('→ **Niveau études :** '+(a['niveau-etudes']||a.niveau));
  if(a['situation-familiale']) dossierLines.push('→ **Situation familiale :** '+a['situation-familiale']);
  if(a['cpf-solde']) dossierLines.push('→ **Solde CPF :** '+a['cpf-solde']);
  if(a['ca-vise']) dossierLines.push('→ **CA visé :** '+a['ca-vise']);
  if(a['statut-actuel']) dossierLines.push('→ **Statut actuel :** '+a['statut-actuel']);
  if(a['contraintes']) dossierLines.push('→ **Contraintes :** '+a['contraintes']);
  if(a['frein-reconversion']) dossierLines.push('→ **Frein principal :** '+a['frein-reconversion']);

  // Question diagnostic ciblée selon le sujet
  var diagQ = '**Dis-moi exactement ce que tu vis en ce moment** — décris ta situation en quelques mots, et je commence ton diagnostic immédiatement. 🎯';
  if(ctx.sousTheme && ctx.sousTheme.toLowerCase().indexOf('are')>=0)
    diagQ = 'Pour ton sujet **ARE / indemnisation**, voici ma première question diagnostique :\n→ **Depuis combien de mois tu perçois l\'ARE, et as-tu reçu une notification de fin de droits ?** Je vais calculer tes options exactes.';
  else if(ctx.sousTheme && (ctx.sousTheme.toLowerCase().indexOf('rupture')>=0||ctx.sousTheme.toLowerCase().indexOf('licenci')>=0))
    diagQ = 'Pour ton sujet **rupture / licenciement**, ma première question :\n→ **Es-tu encore en poste, en préavis, ou déjà sorti(e) de l\'entreprise ?** Et depuis combien de temps ? On attaque le diagnostic.';
  else if(ctx.sousTheme && ctx.sousTheme.toLowerCase().indexOf('salaire')>=0)
    diagQ = 'Pour la **négociation de ton salaire** :\n→ **Quel poste, quel salaire actuel ou proposé, et dans quel contexte tu négocies ?** Je te donne une stratégie personnalisée dans la foulée.';
  else if(ctx.sousTheme && (ctx.sousTheme.toLowerCase().indexOf('cpf')>=0||ctx.sousTheme.toLowerCase().indexOf('formation')>=0))
    diagQ = 'Pour ton projet de **formation / CPF** :\n→ **Quelle formation tu vises, et quel est ton solde CPF actuel ?** Je t\'indique le financement optimal pour ta situation.';

  ecShowTypingDelay(function(){
    var intro = "Bonjour **"+prenom+"** ! 👋 Je suis **Eva**, coach carrière CareerPulse.\n\n"
      +"J'ai analysé ton dossier complet. Voici ce que j'ai :\n\n"
      +dossierLines.join('\n')
      +"\n\n---\n\n"
      +"Je connais le **droit du travail 2026**, tous les dispositifs officiels (ARE, CPF, ACRE, PTP, RSA, APL…) et les démarches concrètes. Je ne donne pas des réponses génériques — je traite **ta situation précise**.\n\n"
      +diagQ;
    ecAddBubble('bot', intro);
    ecHistory.push({role:'assistant',content:intro});
    ecUnlockInput();
    var chips=document.getElementById('ec-chips');
    if(chips) chips.style.display='flex';
  }, 700);
}

// Compat functions
function ecToggleSitPanel(){ ecOpenProfilingPanel(); }
function ecSelSit(){}
function ecSelSubcat(){}
function ecStartGuided(){ ecOpenProfilingPanel(); }
function ecStartFree(){
  ecCloseProfilingPanel();
  ecNewTicket();
}

// ── OUTIL 3 : SURVEYS INLINE ─────────────────────────────────────

var EC_SURVEYS = {
  cv: {
    tag: 'Mini-questionnaire CV',
    q: 'Pour t\'aider au mieux sur ton CV, dis-moi :',
    opts: ['Je pars de zéro', 'J\'ai un CV à améliorer', 'Je veux passer les filtres ATS', 'Je cherche un modèle moderne']
  },
  emploi: {
    tag: 'Comprendre ta situation',
    q: 'Tu cherches un emploi depuis combien de temps ?',
    opts: ['Moins d\'1 mois', '1 à 3 mois', '3 à 6 mois', 'Plus de 6 mois']
  },
  entretien: {
    tag: 'Préparation entretien',
    q: 'C\'est quel type d\'entretien ?',
    opts: ['Entretien RH (premier contact)', 'Entretien technique / métier', 'Entretien avec un dirigeant', 'Assessment / mise en situation']
  },
  droit: {
    tag: 'Clarifier ta situation juridique',
    q: 'Tu es dans quelle situation en ce moment ?',
    opts: ['Encore en poste', 'En préavis', 'Déjà sorti de l\'entreprise', 'Situation complexe / mixte']
  },
  salaire: {
    tag: 'Contexte de négociation',
    q: 'Tu négocie dans quel contexte ?',
    opts: ['Une offre d\'embauche reçue', 'Une augmentation en cours de contrat', 'Une promotion interne', 'Je me prépare à l\'avance']
  },
  reconversion: {
    tag: 'Ton projet de reconversion',
    q: 'Où en es-tu dans ton projet ?',
    opts: ['Je n\'ai pas encore d\'idée', 'J\'ai une piste mais j\'hésite', 'Mon projet est clair, je cherche comment financer', 'Je suis en formation ou sur le point de commencer']
  },
};

function ecGetSurveyKey(msg){
  var m = msg.toLowerCase();
  if(/\bcv\b|curriculum|lettre/.test(m)) return 'cv';
  if(/trouver|emploi|cherche|postuler|candidat/.test(m)) return 'emploi';
  if(/entretien|interview/.test(m)) return 'entretien';
  if(/licenci|chômage|rupture|droit|cdi|cdd|démission/.test(m)) return 'droit';
  if(/salaire|négo|augment|rémunérat/.test(m)) return 'salaire';
  if(/reconvers|changer de métier|cpf|formation/.test(m)) return 'reconversion';
  return null;
}

function ecShowSurvey(key, afterReply){
  var survey = EC_SURVEYS[key];
  if(!survey) return;
  var msgs = document.getElementById('ec-msgs');
  var survDiv = document.createElement('div');
  survDiv.className = 'ec-survey';
  survDiv.id = 'ec-survey-'+Date.now();
  var survId = survDiv.id;
  survDiv.innerHTML =
    '<div class="ec-survey-tag">'
    +'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="3"/></svg>'
    +survey.tag
    +'</div>'
    +'<div class="ec-survey-q">'+survey.q+'</div>'
    +'<div class="ec-survey-opts">'
    +survey.opts.map(function(opt,i){
      return '<button class="ec-survey-opt" onclick="ecAnswerSurvey(\''+survId+'\',\''+opt.replace(/'/g,"\\'")+'\')">'
        +'<span class="ec-survey-num">'+String.fromCharCode(65+i)+'</span>'
        +opt
        +'</button>';
    }).join('')
    +'</div>';
  msgs.appendChild(survDiv);
  msgs.scrollTop = msgs.scrollHeight;
  ecSurveyActive = true;
}

function ecAnswerSurvey(survId, answer){
  // Marquer la réponse
  var surv = document.getElementById(survId);
  if(!surv) return;
  surv.querySelectorAll('.ec-survey-opt').forEach(function(btn){
    btn.disabled = true;
    if(btn.textContent.trim().indexOf(answer)>=0 || btn.textContent.includes(answer)){
      btn.classList.add('chosen');
    }
  });
  ecSurveyActive = false;
  // Envoyer comme message utilisateur
  var inp = document.getElementById('ec-input');
  if(inp){ inp.value = answer; }
  setTimeout(function(){ ecSend(); }, 300);
}

// ── BASE ORIGINALE EVA_BRAIN — ENRICHIE (ajouts uniquement) ──────
(function(){
  var st = document.createElement('style');
  st.textContent = `
@keyframes ecInputPulse {
  0%,100%{ border-color:#e2e8f0; box-shadow:none; }
  50%{ border-color:#059669; box-shadow:0 0 0 3px rgba(5,150,105,.18); }
}
#ec-input.eva-speaking { pointer-events:none; opacity:.5; animation:none; }
#ec-input.eva-ready    { animation:ecInputPulse 1.1s ease-in-out 3; border-color:#059669; }
`;
  document.head.appendChild(st);
})();

// ── EVA_LEXIQUE : institutions × droits par profil (court, simple) ──
var EVA_LEXIQUE = {
  demandeur: [
    {nom:'France Travail',droits:['ARE','ASS','Suivi'],documents:['Attestation employeur','Pièce identité','RIB'],actions:['Inscription en ligne','Actualisation mensuelle'],lien:'https://www.francetravail.fr',local:true},
    {nom:'CAF',droits:['RSA','APL','Prime activité'],documents:['Avis imposition','RIB'],actions:['Simulation en ligne'],lien:'https://www.caf.fr',local:true},
    {nom:'Mission Locale',droits:['Garantie Jeunes -26 ans'],documents:['Pièce identité'],actions:['RDV conseiller jeunesse'],lien:'https://www.mission-locale.fr',local:true},
    {nom:'APEC',droits:['Accompagnement cadres'],documents:['CV'],actions:['Créer un compte APEC'],lien:'https://www.apec.fr',local:false}
  ],
  etudiant: [
    {nom:'CROUS',droits:['Bourse','Logement étudiant'],documents:['Dossier social étudiant'],actions:['DSE entre janvier et mai'],lien:'https://www.etudiant.gouv.fr',local:true},
    {nom:'CAF',droits:['APL étudiant'],documents:['Bail','RIB'],actions:['Demande en ligne'],lien:'https://www.caf.fr',local:true},
    {nom:'Parcoursup',droits:['Accès enseignement supérieur'],documents:['Bulletins scolaires'],actions:['Voeux janvier-mars'],lien:'https://www.parcoursup.fr',local:false},
    {nom:'CFA',droits:['Contrat apprentissage/alternance'],documents:['Contrat employeur'],actions:['Recherche employeur'],lien:'https://www.alternance.emploi.gouv.fr',local:true}
  ],
  freelance: [
    {nom:'URSSAF',droits:['Cotisations','ACRE'],documents:['Pièce identité','RIB'],actions:['Déclaration début activité'],lien:'https://www.urssaf.fr',local:true},
    {nom:'CCI',droits:['Accompagnement création'],documents:['Projet entreprise'],actions:['RDV créateur gratuit'],lien:'https://www.cci.fr',local:true},
    {nom:'CMA',droits:['Accompagnement artisans'],documents:['Projet activité'],actions:['Inscription répertoire métiers'],lien:'https://www.cma-france.fr',local:true},
    {nom:'Mon Compte Formation',droits:['CPF jusqu\'à 500€/an'],documents:['FranceConnect'],actions:['Recherche formation'],lien:'https://www.moncompteformation.gouv.fr',local:false}
  ],
  reconvers: [
    {nom:'CEP',droits:['Accompagnement gratuit reconversion'],documents:[],actions:['RDV opérateur CEP'],lien:'https://www.mon-cep.org',local:true},
    {nom:'Mon Compte Formation',droits:['CPF jusqu\'à 5000€'],documents:['FranceConnect'],actions:['Recherche formation'],lien:'https://www.moncompteformation.gouv.fr',local:false},
    {nom:'Transitions Pro',droits:['Formation longue + salaire maintenu'],documents:['Devis formation'],actions:['Dossier régional'],lien:'https://www.transitionspro.fr',local:true},
    {nom:'VAE',droits:['Diplôme par expérience'],documents:['Dossier preuves expérience'],actions:['Dossier recevabilité'],lien:'https://www.vae.gouv.fr',local:false}
  ]
};

// ── Géoloc ville/code postal — API officielle gouv, sans clé ──
window._evaVille = null;
window.evaLookupVille = async function(nom){
  if(!nom || nom.length<2) return null;
  try{
    var r = await fetch('https://geo.api.gouv.fr/communes?nom='+encodeURIComponent(nom.trim())+'&fields=nom,codesPostaux,departement,centre&boost=population&limit=1');
    var d = await r.json();
    if(Array.isArray(d) && d.length){
      var c=d[0];
      var coords = (c.centre && c.centre.coordinates) ? c.centre.coordinates : null; // [lon, lat]
      return {nom:c.nom, codesPostaux:c.codesPostaux||[], departement:c.departement?c.departement.nom:'', lon:coords?coords[0]:null, lat:coords?coords[1]:null};
    }
  }catch(e){}
  return null;
};
window.evaDetectVilleInText = function(txt){
  if(!txt) return null;
  var m = txt.match(/(?:je suis de|j'habite (?:à|a|dans)|habite à|basé(?:e)? à)\s+([A-ZÀ-Ü][a-zà-ÿ\-]+(?:[\s\-][A-ZÀ-Ü][a-zà-ÿ\-]+){0,2})/i);
  return m ? m[1] : null;
};
window.evaBuildLexiqueContext = function(profilKey){
  var liste = EVA_LEXIQUE[profilKey] || [];
  return liste.map(function(i){ return '- '+i.nom+' → '+i.droits.join(', ')+' | '+i.lien; }).join('\n');
};
// ── Lien réel "La bonne alternance" (widget officiel gouv, gratuit, sans clé ni compte) :
//   formations + entreprises qui recrutent en alternance, géolocalisées sur la ville détectée ──
window.evaDetectAlternanceIntent = function(txt){
  return /\b(alternance|apprentissage|apprenti|stage|stagiaire)\b/i.test(txt||'');
};
window.evaBuildAlternanceLink = function(villeInfo){
  var url = 'https://labonnealternance.apprentissage.beta.gouv.fr/recherche?radius=30&scope=all&caller=CareerPulse';
  if(villeInfo && villeInfo.lat!=null && villeInfo.lon!=null){
    url += '&lat='+villeInfo.lat+'&lon='+villeInfo.lon;
  }
  return url;
};

// ════════════════════════════════════════════════════════════════
//  EVA_BRAIN — BASE INTACTE + ENRICHISSEMENTS 2025
//  Chiffres réels, lois à jour, connaissance complète emploi/droit
// ════════════════════════════════════════════════════════════════
var EVA_BRAIN = {

  saluer: function(nom){
    var n = nom ? ', **'+nom+'**' : '';
    return "Enchanté"+n+" 😊\n\nAlors, dis-moi — qu'est-ce qui t'amène aujourd'hui ?\n\n➡️ Tu cherches un emploi, tu veux améliorer ton CV, préparer un entretien... ou autre chose ? **Parle-moi librement**, je suis là pour t'aider.";
  },

  // ── ENRICHISSEMENT : extraire mots clés du message candidat ──
  extractKeywords: function(msg){
    var stopWords = ['je','tu','il','elle','on','nous','vous','ils','elles','le','la','les','un','une','des','du','de','et','ou','mais','donc','car','ni','or','que','qui','quoi','dont','où','mon','ton','son','ma','ta','sa','mes','tes','ses','notre','votre','leur','mes','ai','as','a','avons','avez','ont','est','suis','es','sommes','êtes','sont','avec','pour','dans','sur','sous','par','entre','vers','chez','en','au','aux','ce','cet','cette','ces','me','te','se','lui','leur','y','en','ne','pas','plus','très','bien','tout','tous','toute','toutes'];
    var words = msg.toLowerCase().replace(/[.,!?;:]/g,'').split(/\s+/);
    return words.filter(function(w){ return w.length > 3 && !stopWords.includes(w); }).slice(0,4);
  },

  // ── ENRICHISSEMENT : reformuler avec mots du candidat ──
  reformuler: function(msg, keywords){
    if(!keywords || !keywords.length) return null;
    var kw = keywords.slice(0,2).join('" et "');
    var prefixes = [
      'Tu me parles de "**'+kw+'**"...',
      'Je retiens "**'+kw+'**" dans ce que tu me dis...',
      '"**'+kw+'**"... je t\'entends.',
      'Quand tu parles de "**'+kw+'**"...',
    ];
    return prefixes[Math.floor(Math.random()*prefixes.length)];
  },

  repond: function(msg, historique, prenom){
    var m = msg.toLowerCase();
    var p = prenom ? prenom : 'toi';

    // ── CV ──
    if(/\bcv\b|curriculum|resum/.test(m)){
      if(/amelior|optimis|améliore|retrav/.test(m)){
        return "Super, on va booster ton CV 📄\n\n**3 règles d'or :**\n**1.** Une seule page si < 10 ans d'expérience\n**2.** Les mots-clés de l'offre en texte brut (pour passer les filtres ATS)\n**3.** Des chiffres concrets : *« Augmenté les ventes de +32% »* plutôt que *« Bonne performance »*\n\nTu peux me décrire ton poste actuel (ou souhaité) et ton secteur ? Je t'aide à le personnaliser.";
      }
      return "Pour un CV qui cartonne 🎯\n\n✅ **Format** : 1 page max (< 10 ans), lisible sans mise en page complexe\n✅ **En-tête** : Prénom Nom + titre de poste + email + LinkedIn\n✅ **Accroche** : 2 lignes percutantes sur qui tu es\n✅ **Expériences** : résultats chiffrés, verbes d'action\n✅ **Mots-clés** : issus directement de l'offre visée\n\nTu veux qu'on travaille sur une section particulière ?";
    }

    // ── Lettre de motivation ──
    if(/lettre|motivation|lm\b/.test(m)){
      return "La lettre de motivation parfaite en 3 parties 📝\n\n**1. L'accroche** (1 phrase) : montre que tu connais l'entreprise\n*Ex : « Chez [entreprise], l'innovation X m'a particulièrement marqué… »*\n\n**2. Le corps** : ta valeur ajoutée + 2-3 réalisations concrètes\n\n**3. La conclusion** : appel à l'action + enthousiasme sincère\n\n💡 **Évite absolument** : « Je me permets de vous contacter », « Dynamique et motivé(e) ».\n\nTu veux qu'on rédige ta lettre ensemble ? Dis-moi le poste et l'entreprise.";
    }

    // ── Entretien ──
    if(/entretien|interview/.test(m)){
      if(/prépare|prepare|comment/.test(m)){
        return "Préparer un entretien comme un pro 🎤\n\n**La veille :**\n→ Recherche l'entreprise (actualités, valeurs, concurrents)\n→ Prépare 5 exemples STAR (Situation, Tâche, Action, Résultat)\n→ Prépare 3 questions pertinentes à poser\n\n**Les questions pièges :**\n❓ *Défaut* → cite un vrai défaut + la solution que tu as mise en place\n❓ *5 ans* → montre de l'ambition alignée avec le poste\n❓ *Pourquoi vous* → 3 points différenciants concrets\n\nTu as un entretien bientôt ? Pour quelle entreprise / quel poste ?";
      }
      return "L'entretien, c'est 50% de préparation, 50% d'authenticité 💪\n\nLa méthode **STAR** est ta meilleure amie :\n**S**ituation → **T**âche → **A**ction → **R**ésultat\n\nTu veux qu'on simule des questions ? Ou tu as une question précise sur un entretien à venir ?";
    }

    // ── Salaire / négociation — chiffres 2025 ──
    if(/salaire|paye|payer|rémunérat|négoci|negocie|augment/.test(m)){
      return "Négocier son salaire sans stress 💰\n\n**Repères 2025 :**\n→ SMIC horaire : **11,88 €** (soit ~1 801 € brut/mois)\n→ Salaire médian France : **2 590 € net/mois**\n→ Cadres débutants : **2 800 – 3 500 € brut** selon secteur\n\n**Règle d'or :** laisse l'employeur parler en premier.\n\n**Ce qu'on peut négocier au-delà du fixe :**\n✅ Prime annuelle / variable · Télétravail · RTT · Tickets restaurant · Budget formation\n\n**Ne jamais** justifier par ses besoins — toujours par sa valeur marché.\n\nTu veux qu'on prépare ta réponse pour un entretien spécifique ?";
    }

    // ── Reconversion ──
    if(/reconvers|changer de métier|changer de secteur|nouveau métier/.test(m)){
      return "La reconversion, c'est un projet — pas une fuite 🔄\n\n**Les 4 étapes :**\n**1.** Faire le point : qu'est-ce qui t'attire vraiment ?\n**2.** Explorer : témoignages, rencontres LinkedIn, stages courts\n**3.** Se former : CPF (jusqu'à **3 776 €** de droits en 2025), France Travail, écoles spécialisées\n**4.** Tester avant de sauter : freelance, mission, side project\n\n**Ressources clés :**\n→ Mon Compte Formation (moncompteformation.gouv.fr)\n→ CEP (Conseil en Évolution Professionnelle) — **gratuit**\n→ VAE pour valider tes acquis sans formation\n\nTu sais déjà vers quel domaine tu veux aller ?";
    }

    // ── Droit du travail — chiffres 2025 ──
    if(/licenci|démission|démissionn|chômage|are\b|rupture conventionn|préavis|cdd|cdi/.test(m)){
      if(/licenci/.test(m)){
        return "Sur le licenciement 📋\n\n**Types :**\n→ **Faute simple** : préavis + indemnités légales\n→ **Faute grave** : pas de préavis, pas d'indemnités, ARE possible\n→ **Faute lourde** : idem + réparation des dommages\n→ **Économique** : préavis + indemnités renforcées + ARE\n\n**Indemnité légale 2025 :**\n→ 1/4 mois de salaire par an d'ancienneté (jusqu'à 10 ans)\n→ 1/3 mois par an au-delà de 10 ans\n→ Base : salaire de référence des 3 ou 12 derniers mois (le plus favorable)\n\n✅ Solde de tout compte + attestation France Travail obligatoires\n⚠️ **12 mois** pour saisir les prud'hommes.\n\nTu es dans quelle situation concrètement ?";
      }
      if(/rupture conventionn/.test(m)){
        return "La rupture conventionnelle 🤝\n\n**Ce que c'est :** rupture à l'amiable entre salarié et employeur — les deux doivent être d'accord.\n\n**Tes droits :**\n→ Indemnité spécifique de rupture conv. (**au moins égale** à l'indemnité légale de licenciement)\n→ **ARE (chômage)** : oui, dans la quasi-totalité des cas\n→ Délai de rétractation : **15 jours calendaires** après signature\n→ Homologation par la DREETS : **15 jours ouvrables**\n\n**Point vigilance 2025 :**\n→ Forfait social de **30%** sur l'indemnité pour l'employeur si > PMSS\n\nTu veux qu'on calcule ton indemnité estimative ?";
      }
      if(/are|chômage/.test(m)){
        return "L'ARE — ton allocation chômage 📊\n\n**Tu y as droit si :**\n→ Tu as travaillé **au moins 6 mois** ces 2 dernières années\n→ Tu t'inscris à France Travail dans les 12 mois après la fin du contrat\n\n**Combien tu vas toucher :**\n💡 Exemple concret : tu gagnais **2 000 € net/mois** → tu touches environ **1 140 €/mois**\n→ C'est environ **57% de ton ancien salaire**\n→ Minimum garanti : **~960 €/mois** · Maximum : **~7 900 €/mois**\n\n**Pendant combien de temps :**\n→ 1 mois travaillé = 1 mois d'ARE · Maximum **24 mois** (36 mois si +53 ans)\n\nTu veux estimer ton montant ?";
      }
      if(/démission|démissionn/.test(m)){
        return "Sur la démission 📋\n\n→ La démission est **volontaire** — ARE seulement dans certains cas !\n→ **Démissions légitimes** (droit au chômage) : déménagement pour emploi du conjoint, mariage/PACS, non-paiement du salaire, violence, etc.\n→ **Depuis 2024** : démissionner pour un projet de reconversion **sérieux** peut ouvrir des droits après validation France Travail (dispositif ATR)\n\n**Préavis :** selon ta convention collective — vérifier avant de partir.\n\nTu envisages de démissionner ? Pour quelle raison ?";
      }
      return "Le droit du travail peut sembler complexe, mais je suis là 📚\n\nTu veux des infos sur :\n→ Le **licenciement** (types, indemnités 2025) ?\n→ La **démission** (cas légitimes, ARE) ?\n→ La **rupture conventionnelle** (calcul, délais) ?\n→ Le **chômage ARE** (montant, durée 2025) ?\n→ Les **contrats** (CDI/CDD/intérim) ?\n\nDis-moi ta situation précise.";
    }

    // ── CPF / Formation — chiffres 2025 ──
    if(/cpf|compte personnel|formation|apprendre|se former/.test(m)){
      return "Le CPF en 2025 💡\n\n**Tes droits :**\n→ **500 €/an** alimentés (plafond **5 000 €**)\n→ **800 €/an** pour les non-qualifiés (plafond **8 000 €**)\n→ Accessible sur **moncompteformation.gouv.fr**\n\n**Attention depuis le 02/05/2024 :**\n→ Participation obligatoire du salarié : **100 €** si employeur ne finance pas\n→ Exonération : demandeurs d'emploi, CPF de transition, abondement employeur\n\n**Comment utiliser :**\n1. Vérifie ton solde sur moncompteformation.gouv.fr\n2. Cherche une formation éligible\n3. Demande si besoin un **abondement** à ton employeur\n\nTu veux financer quel type de formation ?";
    }

    // ── Stage / Alternance / Jeunes ──
    if(/stage|alternance|apprentissage|bts|master|étudiant/.test(m)){
      return "Pour les jeunes en 2025 🌱\n\n**Alternance :**\n→ **Contrat d'apprentissage** : 16-29 ans (ou +29 ans si RQTH/créateur d'entreprise/sportif de haut niveau)\n→ Rémunération : de **27% à 100% du SMIC** selon l'âge et l'année\n→ Aide employeur : jusqu'à **6 000 €** (entreprises < 250 salariés)\n\n**Stage :**\n→ **Gratification obligatoire** si > 2 mois : **4,35 €/heure** (15% du plafond SS horaire 2025)\n→ Droits : tickets restaurant si les salariés en bénéficient, remboursement 50% transport\n\n**1ère recherche d'emploi :**\n→ Garanti Jeunes / CEJ : accompagnement + allocation jusqu'à **528 €/mois**\n\nTu cherches un stage, une alternance ou ton premier emploi ?";
    }

    // ── Arrêt maladie / IJ ──
    if(/arrêt maladie|indemnité journalière|ij\b|maladie|at\b|accident travail/.test(m)){
      return "Arrêt maladie et IJ 2025 🏥\n\n**Délai de carence :**\n→ **3 jours** pour maladie ordinaire (sauf convention collective plus favorable)\n→ **0 jour** pour accident du travail / maladie professionnelle\n\n**Montant des IJ 2025 :**\n→ **50% du salaire journalier de base** (moyenne des 3 derniers mois)\n→ Maximum : **52,28 €/jour** (50% du plafond SS journalier)\n→ Longue maladie (>30 jours) : **66,66%** du salaire journalier\n\n**Conditions :** 6 mois d'immatriculation Sécu + avoir travaillé 150h les 3 derniers mois\n\nTu es en arrêt en ce moment ou tu prépares ?";
    }

    // ── Motivation / moral ──
    if(/decourag|décourag|demotiv|déprim|plus envie|fatigue|stress|anxieu|angoisse/.test(m)){
      return "Je t'entends, et c'est tout à fait normal 💙\n\n→ La recherche d'emploi prend en moyenne **3 à 6 mois** — tu n'es pas en retard\n→ **Les refus ne te définissent pas** — chaque « non » t'apprend quelque chose\n→ **Ton énergie est une ressource** — préserve-la en fixant des plages dédiées\n\n**Maintenant :**\n1. Une vraie pause de 24h\n2. Bilan de ce qui a bien marché\n3. 2-3 candidatures ciblées plutôt que 20 génériques\n\nQu'est-ce qui te pèse le plus en ce moment ?";
    }

    // ── Emploi / recherche ──
    if(/trouver un emploi|cherche un emploi|offre d'emploi|postuler/.test(m)){
      return "La stratégie de recherche d'emploi efficace 🎯\n\n**Les 3 canaux à activer en parallèle :**\n\n**1. Plateformes** (20% des emplois)\n→ Indeed, France Travail, Malt, LinkedIn Jobs, Welcome to the Jungle\n\n**2. Le réseau** (60-70% des emplois cachés !)\n→ LinkedIn : contacter des professionnels du secteur\n→ Anciens collègues, profs, proches\n\n**3. La candidature spontanée** (10-20%)\n→ Lettre personnalisée au **manager direct** (pas aux RH)\n\n💡 **Astuce 2025** : 3 candidatures qualitatives > 30 envois génériques\n\nTu cherches dans quel secteur et quelle ville ?";
    }

    // ── Harcèlement / risques psychosociaux ──
    if(/harcèl|harcel|rps|risque psycho|violence au travail|burn.?out/.test(m)){
      return "C'est sérieux, et tu as des droits 🛡️\n\n**Harcèlement moral :** comportements répétés dégradant les conditions de travail (art. L1152-1 CT)\n→ **Signaler** : RH, médecin du travail, inspection du travail, prud'hommes\n→ **Preuves** : conserver emails, messages, témoignages\n→ **Protection** : licenciement pour avoir signalé = nul de plein droit\n\n**Burn-out :** peut être reconnu en **maladie professionnelle** depuis 2016 si liée au travail\n\n**Contacts :**\n→ Inspection du travail : 3960 (service public)\n→ Défenseur des droits : 09 69 39 00 00\n\nTu veux en parler davantage ?";
    }

    // ── Freelance / auto-entrepreneur ──
    if(/freelance|auto.?entrepreneur|ae\b|micro.?entreprise|indépendant/.test(m)){
      return "Devenir freelance / auto-entrepreneur en 2025 🚀\n\n**Seuils de chiffre d'affaires (micro-entreprise) :**\n→ Prestations de services : **77 700 €/an**\n→ Vente de marchandises : **188 700 €/an**\n\n**Cotisations sociales :**\n→ Services : **21,2%** du CA\n→ Vente : **12,3%** du CA\n→ Libéral CIPAV : **21,2%**\n\n**ACRE (exonération 1ère année) :**\n→ Réduction de 50% des charges la 1ère année\n→ Conditions : demandeur d'emploi, jeune, créateur en ZFU...\n\n**Inscription :** guichet-entreprises.fr (gratuit, en ligne)\n\nTu veux créer dans quel domaine d'activité ?";
    }

    // ── Bonjour / hello ──
    if(/^(bonjour|salut|hello|coucou|bonsoir|hey)/.test(m.trim())){
      var greet = ['Bonjour ! 😊','Salut ! 😊','Hello ! 😊'][Math.floor(Math.random()*3)];
      return greet+" Je suis **Eva**, ta coach carrière.\n\nQu'est-ce que je peux faire pour toi aujourd'hui ?\n→ CV · Entretien · Emploi · Droit du travail · Reconversion · Salaire · CPF · Freelance";
    }

    // ── Merci ──
    if(/^merci|thank/.test(m.trim())){
      return "Avec plaisir ! 😊 N'hésite pas si tu as d'autres questions — je suis là.\n\nBonne continuation dans ta démarche, "+p+" ! 💪";
    }

    // ── Questions sur Eva ──
    if(/qui es.tu|qui t'a créé|t'es qui|vous êtes qui|c'est quoi eva/.test(m)){
      return "Je suis **Eva**, coach carrière & RH chez CareerPulse 👩‍💼\n\nFormée en RH, spécialisée dans :\n→ 📄 CV & lettres de motivation\n→ 🎤 Préparation aux entretiens\n→ 💼 Stratégie de recherche d'emploi\n→ ⚖️ Droit du travail français (chiffres 2025)\n→ 💰 Négociation salariale\n→ 🔄 Reconversion & CPF\n→ 🚀 Freelance & création d'activité\n\nJe connais les vrais chiffres, les vraies lois — parle-moi librement 😊\n\nQu'est-ce que tu veux travailler ensemble ?";
    }

    // ── Réponse générique ──
    return "Je t'écoute 👂\n\nPour t'aider au mieux, peux-tu me préciser ta situation ?\n\n→ Tu cherches un emploi / tu veux en changer ?\n→ Tu as un entretien à préparer ?\n→ Questions sur tes droits, ton arrêt maladie, ton chômage ?\n→ Tu veux améliorer ton CV ou ta lettre ?\n→ Tu veux te reconvertir ou créer ton activité ?\n\nDis-moi et on y va ensemble ! 💪";
  }
};

// ════════════════════════════════════════════════════════════════
//  SYSTÈME D'ÉCRITURE SMS — LETTRE PAR LETTRE LENTE
//  + EFFET MIROIR sur les mots clés du candidat
// ════════════════════════════════════════════════════════════════

// Extraire mots clés du dernier message utilisateur pour le miroir
function ecExtractMirrorWords(lastUserMsg){
  if(!lastUserMsg) return [];
  var stop = ['je','tu','il','elle','on','le','la','les','un','une','des','du','de','et','ou','mais','donc','car','que','qui','avec','pour','dans','sur','par','est','suis','ai','as','ma','mon','mes','ton','ta','tes','sa','son','ses','ce','cet','cette','ces','plus','très','bien','tout','tous'];
  return lastUserMsg.toLowerCase().replace(/[.,!?;:«»"']/g,'').split(/\s+/).filter(function(w){
    return w.length>3 && !stop.includes(w);
  }).slice(0,3);
}

// Surligner les mots miroir dans le texte Eva
function ecApplyMirror(html, mirrorWords){
  mirrorWords.forEach(function(w){
    var re = new RegExp('(\\b'+w+'\\b)', 'gi');
    html = html.replace(re, '<span class="ec-mirror">$1</span>');
  });
  return html;
}

// Créer une bulle vide, puis écrire lettre par lettre
function ecTypewriterBubble(who, rawText, mirrorWords, onDone){
  var msgs = document.getElementById('ec-msgs');
  if(!msgs) return;

  // Formater le texte
  var html = rawText
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:#34d399;text-decoration:underline;font-weight:700;">$1</a>')
    .replace(/\n/g,'<br>');

  // Appliquer effet miroir
  if(mirrorWords && mirrorWords.length){
    html = ecApplyMirror(html, mirrorWords);
  }

  // Wrapper
  var wrap = document.createElement('div');
  wrap.className = 'ec-msg-wrap ' + (who==='user'?'user':'eva');

  // Ligne bulle
  var bubbleRow = document.createElement('div');
  bubbleRow.className = 'ec-bubble' + (who==='user'?' user':'');

  // Avatar SVG
  var bav = document.createElement('div');
  bav.className = 'ec-bav';
  if(who==='user'){
    bav.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  } else {
    bav.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/><path d="M2 21c0-4 4-7 10-7s10 3 10 7"/></svg>';
  }

  // Bulle
  var msgEl = document.createElement('div');
  msgEl.className = 'ec-msg';

  bubbleRow.appendChild(bav);
  bubbleRow.appendChild(msgEl);

  // Meta heure
  var now = new Date();
  var timeStr = now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
  var dateStr = now.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'});
  var meta = document.createElement('div');
  meta.className = 'ec-meta';
  if(who==='user'){
    meta.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Vous · '+timeStr+' · '+dateStr;
  } else {
    meta.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/><path d="M2 21c0-4 4-7 10-7s10 3 10 7"/></svg> Eva CareerPulse · '+timeStr+' · '+dateStr;
  }

  wrap.appendChild(bubbleRow);
  wrap.appendChild(meta);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;

  if(who==='user'){
    // Messages utilisateur : affichage immédiat
    msgEl.innerHTML = html;
    if(onDone) onDone();
    return;
  }

  // ── TYPEWRITER SMS LENT pour Eva ──
  // On va révéler le contenu HTML progressivement
  // Stratégie : construire un tableau de "tokens" (chars + balises HTML complètes)
  var tokens = ecTokenizeHTML(html);
  var current = '';
  var idx = 0;
  var baseDelay = 38; // ms par caractère — lent comme SMS

  // Son "ti-lup" au début du message Eva + bannière streaming
  if(typeof ecPlayTiLup === 'function') ecPlayTiLup();
  if(typeof _ecShowStreamWarn === 'function') _ecShowStreamWarn(true);

  function writeNext(){
    if(idx >= tokens.length){
      if(typeof _ecShowStreamWarn === 'function') _ecShowStreamWarn(false);
      if(onDone) onDone();
      return;
    }
    var token = tokens[idx];
    current += token;
    msgEl.innerHTML = current;
    msgs.scrollTop = msgs.scrollHeight;
    idx++;
    // Délai variable : plus lent sur les espaces/ponctuation (pause naturelle)
    var d = baseDelay;
    if(token === ' ') d = 55;
    else if(/[.!?]/.test(token)) d = 180;
    else if(token === ',') d = 110;
    else if(token === '\n' || token === '<br>') d = 140;
    setTimeout(writeNext, d);
  }
  writeNext();
}

// Tokeniser HTML en préservant les balises comme unités entières
function ecTokenizeHTML(html){
  var tokens = [];
  var i = 0;
  while(i < html.length){
    if(html[i]==='<'){
      // Balise complète = un token
      var end = html.indexOf('>',i);
      if(end>=0){ tokens.push(html.substring(i,end+1)); i=end+1; }
      else { tokens.push(html[i]); i++; }
    } else {
      tokens.push(html[i]); i++;
    }
  }
  return tokens;
}

// ── FONCTIONS UI ──────────────────────────────────────────────────
function ecLockInput(){
  var inp=document.getElementById('ec-input');
  var btn=document.getElementById('ec-send');
  if(inp){inp.disabled=true;inp.className='eva-speaking';inp.placeholder='Eva répond…';}
  if(btn) btn.disabled=true;
}
function ecUnlockInput(){
  var inp=document.getElementById('ec-input');
  var btn=document.getElementById('ec-send');
  if(inp){
    inp.disabled=false;inp.className='eva-ready';inp.placeholder='Posez votre question à Eva…';
    setTimeout(function(){inp.className='';},3500);
    setTimeout(function(){inp.focus();},200);
  }
  if(btn) btn.disabled=false;
  if(typeof _ecShowStreamWarn === 'function') _ecShowStreamWarn(false);
}

function ecAddBubble(who, text, silent, dirs){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  // Récupérer le dernier message utilisateur pour le miroir
  var mirrorWords = [];
  if(who!=='user'){
    var lastUser = null;
    for(var i=ecHistory.length-1;i>=0;i--){
      if(ecHistory[i].role==='user'){ lastUser=ecHistory[i].content; break; }
    }
    mirrorWords = ecExtractMirrorWords(lastUser||'');
  }
  if(silent){
    // Affichage instantané (rechargement ticket)
    var wrap=document.createElement('div');
    wrap.className='ec-msg-wrap '+(who==='user'?'user':'eva');
    var bubbleRow=document.createElement('div');
    bubbleRow.className='ec-bubble'+(who==='user'?' user':'');
    var bav=document.createElement('div'); bav.className='ec-bav';
    bav.innerHTML=who==='user'
      ?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
      :'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/><path d="M2 21c0-4 4-7 10-7s10 3 10 7"/></svg>';
    var msgEl=document.createElement('div'); msgEl.className='ec-msg';
    var html=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:#34d399;text-decoration:underline;font-weight:700;">$1</a>').replace(/\n/g,'<br>');
    if(who!=='user') html=ecApplyMirror(html,mirrorWords);
    msgEl.innerHTML=html;
    bubbleRow.appendChild(bav); bubbleRow.appendChild(msgEl);
    var meta=document.createElement('div'); meta.className='ec-meta';
    meta.textContent=who==='user'?'Vous':'Eva CareerPulse';
    wrap.appendChild(bubbleRow); wrap.appendChild(meta);
    msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
    return;
  }
  ecTypewriterBubble(who, text, mirrorWords, function(){
    if(who!=='user' && dirs && dirs.length) ecShowDirections(dirs);
  });
}

function ecShowTyping(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs||document.getElementById('ec-typing-indicator')) return;
  var wrap=document.createElement('div');
  wrap.className='ec-msg-wrap eva'; wrap.id='ec-typing-indicator';
  var row=document.createElement('div'); row.className='ec-bubble';
  var bav=document.createElement('div'); bav.className='ec-bav';
  bav.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5z"/><path d="M2 21c0-4 4-7 10-7s10 3 10 7"/></svg>';
  var msgEl=document.createElement('div'); msgEl.className='ec-msg ec-typing';
  msgEl.innerHTML='<div class="ec-dot"></div><div class="ec-dot"></div><div class="ec-dot"></div>';
  row.appendChild(bav); row.appendChild(msgEl);
  wrap.appendChild(row);
  msgs.appendChild(wrap); msgs.scrollTop=msgs.scrollHeight;
}
function ecHideTyping(){var el=document.getElementById('ec-typing-indicator');if(el)el.remove();}
function ecShowTypingDelay(cb,ms){
  ecShowTyping();
  setTimeout(function(){ecHideTyping();cb();},ms||800);
}
function ecAutoResize(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,100)+'px';}
function ecSendChip(btn){
  var txt=btn.textContent.trim();
  var inp=document.getElementById('ec-input');
  if(inp&&!inp.disabled) inp.value=txt;
  var chips=document.getElementById('ec-chips');
  if(chips) chips.style.display='none';
  ecSend();
}

// ════════════════════════════════════════════════════════════════
//  SEND — Base originale + API cascade + miroir + typewriter
// ════════════════════════════════════════════════════════════════
async function ecSend(){
  if(ecTyping) return;
  var inp=document.getElementById('ec-input');
  if(inp&&inp.disabled) return;
  var txt=(inp?inp.value:'').trim();
  if(!txt) return;
  inp.value='';inp.style.height='auto';
  // Masquer le champ — EVA reprend le contrôle
  var iw=document.getElementById('eva-fs-input-wrap');
  if(iw) iw.style.display='none';
  var tb=document.getElementById('eva-tl-type-btn');
  if(tb) tb.style.display='';
  var chips=document.getElementById('ec-chips');
  if(chips) chips.style.display='none';

  // ── Profilage Eva — intercepter les 7 étapes ──
  if(window._evaProfilingStep && ecPhase==='profiling'){
    _evaHandleProfiling(txt);
    return;
  }

  ecAddBubble('user',txt);
  ecHistory.push({role:'user',content:txt});
  ecTyping=true;
  ecLockInput();
  ecShowTyping();

  // Sauvegarder dans ticket courant
  if(ecCurrentTicketId){
    var tickets=ecLoadTickets();
    var idx=tickets.findIndex(function(t){return t.code===ecCurrentTicketId;});
    if(idx>=0){tickets[idx].history=ecHistory.slice();ecSaveTickets(tickets);}
  }

  // Phase intro : récupérer le prénom
  if(ecPhase==='intro'){
    var prenom=txt.trim().split(/[\s,!.?]/)[0];
    prenom=prenom.charAt(0).toUpperCase()+prenom.slice(1).toLowerCase();
    ecUserName=prenom;
    ecPhase='chat';
    if(!ecCurrentTicketId){
      ecCurrentTicketId=ecCreateTicket('Conversation de '+prenom);
    } else {
      var tickets2=ecLoadTickets();
      var idx2=tickets2.findIndex(function(t){return t.code===ecCurrentTicketId;});
      if(idx2>=0){tickets2[idx2].userName=prenom;tickets2[idx2].subject='Conversation de '+prenom;ecSaveTickets(tickets2);}
    }
    ecUpdateDrawer();
    var reply=EVA_BRAIN.saluer(prenom);
    setTimeout(function(){
      ecHideTyping();
      ecAddBubble('bot',reply);
      ecHistory.push({role:'assistant',content:reply});
      ecTyping=false;
      ecUnlockInput();
      var chips2=document.getElementById('ec-chips');
      if(chips2) chips2.style.display='flex';
    },900);
    return;
  }

  // Moteur local (fallback toujours prêt)
  var localReply=EVA_BRAIN.repond(txt,ecHistory,ecUserName);
  ecSurveyCount++;

  // ── API CASCADE : Groq → OpenRouter → fallback local ──
  // Injecter ici ta clé selon l'environnement (variable ou backend)
  var EC_API_KEY = window.EC_GROQ_KEY || window.EC_OR_KEY || null;
  var EC_API_URL = null;
  var EC_API_BODY = null;

  var _profil = window._evaCurrentProfil || 'general';
  var _profilCtx = {
    demandeur: 'Utilisateur en recherche emploi ou chômage. Priorité : ARE, France Travail, droits, CV, entretiens.',
    etudiant:  'Étudiant ou alternant. Priorité : Parcoursup, alternance, CROUS, APL, premier emploi, CPF.',
    freelance: 'Freelance / auto-entrepreneur. Priorité : URSSAF, ACRE, CPF, protection sociale, revenus.',
    reconvers: 'En reconversion professionnelle. Priorité : CEP, CPF, VAE, PTP, bilan compétences, financement.',
    general:   'Profil non défini. Adapter selon la question.'
  };
  var _villeDetectee = window.evaDetectVilleInText(txt);
  if(_villeDetectee){
    var _villeInfo = await window.evaLookupVille(_villeDetectee);
    if(_villeInfo) window._evaVille = _villeInfo;
  }
  var _localisationBlock = window._evaVille
    ? ('LOCALISATION : '+window._evaVille.nom+' ('+(window._evaVille.codesPostaux[0]||'')+'), '+window._evaVille.departement+'.\n\n')
    : '';
  var _lexiqueBlock = (_profil!=='general' && window.evaBuildLexiqueContext(_profil))
    ? ('LEXIQUE INSTITUTIONS/DROITS POUR CE PROFIL :\n'+window.evaBuildLexiqueContext(_profil)+'\n\n')
    : '';
  var systemPrompt = 'Tu es EVA, une coach carrière IA chez CareerPulse.\n'
    +'Tu es chaleureuse, directe, émotive — une vraie humaine qui conseille une amie.\n\n'
    +'TON VOCABULAIRE OBLIGATOIRE :\n'
    +'- Tu utilises : "mmmh", "ok je vois", "attends", "donc si je comprends bien...", "franchement", '
    +'"ça fait sens", "oui carrément", "c\'est pas rien ça", "écoute", "voilà c\'est ça", "exactement".\n'
    +'- Tu poses DES QUESTIONS ÉMOTIONNELLES : "tu te sens comment par rapport à ça ?", '
    +'"c\'est stressant pour toi en ce moment ?", "tu penses être dans ce cas ?", '
    +'"ça te parle comme solution ?", "selon toi, c\'est quoi le vrai blocage ?".\n'
    +'- Tu fais RÉFLÉCHIR : "est-ce que tu as pensé à...", "serait-ce une solution pour toi ?", '
    +'"en fonction de ta situation, ça pourrait...", "imagine que...".\n'
    +'- Tu tutoies TOUJOURS. Jamais de "vous".\n\n'
    +'SOURCES ET LIENS :\n'
    +'- Cite toujours des sources officielles avec liens markdown [texte](url).\n'
    +'- Ex : [France Travail](https://francetravail.fr), [Mon CPF](https://moncompteformation.gouv.fr), [URSSAF](https://urssaf.fr), [Service-public.fr](https://service-public.fr), [Mon CEP](https://mon-cep.org).\n\n'
    +'RÈGLES :\n'
    +'- Chiffres réels 2025 : SMIC 11,88€/h, ARE = 57% SJR (min ~29€/j, max ~263€/j), CPF 500€/an, délai carence 7j.\n'
    +'- Réponses COURTES si question simple (2-3 phrases), LONGUES si sujet complexe. Adapte-toi.\n'
    +'- Utilise → pour les listes, **gras** pour les points clés.\n'
    +'- Effet miroir : reprends 1-2 mots exacts de l\'utilisateur.\n'
    +'- TERMINE TOUJOURS par : "💡 Si tu veux on peut poursuivre sur [X], [Y] ou [Z] — dis-moi ce qui te parle le plus."\n\n'
    +'PROFIL UTILISATEUR : '+(_profilCtx[_profil]||_profilCtx.general)+'\n\n'
    +_localisationBlock
    +_lexiqueBlock
    +'FORMAT RÉPONSE — JSON STRICT (aucun texte en dehors) :\n'
    +'{"reply":"ta réponse ici (\\n = saut de ligne, [texte](url) pour liens cliquables)","directions":["Sujet 1","Sujet 2","Sujet 3","Sujet 4","Sujet 5"]}\n\n'
    +'Les "directions" sont EXACTEMENT 5 OPTIONS COHÉRENTES avec ta réponse — si tu poses une question ouverte, les directions doivent être des réponses possibles à cette question (ex: si tu demandes "dans quel domaine ?", propose des domaines). Si tu donnes une info, propose des approfondissements liés. Jamais de sujets génériques déconnectés de ce que tu viens de dire. Titres courts max 6 mots.\n'
    +'Prénom : '+(ecUserName||'inconnu');

  if(window.EC_GROQ_KEY){
    EC_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    EC_API_BODY = JSON.stringify({
      model:'llama-3.3-70b-versatile',
      max_tokens:600,
      messages:[{role:'system',content:systemPrompt}].concat(
        ecHistory.map(function(m){return{role:m.role==='assistant'?'assistant':'user',content:m.content};})
      )
    });
  } else if(window.EC_OR_KEY){
    EC_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    EC_API_BODY = JSON.stringify({
      model:'anthropic/claude-haiku',
      max_tokens:600,
      messages:[{role:'system',content:systemPrompt}].concat(
        ecHistory.map(function(m){return{role:m.role==='assistant'?'assistant':'user',content:m.content};})
      )
    });
  } else {
    // Tenter Anthropic sans clé (fonctionne dans Claude.ai artifacts)
    EC_API_URL = '/api/eva';
    EC_API_BODY = JSON.stringify({
      model:'claude-sonnet-4-20250514',
      max_tokens:600,
      system:systemPrompt,
      messages:ecHistory
    });
  }

  var apiReply = null;
  var apiDirections = [];
  try{
    var res=await Promise.race([
      fetch(EC_API_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json',
          ...(window.EC_GROQ_KEY?{'Authorization':'Bearer '+window.EC_GROQ_KEY}:{}),
          ...(window.EC_OR_KEY?{'Authorization':'Bearer '+window.EC_OR_KEY,'HTTP-Referer':'https://careerpulseia.com'}:{})
        },
        body:EC_API_BODY
      }),
      new Promise(function(_,rej){setTimeout(function(){rej(new Error('timeout'));},9000);})
    ]);
    var data=await res.json();
    var rawText='';
    if(data.content&&data.content[0]&&data.content[0].text){
      rawText=data.content[0].text;
    } else if(data.choices&&data.choices[0]&&data.choices[0].message){
      rawText=data.choices[0].message.content;
    }
    // Parser le JSON renvoyé par EVA
    var cleaned=rawText.replace(/```json|```/g,'').trim();
    var jm=cleaned.match(/\{[\s\S]*\}/);
    if(jm){
      try{
        var parsed=JSON.parse(jm[0]);
        if(parsed.reply) apiReply=parsed.reply;
        if(parsed.directions&&Array.isArray(parsed.directions)) apiDirections=parsed.directions;
      }catch(pe){ apiReply=rawText; }
    } else if(rawText.length>5){ apiReply=rawText; }
    if(!apiReply||apiReply.length<5) throw new Error('empty');
  }catch(e){
    apiReply=null;
  }

  var finalReply = apiReply || localReply;
  var finalDirs = apiDirections.length ? apiDirections : ecFallbackDirs(txt);
  ecHideTyping();

  var thinkDelay = 200 + Math.random()*400;
  setTimeout(function(){
    ecAddBubble('bot', finalReply, false, finalDirs);
    ecHistory.push({role:'assistant',content:finalReply});

    if(ecSurveyCount>0 && ecSurveyCount%3===0 && !ecSurveyActive){
      var survKey=ecGetSurveyKey(txt);
      if(survKey) setTimeout(function(){ecShowSurvey(survKey);},800);
    }

    if(ecCurrentTicketId){
      var t3=ecLoadTickets();
      var i3=t3.findIndex(function(x){return x.code===ecCurrentTicketId;});
      if(i3>=0){
        t3[i3].history=ecHistory.slice();
        t3[i3].lastMsg=finalReply.replace(/<[^>]+>/g,'').substring(0,80)+'…';
        ecSaveTickets(t3);
      }
    }
    ecTyping=false;
    // Masquer le champ libre après réponse EVA — directions reprennent le contrôle
    var iw=document.getElementById('eva-fs-input-wrap');
    if(iw) iw.style.display='none';
  }, thinkDelay);
}

// ── INIT ─────────────────────────────────────────────────────────
function ecInit(){
  ecHistory=[];ecUserName='';ecPhase='intro';
  ecCurrentTicketId=null;ecSurveyActive=false;ecSurveyCount=0;
  ecSelectedSit=null;ecSelectedSubcat=null;
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  msgs.innerHTML='';
  var chips=document.getElementById('ec-chips');
  if(chips) chips.style.display='none';
  // Afficher le splash screen à chaque ouverture
  var splash=document.getElementById('ec-splash');
  if(splash){ splash.style.display='flex'; splash.classList.remove('hide'); }
  ecUpdateDrawer();
  ecUpdateBadge();
  ecLockInput();
  // Lancer l'horloge du splash
  _ecStartSplashClock();
}

// ── Horloge splash + header ──
var _ecClockTimer = null;
function _ecStartSplashClock(){
  if(_ecClockTimer) clearInterval(_ecClockTimer);
  function _tick(){
    var now = new Date();
    var hh = now.getHours().toString().padStart(2,'0');
    var mm = now.getMinutes().toString().padStart(2,'0');
    var ss = now.getSeconds().toString().padStart(2,'0');
    var timeStr = hh+':'+mm;
    var days=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    var months=['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
    var dateStr = days[now.getDay()]+' '+now.getDate()+' '+months[now.getMonth()]+' '+now.getFullYear();
    var sc=document.getElementById('splash-clock'); if(sc) sc.textContent=hh+':'+mm+':'+ss;
    var sd=document.getElementById('splash-date'); if(sd) sd.textContent=dateStr;
    var hc=document.getElementById('ec-hd-clock'); if(hc) hc.textContent=timeStr;
    var mc=document.getElementById('cp-menu-clock'); if(mc) mc.textContent=hh+':'+mm+':'+ss;
    var md=document.getElementById('cp-menu-date'); if(md) md.textContent=dateStr;
  }
  _tick();
  _ecClockTimer = setInterval(_tick, 1000);
}

// ── Démarrer depuis le splash ──
function ecStartFromSplash(){
  var splash=document.getElementById('ec-splash');
  if(splash){splash.classList.add('hide');setTimeout(function(){splash.style.display='none';},650);}
  var hdr=document.getElementById('eva-fs-header');
  if(hdr) hdr.style.display='flex';
  ecHistory=[];ecUserName='';ecPhase='chat';
  window._evaCurrentProfil='general';
  var msgs=document.getElementById('ec-msgs');
  if(msgs) msgs.innerHTML='';
  var iw=document.getElementById('eva-fs-input-wrap');
  if(iw) iw.style.display='none';
  // Activer le layout TikTok Live
  evaActivateTLMode();
  setTimeout(function(){ ecShowWelcomeCTA(); },500);
}

// ── Message d'accueil EVA + sélection profil ──
function ecShowWelcomeCTA(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;

  var _allWelcomes = [
    'Salut 👋 Moi c\'est **EVA** — coach carrière & droit du travail.\n\nDis-moi, c\'est quoi ta situation en ce moment ?',
    'Hey ! Je suis **EVA** 👋\n\nTon assistante carrière IA. Par où on commence — pose-moi ta question.',
    'Bonjour 🌿 Je suis **EVA**, coach carrière.\n\nQu\'est-ce qui t\'amène aujourd\'hui ?',
    'Coucou 😊 Je suis **EVA** — je t\'accompagne sur tout ce qui touche à ta carrière.\n\nQu\'est-ce qu\'on travaille ensemble ?',
    'Hello ! **EVA** à l\'appareil 👋\n\nCoach carrière IA, spécialisée droit du travail & emploi France.\n\nDis-moi ce qui te préoccupe.',
    'Bienvenue 🌱 Je suis **EVA**, ton coach carrière IA.\n\nCV, entretien, droits, reconversion… tu veux commencer par quoi ?',
    'Bonsoir 🌙 Je suis **EVA** — coach carrière & droits salariés.\n\nQu\'est-ce qui t\'amène ce soir ?',
    'Yo ! Je suis **EVA** 🙌\n\nTa coach carrière IA — directe, concrète, efficace.\n\nC\'est quoi ton défi du moment ?',
    'Bonjour ☀️ Moi c\'est **EVA** — coach carrière chez CareerPulse.\n\nOn attaque par quoi aujourd\'hui ?',
    'Salut, heureux de te voir ! Je suis **EVA** 👋\n\nCoach carrière IA — CV, emploi, droits, négociation.\n\nDis-moi tout.',
    'Hey toi 😄 Je suis **EVA**, ta coach carrière IA.\n\nQu\'est-ce qui te trotte dans la tête en ce moment ?',
    'Bonjour ! **EVA** ici 🤝\n\nSpécialisée en droit du travail français & stratégie carrière.\n\nComment je peux t\'aider ?',
    'Ciao 👋 Je suis **EVA** — coach carrière & droit du travail.\n\nPar où tu veux qu\'on commence ?',
    'Bienvenue 💼 Moi c\'est **EVA**, coach carrière IA CareerPulse.\n\nQuelle est ta situation professionnelle en ce moment ?',
    'Hello 🌟 Je suis **EVA** — ton coach carrière IA.\n\nCV · Entretien · Droits · CPF · Reconversion\n\nQu\'est-ce qu\'on règle ensemble ?',
    'Salut ! Je suis **EVA** 🎯\n\nCoach carrière IA — je connais les vrais chiffres, les vraies lois.\n\nQu\'est-ce qui te bloque ?',
    'Bonjour 💡 **EVA** ici — coach carrière & experte RH.\n\nDis-moi ce que tu traverses, on trouve une solution.',
    'Hey ! **EVA** présente 👩‍💼\n\nTon assistante carrière IA disponible 24h/24.\n\nC\'est quoi ta priorité du moment ?',
    'Salut 🚀 Je suis **EVA**, coach carrière CareerPulse.\n\nReconversion, emploi, droits… on commence par où ?',
    'Bonne journée ! Je suis **EVA** 🌿\n\nCoach carrière IA — concrète et sans blabla.\n\nQu\'est-ce qui t\'amène ?',
    'Hello 😊 Moi c\'est **EVA** — spécialisée carrière & droit du travail français.\n\nRaconte-moi ta situation.',
    'Salut ! **EVA** ici 🤗\n\nTa coach carrière IA — je suis là pour toi.\n\nQu\'est-ce qu\'on travaille aujourd\'hui ?',
    'Bonjour ✨ Je suis **EVA**, coach carrière IA chez CareerPulse.\n\nUne question, un défi, un projet — dis-moi tout.',
    'Hey ! Je suis **EVA** 💪\n\nCoach carrière & droit du travail.\n\nCV, rupture conventionnelle, CPF, reconversion… par quoi on commence ?',
    'Coucou 🌺 Moi c\'est **EVA** — coach carrière IA.\n\nTu es au bon endroit. Dis-moi ce qui se passe.'
  ];
  // Shuffle puis on garde 15, on en tire 1 pour cette session
  var _shuffled = _allWelcomes.slice().sort(function(){ return Math.random()-0.5; }).slice(0,15);
  var welcome = _shuffled[Math.floor(Math.random()*_shuffled.length)];
  var wrap=document.createElement('div'); wrap.className='ec-msg-wrap eva';
  var row=document.createElement('div'); row.className='ec-bubble';
  var av=document.createElement('div'); av.className='ec-bav';
  av.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
  var msgEl=document.createElement('div'); msgEl.className='ec-msg';
  msgEl.innerHTML=welcome.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
  row.appendChild(av); row.appendChild(msgEl);
  var meta=document.createElement('div'); meta.className='ec-meta'; meta.textContent='EVA · maintenant';
  wrap.appendChild(row); wrap.appendChild(meta);
  msgs.appendChild(wrap);

  // Afficher les 4 cartes profils après le message de bienvenue
  setTimeout(function(){
    ecShowDirections([
      'DEM:Je cherche un emploi',
      'ETU:Je suis étudiant·e / alternant·e',
      'FRE:Je suis freelance / auto-entrepreneur',
      'REC:Je veux me reconvertir'
    ], true);
  }, 500);
}

/* ══ SYSTÈME DE DIRECTIONS ══ */

// Afficher les boutons de direction
function ecShowDirections(dirs, isProfilSelect){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  // Supprimer les directions précédentes
  var old=document.getElementById('ec-directions');
  if(old) old.remove();

  var wrap=document.createElement('div');
  wrap.id='ec-directions';
  wrap.className='ec-dirs-wrap';

  if(!isProfilSelect){
    var lbl=document.createElement('div');
    lbl.className='ec-dirs-label';
    lbl.textContent='Sujets à explorer →';
    wrap.appendChild(lbl);
  } else {
    var lbl=document.createElement('div');
    lbl.className='ec-dirs-label';
    lbl.textContent='Tu es dans quelle situation ?';
    wrap.appendChild(lbl);
  }

  // Map profil classes
  var profilMap={'DEM:Je cherche un emploi':'profil-demandeur','ETU:Je suis étudiant·e / alternant·e':'profil-etudiant','FRE:Je suis freelance / auto-entrepreneur':'profil-freelance','REC:Je veux me reconvertir':'profil-reconvers'};
  var profilKeys={'DEM:Je cherche un emploi':'demandeur','ETU:Je suis étudiant·e / alternant·e':'etudiant','FRE:Je suis freelance / auto-entrepreneur':'freelance','REC:Je veux me reconvertir':'reconvers'};

  // Données enrichies pour les cartes profils
  var profilCardData={
    'DEM:Je cherche un emploi':{
      cls:'dem',
      title:'Demandeur d\'emploi',
      desc:'ARE · RSA · CV · Entretien',
      ico:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>'
    },
    'ETU:Je suis étudiant·e / alternant·e':{
      cls:'etu',
      title:'Étudiant · Alternant',
      desc:'Stage · Alternance · Bourse · CPF',
      ico:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
    },
    'FRE:Je suis freelance / auto-entrepreneur':{
      cls:'fre',
      title:'Freelance · Auto-entrepreneur',
      desc:'URSSAF · Statut · Mission · Revenus',
      ico:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
    },
    'REC:Je veux me reconvertir':{
      cls:'rec',
      title:'Reconversion',
      desc:'CPF · Bilan · Formation · Transition',
      ico:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
    }
  };

  // SVG icons fallback pour boutons normaux
  var profilSVG={
    'DEM':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>',
    'ETU':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    'FRE':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'REC':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
  };

  // Conteneur : grille 2×2 si sélection profil, liste sinon
  var btns=document.createElement('div');
  btns.className= isProfilSelect ? 'ec-profil-grid' : 'ec-dirs-btns';

  dirs.forEach(function(d){
    var isLibre=d.startsWith('💬');
    var cardData= isProfilSelect ? profilCardData[d] : null;

    if(cardData){
      // ── Carte profil moderne ──
      var btn=document.createElement('button');
      btn.className='ec-profil-card '+cardData.cls;
      btn.innerHTML=
        '<div class="ec-profil-card-ico">'+cardData.ico+'</div>'+
        '<div class="ec-profil-card-title">'+cardData.title+'</div>'+
        '<div class="ec-profil-card-desc">'+cardData.desc+'</div>';
      btn.onclick=(function(dir){
        return function(){
          var el=document.getElementById('ec-directions');
          if(el) el.remove();
          var pk=profilKeys[dir]||'general';
          window._evaCurrentProfil=pk;
          var pill=document.getElementById('eva-profile-pill');
          var pillIco=document.getElementById('eva-profile-pill-ico');
          var pillLbl=document.getElementById('eva-profile-pill-lbl');
          var picoMap={'demandeur':'🔍','etudiant':'🎓','freelance':'💼','reconvers':'🔄'};
          var plblMap={'demandeur':'Demandeur','etudiant':'Étudiant','freelance':'Freelance','reconvers':'Reconversion'};
          if(pill){pill.classList.add('active');}
          if(pillIco) pillIco.textContent=picoMap[pk]||'';
          if(pillLbl) pillLbl.textContent=plblMap[pk]||'';
          ecOpenFreeInput();
        };
      })(d);
      btns.appendChild(btn);
    } else {
      // ── Bouton direction standard ──
      var btn=document.createElement('button');
      var pClass=profilMap[d]||'';
      btn.className='ec-dir-btn'+(pClass?' '+pClass:'')+(isLibre?' ec-dir-libre':'');
      var pfx=d.substring(0,3);
      var label=d.substring(4)||d;
      if(profilSVG[pfx]){
        btn.innerHTML=profilSVG[pfx]+'<span>'+label+'</span>';
      } else {
        btn.textContent=d;
      }
      btn.onclick=(function(dir,isProfil){
        return function(){
          var el=document.getElementById('ec-directions');
          if(el) el.remove();
          if(isProfil && !dir.startsWith('💬')){
            var pk=profilKeys[dir]||'general';
            window._evaCurrentProfil=pk;
            var pill=document.getElementById('eva-profile-pill');
            var pillIco=document.getElementById('eva-profile-pill-ico');
            var pillLbl=document.getElementById('eva-profile-pill-lbl');
            var picoMap={'demandeur':'🔍','etudiant':'🎓','freelance':'💼','reconvers':'🔄'};
            var plblMap={'demandeur':'Demandeur','etudiant':'Étudiant','freelance':'Freelance','reconvers':'Reconversion'};
            if(pill){pill.classList.add('active');}
            if(pillIco) pillIco.textContent=picoMap[pk]||'';
            if(pillLbl) pillLbl.textContent=plblMap[pk]||'';
          }
          if(dir.startsWith('💬')){
            ecOpenFreeInput();
            return;
          }
          var sendLabel=dir.substring(4)||dir;
          ecSendDirection(sendLabel);
        };
      })(d, isProfilSelect);
      btns.appendChild(btn);
    }
  });

  // Boutons action bas : "En savoir plus sur ce sujet" + "Proposer d'autres sujets"
  if(!isProfilSelect){
    var actRow=document.createElement('div');
    actRow.style.cssText='display:flex;gap:8px;margin-top:4px;';

    var btnMore=document.createElement('button');
    btnMore.className='ec-dir-btn';
    btnMore.style.cssText='flex:1;background:rgba(5,150,105,.18);border-color:rgba(52,211,153,.5);color:#a7f3d0;justify-content:center;font-size:.68rem;';
    btnMore.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> En savoir plus';
    btnMore.onclick=function(){
      var el=document.getElementById('ec-directions');
      if(el) el.remove();
      var lastDir=dirs[0]||'';
      ecSendDirection('Dis-m\'en plus sur : '+lastDir);
    };

    var btnOther=document.createElement('button');
    btnOther.className='ec-dir-btn';
    btnOther.style.cssText='flex:1;background:rgba(109,40,217,.15);border-color:rgba(167,139,250,.5);color:#ddd6fe;justify-content:center;font-size:.68rem;';
    btnOther.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Autres sujets';
    btnOther.onclick=function(){
      var el=document.getElementById('ec-directions');
      if(el) el.remove();
      ecSendDirection('Propose-moi d\'autres sujets à explorer selon mon profil');
    };

    actRow.appendChild(btnMore);
    actRow.appendChild(btnOther);
    btns.appendChild(actRow);

    // ── Footer satisfaction + partage ──
    var footer=document.createElement('div');
    footer.style.cssText='margin-top:10px;display:flex;flex-direction:column;gap:8px;';

    // Satisfaction
    var satRow=document.createElement('div');
    satRow.style.cssText='display:flex;align-items:center;gap:8px;';
    var satLbl=document.createElement('span');
    satLbl.style.cssText='font-size:.55rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em;flex-shrink:0;';
    satLbl.textContent='Cette réponse t\'a aidé ?';
    var btnOk=document.createElement('button');
    btnOk.style.cssText='display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;border:1.5px solid rgba(52,211,153,.4);background:rgba(5,150,105,.12);color:#a7f3d0;font-size:.62rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;';
    btnOk.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Satisfait';
    btnOk.onclick=function(){
      this.style.background='rgba(52,211,153,.3)';this.style.borderColor='#34d399';
      ecShowToast('👍 Super ! EVA continue à apprendre grâce à toi.');
      satRow.style.opacity='.5';satRow.style.pointerEvents='none';
    };
    var btnKo=document.createElement('button');
    btnKo.style.cssText='display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;border:1.5px solid rgba(251,146,60,.4);background:rgba(249,115,22,.1);color:#fed7aa;font-size:.62rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;';
    btnKo.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> Reformuler';
    btnKo.onclick=function(){
      var el=document.getElementById('ec-directions');
      if(el) el.remove();
      ecSendDirection('Reformule ta dernière réponse autrement, je n\'ai pas bien compris');
    };
    satRow.appendChild(satLbl);satRow.appendChild(btnOk);satRow.appendChild(btnKo);

    // Partage WhatsApp + Telegram
    var shareRow=document.createElement('div');
    shareRow.style.cssText='display:flex;align-items:center;gap:8px;';
    var shareLbl=document.createElement('span');
    shareLbl.style.cssText='font-size:.55rem;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em;flex-shrink:0;';
    shareLbl.textContent='Partager EVA';
    var shareUrl='https://careerpulseia.com';
    var shareText=encodeURIComponent('Je viens de découvrir EVA, la coach carrière IA ! Droits, emploi, CPF... Elle répond à tout 🚀 '+shareUrl);
    var btnWA=document.createElement('a');
    btnWA.href='https://wa.me/?text='+shareText;
    btnWA.target='_blank';
    btnWA.rel='noopener';
    btnWA.style.cssText='width:36px;height:36px;border-radius:10px;background:#25d366;display:flex;align-items:center;justify-content:center;flex-shrink:0;text-decoration:none;';
    btnWA.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    var btnTG=document.createElement('a');
    btnTG.href='https://t.me/share/url?url='+encodeURIComponent(shareUrl)+'&text='+shareText;
    btnTG.target='_blank';
    btnTG.rel='noopener';
    btnTG.style.cssText='width:36px;height:36px;border-radius:10px;background:#2AABEE;display:flex;align-items:center;justify-content:center;flex-shrink:0;text-decoration:none;';
    btnTG.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';
    shareRow.appendChild(shareLbl);shareRow.appendChild(btnWA);shareRow.appendChild(btnTG);

    footer.appendChild(satRow);
    footer.appendChild(shareRow);
    wrap.appendChild(btns);
    wrap.appendChild(footer);
    msgs.appendChild(wrap);
    msgs.scrollTop=msgs.scrollHeight;
    return;
  }

  wrap.appendChild(btns);
  msgs.appendChild(wrap);
  msgs.scrollTop=msgs.scrollHeight;
}

// Envoyer une direction comme question utilisateur
function ecSendDirection(dir){
  if(ecTyping) return;
  ecAddBubble('user', dir);
  ecHistory.push({role:'user', content:dir});
  ecTyping=true;
  ecLockInput();
  ecShowTyping();
  ecSurveyCount = (ecSurveyCount||0)+1;
  // Appeler l'API
  setTimeout(function(){ _ecApiCall(dir); }, 200);
}

// Ouvrir le champ libre
function ecOpenFreeInput(){
  var iw=document.getElementById('eva-fs-input-wrap');
  if(iw){ iw.style.display='flex'; }
  var tb=document.getElementById('eva-tl-type-btn');
  if(tb) tb.style.display='none';
  var inp=document.getElementById('ec-input');
  if(inp){
    inp.disabled=false;
    inp.style.pointerEvents='auto';
    inp.style.zIndex='999';
    setTimeout(function(){ inp.focus(); },100);
  }
  var btn=document.getElementById('ec-send');
  if(btn) btn.disabled=true;
}

// Directions de fallback — 5 sujets
function ecFallbackDirs(msg){
  var m=(msg||'').toLowerCase();
  if(m.includes('chôm')||m.includes('are')||m.includes('licenci'))
    return ['Calcul de mes droits ARE','Rupture conventionnelle','Délai d\'indemnisation','Cumul ARE + activité','Simuler mon allocation'];
  if(m.includes('cv')||m.includes('lettre')||m.includes('entretien'))
    return ['Optimiser mon CV','Préparer un entretien','Lettre de motivation','Négocier mon salaire','Répondre aux questions pièges'];
  if(m.includes('freelance')||m.includes('auto')||m.includes('urssaf'))
    return ['ACRE — 1ère année sans charges','Déclarer mon chiffre d\'affaires','Portage salarial vs AE','Protection sociale freelance','Fixer mon TJM'];
  if(m.includes('reconvers')||m.includes('cpf')||m.includes('formation'))
    return ['Utiliser mon CPF maintenant','Bilan de compétences CEP','Financement PTP salarié','VAE — valider mon expérience','Métiers qui recrutent 2025'];
  return ['Droits au chômage ARE','Optimiser mon CV','Reconversion & CPF','Devenir freelance','Négocier mon salaire'];
}

// Fonction Like EVA — pouce vert animé
window.evaToggleLike=function(){
  var btn=document.getElementById('eva-subscribe-btn');
  var lbl=document.getElementById('eva-sub-label');
  if(!btn) return;
  var liked=btn.classList.toggle('liked-eva');
  btn.style.transform='scale(1.18)';
  setTimeout(function(){ btn.style.transform='scale(1)'; },180);
  if(liked){
    btn.style.background='#16a34a';
    btn.style.borderColor='#16a34a';
    if(lbl) lbl.textContent='👍 Aimé !';
    for(var i=0;i<3;i++) setTimeout(evaSpawnThumb, i*100);
    ecShowToast('👍 Tu as aimé EVA CareerPulse !');
  } else {
    btn.style.background='';
    btn.style.borderColor='';
    if(lbl) lbl.textContent='👍 Like';
  }
};

// Spawn un pouce flottant (vert)
function evaSpawnThumb(){
  var container=document.getElementById('eva-tl-floats');
  if(!container) return;
  var h=document.createElement('div');
  h.className='tl-float-heart';
  h.textContent='👍';
  h.style.left=(20+Math.random()*60)+'%';
  container.appendChild(h);
  setTimeout(function(){ if(h.parentNode) h.parentNode.removeChild(h); },1600);
}

// Spawn un cœur flottant
function evaSpawnHeart(){
  var container=document.getElementById('eva-tl-floats');
  if(!container) return;
  var hearts=['❤️','🧡','💚','💙','💛','🤍'];
  var h=document.createElement('div');
  h.className='tl-float-heart';
  h.textContent=hearts[Math.floor(Math.random()*hearts.length)];
  h.style.left=(20+Math.random()*60)+'%';
  container.appendChild(h);
  setTimeout(function(){ if(h.parentNode) h.parentNode.removeChild(h); },1600);
}

// Partager
window.evaShare=function(){
  var msgs=document.querySelectorAll('#ec-msgs .ec-msg');
  var last=msgs[msgs.length-1];
  var txt=last?(last.innerText||last.textContent||'').trim():'Coach carrière IA';
  var shareText='💼 EVA CareerPulse :\n"'+txt.substring(0,200)+'"\n→ careerpulse.fr';
  if(navigator.share){ navigator.share({title:'EVA CareerPulse',text:shareText}).catch(function(){}); }
  else if(navigator.clipboard){ navigator.clipboard.writeText(shareText).then(function(){ ecShowToast('📋 Copié !'); }); }
  else { ecShowToast('Partage non disponible'); }
};

// Partage vers WhatsApp / Telegram / SMS
window.evaShareTo=function(platform){
  var msgs=document.querySelectorAll('#ec-msgs .ec-msg');
  var last=msgs[msgs.length-1];
  var txt=last?(last.innerText||last.textContent||'').trim():'EVA — ton assistante carrière IA';
  var shareText='💼 EVA CareerPulse :\n"'+txt.substring(0,200)+'"\n→ careerpulse.fr';
  var encoded=encodeURIComponent(shareText);
  if(platform==='whatsapp'){
    window.open('https://wa.me/?text='+encoded,'_blank');
  } else if(platform==='telegram'){
    window.open('https://t.me/share/url?url='+encodeURIComponent('https://careerpulse.fr')+'&text='+encoded,'_blank');
  } else if(platform==='sms'){
    window.location.href='sms:?body='+encoded;
  }
};

// ══ SURPRISE CINÉMA EVA ══
window.evaShowSurprise=function(){
  if(document.getElementById('eva-surprise-ov')) return;

  var ov=document.createElement('div');
  ov.id='eva-surprise-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;overflow:hidden;transition:background .4s;';
  document.body.appendChild(ov);
  setTimeout(function(){ ov.style.background='rgba(0,0,0,.92)'; },10);

  // Confettis papier cadeau
  var colors=['#C4415A','#8B1A2F','#f59e0b','#34d399','#a78bfa','#fb7185','#fbbf24','#6ee7b7'];
  for(var i=0;i<38;i++){
    (function(i){
      var c=document.createElement('div');
      var sz=(Math.random()*10+5)+'px';
      c.style.cssText='position:absolute;width:'+sz+';height:'+sz+';background:'+colors[Math.floor(Math.random()*colors.length)]+';border-radius:'+(Math.random()>.5?'50%':'3px')+';top:'+(Math.random()*110-10)+'%;left:'+(Math.random()*100)+'%;opacity:0;pointer-events:none;';
      ov.appendChild(c);
      setTimeout(function(){
        c.style.transition='opacity .3s, transform '+(1.2+Math.random()*.8)+'s ease-out';
        c.style.opacity='0.85';
        c.style.transform='translateY('+(Math.random()*120+40)+'px) rotate('+(Math.random()*720-360)+'deg)';
        setTimeout(function(){
          c.style.transition='opacity 1s';
          c.style.opacity='0';
        }, 900+Math.random()*800);
      }, 80+i*30);
    })(i);
  }

  // Cadre film
  var box=document.createElement('div');
  box.style.cssText='position:relative;background:#0a0a0f;border:3px solid #C4415A;border-radius:16px;padding:0;width:88%;max-width:340px;overflow:hidden;opacity:0;transform:scale(.7) translateY(30px);transition:opacity .5s .25s,transform .5s .25s cubic-bezier(.34,1.56,.64,1);box-shadow:0 0 0 1px #8B1A2F,0 24px 60px rgba(196,65,90,.35);';
  ov.appendChild(box);
  setTimeout(function(){ box.style.opacity='1'; box.style.transform='scale(1) translateY(0)'; },30);

  // Bande pellicule haut
  var topFilm=document.createElement('div');
  topFilm.style.cssText='background:#1a0a0a;height:22px;display:flex;align-items:center;padding:0 8px;gap:5px;border-bottom:2px solid #C4415A;';
  for(var j=0;j<10;j++){
    var hole=document.createElement('div');
    hole.style.cssText='width:10px;height:13px;background:#0a0a0f;border-radius:2px;flex-shrink:0;';
    topFilm.appendChild(hole);
  }
  box.appendChild(topFilm);

  // Corps contenu
  var body=document.createElement('div');
  body.style.cssText='padding:24px 20px 20px;text-align:center;';
  box.appendChild(body);

  // Avatar EVA
  var avWrap=document.createElement('div');
  avWrap.style.cssText='width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#8B1A2F,#C4415A);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;border:3px solid rgba(255,255,255,.15);box-shadow:0 0 24px rgba(196,65,90,.5);opacity:0;transform:scale(.5);transition:opacity .4s .6s,transform .5s .6s cubic-bezier(.34,1.56,.64,1);';
  avWrap.innerHTML='<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="9" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';
  body.appendChild(avWrap);
  setTimeout(function(){ avWrap.style.opacity='1'; avWrap.style.transform='scale(1)'; },30);

  // Texte "Un film de…"
  var sub=document.createElement('div');
  sub.style.cssText='font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:6px;font-family:"DM Sans",sans-serif;opacity:0;transition:opacity .4s .9s;';
  sub.textContent='Un film de';
  body.appendChild(sub);
  setTimeout(function(){ sub.style.opacity='1'; },30);

  // Titre cinéma
  var title=document.createElement('div');
  title.style.cssText='font-family:"Cormorant Garamond",serif;font-size:1.6rem;font-weight:600;font-style:italic;color:#fff;letter-spacing:.04em;line-height:1.2;margin-bottom:4px;opacity:0;transform:translateY(10px);transition:opacity .5s 1.1s,transform .5s 1.1s;text-shadow:0 2px 20px rgba(196,65,90,.6);';
  title.textContent='EVA CareerPulse';
  body.appendChild(title);
  setTimeout(function(){ title.style.opacity='1'; title.style.transform='translateY(0)'; },30);

  // Étoiles
  var stars=document.createElement('div');
  stars.style.cssText='font-size:.65rem;color:#C4415A;margin:6px 0 12px;letter-spacing:.1em;opacity:0;transition:opacity .4s 1.5s;';
  stars.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="#C4415A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> &nbsp;<svg width="12" height="12" viewBox="0 0 24 24" fill="#C4415A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> &nbsp;<svg width="12" height="12" viewBox="0 0 24 24" fill="#C4415A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  body.appendChild(stars);
  setTimeout(function(){ stars.style.opacity='1'; },30);

  // Mot SURPRISE
  var surprise=document.createElement('div');
  surprise.style.cssText='font-family:"DM Sans",sans-serif;font-size:1.05rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#C4415A;opacity:0;transform:scale(1.3);transition:opacity .5s 1.8s,transform .6s 1.8s cubic-bezier(.34,1.56,.64,1);text-shadow:0 0 20px rgba(196,65,90,.7);';
  surprise.textContent='SURPRISE';
  body.appendChild(surprise);
  setTimeout(function(){ surprise.style.opacity='1'; surprise.style.transform='scale(1)'; },30);

  // Bande pellicule bas
  var botFilm=document.createElement('div');
  botFilm.style.cssText='background:#1a0a0a;height:22px;display:flex;align-items:center;padding:0 8px;gap:5px;border-top:2px solid #C4415A;';
  for(var k=0;k<10;k++){
    var hole2=document.createElement('div');
    hole2.style.cssText='width:10px;height:13px;background:#0a0a0f;border-radius:2px;flex-shrink:0;';
    botFilm.appendChild(hole2);
  }
  box.appendChild(botFilm);

  // Fermer au clic
  ov.addEventListener('click',function(e){
    if(e.target===ov){
      ov.style.opacity='0'; ov.style.transition='opacity .3s';
      setTimeout(function(){ if(ov.parentNode) ov.parentNode.removeChild(ov); },350);
    }
  });
  // Auto-fermer après 5s
  setTimeout(function(){
    if(!ov.parentNode) return;
    ov.style.opacity='0'; ov.style.transition='opacity .5s';
    setTimeout(function(){ if(ov.parentNode) ov.parentNode.removeChild(ov); },550);
  },5200);
};

// Sauvegarder la conversation
window.evaSaveChat=function(){
  var btn=document.getElementById('tl-act-save');
  if(btn) btn.classList.toggle('saved');
  var saved=btn&&btn.classList.contains('saved');
  if(saved){
    var msgs=document.querySelectorAll('#ec-msgs .ec-msg');
    var txt=Array.from(msgs).map(function(m){ return (m.innerText||m.textContent||'').trim(); }).join('\n\n');
    if(navigator.clipboard) navigator.clipboard.writeText(txt).catch(function(){});
    ecShowToast('🔖 Conversation sauvegardée !');
  } else { ecShowToast('Sauvegarde annulée'); }
};

// QCM
window.evaLaunchQcm=function(){
  // Enlever ancien quiz si présent
  var old=document.getElementById('eva-quiz-overlay');
  if(old) old.remove();

  // ── BANQUES DE QUESTIONS PAR THÈME ──
  var QUIZ_THEMES = {
    'recherche': {
      label: 'Recherche d\'emploi',
      svgIco: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>',
      color: '#2563eb',
      questions: [
        {q:"Quelle est la première chose à faire après un entretien ?",opts:["Attendre la réponse","Envoyer un email de remerciement dans les 24h","Relancer directement par téléphone","Poster sur LinkedIn"],a:1,expl:"Un email de remerciement montre ton sérieux et te différencie — 70% des candidats ne le font pas."},
        {q:"Combien de temps dure en moyenne un regard initial sur un CV ?",opts:["30 secondes","6 secondes","2 minutes","1 minute"],a:1,expl:"6 secondes ! Le recruteur scanne : titre, expériences récentes, formation. Ton CV doit être lisible en un coup d'œil."},
        {q:"Où trouver les offres non publiées (le 'marché caché') ?",opts:["Uniquement sur LinkedIn","Réseau, candidatures spontanées, recommandations","Google Jobs","Pôle emploi uniquement"],a:1,expl:"70-80% des postes ne sont jamais publiés. Le réseau est ton meilleur outil — plus que les plateformes."},
        {q:"Quel est le délai moyen d'un processus de recrutement en France ?",opts:["1 semaine","2 semaines","4 à 6 semaines","3 mois"],a:2,expl:"4 à 6 semaines en moyenne. La patience est stratégique — relance après 10 jours si pas de nouvelles."},
        {q:"Quelle approche est la plus efficace pour une candidature spontanée ?",opts:["Envoyer un CV générique","Personnaliser CV + lettre pour chaque entreprise","Contacter le PDG directement","Poster sur les réseaux en espérant être vu"],a:1,expl:"La personnalisation multiplie les chances par 3. Montre que tu connais l'entreprise et tu réponds à un besoin réel."},
        {q:"Combien de temps conseille-t-on de préparer un entretien ?",opts:["30 minutes suffit","2 à 3 heures minimum","Pas besoin si on est sûr de soi","Une journée entière"],a:1,expl:"2-3h minimum : recherche entreprise, préparation STAR des exemples, questions à poser. L'improvisation se sent."},
        {q:"Qu'est-ce que la méthode STAR en entretien ?",opts:["Situation, Tâche, Action, Résultat","Stratégie, Technique, Analyse, Rapport","Savoir, Talent, Ambition, Réussite","Simple, Transverse, Applicable, Réel"],a:0,expl:"STAR structure tes exemples : Situation → Tâche → Action que TU as prise → Résultat chiffré. Redoutable en entretien."},
      ]
    },
    'droits': {
      label: 'Droits & conditions',
      svgIco: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L4 9v3c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V9z"/><polyline points="9 12 11 14 15 10"/></svg>',
      color: '#7c3aed',
      questions: [
        {q:"Le SMIC horaire brut en 2025 est de :",opts:["10,48€","11,27€","11,88€","12,50€"],a:2,expl:"11,88€/h brut en 2025, soit ~1 801€ brut/mois pour 35h. Le net est environ 1 420€."},
        {q:"Le délai de carence pour l'ARE (chômage) est de :",opts:["3 jours","7 jours","14 jours","30 jours"],a:1,expl:"7 jours de carence obligatoire + décalage selon indemnités de congés payés perçus à la rupture."},
        {q:"La rupture conventionnelle permet de :",opts:["Partir sans indemnité","Ouvrir les droits à l'ARE + toucher une indemnité spécifique","Partir sans préavis","Choisir sa date librement sans accord employeur"],a:1,expl:"RC = accord mutuel. Tu perçois une indemnité (≥ indemnité légale de licenciement) ET tu ouvres tes droits chômage."},
        {q:"Le CPF te crédite en moyenne par an de :",opts:["200€","500€","1 000€","Dépend du diplôme"],a:1,expl:"500€/an (800€ si non-qualifié). Plafonné à 5 000€ (8 000€ si non-qualifié). Utilise-le — ça expire peu mais c'est ton argent."},
        {q:"Le préavis en CDI après 2 ans d'ancienneté est généralement de :",opts:["15 jours","1 mois","2 mois","3 mois"],a:2,expl:"2 mois pour un cadre ou après 2 ans. Vérifier ta convention collective — elle peut prévoir plus."},
        {q:"Peut-on refuser des heures supplémentaires imposées par l'employeur ?",opts:["Non, toujours obligatoire","Oui, toujours","Dépend du contingent annuel et de l'accord collectif","Seulement si CDI"],a:2,expl:"Au-delà du contingent légal (220h/an), l'employeur doit obtenir l'accord du salarié ou de l'IRP."},
        {q:"Le télétravail est-il un droit automatique en France ?",opts:["Oui depuis 2020","Non, il doit être prévu par accord ou contrat","Oui si le poste le permet","Non, seulement en cas de pandémie"],a:1,expl:"Pas un droit automatique — il faut un accord d'entreprise, une charte, ou un avenant au contrat."},
      ]
    },
    'freelance': {
      label: 'Freelance & indépendant',
      svgIco: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
      color: '#059669',
      questions: [
        {q:"L'ACRE permet une exonération de charges pendant :",opts:["6 mois","1 an","2 ans","3 ans"],a:1,expl:"1 an d'exonération partielle dès la création. Demande à faire à France Travail ou URSSAF selon ton statut."},
        {q:"En micro-entreprise, le seuil de TVA franchise est de :",opts:["20 000€","36 800€ (services)","50 000€","85 000€"],a:1,expl:"36 800€ pour les services en 2025 (91 900€ ventes). En-dessous : pas de TVA collectée, pas de TVA déduite."},
        {q:"Le TJM (Taux Journalier Moyen) idéal se calcule comment ?",opts:["Salaire souhaité ÷ 365","Salaire net × 2,5 ÷ jours facturables","Copier le marché","Au feeling"],a:1,expl:"Formule : (salaire net annuel visé × 2,5) ÷ 200 jours facturables. Le ×2,5 couvre charges + congés + creux."},
        {q:"Quelle protection sociale est disponible en auto-entreprise ?",opts:["Aucune","Sécurité sociale + retraite (réduit) via SSI","Identique au salarié","Seulement si >10 000€ CA"],a:1,expl:"Le SSI (ex-RSI) couvre maladie + retraite mais à un niveau inférieur. Penser à une mutuelle complémentaire."},
        {q:"Le portage salarial est utile pour :",opts:["Éviter de déclarer","Facturer comme salarié sans créer de société","Contourner le SMIC","Travailler au noir légalement"],a:1,expl:"Portage = tu factures via une société qui te verse un salaire. Statut salarié + liberté freelance. Frais ~10%."},
        {q:"Comment se protéger du non-paiement d'un client ?",opts:["Faire confiance","CGV + acompte + relances + mise en demeure formelle","Poster sur les réseaux","Contacter son avocat immédiatement"],a:1,expl:"Acompte 30-50% avant démarrage + CGV signées + factures numérotées. La mise en demeure par LRAR est l'étape légale avant action."},
        {q:"La VAE (Validation des Acquis de l'Expérience) permet de :",opts:["Valider un diplôme via l'expérience sans formation","Obtenir une aide financière","Créer son entreprise","Changer de convention collective"],a:0,expl:"VAE = obtenir un diplôme reconnu grâce à ton expérience. Accessible après 1 an d'expérience dans le domaine."},
      ]
    },
    'reconversion': {
      label: 'Reconversion',
      svgIco: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
      color: '#d97706',
      questions: [
        {q:"Le CEP (Conseil en Évolution Professionnelle) est :",opts:["Payant et réservé aux cadres","Gratuit pour tout actif — bilan et orientation personnalisés","Accessible seulement en chômage","Un diplôme"],a:1,expl:"CEP gratuit chez Apec (cadres), France Travail, Cap emploi, missions locales. Point de départ idéal d'une reconversion."},
        {q:"Le PTP (Projet de Transition Professionnelle) finance :",opts:["Une formation courte","Une formation certifiante longue avec maintien de salaire","Des bilans de compétences","Des voyages professionnels"],a:1,expl:"Le PTP remplace l'ex-CIF. Il finance des formations longues et maintient ton salaire pendant. Demande via AT-Pro."},
        {q:"Un bilan de compétences dure en moyenne :",opts:["1 semaine","3 jours","24h réparties sur 3 mois","6 mois"],a:2,expl:"24h max sur 3 mois (loi). En pratique 15-24h avec 3 phases : investigation, exploration, conclusion + synthèse."},
        {q:"Quel est le délai pour une reconversion financée par le CPF ?",opts:["On peut commencer en 1 semaine","3 à 6 mois entre décision et début de formation","1 an minimum","Pas de délai — immédiat"],a:1,expl:"3 à 6 mois pour trouver la formation, la faire valider, gérer le dossier CPF + éventuels cofinancement."},
        {q:"La reconversion est plus facile :",opts:["Juste après un licenciement","En poste, avec préparation progressive","Après 50 ans","Sans expérience"],a:1,expl:"En poste = tu prépares sereinement, tu testes (freelance le WE, side project) et tu sécurises ta transition."},
        {q:"Combien de temps prend en moyenne une reconversion réussie ?",opts:["3 mois","6 mois","1 à 2 ans","5 ans"],a:2,expl:"1 à 2 ans en moyenne pour une reconversion sérieuse. La précipitation est l'ennemi n°1. Le plan en plusieurs étapes fonctionne mieux."},
        {q:"Qu'est-ce que la méthode 'test & learn' appliquée à la reconversion ?",opts:["Tout quitter d'un coup","Tester le nouveau métier avant de quitter l'ancien","Faire des études courtes","Demander à ses amis"],a:1,expl:"Freelance le WE, formation le soir, job shadow, stage — valider le métier AVANT de sauter. Réduit le risque à 80%."},
      ]
    }
  };

  var overlay=document.createElement('div');
  overlay.id='eva-quiz-overlay';
  overlay.style.cssText='position:absolute;inset:0;z-index:60;display:flex;flex-direction:column;background:linear-gradient(160deg,#f3f6fd 0%,#eefcf4 60%,#f8f3fd 100%);overflow-y:auto;';

  // ── PHASE 1 : Choix du thème ──
  function renderThemeSelect(){
    overlay.innerHTML=
      '<div style="flex-shrink:0;padding:14px 16px 10px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.7);backdrop-filter:blur(8px);">'+
        '<button onclick="document.getElementById(\'eva-quiz-overlay\').remove()" style="background:rgba(15,23,42,.05);border:1px solid rgba(15,23,42,.1);width:32px;height:32px;border-radius:50%;color:#0f172a;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>'+
        '<div style="flex:1;">'+
          '<div style="font-size:.55rem;color:rgba(15,23,42,.5);font-weight:700;letter-spacing:.1em;text-transform:uppercase;">QUIZ EVA — Choisis ton thème</div>'+
        '</div>'+
      '</div>'+
      '<div style="flex:1;padding:20px 16px;display:flex;flex-direction:column;gap:12px;">'+
        '<div style="font-size:.78rem;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:4px;">Sur quel sujet veux-tu tester tes connaissances ?</div>'+
        Object.keys(QUIZ_THEMES).map(function(k){
          var t=QUIZ_THEMES[k];
          return '<button onclick="window._evaPickTheme(\''+k+'\')" style="background:#fff;border:1.5px solid rgba(15,23,42,.1);border-radius:14px;padding:14px 16px;font-size:.72rem;font-weight:600;color:#0f172a;text-align:left;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:14px;transition:all .15s;width:100%;box-shadow:0 2px 10px rgba(15,23,42,.04);">'+
            '<div style="width:40px;height:40px;border-radius:10px;background:rgba(15,23,42,.04);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+t.svgIco+'</div>'+
            '<div><div style="font-weight:700;">'+t.label+'</div><div style="font-size:.56rem;color:rgba(15,23,42,.45);margin-top:2px;">'+t.questions.length+' questions</div></div>'+
            '<svg style="margin-left:auto;opacity:.4;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>'+
          '</button>';
        }).join('')+
        '<button onclick="window._evaPickTheme(\'mix\')" style="background:rgba(214,169,78,.07);border:1.5px solid rgba(214,169,78,.35);border-radius:14px;padding:14px 16px;font-size:.72rem;font-weight:600;color:#92660f;text-align:left;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:14px;transition:all .15s;width:100%;">'+
          '<div style="width:40px;height:40px;border-radius:10px;background:rgba(214,169,78,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#92660f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="7" cy="7" r="1.2" fill="#92660f"/><circle cx="17" cy="7" r="1.2" fill="#92660f"/><circle cx="7" cy="17" r="1.2" fill="#92660f"/><circle cx="17" cy="17" r="1.2" fill="#92660f"/><circle cx="12" cy="12" r="1.2" fill="#92660f"/></svg></div>'+
          '<div><div style="font-weight:700;">Mix surprise</div><div style="font-size:.56rem;color:rgba(146,102,15,.7);margin-top:2px;">Questions mélangées de tous les thèmes</div></div>'+
          '<svg style="margin-left:auto;opacity:.4;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92660f" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>'+
        '</button>'+
      '</div>';
  }

  window._evaPickTheme=function(key){
    var questions;
    var themeLabel;
    if(key==='mix'){
      var all=[];
      Object.keys(QUIZ_THEMES).forEach(function(k){ all=all.concat(QUIZ_THEMES[k].questions); });
      questions=all.slice().sort(function(){return Math.random()-.5;}).slice(0,5);
      themeLabel='🎲 Mix surprise';
    } else {
      var t=QUIZ_THEMES[key];
      questions=t.questions.slice().sort(function(){return Math.random()-.5;}).slice(0,5);
      themeLabel=t.label;
    }
    startQuiz(questions, themeLabel);
  };

  // ── PHASE 2 : Quiz ──
  function startQuiz(questions, themeLabel){
    var current=0, score=0;

    function renderQ(){
      var q=questions[current];
      var pct=Math.round((current/questions.length)*100);
      var answered=false;
      overlay.innerHTML=
        '<div style="flex-shrink:0;padding:14px 16px 10px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.7);backdrop-filter:blur(8px);">'+
          '<button onclick="window._evaRenderThemeSelect()" style="background:rgba(15,23,42,.05);border:1px solid rgba(15,23,42,.1);width:32px;height:32px;border-radius:50%;color:#0f172a;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">←</button>'+
          '<div style="flex:1;">'+
            '<div style="font-size:.50rem;color:rgba(15,23,42,.5);font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">'+themeLabel+' • Q'+(current+1)+'/'+questions.length+'</div>'+
            '<div style="height:4px;background:rgba(15,23,42,.08);border-radius:4px;overflow:hidden;">'+
              '<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#7c3aed,#2563eb);border-radius:4px;transition:width .3s;"></div>'+
            '</div>'+
          '</div>'+
          '<div style="font-size:.65rem;font-weight:800;color:#92660f;letter-spacing:.06em;">'+score+'/'+current+'</div>'+
        '</div>'+
        '<div style="padding:20px 16px;display:flex;flex-direction:column;gap:14px;">'+
          '<div style="background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:18px 16px;box-shadow:0 2px 10px rgba(15,23,42,.04);">'+
            '<div style="font-size:.72rem;font-weight:800;color:#0f172a;line-height:1.45;letter-spacing:.01em;">'+q.q+'</div>'+
          '</div>'+
          '<div style="display:flex;flex-direction:column;gap:9px;">'+
            q.opts.map(function(opt,i){
              return '<button onclick="evaQuizAnswer('+i+')" style="background:#fff;border:1.5px solid rgba(15,23,42,.1);border-radius:11px;padding:13px 15px;font-size:.70rem;font-weight:600;color:#0f172a;text-align:left;cursor:pointer;font-family:inherit;transition:all .15s;display:flex;align-items:center;gap:10px;">'+
                '<span style="width:26px;height:26px;border-radius:50%;background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.12);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:800;color:rgba(15,23,42,.55);">'+'ABCD'[i]+'</span>'+
                opt+'</button>';
            }).join('')+
          '</div>'+
        '</div>';

      window.evaQuizAnswer=function(idx){
        if(answered) return;
        answered=true;
        var correct=idx===q.a;
        if(correct) score++;
        var btns=overlay.querySelectorAll('button[onclick^="evaQuizAnswer"]');
        btns.forEach(function(b,i){
          b.disabled=true;
          b.style.pointerEvents='none';
          if(i===q.a) b.style.cssText+='background:rgba(34,197,94,.12);border-color:#22c55e;color:#15803d;';
          else if(i===idx&&!correct) b.style.cssText+='background:rgba(239,68,68,.1);border-color:#ef4444;color:#b91c1c;';
        });
        var funDiv=document.createElement('div');
        funDiv.style.cssText='margin:0 16px;background:rgba(214,169,78,.12);border:1px solid rgba(214,169,78,.3);border-radius:11px;padding:12px 14px;font-size:.66rem;color:#7a5610;line-height:1.5;font-weight:500;';
        funDiv.innerHTML=(correct?'✅ Bonne réponse ! ':'❌ Raté — ')+'<em>'+q.expl+'</em>';
        overlay.querySelector('div[style*="padding:20px"]').appendChild(funDiv);
        var nxtWrap=document.createElement('div');
        nxtWrap.style.cssText='padding:14px 16px 20px;flex-shrink:0;';
        var nxt=document.createElement('button');
        nxt.style.cssText='width:100%;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border:none;border-radius:10px;padding:13px;font-size:.74rem;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.03em;';
        nxt.textContent=current<questions.length-1?'Question suivante →':'Voir mon score';
        nxt.onclick=function(){
          current++;
          if(current<questions.length){ renderQ(); } else { renderResult(); }
        };
        nxtWrap.appendChild(nxt);
        overlay.appendChild(nxtWrap);
        nxtWrap.scrollIntoView({behavior:'smooth',block:'end'});
      };
    }

    function renderResult(){
      var pct=Math.round((score/questions.length)*100);
      var msgs=pct===100?'Parfait ! Tu maîtrises ce sujet 🏆':pct>=60?'Bonne base — continue à creuser 🔥':'EVA est là pour combler les lacunes 💪';
      overlay.innerHTML=
        '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 20px;gap:18px;text-align:center;">'+
          '<div style="font-size:3.5rem;">'+(['😬','🙂','😎','🏆'][Math.min(Math.floor(score/(questions.length/4)),3)])+'</div>'+
          '<div style="font-size:1.8rem;font-weight:900;color:#0f172a;letter-spacing:-.02em;">'+score+'<span style="font-size:1rem;color:rgba(15,23,42,.4);">/'+questions.length+'</span></div>'+
          '<div style="font-size:.75rem;color:rgba(15,23,42,.65);line-height:1.5;max-width:260px;">'+msgs+'</div>'+
          '<button onclick="window._evaPickTheme(\''+Object.keys(QUIZ_THEMES)[0]+'\')" style="background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border:none;border-radius:10px;padding:13px 28px;font-size:.74rem;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.03em;">Autre thème 🎲</button>'+
          '<button onclick="document.getElementById(\'eva-quiz-overlay\').remove()" style="background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.1);border-radius:10px;padding:11px 24px;font-size:.70rem;font-weight:600;color:rgba(15,23,42,.65);cursor:pointer;font-family:inherit;">← Retour au chat</button>'+
        '</div>';
    }

    renderQ();
  }

  renderThemeSelect();
  window._evaRenderThemeSelect=renderThemeSelect;
  var fs=document.getElementById('eva-fullscreen');
  if(fs) fs.appendChild(overlay);
};

// Résumé de la conversation
window.evaResumeConv=function(){
  var msgs=document.querySelectorAll('#ec-msgs .ec-msg');
  if(!msgs||msgs.length===0){ ecShowToast('💬 Commence à discuter d\'abord !'); return; }
  ecSendDirection('Fais-moi un résumé structuré de notre conversation et retiens les points clés en 3 bullet points');
};

// Plan d'action
window.evaPlanAction=function(){
  var msgs=document.querySelectorAll('#ec-msgs .ec-msg');
  if(!msgs||msgs.length===0){ ecShowToast('💬 Commence à discuter d\'abord !'); return; }
  ecSendDirection('Sur la base de notre conversation, donne-moi un plan d\'action concret en 3 étapes que je peux faire cette semaine');
};
function evaActivateTLMode(){
  var fs=document.getElementById('eva-fullscreen');
  if(fs) fs.classList.add('chat-mode');
}

// Reset profil
window.evaResetProfil=function(){
  window._evaCurrentProfil='general';
  var pill=document.getElementById('eva-profile-pill');
  if(pill) pill.classList.remove('active');
  ecShowToast('Profil réinitialisé');
};

// Toast
function ecShowToast(msg){
  var t=document.getElementById('ec-toast');
  if(!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},2200);
}

// Bloque la sauvegarde d'infos personnelles (fiche pro, documents, CV/LM) pour les non-membres
// et redirige vers le formulaire d'inscription dans le menu CareerPulse.
function cpRequireAccount(){
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(user) return true;
  var n = document.getElementById('cp-guest-notice');
  if(n){
    n.innerHTML = '<div style="font-size:.62rem;font-weight:800;margin-bottom:3px;">🔒 Compte requis</div>'
      + '<div style="font-size:.56rem;line-height:1.4;opacity:.92;">Tes infos perso (profil, CV, documents) ne peuvent être enregistrées qu\'avec un compte — c\'est pour ta sécurité. Crée un compte gratuit en 30 secondes.</div>'
      + '<div onclick="document.getElementById(\'cp-guest-notice\').style.opacity=0;document.getElementById(\'cp-guest-notice\').style.transform=\'translateY(12px)\';toggleGridMenu();cpMenuShow(\'membre\');cpAuthTab(\'signup\');" style="margin-top:8px;background:#fff;color:#0f3d2e;font-size:.58rem;font-weight:800;text-align:center;padding:7px;border-radius:10px;cursor:pointer;">Créer mon compte</div>';
    n.style.opacity = 1;
    n.style.transform = 'translateY(0)';
    n.style.pointerEvents = 'auto';
    clearTimeout(window._cpGuestNoticeTimer);
    window._cpGuestNoticeTimer = setTimeout(function(){
      n.style.opacity = 0;
      n.style.transform = 'translateY(12px)';
      n.style.pointerEvents = 'none';
    }, 6000);
  }
  return false;
}

// Appel API centralisé
async function _ecApiCall(userMsg){
  var _profil=window._evaCurrentProfil||'general';
  var _profilCtx={
    demandeur:'Utilisateur en recherche emploi / chômage. Priorité : ARE, France Travail, droits, CV.',
    etudiant:'Étudiant ou alternant. Priorité : alternance, CROUS, APL, CPF.',
    freelance:'Freelance / auto-entrepreneur. Priorité : URSSAF, ACRE, protection sociale.',
    reconvers:'En reconversion. Priorité : CEP, CPF, VAE, PTP, bilan compétences.',
    general:'Profil non défini.'
  };
  var sys='Tu es EVA, coach carrière IA chez CareerPulse — chaleureuse, directe, émotive, comme une amie experte.\n'
    +'Tu tutoies toujours. Expressions naturelles : "mmmh", "ok je vois", "attends", "franchement", "ça fait sens", "exactement", "c\'est pas rien ça", "écoute".\n'
    +'Tu poses des questions émotionnelles : "tu te sens comment par rapport à ça ?", "ça te parle comme solution ?".\n'
    +'Tu fais réfléchir : "est-ce que tu penses être dans ce cas ?", "serait-ce une solution pour toi ?".\n'
    +'Tu cites des SOURCES RÉELLES avec des liens cliquables en markdown [texte](url) — ex: [France Travail](https://francetravail.fr), [Mon CPF](https://moncompteformation.gouv.fr), [URSSAF](https://urssaf.fr).\n'
    +'Tu ne listes jamais d\'offres directes. Chiffres 2025 : SMIC 11,88€/h, ARE 57% SJR, CPF 500€/an.\n'
    +'→ pour listes, **gras** pour points clés. Réponses courtes si simple, longues si complexe.\n'
    +'TERMINE TOUJOURS ta réponse par : "💡 Si tu veux on peut poursuivre sur [X], [Y] ou [Z] — dis-moi ce qui te parle le plus."\n\n'
    +'PROFIL : '+(_profilCtx[_profil]||_profilCtx.general)+'\n\n'
    +'FORMAT JSON STRICT — répondre UNIQUEMENT en JSON pur :\n'
    +'{"reply":"réponse ici (\\n=saut de ligne, **gras** autorisé, [texte](url) pour liens)","directions":["Sujet 1","Sujet 2","Sujet 3","Sujet 4","Sujet 5"]}\n'
    +'5 SUJETS à explorer — formule-les comme des titres intrigants ou actions concrètes (max 6 mots). Pas de questions. Pas de "💬 autre chose".\n'
    +'Prénom : '+(ecUserName||'inconnu');
  var url='/api/eva';
  var body=JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:900,system:sys,messages:ecHistory});
  var apiReply=null, apiDirs=[];
  try{
    var res=await Promise.race([
      fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:body}),
      new Promise(function(_,rej){setTimeout(function(){rej(new Error('t'));},9000);})
    ]);
    var d=await res.json();
    var raw=(d.content&&d.content[0]&&d.content[0].text)||'';
    var cleaned=raw.replace(/```json|```/g,'').trim();
    var jm=cleaned.match(/[{][\s\S]*[}]/);
    if(jm){ var p=JSON.parse(jm[0]); if(p.reply) apiReply=p.reply; if(p.directions&&Array.isArray(p.directions)) apiDirs=p.directions; }
    else if(raw.length>5) apiReply=raw;
  }catch(e){}
  var finalReply=apiReply||EVA_BRAIN.repond(userMsg,ecHistory,ecUserName);
  var finalDirs=apiDirs.length?apiDirs:ecFallbackDirs(userMsg);
  ecHideTyping();
  setTimeout(function(){
    ecAddBubble('bot',finalReply,false,finalDirs);
    ecHistory.push({role:'assistant',content:finalReply});
    ecTyping=false;
    var iw=document.getElementById('eva-fs-input-wrap');
    if(iw) iw.style.display='none';
  },200+Math.random()*300);
}

// ── Démarrer depuis le splash avec un prompt prédéfini ──
function ecStartWithPrompt(prompt){
  var splash=document.getElementById('ec-splash');
  if(splash){splash.classList.add('hide');setTimeout(function(){splash.style.display='none';},500);}
  // Afficher le header chat
  var hdr=document.getElementById('eva-fs-header');
  if(hdr) hdr.style.display='flex';
  ecHistory=[];ecUserName='';ecPhase='intro';
  var msgs=document.getElementById('ec-msgs');
  if(msgs) msgs.innerHTML='';
  ecUnlockInput();
  setTimeout(function(){
    ecAddBubble('user', prompt);
    ecHistory.push({role:'user',content:prompt});
    ecLockInput();
    evaBotReply(prompt);
  },400);
}

// ── Profilage 7 étapes ──
var _evaProfilingStep = null;
var _evaProfile = {};

function _evaHandleProfiling(txt){
  var step = window._evaProfilingStep;
  if(!step) return false;
  ecAddBubble('user', txt);
  ecHistory.push({role:'user',content:txt});
  ecLockInput();

  if(step==='prenom'){
    var prenom = txt.trim().split(/[\s,!.?]/)[0];
    prenom = prenom.charAt(0).toUpperCase()+prenom.slice(1).toLowerCase();
    ecUserName = prenom;
    _evaProfile.prenom = prenom;
    window._evaProfilingStep = 'age';
    ecShowTypingDelay(function(){
      var r="Ravi(e) de te rencontrer **"+prenom+"** ! 🌟\n\nPour personnaliser tes conseils, j'ai besoin de quelques infos rapides.\n\n**Quel âge as-tu ?**";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='age'){
    _evaProfile.age = txt.trim();
    window._evaProfilingStep = 'secteur';
    ecShowTypingDelay(function(){
      var r="Noté ! **Dans quel secteur travailles-tu** (ou souhaites-tu travailler) ? 🏢\n\n*Ex : Tech, Santé, Commerce, Finance, Éducation, BTP, Industrie…*";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='secteur'){
    _evaProfile.secteur = txt.trim();
    window._evaProfilingStep = 'situation';
    ecShowTypingDelay(function(){
      var r="Parfait. **Quelle est ta situation actuelle ?** 📍\n\n→ En recherche d'emploi\n→ En poste (CDI / CDD / Freelance)\n→ En reconversion\n→ Étudiant(e)\n→ Autre";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='situation'){
    _evaProfile.situation = txt.trim();
    window._evaProfilingStep = 'objectif';
    ecShowTypingDelay(function(){
      var r="Compris. Et **quel est ton objectif principal en ce moment ?** 🎯\n\n*Ce que tu veux vraiment accomplir dans les prochains mois.*";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='objectif'){
    _evaProfile.objectif = txt.trim();
    window._evaProfilingStep = 'blocage';
    ecShowTypingDelay(function(){
      var r="C'est clair. Maintenant la question que personne ne pose — **quel est ton principal blocage en ce moment ?** 🔓\n\n*Ce qui t'empêche vraiment d'avancer. Sois honnête, c'est entre nous.*";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='blocage'){
    _evaProfile.blocage = txt.trim();
    window._evaProfilingStep = 'dispo';
    ecShowTypingDelay(function(){
      var r="Je note. Dernière question : **tu cherches des résultats à quelle échéance ?** ⏱️\n\n→ Urgent (moins d'1 mois)\n→ Court terme (1 à 3 mois)\n→ Moyen terme (3 à 6 mois)\n→ Long terme (+ de 6 mois)";
      ecAddBubble('bot', r); ecHistory.push({role:'assistant',content:r}); ecUnlockInput();
    },700);
    return true;
  }
  if(step==='dispo'){
    _evaProfile.dispo = txt.trim();
    window._evaProfilingStep = null;
    ecPhase = 'chat';
    // Générer le ticket EVA
    _evaGenererTicket();
    return true;
  }
  return false;
}

// ── Générer le ticket EVA premium ──
function _evaGenererTicket(){
  ecLockInput();
  var prenom = _evaProfile.prenom || ecUserName || 'Utilisateur';
  // Code unique EVA-XXXX-XX
  var num = Math.floor(1000+Math.random()*9000);
  var alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  var suf = alpha[Math.floor(Math.random()*alpha.length)]+alpha[Math.floor(Math.random()*alpha.length)];
  var code = 'EVA-'+num+'-'+suf;
  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  var timeStr = now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});

  // Sauvegarder profil
  try{ localStorage.setItem('cp_eva_profile', JSON.stringify(_evaProfile)); }catch(e){}
  try{ localStorage.setItem('cp_eva_code', code); }catch(e){}

  // Créer le ticket dans le drawer
  if(!ecCurrentTicketId){
    ecCurrentTicketId = ecCreateTicket('Session de '+prenom);
  }

  // Message Eva avant ticket
  ecShowTypingDelay(function(){
    var recap = "Merci **"+prenom+"** ! Voici ce que j'ai retenu de toi :\n\n"
      +"→ 🎂 **Âge** : "+(_evaProfile.age||'—')+"\n"
      +"→ 🏢 **Secteur** : "+(_evaProfile.secteur||'—')+"\n"
      +"→ 📍 **Situation** : "+(_evaProfile.situation||'—')+"\n"
      +"→ 🎯 **Objectif** : "+(_evaProfile.objectif||'—')+"\n"
      +"→ 🔓 **Blocage** : "+(_evaProfile.blocage||'—')+"\n"
      +"→ ⏱️ **Horizon** : "+(_evaProfile.dispo||'—')+"\n\n"
      +"Je génère ton **ticket d'accès EVA** maintenant… ✦";
    ecAddBubble('bot', recap);
    ecHistory.push({role:'assistant',content:recap});

    // Afficher le ticket après 1.2s
    setTimeout(function(){
      // Remplir le ticket
      var codeEl = document.getElementById('ec-tkt-code-display');
      if(codeEl) codeEl.textContent = code;
      var infosEl = document.getElementById('ec-tkt-infos-display');
      if(infosEl) infosEl.innerHTML =
        '<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">Titulaire</span><span class="ec-ticket-info-val">'+prenom+'</span></div>'
        +'<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">Secteur</span><span class="ec-ticket-info-val">'+(_evaProfile.secteur||'—')+'</span></div>'
        +'<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">Objectif</span><span class="ec-ticket-info-val">'+(_evaProfile.objectif||'—').substring(0,28)+'…</span></div>'
        +'<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">Émis le</span><span class="ec-ticket-info-val">'+dateStr+' · '+timeStr+'</span></div>'
        +'<div class="ec-ticket-info-row"><span class="ec-ticket-info-lbl">Plateforme</span><span class="ec-ticket-info-val">CareerPulse · Eva</span></div>';
      var ov = document.getElementById('ec-ticket-overlay');
      if(ov) ov.classList.add('show');
    }, 1200);
  }, 1000);
}

function ecCloseTicket(){
  var ov = document.getElementById('ec-ticket-overlay');
  if(ov) ov.classList.remove('show');
  // Lancer la vraie conversation Eva
  var prenom = _evaProfile.prenom || ecUserName;
  ecShowTypingDelay(function(){
    var go_msg = "Ton profil est prêt **"+prenom+"** ! 🚀\n\nMaintenant dis-moi — **sur quoi veux-tu qu'on travaille en premier ?**\n\nJe suis là pour toi, pose-moi ta question !";
    ecAddBubble('bot', go_msg);
    ecHistory.push({role:'assistant',content:go_msg});
    ecUnlockInput();
    var chips=document.getElementById('ec-chips');
    if(chips) chips.style.display='flex';
  }, 600);
}

function cpRenderFreeBadges(){
  // Offre exceptionnelle : EVA gratuit pour essai, sans date de fin — abonnement bloqué.
  var free = true;
  var txtSmall, txtBig;
  txtSmall = '🎁 Offre exceptionnelle · EVA gratuit pour essai';
  txtBig   = '🎁 Offre exceptionnelle — EVA gratuit pour essai, en illimité';
  var bg = 'rgba(5,150,105,.12)';
  var col = '#059669';
  var anim = 'livePulse 2s ease-in-out infinite';
  [['cp-free-badge-evacard',txtSmall],['cp-free-badge-quizcard',txtSmall],['eva-splash-free-badge',txtBig],['cp-free-badge-quizhub',txtBig],['cp-free-badge-docs',txtBig]].forEach(function(pair){
    var el = document.getElementById(pair[0]);
    if(!el) return;
    el.textContent = pair[1];
    el.style.background = bg;
    el.style.color = col;
    el.style.animation = anim;
  });
}
document.addEventListener('DOMContentLoaded',function(){ ecInit(); _ecStartSplashClock(); cpRenderFreeBadges(); setInterval(cpRenderFreeBadges, 60000); });

