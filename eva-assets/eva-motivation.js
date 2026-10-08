
(function(){
var EB={profil:null,subProfil:null,theme:null,score:0,level:null,moment:null,qIdx:0,answers:[],pool:[],name:''};
function $b(){return document.getElementById('eb-body');}
function $prog(){return document.getElementById('eb-prog-wrap');}
function $fill(){return document.getElementById('eb-prog-fill');}
function $ptxt(){return document.getElementById('eb-prog-txt');}
function $hsub(){return document.getElementById('eb-hdr-sub');}
function shuffle(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function setProgress(cur,tot){if(!$prog())return;$prog().style.display='block';$fill().style.width=Math.round((cur/tot)*100)+'%';$ptxt().textContent='Question '+cur+' / '+tot;}

/* Typing dots */
var EBD=function(ms){ return Math.round(ms*1.7); }; /* ordinateur : rythme plus posé */
function typing(cb,delay){
  delay=EBD(delay||600);
  var d=document.createElement('div');
  d.className='eb-typing';
  d.innerHTML='<span></span><span></span><span></span>';
  $b().appendChild(d);scroll();
  setTimeout(function(){d.remove();cb();scroll();},delay);
}

/* Bulle EVA */
function addEva(html,delay){
  delay=delay||0;
  setTimeout(function(){
    typing(function(){
      var wrap=document.createElement('div');
      wrap.style.cssText='margin-bottom:6px;';
      wrap.innerHTML='<div class="eb-eva-name">✦ EVA</div><div class="eb-bub-eva">'+html+'</div>';
      $b().appendChild(wrap);scroll();
    },500);
  },delay);
}

/* Bulle utilisateur — à droite, bien visible */
function addUser(txt){
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;justify-content:flex-end;margin-bottom:14px;';
  var d=document.createElement('div');
  d.className='eb-bub-user';
  d.textContent=txt;
  wrap.appendChild(d);
  $b().appendChild(wrap);scroll();
}

/* Question numérotée + options bien séparées */
function addQuestion(html,num,tot){
  var wrap=document.createElement('div');
  wrap.style.cssText='margin-bottom:6px;';
  var num_lbl=num?'<div style="font-size:.46rem;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;">Question '+num+' / '+tot+'</div>':'';
  wrap.innerHTML='<div class="eb-eva-name">✦ EVA</div>'+num_lbl+'<div class="eb-bub-eva">'+html+'</div>';
  $b().appendChild(wrap);scroll();
  return wrap;
}

function scroll(){$b().scrollTop=9999;}
function append(el){$b().appendChild(el);scroll();}

var PROFILS={
  salarie:{label:'Salarié(e)',
    svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><path d="M12 12h.01"/></svg>',
    sub:'En poste · CDI / CDD'},
  demandeur:{label:"Chercheur d'emploi",
    svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    sub:'Actif(ve) dans ma recherche'},
  reconversion:{label:'En reconversion',
    svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><path d="m5 12 7-7 7 7"/><path d="M19 22H5"/></svg>',
    sub:'Je change de voie'},
  freelance:{label:'Freelance / Indép.',
    svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    sub:'Mon propre patron'}
};
var THEMES=[
  {id:'energie',
   svg:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
   label:'Énergie & Humeur',sub:'Comment tu vas vraiment en ce moment'},
  {id:'argent',
   svg:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>',
   label:'Argent & Finances',sub:'Stress financier, budget, sérénité pro'},
  {id:'mental',
   svg:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/></svg>',
   label:'Santé mentale',sub:'Anxiété, épuisement, confiance'},
  {id:'amour',
   svg:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
   label:'Confiance & Estime de soi',sub:'Doute, légitimité, syndrome de l\'imposteur'}
];

var Q_POOL={
energie:[
  {q:'🌤️ Ce matin, quand tu t\'es levé(e)… c\'était comment ?',opts:['☀️ Bien, j\'avais de l\'élan','😐 Correct, sans plus','😶 J\'avais du mal à me lever','🌧️ Vraiment difficile']},
  {q:'⚡ Quand est-ce que tu te sens le plus vivant(e) sur une journée ?',opts:['🌅 Le matin','🌞 En milieu de journée','🌆 Le soir','😴 Rarement ces derniers temps']},
  {q:'😮‍💨 Si tu devais nommer ce que tu ressens là, en un mot ?',opts:['🔥 Motivé(e)','🌀 Stressé(e)','😪 Épuisé(e)','😶 Engourdi(e)','✨ Serein(e)']},
  {q:'🎯 Tu te sens fier(ère) de toi {m} ?',opts:['💪 Oui, clairement','🙂 Un peu','😶 Pas vraiment','😔 Pas du tout, pas aujourd\'hui']},
  {q:'🌊 Ton niveau d\'énergie {m} ?',opts:['⚡ Très haut — dans mon élan','🔋 Moyen — j\'avance sans forme','🪫 Bas — par obligation','💀 Vide — mode survie']},
  {q:'😴 Ton sommeil en ce moment ?',opts:['😴 Excellent','🛌 Correct','😵 Agité, pensées','😓 Je dors mal ou pas assez']},
  {q:'🏃 Tu fais du mouvement / du sport ?',opts:['💪 Oui, régulièrement','🚶 Parfois','😬 Très peu','🛋️ Presque pas du tout']},
  {q:'🍽️ Tu prends soin de toi côté alimentation ?',opts:['🥗 Oui, j\'y fais attention','🍕 Je mange vite','☕ Je survis au café','😕 Je mange mal ou peu']},
  {q:'🌿 Tu comptes t\'accorder un vrai moment pour toi aujourd\'hui ?',opts:['✅ Oui, c\'est prévu','🙂 J\'espère','😶 Pas vraiment','❌ Non — pas le temps']},
  {q:'📱 Ton rapport aux réseaux {m} ?',opts:['😌 Détaché(e)','🙂 Neutre','😟 Ça grignote mon humeur','📵 Du mal à déconnecter']},
  {q:'🌈 Quelque chose te fait sourire chaque jour ?',opts:['😍 Oui, plusieurs choses !','🙂 Oui, au moins une','🤔 J\'en trouve peu','😔 Les journées se ressemblent']},
  {q:'💭 Tes pensées le soir avant de dormir ?',opts:['💆 Calmes — je décroche','🔄 Elles tournent un peu','🌀 Elles s\'emballent','💥 Chaos — je rumine']},
  {q:'🎁 Si tu pouvais t\'offrir UNE chose aujourd\'hui ?',opts:['💤 Du repos et du calme','🤗 Du temps avec des proches','🏆 Une victoire, même petite','🌍 Un changement de cadre']},
  {q:'🔥 Tu te sens brûlé(e) ou allumé(e) {m} ?',opts:['🔥 Allumé(e) — dans l\'élan','🕯️ En veille — petite flamme','💨 Soufflé(e) — manque de carburant','❄️ Éteint(e)']},
  {q:'🧩 Ce qui te manque le plus pour aller vraiment bien ?',opts:['⏰ Du temps pour moi','💰 De la sécurité','🤝 Des liens, de la connexion','🎯 Un but, du sens']},
  {q:'🌻 Tu t\'autorises à te reposer sans culpabiliser ?',opts:['😌 Oui, complètement','🤏 J\'essaie','😬 Pas vraiment','❌ Non, je peux pas m\'arrêter']},
  {q:'💬 Tu parles de comment tu vas vraiment à quelqu\'un ?',opts:['🤗 Oui, j\'ai quelqu\'un','🙂 Parfois','😶 Peu — je garde pour moi','🏝️ Non, je gère seul(e)']},
  {q:'🌙 Ce soir, qu\'est-ce que tu as envie de faire ?',opts:['🛁 Me poser, me faire du bien','👫 Voir quelqu\'un','📚 Lire / créer / apprendre','🛌 Dormir, juste dormir']},
  {q:'✨ Qu\'est-ce qui te donnait de la joie avant et que tu ne fais plus ?',opts:['🎨 Une passion créative','🏃 Le sport, le mouvement','🤝 Voir des amis','🌍 Voyager, découvrir']},
  {q:'💌 Ce que tu as envie qu\'on te dise là maintenant ?',opts:['"Tu fais du super boulot 💪"','"Tu as le droit de te reposer 🌸"','"Je suis là, t\'es pas seul(e) 🤗"','"Tu vas t\'en sortir 🌟"']},
  {q:'🧭 Tu te sens aligné(e) avec ce que tu veux vraiment ?',opts:['✅ Oui — je suis sur ma route','🤔 Pas toujours — doutes','😕 Peu — décalé(e)','❓ Je ne sais plus ce que je veux']},
  {q:'🎯 Ton énergie serait quel feu de signalisation ?',opts:['🟢 Vert — go go go !','🟡 Orange — ralentir','🔴 Rouge — stop','⚫ Éteint — je le cherche']},
  {q:'🌱 Quelque chose que tu remets à plus tard depuis trop longtemps ?',opts:['💆 Prendre soin de moi','🗣️ Une conversation difficile','🎯 Un projet qui me tient à cœur','🏃 Bouger, prendre l\'air']},
  {q:'💬 Est-ce que tu prends soin de toi comme tu prends soin d\'un ami ?',opts:['💗 Oui, je suis gentil(le) avec moi','🤔 Parfois','😬 Rarement','❌ Non — plus dur avec moi']},
  {q:'💜 Ta note de bien-être de 1 à 10 aujourd\'hui ?',opts:['😊 8-10 : Je suis en forme !','🙂 6-7 : Hauts et bas','😐 4-5 : Moyen, je gère','😔 1-3 : J\'ai besoin d\'aide']}
],
argent:[
  {q:'💰 Quand tu penses à ton argent, ta première réaction c\'est…',opts:['😰 De l\'angoisse','😬 Une inquiétude sourde','😐 La tête hors de l\'eau','😌 Plutôt serein(e)']},
  {q:'📊 Tu as une idée claire de tes dépenses mensuelles ?',opts:['✅ Oui, je gère bien','🤔 Vaguement','❌ Pas vraiment','😱 Non et ça m\'angoisse']},
  {q:'😥 Les fins de mois sont stressantes ?',opts:['😌 Non, je suis tranquille','🤏 Légèrement','😓 Oui, c\'est tendu','😰 Très — source de stress majeure']},
  {q:'🏦 Tu as une épargne de sécurité ?',opts:['💪 Oui, solide','🙂 Oui, une petite','😶 Non, le mois est serré','😔 Non, et j\'ai des dettes']},
  {q:'💳 Ta relation à ta carte bancaire…',opts:['💚 Je sais où j\'en suis','💛 Je vérifie souvent — j\'ai peur','🔴 J\'évite de regarder','⚫ J\'ai peur du solde']},
  {q:'🎯 Ton objectif financier principal {m} ?',opts:['💰 Économiser pour un projet','🏠 Payer loyer / charges sereinement','💳 Rembourser une dette','📈 Gagner plus']},
  {q:'🤐 Tu parles facilement d\'argent avec tes proches ?',opts:['😊 Oui, ouvertement','🤫 Peu — c\'est tabou','😶 Non, jamais','😟 Non et ça isole']},
  {q:'💡 Tu sais exactement ce que tu gardes chaque mois ?',opts:['✅ Oui, j\'ai fait le calcul','🤔 Approximativement','❓ Non — je vis au flux','😓 Non et ça crée de l\'anxiété']},
  {q:'🛒 Quand tu fais un achat plaisir, tu ressens quoi après ?',opts:['😊 Rien — j\'ai le droit','🙂 Un peu de satisfaction','😬 Un peu de culpabilité','😰 Beaucoup de culpabilité']},
  {q:'📅 Tu te projettes financièrement dans 1 an ?',opts:['📈 Oui — j\'ai un plan','🤔 Vaguement','😶 Non — trop flou','😱 L\'avenir me fait peur']},
  {q:'🤝 As-tu besoin d\'aide financière {m} ?',opts:['❌ Non, pas besoin','🤔 J\'en aurais besoin mais j\'ose pas demander','😟 Oui, j\'y pense sérieusement','🆘 Oui, c\'est urgent']},
  {q:'💸 Ce qui te stress le plus financièrement là…',opts:['🏠 Le loyer / les charges','🍽️ Nourrir mes proches','💊 La santé, les imprévus','🎓 Une dette à rembourser']},
  {q:'🌟 Tu te sens capable de changer ta situation ?',opts:['💪 Oui absolument','🌱 Je commence à y croire','😶 J\'aimerais mais je vois pas comment','😔 Honnêtement non']},
  {q:'📱 Les achats impulsifs…',opts:['😌 Je résiste facilement','😬 Parfois c\'est dur','🛍️ Je cède souvent','🙈 C\'est ma faiblesse principale']},
  {q:'💼 Ton salaire te semble à la hauteur de ce que tu apportes ?',opts:['✅ Oui, bien payé(e)','🤔 Pas vraiment','❌ Non — sous-payé(e)','😕 Je gagne peu mais pas d\'alternative']},
  {q:'🏠 Ton logement correspond à ce que tu peux te permettre ?',opts:['✅ Oui, équilibré','😬 À la limite','❌ Non — trop cher','🤔 Je suis chez quelqu\'un d\'autre']},
  {q:'💬 L\'argent a déjà créé des tensions dans tes relations ?',opts:['Non jamais','Une ou deux fois','Oui parfois','Oui souvent — source de conflit']},
  {q:'🎓 Tu te formes pour améliorer ta valeur sur le marché ?',opts:['📚 Oui activement','🤔 J\'y pense mais procrastine','💡 J\'aimerais mais pas les moyens','❌ Non']},
  {q:'🌱 Dans 5 ans, où tu te vois financièrement ?',opts:['📈 Bien mieux','🙂 À peu près pareil','😕 Je sais pas','😔 J\'ai peur que ça soit pire']},
  {q:'💰 Si tu recevais 1000€ inattendus, tu ferais quoi ?',opts:['💳 Je paie des dettes','💰 Je les mets de côté','🎁 Je m\'offre quelque chose','🌍 J\'investis dans un projet']},
  {q:'😮‍💨 L\'argent te donne l\'impression de…',opts:['💪 Me donner du pouvoir','😰 Me contrôler et stresser','🎢 Montagnes russes','😶 N\'avoir aucune prise']},
  {q:'🤔 Tu sais quelles aides tu as le droit d\'avoir ?',opts:['✅ Oui, j\'ai vérifié','🤔 Vaguement','❌ Non, pas cherché','🙈 Non et ça m\'angoisse']},
  {q:'🌸 Tu prends soin de ta santé financière comme de ta santé physique ?',opts:['💚 Oui — je m\'en occupe','💛 Un peu — j\'essaie','🔴 Non — je subis','⚫ C\'est le chaos']},
  {q:'💌 L\'argent t\'empêche de vivre quoi en ce moment ?',opts:['🌍 Voyager / profiter','🏠 Être stable sereinement','🎓 Me former / évoluer','❤️ Aider les gens que j\'aime']},
  {q:'💜 Si tu pouvais changer UNE chose dans ta vie financière demain ?',opts:['💰 Avoir plus de revenus','💳 Rembourser mes dettes','💡 Mieux comprendre comment gérer','🧘 Ne plus stresser pour ça']}
],
mental:[
  {q:'🧠 Ta tête, {m}, c\'est plutôt…',opts:['☁️ Brumeuse — mal à penser','🌀 En surchauffe — trop de pensées','🌊 Calme mais sous tension','☀️ Claire et posée']},
  {q:'😰 Tu te réveilles parfois avec de l\'angoisse sans savoir pourquoi ?',opts:['🌧️ Oui, souvent','😟 Parfois','😐 Rarement','😌 Non, je me lève bien']},
  {q:'🪞 Comment tu te parles quand tu fais une erreur ?',opts:['😠 Très dur(e) avec moi','😬 Assez critique','🤔 J\'essaie d\'être bienveillant(e)','😊 Je me pardonne assez facilement']},
  {q:'😶 Tu ressens parfois un vide ou un manque de sens ?',opts:['😔 Oui, souvent','🤔 Parfois','😐 Rarement','😊 Non — je sais pourquoi je me lève']},
  {q:'🌊 L\'anxiété dans ta vie quotidienne…',opts:['💥 Énorme — ça m\'empêche d\'avancer','😰 Présente et fatiguante','😐 Modérée — je gère','😌 Petite ou absente']},
  {q:'😮‍💨 Tu te sens épuisé(e) même après avoir dormi ?',opts:['😴 Oui toujours — dans le brouillard','😓 Souvent','😐 Parfois','💪 Non — je me lève rechargé(e)']},
  {q:'🗣️ Tu as quelqu\'un à qui parler vraiment de ce que tu ressens ?',opts:['💗 Oui — des gens précieux','🙂 Un peu','😶 Pas vraiment','🏝️ Non — seul(e) avec ça']},
  {q:'🌱 Tu as l\'impression de grandir ces derniers temps ?',opts:['📈 Oui — je me sens évoluer','🤔 Un peu — doucement','😕 Non — je stagne','😔 Je régresse même']},
  {q:'🧘 Méditation, pleine conscience, respiration… tu pratiques ?',opts:['💆 Oui, régulièrement','🤔 Parfois','🙈 Rarement','❌ Jamais']},
  {q:'😔 Tu te sens souvent incompris(e) ?',opts:['😭 Oui souvent — c\'est douloureux','😟 Parfois','😐 Rarement','😊 Non — je me sens vu(e)']},
  {q:'🔄 Tu rumines souvent des choses passées ou futures ?',opts:['🌀 Oui, beaucoup','😬 Assez souvent','😐 Parfois','😌 Peu — je vis dans le présent']},
  {q:'💪 Tu crois en toi {m} ?',opts:['🌟 Pleinement','🙂 Plutôt oui, avec doutes','😶 Peu — j\'ai perdu confiance','❌ Non — je me sens nul(le)']},
  {q:'🎭 Tu joues un rôle pour les autres, différent de toi ?',opts:['😌 Non — je suis authentique','🤔 Un peu selon les contextes','😬 Souvent — je mets un masque','😔 Presque toujours']},
  {q:'🌸 Tu as une routine qui te fait du bien, rien que pour toi ?',opts:['💚 Oui — c\'est un pilier','🌱 Petite, mais elle existe','😶 Pas vraiment','❌ Non — j\'oublie de prendre soin de moi']},
  {q:'😤 Quand tu es en colère ou triste, tu fais quoi ?',opts:['💬 J\'en parle à quelqu\'un','✍️ J\'écris, je crée','🏃 Je bouge, je marche','🤐 Je ravale et fais comme si rien']},
  {q:'🌙 Tes nuits sont comment ?',opts:['😴 Bonnes — je récupère','😐 Correctes mais légères','😵 Agitées — pensées, réveils','💀 Mauvaises — je dors très peu']},
  {q:'🎯 Tu te sens capable d\'atteindre ce que tu veux ?',opts:['💪 Oui — j\'y crois fort','🙂 Plutôt — avec doutes','😕 Peu — obstacles immenses','😔 Non — je ne me crois plus capable']},
  {q:'💊 As-tu déjà consulté un psy / thérapeute ?',opts:['✅ Oui et ça m\'a aidé','🤔 J\'y ai pensé mais pas fait','💡 Non mais j\'en aurais besoin','❌ Non']},
  {q:'🌈 Tu te sens léger(ère) {m} ?',opts:['✨ Oui, vraiment','🙂 Un peu','😶 Pas vraiment','😔 Non, lourd(e)']},
  {q:'💌 Tu prends soin de toi comme tu prendrais soin de quelqu\'un que tu aimes ?',opts:['💗 Oui — je suis gentil(le) avec moi','🤔 Parfois','😬 Rarement','❌ Non — plus dur avec moi']},
  {q:'🔋 Ta réserve émotionnelle est à…',opts:['⚡ 80-100% — rechargé(e)','💛 50-79% — ça tient','🟠 20-49% — sous-régime','🔴 0-19% — vide total']},
  {q:'🌿 Tu as une passion qui te ressource vraiment ?',opts:['🎨 Oui — j\'en profite','🙂 Oui mais je la néglige','🤔 Je cherche encore','😶 Non — rien ne m\'anime vraiment']},
  {q:'🤝 Tu aurais besoin d\'aide professionnelle {m} ?',opts:['✅ Oui et j\'en ai déjà','🤔 Probablement — je l\'envisage','😶 Peut-être','❌ Non, je préfère gérer seul(e)']},
  {q:'💬 Ce que tu dirais à quelqu\'un qui traverse ce que tu traverses ?',opts:['"Tu es plus fort(e) que tu le penses 💪"','"Tu mérites de l\'aide 🤝"','"Un jour à la fois 🌱"','"T\'es pas seul(e) 💜"']},
  {q:'💜 Ce dont tu as le plus besoin {m} ?',opts:['🧘 Du calme et de l\'espace','🤗 Être entendu(e)','💡 Des pistes concrètes','🌟 Qu\'on me rappelle que ça va aller']}
],
amour:[
  {q:'💪 Face à un nouveau défi pro, ta première réaction…',opts:['🔥 Je fonce, je me sens capable','🙂 Ça va, je m\'adapte','😟 Je doute mais j\'avance quand même','😶 Je me sens paralysé(e) par le doute']},
  {q:'🪞 Quand tu penses à tes compétences pro…',opts:['💪 J\'en suis fier(ère)','🙂 Elles sont correctes','😕 J\'ai du mal à les voir','😔 Je les sous-estime toujours']},
  {q:'🗣️ Tu sais dire non quand une demande dépasse tes capacités ?',opts:['✅ Oui facilement','🙂 Oui, avec un effort','😬 Rarement','❌ Non — j\'ai peur de décevoir']},
  {q:'🏆 Tu es fier(ère) d\'un résultat pro {m} ?',opts:['💪 Oui, clairement','🙂 Un peu','😶 Pas vraiment','😔 Pas en ce moment']},
  {q:'🎭 Tu as l\'impression de "jouer un rôle" au travail, comme si on allait découvrir que t\'es pas à la hauteur ?',opts:['❌ Jamais — je suis légitime','🤔 Rarement','😟 Assez souvent','😔 En permanence']},
  {q:'💬 Quand on te complimente sur ton travail…',opts:['😊 Je l\'accepte simplement','🙂 Ça me touche mais je minimise','😬 Je me sens gêné(e)','❌ Je pense qu\'ils se trompent']},
  {q:'🤔 Tu doutes de ta légitimité dans ton domaine ?',opts:['❌ Non — je suis à ma place','🙂 Un peu, parfois','😟 Oui — souvent','😔 Constamment']},
  {q:'📣 Tu oses prendre la parole en réunion / donner ton avis ?',opts:['✅ Oui sans problème','🙂 Oui, en me forçant','😬 Rarement','❌ Non — je préfère me taire']},
  {q:'🧭 Face à une erreur, tu te dis…',opts:['"Ça arrive, j\'apprends 🌱"','"Je vais faire attention la prochaine fois"','"Je suis nul(le)…"','"Je le savais, je suis pas à la hauteur"']},
  {q:'🌱 Tu te compares souvent aux autres professionnellement ?',opts:['❌ Non — je suis sur mon chemin','🙂 Un peu, sans trop y penser','😟 Oui — assez souvent','😔 Constamment, et ça me ronge']},
  {q:'💼 Tu négocies (salaire, conditions) en pensant le mériter ?',opts:['✅ Oui, j\'ose demander','🙂 J\'essaie','😬 Difficilement','❌ Je n\'ose jamais demander']},
  {q:'🛡️ Une critique sur ton travail, tu la reçois comment ?',opts:['💚 Comme une info utile','🙂 Ça me touche un peu, puis ça passe','😟 Ça me marque longtemps','💥 Ça remet tout en question pour moi']},
  {q:'🎯 Tu te fixes des objectifs à ta hauteur ou toujours trop hauts ?',opts:['🎯 Ajustés, réalistes','🙂 Plutôt ambitieux mais ok','😬 Souvent trop hauts','😔 Toujours hors d\'atteinte — pour me prouver quelque chose']},
  {q:'🌟 Tu reconnais tes réussites ou tu minimises toujours ?',opts:['✨ Je les reconnais pleinement','🙂 Un peu, avec effort','😶 Je minimise souvent','❌ Je trouve toujours que "c\'était rien"']},
  {q:'🚪 Tu postules à des postes même si tu ne coches pas toutes les cases ?',opts:['✅ Oui — j\'ose tenter','🙂 Parfois, en hésitant','😬 Rarement','❌ Jamais — je me sens pas légitime']},
  {q:'🧠 Ta petite voix intérieure au travail est plutôt…',opts:['💚 Bienveillante et encourageante','🙂 Neutre','😟 Critique par moments','💔 Dure et sévère en permanence']},
  {q:'🤝 Tu demandes de l\'aide quand t\'en as besoin sans culpabiliser ?',opts:['😊 Oui facilement','🤔 Parfois — je me sens gêné(e)','😬 Difficilement','❌ Non — j\'ai peur que ça se voie']},
  {q:'📈 Tu te sens légitime pour évoluer / monter en responsabilité ?',opts:['✅ Oui — je le mérite','🙂 Je l\'espère','😶 J\'ai du mal à y croire','😔 Honnêtement… non']},
  {q:'😶 Tu te tais par peur du jugement même quand t\'as raison ?',opts:['❌ Non — je m\'exprime','🤔 Parfois','😟 Souvent','😔 Presque toujours']},
  {q:'💡 Une idée à toi qui a été reprise sans crédit, tu réagis…',opts:['🗣️ Je le signale calmement','🤔 Ça m\'agace mais je laisse passer','😶 Je rumine en silence','😔 Je me dis que c\'était pas grave, c\'était "juste" mon idée']},
  {q:'🌤️ Le matin avant une journée importante, tu te sens…',opts:['☀️ Confiant(e), prêt(e)','😐 Correct(e), sans plus','😟 Anxieux(se), je doute','🌧️ Vraiment angoissé(e)']},
  {q:'🔄 Après un échec pro, combien de temps avant de te relever ?',opts:['Rapidement — j\'apprends et j\'avance 🚀','Quelques jours 🌱','Longtemps — ça me marque 😕','Ça me hante encore aujourd\'hui 💔']},
  {q:'🪙 Tu penses mériter ton salaire / ta place actuelle ?',opts:['✅ Oui, clairement','🙂 Je crois que oui','😶 J\'ai des doutes','❌ Non — j\'ai l\'impression de ne pas être à la hauteur']},
  {q:'💭 Ce que tu te dis après une présentation/entretien…',opts:['"J\'ai fait du bon travail 💪"','"Ça s\'est plutôt bien passé"','"J\'aurais pu mieux faire…"','"J\'ai dû passer pour un imposteur"']},
  {q:'🔮 Dans 2 ans, ta confiance en toi pro sera…',opts:['💪 Solide, affirmée','🌱 Meilleure qu\'aujourd\'hui','😶 Je sais pas','😔 Probablement pareille — ça ne change jamais']}
]
};

/* Questions complémentaires pour le profil "Chercheur d'emploi", selon la situation :
   - chomage  : au chômage, sans activité du tout
   - precaire : en CDD, emploi saisonnier ou intérim (activité présente mais instable)
   Injectées dans Q_POOL.energie / Q_POOL.argent uniquement pour ce profil. */
var Q_POOL_DEMANDEUR={
  chomage:{
    energie:[
      {q:'🛏️ Tes journées sans rendez-vous ni obligation, ton réveil se passe comment ?',opts:['☀️ Je garde un rythme régulier','🙂 Plutôt régulier, avec des écarts','😕 Ça part dans tous les sens','😔 Je n\'ai plus vraiment de rythme']},
      {q:'📅 Une journée sans emploi, niveau structure, ça ressemble à quoi ?',opts:['🎯 J\'ai un planning, même léger','🙂 Quelques repères dans la journée','😶 Ça flotte, sans vrai cadre','😔 Le vide total, je sais pas quoi en faire']},
      {q:'🚪 Sortir de chez toi dans une journée sans obligation, ça se passe comment ?',opts:['😊 Facilement, je sors souvent','🙂 Je m\'y force et ça va','😬 Difficilement','❌ Je reste enfermé(e) la plupart du temps']},
      {q:'💭 Le silence d\'une journée sans contact professionnel, tu le vis comment ?',opts:['😌 Bien — j\'en profite','🙂 Ça va, sans plus','😟 Pesant — ça me ronge','😔 Très lourd — l\'isolement me pèse beaucoup']},
      {q:'🌅 Te lever sans devoir aller quelque part, c\'est plutôt…',opts:['☀️ Un confort, je gère mon temps','😐 Neutre','😕 Une perte de repères','🌧️ Une source d\'angoisse']},
      {q:'🎯 Tu te fixes des objectifs (même petits) pour structurer tes journées sans emploi ?',opts:['✅ Oui — chaque jour','🙂 Parfois','😶 Rarement','❌ Non — les journées se ressemblent toutes']},
      {q:'🕰️ Le temps libre en grande quantité, tu le vis comment ?',opts:['😌 Bien — je sais quoi en faire','🙂 Ça va, avec des hauts et des bas','😕 Pesant — trop de vide','😔 Angoissant — je ne sais pas le remplir']},
      {q:'💤 Tes heures de sommeil ont changé depuis que tu es sans emploi ?',opts:['❌ Non, rythme stable','🙂 Un peu décalées','😬 Beaucoup — je dors n\'importe quand','😔 Complètement déréglées']},
      {q:'🎯 Te motiver à faire des démarches un jour sans obligation extérieure, ça se passe comment ?',opts:['✅ Bien — je m\'auto-discipline','🙂 Ça va, avec un effort','😬 Difficilement','❌ Très mal — rien ne m\'y pousse']},
      {q:'🤝 Tu gardes le contact avec d\'anciens collègues ou ton réseau pro ?',opts:['✅ Oui, régulièrement','🙂 De temps en temps','😶 Rarement','❌ Non — plus aucun lien']}
    ],
    argent:[
      {q:'💸 Ton allocation / aide actuelle couvre tes besoins de base ?',opts:['✅ Oui, largement','🙂 Oui, en faisant attention','😟 Difficilement','😔 Non — c\'est juste']},
      {q:'📉 Le compte à rebours sur tes droits (ARE, RSA…), tu y penses souvent ?',opts:['❌ Non — j\'ai de la marge','🙂 De temps en temps','😟 Oui — ça me stresse','😔 Constamment — c\'est une angoisse de fond']},
      {q:'🧾 Tu arrives à anticiper tes dépenses du mois sans revenu fixe d\'emploi ?',opts:['✅ Oui, j\'ai un budget clair','🙂 À peu près','😬 Difficilement','❌ Non — je découvre au fur et à mesure']},
      {q:'😰 L\'incertitude de ne pas savoir quand un revenu va rentrer, ça pèse comment ?',opts:['😌 Peu — je gère','🙂 Un peu','😟 Beaucoup','💔 Énormément — c\'est ma plus grande source de stress']},
      {q:'🆘 Tu as déjà eu besoin d\'une aide financière extérieure (famille, CAF, association) ?',opts:['❌ Non, pas eu besoin','🙂 Une fois, ponctuellement','😟 Oui, régulièrement','😔 Oui — et ça me pèse de devoir demander']},
      {q:'🧮 Tu as un budget précis pour cette période sans revenu d\'emploi ?',opts:['✅ Oui, calculé au mois près','🙂 Approximativement','😬 Non, j\'avance sans vraiment compter','😔 Non — et l\'angoisse monte']},
      {q:'🏠 Le loyer / les charges fixes, tu arrives à les couvrir sereinement ?',opts:['✅ Oui, sans souci','🙂 Oui, en faisant attention','😟 Difficilement','😔 Non — c\'est la plus grosse angoisse']},
      {q:'🛒 Tu as dû réduire des dépenses essentielles (nourriture, santé) depuis que tu es sans emploi ?',opts:['❌ Non, pas besoin','🙂 Un peu, sur le superflu','😟 Oui, sur des choses importantes','😔 Oui, et ça m\'inquiète pour ma santé']},
      {q:'📋 Tu as fait le point sur toutes les aides auxquelles tu as droit (RSA, APL, CSS…) ?',opts:['✅ Oui, tout est à jour','🙂 Partiellement','😶 Pas vraiment','❌ Non — je ne sais pas par où commencer']},
      {q:'💭 L\'argent qui manque t\'empêche de faire quoi en ce moment ?',opts:['🎯 Rien — je gère','🚌 Me déplacer pour des entretiens','👔 M\'habiller / me présenter correctement','🍽️ Manger sereinement']}
    ],
    mental:[
      {q:'🧠 Être sans emploi affecte ton image de toi-même comment ?',opts:['❌ Peu — je sais que c\'est temporaire','🙂 Un peu, par moments','😟 Beaucoup — ça me ronge','😔 Énormément — j\'ai l\'impression de ne plus valoir grand-chose']},
      {q:'😟 Tu culpabilises de ne pas avoir d\'activité en ce moment ?',opts:['❌ Non, pas du tout','🙂 Un peu, parfois','😟 Oui, souvent','😔 Oui, constamment']},
      {q:'🗣️ Le regard des autres sur le fait d\'être sans emploi, tu le sens comment ?',opts:['😌 Indifférent — ça ne m\'atteint pas','🙂 Léger, supportable','😟 Pesant','💔 Très lourd à porter']},
      {q:'🔄 Tu rumines des pensées négatives sur ta situation actuelle ?',opts:['❌ Peu — je reste positif(ve)','🙂 Parfois','😟 Souvent','😔 Constamment']},
      {q:'💪 Tu crois encore que tu vas retrouver une activité qui te convient ?',opts:['✅ Oui, fermement','🙂 Oui, mais le doute revient','😶 J\'ai du mal à y croire','😔 Non, je n\'y crois plus']},
      {q:'🌧️ Le sentiment d\'inutilité, tu le ressens à quel point en ce moment ?',opts:['❌ Pas du tout','🙂 Un peu','😟 Souvent','😔 En permanence']},
      {q:'🤝 Tu te sens soutenu(e) par ton entourage dans cette période sans emploi ?',opts:['💚 Oui, vraiment','🙂 Plutôt oui','😶 Peu','😔 Non — je me sens seul(e) avec ça']},
      {q:'🌱 Tu arrives à voir cette période comme une transition plutôt qu\'un échec ?',opts:['✅ Oui, clairement','🙂 J\'essaie','😶 Difficilement','❌ Non — je le vis comme un échec']}
    ],
    amour:[
      {q:'💼 Sans poste actuellement, tu te sens toujours légitime professionnellement ?',opts:['✅ Oui, ma valeur ne dépend pas de mon statut','🙂 Globalement oui','😟 De moins en moins','😔 Non — je doute de ma valeur']},
      {q:'🪞 Comment tu décrirais ton parcours à un recruteur en ce moment ?',opts:['💪 Avec assurance, je valorise mon parcours','🙂 Correctement, avec un peu de gêne','😟 Avec difficulté, je minimise','😔 Je n\'ose presque pas en parler']},
      {q:'🎯 Face à un entretien ou un contact pro, ta confiance est à…',opts:['🔥 Haute — je me sens prêt(e)','🙂 Correcte','😟 Basse — le doute domine','😔 Très basse — j\'appréhende énormément']},
      {q:'💬 Tu te sens jugé(e) quand tu expliques ta situation actuelle ?',opts:['❌ Non, j\'assume sereinement','🙂 Un peu, parfois','😟 Oui, souvent','😔 Oui, et ça m\'empêche d\'en parler']},
      {q:'🌟 Tu reconnais ce que cette période t\'apprend sur toi-même ?',opts:['✅ Oui, clairement','🙂 Un peu','😶 Pas vraiment','❌ Non, je ne vois que le négatif']},
      {q:'🚪 Tu oses encore postuler à des postes ambitieux malgré la situation ?',opts:['✅ Oui, sans hésiter','🙂 Oui, en me forçant un peu','😬 Rarement','❌ Non — je vise plus bas par peur']},
      {q:'🧠 La voix intérieure qui commente ta recherche d\'emploi est plutôt…',opts:['💚 Encourageante','🙂 Neutre','😟 Critique','💔 Très dure']},
      {q:'🔮 Tu penses que cette période va finir par jouer en ta faveur ?',opts:['✅ Oui, j\'en suis convaincu(e)','🙂 Je veux y croire','😶 Je ne sais pas','😔 Non, j\'ai peur que ça desserve mon profil']}
    ]
  },
  precaire:{
    energie:[
      {q:'🔄 Jongler entre tes missions / contrats, ça use ton énergie comment ?',opts:['💪 Peu — je m\'organise bien','🙂 Un peu, ça va','😟 Beaucoup — c\'est fatigant','😵 Énormément — je suis épuisé(e) par les allers-retours']},
      {q:'📆 Tu sais à peu près ce que tu feras niveau boulot dans 1 mois ?',opts:['✅ Oui, plutôt clair','🙂 Une idée approximative','😶 Pas vraiment','❌ Aucune visibilité']},
      {q:'⏳ La fin d\'un contrat qui approche, tu le vis comment ?',opts:['😌 Sereinement — j\'ai des pistes','🙂 Ça va, je gère','😟 Avec appréhension','😰 Avec beaucoup d\'angoisse']},
      {q:'🧩 Organiser ta vie avec un planning qui change souvent, ça se passe comment ?',opts:['✅ Bien — je m\'adapte facilement','🙂 Correctement','😬 Difficilement','❌ C\'est très compliqué à vivre']},
      {q:'🌀 L\'incertitude sur la suite (prochaine mission, prochain contrat), elle pèse sur ton énergie au quotidien ?',opts:['❌ Peu — je vis au jour le jour sereinement','🙂 Un peu','😟 Beaucoup','💔 Énormément']},
      {q:'🧳 Changer souvent d\'environnement de travail (missions, lieux), ça use ton énergie ?',opts:['❌ Peu — je m\'adapte vite','🙂 Un peu','😟 Beaucoup','😵 Énormément']},
      {q:'🕰️ Entre deux missions, tu gères ton temps comment ?',opts:['✅ Bien — je structure ces moments','🙂 Correctement','😬 Difficilement','❌ Je flotte, sans repères']},
      {q:'📞 Devoir rester disponible/joignable pour de nouvelles missions, ça pèse comment ?',opts:['❌ Peu — ça ne me dérange pas','🙂 Un peu','😟 Beaucoup','😔 Énormément — je ne décroche jamais vraiment']},
      {q:'💪 Recommencer à zéro (nouvelle équipe, nouveau poste) à chaque mission, ça use comment ?',opts:['❌ Peu — j\'aime la nouveauté','🙂 Un peu, mais ça va','😟 Beaucoup, c\'est fatigant','😵 Énormément, je suis épuisé(e) de tout recommencer']},
      {q:'🌅 Les jours sans mission en cours, ton énergie est plutôt…',opts:['☀️ Bonne — j\'en profite pour souffler','😐 Neutre','😟 Basse — l\'incertitude pèse','😔 Très basse — l\'angoisse domine']}
    ],
    argent:[
      {q:'💰 Tes revenus varient d\'un mois à l\'autre — tu gères ça comment ?',opts:['✅ Bien — j\'ai un coussin de sécurité','🙂 Correctement','😬 Difficilement','❌ Très mal — chaque creux est une crise']},
      {q:'🧱 Pendant les périodes actives, tu arrives à mettre de côté pour les creux ?',opts:['✅ Oui, systématiquement','🙂 Un peu, quand je peux','😶 Rarement','❌ Non — tout part dans les dépenses courantes']},
      {q:'📉 La fin d\'une mission qui approche, niveau finances, ça inquiète comment ?',opts:['😌 Peu — j\'ai de la marge','🙂 Un peu','😟 Beaucoup','💔 Énormément — c\'est une angoisse récurrente']},
      {q:'🔁 Le manque de visibilité sur tes revenus futurs, tu le vis comment ?',opts:['😌 Je m\'y suis fait — ça va','🙂 Ça va, avec des hauts et des bas','😟 C\'est pesant','😔 C\'est épuisant mentalement']},
      {q:'🧾 Tes droits entre deux contrats (chômage, indemnités), tu les connais bien ?',opts:['✅ Oui, je maîtrise bien','🙂 Globalement oui','😶 Pas vraiment','❌ Non — c\'est flou et ça m\'angoisse']},
      {q:'🧮 Tu sais calculer/anticiper combien tu vas réellement toucher ce mois-ci ?',opts:['✅ Oui, précisément','🙂 Approximativement','😬 Difficilement','❌ Non — c\'est flou jusqu\'au bout']},
      {q:'📑 Tu factures / déclares tes missions sans retard ni stress ?',opts:['✅ Oui, c\'est cadré','🙂 Globalement oui','😟 Souvent en retard','😔 C\'est le chaos administratif']},
      {q:'💳 Un imprévu financier (panne, santé) te mettrait en difficulté en ce moment ?',opts:['❌ Non, j\'ai de la marge','🙂 Ça passerait, en serrant les dents','😟 Oui, ce serait compliqué','😔 Oui, ce serait une vraie crise']},
      {q:'🏦 Tu arrives à anticiper les périodes sans mission financièrement ?',opts:['✅ Oui, j\'ai un matelas dédié','🙂 Un peu','😬 Pas vraiment','❌ Non — chaque creux me prend de court']},
      {q:'📋 Tu connais bien tes droits au chômage entre deux contrats courts ?',opts:['✅ Oui, parfaitement','🙂 Globalement','😶 Vaguement','❌ Non, c\'est flou et ça m\'angoisse']}
    ],
    mental:[
      {q:'🧠 L\'instabilité de ton statut affecte ton moral comment ?',opts:['❌ Peu — je le vis bien','🙂 Un peu','😟 Beaucoup','😔 Énormément']},
      {q:'😟 Tu angoisses à l\'idée qu\'une mission ne soit pas reconduite ?',opts:['❌ Non, je relativise','🙂 Un peu','😟 Oui, souvent','😔 Oui, constamment']},
      {q:'🗣️ Tu te sens considéré(e) comme "à part" par les équipes en CDI où tu interviens ?',opts:['❌ Non, je me sens intégré(e)','🙂 Un peu, parfois','😟 Oui, souvent','😔 Oui, et ça pèse beaucoup']},
      {q:'🔄 Tu rumines sur ce que sera ta prochaine mission ou contrat ?',opts:['❌ Peu — je vis au présent','🙂 Parfois','😟 Souvent','😔 Constamment']},
      {q:'💪 Tu crois que cette précarité va finir par se stabiliser ?',opts:['✅ Oui, fermement','🙂 Je l\'espère','😶 J\'ai du mal à y croire','😔 Non, je n\'y crois plus vraiment']},
      {q:'🌧️ Le manque de stabilité te fatigue mentalement à quel point ?',opts:['❌ Peu','🙂 Un peu','😟 Beaucoup','😔 Énormément']},
      {q:'🤝 Tu te sens soutenu(e) par ton entourage face à cette précarité ?',opts:['💚 Oui, vraiment','🙂 Plutôt oui','😶 Peu','😔 Non — je me sens seul(e) avec ça']},
      {q:'🌱 Tu arrives à voir cette flexibilité comme un choix plutôt qu\'une contrainte subie ?',opts:['✅ Oui, clairement','🙂 Par moments','😶 Difficilement','❌ Non — je la subis complètement']}
    ],
    amour:[
      {q:'💼 Changer souvent de poste/mission, tu te sens toujours légitime à chaque nouvelle arrivée ?',opts:['✅ Oui, je m\'impose vite','🙂 Globalement oui','😟 De moins en moins','😔 Non — je dois tout reprouver à chaque fois']},
      {q:'🪞 Tu valorises ton parcours varié (missions multiples) comme une force ?',opts:['💪 Oui, c\'est un atout que j\'assume','🙂 Plutôt oui','😟 Difficilement','😔 Non — je le vis comme un manque de stabilité qui me dévalorise']},
      {q:'🎯 Face à une négociation de mission/contrat, ta confiance est à…',opts:['🔥 Haute — j\'ose négocier','🙂 Correcte','😟 Basse — je prends ce qu\'on me propose','😔 Très basse — je n\'ose jamais demander plus']},
      {q:'💬 Tu te sens jugé(e) sur ton statut précaire par ton entourage ou des recruteurs ?',opts:['❌ Non, j\'assume sereinement','🙂 Un peu, parfois','😟 Oui, souvent','😔 Oui, et ça m\'empêche d\'en parler']},
      {q:'🌟 Tu reconnais les compétences que cette diversité de missions t\'a apportées ?',opts:['✅ Oui, clairement','🙂 Un peu','😶 Pas vraiment','❌ Non, je ne vois que l\'instabilité']},
      {q:'🚪 Tu oses viser un CDI ou une mission plus ambitieuse malgré l\'incertitude ?',opts:['✅ Oui, sans hésiter','🙂 Oui, en me forçant un peu','😬 Rarement','❌ Non — je vise plus bas par sécurité']},
      {q:'🧠 La voix intérieure qui commente ta situation précaire est plutôt…',opts:['💚 Encourageante','🙂 Neutre','😟 Critique','💔 Très dure']},
      {q:'🔮 Tu penses que cette expérience variée va jouer en ta faveur à terme ?',opts:['✅ Oui, j\'en suis convaincu(e)','🙂 Je veux y croire','😶 Je ne sais pas','😔 Non, j\'ai peur que ça desserve mon profil']}
    ]
  }
};

// Questions complémentaires selon le moment de la journée choisi par l'utilisateur
// (matin / après-midi / soir) — injectées dans Q_POOL.energie et Q_POOL.mental.
var Q_POOL_MOMENT={
  matin:{
    energie:[
      {q:'🌅 Ce matin, en ouvrant les yeux, ta première pensée était plutôt…',opts:['☀️ Positive, j\'ai hâte','😐 Neutre, sans plus','😕 Un peu lourde','😔 J\'aurais préféré rester au lit']},
      {q:'🔋 Pour attaquer ta journée, ton énergie de départ est à…',opts:['⚡ Pleine — prêt(e) à tout','🔋 Correcte — ça va aller','🪫 Basse — je vais devoir pousser','💀 Vide avant même de commencer']},
      {q:'🎯 Ta motivation pour les démarches / le travail d\'aujourd\'hui ?',opts:['🔥 Forte — je suis motivé(e)','🙂 Présente, sans plus','😟 Faible — je me force','😔 Absente']},
      {q:'☀️ Comment tu démarres concrètement ta journée (routine du matin) ?',opts:['✅ Avec un rituel qui me fait du bien','🙂 Plus ou moins','😶 Sans vraie routine','❌ Dans la précipitation, le stress']},
      {q:'🚿 Ta routine du matin (douche, petit-déj, préparation), tu la vis comment aujourd\'hui ?',opts:['😌 Sereinement, sans stress','🙂 Correctement','😬 Dans la précipitation','❌ Je l\'ai zappée, pas le temps']},
      {q:'⏰ Le réveil ce matin, niveau facilité ?',opts:['☀️ Facile, j\'étais prêt(e)','🙂 Correct','😴 Difficile, plusieurs sonneries','💀 Très difficile, je me traîne']},
      {q:'🎯 Tu as une idée claire de ta priorité du jour ?',opts:['✅ Oui, très claire','🙂 Une idée générale','😶 Pas vraiment','❌ Aucune — je navigue à vue']}
    ],
    mental:[
      {q:'🧠 Ce matin, ta tête est plutôt…',opts:['☀️ Claire, posée','😐 Neutre','🌀 Déjà encombrée de pensées','😰 Anxieuse dès le réveil']},
      {q:'💭 La première chose à laquelle tu penses en te réveillant ?',opts:['🌱 Quelque chose de positif','😐 Le programme du jour, sans plus','😟 Une inquiétude','😔 Un poids, une angoisse']},
      {q:'🌤️ Tu te sens prêt(e) à affronter ce que la journée te réserve ?',opts:['✅ Oui, je me sens solide','🙂 Plutôt oui','😬 Pas vraiment','❌ Non, je redoute la journée']},
      {q:'😮‍💨 Une appréhension précise pour aujourd\'hui ?',opts:['❌ Non, je suis serein(e)','🙂 Une petite','😟 Oui, ça m\'occupe l\'esprit','😔 Oui, et ça me pèse déjà']},
      {q:'🧘 Tu as pris un moment pour toi avant de commencer ta journée ?',opts:['✅ Oui, même bref','🙂 Un minimum','😶 Non, pas eu le temps','❌ Non, direct dans le rush']},
      {q:'💭 Ce matin, tu te sens plutôt orienté(e) vers…',opts:['🎯 L\'action, faire avancer les choses','🌱 La réflexion, prendre du recul','😟 La gestion du stress','😔 Juste tenir le coup']}
    ]
  },
  apresmidi:{
    energie:[
      {q:'🔋 Là, en cours de journée, ton énergie est à…',opts:['⚡ Toujours haute','🔋 Ça tient','🪫 En train de redescendre','💀 Complètement à plat']},
      {q:'☕ Le coup de barre de l\'après-midi, tu le sens comment aujourd\'hui ?',opts:['😌 Pas vraiment, ça va','🙂 Un peu, gérable','😓 Fort, je lutte','💤 Je suis épuisé(e)']},
      {q:'🎯 Depuis ce matin, tu as avancé sur ce qui compte ?',opts:['✅ Oui, bien avancé','🙂 Un peu','😶 Pas vraiment','❌ Non, la journée m\'a échappé']},
      {q:'🍽️ Après le déjeuner, ton énergie repart comment ?',opts:['⚡ Bien, je reste efficace','🙂 Correctement','😴 Difficilement, somnolence','💀 Très mal, coup de barre fort']},
      {q:'🎯 Tu tiens le rythme que tu t\'étais fixé pour aujourd\'hui ?',opts:['✅ Oui, complètement','🙂 À peu près','😬 Difficilement','❌ Non, largué(e)']},
      {q:'💪 Pour la suite de la journée, ton énergie restante est à…',opts:['⚡ Bien remplie','🔋 Correcte','🪫 Faible','💀 Quasi vide']}
    ],
    mental:[
      {q:'🧠 Ta concentration depuis ce matin ?',opts:['☀️ Bonne, je tiens le fil','🙂 Correcte','🌀 Ça décroche souvent','😵 Dispersée, difficile']},
      {q:'💭 Ce qui occupe ton esprit à ce moment de la journée ?',opts:['🌱 Ce que j\'ai à faire, sereinement','😐 Plein de choses, sans ordre','😟 Une inquiétude qui revient','😔 Quelque chose qui me pèse depuis ce matin']},
      {q:'😤 Un agacement ou une frustration accumulée depuis ce matin ?',opts:['❌ Non, tout va bien','🙂 Un peu','😟 Oui, ça monte','😔 Oui, beaucoup']},
      {q:'🧠 Ta capacité à prendre des décisions à ce moment de la journée ?',opts:['✅ Bonne, l\'esprit clair','🙂 Correcte','😬 Difficile, je tergiverse','❌ Faible, je n\'arrive pas à trancher']},
      {q:'🌤️ Comparé à ce matin, ton état mental a évolué comment ?',opts:['📈 Mieux qu\'au réveil','😐 Pareil','📉 Un peu moins bien','😔 Beaucoup moins bien']}
    ]
  },
  soir:{
    energie:[
      {q:'🌙 En repensant à ta journée, ton énergie globale aujourd\'hui ?',opts:['⚡ Je termine en forme','🔋 Fatigué(e) mais content(e)','🪫 Vidé(e)','💀 Complètement épuisé(e)']},
      {q:'✅ Tu as l\'impression d\'avoir avancé sur ce qui comptait aujourd\'hui ?',opts:['✅ Oui, vraiment','🙂 Un peu','😶 Pas trop','❌ Non, journée perdue']},
      {q:'🛌 Ce soir, ton corps te réclame surtout…',opts:['😌 Du repos mérité','🤗 Du temps avec des proches','📚 De la déconnexion','😴 De dormir, juste dormir']},
      {q:'🍽️ Après cette journée, l\'idée de préparer / manger un repas, c\'est…',opts:['😌 Facile, j\'ai encore de l\'énergie','🙂 Ça va, un effort','😓 Difficile, je suis vidé(e)','💀 Impossible, je n\'ai plus rien']},
      {q:'📵 Ta capacité à déconnecter du travail / des démarches ce soir ?',opts:['✅ Bonne, je coupe facilement','🙂 Correcte','😬 Difficile, ça continue de tourner','❌ Impossible, je n\'arrête jamais vraiment']},
      {q:'🌙 Niveau fatigue physique en cette fin de journée ?',opts:['😌 Légère, gérable','🙂 Normale','😓 Forte','💀 Épuisement total']}
    ],
    mental:[
      {q:'🧠 En repensant à ta journée, ta tête est plutôt…',opts:['☀️ Apaisée','😐 Neutre','🌀 Encore en ébullition','😰 Anxieuse pour demain']},
      {q:'💭 Ce qui te reste en tête de cette journée ?',opts:['🌱 Quelque chose de positif','😐 Le programme accompli, sans plus','😟 Une inquiétude qui traîne','😔 Un poids que je porte encore']},
      {q:'🌙 Tu arriveras à lâcher ta journée pour bien dormir ce soir ?',opts:['✅ Oui, je sais décrocher','🙂 Probablement','😬 J\'ai des doutes','❌ Non, ça va tourner en boucle']},
      {q:'😤 Une frustration de la journée qui te reste en tête ce soir ?',opts:['❌ Non, rien de notable','🙂 Une petite chose','😟 Oui, ça m\'occupe','😔 Oui, et ça pèse lourd']},
      {q:'🌟 Le moment le plus positif de ta journée, tu arrives à l\'identifier ?',opts:['✅ Oui, facilement','🙂 Oui, en cherchant un peu','😶 Difficilement','❌ Non, rien ne ressort']},
      {q:'🧘 Tu te sens capable de tourner la page sur cette journée pour ce soir ?',opts:['✅ Oui, facilement','🙂 Avec un peu d\'effort','😬 Difficilement','❌ Non, je vais y repenser toute la soirée']}
    ]
  }
};

// Convertit la clé EB.moment ('matin'/'apresmidi'/'soir') en formule pour {m}
function ebMomentPhrase(){
  return EB.moment==='matin'?'ce matin':EB.moment==='apresmidi'?'cet après-midi':EB.moment==='soir'?'ce soir':'en ce moment';
}

// Construit le pool de questions pour un thème en pondérant fortement
// vers le contenu CIBLÉ (situation "chercheur d'emploi" + moment de la journée,
// croisés ensemble) plutôt que le contenu générique.
// Cible : ~80% ciblé / ~20% générique — plafonné à ce qui est réellement
// disponible pour ne jamais répéter une question dans la même session.
// Structure inchangée : toujours mélangé, jamais les mêmes questions ni le même résultat.
function ebBuildPool(theme){
  var TOTAL=EB.nb||15;
  var generic=Q_POOL[theme].slice();
  var targeted=[];
  if(EB.profil==='demandeur' && EB.subProfil && Q_POOL_DEMANDEUR[EB.subProfil] && Q_POOL_DEMANDEUR[EB.subProfil][theme]){
    targeted=targeted.concat(Q_POOL_DEMANDEUR[EB.subProfil][theme]);
  }
  if(EB.moment && Q_POOL_MOMENT[EB.moment] && Q_POOL_MOMENT[EB.moment][theme]){
    targeted=targeted.concat(Q_POOL_MOMENT[EB.moment][theme]);
  }
  var targetCount=Math.min(targeted.length,Math.round(TOTAL*0.8));
  var picked=shuffle(targeted).slice(0,targetCount);
  var genericNeeded=TOTAL-picked.length;
  picked=picked.concat(shuffle(generic).slice(0,genericNeeded));
  return shuffle(picked);
}

var EVA_REACTIONS={
  validation:['Merci de me faire confiance avec ça. 💜','Je t\'entends vraiment. Ce que tu ressens est légitime.','Ça compte, ce que tu me partages là. 🌸','Tu as du courage de mettre des mots sur ça.','Je suis là. Continue, je t\'écoute. ✨','Tu n\'es pas seul(e) dans ça. On avance ensemble.','C\'est important ce que tu viens de dire. Je le retiens.','Wow, tu es vraiment honnête avec toi-même. C\'est rare et précieux. 🌟'],
  encourage:['Tu avances mieux que tu ne le penses. 💪','Chaque mot que tu partages, c\'est un pas vers toi-même. 🌱','Tu mérites tellement plus que ce que tu t\'accordes.','Tu es plus fort(e) que cette situation. Vraiment.','Ce que tu traverses forge quelque chose en toi. 🔥','Les gens qui questionnent leur vie comme toi changent la leur.','Tu te bats déjà pour toi — c\'est énorme. 🌟','Continue. Le simple fait d\'être là dit tout. 💜'],
  console:['C\'est lourd à porter. Tu mérites qu\'on te le dise. 💜','Tout ça fait beaucoup. Et pourtant tu es là, debout. 🌸','Ce que tu ressens est réel. Ne minimise pas ça.','Reconnaître que c\'est difficile, c\'est déjà un acte de courage.','Tu n\'as pas à être fort(e) tout le temps. Pas avec moi. 💜','C\'est normal de traverser des périodes difficiles. Ça ne te définit pas.','Je voudrais que tu saches : ça va aller. Pas parfaitement, mais ça va aller. 🌱']
};
function getReaction(type){var pool=EVA_REACTIONS[type]||EVA_REACTIONS.validation;return pool[Math.floor(Math.random()*pool.length)];}

var CONCLUSIONS={
energie:{
rouge:{
  analyse:"Aujourd'hui ton énergie est dans le rouge — et c'est important de l'entendre sans te juger. 💜 Ce n'est pas de la paresse, c'est ton corps et ta tête qui envoient un signal fort. Quand on est épuisé, la moindre chose coûte énormément — et c'est complètement normal. Tu as bien fait de faire ce bilan.",
  conseil:"Ce dont tu as besoin maintenant : <strong>ralentir sans culpabiliser.</strong> Identifie une seule chose non urgente que tu peux remettre à demain. Dors suffisamment — le sommeil est la première réparation. Mange quelque chose de chaud. Et si quelqu'un de confiance peut t'écouter aujourd'hui, appelle-le.",
  exercice:"🌿 Fais une seule chose bienveillante pour toi maintenant : une tisane, 5 min dehors, un appel à quelqu'un qui t'aime. Pas d'objectifs. Juste du soin.",
  lecon:'✨ "L\'énergie ne se force pas — elle se restaure, avec du temps, de la douceur et parfois de l\'aide."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Burnout" — Emily & Amelia Nagoski. Comprendre le cycle du stress et comment en sortir vraiment. Scientifique et accessible.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Choses à Savoir Santé" — Épisodes sur la fatigue chronique, le sommeil, l\'épuisement. Concret et vulgarisé.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'ameli.fr — Fiche officielle Assurance Maladie sur la fatigue et quand consulter. Simple et fiable.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@soigne_ta_tete sur Instagram — Contenu psycho-éducatif sérieux sur l\'épuisement et la santé mentale, en français.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'Si cet épuisement dure plus de 3 semaines : ton médecin traitant ou le médecin du travail (gratuit, confidentiel) peuvent t\'orienter. Ce n\'est pas une faiblesse.'}
  ]
},
orange:{
  analyse:"Ton énergie est modérée aujourd'hui — tu fonctionnes, mais ce n'est pas fluide. 🌤️ Il y a quelque chose qui consomme en arrière-plan. Peut-être une préoccupation, un manque de sommeil, ou une période chargée. Tu avances, et c'est déjà bien.",
  conseil:"Pour recharger en douceur : <strong>repère ce qui te vide le plus</strong> (une tâche, une relation, un contexte) et réduis-y ton exposition si possible. Ajoute une petite chose qui te ressource — même 20 minutes : une marche, de la musique, un appel à quelqu'un que tu aimes.",
  exercice:"🎵 20 minutes pour toi ce soir : musique, marche, lecture, bain. Sans téléphone. Juste recharger.",
  lecon:'✨ "Un moteur qui tourne à 60% a besoin d\'entretien, pas d\'accélération. Prends soin de lui."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Le cerveau peut tout réparer" — Dr Caroline Leaf. Neurosciences appliquées à la gestion de la fatigue mentale.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Huberman Lab" — Andrew Huberman, neuroscientifique. Protocoles concrets sur le sommeil et l\'énergie.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'psychologies.com — Articles sérieux sur la gestion de l\'énergie et la fatigue émotionnelle.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@le.cercle.psy sur Instagram — Psychologues qui partagent des conseils bien-être accessibles et fondés.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'Si la fatigue s\'accompagne de troubles du sommeil ou de perte d\'intérêt, une visite chez ton médecin traitant est toujours une bonne idée.'}
  ]
},
vert:{
  analyse:"Ton énergie est bien présente aujourd'hui ! 🌟 Tu es dans un état où les choses coulent plus naturellement — c'est une vraie ressource. Profites-en, et ancre ce qui crée cet état pour pouvoir y revenir.",
  conseil:"Capitalise sur cet élan : <strong>identifie ce qui contribue à ton bon état</strong> aujourd'hui (sommeil, alimentation, activité physique, qualité des interactions) et note-le. Utilise cette énergie pour avancer sur ce qui compte vraiment.",
  exercice:"⚡ Attaque ta tâche la plus importante maintenant — pas la plus urgente, la plus significative. 90 min de focus profond.",
  lecon:'✨ "L\'énergie est une ressource renouvelable — à condition de savoir ce qui la restaure chez toi."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Flow" — Mihaly Csikszentmihalyi. La psychologie de l\'expérience optimale et des états de performance.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Santé Mentale — Le Podcast" — Témoignages et conseils de pros pour entretenir son équilibre intérieur.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'who.int/fr/health-topics/mental-health — L\'OMS et ses ressources sur le bien-être mental.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@sport_et_sante_mentale — Communauté autour du lien entre activité physique, énergie et santé psychologique.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : un bilan de santé annuel est pris en charge par l\'Assurance Maladie. Même quand tout va bien.'}
  ]
}
},
argent:{
rouge:{
  analyse:"Le stress financier que tu vis est réel, lourd et épuisant. 💜 Ce n'est pas une question de mauvaise gestion — les situations difficiles arrivent, et elles usent profondément. Ce que tu ressens est une réaction normale à une situation difficile. Tu n'es pas seul(e) là-dedans.",
  conseil:"La première étape n'est pas de tout résoudre — c'est de <strong>clarifier ce qui pèse le plus.</strong> Prends une feuille : ce qui rentre, ce qui sort, ce qui est urgent. Rien d'autre. La clarté réduit l'angoisse. Ensuite, identifie une seule aide possible cette semaine.",
  exercice:"📊 Ce soir : ouvre mes-aides.gouv.fr et fais la simulation de tes droits. 5 minutes qui peuvent tout changer.",
  lecon:'✨ "Une situation financière difficile n\'est pas un jugement sur ta valeur — c\'est un contexte à traverser, avec les bons outils."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Reprendre le contrôle de son argent" — Dorothée Pineau. Guide bienveillant pour sortir des situations tendues.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Héritage" — Finance personnelle accessible. Épisodes sur les aides sociales, droits et gestion de crise.'},
    {ico:'🌐',tag:'SITE OFFICIEL',col:'#059669',txt:'mes-aides.gouv.fr — Simulateur officiel gratuit de toutes les aides auxquelles tu as droit (RSA, APL, prime d\'activité...).'},
    {ico:'📱',tag:'RÉSEAU AIDE',col:'#1e3a5f',txt:'@mes_droits_sociaux — Compte qui explique simplement les droits sociaux en France : CAF, CPAM, France Travail, CCAS.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : le CCAS de ta mairie propose des aides d\'urgence. En cas de stress financier lié au travail, l\'Inspection du Travail (0800 67 10 33 gratuit) peut t\'orienter.'}
  ]
},
orange:{
  analyse:"Ta situation financière est tendue mais tu t'en sors. 🌤️ Cet équilibre fragile demande de l'énergie mentale en permanence — et ça use, même silencieusement. Tu gères, mais peut-être à un coût trop élevé. C'est important de le reconnaître.",
  conseil:"Pour desserrer la pression : <strong>identifie une fuite ou dépense non-essentielle</strong> que tu peux ajuster cette semaine. Pas pour te priver, mais pour te redonner un peu de marge. Vérifie aussi si tu perçois toutes les aides auxquelles tu as droit.",
  exercice:"💰 Ce soir : fais le tour de tes abonnements et dépenses récurrentes. Lesquels peux-tu suspendre temporairement ?",
  lecon:'✨ "Maîtriser son argent ne commence pas par gagner plus — ça commence par voir clairement ce qu\'on a."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"L\'Homme le plus riche de Babylone" — George Clason. Principes simples pour reprendre le contrôle financier.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Parlons Budget" — Finance personnelle pratique au quotidien, sans jargon.'},
    {ico:'🌐',tag:'SITE OFFICIEL',col:'#059669',txt:'caf.fr — Simulateur Prime d\'Activité, APL, allocations. 5 minutes pour savoir à quoi tu as droit.'},
    {ico:'📱',tag:'RÉSEAU AIDE',col:'#1e3a5f',txt:'@argent_et_sante_mentale — Le lien entre finances et bien-être psychologique, expliqué avec bienveillance.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : la CSS (Complémentaire Santé Solidaire) réduit fortement le coût des soins si tes revenus sont modérés. L\'URSSAF propose des délais de paiement si tu es indépendant(e).'}
  ]
},
vert:{
  analyse:"Ta situation financière est sereine aujourd'hui. 🌟 C'est une vraie base de stabilité — elle libère de l'énergie mentale pour le reste. Profites-en, et consolide ce qui fonctionne.",
  conseil:"Pour aller plus loin : <strong>sécurise ce qui est bien en place.</strong> Une épargne de précaution (3 mois de charges), une mutuelle adaptée, une projection sur tes droits à la retraite. Ce n'est pas luxueux — c'est prudent.",
  exercice:"📈 Ce week-end : simule ta future retraite sur info-retraite.fr. Même 10 minutes ouvrent des perspectives importantes.",
  lecon:'✨ "La sérénité financière n\'est pas la richesse — c\'est la clarté sur ce qu\'on a et la confiance dans ce qui vient."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"L\'investisseur intelligent" — Benjamin Graham (version abrégée). La référence pour faire fructifier ce qu\'on a.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Zack en argent" — Finance personnelle, épargne, investissement. Vulgarisé et en français.'},
    {ico:'🌐',tag:'SITE OFFICIEL',col:'#059669',txt:'info-retraite.fr — Simulation officielle et gratuite de ta future retraite. Vérifie tes droits acquis.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ FINANCIÈRE',col:'#1e3a5f',txt:'@nathalie_finance — Conseils budgétaires accessibles et bienveillants, pour tous les profils.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : le CSE de ton entreprise propose souvent des avantages méconnus (chèques vacances, aides logement). Action Logement (actionlogement.fr) aide les salariés du privé.'}
  ]
}
},
mental:{
rouge:{
  analyse:"Ce que tu portes mentalement aujourd'hui est lourd. 💜 Ce n'est pas exagéré, ce n'est pas de la sensiblerie — c'est ton état réel, et il mérite d'être pris au sérieux. Avoir répondu à ces questions honnêtement, c'est déjà un acte de courage.",
  conseil:"Ce dont tu as besoin maintenant : <strong>être entendu(e) par quelqu'un de bienveillant.</strong> Un ami de confiance, un proche, ou un professionnel. Ne reste pas seul(e) avec ça. Si les pensées sont très lourdes, poser les mots — par écrit ou à voix haute — aide à désamorcer ce qui tourne.",
  exercice:"✍️ Pose 10 minutes. Écris ce qui te pèse le plus — même en vrac, même sans ordre. Le mettre en mots, c'est déjà le sortir un peu de toi.",
  lecon:'✨ "La santé mentale mérite la même attention que la santé physique. Consulter, c\'est agir, pas capituler."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Imparfaits, libres et heureux" — Christophe André. Psychiatre bienveillant sur l\'estime de soi et le chemin vers l\'équilibre.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"La Psy qui parle" — Florence Escaravage, psychologue. Santé mentale expliquée clairement et sans tabou.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'psycom.org — Portail national d\'information en santé mentale. Fiches pratiques, auto-évaluation, annuaire de soins.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@maptitsante sur Instagram — Psychologue qui démystifie la santé mentale avec humour et bienveillance.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : 3114 (Numéro National Prévention Suicide, 24h/24). MonPsy.sante.gouv.fr : 8 séances psy remboursées sur ordonnance. Tu n\'as pas à attendre d\'aller vraiment mal.'}
  ]
},
orange:{
  analyse:"Ton état mental est mitigé aujourd'hui — quelque chose pèse, même si tu fonctionnes. 🌤️ Cet entre-deux est souvent le plus difficile à gérer, parce qu'on se dit 'ça va assez bien' alors qu'en réalité quelque chose use. Tu as bien fait de le mettre en mots.",
  conseil:"Ce qui aide dans cet état : <strong>nommer ce qui pèse le plus précisément possible.</strong> Pas 'je ne vais pas bien' — mais 'c'est cette situation spécifique qui me prend de l'énergie'. Plus c'est précis, plus on peut agir. Ensuite, identifie une petite chose qui te fait du bien et fais-la aujourd'hui.",
  exercice:"✍️ Journaling 5 min ce soir : 'Ce qui m'a pesé / Ce qui m'a surpris en bien / Ce dont j'ai besoin demain.'",
  lecon:"✨ \"On n'a pas à attendre d'être à plat pour s'occuper de soi. Le milieu du chemin mérite aussi de l'attention.\"",
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Le pouvoir du moment présent" — Eckhart Tolle. Sortir des ruminations et retrouver un ancrage dans l\'instant.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Être et s\'épanouir" — Fabrice Midal. Philosophie pratique pour mieux traverser les périodes creuses.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'sante.fr/sante-mentale — Portail gouvernemental. Fiches sur l\'anxiété, le stress, les ressources disponibles.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@sante_mentale_france — Communauté et ressources officielles de Santé Mentale France. Fiable et bienveillant.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : si cet état dure plus de 2 semaines, parle-en à ton médecin — il peut t\'orienter vers MonPsy (remboursé). Le médecin du travail est aussi disponible si le contexte pro est en cause.'}
  ]
},
vert:{
  analyse:"Ton état mental est bon aujourd'hui. 🌟 Ta tête est relativement claire, tu te sens ancré(e). C'est un état précieux — pas toujours acquis. Prends le temps de remarquer ce qui contribue à cet équilibre.",
  conseil:"Pour entretenir cet état : <strong>identifie tes pratiques de fond</strong> qui maintiennent ton équilibre (sommeil, liens, sens dans ce que tu fais, temps pour toi). Renforce-les intentionnellement.",
  exercice:"🧘 Programme MBSR 8 semaines (Mindfulness-Based Stress Reduction) — cherche-le en ligne. Dès 10 min/jour quand on va bien, c'est le meilleur moment pour commencer.",
  lecon:"✨ \"Aller bien est un art à cultiver — pas un état qu'on a ou qu'on n'a pas.\"",
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Mindfulness" — Jon Kabat-Zinn. Programme MBSR, scientifiquement validé, pour ancrer un équilibre durable.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Huberman Lab" — Neurosciences : sommeil, stress, cognition, bien-être. L\'état de l\'art en podcast.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'who.int/fr — Section santé mentale de l\'OMS. Ressources mondiales sur la prévention et le bien-être.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@le_lab_psy — Psychologue chercheur. Contenu rigoureux sur les mécanismes de la santé mentale.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : même quand on va bien, un bilan de santé mentale préventif est possible chez son médecin. Connaître les ressources (MonPsy, 3114) avant d\'en avoir besoin est de l\'intelligence préventive.'}
  ]
}
},
amour:{
rouge:{
  analyse:"Ta confiance en toi est très fragilisée en ce moment. 💜 Le doute permanent, le sentiment de ne jamais être à la hauteur, la peur d'être 'démasqué(e)' — c'est épuisant, et ça peut freiner des décisions importantes pour ton avenir pro. Ce que tu vis a un nom : le syndrome de l'imposteur, et il touche énormément de gens compétents.",
  conseil:"Ce dont tu as besoin maintenant : <strong>séparer les faits de la peur.</strong> Liste 3 réussites concrètes (même petites) sans les minimiser. Le doute n'est pas une preuve d'incompétence — c'est souvent le signe que tu prends ton travail au sérieux. Si ce doute t'empêche d'avancer, en parler à un professionnel peut vraiment aider.",
  exercice:"💌 Liste de preuves : note 5 réussites pro, même minimes, avec ce qu'elles ont demandé de toi (compétence, courage, persévérance). Relis-la quand le doute revient.",
  lecon:'✨ "Le syndrome de l\'imposteur ne dit rien sur ta valeur réelle — il dit que tu te juges plus durement que personne ne te juge."',
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Le syndrome d\'imposture" — Élisabeth Cadoche & Anne de Montarlot. Comprendre et désamorcer ce mécanisme, en français.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Emotions" — Vidéos courtes sur la confiance en soi et les émotions au travail, accessibles et concrètes.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'sante.fr/sante-mentale — Portail gouvernemental. Fiches sur l\'anxiété, l\'estime de soi, les ressources disponibles.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@maptitsante sur Instagram — Psychologue qui démystifie la confiance en soi et la santé mentale avec bienveillance.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : MonPsy.sante.gouv.fr propose 8 séances psy remboursées sur ordonnance. Tu n\'as pas à attendre d\'aller vraiment mal pour consulter.'}
  ]
},
orange:{
  analyse:"Ta confiance en toi est en dents de scie. 🌤️ Tu avances, mais le doute revient souvent — surtout face à des situations nouvelles ou exposées. Cet entre-deux est fréquent : on fonctionne, mais une partie de l'énergie part à se rassurer soi-même plutôt qu'à avancer.",
  conseil:"Ce qui aide dans cet état : <strong>nommer précisément ce qui déclenche le doute.</strong> Pas 'je manque de confiance' — mais 'c'est dans telle situation précise que je doute le plus'. Plus c'est précis, plus tu peux préparer une réponse concrète (une phrase, un rappel de réussite passée).",
  exercice:"✍️ Journaling 5 min ce soir : 'Une situation où j'ai douté aujourd'hui / Ce que j'ai quand même réussi à faire malgré le doute / Une preuve de ma compétence.'",
  lecon:"✨ \"La confiance ne précède pas toujours l'action — souvent, c'est l'action qui construit la confiance.\"",
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Oser" — Brené Brown. Sur la vulnérabilité, le courage et la légitimité au travail.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Métamorphose" — Anne Ghesquière. Développement personnel et confiance, dans un cadre francophone accessible.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'psychologies.com — Articles sur l\'estime de soi, la légitimité professionnelle, les outils concrets.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@psychologie_positive_fr — Contenus sur l\'estime de soi, la confiance et le rapport à l\'échec.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : si ce doute dure et pèse sur tes choix pro, MonPsy (remboursé) ou un coaching pro peuvent t\'aider à y voir plus clair.'}
  ]
},
vert:{
  analyse:"Ta confiance en toi est solide aujourd'hui. 🌟 Tu te sens légitime, tu reconnais ta valeur sans avoir besoin de te justifier sans cesse. C'est un socle précieux — pas toujours acquis, et qui mérite d'être entretenu.",
  conseil:"Pour amplifier ça : <strong>identifie ce qui nourrit cette confiance</strong> (préparation, soutien, réussites récentes) et renforce-le intentionnellement. C'est aussi le bon moment pour oser un peu plus loin — une demande, un projet, une prise de parole.",
  exercice:"🌟 Note 3 choses qui te font dire 'je suis légitime ici' — et relis-les la prochaine fois que le doute reviendra.",
  lecon:"✨ \"La confiance est un muscle qu'on entretient — pas un trait qu'on a ou qu'on n'a pas.\"",
  ressources:[
    {ico:'📚',tag:'LIVRE',col:'#8b5cf6',txt:'"Mindset" — Carol Dweck. L\'état d\'esprit de croissance, pour ancrer une confiance durable dans le temps.'},
    {ico:'🎧',tag:'PODCAST',col:'#d946ef',txt:'"Génération Do It Yourself" — Parcours et confiance de personnes qui ont osé sortir des sentiers battus.'},
    {ico:'🌐',tag:'SITE SANTÉ',col:'#059669',txt:'who.int/fr — Section santé mentale de l\'OMS. Ressources mondiales sur le bien-être et la prévention.'},
    {ico:'📱',tag:'RÉSEAU SANTÉ',col:'#1e3a5f',txt:'@le_lab_psy — Psychologue chercheur. Contenu rigoureux sur l\'estime de soi et les mécanismes de confiance.'},
    {ico:'🏥',tag:'INFO PRÉVENTIVE',col:'#ef4444',txt:'À titre informatif : même quand on va bien, connaître les ressources (MonPsy, coaching pro) est utile pour les moments où le doute reviendra.'}
  ]
}
}
};

var PROFIL_FINAL={
salarie:{
  rouge:"💼 <strong>Salarié(e) en difficulté :</strong> Si ton travail contribue à cet état, tu peux demander une visite au médecin du travail — gratuit, confidentiel, sans accord de l'employeur. Note les situations difficiles avec dates et faits. Le CSE de ton entreprise peut aussi t'orienter.",
  orange:"💼 <strong>Salarié(e) sous pression :</strong> Ton CSE propose souvent des aides méconnues (logement, santé, aide sociale). Le médecin du travail peut proposer des aménagements confidentiels. Et si le contexte est difficile, documenter par écrit est une protection.",
  vert:"💼 <strong>Salarié(e) en forme :</strong> Profite de cet état pour avancer sur ce qui compte. Consulte aussi les avantages de ton CSE (chèques vacances, aides) et note les ressources disponibles (médecin du travail, 3114) pour les moments où tu en aurais besoin."
},
demandeur:{
  chomage:{
    rouge:"🔍 <strong>Sans activité, à bout :</strong> Une recherche prolongée sans aucune activité use profondément — l'isolement et la perte de repères s'ajoutent à la fatigue. France Travail propose des ateliers de soutien psychologique. Vérifie tes droits sur mes-aides.gouv.fr : ARE, RSA, CSS santé, APL. Structure ne serait-ce qu'une demi-journée avec un seul objectif simple.",
    orange:"🔍 <strong>Sans activité, entre deux eaux :</strong> Vérifie la Prime d'Activité et tes droits CAF. Garder un minimum de structure dans tes journées — même sans obligation extérieure — aide à tenir la durée. 1 candidature ciblée vaut mieux que 10 génériques.",
    vert:"🔍 <strong>En élan malgré l'absence d'activité :</strong> Profite de cette énergie pour avancer concrètement : message LinkedIn, candidature, relance. Et vérifie que ta couverture santé est bien maintenue (droits ouverts 12 mois après fin de contrat)."
  },
  precaire:{
    rouge:"🔍 <strong>Épuisé(e) par l'instabilité des contrats courts :</strong> Jongler entre missions sans visibilité est un vrai facteur de stress, reconnu comme tel. France Travail propose un accompagnement spécifique aux contrats courts. Vérifie tes droits à l'ARE entre deux missions sur mes-aides.gouv.fr. Une chose à la fois — pas besoin de tout anticiper d'un coup.",
    orange:"🔍 <strong>Tu tiens, malgré l'instabilité :</strong> Anticipe les périodes creuses : vérifie tes droits au chômage entre deux contrats, et mets de côté pendant les périodes actives si possible. La CSS peut aussi réduire tes frais de santé selon tes revenus.",
    vert:"🔍 <strong>En élan malgré l'instabilité du statut :</strong> C'est le bon moment pour viser plus stable si tu le souhaites — négocie un CDI ou une mission plus longue. Et sécurise : vérifie tes droits entre contrats pour anticiper le prochain creux."
  }
},
reconversion:{
  rouge:"🌱 <strong>Reconversion difficile :</strong> Transitions Pro (transitionspro.fr) peut financer 100% ta reconversion avec maintien de salaire. Les CEP (Conseillers en Évolution Professionnelle) chez France Travail sont gratuits. Reconnecte-toi à ton pourquoi — c'est ta boussole.",
  orange:"🌱 <strong>En reconversion :</strong> Ton CPF (moncompteformation.gouv.fr) peut financer ta formation. Les CEP gratuits t'aident à structurer ton projet. 'Dans 5 ans, est-ce que je regretterais de ne pas avoir essayé ?' — cette question dit tout.",
  vert:"🌱 <strong>En reconversion alignée :</strong> Avance maintenant sur ton CPF, contacte un professionnel de ton secteur cible. Sécurise aussi : vérifie ton solde CPF, les dispositifs Transitions Pro, et garde une épargne de précaution pour les creux."
},
freelance:{
  rouge:"🚀 <strong>Freelance en creux :</strong> La SSI couvre ton arrêt maladie — consulte si l'épuisement est sévère. L'URSSAF propose des délais de paiement si les cotisations pèsent. Et si un client ne paie pas : le Médiateur des Entreprises (mediateur-des-entreprises.fr) intervient gratuitement.",
  orange:"🚀 <strong>Freelance sous pression :</strong> Une seule décision aujourd'hui : client, devis ou prospection. Ta mutuelle individuelle est déductible de tes charges. Et des espaces de coworking ou collectifs freelance peuvent briser l'isolement qui amplifie tout.",
  vert:"🚀 <strong>Freelance en élan :</strong> Consolide maintenant : prévoyance indépendant pour un arrêt maladie long, PER (déductible), et si tu veux structurer — SASU ou EURL peuvent changer ton régime favorablement. Les décisions de croissance se prennent quand on va bien."
}
};
window.ebStart=function(){
  EB={profil:null,subProfil:null,theme:null,score:0,level:null,moment:null,qIdx:0,answers:[],pool:[],name:''};
  document.getElementById('eb-body').innerHTML='';
  document.getElementById('eb-prog-wrap').style.display='none';
  document.getElementById('eb-hdr-sub').textContent='Ton espace personnel';

  // Le prénom est redemandé à chaque visite — jamais sauvegardé entre sessions
  var evaWrap=document.createElement('div');
  evaWrap.style.cssText='margin-bottom:6px;';
  evaWrap.innerHTML='<div class="eb-eva-name">✦ EVA</div><div class="eb-bub-eva">Bonjour 💚<br><br>Je suis <strong>EVA</strong>, ton espace de ressourcement.<br>Je suis là pour toi — sans jugement, sans filtre.<br><br>Ce petit rituel se fait une fois par jour, idéalement pour commencer ta journée avant de te lancer dans tes démarches ou ta recherche de travail.<br><br>Pour que nos échanges soient vraiment personnels… <strong>comment tu t\'appelles ?</strong></div>';
  append(evaWrap);
  (function(){
      var wrap=document.createElement('div');
      wrap.style.cssText='display:flex;gap:8px;margin-bottom:16px;align-items:center;';
      var inp=document.createElement('input');
      inp.type='text';inp.placeholder='Ton prénom…';inp.maxLength=20;
      inp.style.cssText='flex:1;border:1.5px solid #bbf7d0;border-radius:8px;padding:11px 13px;font-size:.82rem;font-family:inherit;color:#0f172a;background:#f0fdf4;outline:none;';
      inp.addEventListener('focus',function(){this.style.borderColor='#059669';});
      inp.addEventListener('blur',function(){this.style.borderColor='#bbf7d0';});
      var btn=document.createElement('button');
      btn.style.cssText='background:#059669;border:none;border-radius:8px;padding:11px 16px;font-size:.72rem;font-weight:600;color:#fff;font-family:inherit;cursor:pointer;white-space:nowrap;';
      btn.textContent='OK →';
      btn.onclick=function(){
        var n=(inp.value||'').trim();
        if(!n){inp.style.borderColor='#ef4444';inp.focus();return;}
        EB.name=n;
        addUser(n);
        wrap.remove();
        setTimeout(function(){
          addEva('Bonjour <strong>'+n+'</strong> ! 🌿<br><br>On est plutôt à quel moment de ta journée là ?',400);
          setTimeout(ebShowMomentChoix,EBD(1500));
        },400);
      };
      inp.addEventListener('keydown',function(e){if(e.key==='Enter')btn.click();});
      wrap.appendChild(inp);wrap.appendChild(btn);
      append(wrap);
  })();
};

function ebShowMomentChoix(){
  var wrap=document.createElement('div');
  wrap.className='eb-profil-grid';
  var moments=[
    {id:'matin',label:'Le matin',sub:'En démarrant ma journée',svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>'},
    {id:'apresmidi',label:'L\'après-midi',sub:'En cours de journée',svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/><line x1="5.64" y1="18.36" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="18.36" y2="5.64"/></svg>'},
    {id:'soir',label:'Le soir',sub:'En refermant ma journée',svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'}
  ];
  moments.forEach(function(m){
    var card=document.createElement('button');
    card.className='eb-profil-card';
    card.innerHTML='<span class="ep-ico">'+m.svg+'</span><div class="ep-lbl">'+m.label+'</div><div class="ep-sub">'+m.sub+'</div>';
    card.onclick=function(){
      if(wrap.dataset.picked)return;
      wrap.dataset.picked='1';
      EB.moment=m.id;
      wrap.querySelectorAll('.eb-profil-card').forEach(function(c){c.style.opacity='.4';c.style.pointerEvents='none';});
      card.style.opacity='1';card.style.borderColor='#8b5cf6';card.style.background='#faf5ff';
      addUser(m.label);
      setTimeout(function(){
        wrap.remove();
        addEva('Tu te retrouves dans quel profil en ce moment ?',400);
        setTimeout(ebShowProfilChoix,EBD(1500));
      },400);
    };
    wrap.appendChild(card);
  });
  append(wrap);
}

function ebShowProfilChoix(){
  var grid=document.createElement('div');
  grid.className='eb-profil-grid';
  Object.keys(PROFILS).forEach(function(key){
    var p=PROFILS[key];
    var card=document.createElement('button');
    card.className='eb-profil-card';
    card.innerHTML='<span class="ep-ico">'+p.svg+'</span><div class="ep-lbl">'+p.label+'</div><div class="ep-sub">'+p.sub+'</div>';
    card.onclick=function(){
      if(grid.dataset.picked)return;
      grid.dataset.picked='1';
      EB.profil=key;
      grid.querySelectorAll('.eb-profil-card').forEach(function(c){c.style.opacity='.4';c.style.pointerEvents='none';});
      card.style.opacity='1';card.style.borderColor='#8b5cf6';card.style.background='#faf5ff';
      addUser(p.label);
      document.getElementById('eb-hdr-sub').textContent=p.label;
      setTimeout(function(){
        grid.remove();
        if(key==='demandeur'){
          addEva('Pour mieux t\'accompagner 🌟<br><br>Tu es plutôt dans quelle situation en ce moment ?',400);
          setTimeout(ebShowDemandeurSituation,EBD(1500));
        } else {
          addEva('Parfait 🌟<br><br>Et aujourd\'hui, tu veux qu\'on explore quel domaine de ta vie ?',400);
          setTimeout(ebShowThemeChoix,EBD(1500));
        }
      },400);
    };
    grid.appendChild(card);
  });
  append(grid);
}

function ebShowDemandeurSituation(){
  var wrap=document.createElement('div');
  wrap.className='eb-profil-grid';
  var situations=[
    {id:'chomage',label:'Au chômage, sans activité',sub:'Pas de mission ni de contrat en cours',svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'},
    {id:'precaire',label:'En CDD, saisonnier ou intérim',sub:'Une activité en cours, mais instable',svg:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"/></svg>'}
  ];
  situations.forEach(function(s){
    var card=document.createElement('button');
    card.className='eb-profil-card';
    card.innerHTML='<span class="ep-ico">'+s.svg+'</span><div class="ep-lbl">'+s.label+'</div><div class="ep-sub">'+s.sub+'</div>';
    card.onclick=function(){
      if(wrap.dataset.picked)return;
      wrap.dataset.picked='1';
      EB.subProfil=s.id;
      wrap.querySelectorAll('.eb-profil-card').forEach(function(c){c.style.opacity='.4';c.style.pointerEvents='none';});
      card.style.opacity='1';card.style.borderColor='#8b5cf6';card.style.background='#faf5ff';
      addUser(s.label);
      setTimeout(function(){
        wrap.remove();
        addEva('Parfait 🌟<br><br>Et aujourd\'hui, tu veux qu\'on explore quel domaine de ta vie ?',400);
        setTimeout(ebShowThemeChoix,EBD(1500));
      },400);
    };
    wrap.appendChild(card);
  });
  append(wrap);
}

function ebShowThemeChoix(){
  var wrap=document.createElement('div');
  wrap.className='eb-theme-grid';
  THEMES.forEach(function(t){
    var btn=document.createElement('button');
    btn.className='eb-theme-btn';
    btn.innerHTML='<span class="et-ico">'+t.svg+'</span><div class="et-txt"><div class="et-lbl">'+t.label+'</div><div class="et-sub">'+t.sub+'</div></div><span class="eb-theme-arr"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>';
    btn.onclick=function(){
      if(wrap.dataset.picked)return;
      wrap.dataset.picked='1';
      EB.theme=t.id;
      addUser(t.label);
      wrap.querySelectorAll('.eb-theme-btn').forEach(function(b){b.style.opacity='.4';b.style.pointerEvents='none';});
      btn.style.opacity='1';btn.style.borderColor='#059669';btn.style.background='#f0fdf4';
      setTimeout(function(){
        wrap.remove();
        // EB.moment a déjà été choisi explicitement par l'utilisateur (pas de calcul auto)
        // Intro session : s'installer confortablement
        var intros=[
          'Parfait. 💚<br><br>Avant de commencer, installe-toi confortablement dans un endroit calme et serein.<br>Coupe les distractions quelques minutes — ce moment est pour toi.<br><br>Réponds à l\'instinct, sans réfléchir trop longtemps. C\'est toujours le plus juste. ✨',
          'Beau choix. 🌿<br><br>Prends une respiration profonde avant qu\'on commence.<br>Trouve un endroit tranquille, pose le téléphone confortablement et sois présent(e).<br><br>15 ou 25 questions au choix, tes réponses honnêtes. Pas de jugement ici. 💚',
          'Super. 🌱<br><br>Une seule règle pour cette session : sois honnête avec toi-même.<br>Installe-toi au calme — même 10 minutes loin du bruit — et laisse les réponses venir naturellement.<br><br>C\'est pour toi, rien que pour toi. On y va. ✨',
          'Excellent choix. 🌿<br><br>Ce moment t\'appartient entièrement.<br>Mets-toi à l\'aise, coupe le bruit si tu peux, prends quelques secondes pour être là — vraiment là.<br><br>Tes réponses instinctives sont toujours les plus vraies. 💚'
        ];
        var intro=intros[Math.floor(Math.random()*intros.length)];
        addEva(intro,400);
        setTimeout(function(){
          addEva('Combien de questions veux-tu pour cette session ? ⏱️',0);
          setTimeout(function(){
            var cw=document.createElement('div');
            cw.className='eb-q-wrap eb-nb-choice';
            [[15,'15 questions','≈ 5 min · format court'],[25,'25 questions','≈ 8 min · format complet']].forEach(function(o){
              var b=document.createElement('button'); b.className='eb-q-opt';
              b.innerHTML='<b>'+o[1]+'</b> <span style="opacity:.6;font-weight:500">· '+o[2]+'</span>';
              b.onclick=function(){
                if(cw.dataset.answered) return; cw.dataset.answered='1';
                EB.nb=o[0]; addUser(o[1]);
                cw.style.transition='opacity .3s'; cw.style.opacity='0';
                setTimeout(function(){ cw.remove(); EB.pool=ebBuildPool(EB.theme); EB.qIdx=0; ebShowQuestion(); },EBD(600));
              };
              cw.appendChild(b);
            });
            append(cw);
          },EBD(1200));
        },EBD(2200));
      },300);
    };
    wrap.appendChild(btn);
  });
  append(wrap);
}

function ebShowQuestion(){
  if(EB.qIdx>=EB.pool.length){ebShowResult();return;}
  var total=EB.pool.length;
  var cur=EB.qIdx+1;
  setProgress(cur,total);
  var q=EB.pool[EB.qIdx];
  var name=EB.name||'';

  // Remplacer {m} par le moment de la journée (ce matin / cet après-midi / ce soir)
  var qTxt=q.q.replace(/{m}/g,ebMomentPhrase());

  // Personnaliser la question avec le prénom (si pas déjà dedans)
  if(name && qTxt.indexOf(name)===-1 && Math.random()>.4){
    // Insérer prénom naturellement dans certaines questions
    var prenom_intros=[''+name+', ','Dis-moi '+name+', '];
    var pi=prenom_intros[Math.floor(Math.random()*prenom_intros.length)];
    // Seulement si la question commence par un emoji
    if(qTxt.charAt(0).charCodeAt(0)>255) qTxt=qTxt.slice(0,2)+pi+qTxt.slice(2,3).toLowerCase()+qTxt.slice(3);
  }

  var delay=EBD(300);
  // Réaction EVA tous les 5 questions
  if(EB.qIdx>0&&EB.qIdx%5===0){
    var types=['validation','encourage','console'];
    var rt=types[Math.floor(Math.random()*types.length)];
    var reaction=getReaction(rt);
    // Personnaliser la réaction avec le prénom
    if(name && Math.random()>.5) reaction=reaction.replace(/\. /,' '+name+'. ');
    addEva(reaction,0);
    delay=EBD(1400);
  }

  setTimeout(function(){
    // Afficher la question avec numéro
    var qWrap=null;
    var DESK=true; /* cartes sur ordinateur ET mobile */
    (DESK ? function(cb){ setTimeout(cb,250); } : typing)(function(){
      var sepQ=document.createElement('div');
      sepQ.className='eb-q-sep';
      sepQ.innerHTML='<span>Question '+cur+' / '+total+'</span>';
      $b().appendChild(sepQ);
      qWrap=document.createElement('div');
      qWrap.className='eb-q-card';
      qWrap.style.cssText='margin-bottom:4px;';
      qWrap.innerHTML='<div class="eb-eva-name">✦ EVA</div>'
        +'<div class="eb-q-num" style="font-size:.44rem;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;padding-left:1px;">Question '+cur+' / '+total+'</div>'
        +'<div class="eb-bub-eva">'+qTxt+'</div>';
      $b().appendChild(qWrap);scroll();
    },500);

    // Options après un délai
    setTimeout(function(){
      var wrap=document.createElement('div');
      wrap.className='eb-q-wrap';
      // Séparateur visuel
      var sep=document.createElement('div');
      sep.style.cssText='font-size:.46rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.1em;padding:0 2px 6px;';
      sep.textContent='Choisis ta réponse :';
      wrap.appendChild(sep);

      q.opts.forEach(function(opt){
        var btn=document.createElement('button');
        btn.className='eb-q-opt';
        btn.textContent=opt;
        btn.onclick=function(){
          if(wrap.dataset.answered)return;
          wrap.dataset.answered='1';
          // Désactiver toutes les options
          wrap.querySelectorAll('.eb-q-opt').forEach(function(b){
            b.style.opacity='.4';
            b.style.pointerEvents='none';
          });
          btn.style.opacity='1';
          btn.classList.add('sel');
          var idx=Array.from(wrap.querySelectorAll('.eb-q-opt')).indexOf(btn);
          var s=q.opts.length-1-idx;
          EB.score+=s;
          EB.answers.push({q:q.q,a:opt});
          // Bulle utilisateur (ordinateur : la réponse reste dans la carte)
          if(DESK && qWrap){
            var ans=document.createElement('div'); ans.className='eb-q-ans'; ans.textContent=opt;
            setTimeout(function(){ qWrap.classList.add('eb-q-done'); qWrap.appendChild(ans); },450);
          } else addUser(opt);
          // Retirer les options proprement après un délai
          setTimeout(function(){
            wrap.style.transition='opacity .25s';
            wrap.style.opacity='0';
            setTimeout(function(){
              wrap.remove();
              EB.qIdx++;
              ebShowQuestion();
            },DESK?450:250);
          },DESK?900:EBD(400));
        };
        wrap.appendChild(btn);
      });
      if(qWrap && DESK){ qWrap.appendChild(wrap); scroll(); } else append(wrap);
    },DESK ? 900 : EBD(900)+EBD(500));
  },delay);
}


/* ══ JOURNAL DU JOUR — 5ème thème EVA Bien-être ══ */
var JNL_KEY2='eb_jnl_v1';
function jnlLoad(){try{return JSON.parse(localStorage.getItem(JNL_KEY2)||'{"name":"","entries":[],"streak":0}');}catch(e){return{name:'',entries:[],streak:0};}}
function jnlSave(d){try{localStorage.setItem(JNL_KEY2,JSON.stringify(d));}catch(e){}}
function jnlToday(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function jnlYest(){var d=new Date();d.setDate(d.getDate()-1);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function jnlMoment(){var h=new Date().getHours();return h<12?'ce matin':h<18?'cet après-midi':'ce soir';}

var JNL_TH=[
  {id:'energie',label:'Énergie & Humeur',color:'#059669',bg:'#f0fdf4',
   ico:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
   qs:['{n}, comment tu te sens {m} ?','{n}, ton énergie {m} ressemble à quoi ?','{n}, tu t\'es réveillé(e) comment aujourd\'hui ?','{n}, si ton humeur {m} était une météo ?','{n}, qu\'est-ce qui marque ta journée là ?']},
  {id:'argent',label:'Finances',color:'#1e3a5f',bg:'#eff6ff',
   ico:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>',
   qs:['{n}, ton rapport à l\'argent {m} ?','{n}, une préoccupation financière {m} ?','{n}, tu te sens en contrôle de tes finances ?','{n}, l\'argent pèse lourd ou légèrement {m} ?','{n}, une décision financière te préoccupe {m} ?']},
  {id:'mental',label:'Santé Mentale',color:'#4f46e5',bg:'#eef2ff',
   ico:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/></svg>',
   qs:['{n}, ton anxiété {m} — elle est à quel niveau ?','{n}, tes pensées sont claires ou embrouillées {m} ?','{n}, tu te parles avec douceur aujourd\'hui ?','{n}, quelque chose tourne en boucle dans ta tête {m} ?','{n}, tu es en paix avec toi-même {m} ?']},
  {id:'amour',label:'Confiance & Estime de soi',color:'#be185d',bg:'#fdf2f8',
   ico:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#be185d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
   qs:['{n}, tu te sens légitime {m} ?','{n}, le doute pèse fort ou léger {m} ?','{n}, une réussite que tu te reconnais {m} ?','{n}, tu te sens à la hauteur aujourd\'hui ?','{n}, ta confiance en toi {m} ressemble à quoi ?']}
];

var JNL_OPTS_SETS=[
  [['☀️ En forme, je me sens bien','🌤️ Correct, sans plus','🌧️ Fatigué(e), c\'est pesant','⛈️ Très difficile'],
   ['💚 Serein(e)','😐 Neutre','😟 Un peu stressé(e)','😰 Très stressé(e)'],
   ['✅ Oui, je vois clair','🤔 Vaguement','😶 Pas vraiment','🌀 Non, c\'est embrouillé'],
   ['💗 Elles me nourrissent','😐 Neutre','🔴 Un peu épuisant','💔 Très épuisant']],
  [['⚡ Haute — dans mon élan','🔋 Moyenne — j\'avance','🪫 Basse — par obligation','💀 Vide'],
   ['😌 Aucune inquiétude','🤔 Une petite chose','😬 Oui, c\'est présent','😰 Oui et ça prend de la place'],
   ['💗 Avec beaucoup de douceur','🙂 Assez bien','😬 Assez durement','😠 Très durement'],
   ['💗 Oui, profondément','🙂 Avec certains','😶 Peu — je me sens distant(e)','😔 Non, seul(e)']],
  [['😊 Bien reposé(e)','😐 Correct','😔 Fatigué(e)','😫 Épuisé(e)'],
   ['✅ Oui, je gère','🤏 À peu près','😶 Pas vraiment','😱 Non, c\'est le chaos'],
   ['❌ Non, l\'esprit est calme','🔄 Un peu, ça va','😟 Oui, quelque chose tourne','🌀 Beaucoup — je rumine'],
   ['❌ Non, tout va bien','🤔 Légèrement','😟 Oui, une chose','💔 Oui, c\'est douloureux']]
];

var JNL_EVA={
  energie:{
    top:['Cette énergie que tu portes {m}, {n} — utilise-la pour ce qui compte vraiment. Ne la gaspille pas.','Belle vitalité, {n} ! Les journées comme celle-ci sont rares. Lance-toi sur ta tâche la plus difficile.','{n}, ton énergie {m} parle d\'elle-même. Quelque chose se passe bien. Prends-en conscience.'],
    mid:['{n}, tu gères {m}. Stable — et c\'est une vraie force.','Énergie correcte {m}, {n}. Une priorité, avance dessus doucement.','{n}, tu fonctionnes — dans une journée chargée, c\'est déjà beaucoup.'],
    bas:['{n}, ton corps te demande quelque chose {m}. Écoute-le — il ne ment jamais.','C\'est difficile, {n}. Une chose douce pour toi, c\'est tout ce qu\'on te demande.','Même quand l\'énergie est basse, tu es là, {n}. Sois doux(ce) avec toi.']
  },
  argent:{
    top:['{n}, belle sérénité financière {m}. Bon moment pour une décision importante — la tête est claire.','Tu es tranquille côté argent, {n}. Profite de cet état pour avancer : épargne ou projet.','{n}, cette paix financière {m} — planifie quelque chose de concret cette semaine.'],
    mid:['{n}, situation stable {m}. Pas parfait, mais tu tiens. Un point rapide sur tes dépenses ?','Tu gères {m}, {n}. Une petite action cette semaine consoliderait ça.','{n}, état correct. Regarde ce que tu peux améliorer sans urgence.'],
    bas:['{n}, le stress financier {m} est épuisant. Une chose à la fois. Juste une.','Ta valeur n\'est pas ton solde, {n}. Rappelle-toi ça.','Note UNE action concrète possible cette semaine, {n}. Pas dix. Une.']
  },
  mental:{
    top:['{n}, ton mental est clair {m}. Protège cet espace.','Belle clarté, {n}. Prends cette décision que tu reportais — maintenant.','{n}, tu es en paix avec toi-même {m}. Cultive ça.'],
    mid:['{n}, ton mental tient {m}. Debout — et c\'est ce qui compte.','État correct, {n}. Un espace calme ce soir — même dix minutes.','Tu fonctionnes bien {m}, {n}. Un moment de pleine conscience consoliderait ça.'],
    bas:['{n}, ton mental est sous pression {m}. Ce que tu ressens est réel. Douceur.','Journée difficile mentalement, {n}. Gentillesse envers toi-même d\'abord.','{n}, quand la tête est lourde, écrire ou parler aide. Même un message.']
  },
  amour:{
    top:['{n}, ta confiance est solide {m}. Tu te sens légitime — c\'est précieux, cultive-le.','Tu rayonnes de confiance, {n}. C\'est le bon moment pour oser un peu plus loin.','{n}, te sentir à la hauteur {m} — savoure-le, ce n\'est pas toujours acquis.'],
    mid:['{n}, confiance correcte {m}. Note une réussite récente — ça aide à ancrer ça.','Stable {m}, {n}. Le doute revient parfois, c\'est normal — avance quand même.','{n}, état moyen côté confiance. Une petite preuve de ta compétence te ferait du bien là.'],
    bas:['{n}, douter de soi {m} est épuisant — et très humain. Tu n\'es pas seul(e) à vivre ça.','Le doute pèse, {n}. Liste UNE réussite, même petite — maintenant.','{n}, commence par te parler avec la douceur que tu offrirais à un(e) ami(e).']
  }
};

var JNL_ACTIONS={
  energie:{top:{txt:'Lance-toi sur ta tâche la plus difficile maintenant.',when:'Dans l\'heure'},mid:{txt:'Identifie ta seule priorité pour les 2 prochaines heures.',when:'Maintenant'},bas:{txt:'5 respirations lentes : inspire 4s, expire 6s.',when:'Maintenant'}},
  argent:{top:{txt:'C\'est le bon moment pour regarder ton épargne.',when:'Ce soir'},mid:{txt:'Note tes 3 dépenses principales du mois.',when:'Ce soir'},bas:{txt:'Note UNE action financière concrète possible.',when:'Cette semaine'}},
  mental:{top:{txt:'Prends cette décision difficile que tu reportais.',when:'Aujourd\'hui'},mid:{txt:'5 min de journaling ce soir : ce qui a pesé / ce qui a surpris.',when:'Ce soir'},bas:{txt:'Ancrage : 5 choses vues, 4 entendues, 3 touchées.',when:'Maintenant'}},
  amour:{top:{txt:'Note 3 réussites récentes dont tu es fier(ère), sans les minimiser.',when:'Aujourd\'hui'},mid:{txt:'Liste une preuve concrète de ta compétence — relis-la au prochain doute.',when:'Dans l\'heure'},bas:{txt:'Parle-toi avec la douceur que tu offrirais à un(e) collègue en difficulté.',when:'Aujourd\'hui'}}
};

function jnlGetQ(th,name){
  var d=new Date();
  var idx=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)%th.qs.length;
  return th.qs[idx].replace(/{n}/g,name).replace(/{m}/g,jnlMoment());
}
function jnlMsg(id,score,name){
  var p=JNL_EVA[id];var arr=score>=7?p.top:score>=4?p.mid:p.bas;
  return arr[Math.floor(Math.random()*arr.length)].replace(/{n}/g,name).replace(/{m}/g,jnlMoment());
}
function jnlScoreLbl(v){return v<=2?'Très difficile':v<=4?'Difficile':v<=6?'Moyen':v<=8?'Bien':'Excellent';}

function ebStartJournal(){
  var data=jnlLoad();
  var today=jnlToday();
  var done=data.entries&&data.entries.find(function(e){return e.date===today;});

  if(!data.name){
    var msgs=['Bienvenue dans ton <strong>Journal du Jour</strong>. 💚<br><br>Prends 2 minutes au calme, une fois dans la journée — c\'est tout ce qu\'il faut pour que ce bilan soit vraiment efficace et authentique.<br><br>Pour que nos échanges soient personnels… <strong>comment tu t\'appelles ?</strong>',
      'Ton <strong>Journal du Jour</strong> commence ici. 🌿<br><br>Installe-toi confortablement. Coupe le bruit autour de toi. Une session par jour, honnête et sereine.<br><br>Quel est ton prénom ?'];
    addEva(msgs[Math.floor(Math.random()*msgs.length)],400);
    setTimeout(function(){
      var wrap=document.createElement('div');
      wrap.style.cssText='display:flex;gap:8px;margin-bottom:16px;align-items:center;';
      var inp=document.createElement('input');
      inp.type='text';inp.placeholder='Ton prénom…';inp.maxLength=20;
      inp.style.cssText='flex:1;border:1.5px solid #bbf7d0;border-radius:8px;padding:11px 13px;font-size:.82rem;font-family:inherit;color:#0f172a;background:#f0fdf4;outline:none;';
      inp.addEventListener('focus',function(){this.style.borderColor='#059669';});
      inp.addEventListener('blur',function(){this.style.borderColor='#bbf7d0';});
      var btn=document.createElement('button');
      btn.style.cssText='background:#059669;border:none;border-radius:8px;padding:11px 16px;font-size:.72rem;font-weight:600;color:#fff;font-family:inherit;cursor:pointer;';
      btn.textContent='OK →';
      btn.onclick=function(){
        var n=(inp.value||'').trim();
        if(!n){inp.style.borderColor='#ef4444';inp.focus();return;}
        data.name=n;jnlSave(data);addUser(n);wrap.remove();
        setTimeout(function(){jnlRun(n);},400);
      };
      inp.addEventListener('keydown',function(e){if(e.key==='Enter')btn.click();});
      wrap.appendChild(inp);wrap.appendChild(btn);
      append(wrap);
    },1200);
    return;
  }

  if(done){
    var alreadyMsgs=[data.name+', tu as déjà fait ton bilan aujourd\'hui. 💚<br>Reviens demain. Voici ton bilan de ce '+done.moment+' :',
      'Session du jour complète, '+data.name+' ! Une seule session par jour — c\'est ce qui rend ce journal vraiment efficace. Voici ton bilan :'];
    addEva(alreadyMsgs[Math.floor(Math.random()*alreadyMsgs.length)],400);
    setTimeout(function(){jnlResult(done,data.name);},1200);
    return;
  }
  jnlRun(data.name);
}

function jnlRun(name){
  var m=jnlMoment().replace('ce ','').replace('cet ','');
  var intros=[''+name+', installe-toi confortablement dans un endroit calme. 🌿<br><br><strong>2 minutes de présence vraie</strong>, une seule fois dans la journée — c\'est tout ce qu\'il faut.<br>Réponds à l\'instinct — c\'est toujours le plus juste.',
    'Bienvenue, '+name+'. 💚<br><br>Avant qu\'on commence, prends un instant.<br><strong>Installe-toi dans un endroit serein.</strong> Une session par jour pour un bilan authentique et efficace.',
    name+', bon '+m+'. 🌱<br><br>Ce bilan, c\'est ton <strong>espace de vérité</strong>. Pas de bonne ou mauvaise réponse.<br>Installe-toi au calme, réponds honnêtement sur tes 4 dimensions de vie.'];
  addEva(intros[Math.floor(Math.random()*intros.length)],0);

  var scores={};
  var d=new Date();
  var setIdx=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)%JNL_OPTS_SETS.length;
  var optsSets=JNL_OPTS_SETS[setIdx];

  JNL_TH.forEach(function(th,i){
    setTimeout(function(){
      var q=jnlGetQ(th,name);
      addEva('<span style="font-size:.48rem;font-weight:700;color:'+th.color+';text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:5px;">'+th.ico+' '+th.label+'</span>'+q,0);
      var opts=optsSets[i]||optsSets[0];
      setTimeout(function(){
        var wrap=document.createElement('div');
        wrap.className='eb-q-wrap';
        opts.forEach(function(opt,oi){
          var btn=document.createElement('button');
          btn.className='eb-q-opt';btn.textContent=opt;
          btn.onclick=function(){
            if(wrap.dataset.answered)return;
            wrap.dataset.answered='1';
            wrap.querySelectorAll('.eb-q-opt').forEach(function(b){b.classList.remove('sel');});
            btn.classList.add('sel');
            scores[th.id]=Math.round(((opts.length-1-oi)/(opts.length-1))*9+1);
            addUser(opt);
            setTimeout(function(){wrap.remove();},300);
          };
          wrap.appendChild(btn);
        });
        append(wrap);
      },700);
    },1400*(i+1)+600);
  });

  // Bouton valider
  setTimeout(function(){
    var btnWrap=document.createElement('div');btnWrap.style.marginBottom='16px';
    var btn=document.createElement('button');
    btn.style.cssText='width:100%;background:linear-gradient(135deg,#059669,#047857);border:none;border-radius:9px;padding:13px;font-size:.75rem;font-weight:600;color:#fff;font-family:inherit;cursor:pointer;box-shadow:0 4px 12px rgba(5,150,105,.28);display:flex;align-items:center;justify-content:center;gap:8px;';
    btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Générer mon bilan du jour';
    btn.onclick=function(){
      var missing=JNL_TH.some(function(t){return !scores[t.id];});
      if(missing){btn.textContent='⚠️ Réponds à toutes les questions d\'abord';btn.style.background='#ef4444';setTimeout(function(){btn.style.background='linear-gradient(135deg,#059669,#047857)';btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Générer mon bilan du jour';},2000);return;}
      btnWrap.remove();
      var avg=Math.round((JNL_TH.reduce(function(a,t){return a+scores[t.id];},0)/JNL_TH.length)*10)/10;
      var m2=jnlMoment().replace('ce ','').replace('cet ','');
      var entry={date:jnlToday(),moment:m2,scores:scores,avg:avg};
      var data=jnlLoad();
      if(!data.entries)data.entries=[];
      data.entries=data.entries.filter(function(e){return e.date!==jnlToday();});
      data.entries.push(entry);
      var hadYest=data.entries.some(function(e){return e.date===jnlYest();});
      data.streak=(hadYest?(data.streak||0):0)+1;
      jnlSave(data);
      setTimeout(function(){jnlResult(entry,data.name);},300);
    };
    btnWrap.appendChild(btn);append(btnWrap);
  },1400*5+2000);
}

function jnlResult(entry,name){
  var scores=entry.scores;var avg=entry.avg;
  var lc=avg>=7?'#059669':avg>=4?'#1e3a5f':'#4f46e5';
  var le=avg>=7?'🌟':avg>=4?'🌿':'💚';
  var lt=avg>=7?'Belle journée, '+name+' !':avg>=4?'Journée correcte, '+name+'.':'Tu traverses quelque chose, '+name+'. On est là. 💚';

  var html='<strong>'+le+' '+lt+'</strong><br><br>';
  html+='<em style="font-size:.58rem;color:#64748b;">Bilan de '+entry.moment+' · </em><br><br>';
  html+='<div style="margin-bottom:12px;">';
  JNL_TH.forEach(function(t){
    var v=scores[t.id]||5;
    var pct=Math.round(((v-1)/9)*100);
    html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">'
      +t.ico+'<div style="flex:1;">'
      +'<div style="font-size:.56rem;font-weight:700;color:'+t.color+';margin-bottom:2px;">'+t.label+'</div>'
      +'<div style="height:5px;background:#e5e7eb;border-radius:3px;">'
      +'<div style="height:100%;width:'+pct+'%;background:'+t.color+';border-radius:3px;transition:width .6s;"></div>'
      +'</div></div>'
      +'<span style="font-size:.7rem;font-weight:700;color:'+t.color+'">'+v+'</span></div>';
  });
  html+='</div>';
  var gMsg=avg>=7?'Tes 4 piliers sont alignés. Utilise cet état pour ce qui compte.':avg>=4?'Un effort ciblé sur ton pilier le plus bas changerait l\'équilibre.':'Ne te juge pas. Tu as pris ce moment pour toi — c\'est déjà courageux.';
  html+='<div style="border-top:1px solid #e5e7eb;padding-top:10px;font-size:.68rem;color:#64748b;font-style:italic;">'+gMsg+'</div>';
  addEva(html,400);

  setTimeout(function(){
    var det='<div style="font-size:.48rem;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;">🎯 EVA analyse ton bilan, '+name+'</div>';
    JNL_TH.forEach(function(t){
      var v=scores[t.id]||5;
      var msg=jnlMsg(t.id,v,name);
      var act=v>=7?JNL_ACTIONS[t.id].top:v>=4?JNL_ACTIONS[t.id].mid:JNL_ACTIONS[t.id].bas;
      det+='<div style="margin-bottom:13px;">'
        +'<span style="font-size:.5rem;font-weight:700;color:'+t.color+';text-transform:uppercase;letter-spacing:.08em;">'+t.ico+' '+t.label+' — '+v+'/10</span><br>'
        +'<span style="font-size:.71rem;color:#0f172a;line-height:1.7;">'+msg+'</span><br>'
        +'<div style="margin-top:5px;background:'+t.bg+';border-radius:7px;padding:7px 10px;font-size:.63rem;color:'+t.color+';line-height:1.5;">'
        +'<strong>→</strong> '+act.txt+' <em style="opacity:.65;">· '+act.when+'</em></div></div>';
    });
    addEva(det,400);
    setTimeout(function(){
      var btns=document.createElement('div');btns.style.padding='0 0 28px';
      btns.innerHTML='<button class="eb-btn-retry" onclick="ebStart()">🔄 Nouvelle session — autre thème</button>'
        +'<button class="eb-btn-back" onclick="go(\'eva\')">← Retour au menu EVA</button>';
      append(btns);
    },800);
  },1000);
}


function ebShowResult(){
  $prog().style.display='none';
  var maxScore=EB.pool.reduce(function(acc,q){return acc+(q.opts.length-1);},0);
  var ratio=EB.score/maxScore;
  EB.level=ratio>=0.65?'vert':ratio>=0.35?'orange':'rouge';
  var theme=EB.theme||'energie';
  var profil=EB.profil||'salarie';
  var level=EB.level;
  var conc=CONCLUSIONS[theme][level];
  var profilTip=(profil==='demandeur' && EB.subProfil && PROFIL_FINAL.demandeur[EB.subProfil])
    ? PROFIL_FINAL.demandeur[EB.subProfil][level]
    : PROFIL_FINAL[profil][level];
  var name=EB.name||'';

  /* ── Variation emojis & couleurs selon le niveau ── */
  var LEVEL_VARIANTS={
    rouge:[
      {emoji:'🌧️',bg:'#fff1f2',color:'#f43f5e',label:'Une période difficile'},
      {emoji:'💜',bg:'#faf5ff',color:'#7c3aed',label:'Tu portes quelque chose'},
      {emoji:'🌊',bg:'#eff6ff',color:'#2563eb',label:'Quelque chose pèse en toi'},
      {emoji:'🌑',bg:'#f8fafc',color:'#475569',label:'Journée difficile, et c\'est ok'}
    ],
    orange:[
      {emoji:'🌤️',bg:'#fffbeb',color:'#d97706',label:'Tu es dans l\'entre-deux'},
      {emoji:'🌿',bg:'#f0fdf4',color:'#059669',label:'Moyen, mais tu avances'},
      {emoji:'🔋',bg:'#eff6ff',color:'#3b82f6',label:'Chargé(e), pas à plat'},
      {emoji:'🌾',bg:'#fefce8',color:'#ca8a04',label:'Entre deux eaux — c\'est ok'}
    ],
    vert:[
      {emoji:'🌟',bg:'#f0fdf4',color:'#059669',label:'Tu vas vraiment bien'},
      {emoji:'⚡',bg:'#fefce8',color:'#ca8a04',label:'Tu es en élan — profites-en'},
      {emoji:'🌱',bg:'#f0fdf4',color:'#16a34a',label:'Dans le bon chemin'},
      {emoji:'✨',bg:'#faf5ff',color:'#7c3aed',label:'Bel équilibre aujourd\'hui'}
    ]
  };
  var variants=LEVEL_VARIANTS[level];
  var v=variants[Math.floor(Math.random()*variants.length)];

  /* ── Variations du message final EVA (jamais les mêmes) ── */
  var FINAL_MSGS={
    rouge:[
      name ? 'Je t\'entends, '+name+'. 💜 Ce que tu portes est réel — et tu l\'as nommé avec courage. Voici ce que je te prépare.' : 'Je t\'entends. 💜 Ce que tu portes est réel — et tu l\'as nommé avec courage. Voici ce que je te prépare.',
      'Tu n\'avais pas à tout dire. Et pourtant tu l\'as fait. 🌊 C\'est déjà un acte de force. Voici pour toi.',
      name ? 'Merci pour cette confiance, '+name+'. 🌧️ Ce n\'est pas rien de dire les choses comme elles sont. Voici ce que ça m\'inspire pour toi.' : 'Merci pour cette confiance. 🌧️ Ce n\'est pas rien de dire les choses comme elles sont.',
      name ? 'Ça ne devait pas être facile de répondre honnêtement, '+name+'. Voici ce que j\'entends dans tes réponses. 💜' : 'Ça ne devait pas être facile de répondre honnêtement. Voici ce que j\'entends. 💜'
    ],
    orange:[
      name ? 'Merci '+name+'. 🌤️ Tu réfléchis à ta vie — c\'est rare et précieux. Tu mérites mieux que l\'entre-deux. Voici pour toi.' : 'Tu réfléchis à ta vie — c\'est rare et précieux. 🌤️ Voici pour toi.',
      'Tu fonctionnes. Mais tu sais que tu peux faire mieux. 🌿 Et cette conscience-là, c\'est tout. Voici ce que j\'ai pour toi.',
      name ? name+', tu avances même quand c\'est compliqué. 🔋 Voici ce que tes réponses m\'ont révélé.' : 'Tu avances même quand c\'est compliqué. 🔋 Voici ce que tes réponses m\'ont révélé.',
      'Entre le bien et le difficile, il y a une zone de possible. 🌾 Tu y es. Voici comment en sortir vers le haut.'
    ],
    vert:[
      name ? 'Tu rayonnes quelque chose de vrai, '+name+'. 🌟 Cet état — protège-le, cultive-le. Voici pour aller encore plus loin.' : 'Tu rayonnes quelque chose de vrai. 🌟 Cet état — protège-le, cultive-le.',
      name ? 'Bel élan, '+name+'. ⚡ Tes réponses montrent quelqu\'un qui est dans sa force. Voici comment l\'utiliser au maximum.' : 'Bel élan. ⚡ Tes réponses montrent quelqu\'un dans sa force.',
      'Tu vas bien — et ce n\'est pas un hasard. 🌱 C\'est le fruit de quelque chose. Voici pour amplifier ça.',
      name ? name+', tu es aligné(e) en ce moment. ✨ C\'est précieux. Voici comment aller encore plus loin.' : 'Tu es aligné(e) en ce moment. ✨ C\'est précieux. Voici comment aller encore plus loin.'
    ]
  };
  var finalMsgs=FINAL_MSGS[level];
  var finalMsg=finalMsgs[Math.floor(Math.random()*finalMsgs.length)];

  /* ── Variation des titres de sections (jamais les mêmes) ── */
  var SECTION_TITLES={
    analyse:[
      ['💜 Ce qu\'EVA a compris de toi','🧭 Ce que tes réponses révèlent','🪞 Le miroir de ta session','💡 EVA lit entre les lignes'],
      ['🎯 Mon conseil pour cette semaine','🗺️ Ta direction pour les 7 prochains jours','💼 Ce que je te recommande','🌱 Une chose à faire cette semaine'],
      ['🌬️ Exercice à faire maintenant','⚡ Action immédiate','🏃 Commence par ça','🔑 La clé pour aujourd\'hui'],
      ['✨ La leçon de cette session','🌟 Ce que cette session t\'apprend','📖 À retenir','💎 La vérité du moment'],
      ['📚 Pour aller plus loin','🎧 Ressources choisies pour toi','🗂️ À explorer','🌍 Pour approfondir'],
      ['👤 Pour ton profil','🎯 Spécifique à ta situation','🧩 Selon qui tu es','💼 Adapté à ton parcours']
    ]
  };
  function pickTitle(idx){ return SECTION_TITLES.analyse[idx][Math.floor(Math.random()*SECTION_TITLES.analyse[idx].length)]; }

  /* ══ AFFICHAGE : NOUVELLE PAGE RÉSULTAT ══ */
  // Vider complètement et afficher le résultat en haut — nouvelle page
  var body=$b();
  body.innerHTML='';
  body.scrollTop=0;

  /* Header résultat — 2 styles de mise en page, tirés au sort (le design ne reste jamais identique) */
  var heroStyle=Math.random()<0.5?'centre':'banniere';
  var heroDiv=document.createElement('div');
  if(heroStyle==='centre'){
    heroDiv.style.cssText='background:'+v.bg+';border:1px solid '+v.color+'22;border-radius:12px;padding:20px 16px;margin-bottom:14px;text-align:center;';
    heroDiv.innerHTML='<div style="font-size:2.8rem;margin-bottom:8px;line-height:1;">'+v.emoji+'</div>'
      +'<div style="font-size:.72rem;font-weight:800;color:'+v.color+';text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;">'+v.label+'</div>'
      +(name?'<div style="font-size:.64rem;color:#64748b;">Résultat de '+name+' · '+new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+'</div>':'');
  } else {
    heroDiv.style.cssText='background:'+v.bg+';border:1px solid '+v.color+'22;border-radius:12px;padding:16px;margin-bottom:14px;display:flex;align-items:center;gap:14px;text-align:left;';
    heroDiv.innerHTML='<div style="font-size:2.4rem;line-height:1;flex-shrink:0;">'+v.emoji+'</div>'
      +'<div><div style="font-size:.72rem;font-weight:800;color:'+v.color+';text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">'+v.label+'</div>'
      +(name?'<div style="font-size:.64rem;color:#64748b;">Résultat de '+name+' · '+new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+'</div>':'')+'</div>';
  }
  body.appendChild(heroDiv);

  /* Message EVA final */
  var evaBub=document.createElement('div');
  evaBub.style.cssText='margin-bottom:14px;';
  evaBub.innerHTML='<div class="eb-eva-name">✦ EVA</div><div class="eb-bub-eva">'+finalMsg+'</div>';
  body.appendChild(evaBub);

  /* Carte résultat principale */
  var card=document.createElement('div');
  card.className='eb-result-card';

  /* Sections 1 à 5 — construites puis MÉLANGÉES (le design/ordre du résultat n'est jamais le même) */
  var s1=document.createElement('div');s1.className='eb-section';
  s1.innerHTML='<div class="eb-section-title" style="color:'+v.color+'">'+pickTitle(0)+'</div><div class="eb-section-body">'+conc.analyse+'</div>';

  var s2=document.createElement('div');s2.className='eb-section';
  s2.innerHTML='<div class="eb-section-title" style="color:#059669;">'+pickTitle(1)+'</div><div class="eb-section-body">'+conc.conseil+'</div>';

  var s3=document.createElement('div');s3.className='eb-section';
  s3.innerHTML='<div class="eb-section-title" style="color:#7c3aed;">'+pickTitle(2)+'</div><div class="eb-section-body">'+conc.exercice+'</div>';

  var s4=document.createElement('div');s4.className='eb-section';s4.style.background='#f8fafc';
  s4.innerHTML='<div class="eb-section-title" style="color:#0f172a;">'+pickTitle(3)+'</div><div class="eb-section-body" style="font-style:italic;color:#475569;font-size:.73rem;">'+conc.lecon+'</div>';

  var s5=document.createElement('div');s5.className='eb-section';
  s5.innerHTML='<div class="eb-section-title" style="color:#0f172a;">'+pickTitle(4)+'</div>';
  conc.ressources.forEach(function(r){
    var row=document.createElement('div');row.className='eb-ressource-row';
    row.innerHTML='<span class="eb-ressource-ico">'+r.ico+'</span><div class="eb-ressource-txt"><span class="eb-ressource-tag" style="background:'+r.col+'22;color:'+r.col+'">'+r.tag+'</span><br>'+r.txt+'</div>';
    s5.appendChild(row);
  });

  shuffle([s1,s2,s3,s4,s5]).forEach(function(s){card.appendChild(s);});

  /* Section 6 — Profil, toujours en clôture (synthèse finale) */
  var s6=document.createElement('div');s6.className='eb-section';
  s6.style.cssText='border-left:3px solid '+v.color+';border-radius:0 9px 9px 0;background:'+v.bg+';';
  s6.innerHTML='<div class="eb-section-title" style="color:'+v.color+'">'+pickTitle(5)+'</div><div class="eb-section-body">'+profilTip+'</div>';
  card.appendChild(s6);

  body.appendChild(card);

  /* Boutons finaux */
  var btns=document.createElement('div');
  btns.style.padding='4px 0 28px';
  btns.innerHTML='<button class="eb-btn-retry" onclick="ebStart()">🔄 Nouvelle session</button>'
    +'<button class="eb-btn-theme" onclick="ebRestart()">↩ Refaire ce thème</button>'
    +'<button class="eb-btn-back" onclick="go(\'eva\')">← Retour au menu</button>';
  body.appendChild(btns);

  // Scroll en haut une fois tout rendu
  setTimeout(function(){ body.scrollTop=0; },50);
}

window.ebRestart=function(){
  EB.pool=ebBuildPool(EB.theme);
  EB.qIdx=0;EB.score=0;EB.answers=[];
  var body=$b();
  body.innerHTML='';
  body.scrollTop=0;
  document.getElementById('eb-prog-wrap').style.display='none';
  var name=EB.name||'';
  var restartMsgs=[
    (name?name+', n':'N')+'ouvelle session. 🌿 Les questions seront différentes — réponds toujours à l\'instinct.',
    'On repart depuis le début. ✨ '+(name?name+', tes r':'R')+'éponses d\'aujourd\'hui ne seront jamais les mêmes.',
    'Nouvelle page, '+(name||'ami(e)')+'. 🌱 Ce que tu ressentiras dans cette session sera différent — c\'est l\'idée.'
  ];
  addEva(restartMsgs[Math.floor(Math.random()*restartMsgs.length)],0);
  setTimeout(function(){setProgress(1,EB.pool.length);ebShowQuestion();},1100);
};

(function(){
  if(window._ebGoPatched)return;
  window._ebGoPatched=true;
  var origGo=window.go;
  window.go=function(id){
    origGo(id);
    if(id==='eva-bienetre'){setTimeout(function(){ebStart();},100);}
  };
})();
})();
