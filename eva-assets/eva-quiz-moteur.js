
/* ═══════════════════════════════════════════════════════
   NOVA ENGINE — chatbot conversationnel
   QCM + Simulation entretien
   Données héritées : EL_DATA (qcm) + MS_DATA (simulation)
═══════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── helpers DOM ── */
function $(id){ return document.getElementById(id); }

function novaAv(){
  return '<div class="nova-bubble-av"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>';
}

function scrollFeed(feedEl){
  if(feedEl) setTimeout(function(){ feedEl.scrollTop = feedEl.scrollHeight; }, 60);
}

function addTyping(feedEl){
  var el = document.createElement('div');
  el.className = 'nova-typing'; el.id = 'nova-typing-tmp';
  el.innerHTML = novaAv() + '<div class="nova-typing-dots"><div class="nova-typing-dot"></div><div class="nova-typing-dot"></div><div class="nova-typing-dot"></div></div>';
  feedEl.appendChild(el);
  scrollFeed(feedEl);
  return el;
}

function removeTyping(){
  var t = $('nova-typing-tmp'); if(t) t.remove();
}

function addNovaBubble(feedEl, sender, text, delay){
  return new Promise(function(res){
    var typing = addTyping(feedEl);
    setTimeout(function(){
      removeTyping();
      var wrap = document.createElement('div'); wrap.className = 'nova-bubble';
      wrap.innerHTML = novaAv()
        + '<div class="nova-bubble-body">'
        + (sender ? '<div class="nova-bubble-sender">'+sender+'</div>' : '')
        + '<div class="nova-bubble-text">'+text+'</div>'
        + '</div>';
      feedEl.appendChild(wrap);
      scrollFeed(feedEl);
      res();
    }, delay || 700);
  });
}

function addUserBubble(feedEl, text){
  var wrap = document.createElement('div'); wrap.className = 'nova-user-bubble';
  wrap.innerHTML = '<div class="nova-user-body"><div class="nova-user-text">'+text+'</div></div>';
  feedEl.appendChild(wrap);
  scrollFeed(feedEl);
}

function addFeedbackBubble(feedEl, isOk, expl, delay){
  return new Promise(function(res){
    var typing = addTyping(feedEl);
    setTimeout(function(){
      removeTyping();
      var wrap = document.createElement('div'); wrap.className = 'nova-feedback-bubble';
      var cls = isOk ? 'ok' : 'ko';
      var icon = isOk ? '✅' : '💡';
      var head = isOk ? 'Bonne réponse !' : 'Pas tout à fait...';
      wrap.innerHTML = novaAv()
        + '<div class="nova-feedback-body '+cls+'">'
        + '<div class="nova-feedback-icon">'+icon+'</div>'
        + '<div class="nova-feedback-head '+cls+'">'+head+'</div>'
        + '<div class="nova-feedback-txt">'+expl+'</div>'
        + '</div>';
      feedEl.appendChild(wrap);
      scrollFeed(feedEl);
      res();
    }, delay || 600);
  });
}

/* ─────────────────────────────────────────────
   QCM ENGINE
───────────────────────────────────────────── */
var NQ_STATE = {};

var NQ_CFG = {
  salarie:  {key:'sal', name:'Mise en situation', sub:'QCM · Droits Salarié',   result:'entretien-salarie-result',   retry:'entretien-salarie'},
  demandeur:{key:'dem', name:'Mise en situation', sub:'QCM · Demandeur',         result:'entretien-demandeur-result', retry:'entretien-demandeur'},
  reconversion:{key:'rec', name:'Mise en situation', sub:'QCM · Reconversion',   result:'entretien-reconversion-result',retry:'entretien-reconversion'},
  freelance:{key:'frl', name:'Mise en situation', sub:'QCM · Freelance',         result:'entretien-freelance-result', retry:'entretien-freelance'}
};

function nqShuffle(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

var NQ_INTROS = [
  'Nouvelle session, nouvelles questions. Mise en situation renouvelle entièrement son tirage à chaque fois — jamais les mêmes, jamais dans le même ordre. C\'est parti.',
  'Les questions de cette session ne sont pas celles d\'avant. Mise en situation tire chaque fois un ensemble différent — parce que chaque session révèle quelque chose de nouveau sur toi.',
  'Chaque session avec Mise en situation est unique. Les questions changent, les formulations changent, les combinaisons ne se répètent pas. Une seule bonne réponse à chaque fois.',
  'Mise en situation renouvelle ses questions à chaque session. Pas les mêmes qu\'hier. Pas les mêmes que demain. Lis attentivement — la façon dont tu réponds dit quelque chose sur toi.',
  'Session unique. Mise en situation pioche différemment à chaque fois — les questions et leur ordre changent toujours. Montre ce que tu sais.'
];

function nqShuffleOpts(q){
  var idx = q.opts.map(function(_,i){return i;});
  for(var i=idx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=idx[i];idx[i]=idx[j];idx[j]=t;}
  var newOpts = idx.map(function(i){return q.opts[i];});
  var newAns = idx.indexOf(q.ans);
  return {q:q.q, opts:newOpts, ans:newAns, expl:q.expl};
}

window.nqStart = function(profil){
  var cfg = NQ_CFG[profil];
  var shuffled = nqShuffle(EL_DATA[profil]).slice(0, (window._cpNb===15?15:25)).map(nqShuffleOpts);
  NQ_STATE[profil] = { questions: shuffled, idx:0, score:0, answered:false };
  var feed = $('nq-'+cfg.key+'-feed');
  var choices = $('nq-'+cfg.key+'-choices');
  if(feed) feed.innerHTML = '';
  if(choices) choices.innerHTML = '';
  nqUpdateProg(profil);
  // Message d'accueil Mise en situation — varié à chaque session
  var intro = NQ_INTROS[Math.floor(Math.random()*NQ_INTROS.length)];
  setTimeout(function(){
    addNovaBubble(feed, 'Mise en situation', intro, 400).then(function(){
      nqRender(profil);
    });
  }, 200);
};

function nqUpdateProg(profil){
  var cfg = NQ_CFG[profil];
  var s = NQ_STATE[profil];
  if(!s) return;
  var total = s.questions.length;
  var idx = s.idx;
  var pct = Math.round((idx/total)*100);
  var bar = $('nq-'+cfg.key+'-bar'); if(bar) bar.style.width=pct+'%';
  var step = $('nq-'+cfg.key+'-step'); if(step) step.textContent='Question '+(idx+1)+' / '+total;
  var pctEl = $('nq-'+cfg.key+'-pct'); if(pctEl) pctEl.textContent=pct+'%';
}

function nqRender(profil){
  var cfg = NQ_CFG[profil];
  var s = NQ_STATE[profil];
  var q = s.questions[s.idx];
  var feed = $('nq-'+cfg.key+'-feed');
  var choices = $('nq-'+cfg.key+'-choices');
  s.answered = false;

  addNovaBubble(feed, null, '❓ '+q.q, 500).then(function(){
    // Afficher les choix
    var letters = ['A','B','C','D'];
    choices.innerHTML = '';
    q.opts.forEach(function(opt, i){
      var btn = document.createElement('div');
      btn.className = 'nova-choice';
      btn.id = 'nq-opt-'+cfg.key+'-'+i;
      btn.innerHTML = '<div class="nova-choice-letter">'+letters[i]+'</div><span>'+opt+'</span>';
      btn.onclick = function(){ if(!s.answered) nqAnswer(profil, i); };
      choices.appendChild(btn);
    });
  });
}

window.nqAnswer = function(profil, chosen){
  var cfg = NQ_CFG[profil];
  var s = NQ_STATE[profil];
  if(s.answered) return;
  s.answered = true;
  var q = s.questions[s.idx];
  var isOk = (chosen === q.ans);
  if(isOk) s.score++;

  // Désactiver choix + marquer
  var letters = ['A','B','C','D'];
  q.opts.forEach(function(_, i){
    var el = $('nq-opt-'+cfg.key+'-'+i);
    if(!el) return;
    el.classList.add('disabled');
    if(i === q.ans) el.style.borderColor='#22c55e', el.style.background='rgba(34,197,94,.1)', el.style.color='#86efac';
    else if(i === chosen && !isOk) el.style.borderColor='#f43f5e', el.style.background='rgba(244,63,94,.1)', el.style.color='#fca5a5';
  });

  // Bulle user
  var feed = $('nq-'+cfg.key+'-feed');
  addUserBubble(feed, letters[chosen]+' · '+q.opts[chosen]);

  // Feedback Mise en situation
  var expl = q.expl;
  addFeedbackBubble(feed, isOk, expl, 700).then(function(){
    // Bouton suivant
    var choices = $('nq-'+cfg.key+'-choices');
    choices.innerHTML = '';
    var nxt = document.createElement('button');
    nxt.className = 'nova-next show';
    var total = s.questions.length;
    nxt.textContent = s.idx < total-1 ? 'Question suivante →' : 'Voir mes résultats →';
    nxt.onclick = function(){ nqNext(profil); };
    choices.appendChild(nxt);
  });
};

function nqNext(profil){
  var cfg = NQ_CFG[profil];
  var s = NQ_STATE[profil];
  s.idx++;
  if(s.idx >= s.questions.length){
    nqShowResult(profil);
  } else {
    nqUpdateProg(profil);
    nqRender(profil);
  }
}

function nqShowResult(profil){
  var cfg = NQ_CFG[profil];
  var s = NQ_STATE[profil];
  var total = s.questions.length;
  var score = s.score;
  var pct = Math.round((score/total)*100);
  var bar = $('nq-'+cfg.key+'-bar'); if(bar) bar.style.width='100%';
  var step = $('nq-'+cfg.key+'-step'); if(step) step.textContent='Terminé !';
  var pctEl = $('nq-'+cfg.key+'-pct'); if(pctEl) pctEl.textContent='100%';

  var level, levelColor;
  if(pct>=80){level='Expert — Tu maîtrises tes droits 🏆';levelColor='#22c55e';}
  else if(pct>=60){level='Confirmé(e) — Quelques points à consolider 👍';levelColor='#f59e0b';}
  else if(pct>=40){level='En progression — Continue avec Mise en situation 💪';levelColor='#f59e0b';}
  else{level='Débutant(e) — On va construire ça ensemble 🎯';levelColor='#f43f5e';}

  // Lecture de personnalité — varie à chaque tirage
  var NQ_READINGS = {
    salarie:[
      {min:80,texts:['Voici ce que ce tirage dit de toi : tu as une approche structurée et anticipatrice. Tu ne subis pas les situations — tu les prépares. Ce pattern révèle quelqu\'un qui navigue dans les codes du monde professionnel avec lucidité.','Ce que tes réponses révèlent : tu penses en stratège avant de parler en exécutant. Tu connais tes droits non pas pour les invoquer, mais pour savoir où tu te situes. C\'est une posture rare.']},
      {min:60,texts:['Ce tirage te révèle quelque chose : tu as les fondamentaux, mais certaines zones restent floues — et c\'est précisément là que se jouent les négociations décisives. L\'instinct est là. La précision est le prochain niveau.','Tes réponses montrent un profil hybride : solide sur les principes, moins armé sur les subtilités légales. Ça dit que tu fonctionnes souvent à l\'intuition — parfois juste, parfois insuffisant.']},
      {min:40,texts:['Ce que ce tirage révèle : tu es dans une phase d\'apprentissage actif. Tu n\'es pas perdu — tu explores. Et chaque session te donnera une carte de plus sur ce terrain que tu apprends à lire.','Tes patterns de réponse indiquent que tu t\'appuies encore sur des certitudes non vérifiées. La vraie force viendra quand tu sauras distinguer ce que tu sais de ce que tu crois savoir.']},
      {min:0,texts:['Ce tirage révèle un point de départ honnête. Tu n\'as pas encore les outils — mais tu as décidé d\'aller chercher. C\'est déjà plus que la plupart. Mise en situation est là pour construire ça avec toi.','Tes réponses disent quelque chose d\'important : tu explores un territoire nouveau. Chaque question ratée est une information précieuse. Le score d\'aujourd\'hui n\'est pas un jugement — c\'est une boussole.']}
    ],
    demandeur:[
      {min:80,texts:['Ce que ce tirage révèle : tu ne te laisses pas submerger par ta situation — tu la comprends et tu l\'utilises. C\'est le profil de quelqu\'un qui va rebondir, pas rester.','Tes réponses montrent une maîtrise rare pour un demandeur d\'emploi. Tu connais tes droits, tes obligations, tes leviers. Ce savoir est ton premier outil de retour à l\'emploi.']},
      {min:60,texts:['Ce tirage révèle un profil en transition consciente. Tu as saisi l\'essentiel — mais les angles morts identifiés sont précisément ceux que les recruteurs et administrations exploitent. C\'est là que ça se joue.','Tes réponses indiquent que tu navigues correctement, mais pas toujours avec assurance. Ce manque de certitude sur certains droits peut te coûter — dans les entretiens comme face à France Travail.']},
      {min:0,texts:['Ce tirage dit quelque chose de fort : tu vis une situation complexe avec des règles que tu n\'as pas encore appris à lire. Ce n\'est pas une faiblesse — c\'est une lacune comblable. Mise en situation est là pour ça.','Tes réponses révèlent une exposition réelle à des erreurs coûteuses sur tes droits. Pas par manque d\'intelligence — par manque d\'information. C\'est exactement ce que ce QCM est fait pour corriger.']}
    ],
    reconversion:[
      {min:80,texts:['Ce tirage révèle quelqu\'un qui prépare sa reconversion avec méthode, pas avec espoir. Tu connais les dispositifs, les pièges, les chemins. Tu n\'improvises pas — tu pilotes.','Tes réponses montrent un profil de reconvertisseur stratégique. Tu sais que changer de voie ça se prépare comme un projet — avec des ressources, des jalons, des plans B. Ça change tout.']},
      {min:60,texts:['Ce tirage révèle que tu as saisi l\'architecture globale de ta reconversion — mais certaines briques manquent. En reconversion, les détails font souvent la différence entre un projet qui aboutit et un qui s\'étiole.','Tes réponses montrent quelqu\'un à mi-chemin entre la motivation et la stratégie. La première est là. La seconde se construit. Mise en situation peut t\'aider à faire le pont.']},
      {min:0,texts:['Ce que ce tirage révèle : tu es au début d\'un chemin qui mérite une meilleure carte. Recommencer le QCM est déjà un acte de ta reconversion — tu cherches à comprendre avant d\'agir. Continue.','Tes réponses indiquent un terrain encore peu cartographié. Mais chaque bonne question que tu te poses aujourd\'hui t\'évite une erreur coûteuse demain.']}
    ],
    freelance:[
      {min:80,texts:['Ce tirage révèle un freelance qui pense comme un entrepreneur, pas comme un prestataire. Tu maîtrises les outils juridiques, commerciaux et stratégiques qui font la différence entre survivre et performer en indépendant.','Tes réponses montrent quelqu\'un qui a déjà intégré la logique de valeur versus la logique de temps. C\'est la distinction fondamentale des freelances qui prospèrent vraiment.']},
      {min:60,texts:['Ce tirage révèle un profil freelance solide avec des zones d\'ombre. Et en indépendant, les zones d\'ombre coûtent — des clients mal cadrés, des contrats mal négociés, des protections manquantes.','Tes réponses montrent que tu gères correctement l\'opérationnel mais que le volet légal et stratégique mérite attention. C\'est là que les freelances expérimentés prennent leur avantage.']},
      {min:0,texts:['Ce tirage révèle quelqu\'un encore dans la phase d\'exploration du statut freelance. Tu as l\'envie — mais l\'environnement légal et commercial est encore flou. Mise en situation peut t\'aider à le cartographier avant que ça te coûte.','Tes réponses indiquent des expositions réelles en tant qu\'indépendant. Les lacunes identifiées aujourd\'hui sont des protections à mettre en place demain.']}
    ]
  };

  var readings = NQ_READINGS[profil];
  var readingTxt = '';
  for(var i=0;i<readings.length;i++){
    if(pct>=readings[i].min){
      var txts=readings[i].texts;
      readingTxt=txts[Math.floor(Math.random()*txts.length)];
      break;
    }
  }

  // Conseils concrets selon profil + niveau
  var NQ_TIPS = {
    salarie:{
      hi:['Creuse la négociation salariale — tu maîtrises les droits, utilise-les. Prépare une fourchette ancrée sur Glassdoor ou APEC avant ton prochain entretien.','Travaille tes réponses comportementales en méthode STAR (Situation, Tâche, Action, Résultat). C\'est la lacune la plus courante des candidats techniquement forts.'],
      mid:['Revois les délais légaux clés : préavis, période d\'essai, entretien préalable. Ce sont les questions qui piègent le plus souvent.','Prépare une réponse précise sur tes prétentions salariales. Ancre-toi sur le marché (Glassdoor, APEC), pas sur ton salaire actuel.'],
      lo:['Commence par les fondamentaux : types de contrats (CDI/CDD), période d\'essai, clause de non-concurrence. Relance le QCM après.','La méthode STAR est ton outil principal en entretien. Prépare 3 exemples concrets et chiffrés de tes réussites passées.']
    },
    demandeur:{
      hi:['Active ton réseau LinkedIn maintenant — 60% des postes ne sont pas publiés. Connecte-toi avec 5 personnes de ton secteur cible cette semaine.','Prépare un pitch de 2 minutes qui positionne ta période de recherche comme un choix stratégique, pas une contrainte subie.'],
      mid:['Vérifie ta date de fin de droits ARE et anticipe tes démarches. France Travail peut t\'aider à construire un dossier CPF pour te former.','Pratique tes réponses à voix haute — la mécanique des formulations s\'automatise uniquement avec la répétition orale.'],
      lo:['Ouvre ton espace Mon Compte Formation — ton CPF est peut-être déjà alimenté. Une formation courte peut changer ton profil rapidement.','Inscris-toi sur France Travail si ce n\'est pas encore fait et fais ton bilan de droits ARE. C\'est la première étape.']
    },
    reconversion:{
      hi:['Contacte 5 professionnels du secteur visé sur LinkedIn — demande un échange de 20 minutes. C\'est ton outil de validation le plus efficace.','Monte ton dossier de financement : CPF + AIF France Travail + Transition Pro si tu es encore salarié. Combine les sources pour couvrir le coût.'],
      mid:['Définis ton projet en une phrase claire : "Je veux devenir [métier] pour [raison] via [formation] avant [date]". Si tu ne peux pas, le projet n\'est pas assez précis.','Vérifie le marché réel de l\'emploi dans ton secteur cible sur France Travail et LinkedIn. Les débouchés doivent être concrets avant de t\'engager.'],
      lo:['Commence par un bilan de compétences (finançable via CPF) avant de choisir une formation. Cette étape est souvent sautée — à tort.','Rejoins des groupes de reconvertis sur LinkedIn dans ton secteur cible. Les témoignages terrain valent plus que les brochures de formation.']
    },
    freelance:{
      hi:['Monte ton TJM — si tu maîtrises les fondamentaux légaux et commerciaux, tu es au-dessus de la moyenne. Benchmark sur Malt et Crème de la Crème.','Crée du contenu LinkedIn sur ton expertise. Les freelances qui publient régulièrement génèrent 3 à 5x plus d\'inbound que les autres.'],
      mid:['Rédige tes CGV si ce n\'est pas encore fait — c\'est légalement obligatoire et ça te protège concrètement. Des templates gratuits existent en ligne.','Instaure un protocole de scope management : email de recap après chaque appel client, avenant systématique pour tout hors-périmètre.'],
      lo:['Choisis ton statut selon ton CA estimé : micro-entrepreneur sous 40k€/an, SASU au-delà. Consulte un expert-comptable avant de démarrer.','Ouvre un compte Malt et remplis ton profil à 100% — c\'est ta vitrine principale. Une photo professionnelle et 3 case studies minimum.']
    }
  };

  // Ressources par profil
  var NQ_RESOURCES = {
    salarie:[
      {label:'Service-Public.fr — Droits salariés',url:'https://www.service-public.fr/particuliers/vosdroits/N19806'},
      {label:'APEC — Salaires et marché cadres',url:'https://www.apec.fr/tous-nos-articles/detail/les-salaires-cadres.html'},
      {label:'Legifrance — Code du travail',url:'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/'},
      {label:'Glassdoor — Salaires et avis entreprises',url:'https://www.glassdoor.fr/'}
    ],
    demandeur:[
      {label:'France Travail — Calculer mes droits ARE',url:'https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-services/mes-droits-a-lassurance-chomage.html'},
      {label:'Mon Compte Formation (CPF)',url:'https://www.moncompteformation.gouv.fr/'},
      {label:'LinkedIn — Réseau + offres d\'emploi',url:'https://www.linkedin.com/'},
      {label:'HelloWork — Offres d\'emploi France',url:'https://www.hellowork.com/'},
      {label:'Indeed — Alertes emploi par secteur',url:'https://fr.indeed.com/'}
    ],
    reconversion:[
      {label:'Mon Compte Formation (CPF)',url:'https://www.moncompteformation.gouv.fr/'},
      {label:'Transition Pro — CPF de transition salarié',url:'https://www.transitionspro.fr/'},
      {label:'France Travail — Bilan de compétences',url:'https://www.francetravail.fr/candidat/en-formation/mes-dispositifs-de-formation/le-bilan-de-competences.html'},
      {label:'France Compétences — Certifications RNCP',url:'https://www.francecompetences.fr/recherche_rgcp/'},
      {label:'60000 Rebonds — Réseau de mentors',url:'https://www.60000rebonds.com/'}
    ],
    freelance:[
      {label:'Malt — Plateforme freelance n°1 France',url:'https://www.malt.fr/'},
      {label:'URSSAF — Espace Auto-entrepreneur',url:'https://www.autoentrepreneur.urssaf.fr/'},
      {label:'Indy — Comptabilité indépendants',url:'https://www.indy.fr/'},
      {label:'Freelance-info — Communauté et ressources',url:'https://www.freelance-info.fr/'},
      {label:'LinkedIn — Personal branding & réseau',url:'https://www.linkedin.com/'}
    ]
  };

  // Sélectionner les bons conseils
  var tipKey = pct>=80 ? 'hi' : pct>=40 ? 'mid' : 'lo';
  var tips = NQ_TIPS[profil][tipKey];
  var tip1 = tips[0], tip2 = tips[1];

  // Ressources du profil
  var resources = NQ_RESOURCES[profil];
  var resHtml = '';
  for(var r=0;r<resources.length;r++){
    resHtml += '<a href="'+resources[r].url+'" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:rgba(255,255,255,.04);border-radius:8px;text-decoration:none;color:#e2e8f0;font-size:.78rem;margin-bottom:6px;border:1px solid rgba(255,255,255,.06);transition:background .2s;" onmouseover="this.style.background=\'rgba(255,255,255,.08)\'" onmouseout="this.style.background=\'rgba(255,255,255,.04)\'">'
      + '<span style="font-size:.9rem;">🔗</span><span>'+resources[r].label+'</span>'
      + '</a>';
  }

  var html = '<div class="nova-result-podium"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>'
    + '<div class="nova-result-tag">Score final</div>'
    + '<div class="nova-result-score">'+score+'<span>/'+total+'</span></div>'
    + '<div class="nova-result-level" style="color:'+levelColor+';">'+level+'</div>'
    + '<div style="background:rgba(255,255,255,.04);border-left:3px solid '+levelColor+';padding:14px 16px;margin:16px 0;border-radius:0 8px 8px 0;font-size:.82rem;color:#cbd5e1;line-height:1.6;font-style:italic;">'+readingTxt+'</div>'
    + '<div style="margin:20px 0;">'
    +   '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;color:#64748b;text-transform:uppercase;margin-bottom:10px;">Ce que Mise en situation te conseille</div>'
    +   '<div style="display:flex;gap:6px;margin-bottom:8px;"><span style="font-size:.9rem;flex-shrink:0;margin-top:1px;">→</span><span style="font-size:.82rem;color:#e2e8f0;line-height:1.5;">'+tip1+'</span></div>'
    +   '<div style="display:flex;gap:6px;"><span style="font-size:.9rem;flex-shrink:0;margin-top:1px;">→</span><span style="font-size:.82rem;color:#e2e8f0;line-height:1.5;">'+tip2+'</span></div>'
    + '</div>'
    + '<div style="margin:20px 0;">'
    +   '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;color:#64748b;text-transform:uppercase;margin-bottom:10px;">Ressources utiles</div>'
    +   resHtml
    + '</div>'
    + '<button class="nova-result-retry" onclick="nqStart(\''+profil+'\');go(\''+cfg.retry+'\')" style="width:100%;margin-bottom:10px;">↺ Nouvelle session</button>'
    + '<button class="nova-result-back" onclick="go(\'eva-entretien\')">← Retour aux profils</button>';

  go(cfg.result);
  setTimeout(function(){
    var wrap = $('nq-'+cfg.key+'-result');
    if(wrap) wrap.innerHTML = html;
  }, 100);
}


/* ─────────────────────────────────────────────
   SIMULATION ENGINE
───────────────────────────────────────────── */
var NS_STATE = {};

var NS_CFG = {
  salarie:     {key:'sal', result:'mise-situation-salarie-result',     retry:'mise-situation-salarie'},
  demandeur:   {key:'dem', result:'mise-situation-demandeur-result',   retry:'mise-situation-demandeur'},
  reconversion:{key:'rec', result:'mise-situation-reconversion-result',retry:'mise-situation-reconversion'},
  freelance:   {key:'frl', result:'mise-situation-freelance-result',   retry:'mise-situation-freelance'}
};

var NS_INTROS = {
  salarie:[
    'Tu vas être confronté(e) à des situations réelles d\'entretien d\'embauche. Réponds comme si tu y étais vraiment — chaque réponse révèle quelque chose sur ta posture.',
    'Cet exercice simule un entretien sous pression. Pas de bonne réponse universelle — on regarde comment tu réagis concrètement, situation par situation.',
    'Mets-toi en condition réelle d\'entretien. Je vais te soumettre plusieurs situations — à toi de choisir la réponse la plus stratégique à chaque fois.',
    'Plusieurs recruteurs fictifs, une seule règle : répondre comme si c\'était vrai. Allons-y.'
  ],
  demandeur:[
    'Mets-toi en condition réelle d\'entretien pour un retour à l\'emploi. Chaque situation est tirée de cas concrets — réponds comme si tu y étais.',
    'Cet exercice simule un entretien direct, sans détour. Tu as peu de temps pour convaincre — à toi de choisir la bonne approche à chaque situation.',
    'On va te mettre face à des situations franches, parfois inconfortables. Réponds honnêtement et stratégiquement.',
    'Recrutement rapide, décisions rapides. Je te soumets des situations réelles — tes réponses vont tout dire.'
  ],
  reconversion:[
    'Cet exercice simule un bilan de reconversion exigeant. Le but n\'est pas de te valider par défaut, mais de tester la solidité de ton projet.',
    'Plusieurs situations vont te bousculer — c\'est volontaire. La lucidité fait souvent la différence entre une reconversion qui aboutit et une qui s\'étiole.',
    'Cet espace teste ton réalisme, pas seulement ta motivation. Réponds avec honnêteté à chaque situation.',
    'On va tester la solidité de ton projet de reconversion à travers plusieurs situations concrètes. Sois honnête avec toi-même.'
  ],
  freelance:[
    'Cet exercice simule un échange direct avec un client potentiel. Pas de pitch générique — montre ce que tu as vraiment fait.',
    'Peu de temps, des questions concrètes : on va tester comment tu te positionnes en tant que freelance face à des situations réelles.',
    'Plusieurs situations vont tester ta crédibilité freelance. Réponds avec des faits, pas des intentions.',
    'On a besoin de savoir si tu livres vraiment. Je te soumets des situations concrètes — tes réponses feront la différence.'
  ]
};


var NS_ACCENTCOLORS = {
  salarie:'#1e40af', demandeur:'#059669', reconversion:'#7c3aed', freelance:'#d97706'
};

function nsShuffleOpts(s){
  var idx = s.opts.map(function(_,i){return i;});
  for(var i=idx.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=idx[i];idx[i]=idx[j];idx[j]=t;}
  var newOpts = idx.map(function(i){return s.opts[i];});
  var newWhy = idx.map(function(i){return s.why[i];});
  var newBest = idx.indexOf(s.best);
  return {context:s.context, persona:s.persona, opts:newOpts, why:newWhy, best:newBest, skills:s.skills};
}

window.nsStart = function(profil){
  var cfg = NS_CFG[profil];
  // Shuffle et tirage de 25 situations sur le pool disponible
  var allSituations = MS_DATA[profil].slice();
  for(var i=allSituations.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=allSituations[i];allSituations[i]=allSituations[j];allSituations[j]=t;}
  var selected = allSituations.slice(0, (window._cpNb===15?15:25)).map(nsShuffleOpts);
  NS_STATE[profil] = { situations: selected, idx:0, score:0, skillTotals:{posture:0,clarte:0,strategie:0}, answered:false };
  var feed = $('ns-'+cfg.key+'-feed');
  var choices = $('ns-'+cfg.key+'-choices');
  if(feed) feed.innerHTML = '';
  if(choices) choices.innerHTML = '';
  nsUpdateProg(profil);
  // Intro aléatoire parmi les variantes du profil
  var intros = NS_INTROS[profil];
  var intro = intros[Math.floor(Math.random()*intros.length)];
  setTimeout(function(){
    addNovaBubble(feed, null, intro, 400).then(function(){
      setTimeout(function(){ nsRender(profil); }, 300);
    });
  }, 200);
};


function nsUpdateProg(profil){
  var cfg = NS_CFG[profil];
  var s = NS_STATE[profil];
  if(!s) return;
  var total = s.situations ? s.situations.length : MS_DATA[profil].length;
  var pct = Math.round((s.idx/total)*100);
  var bar = $('ns-'+cfg.key+'-bar'); if(bar) bar.style.width=pct+'%';
  var step = $('ns-'+cfg.key+'-step'); if(step) step.textContent='Situation '+(s.idx+1)+' / '+total;
  var pctEl = $('ns-'+cfg.key+'-pct'); if(pctEl) pctEl.textContent=pct+'%';
}

function nsRender(profil){
  var cfg = NS_CFG[profil];
  var s = NS_STATE[profil];
  var situation = (s.situations ? s.situations[s.idx] : MS_DATA[profil][s.idx]);
  var feed = $('ns-'+cfg.key+'-feed');
  var choices = $('ns-'+cfg.key+'-choices');
  s.answered = false;
  choices.innerHTML = '';

  addNovaBubble(feed, null, '❓ '+situation.context, 600).then(function(){
    var letters = ['A','B','C'];
    situation.opts.forEach(function(opt, i){
      var btn = document.createElement('div');
      btn.className = 'nova-choice';
      btn.id = 'ns-opt-'+cfg.key+'-'+i;
      btn.innerHTML = '<div class="nova-choice-letter">'+letters[i]+'</div><span>'+opt+'</span>';
      btn.onclick = function(){ if(!s.answered) nsAnswer(profil, i); };
      choices.appendChild(btn);
    });
    scrollFeed(feed);
  });
}

window.nsAnswer = function(profil, chosen){
  var cfg = NS_CFG[profil];
  var s = NS_STATE[profil];
  if(s.answered) return;
  s.answered = true;
  var situation = (s.situations ? s.situations[s.idx] : MS_DATA[profil][s.idx]);
  var isBest = (chosen === situation.best);
  if(isBest){
    s.score++;
    s.skillTotals.posture += situation.skills.posture;
    s.skillTotals.clarte += situation.skills.clarte;
    s.skillTotals.strategie += situation.skills.strategie;
  } else {
    s.skillTotals.posture += Math.round(situation.skills.posture*0.4);
    s.skillTotals.clarte += Math.round(situation.skills.clarte*0.4);
    s.skillTotals.strategie += Math.round(situation.skills.strategie*0.4);
  }

  var letters = ['A','B','C'];
  situation.opts.forEach(function(_, i){
    var el = $('ns-opt-'+cfg.key+'-'+i);
    if(!el) return;
    el.classList.add('disabled');
    if(i === situation.best) el.style.borderColor='#22c55e', el.style.background='rgba(34,197,94,.1)', el.style.color='#86efac';
    else if(i===chosen && !isBest) el.style.borderColor='#f43f5e', el.style.background='rgba(244,63,94,.1)', el.style.color='#fca5a5';
  });

  var feed = $('ns-'+cfg.key+'-feed');
  // Bulle user
  addUserBubble(feed, situation.opts[chosen]);

  // Feedback Mise en situation — contenu toujours centré sur la bonne réponse,
  // mais l'intro varie selon que le candidat a répondu juste (👍) ou faux (👎).
  var bestWhyText = situation.why[situation.best].replace(/^✅\s*/, '');
  var expl;
  if(isBest){
    var NS_INTRO_OK = [
      '👍 <strong>Bonne réponse !</strong> ',
      '👍 <strong>En effet —</strong> ',
      '👍 <strong>Oui, exactement.</strong> ',
      '👍 <strong>C\'est exactement ça.</strong> ',
      '👍 <strong>Tout à fait.</strong> '
    ];
    var introOk = NS_INTRO_OK[Math.floor(Math.random()*NS_INTRO_OK.length)];
    expl = introOk + bestWhyText;
  } else {
    var NS_INTRO_KO = [
      '👎 <strong>La bonne réponse était :</strong> « '+situation.opts[situation.best]+' »<br><br><strong>Pourquoi :</strong> ',
      '👎 <strong>Pas tout à fait. Il fallait répondre :</strong> « '+situation.opts[situation.best]+' »<br><br><strong>Pourquoi :</strong> ',
      '👎 <strong>La meilleure réponse ici :</strong> « '+situation.opts[situation.best]+' »<br><br><strong>Pourquoi :</strong> '
    ];
    var introKo = NS_INTRO_KO[Math.floor(Math.random()*NS_INTRO_KO.length)];
    expl = introKo + bestWhyText;
  }
  addFeedbackBubble(feed, isBest, expl, 700).then(function(){
    var choices = $('ns-'+cfg.key+'-choices');
    choices.innerHTML = '';
    var nxt = document.createElement('button');
    nxt.className = 'nova-next show';
    var total = s.situations ? s.situations.length : MS_DATA[profil].length;
    nxt.textContent = s.idx < total-1 ? 'Situation suivante →' : 'Voir mon analyse →';
    nxt.onclick = function(){ nsNext(profil); };
    choices.appendChild(nxt);
  });
};

function nsNext(profil){
  var cfg = NS_CFG[profil];
  var s = NS_STATE[profil];
  s.idx++;
  var _nsTotal = s.situations ? s.situations.length : MS_DATA[profil].length;
  if(s.idx >= _nsTotal){
    nsShowResult(profil);
  } else {
    nsUpdateProg(profil);
    nsRender(profil);
  }
}

function nsSkillBar(label, pct, color){
  return '<div class="nova-skill-row">'
    +'<div class="nova-skill-label"><span>'+label+'</span><span style="font-weight:800;color:#e2e8f0;">'+pct+'%</span></div>'
    +'<div class="nova-skill-track"><div class="nova-skill-bar" style="width:'+pct+'%;background:'+color+';"></div></div>'
    +'</div>';
}

function nsShowResult(profil){
  var cfg = NS_CFG[profil];
  var s = NS_STATE[profil];
  var total = s.situations ? s.situations.length : MS_DATA[profil].length;
  var score = s.score;
  var pct = Math.round((score/total)*100);
  var accent = NS_ACCENTCOLORS[profil];
  var bar = $('ns-'+cfg.key+'-bar'); if(bar) bar.style.width='100%';
  var step = $('ns-'+cfg.key+'-step'); if(step) step.textContent='Terminé !';
  var pctEl = $('ns-'+cfg.key+'-pct'); if(pctEl) pctEl.textContent='100%';

  var level, levelColor;
  if(pct===100){level='Performance parfaite — Tu maîtrises chaque situation 🏆';levelColor='#22c55e';}
  else if(pct>=67){level='Très bon niveau — Quelques réglages fins 👍';levelColor='#f59e0b';}
  else if(pct>=33){level='En progression — La posture se travaille 💪';levelColor='#f59e0b';}
  else{level='À renforcer — Mise en situation peut te coacher sur chaque situation 🎯';levelColor='#f43f5e';}

  var maxSkill = total * 3;
  var postPct = Math.min(100, Math.round((s.skillTotals.posture/maxSkill)*100));
  var clarPct = Math.min(100, Math.round((s.skillTotals.clarte/maxSkill)*100));
  var stratPct = Math.min(100, Math.round((s.skillTotals.strategie/maxSkill)*100));

  // Compétence la plus faible → focus du coaching
  var weakSkill = 'posture', weakVal = postPct;
  if(clarPct < weakVal){ weakSkill='clarte'; weakVal=clarPct; }
  if(stratPct < weakVal){ weakSkill='strategie'; }

  // Compétence dominante → lecture de personnalité
  var dominantSkill = 'posture', dominantVal = postPct;
  if(clarPct > dominantVal){ dominantSkill='clarte'; dominantVal=clarPct; }
  if(stratPct > dominantVal){ dominantSkill='strategie'; }

  var NS_PERSONALITY = {
    salarie:{
      posture:['Ce que ce tirage révèle sur toi : tu as de la présence. Tu sais te tenir, te positionner, ne pas plier sous la pression. Dans un entretien, c\'est ce que le recruteur ressent avant même que tu aies fini de répondre.','Ton pattern révèle quelqu\'un de fiable dans l\'adversité. Tu gardes ta ligne même sous questionnement. C\'est rare — et c\'est exactement ce que cherche un recruteur exigeant.'],
      clarte:['Ce tirage dit quelque chose de précis : tu structures ta pensée avant de parler. Dans un entretien, ça se voit immédiatement. Le recruteur suit ton raisonnement sans effort — et c\'est un avantage décisif.','Ton profil révèle quelqu\'un qui communique avec précision. Tu vas à l\'essentiel avec les bons mots. C\'est une compétence qui se voit, se ressent, et se mémorise.'],
      strategie:['Ce que ce tirage révèle : tu penses à plusieurs coups d\'avance. Tu ne réponds pas juste à la question — tu gères la conversation. C\'est une intelligence situationnelle rare en entretien.','Ton pattern révèle un profil stratège. Tu évalues l\'impact de tes réponses, tu calibres ton discours. Le recruteur en face ne sait pas toujours qu\'il est face à quelqu\'un qui orchestre la conversation.']
    },
    demandeur:{
      posture:['Ce que ce tirage révèle : tu ne te laisses pas définir par ta situation. Tu gardes de la dignité, de l\'assurance. C\'est ce qui fait la différence en entretien quand l\'employeur teste ta résistance.','Ton pattern dit quelque chose de fort : tu ne subis pas ta recherche — tu la pilotes. Et ça se voit dans ta façon de répondre aux situations difficiles.'],
      clarte:['Ce tirage révèle quelqu\'un qui sait articuler sa situation sans la dramatiser ni la minimiser. C\'est exactement le dosage qui rassure un recruteur face à un profil demandeur d\'emploi.','Ton profil montre une clarté narrative rare. Tu expliques, tu justifies, tu contextualises — sans te perdre dans les détails.'],
      strategie:['Ce que ce tirage révèle : tu as appris à transformer ta situation en ressource. Tu positionnes ta disponibilité, ton parcours comme des atouts — pas comme des fardeaux. C\'est la posture du rebond.','Ton pattern révèle quelqu\'un qui pense employabilité, pas chômage. Tu anticipes les objections, tu retournes les questions. C\'est ce qu\'un recruteur perçoit comme un candidat "solide".']
    },
    reconversion:{
      posture:['Ce que ce tirage révèle : tu portes ta reconversion avec conviction, pas avec excuses. Tu ne te justifies pas — tu expliques. Nuance capitale quand on change de trajectoire.','Ton pattern montre quelqu\'un qui a travaillé sa posture de reconvertisseur. Tu ne sembles pas perdu — tu sembles avoir choisi. Et le recruteur le ressent immédiatement.'],
      clarte:['Ce tirage révèle que tu as la rare capacité de rendre ta reconversion cohérente pour quelqu\'un qui ne la vit pas. Tu construis un récit logique d\'un parcours qui pourrait sembler illogique. C\'est ton vrai atout.','Ton profil dit quelque chose de précis : tu as fait le travail intellectuel de ta reconversion. Tu sais pourquoi tu pars, pourquoi tu arrives là, et comment les deux sont liés.'],
      strategie:['Ce que ce tirage révèle : tu penses ta reconversion comme un entrepreneur pense son lancement. Tu as évalué les risques, préparé les plans B, anticipé les questions difficiles.','Ton pattern révèle un reconvertisseur méthodique. Tu ne te lances pas dans le vide — tu construis un pont entre ce que tu as fait et ce que tu veux faire.']
    },
    freelance:{
      posture:['Ce que ce tirage révèle : tu as la posture d\'un freelance qui se respecte. Tu ne cherches pas à plaire à tout prix — tu cherches à bien travailler. Cette différence se ressent immédiatement dans une première conversation client.','Ton pattern dit quelque chose d\'important : tu sais dire non, tenir tes positions, ne pas plier sous la pression commerciale. C\'est la posture des freelances qui durent.'],
      clarte:['Ce tirage révèle quelqu\'un qui structure ses réponses comme ses livrables : précis, sans superflu, orienté action. Tes clients vont adorer travailler avec quelqu\'un qui ne les noie pas dans les mots.','Ton profil montre une clarté de communication rare. Tu dis ce que tu fais, tu fais ce que tu dis, et tu l\'expliques sans ambiguïté. En freelance, c\'est la base de la confiance client.'],
      strategie:['Ce que ce tirage révèle : tu penses chaque interaction client comme une négociation à plusieurs dimensions. Tu gères le scope, le tarif, la relation et la réputation en même temps.','Ton pattern révèle quelqu\'un qui ne réagit pas — qui anticipe. Tu identifies les dynamiques avant qu\'elles deviennent des problèmes. En indépendant, cette intelligence situationnelle vaut de l\'or.']
    }
  };

  var readings = NS_PERSONALITY[profil][dominantSkill];
  var readingTxt = readings[Math.floor(Math.random()*readings.length)];

  // Axe de travail selon compétence la plus faible
  var NS_COACHING = {
    salarie:{
      posture:['Travaille ta posture physique et vocale avant chaque entretien : dos droit, voix posée, rythme lent. L\'assurance se prépare autant que les réponses.','Pratique les silences — ne comble pas immédiatement chaque pause. Les candidats qui savent attendre projettent de la maturité.'],
      clarte:['Structure chaque réponse en 3 temps : contexte en 1 phrase, action en 2-3 phrases, résultat chiffré. La méthode STAR appliquée rigoureusement.','Prépare 3 exemples concrets et chiffrés de tes réussites. Mémorise les chiffres — ils donnent du poids à chaque affirmation.'],
      strategie:['Prépare 5 questions à poser au recruteur. Chaque question doit montrer que tu as réfléchi aux enjeux du poste, pas juste à ta candidature.','Anticipe les 3 objections les plus probables à ta candidature et prépare une réponse concrète pour chacune.']
    },
    demandeur:{
      posture:['Pratique ton pitch de 2 minutes à voix haute devant un miroir ou en vidéo. La fluidité ne vient qu\'avec la répétition orale.','Travaille ta façon d\'aborder les questions difficiles : ne t\'excuse pas, ne te justifie pas — contextualise et projette positivement.'],
      clarte:['Prépare une réponse précise sur chaque point faible de ton profil : trou de CV, secteur différent, manque d\'expérience. Une réponse préparée est une réponse maîtrisée.','Structure ta recherche d\'emploi par objectifs hebdomadaires : X candidatures, Y contacts LinkedIn, Z appels réseau.'],
      strategie:['Identifie 10 entreprises cibles et personnalise chaque candidature. La personnalisation multiplie par 3 le taux de réponse.','Active ton réseau en mode "informatif" — demande des conseils, pas un emploi. C\'est moins menaçant et beaucoup plus efficace.']
    },
    reconversion:{
      posture:['Prépare ton récit de reconversion en 90 secondes : déclic → analyse → action → projection. Répète-le à voix haute jusqu\'à ce qu\'il soit fluide et naturel.','Supprime les formules d\'excuse de ton vocabulaire de reconvertisseur : "je sais que je n\'ai pas d\'expérience dans ce domaine mais..." → remplace par des faits et des preuves.'],
      clarte:['Construis ta "matrice de compétences transférables" : liste tes compétences, et pour chacune identifie comment elle s\'applique dans le nouveau secteur.','Prépare un mini-portfolio de 3 projets (même personnels ou associatifs) qui prouvent que tu as déjà commencé dans le nouveau domaine.'],
      strategie:['Définis un calendrier de reconversion précis : bilan de compétences > formation > recherche active. Chaque étape doit avoir une date.','Identifie 3 personnes dans ton réseau qui ont fait une reconversion similaire. Leur expérience vaut mieux que n\'importe quelle brochure de formation.']
    },
    freelance:{
      posture:['Entraîne-toi à défendre ton TJM sans fléchir. Pratique à voix haute : "Mon TJM reflète la valeur que j\'apporte. Si le budget est contraint, réduisons le scope." Répète jusqu\'à ce que ce soit naturel.','Prépare ta réponse à l\'objection "vous êtes cher" avec des chiffres concrets — ROI, économies générées, coût d\'une mission ratée.'],
      clarte:['Rédige un template de devis type avec livrables, jalons, conditions de paiement, clause de révisions incluses vs supplémentaires. Un devis précis protège les deux parties.','Crée un email de recap-type à envoyer après chaque appel client. Il documente les décisions prises et prévient les malentendus de scope.'],
      strategie:['Définis ta niche en une phrase : "J\'aide [type de client] à [résoudre quel problème] grâce à [ta compétence]". Si tu ne peux pas, ta proposition de valeur n\'est pas encore assez claire.','Calcule ton TJM réel (charges + temps non facturé + frais pro) et compare-le au marché sur Malt. Si l\'écart est important, c\'est le moment d\'ajuster.']
    }
  };

  var coachTips = NS_COACHING[profil][weakSkill];
  var coachTip1 = coachTips[0], coachTip2 = coachTips[1];

  var weakLabel = {posture:'Posture & confiance', clarte:'Clarté & structure', strategie:'Stratégie & impact'}[weakSkill];

  // Ressources
  var NQ_RESOURCES = {
    salarie:[
      {label:'Service-Public.fr — Droits salariés',url:'https://www.service-public.fr/particuliers/vosdroits/N19806'},
      {label:'APEC — Salaires et marché cadres',url:'https://www.apec.fr/tous-nos-articles/detail/les-salaires-cadres.html'},
      {label:'Legifrance — Code du travail',url:'https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050/'},
      {label:'Glassdoor — Salaires et avis entreprises',url:'https://www.glassdoor.fr/'}
    ],
    demandeur:[
      {label:'France Travail — Calculer mes droits ARE',url:'https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-services/mes-droits-a-lassurance-chomage.html'},
      {label:'Mon Compte Formation (CPF)',url:'https://www.moncompteformation.gouv.fr/'},
      {label:'LinkedIn — Réseau + offres d\'emploi',url:'https://www.linkedin.com/'},
      {label:'HelloWork — Offres d\'emploi France',url:'https://www.hellowork.com/'},
      {label:'Indeed — Alertes emploi par secteur',url:'https://fr.indeed.com/'}
    ],
    reconversion:[
      {label:'Mon Compte Formation (CPF)',url:'https://www.moncompteformation.gouv.fr/'},
      {label:'Transition Pro — CPF de transition salarié',url:'https://www.transitionspro.fr/'},
      {label:'France Travail — Bilan de compétences',url:'https://www.francetravail.fr/candidat/en-formation/mes-dispositifs-de-formation/le-bilan-de-competences.html'},
      {label:'France Compétences — Certifications RNCP',url:'https://www.francecompetences.fr/recherche_rgcp/'},
      {label:'60000 Rebonds — Réseau de mentors',url:'https://www.60000rebonds.com/'}
    ],
    freelance:[
      {label:'Malt — Plateforme freelance n°1 France',url:'https://www.malt.fr/'},
      {label:'URSSAF — Espace Auto-entrepreneur',url:'https://www.autoentrepreneur.urssaf.fr/'},
      {label:'Indy — Comptabilité indépendants',url:'https://www.indy.fr/'},
      {label:'Freelance-info — Communauté et ressources',url:'https://www.freelance-info.fr/'},
      {label:'LinkedIn — Personal branding & réseau',url:'https://www.linkedin.com/'}
    ]
  };

  var resources = NQ_RESOURCES[profil];
  var resHtml = '';
  for(var r=0;r<resources.length;r++){
    resHtml += '<a href="'+resources[r].url+'" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:rgba(255,255,255,.04);border-radius:8px;text-decoration:none;color:#e2e8f0;font-size:.78rem;margin-bottom:6px;border:1px solid rgba(255,255,255,.06);">'
      + '<span style="font-size:.9rem;">🔗</span><span>'+resources[r].label+'</span>'
      + '</a>';
  }

  var html = '<div class="nova-result-podium"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>'
    + '<div class="nova-result-tag">Analyse de performance</div>'
    + '<div class="nova-result-score">'+score+'<span>/'+total+'</span></div>'
    + '<div class="nova-result-level" style="color:'+levelColor+';">'+level+'</div>'
    + '<div class="nova-result-skills">'
    +   '<div class="nova-result-skills-title">Compétences évaluées</div>'
    +   nsSkillBar('Posture & confiance', postPct, '#a78bfa')
    +   nsSkillBar('Clarté & structure', clarPct, '#f43f5e')
    +   nsSkillBar('Stratégie & impact', stratPct, '#22c55e')
    + '</div>'
    + '<div style="background:rgba(255,255,255,.04);border-left:3px solid '+levelColor+';padding:14px 16px;margin:16px 0;border-radius:0 8px 8px 0;font-size:.82rem;color:#cbd5e1;line-height:1.6;font-style:italic;">'+readingTxt+'</div>'
    + '<div style="margin:20px 0;">'
    +   '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;color:#64748b;text-transform:uppercase;margin-bottom:6px;">Axe de travail prioritaire — '+weakLabel+'</div>'
    +   '<div style="display:flex;gap:6px;margin-bottom:8px;"><span style="flex-shrink:0;margin-top:1px;">→</span><span style="font-size:.82rem;color:#e2e8f0;line-height:1.5;">'+coachTip1+'</span></div>'
    +   '<div style="display:flex;gap:6px;"><span style="flex-shrink:0;margin-top:1px;">→</span><span style="font-size:.82rem;color:#e2e8f0;line-height:1.5;">'+coachTip2+'</span></div>'
    + '</div>'
    + '<div style="margin:20px 0;">'
    +   '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;color:#64748b;text-transform:uppercase;margin-bottom:10px;">Ressources utiles</div>'
    +   resHtml
    + '</div>'
    + '<button class="nova-result-retry" onclick="nsStart(\''+profil+'\');go(\''+cfg.retry+'\')" style="width:100%;margin-bottom:10px;">↺ Nouvelle session</button>'
    + '<button class="nova-result-back" onclick="go(\'eva-entretien\')">← Retour aux profils</button>';

  go(cfg.result);
  setTimeout(function(){
    var wrap = $('ns-'+cfg.key+'-result');
    if(wrap) wrap.innerHTML = html;
  }, 100);
}


/* ─────────────────────────────────────────────
   AUTO-START — patch go()
───────────────────────────────────────────── */
(function(){
  if(window._novaGoPatched) return;
  var origGo = window.go;
  window.go = function(id){
    origGo(id);
    var qcmMatch = id.match(/^entretien-(salarie|demandeur|reconversion|freelance)$/);
    if(qcmMatch){
      var p = qcmMatch[1];
      setTimeout(function(){ nqStart(p); }, 80);
      return;
    }
    var msMatch = id.match(/^mise-situation-(salarie|demandeur|reconversion|freelance)$/);
    if(msMatch){
      var p2 = msMatch[1];
      setTimeout(function(){ nsStart(p2); }, 80);
    }
  };
  window._novaGoPatched = true;
})();

})();
