
(function(){
/* ════════════════════════════════════════
   MON JOURNAL DU JOUR — EVA Bien-être
   Bilan quotidien · Radar · Actions · Suivi
════════════════════════════════════════ */

var JNL_KEY='jnl_v2';
var JNL={name:'',tab:0};

/* ── Storage ── */
function load(){try{return JSON.parse(localStorage.getItem(JNL_KEY)||'{"name":"","entries":[],"streak":0,"lastDate":""}');}catch(e){return{name:'',entries:[],streak:0,lastDate:''};}}
function save(d){try{localStorage.setItem(JNL_KEY,JSON.stringify(d));}catch(e){}}

/* ── Date utils ── */
function todayStr(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function fmtDate(){var d=new Date();var days=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];var mos=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];return days[d.getDay()]+' '+d.getDate()+' '+mos[d.getMonth()];}
function getMoment(){var h=new Date().getHours();return h<12?'matin':h<18?'après-midi':'soir';}
function dayLbl(s){var d=new Date(s);return['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()];}
function yestStr(){var d=new Date();d.setDate(d.getDate()-1);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}

/* ── Thèmes ── */
var THEMES=[
  {id:'energie',name:'Énergie & Humeur',color:'#f59e0b',bg:'#fffbeb',
   ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
   questions:[
     '{n}, comment ton corps se sent en ce {m} ?',
     '{n}, décris ton niveau d\'énergie en ce {m} en un chiffre…',
     '{n}, comment tu as dormi cette nuit ? Ça se ressent aujourd\'hui ?',
     '{n}, tu te sens plutôt chargé(e) ou léger(e) en ce {m} ?',
     '{n}, ton moral depuis ce matin — ça monte ou ça descend ?',
     '{n}, si ton énergie était une météo aujourd\'hui, ce serait quoi ?'
   ]},
  {id:'argent',name:'Finances & Sérénité',color:'#10b981',bg:'#f0fdf4',
   ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>',
   questions:[
     '{n}, ton stress financier en ce {m} — de 1 à 10 ?',
     '{n}, tu te sens en contrôle de ton argent aujourd\'hui ?',
     '{n}, est-ce qu\'une dépense ou une dette te préoccupe là ?',
     '{n}, ton rapport à l\'argent est plutôt serein ou tendu en ce {m} ?',
     '{n}, tu as pensé à tes finances aujourd\'hui — ça te pèse ou pas ?',
     '{n}, si tu pouvais changer UNE chose financière là, ce serait quoi ?'
   ]},
  {id:'mental',name:'Santé Mentale',color:'#8b5cf6',bg:'#faf5ff',
   ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/></svg>',
   questions:[
     '{n}, ton niveau d\'anxiété en ce {m} — il est où ?',
     '{n}, tu te sens en confiance avec toi-même là ?',
     '{n}, tes pensées sont plutôt claires ou embrouillées en ce {m} ?',
     '{n}, tu es en paix intérieurement en ce {m} ?',
     '{n}, est-ce que quelque chose tourne en boucle dans ta tête là ?',
     '{n}, comment tu te parles à toi-même aujourd\'hui — avec douceur ou dureté ?'
   ]},
  {id:'amour',name:'Confiance & Estime de soi',color:'#f43f5e',bg:'#fff1f2',
   ico:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
   questions:[
     '{n}, tu te sens légitime dans ce que tu fais en ce {m} ?',
     '{n}, le doute te freine ou tu avances quand même là ?',
     '{n}, tu reconnais tes réussites ou tu les minimises aujourd\'hui ?',
     '{n}, est-ce qu\'une situation te fait douter de toi en ce {m} ?',
     '{n}, la dernière fois que tu as été fier(ère) de toi — c\'était quand ?',
     '{n}, tu te sens à la hauteur ou en imposteur en ce {m} ?'
   ]}
];

function getQ(theme){
  var d=new Date();
  var idx=Math.floor((d-new Date(d.getFullYear(),0,0))/(864e5))%theme.questions.length;
  var data=load();
  var prenom=data.name||JNL.name||'toi';
  var m=getMoment();
  return theme.questions[idx].replace(/{n}/g,prenom).replace(/{m}/g,m);
}

function scoreLbl(v){return v<=2?'Très difficile':v<=4?'Difficile':v<=6?'Moyen':v<=8?'Bien':'Excellent';}
function scoreEmoji(avg){return avg<=3?'😔':avg<=5?'😐':avg<=7?'🙂':'😊';}
function levelTxt(avg){return avg<=3?'Journée difficile':avg<=5?'Journée moyenne':avg<=7?'Bonne journée':'Excellente journée !';}
function levelColor(avg){return avg<=3?'#f43f5e':avg<=5?'#f59e0b':avg<=7?'#10b981':'#8b5cf6';}

/* ── Réponses EVA personnalisées ── */
var EVA_THEME_MSG={
  energie:{
    bas:[
      'Ton énergie est basse en ce {m}, {n}. Ton corps te demande quelque chose — écoute-le vraiment.',
      '{n}, cette fatigue que tu ressens là, c\'est légitime. Un verre d\'eau, 5 minutes à l\'air. Juste ça.',
      'Le corps parle avant que la tête comprenne, {n}. Ce que tu ressens là a une raison — sois doux(ce) avec toi.'
    ],
    mid:[
      '{n}, tu es dans le milieu — fonctionnel(le) mais pas au sommet. C\'est une journée normale. Avance doucement.',
      'Énergie moyenne en ce {m}, {n}. Ni haut ni bas — utilise cette stabilité pour faire une chose utile.',
      '{n}, tu gères. Pas à fond, mais tu avances. Et ça, c\'est déjà beaucoup.'
    ],
    top:[
      'Tu rayonnes en ce {m}, {n} ! Cette énergie, utilise-la pour ce que tu repousses.',
      '{n}, tu es au top — c\'est le moment d\'attaquer ta tâche la plus difficile. Ne gaspille pas cet état.',
      'Quelle belle énergie {n} ! Les journées comme celle-ci, on les ancre. Qu\'est-ce que tu veux accomplir ?'
    ]
  },
  argent:{
    bas:[
      '{n}, le stress financier est épuisant parce qu\'il touche à la sécurité. Respire. Une chose à la fois.',
      'L\'argent pèse lourd en ce {m}, {n}. Ta valeur n\'est pas ton solde — rappelle-toi ça.',
      '{n}, je vois que c\'est difficile côté finances. Note UNE action concrète possible cette semaine. Juste une.'
    ],
    mid:[
      '{n}, la situation financière est correcte — ni stressante ni euphorique. C\'est un bon moment pour planifier.',
      'Tu gères tes finances, {n}. Pas parfaitement, mais tu tiens. Continue de regarder les chiffres sans fuite.',
      '{n}, état financier moyen mais stable. Profite de cette clarté pour faire un point rapide sur tes dépenses.'
    ],
    top:[
      '{n}, belle sérénité financière ! C\'est maintenant qu\'on prend les décisions importantes — la tête est claire.',
      'Tu es tranquille côté argent, {n}. C\'est le moment d\'aller un cran plus loin : épargne, investissement, projet.',
      '{n}, cette paix financière est précieuse. Utilise-la pour avancer sur un objectif concret.'
    ]
  },
  mental:{
    bas:[
      '{n}, ton mental est sous pression. Ce que tu ressens est réel et valide. Pas besoin d\'aller bien pour être courageux(se).',
      'Journée mentalement difficile, {n}. Un seul mot d\'ordre : douceur. Envers toi-même, maintenant.',
      '{n}, quand la tête est lourde, parler aide. Même un message à quelqu\'un. Même juste noter ce qui pèse.'
    ],
    mid:[
      '{n}, ton mental tient. Pas parfait, mais debout — et c\'est ce qui compte vraiment.',
      'État mental correct en ce {m}, {n}. Garde un espace calme pour toi ce soir — même 10 minutes.',
      '{n}, tu fonctionnes bien. Un moment de pleine conscience ce soir pour consolider ça ?'
    ],
    top:[
      '{n}, ton mental est clair et solide ! C\'est précieux — protège cet espace aujourd\'hui.',
      'Belle clarté mentale, {n} ! Prends une décision difficile que tu repoussais. Maintenant c\'est le moment.',
      '{n}, tu es au top mentalement. Utilise ça pour avancer sur quelque chose qui t\'effraye.'
    ]
  },
  amour:{
    bas:[
      '{n}, douter de soi à ce point est épuisant — et très humain. Tu n\'es pas seul(e) à vivre ça.',
      'La confiance manque aujourd\'hui, {n}. Commence par toi — note UNE réussite, même petite.',
      '{n}, c\'est dur côté confiance. Une chose concrète : parle-toi avec la douceur que tu offrirais à un(e) ami(e).'
    ],
    mid:[
      '{n}, ta confiance est correcte — ni solide ni effondrée. C\'est un bon point pour ancrer une réussite récente.',
      'Confiance stable, {n}. Note une preuve concrète de ta compétence — relis-la au prochain doute.',
      '{n}, état moyen côté confiance. C\'est souvent là qu\'on oublie de reconnaître ce qu\'on a accompli. Essaie aujourd\'hui.'
    ],
    top:[
      '{n}, tu te sens légitime — c\'est précieux, pas toujours acquis. Chéris ça.',
      'Belle confiance en ce {m}, {n} ! C\'est le bon moment pour oser un peu plus loin.',
      '{n}, tu rayonnes de confiance. Continue de t\'appuyer sur cette énergie.'
    ]
  }
};

function getThemeMsg(themeId, score){
  var data=load();
  var n=data.name||JNL.name||'toi';
  var m=getMoment();
  var pool=EVA_THEME_MSG[themeId];
  var arr=score<=4?pool.bas:score<=7?pool.mid:pool.top;
  var txt=arr[Math.floor(Math.random()*arr.length)];
  return txt.replace(/{n}/g,n).replace(/{m}/g,m);
}

/* ── Actions concrètes par thème et niveau ── */
var ACTIONS={
  energie:{
    bas:[
      {txt:'Bois un grand verre d\'eau maintenant — avant tout le reste.',when:'Dans les 5 prochaines minutes'},
      {txt:'Fais 5 respirations lentes : inspire 4s, expire 6s. Ton système nerveux se régule en 90 secondes.',when:'Maintenant'},
      {txt:'Sors prendre l\'air 10 minutes — même juste devant la porte.',when:'Dans l\'heure'},
      {txt:'Ferme les yeux 3 minutes et scanne ton corps : où est la tension ? Relâche-la.',when:'Aujourd\'hui'}
    ],
    mid:[
      {txt:'Identifie ta seule priorité pour les 2 prochaines heures. Écris-la.',when:'Maintenant'},
      {txt:'Fais une pause de 15 minutes sans écran cet après-midi.',when:'Cet après-midi'},
      {txt:'Mange quelque chose de nourrissant si ce n\'est pas encore fait.',when:'Avant 14h'},
      {txt:'Note 1 chose positive qui s\'est passée aujourd\'hui.',when:'Ce soir'}
    ],
    top:[
      {txt:'Lance-toi sur ta tâche la plus difficile — tu as l\'énergie pour ça maintenant.',when:'Dans l\'heure'},
      {txt:'Partage ton énergie : envoie un message motivant à quelqu\'un.',when:'Aujourd\'hui'},
      {txt:'Bloque 90 minutes de focus profond — notif coupées.',when:'Cet après-midi'},
      {txt:'Note ce qui t\'a donné cette énergie pour reproduire l\'état demain.',when:'Ce soir'}
    ]
  },
  argent:{
    bas:[
      {txt:'Note tes 3 dépenses fixes du mois — juste les nommer calme déjà.',when:'Ce soir, 10 min'},
      {txt:'Vérifie tes droits sur mes-aides.gouv.fr — peut-être qu\'il y a quelque chose pour toi.',when:'Cette semaine'},
      {txt:'Parle de cette inquiétude à quelqu\'un de confiance — ne porte pas ça seul(e).',when:'Aujourd\'hui ou demain'},
      {txt:'Mets de côté ne serait-ce que 5€ quelque part — l\'acte symbolique compte.',when:'Aujourd\'hui'}
    ],
    mid:[
      {txt:'Vérifie ton solde et note ton "reste à vivre" ce mois — juste pour voir.',when:'Ce soir'},
      {txt:'Identifie une dépense non-essentielle de la semaine et note-la.',when:'Cette semaine'},
      {txt:'Automatise un petit virement épargne, même 20€/mois.',when:'Cette semaine'},
      {txt:'Liste une chose concrète pour améliorer ta situation financière.',when:'Ce week-end'}
    ],
    top:[
      {txt:'C\'est le bon moment pour regarder tes placements ou ton épargne.',when:'Ce soir ou demain'},
      {txt:'Prends une décision financière que tu reportes — tu es serein(e) pour la faire.',when:'Cette semaine'},
      {txt:'Appelle ta banque ou un conseiller pour optimiser ton épargne.',when:'Cette semaine'},
      {txt:'Fixe un objectif financier pour le mois prochain — concret et mesurable.',when:'Ce soir'}
    ]
  },
  mental:{
    bas:[
      {txt:'Écris ce qui te pèse le plus sur papier — externaliser calme le mental.',when:'Ce soir, 5 min'},
      {txt:'Appelle ou envoie un message à quelqu\'un de bienveillant.',when:'Aujourd\'hui'},
      {txt:'Exercice d\'ancrage : 5 choses vues, 4 entendues, 3 touchées — reviens dans le présent.',when:'Maintenant'},
      {txt:'Permets-toi de ne rien accomplir d\'important ce soir. Just être.',when:'Ce soir'}
    ],
    mid:[
      {txt:'5 minutes de journaling ce soir : ce qui a pesé / ce qui a surpris en bien.',when:'Ce soir'},
      {txt:'Méditation guidée de 10 minutes avant de dormir (Petit Bambou, Calm).',when:'Ce soir'},
      {txt:'Dis à quelqu\'un comment tu vas vraiment — même en 1 message.',when:'Aujourd\'hui'},
      {txt:'Fais une liste de 3 choses pour lesquelles tu es reconnaissant(e) aujourd\'hui.',when:'Ce soir'}
    ],
    top:[
      {txt:'Prends cette décision difficile que tu reportes — ton mental est au clair.',when:'Aujourd\'hui'},
      {txt:'Aie la conversation que tu évitais — tu es en position de force.',when:'Cette semaine'},
      {txt:'Partage quelque chose de vrai avec quelqu\'un qui compte.',when:'Aujourd\'hui'},
      {txt:'Note ce que tu fais pour aller aussi bien — pour reproduire demain.',when:'Ce soir'}
    ]
  },
  amour:{
    bas:[
      {txt:'Liste 3 réussites récentes dont tu es fier(ère), même petites — sans les minimiser.',when:'Ce soir'},
      {txt:'Écris ce que tu ressens face au doute en ce moment — sans censure.',when:'Ce soir'},
      {txt:'Parle-toi avec la douceur que tu offrirais à un(e) ami(e) en difficulté.',when:'Aujourd\'hui'},
      {txt:'Dis-toi une chose vraie sur ce que tu as réussi à accomplir.',when:'Aujourd\'hui'}
    ],
    mid:[
      {txt:'Prends 5 minutes pour noter une preuve concrète de ta compétence.',when:'Aujourd\'hui'},
      {txt:'Accepte un compliment reçu récemment sans le minimiser.',when:'Aujourd\'hui'},
      {txt:'Planifie une action où tu oses te montrer un peu plus cette semaine.',when:'Cette semaine'},
      {txt:'Demande un retour honnête à quelqu\'un en qui tu as confiance.',when:'Cette semaine'}
    ],
    top:[
      {txt:'Reconnais pleinement ce que tu viens d\'accomplir — sans le minimiser.',when:'Aujourd\'hui'},
      {txt:'Ose une demande que tu repoussais (salaire, projet, opportunité).',when:'Cette semaine'},
      {txt:'Partage cette confiance — encourage quelqu\'un qui doute de lui(elle).',when:'Cette semaine'},
      {txt:'Note ce qui nourrit ta confiance en ce moment — pour continuer.',when:'Ce soir'}
    ]
  }
};

function getActions(scores){
  var result=[];
  THEMES.forEach(function(t){
    var v=scores[t.id]||5;
    var pool=v<=4?ACTIONS[t.id].bas:v<=7?ACTIONS[t.id].mid:ACTIONS[t.id].top;
    var picked=pool[Math.floor(Math.random()*pool.length)];
    result.push({theme:t,action:picked,score:v});
  });
  // Trier par score croissant — priorité aux piliers faibles
  result.sort(function(a,b){return a.score-b.score;});
  return result.slice(0,4);
}

/* ── Analyse EVA globale hebdo ── */
function getGlobalMsg(avg, name, weakTheme, strongTheme){
  var n=name||'toi';
  var base=avg<=4
    ?'Je regarde ton bilan, '+n+', et je vois quelqu\'un qui porte beaucoup cette période. Ton énergie, ton mental, tes relations, tes finances — tout est lié. Quand un pilier chancelle, les autres en ressentent les effets. La priorité cette semaine : un seul domaine, une seule action concrète. Pas dix. Une.'
    :avg<=7
    ?'Ton bilan de la semaine est honnête, '+n+'. Tu avances, même lentement. Ce qui ressort clairement : ton point d\'attention est <strong>'+weakTheme+'</strong>. Un effort ciblé là-dessus cette semaine changera l\'équilibre global. Et tu peux t\'appuyer sur ta force : <strong>'+strongTheme+'</strong>.'
    :''+n+', ton bilan cette semaine est solide. Tu es en mouvement sur les 4 dimensions — c\'est rare et précieux. Utilise cet élan pour attaquer ce que tu repousses. Et protège ce qui fonctionne : <strong>'+strongTheme+'</strong> est ta force du moment.';
  return base;
}

/* ════ INIT ════ */
window.etrInit=function(){
  JNL.tab=0;
  var data=load();
  JNL.name=data.name||'';
  // Streak
  document.getElementById('jnl-streak-val').textContent=data.streak||0;
  document.getElementById('jnl-hdr-sub').textContent=fmtDate();
  // Tabs
  [0,1,2].forEach(function(i){document.getElementById('jnl-t'+i).classList.toggle('active',i===0);});
  jnlRenderBilan();
};

window.jnlTab=function(i){
  JNL.tab=i;
  [0,1,2].forEach(function(j){document.getElementById('jnl-t'+j).classList.toggle('active',j===i);});
  if(i===0) jnlRenderBilan();
  else if(i===1) jnlRenderSemaine();
  else jnlRenderEvaParle();
};

/* ════ TAB 0 : BILAN DU JOUR ════ */
function jnlRenderBilan(){
  var body=document.getElementById('jnl-body');
  body.innerHTML='';
  var data=load();
  var today=todayStr();
  var done=data.entries&&data.entries.find(function(e){return e.date===today;});

  // Demander le prénom si pas encore connu
  if(!data.name){
    jnlRenderNamePrompt(body);
    return;
  }
  JNL.name=data.name;

  if(done){
    jnlRenderDoneToday(body, done, data.name);
    return;
  }

  jnlRenderForm(body, data.name);
}

function jnlRenderNamePrompt(body){
  var moment=getMoment();
  var momentGreet=moment==='matin'?'Bonjour':moment==='après-midi'?'Bon après-midi':'Bonsoir';
  var div=document.createElement('div');
  div.className='jnl-intro';
  div.innerHTML='<div class="jnl-welcome-card">'
    +'<div class="jnl-welcome-moment">'+momentGreet+' 💜</div>'
    +'<div class="jnl-welcome-title">Bienvenue dans ton Journal de Bien-être</div>'
    +'<div class="jnl-welcome-sub">Chaque jour, prends 2 minutes au calme pour faire le point sur toi-même. Honnêtement. Sans filtre. C\'est pour toi, rien que pour toi.</div>'
    +'</div>'
    +'<div class="jnl-name-prompt">'
    +'<div class="jnl-name-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Comment tu t\'appelles ?</div>'
    +'<input class="jnl-name-input" id="jnl-name-inp" type="text" placeholder="Ton prénom…" maxlength="20">'
    +'<button class="jnl-name-btn" onclick="jnlSaveName()">Commencer mon journal 💜</button>'
    +'</div>';
  body.appendChild(div);
  setTimeout(function(){var el=document.getElementById('jnl-name-inp');if(el)el.focus();},300);
}

window.jnlSaveName=function(){
  var el=document.getElementById('jnl-name-inp');
  if(!el) return;
  var n=(el.value||'').trim();
  if(!n){el.focus();el.style.borderColor='#f43f5e';return;}
  var data=load();
  data.name=n;
  save(data);
  JNL.name=n;
  jnlRenderBilan();
};

function jnlRenderForm(body, name){
  var moment=getMoment();
  var momentGreet=moment==='matin'?'Ce matin':moment==='après-midi'?'Cet après-midi':'Ce soir';

  // Intro
  var intro=document.createElement('div');
  intro.className='jnl-intro';
  intro.innerHTML='<div class="jnl-welcome-card">'
    +'<div class="jnl-welcome-moment">Bilan du '+moment+' · '+fmtDate()+'</div>'
    +'<div class="jnl-welcome-title">'+momentGreet+', '+name+' 💜</div>'
    +'<div class="jnl-welcome-sub">Prends 2 minutes au calme. Réponds à l\'instinct — c\'est toujours le plus juste. Ce bilan est pour toi, pas pour performer.</div>'
    +'</div>';
  body.appendChild(intro);

  var scores={};
  var notes={};

  // Section titre
  var secDiv=document.createElement('div');
  secDiv.className='jnl-section';
  secDiv.innerHTML='<div class="jnl-section-title"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a9080" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Note tes 4 piliers</div>';
  body.appendChild(secDiv);

  THEMES.forEach(function(t,i){
    scores[t.id]=5;
    var q=getQ(t);
    var card=document.createElement('div');
    card.className='jnl-section';
    var inner=document.createElement('div');
    inner.className='jnl-card';
    inner.style.borderColor=t.color+'33';
    inner.innerHTML='<div class="jnl-card-hdr">'
      +'<div class="jnl-card-ico" style="background:'+t.bg+'">'+t.ico+'</div>'
      +'<div><div class="jnl-card-name">'+t.name+'</div><div class="jnl-card-q">'+q+'</div></div>'
      +'</div>'
      +'<div class="jnl-slider-outer">'
      +'<div class="jnl-score-row">'
      +'<div><div class="jnl-score-num" id="jnl-n-'+t.id+'" style="color:'+t.color+'">5</div><div class="jnl-score-word" id="jnl-w-'+t.id+'" style="color:'+t.color+'">Moyen</div></div>'
      +'</div>'
      +'<input type="range" class="jnl-slider" id="jnl-sl-'+t.id+'" min="1" max="10" value="5" style="accent-color:'+t.color+';background:linear-gradient(to right,'+t.color+' 44%,#e8e2da 44%);">'
      +'<div class="jnl-slider-ends"><span>😞 Très difficile</span><span>😊 Excellent</span></div>'
      +'</div>'
      +'<div class="jnl-note-wrap">'
      +'<div class="jnl-note-label">Une pensée libre (optionnel)</div>'
      +'<textarea class="jnl-note-input" id="jnl-nt-'+t.id+'" placeholder="Ce que tu ressens vraiment sur ce point…"></textarea>'
      +'</div>';
    card.appendChild(inner);
    body.appendChild(card);

    (function(theme){
      var sl=document.getElementById('jnl-sl-'+theme.id);
      var num=document.getElementById('jnl-n-'+theme.id);
      var wrd=document.getElementById('jnl-w-'+theme.id);
      sl.addEventListener('input',function(){
        var v=parseInt(sl.value);
        scores[theme.id]=v;
        var pct=((v-1)/9)*100;
        sl.style.background='linear-gradient(to right,'+theme.color+' '+pct+'%,#e8e2da '+pct+'%)';
        num.textContent=v;
        wrd.textContent=scoreLbl(v);
      });
    })(t);
  });

  // Bouton valider
  var btnWrap=document.createElement('div');
  btnWrap.style.padding='10px 16px 28px';
  var btn=document.createElement('button');
  btn.className='jnl-validate-btn';
  btn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Valider mon bilan du '+moment;
  btn.onclick=function(){
    THEMES.forEach(function(t){
      var sl=document.getElementById('jnl-sl-'+t.id);
      var nt=document.getElementById('jnl-nt-'+t.id);
      if(sl) scores[t.id]=parseInt(sl.value);
      if(nt) notes[t.id]=nt.value.trim();
    });
    var total=THEMES.reduce(function(a,t){return a+scores[t.id];},0);
    var avg=Math.round((total/THEMES.length)*10)/10;
    var entry={date:todayStr(),moment:moment,scores:scores,notes:notes,avg:avg};
    var data=load();
    if(!data.entries) data.entries=[];
    data.entries=data.entries.filter(function(e){return e.date!==todayStr();});
    data.entries.push(entry);
    // Streak
    var hadYest=data.entries.some(function(e){return e.date===yestStr();});
    data.streak=(hadYest?(data.streak||0):0)+1;
    document.getElementById('jnl-streak-val').textContent=data.streak;
    save(data);
    jnlRenderResult(body, entry, data.name);
  };
  btnWrap.appendChild(btn);
  body.appendChild(btnWrap);
}

function jnlRenderResult(body, entry, name){
  body.innerHTML='';
  var avg=entry.avg;
  var scores=entry.scores;
  var notes=entry.notes||{};

  // Hero
  var res=document.createElement('div');
  res.className='jnl-result';

  var hero=document.createElement('div');
  hero.className='jnl-result-hero';
  hero.innerHTML='<div class="jnl-result-name">Bilan de '+name+' · '+fmtDate()+'</div>'
    +'<div class="jnl-result-emoji">'+scoreEmoji(avg)+'</div>'
    +'<div class="jnl-result-level">'+levelTxt(avg)+'</div>'
    +'<div class="jnl-result-avg">Moyenne globale : <strong>'+avg+'/10</strong> · '+entry.moment+'</div>';
  res.appendChild(hero);

  // Barres thèmes
  var bars=document.createElement('div');
  bars.className='jnl-theme-bars';
  bars.innerHTML='<div style="font-size:.56rem;font-weight:900;color:#9a9080;text-transform:uppercase;letter-spacing:.12em;margin-bottom:12px;">Tes 4 piliers aujourd\'hui</div>';
  THEMES.forEach(function(t){
    var v=scores[t.id]||5;
    var pct=Math.round(((v-1)/9)*100);
    var row=document.createElement('div');
    row.className='jnl-theme-bar-row';
    row.innerHTML='<div class="jnl-theme-bar-ico" style="background:'+t.bg+'">'+t.ico+'</div>'
      +'<div class="jnl-theme-bar-info"><div class="jnl-theme-bar-name">'+t.name+'</div>'
      +'<div class="jnl-theme-bar-track"><div class="jnl-theme-bar-fill" style="width:'+pct+'%;background:'+t.color+'"></div></div></div>'
      +'<div class="jnl-theme-bar-val" style="color:'+t.color+'">'+v+'</div>';
    bars.appendChild(row);
  });
  res.appendChild(bars);
  body.appendChild(res);

  // Radar
  var radarCard=document.createElement('div');
  radarCard.className='jnl-radar-card';
  radarCard.style.margin='0 16px 12px';
  radarCard.innerHTML='<div class="jnl-radar-title">🕸️ Ton équilibre du jour</div>';
  var canvas=document.createElement('canvas');
  canvas.width=260;canvas.height=260;
  canvas.style.cssText='max-width:240px;width:100%;';
  radarCard.appendChild(canvas);
  body.appendChild(radarCard);
  drawRadar(canvas,[scores.energie,scores.argent,scores.mental,scores.amour]);

  // Message EVA détaillé
  var evaCard=document.createElement('div');
  evaCard.className='jnl-eva-card';
  evaCard.style.margin='0 16px 12px';
  var evaTxt='<div class="jnl-eva-lbl">✦ EVA — Ton bilan personnalisé</div><div class="jnl-eva-txt">';
  evaTxt+='<strong>'+name+', voici ce que je lis dans ton bilan de ce '+entry.moment+'. 💜</strong><br><br>';
  THEMES.forEach(function(t){
    var v=scores[t.id]||5;
    var msg=getThemeMsg(t.id,v);
    var note=notes[t.id];
    evaTxt+='<span style="color:'+t.color+';font-weight:800;">'+t.name+' — '+v+'/10</span><br>';
    evaTxt+=msg+'<br>';
    if(note) evaTxt+='<em style="color:#9a9080;font-size:.68rem;">Tu as noté : "'+note+'"</em><br>';
    evaTxt+='<br>';
  });
  // Message global
  var globalLevel=avg<=4?'rouge':avg<=7?'orange':'vert';
  var globalMsg={
    rouge:'<div style="border-top:1px solid #ede8e1;padding-top:12px;margin-top:4px;font-style:italic;color:#f43f5e;"><strong>'+name+', aujourd\'hui c\'est une journée difficile.</strong> Ne te juge pas là-dessus. Tu as quand même pris ce moment pour toi — c\'est déjà un acte de courage. Demain est une nouvelle page. 💜</div>',
    orange:'<div style="border-top:1px solid #ede8e1;padding-top:12px;margin-top:4px;font-style:italic;color:#f59e0b;"><strong>'+name+', tu es dans l\'entre-deux</strong> — ni au fond ni au sommet. C\'est une position qui invite à un petit effort ciblé. Regarde ton pilier le plus bas et fais UNE chose concrète pour lui aujourd\'hui. 🌤️</div>',
    vert:'<div style="border-top:1px solid #ede8e1;padding-top:12px;margin-top:4px;font-style:italic;color:#059669;"><strong>'+name+', belle journée !</strong> Tu es aligné(e) sur plusieurs dimensions à la fois — c\'est rare. Protège cet état et utilise-le pour avancer sur ce qui compte vraiment. 🌟</div>'
  }[globalLevel];
  evaTxt+=globalMsg+'</div>';
  evaCard.innerHTML=evaTxt;
  body.appendChild(evaCard);

  // Actions concrètes
  var actions=getActions(scores);
  var actCard=document.createElement('div');
  actCard.className='jnl-actions-card';
  actCard.style.margin='0 16px 12px';
  actCard.innerHTML='<div class="jnl-actions-title"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Actions concrètes pour toi, '+name+'</div>';
  actions.forEach(function(a,i){
    var item=document.createElement('div');
    item.className='jnl-action-item';
    var chk=document.createElement('div');
    chk.className='jnl-action-check';
    chk.id='jnl-chk-'+i;
    chk.innerHTML='';
    chk.onclick=(function(idx){return function(){
      var el=document.getElementById('jnl-chk-'+idx);
      el.classList.toggle('done');
      el.innerHTML=el.classList.contains('done')?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>':'';
    };})(i);
    var txt=document.createElement('div');
    txt.innerHTML='<div class="jnl-action-txt" style="color:'+a.theme.color+'66;color:#4a3f6b;">'+a.action.txt+'</div>'
      +'<div class="jnl-action-when">⏰ '+a.action.when+'</div>';
    item.appendChild(chk);
    item.appendChild(txt);
    actCard.appendChild(item);
  });
  body.appendChild(actCard);

  // Boutons
  var btns=document.createElement('div');
  btns.style.padding='6px 16px 30px';
  btns.innerHTML='<button style="width:100%;background:linear-gradient(135deg,#8b5cf6,#d946ef);border:none;border-radius:13px;padding:13px;font-size:.74rem;font-weight:700;color:#fff;font-family:inherit;cursor:pointer;margin-bottom:9px;box-shadow:0 4px 14px rgba(139,92,246,.25);" onclick="jnlTab(1)">📈 Voir mon évolution cette semaine</button>'
    +'<button style="width:100%;background:#f0ece6;border:1.5px solid #ddd7ce;border-radius:13px;padding:12px;font-size:.7rem;font-weight:700;color:#6b5e54;font-family:inherit;cursor:pointer;" onclick="go(\'eva\')">← Retour au menu EVA</button>';
  body.appendChild(btns);
}

function jnlRenderDoneToday(body, entry, name){
  body.innerHTML='';
  var div=document.createElement('div');
  div.style.cssText='padding:20px 16px 0;';
  div.innerHTML='<div style="background:#fff;border:1px solid #e8e2da;border-radius:16px;padding:18px;text-align:center;margin-bottom:14px;">'
    +'<div style="font-size:1.8rem;margin-bottom:8px;">✅</div>'
    +'<div style="font-size:.8rem;font-weight:800;color:#2d2620;margin-bottom:4px;">Bilan du jour complété, '+name+' !</div>'
    +'<div style="font-size:.66rem;color:#9a9080;line-height:1.6;">Tu as fait ton check-in de ce '+entry.moment+'.<br>Reviens demain pour un nouveau bilan.</div>'
    +'</div>';
  body.appendChild(div);
  jnlRenderResult(body, entry, name);
}

/* ════ TAB 1 : MA SEMAINE ════ */
function jnlRenderSemaine(){
  var body=document.getElementById('jnl-body');
  body.innerHTML='';
  var data=load();
  var entries=(data.entries||[]).slice(-7);

  if(!entries.length){
    body.innerHTML='<div style="padding:40px 20px;text-align:center;"><div style="font-size:2rem;margin-bottom:12px;">📊</div><div style="font-size:.76rem;color:#9a9080;line-height:1.6;">Pas encore de données.<br>Fais ton premier bilan pour voir ton évolution ici !</div></div>';
    return;
  }

  var avgAll=entries.reduce(function(a,e){return a+e.avg;},0)/entries.length;
  avgAll=Math.round(avgAll*10)/10;

  // Stats
  var hist=document.createElement('div');
  hist.className='jnl-hist';

  var stats=document.createElement('div');
  stats.className='jnl-stat-grid';
  stats.innerHTML='<div class="jnl-stat-box"><div class="jnl-stat-val" style="color:#8b5cf6;">'+avgAll+'</div><div class="jnl-stat-lbl">Moy. semaine</div></div>'
    +'<div class="jnl-stat-box"><div class="jnl-stat-val" style="color:#f59e0b;">'+(data.streak||0)+'</div><div class="jnl-stat-lbl">🔥 Streak</div></div>'
    +'<div class="jnl-stat-box"><div class="jnl-stat-val" style="color:#10b981;">'+entries.length+'</div><div class="jnl-stat-lbl">Bilans</div></div>';
  hist.appendChild(stats);

  // Graphe barres
  var chart=document.createElement('div');
  chart.className='jnl-chart-card';
  chart.innerHTML='<div class="jnl-chart-title">📅 Évolution sur 7 jours</div>';
  var barsWrap=document.createElement('div');
  barsWrap.className='jnl-bars-week';
  var maxH=window.innerWidth>=900?150:120;
  entries.forEach(function(e){
    var col=levelColor(e.avg);
    var h=Math.round((e.avg/10)*maxH);
    var d=document.createElement('div');
    d.className='jnl-bar-day';
    d.innerHTML='<div class="jnl-bar-day-lbl">'+dayLbl(e.date)+'</div>'
      +'<div style="flex:1;display:flex;align-items:flex-end;width:100%;">'
      +'<div class="jnl-bar-day-col" style="height:'+h+'px;background:'+col+';"></div></div>'
      +'<div class="jnl-bar-day-num" style="color:'+col+'">'+e.avg+'</div>';
    barsWrap.appendChild(d);
  });
  chart.appendChild(barsWrap);
  hist.appendChild(chart);

  // Moyennes par thème
  if(entries.length>=2){
    var themeCard=document.createElement('div');
    themeCard.className='jnl-chart-card';
    themeCard.innerHTML='<div class="jnl-chart-title">🎯 Tes piliers cette semaine</div>';
    var themeAvgs=[];
    THEMES.forEach(function(t){
      var sum=entries.reduce(function(a,e){return a+(e.scores&&e.scores[t.id]||5);},0);
      var avg=Math.round((sum/entries.length)*10)/10;
      themeAvgs.push(Math.round(avg));
      var pct=Math.round(((avg-1)/9)*100);
      var row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:11px;';
      row.innerHTML='<div style="width:32px;height:32px;border-radius:9px;background:'+t.bg+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+t.ico+'</div>'
        +'<div style="flex:1;"><div style="font-size:.62rem;font-weight:700;color:#3d3530;margin-bottom:3px;">'+t.name+'</div>'
        +'<div style="height:7px;background:#f0ece6;border-radius:4px;overflow:hidden;">'
        +'<div style="height:100%;width:'+pct+'%;background:'+t.color+';border-radius:4px;"></div></div></div>'
        +'<span style="font-size:.78rem;font-weight:900;color:'+t.color+';">'+avg+'</span>';
      themeCard.appendChild(row);
    });
    hist.appendChild(themeCard);

    // Radar semaine
    var radarCard=document.createElement('div');
    radarCard.className='jnl-radar-card';
    radarCard.innerHTML='<div class="jnl-radar-title">🕸️ Radar de la semaine</div>';
    var canvas=document.createElement('canvas');
    canvas.width=260;canvas.height=260;
    canvas.style.cssText='max-width:240px;width:100%;';
    radarCard.appendChild(canvas);
    hist.appendChild(radarCard);
    drawRadar(canvas, themeAvgs);
  }

  body.appendChild(hist);
}

/* ════ TAB 2 : EVA PARLE ════ */
function jnlRenderEvaParle(){
  var body=document.getElementById('jnl-body');
  body.innerHTML='';
  var data=load();
  var entries=(data.entries||[]).slice(-7);
  var name=data.name||'toi';

  if(entries.length<2){
    body.innerHTML='<div style="padding:40px 20px;text-align:center;"><div style="font-size:2rem;margin-bottom:12px;">💜</div><div style="font-size:.76rem;color:#9a9080;line-height:1.6;">EVA analyse tes données après 2 bilans minimum.<br>Continue ton journal pour débloquer cette analyse !</div></div>';
    return;
  }

  var avgAll=entries.reduce(function(a,e){return a+e.avg;},0)/entries.length;
  var themeAvgs={};
  THEMES.forEach(function(t){
    themeAvgs[t.id]=entries.reduce(function(a,e){return a+(e.scores&&e.scores[t.id]||5);},0)/entries.length;
  });

  var weakT=THEMES.reduce(function(a,t){return themeAvgs[t.id]<themeAvgs[a.id]?t:a;},THEMES[0]);
  var strongT=THEMES.reduce(function(a,t){return themeAvgs[t.id]>themeAvgs[a.id]?t:a;},THEMES[0]);

  var trend='stable';
  if(entries.length>=4){
    var h2=Math.floor(entries.length/2);
    var f=entries.slice(0,h2).reduce(function(a,e){return a+e.avg;},0)/h2;
    var l=entries.slice(-h2).reduce(function(a,e){return a+e.avg;},0)/h2;
    trend=l-f>0.5?'hausse':l-f<-0.5?'baisse':'stable';
  }
  var trendIcon={hausse:'📈',stable:'➡️',baisse:'📉'}[trend];
  var trendTxt={hausse:'En progression cette semaine',stable:'Stable cette semaine',baisse:'En baisse cette semaine'}[trend];

  var div=document.createElement('div');
  div.className='jnl-analyse';

  // Hero analyse
  var hero=document.createElement('div');
  hero.className='jnl-analyse-hero';
  hero.innerHTML='<div class="jnl-analyse-sub">Analyse personnalisée · '+name+'</div>'
    +'<div class="jnl-analyse-title">Ce qu\'EVA lit dans ton journal cette semaine 💜</div>'
    +'<div class="jnl-analyse-body">'+getGlobalMsg(avgAll,name,weakT.name,strongT.name)+'</div>';
  div.appendChild(hero);

  // Tendance
  var tCard=document.createElement('div');
  tCard.className='jnl-tip-card';
  tCard.style.borderLeftColor=trend==='hausse'?'#10b981':trend==='baisse'?'#f43f5e':'#f59e0b';
  tCard.innerHTML='<div class="jnl-tip-label">'+trendIcon+' Tendance</div>'
    +'<div class="jnl-tip-txt"><strong>'+trendTxt+'</strong> — Moyenne : <strong>'+Math.round(avgAll*10)/10+'/10</strong></div>';
  div.appendChild(tCard);

  // Fort / Faible
  var pfCard=document.createElement('div');
  pfCard.className='jnl-tip-card';
  pfCard.innerHTML='<div class="jnl-tip-label" style="color:'+strongT.color+'">💪 Ton point fort</div>'
    +'<div class="jnl-tip-txt"><strong style="color:'+strongT.color+'">'+strongT.name+'</strong> ('+Math.round(themeAvgs[strongT.id]*10)/10+'/10) — C\'est ton pilier solide. Appuie-toi dessus cette semaine.</div>';
  div.appendChild(pfCard);

  var wkCard=document.createElement('div');
  wkCard.className='jnl-tip-card';
  wkCard.style.borderLeftColor=weakT.color;
  wkCard.innerHTML='<div class="jnl-tip-label" style="color:'+weakT.color+'">⚠️ Ton point d\'attention</div>'
    +'<div class="jnl-tip-txt"><strong style="color:'+weakT.color+'">'+weakT.name+'</strong> ('+Math.round(themeAvgs[weakT.id]*10)/10+'/10) — Un seul effort ciblé ici changera tout.</div>';
  div.appendChild(wkCard);

  // Conseil de la semaine
  var consCard=document.createElement('div');
  consCard.className='jnl-tip-card';
  consCard.innerHTML='<div class="jnl-tip-label">🎯 Conseil EVA pour cette semaine</div>'
    +'<div class="jnl-tip-txt">Concentre-toi sur <strong style="color:'+weakT.color+'">'+weakT.name+'</strong>. Reviens faire ton bilan chaque jour — même 2 minutes. La régularité, pas l\'intensité, c\'est ce qui change vraiment les choses. EVA t\'attend ici chaque matin. 💜</div>';
  div.appendChild(consCard);

  // Bouton
  var btn=document.createElement('button');
  btn.style.cssText='width:100%;background:linear-gradient(135deg,#8b5cf6,#d946ef);border:none;border-radius:13px;padding:13px;font-size:.74rem;font-weight:700;color:#fff;font-family:inherit;cursor:pointer;margin-top:4px;box-shadow:0 4px 14px rgba(139,92,246,.25);';
  btn.textContent='✏️ Faire mon bilan du jour';
  btn.onclick=function(){jnlTab(0);};
  div.appendChild(btn);

  body.appendChild(div);
}

/* ════ RADAR CANVAS ════ */
function drawRadar(canvas, vals){
  if(canvas && canvas.parentNode){ return drawRadarPremium(canvas, vals); }
  setTimeout(function(){
    var ctx=canvas.getContext('2d');
    var cx=130,cy=130,r=95;
    var labels=['Énergie','Finances','Mental','Confiance'];
    var colors=['#f59e0b','#10b981','#8b5cf6','#f43f5e'];
    var n=4;
    var angles=[];
    for(var i=0;i<n;i++) angles.push((i/n)*2*Math.PI-Math.PI/2);
    ctx.clearRect(0,0,260,260);

    // Grille
    [0.25,0.5,0.75,1].forEach(function(p){
      ctx.beginPath();ctx.strokeStyle=p===1?'#ddd7ce':'#ede8e1';ctx.lineWidth=p===1?1.5:1;
      for(var i=0;i<n;i++){var x=cx+Math.cos(angles[i])*r*p,y=cy+Math.sin(angles[i])*r*p;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
      ctx.closePath();ctx.stroke();
    });
    // Axes
    ctx.strokeStyle='#ddd7ce';ctx.lineWidth=1;
    angles.forEach(function(a){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke();});

    // Zone
    ctx.beginPath();
    for(var i=0;i<n;i++){var v=(vals[i]||5)/10,x=cx+Math.cos(angles[i])*r*v,y=cy+Math.sin(angles[i])*r*v;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
    ctx.closePath();
    ctx.fillStyle='rgba(139,92,246,.12)';ctx.fill();
    ctx.strokeStyle='#8b5cf6';ctx.lineWidth=2;ctx.stroke();

    // Points
    for(var i=0;i<n;i++){
      var v=(vals[i]||5)/10,x=cx+Math.cos(angles[i])*r*v,y=cy+Math.sin(angles[i])*r*v;
      ctx.beginPath();ctx.arc(x,y,5,0,2*Math.PI);
      ctx.fillStyle=colors[i];ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
    }

    // Labels
    ctx.lineWidth=1;
    for(var i=0;i<n;i++){
      var lx=cx+Math.cos(angles[i])*(r+22),ly=cy+Math.sin(angles[i])*(r+22)+4;
      ctx.fillStyle=colors[i];ctx.font='bold 11px DM Sans,sans-serif';ctx.textAlign='center';
      ctx.fillText(labels[i],lx,ly);
      ctx.fillStyle='#6b5e54';ctx.font='10px DM Sans,sans-serif';
      ctx.fillText((vals[i]||5)+'/10',lx,ly+13);
    }
  },120);
}

/* ════ RADAR PREMIUM (ordinateur) ════ */
function drawRadarPremium(canvas, vals){
  var labels=['Énergie','Finances','Mental','Confiance'];
  var icons=['⚡','💰','🧠','💖'];
  var colors=['#f59e0b','#10b981','#8b5cf6','#f43f5e'];
  var V=[0,1,2,3].map(function(i){ var v=+vals[i]; return isNaN(v)?5:Math.max(0,Math.min(10,v)); });
  var avg=Math.round(V.reduce(function(a,b){return a+b;},0)/4*10)/10;
  var cx=160,cy=160,r=104, uid='rp'+Math.random().toString(36).slice(2,7);
  function pt(i,k){ var a=i*Math.PI/2-Math.PI/2; return [cx+Math.cos(a)*r*k, cy+Math.sin(a)*r*k]; }
  var rings='';
  [1,.75,.5,.25].forEach(function(k,j){
    rings+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*k)+'" fill="'+(j%2?'#ffffff':'#f8fafc')+'" stroke="#e2e8f0" stroke-width="1" '+(k<1?'stroke-dasharray="3 4"':'')+'/>';
  });
  var axes='';
  for(var i=0;i<4;i++){ var p=pt(i,1); axes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+p[0]+'" y2="'+p[1]+'" stroke="#e2e8f0" stroke-width="1"/>'; }
  var poly=V.map(function(v,i){ return pt(i,Math.max(v,.4)/10).join(','); }).join(' ');
  var dots='', labs='';
  V.forEach(function(v,i){
    var p=pt(i,Math.max(v,.4)/10);
    dots+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="'+colors[i]+'" opacity=".18"/>'
         +'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5.5" fill="'+colors[i]+'" stroke="#fff" stroke-width="2.5"/>';
    var q=pt(i,1.3), w=78, h=34;
    labs+='<g transform="translate('+(q[0]-w/2)+','+(q[1]-h/2)+')">'
      +'<rect width="'+w+'" height="'+h+'" rx="11" fill="#fff" stroke="'+colors[i]+'33" stroke-width="1.2" filter="url(#'+uid+'s)"/>'
      +'<text x="'+(w/2)+'" y="14" text-anchor="middle" font-size="9.5" font-weight="700" fill="#64748b" font-family="DM Sans,sans-serif">'+icons[i]+' '+labels[i]+'</text>'
      +'<text x="'+(w/2)+'" y="28" text-anchor="middle" font-size="11.5" font-weight="800" fill="'+colors[i]+'" font-family="DM Sans,sans-serif">'+v+'<tspan font-size="8.5" fill="#94a3b8" font-weight="600">/10</tspan></text></g>';
  });
  var mood=avg>=7.5?'Excellent équilibre':avg>=5.5?'Bon équilibre':avg>=4?'À surveiller':'Prends soin de toi';
  var svg='<svg class="rp-svg" viewBox="-26 0 372 320" width="100%" role="img" aria-label="Radar de ton équilibre">'
    +'<defs>'
    +'<linearGradient id="'+uid+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".55"/><stop offset=".55" stop-color="#8b5cf6" stop-opacity=".42"/><stop offset="1" stop-color="#ec4899" stop-opacity=".45"/></linearGradient>'
    +'<linearGradient id="'+uid+'l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#db2777"/></linearGradient>'
    +'<filter id="'+uid+'f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>'
    +'<filter id="'+uid+'s" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0f172a" flood-opacity=".08"/></filter>'
    +'</defs>'
    +rings+axes
    +'<g class="rp-shape" style="transform-origin:'+cx+'px '+cy+'px">'
    +'<polygon points="'+poly+'" fill="#8b5cf6" opacity=".35" filter="url(#'+uid+'f)"/>'
    +'<polygon points="'+poly+'" fill="url(#'+uid+'g)" stroke="url(#'+uid+'l)" stroke-width="2.5" stroke-linejoin="round"/>'
    +dots+'</g>'
    +'<circle cx="'+cx+'" cy="'+cy+'" r="27" fill="#fff" filter="url(#'+uid+'s)"/>'
    +'<text x="'+cx+'" y="'+(cy+3)+'" text-anchor="middle" font-size="17" font-weight="800" fill="#1e1b4b" font-family="DM Sans,sans-serif">'+avg+'</text>'
    +'<text x="'+cx+'" y="'+(cy+15)+'" text-anchor="middle" font-size="7.5" font-weight="700" fill="#94a3b8" letter-spacing=".08em" font-family="DM Sans,sans-serif">MOYENNE</text>'
    +labs+'</svg>';
  var bars='<div class="rp-bars">'+V.map(function(v,i){
    return '<div class="rp-bar"><span>'+icons[i]+' '+labels[i]+'</span><div class="rp-track"><i style="--w:'+(v*10)+'%;background:'+colors[i]+'"></i></div><b style="color:'+colors[i]+'">'+v+'</b></div>';
  }).join('')+'</div>';
  var box=document.createElement('div');
  box.className='rp-box';
  box.innerHTML='<div class="rp-mood">'+mood+'</div>'+svg+bars;
  canvas.parentNode.replaceChild(box, canvas);
}
(function(){
  if(document.getElementById('rp-css')) return;
  var st=document.createElement('style'); st.id='rp-css';
  st.textContent='.rp-box{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:6px;}'
   +'.rp-mood{font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#4f46e5;background:linear-gradient(135deg,#eef2ff,#fdf2f8);border:1px solid #e0e7ff;padding:5px 12px;border-radius:999px;}'
   +'.rp-svg{max-width:340px;display:block;overflow:visible;}'
   +'.rp-shape{animation:rpIn 1.1s cubic-bezier(.2,.8,.2,1) both;}'
   +'@keyframes rpIn{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}'
   +'.rp-bars{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;padding:10px 4px 0;border-top:1px solid #f1f5f9;}'
   +'.rp-bar{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;font-size:.7rem;color:#475569;font-weight:600;}'
   +'.rp-bar b{font-size:.75rem;font-weight:800;min-width:18px;text-align:right;}'
   +'.rp-track{height:6px;border-radius:99px;background:#f1f5f9;overflow:hidden;}'
   +'.rp-track i{display:block;height:100%;width:var(--w);border-radius:99px;animation:rpBar 1.2s .3s cubic-bezier(.2,.8,.2,1) both;}'
   +'@keyframes rpBar{from{width:0}}';
  document.head.appendChild(st);
})();

/* ── Patch go() ── */
(function(){
  if(window._etrGoPatched)return;
  window._etrGoPatched=true;
  var origGo=window.go;
  window.go=function(id){
    origGo(id);
    if(id==='eva-tracker'){setTimeout(function(){etrInit();},100);}
  };
})();

window.etrInit=function(){jnlTab(0);document.getElementById('jnl-hdr-sub').textContent=fmtDate();var data=load();document.getElementById('jnl-streak-val').textContent=data.streak||0;[0,1,2].forEach(function(i){document.getElementById('jnl-t'+i).classList.toggle('active',i===0);});};

})();
