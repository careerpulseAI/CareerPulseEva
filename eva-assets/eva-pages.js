
/* ═══ EVA v3 : une seule mise en scène pour toutes les pages (file indienne, rythme posé, décor réseau social) ═══ */
(function(){
  if(window.self!==window.top) return;
  var S=function(p,c,w){ return '<svg viewBox="0 0 24 24" fill="none" stroke="'+(c||'#fff')+'" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'; };
  var IC={
    eva:'<path d="M5 6.5a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V16h.5A2.5 2.5 0 0 1 5 13.5z"/><path d="m12 7 .9 2.1L15 10l-2.1.9L12 13l-.9-2.1L9 10l2.1-.9z" fill="currentColor" stroke="none"/>',
    droits:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
    quiz:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    conseils:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    motiv:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    suivi:'<path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/>',
    heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    check:'<path d="m5 12 5 5L20 7"/>',
    up:'<path d="m4 16 6-6 4 4 6-6"/><path d="M14 8h6v6"/>',
    down:'<path d="m4 8 6 6 4-4 6 6"/><path d="M14 16h6v-6"/>',
    flat:'<path d="M4 12h16M15 7l5 5-5 5"/>',
    pen:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',
    flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    school:'<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
    bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
    tasks:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16 9"/>'
  };
  var TH={
    taches:{c1:'#0e7490',c2:'#22d3ee',cs:'#ecfeff',ic:'tasks',h:'@eva.taches'},
    droits:{c1:'#1d4ed8',c2:'#60a5fa',cs:'#eff6ff',ic:'droits',h:'@eva.droits'},
    conseils:{c1:'#0f766e',c2:'#2dd4bf',cs:'#f0fdfa',ic:'conseils',h:'@eva.conseils'},
    quiz:{c1:'#4f46e5',c2:'#a78bfa',cs:'#f5f3ff',ic:'quiz',h:'@eva.entrainement'},
    motiv:{c1:'#be185d',c2:'#f472b6',cs:'#fdf2f8',ic:'motiv',h:'@eva.equilibre'},
    suivi:{c1:'#4c1d95',c2:'#c026d3',cs:'#faf5ff',ic:'suivi',h:'@eva.suivi'},
    eva:{c1:'#1e3a8a',c2:'#38bdf8',cs:'#eff6ff',ic:'eva',h:'@eva'},
    of:{c1:'#b45309',c2:'#f59e0b',cs:'#fffbeb',ic:'school',h:'@eva.formation'},
    pf:{c1:'#6d28d9',c2:'#06b6d4',cs:'#f5f3ff',ic:'folder',h:'@eva.portfolio'}
  };
  function el(t,c,h){ var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; }
  function q(s,r){ return (r||document).querySelector(s); }
  function esc(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function vars(n,t){ n.style.setProperty('--c1',t.c1); n.style.setProperty('--c2',t.c2); n.style.setProperty('--cs',t.cs); return n; }
  function scroller(n){ while(n && n!==document.body){ var o=getComputedStyle(n).overflowY; if(o==='auto'||o==='scroll') return n; n=n.parentElement; } return null; }
  var TOUCH=0; document.addEventListener('touchstart',function(){ TOUCH=Date.now(); },{passive:true,capture:true});
  function reveal(n){ if(!n || !n.isConnected) return; if(Date.now()-TOUCH<7000) return; var s=scroller(n); if(!s) return;
    var r=n.getBoundingClientRect(), sr=s.getBoundingClientRect();
    if(r.bottom>sr.bottom-16){ var d=Math.min(r.bottom-sr.bottom+24, r.top-sr.top-70); if(d>0) s.scrollBy({top:d,behavior:'smooth'}); } }

  /* ── Briques visuelles ── */
  function msgRow(html){ var r=el('div','evh-msg','<div class="evh-mini">'+S(IC.eva)+'</div>'); var b=el('div','evh-bub'); if(html!=null) b.innerHTML=html; r.appendChild(b); return [r,b]; }
  function cover(t,o){
    var c=vars(el('div','pfs-card'),t);
    c.innerHTML='<div class="pfs-cv"><span>'+esc(o.badge||'EVA · EN DIRECT')+'</span></div><div class="pfs-in"><div class="pfs-av"><b>'+S(IC[o.ic||t.ic])+'</b></div>'
      +'<div class="pfs-nm">'+o.name+' <i>'+S(IC.check,'#fff',3)+'</i>'+(o.member?(window.cpMemberBadge?window.cpMemberBadge():''):'')+'</div><div class="pfs-hd">'+esc(o.handle||t.h)+'</div>'
      +'<div class="pfs-bio">'+o.bio+'</div>'
      +'<div class="pfs-stats">'+(o.stats||[]).map(function(s){ return '<div><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'; }).join('')+'</div></div>';
    if(M()) setTimeout(function(){ c.querySelectorAll('.pfs-stats b').forEach(function(b){ var v=b.textContent.trim(); if(!/^\d{1,3}$/.test(v)) return; var n=+v, t0=performance.now(); if(!n) return;
      b.classList.add('evx-count'); (function step(){ var k=Math.min(1,(performance.now()-t0)/900); b.textContent=Math.round(n*(1-Math.pow(1-k,3))); if(k<1) requestAnimationFrame(step); else b.textContent=v; })(); }); },700);
    return c;
  }
  function post(t,it){
    var c=vars(el('div','pfs-post'),{c1:it.c1||t.c1,c2:it.c2||t.c2,cs:t.cs});
    c.innerHTML='<div class="pfs-ph"><div class="pfs-pa"><b style="color:'+(it.c1||t.c1)+'">'+(it.ico||S(IC[t.ic],t.c1))+'</b></div><div class="pfs-pn"><strong>'+it.ttl+(it.member?' '+(window.cpMemberBadge?window.cpMemberBadge():''):'')+'</strong><span>'+esc(it.meta||'EVA te présente')+'</span></div><div class="pfs-dots">•••</div></div>'
      +'<div class="pfs-tx">'+it.txt+'</div>'
      +(it.media===false?'':'<div class="pfs-md" style="background:linear-gradient(135deg,'+(it.c1||t.c1)+','+(it.c2||t.c2)+')"><div class="ic">'+(it.big||S(IC[t.ic]))+'</div><div><span class="tg">#'+esc(it.tag||'EVA')+'</span><div class="tt">'+it.ttl+'</div></div></div>');
    var ac=el('div','pfs-ac');
    if(it.like!==false){
      var lk=el('button',null,S(IC.heart,'currentColor',2.2)+'<span>Utile</span>'); lk.type='button'; lk.setAttribute('data-l','1'); lk.setAttribute('aria-label','Utile');
      lk.onclick=function(e){ e.stopPropagation(); lk.classList.toggle('on'); lk.querySelector('svg').setAttribute('fill',lk.classList.contains('on')?'currentColor':'none'); }; ac.appendChild(lk);
    }
    if(it.tip){ var tp=el('button',null,S(IC.chat,'currentColor',2.2)+'<span>Conseil</span>'); tp.type='button'; tp.setAttribute('data-l','1'); tp.setAttribute('aria-label','Conseil'); tp.onclick=function(e){ e.stopPropagation(); if(typeof window.ecShowToast==='function') window.ecShowToast(it.tip); }; ac.appendChild(tp); }
    (it.actions||[]).forEach(function(a){ var b=el('button',a.pri?'pri':'',(a.l)+(a.pri?' '+S(IC.arrow,'currentColor',2.4):'')); b.type='button'; b.onclick=function(e){ e.stopPropagation(); a.fn(); }; ac.appendChild(b); });
    if(ac.children.length) c.appendChild(ac);
    return c;
  }
  function stories(t,items){
    var s=vars(el('div','pfs-st'),t);
    items.forEach(function(it){ var b=el('button',null,'<span class="rg"><b style="color:'+(it.c1||t.c1)+'">'+(it.ico||S(IC[t.ic],t.c1))+'</b></span>'+it.ttl); b.type='button'; b.onclick=it.fn; s.appendChild(b); });
    return s;
  }
  function plus(t,x){ return post(t,{ ico:S(IC.star,t.c1,2), ttl:'Le + EVA', meta:'Pourquoi EVA fait la différence', media:false, like:true, txt:x }); }
  function example(t,x){ return post(t,{ ico:S(IC.user,t.c1,2), ttl:'Et toi ?', meta:'Ce qu\'EVA peut t\'apporter', media:false, like:true, txt:x }); }
  /* ═════ Banques de textes : un exemple différent à chaque connexion (aucun faux témoignage) ═════ */
  var BANK={
    droits:[
      '<b>Salarié</b> · Tu fais souvent des heures sup ? EVA t\'explique comment elles sont majorées et comment les vérifier sur ta fiche de paie, avec le Code du travail.',
      '<b>Salarié</b> · Tu te demandes combien de congés tu as acquis ? EVA t\'explique les 2 méthodes de calcul légales de l\'indemnité de congés payés.',
      '<b>Salarié</b> · Ton CDD se termine ? EVA t\'explique la prime de précarité de 10 % et l\'indemnité de congés payés à vérifier sur ton solde de tout compte.',
      '<b>Salarié</b> · Tu es en arrêt maladie ? EVA t\'explique les indemnités journalières de l\'Assurance maladie et le maintien de salaire par ton employeur.',
      '<b>Salarié</b> · Tu envisages une rupture conventionnelle ? EVA t\'explique la procédure, le formulaire officiel et l\'indemnité minimale, selon service-public.fr.',
      '<b>Salarié</b> · Tu télétravailles ? EVA t\'explique ce que prévoit le Code du travail et les frais qui peuvent être pris en charge.',
      '<b>Salarié</b> · Tu veux te former ? EVA t\'explique comment consulter et utiliser ton CPF sur le site officiel Mon Compte Formation.',
      '<b>Salarié</b> · Tu attends un enfant ? EVA t\'explique ton congé maternité ou paternité et les indemnités prévues par l\'Assurance maladie.',
      '<b>Demandeur d\'emploi</b> · Tu viens de perdre ton emploi ? EVA t\'explique les conditions de l\'ARE et les étapes de ton inscription à France Travail.',
      '<b>Demandeur d\'emploi</b> · Tu reprends un petit job ? EVA t\'explique comment cumuler une activité avec l\'ARE, selon les règles de France Travail.',
      '<b>Demandeur d\'emploi</b> · Tu veux créer ton activité ? EVA t\'explique les aides possibles pour les créateurs indemnisés, avec les sources officielles.',
      '<b>Demandeur d\'emploi</b> · Tu as démissionné pour un projet ? EVA t\'explique dans quels cas une démission peut ouvrir droit à l\'ARE.',
      '<b>Demandeur d\'emploi</b> · Tu te demandes si ta mutuelle continue ? EVA t\'explique la portabilité de ta complémentaire santé après un contrat.',
      '<b>Demandeur d\'emploi</b> · Ton budget est serré ? EVA t\'explique les aides à vérifier : APL, Complémentaire santé solidaire, prime d\'activité, sur caf.fr et ameli.fr.',
      '<b>Demandeur d\'emploi</b> · Tu veux te former pendant ta recherche ? EVA t\'explique comment ton ARE peut être maintenue pendant une formation.',
      '<b>Demandeur d\'emploi</b> · Tu as reçu ton attestation employeur ? EVA t\'explique quoi vérifier avant de la transmettre à France Travail.',
      '<b>Freelance</b> · Tu hésites entre micro-entreprise et société ? EVA t\'explique les différences de statut, de charges et de protection sociale.',
      '<b>Freelance</b> · Tu déclares ton chiffre d\'affaires ? EVA t\'explique la déclaration URSSAF du micro-entrepreneur et les taux 2026.',
      '<b>Freelance</b> · Un client paie en retard ? EVA t\'explique les pénalités de retard prévues par le Code de commerce et comment les réclamer.',
      '<b>Freelance</b> · Tu cesses ton activité ? EVA t\'explique l\'ATI, l\'allocation des travailleurs indépendants, et ses conditions.',
      '<b>Freelance</b> · Tu penses à ta retraite ? EVA t\'explique comment tu cotises pour ta retraite de base et complémentaire.',
      '<b>Freelance</b> · Tu te demandes si tu dois t\'assurer ? EVA t\'explique à quoi sert une RC Pro et quand elle est obligatoire.',
      '<b>Freelance</b> · Tu touches encore l\'ARE ? EVA t\'explique comment cumuler tes allocations avec ton activité freelance.',
      '<b>Freelance</b> · Tu signes une mission ? EVA t\'explique ce que doit contenir un contrat de prestation clair.',
      '<b>Étudiant</b> · Tu cherches une alternance ? EVA t\'explique tes droits d\'alternant et comment est calculé ton salaire d\'apprenti.',
      '<b>Étudiant</b> · Tu commences un stage ? EVA t\'explique la convention de stage et quand la gratification est obligatoire.',
      '<b>Étudiant</b> · Tu as besoin d\'une bourse ? EVA t\'explique le Dossier social étudiant et le calendrier du CROUS.',
      '<b>Étudiant</b> · Tu cherches un logement ? EVA t\'explique l\'APL et comment faire ta simulation sur caf.fr.',
      '<b>Étudiant</b> · Tu te soignes à petit budget ? EVA t\'explique la Complémentaire santé solidaire et comment la demander.',
      '<b>Reconversion</b> · Tu veux changer de métier ? EVA t\'explique le CEP, un conseil en évolution professionnelle gratuit.',
      '<b>Reconversion</b> · Tu veux faire le point ? EVA t\'explique le bilan de compétences, son déroulé et son financement.',
      '<b>Reconversion</b> · Tu as de l\'expérience sans diplôme ? EVA t\'explique la VAE et les étapes pour faire reconnaître tes acquis.',
      '<b>Reconversion</b> · Tu veux te former en gardant ton salaire ? EVA t\'explique le CPF de transition professionnelle.'
    ],
    conseils:[
      '<b>Freelance</b> · Tu veux connaître tes droits auprès de l\'URSSAF ? EVA t\'informe sur les aides possibles et te conseille, à partir des articles de l\'URSSAF et de service-public.fr, mis à jour en 2026.',
      '<b>Freelance</b> · Tu ne sais pas quel tarif annoncer ? EVA te conseille une méthode simple pour calculer ton prix, charges URSSAF comprises.',
      '<b>Freelance</b> · Ton premier devis ? EVA te conseille les mentions à ne pas oublier, et tu le prépares directement dans ton Portfolio.',
      '<b>Freelance</b> · Une facture impayée ? EVA te conseille les étapes de relance, de la plus douce à la mise en demeure, selon le Code de commerce.',
      '<b>Freelance</b> · Tu veux un business plan ? EVA te guide pas à pas et tu gardes le document dans ton Portfolio.',
      '<b>Freelance</b> · Tu oublies tes échéances ? EVA te conseille de les noter dans tes Tâches : déclaration, relances, livraisons.',
      '<b>Freelance</b> · Tu prospectes ? EVA te conseille comment organiser tes contacts et tes relances dans ton Portfolio.',
      '<b>Freelance</b> · Tu crées ton activité ? EVA t\'informe sur les démarches officielles et te conseille l\'ordre dans lequel les faire.',
      '<b>Demandeur d\'emploi</b> · Ton RDV France Travail approche ? EVA t\'informe sur ce qui est vérifié et te conseille les documents à préparer.',
      '<b>Demandeur d\'emploi</b> · Tu envoies beaucoup de candidatures ? EVA te conseille comment suivre chaque envoi et chaque relance dans ton Portfolio.',
      '<b>Demandeur d\'emploi</b> · Ton CV ne décroche pas d\'entretien ? EVA analyse ton document et te donne une note sur 10 avec des conseils précis.',
      '<b>Demandeur d\'emploi</b> · Une lettre de motivation à écrire ? EVA te conseille une structure claire et tu la prépares dans ton Portfolio.',
      '<b>Demandeur d\'emploi</b> · Tu ne sais pas qui contacter ? EVA te donne les organismes utiles à ta situation, avec téléphone et site officiel.',
      '<b>Demandeur d\'emploi</b> · Tu as un trou dans ton CV ? EVA te conseille comment présenter cette période de façon positive.',
      '<b>Demandeur d\'emploi</b> · Tu veux te réorienter ? EVA t\'informe sur les formations finançables et te conseille les premières étapes.',
      '<b>Demandeur d\'emploi</b> · Tu perds le fil de tes démarches ? EVA te conseille de les noter dans tes Tâches, avec une date pour chacune.',
      '<b>Salarié</b> · Ton entretien annuel arrive ? EVA te conseille comment préparer tes arguments et tes objectifs.',
      '<b>Salarié</b> · Tu veux demander une augmentation ? EVA te conseille comment préparer ta demande avec des faits concrets.',
      '<b>Salarié</b> · Tu as trop de missions en parallèle ? EVA te conseille de les organiser dans tes Tâches, avec statut et priorité.',
      '<b>Salarié</b> · Tu veux évoluer en interne ? EVA t\'informe sur le CPF et le CEP et te conseille comment construire ton projet.',
      '<b>Salarié</b> · Un conflit au travail ? EVA t\'informe sur tes interlocuteurs (représentants du personnel, inspection du travail) et te conseille comment garder des traces.',
      '<b>Salarié</b> · Tu prépares une démission ? EVA t\'informe sur le préavis et te conseille un calendrier pour partir sereinement.',
      '<b>Salarié</b> · Tu veux un compte-rendu de réunion propre ? EVA te propose un modèle prêt à remplir dans ton Portfolio.',
      '<b>Salarié</b> · Tu veux mieux gérer ton temps ? EVA te conseille de bloquer un moment chaque semaine pour planifier tes tâches.',
      '<b>Étudiant</b> · Tu cherches une alternance ? EVA te conseille comment cibler les entreprises et suivre tes candidatures.',
      '<b>Étudiant</b> · Ton premier CV ? EVA te conseille comment valoriser tes stages, tes projets et tes engagements.',
      '<b>Étudiant</b> · Tes dossiers s\'accumulent ? EVA te conseille de les découper en petites tâches datées : bourse, logement, stage.',
      '<b>Étudiant</b> · Tu prépares un oral ? EVA te conseille une structure simple et tu t\'entraînes avec les mises en situation.',
      '<b>Reconversion</b> · Tu as un projet mais pas de plan ? EVA t\'informe sur le CEP et le bilan de compétences et te conseille par où commencer.',
      '<b>Reconversion</b> · Tu cherches un financement ? EVA t\'informe sur le CPF et le CPF de transition et te conseille les pièces à préparer.',
      '<b>Reconversion</b> · Tu doutes de ton projet ? EVA te conseille comment le tester : enquête métier, immersion, échanges avec des pros.',
      '<b>Reconversion</b> · Tu veux suivre ton avancement ? EVA te conseille de noter chaque étape dans tes Tâches et ton agenda.'
    ],
    quiz:[
      '<b>Salarié</b> · Ton entretien annuel arrive ? Les QCM vérifient ce que tu sais de tes droits, et la mise en situation te met face à une DRH, avec des questions réalistes.',
      '<b>Salarié</b> · Tu vises une promotion ? EVA te fait répondre aux questions qu\'on pose vraiment en entretien d\'évolution, et t\'explique chaque bonne réponse.',
      '<b>Salarié</b> · Tu veux négocier ? La mise en situation t\'entraîne à défendre ta demande calmement, avec un bilan à la fin.',
      '<b>Salarié</b> · Congés, heures sup, contrat… Les QCM s\'appuient sur les règles officielles du Code du travail et service-public.fr.',
      '<b>Salarié</b> · Chaque réponse est corrigée tout de suite, avec une explication : tu apprends en jouant.',
      '<b>Salarié</b> · Les questions changent à chaque session : tu peux t\'entraîner plusieurs fois sans tomber sur les mêmes.',
      '<b>Salarié</b> · Question piège en entretien ? La mise en situation t\'apprend à répondre avec la méthode STAR : situation, tâche, action, résultat.',
      '<b>Salarié</b> · 15 ou 25 questions : tu choisis la durée de ta session selon ton temps.',
      '<b>Demandeur d\'emploi</b> · Un entretien bientôt ? La mise en situation te met face à un recruteur, et EVA te fait un bilan de ta posture.',
      '<b>Demandeur d\'emploi</b> · « Parlez-moi de vous » te bloque ? Tu t\'entraînes autant de fois que tu veux, sans jugement.',
      '<b>Demandeur d\'emploi</b> · ARE, démarches, droits… Les QCM vérifient tes connaissances avec des questions fondées sur les règles de France Travail.',
      '<b>Demandeur d\'emploi</b> · Une période sans emploi à expliquer ? La simulation t\'aide à la présenter comme un projet.',
      '<b>Demandeur d\'emploi</b> · Chaque erreur est expliquée : c\'est là que tu progresses le plus.',
      '<b>Demandeur d\'emploi</b> · À la fin, EVA te dit ce qui est bien, ce qui est à travailler et la prochaine étape.',
      '<b>Demandeur d\'emploi</b> · Les situations sont tirées au hasard : chaque entraînement est différent.',
      '<b>Demandeur d\'emploi</b> · Tu as peu de temps ? Choisis 15 questions. Envie d\'aller plus loin ? Choisis 25.',
      '<b>Freelance</b> · Un rendez-vous client ? La mise en situation t\'entraîne à vendre ta mission et à annoncer ton tarif sans te justifier.',
      '<b>Freelance</b> · Statut, URSSAF, factures… Les QCM vérifient tes bases avec des questions fondées sur les sources officielles.',
      '<b>Freelance</b> · Un client négocie ton prix ? La simulation t\'apprend à tenir ta position tout en gardant la relation.',
      '<b>Freelance</b> · Chaque réponse est expliquée : tu comprends la règle, pas seulement la bonne case.',
      '<b>Freelance</b> · Les questions changent à chaque session : idéal pour réviser avant un rendez-vous important.',
      '<b>Freelance</b> · À la fin, EVA te fait un bilan clair : tes points forts, tes points à travailler.',
      '<b>Freelance</b> · Tu proposes une prochaine étape au client ? La mise en situation t\'entraîne à conclure un échange.',
      '<b>Freelance</b> · 15 ou 25 questions : tu choisis selon le temps que tu as devant toi.',
      '<b>Reconversion</b> · Tu dois défendre ton projet ? La mise en situation te met face à une conseillère bilan, avec des questions réalistes.',
      '<b>Reconversion</b> · CPF, VAE, bilan de compétences… Les QCM vérifient ce que tu sais, avec l\'explication à chaque fois.',
      '<b>Reconversion</b> · Ton « pourquoi » n\'est pas encore clair ? La simulation t\'aide à le formuler en une phrase.',
      '<b>Reconversion</b> · Tu as peur qu\'on doute de ton projet ? Tu t\'entraînes à relier tes compétences d\'avant à ton nouveau métier.',
      '<b>Reconversion</b> · Les questions sont tirées au hasard : tu ne révises jamais la même chose deux fois de suite.',
      '<b>Reconversion</b> · À la fin, EVA te donne un bilan et la prochaine étape à faire.',
      '<b>Étudiant</b> · Premier entretien de stage ou d\'alternance ? Tu t\'entraînes avant le jour J, à ton rythme.',
      '<b>Étudiant</b> · Tes droits de stagiaire ou d\'alternant ? Les QCM te les font réviser avec des explications simples.'
    ],
    citations:[
      ['Il faut cultiver notre jardin.','Voltaire, <i>Candide</i>'],
      ['On ne voit bien qu\'avec le cœur. L\'essentiel est invisible pour les yeux.','Antoine de Saint-Exupéry, <i>Le Petit Prince</i>'],
      ['Le pessimisme est d\'humeur ; l\'optimisme est de volonté.','Alain, <i>Propos sur le bonheur</i>'],
      ['Ce n\'est pas parce que les choses sont difficiles que nous n\'osons pas, c\'est parce que nous n\'osons pas qu\'elles sont difficiles.','Sénèque'],
      ['Pendant qu\'on la diffère, la vie passe.','Sénèque, <i>Lettres à Lucilius</i>'],
      ['Ce qui trouble les hommes, ce ne sont pas les choses, mais les jugements qu\'ils portent sur les choses.','Épictète, <i>Manuel</i>'],
      ['La plus grande chose du monde, c\'est de savoir être à soi.','Montaigne, <i>Essais</i>'],
      ['Quand je danse, je danse ; quand je dors, je dors.','Montaigne, <i>Essais</i>'],
      ['Il faut imaginer Sisyphe heureux.','Albert Camus, <i>Le Mythe de Sisyphe</i>'],
      ['Au milieu de l\'hiver, j\'apprenais enfin qu\'il y avait en moi un été invincible.','Albert Camus, <i>Retour à Tipasa</i>'],
      ['Rien n\'est permanent, sauf le changement.','Héraclite'],
      ['Connais-toi toi-même.','Inscription du temple de Delphes, reprise par Socrate'],
      ['Nous sommes ce que nous faisons de manière répétée.','Will Durant, d\'après Aristote'],
      ['Chaque jour est une petite vie.','Arthur Schopenhauer'],
      ['Celui qui a un « pourquoi » peut supporter presque n\'importe quel « comment ».','Friedrich Nietzsche'],
      ['L\'homme n\'est rien d\'autre que ce qu\'il se fait.','Jean-Paul Sartre'],
      ['Dans la vie, rien n\'est à craindre, tout est à comprendre.','Attribué à Marie Curie'],
      ['La joie est le passage de l\'homme d\'une moindre à une plus grande perfection.','Baruch Spinoza, <i>Éthique</i>'],
      ['Rien ne sert de courir ; il faut partir à point.','Jean de La Fontaine'],
      ['Patience et longueur de temps font plus que force ni que rage.','Jean de La Fontaine'],
      ['Aide-toi, le Ciel t\'aidera.','Jean de La Fontaine'],
      ['Qui veut voyager loin ménage sa monture.','Jean Racine, <i>Les Plaideurs</i>'],
      ['On n\'est jamais si heureux ni si malheureux qu\'on s\'imagine.','François de La Rochefoucauld'],
      ['Vivre est la chose la plus rare au monde. La plupart des gens existent, voilà tout.','Oscar Wilde'],
      ['La santé est un état de complet bien-être physique, mental et social, et ne consiste pas seulement en une absence de maladie ou d\'infirmité.','Organisation mondiale de la santé, Constitution de 1946'],
      ['Il n\'y a pas de santé sans santé mentale.','Organisation mondiale de la santé'],
      ['Un esprit sain dans un corps sain.','Juvénal, <i>Satires</i>'],
      ['Le moment de se détendre, c\'est quand on n\'a pas le temps.','Sydney J. Harris, journaliste'],
      ['La plus grande découverte de ma génération est qu\'un être humain peut changer sa vie en changeant son attitude.','Attribué à William James, psychologue'],
      ['La résilience, c\'est l\'art de naviguer dans les torrents.','Boris Cyrulnik, psychiatre'],
      ['Rien n\'arrive à personne qu\'il ne soit capable de supporter.','Marc Aurèle, <i>Pensées</i>'],
      ['J\'ai décidé d\'être heureux parce que c\'est bon pour la santé.','Attribué à Voltaire']
    ]
  };
  /* tirage : jamais deux fois de suite le même, d'une connexion à l'autre */
  function fromBank(name){
    var a=BANK[name]||[], k='evx_bank_'+name, last=-1, i;
    try{ last=+(localStorage.getItem(k)||-1); }catch(e){}
    if(a.length<2) return a[0];
    do{ i=Math.floor(Math.random()*a.length); }while(i===last);
    try{ localStorage.setItem(k,i); }catch(e){}
    return a[i];
  }
  function quote(t){
    var c=fromBank('citations')||['',''];
    return post(t,{ ico:S(IC.heart,t.c1,2), ttl:'La pensée du soir', meta:c[1].replace(/<[^>]+>/g,''), media:false, like:true,
      txt:'<span style="display:block;font-size:1.02em;font-style:italic;line-height:1.55">« '+c[0]+' »</span><span style="display:block;margin-top:8px;font-size:.86em;opacity:.75">— '+c[1]+'</span>' });
  }
  function wrapFeed(n){ var f=el('div','pfs-feed'); f.appendChild(n); return f; }
  function svgOf(node,col){ var v=node && node.querySelector('svg'); if(!v) return null; v=v.cloneNode(true); v.removeAttribute('width'); v.removeAttribute('height'); v.style.cssText=''; if(col){ v.setAttribute('stroke',col); v.querySelectorAll('[stroke]').forEach(function(x){ x.setAttribute('stroke',col); }); } return v.outerHTML; }
  function txt(n){ return n ? (n.textContent||'').replace(/\s+/g,' ').trim() : ''; }

  /* ── Moteur : une scène après l'autre ── */
  var SEEN={};
  var SP=function(){ return 1; };
  var M=function(){ return window.innerWidth<900; };
  function mob(x){ return M() ? x : null; }
  function pick(a){ return Array.isArray(a) ? a[Math.floor(Math.random()*a.length)] : a; }
  function later(st,fn,ms){
    st.t=setTimeout(function g(){ if(st.dead) return; if(st.paused){ st.t=setTimeout(g,200); return; } fn(); }, ms*SP()); }
  function stream(bub,html,st,cb){
    var parts=html.split(/(<[^>]+>|\s+)/).filter(function(x){return x!=='';}), i=0, out='', caret='<span class="evh-caret"></span>';
    (function tick(){
      if(st.dead) return;
      if(i>=parts.length){ bub.innerHTML=out; cb(); return; }
      var p=parts[i++]; out+=p; bub.innerHTML=out+caret;
      var d= /^</.test(p)||/^\s+$/.test(p) ? 0 : 42+Math.random()*30;
      if(/[.!?…]$/.test(p)) d+=420; else if(/[,;:]$/.test(p)) d+=190;
      later(st,tick,d);
    })();
  }
  function readTime(html){ var n=(html||'').replace(/<[^>]+>/g,'').length; return Math.min(3200, 1100+n*16); }
  function mount(o){
    if(!o.host) return null;
    o.steps=(o.steps||[]).filter(Boolean);
    var slot=o.host.querySelector(':scope > .evx[data-slot="'+o.id+'"]');
    if(!slot){
      slot=el('div','evx'+(o.bar?'':' evx-inline')); slot.setAttribute('data-slot',o.id);
      var CTRL='<div class="evx-ctrl"><button type="button" data-a="pause" aria-label="Pause">Pause</button><button type="button" data-a="skip">Tout afficher</button><button type="button" class="pri" data-a="replay" aria-label="Rejouer">Rejouer</button></div>';
      slot.innerHTML=(o.bar?'<div class="evx-bar"><div class="evx-av">'+S(IC.eva)+'</div><div class="evx-id"><b>EVA</b><span></span></div>'+CTRL+'</div><div class="evx-prog"><b></b></div>'
        :(o.ctrl===false?'':'<div class="evx-mbar"><span class="evx-live"><i></i>EVA te présente</span>'+CTRL+'</div>'))
        +'<div class="evx-feed"><div class="evh-col"></div></div><div class="evx-park"></div>';
      slot._st={};
      slot.addEventListener('click',function(e){ var b=e.target.closest('.evx-ctrl button'); if(!b || !slot._static) return; var a=b.getAttribute('data-a');
        if(a==='pause'){ var st=slot._st||{}; if(st.done) return; st.paused=!st.paused; b.textContent=st.paused?'Reprendre':'Pause'; b.classList.toggle('on',!!st.paused); }
        else if(a==='skip') slot._static(); else slot._play(); });
    }
    if(o.before && o.before.parentNode===o.host){ if(slot.nextSibling!==o.before) o.host.insertBefore(slot,o.before); }
    else if(slot.parentNode!==o.host) o.host.insertBefore(slot,o.host.firstChild);
    if(o.bar){ var lb=q('.evx-id span',slot); if(lb) lb.textContent='En ligne · '+(o.label||''); }
    var park=q('.evx-park',slot);
    (o.steps||[]).forEach(function(s){ if(s.node && s.node.parentNode!==park && !slot.contains(s.node)) park.appendChild(s.node); });
    if(slot.getAttribute('data-key')===o.key && slot._steps) return slot;
    slot.setAttribute('data-key',o.key);
    var feed=q('.evh-col',slot), prog=q('.evx-prog b',slot), steps=o.steps;
    slot._steps=steps;
    function mark(n){ if(prog) prog.style.width=Math.round(n/steps.length*100)+'%'; }
    function kill(){ if(slot._st){ slot._st.dead=true; clearTimeout(slot._st.t); } slot._st={}; var pb=q('[data-a="pause"]',slot); if(pb){ pb.textContent='Pause'; pb.classList.remove('on'); } slot.classList.remove('evx-done'); }
    function fin(stat){ if(slot._st) slot._st.done=true; slot.classList.add('evx-done'); if(o.done) o.done(stat); }
    function clear(){ steps.forEach(function(s){ if(s.node) park.appendChild(s.node); }); feed.innerHTML=''; }
    function build(s){
      if(s.msg!=null) return msgRow(s.msg)[0];
      if(s.think!=null) return null;
      if(s.node){ var a=el('div','evx-att'); s.node.classList.remove('evx-hid2'); a.appendChild(s.node); return a; }
      if(s.make){ var m=s.make(); return s.feed===false ? m : wrapFeed(m); }
      return null;
    }
    slot._static=function(){ kill(); clear(); steps.forEach(function(s){ var n=build(s); if(n) feed.appendChild(n); }); mark(steps.length); fin(true); };
    slot._play=function(){
      kill(); clear(); var st=slot._st, i=0; mark(0);
      (function next(){
        if(st.dead) return;
        if(i>=steps.length){ fin(false); return; }
        var s=steps[i++]; mark(i);
        if(s.think!=null){
          var th=el('div','evx-think','<span class="evx-tav">'+S(IC.eva)+'</span><span class="evx-spin"></span><span class="evx-tt">'+pick(s.think)+'</span><span class="evx-dots"><i></i><i></i><i></i></span>'); feed.appendChild(th); reveal(th);
          later(st,function(){ th.classList.add('out'); later(st,function(){ th.remove(); next(); },300); }, s.wait||1500);
        } else if(s.msg!=null){
          var m=msgRow('<span class="evh-typing"><span></span><span></span><span></span></span>'); feed.appendChild(m[0]); reveal(m[0]);
          later(st,function(){ stream(m[1],s.msg,st,function(){ reveal(m[0]); later(st,next, s.wait||readTime(s.msg)); }); },950);
        } else {
          later(st,function(){ var n=build(s); if(n){ feed.appendChild(n); setTimeout(function(){ reveal(n); },80); } later(st,next, s.wait || (s.node?700:2000)); },320);
        }
      })();
    };
    if(SEEN[o.key]) slot._static(); else { SEEN[o.key]=1; slot._play(); }
    return slot;
  }
  function hide(list){ (list||[]).forEach(function(n){ if(n) n.classList.add('evx-hid2'); }); }
  function scrollToEl(n){ if(!n) return; var s=scroller(n); if(s){ s.scrollTo({top:n.getBoundingClientRect().top-s.getBoundingClientRect().top+s.scrollTop-80,behavior:'smooth'}); } }

  /* ═════ Titres premium des pages ═════ */
  var PAGES={
    'eva-droits':['droits','Droits & aides'], 'eva-droits-list':['droits','Droits · Encyclopédie'], 'eva-droits-article':['droits','Droits · Article'],
    'eva-workspace':['conseils','Conseils & pro'], 'eva-entretien':['quiz','Quiz & mises en situation'],
    'eva-bienetre':['motiv','Motivation & Équilibre'], 'eva-tracker':['suivi','Suivi de ma motivation'], 'eva-identity':['eva','À propos'], 'eva-of':['of','Espace formation'], 'eva-taches':['taches','Tâches']
  };
  var EMO=/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\s]+/u;
  function strip(t){ if(!t) return; var n=t.firstChild; if(n && n.nodeType===3 && EMO.test(n.nodeValue)) n.nodeValue=n.nodeValue.replace(EMO,''); }
  function titles(){
    Object.keys(PAGES).forEach(function(id){ deco(document.getElementById('s-'+id), PAGES[id][0], PAGES[id][1]); });
    document.querySelectorAll('.nova-screen').forEach(function(sc){ deco(sc,'quiz', /mise-situation/.test(sc.id)?'Simulation · Entretien':'QCM · Quiz EVA'); });
    var bd=q('#s-eva-bienetre .eb-hdr-badge'); if(bd && !bd.querySelector('svg')) bd.innerHTML=S(IC.heart,'currentColor',2.4)+'COACH';
    var JT=[[IC.pen,'Bilan du jour'],[IC.suivi,'Mon suivi'],[IC.chat,'EVA parle']];
    JT.forEach(function(x,i){ var b=document.getElementById('jnl-t'+i); if(b && !b.querySelector('svg')) b.innerHTML=S(x[0],'currentColor',2.2)+x[1]; });
  }
  function deco(sc,theme,eb){
    if(!sc) return;
    sc.setAttribute('data-evt',theme);
    var hd=q('.evad-hd,.eva-sub-header,.ew-hdr,.eb-hdr,.jnl-hdr,.nova-hd',sc); if(!hd) return;
    var tt=q('.evad-hd-title,.eva-sub-title,.ew-hdr-ttl,.eb-hdr-title,.jnl-hdr-title,.nova-hd-name',hd); if(!tt) return;
    tt.setAttribute('data-eb',eb); strip(tt);
    if(!hd.classList.contains('nova-hd') && !q('.evt-ico',hd)){
      var anchor=q('.eb-hdr-info,.jnl-hdr-info',hd) || tt;
      var ic=el('div','evt-ico',S(IC[TH[theme].ic])); hd.insertBefore(ic,anchor);
    }
    if(!tt._evtObs){ tt._evtObs=1; try{ new MutationObserver(function(){ strip(tt); }).observe(tt,{childList:true,characterData:true,subtree:true}); }catch(e){} }
  }

  /* ═════ Pages ═════ */
  function nom(){ try{ return (EWC[EWP]||{}).nom||''; }catch(e){ return ''; } }

  // DROITS (accueil)
  function droitsHub(){
    var sc=document.getElementById('s-eva-droits'); if(!sc) return; var t=TH.droits;
    var host=q('.evad-scroll',sc), cards=[].slice.call(sc.querySelectorAll('.ei-card')); if(!host||!cards.length) return;
    hide([q('.ei-hero',sc), q('.ei-body',sc)]); sc.classList.add('evx-page');
    var items=cards.map(function(c){ return { ico:svgOf(q('.ei-card-ico',c),t.c1), big:svgOf(q('.ei-card-ico',c),'#fff'), ttl:esc(txt(q('.ei-card-name',c))), sub:txt(q('.ei-card-sub',c)), fn:function(){ c.click(); } }; });
    var steps=[
      { make:function(){ return cover(t,{ name:'Droits & aides', bio:'Tes droits expliqués simplement, sourcés et classés de A à Z. Chômage, contrat, congés, statut d\'indépendant, aides étudiantes.', stats:[[items.length,'profils'],['A → Z','classement'],['2026','données']] }); }, feed:false, wait:2000 },
      { think:'EVA prépare ta visite guidée…' },
      { msg:'Bienvenue dans <b>Droits & aides</b> 👋 Ici, je t\'explique tes droits simplement… avec des articles fondés sur les sources officielles.' },
      { make:function(){ return example(t,fromBank('droits')); } },
      { msg:'Je te présente les <b>'+items.length+' profils</b>, un par un 👇' }
    ];
    items.forEach(function(it,i){ steps.push({ make:function(){ return post(t,{ ico:it.ico, big:it.big, ttl:it.ttl, meta:'Profil '+(i+1)+'/'+items.length, tag:'Droits', txt:esc(it.sub)+' — 12 thèmes classés de A à Z, avec estimateur et quiz.', tip:'Commence par le thème qui te concerne aujourd\'hui : 3 minutes suffisent.', actions:[{l:'Ouvrir',pri:true,fn:it.fn}] }); } }); });
    steps.push(mob({ think:['Je repère le profil qui te ressemble…','Je croise ta situation avec tous mes thèmes…','Je vérifie que tout est bien à jour 2026…'] }));
    steps.push(mob({ msg:pick(['Franchement ? La plupart des gens passent à côté de droits qu\'ils ont <b>déjà</b>. Avec moi, pas toi 😉','Tu sais ce qui me rend fière ? Quand quelqu\'un découvre une aide qu\'il ignorait. Ça arrive <b>tous les jours</b> ici 💙']) }));
    steps.push({ make:function(){ return plus(t,'Un moteur de recherche te donne 100 réponses contradictoires. Moi, je te donne <b>une réponse claire, sourcée et à jour 2026</b>, adaptée à ton profil. ✨'); } });
    steps.push({ msg:'À toi de jouer : <b>quel profil te correspond ?</b> 🤔' });
    steps.push({ make:function(){ return stories(t,items); } });
    steps.push({ msg:'Bon à savoir 💡 chaque article cite ses <b>sources officielles</b> — Légifrance, service-public.fr, France Travail, URSSAF, CAF, ameli.fr.' });
    mount({ host:host, id:'hub', key:'hub-droits', label:'Droits & aides', bar:true, steps:steps });
  }
  // DROITS (liste A → Z)
  function droitsList(){
    var sc=document.getElementById('s-eva-droits-list'); if(!sc) return; var t=TH.droits;
    var host=q('.evad-scroll',sc), body=document.getElementById('evad-list-body'); if(!host||!body) return;
    var title=txt(document.getElementById('evad-list-title')).replace(EMO,''), h=txt(document.getElementById('evad-list-h'))||title, p=txt(document.getElementById('evad-list-p')), count=txt(document.getElementById('evad-list-count'));
    var n=(count.match(/\d+/)||[''])[0];
    hide([document.getElementById('evad-list-hero')]);
    var srch=q('.az-search-wrap',sc), pack=srch && srch._pack;
    if(!pack){ pack=el('div','evx-pack'); if(srch){ pack.appendChild(srch); srch._pack=pack; } }
    if(body.parentNode!==pack) pack.appendChild(body);
    var stb=document.getElementById('evad-subtabs'); if(stb && srch && srch.parentNode===pack) pack.insertBefore(stb,srch);
    mount({ host:host, id:'dlist', key:'dlist-'+title, label:'Droits · Encyclopédie', bar:true, steps:[
      { make:function(){ return cover(t,{ name:esc(h), handle:t.h+' · encyclopédie', bio:esc(p), stats:[[n||'A → Z','thèmes'],['2-4 min','par lecture'],['2026','à jour']] }); }, feed:false, wait:2000 },
      { think:'EVA classe tes thèmes de A à Z…' },
      { msg:'Voici ton encyclopédie <b>'+esc(h)+'</b> 📚 '+esc(count)+', vérifiés sur les sources officielles.' },
      { msg:'Mon conseil : commence par le thème qui te concerne <b>aujourd\'hui</b>. Filtre par lettre ou choisis directement 👇' },
      { node:pack }
    ]});
  }
  // DROITS (article)
  function droitsArticle(id){
    var host=document.getElementById('evad-art-scroll'), body=document.getElementById('evad-art-body'); if(!host||!body) return; var t=TH.droits;
    var title=txt(document.getElementById('evad-art-title')), sub=txt(document.getElementById('evad-art-sub'));
    var first=''; (body.innerText||body.textContent||'').split(/\n+/).some(function(l){ l=l.trim(); if(l.length>80 && !EMO.test(l)){ first=l; return true; } return false; });
    if(first.length>230) first=first.slice(0,first.lastIndexOf(' ',225))+'…';
    var hd=q('.art-hd-bar',host); hide([hd]);
    var old=body.querySelector('.evx-now'); if(old) old.remove();
    var now=el('div','evx-now'); now.appendChild(msgRow('Et maintenant ? Voici ce que je te conseille de faire.')[0]);
    now.appendChild(wrapFeed(post(t,{ ttl:'Ce que tu peux faire maintenant', meta:'Le plan d\'action d\'EVA', media:false, like:true,
      txt:'<ul><li><i>1</i><span><b>Vérifie ta situation</b> avec l\'estimateur ci-dessus.</span></li><li><i>2</i><span><b>Valide tes connaissances</b> avec le quiz de 5 questions juste en dessous.</span></li><li><i>3</i><span><b>Passe à l\'action</b> : prépare tes documents et entraîne-toi face à un recruteur.</span></li></ul>',
      actions:[{l:'Mes conseils',fn:function(){ go('eva-workspace'); }},{l:'M\'entraîner',pri:true,fn:function(){ go('eva-entretien'); }}] })));
    /* Bloc « Ce que tu peux faire maintenant » retiré : la checklist personnalisée de fin d'article prend le relais */
    var chips=sub.split('·').map(function(x){return x.trim();}).filter(Boolean);
    mount({ host:host, before:hd, id:'dart', key:'dart-'+id, label:'Droits · Article', bar:true, steps:[
      { make:function(){ return cover(t,{ name:esc(title), handle:t.h+' · article', ic:'book', bio:esc(chips.join(' · ')), stats:[['5','questions quiz'],['Sources','officielles'],['2026','à jour']] }); }, feed:false, wait:1900 },
      { msg:'On regarde ensemble <b>'+esc(title)+'</b> 👌 Je te donne l\'essentiel… puis ce que tu peux faire concrètement.' },
      { think:'EVA lit l\'article pour toi…' },
      { node:body }
    ]});
  }
  // CONSEILS (accueil + panneaux)
  function wsHub(){
    var P=document.getElementById('ew-p0'); if(!P) return; var t=TH.conseils;
    var host=q('.ew-p0-scroll',P), tiles=[].slice.call(P.querySelectorAll('.ew-ptile')); if(!host||!tiles.length) return;
    hide([q('.ew-hero',P), q('.ew-sec-lbl',P), q('.ew-ptiles',P)]); host.classList.add('evx-pad0');
    document.getElementById('s-eva-workspace').classList.add('evx-page');
    var items=tiles.map(function(c){ return { ico:svgOf(q('.ew-ptile-ico',c)), big:svgOf(q('.ew-ptile-ico',c),'#fff'), ttl:esc(txt(q('.ew-ptile-nom',c))), sub:txt(q('.ew-ptile-sub',c)), fn:function(){ c.click(); } }; });
    var steps=[
      { make:function(){ return cover(t,{ name:'Conseils pratiques & pro', bio:'Des conseils sur-mesure, des diagnostics personnalisés et ton Portfolio pour t\'organiser.', stats:[[items.length,'profils'],['Portfolio','inclus'],['24h/24','avec EVA']] }); }, feed:false, wait:2000 },
      { think:'EVA prépare tes conseils…' },
      { msg:'Bienvenue dans tes <b>Conseils pratiques & professionnels</b> 💡 Je t\'accompagne selon ta situation… avec des conseils vraiment concrets.' },
      { make:function(){ return example(t,fromBank('conseils')); } },
      { msg:'Voici les <b>'+items.length+' profils</b> que j\'accompagne, un par un 👇' }
    ];
    items.forEach(function(it,i){ steps.push({ make:function(){ return post(t,{ ico:it.ico, big:it.big, ttl:it.ttl, meta:'Profil '+(i+1)+'/'+items.length, tag:'Conseils', txt:esc(it.sub)+'. Conseils détaillés, contacts utiles et Portfolio.', tip:'Choisis le profil qui décrit ta situation actuelle, pas celle que tu vises.', actions:[{l:'Ouvrir',pri:true,fn:it.fn}] }); } }); });
    steps.push(mob({ think:['Je prépare des conseils qui collent à ta réalité…','Je sélectionne les contacts utiles pour toi…'] }));
    steps.push(mob({ msg:pick(['Un coach carrière, c\'est souvent 80 € la séance. Moi, je suis là <b>24h/24</b>, sans rendez-vous 😉','Pas de blabla : je te dis quoi faire, <b>dans quel ordre</b>, et avec qui 🎯']) }));
    steps.push({ make:function(){ return plus(t,'Pas de conseils génériques : je pars de <b>ta</b> situation, et je te donne les bons contacts, les bons documents et la prochaine action. 🎯'); } });
    steps.push({ msg:'À toi : <b>quel profil te ressemble ?</b> 🤔' });
    steps.push({ make:function(){ return stories(t,items); } });
    mount({ host:host, id:'hub', key:'hub-ws', label:'Conseils & pro', bar:true, steps:steps });
  }
  function ws(n){
    var P=document.getElementById('ew-p'+n); if(!P) return; var t=TH.conseils;
    var who=nom(), key='ws'+n+'-'+(window.EWP||'')+'-'+(window.EWDS||'');
    if(n===1){
      var host=q('.ew-p1-scroll',P), cards=[].slice.call(P.querySelectorAll('.ew-mod-card')); if(!host||!cards.length) return;
      hide([q('.ew-pbar',P), q('.ew-mod-cards',P)]); host.classList.add('evx-pad0');
      var its=cards.map(function(c){ return { ico:svgOf(q('.ew-mod-card-ico',c)), big:svgOf(q('.ew-mod-card-ico',c),'#fff'), ttl:esc(txt(q('.ew-mod-card-ttl',c))), member:/Portfolio/.test(txt(q('.ew-mod-card-ttl',c))), sub:txt(q('.ew-mod-card-sub',c)), fn:function(){ c.click(); } }; });
      var st=[
        { make:function(){ return cover(t,{ name:esc(who)||'Mon espace', handle:t.h+' · mon espace', bio:'Ton espace de travail : mes conseils sur-mesure et ton Portfolio pour gérer tes documents.', stats:[[its.length,'outils'],['100 %','personnalisé'],['24h/24','avec EVA']] }); }, feed:false, wait:1900 },
        { msg:'Voici ton espace <b>'+esc(who)+'</b> 🙌 Deux outils t\'attendent… je te les présente.' }
      ];
      its.forEach(function(it,i){ st.push({ make:function(){ return post(t,{ ico:it.ico, big:it.big, ttl:it.ttl, member:it.member, meta:'Outil '+(i+1)+'/'+its.length, tag:i?'Portfolio':'Conseils', txt:esc(it.sub)+'.', tip:i?'Le Portfolio devient vraiment utile quand tu y ranges tout, dès aujourd\'hui.':'Lis un sujet par jour : c\'est la meilleure façon de progresser.', actions:[{l:'Ouvrir',pri:true,fn:it.fn}] }); } }); });
      st.push({ msg:'Par où on commence ? 😊' });
      st.push({ make:function(){ return stories(t,its); } });
      mount({ host:host, id:'ws1', key:key, label:'Conseils & pro', bar:true, steps:st });
    } else if(n===2){
      var h2=q('.ew-p2-scroll',P), tp=document.getElementById('ew-topics'); if(!h2||!tp) return; h2.classList.add('evx-pad0');
      mount({ host:h2, id:'ws2', key:key, label:'Conseils & pro', bar:true, steps:[
        { make:function(){ return cover(t,{ name:'Conseils · '+esc(who), handle:t.h+' · sujets', bio:'Organismes, entretiens, négociation, contrats, droits : tout en détail pour ton profil.', stats:[['Concret','étape par étape'],['Contacts','utiles'],['2026','à jour']] }); }, feed:false, wait:1800 },
        { msg:(window.EWP==='dem' && !window.EWDS) ? 'Pour te donner les bons conseils, dis-moi d\'abord <b>ta situation</b>.' : 'J\'ai préparé ces sujets pour toi. Choisis celui qui te concerne : je t\'explique tout en détail.' },
        { node:tp }
      ]});
    } else if(n===4){
      var h4=document.getElementById('ew-p4-scroll'); if(!h4) return;
      hide([q('.ew-ana-hero',h4)]);
      mount({ host:h4, id:'ws4', key:'ws4', bar:false, steps:[
        { make:function(){ return cover(t,{ name:'Analyse de document', handle:t.h+' · analyse', ic:'doc', bio:'Dépose ton CV, ta lettre ou ton contrat : je le lis comme un recruteur et je te donne une note sur 10.', stats:[['/10','note'],['Points','forts'],['Conseils','précis']] }); }, feed:false, wait:1500 },
        { msg:'Choisis ton document juste en dessous 👇 je m\'occupe du reste.' }
      ]});
    } else if(n===6){
      var h6=P.firstElementChild; if(!h6) return;
      var f=h6.firstElementChild; if(f && !f.classList.contains('evx')) hide([f]);
      mount({ host:h6, id:'ws6', key:'ws6', bar:false, steps:[
        { make:function(){ return cover(TH.pf,{ name:'Documents importants', handle:TH.pf.h+' · documents', bio:'Un classeur numérique simple : CV, lettres, dossiers administratifs, classés par type et par date.', stats:[['CV','par date'],['Lettres','par offre'],['Privé','100 %']] }); }, feed:false, wait:1500 },
        { msg:'Ici, tu ranges tous tes <b>documents importants</b> au même endroit 📂 Fini les recherches interminables !' }
      ]});
    }
  }
  // PORTFOLIO (réseau social)
  var PF_TXT={
    taches:['Tes tâches en pages : date, heure, statut, commentaires. Ajoute, modifie, supprime… et garde aussi tes infos perso.','Tâches','Coche une tâche dès qu\'elle est faite : ça motive pour la suivante.'],
    agenda:['Tes rendez-vous, entretiens et échéances au même endroit. Je t\'aide à ne rien oublier.','Organisation','Bloque 30 minutes chaque lundi pour planifier ta semaine.'],
    notes:['Tes documents et notes perso : CV, lettres, idées… tout est rangé et retrouvé en 2 secondes.','Documents','Donne un nom clair à chaque document : « CV_Poste_Date ».'],
    contacts:['Ton réseau pro : recruteurs, conseillers, clients. Garde une trace de chaque échange.','Réseau','Note la date et le sujet de chaque échange.'],
    profil:['Ton suivi personnalisé selon ton profil : les étapes clés et où tu en es.','Suivi','Mets à jour ton suivi à chaud, juste après chaque étape.'],
    guide:['Mon guide pratique : des conseils concrets, adaptés à ta situation.','Guide','Lis un chapitre par jour, c\'est plus efficace.'],
    doc:['Dépose un CV, une lettre ou un contrat : je l\'analyse et je te donne une note sur 10.','Analyse','Fais analyser ton CV avant chaque candidature importante.'],
    orgpro:['Les organismes utiles à ton profil, avec téléphone et site en un clic.','Contacts pro','Appelle en début de matinée : c\'est là qu\'on répond le plus vite.']
  };
  function pfShow(){
    var msgs=document.getElementById('ec-msgs'); if(!msgs) return; var t=TH.pf;
    var old=document.getElementById('ec-pf-inline-wrap'); if(old) old.remove();
    var cfg={emoji:'',label:'Suivi'}, I={}; try{ cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem']; I=PF_ICONS; }catch(e){}
    var items=[
      {k:'agenda',ico:I.agenda,ttl:'Agenda',c1:'#2563eb',c2:'#60a5fa'},{k:'taches',ico:I.tasks,ttl:'Tâches',c1:'#0e7490',c2:'#22d3ee'},{k:'notes',ico:I.notes,ttl:'Documents',c1:'#7c3aed',c2:'#a78bfa'},
      {k:'contacts',ico:I.contacts,ttl:'Contacts',c1:'#0891b2',c2:'#22d3ee'},{k:'profil',ico:cfg.emoji,ttl:cfg.label,c1:'#059669',c2:'#34d399'},
      {k:'guide',ico:I.book,ttl:'Guide pratique',c1:'#db2777',c2:'#f472b6'},{k:'doc',ico:I.doc,ttl:'Analyser un document',c1:'#475569',c2:'#94a3b8'},
      {k:'orgpro',ico:I['case'],ttl:'Contacts professionnels',c1:'#0284c7',c2:'#38bdf8'}
    ].map(function(it){ it.ico=it.ico||S(IC.folder,'currentColor'); it.fn=function(){ if(typeof window.ewOpenPortfolioToTab==='function') window.ewOpenPortfolioToTab(it.k); }; return it; });
    var w=el('div','pfs'); w.id='ec-pf-inline-wrap'; msgs.appendChild(w);
    var steps=[
      { make:function(){ return cover(t,{ member:true, name:'Mon Portfolio', handle:t.h+' · '+(nom()||'mon espace'), badge:'ESPACE PRIVÉ', bio:'Ton espace de travail et la gestion de tes documents. Organise-toi, range tout, retrouve tout.', stats:[[items.length,'outils'],['100 %','privé'],['24h/24','avec EVA']] }); }, feed:false, wait:2000 },
      { msg:'Bienvenue dans ton <b>Portfolio</b> 📂 C\'est ton espace de travail : tu ranges tes documents, tu t\'organises… et tu gardes tout au même endroit.' },
      { think:'EVA ouvre tes outils…' },
      { msg:'Je te présente tes outils, <b>dans l\'ordre</b> 👇' }
    ];
    items.forEach(function(it,i){ var d=PF_TXT[it.k]||['',it.ttl,'']; steps.push({ make:function(){ return post(t,{ ico:it.ico, big:it.ico, ttl:esc(it.ttl), c1:it.c1, c2:it.c2, meta:'Outil '+(i+1)+'/'+items.length, tag:d[1], txt:esc(d[0]), tip:d[2], actions:[{l:'Ouvrir',pri:true,fn:it.fn}] }); } }); });
    steps.push(mob({ think:['Je range déjà tout pour toi…','Je prépare ton espace de travail…'] }));
    steps.push(mob({ msg:pick(['Imagine : plus jamais « il est où mon CV ? » la veille d\'un entretien 😅','Un espace pro bien rangé, c\'est <b>la moitié du stress</b> en moins. Promis 🙌']) }));
    steps.push({ make:function(){ return plus(t,'Tout ton parcours dans <b>un seul espace</b> : documents, agenda, contacts et analyses. Plus de fichiers perdus, plus d\'oublis. ✨'); } });
    steps.push({ msg:'À toi de jouer : <b>par quoi on commence ?</b> 🤔' });
    steps.push({ make:function(){ return stories(t,items.map(function(it){ return { ico:it.ico, ttl:esc(it.ttl), c1:it.c1, fn:it.fn }; })); } });
    mount({ host:w, id:'pf', key:'pf', bar:false, steps:steps });
  }
  // QUIZ (accueil)
  function quizHub(){
    var sc=document.getElementById('s-eva-entretien'); if(!sc) return; var t=TH.quiz;
    var body=q('.eva-sub-body',sc); if(!body) return;
    var list=null, dark=null; [].forEach.call(body.children,function(c){ var s=c.getAttribute('style')||''; if(/padding:16px 16px 40px/.test(s)) list=c; if(/#0f2447/.test(s)) dark=c; });
    if(!list) return;
    hide([dark, list, q('.ev-hero',body)]); body.classList.add('evx-pad0'); sc.classList.add('evx-page');
    var blocks=[].filter.call(list.children,function(c){ return c.querySelectorAll('[onclick^="go("]').length>=2; });
    var note=[].filter.call(list.children,function(c){ return /Eva vous dit/.test(c.textContent||''); })[0];
    var items=blocks.map(function(b){
      var head=b.firstElementChild, acts=b.querySelectorAll('[onclick^="go("]');
      var nm=head ? txt(head.querySelector('div[style*="font-weight:700"]')) : '', sub=head ? txt(head.querySelector('div[style*=".54rem"]')) : '';
      var d1=txt(acts[0].querySelector('div[style*=".64rem"]')), d2=txt(acts[1].querySelector('div[style*=".64rem"]'));
      return { ico:svgOf(head), big:svgOf(head,'#fff'), ttl:esc(nm), sub:sub, d1:d1, d2:d2, qcm:function(){ acts[0].click(); }, sim:function(){ acts[1].click(); } };
    });
    var posts=[];
    var steps=[
      { make:function(){ return cover(t,{ name:'Quiz & mises en situation', bio:'Des QCM pour vérifier tes connaissances, et des simulations réalistes pour t\'entraîner face à un recruteur.', stats:[[items.length,'profils'],['QCM','+ simulation'],['Bilan','à la fin']] }); }, feed:false, wait:2000 },
      { think:'EVA prépare ton entraînement…' },
      { msg:'Prêt(e) à t\'entraîner ? 💪 Ici, on prépare tes <b>entretiens</b> : connaître la théorie, c\'est bien — savoir réagir face à un recruteur, c\'est mieux.' },
      { make:function(){ return example(t,fromBank('quiz')); } },
      { msg:'Pour chaque profil, tu as un <b>QCM</b> et une <b>mise en situation</b>. Je te les présente 👇' }
    ];
    items.forEach(function(it,i){ steps.push({ make:function(){ var p=post(t,{ ico:it.ico, big:it.big, ttl:it.ttl, meta:'Profil '+(i+1)+'/'+items.length+' · '+it.sub, tag:'Entraînement',
      txt:'<ul><li><i>'+S(IC.check,'currentColor',2.6)+'</i><span><b>QCM :</b> '+esc(it.d1)+'</span></li><li><i>'+S(IC.target,'currentColor',2.2)+'</i><span><b>Mise en situation :</b> '+esc(it.d2)+'</span></li></ul>',
      tip:'Commence par le QCM, puis passe à la simulation : tu seras plus à l\'aise.', actions:[{l:'QCM',fn:it.qcm},{l:'Simulation',pri:true,fn:it.sim}] }); posts[i]=p; return p; } }); });
    steps.push(mob({ think:['Je prépare des recruteurs… exigeants mais bienveillants 😄','Je mélange les questions pour que ce soit jamais pareil…'] }));
    steps.push(mob({ msg:pick(['Un entretien raté, ça ne se rattrape pas. Ici, tu peux te tromper autant que tu veux — c\'est fait pour ça 💪','Le jour J, tu auras déjà vécu la scène. C\'est ça, <b>la vraie confiance</b> ✨']) }));
    steps.push({ make:function(){ return plus(t,'Un entraînement <b>réaliste et sans jugement</b>, disponible 24h/24, avec un bilan personnalisé à chaque session. 🎯'); } });
    steps.push({ msg:'À toi : <b>choisis ton profil</b> 🤔' });
    steps.push({ make:function(){ return stories(t,items.map(function(it,i){ return { ico:it.ico, ttl:it.ttl, fn:function(){ scrollToEl(posts[i]); } }; })); } });
    if(note) steps.push({ msg:esc(txt(note).replace(/^Eva vous dit\s*:\s*/,'')) });
    var hs=mount({ host:body, id:'hub', key:'hub-quiz', label:'Quiz & mises en situation', bar:true, steps:steps });
    // Mobile : accès direct aux 8 sessions, visible tout de suite (sans attendre la présentation)
    if(M() && hs && !q('.evx-quick-wrap',hs)){
      var qw=vars(el('div','evx-quick-wrap','<div class="evx-qh">'+S(IC.target,'currentColor',2.2)+'Accès direct · 8 sessions</div>'),t), g=el('div','evx-quick');
      items.forEach(function(it){ [['QCM',it.qcm,IC.check],['Simulation',it.sim,IC.target]].forEach(function(x){ var b=el('button',null,'<i>'+S(x[2],'currentColor',2.2)+'</i><span><b>'+x[0]+'</b>'+it.ttl+'</span>'); b.type='button'; b.onclick=x[1]; g.appendChild(b); }); });
      qw.appendChild(g); var fd=q('.evx-feed',hs); hs.insertBefore(qw,fd);
    }
  }
  // QUIZ : briefing + bilan
  var KEY={salarie:'sal',demandeur:'dem',reconversion:'rec',freelance:'frl'};
  var LBL={salarie:'Salarié',demandeur:'Demandeur d\'emploi',reconversion:'Reconversion',freelance:'Freelance'};
  var SIM={
    salarie:{who:'Claire',role:'DRH d\'une PME',goal:'convaincre sur ton expérience et ta posture',tips:['Réponds avec la méthode STAR : situation, tâche, action, résultat.','Donne un chiffre ou un exemple concret à chaque fois.','Reste positif(ve), même sur une question piège.']},
    demandeur:{who:'Marc',role:'recruteur terrain',goal:'présenter ta période de recherche avec assurance',tips:['Présente ta recherche comme un projet, pas comme un vide.','Montre ce que tu as appris ou fait pendant cette période.','Termine chaque réponse sur ta motivation pour le poste.']},
    reconversion:{who:'Sophie',role:'conseillère bilan',goal:'défendre ton projet de reconversion',tips:['Explique ton « pourquoi » en une phrase claire.','Relie tes compétences d\'avant à ton nouveau métier.','Montre que ton projet est préparé : formation, financement, calendrier.']},
    freelance:{who:'Thomas',role:'client potentiel',goal:'vendre ta mission et ton tarif',tips:['Parle du résultat pour le client, pas seulement de ta technique.','Annonce ton tarif avec calme, sans te justifier.','Propose une prochaine étape concrète à la fin.']}
  };
  function tipsList(a){ return '<ul>'+a.map(function(x,i){ return '<li><i>'+(i+1)+'</i><span>'+esc(x)+'</span></li>'; }).join('')+'</ul>'; }
  function brief(kind,profil,orig){
    var k=KEY[profil]; if(!k) return orig(profil);
    var pre=kind==='qcm'?'nq-':'ns-', t=TH.quiz;
    var feed=document.getElementById(pre+k+'-feed'), ch=document.getElementById(pre+k+'-choices');
    if(!feed||!ch) return orig(profil);
    feed.innerHTML=''; ch.innerHTML='';
    var stp=document.getElementById(pre+k+'-step'); if(stp) stp.textContent=kind==='qcm'?'15 ou 25 questions':'15 ou 25 situations';
    var host=el('div','evx-brief'); feed.appendChild(host);
    var sim=SIM[profil]||SIM.salarie, steps;
    if(kind==='qcm') steps=[
      { make:function(){ return cover(t,{ name:'QCM · '+LBL[profil], handle:t.h+' · qcm', ic:'quiz', bio:'Des questions tirées au hasard sur tes droits et ta préparation. Une seule bonne réponse, et l\'explication juste après.', stats:[['15 ou 25','questions'],['Direct','correction'],['Bilan','EVA']] }); }, feed:false, wait:2600 },
      { think:'EVA tire tes questions au hasard…' },
      { msg:'Avant de commencer, je te présente ton défi 🎯' },
      { make:function(){ return post(t,{ ttl:'Mes 3 conseils', meta:'Avant de répondre', media:false, txt:tipsList(['Lis chaque proposition jusqu\'au bout.','Méfie-toi des chiffres proches : jours ouvrables ou calendaires.','Si tu hésites, élimine d\'abord les réponses trop absolues.']) }); }, wait:4500 },
      ({ think:['Je mélange tes questions pour que ce soit jamais pareil…','Je prépare ton défi…'], wait:2200 }),
      ({ msg:pick(['Petit rituel avant de commencer : respire profondément, relâche tes épaules… 🧘','Pas de pression : chaque erreur est expliquée. C\'est justement là que tu progresses le plus 💡','Imagine que c\'est le jour J et que tu connais déjà toutes les réponses. Cette confiance-là, on va la construire ensemble 🔥']), wait:3200 }),
      { msg:'Choisis ta durée juste en dessous, puis appuie sur <b>Je suis prêt(e)</b> quand tu te sens prêt(e) 💪' }
    ]; else steps=[
      { make:function(){ return cover(t,{ name:'Face à '+esc(sim.who), handle:t.h+' · simulation', ic:'target', bio:'Une simulation réaliste d\'entretien : réponds comme si tu y étais vraiment.', stats:[[esc(sim.who),esc(sim.role)],['15 ou 25','situations'],['Bilan','EVA']] }); }, feed:false, wait:2600 },
      { think:'EVA prépare ton interlocuteur…' },
      { msg:'Avant l\'entretien, je te briefe 🎬' },
      { make:function(){ return post(t,{ ttl:'Ton brief', meta:'Mise en situation · '+LBL[profil], media:false, txt:'<ul><li><i>'+S(IC.user,'currentColor',2.2)+'</i><span><b>Ton interlocuteur :</b> '+esc(sim.who)+', '+esc(sim.role)+'</span></li><li><i>'+S(IC.flag,'currentColor',2.2)+'</i><span><b>Ton objectif :</b> '+esc(sim.goal)+'</span></li><li><i>'+S(IC.star,'currentColor',2.2)+'</i><span><b>À la fin :</b> ton bilan et tes axes de progrès</span></li></ul>' }); } },
      { make:function(){ return post(t,{ ttl:'Mes 3 conseils', meta:'Pour réussir', media:false, txt:tipsList(sim.tips) }); }, wait:4500 },
      ({ msg:'Imagine la scène : tu entres, tu salues '+esc(sim.who)+', tu t\'assois… Prends une seconde pour te mettre dans la peau du candidat 🎬', wait:3400 }),
      ({ msg:pick(['Réponds comme le jour J, avec tes mots. Ici, tu as le droit de te tromper : c\'est fait pour ça 💪','Le jour J, tu auras déjà vécu la scène. C\'est ça, <b>la vraie confiance</b> ✨']), wait:3200 }),
      { msg:'Respire… choisis ta durée juste en dessous, puis appuie sur <b>Je suis prêt(e)</b> 💪' }
    ];
    var slot=null, fb=null;
    function goBtn(){
      clearTimeout(fb);
      if(ch.querySelector('.evx-go')) return;
      var nb=window._cpNb===25?25:15, unit=kind==='qcm'?'questions':'situations';
      var pick=vars(el('div','evx-nb','<div class="evx-nbh">Combien de '+unit+' ?</div><div class="evx-nbs"><button type="button" data-n="15"><b>15</b><span>Format court</span></button><button type="button" data-n="25"><b>25</b><span>Format complet</span></button></div>'),t);
      function sel(n){ nb=n; window._cpNb=n; [].forEach.call(pick.querySelectorAll('[data-n]'),function(x){ x.classList.toggle('on',+x.getAttribute('data-n')===n); }); }
      pick.addEventListener('click',function(e){ var x=e.target.closest('[data-n]'); if(x) sel(+x.getAttribute('data-n')); }); sel(nb);
      var b=el('button','evx-go','Je suis prêt(e) 💪'); b.type='button';
      function start(){ if(slot && slot._static && !slot.classList.contains('evx-done')) slot._static(); ch.innerHTML=''; window._cpNb=nb; orig(profil); feed.insertBefore(host,feed.firstChild); }
      b.onclick=function(){ if(b._on) return; b._on=1; pick.classList.add('off');
        var n=3; b.classList.add('cd'); (function tick(){ if(!b.isConnected) return; if(n>0){ b.textContent=n+'…'; n--; setTimeout(tick,800); } else { b.textContent='C\'est parti ! 🔥'; setTimeout(start,450); } })(); };
      ch.appendChild(pick); ch.appendChild(b);
    }
    slot=mount({ host:host, id:'brief', key:kind+'-'+profil, bar:false, steps:steps, done:goBtn });
    fb=setTimeout(goBtn, 40000);
  }
  function bilan(res){
    if(!res || res.querySelector('.evx-bilan-wrap') || !res.querySelector('.nova-result-score')) return;
    var m=(res.querySelector('.nova-result-score').textContent||'').replace(/\s/g,'').match(/(\d+)\/(\d+)/);
    var pct=m ? Math.round(+m[1]/Math.max(1,+m[2])*100) : 50, t=TH.quiz;
    var sim=/mise-situation/.test((res.closest('.nova-screen')||{}).id||'');
    var good = pct>=80 ? 'Tu maîtrises le sujet : tes réponses sont précises et sûres.' : pct>=60 ? 'Tu as de bonnes bases : l\'essentiel est acquis.' : pct>=40 ? 'Tu progresses : plusieurs réflexes sont déjà là.' : 'Tu as osé te tester, et c\'est le premier pas.';
    var work = pct>=80 ? 'Affine les détails qui font la différence : délais, montants, formulations.' : pct>=60 ? 'Revois les points où tu as hésité : ce sont eux qui piègent le plus.' : 'Reprends les fondamentaux, un thème à la fois, avec Droits & aides.';
    var next = pct>=80 ? (sim ? 'Passe au QCM pour verrouiller tes connaissances.' : 'Passe à une mise en situation face à un recruteur.') : 'Refais une session dans 2 ou 3 jours : les questions changent à chaque fois.';
    var box=el('div','evx-bilan-wrap');
    box.appendChild(msgRow('Voici mon bilan. Prends 30 secondes pour le lire : c\'est là que tu progresses le plus.')[0]);
    box.appendChild(post(t,{ ttl:'Le bilan d\'EVA · '+pct+' %', meta:sim?'Mise en situation':'QCM', media:false,
      txt:'<ul><li><i>'+S(IC.check,'currentColor',2.6)+'</i><span><b>Ce qui est bien :</b> '+good+'</span></li><li><i>'+S(IC.target,'currentColor',2.2)+'</i><span><b>À travailler :</b> '+work+'</span></li><li><i>'+S(IC.up,'currentColor',2.2)+'</i><span><b>Prochaine étape :</b> '+next+'</span></li></ul>',
      actions:[{l:'Droits & aides',fn:function(){ go('eva-droits'); }},{l:'Retour aux quiz',pri:true,fn:function(){ go('eva-entretien'); }}] }));
    res.insertBefore(box,res.firstChild);
  }
  // MOTIVATION & ÉQUILIBRE
  function ebHero(){
    var b=document.getElementById('eb-body'); if(!b || !b.firstElementChild) return;
    if(b.firstElementChild.classList.contains('evx-ebh')) return;
    var old=b.querySelector('.evx-ebh'); if(old) old.remove();
    var h=el('div','evx-ebh'); h.appendChild(cover(TH.motiv,{ name:'Motivation & Équilibre', bio:'Un petit rituel pour faire le point, avec bienveillance et sans jugement. Des questions guidées selon ton profil et ton moment de la journée.', stats:[['15 ou 25','questions'],['5 min','environ'],['100 %','bienveillant']] }));
    var atEnd=b.scrollHeight-b.scrollTop-b.clientHeight<40; b.insertBefore(h,b.firstChild); if(atEnd || b.children.length<6) b.scrollTop=b.scrollHeight;
  }
  // TÂCHES (menu EVA)
  var TK_PROF=[
    {k:'sal',ttl:'Salarié',ico:IC.user,txt:'Tes missions, tes réunions et tes objectifs : chaque tâche a sa date, son heure, son statut et tes commentaires.',tip:'Note tes objectifs dès qu\'ils sont fixés : c\'est ta base pour l\'entretien annuel.'},
    {k:'dem',ttl:'Demandeur d\'emploi',ico:IC.target,txt:'Tes candidatures, tes relances et tes rendez-vous France Travail : rien ne passe à la trappe.',tip:'Programme une relance 7 jours après chaque candidature.'},
    {k:'frl',ttl:'Freelance',ico:IC.conseils,txt:'Tes clients, tes devis, tes factures et tes échéances URSSAF, rangés au même endroit.',tip:'Bloque une date chaque mois ou trimestre pour ta déclaration URSSAF.'},
    {k:'etu',ttl:'Étudiant / Reconversion',ico:IC.school,txt:'Tes cours, tes recherches de stage ou d\'alternance et tes dossiers (CPF, bourse, bilan).',tip:'Découpe chaque gros dossier en petites tâches datées.'}
  ];
  function taches(){
    var sc=document.getElementById('s-eva-taches'); if(!sc) return; var t=TH.taches;
    var page=document.getElementById('tk-page'), root=document.getElementById('tk-root'); if(!page||!root) return;
    if(typeof window.cpTkRender==='function') window.cpTkRender(root);
    sc.classList.add('evx-page');
    var steps=[
      { make:function(){ return cover(t,{ member:true, name:'Tâches', bio:'Organise ton travail, une tâche après l\'autre : date, heure, statut, commentaires… et tes infos perso au même endroit.', stats:[['4','profils'],['Date','+ heure'],['100 %','privé']] }); }, feed:false, wait:2000 },
      { think:'EVA prépare ton espace de travail…' },
      { msg:'Bienvenue dans tes <b>Tâches</b> ✅ Ici, tu notes ce que tu as à faire, tu suis où tu en es… et tu coches quand c\'est fait.' },
      { make:function(){ return post(t,{ ico:S(IC.tasks,t.c1,2), ttl:'Comment ça marche ?', meta:'En 3 gestes', media:false, txt:'<ul><li><i>1</i><span><b>Ajoute</b> une tâche : titre, date, heure, priorité.</span></li><li><i>2</i><span><b>Suis-la</b> : statut « à faire », « en cours » ou « fait », et des commentaires pour noter l\'avancement.</span></li><li><i>3</i><span><b>Modifie ou supprime</b> quand tu veux. Tes <b>infos perso</b> ont leur propre espace.</span></li></ul>' }); } },
      { msg:'Je t\'adapte des idées de tâches selon ton profil 👇' }
    ];
    TK_PROF.forEach(function(p,i){ steps.push({ make:function(){ return post(t,{ ico:S(p.ico,t.c1,2), big:S(p.ico), ttl:esc(p.ttl), meta:'Profil '+(i+1)+'/4', tag:'Tâches', txt:esc(p.txt), tip:p.tip, actions:[{l:'Choisir',pri:true,fn:function(){ if(window.cpTkSetProfile) window.cpTkSetProfile(p.k); scrollToEl(page); }}] }); } }); });
    steps.push(mob({ think:['Je range tes idées de tâches…','Je prépare ta liste…'] }));
    steps.push({ make:function(){ return plus(t,'Tes tâches sont aussi dans ton <b>Portfolio</b> : tu les retrouves à côté de ton agenda, de tes documents et de tes contacts. 📂'); } });
    steps.push({ msg:'C\'est parti : ta liste est juste ici 👇' });
    steps.push({ node:page });
    mount({ host:q('.evad-scroll',sc), id:'tk', key:'tk', label:'Tâches', bar:true, steps:steps });
  }
  // SUIVI DE MA MOTIVATION
  function jload(){ try{ return JSON.parse(localStorage.getItem('jnl_v2')||'{}')||{}; }catch(e){ return {}; } }
  function tracker(){
    var sc=document.getElementById('s-eva-tracker'); if(!sc) return; var t=TH.suivi;
    var tabs=q('.jnl-tabs',sc), body=document.getElementById('jnl-body'); if(!tabs||!body) return;
    var scroll=q('.evx-scroll',sc);
    if(!scroll){ scroll=el('div','evx-scroll'); sc.insertBefore(scroll,tabs); }
    var jw=q('.evx-jnl',sc); if(!jw){ jw=el('div','evx-jnl'); jw.appendChild(tabs); jw.appendChild(body); }
    sc.classList.add('evx-page');
    var d=jload(), n=(d.entries||[]).length, last=n ? d.entries[n-1].avg : '—';
    var tabsInfo=[[IC.pen,'Bilan du jour','Deux minutes pour noter tes 4 piliers : énergie, finances, mental et confiance.'],[IC.suivi,'Mon suivi','Ta courbe par semaine, par mois et par année, et la moyenne de chaque pilier.'],[IC.chat,'EVA parle','Mon analyse de tes bilans et mes conseils, dès ta 2e évaluation.']];
    var steps=[
      { make:function(){ return cover(t,{ member:true, name:'Suivi de ma motivation', bio:'Note ton état, visualise ton évolution et reçois mes conseils, jour après jour.', stats:[[d.streak||0,'jours de suite'],[n,'bilans'],[last,'dernier score']] }); }, feed:false, wait:2000 },
      { msg:'Bienvenue dans ton <b>Suivi de ma motivation</b> 📈 Deux minutes par jour suffisent… pour voir ton chemin parcouru.' },
      { make:function(){ return quote(t); } },
      { msg:'Mon conseil : prends <b>2 minutes chaque soir</b> pour remplir ton bilan du jour. Avec l\'habitude, tu verras ce qui te donne de l\'énergie… et ce qui t\'en prend. 🌙' },
      { msg:'Ton journal a 3 espaces. Je te les présente 👇' }
    ];
    tabsInfo.forEach(function(x,i){ steps.push({ make:function(){ return post(t,{ ico:S(x[0],t.c1,2), big:S(x[0]), ttl:x[1], meta:'Espace '+(i+1)+'/3', tag:'Suivi', txt:x[2], actions:[{l:'Ouvrir',pri:true,fn:function(){ var sl=q('.evx[data-slot="trk"]',sc); if(jw.parentNode && jw.parentNode.classList.contains('evx-park') && sl && sl._static) sl._static(); jnlTab(i); setTimeout(function(){ scrollToEl(jw); },120); }}] }); } }); });
    steps.push(mob({ think:['Je regarde comment tu te sens ces derniers jours…','Je prépare ton tableau de bord…'] }));
    steps.push({ make:function(){ return plus(t,'Je ne me contente pas de stocker tes notes : <b>je lis tes tendances</b> et je te conseille dès ta 2e évaluation. 💜'); } });
    steps.push({ msg:'C\'est parti : ton journal est juste ici 👇' });
    steps.push({ node:jw });
    mount({ host:scroll, id:'trk', key:'trk', label:'Suivi de ma motivation', bar:true, steps:steps });
  }
  var PIL=[['energie','Énergie','#f59e0b'],['argent','Finances','#10b981'],['mental','Mental','#8b5cf6'],['amour','Confiance','#f43f5e']];
  function pd(s){ var a=String(s||'').split('-'); return new Date(+a[0],(+a[1]||1)-1,+a[2]||1); }
  function r1(x){ return Math.round(x*10)/10; }
  var PERIOD='week';
  function series(entries,per){
    var now=new Date(); now.setHours(0,0,0,0); var pts=[];
    if(per==='year'){
      for(var m=11;m>=0;m--){ var dt=new Date(now.getFullYear(),now.getMonth()-m,1);
        var es=entries.filter(function(e){ var x=pd(e.date); return x.getFullYear()===dt.getFullYear() && x.getMonth()===dt.getMonth(); });
        pts.push({ l:['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'][dt.getMonth()], v:es.length?r1(es.reduce(function(a,e){return a+e.avg;},0)/es.length):null, n:es.length }); }
    } else {
      var days=per==='month'?30:7;
      for(var i=days-1;i>=0;i--){ var dd=new Date(now); dd.setDate(now.getDate()-i);
        var e=entries.filter(function(x){ return +pd(x.date)===+dd; })[0];
        pts.push({ l:per==='week'?['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'][dd.getDay()]:(dd.getDate()+'/'+(dd.getMonth()+1)), v:e?e.avg:null, n:e?1:0 }); }
    }
    return pts;
  }
  function inPeriod(entries,per){ var now=new Date(); now.setHours(0,0,0,0); var from=new Date(now);
    if(per==='week') from.setDate(now.getDate()-6); else if(per==='month') from.setDate(now.getDate()-29); else from=new Date(now.getFullYear(),now.getMonth()-11,1);
    return entries.filter(function(e){ return pd(e.date)>=from; }); }
  function chart(pts){
    var W=window.innerWidth<900?340:600,H=window.innerWidth<900?170:190,L=24,R=10,T=14,B=26, n=pts.length, x=function(i){ return L+(n<2?0:(W-L-R)*i/(n-1)); }, y=function(v){ return T+(H-T-B)*(1-v/10); };
    var g=''; [0,5,10].forEach(function(v){ g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="#eef2f7" stroke-width="1"/><text x="'+(L-8)+'" y="'+(y(v)+3.5)+'" text-anchor="end" font-size="10" fill="#94a3b8">'+v+'</text>'; });
    var step=Math.max(1,Math.ceil(n/7)), lab=''; pts.forEach(function(p,i){ if(i%step===0 || i===n-1) lab+='<text x="'+x(i)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10" fill="#94a3b8">'+p.l+'</text>'; });
    var segs=[], cur=[]; pts.forEach(function(p,i){ if(p.v==null){ if(cur.length) segs.push(cur); cur=[]; } else cur.push([x(i),y(p.v)]); }); if(cur.length) segs.push(cur);
    var line='', area=''; segs.forEach(function(s){ var d=s.map(function(p,i){ return (i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1); }).join(' '); line+='<path d="'+d+'" fill="none" stroke="#6d28d9" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'; if(s.length>1) area+='<path d="'+d+' L'+s[s.length-1][0].toFixed(1)+' '+y(0)+' L'+s[0][0].toFixed(1)+' '+y(0)+' Z" fill="url(#trkg)"/>'; });
    var dots=''; pts.forEach(function(p,i){ if(p.v==null) return; dots+='<g class="pt" data-t="'+p.l+' : '+p.v+'/10'+(p.n>1?' · '+p.n+' bilans':'')+'" data-x="'+x(i)+'" data-y="'+y(p.v)+'"><circle cx="'+x(i)+'" cy="'+y(p.v)+'" r="12" fill="transparent"/><circle class="v" cx="'+x(i)+'" cy="'+y(p.v)+'" r="4.5" fill="#6d28d9" stroke="#fff" stroke-width="2"/></g>'; });
    return '<svg class="trk-ch" data-w="'+W+'" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Évolution de ta moyenne"><defs><linearGradient id="trkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".22"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient></defs>'+g+area+line+dots+lab+'</svg>';
  }
  function trackCard(){
    var d=jload(), entries=(d.entries||[]).slice().sort(function(a,b){ return pd(a.date)-pd(b.date); });
    var c=el('div','trk'); c.style.position='relative';
    function draw(){
      var es=inPeriod(entries,PERIOD), avg=es.length?r1(es.reduce(function(a,e){return a+e.avg;},0)/es.length):'—';
      var lbl={week:'cette semaine',month:'ce mois-ci',year:'cette année'}[PERIOD];
      var h='<div class="trk-hd"><h4>Mon suivi</h4><div class="trk-seg">'+[['week','Semaine'],['month','Mois'],['year','Année']].map(function(p){ return '<button type="button" data-p="'+p[0]+'" class="'+(PERIOD===p[0]?'on':'')+'">'+p[1]+'</button>'; }).join('')+'</div></div>';
      if(!entries.length){ h+='<div class="trk-empty">Fais ton premier bilan du jour : ta courbe apparaîtra ici, par semaine, par mois et par année.</div>'; c.innerHTML=h; return; }
      h+='<div class="trk-kpi"><b>'+avg+'</b><span>moyenne '+lbl+' · '+es.length+' bilan'+(es.length>1?'s':'')+'</span></div>'+chart(series(entries,PERIOD));
      h+='<div class="trk-pl">'+PIL.map(function(p){ var v=es.length?r1(es.reduce(function(a,e){ return a+((e.scores&&e.scores[p[0]])||5); },0)/es.length):0; return '<div><span>'+p[1]+'</span><i><b style="width:'+(v*10)+'%;background:'+p[2]+'"></b></i><em>'+(es.length?v:'—')+'</em></div>'; }).join('')+'</div>';
      h+='<div class="trk-tip"></div>';
      c.innerHTML=h;
    }
    c.addEventListener('click',function(e){ var b=e.target.closest('.trk-seg button'); if(b){ PERIOD=b.getAttribute('data-p'); draw(); } });
    c.addEventListener('mouseover',function(e){ var g=e.target.closest && e.target.closest('.pt'), tip=q('.trk-tip',c), sv=q('svg.trk-ch',c); if(!tip||!sv) return; if(!g){ tip.style.opacity=0; return; }
      var r=sv.getBoundingClientRect(), cr=c.getBoundingClientRect(), k=r.width/(+sv.getAttribute('data-w')||600); tip.textContent=g.getAttribute('data-t'); tip.style.left=(r.left-cr.left+(+g.getAttribute('data-x'))*k)+'px'; tip.style.top=(r.top-cr.top+(+g.getAttribute('data-y'))*k)+'px'; tip.style.opacity=1; });
    c.addEventListener('mouseleave',function(){ var tip=q('.trk-tip',c); if(tip) tip.style.opacity=0; });
    draw(); return c;
  }
  var ADV={ energie:'couche-toi 30 minutes plus tôt ce soir et fais une vraie pause sans écran à midi.', argent:'liste tes 3 dépenses fixes et vérifie tes droits (ARE, CAF, aides) dans Droits & aides.', mental:'écris 3 choses faites aujourd\'hui, même petites : ça remet les choses en perspective.', amour:'relis une réussite passée et entraîne-toi avec une mise en situation EVA.' };
  function adviceCard(){
    var d=jload(), es=(d.entries||[]).slice().sort(function(a,b){ return pd(a.date)-pd(b.date); }), t=TH.suivi;
    if(es.length<2){
      var c=post(t,{ ttl:'Les conseils d\'EVA', meta:'Disponibles dès ta 2e évaluation', media:false, like:false,
        txt:'Encore <b>'+(2-es.length)+' évaluation'+(2-es.length>1?'s':'')+'</b> et je te donne mes premiers conseils personnalisés.<div class="tadv-dots"><span class="'+(es.length>=1?'on':'')+'"></span><span></span></div>',
        actions:[{l:'Faire mon bilan',pri:true,fn:function(){ jnlTab(0); }}] });
      c.classList.add('tadv'); return c;
    }
    var a=es[es.length-2], b=es[es.length-1], dv=r1(b.avg-a.avg);
    var dl=PIL.map(function(p){ return { p:p, v:((b.scores||{})[p[0]]||5)-((a.scores||{})[p[0]]||5), now:(b.scores||{})[p[0]]||5 }; });
    var best=dl.slice().sort(function(x,y){ return y.v-x.v; })[0], low=dl.slice().sort(function(x,y){ return x.now-y.now; })[0];
    var tr=dv>0.2?[IC.up,'En hausse de '+dv+' point'+(dv>=2?'s':'')+' depuis ta dernière évaluation. Continue comme ça.']:dv<-0.2?[IC.down,'En baisse de '+Math.abs(dv)+' point'+(Math.abs(dv)>=2?'s':'')+'. Rien de grave : on regarde ensemble ce qui coince.']:[IC.flat,'Stable depuis ta dernière évaluation. La régularité, c\'est déjà une force.'];
    var c2=post(t,{ ttl:'Les conseils d\'EVA', meta:'Basés sur tes 2 dernières évaluations', media:false,
      txt:'<ul><li><i>'+S(tr[0],'currentColor',2.2)+'</i><span><b>Tendance :</b> '+tr[1]+'</span></li>'
        +(best.v>0?'<li><i>'+S(IC.star,'currentColor',2.2)+'</i><span><b>Ta plus belle progression :</b> '+best.p[1]+' (+'+best.v+'). Note ce qui a aidé.</span></li>':'')
        +'<li><i>'+S(IC.bulb,'currentColor',2.2)+'</i><span><b>À soigner : '+low.p[1]+' ('+low.now+'/10).</b> Mon conseil : '+ADV[low.p[0]]+'</span></li></ul>',
      actions:[{l:'M\'entraîner',fn:function(){ go('eva-entretien'); }},{l:'Faire mon bilan',pri:true,fn:function(){ jnlTab(0); }}] });
    c2.classList.add('tadv'); return c2;
  }
  function jnl(i){
    var b=document.getElementById('jnl-body'); if(!b) return;
    if(i===1){
      var hist=q('.jnl-hist',b), bars=hist && q('.jnl-chart-card',hist); if(bars) bars.classList.add('evx-hid2');
      var top=el('div'); top.appendChild(trackCard()); top.appendChild(wrapFeed(adviceCard())); b.insertBefore(top,b.firstChild);
    } else if(i===2){ b.insertBefore(wrapFeed(adviceCard()),b.firstChild); }
    b.querySelectorAll('.jnl-chart-title,.jnl-radar-title,.jnl-stat-lbl,.jnl-analyse-title').forEach(function(n){ n.childNodes.forEach(function(x){ if(x.nodeType===3) x.nodeValue=x.nodeValue.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu,'').replace(/^\s+/,''); }); });
    if(i){ var host=el('div'); b.insertBefore(host,b.firstChild);
      mount({ host:host, id:'jnl'+i, key:'jnl'+i, bar:false, ctrl:false, steps:[{ msg: i===1 ? 'Voici <b>ton suivi</b> : choisis la semaine, le mois ou l\'année. Regarde surtout ton pilier le plus bas : c\'est là qu\'une petite action change tout.' : 'Ici, <b>je te parle</b> : mon analyse de tes bilans, et mes conseils pour les prochains jours.' }] }); }
  }
  // À PROPOS D'EVA
  function identity(){
    var sc=document.getElementById('s-eva-identity'); if(!sc) return; var t=TH.eva;
    var host=q('.evad-scroll',sc), body=q('.eva-id-body',sc); if(!host||!body) return;
    hide([q('.eva-id-hero',sc)]); sc.classList.add('evx-page');
    mount({ host:host, id:'id', key:'identity', label:'À propos d\'EVA', bar:true, steps:[
      { make:function(){ return cover(t,{ name:'EVA', handle:'@eva · by CareerPulse', bio:'L\'intelligence au service de tes droits professionnels. Je t\'aide à comprendre, anticiper et agir.', stats:[['29','articles'],['4','profils'],['2026','à jour']] }); }, feed:false, wait:2000 },
      { msg:'Enchantée 👋 Moi, c\'est <b>EVA</b>, ton assistante RH et droit du travail. Je ne remplace pas un avocat : je te donne les clés pour décider en connaissance de cause.' },
      { make:function(){ return post(t,{ ttl:'Mes 3 engagements', meta:'Ce qui me guide', media:false, txt:tipsList(['Des réponses fondées sur les sources officielles.','Des explications simples, adaptées à ton profil.','Disponible 24h/24, à ton rythme et sans jugement.']) }); } },
      mob({ msg:'Je ne dors jamais, je ne juge jamais… et je connais le Code du travail par cœur 😉' }),
      { msg:'Voici qui je suis, en chiffres et en principes 👇' },
      { node:body }
    ]});
  }

  /* Pop-up discrète en fin d'article : lien vers le QCM, sans friction */
  var POPPED={};
  function artPop(id){
    var host=document.getElementById('evad-art-scroll'); if(!host) return;
    if(!host._evxPop){ host._evxPop=1; host.addEventListener('scroll',function(){
      var aid=host._aid; if(!aid || POPPED[aid]) return;
      var qz=q('.art-quiz-wrap',host); if(!qz || !qz.offsetParent) return;
      if(qz.getBoundingClientRect().top < host.getBoundingClientRect().bottom-40){ POPPED[aid]=1; showPop(); }
    },{passive:true}); }
    host._aid=id;
  }
  function showPop(){
    var p=document.getElementById('evx-pop');
    if(!p){ p=el('div','evx-pop'); p.id='evx-pop'; document.body.appendChild(p); }
    p.innerHTML='<button type="button" class="x" aria-label="Fermer">×</button><p>Tu as lu l\'essentiel ✅ Envie de vérifier que tout est clair ? Le <b>QCM Droits</b> t\'attend.</p><div class="b"><button type="button" data-a="stay">Continuer ici</button><button type="button" class="pri" data-a="qcm">Faire le QCM</button></div>';
    p.onclick=function(e){ var b=e.target.closest('button'); if(!b) return; p.classList.remove('show'); if(b.getAttribute('data-a')==='qcm') go('eva-entretien'); };
    requestAnimationFrame(function(){ p.classList.add('show'); });
    clearTimeout(p._t); p._t=setTimeout(function(){ p.classList.remove('show'); },10000);
  }
  function toast(msg){ var t=document.getElementById('ec-toast'); if(!t) return; if(t.parentNode!==document.body) document.body.appendChild(t); t.textContent=msg; t.classList.add('show'); clearTimeout(t._evx); t._evx=setTimeout(function(){ t.classList.remove('show'); }, Math.min(6000, 2400+String(msg).length*45)); }

  /* ═════ Branchements ═════ */
  function wrap(name,after){ var f=window[name]; if(typeof f!=='function' || f._evx) return; var g=function(){ var r=f.apply(this,arguments), a=arguments; try{ after.apply(null,a); }catch(e){} return r; }; g._evx=true; window[name]=g; }
  function active(){ var a=document.querySelector('.evad-screen.active,.nova-screen.active,.eva-subpage.active,#s-eva.active,.screen.active'); return a?a.id.replace('s-',''):''; }
  var last='';
  function enter(id){
    if(id==='eva-droits') droitsHub(); else if(id==='eva-workspace'){ if(window.EWS===0 || !window.EWS) wsHub(); } else if(id==='eva-entretien') quizHub();
    else if(id==='eva-tracker') tracker(); else if(id==='eva-identity') identity(); else if(id==='eva-taches') taches();
  }
  function headIn(id){ if(!M()) return; var sc=document.getElementById('s-'+id); var hd=sc && sc.querySelector('.evad-hd,.eva-sub-header,.ew-hdr,.eb-hdr,.jnl-hdr,.nova-hd'); if(!hd || !sc.hasAttribute('data-evt')) return;
    hd.classList.remove('evx-in'); void hd.offsetWidth; hd.classList.add('evx-in'); clearTimeout(hd._evxIn); hd._evxIn=setTimeout(function(){ hd.classList.remove('evx-in'); },1600); }
  function ebCards(){ if(!M()) return; var b=document.getElementById('eb-body'); if(!b) return; var cs=b.querySelectorAll('.eb-q-card:not(.eb-q-done)'), c=cs[cs.length-1]; if(!c) return;
    var br=b.getBoundingClientRect(), r=c.getBoundingClientRect(); if(r.top<br.top+6) b.scrollTop-= (br.top+10-r.top); }
  function check(){ var id=active(); if(id!==last){ last=id; var pp=document.getElementById('evx-pop'); if(pp && id!=='eva-droits-article') pp.classList.remove('show'); headIn(id); try{ enter(id); }catch(e){} }
    if(id==='eva-bienetre') setTimeout(ebCards,120); ebHero(); document.querySelectorAll('.nova-result').forEach(bilan); }
  function init(){
    titles();
    // Préparation immédiate des pages (pas d'apparition de l'ancien contenu)
    ['s-eva-droits','s-eva-entretien'].forEach(function(id){ var s=document.getElementById(id); if(s) s.classList.add('evx-page'); });
    hide([q('#s-eva-droits .ei-hero'), q('#s-eva-droits .ei-body'), q('#ew-p0 .ew-hero'), q('#ew-p0 .ew-sec-lbl'), q('#ew-p0 .ew-ptiles'), q('#s-eva-identity .eva-id-hero')]);
    wrap('evadShowList',function(){ setTimeout(droitsList,0); });
    wrap('evadShowArticle',function(id){ setTimeout(function(){ droitsArticle(id); artPop(id); },60); });
    window.ecShowToast=toast;
    wrap('ewGo',function(n){ n=+n; if(n===0) wsHub(); else ws(n); });
    if(typeof window.ewShowPortfolioInline==='function') window.ewShowPortfolioInline=pfShow;
    ['nqStart','nsStart'].forEach(function(n){
      var f=window[n]; if(typeof f!=='function'||f._evx) return;
      var kind=n==='nqStart'?'qcm':'sim', lastT={};
      var g=function(profil){ var now=Date.now(); if(lastT[profil] && now-lastT[profil]<400) return; lastT[profil]=now; return brief(kind,profil,f); };
      g._evx=true; window[n]=g;
    });
    var jt=window.jnlTab; if(typeof jt==='function' && !jt._evx){ window.jnlTab=function(i){ var r=jt.apply(this,arguments); try{ jnl(+i); }catch(e){} return r; }; window.jnlTab._evx=true; }
    check();
    try{ new MutationObserver(function(){ clearTimeout(window._evx3T); window._evx3T=setTimeout(check,40); }).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']}); }catch(e){}
  }
  window.cpEvx={ mount:mount, cover:cover, post:post, plus:plus, mob:mob, pick:pick, scrollToEl:scrollToEl, TH:TH, IC:IC, S:S };
  if(document.readyState!=='loading') setTimeout(init,0); else document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,0); });
})();
