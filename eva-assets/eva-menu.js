
// ── Toggle panneau grille ──
function toggleGridMenu(){
  var panel=document.getElementById('grid-panel');
  var overlay=document.getElementById('grid-overlay');
  var open=panel.style.transform==='translateX(0px)'||panel.style.transform==='translateX(0)';
  if(open){
    panel.style.transform='translateX(100%)';
    overlay.style.opacity='0';
    overlay.style.pointerEvents='none';
  } else {
    panel.style.transform='translateX(0)';
    overlay.style.opacity='1';
    overlay.style.pointerEvents='auto';
    cpMenuShow('list');
  }
}

// ── Menu hamburger : navigation entre Liste / Espace membre / Abonnement (même page) ──
function cpMenuShow(which){
  ['list','membre','abo','contact','avis'].forEach(function(k){
    var el=document.getElementById('cp-menu-'+k);
    if(el) el.style.display = (k===which) ? 'block' : 'none';
  });
}

// Support technique : relie simplement l'info par email (pas d'IA, pas de backend pour l'instant)
function cpSendSupport(){
  var subj=(document.getElementById('cp-support-subject').value||'').trim();
  var msg=(document.getElementById('cp-support-message').value||'').trim();
  if(!subj||!msg){ ecShowToast('Renseigne le sujet et le message'); return; }
  var mailSubject=encodeURIComponent('[Support CareerPulse] '+subj);
  var mailBody=encodeURIComponent(msg);
  window.location.href='mailto:careerpulse-pro@outlook.com?subject='+mailSubject+'&body='+mailBody;
}

// Donne ton avis : questionnaire 3 questions envoyé par email (pas d'IA, pas de backend pour l'instant)
function cpSendAvis(){
  var q1=(document.getElementById('cp-avis-q1').value||'');
  var q2=(document.getElementById('cp-avis-q2').value||'');
  var q3=(document.getElementById('cp-avis-q3').value||'').trim();
  var mailSubject=encodeURIComponent('[Avis CareerPulse]');
  var mailBody=encodeURIComponent(
    '1. EVA t\'a été utile ? '+q1+'\n'+
    '2. CareerPulse t\'a aidé dans ta recherche ? '+q2+'\n'+
    '3. Amélioration suggérée : '+(q3||'(non renseigné)')
  );
  window.location.href='mailto:careerpulse-pro@outlook.com?subject='+mailSubject+'&body='+mailBody;
  ecShowToast('Merci pour ton avis 🙏');
}

// ── Bascule entre Se connecter / Créer un compte ──
function cpAuthTab(which){
  var loginTab=document.getElementById('cp-tab-login');
  var signupTab=document.getElementById('cp-tab-signup');
  var loginForm=document.getElementById('cp-auth-login');
  var signupForm=document.getElementById('cp-auth-signup');
  var isLogin=(which==='login');
  loginForm.style.display=isLogin?'block':'none';
  signupForm.style.display=isLogin?'none':'block';
  loginTab.style.background=isLogin?'#059669':'transparent';
  loginTab.style.color=isLogin?'#fff':'#64748b';
  loginTab.style.boxShadow=isLogin?'0 2px 6px rgba(5,150,105,.35)':'none';
  signupTab.style.background=isLogin?'transparent':'#059669';
  signupTab.style.color=isLogin?'#64748b':'#fff';
  signupTab.style.boxShadow=isLogin?'none':'0 2px 6px rgba(5,150,105,.35)';
}

// ── Espace membre : login/inscription/logout simple, tout reste sur la même page ──
function cpMemberLogin(){ fbLogin && fbLogin(); }
function cpMemberSignup(){ fbSignup && fbSignup(); }
function cpMemberLogout(){ fbLogout && fbLogout(); }
function cpAccountCss(){
  if(document.getElementById('cp-acct-css')) return;
  var st=document.createElement('style'); st.id='cp-acct-css';
  st.textContent=''
   +'.cp-acct{display:inline-flex;flex-direction:column;align-items:flex-end;gap:3px;line-height:1;max-width:46vw;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Inter,Arial,sans-serif;}'
   +'.cp-acct-n{font-size:.8rem;font-weight:800;color:#0f172a;letter-spacing:-.01em;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
   +'.cp-acct-b{display:inline-flex;align-items:center;gap:4px;padding:3px 8px 3px 3px;border-radius:99px;font-size:.54rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#fff;white-space:nowrap;'
   +'background:linear-gradient(135deg,#1e40af,#2563eb 45%,#059669);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 0 0 1px rgba(255,255,255,.6),0 6px 14px -6px rgba(30,64,175,.7);position:relative;overflow:hidden;}'
   +'.cp-acct-b::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);animation:cpAcctShine 3.6s 1s ease-in-out 1 both;}'
   +'.cp-acct-b.eva{background:linear-gradient(135deg,#1e3a8a,#2563eb 50%,#7c3aed);}'
   +'.cp-acct-b svg{width:14px;height:14px;flex-shrink:0;}'
   +'.cp-acct.inl{flex-direction:row;align-items:center;gap:7px;max-width:none;vertical-align:middle;}'
   +'@keyframes cpAcctShine{0%,60%{left:-60%;}100%{left:130%;}}'
   +'@media (prefers-reduced-motion:reduce){.cp-acct-b::after{display:none;}}';
  document.head.appendChild(st);
}
function cpSeal(){ return '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 1.5l2.3 1.7 2.8-.3 1.1 2.6 2.6 1.1-.3 2.8 1.7 2.3-1.7 2.3.3 2.8-2.6 1.1-1.1 2.6-2.8-.3L12 22.5l-2.3-1.7-2.8.3-1.1-2.6-2.6-1.1.3-2.8L1.5 12l1.7-2.3-.3-2.8 2.6-1.1 1.1-2.6 2.8.3z"/><path d="m8 12.2 2.6 2.6L16.2 9" fill="none" stroke="#2563eb" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
function cpAccountName(){ var u=window._fbUser; return u ? (u.displayName || (u.email||'').split('@')[0]) : ''; }
function cpAccountHtml(kind, inline){
  var esc=function(t){ return String(t||'').replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  return '<span class="cp-acct'+(inline?' inl':'')+'"><span class="cp-acct-n">'+esc(cpAccountName())+'</span><span class="cp-acct-b'+(kind==='eva'?' eva':'')+'">'+cpSeal()+(kind==='eva'?'Membre EVA':'CareerPulse')+'</span></span>';
}
// Pastille « nom + badge » (membres confirmés uniquement) — utilisée dans l'en-tête du menu EVA mobile
window.cpAccountChip=function(kind){
  var u=window._fbUser; if(!(u && u.emailVerified)) return null;
  cpAccountCss(); var w=document.createElement('span'); w.innerHTML=cpAccountHtml(kind); return w.firstChild;
};
function cpApplyMemberState(){
  var user = window._fbUser || null;
  var ok = !!(user && user.emailVerified);   // membre = e-mail confirmé
  var name = user ? cpAccountName() : null;
  var loggedOut=document.getElementById('cp-membre-logged-out');
  var loggedIn=document.getElementById('cp-membre-logged-in');
  var pending=document.getElementById('cp-membre-pending');
  var okBox=document.getElementById('cp-membre-ok');
  var sub=document.getElementById('cp-menu-membre-sub');
  var tnavName=document.getElementById('cp-tnav-membername');
  var docsName=document.getElementById('ew-docs-username');
  var nd=document.getElementById('cp-membre-name-display');
  if(user){
    if(loggedOut) loggedOut.style.display='none';
    if(loggedIn) loggedIn.style.display='block';
    if(pending) pending.style.display = ok ? 'none' : 'block';
    if(okBox) okBox.style.display = ok ? 'block' : 'none';
  } else {
    if(loggedOut) loggedOut.style.display='block';
    if(loggedIn) loggedIn.style.display='none';
  }
  // EVA ordinateur : nom + badge sous le logo du menu de gauche
  var side=document.getElementById('eva-side');
  if(side){
    var sa=side.querySelector('.evs-acct');
    if(ok){ cpAccountCss(); if(!sa){ sa=document.createElement('div'); sa.className='evs-acct'; var br=side.querySelector('.evs-brand'); if(br && br.nextSibling) side.insertBefore(sa, br.nextSibling); else side.appendChild(sa); } sa.innerHTML=cpAccountHtml('eva', true); }
    else if(sa) sa.remove();
  }
  if(ok){
    cpAccountCss();
    if(nd) nd.innerHTML=cpAccountHtml('cp', true);
    if(sub) sub.textContent=name;
    if(tnavName) tnavName.innerHTML=cpAccountHtml('cp');
    if(docsName) docsName.innerHTML=cpAccountHtml('eva', true);
  } else {
    if(nd) nd.textContent=name||'';
    if(sub) sub.textContent = user ? 'E-mail à confirmer' : 'Se connecter';
    if(tnavName) tnavName.textContent = user ? 'Invité · à confirmer' : 'Invité';
    if(docsName) docsName.textContent='Invité';
  }
}
document.addEventListener('DOMContentLoaded', cpApplyMemberState);

// ── Utilitaire shuffle ──
function shuffleArr(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=a[i];a[i]=a[j];a[j]=tmp;
  }
  return a;
}
function pick10(bank){ var n=(window._QSession&&_QSession.nb)||25; return shuffleArr(bank).slice(0,n); }

// ── Partage WhatsApp + Telegram ──
function shareQCM(platform, quizName, score){
  var url='https://careerpulseia.com';
  var txt='🎯 '+score+'/10 sur le quiz "'+quizName+'" — CareerPulse !\n\nDécouvre tes qualités et tes points à améliorer avec des conseils adaptés à tes réponses. Faites pour toi. 👉 '+url;
  var enc=encodeURIComponent(txt);
  if(platform==='whatsapp'){ window.location.href='whatsapp://send?text='+enc; }
  else if(platform==='telegram'){ window.location.href='https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+enc; }
}

// ── Générateur plan d'action Eva (pseudo-IA, algorithme logique) ──
var EVA_PLANS={
  'Entretien d\'embauche':{
    conseils:[
      'Prépare un pitch de 2 minutes sur toi : parcours, compétences clés, valeur ajoutée pour le poste.',
      'Recherche l\'entreprise en profondeur : actualités, valeurs, concurrents, enjeux du secteur.',
      'Entraîne-toi à répondre à voix haute — pas dans ta tête. La fluidité s\'acquiert par la pratique.',
      'Prépare 3 exemples concrets et chiffrés de tes réussites (méthode STAR).',
      'Prépare 5 questions intelligentes à poser au recruteur sur le poste et l\'équipe.',
      'Soigne ta posture, ton regard et ta voix — ils comptent autant que tes mots.',
      'Envoie un email de remerciement dans les 24h après l\'entretien.',
      'Prépare une réponse honnête et positive à "Quels sont vos défauts ?"',
      'Pratique la relance polie si tu n\'as pas de nouvelles après 10 jours.',
      'Prépare ta stratégie de négociation salariale avec une fourchette basée sur le marché.',
      'Répète l\'entretien avec un ami ou devant un miroir.',
      'Identifie les mots-clés de l\'offre et intègre-les naturellement dans tes réponses.',
      'Prépare ta réponse aux trous de CV de façon positive et valorisante.',
      'Entraîne-toi à gérer les silences — ne les remplis pas impulsivement.',
      'Adapte ta tenue au dress code de l\'entreprise avant le jour J.'
    ],
    actions:{
      faible:['Jour 1 : Regarde 3 vidéos sur la méthode STAR sur YouTube','Jour 2 : Rédige ton pitch de 2 minutes et enregistre-toi','Jour 3 : Fais une liste de 10 questions types et rédige tes réponses','Semaine 1 : Fais un entretien blanc avec un ami','Semaine 2 : Postule à 3 offres en appliquant ces techniques'],
      moyen:['Cette semaine : Peaufine ta méthode STAR avec des exemples chiffrés','Entraîne-toi sur les questions difficiles (défauts, trous CV, salaire)','Prépare un dossier entreprise pour chaque entretien','Travaille ton langage non-verbal devant un miroir 10 min/jour'],
      bon:['Perfectionne ta négociation salariale avec des données marché','Travaille les questions pièges avancées','Développe ton réseau pour accéder au marché caché','Prépare des questions stratégiques à poser aux recruteurs']
    }
  },
  'Stratégie emploi':{
    conseils:[
      'Définis tes 3 critères non-négociables : secteur, type de poste, valeurs.',
      'Optimise ton profil LinkedIn avec photo, résumé percutant et mots-clés.',
      'Consacre 30% de ton temps au réseau — 80% des emplois ne sont pas publiés.',
      'Prépare un elevator pitch de 60 secondes pour te présenter en networking.',
      'Cible 10 entreprises précises et suis-les activement.',
      'Lance des candidatures spontanées personnalisées aux entreprises cibles.',
      'Fixe-toi des objectifs SMART : nombre de candidatures/semaine, relances, événements.',
      'Analyse chaque refus pour améliorer ta stratégie.',
      'Participe à au moins 1 événement networking par mois.',
      'Crée des alertes emploi sur Indeed, LinkedIn et France Travail.',
      'Développe une routine quotidienne de recherche : 2h min/jour.',
      'Soigne ton e-réputation : Google ton nom et nettoie si besoin.',
      'Rejoins des groupes LinkedIn de ton secteur et contribue activement.',
      'Contacte d\'anciens collègues et camarades pour leur parler de ta recherche.',
      'Évalue ta progression chaque semaine et ajuste ta stratégie.'
    ],
    actions:{
      faible:['Jour 1 : Complète ton profil LinkedIn à 100%','Jour 2 : Identifie 10 entreprises cibles dans ton secteur','Jour 3 : Rédige ton elevator pitch','Semaine 1 : Lance 5 candidatures personnalisées','Semaine 2 : Contacte 3 personnes de ton réseau'],
      moyen:['Optimise ta stratégie LinkedIn : publie 1 post par semaine','Développe tes candidatures spontanées (3/semaine)','Assiste à 1 événement networking ce mois','Crée un tableau de suivi de tes candidatures'],
      bon:['Développe ton personal branding sur LinkedIn','Mets en place une veille sectorielle quotidienne','Développe des relations mentorat dans ton secteur','Affine ta stratégie sur le marché caché']
    }
  },
  'Leadership & Management':{
    conseils:[
      'Pratique l\'écoute active : 70% d\'écoute, 30% de parole en réunion.',
      'Donne du feedback régulier, spécifique et constructif à ton équipe.',
      'Apprends à déléguer : définis clairement les objectifs et laisse l\'autonomie.',
      'Développe ton intelligence émotionnelle — identifie et gère tes émotions.',
      'Fixe des objectifs clairs avec des indicateurs mesurables pour chaque membre.',
      'Crée un environnement psychologiquement sécurisant pour l\'expression.',
      'Gère les conflits rapidement, factuellement et sans jugement personnel.',
      'Adapte ton style de management à chaque profil de collaborateur.',
      'Organise des 1:1 réguliers avec chaque membre de ton équipe.',
      'Développe une vision claire et communique-la avec enthousiasme.',
      'Reconnais publiquement les réussites et traite les problèmes en privé.',
      'Investis dans le développement de compétences de ton équipe.',
      'Prends des décisions avec méthode : faits, options, impact, décision.',
      'Sois exemplaire sur la ponctualité, l\'engagement et l\'éthique.',
      'Développe ta capacité à gérer le changement et à embarquer ton équipe.'
    ],
    actions:{
      faible:['Semaine 1 : Lis "Leaders Eat Last" de Simon Sinek (résumé disponible en ligne)','Semaine 2 : Pratique l\'écoute active 1 journée entière','Semaine 3 : Organise un 1:1 avec chaque membre de ton équipe','Mois 1 : Fixe des objectifs SMART à chaque collaborateur'],
      moyen:['Cette semaine : Travaille ton feedback constructif avec 3 exemples concrets','Développe une matrice de délégation pour tes tâches','Crée un rituel d\'équipe hebdomadaire','Forme-toi à la gestion des conflits'],
      bon:['Développe ta vision stratégique sur 12 mois','Mets en place un plan de développement individuel pour chaque collaborateur','Travaille ton leadership en situation de crise','Explore les modèles de management agile']
    }
  },
  'Gestion du stress':{
    conseils:[
      'Pratique la respiration 4-7-8 : inspire 4s, retiens 7s, expire 8s.',
      'Identifie tes déclencheurs de stress et anticipe-les.',
      'Découpe les grandes tâches stressantes en micro-étapes actionnables.',
      'Instaure une routine matinale de 10 min sans écran.',
      'Pratique 20 min de marche par jour — effet prouvé sur l\'anxiété.',
      'Apprends à dire non sans culpabilité pour protéger ton énergie.',
      'Planifie tes journées avec des pauses toutes les 90 minutes.',
      'Tiens un journal de gratitude : 3 choses positives chaque soir.',
      'Limite les réseaux sociaux à 30 min/jour pendant les périodes stressantes.',
      'Parle à quelqu\'un de confiance quand la pression monte.',
      'Pratique la pleine conscience 5 min/jour avec une app (Calm, Petit Bambou).',
      'Identifie ce que tu contrôles vs ce qui est hors de ton contrôle.',
      'Célèbre chaque petite victoire — le cerveau a besoin de récompenses.',
      'Dors 7-8h minimum — le manque de sommeil amplifie le stress x3.',
      'Réorganise ton espace de travail pour réduire les frictions quotidiennes.'
    ],
    actions:{
      faible:['Aujourd\'hui : Pratique la respiration 4-7-8 pendant 5 minutes','Cette semaine : Identifie tes 3 principaux déclencheurs de stress','Semaine 2 : Instaure une routine matinale de 10 min','Mois 1 : Intègre 20 min de marche quotidienne'],
      moyen:['Cette semaine : Commence un journal de gratitude','Installe une app de méditation et pratique 5 min/jour','Crée une liste de tes tâches par ordre de priorité et d\'urgence','Identifie 1 habitude néfaste à remplacer'],
      bon:['Développe un plan de prévention du burnout personnalisé','Travaille sur tes limites et la communication assertive','Explore des techniques avancées (cohérence cardiaque, yoga)','Optimise ton environnement de travail profondément']
    }
  },
  'Compétences digitales':{
    conseils:[
      'Maîtrise les bases de Google Workspace ou Microsoft 365 (Sheets, Docs, Slides).',
      'Apprends à utiliser l\'IA (ChatGPT, Claude) pour gagner du temps au quotidien.',
      'Crée et optimise ton profil LinkedIn avec des mots-clés stratégiques.',
      'Apprends les bases du SEO et du marketing digital (Google gratuit).',
      'Forme-toi à l\'analyse de données : Excel/Sheets avancé minimum.',
      'Découvre les outils de gestion de projet : Trello, Notion, Asana.',
      'Apprends à créer des visuels avec Canva pour tes présentations.',
      'Comprends les bases de la cybersécurité : mots de passe, phishing, VPN.',
      'Découvre les outils d\'automatisation : Zapier, Make pour gagner du temps.',
      'Apprends à faire une présentation percutante avec des données visuelles.',
      'Forme-toi aux bases du no-code : Webflow, Bubble pour créer sans coder.',
      'Comprends le fonctionnement des algorithmes des réseaux sociaux.',
      'Apprends à utiliser les outils de visioconférence professionnellement.',
      'Développe une veille tech avec Feedly ou des newsletters spécialisées.',
      'Obtiens une certification reconnue : Google, Microsoft, HubSpot (gratuites).'
    ],
    actions:{
      faible:['Semaine 1 : Complète le cours gratuit "Bases du numérique" sur PIX','Semaine 2 : Crée un compte Canva et fais ton premier visuel','Semaine 3 : Suis le cours "Google Sheets" gratuit sur Coursera','Mois 1 : Obtiens une certification Google (Analytics ou Ads)'],
      moyen:['Cette semaine : Maîtrise 1 outil IA pour ton métier (ChatGPT ou Claude)','Crée un tableau de bord automatisé sur Google Sheets','Obtiens une certification LinkedIn Learning','Explore Zapier pour automatiser 1 tâche répétitive'],
      bon:['Développe une expertise sur un outil spécifique à ton secteur','Crée un projet personnel pour pratiquer tes compétences','Partage tes connaissances sur LinkedIn pour te positionner','Explore les compétences data science ou no-code avancées']
    }
  },
  'Orientation métier':{
    conseils:[
      'Fais le bilan de tes forces naturelles : ce qui te vient sans effort.',
      'Identifie les activités où tu perds la notion du temps (état de flow).',
      'Liste tes 10 réussites professionnelles ou personnelles les plus significatives.',
      'Interviewe 3 professionnels du métier qui t\'attire (informational interview).',
      'Teste le métier via un stage, mission freelance ou bénévolat avant de te décider.',
      'Analyse les tendances du secteur visé sur 5-10 ans.',
      'Identifie le gap de compétences entre où tu es et où tu veux aller.',
      'Utilise les tests MBTI, Holland ou StrengthsFinder comme point de départ.',
      'Parle à un conseiller d\'orientation ou coach carrière pour t\'aider.',
      'Crée un plan de transition réaliste avec des étapes et des délais.',
      'Rejoins des communautés du secteur visé pour t\'immerger.',
      'Lance un projet personnel lié au métier visé pour valider l\'intérêt.',
      'Évalue l\'adéquation entre tes valeurs et la culture du secteur visé.',
      'Identifie des formations courtes et certifiantes pour accélérer la transition.',
      'Crée un portfolio de compétences même sans expérience formelle dans le domaine.'
    ],
    actions:{
      faible:['Semaine 1 : Fais le test d\'orientation Holland (gratuit en ligne)','Semaine 2 : Liste tes 10 réussites et identifie les compétences utilisées','Semaine 3 : Contacte 2 professionnels du métier visé sur LinkedIn','Mois 1 : Assiste à un événement ou webinar du secteur'],
      moyen:['Cette semaine : Définis tes 3 critères non-négociables de métier','Identifie ton gap de compétences et crée un plan de formation','Rejoins 2 groupes LinkedIn du secteur visé','Lance un projet personnel lié au métier pour tester'],
      bon:['Développe ton plan de transition sur 6-12 mois','Cherche un mentor dans le secteur visé','Construis ton portfolio de compétences','Commence une formation certifiante dans le domaine cible']
    }
  },
  'ARE & Indemnisation ch\u00f4mage':{
    conseils:[
      'Inscris-toi à France Travail dans les 12 mois suivant la fin de ton contrat pour ne pas perdre tes droits.',
      'Vérifie ton SJR (Salaire Journalier de Référence) sur ton espace France Travail — c\'est la base de ton calcul ARE.',
      'Déclare chaque mois ta situation à France Travail, même si tu travailles à temps partiel.',
      'Si tu reprends une activité, déclare-la immédiatement : tu peux cumuler ARE et revenus sous conditions.',
      'Note ton délai de carence exact : 7 jours fixes + délai lié aux indemnités et congés non pris.',
      'Garde tous tes justificatifs de recherche d\'emploi — ils peuvent être demandés à tout moment.',
      'Si tu crées une entreprise, renseigne-toi sur l\'ARCE : tu peux toucher 60% de tes droits restants en capital.',
      'La démission légitime (suivi de conjoint, formation...) ouvre droit à l\'ARE — vérifie si tu es concerné.',
      'Après 4 mois de CDD, tu peux recharger tes droits ARE existants si tu en avais.'
    ],
    actions:{
      faible:[
        'Connecte-toi sur francetravail.fr et lis la fiche "Comment est calculé mon ARE" — 10 minutes suffisent.',
        'Note tes dates de contrat et salaires des 24 derniers mois — base de tout calcul.',
        'Refais ce quiz dans 3 jours : les mêmes questions ne reviendront pas, les notions si.'
      ],
      moyen:[
        'Simule ton ARE sur le calculateur officiel de France Travail avec tes vraies données.',
        'Liste les situations qui ouvrent droit à une démission légitime — tu pourrais être concerné.',
        'Vérifie si ton indemnité de départ génère un délai de carence spécifique.'
      ],
      bon:[
        'Tu maîtrises les bases. Approfondis : rechargement des droits et cumul ARE + activité.',
        'Explore l\'ARCE si une création d\'entreprise est dans ton projet.',
        'Partage ce quiz avec quelqu\'un en recherche d\'emploi — l\'information vaut de l\'or.'
      ]
    }
  },
  "Entretien d'embauche":{
    conseils:[
      'Prépare un pitch de 2 minutes sur toi : parcours, compétences clés, valeur ajoutée pour le poste.',
      'Recherche l\'entreprise en profondeur : actualités, valeurs, concurrents, enjeux du secteur.',
      'Entraîne-toi à répondre à voix haute — la fluidité s\'acquiert par la pratique.',
      'Prépare 3 exemples concrets et chiffrés de tes réussites (méthode STAR).',
      'Prépare 5 questions intelligentes à poser au recruteur sur le poste et l\'équipe.',
      'Soigne ta posture, ton regard et ta voix — ils comptent autant que tes mots.',
      'Envoie un email de remerciement dans les 24h après l\'entretien.',
      'Prépare une réponse honnête et positive à "Quels sont vos défauts ?"',
      'Pratique la relance polie si tu n\'as pas de nouvelles après 10 jours.'
    ],
    actions:{
      faible:[
        'Note les 3 questions sur lesquelles tu as échoué et rédige ta réponse idéale pour chacune.',
        'Entraîne-toi face à un miroir ou enregistre-toi — 15 minutes suffisent.',
        'Refais ce quiz dans 48h : nouvelles questions, même sujet.'
      ],
      moyen:[
        'Prépare ta réponse à "Pourquoi vous ?" avec 2 arguments concrets et chiffrés.',
        'Simule un entretien complet avec un proche ou enregistre-toi.',
        'Prépare ta négociation salariale : fourchette, arguments, alternatives.'
      ],
      bon:[
        'Peaufine ta conclusion d\'entretien : résumé, intérêt, prochaines étapes.',
        'Prépare des questions pointues sur les défis du poste et les attentes à 90 jours.',
        'Partage ce quiz avec quelqu\'un en recherche — les bons conseils voyagent.'
      ]
    }
  }
};

function generateEvaPlan(quizName, score, wrongAnswers){
  var plan=EVA_PLANS[quizName];
  if(!plan) return null;

  // Niveau selon score
  var level = score<=3?'faible': score<=6?'moyen':'bon';

  // Shuffle et pioche 3 conseils aléatoires du pool
  var shuffled=shuffleArr(plan.conseils.slice());
  var picked=shuffled.slice(0,3);

  // Actions selon niveau
  var actions=plan.actions[level];
  // Shuffle les actions et prend 3
  var pickedActions=shuffleArr(actions.slice()).slice(0,3);

  return {conseils:picked, actions:pickedActions, level:level};
}

// ── Rendu résultat QCM Pro ──
function renderQCMResult(cfg, state, resultDivId, screenId, resetFn){
  var s=state.score; var tot=state.questions.length;
  var pct=Math.round((s/tot)*100);
  var level = s<=(tot*0.4)?'😟 À améliorer': s<=(tot*0.65)?'💪 En progression': s<=(tot*0.85)?'✅ Bon niveau':'🏆 Expert !';
  var advice = s<=3?'Continue, chaque session t\'apprend quelque chose de nouveau.':
               s<=6?'Tu es sur le bon chemin. Quelques points à consolider.':
               s<=8?'Solide ! Peaufine les derniers détails.':
               'Impressionnant. Tu maîtrises ce sujet.';

  var okAnswers=state.answers.filter(function(a){return a.ok;});
  var koAnswers=state.answers.filter(function(a){return !a.ok;});

  // Génère plan Eva
  var evaPlan=generateEvaPlan(cfg.name, s, koAnswers);

  var planHTML='';
  if(evaPlan){
    planHTML=
      '<div style="background:linear-gradient(135deg,#1e3a5f,#065f46);border-radius:14px;padding:16px;margin:14px 0">'
      +'<div style="font-size:.52rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:8px">💡 Eva — Conseils personnalisés</div>'
      +'<div style="font-size:.64rem;color:rgba(255,255,255,.5);margin-bottom:10px;font-style:italic">Conçu pour toi · Basé sur tes résultats · Évolue à chaque session</div>'
      +evaPlan.conseils.map(function(c,i){
        return '<div style="display:flex;gap:8px;margin-bottom:8px;padding:8px 10px;background:rgba(255,255,255,.08);border-radius:8px">'
          +'<span style="color:#6ee7b7;font-size:.7rem;flex-shrink:0">→</span>'
          +'<span style="font-size:.68rem;color:rgba(255,255,255,.9);line-height:1.5">'+c+'</span>'
          +'</div>';
      }).join('')
      +'<div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,.15)">'
      +'<div style="font-size:.52rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:8px">📋 Plan d\'action · Applicable maintenant</div>'
      +evaPlan.actions.map(function(a,i){
        return '<div style="display:flex;gap:8px;margin-bottom:7px">'
          +'<span style="background:#fbbf24;color:#1e3a5f;font-size:.5rem;font-weight:900;border-radius:4px;padding:2px 5px;flex-shrink:0;height:fit-content;margin-top:2px">'+(i+1)+'</span>'
          +'<span style="font-size:.66rem;color:rgba(255,255,255,.9);line-height:1.5">'+a+'</span>'
          +'</div>';
      }).join('')
      +'</div>'
      +'<button onclick="evaOpenWithMessage(\'coach\')" style="width:100%;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.3);border-radius:9px;padding:10px;font-size:.72rem;font-weight:800;color:#fff;cursor:pointer;font-family:inherit;margin-top:12px">💬 Approfondir avec Eva →</button>'
      +'</div>';
  }

  var el=document.getElementById(resultDivId);
  el.innerHTML=
    // Score
    '<div style="text-align:center;margin-bottom:22px">'
    +'<div style="width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,'+cfg.color+','+cfg.color2+');display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(0,0,0,.18)">'
    +'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
    +'</div>'
    +'<div style="font-size:.48rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:'+cfg.color+';margin-bottom:6px">Ton résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,'+cfg.color+','+cfg.color2+');border-radius:4px;transition:width 1s ease"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:'+cfg.color+';margin-top:4px">'+level+'</div>'
    +'<div style="font-size:.7rem;color:#64748b;margin-top:6px;font-style:italic">'+advice+'</div>'
    +'</div>'

    // Partage WhatsApp + Telegram
    +'<div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px;margin-bottom:14px">'
    +'<div style="font-size:.54rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#0f172a;margin-bottom:4px;text-align:center">📣 Partage ton score</div>'
    +'<div style="font-size:.6rem;color:#64748b;text-align:center;margin-bottom:10px;font-style:italic">"Certains scores méritent d\'être vus par les bonnes personnes..."</div>'
    +'<div style="display:flex;gap:8px">'
    +'<button onclick="shareQCM(\'whatsapp\',\''+cfg.name+'\','+s+')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#25d366;border:none;border-radius:10px;padding:11px;cursor:pointer;font-family:inherit">'
    +'<svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
    +'<span style="font-size:.7rem;font-weight:700;color:#fff">WhatsApp</span></button>'
    +'<button onclick="shareQCM(\'telegram\',\''+cfg.name+'\','+s+')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#0088cc;border:none;border-radius:10px;padding:11px;cursor:pointer;font-family:inherit">'
    +'<svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.607c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.26 14.4l-2.95-.924c-.64-.203-.654-.64.136-.948l11.527-4.445c.534-.194 1.002.13.589.165z"/></svg>'
    +'<span style="font-size:.7rem;font-weight:700;color:#fff">Telegram</span></button>'
    +'</div></div>'

    // Points acquis (déroulant)
    +'<div style="margin-bottom:8px">'
    +'<button onclick="var z=document.getElementById(\'ok-'+resultDivId+'\');var a=document.getElementById(\'ok-arrow-'+resultDivId+'\');var open=z.style.display!==\'none\';z.style.display=open?\'none\':\'block\';a.style.transform=open?\'rotate(0deg)\':\'rotate(90deg)\';" style="width:100%;display:flex;align-items:center;justify-content:space-between;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:11px 14px;cursor:pointer;font-family:inherit">'
    +'<div style="display:flex;align-items:center;gap:7px">'
    +'<span style="font-size:.8rem">✅</span>'
    +'<span style="font-size:.72rem;font-weight:700;color:#059669">Points acquis ('+okAnswers.length+')</span>'
    +'</div>'
    +'<svg id="ok-arrow-'+resultDivId+'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" style="transition:transform .2s;transform:rotate(0deg)"><path d="M9 18l6-6-6-6"/></svg>'
    +'</button>'
    +'<div id="ok-'+resultDivId+'" style="display:none;padding:8px 4px 0">'
    +okAnswers.map(function(a,i){
      return '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:9px 12px;margin-bottom:6px">'
        +'<div style="font-size:.66rem;font-weight:700;color:#334155;margin-bottom:3px;line-height:1.4">'+a.q+'</div>'
        +'<div style="font-size:.62rem;color:#059669;font-weight:600">✓ '+a.chosen+'</div>'
        +'</div>';
    }).join('')
    +'</div></div>'

    // Points à améliorer (déroulant)
    +(koAnswers.length>0?
    '<div style="margin-bottom:14px">'
    +'<button onclick="var z=document.getElementById(\'ko-'+resultDivId+'\');var a=document.getElementById(\'ko-arrow-'+resultDivId+'\');var open=z.style.display!==\'none\';z.style.display=open?\'none\':\'block\';a.style.transform=open?\'rotate(0deg)\':\'rotate(90deg)\';" style="width:100%;display:flex;align-items:center;justify-content:space-between;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:11px 14px;cursor:pointer;font-family:inherit">'
    +'<div style="display:flex;align-items:center;gap:7px">'
    +'<span style="font-size:.8rem">📌</span>'
    +'<span style="font-size:.72rem;font-weight:700;color:#dc2626">Points à améliorer ('+koAnswers.length+')</span>'
    +'</div>'
    +'<svg id="ko-arrow-'+resultDivId+'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" style="transition:transform .2s;transform:rotate(0deg)"><path d="M9 18l6-6-6-6"/></svg>'
    +'</button>'
    +'<div id="ko-'+resultDivId+'" style="display:none;padding:8px 4px 0">'
    +koAnswers.map(function(a){
      return '<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:9px 12px;margin-bottom:6px">'
        +'<div style="font-size:.66rem;font-weight:700;color:#334155;margin-bottom:3px;line-height:1.4">'+a.q+'</div>'
        +'<div style="font-size:.62rem;color:#dc2626;font-weight:600">✗ '+a.chosen+'</div>'
        +'<div style="font-size:.6rem;color:#059669;margin-top:3px;font-weight:600">→ '+a.correct_ans+'</div>'
        +'</div>';
    }).join('')
    +'</div></div>'
    :'')

    // Plan Eva
    +planHTML

    // Boutons bas
    +'<button onclick="'+resetFn+'();go(\''+screenId+'\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px;font-size:.74rem;font-weight:700;color:'+cfg.color+';cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Nouvelle session (questions différentes)</button>'
    +'<button onclick="go(\'home\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:\'DM Sans\',sans-serif">← Retour accueil</button>';
}

// ── ENGINE QCM GÉNÉRIQUE ──
function qcmEngine(cfg){
  var state={questions:[],cur:0,score:0,answers:[]};
  var NS='QCM_'+cfg.id;
  _QJokers={cinqcinq:true,ami:true,pct:true};

  function reset(){ state={questions:pick10(cfg.bank),cur:0,score:0,answers:[],_ns:NS}; }

  function finish(){
    _chronoStop();
    document.getElementById(cfg.barId).style.width='100%';
    document.getElementById(cfg.stepId).textContent='Terminé !';
    document.getElementById(cfg.pctId).textContent='100%';
    var good=(state.score/state.questions.length)>=0.6;
    setTimeout(function(){ _confetti(good); },200);
    if(cfg.id==='qcm7'){ showQuizAREResult(state); }
    else if(cfg.id==='qcm8'){ showQuizEntretienDemandeurResult(state); }
    else if(cfg.id==='qcm9'){ showQuizCPFResult(state); }
    else if(cfg.id==='qcm10'){ showQuizReconversionResult(state); }
    else if(cfg.id==='qcm11'){ showQuizFreelanceStatutResult(state); }
    else if(cfg.id==='qcm12'){ showQuizFreelanceMissionsResult(state); }
    else if(cfg.id==='qcm13'){ showQuizEtudiantAlternanceResult(state); }
    else if(cfg.id==='qcm14'){ showQuizEtudiantEmploiResult(state); }
    else if(cfg.id==='qcm15'){ showQuizPosteDroitsResult(state); }
    else if(cfg.id==='qcm16'){ showQuizPosteIntegrationResult(state); }
    else { renderQCMResult(cfg, state, cfg.resultDivId, cfg.screenId, 'qcmReset_'+cfg.id); go(cfg.resultScreenId); }
  }

  function next(){
    _chronoStop();
    if(state.cur<state.questions.length-1){ state.cur++; render(); window.scrollTo(0,0); }
    else { finish(); }
  }

  function render(){
    var q=state.questions[state.cur];
    var tot=state.questions.length;
    var pct=Math.round(((state.cur)/tot)*100);
    document.getElementById(cfg.barId).style.width=pct+'%';
    var pr=(_QSession&&_QSession.prenom)?_QSession.prenom:'';
    document.getElementById(cfg.stepId).textContent=(pr?pr+' · ':'')+' Q'+(state.cur+1)+'/'+tot;
    document.getElementById(cfg.pctId).textContent=pct+'%';
    // Exposer l'état actif pour les jokers
    window._qcmActiveState=state;
    _QJokerUsedThisQ=false;
    var zone=document.getElementById(cfg.zoneId);
    var optsHtml=q.opts.map(function(o,i){
      return '<div onclick="qcmAnswer_'+cfg.id+'('+i+')" data-oi="'+i+'" data-ns="'+NS+'"'
        +' style="display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:5px;cursor:pointer;transition:all .2s"'
        +' onmousedown="this.style.borderColor=\''+cfg.color+'\';this.style.background=\''+cfg.bgLight+'\'"'
        +' onmouseup="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'"'
        +' ontouchstart="this.style.borderColor=\''+cfg.color+'\';this.style.background=\''+cfg.bgLight+'\'"'
        +' ontouchend="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'">'
        +'<div style="width:24px;height:24px;border-radius:50%;background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.6rem;font-weight:800;color:#64748b">'+String.fromCharCode(65+i)+'</div>'
        +'<span style="font-size:.79rem;color:#334155;line-height:1.35">'+o+'</span>'
        +'</div>';
    }).join('');
    zone.innerHTML=
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">'
      +_jokersBar(NS)
      +'<button type="button" onclick="qcmPause_'+cfg.id+'()" style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #e2e8f0;border-radius:99px;padding:7px 13px;font-family:inherit;font-size:.66rem;font-weight:700;color:#475569;cursor:pointer;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.06)">'
      +'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="9" y1="6" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="18"/></svg>Je dois interrompre</button>'
      +'</div>'
      +'<div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.05)">'
      +'<div style="font-size:.58rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+cfg.color+';margin-bottom:10px">Question '+(state.cur+1)+'</div>'
      +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.18rem;color:#0f172a;line-height:1.5;margin-bottom:18px">'+q.q+'</div>'
      +optsHtml
      +'</div>';
    _chronoStart('chrono_'+NS, function(){ _jToast('⏱️ Temps écoulé — question suivante !'); next(); });
    window['qcmAnswer_'+cfg.id]=function(idx){
      _chronoStop();
      var ok=idx===q.a;
      if(_QJokerUsedThisQ) _thumbAnim(ok);
      _QJokerUsedThisQ=false;
      if(ok) state.score++;
      state.answers.push({q:q.q,chosen:q.opts[idx],correct_ans:q.opts[q.a],ok:ok});
      _qcmSelect(NS, idx, cfg.color, function(){ next(); });
    };
  }

  // ── Pause : « On poursuit ou on arrête ? » ──
  window['qcmPause_'+cfg.id]=function(){
    _chronoStop();
    var old=document.getElementById('_qpOv'); if(old) old.remove();
    var tot=state.questions.length, done=state.cur;
    var ov=document.createElement('div'); ov.id='_qpOv';
    ov.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:9991;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box';
    ov.innerHTML='<div style="background:#fff;border-radius:22px;padding:24px 20px 20px;max-width:400px;width:100%;box-shadow:0 24px 70px rgba(15,23,42,.28);text-align:center;animation:cpQiIn .3s cubic-bezier(.2,.8,.2,1) both">'
      +'<div style="width:48px;height:48px;border-radius:14px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,#15c08f,#0a9a74 48%,#067357);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 6px 16px -6px rgba(6,90,70,.55)">'
      +'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><line x1="9" y1="6" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="18"/></svg></div>'
      +'<div style="font-size:.95rem;font-weight:800;color:#0f172a;margin-bottom:6px">Quiz en pause</div>'
      +'<div style="font-size:.72rem;color:#4b5563;line-height:1.55;margin-bottom:18px">Tu en es à la question <b>'+(done+1)+' / '+tot+'</b>.<br>On poursuit ou on arrête ?</div>'
      +'<div style="display:flex;gap:8px">'
      +'<button type="button" onclick="qcmStop_'+cfg.id+'()" style="flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;font-family:inherit;font-size:.78rem;font-weight:700;color:#b91c1c;cursor:pointer">Arrêter</button>'
      +'<button type="button" onclick="qcmResume_'+cfg.id+'()" style="flex:1.4;background:#059669;border:none;border-radius:12px;padding:12px;font-family:inherit;font-size:.78rem;font-weight:700;color:#fff;cursor:pointer">On poursuit</button>'
      +'</div></div>';
    document.body.appendChild(ov);
  };
  window['qcmResume_'+cfg.id]=function(){
    var ov=document.getElementById('_qpOv'); if(ov) ov.remove();
    render();
  };
  window['qcmStop_'+cfg.id]=function(){
    var ov=document.getElementById('_qpOv'); if(ov) ov.remove();
    _chronoStop();
    reset();
    if(typeof _jToast==='function') _jToast('Quiz arrêté — tu pourras le reprendre quand tu veux.');
    go('quiz-hub');
  };

  window['qcmReset_'+cfg.id]=function(){
    _rulesShown=true;
    quizIntro(function(){
      _QJokers={cinqcinq:true,ami:true,pct:true};
      reset(); render();
    });
  };
  reset(); render();
}

// ── BANQUES 25 QUESTIONS PAR QCM ──

var BANK_ENTRETIEN=[
  {q:"Vous avez passé 2 ans en auto-entrepreneur avant ce poste. Le recruteur demande : 'Vous étiez freelance, ça veut dire que vous n'avez pas trouvé de CDI ?' Comment répondez-vous ?",opts:["Admettre que c'était difficile de trouver","Expliquer que c'était un choix délibéré pour développer des compétences sur des projets variés","Changer de sujet","Dire que le freelance c'est mieux que le CDI"],a:1},
  {q:"Le recruteur propose 38k€, vous attendez 44k€. Il dit 'C'est notre grille, on ne peut pas faire mieux.' Que faites-vous ?",opts:["Accepter immédiatement pour ne pas perdre le poste","Demander si des avantages non-salariaux (télétravail, intéressement, formation) compensent l'écart","Partir sans répondre","Mentionner une autre offre fictive pour faire pression"],a:1},
  {q:"En plein entretien, le recruteur vous dit : 'Franchement, vous êtes surqualifié pour ce poste.' Quelle est votre vraie réponse ?",opts:["Dire que vous acceptez n'importe quoi","Expliquer que la surqualification est un atout, pas un risque — montrer pourquoi CE poste vous attire vraiment","Proposer de baisser vos prétentions","Reconnaître qu'effectivement c'est peut-être trop bas pour vous"],a:1},
  {q:"Question piège : 'Où vous voyez-vous dans 5 ans ?' Sachant que l'entreprise recrute pour un poste évolutif, quelle est la meilleure réponse ?",opts:["Dire 'PDG de votre entreprise' pour montrer de l'ambition","Répondre 'je ne sais pas, ça dépend des opportunités'","Articuler une trajectoire réaliste en lien avec le poste, en montrant que vous voulez grandir avec l'entreprise","Dire que vous cherchez la stabilité avant tout"],a:2},
  {q:"Le recruteur vous demande votre plus grand échec professionnel. Il observe votre réaction autant que votre réponse. Que faites-vous vraiment ?",opts:["Donner un 'faux défaut' comme 'je travaille trop'","Choisir un échec réel, expliquer ce que vous avez appris et comment vous avez changé depuis","Dire que vous n'avez pas d'échec significatif","Blâmer votre ancien employeur pour l'échec"],a:1},
  {q:"Pendant un entretien vidéo, votre connexion coupe 10 secondes. Quand elle revient, le recruteur n'a pas entendu votre réponse. Que faites-vous ?",opts:["Répéter exactement la même chose sans le mentionner","Vous excuser, résumer brièvement et demander si tout est bien reçu","Attendre qu'il pose une autre question","Proposer de reporter l'entretien"],a:1},
  {q:"Le recruteur vous demande : 'Pourquoi voulez-vous quitter votre employeur actuel ?' sans le savoir, il connaît votre ancien manager. Quelle est la seule approche sûre ?",opts:["Critiquer discrètement le management","Parler uniquement en termes de recherche de nouvelles opportunités et d'évolution","Mentir sur les raisons","Refuser de répondre à cette question"],a:1},
  {q:"On vous demande de décrire votre style de travail. Vous êtes très autonome mais le poste demande beaucoup de collaboration. Comment répondez-vous ?",opts:["Dire que vous adorez travailler en équipe même si c'est faux","Mentionner votre autonomie ET votre capacité à collaborer — en citant un exemple concret de projet collectif","Admettre que vous préférez travailler seul","Poser une question pour éviter de répondre"],a:1},
  {q:"Après l'entretien, le recruteur dit 'On vous rappelle.' 12 jours s'écoulent sans nouvelles. Quelle est la relance optimale ?",opts:["Appeler tous les jours jusqu'à obtenir une réponse","Envoyer un email court, professionnel, rappelant votre intérêt et demandant l'état du processus","Ne jamais relancer, si c'est bon ils rappelleront","Contacter directement le DRH en passant par LinkedIn"],a:1},
  {q:"Le recruteur vous demande : 'Avez-vous d'autres processus en cours ?' Vous avez effectivement 2 entretiens prévus la semaine suivante. Que répondez-vous ?",opts:["Nier pour ne pas paraître infidèle","Confirmer honnêtement — cela renforce votre valeur sans détails superflus","Mentionner uniquement les postes moins bien que celui-ci","Refuser de répondre à cette question"],a:1},
  {q:"Vous préparez un entretien pour un poste commercial. Quelle donnée sur l'entreprise vous sera la plus utile en entretien ?",opts:["Le nombre d'employés sur LinkedIn","Le CA de l'entreprise et sa croissance sur les 3 dernières années selon les rapports disponibles","Le nom du PDG","L'adresse du siège social"],a:1},
  {q:"Le recruteur vous pose une question comportementale : 'Citez une fois où vous avez dû gérer un conflit.' Vous n'avez pas de bon exemple. Quelle est la moins mauvaise option ?",opts:["Inventer un exemple fictif convaincant","Choisir l'exemple le plus proche disponible, même imparfait, et rester factuel","Dire que vous n'avez jamais eu de conflit","Expliquer que vous évitez toujours les conflits"],a:1},
  {q:"On vous remet une étude de cas à traiter en 20 minutes pendant l'entretien. Vous réalisez après 10 minutes que votre approche est mauvaise. Que faites-vous ?",opts:["Continuer sans rien dire pour ne pas paraître hésitant","Stopper, recentrer votre approche et expliquer brièvement que vous avez trouvé un meilleur angle","Demander plus de temps","Remettre un travail incomplet sans le signaler"],a:1},
  {q:"Vous postulez dans une PME de 20 personnes après 8 ans en grand groupe. Le recruteur demande si vous saurez vous adapter à moins de ressources. Comment répondez-vous réellement ?",opts:["Promettre que vous adorerez ça sans argumenter","Reconnaître la différence culturelle, citer un projet où vous avez travaillé avec des contraintes fortes, montrer votre adaptabilité","Minimiser la différence entre PME et grand groupe","Expliquer que les grand groupes sont moins agiles"],a:1},
  {q:"La dernière question de l'entretien est : 'Avez-vous des questions ?' Il est 18h30 et le recruteur est visiblement fatigué. Que faites-vous ?",opts:["Dire 'Non, tout est clair' pour abréger","Poser 1-2 questions préparées, précises et pertinentes sur les enjeux du poste ou la suite du processus","Poser 10 questions pour montrer votre intérêt","Poser des questions sur les avantages et les congés"],a:1},
  {q:"Un recruteur vous demande votre salaire actuel alors que c'est illégal en France. Que faites-vous ?",opts:["Répondre honnêtement pour montrer votre bonne foi","Indiquer poliment que vous préférez parler de vos prétentions plutôt que de votre salaire actuel","Mentir sur votre salaire actuel","Quitter l'entretien immédiatement"],a:1},
  {q:"Vous passez un 3ème entretien avec le futur N+2. Il vous demande pourquoi vous n'avez pas encore de management alors que vous avez 7 ans d'expérience. Quelle réponse est la plus intelligente ?",opts:["Dire que vous n'aimez pas manager","Expliquer vos choix de parcours en montrant comment vous avez eu une influence transversale sans titre formel","Promettre que vous voulez manager maintenant","Attribuer ça à des circonstances extérieures"],a:1},
  {q:"Le recruteur vous envoie un test technique à faire chez vous en 3 jours. Il est beaucoup plus difficile que prévu. Comment gérez-vous ?",opts:["Envoyer un travail bâclé dans les temps","Rendre un travail partiel mais qualitatif, en mentionnant honnêtement les limites et ce que vous auriez fait avec plus de temps","Demander une prolongation de 2 semaines","Copier des solutions disponibles en ligne"],a:1},
  {q:"Vous réalisez pendant l'entretien que le poste décrit est très différent de l'offre publiée. Que faites-vous ?",opts:["Faire semblant de n'avoir rien remarqué","Demander directement et calmement si l'offre a évolué et quelles sont les responsabilités réelles","Accepter quoi qu'il arrive","Exprimer votre mécontentement"],a:1},
  {q:"Le recruteur vous dit : 'Notre processus prend 6 semaines.' Vous avez une autre offre dans 10 jours. Comment gérez-vous cette tension ?",opts:["Accepter l'autre offre sans rien dire","Informer le recruteur de votre contrainte de timing de façon professionnelle et demander si un processus accéléré est possible","Inventer une fausse contrainte","Attendre passivement en espérant que tout s'arrange"],a:1},
  {q:"En entretien, on vous demande d'évaluer les forces et faiblesses d'un concurrent direct de l'entreprise. Vous ne connaissez pas ce concurrent. Que dites-vous ?",opts:["Inventer une analyse fictive","Admettre que vous ne le connaissez pas en détail et proposer d'en faire une analyse dans les 48h","Donner un avis vague et générique","Parler d'un autre concurrent que vous connaissez"],a:1},
  {q:"Le recruteur RH vous demande si vous êtes disponible immédiatement alors que vous avez 3 mois de préavis. Quelle est la meilleure réponse ?",opts:["Mentir en disant que vous êtes disponible dans 2 semaines","Annoncer clairement votre préavis de 3 mois tout en proposant de négocier avec votre employeur actuel","Proposer de partir sans respecter votre préavis","Dire que vous ne savez pas encore"],a:1},
  {q:"On vous demande : 'Pourquoi vous et pas un autre ?' Il reste 2 finalistes. Quelle réponse vous distingue vraiment ?",opts:["Dire que vous êtes le meilleur candidat sans argument","Articuler précisément ce que vous apportez de spécifique sur les 2-3 enjeux clés du poste — avec des preuves concrètes","Répondre par des qualités génériques comme 'motivé, sérieux, impliqué'","Critiquer les autres candidats"],a:1},
  {q:"Le manager qui vous recrute quitte l'entreprise 3 semaines après votre embauche. Vous l'appreniez en entretien final. Que demandez-vous ?",opts:["Rien, c'est une information confidentielle","Demander comment le management de transition sera géré et si les missions restent inchangées","Retirer votre candidature immédiatement","Demander à rencontrer le futur remplaçant avant de signer"],a:3},
  {q:"Vous avez dit pendant l'entretien que vous parliez couramment espagnol. Le recruteur vous pose soudainement une question en espagnol. Votre niveau est en réalité B1. Que faites-vous ?",opts:["Répondre en mauvais espagnol et espérer que ça passe","Admettre que votre niveau opérationnel est B1-B2 et que vous travaillez à l'améliorer","Prétendre ne pas avoir entendu","Dire que vous comprenez mieux l'écrit que l'oral"],a:1}
];

var BANK_STRATEGIE=[
  {q:"Vous cherchez un emploi depuis 4 mois sans succès malgré de nombreuses candidatures. Quelle est la vraie erreur la plus probable ?",opts:["Vous n'avez pas assez postulé","Vous ciblez trop large sans vous différencier — un profil générique ne retient personne","Votre CV a trop de pages","Vous relancez trop rapidement les recruteurs"],a:1},
  {q:"Le marché caché représente selon certaines études entre 50 et 80% des postes pourvus. Comment y accéder concrètement ?",opts:["En envoyant des candidatures spontanées en masse","En activant ses relations professionnelles, en rencontrant des professionnels du secteur avant qu'il y ait une offre","En consultant des sites d'emploi obscurs","En contactant directement les PDG"],a:1},
  {q:"Vous avez 2 offres : l'une à 52k€ dans une grande entreprise stable, l'autre à 44k€ dans une startup mais avec 0,5% de BSPCE. Comment évaluez-vous vraiment la valeur totale ?",opts:["Choisir automatiquement la grande entreprise plus stable","Calculer la valeur potentielle des BSPCE selon des scénarios réalistes et comparer les évolutions de carrière","Choisir selon la proximité géographique","Refuser les deux et chercher mieux"],a:1},
  {q:"Un recruteur vous contacte sur LinkedIn pour un poste qui ne vous intéresse pas vraiment mais vient d'une grande entreprise cible. Comment répondez-vous ?",opts:["Ignorer le message pour ne pas perdre de temps","Répondre poliment, décliner le poste spécifique mais exprimer votre intérêt pour l'entreprise et demander à garder le contact","Accepter l'entretien même sans intérêt pour le poste","Demander s'il a d'autres postes disponibles immédiatement"],a:1},
  {q:"Votre profil LinkedIn a été vu 200 fois ce mois-ci mais aucun recruteur ne vous a contacté. Quel est probablement le problème ?",opts:["Votre photo de profil n'est pas assez professionnelle","Votre titre ne reflète pas votre valeur ajoutée et vos compétences clés — les recruteurs scannent en 3 secondes","Vous n'avez pas assez de connexions","Votre profil est trop complet"],a:1},
  {q:"Vous cherchez un poste en reconversion vers la data. Vous n'avez aucune expérience data sur votre CV. Quelle est la stratégie la plus efficace à 6 mois ?",opts:["Postuler quand même en espérant convaincre","Construire 2-3 projets concrets publiés sur GitHub + une certification reconnue + cibler des entreprises ouvertes aux profils atypiques","Faire un master de 2 ans d'abord","Attendre qu'une entreprise vous forme"],a:1},
  {q:"Vous négociez une offre d'emploi. Le recruteur dit que le salaire est non-négociable. Que faites-vous en réalité ?",opts:["Accepter immédiatement ou refuser","Négocier les éléments non-salariaux : télétravail, jours de congé supplémentaires, prime de performance, budget formation","Menacer de refuser pour forcer une hausse","Demander une réponse dans 3 semaines"],a:1},
  {q:"Vous avez été licencié pour motif économique il y a 6 mois. Un recruteur vous demande pourquoi vous avez quitté votre précédent poste. Que dites-vous ?",opts:["Dire que vous avez démissionné","Mentionner le licenciement économique clairement — c'est vérifiable et la honte n'est pas justifiée","Inventer une raison positive","Éviter de répondre directement"],a:1},
  {q:"Vous avez reçu une offre mais l'entreprise met 3 semaines à vous envoyer le contrat. Que faites-vous ?",opts:["Attendre indéfiniment et refuser d'autres offres","Confirmer par écrit votre accord verbal, continuer d'autres processus discrètement et fixer une deadline raisonnable","Annuler votre candidature","Relancer chaque jour"],a:1},
  {q:"Vous venez d'accepter un poste mais recevez une offre bien meilleure 5 jours plus tard. Vous n'avez pas encore signé. Que faites-vous ?",opts:["Signer la première et ignorer la seconde","Analyser objectivement les deux offres — ne pas signer engendre moins de conséquences que rompre un engagement signé","Accepter les deux et choisir plus tard","Demander à la seconde entreprise d'attendre 3 mois"],a:1},
  {q:"Comment quantifier l'impact de son travail sur son CV pour un poste non-commercial sans chiffres de vente ?",opts:["Éviter les chiffres et rester dans le qualitatif","Chiffrer les résultats en temps économisé, coûts réduits, projets livrés en avance, équipes managées ou taux de satisfaction","Inventer des chiffres plausibles","Mettre uniquement des verbes d'action sans résultats"],a:1},
  {q:"Un chasseur de tête vous approche pour un poste confidentiel sans vous dévoiler l'entreprise. Quelles informations devez-vous absolument obtenir avant de vous positionner ?",opts:["Le nom de l'entreprise avant tout","Le secteur, la taille, les responsabilités, le package estimé et la raison du recrutement — pour évaluer sans connaître le nom","Le salaire uniquement","Le nom du manager direct"],a:1},
  {q:"Vous cherchez un poste senior mais toutes les offres demandent un niveau que vous n'avez pas encore. Quelle est la stratégie la plus efficace ?",opts:["Ne postuler qu'aux postes pour lesquels vous cochez 100% des critères","Postuler si vous cochez 70%+ des critères en montrant comment vous comblerez l'écart rapidement","Attendre 2 ans pour avoir l'expérience requise","Postuler à des postes inférieurs pour avoir une expérience"],a:1},
  {q:"Votre ancien manager, avec qui vous avez eu un conflit, est listé comme référence par l'entreprise qui vous recrute. Que faites-vous ?",opts:["Espérer qu'ils ne l'appellent pas","Informer proactivement le recruteur que cette relation était tendue tout en relativisant et en proposant d'autres références solides","Demander à l'entreprise de ne pas le contacter sans explication","Contacter votre ancien manager pour lui demander de mentir"],a:1},
  {q:"Vous avez passé 5 ans dans une niche très spécialisée. Comment vous repositionnez-vous pour un poste plus généraliste ?",opts:["Présenter uniquement les compétences techniques de la niche","Mettre en avant les compétences transversales développées — gestion de projet, communication, analyse — et relier votre expertise niche comme un atout différenciant","Cacher votre spécialisation","Postuler uniquement dans votre niche"],a:1},
  {q:"Un recruteur vous dit après entretien que vous n'avez pas été retenu mais ne donne pas de raison. Quelle action a le plus de valeur ?",opts:["Rien, c'est terminé","Remercier, demander poliment un retour constructif pour progresser et demander si vous pouvez rester dans leur vivier","Relancer plusieurs fois pour avoir une explication","Déposer une réclamation sur les raisons du refus"],a:1},
  {q:"Vous cherchez un poste dans un secteur en déclin. Comment adaptez-vous votre stratégie ?",opts:["Continuer à postuler dans ce secteur en espérant trouver","Identifier les compétences transférables et cibler des secteurs adjacents en croissance où votre expérience est valorisée","Attendre que le secteur remonte","Accepter n'importe quel poste disponible"],a:1},
  {q:"Lors d'un salon de recrutement, vous avez 45 secondes avec un recruteur très sollicité. Que faites-vous concrètement ?",opts:["Lui expliquer tout votre parcours en détail","Délivrer un pitch de 20-30 secondes : qui vous êtes, votre valeur unique, et demander comment soumettre votre candidature","Lui donner votre CV en silence","Parler des problèmes du marché de l'emploi"],a:1},
  {q:"Vous avez un trou de 14 mois sur votre CV pour raisons personnelles. Comment le présentez-vous ?",opts:["Le cacher en changeant les dates","L'assumer avec une explication brève et positive, en mentionnant ce que vous avez fait si pertinent (formation, projet, aidant familial)","Dire que c'était du chômage","Refuser d'en parler en entretien"],a:1},
  {q:"Deux entreprises vous font une offre simultanément. L'une est plus connue, l'autre offre plus de responsabilités. Quel critère doit primer ?",opts:["Toujours choisir la marque la plus connue pour le CV","Analyser selon votre projet à 3-5 ans : les responsabilités développent les compétences plus vite que la notoriété du nom","Choisir selon le salaire uniquement","Choisir la plus proche géographiquement"],a:1},
  {q:"Comment mesurer si votre stratégie de recherche fonctionne ou non après 2 mois ?",opts:["Compter le nombre de candidatures envoyées","Analyser le taux de réponse à vos candidatures, le nombre d'entretiens obtenus et à quelle étape vous êtes refusé — chaque étape indique un problème différent","Attendre 6 mois avant de changer quoi que ce soit","Demander à vos amis si votre CV est bien"],a:1},
  {q:"Vous postulez en CDI mais l'entreprise propose une période d'essai de 6 mois renouvelable une fois. Est-ce normal et qu'est-ce que ça implique ?",opts:["Non c'est illégal, il faut refuser","Pour les cadres, 4 mois renouvelables une fois est légal. 6 mois non-cadre est au-dessus du plafond légal — il faut vérifier votre convention collective","Signer sans vérifier","Négocier pour réduire à 1 mois"],a:1},
  {q:"Votre recherche se concentre sur des grandes entreprises mais vous n'avez aucune réponse. Les PME vous semblent moins attractives. Quel biais cognitif vous freine ?",opts:["Vous êtes trop qualifié pour les PME","Un biais de notoriété — les PME embauchent davantage, offrent souvent plus de polyvalence et de rapidité d'évolution","Votre CV est trop court","Vous ne connaissez pas les PME de votre secteur"],a:1},
  {q:"Un cabinet de recrutement vous contacte pour soumettre votre candidature à une entreprise cliente. Quel droit vous est garanti légalement en France ?",opts:["Le cabinet peut soumettre votre CV sans vous demander","Le cabinet doit obtenir votre accord explicite avant de transmettre votre CV à l'entreprise cliente","L'entreprise peut vous contacter directement sans passer par le cabinet","Le cabinet peut partager vos données avec toutes ses entreprises clientes"],a:1},
  {q:"Vous cherchez un poste mais vous travaillez toujours. Comment organisez-vous concrètement votre recherche sans que ça impacte votre travail actuel ?",opts:["Consacrer vos heures de travail à la recherche","Bloquer des créneaux fixes (matin tôt, pause déjeuner, soir) — traiter la recherche comme un 2ème projet avec des objectifs hebdomadaires","Chercher uniquement le week-end","Prévenir votre employeur de votre intention de partir"],a:1}
];

var BANK_LEADERSHIP=[
  {q:"Votre équipe de 6 personnes livre systématiquement en retard depuis 3 mois. Vous avez déjà organisé 2 réunions sans résultat. Quelle est votre prochaine action ?",opts:["Organiser une 3ème réunion plus longue","Mener des entretiens individuels pour comprendre les blocages réels de chacun — le problème collectif cache souvent des problèmes individuels différents","Menacer de sanctions","Tout faire vous-même pour respecter les délais"],a:1},
  {q:"Un collaborateur très compétent devient de plus en plus négatif en réunion et contamine l'équipe. Comment gérez-vous ce profil ?",opts:["L'ignorer car il est trop précieux","Le rencontrer en privé pour comprendre sa source d'insatisfaction et co-construire une solution — la négativité masque souvent une frustration légitime","Le sanctionner en réunion devant l'équipe","Lui confier moins de responsabilités"],a:1},
  {q:"Vous devez annoncer une réorganisation impopulaire décidée par la direction sans avoir été consulté. Comment la présentez-vous à votre équipe ?",opts:["La présenter comme une excellente idée que vous défendez pleinement","Être transparent : expliquer le contexte, dire que vous n'avez pas choisi mais que vous allez accompagner le changement ensemble","Mettre en cause la direction pour préserver votre image","Minimiser l'impact pour éviter les questions"],a:1},
  {q:"Deux membres de votre équipe ont un conflit personnel qui impacte leurs livrables. L'un veut que l'autre soit muté. Que faites-vous ?",opts:["Muter l'un des deux immédiatement","Rencontrer chacun séparément, puis ensemble avec un cadre clair — la mutation est une solution de dernier recours","Ignorer car ce sont des adultes","Leur demander de régler ça entre eux"],a:1},
  {q:"Votre N+1 vous demande de surveiller le travail d'un collaborateur et de lui envoyer des rapports confidentiels. Vous trouvez ça contraire à vos valeurs. Que faites-vous ?",opts:["Obéir sans poser de questions","Demander à votre N+1 les raisons et proposer une approche alternative qui préserve la confiance de l'équipe","Refuser directement et sans explication","Prévenir le collaborateur concerné"],a:1},
  {q:"Vous devez évaluer un collaborateur dont le travail est correct mais dont la personnalité vous irrite. Comment gérez-vous votre biais ?",opts:["Évaluer selon votre ressenti global","Vous appuyer uniquement sur des faits documentés et des résultats mesurables — demander à un pair de relire votre évaluation","Donner une bonne note pour éviter le conflit","Demander à quelqu'un d'autre de faire l'évaluation"],a:1},
  {q:"Un junior très prometteur vous dit qu'il envisage de partir car il ne voit pas d'évolution. Vous n'avez pas de promotion à offrir maintenant. Que faites-vous ?",opts:["Promettre une promotion vague pour le retenir","Avoir une conversation honnête sur le timing réaliste, construire un plan de développement concret et enrichir ses missions dans l'immédiat","Lui dire d'attendre sans rien proposer","Lui dire de chercher ailleurs s'il n'est pas content"],a:1},
  {q:"Votre équipe vient de rater un objectif important. La direction cherche des responsables. Quel rôle jouez-vous ?",opts:["Expliquer que c'est la faute de votre équipe","Assumer la responsabilité collective devant la direction tout en analysant en interne avec l'équipe pour progresser","Désigner le principal responsable dans l'équipe","Chercher des causes externes pour minimiser la faute"],a:1},
  {q:"Vous managez une équipe en télétravail total depuis 6 mois. L'engagement diminue visiblement. Quelle action a le plus d'impact ?",opts:["Obliger le retour au bureau immédiatement","Créer des rituels réguliers d'échange informel et des temps de feedback individuel — le lien humain compense le manque de présence physique","Organiser plus de réunions de suivi de projet","Surveiller les horaires de connexion"],a:1},
  {q:"Un collaborateur fait une erreur grave sur un dossier client. C'est la première fois. Comment réagissez-vous ?",opts:["Le sanctionner immédiatement pour marquer les esprits","Analyser l'erreur ensemble, comprendre les causes systémiques, définir des garde-fous — la sanction immédiate sur une première erreur détruit la confiance","Ignorer l'erreur pour ne pas le démotiver","L'exclure du dossier sans explication"],a:1},
  {q:"Vous héritez d'une équipe qui avait un manager autoritaire. L'équipe est passive et n'ose pas proposer d'idées. Quelle est votre priorité des 30 premiers jours ?",opts:["Imposer immédiatement votre propre style de leadership fort","Instaurer la sécurité psychologique par des gestes concrets : valoriser publiquement chaque initiative, même imparfaite","Réorganiser l'équipe dès le début","Évaluer chaque membre et décider qui garder"],a:1},
  {q:"Votre N+1 vous donne une directive que vous jugez éthiquement discutable mais pas illégale. Que faites-vous ?",opts:["Obéir sans réagir","Exprimer clairement votre réserve à votre N+1, documenter votre position et exécuter si la directive est maintenue — tout en notant votre désaccord","Refuser catégoriquement sans dialogue","Exécuter et en parler à des collègues"],a:1},
  {q:"Vous avez 8 personnes à manager. L'une d'elles a nettement plus de talent que vous dans son domaine technique. Comment la managez-vous ?",opts:["Éviter les sujets techniques avec elle","Assumer votre rôle d'orchestrateur et lui déléguer la décision technique — votre valeur est dans la vision, le déblocage et le contexte, pas l'expertise","Prouver que vous maîtrisez aussi la technique","La mettre en compétition avec les autres pour maintenir votre autorité"],a:1},
  {q:"Votre équipe vous demande votre avis sur une décision stratégique en réunion. Vous n'êtes pas sûr de votre position. Que faites-vous ?",opts:["Donner un avis ferme pour paraître décidé","Dire explicitement que vous avez besoin de réfléchir, poser des questions à l'équipe et revenir avec une position dans un délai précis","Éluder la question","Demander à votre N+1 avant de vous positionner en réunion"],a:1},
  {q:"Un collaborateur vous dit en privé qu'un autre membre de l'équipe harcèle ses collègues. Que faites-vous en premier ?",opts:["Ignorer jusqu'à avoir plus d'éléments","Recueillir les faits de façon confidentielle, protéger la personne qui vous informe et escalader aux RH selon la procédure interne","Confronter le présumé harceleur immédiatement","En parler à toute l'équipe pour savoir ce qui se passe vraiment"],a:1},
  {q:"Votre équipe doit livrer un projet en 3 semaines alors qu'il en faudrait 6 selon votre estimation. La direction ne veut pas changer le délai. Que faites-vous ?",opts:["Promettre la livraison en sachant que c'est impossible","Documenter les risques clairement, proposer un périmètre réduit livrable en 3 semaines et escalader la décision — vous ne signez pas pour un échec programmé","Faire faire des heures supplémentaires non-stop","Ignorer le planning et livrer en 6 semaines sans rien dire"],a:1},
  {q:"Quel est le principal signe qu'un manager micromanage son équipe sans le réaliser ?",opts:["Il organise trop de formations","Il demande à être en copie de tous les emails et valide chaque décision mineure","Il fait trop de 1:1","Il est trop disponible pour son équipe"],a:1},
  {q:"Vous venez de rejoindre une équipe en tant que nouveau manager. Un membre de l'équipe était candidat interne au poste. Comment gérez-vous cette situation ?",opts:["L'ignorer et faire comme si de rien n'était","Le rencontrer en priorité pour reconnaître la situation, valoriser son expertise et l'impliquer comme acteur clé — en faire un allié, pas un ennemi","Le tenir à l'écart des décisions importantes","Le favoriser pour compenser sa déception"],a:1},
  {q:"Comment distinguer un collaborateur qui manque de compétences d'un collaborateur qui manque de motivation ?",opts:["Il n'y a pas de différence, le résultat est le même","Tester si, avec l'environnement et les ressources adéquats, la performance change — le manque de compétences se corrige par la formation ; le manque de motivation par le sens et la reconnaissance","Sanctionner les deux de la même façon","Demander à ses collègues leur avis"],a:1},
  {q:"Votre entreprise fusionne avec une autre. Votre équipe de 5 va absorber 4 nouveaux membres d'une culture très différente. Quelle est votre 1ère priorité managériale ?",opts:["Imposer votre culture d'équipe rapidement","Créer des temps de connaissances mutuelles et de définition commune des façons de travailler — l'intégration culturelle prend du temps et du soin","Séparer les deux groupes le temps qu'ils s'habituent","Laisser les tensions se résorber naturellement"],a:1},
  {q:"Un collaborateur demande à travailler 4 jours sur 5 pour raisons personnelles. C'est la 1ère demande du genre dans l'équipe. Que faites-vous ?",opts:["Refuser pour éviter un précédent","Analyser l'impact sur l'équipe et le poste, discuter des modalités avec le collaborateur et les RH — si faisable, accepter avec un cadre clair","Accepter sans en parler aux RH","Demander à toute l'équipe si ça les dérange"],a:1},
  {q:"Quelle est la différence entre un KPI (indicateur de performance) et un OKR (Objective & Key Results) dans la pratique managériale ?",opts:["Ce sont des synonymes","Le KPI mesure une activité ou un état ; l'OKR fixe un objectif ambitieux et les résultats clés qui prouveront qu'on y est — l'OKR est plus orienté transformation","L'OKR est réservé aux startups","Les KPI sont plus modernes que les OKR"],a:1},
  {q:"Votre meilleur collaborateur vous annonce qu'il part chez un concurrent dans 1 mois. Que faites-vous dans les 24h qui suivent ?",opts:["Tenter de le retenir à tout prix avec une contre-offre","Organiser un passage de relais structuré, valoriser sa contribution et gérer l'annonce à l'équipe — une contre-offre crée rarement une fidélité durable","Ne rien faire et attendre la fin du préavis","Lui couper progressivement l'accès aux informations sensibles"],a:1},
  {q:"Comment gérer une réunion où 2 personnes monopolisent la parole et les autres n'osent pas s'exprimer ?",opts:["Laisser faire pour ne pas vexer les plus bavards","Utiliser des techniques de facilitation : tour de table structuré, parole nominative, brainstorming écrit — redistribuer activement la parole","Raccourcir la réunion","Faire des réunions séparées par affinités"],a:1}
];

var BANK_STRESS=[
  {q:"Vous avez une réunion importante dans 2 heures et vous venez de recevoir une mauvaise nouvelle personnelle. Votre concentration est nulle. Que faites-vous ?",opts:["Annuler la réunion sans explication","Appliquer la technique des 5 minutes : mettre la situation de côté mentalement le temps de la réunion en vous fixant un moment précis pour y revenir après","Participer à la réunion sans rien faire","Appeler un ami pour en parler maintenant"],a:1},
  {q:"Votre manager vous reproche lors d'une réunion d'équipe un travail que vous jugez injustement critiqué. Votre réaction émotionnelle est forte. Quelle est la bonne gestion dans l'instant ?",opts:["Répondre vivement pour défendre votre position","Accuser réception sans contre-attaque, demander un moment en privé pour approfondir — la réaction à chaud en réunion amplifie toujours le conflit","Quitter la réunion","Valider la critique même si elle est injuste"],a:1},
  {q:"Vous avez 3 deadlines simultanées impossibles à toutes tenir. Votre manager est indisponible. Que faites-vous ?",opts:["Travailler 18h d'affilée pour tout finir","Hiérarchiser selon l'impact business réel, informer par écrit les parties prenantes des priorités retenues et des délais ajustés","Choisir au hasard","Tout abandonner jusqu'au retour de votre manager"],a:1},
  {q:"Vous êtes en télétravail depuis 8 mois. Vous ressentez un isolement croissant. Quelle action a le plus d'impact sur le bien-être à long terme ?",opts:["Regarder plus de séries pour décompresser","Créer des rituels de contact humain réguliers : déjeuners physiques, appels informels hebdomadaires avec des collègues — l'isolement est un risque de santé documenté","Travailler plus pour ne pas se sentir inutile","Demander à revenir au bureau tous les jours"],a:1},
  {q:"Le syndrome de l'imposteur vous empêche de postuler à un poste supérieur. Vous remplissez 8 critères sur 10. Quelle est la vraie réponse ?",opts:["Attendre de cocher 10/10 avant de postuler","Postuler — les études montrent que les femmes postulent à 100% des critères remplis contre 60% pour les hommes, et les personnes avec ce syndrome sous-estiment systématiquement leur valeur","Demander à votre entourage si vous êtes légitime","Refuser tous les postes supérieurs à terme"],a:1},
  {q:"Vous devez présenter en public devant 80 personnes dans 3 jours. Vous avez une peur panique de la prise de parole. Quelle est la stratégie la plus efficace ?",opts:["Éviter la présentation en vous faisant remplacer","Répéter à voix haute 4-5 fois devant un miroir ou enregistré, recadrer le trac comme de l'énergie et vous concentrer sur la valeur que vous apportez au public","Apprendre tout par cœur mot à mot","Prendre un anxiolytique avant de parler"],a:1},
  {q:"Vous vous apercevez que vous vérifiez vos emails professionnels à 23h chaque soir depuis 3 mois. Quel est le risque réel et la solution ?",opts:["C'est normal pour un professionnel engagé","Vous développez une hyperconnexion qui dégrade votre récupération cognitive — créer un rituel de coupure numérique (heure fixe, notifications off, téléphone dans une autre pièce)","Vérifier vos emails à 23h est plus productif car c'est calme","Envoyer vos emails à 23h pour montrer votre investissement"],a:1},
  {q:"Un collègue critique régulièrement votre travail en réunion avec des arguments souvent valables. Vous le vivez comme des attaques personnelles. Comment gérez-vous cette dynamique ?",opts:["L'éviter dans toutes les réunions","Différencier la critique du travail de la critique de la personne — demander un feedback direct en privé pour comprendre sa perspective et casser la dynamique défensive","Contre-attaquer en criticant son travail","Parler de lui à votre manager"],a:1},
  {q:"Vous avez dit 'oui' à trop de projets et vous êtes en surcharge. Vous n'osez pas en parler car vous avez peur de paraître faible. Quelle est la vraie conséquence du silence ?",opts:["Tout se passera bien si vous travaillez plus","La surcharge silencieuse produit des erreurs, détériore la qualité, crée du ressentiment et aboutit souvent à un arrêt brutal — communiquer tôt est un signe de maturité professionnelle","Votre manager comprendra seul que vous êtes surchargé","Refuser les nouvelles tâches sans explication"],a:1},
  {q:"Quelle est la différence clinique entre un burn-out et une dépression, et pourquoi c'est important dans un contexte professionnel ?",opts:["Ce sont des synonymes modernes","Le burn-out est lié au travail et disparaît souvent avec un changement de contexte professionnel ; la dépression est généralisée et nécessite un traitement médical — confondre les deux mène à de mauvaises décisions","Le burn-out est plus grave que la dépression","La dépression est toujours préexistante au burn-out"],a:1},
  {q:"Votre équipe subit un stress collectif dû à une surcharge de travail depuis 2 mois. Comme manager, quelle est votre première action ?",opts:["Motiver l'équipe à tenir encore un peu","Nommer le problème collectivement, recalibrer les priorités avec la direction et protéger l'équipe en montant l'escalade — absorber le stress de son équipe sans jamais le nommer détruit la confiance","Organiser une session de team building","Demander à chacun de gérer son stress individuellement"],a:1},
  {q:"Vous pratiquez la méditation depuis 2 semaines sans résultats visibles. Vous abandonnez. Quelle erreur faites-vous ?",opts:["La méditation ne sert à rien","Vous attendez un effet immédiat alors que les bénéfices neurologiques de la méditation apparaissent après 6 à 8 semaines de pratique régulière selon les études neuroscientifiques","2 semaines c'est suffisant pour juger","La méditation ne fonctionne que pour les personnes très calmes"],a:1},
  {q:"Votre entreprise traverse une restructuration. L'incertitude génère un stress intense. Sur quoi vous concentrez-vous pour maintenir votre équilibre ?",opts:["Analyser les rumeurs pour anticiper","Vous concentrer uniquement sur ce que vous contrôlez : votre travail, vos relations, votre développement — le cercle d'influence (Covey) est le seul espace d'action utile","Chercher une autre entreprise immédiatement","Demander à la direction des garanties écrites"],a:1},
  {q:"Un projet échoue malgré tous vos efforts. Vous ressentez un fort sentiment d'échec. Quelle est la réponse la plus constructive ?",opts:["Vous reprocher longuement votre performance","Appliquer l'auto-compassion : vous parler comme vous parleriez à un ami dans la même situation — la rumination prolongée réduit les capacités d'apprentissage","Passer à autre chose immédiatement sans analyse","Partager votre sentiment d'échec avec tous vos collègues"],a:1},
  {q:"La cohérence cardiaque est recommandée en gestion du stress. Quelle est la fréquence optimale prouvée par la recherche ?",opts:["10 secondes inspire / 10 secondes expire","5 secondes inspire / 5 secondes expire (6 cycles par minute), pratiquée 3 fois par jour 5 minutes — c'est le protocole 365 validé cliniquement","2 secondes inspire / 8 secondes expire","Respirer le plus lentement possible"],a:1},
  {q:"Vous prenez trop de café pour tenir le rythme et vous dormez mal. Quel est l'effet réel du café sur le stress à long terme ?",opts:["Le café n'a aucun effet sur le stress","La caféine bloque l'adénosine et maintient le cortisol élevé — une consommation excessive amplifie l'anxiété et détériore le sommeil profond, créant un cercle vicieux","Le café réduit le stress grâce à ses effets psychoactifs positifs","L'effet du café dépend uniquement du génotype"],a:1},
  {q:"Vous devez prendre une décision importante sous forte pression temporelle. Votre raisonnement est clairement altéré par le stress. Que faites-vous ?",opts:["Décider vite pour montrer de la réactivité","Demander explicitement 15-30 minutes : le cortisol élevé altère les fonctions exécutives et favorise les décisions impulsives — une courte pause améliore significativement la qualité décisionnelle","Ne rien décider du tout","Déléguer la décision à quelqu'un de plus calme"],a:1},
  {q:"Quel est l'effet réel des pensées négatives répétitives sur le cerveau selon les neurosciences ?",opts:["Les pensées négatives n'ont pas d'impact physiologique","La rumination active l'amygdale et maintient le système nerveux en état d'alerte — des pensées négatives répétées renforcent les connexions neuronales associées à l'anxiété (neuroplasticité)","Les pensées négatives disparaissent d'elles-mêmes avec le temps","Seules les personnes anxieuses ont des pensées négatives"],a:1},
  {q:"Vous êtes perfectionniste et vous bloquez régulièrement sur des livrables car vous n'êtes jamais satisfait. Comment sortir de ce schéma ?",opts:["Baisser vos standards pour livrer plus vite","Définir à l'avance un critère clair de 'suffisamment bon' pour chaque tâche et respecter ce seuil — le perfectionnisme est souvent une forme de procrastination déguisée","Demander systématiquement l'avis d'un tiers avant de livrer","Ne plus vous fixer de standards"],a:1},
  {q:"Vous venez de rater une promotion qui vous tenait à cœur. Vous devez reprendre le travail normalement lundi. Quelle est la stratégie psychologique la plus saine ?",opts:["Faire semblant que ça ne vous affecte pas","Autoriser une période de décompression courte et consciente, puis chercher un retour structuré auprès de votre manager sur les critères de la prochaine promotion","Chercher immédiatement un autre poste par dépit","Exprimer ouvertement votre amertume à votre équipe"],a:1},
  {q:"Comment distinguer un stress professionnel gérable d'un signal d'alarme qui nécessite une intervention ?",opts:["Il n'y a pas de différence, tout stress est à traiter","Les signaux d'alarme sont : symptômes physiques durables (insomnies, maux de tête), irritabilité chronique, perte de sens et de plaisir sur plus de 3 semaines — ils justifient une consultation médicale","Le stress ne devient jamais un problème médical","Seul le médecin peut faire la distinction"],a:1},
  {q:"Votre manager vous donne un feedback très négatif en entretien annuel que vous ne partagez pas du tout. Quelle réaction est à la fois professionnelle et assertive ?",opts:["Accepter en silence pour ne pas créer de conflit","Écouter complètement, demander des exemples factuels, exprimer calmement votre perspective et proposer de convenir d'une évaluation sur des critères objectifs définis ensemble","Contester chaque point immédiatement","Quitter l'entretien"],a:1},
  {q:"Quel est l'impact documenté du sport sur les performances cognitives et la résistance au stress professionnel ?",opts:["Le sport n'a pas d'impact prouvé sur les performances cognitives","30 minutes d'activité aérobique modérée augmentent le BDNF (facteur neurotrophique) pendant 6-8h, améliorant la concentration, la mémoire de travail et la régulation émotionnelle","Seuls les sports de haute intensité ont un effet","Le sport améliore le physique mais pas les capacités cognitives"],a:1},
  {q:"Vous ressentez des symptômes physiques de stress (tensions, maux de tête, fatigue) mais vous pensez 'je dois tenir, c'est temporaire'. Quel est le risque de cette pensée ?",opts:["C'est la bonne attitude : tout est effectivement temporaire","Cette pensée est un mécanisme d'adaptation qui normalise des signaux d'alarme — si répété sur 2-3 mois, le corps maintient un état d'activation chronique qui peut conduire au burn-out sans signes précurseurs clairs","Les symptômes physiques du stress disparaissent toujours seuls","Seuls les gens faibles écoutent leurs symptômes"],a:1}
];

var BANK_DIGITAL=[
  {q:"Qu'est-ce que l'intelligence artificielle générative ?",opts:["Un robot humanoïde physique","Un système qui crée du contenu (texte, image, son) à partir de données d'entraînement","Un logiciel de comptabilité automatisé","Un algorithme de tri de données simples"],a:1},
  {q:"Pourquoi maîtriser les outils collaboratifs (Notion, Slack, Teams) ?",opts:["Pour remplacer les réunions en présentiel","Pour centraliser la communication et fluidifier le travail en équipe","C'est uniquement utile en télétravail","Seulement pour les équipes de plus de 50 personnes"],a:1},
  {q:"Qu'est-ce qu'un 'prompt' dans l'IA générative ?",opts:["Un bug informatique à corriger","L'instruction donnée à un modèle d'IA pour obtenir un résultat précis","Un logiciel de traitement de données","Un type de fichier compressé"],a:1},
  {q:"Comment protéger ses données personnelles en ligne ?",opts:["Utiliser le même mot de passe partout pour s'en souvenir","Activer la double authentification et utiliser des mots de passe uniques","Partager ses infos uniquement avec ses amis proches","Ignorer les mises à jour de sécurité"],a:1},
  {q:"Qu'est-ce que le 'no-code' et à quoi ça sert ?",opts:["Un type de programmation avancée en Python","Des outils pour créer des applications sans coder, accessibles à tous","Un langage de programmation simplifié","Un logiciel payant réservé aux développeurs"],a:1},
  {q:"Comment améliorer sa productivité avec les outils digitaux ?",opts:["Installer le maximum d'applications disponibles","Maîtriser 2-3 outils adaptés à ses besoins en profondeur","Utiliser uniquement des outils gratuits","Éviter les outils digitaux et préférer le papier"],a:1},
  {q:"Qu'est-ce que le 'cloud' et pourquoi est-il important au travail ?",opts:["Un service de prévision météorologique","Un espace de stockage en ligne pour accéder à ses fichiers partout","Un système d'exploitation pour ordinateur","Un logiciel de comptabilité en ligne"],a:1},
  {q:"Comment créer une veille informationnelle efficace dans son domaine ?",opts:["Lire tous les journaux chaque matin","Utiliser Feedly ou Google Alerts et suivre des experts LinkedIn","S'abonner à toutes les newsletters disponibles","Attendre que les informations viennent à soi"],a:1},
  {q:"Qu'est-ce que la 'data literacy' ?",opts:["Savoir coder en Python ou R","La capacité à lire, comprendre et utiliser des données pour décider","Un diplôme universitaire en statistiques","Une compétence réservée aux data scientists"],a:1},
  {q:"Comment gérer sa réputation en ligne en tant que professionnel ?",opts:["Ignorer ce qui se dit sur internet","Googler son nom régulièrement et soigner activement son profil LinkedIn","Supprimer tous ses comptes sur les réseaux","Répondre agressivement aux critiques négatives"],a:1},
  {q:"Qu'est-ce que le phishing et comment l'éviter ?",opts:["Un type de pêche sportive professionnelle","Une arnaque par email visant à voler des données — l'éviter en vérifiant les expéditeurs","Un réseau social professionnel","Un logiciel espion installé automatiquement"],a:1},
  {q:"Pourquoi la maîtrise de la vidéoconférence est-elle essentielle ?",opts:["C'est une compétence anecdotique et accessoire","Le travail hybride en a fait une compétence clé pour tous les métiers","Uniquement utile pour ceux qui font du télétravail","Elle remplace toutes les réunions en présentiel"],a:1},
  {q:"Qu'est-ce que l'automatisation des tâches répétitives ?",opts:["Un robot physique en usine","L'utilisation de logiciels pour automatiser des tâches récurrentes sans intervention humaine","Un type de management moderne","Un outil uniquement pour les informaticiens"],a:1},
  {q:"Comment utiliser les réseaux sociaux pour sa carrière ?",opts:["Mélanger contenus personnels et professionnels librement","Partager son expertise et construire un réseau de qualité avec méthode","Maximiser le nombre d'abonnés par tous les moyens","Éviter tout partage pour garder sa vie privée"],a:1},
  {q:"Qu'est-ce que le 'design thinking' ?",opts:["Un style graphique tendance","Une méthode de résolution de problèmes centrée sur l'utilisateur final","Un logiciel de design professionnel","Une approche réservée aux designers"],a:1},
  {q:"Comment évaluer la fiabilité d'une source en ligne ?",opts:["Se fier au nombre de likes et partages","Vérifier l'auteur, la date et croiser avec d'autres sources fiables","Faire confiance aux premiers résultats Google","Partager sans vérifier si ça vient d'un ami"],a:1},
  {q:"Qu'est-ce que la cybersécurité et pourquoi concerne-t-elle tous les salariés ?",opts:["Un domaine réservé aux informaticiens et développeurs","Les pratiques protégeant les systèmes — chaque salarié est un maillon de la chaîne","Un outil technique installé par l'IT","Une obligation uniquement pour les grandes entreprises"],a:1},
  {q:"Comment la maîtrise d'Excel renforce-t-elle son profil ?",opts:["Excel est un outil dépassé et inutile","Analyser des données et créer des tableaux de bord est un avantage concurrentiel réel","C'est uniquement utile en comptabilité","Seulement pour les postes administratifs"],a:1},
  {q:"Qu'est-ce que le 'growth hacking' dans un contexte professionnel ?",opts:["Un type de piratage informatique","Des techniques créatives pour développer rapidement une activité avec peu de ressources","Un outil marketing très coûteux","Une stratégie réservée aux startups tech"],a:1},
  {q:"Pourquoi apprendre les bases du HTML/CSS même sans être développeur ?",opts:["Aucune utilité pour les non-développeurs","Cela permet de comprendre les interfaces web et d'être autonome sur des tâches simples","C'est trop complexe pour des profils non-techniques","Uniquement utile pour créer des sites web"],a:1},
  {q:"Qu'est-ce que la 'e-réputation' professionnelle ?",opts:["La réputation en présentiel auprès de ses collègues","L'image construite sur internet par ce qu'on publie et les résultats Google","Le nombre d'abonnés sur ses réseaux sociaux","Uniquement importante pour les influenceurs"],a:1},
  {q:"Comment les outils de gestion de projet améliorent-ils le travail en équipe ?",opts:["Ils compliquent la communication entre collègues","Ils centralisent les informations et clarifient les responsabilités de chacun","Uniquement utiles pour les chefs de projet","Ils remplacent les managers dans leur rôle"],a:1},
  {q:"Qu'est-ce que la 'transformation digitale' d'une entreprise ?",opts:["Changer tous les ordinateurs de l'entreprise","L'intégration des technologies digitales dans tous les processus pour créer de la valeur","C'est uniquement pour les grandes entreprises","La création d'un site internet et de réseaux sociaux"],a:1},
  {q:"Comment rester pertinent face à l'évolution rapide du digital ?",opts:["Ignorer les nouvelles technologies jusqu'à l'obligation","Adopter une culture d'apprentissage continu et tester régulièrement de nouveaux outils","Maîtriser uniquement les outils actuellement utilisés","Attendre que l'entreprise impose les nouvelles formations"],a:1},
  {q:"Pourquoi soigner sa présence sur LinkedIn est-il stratégique ?",opts:["LinkedIn est un réseau en perte de vitesse","Y être visible et actif génère des opportunités professionnelles concrètes","Uniquement utile lors d'une recherche d'emploi","Elle ne remplace pas le bon vieux CV papier"],a:1}
];

var BANK_ORIENTATION=[
  {q:"Comment identifier son 'ikigaï' professionnel ?",opts:["En copiant le parcours d'un modèle inspirant","En trouvant l'intersection entre passion, compétences, utilité et rémunération","En choisissant le métier le mieux payé","En suivant les conseils de sa famille"],a:1},
  {q:"Qu'est-ce qu'un bilan de compétences ?",opts:["Un entretien annuel avec son manager","Un dispositif pour analyser ses compétences et définir un projet professionnel","Une longue formation de reconversion","Un test de personnalité en ligne"],a:1},
  {q:"Comment évaluer si un secteur correspond à ses valeurs ?",opts:["Choisir selon le salaire moyen proposé","Rechercher la culture du secteur et vérifier l'alignement avec ses propres valeurs","Suivre uniquement les tendances du marché","Demander l'avis de son entourage proche"],a:1},
  {q:"Quelle est la différence entre hard skill et soft skill ?",opts:["Les hard skills sont pour les hommes, les soft pour les femmes","Les hard skills sont techniques ; les soft skills sont comportementaux et relationnels","Les hard skills s'apprennent, les soft sont innés","Il n'y a aucune différence concrète entre les deux"],a:1},
  {q:"Comment préparer une reconversion professionnelle ?",opts:["Démissionner du jour au lendemain et voir","Analyser ses compétences transférables et acquérir les compétences manquantes","Attendre le bon moment pour se lancer","Imiter quelqu'un qui a réussi sa reconversion"],a:1},
  {q:"Qu'est-ce que les 'compétences transférables' ?",opts:["Des diplômes reconnus dans tous les secteurs","Des compétences d'un domaine applicables dans d'autres contextes ou métiers","Des certifications professionnelles reconnues","Des compétences uniquement techniques et spécialisées"],a:1},
  {q:"Comment tester un projet professionnel avant de s'engager ?",opts:["S'y lancer directement sans tester d'abord","Faire des missions freelance ou du bénévolat dans ce domaine","Lire uniquement des livres sur le sujet","Regarder des vidéos YouTube sur le métier"],a:1},
  {q:"Pourquoi le réseau est-il crucial dans l'orientation ?",opts:["Il ne l'est pas vraiment pour l'orientation","Les professionnels en poste donnent une vision réelle des métiers et ouvrent des portes","Uniquement utile pour les cadres supérieurs","Le réseau sert seulement à trouver un emploi"],a:1},
  {q:"Qu'est-ce qu'une 'informational interview' dans l'orientation ?",opts:["Un entretien d'embauche non officiel","Échanger avec un professionnel pour comprendre son métier sans demander un poste","Un entretien de sélection informel","Un test d'aptitude en conditions réelles"],a:1},
  {q:"Comment évaluer les perspectives d'un secteur professionnel ?",opts:["Choisir le secteur le plus connu du grand public","Analyser les tendances, l'automatisation et les besoins sociétaux sur plusieurs années","Suivre uniquement ce que disent les médias","Choisir le secteur où travaillent ses amis"],a:1},
  {q:"Quelle est l'importance de la congruence poste-personnalité ?",opts:["Aucune importance, on s'adapte à tout","Un poste aligné avec sa personnalité favorise l'engagement et le bien-être","La personnalité s'adapte à n'importe quel poste","Uniquement important pour les métiers créatifs"],a:1},
  {q:"Comment utiliser les tests de personnalité comme le MBTI ?",opts:["Comme une vérité absolue sur soi-même","Comme un point d'entrée pour mieux se connaître, à croiser avec d'autres sources","Les ignorer car non scientifiquement validés","Choisir son métier uniquement sur cette base"],a:1},
  {q:"Pourquoi les stages et alternances sont-ils précieux ?",opts:["Ils font perdre du temps à se former","Ils permettent de tester un métier en conditions réelles et construire son réseau","Uniquement utiles pour les très jeunes étudiants","Ils garantissent un emploi à la sortie"],a:1},
  {q:"Comment définir ses critères de choix professionnel ?",opts:["Se baser uniquement sur le salaire proposé","Lister et hiérarchiser : sens, équilibre, relations, impact, rémunération","Choisir ce que ses parents recommandent","Prendre la première offre intéressante disponible"],a:1},
  {q:"Qu'est-ce qu'un 'portfolio de carrière' ?",opts:["Un dossier de candidature amélioré","Une collection de réalisations concrètes montrant ses compétences et son parcours","Un CV mis en page visuellement","Un document uniquement pour les profils créatifs"],a:1},
  {q:"Comment gérer la peur du changement professionnel ?",opts:["Ignorer la peur et agir impulsivement","Décomposer le projet en petites étapes et chercher du soutien adapté","Rester dans sa situation actuelle par défaut","Considérer la peur comme un signe que le projet est mauvais"],a:1},
  {q:"Quelle est la valeur de l'apprentissage continu dans sa carrière ?",opts:["Il est inutile une fois qu'on a un bon poste","Les compétences évoluent vite — apprendre en continu est une nécessité pour rester employable","Uniquement utile pour ceux qui veulent changer de métier","C'est trop coûteux pour la majorité des gens"],a:1},
  {q:"Comment s'orienter vers les métiers du futur ?",opts:["Choisir les métiers les plus populaires aujourd'hui","Observer les tendances (IA, écologie, santé) et développer des compétences hybrides","Ignorer les tendances car elles changent vite","Viser uniquement les métiers aux salaires les plus élevés"],a:1},
  {q:"Pourquoi l'autodidaxie est-elle une compétence clé aujourd'hui ?",opts:["Elle n'est pas vraiment reconnue par les employeurs","Les ressources en ligne permettent de se former à tout — l'initiative personnelle est clé","Elle remplace complètement les diplômes universitaires","Uniquement utile pour les métiers techniques"],a:1},
  {q:"Comment concilier sens du travail et contraintes économiques ?",opts:["Choisir uniquement le sens, le salaire viendra naturellement","Identifier des secteurs porteurs qui correspondent à ses valeurs personnelles","Privilégier uniquement le salaire et y trouver un sens","Attendre l'opportunité parfaite qui réunit tout"],a:1},
  {q:"Qu'est-ce que la 'zone de génie' selon Gay Hendricks ?",opts:["Un état de concentration intense et rare","L'activité où on excelle naturellement, qu'on aime et qui crée le plus de valeur","Un test de QI professionnel","Une technique de productivité avancée"],a:1},
  {q:"Comment évaluer la qualité de vie dans un métier ?",opts:["Uniquement via le salaire et les avantages","Explorer les conditions réelles : horaires, charge mentale, sens et reconnaissance","En regardant des films ou séries sur ce métier","En demandant à ses proches ce qu'ils en pensent"],a:1},
  {q:"Pourquoi développer une carrière en T (T-shaped) ?",opts:["Pour pouvoir changer de métier facilement","Allier une expertise profonde et des compétences transversales larges — profil très recherché","Uniquement pour les consultants indépendants","Ce concept est daté et obsolète aujourd'hui"],a:1},
  {q:"Comment gérer le syndrome de l'imposteur dans sa carrière ?",opts:["Le cacher et prétendre être très confiant","Collecter des preuves de ses réussites et chercher du mentorat adapté","Il disparaît automatiquement avec l'expérience","Uniquement les femmes en souffrent vraiment"],a:1},
  {q:"Quelle est la clé d'une orientation professionnelle réussie ?",opts:["Choisir une fois pour toutes à 20 ans","Rester en apprentissage permanent et s'adapter avec agilité tout au long de la vie","Avoir le bon diplôme dès le départ","Suivre les tendances du moment pour rester pertinent"],a:1}
];

// ── Configurations des 6 QCM ──

var BANK_ARE=[
  {q:"Tu démissionnes pour créer une entreprise. Ton conseiller France Travail te dit que tu peux toucher l'ARE. Est-ce exact ?",opts:["Oui, toute démission ouvre droit à l'ARE après inscription","Non, sauf via le dispositif démission-reconversion avec un projet validé par une commission","Oui, automatiquement après 3 mois d'inscription","Non, jamais en cas de démission volontaire quelle que soit la raison"],a:1},
  {q:"Tu travailles en CDD depuis 5 mois. Ton contrat se termine. Combien de temps minimum as-tu dû cotiser pour ouvrir des droits ARE ?",opts:["6 mois","4 mois","3 mois","8 mois"],a:1},
  {q:"Ton ARE est de 900€/mois. Tu décroches une mission intérim de 3 semaines. Que se passe-t-il exactement ?",opts:["L'ARE est définitivement supprimée","L'ARE est suspendue pendant la mission et reprend après","L'ARE peut être partiellement cumulée avec le salaire de la mission sous conditions","L'ARE est réduite de 50% pendant 6 mois après la mission"],a:2},
  {q:"Qu'est-ce que le SJR et pourquoi est-il important pour ton ARE ?",opts:["C'est ton salaire du dernier mois — il détermine directement ton ARE","C'est la moyenne de tes salaires sur 24 mois hors absences non rémunérées — il sert de base au calcul","C'est le salaire minimum pour être éligible à l'ARE","C'est un coefficient appliqué selon ton secteur d'activité"],a:1},
  {q:"Tu touches l'ARE et tu crées une micro-entreprise. Tu génères 400€ ce mois-ci. Que fais-tu obligatoirement ?",opts:["Rien — les revenus inférieurs au SMIC n'ont pas à être déclarés","Déclarer les revenus à France Travail lors de ton actualisation mensuelle","Suspendre toi-même ton ARE pendant les mois où tu génères des revenus","Prévenir uniquement si tes revenus dépassent 50% de ton ARE"],a:1},
  {q:"Ton employeur refuse de te remettre l'attestation employeur depuis 3 semaines. Quel recours as-tu ?",opts:["Attendre — il n'y a pas de délai légal imposé à l'employeur","Saisir le Conseil de Prud'hommes et signaler à France Travail qui peut intervenir","Contacter directement l'Urssaf pour forcer la transmission","Déposer une plainte pénale pour abus de confiance"],a:1},
  {q:"Qu'est-ce que le rechargement des droits ARE et quand s'applique-t-il ?",opts:["Un recalcul automatique chaque année selon l'inflation","La possibilité d'ajouter de nouvelles périodes travaillées à des droits existants non épuisés après reprise d'activité","Un dispositif réservé aux plus de 50 ans pour prolonger leur indemnisation","Une demande de révision du montant de l'ARE auprès de France Travail"],a:1},
  {q:"Tu es indemnisé depuis 14 mois. Tu retrouves un CDI mais tu es licencié après 6 semaines. Que se passe-t-il avec tes droits ?",opts:["Tu perds définitivement tes droits antérieurs et repars à zéro","Tu peux reprendre tes droits restants et les compléter avec les 6 semaines cotisées","Tu dois attendre 6 mois avant toute nouvelle ouverture de droits","Tes droits sont annulés car le nouveau contrat était trop court"],a:1},
  {q:"L'ARE est-elle imposable et comment est-elle déclarée aux impôts ?",opts:["Non, les allocations chômage sont totalement exonérées d'impôt","Oui, elle est imposable — France Travail transmet automatiquement les montants à l'administration fiscale","Oui, mais uniquement au-delà de 12 mois d'indemnisation","Non, sauf pour les revenus supérieurs à 2 fois le SMIC"],a:1},
  {q:"Tu pars 5 semaines à l'étranger pendant ton indemnisation. Que dois-tu faire ?",opts:["Rien — tu peux rester inscrit depuis l'étranger sans limite de durée","Déclarer ton absence à France Travail avant le départ — l'ARE est suspendue pendant cette période","Prévenir uniquement si tu quittes l'espace Schengen","Te désinscrire temporairement et te réinscrire à ton retour"],a:1},
  {q:"Tu quittes ton CDI par démission. Dans quel cas peux-tu quand même toucher l'ARE ?",opts:["Après 4 mois d'inscription à France Travail","En cas de démission légitime reconnue (suivi de conjoint, non-paiement de salaire, reconversion validée...)","Après un délai de carence de 6 mois","Jamais — la démission exclut toujours l'ARE"],a:1},
  {q:"Quel est le délai de carence fixe qui s'applique à toute ouverture de droits ARE ?",opts:["3 jours ouvrés","7 jours calendaires","14 jours calendaires","Aucun délai fixe — ça dépend du salaire"],a:1},
  {q:"Tu as 54 ans et perds ton emploi. Quelle est ta durée maximale d'indemnisation ARE ?",opts:["24 mois comme tout le monde","30 mois car tu as entre 53 et 55 ans","36 mois","27 mois"],a:1},
  {q:"Qu'est-ce que l'ARCE et dans quel cas l'utiliser ?",opts:["Une aide à la formation pour les demandeurs d'emploi qui veulent se reconvertir","Le versement en capital de 60% de tes droits ARE restants pour créer ou reprendre une entreprise","Une aide mensuelle complémentaire pour les créateurs d'entreprise en plus de l'ARE","Un prêt sans intérêt accordé par France Travail aux porteurs de projet"],a:1},
  {q:"Tu reçois une indemnité de rupture conventionnelle supérieure au minimum légal. Quel impact sur ton ARE ?",opts:["Aucun impact — seule la partie légale compte pour France Travail","La partie supralégale génère un différé d'indemnisation spécifique qui s'ajoute au délai de carence fixe","Elle réduit définitivement le montant mensuel de ton ARE","Elle allonge la durée totale d'indemnisation proportionnellement"],a:1},
  {q:"Comment est calculé le taux de ton allocation ARE ?",opts:["40% de ton SJR dans tous les cas","57% du SJR avec un plancher minimum et un plafond maximum","75% de ton dernier salaire net mensuel","50% du SMIC plus une majoration selon ton ancienneté"],a:1},
  {q:"Tu ne t'actualises pas sur France Travail pendant 2 mois sans prévenir. Que risques-tu ?",opts:["Rien — l'actualisation est facultative","Suspension du versement de l'ARE et possibilité de radiation","Avertissement écrit uniquement sans conséquence financière","Une amende administrative de 150€"],a:1},
  {q:"Tu travailles à temps partiel pendant 6 mois puis ton contrat se termine. As-tu droit à l'ARE ?",opts:["Non — seul le temps plein ouvre des droits ARE","Oui — le temps partiel cotise et ouvre des droits proportionnels à condition d'avoir travaillé 4 mois minimum","Oui mais uniquement si le temps partiel représente au moins 50% d'un temps plein","Non — il faut avoir travaillé à temps plein pendant au moins 4 mois"],a:1},
  {q:"Ton entreprise est en liquidation judiciaire et tu n'as pas reçu tes 2 derniers salaires. Qui te protège ?",opts:["France Travail peut faire une avance sous conditions","L'AGS (Assurance de Garantie des Salaires) couvre les salaires impayés dans la limite d'un plafond","La CAF peut verser une aide d'urgence","Personne — c'est une perte définitive en cas de liquidation"],a:1},
  {q:"Qu'est-ce que le PPAE et pourquoi est-il obligatoire ?",opts:["Un plan de formation imposé à tous les chômeurs après 6 mois","Le Projet Personnalisé d'Accès à l'Emploi — il définit ton projet pro et tes critères d'emploi acceptable, et conditionne tes obligations","Un test de compétences mensuel réalisé par France Travail","Un simulateur de droits ARE disponible en ligne sur le site de France Travail"],a:1},
  {q:"Tu démissionnes pour suivre ton conjoint muté à 500km. Peux-tu toucher l'ARE ?",opts:["Non — c'est une démission volontaire sans exception","Oui — le suivi de conjoint est une démission légitime qui ouvre droit à l'ARE","Oui mais seulement après 6 mois d'inscription à France Travail","Non car tu quittes volontairement ton emploi dans les deux cas"],a:1},
  {q:"Tu refus une Offre Raisonnable d'Emploi (ORE) pour la deuxième fois. Quelle sanction ?",opts:["Suppression définitive de l'ARE","Radiation de France Travail avec suspension des droits","Simple avertissement sans conséquence financière","Réduction de l'ARE de 20% pendant 3 mois"],a:1},
  {q:"Quelle est la différence entre l'ARE et le RSA ?",opts:["L'ARE est versée par la CAF, le RSA par France Travail","L'ARE est une indemnisation chômage basée sur les cotisations, le RSA est un revenu minimum pour personnes sans ressources suffisantes","Ce sont deux noms différents pour la même aide","L'ARE est pour les cadres, le RSA pour les non-cadres"],a:1},
  {q:"Tu touches l'ARE depuis 8 mois et tu hérites d'un appartement. Tes droits changent-ils ?",opts:["Oui — France Travail réévalue tes droits si ton patrimoine dépasse 100 000€","Non — l'ARE n'est pas conditionnée au patrimoine, seulement aux revenus d'activité","Oui — tu dois déclarer tout changement patrimonial à France Travail","Oui mais uniquement si tu mets l'appartement en location et génères des revenus"],a:1},
  {q:"Tu es en CDI et tu veux bénéficier de l'ARCE pour créer ton entreprise. Quelle est la première étape ?",opts:["Démissionner immédiatement et s'inscrire à France Travail","Obtenir d'abord une rupture de contrat ouvrant droit à l'ARE puis déposer le dossier ARCE","Déposer directement le dossier ARCE auprès de France Travail sans quitter ton poste","Créer d'abord l'entreprise puis demander l'ARCE dans les 3 mois"],a:1}
];

var BANK_DEMANDEUR_ENTRETIEN=[
  {q:"Le recruteur te demande 'Pourquoi vous ?' Tu dois te démarquer. Que réponds-tu ?",opts:["Tu listes tes compétences dans l'ordre du descriptif de poste","Tu racontes un exemple concret où tu as résolu un problème similaire à ceux du poste","Tu expliques que tu es motivé et disponible immédiatement","Tu mentionnes que tu connais déjà quelqu'un dans l'équipe"],a:1},
  {q:"Le recruteur reste silencieux 15 secondes après ta réponse. Que fais-tu ?",opts:["Tu ajoutes de nouveaux arguments pour montrer que tu as encore des choses à dire","Tu reformules ta réponse différemment en pensant qu'il n'a pas compris","Tu attends calmement sans rien ajouter","Tu lui demandes directement si ta réponse l'a satisfait"],a:2},
  {q:"On te propose un salaire 12% sous ta demande. Le recruteur dit que c'est le maximum. Que fais-tu ?",opts:["Tu acceptes — s'il dit que c'est le maximum, inutile d'insister","Tu refuses l'offre et attends qu'il rappelle","Tu présentes des données marché pour objectiver l'écart et proposes une révision à 6 mois","Tu lui dis que tu as une autre offre plus élevée pour forcer la décision"],a:2},
  {q:"Tu as quitté ton dernier poste après 7 mois. Le recruteur te demande pourquoi. Comment répondre ?",opts:["Tu expliques l'écart entre le poste décrit et le périmètre réel, sans attaque, et conclus sur ce que tu en as appris","Tu dis que c'était une erreur de ta part et que tu l'assumes entièrement","Tu évoques des difficultés relationnelles sans entrer dans les détails","Tu minimises en disant que 7 mois c'est suffisant pour évaluer une opportunité"],a:0},
  {q:"Le recruteur te demande tes défauts. Quelle réponse est la plus stratégique ?",opts:["Tu cites un défaut qui est en réalité une qualité déguisée","Tu mentionnes un vrai défaut mineur avec un exemple concret de comment tu le travailles","Tu dis que tu manques parfois de confiance en toi pour paraître humble","Tu cites un défaut lié au perfectionnisme pour sembler rigoureux"],a:1},
  {q:"Tu as une offre en main mais tu attends une réponse d'une entreprise que tu préfères. Tu as 72h. Que fais-tu ?",opts:["Tu acceptes la première — il ne faut pas tenter le sort","Tu refuses la première sans avoir la deuxième confirmée","Tu contactes l'entreprise préférée en mentionnant l'offre reçue pour accélérer sa décision","Tu demandes un délai de 5 jours à la première sans donner de raison précise"],a:2},
  {q:"En fin d'entretien, le recruteur dit 'Vous êtes clairement le meilleur profil.' Comment réagis-tu ?",opts:["Tu remercies et commences à négocier le salaire pendant que l'ambiance est favorable","Tu prends ça comme une confirmation et tu relâches la pression","Tu remercies, réaffirmes ton intérêt et demandes les prochaines étapes concrètes","Tu restes prudent et n'en tires aucune conclusion sur la suite"],a:2},
  {q:"Le recruteur mentionne que 3 personnes ont quitté ce poste en 18 mois. Comment réagis-tu ?",opts:["Tu prends note mentalement et continues l'entretien normalement","Tu poses des questions précises sur les raisons des départs pour évaluer si c'est structurel","Tu dis que toi tu es quelqu'un de stable et que ça ne t'arrivera pas","Tu relativises en disant que les turnover élevés sont normaux dans certains secteurs"],a:1},
  {q:"Tu passes le deuxième entretien avec le N+2. Il te pose les mêmes questions que le N+1. Comment adaptes-tu tes réponses ?",opts:["Tu réponds exactement pareil pour montrer ta cohérence","Tu élèves le niveau : tu parles d'impact business et de vision plutôt que de tâches","Tu signales poliment que tu as déjà répondu à ces questions au N+1","Tu enrichis tes réponses avec des éléments nouveaux que tu n'avais pas mentionnés avant"],a:1},
  {q:"En entretien collectif, un autre candidat donne une réponse fausse mais convaincante. Que fais-tu ?",opts:["Tu te tais — corriger un autre candidat est risqué","Tu corriges poliment en ajoutant ta perspective sans invalider l'autre directement","Tu attends que le recruteur corrige — c'est son rôle","Tu proposes ta propre réponse sans mentionner celle de l'autre"],a:1},
  {q:"Un poste t'intéresse mais le recruteur hésite sur ton profil. Comment inverses-tu la situation ?",opts:["Tu baisses tes prétentions pour réduire son hésitation","Tu identifies précisément son hésitation en posant une question directe puis tu y réponds avec des faits","Tu montres ton enthousiasme de façon répétée pour compenser le doute","Tu lui proposes une période d'essai plus courte pour le rassurer"],a:1},
  {q:"Le recruteur te demande de te noter sur 10 sur ta compétence principale. Tu dis 7. Il reste silencieux.",opts:["Tu montes spontanément à 9 pour paraître plus confiant","Tu expliques précisément ce qui justifie le 7 et ce qu'il te faudrait pour atteindre 9","Tu demandes ce qu'il attend pour donner une note plus haute","Tu restes sur 7 et attends qu'il réagisse"],a:1},
  {q:"Tu veux quitter ton poste pour un meilleur salaire. Comment le formules-tu sans le dire directement ?",opts:["Tu dis directement que tu veux gagner plus","Tu parles de nouveaux défis et d'un périmètre plus large sans mentionner le salaire","Tu dis que tu cherches un environnement plus stimulant intellectuellement","Tu expliques que tu veux plus de responsabilités sans préciser pourquoi"],a:1},
  {q:"Tu réalises en plein entretien que tu as exagéré une compétence sur ton CV. Que fais-tu ?",opts:["Tu maintiens la position et tu improvises si le sujet est testé","Tu corriges proactivement avec une formulation nuancée avant qu'il ne s'en rende compte","Tu changes de sujet dès que la compétence est évoquée","Tu admets franchement l'exagération sans contexte ni explication"],a:1},
  {q:"On te propose un CDD alors que l'offre initiale mentionnait un CDI. Comment réagis-tu ?",opts:["Tu acceptes pour ne pas perdre l'opportunité et renégocies après la prise de poste","Tu refuses immédiatement sans discussion","Tu poses des questions sur les raisons et les conditions de passage en CDI avant de décider","Tu signales que ce changement remet en question ta confiance dans l'entreprise"],a:2},
  {q:"Tu dois parler de ta plus grande erreur professionnelle. Quelle approche adoptes-tu ?",opts:["Tu choisis une erreur si petite qu'elle ne révèle aucune vraie lacune","Tu décris une vraie erreur, l'analyse que tu en as faite et ce que tu as changé concrètement","Tu transformes l'erreur en réussite dès le début de ta réponse","Tu demandes si tu peux plutôt parler d'un apprentissage difficile"],a:1},
  {q:"Le recruteur te demande où tu te vois dans 5 ans dans une entreprise où l'évolution est limitée.",opts:["Tu décris une évolution hiérarchique précise même si tu sais que c'est peu probable","Tu dis honnêtement que tu ne peux pas prédire 5 ans à l'avance","Tu formules ton ambition en termes d'expertise et de contribution plutôt que de titre","Tu demandes d'abord au recruteur quelles évolutions sont réellement possibles"],a:2},
  {q:"Tu n'as jamais managé officiellement mais le poste demande de l'expérience en management.",opts:["Tu admets l'absence d'expérience formelle et proposes de te former rapidement","Tu mentionnes des situations concrètes où tu as coordonné des projets sans autorité hiérarchique","Tu dis que le management s'apprend sur le terrain et que tu es prêt","Tu présentes une expérience de coordination comme une expérience de management"],a:1},
  {q:"Le recruteur te demande ton avis sur une décision récente de son entreprise que tu trouves discutable.",opts:["Tu valides entièrement le choix pour ne pas créer de tension","Tu exprimes une réserve honnête en posant d'abord une question sur le contexte","Tu présentes les avantages et inconvénients sans donner ton avis personnel","Tu dis que tu manques d'éléments pour avoir une opinion éclairée"],a:1},
  {q:"Tu reçois deux offres le même jour. L'une est mieux payée, l'autre plus intéressante. Comment décides-tu ?",opts:["Tu choisis le salaire — c'est le seul critère objectif","Tu choisis le poste qui t'apportera le plus d'apprentissage dans les 18 prochains mois","Tu demandes à tes proches leur avis avant de décider","Tu cherches à renégocier l'offre la moins avantageuse pour avoir les deux"],a:1},
  {q:"Le recruteur te dit que 3 autres candidats ont exactement le même profil que toi. Comment réagis-tu ?",opts:["Tu proposes de baisser tes prétentions pour te différencier","Tu restes calme et rappelles une réussite concrète directement liée aux enjeux du poste","Tu demandes ce qui distingue les candidats retenus habituellement","Tu expliques que ta disponibilité immédiate est un avantage sur les autres"],a:1},
  {q:"Tu as été licencié pour insuffisance professionnelle. Le recruteur te le demande directement.",opts:["Tu parles de restructuration pour éviter le sujet","Tu expliques factuellement le contexte, assumes ta part et montres ce que tu as changé depuis","Tu dis que l'évaluation était injuste et que tu la contestes encore","Tu minimises en disant que les critères d'évaluation étaient flous"],a:1},
  {q:"Tu passes un entretien pour un poste qui t'intéresse moyennement mais qui paie bien.",opts:["Tu simules un enthousiasme total pour maximiser tes chances","Tu es transparent sur ton intérêt relatif","Tu te concentres sur ce qui t'intéresse vraiment dans le poste et tu restes authentique","Tu acceptes l'entretien mais tu te prépares moins"],a:2},
  {q:"L'entretien se termine. Le recruteur dit 'On vous recontacte.' Comment conclus-tu ?",opts:["Tu pars rapidement pour montrer que ton temps est précieux","Tu demandes dans quel délai tu peux espérer un retour et comment faire le suivi","Tu remercies longuement pour marquer les esprits","Tu proposes de revenir dès la semaine suivante si aucun retour"],a:1},
  {q:"Tu arrives à l'entretien et le recruteur semble pressé et distrait. Comment tu t'adaptes ?",opts:["Tu continues ta présentation préparée sans changer","Tu parles plus vite pour couvrir un maximum de contenu","Tu raccourcis chaque réponse à l'essentiel et laisses plus de place à l'échange","Tu lui proposes de reporter l'entretien à un meilleur moment"],a:2}
];


var BANK_CPF=[
  {q:"Quel est le montant annuel maximum accumulé sur le CPF pour un salarié à temps plein ?",opts:["300€","500€","800€","1 500€"],a:1},
  {q:"Peut-on utiliser son CPF sans accord de l'employeur ?",opts:["Non, toujours avec accord écrit","Oui, si la formation se déroule hors temps de travail","Non, sauf pour les formations certifiantes courtes","Oui, dans tous les cas sans exception"],a:1},
  {q:"Qu'est-ce qu'un bilan de compétences exactement ?",opts:["Un test de QI professionnel administré par France Travail","Un dispositif pour analyser ses compétences et motivations afin de définir un projet professionnel","Une évaluation annuelle obligatoire en entreprise","Un audit de CV réalisé par un cabinet de recrutement"],a:1},
  {q:"Qui peut financer un bilan de compétences pour un salarié en CDI ?",opts:["L'employeur obligatoirement","Le CPF ou l'employeur dans le cadre du plan de formation","La CAF sous conditions de revenus","L'État via France Travail uniquement"],a:1},
  {q:"Quelle est la durée maximale légale d'un bilan de compétences ?",opts:["10 heures","24 heures","40 heures","3 mois calendaires"],a:1},
  {q:"Qu'est-ce que la VAE et à qui s'adresse-t-elle ?",opts:["Une aide financière pour la reconversion professionnelle","La Validation des Acquis de l'Expérience — elle permet d'obtenir un diplôme via son expérience","Un congé spécial pour formation longue de plus d'un an","Un contrat aidé pour les personnes en reconversion professionnelle"],a:1},
  {q:"Que se passe-t-il avec ton CPF si tu changes d'employeur ?",opts:["Tu perds tous tes droits accumulés","Les droits CPF restent acquis et te suivent tout au long de ta vie active","Tu dois racheter tes droits auprès du nouvel employeur","Les droits sont transférés uniquement si le changement est volontaire"],a:1},
  {q:"Qu'est-ce que le projet de transition professionnelle (PTP) permet de financer ?",opts:["Uniquement des bilans de compétences","Des formations certifiantes longues pour changer de métier avec maintien de salaire sous conditions","Des formations courtes de moins de 3 mois uniquement","Des formations en e-learning sans limite de durée"],a:1},
  {q:"Les résultats d'un bilan de compétences sont-ils transmis à l'employeur ?",opts:["Oui, automatiquement après la fin du bilan","Non, ils sont strictement confidentiels sauf accord explicite du salarié","Non, sauf si la formation est financée par l'employeur","Oui, si le bilan dure plus de 10 heures"],a:1},
  {q:"Peut-on utiliser son CPF pour passer le permis de conduire B ?",opts:["Non, le CPF est réservé aux formations certifiantes professionnelles uniquement","Oui, le permis B est éligible au CPF depuis 2020","Oui, mais uniquement si le permis est nécessaire à l'exercice du métier actuel","Non, le permis B n'est jamais finançable via le CPF"],a:1},
  {q:"Quel organisme gère le CPF et la plateforme MonCompteFormation ?",opts:["France Travail","La Caisse des Dépôts et Consignations","L'OPCO de la branche professionnelle","Le Ministère du Travail directement"],a:1},
  {q:"Tu es demandeur d'emploi. Peux-tu utiliser ton CPF pour te former ?",opts:["Non, le CPF est réservé aux salariés en poste","Oui, et France Travail peut abonder ton CPF pour certaines formations prioritaires","Oui, mais uniquement pour des formations de moins de 3 mois","Non, tu dois d'abord retrouver un emploi"],a:1},
  {q:"Qu'est-ce qu'un abondement CPF ?",opts:["Un retrait des droits CPF en cas de faute professionnelle","Un complément de financement apporté par l'employeur, l'OPCO ou l'État pour augmenter les droits disponibles","Un plafonnement des droits CPF fixé par convention collective","Un transfert de droits CPF d'un salarié à un autre"],a:1},
  {q:"Ton CPF affiche 1 200€ mais la formation coûte 2 000€. Que peux-tu faire ?",opts:["Renoncer — tu ne peux utiliser que ce que tu as sur ton compte","Attendre d'accumuler les 800€ manquants l'année suivante","Demander un abondement à ton employeur, ton OPCO ou France Travail","Payer les 800€ restants uniquement avec l'accord écrit de l'employeur"],a:2},
  {q:"Qu'est-ce que le conseil en évolution professionnelle (CEP) ?",opts:["Un coaching payant pour cadres en reconversion","Un accompagnement gratuit et personnalisé pour construire son projet professionnel, accessible à tous","Un bilan de compétences allégé réalisé en ligne","Un dispositif réservé aux demandeurs d'emploi de longue durée"],a:1},
  {q:"Peut-on retirer en cash les droits accumulés sur son CPF ?",opts:["Oui, une fois par an dans la limite de 500€","Non, le CPF ne peut servir qu'à financer des formations éligibles","Oui, en cas de démission pour reconversion professionnelle validée","Non, sauf en cas de licenciement économique et sur justificatif"],a:1},
  {q:"Un salarié à temps partiel accumule-t-il des droits CPF au même rythme qu'un temps plein ?",opts:["Non, les droits sont strictement proportionnels au temps de travail","Oui, depuis 2019 les droits CPF sont identiques quel que soit le temps de travail","Non, il accumule la moitié des droits d'un temps plein","Oui, mais uniquement pour les contrats dépassant 50% d'un temps plein"],a:1},
  {q:"Pour bénéficier du PTP, quelle ancienneté minimum est requise pour un salarié en CDI ?",opts:["6 mois dans l'entreprise actuelle","1 an dont 1 an dans l'entreprise actuelle","2 ans dont 1 an dans l'entreprise actuelle","5 ans dans le même secteur d'activité"],a:1},
  {q:"Qu'est-ce que le RNCP et pourquoi est-il important pour le CPF ?",opts:["Un registre des entreprises agréées pour la formation","Le Répertoire National des Certifications Professionnelles — seules les formations qui y sont inscrites sont éligibles au CPF","Un organisme de contrôle des organismes de formation","Un dispositif de financement spécifique aux TPE/PME"],a:1},
  {q:"Qu'est-ce que le CPF de transition professionnelle ?",opts:["Un CPF classique utilisé pendant une période de chômage","Un dispositif permettant de financer une formation certifiante longue pour changer de métier avec maintien du salaire","Un abondement automatique accordé en cas de reconversion","Un CPF doublé accordé aux salariés de plus de 45 ans"],a:1},
  {q:"Le DIF (Droit Individuel à la Formation) existe-t-il encore en 2024 ?",opts:["Oui, il fonctionne toujours en parallèle du CPF","Non, il a été remplacé par le CPF en 2015 mais les droits acquis ont été convertis","Oui, mais uniquement pour les fonctionnaires","Non, il a été supprimé sans conversion des droits acquis"],a:1},
  {q:"Quelle est la différence entre le CPF et le plan de développement des compétences ?",opts:["Ce sont deux noms pour le même dispositif","Le CPF appartient au salarié et est à son initiative, le plan de compétences est à l'initiative de l'employeur","Le CPF finance uniquement les formations longues, le plan les formations courtes","Le CPF est gratuit, le plan de compétences est toujours payant pour le salarié"],a:1},
  {q:"Tu veux utiliser ton CPF pendant tes heures de travail. Que doit faire ton employeur ?",opts:["Il peut refuser si la période ne lui convient pas commercialement","Il ne peut pas s'y opposer sur le fond mais peut décaler la période si justifié","Il doit financer lui-même la formation dans ce cas","Il doit maintenir ton salaire uniquement si la formation dure plus de 5 jours consécutifs"],a:1},
  {q:"Qu'est-ce que le passeport de compétences ?",opts:["Un document de voyage professionnel pour travailler à l'étranger","Un document personnel qui recense toutes les formations, certifications et expériences tout au long de la carrière","Un diplôme spécial délivré après un bilan de compétences","Un contrat de travail simplifié pour les travailleurs en mobilité"],a:1},
  {q:"Une formation éligible au CPF doit obligatoirement aboutir à quoi ?",opts:["Un emploi dans les 6 mois suivant la formation","Une certification, qualification ou habilitation reconnue au RNCP ou au RS","Une augmentation de salaire négociée avec l'employeur","Un contrat en alternance ou un CDI"],a:1}
];

var BANK_RECONVERSION_TRANSITION=[
  {q:"Tu es en poste depuis 5 ans et tu veux tout changer. Le recruteur te demande pourquoi maintenant.",opts:["Tu expliques que tu t'ennuies depuis longtemps et que tu n'en peux plus","Tu décris une prise de conscience progressive avec un déclencheur précis et un projet concret","Tu dis que tu cherches simplement quelque chose de nouveau sans projet défini","Tu expliques que ton secteur est en déclin et que tu n'as pas le choix"],a:1},
  {q:"Tu veux te reconvertir mais tu as peur de perdre ton salaire actuel. Quelle première étape est la plus réaliste ?",opts:["Démissionner immédiatement pour montrer ton engagement","Faire un bilan de compétences tout en restant en poste","Attendre d'avoir une offre concrète avant de bouger","Consulter un coach en reconversion avant toute démarche officielle"],a:1},
  {q:"Ton entourage te déconseille ta reconversion. Comment gères-tu cela ?",opts:["Tu renonces — si tout le monde est contre, c'est un signal d'alarme","Tu écoutes les arguments, tu les analyses objectivement puis tu décides selon ta propre évaluation","Tu passes outre sans tenir compte de leurs avis","Tu demandes l'avis de ton employeur actuel pour avoir une perspective externe"],a:1},
  {q:"Tu passes un entretien en reconversion. Tu es moins qualifié que les candidats classiques du domaine. Comment te positionnes-tu ?",opts:["Tu minimises ton manque d'expérience dans le nouveau domaine","Tu mets en avant ce que ta trajectoire passée apporte de différent et complémentaire","Tu proposes de travailler à un salaire inférieur pour compenser","Tu dis que tu apprendras plus vite sans en donner de preuve"],a:1},
  {q:"Tu as 40 ans et tu veux changer de métier. Le recruteur semble hésitant sur ta capacité d'adaptation.",opts:["Tu rassures en disant que l'âge n'a aucune importance","Tu cites des exemples concrets de situations où tu as appris rapidement de nouvelles compétences","Tu proposes une période d'essai plus longue pour le rassurer","Tu demandes pourquoi il doute de ta capacité d'adaptation"],a:1},
  {q:"Tu veux quitter un métier bien payé pour une passion moins lucrative. Comment justifies-tu ce choix ?",opts:["Tu évites de mentionner la différence de salaire","Tu expliques que l'argent n'a jamais été ta motivation principale","Tu montres que tu as analysé les implications financières et que tu assumes ce choix","Tu minimises la différence de salaire en espérant que le recruteur ne s'en souvienne pas"],a:2},
  {q:"Tu as suivi une formation de reconversion de 6 mois. Le recruteur te demande si tu es vraiment prêt.",opts:["Tu réponds oui avec enthousiasme sans détailler","Tu décris ce que tu as appris concrètement et comment tu peux l'appliquer dès le premier jour","Tu admets que tu auras besoin de temps pour monter en compétence","Tu demandes ce qui lui fait penser que tu ne serais pas prêt"],a:1},
  {q:"Pendant ta reconversion, tu traverses une période de doute intense. Quelle attitude adoptes-tu ?",opts:["Tu mets le projet en pause jusqu'à ce que le doute disparaisse","Tu en parles avec des gens qui ont réussi leur reconversion pour reprendre de la perspective","Tu forces sur la formation pour ne pas laisser le doute s'installer","Tu reprends ton ancien métier temporairement pour te rassurer"],a:1},
  {q:"Tu as raté une première tentative de reconversion. Le recruteur te le demande.",opts:["Tu omets cet épisode dans ta présentation","Tu expliques ce qui n'a pas fonctionné, ce que tu en as appris et ce que tu as changé dans ton approche","Tu minimises en disant que c'était un petit essai sans enjeu","Tu blâmes les circonstances extérieures sans prendre de responsabilité"],a:1},
  {q:"On te propose un poste en reconversion avec 20% de salaire en moins. Comment décides-tu ?",opts:["Tu refuses automatiquement — une baisse de salaire n'est jamais acceptable","Tu acceptes sans condition — la reconversion mérite tous les sacrifices","Tu évalues si la trajectoire à 3 ans compense la baisse à court terme avant de décider","Tu négocies uniquement la partie variable pour maintenir ton revenu total"],a:2},
  {q:"Tu cherches à te reconvertir dans un domaine que tu n'as pas encore pratiqué. Le recruteur te demande pourquoi ce domaine précisément.",opts:["Tu dis que c'est ta passion depuis toujours sans donner plus de détails","Tu expliques le cheminement concret qui t'a amené à ce choix avec des étapes précises","Tu réponds que tu veux changer d'environnement sans lier ça à ce secteur spécifiquement","Tu demandes au recruteur ce qu'il pense de ton choix avant de répondre"],a:1},
  {q:"Ton projet de reconversion implique de retourner en formation pendant 1 an. Ton partenaire est réticent.",opts:["Tu abandonnes — l'harmonie familiale passe avant le projet professionnel","Tu passes outre — c'est ta carrière et ta décision","Tu organises une vraie discussion pour aligner les attentes et trouver un compromis concret","Tu attends que la situation familiale évolue avant de relancer le projet"],a:2},
  {q:"Le recruteur te demande ce qui te différencie d'un jeune diplômé du domaine.",opts:["Tu dis que tu as plus de maturité sans en dire plus","Tu listes tes années d'expérience comme argument principal","Tu identifies précisément ce que ta trajectoire apporte : vision transversale, gestion de pression, adaptation","Tu admets que le jeune diplômé est probablement plus à jour techniquement"],a:2},
  {q:"Tu hésites entre deux directions de reconversion très différentes. Le recruteur te le demande.",opts:["Tu choisis l'une des deux au hasard pour paraître décidé","Tu expliques les critères que tu utiliseras pour trancher et le délai dans lequel tu décideras","Tu dis que tu explores les deux en parallèle sans te presser","Tu demandes lequel des deux l'intéresserait davantage pour orienter ta réponse"],a:1},
  {q:"Tu te reconvertis dans un secteur très différent. Le recruteur te demande si tu mesures vraiment le changement.",opts:["Tu confirmes sans détailler pour ne pas rouvrir le débat","Tu décris concrètement les différences que tu as identifiées et comment tu t'y es préparé","Tu minimises les différences pour rassurer le recruteur","Tu retournes la question en lui demandant ce qu'il considère comme les vraies différences"],a:1},
  {q:"Ton employeur actuel t'offre une promotion juste au moment où tu finalises ton projet de reconversion.",opts:["Tu acceptes la promotion — c'est une récompense méritée","Tu refuses sans hésitation — ton projet passe avant tout","Tu analyses si cette promotion change réellement ta trajectoire ou reporte simplement le problème","Tu utilises la promotion pour négocier un meilleur départ"],a:2},
  {q:"Tu as peur du jugement de tes collègues sur ta reconversion. Comment gères-tu cela ?",opts:["Tu attends que tout le monde approuve avant de te lancer","Tu gardes ton projet confidentiel jusqu'à ce qu'il soit suffisamment avancé","Tu demandes l'avis de tout ton entourage et tu te laisses guider par la majorité","Tu annonces ton projet publiquement dès le début pour te forcer à tenir"],a:1},
  {q:"Le recruteur te demande comment tu géreras les moments difficiles de cette reconversion.",opts:["Tu dis que tu es quelqu'un de solide et que tu t'en sortiras","Tu décris une méthode concrète que tu as déjà utilisée pour traverser une période difficile","Tu admets que tu ne sais pas encore mais que tu t'adaptes bien","Tu expliques que tu n'anticipes pas de vraies difficultés car tu es très motivé"],a:1},
  {q:"Tu es en plein entretien de reconversion et le recruteur met en doute ta capacité à tenir sur le long terme.",opts:["Tu te défends vigoureusement pour montrer que tu ne cèdes pas","Tu prends le doute au sérieux et tu argumes calmement avec des faits concrets","Tu lui demandes sur quoi il base ce doute avant de répondre","Tu restes silencieux pour montrer que tu es au-dessus de ce type de question"],a:1},
  {q:"Tu traverses une reconversion difficile et tu commences à douter de tout ton projet.",opts:["Tu arrêtes tout et tu reprends ton ancien métier","Tu forces sur la formation pour ne pas laisser le doute s'installer","Tu fais le point sur ce qui a changé depuis le début et tu identifies précisément ce qui génère le doute","Tu cherches une validation externe auprès d'un recruteur ou d'un mentor"],a:2},
  {q:"Le recruteur te demande ce que tu ferais si cette reconversion ne fonctionnait pas.",opts:["Tu dis que l'échec n'est pas une option dans ton projet","Tu expliques que tu as envisagé un plan B concret et que ça t'aide à avancer sereinement","Tu réponds que tu reviendrais à ton ancien métier sans hésiter","Tu évites la question car elle est négative et déstabilisante"],a:1},
  {q:"Tu postules dans un secteur que tu ne connais pas encore bien. Le recruteur le remarque.",opts:["Tu essaies de paraître plus informé que tu ne l'es réellement","Tu admets honnêtement tes lacunes et montres les actions concrètes que tu as menées pour les combler","Tu changes de sujet pour parler de tes points forts","Tu expliques que tu compenseras ton manque de connaissance par ta motivation"],a:1},
  {q:"Tu n'as pas encore de projet précis mais tu sais que tu veux changer. Comment l'expliques-tu ?",opts:["Tu caches cette incertitude et inventes un projet défini","Tu expliques que tu es en phase d'exploration active avec des démarches concrètes en cours","Tu dis que tu cherches simplement autre chose sans direction","Tu demandes au recruteur ce qu'il pense qui te conviendrait"],a:1},
  {q:"Tu cherches à te reconvertir dans un secteur très compétitif. Comment te démarques-tu ?",opts:["Tu proposes de travailler gratuitement pour prouver ta valeur","Tu identifies un angle spécifique que ta trajectoire passée rend unique et tu le travailles en profondeur","Tu postules massivement partout pour maximiser tes chances","Tu te concentres uniquement sur les entreprises qui recrutent des profils en reconversion"],a:1},
  {q:"Le recruteur te demande ce que tu feras si tu n'obtiens pas ce poste en reconversion.",opts:["Tu dis que tu n'envisages pas cet échec","Tu montres que tu as d'autres pistes actives et que tu ne mets pas tout sur un seul poste","Tu réponds que tu continueras à postuler dans ce domaine sans te décourager","Tu demandes ce qui manque dans ton profil pour comprendre et t'améliorer"],a:1}
];

var BANK_FREELANCE_STATUT=[
  {q:"Tu veux lancer ton activité en solo. Quel statut est le plus simple à créer ?",opts:["La SARL unipersonnelle (EURL)","La micro-entreprise (auto-entrepreneur)","La SAS unipersonnelle (SASU)","Le portage salarial"],a:1},
  {q:"En micro-entreprise, quel est le plafond de CA annuel pour les prestations de services en 2024 ?",opts:["36 800€","77 700€","176 200€","50 000€"],a:1},
  {q:"Tu dépasses le plafond de CA en micro-entreprise. Que se passe-t-il ?",opts:["Tu es radié automatiquement","Tu bascules en régime réel et changes de statut","Tu continues avec une majoration de cotisations","Tu dois fermer et recréer une structure sous 30 jours"],a:1},
  {q:"Le micro-entrepreneur a-t-il droit aux allocations chômage s'il ferme son activité ?",opts:["Oui, automatiquement comme un salarié","Non, sauf s'il avait des droits ARE antérieurs non épuisés","Oui, après 2 ans d'activité minimum","Non, jamais"],a:1},
  {q:"Qu'est-ce que le portage salarial pour un freelance ?",opts:["Un statut pour les retraités qui reprennent une activité","Un dispositif pour facturer des missions tout en restant salarié d'une société de portage","Un contrat spécial pour les consultants seniors","Un régime fiscal avantageux pour les indépendants"],a:1},
  {q:"Quelle est la différence principale entre la SASU et la micro-entreprise ?",opts:["Aucune — ce sont deux noms pour la même chose","La SASU est une vraie société avec personnalité morale, plus de protection mais plus de charges","La micro-entreprise offre plus de protection que la SASU","La SASU est réservée aux professions libérales réglementées"],a:1},
  {q:"En tant que freelance, es-tu obligé d'avoir une mutuelle santé ?",opts:["Non, c'est facultatif pour les indépendants","Oui, tu es affilié obligatoirement à la SSI","Non, tu peux rester sans couverture complémentaire","Oui, l'État impose une mutuelle minimale à tous les travailleurs"],a:1},
  {q:"Tu es micro-entrepreneur et tu ne fais pas de CA pendant 24 mois. Que se passe-t-il ?",opts:["Rien — tu peux garder le statut indéfiniment","Tu es radié automatiquement","Tu bascules en auto-entrepreneur dormant","Tu dois déclarer une cessation d'activité dans les 30 jours"],a:1},
  {q:"Qu'est-ce que la CFE que tout freelance doit payer ?",opts:["Une cotisation sociale spécifique aux freelances","Une taxe locale payée annuellement par toutes les entreprises dont les micro-entrepreneurs","Une assurance obligatoire pour les indépendants","Un impôt sur les bénéfices des petites entreprises"],a:1},
  {q:"Qu'est-ce que la RC Pro et est-elle obligatoire pour tous les freelances ?",opts:["Obligatoire pour toutes les professions sans exception","Obligatoire pour certaines professions réglementées, fortement recommandée pour toutes","Une assurance chômage volontaire pour les indépendants","Un contrat de prévoyance obligatoire pour les freelances en SASU"],a:1},
  {q:"Tu lances ton activité freelance. Quel statut protège le mieux ton patrimoine personnel ?",opts:["La micro-entreprise — simple et rapide","La SASU ou EURL — la personnalité morale sépare tes biens personnels de ceux de l'entreprise","Le portage salarial — tu restes salarié donc protégé","L'auto-entrepreneur — aucune différence avec les autres statuts"],a:1},
  {q:"En micro-entreprise, quand commence-t-on à cotiser pour la retraite ?",opts:["Dès le premier euro de chiffre d'affaires déclaré","Uniquement à partir de 10 000€ de CA annuel","Après 2 ans d'activité continue","Jamais — la micro-entreprise ne génère aucun droit retraite"],a:0},
  {q:"Tu es freelance en SASU et tu te verses un salaire. Quel régime de protection sociale s'applique ?",opts:["Le régime de la Sécurité Sociale des Indépendants","Le régime général des salariés — même protection qu'un employé","Un régime hybride entre salarié et indépendant","Aucun régime obligatoire — tu choisis librement"],a:1},
  {q:"En tant que micro-entrepreneur, dois-tu facturer la TVA à tes clients ?",opts:["Oui, obligatoirement dès le premier euro","Non, tant que tu ne dépasses pas les seuils de franchise en base de TVA","Oui, mais uniquement pour les clients professionnels","Non, les micro-entrepreneurs sont totalement exonérés de TVA"],a:1},
  {q:"Qu'est-ce que l'ACRE pour un créateur d'entreprise ?",opts:["Une aide au logement pour les créateurs","Une exonération partielle de cotisations sociales pendant la première année","Un prêt sans intérêt accordé par Bpifrance","Une réduction d'impôt sur le revenu la première année"],a:1},
  {q:"Tu es freelance et tu prends 3 semaines de vacances. Qui te rémunère pendant cette période ?",opts:["L'État via un dispositif spécifique aux indépendants","Personne — les indépendants n'ont pas de congés payés sauf s'ils ont provisionné","Ta mutuelle peut couvrir une partie","France Travail si tu es inscrit comme demandeur d'emploi partiel"],a:1},
  {q:"Quel est le délai légal de paiement entre professionnels en France ?",opts:["30 jours à compter de la date de la facture","30 jours à compter de la réception des services, 60 jours maximum par accord","15 jours uniquement pour les prestations de services","60 jours calendaires dans tous les cas"],a:1},
  {q:"Tu es freelance depuis 2 ans et tu tombes malade 3 semaines. Quel revenu perçois-tu ?",opts:["Tes revenus habituels maintenus intégralement","Des indemnités journalières après un délai de carence, si tu as cotisé suffisamment","Des indemnités journalières dès le premier jour d'arrêt","Rien — les indépendants n'ont aucune couverture maladie"],a:1},
  {q:"Un client ne paie pas ta facture depuis 45 jours malgré deux relances. Première étape légale ?",opts:["Saisir directement le tribunal de commerce","Envoyer une mise en demeure par lettre recommandée avec accusé de réception","Déposer une plainte pénale pour abus de confiance","Contacter la chambre de commerce pour une médiation obligatoire"],a:1},
  {q:"Quelle est la différence entre auto-entrepreneur et micro-entrepreneur ?",opts:["Deux statuts distincts avec des régimes fiscaux différents","C'est exactement le même statut — auto-entrepreneur est l'ancien nom","L'auto-entrepreneur est réservé aux activités artisanales","L'auto-entrepreneur génère des droits chômage contrairement à la micro-entreprise"],a:1},
  {q:"En tant que freelance, peux-tu légalement avoir plusieurs clients en même temps ?",opts:["Non, un seul client à la fois pour éviter tout conflit d'intérêt","Oui, sans restriction légale — c'est même recommandé pour diversifier les risques","Oui, mais avec une déclaration préalable à l'URSSAF","Non, sauf si chaque mission est encadrée par un contrat spécifique"],a:1},
  {q:"Ton CA de micro-entrepreneur est de 0€ cette année. Combien de cotisations paies-tu ?",opts:["Un minimum forfaitaire de 500€ par an","Zéro — en micro-entreprise, pas de CA = pas de cotisations","La CFE uniquement, pas les cotisations sociales","Un forfait réduit de 200€ pour maintenir les droits retraite"],a:1},
  {q:"Qu'est-ce que la prévoyance et pourquoi est-elle cruciale pour un freelance ?",opts:["Une assurance optionnelle pour protéger son matériel","Un dispositif qui couvre la perte de revenus en cas d'incapacité ou d'invalidité — non obligatoire mais essentiel","Un fonds de réserve obligatoire constitué par les cotisations URSSAF","Une garantie bancaire pour ouvrir un compte professionnel"],a:1},
  {q:"Tu veux facturer 5 000€ HT par mois en micro-entreprise. Combien gardes-tu après cotisations ?",opts:["La totalité — les cotisations ne s'appliquent qu'aux bénéfices","Environ 3 900€ — les cotisations représentent environ 22% du CA en services","Environ 2 500€ — les cotisations représentent 50% du CA","Environ 4 500€ — les cotisations sont plafonnées à 500€ par mois"],a:1},
  {q:"Tu es micro-entrepreneur et un client veut une facture avec TVA. Que lui réponds-tu ?",opts:["Tu génères la facture avec TVA — c'est toujours possible","Tu lui expliques que tu es en franchise de TVA et que ta facture ne comporte pas de TVA","Tu lui demandes de régler la TVA directement aux impôts","Tu passes en régime TVA uniquement pour ce client"],a:1}
];

var BANK_FREELANCE_MISSIONS=[
  {q:"Un client te demande ton tarif. Tu ne connais pas encore son budget. Que fais-tu ?",opts:["Tu donnes ton tarif habituel sans hésiter","Tu demandes d'abord quel est son budget prévu","Tu proposes une fourchette large pour garder de la marge","Tu envoies un devis détaillé avant toute discussion"],a:1},
  {q:"Un client veut baisser ton tarif de 20%. La mission t'intéresse. Comment réagis-tu ?",opts:["Tu acceptes — mieux vaut une mission à prix réduit que pas de mission","Tu refuses immédiatement — céder une fois, c'est céder toujours","Tu demandes ce qu'on peut retirer du scope pour maintenir ton tarif","Tu proposes de livrer plus tard pour justifier le prix actuel"],a:2},
  {q:"Un prospect dit que tu es trop cher par rapport à un concurrent. Que réponds-tu ?",opts:["Tu baisses ton tarif pour t'aligner","Tu expliques concrètement ce que ta différence de prix apporte en valeur","Tu demandes ce que le concurrent propose exactement avant de répondre","Tu mets fin à la discussion — si c'est le prix qui prime, ce n'est pas ton client"],a:1},
  {q:"Tu as signé une mission. Le client change l'objectif principal en cours de route. Que fais-tu ?",opts:["Tu t'adaptes sans rien dire — la flexibilité est une qualité","Tu arrêtes le travail et attends un accord formel sur le nouveau périmètre","Tu analyses l'impact sur le planning et le budget puis proposes un avenant si nécessaire","Tu livres ce qui était prévu et ignores le changement"],a:2},
  {q:"Un client satisfait ne te propose pas de nouvelle mission après livraison. Que fais-tu ?",opts:["Tu attends — forcer la relation crée de la pression","Tu envoies une facture et tu passes à autre chose","Tu lui demandes explicitement s'il a d'autres besoins et proposes une suite","Tu relances toutes les semaines jusqu'à obtenir une réponse"],a:2},
  {q:"Un client veut travailler sans contrat pour aller plus vite. Comment réagis-tu ?",opts:["Tu acceptes si tu lui fais confiance","Tu refuses catégoriquement — sans contrat, pas de mission","Tu expliques que le contrat protège les deux parties et proposes un document simple","Tu demandes un acompte plus élevé en compensation"],a:2},
  {q:"Tu as deux missions en parallèle et tu ne peux pas tenir les deux délais. Que fais-tu ?",opts:["Tu travailles jour et nuit pour tout livrer sans rien dire","Tu préviens le client le moins prioritaire et proposes une solution concrète","Tu livres ce que tu peux et tu t'expliques après","Tu sous-traites sans en informer les clients"],a:1},
  {q:"Un client ne paie pas ta facture depuis 60 jours malgré deux relances. Étape suivante ?",opts:["Tu coupes la relation et tu passes en pertes","Tu envoies une mise en demeure formelle par lettre recommandée","Tu appelles directement le dirigeant","Tu proposes un échelonnement pour débloquer"],a:1},
  {q:"Un prospect te demande un test gratuit pour évaluer ton niveau. Que lui réponds-tu ?",opts:["Tu acceptes — c'est normal de prouver sa valeur","Tu refuses toujours — le travail gratuit dévalue la profession","Tu demandes ce qui manque dans ton portfolio pour le convaincre sans test","Tu proposes un mini-test payant limité à 2 heures"],a:2},
  {q:"Un client représente 80% de ton CA depuis 6 mois. Quel est le vrai problème ?",opts:["Aucun — un bon client fidèle est une chance","Tu as une dépendance dangereuse — s'il part, tu perds 80% de ton CA","Tu risques une requalification en CDI","Tu paies trop d'impôts à cause de la concentration des revenus"],a:1},
  {q:"Comment fixes-tu ton TJM de manière rationnelle ?",opts:["Tu prends le tarif de tes concurrents et tu t'alignes","Tu calcules tes charges annuelles, les jours facturables réels et la marge souhaitée","Tu prends ton ancien salaire mensuel et tu le divises par 20","Tu demandes le budget du client et tu t'y adaptes"],a:1},
  {q:"Tu cherches de nouveaux clients. Quelle approche est la plus efficace sur le long terme ?",opts:["Postuler massivement sur les plateformes freelance","Créer un site web et attendre que les clients viennent","Entretenir ton réseau et maintenir une relation active avec tes anciens clients","Faire de la publicité payante sur les réseaux sociaux"],a:2},
  {q:"Tu réalises que la mission a largement dépassé le scope initial. Que fais-tu ?",opts:["Tu absorbes le surcoût pour ne pas créer de conflit","Tu arrêtes le travail et attends un accord","Tu informes le client, documentes le travail supplémentaire et proposes un avenant","Tu livres tout et tu factures les extras sans les avoir annoncés"],a:2},
  {q:"Plusieurs prospects t'intéressent mais aucun ne signe. Comment tu accélères leur décision ?",opts:["Tu baisses tes tarifs pour déclencher la décision","Tu envoies des relances hebdomadaires","Tu communiques ta disponibilité limitée — la rareté crée l'urgence","Tu attends — forcer une décision crée de mauvais clients"],a:2},
  {q:"Un client veut te payer en 6 fois pour une mission courte de 3 semaines. Que fais-tu ?",opts:["Tu acceptes — il a peut-être des contraintes de trésorerie","Tu refuses — les paiements fractionnés sont un risque d'impayé","Tu acceptes avec un acompte immédiat et un planning contractualisé","Tu livres en 6 phases correspondant aux 6 paiements"],a:2},
  {q:"Un client veut modifier une livraison déjà validée. Que fais-tu ?",opts:["Tu refais sans rien dire — la satisfaction client prime","Tu factures automatiquement un supplément","Tu rappelles que la validation engageait les deux parties et proposes un avenant","Tu acceptes une fois mais tu poses une limite claire"],a:2},
  {q:"Tu as une mission intéressante mais tu ne maîtrises que 70% du périmètre. Que fais-tu ?",opts:["Tu refuses — il faut maîtriser 100% avant d'accepter","Tu acceptes en étant transparent sur ton niveau","Tu acceptes et tu apprends en livrant sans en parler au client","Tu proposes d'associer un autre freelance pour les 30% manquants"],a:1},
  {q:"Comment présentes-tu ta valeur à un client qui ne voit que le prix ?",opts:["Tu baisses ton tarif pour que le prix ne soit plus un obstacle","Tu parles uniquement de la qualité de tes livrables","Tu montres des résultats passés mesurables et le coût réel d'un mauvais prestataire","Tu proposes une garantie de résultat pour justifier le tarif"],a:2},
  {q:"Un client te contacte le samedi pour une urgence non prévue au contrat. Que fais-tu ?",opts:["Tu réponds toujours — un bon freelance est disponible 7j/7","Tu ignores jusqu'au lundi","Tu appliques les conditions d'urgence définies au départ de la relation","Tu réponds mais tu factures une majoration sans en avoir parlé avant"],a:2},
  {q:"Tu viens de perdre une grosse mission. Comment gères-tu la période creuse ?",opts:["Tu attends que les clients reviennent","Tu baisses tes tarifs pour décrocher vite","Tu actives ton réseau, relances les anciens clients et renforces ta visibilité","Tu acceptes n'importe quelle mission pour combler le vide"],a:2},
  {q:"Un nouveau client veut démarrer immédiatement mais sans acompte. Que fais-tu ?",opts:["Tu acceptes — exiger un acompte peut faire fuir","Tu refuses — pas d'acompte, pas de démarrage","Tu expliques que l'acompte est ta pratique standard et tu l'intègres au contrat","Tu démarres mais tu envoies une facture dès le premier livrable"],a:2},
  {q:"Un client satisfait te demande de le recommander à ses contacts. Comment réagis-tu ?",opts:["Tu remercies et attends qu'il le fasse s'il veut","Tu lui demandes explicitement de te recommander et facilites ce partage","Tu refuses — mélanger réseau personnel et professionnel est risqué","Tu proposes une commission pour chaque recommandation"],a:1},
  {q:"Un client historique revient avec un budget 30% plus bas qu'avant. Comment réagis-tu ?",opts:["Tu acceptes — fidéliser un client historique vaut un sacrifice","Tu refuses — la relation ne justifie pas une dévalorisation","Tu proposes de réduire le scope proportionnellement au budget","Tu lui demandes pourquoi son budget a baissé avant de décider"],a:2},
  {q:"Tu as plusieurs prospects mais tu n'arrives pas à transformer. Quel est le vrai problème ?",opts:["Tes tarifs sont trop élevés","Tu n'es pas assez connu — il faut investir en publicité","Ton offre n'est pas assez claire ou ne résout pas un problème précis","Tu n'es pas assez présent sur les réseaux sociaux"],a:2},
  {q:"Un client demande une exclusivité totale sur ton temps pendant 6 mois. Comment traites-tu ça ?",opts:["Tu acceptes si le volume est suffisant","Tu refuses — l'exclusivité va contre l'essence du freelance","Tu acceptes uniquement avec une majoration significative et une clause de sortie claire","Tu demandes pourquoi il veut cette exclusivité avant de décider"],a:2}
];

var BANK_ETUDIANT_ALTERNANCE=[
  {q:"Tu es en alternance. Ton maître d'apprentissage te demande de faire des tâches hors contrat. Que fais-tu ?",opts:["Tu obéis sans rien dire — l'employeur a toujours raison","Tu refuses catégoriquement et menaces de partir","Tu en parles calmement et si ça continue, tu informes ton école","Tu ignores et fais uniquement ce qui t'intéresse"],a:2},
  {q:"Ton employeur en alternance veut te faire travailler 40h par semaine. Tu as 17 ans. Est-ce légal ?",opts:["Oui, l'alternance n'a pas de limite d'âge pour les horaires","Non, la durée maximale est 35h par semaine pour les moins de 18 ans","Oui, jusqu'à 38h avec une majoration de salaire","Non, la limite est 30h pour les mineurs"],a:1},
  {q:"Tu termines ton alternance. L'entreprise ne te fait pas de promesse d'embauche. Que fais-tu ?",opts:["Tu te vexes et tu pars sans saluer personne","Tu demandes un bilan et des retours concrets pour progresser","Tu exiges une lettre de recommandation avant de partir","Tu restes en espérant que l'embauche vienne naturellement"],a:1},
  {q:"Tu as trouvé une alternance mais le salaire proposé est sous le minimum légal. Que fais-tu ?",opts:["Tu acceptes — mieux vaut une alternance sous-payée que rien","Tu négocie en mentionnant le minimum légal de façon respectueuse","Tu refuses immédiatement sans discussion","Tu signales l'entreprise aux autorités directement"],a:1},
  {q:"En alternance, qui est responsable de ton suivi pédagogique ?",opts:["Uniquement l'entreprise via ton maître d'apprentissage","Uniquement ton école via ton tuteur pédagogique","Les deux — maître d'apprentissage et tuteur école ont chacun un rôle","Toi seul — tu es autonome et responsable de tout"],a:2},
  {q:"Peux-tu cumuler une alternance avec un job étudiant le week-end ?",opts:["Non, l'alternance interdit tout autre emploi","Oui, mais la durée totale de travail ne doit pas dépasser les limites légales","Oui, sans aucune restriction","Non, sauf autorisation écrite de l'employeur principal"],a:1},
  {q:"Ton entreprise d'alternance ferme définitivement. Que se passe-t-il ?",opts:["Tu perds ton contrat et tu dois tout recommencer","Tu bénéficies d'un délai de 3 mois pour trouver une nouvelle entreprise avec l'aide du CFA","Tu es automatiquement licencié sans indemnités","Tu dois rembourser les frais de formation"],a:1},
  {q:"Tu es stagiaire depuis 2 mois. As-tu droit à une gratification ?",opts:["Non, la gratification est toujours facultative","Oui, elle est obligatoire à partir de 2 mois de stage consécutifs","Oui, uniquement si l'entreprise a plus de 50 salariés","Non, sauf si ton école l'exige dans la convention"],a:1},
  {q:"En alternance, qui paie ta formation ?",opts:["Toi-même via un prêt étudiant","L'OPCO de la branche de l'entreprise","L'entreprise directement sur son budget formation","L'État via une subvention versée à l'école"],a:1},
  {q:"Ton employeur peut-il rompre ton contrat d'apprentissage après les 45 premiers jours ?",opts:["Non, le contrat est intouchable après la période d'essai","Oui, pour faute grave ou force majeure uniquement","Oui, à tout moment avec un préavis de 2 semaines","Non, sauf accord du centre de formation"],a:1},
  {q:"Tu cherches une alternance mais tu n'as pas encore trouvé d'entreprise. Peux-tu quand même t'inscrire en formation ?",opts:["Non, l'entreprise doit être trouvée avant l'inscription","Oui, tu peux t'inscrire et chercher en parallèle souvent jusqu'à la rentrée","Non, la loi impose d'avoir le contrat signé avant","Oui, mais tu as 15 jours maximum après la rentrée"],a:1},
  {q:"Tu es en stage. L'entreprise te demande de faire une mission complètement différente de ta convention. Que fais-tu ?",opts:["Tu t'adaptes — les stages sont faits pour découvrir","Tu refuses et tu rentres chez toi","Tu en parles à ton tuteur école car la convention encadre légalement la mission","Tu acceptes mais tu demandes une nouvelle convention"],a:2},
  {q:"Quelle est la durée maximale légale d'un stage en entreprise sur l'année scolaire ?",opts:["3 mois","6 mois","9 mois","12 mois"],a:1},
  {q:"En alternance, as-tu droit aux tickets restaurant si l'entreprise en propose à ses salariés ?",opts:["Non, les alternants n'ont pas droit aux avantages des salariés","Oui, tu y as également droit","Oui, mais uniquement la moitié des tickets","Non, sauf si ton contrat le mentionne explicitement"],a:1},
  {q:"Qui fixe les dates de tes congés en alternance ?",opts:["Toi seul — tu gères ton planning librement","L'employeur seul sans te consulter","L'école seule selon les vacances scolaires","L'employeur en tenant compte de tes souhaits et des contraintes de l'entreprise"],a:3},
  {q:"Ta convention de stage mentionne une mission précise. Mais l'entreprise veut t'en confier une autre dès le premier jour. Quelle est la bonne réaction ?",opts:["Tu acceptes sans poser de questions — s'adapter c'est bien","Tu pars immédiatement — ce n'est pas ce qui était prévu","Tu demandes une explication et tu informes ton tuteur école si nécessaire","Tu fais la nouvelle mission sans en parler à personne"],a:2},
  {q:"Tu es en stage et tu tombes malade. Ta gratification continue-t-elle ?",opts:["Oui, intégralement comme un salarié","Non, elle peut être suspendue pendant l'absence selon la convention","Tu continues de percevoir la moitié de ta gratification","Elle est supprimée après 3 jours d'absence"],a:1},
  {q:"Tu es alternant. Ton maître d'apprentissage change en cours d'année. Que doit faire l'entreprise ?",opts:["Rien — le changement est informel et n'engage personne","Informer le CFA et désigner officiellement un nouveau maître d'apprentissage","Te demander ton accord écrit avant tout changement","Mettre fin au contrat et en signer un nouveau"],a:1},
  {q:"Tu reçois ton premier bulletin de salaire en alternance. Il te semble trop bas. Que fais-tu ?",opts:["Tu acceptes en silence — tu ne connais pas encore bien la paie","Tu demandes des explications aux RH avec ton contrat sous la main","Tu te plains à tes collègues pour avoir leur avis","Tu postes sur les réseaux pour dénoncer l'entreprise"],a:1},
  {q:"Tu veux poser une journée de congé en alternance pour un événement personnel. Comment tu procèdes ?",opts:["Tu envoies un message le matin même — c'est suffisant","Tu demandes à l'avance à ton maître d'apprentissage et tu t'assures que ça ne bloque pas l'activité","Tu poses le congé sans prévenir — c'est ton droit","Tu demandes l'accord de ton école avant celui de l'entreprise"],a:1},
  {q:"En alternance, peux-tu être délégué du personnel ou représentant du personnel ?",opts:["Non, les alternants n'ont aucun droit syndical","Oui, les alternants ont les mêmes droits que les salariés en matière de représentation","Oui, mais uniquement après 6 mois de contrat","Non, sauf dans les entreprises de plus de 50 salariés"],a:1},
  {q:"Ton maître d'apprentissage est souvent absent. Comment gères-tu la situation ?",opts:["Tu profites de son absence pour faire autre chose","Tu attends qu'il revienne avant de travailler sur quoi que ce soit","Tu prends des initiatives et tu documentes ton travail pour lui soumettre à son retour","Tu te plains directement aux RH de son absence"],a:2},
  {q:"Tu trouves une alternance mais l'entreprise est loin de chez toi. Qui prend en charge les frais de transport ?",opts:["Toujours l'entreprise à 100%","Tu peux bénéficier d'une prise en charge partielle des transports comme les salariés","Uniquement si la distance dépasse 50km","Personne — les frais de transport sont entièrement à ta charge"],a:1},
  {q:"Tu es en contrat d'apprentissage. Tu obtiens ton diplôme en cours d'année. Que se passe-t-il ?",opts:["Le contrat se termine automatiquement à l'obtention du diplôme","Le contrat continue jusqu'à la date prévue sauf accord contraire","Tu dois négocier une nouvelle rémunération immédiatement","L'entreprise peut te licencier sans indemnité"],a:0},
  {q:"Quelle est la différence entre un contrat d'apprentissage et un contrat de professionnalisation ?",opts:["Aucune — deux noms pour la même chose","Le contrat d'apprentissage vise les jeunes en formation initiale, le contrat pro est pour les demandeurs d'emploi et adultes en reconversion","Le contrat d'apprentissage est réservé aux BTS, le contrat pro aux licences","Le contrat pro est toujours mieux payé que l'apprentissage"],a:1}
];

var BANK_ETUDIANT_PREMIER_EMPLOI=[
  {q:"Tu décroches ton premier emploi. Ton manager te donne trop de travail dès la première semaine. Que fais-tu ?",opts:["Tu fais tout sans rien dire pour faire bonne impression","Tu lui dis directement que tu ne peux pas tout faire","Tu priorises, fais ce que tu peux et tiens ton manager informé","Tu demandes à un collègue de tout faire à ta place"],a:2},
  {q:"Tu fais une erreur importante lors de ta première semaine. Que fais-tu ?",opts:["Tu caches l'erreur et tu espères que ça ne se voit pas","Tu le signales immédiatement à ton manager et tu proposes une solution","Tu blâmes un collègue pour éviter les répercussions","Tu attends que quelqu'un d'autre remarque l'erreur"],a:1},
  {q:"Tu réalises que le poste ne correspond pas à ce qui t'avait été décrit. Tu es encore en période d'essai. Que fais-tu ?",opts:["Tu attends la fin de la période d'essai pour en parler","Tu demandes un entretien rapidement pour clarifier la situation","Tu démissionnes immédiatement","Tu continues sans rien dire et tu cherches ailleurs en secret"],a:1},
  {q:"Tes collègues te donnent des conseils contradictoires. Comment gères-tu ça ?",opts:["Tu suis les conseils de celui qui a le plus d'ancienneté","Tu demandes à ton manager de clarifier quelle méthode suivre","Tu choisis ce qui te semble le plus logique sans en parler","Tu essaies toutes les méthodes en alternance"],a:1},
  {q:"Ton manager ne te donne presque aucune tâche pendant tes premières semaines. Comment réagis-tu ?",opts:["Tu profites de ce temps libre","Tu attends patiemment qu'il vienne vers toi","Tu prends l'initiative de demander ce que tu peux faire pour être utile","Tu te plains aux RH que tu n'as pas de travail"],a:2},
  {q:"Tu as du mal à t'intégrer dans l'équipe. Quelle est la meilleure approche ?",opts:["Tu attends que l'équipe vienne vers toi","Tu forces les relations en proposant des activités hors travail","Tu observes comment les gens fonctionnent et tu cherches des occasions naturelles de contribuer","Tu te plains à ton manager que l'équipe n'est pas accueillante"],a:2},
  {q:"On te demande de rester plus tard pour finir un projet urgent. Tu avais prévu quelque chose ce soir. Que fais-tu ?",opts:["Tu pars à l'heure — ta vie personnelle est prioritaire","Tu restes sans poser de questions","Tu évalues l'urgence réelle et tu discutes de ce qui est faisable avec ton manager","Tu acceptes mais tu montres clairement ton mécontentement"],a:2},
  {q:"Tu reçois des retours négatifs sur ton premier rendu. Comment réagis-tu ?",opts:["Tu te décourages — ce travail n'est pas fait pour toi","Tu demandes des précisions pour comprendre exactement ce qui n'allait pas","Tu refais le travail en changeant tout sans demander d'explications","Tu demandes à un collègue de le faire à ta place"],a:1},
  {q:"Un collègue prend le crédit de ton travail devant le management. Comment réagis-tu ?",opts:["Tu l'attaques publiquement devant tout le monde","Tu ignores — ça arrive à tout le monde","Tu recadres calmement en apportant des preuves de ta contribution","Tu vas directement aux RH sans en parler au collègue"],a:2},
  {q:"Ton manager te critique devant toute l'équipe. Comment gères-tu la situation ?",opts:["Tu réponds vivement pour te défendre devant tout le monde","Tu restes calme sur le moment et tu demandes un entretien privé pour en discuter","Tu ignores et tu fais semblant que ça n'a pas eu lieu","Tu vas directement aux RH pour signaler le comportement"],a:1},
  {q:"Tu réalises que tu t'ennuies dans ton poste après 2 mois. Que fais-tu ?",opts:["Tu démissionnes — si ça commence comme ça, ça ne s'arrangera pas","Tu attends en espérant que ça s'améliore tout seul","Tu en parles à ton manager et tu proposes de prendre plus de responsabilités","Tu occupes ton temps libre avec des projets personnels au bureau"],a:2},
  {q:"Tu observes une pratique dans l'entreprise qui te semble peu éthique. Que fais-tu ?",opts:["Tu ignores — ce n'est pas ton rôle en tant que nouveau","Tu en parles à ton manager pour comprendre le contexte","Tu alertes immédiatement une autorité externe","Tu en parles à tes collègues pour voir si c'est normal"],a:1},
  {q:"Tu veux changer de poste après 6 mois dans l'entreprise. Que fais-tu ?",opts:["Tu postules directement en externe sans en parler en interne","Tu en parles d'abord à ton manager pour explorer les possibilités d'évolution interne","Tu attends au moins 2 ans avant d'envisager un changement","Tu postes sur LinkedIn que tu cherches sans prévenir personne"],a:1},
  {q:"Tu dois présenter ton travail devant toute l'équipe pour la première fois. Tu stresses beaucoup. Que fais-tu ?",opts:["Tu évites la présentation en prétextant une maladie","Tu prépares soigneusement et tu acceptes le stress comme quelque chose de normal","Tu demandes à quelqu'un d'autre de présenter à ta place","Tu improvises — la préparation n'est pas nécessaire si on connaît son sujet"],a:1},
  {q:"On te confie une responsabilité importante très tôt. Comment réagis-tu ?",opts:["Tu te sens flatté mais tu n'en parles pas pour ne pas paraître prétentieux","Tu exprimes ta motivation tout en identifiant clairement ce dont tu as besoin pour réussir","Tu refuses — c'est trop tôt et tu pourrais rater","Tu acceptes en faisant semblant que tout va bien même si tu doutes"],a:1},
  {q:"Ton manager est souvent absent et tu manques de guidance. Comment gères-tu ça ?",opts:["Tu ne fais rien en attendant qu'il soit disponible","Tu prends des initiatives et tu documentes tes décisions pour lui soumettre à son retour","Tu te plains aux RH de l'absence de ton manager","Tu demandes à un collègue senior de jouer le rôle de manager informel"],a:1},
  {q:"Tu obtiens ton premier emploi mais le poste est en dessous de ton niveau de formation. Que fais-tu ?",opts:["Tu refuses — ce n'est pas digne de ton diplôme","Tu acceptes et tu cherches à apporter plus que ce qui est attendu pour évoluer rapidement","Tu acceptes uniquement si c'est dans l'entreprise de tes rêves","Tu demandes immédiatement une revalorisation du poste avant de signer"],a:1},
  {q:"Ta façon de travailler est très différente de celle de ton équipe. Comment t'adaptes-tu ?",opts:["Tu imposes ta méthode — elle est probablement meilleure","Tu adoptes complètement la méthode de l'équipe en oubliant la tienne","Tu observes les deux approches et tu te cales sur les standards de l'équipe","Tu travailles de ton côté sans chercher à t'aligner"],a:2},
  {q:"Ton premier salaire est inférieur à ce qui était prévu. Quelle est ta première réaction ?",opts:["Tu publies sur les réseaux sociaux pour dénoncer l'entreprise","Tu vérifies ton bulletin et tu contactes les RH pour comprendre l'écart","Tu attends le mois suivant pour voir si c'est régularisé","Tu démissionnes immédiatement"],a:1},
  {q:"Tu te rends compte que tu n'aimes pas du tout le secteur dans lequel tu travailles. Que fais-tu ?",opts:["Tu démissionnes immédiatement pour ne pas perdre de temps","Tu restes encore au moins un an pour avoir quelque chose de solide sur ton CV","Tu explores si le problème vient du secteur ou du poste avant de prendre une décision","Tu continues en espérant que tes sentiments vont changer"],a:2},
  {q:"Un collègue expérimenté te demande de faire quelque chose qui te semble incorrect. Que fais-tu ?",opts:["Tu obéis — il a plus d'expérience que toi","Tu refuses catégoriquement et tu l'expliques à tout le monde","Tu demandes calmement pourquoi c'est fait de cette façon avant de te décider","Tu fais ce qu'il dit mais tu en parles à ton manager après"],a:2},
  {q:"Tu as du mal à comprendre une tâche confiée. Que fais-tu ?",opts:["Tu fais de ton mieux sans demander d'aide pour ne pas paraître incompétent","Tu demandes des clarifications à la personne qui te l'a confiée","Tu passes du temps sur internet pour trouver la réponse seul","Tu rends le travail incomplet en expliquant que tu n'as pas compris"],a:1},
  {q:"Ton manager te demande ton avis sur une décision déjà prise. Tu n'es pas d'accord. Que fais-tu ?",opts:["Tu approuves — il ne faut pas contrarier son manager","Tu exprimes poliment ton point de vue avec des arguments concrets","Tu gardes ton avis pour toi mais tu n'appliques pas la décision","Tu consultes tes collègues avant de parler à ton manager"],a:1},
  {q:"Tu réalises que ton salaire est inférieur à celui d'un collègue qui fait le même travail. Que fais-tu ?",opts:["Tu te plains auprès de tes collègues pour créer une solidarité","Tu demandes un entretien à ton manager avec des arguments concrets","Tu acceptes en silence — c'est normal d'être moins payé quand on débute","Tu envoies un email aux RH sans en parler à ton manager d'abord"],a:1},
  {q:"On te propose une mission qui dépasse largement tes compétences actuelles. Comment réagis-tu ?",opts:["Tu refuses — mieux vaut dire non que de rater","Tu acceptes sans réfléchir pour montrer ta motivation","Tu acceptes en étant honnête sur tes lacunes et en demandant le soutien nécessaire","Tu acceptes mais tu sous-traites les parties que tu ne maîtrises pas"],a:2}
];

var BANK_NOUVEAU_POSTE_DROITS=[
  {q:"Quelle est la durée maximale de la période d'essai pour un cadre en CDI ?",opts:["2 mois","3 mois","4 mois renouvelable une fois soit 8 mois maximum","6 mois non renouvelables"],a:2},
  {q:"Ton employeur rompt ta période d'essai sans te donner de raison. Est-ce légal ?",opts:["Non, il doit toujours fournir une raison écrite","Oui, la rupture de période d'essai n'a pas à être motivée","Non, sauf si tu es encore dans le premier mois","Oui, mais uniquement pour les CDI de moins de 6 mois"],a:1},
  {q:"Tu prends un nouveau CDI. Quand commence à courir ta période d'essai ?",opts:["À la date de signature du contrat","Le premier jour effectif de travail","30 jours après la signature du contrat","À la date mentionnée dans la lettre d'embauche"],a:1},
  {q:"Ton employeur peut-il renouveler ta période d'essai sans ton accord ?",opts:["Oui, c'est son droit unilatéral","Non, le renouvellement nécessite ton accord exprès et doit être prévu dans le contrat initial","Oui, mais uniquement une fois","Non, sauf si la convention collective le prévoit"],a:1},
  {q:"Tu es en CDI depuis 8 mois. Combien de jours de congés payés as-tu acquis ?",opts:["0 — il faut 1 an pour acquérir des congés","20 jours ouvrés","13,33 jours ouvrés environ (2,5 jours par mois travaillé)","25 jours ouvrés dès le premier jour"],a:2},
  {q:"Ton entreprise doit-elle te proposer une mutuelle d'entreprise ?",opts:["Non, c'est facultatif pour l'employeur","Oui, depuis 2016 toutes les entreprises doivent proposer une mutuelle collective obligatoire","Oui, mais uniquement dans les entreprises de plus de 50 salariés","Non, sauf dans les branches professionnelles qui l'imposent"],a:1},
  {q:"Tu signes un CDI avec une clause de non-concurrence. Quand cette clause prend-elle effet ?",opts:["Dès la signature du contrat","Uniquement à la rupture du contrat","Après la période d'essai","Uniquement en cas de licenciement"],a:1},
  {q:"Ton employeur peut-il modifier ton lieu de travail sans ton accord ?",opts:["Oui, toujours — la mobilité géographique est implicite dans tout contrat","Non, tout changement de lieu nécessite un avenant signé","Cela dépend : si le nouveau lieu est dans le même secteur géographique, c'est possible sans accord","Oui, mais uniquement avec un préavis de 3 mois"],a:2},
  {q:"Tu es nouveau salarié. Ton employeur peut-il modifier ton salaire sans ton accord ?",opts:["Oui, lors de l'évaluation annuelle","Non, le salaire est un élément essentiel du contrat et ne peut être modifié sans ton accord","Oui, à la baisse uniquement si l'entreprise traverse des difficultés","Non, sauf pendant la période d'essai"],a:1},
  {q:"À partir de quand as-tu droit à des tickets restaurant si ton entreprise en propose ?",opts:["Après 3 mois d'ancienneté","Dès le premier jour de travail si tu remplis les conditions","Après la période d'essai validée","Après 6 mois d'ancienneté"],a:1},
  {q:"Quel délai doit respecter l'employeur pour rompre ta période d'essai si tu travailles depuis 45 jours ?",opts:["Aucun délai — rupture immédiate possible","2 semaines de préavis","1 semaine de préavis","3 jours de préavis"],a:1},
  {q:"Tu démissionnes pendant ta période d'essai. Quel préavis dois-tu respecter ?",opts:["Aucun — la démission pendant la période d'essai est immédiate","24 heures si tu es là depuis moins de 8 jours, 48 heures au-delà","1 semaine dans tous les cas","Le même préavis qu'un salarié confirmé"],a:1},
  {q:"Ton contrat prévoit une clause de non-concurrence. Doit-elle comporter une contrepartie financière ?",opts:["Non, c'est facultatif","Oui, sans contrepartie financière la clause est nulle","Oui, mais uniquement si la durée dépasse 1 an","Non, sauf dans certaines conventions collectives"],a:1},
  {q:"Tu es en CDI depuis 4 mois. Ton employeur veut te licencier. A-t-il des obligations particulières ?",opts:["Non, dans les 6 premiers mois l'employeur peut licencier librement","Oui, il doit respecter la procédure de licenciement même pendant la période d'essai","Oui, la procédure normale de licenciement s'applique dès la fin de la période d'essai","Non, la période d'essai de 4 mois n'est pas encore terminée pour un cadre"],a:2},
  {q:"Tu travailles pour la première fois avec un 13ème mois prévu au contrat. Quand le perçois-tu ?",opts:["Au bout d'un an complet de présence","Proportionnellement à ton temps de présence dès la première année si le contrat le prévoit","Uniquement après validation de ta période d'essai","Au moment fixé par l'employeur sans obligation légale"],a:1},
  {q:"Ton employeur peut-il te demander de faire des heures supplémentaires dès le premier jour ?",opts:["Non, les heures supplémentaires ne sont possibles qu'après 3 mois d'ancienneté","Oui, mais dans la limite du contingent conventionnel et avec les majorations prévues","Oui, sans limitation ni majoration pendant la période d'essai","Non, sauf en cas de force majeure"],a:1},
  {q:"Tu prends un nouveau poste avec une voiture de fonction. Si tu es licencié, que se passe-t-il avec la voiture ?",opts:["Tu la gardes jusqu'à la fin de ton préavis","Elle doit être restituée immédiatement à la notification du licenciement","Tu peux la racheter à sa valeur résiduelle","Elle reste à ta disposition pendant 3 mois après le licenciement"],a:0},
  {q:"Ton contrat prévoit une clause de mobilité. Ton employeur t'impose une mutation à 400km. Est-ce légal ?",opts:["Oui, la clause de mobilité autorise toute mutation en France","Oui, si la clause est suffisamment précise sur le périmètre géographique couvert","Non, une mutation à plus de 50km est toujours abusive","Oui, mais tu peux refuser avec un préavis de 3 mois"],a:1},
  {q:"Tu es nouveau salarié et tu tombes malade dès le deuxième mois. Ton salaire est-il maintenu ?",opts:["Non, aucun maintien de salaire avant 1 an d'ancienneté","Oui, intégralement dès le premier jour d'arrêt","Partiellement selon ton ancienneté et la convention collective applicable","Non, tu perçois uniquement les indemnités journalières de la Sécurité Sociale"],a:2},
  {q:"Ton employeur peut-il t'imposer une clause de non-concurrence après la rupture sans l'avoir mentionnée dans le contrat initial ?",opts:["Oui, si elle est notifiée par lettre recommandée","Non, la clause doit impérativement figurer dans le contrat de travail ou un avenant signé","Oui, dans certaines conventions collectives qui la prévoient automatiquement","Oui, pendant les 3 premiers mois suivant la rupture"],a:1},
  {q:"Tu intègres une entreprise avec un accord d'intéressement. Quand peux-tu en bénéficier ?",opts:["Immédiatement dès ton arrivée","Après 3 mois d'ancienneté dans l'entreprise","Après 1 an d'ancienneté","Selon les conditions fixées par l'accord d'intéressement de l'entreprise"],a:3},
  {q:"Ton contrat mentionne un salaire brut de 3000€. Quel sera approximativement ton salaire net ?",opts:["3000€ — le brut et le net sont identiques","Environ 2340€ après déduction des cotisations salariales (environ 22%)","Environ 1800€ après impôt sur le revenu","Environ 2700€ — les cotisations sont uniquement patronales"],a:1},
  {q:"Tu es en CDI depuis 2 mois. Peux-tu prendre tes congés payés ?",opts:["Non, il faut attendre 1 an pour poser des congés","Oui, tu peux poser les congés acquis avec l'accord de l'employeur","Oui, sans condition ni accord préalable","Non, les congés ne s'acquièrent qu'après la période d'essai validée"],a:1},
  {q:"Ton employeur te remet ton contrat CDI le jour de ton arrivée. Tu réalises qu'une clause t'est défavorable. Que fais-tu ?",opts:["Tu signes — tu ne peux plus négocier une fois arrivé","Tu demandes un délai de réflexion et tu négocies la clause avant de signer","Tu signes en annotant ton désaccord sur la clause","Tu refuses de signer et tu pars — tu n'as aucune obligation"],a:1},
  {q:"Tu intègres une entreprise qui pratique le télétravail. Ton manager t'impose 5 jours de présentiel par semaine contrairement à la pratique habituelle. Que fais-tu ?",opts:["Tu acceptes — il est ton manager et c'est son droit","Tu vérifies si un accord collectif ou ton contrat encadre le télétravail avant de répondre","Tu refuses immédiatement — c'est une discrimination par rapport aux autres","Tu en parles aux RH directement sans en parler à ton manager"],a:1}
];

var BANK_NOUVEAU_POSTE_INTEGRATION=[
  {q:"Tu arrives dans un nouveau poste. Ton manager te donne très peu d'informations les premiers jours. Comment réagis-tu ?",opts:["Tu attends qu'il vienne vers toi — c'est son rôle de t'intégrer","Tu prends l'initiative de lui demander un point structuré sur tes priorités et tes premières missions","Tu commences à travailler sur ce que tu penses être utile sans valider","Tu te plains aux RH que ton onboarding est mal organisé"],a:1},
  {q:"Après 3 semaines, tu réalises que tes nouvelles responsabilités sont bien plus larges que ce qui était annoncé. Comment réagis-tu ?",opts:["Tu acceptes sans rien dire — c'est une opportunité","Tu demandes un entretien pour rediscuter le périmètre et clarifier les attentes","Tu refuses les tâches hors périmètre initial","Tu attends la fin de période d'essai pour en parler"],a:1},
  {q:"Un collègue expérimenté te donne des conseils qui contredisent les directives de ton manager. Que fais-tu ?",opts:["Tu suis les conseils du collègue — il connaît mieux la réalité terrain","Tu suis les directives du manager — c'est lui ton responsable","Tu demandes à ton manager d'arbitrer entre les deux approches","Tu appliques les deux en alternance pour tester"],a:2},
  {q:"Tu identifies une amélioration importante dans un processus existant dès ton premier mois. Comment la présentes-tu ?",opts:["Tu changes directement le processus sans en parler à personne","Tu en parles à tes collègues d'abord pour voir s'ils sont d'accord","Tu proposes l'idée à ton manager en comprenant d'abord pourquoi le processus actuel existe","Tu attends 6 mois — il est trop tôt pour proposer des changements"],a:2},
  {q:"Ton manager te fixe un objectif que tu juges irréaliste pour les 3 premiers mois. Que fais-tu ?",opts:["Tu acceptes sans rien dire pour montrer ton engagement","Tu refuses catégoriquement l'objectif","Tu exprimes tes réserves avec des arguments factuels et proposes un objectif alternatif réaliste","Tu acceptes mais tu travailles à ton rythme en sachant que tu ne l'atteindras pas"],a:2},
  {q:"Tu découvres que ton prédécesseur était très apprécié. Tout le monde le compare à toi. Comment gères-tu ça ?",opts:["Tu essaies d'imiter son style pour plaire à l'équipe","Tu ignores les comparaisons et tu restes toi-même","Tu demandes à rencontrer ton prédécesseur pour apprendre de lui","Tu en parles à ton manager pour que ça cesse"],a:1},
  {q:"Tu es nouveau et ton manager te demande ton avis sur un conflit entre deux collègues. Que fais-tu ?",opts:["Tu donnes ton avis honnêtement — mieux vaut être transparent dès le début","Tu déclines poliment — tu n'as pas assez de recul pour te positionner","Tu choisis le camp de la personne qui t'a le mieux accueilli","Tu prends la position de ton manager pour te mettre dans ses bonnes grâces"],a:1},
  {q:"Après 2 mois, tu réalises que la culture de l'entreprise est très différente de ce que tu attendais. Que fais-tu ?",opts:["Tu démissionnes immédiatement — la culture est non négociable","Tu t'adaptes complètement en abandonnant tes propres valeurs","Tu analyses si les différences sont rédhibitoires ou si tu peux t'y adapter tout en restant toi-même","Tu restes en espérant que la culture va changer"],a:2},
  {q:"Ton manager te confie une présentation importante devant la direction après seulement 6 semaines. Comment réagis-tu ?",opts:["Tu refuses — c'est trop tôt et trop risqué","Tu acceptes avec enthousiasme sans préparer pour paraître naturel","Tu acceptes, tu prépares rigoureusement et tu demandes un feedback de ton manager avant","Tu demandes à un collègue plus expérimenté de la faire à ta place"],a:2},
  {q:"Tu constates que ton équipe fonctionne de façon très différente de ce que tu as connu avant. Comment t'adaptes-tu ?",opts:["Tu imposes ta façon de faire — elle est probablement meilleure","Tu adoptes intégralement la méthode de l'équipe sans questionner","Tu observes, tu comprends la logique derrière et tu t'aligns en apportant tes meilleures pratiques progressivement","Tu fonctionnes chacun de son côté sans chercher à t'aligner"],a:2},
  {q:"Tu réalises que tu as été recruté pour résoudre un problème que personne ne t'a clairement expliqué. Que fais-tu ?",opts:["Tu travailles sur ce que tu penses être le problème","Tu attends que le problème se manifeste clairement avant d'agir","Tu prends le temps de poser des questions aux parties prenantes pour comprendre le vrai enjeu","Tu demandes à ton manager un brief complet avant de commencer quoi que ce soit"],a:2},
  {q:"Ton équipe résiste à tes idées car tu es le nouveau. Comment contournes-tu cette résistance ?",opts:["Tu imposes tes idées en faisant appel à l'autorité de ton manager","Tu abandonnes tes idées pour éviter les conflits","Tu construis d'abord la confiance en livrant bien sur les bases avant de proposer des changements","Tu cherches un allié dans l'équipe pour porter tes idées à ta place"],a:2},
  {q:"Après 4 mois, tu n'as toujours pas eu d'entretien de suivi avec ton manager. Comment réagis-tu ?",opts:["Tu attends — c'est son rôle d'initier ces entretiens","Tu envoies un email de plainte aux RH","Tu prends l'initiative de lui demander un point de suivi et tu prépares une liste de questions","Tu décides que tout va bien puisqu'il ne dit rien"],a:2},
  {q:"Tu prends un poste de manager pour la première fois. Un membre de ton équipe te teste dès le premier jour. Comment réagis-tu ?",opts:["Tu ignores le test — réagir trop vite montre de la faiblesse","Tu poses des limites claires et respectueuses dès le départ sans attendre","Tu cherches à comprendre pourquoi il te teste avant de réagir","Tu en parles aux RH pour qu'ils interviennent"],a:1},
  {q:"Tu découvres que ton poste avait été promis en interne à un collègue qui a finalement été écarté. Il est dans ton équipe. Que fais-tu ?",opts:["Tu ignores la situation — c'est le passé","Tu évites tout contact avec ce collègue","Tu prends l'initiative d'une discussion directe et respectueuse pour établir une relation saine","Tu demandes à ton manager de gérer la situation à ta place"],a:2},
  {q:"Tu es en poste depuis 3 mois et ton manager te dit que tu n'es 'pas encore à la hauteur'. Comment réagis-tu ?",opts:["Tu démissionnes — si ce n'est pas reconnu après 3 mois, ça ne le sera jamais","Tu acceptes la critique sans demander plus de détails","Tu demandes des exemples précis de ce qui manque et un plan d'action clair","Tu contestes la critique auprès des RH"],a:2},
  {q:"Tu prends un poste senior. Tes nouveaux collègues juniors t'observent et attendent de voir comment tu te comportes. Que fais-tu ?",opts:["Tu montres ton autorité dès le départ pour établir la hiérarchie","Tu te comportes de façon cohérente avec tes valeurs — les gens voient vite si tu es authentique","Tu essaies de plaire à tout le monde pour te faire accepter rapidement","Tu ignores ces regards — ton travail parlera de lui-même"],a:1},
  {q:"Tu prends un nouveau poste et tu réalises que ton prédécesseur a laissé des dossiers en désordre. Que fais-tu ?",opts:["Tu signales immédiatement le désordre à ton manager pour te protéger","Tu règles le désordre discrètement sans en parler — ça montrera ton efficacité","Tu établis un état des lieux complet et tu le partages avec ton manager avant d'agir","Tu attends que le désordre crée un problème concret pour intervenir"],a:2},
  {q:"Dès ta première semaine, un collègue te demande ton avis sur ton nouveau manager. Que lui réponds-tu ?",opts:["Tu partages ton impression honnêtement — la transparence crée la confiance","Tu dis que tu le trouves très bien pour faire bonne impression","Tu expliques que tu n'as pas encore assez de recul pour donner un avis","Tu évites de répondre et tu changes de sujet"],a:2},
  {q:"Tu arrives dans un poste où les processus sont très rigides. Tu vois des améliorations évidentes. Comment procèdes-tu ?",opts:["Tu changes les processus immédiatement — l'évidence justifie l'action rapide","Tu comprends d'abord pourquoi ces processus existent avant de proposer quoi que ce soit","Tu en parles à tes collègues pour former une coalition avant d'agir","Tu attends 1 an avant de proposer des changements"],a:1},
  {q:"Ton manager te demande de prendre en charge une partie du travail d'un collègue absent. Ce n'est pas dans tes attributions. Que fais-tu ?",opts:["Tu refuses — ce n'est pas ton travail","Tu acceptes sans condition pour montrer ton esprit d'équipe","Tu acceptes en évaluant l'impact sur tes propres priorités et en en discutant avec ton manager","Tu fais semblant d'accepter mais tu ne fais que l'essentiel"],a:2},
  {q:"Après 2 mois, tu sais que tu vas dépasser tous tes objectifs. Comment communiques-tu là-dessus ?",opts:["Tu attends la fin de la période pour que les résultats parlent d'eux-mêmes","Tu informes proactivement ton manager de l'avancement — ça crée de la confiance","Tu demandes de nouveaux objectifs plus ambitieux immédiatement","Tu n'en parles pas pour ne pas créer d'attentes trop élevées pour la suite"],a:1},
  {q:"Tu intègres une entreprise et tu remarques que certains collègues contournent les règles. Que fais-tu ?",opts:["Tu fais pareil — s'ils le font, c'est que c'est accepté","Tu ignores — ce n'est pas ton rôle de surveiller les autres","Tu te comportes selon les règles officielles et tu en parles à ton manager si ça te semble problématique","Tu dénonces immédiatement les comportements aux RH"],a:2},
  {q:"Ton manager te propose de te confier le management d'une petite équipe après seulement 4 mois. Tu n'as jamais managé. Que fais-tu ?",opts:["Tu refuses — 4 mois c'est trop tôt pour manager","Tu acceptes sans condition pour montrer ton ambition","Tu acceptes en demandant un accompagnement ou une formation management","Tu acceptes en faisant semblant que ça ne t'inquiète pas du tout"],a:2},
  {q:"Tu arrives dans un poste avec une forte pression pour livrer vite. Ton instinct te dit que la qualité va en souffrir. Que fais-tu ?",opts:["Tu livres vite — la pression de la hiérarchie prime sur la qualité","Tu ralentis sans prévenir pour maintenir la qualité","Tu soulèves le sujet avec ton manager en proposant un compromis clair entre délai et qualité","Tu livres vite et tu signales les problèmes de qualité après coup"],a:2}
];
var QCM_CONFIGS={
  'qcm-entretien':{id:'qcm1',name:'Entretien d\'embauche',color:'#1e40af',color2:'#059669',bgLight:'#eff6ff',barId:'qcm1-bar',stepId:'qcm1-step',pctId:'qcm1-pct',zoneId:'qcm1-zone',resultDivId:'qcm1-result-content',screenId:'qcm-entretien',resultScreenId:'qcm-entretien-result',bank:BANK_ENTRETIEN},
  'qcm-strategie':{id:'qcm2',name:'Stratégie emploi',color:'#059669',color2:'#047857',bgLight:'#f0fdf4',barId:'qcm2-bar',stepId:'qcm2-step',pctId:'qcm2-pct',zoneId:'qcm2-zone',resultDivId:'qcm2-result-content',screenId:'qcm-strategie',resultScreenId:'qcm-strategie-result',bank:BANK_STRATEGIE},
  'qcm-leadership':{id:'qcm3',name:'Leadership & Management',color:'#7c3aed',color2:'#6d28d9',bgLight:'#f5f3ff',barId:'qcm3-bar',stepId:'qcm3-step',pctId:'qcm3-pct',zoneId:'qcm3-zone',resultDivId:'qcm3-result-content',screenId:'qcm-leadership',resultScreenId:'qcm-leadership-result',bank:BANK_LEADERSHIP},
  'qcm-stress':{id:'qcm4',name:'Gestion du stress',color:'#b45309',color2:'#92400e',bgLight:'#fffbeb',barId:'qcm4-bar',stepId:'qcm4-step',pctId:'qcm4-pct',zoneId:'qcm4-zone',resultDivId:'qcm4-result-content',screenId:'qcm-stress',resultScreenId:'qcm-stress-result',bank:BANK_STRESS},
  'qcm-digital':{id:'qcm5',name:'Compétences digitales',color:'#0891b2',color2:'#0e7490',bgLight:'#ecfeff',barId:'qcm5-bar',stepId:'qcm5-step',pctId:'qcm5-pct',zoneId:'qcm5-zone',resultDivId:'qcm5-result-content',screenId:'qcm-digital',resultScreenId:'qcm-digital-result',bank:BANK_DIGITAL},
  'qcm-orientation':{id:'qcm6',name:'Orientation métier',color:'#dc2626',color2:'#b91c1c',bgLight:'#fef2f2',barId:'qcm6-bar',stepId:'qcm6-step',pctId:'qcm6-pct',zoneId:'qcm6-zone',resultDivId:'qcm6-result-content',screenId:'qcm-orientation',resultScreenId:'qcm-orientation-result',bank:BANK_ORIENTATION},
  'qcm-are':{id:'qcm7',name:'ARE & Indemnisation chômage',color:'#002395',color2:'#1e3a8a',bgLight:'#eff6ff',barId:'qcm7-bar',stepId:'qcm7-step',pctId:'qcm7-pct',zoneId:'qcm7-zone',resultDivId:'qcm7-result-content',screenId:'qcm-are',resultScreenId:'qcm-are-result',bank:BANK_ARE},
  'qcm-demandeur-entretien':{id:'qcm8',name:"Entretien d'embauche",color:'#0891b2',color2:'#0e7490',bgLight:'#ecfeff',barId:'qcm8-bar',stepId:'qcm8-step',pctId:'qcm8-pct',zoneId:'qcm8-zone',resultDivId:'qcm8-result-content',screenId:'qcm-demandeur-entretien',resultScreenId:'qcm-demandeur-entretien-result',bank:BANK_DEMANDEUR_ENTRETIEN},
  'qcm-cpf':{id:'qcm9',name:'CPF & Bilan de compétences',color:'#7c3aed',color2:'#6d28d9',bgLight:'#f5f3ff',barId:'qcm9-bar',stepId:'qcm9-step',pctId:'qcm9-pct',zoneId:'qcm9-zone',resultDivId:'qcm9-result-content',screenId:'qcm-cpf',resultScreenId:'qcm-cpf-result',bank:BANK_CPF},
  'qcm-reconversion':{id:'qcm10',name:'Reconversion & Transition',color:'#059669',color2:'#047857',bgLight:'#f0fdf4',barId:'qcm10-bar',stepId:'qcm10-step',pctId:'qcm10-pct',zoneId:'qcm10-zone',resultDivId:'qcm10-result-content',screenId:'qcm-reconversion',resultScreenId:'qcm-reconversion-result',bank:BANK_RECONVERSION_TRANSITION},
  'qcm-freelance-statut':{id:'qcm11',name:'Statut & Protection sociale',color:'#f59e0b',color2:'#d97706',bgLight:'#fffbeb',barId:'qcm11-bar',stepId:'qcm11-step',pctId:'qcm11-pct',zoneId:'qcm11-zone',resultDivId:'qcm11-result-content',screenId:'qcm-freelance-statut',resultScreenId:'qcm-freelance-statut-result',bank:BANK_FREELANCE_STATUT},
  'qcm-freelance-missions':{id:'qcm12',name:'Missions & Négociation',color:'#ea580c',color2:'#c2410c',bgLight:'#fff7ed',barId:'qcm12-bar',stepId:'qcm12-step',pctId:'qcm12-pct',zoneId:'qcm12-zone',resultDivId:'qcm12-result-content',screenId:'qcm-freelance-missions',resultScreenId:'qcm-freelance-missions-result',bank:BANK_FREELANCE_MISSIONS},
  'qcm-etudiant-alternance':{id:'qcm13',name:'Alternance & Stage',color:'#0ea5e9',color2:'#0284c7',bgLight:'#f0f9ff',barId:'qcm13-bar',stepId:'qcm13-step',pctId:'qcm13-pct',zoneId:'qcm13-zone',resultDivId:'qcm13-result-content',screenId:'qcm-etudiant-alternance',resultScreenId:'qcm-etudiant-alternance-result',bank:BANK_ETUDIANT_ALTERNANCE},
  'qcm-etudiant-emploi':{id:'qcm14',name:'Premier emploi & Orientation',color:'#8b5cf6',color2:'#7c3aed',bgLight:'#faf5ff',barId:'qcm14-bar',stepId:'qcm14-step',pctId:'qcm14-pct',zoneId:'qcm14-zone',resultDivId:'qcm14-result-content',screenId:'qcm-etudiant-emploi',resultScreenId:'qcm-etudiant-emploi-result',bank:BANK_ETUDIANT_PREMIER_EMPLOI},
  'qcm-poste-droits':{id:'qcm15',name:'Droits nouveau salarié',color:'#0f766e',color2:'#0d9488',bgLight:'#f0fdfa',barId:'qcm15-bar',stepId:'qcm15-step',pctId:'qcm15-pct',zoneId:'qcm15-zone',resultDivId:'qcm15-result-content',screenId:'qcm-poste-droits',resultScreenId:'qcm-poste-droits-result',bank:BANK_NOUVEAU_POSTE_DROITS},
  'qcm-poste-integration':{id:'qcm16',name:'Prise de poste & Intégration',color:'#dc2626',color2:'#b91c1c',bgLight:'#fef2f2',barId:'qcm16-bar',stepId:'qcm16-step',pctId:'qcm16-pct',zoneId:'qcm16-zone',resultDivId:'qcm16-result-content',screenId:'qcm-poste-integration',resultScreenId:'qcm-poste-integration-result',bank:BANK_NOUVEAU_POSTE_INTEGRATION}
};

// ── Override go() pour les QCM — déclenche quizIntro avant chaque quiz ──
var _goOrig=go;
go=function(page){
  if(QCM_CONFIGS[page]){
    _goOrig(page);
    // Toujours afficher l'intro prénom + chrono avant de démarrer
    quizIntro(function(){
      qcmEngine(QCM_CONFIGS[page]);
    });
    return;
  }
  _goOrig(page);
};
