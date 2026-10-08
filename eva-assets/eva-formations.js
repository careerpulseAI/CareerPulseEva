
/* ═══ Organismes de formation : données (Firestore, base interne) + interfaces candidat / organisme ═══ */
(function(){
  if(window.self!==window.top) return;
  var S=function(p,c,w){ return '<svg viewBox="0 0 24 24" fill="none" stroke="'+(c||'currentColor')+'" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'; };
  var I={
    school:'<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20c-.5-2.6-2-4.5-4.2-5.2"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
    check:'<path d="m5 12 5 5L20 7"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>', plus:'<path d="M12 5v14M5 12h14"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', inbox:'<path d="M3 12h5l2 3h4l2-3h5"/><path d="M5 5h14l2 7v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>'
  };
  var STATUTS=[['reconversion','Reconversion'],['demandeur','Demandeur d\'emploi'],['salarie','Salarié'],['etudiant','Étudiant'],['freelance','Freelance / Indépendant']];
  var STATUT_WORDS={ reconversion:['reconversion','reconvertir','changer de metier','nouveau metier'], demandeur:['demandeur','chomage','chomeur','sans emploi','recherche d emploi','france travail'], salarie:['salarie','en poste','cdi'], etudiant:['etudiant','alternance','stage','alternant'], freelance:['freelance','independant','auto entrepreneur','auto-entrepreneur','micro entrepreneur'] };
  var STOP='je,tu,il,nous,vous,ils,cherche,cherchons,recherche,recherchons,des,les,la,le,un,une,de,du,a,au,aux,en,et,ou,pour,par,sur,avec,dans,qui,que,sont,est,personnes,personne,candidats,candidat,profils,profil,interesses,interessees,interesse,interessee,formation,formations,veut,veulent,souhaitent,souhaite,souhaitant,motives,motivees,motive,ville,region,autour,pres,proche,etre'.split(',');
  function norm(t){ return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim(); }
  function stems(t){ return norm(t).split(' ').filter(function(w){ return w.length>2 && STOP.indexOf(w)<0; }).map(function(w){ return w.slice(0,6); }); }
  function words(t){ return String(t||'').split(/[^A-Za-zÀ-ÿ0-9']+/).filter(function(w){ var n=norm(w); return n.length>2 && STOP.indexOf(n)<0; }); }
  function readable(stemList,text){ var out=[]; words(text).forEach(function(w){ var st=norm(w).slice(0,6); if(stemList.indexOf(st)>-1 && out.indexOf(w.toLowerCase())<0) out.push(w.toLowerCase()); }); return out; }
  function esc(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function el(t,c,h){ var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; }
  function db(){ return window.fbDb; }
  function user(){ return window._fbUser || (window.fbAuth && fbAuth.currentUser) || null; }
  function toast(m){ if(typeof window.ecShowToast==='function') window.ecShowToast(m); }
  function stLabel(k){ for(var i=0;i<STATUTS.length;i++) if(STATUTS[i][0]===k) return STATUTS[i][1]; return ''; }
  function uid(){ return 'f'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }

  /* ── Matching : pourcentage + raisons ── */
  function match(c,f){
    var fs=stems((f.titre||'')+' '+(f.domaine||'')+' '+(f.motscles||'')), cs=stems((c.projet||'')+' '+(c.titre||'')+' '+(c.secteur||'')+' '+(c.competences||''));
    var hit=fs.filter(function(w,i){ return fs.indexOf(w)===i && cs.indexOf(w)>-1; });
    var why=[], sc=0;
    var d=Math.min(1,hit.length/2); sc+=Math.round(45*d);
    if(hit.length) why.push(['y','Projet en lien avec la formation : '+esc(readable(hit,(f.titre||'')+' '+(f.domaine||'')).slice(0,3).join(', '))]); else why.push(['n','Projet du candidat différent du domaine de la formation']);
    var fv=norm(f.ville), cv=norm(c.ville);
    if(/distan|ligne|remote/.test(fv)){ sc+=25; why.push(['y','Formation à distance : accessible partout']); }
    else if(fv && cv && (fv===cv || fv.indexOf(cv)>-1 || cv.indexOf(fv)>-1)){ sc+=25; why.push(['y','Même ville : '+esc(c.ville)]); }
    else why.push(['n','Ville différente ('+esc(c.ville||'non précisée')+' / '+esc(f.ville||'?')+')']);
    var pub=(f.publics||[]);
    if(!pub.length){ sc+=12; } else if(pub.indexOf(c.statut)>-1){ sc+=20; why.push(['y','Public visé : '+esc(stLabel(c.statut))]); } else why.push(['n','Statut hors du public visé ('+esc(stLabel(c.statut)||'non précisé')+')']);
    if(c.dispo==='immediate'){ sc+=10; why.push(['y','Disponible immédiatement']); } else if(c.dispo==='1-3'){ sc+=6; why.push(['y','Disponible sous 1 à 3 mois']); } else sc+=2;
    return { pct:Math.max(5,Math.min(99,sc)), why:why };
  }
  /* ── Recherche en langage naturel (locale, sans API externe) ── */
  function search(q,list){
    var nq=norm(q), words=stems(q), res=[];
    var statut=null; Object.keys(STATUT_WORDS).forEach(function(k){ STATUT_WORDS[k].forEach(function(w){ if(nq.indexOf(norm(w))>-1) statut=k; }); });
    var villes={}; list.forEach(function(c){ var v=norm(c.ville); if(v && (' '+nq+' ').indexOf(' '+v+' ')>-1) villes[v]=1; });
    var villeWords=Object.keys(villes).join(' ').split(' ');
    var dom=words.filter(function(w){ return villeWords.indexOf(w)<0 && !Object.keys(STATUT_WORDS).some(function(k){ return STATUT_WORDS[k].some(function(x){ return norm(x).slice(0,6)===w; }); }); });
    list.forEach(function(c){
      var why=[], sc=0, ok=true;
      if(statut){ if(c.statut===statut){ sc+=35; why.push(['y',esc(stLabel(statut))]); } else ok=false; }
      if(Object.keys(villes).length){ if(villes[norm(c.ville)]){ sc+=30; why.push(['y','Ville : '+esc(c.ville)]); } else ok=false; }
      if(dom.length){ var cs=stems((c.projet||'')+' '+(c.titre||'')+' '+(c.secteur||'')+' '+(c.competences||'')); var h=dom.filter(function(w){ return cs.indexOf(w)>-1; });
        if(h.length){ sc+=35*Math.min(1,h.length/dom.length*1.5); why.push(['y','Intérêt : '+esc(readable(h,q).join(', '))]); } else ok=false; }
      if(ok) res.push({ c:c, pct:Math.round(Math.min(99,sc||50)), why:why });
    });
    res.sort(function(a,b){ return b.pct-a.pct; });
    return { res:res, crit:{ statut:statut, villes:Object.keys(villes), dom:readable(dom,q) } };
  }

  /* ── Accès données ── */
  var ST={ role:null, org:null, cands:[], props:[], tab:'cands', lastQ:'', matchF:null };
  function loadRole(){
    var u=user(); if(!u || !db()) return Promise.resolve(null);
    return db().collection('organismes').doc(u.uid).get().then(function(d){ ST.org=d.exists ? d.data() : null; ST.role=d.exists?'org':'cand'; return ST.role; }).catch(function(){ ST.role='cand'; return 'cand'; });
  }
  function loadPropsOrg(){ return db().collection('propositions').where('orgUid','==',user().uid).get().then(function(q){ ST.props=q.docs.map(function(d){ var x=d.data(); x.id=d.id; return x; }).sort(function(a,b){ return (b.createdAt||'').localeCompare(a.createdAt||''); }); }); }
  function loadPropsCand(){ return db().collection('propositions').where('candUid','==',user().uid).get().then(function(q){ ST.props=q.docs.map(function(d){ var x=d.data(); x.id=d.id; return x; }).sort(function(a,b){ return (b.createdAt||'').localeCompare(a.createdAt||''); }); }); }
  function err(e){ toast('Connexion à la base impossible : '+((e&&e.message)||e)); }

  /* Visibilité du candidat (utilisé aussi par la fiche profil) */
  window.cpOfSetVisible=function(on,extra){
    var u=user(); if(!u || !db()){ toast('Connecte-toi pour gérer ta visibilité'); return Promise.reject('no-user'); }
    var ref=db().collection('candidats_of').doc(u.uid);
    return db().collection('profils').doc(u.uid).get().then(function(p){
      var d=p.exists?p.data():{};
      var nm=(d.name||'').trim().split(/\s+/), prenom=nm[0]||'Candidat', ini=nm[1]?nm[1][0].toUpperCase()+'.':'';
      var pub=Object.assign({ uid:u.uid, prenom:prenom+(ini?' '+ini:''), titre:d.titre||'', secteur:d.secteur||'', ville:d.ville||'', competences:(d.accroche||'').slice(0,240) }, extra||{}, { visible:!!on, updatedAt:new Date().toISOString() });
      var w=[db().collection('profils').doc(u.uid).set({ ofVisible:!!on }, {merge:true})];
      w.push(on ? ref.set(pub,{merge:true}) : ref.delete());
      return Promise.all(w);
    });
  };

  /* ═════ RENDUS ═════ */
  /* Côté MEMBRE : EVA Formation présente l'espace, crée le profil avec le membre (9 étapes),
     gère la visibilité (2 accords séparés), présente les propositions et répond aux questions.
     Règle : les coordonnées du membre ne sont JAMAIS transmises ; c'est lui qui contacte l'organisme. */
  var root, ofTries=0;
  function X(){ return window.cpEvx; }
  function T(){ return X().TH.of; }
  function nowIso(){ return new Date().toISOString(); }
  function has(a,v){ return Array.isArray(a) && a.indexOf(v)>-1; }
  function md(t){ return esc(t).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>'); }
  function firstName(){ var u=user(); return u && u.displayName ? String(u.displayName).trim().split(/\s+/)[0] : ''; }
  function refOf(u){ var h=0; String(u).split('').forEach(function(c){ h=(h*31+c.charCodeAt(0))%90000; }); return '#CP-'+(10000+h); }
  function clean(t){ return String(t||'').replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g,'[masqué]').replace(/(\+?\d[\d .-]{7,}\d)/g,'[masqué]').replace(/(https?:\/\/|www\.)\S+/gi,'[masqué]').trim().slice(0,300); }
  function lbl(v){ return Array.isArray(v) ? v.join(', ') : (v||''); }

  function render(){
    root=document.getElementById('of-root'); if(!root || !X()) return;
    var sc=document.getElementById('s-eva-of'); if(sc) sc.classList.add('evx-page');
    var u=user();
    if(!u && window.fbAuth && !window._cpAuthInitialized && ofTries++<25){ setTimeout(render,300); return; }
    ofTries=0;
    if(!u || !u.emailVerified){ renderGuest(u?'pending':'guest'); return; }
    loadRole().then(function(r){ if(r==='org') renderOrgMoved(); else renderCand(); });
  }
  function present(mode){
    var E=X(), t=T();
    return [
      { make:function(){ return E.cover(t,{ member:true, name:'<span class="pfs-nmt">Contacter des formations compatibles à ton profil créé par EVA</span>', bio:'Des formations de centres vérifiés, recommandées selon ton profil. C\'est toi qui choisis qui tu contactes.', stats:[['100 %','gratuit'],['0','coordonnée transmise'],['Toi','qui décides']] }); }, feed:false, wait:2000 },
      { think:'EVA prépare ton espace formation…' },
      { msg: mode==='member'
        ? 'Ravie de te voir'+(firstName()?', <b>'+esc(firstName())+'</b>':'')+' 😊 Ici, on prépare ensemble ton <b>projet de formation</b>… pour que les bons organismes puissent venir te le présenter.'
        : 'Bienvenue 👋 Ici, <b>tu poses ton projet une fois</b>, et je te montre les formations des centres vérifiés qui te correspondent. Si l\'une t\'intéresse, c\'est toi qui contactes le centre.' },
      { make:function(){ return E.post(t,{ ico:S(I.school,t.c1), ttl:'Comment ça marche ?', meta:'En 4 étapes, sans surprise', media:false,
        txt:'<ul><li><i>1</i><span><b>Tu crées ton profil avec moi</b> : ton projet, la formation que tu cherches, tes disponibilités.</span></li>'
          +'<li><i>2</i><span><b>Tu choisis</b> d\'activer ou non les recommandations. Rien n\'est coché d\'avance.</span></li>'
          +'<li><i>3</i><span><b>Je te montre les formations qui te correspondent</b>, avec un pourcentage de correspondance expliqué.</span></li>'
          +'<li><i>4</i><span><b>Elle t\'intéresse ?</b> Tu écris au centre dans une messagerie protégée, et tu choisis ce que tu partages. <b>Personne ne te contacte sans ton accord.</b></span></li></ul>' }); } },
      E.mob({ think:['Je vérifie que tout reste confidentiel…','Je prépare ton parcours…'] }),
      { make:function(){ return E.post(t,{ ico:S(I.lock,t.c1), ttl:'Bon à savoir', meta:'EVA joue cartes sur table', media:false, like:false,
        txt:'EVA ouvre progressivement son réseau aux organismes de formation, et <b>chacun est vérifié</b> (SIRET, déclaration d\'activité) avant de pouvoir publier une formation. Je ne te demanderai <b>jamais</b> tes identifiants Mon Compte Formation ou France Travail. Et je ne promets ni financement, ni admission : je t\'aide à y voir clair.' }); } }
    ];
  }
  function mountOf(key,steps){ root.innerHTML=''; X().mount({ host:root, id:'of', key:key, label:'Mise en relation · formation', bar:true, steps:steps }); }

  /* ── Visiteur / e-mail à confirmer ── */
  function renderGuest(mode){
    var E=X(), t=T(), steps=present(mode);
    steps.push({ msg: mode==='pending' ? 'Ton compte est créé 👏 Il ne reste qu\'à <b>confirmer ton e-mail</b> pour débloquer ton espace formation.' : 'Cet espace est <b>réservé aux membres</b>. L\'inscription est gratuite et prend une minute.' });
    steps.push({ make:function(){ return E.post(t,{ ico:S(I.users,t.c1), ttl:mode==='pending'?'Encore une étape':'Rejoins CareerPulse', member:true, meta:'Gratuit pour les membres', media:false, like:false,
      txt: mode==='pending' ? 'Clique sur le lien reçu par e-mail (pense aux spams), puis reviens ici : je t\'attends pour créer ton profil.' : 'Crée ton compte, confirme ton e-mail… et on construit ton profil formation ensemble, étape par étape.',
      actions: mode==='pending' ? [{ l:'Confirmer mon e-mail', pri:true, fn:function(){ if(window.cpVerifyOpen) cpVerifyOpen(); } }]
        : [{ l:'J\'ai déjà un compte', fn:function(){ if(window.cpOpenMenu) cpOpenMenu('membre'); } },{ l:'Je m\'inscris gratuitement', pri:true, fn:function(){ if(window.cpOpenMenu) cpOpenMenu('signup'); } }] }); } });
    steps.push({ msg:'En attendant, pose-moi tes questions : je te réponds 👇' });
    steps.push({ node:faqNode() });
    mountOf('of-'+mode,steps);
  }

  /* ── Membre ── */
  var PROF=null, CONS=null;
  function renderCand(){
    var u=user();
    root.innerHTML='<div class="of-empty">'+S(I.school)+'EVA ouvre ton espace formation…</div>';
    var base=db().collection('users').doc(u.uid).collection('of');
    Promise.all([ base.doc('profil').get(), base.doc('consents').get(), loadPropsCand().catch(function(){ ST.props=[]; }) ]).then(function(r){
      PROF=r[0].exists ? (r[0].data().answers||null) : null;
      CONS=r[1].exists ? r[1].data() : { visible:false, propositions:false, prenom:false };
      var steps=present('member'), zone=el('div','ofz'), inbox=el('div','ofi');
      steps.push({ msg: PROF ? 'Ton profil est prêt ✅ Retrouve-le dans l\'onglet <b>Mon profil formation</b>, et les formations faites pour toi dans l\'onglet d\'à côté 👇' : 'Tout se passe en <b>deux onglets</b> : ton profil d\'abord, puis les formations faites pour toi et mes réponses à tes questions 👇' });
      steps.push({ node:ofTabs(zone,inbox) });
      drawZone(zone); drawInbox(inbox);
      mountOf('of-member',steps);
      badge();
    }).catch(function(x){ err(x); root.innerHTML='<div class="of-empty">'+S(I.lock)+'Ton espace formation n\'a pas pu s\'ouvrir. Réessaie dans quelques instants.</div>'; });
  }

  /* ═════ Deux onglets : 1) le formulaire / mon profil  2) propositions + questions ═════ */
  function pitchFor(){
    var A=PROF||{}, sit=String(A.situation||''), p=firstName();
    var hi=p?'<b>'+esc(p)+'</b>, ':'';
    var by={
      'Demandeur(se) d\'emploi':'tu poses ton projet une fois, et ce sont les organismes qui viennent vers toi. Du temps gagné pour ta recherche, sans un seul appel non sollicité.',
      'Salarié(e)':'tu avances sur ta formation sans empiéter sur ton travail : les formations qui te correspondent arrivent ici, et tu contactes le centre quand tu veux.',
      'Étudiant(e)':'compare des formations qui collent vraiment à ton projet, sans être harcelé(e) d\'appels.',
      'Alternant(e)':'compare des formations qui collent vraiment à ton projet, sans être harcelé(e) d\'appels.',
      'Indépendant(e) / freelance':'décris ton besoin une fois : je te montre les formations qui peuvent t\'aider à développer ton activité.',
      'Entrepreneur(e)':'décris ton besoin une fois : je te montre les formations qui peuvent t\'aider à développer ton activité.',
      'En reconversion':'ta reconversion mérite la bonne formation. Présente ton projet une fois, et compare les formations sereinement.'
    };
    var txt=by[sit] || 'quel que soit ton profil (salarié(e), en recherche, étudiant(e), indépendant(e)…), un seul profil suffit pour que les bonnes formations viennent à toi.';
    return hi ? hi+txt : txt.charAt(0).toUpperCase()+txt.slice(1);
  }
  function ofTabs(zone,inbox){
    var pending=(ST.props||[]).filter(function(p){ return p.statut==='envoyee'; }).length;
    var n=el('div','oft');
    n.innerHTML='<div class="oft-bar" role="tablist">'
      +'<button type="button" class="oft-tab" role="tab" data-t="1">'+S(I.school)+'<span>Mon profil formation</span></button>'
      +'<button type="button" class="oft-tab" role="tab" data-t="2">'+S(I.inbox)+'<span>Formations pour toi & questions</span><em style="display:none"></em></button>'
      +'<i class="oft-ink"></i></div>'
      +'<div class="oft-pan" data-p="1"></div><div class="oft-pan" data-p="2"></div>';
    var p1=n.querySelector('[data-p="1"]'), p2=n.querySelector('[data-p="2"]');
    var chips=function(list){ return '<div class="oft-perks">'+list.map(function(x,i){ return '<span style="animation-delay:'+(.25+i*.08)+'s">'+x+'</span>'; }).join('')+'</div>'; };
    p1.appendChild(el('div','oft-pitch',
      '<div class="oft-pk"><span class="oft-spark">✨</span>'+(PROF?'Ton profil travaille pour toi':'Ton projet de formation, en 5 minutes')+'</div>'
      +'<p>'+pitchFor()+'</p>'
      +(PROF?'<p class="oft-sub">Garde-le à jour : un profil précis, ce sont des recommandations qui te ressemblent.</p>':'<p class="oft-sub">9 petites étapes, une question à la fois. Je t\'explique tout au fur et à mesure, et tu peux revenir en arrière quand tu veux.</p>')
      +chips(['100 % gratuit','Coordonnées jamais transmises','Zéro démarchage','C\'est toi qui décides'])));
    p1.appendChild(zone);
    p2.appendChild(el('div','oft-pitch',
      '<div class="oft-pk"><span class="oft-spark">💌</span>Les formations faites pour toi</div>'
      +'<p>Je te montre les <b>formations des centres vérifiés</b> qui correspondent à ton profil, avec un pourcentage de correspondance expliqué. Si l\'une t\'intéresse, c\'est <b>toi</b> qui contactes le centre. Et tes questions sur la formation ou le financement ont leur réponse juste en dessous.</p>'
      +chips(['Match expliqué','Centres vérifiés','Personne ne t\'appelle'])));
    p2.appendChild(inbox);
    var fq=el('div','oft-faq'); fq.appendChild(faqNode()); p2.appendChild(fq);
    var bk=el('button','ofx-back'); bk.type='button'; bk.innerHTML='<span class="ofx-back-ic">'+S('<path d="M15 18l-6-6 6-6"/>')+'</span><span>Retour à ton profil</span><span class="ofx-back-av">'+S(I.school)+'</span>'; bk.onclick=function(){ show('1'); try{ n.scrollIntoView({ behavior:'smooth', block:'start' }); }catch(e){} }; p2.appendChild(bk);
    var bar=n.querySelector('.oft-bar'), ink=n.querySelector('.oft-ink');
    function show(k){
      n.querySelectorAll('.oft-tab').forEach(function(b){ var on=b.getAttribute('data-t')===k; b.classList.toggle('on',on); b.setAttribute('aria-selected',on?'true':'false'); if(on){ ink.style.width=b.offsetWidth+'px'; ink.style.transform='translateX('+b.offsetLeft+'px)'; } });
      [p1,p2].forEach(function(p){ var on=p.getAttribute('data-p')===k; p.classList.toggle('on',on); });
    }
    n.querySelectorAll('.oft-tab').forEach(function(b){ b.onclick=function(){ var k=b.getAttribute('data-t'); show(k); if(k==='2') markSeen(); }; });
    n.addEventListener('of-tab',function(e){ show(e.detail); try{ n.scrollIntoView({ behavior:'smooth', block:'start' }); }catch(_){} });
    var first='1'; loadReco().then(recoBadge);
    show(first); requestAnimationFrame(function(){ show(first); });
    window.addEventListener('resize',function(){ var on=n.querySelector('.oft-tab.on'); if(on) show(on.getAttribute('data-t')); });
    return n;
  }

  /* ═════ FORMULAIRE GUIDÉ PAR EVA (9 étapes) ═════ */
  var STEPS=['Mon identité','Ma situation','Mon projet','La formation','Mon financement','Mes disponibilités','Mes préférences','Visibilité','Récapitulatif'];
  var SECT=['Numérique / informatique','Commerce','Marketing / communication','Administration','Finance / comptabilité','BTP','Industrie','Transport / logistique','Santé','Social','Hôtellerie / restauration','Sécurité','Immobilier','Création / design','Entrepreneuriat','Autre'];
  var Q=[
    {s:1,say:'On commence par toi, tout simplement. Rassure-toi : <b>les centres ne voient jamais ton profil</b>. Il sert à te recommander les bonnes formations, et c\'est toi qui choisis ce que tu partages si tu contactes un centre. 🔒'},
    {s:1,k:'prenom',t:'text',req:1,ask:'Quel est ton <b>prénom</b> ?',ph:'Ex : Jean',pre:firstName},
    {s:1,k:'nom',t:'text',req:1,ask:'Et ton <b>nom</b> ? Il reste <b>privé</b>.',ph:'Ex : Dupont'},
    {s:1,k:'age',t:'one',req:1,ask:'Ta <b>tranche d\'âge</b> ?',o:['Moins de 18 ans','18-24 ans','25-34 ans','35-44 ans','45-54 ans','55 ans et +']},
    {s:1,k:'ville',t:'ville',req:1,ask:'Dans quelle <b>ville</b> habites-tu ? Je retrouve ton département toute seule.',ph:'Ex : Caen'},
    {s:1,k:'dep',t:'text',req:1,ask:'Je n\'ai pas trouvé ta ville 🤔 Quel est ton <b>département</b> ?',ph:'Ex : 14 – Calvados',if:function(a){ return !a.depAuto; }},
    {s:1,k:'mobilite',t:'multi',req:1,ask:'Jusqu\'où es-tu prêt(e) à aller pour te former ? Plusieurs choix possibles.',o:['Locale','Départementale','Régionale','Nationale','À distance']},
    {s:2,say:'Parfait 👌 Parlons de ta <b>situation</b> : ça m\'aide à te recommander des formations faites pour toi.'},
    {s:2,k:'situation',t:'one',req:1,ask:'Quelle est ta <b>situation actuelle</b> ?',o:['Salarié(e)','Demandeur(se) d\'emploi','Étudiant(e)','Alternant(e)','Indépendant(e) / freelance','Entrepreneur(e)','En reconversion','Autre']},
    {s:2,k:'statut',t:'one',ask:'Ton <b>statut</b>, plus précisément ? Il reste <b>privé</b>.',o:['CDI','CDD','Intérim','Fonction publique','Micro-entrepreneur','Sans activité','Étudiant','Autre']},
    {s:2,k:'diplome',t:'one',req:1,ask:'Ton <b>niveau de diplôme</b> ?',o:['Aucun diplôme','CAP / BEP','Bac','Bac+1','Bac+2','Bac+3','Bac+4','Bac+5','Doctorat','Autre']},
    {s:2,k:'envies',t:'multi',ask:'Qu\'est-ce qui te motive en ce moment ? Plusieurs choix possibles.',o:['Trouver un emploi','Changer de métier','Monter en compétences','Créer mon entreprise','Développer mon activité','Obtenir une certification']},
    {s:3,say:'On arrive au cœur de ton profil : <b>ton projet</b>. C\'est ce qui compte le plus pour te trouver la bonne formation, alors prenons le temps. 🎯'},
    {s:3,k:'objectif',t:'one',req:1,ask:'Ton <b>objectif principal</b> ?',o:['Trouver un emploi','Me reconvertir','Obtenir une certification','Monter en compétences','Changer de secteur','Créer mon entreprise','Développer mon activité','Trouver une alternance','Préparer un concours','Autre']},
    {s:3,k:'metier',t:'text',req:1,vague:1,ask:'Quel <b>métier</b> vises-tu ?',ph:'Ex : Développeur web',sug:['Développeur web','Assistant administratif','Commercial','Comptable','Électricien','Community manager']},
    {s:3,k:'secteurs',t:'multi',req:1,ask:'Dans quel(s) <b>secteur(s)</b> ?',o:SECT},
    {s:3,k:'competences',t:'text',long:1,ask:'Quelles <b>compétences</b> veux-tu développer ? (N\'écris pas tes coordonnées ici.)',ph:'Ex : HTML, CSS, JavaScript'},
    {s:3,k:'nivAct',t:'one',req:1,ask:'Ton <b>niveau actuel</b> dans ce domaine ?',o:['Débutant','Intermédiaire','Avancé','Je ne sais pas']},
    {s:3,k:'nivVise',t:'one',req:1,ask:'Et le <b>niveau que tu vises</b> ?',o:['Initiation','Professionnalisation','Certification','Expertise']},
    {s:4,say:'Ton projet est clair, bravo 👏 Maintenant, dessinons <b>la formation idéale</b> pour toi.'},
    {s:4,k:'types',t:'multi',req:1,ask:'Quel(s) <b>type(s) de formation</b> t\'intéresse(nt) ?',o:['Formation courte','Formation longue','Formation certifiante','Diplôme','Titre professionnel','Alternance','Bilan de compétences','VAE','Formation entrepreneuriale','Accompagnement à la création d\'entreprise']},
    {s:4,k:'modalite',t:'one',req:1,ask:'Tu préfères te former…',o:['En présentiel','À distance','En hybride','Peu importe']},
    {s:4,k:'duree',t:'one',req:1,ask:'Quelle <b>durée</b> idéale ?',o:['Moins d\'une semaine','1 à 4 semaines','1 à 3 mois','3 à 6 mois','6 à 12 mois','Plus d\'un an','Peu importe']},
    {s:4,k:'nivForm',t:'one',req:1,ask:'Quel <b>niveau de formation</b> recherches-tu ?',o:['Débutant','Professionnel','Certification','Diplôme','Reconversion complète']},
    {s:4,k:'precise',t:'text',long:1,ask:'Tu as une <b>formation précise</b> en tête ? Décris-la en une phrase.',ph:'Ex : une formation de développeur web avec certification RNCP'},
    {s:5,info:1,say:'Petit point important avant de parler <b>financement</b> 💡',note:'Les possibilités de financement dépendent de ta situation et de la formation choisie. Je t\'aide à identifier les pistes, mais <b>je ne garantis pas</b> l\'obtention d\'un financement.<br><br>• <b>CPF</b> : depuis le 1er avril 2026, une participation obligatoire de <b>150 €</b> s\'applique dans la plupart des cas (vérifie sur Mon Compte Formation).<br>• <b>Demandeur d\'emploi</b> : l\'AIF de France Travail peut compléter un financement, sous conditions.<br>• Je ne te demanderai <b>jamais</b> ton mot de passe Mon Compte Formation ou France Travail.'},
    {s:5,k:'fin',t:'multi',req:1,ask:'Quelles <b>pistes de financement</b> envisages-tu ?',o:['CPF','France Travail','Employeur','OPCO','Projet de transition professionnelle','Région','Autofinancement','Je ne sais pas encore','J\'ai besoin d\'aide pour identifier mon financement']},
    {s:5,k:'cpf',t:'one',req:1,if:function(a){ return has(a.fin,'CPF'); },ask:'Pour ton <b>CPF</b>, où en es-tu ?',o:['Je connais mon solde','Je ne connais pas mon solde','Je souhaite l\'utiliser','Je préfère ne pas l\'utiliser']},
    {s:5,k:'ft',t:'one',req:1,ask:'Es-tu inscrit(e) à <b>France Travail</b> ?',o:['Je suis inscrit(e)','Je ne suis pas inscrit(e)','Je ne sais pas','Je préfère ne pas répondre']},
    {s:5,k:'aideFin',t:'one',req:1,ask:'Veux-tu être <b>accompagné(e)</b> pour trouver ton financement ?',o:['Oui','Non']},
    {s:5,k:'budget',t:'one',req:1,ask:'Quel <b>budget personnel</b> pourrais-tu envisager ?',o:['0 €','Moins de 500 €','500 – 1 000 €','1 000 – 3 000 €','Plus de 3 000 €','Je ne sais pas']},
    {s:5,k:'finVis',if:function(){ return false; },t:'one',req:1,ask:'Veux-tu que les organismes voient <b>tes pistes de financement et ton budget</b> ?',o:['Oui, ça les aide','Non, je les garde privés']},
    {s:6,say:'On a fait le plus gros 💪 Parlons de ton <b>emploi du temps</b>.'},
    {s:6,k:'dispo',t:'one',req:1,ask:'Quand pourrais-tu <b>commencer</b> ?',o:['Immédiatement','Dans le mois','Dans 1 à 3 mois','Dans 3 à 6 mois','Plus tard']},
    {s:6,k:'debut',t:'date',ask:'Tu as une <b>date de début</b> précise en tête ?'},
    {s:6,k:'jours',t:'multi',req:1,ask:'Quels <b>jours</b> es-tu disponible ?',o:['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']},
    {s:6,k:'horaires',t:'multi',req:1,ask:'Plutôt à quels <b>moments</b> ?',o:['Matin','Après-midi','Soir','Journée complète']},
    {s:6,k:'contraintes',t:'multi',ask:'Des <b>contraintes</b> à prendre en compte ?',o:['Je travaille actuellement','Je dois conserver mon activité','Formation compatible avec un emploi','Contraintes familiales','Mobilité limitée','Autre']},
    {s:7,say:'Dernière ligne droite pour ton profil : tes <b>préférences</b> 🏁'},
    {s:7,k:'zone',t:'one',req:1,ask:'Dans quelle <b>zone</b> cherches-tu ta formation ?',o:['Ma ville','Mon département','Ma région','Toute la France','100 % à distance']},
    {s:7,k:'distance',t:'one',req:1,if:function(a){ return a.zone!=='100 % à distance' && a.zone!=='Toute la France'; },ask:'Quelle <b>distance maximale</b> depuis chez toi ?',o:['10 km','25 km','50 km','100 km','Peu importe']},
    {s:7,k:'groupe',t:'one',req:1,ask:'Tu préfères apprendre…',o:['En individuel','En petit groupe','En groupe','Peu importe']},
    {s:7,k:'typeOrg',t:'one',req:1,ask:'Un <b>type d\'organisme</b> préféré ?',o:['Centre de formation','École','Organisme spécialisé','CFA','Peu importe']},
    {s:8,say:'Bravo, ton profil est complet ! 🎉 Maintenant, l\'étape la plus importante : <b>c\'est toi qui décides</b> qui le voit.'},
    {s:8,k:'consent',t:'consent'},
    {s:9,k:'recap',t:'recap'}
  ];
  /* « Autre » : case libre + conseil d'EVA (pédagogue, sans friction) */
  var AUTRE={
    situation:['Décris ta situation en quelques mots simples, comme tu la présenterais à un conseiller : par exemple « en congé parental », « en service civique » ou « bénévole ». Pas besoin de détails personnels.','Ex : en congé parental'],
    statut:['Indique simplement le nom de ton contrat ou de ton statut : par exemple « apprentissage », « portage salarial » ou « intermittent ». Cette réponse reste <b>privée</b>.','Ex : portage salarial'],
    diplome:['Écris l\'intitulé de ton diplôme ou de son équivalent : diplôme obtenu à l\'étranger (précise le pays), titre professionnel, certification… L\'intitulé suffit, pas besoin de l\'établissement.','Ex : Licence obtenue au Maroc'],
    objectif:['Résume ton objectif en une phrase courte qui commence par un verbe : par exemple « reprendre mes études » ou « valider mon expérience ». L\'organisme comprend tout de suite ce que tu cherches.','Ex : reprendre mes études'],
    secteurs:['Nomme ton secteur comme il apparaîtrait sur une offre d\'emploi : par exemple « agriculture », « sport » ou « audiovisuel ». Un ou deux mots suffisent.','Ex : agriculture'],
    contraintes:['Décris ta contrainte de façon générale, sans détail médical ni familial : par exemple « horaires décalés », « pas de permis » ou « disponible uniquement le week-end ».','Ex : pas de permis']
  };
  function isAutre(x){ return /^Autre(\s*:|$)/.test(String(x||'')); }
  function autreTxt(x){ return String(x||'').replace(/^Autre\s*:?\s*/,''); }
  function autreBox(q,val){
    var a=AUTRE[q.k]||['Précise ta réponse en quelques mots simples : c\'est exactement ce que l\'organisme lira.','Précise ici'];
    var p=el('div','ofa-wrap','<div class="ofa"><span class="ofa-ico">💡</span><div class="ofa-tx"><b>Le conseil d\'EVA</b><p>'+a[0]+'</p></div></div>');
    var f=el('input','ofw-inp ofa-inp'); f.placeholder=a[1]; f.maxLength=80; f.value=val||'';
    p.appendChild(f); p.inp=f;
    setTimeout(function(){ try{ f.focus({preventScroll:true}); }catch(e){} scrollIn(p); },380);
    return p;
  }
  function ok(i,a){ var q=Q[i]; return q && (!q.if || q.if(a)); }
  function firstOfStep(s){ for(var i=0;i<Q.length;i++) if(Q[i].s===s) return i; return 0; }
  var W=null; // état du formulaire : { A, hist, i, edit, box }
  function draftKey(){ var u=user(); return 'cp_of_draft_'+(u?u.uid:''); }
  function saveDraft(){ try{ sessionStorage.setItem(draftKey(), JSON.stringify({ A:W.A, hist:W.hist, i:W.i })); }catch(e){} var s=W.box&&W.box.querySelector('.ofw-saved'); if(s){ s.classList.remove('on'); void s.offsetWidth; s.classList.add('on'); } }
  function dropDraft(){ try{ sessionStorage.removeItem(draftKey()); }catch(e){} }

  function drawZone(zone){ if(PROF) statusCard(zone); else wizard(zone,null); }

  function wizard(zone,opt){
    opt=opt||{};
    var d=null; try{ d=JSON.parse(sessionStorage.getItem(draftKey())||'null'); }catch(e){}
    W={ A:{}, hist:[], i:0, edit:0, box:null };
    if(opt.recap && PROF){ W.A=JSON.parse(JSON.stringify(PROF)); W.A.consent={ visible:!!CONS.visible, propositions:!!CONS.propositions, prenom:!!CONS.prenom }; W.i=firstOfStep(9); W.hist=histBefore(W.i); }
    else if(opt.goto!=null && PROF){ W.A=JSON.parse(JSON.stringify(PROF)); W.A.consent={ visible:!!CONS.visible, propositions:!!CONS.propositions, prenom:!!CONS.prenom }; W.i=opt.goto; W.edit=Q[W.i].s; W.hist=histBefore(W.i); }
    else if(opt.redo && PROF){ W.A=JSON.parse(JSON.stringify(PROF)); W.A.consent={ visible:!!CONS.visible, propositions:!!CONS.propositions, prenom:!!CONS.prenom }; W.redo=1; dropDraft(); }
    else if(d && d.A){ W.A=d.A; W.hist=d.hist||[]; W.i=d.i||0; W.resumed=1; }
    zone.innerHTML='';
    var b=el('div','ofw','<div class="ofw-hd"><button type="button" class="ofw-back" aria-label="Revenir en arrière">'+S('<path d="M15 18 9 12l6-6"/>')+'Revenir</button><div class="ofw-st"><b></b><span></span></div><span class="ofw-saved">'+S(I.check)+'Enregistré</span></div><div class="ofw-pg"><div class="ofw-pg-top"><span>Ton profil se construit</span><b class="ofw-pg-n">0 %</b></div><div class="ofw-bar"><i></i></div></div><div class="ofw-log"></div><div class="ofw-in"></div>');
    zone.appendChild(b); W.box=b;
    b.querySelector('.ofw-back').onclick=back;
    if(PROF){ var cx=el('button','ofw-x','Annuler'); cx.type='button'; cx.onclick=function(){ if(W.tok) W.tok++; W.box=null; dropDraft(); statusCard(zone); }; b.querySelector('.ofw-hd').appendChild(cx); }
    rebuild();
    if(W.redo) say('On refait ton profil ensemble 💪 Tes réponses actuelles sont <b>présélectionnées</b> : garde-les ou change ce que tu veux.',function(){ askCur(); });
    else if(W.resumed && W.hist.length) say('Je t\'ai gardé tes réponses 😉 On reprend là où tu t\'étais arrêté(e).',function(){ askCur(); });
    else askCur();
  }
  function histBefore(i){ var h=[]; for(var j=0;j<i;j++) if(ok(j,W.A)) h.push(j); return h; }
  function head(){
    var q=Q[W.i]||Q[Q.length-1], b=W.box; if(!b) return;
    b.querySelector('.ofw-st b').textContent='Étape '+q.s+'/9';
    b.querySelector('.ofw-st span').textContent=STEPS[q.s-1];
    var pc=completion(W.A).pct, bi=b.querySelector('.ofw-bar i'), nb=b.querySelector('.ofw-pg-n'), pg=b.querySelector('.ofw-pg');
    if(bi) bi.style.width=Math.max(pc,3)+'%';
    if(nb){ var from=parseInt(nb.textContent,10)||0; if(from!==pc){ nb.classList.remove('bump'); void nb.offsetWidth; nb.classList.add('bump'); var t0=null; (function anim(ts){ if(!t0) t0=ts; var k=Math.min(1,(ts-t0)/600); nb.textContent=Math.round(from+(pc-from)*k)+' %'; if(k<1) requestAnimationFrame(anim); })(performance.now()); } }
    if(pg){ pg.classList.toggle('full',pc>=100); var sp=pg.querySelector('.ofw-pg-top span'); if(sp) sp.textContent= pc>=100 ? 'Profil complet ✨' : pc>=70 ? 'Presque fini, continue 💪' : pc>=35 ? 'Tu avances bien 👏' : 'Ton profil se construit'; }
    b.querySelector('.ofw-back').disabled=!W.hist.some(function(j){ return !Q[j].say; });
  }
  function log(){ return W.box.querySelector('.ofw-log'); }
  function inp(){ return W.box.querySelector('.ofw-in'); }
  function bubble(html){ var r=el('div','ofw-eva','<span class="ofw-av">'+X().S(X().IC.eva)+'</span><div class="ofw-b">'+html+'</div>'); log().appendChild(r); return r; }
  function me(html){ var r=el('div','ofw-me','<div class="ofw-b">'+html+'</div>'); log().appendChild(r); return r; }
  function divider(s){ log().appendChild(el('div','ofw-div','Étape '+s+'/9 · '+STEPS[s-1])); }
  function scrollIn(n){ try{ var s=n; while(s && s!==document.body){ var o=getComputedStyle(s).overflowY; if(o==='auto'||o==='scroll') break; s=s.parentElement; } if(!s||s===document.body) return; var r=n.getBoundingClientRect(), sr=s.getBoundingClientRect(); if(r.bottom>sr.bottom-12) s.scrollBy({ top:r.bottom-sr.bottom+40, behavior:'smooth' }); }catch(e){} }
  function typeIn(html,cb){
    var r=bubble('<span class="evh-typing"><span></span><span></span><span></span></span>'), b=r.querySelector('.ofw-b'); scrollIn(r);
    var tok=W.tok=(W.tok||0)+1;
    setTimeout(function(){
      if(tok!==W.tok) return;
      var parts=html.split(/(<[^>]+>|\s+)/).filter(function(x){ return x!==''; }), i=0, out='';
      (function tick(){ if(tok!==W.tok) return; if(i>=parts.length){ b.innerHTML=out; scrollIn(r); cb&&cb(); return; } var p=parts[i++]; out+=p; b.innerHTML=out+'<span class="evh-caret"></span>'; setTimeout(tick, /^</.test(p)||/^\s+$/.test(p)?0:22+Math.random()*16); })();
    },480);
  }
  function say(html,cb){ inp().innerHTML=''; typeIn(html,cb); }
  function answerLabel(q,v){
    if(q.t==='consent'){ v=v||{}; return 'Recommandations de formations : <b>'+(v.visible?'oui':'non')+'</b>'; }
    if(q.t==='ville') return esc(W.A.ville||'')+(W.A.dep?' <span class="ofw-sub">· '+esc(W.A.dep)+'</span>':'');
    if(q.t==='date' && v){ var p=String(v).split('-'); return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:esc(v); }
    if(v==null || v==='' || (Array.isArray(v)&&!v.length)) return '<i>Passé</i>';
    return esc(lbl(v));
  }
  function rebuild(){
    var L=log(); L.innerHTML=''; var cur=(Q[W.i]||{}).s;
    var hs=W.hist.filter(function(j){ return Q[j].s===cur; }); divider(cur);
    hs.forEach(function(j){ var q=Q[j]; if(q.say){ bubble(q.say); if(q.note) log().appendChild(el('div','ofw-note',q.note)); } else if(q.t!=='recap'){ bubble(q.ask||consentAsk()); me(answerLabel(q,W.A[q.k])); } });
    head();
  }
  function next(){
    W.hist.push(W.i);
    var n=W.i+1; while(n<Q.length && !ok(n,W.A)) n++;
    if(W.edit && Q[n] && Q[n].s!==W.edit) n=firstOfStep(9);
    var ns=(Q[n]||{}).s, ps=Q[W.i].s;
    W.i=n; saveDraft(); head();
    if(ns && ns!==ps) divider(ns);
    askCur();
  }
  function back(){
    if(W.tok) W.tok++;
    while(W.hist.length){ var j=W.hist.pop(); if(!Q[j].say){ W.i=j; break; } }
    saveDraft(); rebuild(); askCur(true);
  }
  function askCur(quick){
    var q=Q[W.i]; if(!q) return;
    head();
    if(q.say){
      say(q.say,function(){
        if(q.note){ var n=el('div','ofw-note',q.note); log().appendChild(n); scrollIn(n);
          inp().innerHTML=''; var b=btn('J\'ai compris, on continue','pri'); b.onclick=function(){ me('J\'ai compris 👍'); next(); }; inp().appendChild(b); }
        else setTimeout(next,450);
      }); return;
    }
    if(q.t==='consent'){ say(consentAsk(),function(){ widget(q); }); return; }
    if(q.t==='recap'){ say('Voici ton <b>récapitulatif</b>. Vérifie tranquillement : tu peux modifier n\'importe quelle étape avant d\'enregistrer.',function(){ recap(); }); return; }
    say(q.ask,function(){ widget(q); });
  }
  function btn(t,c){ var b=el('button','ofw-btn'+(c?' '+c:''),t); b.type='button'; return b; }
  function errMsg(box,t){ var e=box.querySelector('.ofw-err'); if(!e){ e=el('div','ofw-err'); box.appendChild(e); } e.textContent=t; }
  function answer(q,v,label){
    W.A[q.k]=v; me(label!=null?label:answerLabel(q,v)); inp().innerHTML=''; next();
  }
  function widget(q){
    var box=inp(); box.innerHTML=''; var v=W.A[q.k];
    if(q.t==='one'){
      var w=el('div','ofw-chips'), ap=null;
      function openAutre(c){
        w.querySelectorAll('.ofw-btn').forEach(function(x){ x.classList.remove('on'); }); c.classList.add('on');
        if(ap) return; ap=autreBox(q,isAutre(v)?autreTxt(v):''); box.insertBefore(ap,w.nextSibling);
        var row=el('div','ofw-row'), g=btn('Valider','pri'); row.appendChild(g); ap.appendChild(row);
        ap.inp.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); g.click(); } });
        g.onclick=function(){ var t=clean(ap.inp.value); if(t.length<2){ errMsg(ap,'Écris quelques mots pour préciser « Autre » : c\'est ce que l\'organisme lira.'); return; } answer(q,'Autre : '+t); };
      }
      q.o.forEach(function(o){ var on=(o==='Autre')?isAutre(v):v===o; var c=btn(esc(o),on?'on':''); c.onclick=function(){ if(o==='Autre') openAutre(c); else answer(q,o); }; w.appendChild(c); }); box.appendChild(w);
    } else if(q.t==='multi'){
      var prevAutre='', sel=(Array.isArray(v)?v:[]).map(function(x){ if(isAutre(x)){ prevAutre=autreTxt(x); return 'Autre'; } return x; }), w2=el('div','ofw-chips multi'), go=btn('Valider','pri'), ap2=null;
      function upd(){ go.textContent=sel.length?'Valider ('+sel.length+')':'Valider'; }
      function syncAutre(){
        if(has(sel,'Autre') && !ap2){ ap2=autreBox(q,prevAutre); box.insertBefore(ap2,w2.nextSibling); }
        else if(!has(sel,'Autre') && ap2){ prevAutre=ap2.inp.value; ap2.remove(); ap2=null; }
      }
      q.o.forEach(function(o){ var c=btn(esc(o),has(sel,o)?'on':''); c.onclick=function(){ var k=sel.indexOf(o); if(k>-1) sel.splice(k,1); else sel.push(o); c.classList.toggle('on'); upd(); if(o==='Autre') syncAutre(); }; w2.appendChild(c); });
      box.appendChild(w2); var row=el('div','ofw-row'); row.appendChild(go); box.appendChild(row); upd(); syncAutre();
      go.onclick=function(){
        if(q.req && !sel.length){ errMsg(box,'Ce champ est nécessaire pour continuer.'); return; }
        var out=sel.slice();
        if(ap2){ var t=clean(ap2.inp.value); if(t.length<2){ errMsg(ap2,'Écris quelques mots pour préciser « Autre » : c\'est ce que l\'organisme lira.'); return; } out[out.indexOf('Autre')]='Autre : '+t; }
        answer(q,out);
      };
    } else if(q.t==='text' || q.t==='ville' || q.t==='date'){
      var f=el(q.long?'textarea':'input','ofw-inp'); if(q.t==='date'){ f.type='date'; f.min=new Date().toISOString().slice(0,10); } else { f.placeholder=q.ph||''; f.maxLength=q.long?300:80; }
      var pv=v!=null?v:(q.pre?q.pre():''); if(q.t==='ville') pv=W.A.ville||''; if(pv) f.value=pv;
      if(q.sug){ var sg=el('div','ofw-chips sm'); q.sug.forEach(function(s){ var c=btn(esc(s)); c.onclick=function(){ f.value=s; f.focus(); }; sg.appendChild(c); }); box.appendChild(sg); }
      var row2=el('div','ofw-row'); row2.appendChild(f); var g=btn('Valider','pri'); row2.appendChild(g); box.appendChild(row2);
      f.addEventListener('keydown',function(e){ if(e.key==='Enter' && !q.long){ e.preventDefault(); g.click(); } });
      g.onclick=function(){
        var val2=q.t==='text'?clean(f.value):f.value.trim();
        if(q.t==='date' && val2 && val2<f.min){ errMsg(box,'Choisis une date valide.'); return; }
        if(q.req && !val2){ errMsg(box,'Ce champ est nécessaire pour continuer.'); return; }
        if(q.vague && val2.length<3){ errMsg(box,'Ajoute au moins un métier, secteur ou objectif pour permettre aux organismes de mieux comprendre ton projet.'); return; }
        if(q.t!=='ville'){ answer(q,val2); return; }
        g.disabled=true; g.textContent='Je cherche…';
        commune(val2).then(function(c){
          if(c){ W.A.ville=c.nom; W.A.dep=c.dep; W.A.depAuto=true; } else { W.A.ville=clean(val2); W.A.dep=''; W.A.depAuto=false; }
          answer(q,W.A.ville);
        });
      };
      if(window.innerWidth>=900) setTimeout(function(){ try{ f.focus({preventScroll:true}); }catch(e){} },60);
    } else if(q.t==='consent'){ consentWidget(q); return; }
    if(!q.req && q.t!=='consent'){ var sk=el('button','ofw-skip','Passer cette question'); sk.type='button'; sk.onclick=function(){ answer(q,Array.isArray(v)?[]:''); }; box.appendChild(sk); }
    scrollIn(box);
  }
  function commune(nom){
    var url='https://geo.api.gouv.fr/communes?nom='+encodeURIComponent(nom)+'&fields=nom,departement&boost=population&limit=1';
    return Promise.race([ fetch(url).then(function(r){ return r.json(); }).then(function(a){ var c=a&&a[0]; return c&&c.departement ? { nom:c.nom, dep:c.departement.code+' – '+c.departement.nom } : null; }), new Promise(function(r){ setTimeout(function(){ r(null); },4000); }) ]).catch(function(){ return null; });
  }
  /* Étape 8 : deux accords séparés, décochés par défaut */
  function consentAsk(){ return 'Je te propose <b>deux choix séparés</b>. Rien n\'est coché d\'avance, et tu pourras changer d\'avis à tout moment.'; }
  var TXT_VIS='J\'accepte qu\'EVA utilise mon profil pour me recommander des formations de centres vérifiés présents sur CareerPulse, et pour établir des statistiques anonymes.';
  var TXT_PROP='J\'accepte de recevoir des propositions de formation personnalisées de la part d\'organismes présents sur CareerPulse.';
  var TXT_PRE='J\'accepte que mon prénom soit affiché aux organismes (sinon, seul un identifiant anonyme apparaît).';
  function consentWidget(q){
    var box=inp(), c=W.A.consent||{};
    box.innerHTML=visAd({})+'<label class="ofw-ck"><input type="checkbox" data-c="visible"'+(c.visible?' checked':'')+'><span>'+TXT_VIS+'</span></label>'
      +'<div class="ofw-conf"><b>Ta confidentialité reste prioritaire.</b> Les centres ne voient <b>jamais</b> ton profil ni tes coordonnées. Si une formation t\'intéresse, c\'est toi qui contactes le centre, et tu choisis ce que tu partages.</div>';
    var row=el('div','ofw-row'), g=btn('Enregistrer mes préférences','pri'); row.appendChild(g); box.appendChild(row);
    g.onclick=function(){
      var v={}; box.querySelectorAll('[data-c]').forEach(function(x){ v[x.getAttribute('data-c')]=x.checked; });
      W.A.consent=v; W.A.consentAt=nowIso(); me(answerLabel(q,v)); box.innerHTML='';
      var r= v.visible ? 'C\'est noté ✅ Je te recommanderai les <b>formations qui te correspondent</b>.' : 'Pas de souci 😊 Ton profil reste <b>privé</b>. Tu pourras activer les recommandations quand tu veux.';
      typeIn(r,function(){ next(); });
    };
    scrollIn(box);
  }
  /* Ce que voit l'organisme : fiche anonymisée */
  function publicDoc(A,uid,c){
    c=c||{}; var fv=A.finVis==='Oui, ça les aide';
    var d={ uid:uid, ref:refOf(uid), visible:true, propositions:!!c.propositions, prenom:c.prenom?(A.prenom||''):'', age:A.age||'', ville:A.ville||'', dep:A.dep||'', mobilite:A.mobilite||[],
      situation:A.situation||'', diplome:A.diplome||'', envies:A.envies||[], objectif:A.objectif||'', metier:A.metier||'', secteurs:A.secteurs||[], competences:A.competences||'', nivAct:A.nivAct||'', nivVise:A.nivVise||'',
      types:A.types||[], modalite:A.modalite||'', duree:A.duree||'', nivForm:A.nivForm||'', precise:A.precise||'',
      fin:fv?(A.fin||[]):[], budget:fv?(A.budget||''):'', dispo:A.dispo||'', debut:A.debut||'', jours:A.jours||[], horaires:A.horaires||[],
      zone:A.zone||'', distance:A.distance||'', groupe:A.groupe||'', typeOrg:A.typeOrg||'', updatedAt:nowIso() };
    return d;
  }
  /* Page de présentation : ce que voit un organisme vérifié (fiche anonymisée, facile à lire) */
  function low(t){ t=String(t||''); return t ? t.charAt(0).toLowerCase()+t.slice(1) : ''; }
  function third(t){ return low(t).replace(/\bme\b/g,'se').replace(/\bmon\b/g,'son').replace(/\bma\b/g,'sa').replace(/\bmes\b/g,'ses'); }
  function evaWord(p){
    var a=[];
    a.push('Profil '+low(p.situation||'en recherche de formation')+(p.diplome?' (niveau '+p.diplome+')':'')+(p.objectif?', qui souhaite '+third(p.objectif):'')+(p.metier?' et vise le métier de <b>'+esc(p.metier)+'</b>':'')+'.');
    var f=[(p.types||[]).slice(0,2).join(', ').toLowerCase(), low(p.modalite), low(p.duree)].filter(Boolean);
    if(f.length) a.push('Recherche : '+esc(f.join(' · '))+'.');
    if(p.dispo) a.push('Disponible '+esc(low(p.dispo))+(p.zone?', zone : '+esc(low(p.zone))+(p.distance?' ('+esc(p.distance)+')':''):'')+'.');
    return a.join(' ');
  }
  function presPage(p,o){
    o=o||{};
    function row(k,v){ return v && (!Array.isArray(v)||v.length) ? '<div class="ofpp-r"><span>'+k+'</span><b>'+esc(lbl(v))+'</b></div>' : ''; }
    function sec(ic,t,body){ return body ? '<section class="ofpp-s"><h5>'+S(ic)+t+'</h5>'+body+'</section>' : ''; }
    var IC2={ target:I.target, book:I.book, cal:'<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>', euro:'<path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10h9M4 14h9"/>', pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>', user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>' };
    var name=p.prenom ? esc(p.prenom) : 'Profil '+esc(p.ref||'');
    var chips=[p.situation, [p.ville,p.dep&&p.dep.split(' – ')[0]?'('+p.dep.split(' – ')[0]+')':''].filter(Boolean).join(' '), p.dispo, p.modalite].filter(Boolean);
    return '<article class="ofpp">'
      +'<div class="ofpp-cv">'+(o.badge||'')+'</div>'
      +'<div class="ofpp-id"><span class="ofpp-av">'+(p.prenom?esc(p.prenom[0]):S(IC2.user))+'</span><div><h4>'+name+'</h4><p>'+esc([p.metier,p.objectif].filter(Boolean).join(' · '))+'</p></div></div>'
      +'<div class="ofpp-ch">'+chips.map(function(c){ return '<span>'+esc(c)+'</span>'; }).join('')+(p.prenom?'<span class="ref">'+esc(p.ref||'')+'</span>':'')+'</div>'
      +'<div class="ofpp-eva">'+X().S(X().IC.eva,'#b45309',2)+'<div><b>Le mot d\'EVA</b><p>'+evaWord(p)+'</p></div></div>'
      +'<div class="ofpp-g">'
      +sec(IC2.target,'Le projet',row('Objectif',p.objectif)+row('Métier visé',p.metier)+row('Secteurs',p.secteurs)+row('Compétences à développer',p.competences)+row('Niveau',[p.nivAct,p.nivVise].filter(Boolean).join(' → ')))
      +sec(IC2.book,'La formation recherchée',row('Type',p.types)+row('Modalité',p.modalite)+row('Durée',p.duree)+row('Niveau',p.nivForm)+row('Précisions',p.precise))
      +sec(IC2.cal,'Disponibilités',row('Début',p.dispo+(p.debut?' · '+p.debut.split('-').reverse().join('/'):''))+row('Jours',p.jours)+row('Moments',p.horaires))
      +sec(IC2.euro,'Financement envisagé',row('Pistes',p.fin)+row('Budget personnel',p.budget))
      +sec(IC2.pin,'Préférences',row('Zone',p.zone+(p.distance?' · '+p.distance:''))+row('Mobilité',p.mobilite)+row('Groupe',p.groupe)+row('Type d\'organisme',p.typeOrg))
      +sec(IC2.user,'Parcours',row('Âge',p.age)+row('Situation',p.situation)+row('Diplôme',p.diplome)+row('Motivations',p.envies))
      +'</div>'
      +'<div class="ofpp-ft">'+S(I.lock)+'<span>Coordonnées protégées par EVA : le nom, l\'e-mail et le téléphone ne sont jamais communiqués aux organismes.</span></div>'
      +'</article>';
  }
  function previewHtml(A,uid,c){ return presPage(publicDoc(A,uid,c),{ badge:'<span>Aperçu · ce que le centre recevra si tu le contactes</span>' }); }
  function recap(){
    var u=user(), A=W.A, c=A.consent||{};
    var card=el('div','ofw-rc');
    card.innerHTML=meterHtml(A,false)+previewHtml(A,u.uid,c)
      +'<div class="ofw-rc-st">'+(c.visible?'<span class="on">'+S(I.eye)+'Recommandations actives</span>':'<span>'+S(I.lock)+'Recommandations désactivées</span>')+'</div>'
      +'<div class="ofw-rc-ed"><span>Modifier une étape :</span>'+STEPS.slice(0,8).map(function(s,i){ return '<button type="button" data-s="'+(i+1)+'">'+(i+1)+'. '+s+'</button>'; }).join('')+'</div>';
    log().appendChild(card); scrollIn(card);
    card.onclick=function(e){ var b=e.target.closest('[data-s]'); if(!b) return; var s=+b.getAttribute('data-s'); W.edit=s; W.i=firstOfStep(s); while(Q[W.i].say) W.i++; W.hist=histBefore(W.i); saveDraft(); rebuild(); askCur(); };
    var box=inp(); box.innerHTML=''; var g=btn('Enregistrer mon profil','pri big'); box.appendChild(g);
    if(PROF){ var cx=el('button','ofw-skip','Annuler les modifications'); cx.type='button'; cx.onclick=function(){ var z=W.box.parentNode; W.box=null; dropDraft(); statusCard(z); }; box.appendChild(cx); }
    g.onclick=function(){ g.disabled=true; g.textContent='Enregistrement…'; saveProfile().then(function(){ dropDraft(); }).catch(function(){ g.disabled=false; g.textContent='Enregistrer mon profil'; toast('Tes informations n\'ont pas pu être enregistrées. Réessaie dans quelques instants.'); }); };
  }
  /* Enregistrement : profil privé + accords (avec date) + fiche anonymisée si visible */
  function logConsent(uid,type,val,txt){ return db().collection('consentements').add({ uid:uid, type:type, valeur:!!val, texte:txt, at:nowIso() }); }
  function syncPublic(uid,A,c){ var ref=db().collection('candidats_of').doc(uid); return c.visible ? ref.set(publicDoc(A,uid,c)) : ref.delete(); }
  function saveProfile(){
    var u=user(), A=JSON.parse(JSON.stringify(W.A)), c=A.consent||{ visible:false, propositions:false, prenom:false }; delete A.consent; delete A.consentAt;
    var base=db().collection('users').doc(u.uid).collection('of'), old=CONS||{}, ops=[];
    ops.push(base.doc('profil').set({ answers:A, updatedAt:nowIso() }));
    ops.push(base.doc('consents').set({ visible:!!c.visible, propositions:!!c.propositions, prenom:!!c.prenom, updatedAt:nowIso() }));
    [['visible',TXT_VIS],['propositions',TXT_PROP],['prenom',TXT_PRE]].forEach(function(x){ if(!!old[x[0]]!==!!c[x[0]] || !PROF) ops.push(logConsent(u.uid,x[0],c[x[0]],x[1])); });
    ops.push(syncPublic(u.uid,A,c));
    return Promise.all(ops).then(function(){
      PROF=A; CONS={ visible:!!c.visible, propositions:!!c.propositions, prenom:!!c.prenom };
      var zone=W.box.parentNode; W.box=null;
      zone.innerHTML=''; statusCard(zone,true);
      toast(c.visible?'✅ Profil enregistré : je te recommande les formations qui te correspondent':'✅ Profil enregistré : il reste privé');
    });
  }
  /* Taux de complétion du profil : questions remplies / questions qui s'appliquent */
  var QLBL={ prenom:'Ton prénom', nom:'Ton nom', age:'Ta tranche d\'âge', ville:'Ta ville', dep:'Ton département', mobilite:'Ta mobilité', situation:'Ta situation', statut:'Ton statut', diplome:'Ton diplôme', envies:'Tes motivations', objectif:'Ton objectif', metier:'Le métier visé', secteurs:'Tes secteurs', competences:'Les compétences à développer', nivAct:'Ton niveau actuel', nivVise:'Le niveau visé', types:'Les types de formation', modalite:'La modalité', duree:'La durée', nivForm:'Le niveau de formation', precise:'La formation précise', fin:'Tes pistes de financement', cpf:'Ton CPF', ft:'France Travail', aideFin:'L\'accompagnement financement', budget:'Ton budget', finVis:'La visibilité du financement', dispo:'Ta disponibilité', debut:'Ta date de début', jours:'Tes jours', horaires:'Tes moments', contraintes:'Tes contraintes', zone:'Ta zone', distance:'La distance', groupe:'Le format de groupe', typeOrg:'Le type d\'organisme' };
  function completion(A){
    A=A||{}; var tot=0, miss=[];
    Q.forEach(function(q,i){
      if(!q.k || q.say || q.t==='consent' || q.t==='recap' || !ok(i,A)) return;
      tot++; var v=A[q.k];
      if(v==null || v==='' || (Array.isArray(v) && !v.length)) miss.push({ i:i, l:QLBL[q.k]||q.k });
    });
    return { pct: tot ? Math.round((tot-miss.length)/tot*100) : 0, miss:miss };
  }
  function meterHtml(A,withBtn){
    var c=completion(A), full=c.pct>=100;
    return '<div class="ofm'+(full?' full':'')+'"><div class="ofm-top"><b>'+(full?'Profil complet ✨':'Profil complété à')+'</b><span class="ofm-pct">'+c.pct+' %</span></div>'
      +'<div class="ofm-bar"><i style="--p:'+c.pct+'%"></i></div>'
      +(full?'<p>Toutes les questions sont remplies : ton profil est au maximum de sa précision.</p>'
        :'<p>Il te manque <b>'+c.miss.length+' réponse'+(c.miss.length>1?'s':'')+'</b> pour compléter ton profil : '+c.miss.slice(0,4).map(function(m){ return esc(m.l.charAt(0).toLowerCase()+m.l.slice(1)); }).join(', ')+(c.miss.length>4?'…':'.')+'</p>'
          +(withBtn?'<button type="button" class="ofw-btn pri ofm-go" data-a="complete">Compléter mon profil</button>':''))
      +'</div>';
  }
  /* Publicité « visibilité » au-dessus des vraies cases qui rendent visible */
  function visAd(c){
    c=c||{};
    var on=!!c.visible;
    var T= on ? ['✨','Tes recommandations sont actives','Je te montre les formations des centres vérifiés qui correspondent à ton profil, avec ton pourcentage de correspondance. Personne ne te contacte : c\'est toi qui choisis qui tu contactes.','']
      : ['📣','Active tes recommandations','Je te trouve les formations qui te correspondent parmi celles des centres vérifiés, avec un pourcentage de correspondance expliqué. Ton nom et tes coordonnées restent privés, et tu coupes tout en un clic.','Active-les juste en dessous'];
    return '<div class="ofad'+(on?' ok':'')+'"><div class="ofad-in"><span class="ofad-ico">'+T[0]+'</span><div><b>'+T[1]+'</b><p>'+T[2]+'</p></div></div>'
      +(T[3]?'<div class="ofad-cta">'+T[3]+'<i>'+S('<path d="m6 9 6 6 6-6"/>')+'</i></div>':'')+'</div>';
  }
  /* Page « Mon profil formation » : la présentation + les réglages (modifier, refaire, supprimer, visibilité) */
  function statusCard(zone,fresh){
    var u=user(), A=PROF||{}, c=CONS||{};
    var wrap=el('div','ofs-wrap');
    wrap.innerHTML=meterHtml(A,true)+presPage(publicDoc(A,u.uid,c),{ badge:'<span class="'+(c.visible?'on':'')+'">'+(c.visible?'● Recommandations actives':'Recommandations désactivées')+'</span>' })
      +'<div class="ofs">'
      +'<div class="ofs-t">'+S(I.eye)+'<span>'+(c.visible?'Ce que le centre recevra si tu le contactes : tu choisiras toi-même ce que tu partages.':'Ton profil est prêt. Active « Me recommander des formations » pour que je te montre celles qui te correspondent.')+'</span></div>'
      +visAd(c)
      +sw('visible','Me recommander des formations',c.visible)
      +'<div class="ofw-row wrap"><button type="button" class="ofw-btn pri" data-a="edit">'+S('<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/>')+'Modifier mon profil</button><button type="button" class="ofw-btn" data-a="redo">'+S('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>')+'Refaire le formulaire avec EVA</button></div>'
      +'<button type="button" class="ofw-skip" data-a="del">Supprimer mon profil formation</button></div>'
      +(function(){ var n=(ST.props||[]).filter(function(p){ return p.statut==='envoyee'; }).length;
        return '<button type="button" class="ofgo" data-a="tab2"><span class="ofgo-ring"></span><span class="ofgo-ico">'+S(I.inbox)+(n?'<em>'+n+'</em>':'')+'</span>'
          +'<span class="ofgo-tx"><small>Étape suivante</small><b>Propositions &amp; questions</b><span>'+(n?'Tu as <b>'+n+' proposition'+(n>1?'s':'')+'</b> qui t\'attend'+(n>1?'ent':'')+'. ':'')+'Découvre les formations qu\'on te présente et pose tes questions à EVA.</span></span>'
          +'<span class="ofgo-arr">'+S('<path d="m9 18 6-6-6-6"/>')+'</span></button>'; })();
    zone.innerHTML=''; zone.appendChild(wrap);
    if(fresh) setTimeout(function(){ scrollIn(wrap.querySelector('.ofpp-id')); },60);
    var card=wrap;
    card.onchange=function(e){
      var k=e.target.getAttribute('data-sw'); if(!k) return; var on=e.target.checked, nc=Object.assign({},CONS); nc[k]=on;
      if(k==='visible' && !on) nc.propositions=false;
      if(k==='propositions' && on && !nc.visible){ e.target.checked=false; toast('Pour recevoir des propositions, active d\'abord « Visible par les organismes ».'); return; }
      var txt={ visible:TXT_VIS, propositions:TXT_PROP, prenom:TXT_PRE }[k];
      Promise.all([ db().collection('users').doc(u.uid).collection('of').doc('consents').set({ visible:!!nc.visible, propositions:!!nc.propositions, prenom:!!nc.prenom, updatedAt:nowIso() }), logConsent(u.uid,k,on,txt), syncPublic(u.uid,PROF,nc) ])
        .then(function(){ CONS=nc; statusCard(zone);
          toast(k==='visible' ? (on?'Recommandations activées : je te montre les formations qui te correspondent.':'Recommandations désactivées. Tes réponses restent enregistrées dans ton compte.') : k==='propositions' ? (on?'Tu peux recevoir des propositions de formation.':'Tu ne reçois plus de nouvelles propositions.') : (on?'Ton prénom est affiché aux organismes.':'Seul ton identifiant anonyme est affiché.')); })
        .catch(function(){ e.target.checked=!on; toast('Tes informations n\'ont pas pu être enregistrées. Réessaie dans quelques instants.'); });
    };
    card.onclick=function(e){
      var b=e.target.closest('[data-a]'); if(!b) return; var a=b.getAttribute('data-a');
      if(a==='edit'){ wizard(zone,{ recap:1 }); }
      else if(a==='tab2'){ try{ zone.dispatchEvent(new CustomEvent('of-tab',{ bubbles:true, detail:'2' })); }catch(_){} }
      else if(a==='complete'){ var m=completion(PROF).miss; if(m.length) wizard(zone,{ goto:m[0].i }); }
      else if(a==='redo'){ wizard(zone,{ redo:1 }); }
      else if(a==='del'){
        if(b.getAttribute('data-ok')!=='1'){ b.setAttribute('data-ok','1'); b.textContent='Confirmer : supprimer définitivement mon profil formation'; b.classList.add('warn'); return; }
        var base=db().collection('users').doc(u.uid).collection('of');
        Promise.all([ base.doc('profil').delete(), base.doc('consents').set({ visible:false, propositions:false, prenom:false, updatedAt:nowIso() }), db().collection('candidats_of').doc(u.uid).delete(), logConsent(u.uid,'suppression',true,'Suppression du profil formation') ])
          .then(function(){ PROF=null; CONS={ visible:false, propositions:false, prenom:false }; dropDraft(); toast('Ton profil formation a été supprimé.'); wizard(zone,null); }).catch(err);
      }
    };
  }
  function sw(k,t,on){ return '<label class="ofs-sw"><span>'+t+'</span><input type="checkbox" data-sw="'+k+'"'+(on?' checked':'')+'><i></i></label>'; }

  /* ═════ PROPOSITIONS : présentées par EVA, réponse en un clic ═════ */
  /* ═════ MODÈLE CATALOGUE : formations recommandées au membre (le candidat contacte, jamais l'inverse) ═════ */
  var RECO={ forms:null, st:null, loading:null };
  function nrm(t){ return String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim(); }
  var STOPW={ pour:1, dans:1, avec:1, plus:1, mois:1, formation:1, metier:1, autre:1, une:1, des:1, les:1, aux:1 };
  function toks(t){ return nrm(t).split(' ').filter(function(w){ return w.length>=4 && !STOPW[w]; }); }
  var PUB_MAP={ 'Salarié(e)':'Salarié(e)', 'Demandeur(se) d\'emploi':'Demandeur(se) d\'emploi', 'Étudiant(e)':'Étudiant(e) / alternant(e)', 'Alternant(e)':'Étudiant(e) / alternant(e)', 'Indépendant(e) / freelance':'Indépendant(e) / freelance', 'Entrepreneur(e)':'Indépendant(e) / freelance', 'En reconversion':'En reconversion' };
  var FIN_MAP={ 'CPF':'CPF', 'France Travail':'France Travail', 'Employeur':'OPCO / employeur', 'OPCO':'OPCO / employeur', 'Projet de transition professionnelle':'Transitions Pro', 'Région':'Région', 'Autofinancement':'Autofinancement' };
  /* % de correspondance expliqué : chaque critère est affiché ✓ ou ✗ */
  function matchOf(f,A){
    A=A||{}; var crit=[];
    var dist=f.modalite==='À distance';
    var lieu = dist || A.zone==='Toute la France' || A.zone==='100 % à distance' && dist || (A.ville && nrm(A.ville)===nrm(f.ville)) || (Array.isArray(A.mobilite) && A.mobilite.indexOf('Nationale')>-1);
    crit.push(['Lieu'+(f.ville?' : '+f.ville:''), !!lieu]);
    if(A.modalite){ var mm={ 'En présentiel':'Présentiel', 'À distance':'À distance', 'En hybride':'Hybride' }[A.modalite]; crit.push(['Modalité : '+(f.modalite||'—'), A.modalite==='Peu importe' || mm===f.modalite]); }
    var pub=PUB_MAP[A.situation]; if(pub && Array.isArray(f.publics) && f.publics.length) crit.push(['Public : '+pub, f.publics.indexOf(pub)>-1]);
    var fins=(Array.isArray(A.fin)?A.fin:[]).map(function(x){ return FIN_MAP[x]; }).filter(Boolean);
    if(fins.length && Array.isArray(f.financements) && f.financements.length) crit.push(['Financement', fins.some(function(x){ return f.financements.indexOf(x)>-1; })]);
    var mine=toks([A.metier,A.precise,(Array.isArray(A.secteurs)?A.secteurs.join(' '):''),(Array.isArray(A.competences)?A.competences.join(' '):A.competences)].join(' '));
    if(mine.length){ var ft=toks([f.titre,f.domaine,f.programme].join(' ')); crit.push(['Projet / métier', mine.some(function(w){ var r=w.slice(0,5); return ft.some(function(x){ return x.slice(0,5)===r; }); })]); }
    var ok=crit.filter(function(c){ return c[1]; }).length;
    return { pct: crit.length ? Math.round(ok/crit.length*100) : 0, crit:crit };
  }
  function recoRef(){ var u=user(); return u&&db() ? db().collection('users').doc(u.uid).collection('of').doc('reco') : null; }
  function loadReco(force){
    if(RECO.loading && !force) return RECO.loading;
    var r=recoRef(); if(!r){ RECO.forms=[]; RECO.st={}; return Promise.resolve(); }
    RECO.loading=Promise.all([
      db().collection('formations').where('statut','==','publiee').get().then(function(q){ RECO.forms=q.docs.map(function(d){ var x=d.data(); x.id=d.id; return x; }); }).catch(function(){ RECO.forms=[]; }),
      r.get().then(function(d){ RECO.st=d.exists?d.data():{}; }).catch(function(){ RECO.st={}; }),
      loadConvs()
    ]).then(function(){ RECO.st.saved=RECO.st.saved||[]; RECO.st.hidden=RECO.st.hidden||[]; RECO.st.seen=RECO.st.seen||[]; RECO.st.interest=RECO.st.interest||{}; recoBadge(); });
    return RECO.loading;
  }
  function saveReco(){ var r=recoRef(); if(r) r.set(RECO.st,{merge:true}).catch(function(){}); }
  function recoList(){
    var A=PROF||{}, on=!!(CONS&&CONS.visible);
    return (RECO.forms||[]).filter(function(f){ return RECO.st.hidden.indexOf(f.id)<0; })
      .map(function(f){ return { f:f, m:matchOf(f,A) }; })
      .sort(function(a,b){ return b.m.pct-a.m.pct; });
  }
  function newCount(){ if(!RECO.forms||!RECO.st||!(CONS&&CONS.visible)) return 0; return recoList().filter(function(x){ return x.m.pct>=40 && RECO.st.seen.indexOf(x.f.id)<0; }).length; }
  function recoBadge(){
    var n=newCount()+unreadConvs();
    document.querySelectorAll('.oft-tab[data-t="2"]').forEach(function(t){ var e=t.querySelector('em'); if(!e){ e=document.createElement('em'); t.appendChild(e); } e.textContent=n; e.style.display=n?'':'none'; });
    document.querySelectorAll('#eva-side [data-go="eva-of"]').forEach(function(b){ var x=b.querySelector('.of-badge'); if(!x){ x=el('span','of-badge'); b.appendChild(x); } x.textContent=n; x.style.display=n?'':'none'; });
  }
  function markSeen(){ if(!RECO.forms||!(CONS&&CONS.visible)) return; var ch=false; recoList().forEach(function(x){ if(RECO.st.seen.indexOf(x.f.id)<0){ RECO.st.seen.push(x.f.id); ch=true; } }); if(ch){ saveReco(); } setTimeout(recoBadge,600); }
  function pctClass(p){ return p>=75?'hi':p>=50?'mid':'lo'; }
  function recoCard(x){
    var f=x.f, m=x.m, saved=RECO.st.saved.indexOf(f.id)>-1, inter=!!RECO.st.interest[f.id], neu=RECO.st.seen.indexOf(f.id)<0;
    var g=function(l,v){ return v?'<div><span>'+l+'</span><b>'+esc(v)+'</b></div>':''; };
    var th=(window.CPFP_THEMES&&CPFP_THEMES[f.theme])||['#b45309','#f59e0b'];
    return '<div class="ofr" data-f="'+esc(f.id)+'" style="--ta:'+th[0]+';--tb:'+th[1]+'"><div class="ofr-hd">'+(f.orgLogo?'<span class="ofr-logo"><img src="'+esc(f.orgLogo)+'" alt=""></span>':'')+'<div class="ofr-pct '+pctClass(m.pct)+'"><b>'+m.pct+'%</b><span>match</span></div>'
      +'<div class="ofr-t"><b>'+esc(f.titre)+'</b><span>'+esc([f.orgNom,f.ville,f.modalite].filter(Boolean).join(' · '))+'</span>'+(neu?'<em class="ofr-new">Nouveau</em>':'')+(saved?'<em class="ofr-sv">Enregistrée</em>':'')+'</div></div>'
      +'<div class="ofr-crit">'+m.crit.map(function(c){ return '<span class="'+(c[1]?'ok':'ko')+'">'+(c[1]?'✓':'✗')+' '+esc(c[0])+'</span>'; }).join('')+'</div>'
      +'<button type="button" class="ofr-more" data-a="page">Voir la présentation de la formation'+S('<path d="m9 18 6-6-6-6"/>')+'</button>'
      +'</div>';
  }
  /* ═════ MESSAGERIE PROTÉGÉE (côté membre) : le membre écrit toujours le premier ═════ */
  var MSG={ convs:{}, unsub:null, open:null };
  function convId(fid){ var u=user(); return u.uid+'_'+fid; }
  function loadConvs(){
    var u=user(); if(!u||!db()) return Promise.resolve();
    return db().collection('conversations').where('candUid','==',u.uid).get().then(function(q){
      MSG.convs={}; q.docs.forEach(function(d){ var x=d.data(); x.id=d.id; MSG.convs[x.formationId]=x; });
    }).catch(function(){ MSG.convs={}; });
  }
  function unreadConvs(){ return Object.keys(MSG.convs).filter(function(k){ return MSG.convs[k].unreadCand; }).length; }
  function fmtAt(iso){ try{ var d=new Date(iso); return d.toLocaleDateString('fr-FR',{ day:'2-digit', month:'2-digit' })+' · '+d.toLocaleTimeString('fr-FR',{ hour:'2-digit', minute:'2-digit' }); }catch(e){ return ''; } }
  function profilSnap(){
    var u=user(), p=publicDoc(PROF||{},u.uid,{});
    ['uid','visible','propositions','prenom','fin','budget','updatedAt'].forEach(function(k){ delete p[k]; });
    p.motEva=evaWord(p).replace(/<[^>]+>/g,'');
    return p;
  }
  function composerHtml(f){
    var u=user(), pn=(PROF&&PROF.prenom)||'', em=(u&&u.email)||'';
    var sug='Bonjour, votre formation « '+(f.titre||'')+' » m\'intéresse. Pourriez-vous m\'indiquer les prochaines dates, le reste à charge éventuel et les modalités d\'inscription ? Merci.';
    return '<div class="ofc-comp"><div class="ofw-eva"><span class="ofw-av">'+X().S(X().IC.eva)+'</span><div class="ofw-b">Écris au centre en quelques lignes. Je t\'ai préparé un message, modifie-le librement. <b>Tu choisis ce que tu partages.</b></div></div>'
      +'<textarea class="ofw-inp ofc-txt" maxlength="1500">'+esc(sug)+'</textarea>'
      +'<div class="ofc-share"><b>Ce que tu partages avec le centre</b>'
      +'<label><input type="checkbox" data-sh="profil" checked><span>Mon projet de formation (sans nom ni coordonnées)</span></label>'
      +(pn?'<label><input type="checkbox" data-sh="prenom"><span>Mon prénom : '+esc(pn)+'</span></label>':'')
      +(em?'<label><input type="checkbox" data-sh="email"><span>Mon e-mail : '+esc(em)+'</span></label>':'')
      +'<label><input type="checkbox" data-sh="tel"><span>Mon téléphone</span></label><input class="ofw-inp ofc-tel" type="tel" maxlength="20" placeholder="Ton numéro, si tu veux le partager" style="display:none;min-height:0">'
      +'</div><div class="ofw-row wrap"><button type="button" class="ofw-btn pri" data-a="send1">'+S('<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>')+'Envoyer au centre</button><button type="button" class="ofw-btn" data-a="cancel1">Annuler</button></div>'
      +'<p class="ofc-legal">Le centre ne peut pas te contacter en dehors de cette conversation. Tes informations CPF ne sont jamais transmises.</p></div>';
  }
  function sendFirst(card,f){
    var u=user(), t=String(card.querySelector('.ofc-txt').value||'').trim(); if(t.length<5){ toast('Écris quelques mots au centre'); return; }
    var sh={}; card.querySelectorAll('[data-sh]').forEach(function(c){ sh[c.getAttribute('data-sh')]=c.checked; });
    var shared={}; if(sh.prenom) shared.prenom=(PROF&&PROF.prenom)||''; if(sh.email) shared.email=u.email||''; if(sh.tel){ var tv=String(card.querySelector('.ofc-tel').value||'').trim(); if(tv) shared.tel=tv; }
    var now=new Date().toISOString(), exp=new Date(Date.now()+180*864e5);
    var d={ candUid:u.uid, orgUid:f.orgUid, formationId:f.id, formationTitre:f.titre||'', orgNom:f.orgNom||'', candLabel:shared.prenom||refOf(u.uid),
      profil: sh.profil ? profilSnap() : null, shared:shared, statut:'ouverte', messages:[{ from:'cand', text:t, at:now }],
      createdAt:now, updatedAt:now, lastAt:now, lastFrom:'cand', unreadOrg:true, unreadCand:false };
    try{ d.expireAt=firebase.firestore.Timestamp.fromDate(exp); }catch(e){}
    var b=card.querySelector('[data-a="send1"]'); b.disabled=true;
    db().collection('conversations').doc(convId(f.id)).set(d).then(function(){
      MSG.convs[f.id]=Object.assign({ id:convId(f.id) },d); RECO.st.interest[f.id]=now; saveReco(); toast('Message envoyé au centre'); closePage(); openThread(f.id); refreshList();
    }).catch(function(e){ b.disabled=false; toast((e&&e.code)==='permission-denied'?'Envoi refusé : règles Firestore à mettre à jour':'Envoi impossible pour le moment'); });
  }
  /* Fenêtre de conversation (temps réel tant qu'elle est ouverte) */
  function openThread(fid){
    var c=MSG.convs[fid]; if(!c) return; closeThread();
    var sh=el('div','ofm-sheet'); sh.innerHTML='<div class="ofm-box"><div class="ofm-hd"><button type="button" class="ofm-x" aria-label="Fermer">'+S('<path d="M15 18l-6-6 6-6"/>')+'</button><div><b>'+esc(c.orgNom||'Centre de formation')+'</b><span>'+esc(c.formationTitre||'')+'</span></div><em>🔒 Protégé</em></div>'
      +'<div class="ofm-list"></div><div class="ofm-ft"><textarea class="ofm-in" maxlength="1500" placeholder="Écris ton message…"></textarea><button type="button" class="ofm-send" aria-label="Envoyer">'+S('<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>')+'</button></div>'
      +'<div class="ofm-tools"><button type="button" data-t="share">Partager mes coordonnées</button><button type="button" data-t="close">Clôturer la conversation</button></div></div>';
    document.body.appendChild(sh); document.documentElement.classList.add('ofm-lock'); MSG.open=fid;
    var list=sh.querySelector('.ofm-list'), ref=db().collection('conversations').doc(c.id);
    function draw(x){
      MSG.convs[fid]=Object.assign({ id:c.id },x);
      list.innerHTML='<div class="ofm-note">Conversation protégée : le centre ne voit que ce que tu as choisi de partager.'+(x.shared&&Object.keys(x.shared).length?' Partagé : '+esc(Object.keys(x.shared).map(function(k){ return {prenom:'prénom',email:'e-mail',tel:'téléphone'}[k]; }).join(', '))+'.':'')+'</div>'
        +(x.messages||[]).map(function(m){ return '<div class="ofm-m '+(m.from==='cand'?'me':'them')+'"><p>'+esc(m.text)+'</p><span>'+(m.from==='cand'?'Toi':esc(x.orgNom||'Centre'))+' · '+fmtAt(m.at)+'</span></div>'; }).join('')
        +(x.statut!=='ouverte'?'<div class="ofm-note">Cette conversation est clôturée.</div>':'');
      list.scrollTop=list.scrollHeight;
      sh.querySelector('.ofm-ft').style.display=x.statut==='ouverte'?'':'none';
      if(x.unreadCand) ref.update({ unreadCand:false }).catch(function(){});
    }
    draw(c);
    MSG.unsub=ref.onSnapshot(function(d){ if(d.exists) draw(d.data()); },function(){});
    cpSheetArrows(list,sh.querySelector('.ofm-box'));
    sh.querySelector('.ofm-x').onclick=closeThread;
    sh.addEventListener('click',function(e){ if(e.target===sh) closeThread(); });
    sh.querySelector('.ofm-send').onclick=function(){
      var ta=sh.querySelector('.ofm-in'), t=String(ta.value||'').trim(); if(!t) return;
      var x=MSG.convs[fid]; if((x.messages||[]).length>=60){ toast('Conversation complète : continuez par e-mail si vous avez partagé vos coordonnées'); return; }
      var now=new Date().toISOString(), upd={ messages:firebase.firestore.FieldValue.arrayUnion({ from:'cand', text:t, at:now }), updatedAt:now, lastAt:now, lastFrom:'cand', unreadOrg:true };
      try{ upd.expireAt=firebase.firestore.Timestamp.fromDate(new Date(Date.now()+180*864e5)); }catch(e){}
      ta.value=''; ref.update(upd).catch(function(){ ta.value=t; toast('Envoi impossible pour le moment'); });
    };
    sh.querySelector('.ofm-tools').onclick=function(e){
      var b=e.target.closest('[data-t]'); if(!b) return; var x=MSG.convs[fid];
      if(b.getAttribute('data-t')==='close'){ if(!confirm('Clôturer cette conversation ? Ni toi ni le centre ne pourrez plus écrire.')) return; ref.update({ statut:'close', updatedAt:new Date().toISOString() }).catch(function(){}); return; }
      var u=user(), pn=(PROF&&PROF.prenom)||'', tel=prompt('Ton numéro de téléphone (laisse vide pour ne partager que ton e-mail) :','')||'';
      var s2=Object.assign({},x.shared||{}); if(pn) s2.prenom=pn; if(u.email) s2.email=u.email; if(tel.trim()) s2.tel=tel.trim();
      ref.update({ shared:s2, updatedAt:new Date().toISOString() }).then(function(){ toast('Coordonnées partagées avec le centre'); }).catch(function(){ toast('Partage impossible pour le moment'); });
    };
  }
  function closeThread(){ if(MSG.unsub){ MSG.unsub(); MSG.unsub=null; } var s=document.querySelector('.ofm-sheet'); if(s) s.remove(); document.documentElement.classList.remove('ofm-lock'); MSG.open=null; loadConvs().then(function(){ recoBadge(); var b=document.querySelector('.ofi'); if(b && RECO.forms) drawReco(b); }); }
  /* Tiroir haut de gamme (ouvert par défaut, l'état est mémorisé pendant la visite) */
  var DRW={};
  function drawerOpen(k,ico,t,sub,badge,closed){
    var open = (k in DRW) ? DRW[k] : !closed;
    return '<details class="ofdw" data-dw="'+k+'"'+(open?' open':'')+'><summary><span class="ofdw-ic">'+ico+'</span><span class="ofdw-t"><b>'+t+'</b><span>'+sub+'</span></span>'+(badge?'<em class="ofdw-b">'+badge+'</em>':'')+'<span class="ofdw-ch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary><div class="ofdw-in">';
  }
  function demandesHtml(){
    var L=Object.keys(MSG.convs).map(function(k){ return MSG.convs[k]; }).sort(function(a,b){ return String(b.lastAt||'').localeCompare(String(a.lastAt||'')); });
    if(!L.length) return '';
    var un=L.filter(function(c){ return c.unreadCand; }).length;
    return drawerOpen('dem',S(I.inbox),'Mes demandes',L.length+' conversation'+(L.length>1?'s':'')+(un?' · '+un+' nouveau'+(un>1?'x':'')+' message'+(un>1?'s':''):''),un)+L.map(function(c){ var last=(c.messages||[]).slice(-1)[0]||{};
      return '<button type="button" class="ofd-it" data-conv="'+esc(c.formationId)+'"><span class="ofd-dot'+(c.unreadCand?' on':'')+'"></span><span class="ofd-t"><b>'+esc(c.formationTitre)+'</b><span>'+esc(c.orgNom)+' · '+(c.statut!=='ouverte'?'Clôturée':c.lastFrom==='org'?'Le centre t\'a répondu':'En attente de réponse')+'</span><i>'+esc(String(last.text||'').slice(0,80))+'</i></span>'+S('<path d="m9 18 6-6-6-6"/>')+'</button>'; }).join('')+'</div></details>';
  }
  /* Présentation complète d'une formation (même page que l'aperçu du centre) */
  function closePage(){ var s=document.querySelector('.ofx-sheet'); if(s) s.remove(); if(!document.querySelector('.ofm-sheet')) document.documentElement.classList.remove('ofm-lock'); }
  function pageActions(f){
    var saved=RECO.st.saved.indexOf(f.id)>-1;
    if(MSG.convs[f.id]) return '<div class="ofx-acts"><button type="button" class="ofw-btn pri" data-x="conv">'+S(I.inbox)+'Ouvrir la conversation'+(MSG.convs[f.id].unreadCand?' · nouveau message':'')+'</button></div>';
    return '<div class="ofc-zone"></div><div class="ofx-acts ofc-acts"><button type="button" class="ofw-btn pri" data-x="int">'+S(I.check)+'Je suis intéressé(e)</button><button type="button" class="ofw-btn" data-x="save">'+(saved?'Retirer des enregistrées':'Enregistrer')+'</button><button type="button" class="ofw-btn" data-x="hide">Pas pour moi</button><button type="button" class="ofw-skip" data-x="sig">Signaler</button></div>';
  }
  function openPage(fid){
    var f=(RECO.forms||[]).filter(function(x){ return x.id===fid; })[0]; if(!f) return; closePage();
    var m=matchOf(f,PROF||{});
    var top='<div class="ofx-match"><div class="ofr-pct '+pctClass(m.pct)+'"><b>'+m.pct+'%</b><span>match</span></div><div><b>Ta correspondance avec cette formation</b><div class="ofr-crit">'+m.crit.map(function(c){ return '<span class="'+(c[1]?'ok':'ko')+'">'+(c[1]?'✓':'✗')+' '+esc(c[0])+'</span>'; }).join('')+'</div></div></div>';
    var sh=el('div','ofx-sheet');
    sh.innerHTML='<div class="ofx-box"><div class="ofm-hd"><button type="button" class="ofm-x" aria-label="Fermer">'+S('<path d="M15 18l-6-6 6-6"/>')+'</button><div><b>'+esc(f.titre||'Formation')+'</b><span>'+esc(f.orgNom||'')+'</span></div><em>Centre vérifié</em></div><div class="ofx-scroll">'+cpFormPage(f,{ top:top, actions:pageActions(f) })+'</div></div>';
    document.body.appendChild(sh); document.documentElement.classList.add('ofm-lock');
    if(RECO.st.seen.indexOf(fid)<0){ RECO.st.seen.push(fid); saveReco(); setTimeout(recoBadge,300); }
    sh.querySelector('.ofm-x').onclick=closePage;
    cpSheetArrows(sh.querySelector('.ofx-scroll'),sh.querySelector('.ofx-box'));
    sh.addEventListener('click',function(e){
      if(e.target===sh){ closePage(); return; }
      var b=e.target.closest('[data-x],[data-a]'); if(!b) return; var a=b.getAttribute('data-x')||b.getAttribute('data-a'), u=user();
      if(a==='conv'){ closePage(); openThread(fid); return; }
      if(a==='int'){ sh.querySelector('.ofc-zone').innerHTML=composerHtml(f); sh.querySelector('.ofc-acts').style.display='none'; var tc=sh.querySelector('[data-sh="tel"]'); if(tc) tc.onchange=function(){ sh.querySelector('.ofc-tel').style.display=tc.checked?'':'none'; }; sh.querySelector('.ofc-zone').scrollIntoView({ behavior:'smooth', block:'start' }); return; }
      if(a==='send1'){ sendFirst(sh,f); return; }
      if(a==='cancel1'){ sh.querySelector('.ofc-zone').innerHTML=''; sh.querySelector('.ofc-acts').style.display=''; return; }
      if(a==='save'){ var k=RECO.st.saved.indexOf(fid); if(k>-1) RECO.st.saved.splice(k,1); else RECO.st.saved.push(fid); saveReco(); toast(k>-1?'Retirée de tes formations enregistrées':'Formation enregistrée'); b.textContent=k>-1?'Enregistrer':'Retirer des enregistrées'; refreshList(); return; }
      if(a==='hide'){ RECO.st.hidden.push(fid); saveReco(); toast('C\'est noté, je ne te la montre plus'); closePage(); refreshList(); return; }
      if(a==='sig'){ if(!u||!db()) return; db().collection('reports').add({ reporterUid:u.uid, type:'formation', formationId:fid, createdAt:new Date().toISOString() }).then(function(){ toast('Merci, CareerPulse va examiner cette formation'); }).catch(function(){ toast('Signalement impossible pour le moment'); }); }
    });
  }
  function refreshList(){ var b=document.querySelector('.ofi'); if(b && RECO.forms) drawReco(b); recoBadge(); }
  function drawReco(box){
    if(!RECO.forms){ box.innerHTML='<div class="ofp-empty"><span class="evh-typing"><span></span><span></span><span></span></span></div>'; loadReco().then(function(){ drawReco(box); }); return; }
    var on=!!(CONS&&CONS.visible), L=recoList(), h='';
    if(!PROF) h+='<div class="ofr-tip">'+S(I.school)+'<span>Complète ton <b>profil formation</b> dans le premier onglet : je pourrai calculer ton pourcentage de correspondance.</span></div>';
    else if(!on) h+='<div class="ofr-tip">'+S(I.eye)+'<span>Active <b>« Me recommander des formations »</b> dans ton profil : je te montrerai d\'abord celles qui te correspondent le mieux.</span></div>';
    h+=demandesHtml();
    var top=L.filter(function(x){ return x.m.pct>=40; }), rest=L.filter(function(x){ return x.m.pct<40; });
    if(top.length) h+=drawerOpen('reco','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg>','Recommandées pour toi',top.length+' formation'+(top.length>1?'s':'')+' qui te correspond'+(top.length>1?'ent':''),0)+top.map(recoCard).join('')+'</div></details>';
    if(rest.length) h+=drawerOpen('rest',S(I.school),top.length?'Autres formations publiées':'Formations publiées','Elles correspondent moins à ton profil, mais tu peux les consulter',0,true)+rest.map(recoCard).join('')+'</div></details>';
    if(!L.length) h+='<div class="ofp-empty">'+S(I.school)+'<b>Tes formations arrivent ici.</b><span>Les centres de formation vérifiés rejoignent CareerPulse au fil de leur inscription sur le site. Dès qu\'une de leurs formations correspond à ton profil, elle apparaît ici et une notification t\'attend dans ton espace. Ton profil est prêt : tu n\'as rien d\'autre à faire.</span></div>'
      +'<div class="ofr-cat"><b>En attendant, explore les catalogues officiels</b><span>Avec tes critères'+(PROF&&PROF.metier?' (métier : '+esc(PROF.metier)+(PROF.ville?', '+esc(PROF.ville):'')+')':'')+' :</span>'
      +'<a href="https://www.moncompteformation.gouv.fr" target="_blank" rel="noopener noreferrer">Mon Compte Formation ↗</a>'
      +'<a href="https://www.onisep.fr" target="_blank" rel="noopener noreferrer">Onisep, les formations ↗</a></div>';
    var old=(ST.props||[]); if(old.length) h+='<div class="ofr-old"><b>Anciennes propositions</b></div>'+old.map(propCard).join('');
    box.innerHTML=h;
    box.addEventListener('toggle',function(e){ var d=e.target; if(d && d.getAttribute && d.getAttribute('data-dw')) DRW[d.getAttribute('data-dw')]=d.open; },true);
    box.onclick=function(e){
      var cv=e.target.closest('[data-conv]'); if(cv){ openThread(cv.getAttribute('data-conv')); return; }
      var crd=e.target.closest('.ofr'); if(crd && !e.target.closest('[data-a]')){ openPage(crd.getAttribute('data-f')); return; }
      var b=e.target.closest('[data-a]'); if(!b) return;
      var card=b.closest('.ofr'); if(!card){ inboxClick(e,box); return; }
      var id=card.getAttribute('data-f'), a=b.getAttribute('data-a'), u=user();
      if(a==='page'){ openPage(id); return; }
      if(a==='int'){ var f=(RECO.forms||[]).filter(function(x){ return x.id===id; })[0]; if(!f) return; card.querySelector('.ofc-zone').innerHTML=composerHtml(f); card.querySelector('.ofc-acts').style.display='none';
        var tc=card.querySelector('[data-sh="tel"]'); if(tc) tc.onchange=function(){ card.querySelector('.ofc-tel').style.display=tc.checked?'':'none'; }; return; }
      if(a==='send1'){ var f1=(RECO.forms||[]).filter(function(x){ return x.id===id; })[0]; if(f1) sendFirst(card,f1); return; }
      if(a==='cancel1'){ card.querySelector('.ofc-zone').innerHTML=''; card.querySelector('.ofc-acts').style.display=''; return; }
      if(a==='conv'){ openThread(id); return; }
      if(a==='save'){ var k=RECO.st.saved.indexOf(id); if(k>-1) RECO.st.saved.splice(k,1); else RECO.st.saved.push(id); saveReco(); toast(k>-1?'Retirée de tes formations enregistrées':'Formation enregistrée'); drawReco(box); return; }
      if(a==='hide'){ RECO.st.hidden.push(id); saveReco(); toast('C\'est noté, je ne te la montre plus'); drawReco(box); recoBadge(); return; }
      if(a==='sig'){ if(!u||!db()) return; db().collection('reports').add({ reporterUid:u.uid, type:'formation', formationId:id, createdAt:new Date().toISOString() }).then(function(){ toast('Merci, CareerPulse va examiner cette formation'); }).catch(function(){ toast('Signalement impossible pour le moment'); }); }
    };
  }
  function drawInbox(box){ drawReco(box); }
  function drawInboxOld(box){
    var list=ST.props||[];
    if(!list.length){ box.innerHTML='<div class="ofp-empty">'+S(I.inbox)+'<b>Aucune proposition pour le moment.</b><span>'+(CONS&&CONS.propositions?'Dès qu\'un organisme vérifié te présente une formation, je te la montre ici.':'Active « Recevoir des propositions » dans ton profil pour que les organismes puissent te présenter leurs formations.')+'</span></div>'; return; }
    box.innerHTML=list.map(propCard).join('');
    box.onclick=function(e){ inboxClick(e,box); };
  }
  function propCard(p){
    var f=p.formation||{}, st=p.statut||'envoyee';
    var h='<div class="ofp" data-p="'+esc(p.id)+'"><div class="ofp-hd"><span class="ofp-av">'+S(I.school)+'</span><div><b>'+esc(p.orgNom||'Organisme de formation')+'</b><span>'+(p.orgVerifie?'Organisme vérifié · ':'')+esc((p.createdAt||'').slice(0,10).split('-').reverse().join('/'))+'</span></div>'+stPill(st)+'</div>'
      +'<div class="ofp-msg">'+X().S(X().IC.eva,'#b45309',2)+'<span><b>EVA te présente</b> la formation <b>« '+esc(f.titre||'')+' »</b>'+(f.ville?' à <b>'+esc(f.ville)+'</b>':'')+'.</span></div>'
      +'<div class="ofp-g">'+(f.modalite?'<div><span>Modalité</span><b>'+esc(f.modalite)+'</b></div>':'')+(f.duree?'<div><span>Durée</span><b>'+esc(f.duree)+'</b></div>':'')+(f.debut?'<div><span>Début</span><b>'+esc(f.debut)+'</b></div>':'')+(f.financement?'<div><span>Financement possible</span><b>'+esc(f.financement)+'</b></div>':'')+'</div>'
      +(p.message||f.description?'<div class="ofp-txt">'+esc(p.message||f.description)+'</div>':'')
      +(f.financement?'<div class="ofp-note">Le financement dépend de ta situation : vérifie toujours les conditions officielles. Rien n\'est garanti tant que le financeur n\'a pas validé.</div>':'');
    if(st==='envoyee') h+='<div class="ofp-q">Cette proposition t\'intéresse ?</div><div class="ofw-row wrap"><button type="button" class="ofw-btn pri" data-a="int">'+S(I.check)+'Intéressé(e)</button><button type="button" class="ofw-btn" data-a="no">Pas intéressé(e)</button><button type="button" class="ofw-btn" data-a="later">Plus tard</button><button type="button" class="ofw-skip" data-a="sig">Signaler</button></div><div class="ofp-zone"></div>';
    else if(st==='interesse') h+=contactHtml(p);
    return h+'</div>';
  }
  function stPill(st){ var m={ envoyee:['Nouvelle','new'], interesse:['Intéressé(e)','ok'], refusee:['Pas intéressé(e)',''], signalee:['Signalée','warn'] }[st]||['',''];
    return '<em class="ofp-st '+m[1]+'">'+m[0]+'</em>'; }
  function contactHtml(p){
    var mail=p.orgEmail||'', f=p.formation||{};
    return '<div class="ofp-ct"><b>Coordonnées de l\'organisme</b>'
      +(mail?'<div class="ofp-ct-l">'+S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')+'<span>'+esc(mail)+'</span><button type="button" class="ofp-cp" data-a="copy" data-v="'+esc(mail)+'">Copier</button></div>':'')
      +(p.orgTel?'<div class="ofp-ct-l">'+S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>')+'<span>'+esc(p.orgTel)+'</span></div>':'')
      +(p.orgSite?'<div class="ofp-ct-l">'+S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>')+'<a href="'+esc(/^https?:\/\//.test(p.orgSite)?p.orgSite:'https://'+p.orgSite)+'" target="_blank" rel="noopener">'+esc(p.orgSite)+'</a></div>':'')
      +(mail?'<a class="ofw-btn pri" href="mailto:'+esc(mail)+'?subject='+encodeURIComponent('Votre formation « '+(f.titre||'')+' » (CareerPulse)')+'">'+S(I.send)+'Écrire à l\'organisme</a>':'')
      +'<p><b>C\'est toi qui décides</b> de contacter cet organisme. CareerPulse n\'intervient pas dans la suite des échanges. Ne communique jamais tes identifiants (Mon Compte Formation, France Travail) et ne paie rien sans contrat écrit.</p></div>';
  }
  function inboxClick(e,box){
    var b=e.target.closest('[data-a]'); if(!b) return; var a=b.getAttribute('data-a'), card=b.closest('[data-p]'), id=card&&card.getAttribute('data-p');
    var p=(ST.props||[]).filter(function(x){ return x.id===id; })[0]; if(!p && a!=='copy') return;
    var zone=card&&card.querySelector('.ofp-zone'), u=user();
    function setSt(st){ return db().collection('propositions').doc(id).update({ statut:st, repondueAt:nowIso() }).then(function(){ p.statut=st; badge(); }); }
    if(a==='copy'){ var v=b.getAttribute('data-v'); (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).then(function(){ b.textContent='Copié ✓'; }).catch(function(){ toast(v); }); }
    else if(a==='int'){
      zone.innerHTML='<div class="ofp-cf">'+X().S(X().IC.eva,'#b45309',2)+'<span>Je vais t\'afficher les coordonnées de <b>'+esc(p.orgNom||'l\'organisme')+'</b>. Lui ne reçoit <b>aucune</b> de tes coordonnées : il saura seulement que tu es intéressé(e). C\'est toi qui décides de lui écrire.</span></div><div class="ofw-row wrap"><button type="button" class="ofw-btn pri" data-a="int-ok">Oui, afficher les coordonnées</button><button type="button" class="ofw-btn" data-a="cancel">Annuler</button></div>';
    }
    else if(a==='int-ok'){ b.disabled=true; Promise.all([ setSt('interesse'), logConsent(u.uid,'interet',true,'Intérêt pour la proposition '+id+' — coordonnées de l\'organisme affichées au membre') ]).then(function(){ drawInbox(box); toast('Voici les coordonnées : à toi de jouer 👏'); }).catch(function(x){ b.disabled=false; err(x); }); }
    else if(a==='cancel'){ zone.innerHTML=''; }
    else if(a==='no'){ b.disabled=true; setSt('refusee').then(function(){ drawInbox(box); toast('C\'est noté. L\'organisme verra seulement « Pas intéressé(e) ».'); }).catch(function(x){ b.disabled=false; err(x); }); }
    else if(a==='later'){ zone.innerHTML=''; toast('Elle t\'attend ici : prends le temps d\'y réfléchir.'); }
    else if(a==='sig'){
      zone.innerHTML='<div class="ofp-cf">'+X().S(X().IC.eva,'#b45309',2)+'<span>Merci de me le signaler. Que se passe-t-il ?</span></div><div class="ofw-chips sm">'+['Démarchage insistant','Proposition trompeuse','Contenu inapproprié','Autre'].map(function(m){ return '<button type="button" class="ofw-btn" data-a="sig-ok" data-m="'+m+'">'+m+'</button>'; }).join('')+'</div>';
    }
    else if(a==='sig-ok'){
      b.disabled=true;
      Promise.all([ db().collection('reports').add({ type:'proposition', propId:id, orgUid:p.orgUid||'', reporterUid:u.uid, motif:b.getAttribute('data-m'), at:nowIso() }), setSt('signalee') ])
        .then(function(){ drawInbox(box); toast('Signalement envoyé. CareerPulse va l\'examiner.'); }).catch(function(x){ b.disabled=false; err(x); });
    }
  }

  /* ═════ EVA FORMATION : questions par thèmes, réponses en tiroirs (réponses de l'IA du site, encadrées) ═════ */
  var FAQ_T=[
    ['profil','Mon profil & mes recommandations',[
      ['Qui peut voir mon profil ?','Personne d\'autre que toi. Les centres de formation ne voient jamais ton profil : il me sert uniquement à te recommander les formations qui te correspondent.'],
      ['Que reçoit un centre si je le contacte ?','Seulement ce que tu choisis de partager quand tu lui écris : ton message, et si tu le veux ton prénom, ton e-mail ou ton téléphone. Tu vois l\'aperçu exact dans « Ce que le centre recevra si tu le contactes ».'],
      ['Mon nom de famille est-il visible ?','Non, jamais. Ton nom reste privé. Même quand tu écris à un centre, c\'est toi qui choisis de donner ou non ton prénom et tes coordonnées.'],
      ['Mes infos CPF sont-elles transmises ?','Non. Tes pistes de financement et ton budget servent uniquement à mes conseils et au calcul du match. Ils ne sont jamais transmis aux centres.'],
      ['Comment couper les recommandations ?','Dans ta carte « Mon profil formation », désactive « Me recommander des formations ». C\'est immédiat, et tes réponses restent enregistrées pour plus tard.'],
      ['Je peux modifier mon profil ?','Oui, quand tu veux : « Modifier mon profil » pour changer une étape, ou « Refaire le formulaire avec EVA » pour tout reprendre avec tes réponses déjà présélectionnées.'],
      ['Ma situation a changé, je fais quoi ?','Mets simplement ton profil à jour avec « Modifier mon profil ». Je recalculerai tes correspondances, pour te montrer des formations qui collent à ton projet actuel.'],
      ['Pourquoi répondre à toutes les questions ?','Plus ton profil est précis, plus ton pourcentage de correspondance est fiable. Les questions facultatives peuvent être passées, mais chaque réponse m\'aide à te trouver la bonne formation.'],
      ['Si j\'arrête le formulaire en cours ?','Pas de panique : je garde tes réponses pendant ta visite, et on reprend là où tu t\'étais arrêté(e).'],
      ['À quoi sert « Le mot d\'EVA » ?','C\'est un court résumé de ton projet que je rédige à partir de tes réponses. Il t\'aide à présenter ton projet clairement quand tu écris à un centre.'],
      ['Je veux supprimer mon profil','En bas de ta carte « Mon profil formation », clique sur « Supprimer mon profil formation ». Tes réponses sont effacées et je ne te recommande plus de formations.']
    ]],
    ['props','Les formations pour toi',[
      ['Comment sont choisies les formations ?','Je compare chaque formation publiée par un centre vérifié avec ton profil : lieu, modalité, public visé, financement et métier. Tu vois le pourcentage de correspondance et le détail critère par critère.'],
      ['Que veut dire le pourcentage ?','C\'est la part de tes critères que la formation respecte. Chaque critère est affiché avec ✓ ou ✗, pour que tu comprennes d\'un coup d\'œil ce qui colle et ce qui ne colle pas.'],
      ['Que se passe-t-il si je clique « Je suis intéressé(e) » ?','Tu écris au centre dans une messagerie protégée. C\'est toi qui envoies le premier message, et tu choisis ce que tu partages. Le centre peut ensuite te répondre dans cette conversation.'],
      ['Un centre peut-il me contacter le premier ?','Non, jamais. C\'est un principe de CareerPulse et une obligation légale : le démarchage lié au CPF est interdit. Ici, seul toi peux ouvrir une conversation.'],
      ['« Pas pour moi », ça fait quoi ?','La formation disparaît de tes recommandations. Le centre n\'en sait rien : aucune information ne lui est envoyée.'],
      ['Combien de formations vais-je voir ?','Ça dépend des centres inscrits et de ton projet : je ne peux pas te promettre un nombre. Les centres vérifiés rejoignent CareerPulse au fil de leur inscription.'],
      ['Je ne vois aucune formation','Vérifie que « Me recommander des formations » est activé et que ton profil est complet. Si rien ne correspond encore, une notification t\'attendra dans ton espace dès qu\'une formation te correspond.'],
      ['La mise en relation est-elle payante ?','Non, elle est gratuite pour toi. La formation elle-même peut avoir un coût : c\'est là que les pistes de financement entrent en jeu.']
    ]],
    ['secu','Contact & sécurité',[
      ['Mon e-mail est-il donné aux organismes ?','Jamais. Ni ton e-mail, ni ton téléphone. Si une formation t\'intéresse, je t\'affiche les coordonnées de l\'organisme, et c\'est toi qui décides de lui écrire.'],
      ['Pourquoi c\'est moi qui contacte l\'organisme ?','Pour que tu gardes la main, et parce que le démarchage lié au CPF est interdit en France. Ici, aucun organisme ne peut t\'appeler sans que tu l\'aies choisi.'],
      ['On m\'appelle pour mon CPF sans que j\'aie rien demandé','Méfie-toi : le démarchage lié au CPF est interdit. Ne donne aucune information, raccroche, et ne valide jamais une inscription sous la pression.'],
      ['On me demande mes identifiants CPF','Ne les donne jamais, à personne : ni ton mot de passe, ni un code reçu par SMS. Aucun organisme sérieux n\'en a besoin, et je ne te les demanderai jamais.'],
      ['Comment reconnaître une arnaque à la formation ?','Les signaux d\'alerte : appel ou SMS non sollicité, pression pour s\'inscrire vite, cadeau promis, demande d\'identifiants. Dans le doute, ne fais rien et vérifie sur les sites officiels.'],
      ['Comment savoir si un organisme est sérieux ?','Sur CareerPulse, chaque organisme est vérifié (SIRET, déclaration d\'activité). Pour une formation financée par des fonds publics, vérifie aussi qu\'il est certifié Qualiopi.'],
      ['Une formation me paraît suspecte','Ne partage aucune information sensible, ni identifiant, ni paiement. Clique sur « Signaler » dans la fiche de la formation : CareerPulse examine chaque signalement.']
    ]],
    ['fin','Financer ma formation',[
      ['Comment fonctionne le CPF ?','Le CPF permet de financer certaines formations éligibles, selon tes droits. Les règles se vérifient sur le site officiel Mon Compte Formation. Je ne te demanderai jamais ton mot de passe.'],
      ['Mon CPF paie toute ma formation ?','Pas forcément : cela dépend de l\'éligibilité de la formation et de tes droits. Depuis le 1er avril 2026, une participation obligatoire de 150 € s\'applique dans la plupart des cas. Vérifie sur Mon Compte Formation.'],
      ['Comment connaître mon solde CPF ?','Connecte-toi toi-même sur le site ou l\'application officielle Mon Compte Formation. Ton solde y est affiché. Ne passe jamais par un lien reçu par SMS ou e-mail.'],
      ['Ma formation n\'est pas éligible au CPF','D\'autres pistes peuvent exister selon ta situation : ton employeur, ton OPCO, France Travail, ta Région ou un autofinancement. Demande à l\'organisme quelles options il connaît.'],
      ['Je suis demandeur d\'emploi','Plusieurs pistes peuvent exister selon ta situation, notamment le CPF et certaines aides de France Travail. L\'AIF peut compléter ou financer certaines formations, sous conditions. Parles-en à ton conseiller France Travail.'],
      ['C\'est quoi l\'AIF ?','L\'Aide individuelle à la formation est une aide de France Travail pour les demandeurs d\'emploi, sous conditions : la formation doit être cohérente avec ton projet, quand les autres financements ne suffisent pas.'],
      ['Je suis salarié(e), quelles pistes ?','Ton CPF, le plan de développement des compétences de ton entreprise (demande à ton employeur ou à ton service RH) et, pour changer de métier, le projet de transition professionnelle.'],
      ['C\'est quoi le CPF de transition ?','Le projet de transition professionnelle permet, sous conditions, à un salarié de s\'absenter pour suivre une formation certifiante afin de changer de métier, tout en étant rémunéré.'],
      ['Je suis indépendant(e) ou freelance','Tu peux mobiliser ton CPF, et aussi le fonds d\'assurance formation (FAF) lié à ton activité : tu y cotises via tes charges. Renseigne-toi auprès du FAF de ta profession.'],
      ['C\'est quoi un OPCO ?','Un opérateur de compétences : il aide les entreprises de son secteur à financer la formation de leurs salariés, notamment l\'alternance. C\'est en général ton employeur qui fait la démarche.'],
      ['La Région peut-elle financer ma formation ?','Oui, certaines Régions financent des formations, surtout pour les demandeurs d\'emploi et les métiers qui recrutent. Les dispositifs changent selon la Région : renseigne-toi auprès de France Travail ou du site de ta Région.'],
      ['Je peux cumuler plusieurs financements ?','Souvent oui : par exemple, ton CPF peut être complété par ton employeur, France Travail ou une autre aide. Chaque financeur garde ses propres règles.'],
      ['EVA peut garantir mon financement ?','Non, et je préfère être honnête : je t\'aide à comprendre les pistes possibles, mais seul le financeur décide d\'accepter ta demande.']
    ]],
    ['choix','Choisir ma formation',[
      ['Je ne sais pas quelle formation choisir','Commence par ton objectif : le métier visé, les compétences à acquérir, la durée et la modalité. C\'est exactement ce que ton profil t\'aide à clarifier, étape par étape.'],
      ['Certifiante, diplôme, titre pro : quelle différence ?','Un diplôme est délivré par l\'État ou un établissement d\'enseignement, un titre professionnel par le ministère du Travail, et une certification atteste une compétence précise. Tous peuvent être reconnus par l\'État s\'ils sont enregistrés officiellement.'],
      ['C\'est quoi le RNCP ?','Le Répertoire national des certifications professionnelles recense les diplômes, titres et certifications reconnus par l\'État. Une formation qui y mène est souvent plus facile à faire financer.'],
      ['C\'est quoi la VAE ?','La validation des acquis de l\'expérience permet d\'obtenir tout ou partie d\'un diplôme grâce à ton expérience, professionnelle ou bénévole, sans refaire toute une formation.'],
      ['C\'est quoi un bilan de compétences ?','Un accompagnement pour faire le point sur tes compétences, tes envies et ton projet. Il peut t\'aider à choisir une direction avant de te lancer dans une formation.'],
      ['L\'alternance, c\'est pour moi ?','L\'alternance mêle cours et travail en entreprise, avec un salaire. Elle convient bien si tu veux apprendre un métier en pratiquant : il faut trouver une entreprise qui t\'accueille.'],
      ['Présentiel, distance ou hybride ?','Le présentiel aide à rester motivé(e) et à échanger, la distance offre de la souplesse, l\'hybride combine les deux. Choisis selon ton emploi du temps et ta façon d\'apprendre.'],
      ['Quelles questions poser à un organisme ?','Demande quel diplôme ou certification tu obtiens, le rythme, le coût total, les financements possibles, le taux de réussite et l\'accompagnement proposé. Un organisme sérieux répond clairement.']
    ]]
  ];
  var FAQ=[]; FAQ_T.forEach(function(t){ t[2].forEach(function(q){ FAQ.push(q); }); });
  function faqRef(t){ for(var i=0;i<FAQ.length;i++) if(FAQ[i][0]===t) return FAQ[i][1]; return ''; }
  function faqNode(){
    var n=el('div','ofq','<div class="ofq-hd"><span class="ofw-av">'+X().S(X().IC.eva)+'</span><div><b>EVA Formation</b><span>Je t\'aide à comprendre la mise en relation et les financements de formation.</span></div></div>'
      +'<div class="ofq-intro"></div><div class="ofq-tabs" role="tablist"></div><div class="ofq-list"></div>'
      +'<p class="ofq-ft">Je ne remplace pas France Travail, ton employeur, ton OPCO ou un organisme de formation : pour une décision de financement, vérifie toujours les conditions officielles.</p>');
    var tabs=n.querySelector('.ofq-tabs'), list=n.querySelector('.ofq-list'), cache={}, cur=null;
    n.querySelector('.ofq-intro').innerHTML='<div class="ofw-eva"><span class="ofw-av">'+X().S(X().IC.eva)+'</span><div class="ofw-b">👋 Salut ! Je suis <b>EVA</b>. Choisis un thème, puis ouvre la question qui t\'intéresse : je te réponds juste en dessous.</div></div>';
    function type(b,html){
      var parts=md(html).split(/(<[^>]+>|\s+)/).filter(function(x){ return x!==''; }), i=0, out='';
      (function tick(){ if(!b.isConnected) return; if(i>=parts.length){ b.innerHTML=out; return; } var p=parts[i++]; out+=p; b.innerHTML=out+'<span class="evh-caret"></span>'; setTimeout(tick,/^</.test(p)||/^\s+$/.test(p)?0:16+Math.random()*12); })();
    }
    function openItem(it,q){
      var was=it.classList.contains('on');
      list.querySelectorAll('.ofq-it.on').forEach(function(x){ x.classList.remove('on'); x.querySelector('.ofq-q').setAttribute('aria-expanded','false'); });
      if(was) return;
      it.classList.add('on'); it.querySelector('.ofq-q').setAttribute('aria-expanded','true');
      var b=it.querySelector('.ofq-a .ofw-b');
      if(cache[q]){ b.innerHTML=md(cache[q]); return; }
      if(b.getAttribute('data-load')) return;
      b.setAttribute('data-load','1'); b.innerHTML='<span class="evh-typing"><span></span><span></span><span></span></span>';
      aiAnswer(q).then(function(res){ cache[q]=res.reply; b.removeAttribute('data-load'); type(b,res.reply); });
    }
    function showTheme(k){
      cur=k; tabs.querySelectorAll('button').forEach(function(x){ var on=x.getAttribute('data-k')===k; x.classList.toggle('on',on); x.setAttribute('aria-selected',on?'true':'false'); });
      var t=FAQ_T.filter(function(x){ return x[0]===k; })[0]; list.innerHTML='';
      t[2].forEach(function(q){
        var it=el('div','ofq-it','<button type="button" class="ofq-q" aria-expanded="false"><span>'+esc(q[0])+'</span>'+S('<path d="m6 9 6 6 6-6"/>')+'</button><div class="ofq-a"><div class="ofq-in"><div class="ofw-eva"><span class="ofw-av">'+X().S(X().IC.eva)+'</span><div class="ofw-b"></div></div></div></div>');
        it.querySelector('.ofq-q').onclick=function(){ openItem(it,q[0]); };
        list.appendChild(it);
      });
    }
    FAQ_T.forEach(function(t){ var b=el('button','ofq-tab',esc(t[1])+' <i>'+t[2].length+'</i>'); b.type='button'; b.setAttribute('role','tab'); b.setAttribute('data-k',t[0]); b.onclick=function(){ if(cur!==t[0]) showTheme(t[0]); }; tabs.appendChild(b); });
    showTheme(FAQ_T[0][0]);
    return n;
  }
  function aiAnswer(topic){
    var ref=faqRef(topic), A=PROF||{}, list=FAQ.map(function(x){ return x[0]; });
    var sys='Tu es EVA Formation, l\'assistante de CareerPulse pour la mise en relation entre les membres et des organismes de formation. Tu tutoies. Ton : chaleureux, humain, rassurant, précis, jamais infantilisant. Efficace : pas de blabla, 2 à 4 phrases, 70 mots maximum.\n'
      +'FONCTIONNEMENT RÉEL (ne jamais le contredire) : le membre crée son profil avec EVA ; les centres de formation ne voient JAMAIS son profil ; les centres vérifiés publient des fiches formation ; EVA recommande au membre les formations qui lui correspondent avec un pourcentage de correspondance expliqué ; si une formation l\'intéresse, c\'est le membre qui écrit le premier au centre dans une messagerie protégée de CareerPulse et il choisit ce qu\'il partage ; un centre ne peut jamais contacter un membre le premier (interdiction du démarchage CPF) ; les infos CPF du membre ne sont jamais transmises.\n'
      +'INTERDITS : garantir un financement, une admission ou un emploi ; inventer un organisme, une certification, une règle ou un chiffre ; demander un mot de passe ou des identifiants (Mon Compte Formation, France Travail) ; prétendre contacter quelqu\'un ou avoir vérifié un dossier. Pour les financements, renvoie vers les sites officiels.\n'
      +'RÉPONSE DE RÉFÉRENCE (respecte-la sur le fond, reformule-la avec ta personnalité) : '+ref+'\n'
      +(A.situation||A.metier?'Profil du membre : '+[A.situation,A.objectif,A.metier].filter(Boolean).join(', ')+'.\n':'')
      +'Réponds UNIQUEMENT en JSON : {"reply":"…","next":["…","…","…"]}. **gras** autorisé. "next" = 3 sujets choisis EXACTEMENT dans cette liste : '+JSON.stringify(list);
    var fb={ reply:ref, next:[] };
    return Promise.race([
      fetch('/api/eva',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:350, system:sys, messages:[{ role:'user', content:topic }] }) })
        .then(function(r){ return r.json(); }).then(function(d){
          var raw=(d && d.content && d.content[0] && d.content[0].text)||'', m=raw.replace(/```json|```/g,'').match(/\{[\s\S]*\}/); if(!m) return fb;
          var p=JSON.parse(m[0]); if(!p.reply || String(p.reply).length<20) return fb;
          if(/mot de passe|garanti[es]? (ton|votre|le) financement/i.test(p.reply) && !/jamais|ne garanti/i.test(p.reply)) return fb;
          return { reply:String(p.reply).slice(0,600), next:(p.next||[]).filter(function(x){ return list.indexOf(x)>-1; }) };
        }),
      new Promise(function(r){ setTimeout(function(){ r(fb); },8000); })
    ]).catch(function(){ return fb; });
  }
  function val(id){ var e=document.getElementById(id); return e ? e.value.trim() : ''; }

  /* ── Vue ORGANISME (version test, avant la phase 2) ──
     Accès réservé aux organismes validés par CareerPulse (verifie + proActif, posés dans la console Firebase).
     L'organisme voit la page de présentation anonymisée, envoie ses informations ; il ne reçoit jamais les coordonnées du candidat. */
  var TABS=[['cands','Candidats',I.users],['search','Rechercher',I.search],['match','Mes formations',I.book],['props','Propositions',I.send],['org','Mon organisme',I.school]];
  var STAT_MAP={ 'Salarié(e)':'salarie', 'Demandeur(se) d\'emploi':'demandeur', 'Étudiant(e)':'etudiant', 'Alternant(e)':'etudiant', 'Indépendant(e) / freelance':'freelance', 'Entrepreneur(e)':'freelance', 'En reconversion':'reconversion' };
  function adapt(d){ return { uid:d.uid, raw:d, prenom:d.prenom||d.ref, ville:d.ville, titre:d.metier, secteur:(d.secteurs||[]).join(' '), competences:d.competences,
    projet:[d.metier,d.objectif,d.precise,(d.secteurs||[]).join(' '),(d.types||[]).join(' ')].filter(Boolean).join(' '), statut:STAT_MAP[d.situation]||'',
    dispo:(d.dispo==='Immédiatement'||d.dispo==='Dans le mois')?'immediate':d.dispo==='Dans 1 à 3 mois'?'1-3':'plus' }; }
  function loadCands(){ return db().collection('candidats_of').where('visible','==',true).limit(300).get().then(function(q){ ST.cands=q.docs.map(function(d){ return adapt(d.data()); }); }); }
  /* Les organismes ont leur propre espace : pro.html (Espace pros) */
  function renderOrgMoved(){
    var o=ST.org||{};
    root.innerHTML='<div class="ofs" style="max-width:560px;margin:0 auto"><div class="of-card" style="padding:22px">'
      +'<div class="ofs-hd"><span class="ofs-av">'+S(I.school)+'</span><div><b>'+esc(o.nom||'Votre organisme')+'</b><span>Espace centre de formation</span></div></div>'
      +'<p class="of-muted" style="margin:14px 0 16px;line-height:1.55">EVA accompagne les candidats. Votre espace centre de formation se trouve désormais dans l\'Espace pros de CareerPulse : candidats visibles, recherche, propositions et fiche organisme.</p>'
      +'<a class="of-btn pri" href="index.html#pro-centre" style="text-decoration:none;width:100%">Ouvrir mon espace centre</a></div></div>';
  }
  function renderOrg(){
    var o=ST.org||{};
    if(!(o.verifie && o.proActif)){
      root.innerHTML='<div class="ofs" style="max-width:640px;margin:0 auto"><div class="ofs-hd"><span class="ofs-av">'+S(I.school)+'</span><div><b>'+esc(o.nom||'Votre organisme')+'</b><span>Espace organisme</span></div><em>En attente</em></div><p class="of-muted">Votre organisme est <b>en attente de validation</b> par CareerPulse. Dès la validation, vous accéderez aux profils des candidats qui ont choisi d\'être visibles.</p></div>';
      return;
    }
    root.innerHTML='<div class="of-empty">'+S(I.users)+'Chargement des candidats…</div>';
    Promise.all([loadCands(), loadPropsOrg()]).then(drawOrg).catch(function(x){ err(x); drawOrg(); });
  }
  function drawOrg(){
    var o=ST.org||{};
    var h=hero('EVA Pro · '+esc(o.nom||'Espace organisme'),'Espace organisme de formation','Vous voyez la page de présentation des candidats qui ont choisi d\'être visibles. Vous leur envoyez vos informations : <b>c\'est le candidat qui décide de vous contacter</b>. Ses coordonnées ne vous sont jamais communiquées.');
    h+='<div class="of-tabs">'+TABS.map(function(t){ var n=t[0]==='props'?ST.props.length:t[0]==='cands'?ST.cands.length:0; return '<button data-tab="'+t[0]+'" class="'+(ST.tab===t[0]?'on':'')+'">'+S(t[2])+t[1]+(n?' <span class="n">'+n+'</span>':'')+'</button>'; }).join('')+'</div><div id="of-tab"></div>';
    root.innerHTML=h; root.onclick=orgClick; root.onchange=null;
    drawTab();
  }
  function hero(k,t,p){ return '<div class="of-hero"><div class="k">'+k+'</div><h3>'+t+'</h3><p>'+p+'</p></div>'; }
  function formOpts(){ var fs=(ST.org&&ST.org.formations)||[]; return fs.map(function(f){ return '<option value="'+f.id+'">'+esc(f.titre)+' — '+esc(f.ville)+'</option>'; }).join(''); }
  function candCard(c,extra){
    var fs=(ST.org&&ST.org.formations)||[], best=null;
    fs.forEach(function(f){ var m=match(c,f); if(!best || m.pct>best.m.pct) best={ f:f, m:m }; });
    var m=extra&&extra.m ? extra.m : (best&&best.m), why=extra&&extra.why ? extra.why : (m&&m.why)||[];
    var sent=ST.props.filter(function(p){ return p.candUid===c.uid; });
    var h='<div class="of-cw" data-c="'+esc(c.uid)+'">'+presPage(c.raw,{ badge:m?'<span>Correspondance '+m.pct+' %</span>':'' });
    h+='<div class="ofs of-act">';
    if(m) h+='<div class="of-score"><div class="of-bar"><i style="width:'+m.pct+'%"></i></div><div class="of-pct">'+m.pct+' %</div></div><div class="of-muted" style="font-size:.66rem">'+(extra&&extra.label?extra.label:(best?'Meilleure correspondance : '+esc(best.f.titre):''))+'</div>'
      +(why.length?'<ul class="of-why">'+why.map(function(w){ return '<li class="'+w[0]+'"><b>'+(w[0]==='y'?'✓':'!')+'</b><span>'+w[1]+'</span></li>'; }).join('')+'</ul>':'');
    if(!c.raw.propositions) h+='<p class="of-muted">Ce candidat est visible mais n\'accepte pas de propositions pour le moment.</p>';
    else if(!fs.length) h+='<p class="of-muted">Ajoutez une formation dans « Mes formations » pour pouvoir présenter une formation.</p>';
    else if(!ST.org.email) h+='<p class="of-muted">Ajoutez l\'e-mail de contact de votre organisme dans « Mon organisme » : c\'est lui que le candidat utilisera pour vous écrire.</p>';
    else h+='<div class="of-f"><label>Formation à présenter<select data-sel>'+formOpts()+'</select></label><label>Votre message (1 000 caractères max)<textarea data-msg maxlength="1000" placeholder="Présentez votre formation : objectifs, rythme, débouchés. Pas de promesse de financement ni d\'admission."></textarea></label></div>'
      +'<div class="of-btns"><button class="of-btn pri" data-a="propose">'+S(I.send)+'Présenter cette formation</button></div>'
      +(sent.length?'<p class="of-muted" style="margin-top:8px">Déjà présenté : '+sent.map(function(p){ return esc((p.formation||{}).titre)+' ('+stOrg(p.statut)+')'; }).join(', ')+'</p>':'');
    return h+'</div></div>';
  }
  function stOrg(s){ return { envoyee:'en attente', interesse:'intéressé(e)', refusee:'pas intéressé(e)', signalee:'signalée' }[s]||s; }
  function drawTab(){
    var t=document.getElementById('of-tab'); if(!t) return; var h='', o=ST.org||{};
    if(ST.tab==='cands'){
      h=ST.cands.length ? ST.cands.map(function(c){ return candCard(c); }).join('') : '<div class="of-card"><div class="of-empty">'+S(I.users)+'Aucun candidat visible pour le moment.<br>Les candidats apparaissent ici dès qu\'ils choisissent d\'être visibles.</div></div>';
    } else if(ST.tab==='search'){
      h='<div class="of-card"><h4>'+S(I.search)+'Rechercher en une phrase</h4><div class="of-f of-search"><textarea id="of-q" placeholder="Ex : personnes en reconversion à Caen intéressées par le développement web.">'+esc(ST.lastQ)+'</textarea><button class="of-btn pri" data-a="go">'+S(I.search)+'Rechercher</button></div></div><div id="of-res"></div>';
    } else if(ST.tab==='match'){
      var fs=o.formations||[];
      h='<div class="of-card"><h4>'+S(I.book)+'Mes formations</h4>'+(fs.length?fs.map(function(f){ return '<div class="of-chips" style="margin:0 0 6px"><span style="font-size:.72rem">'+esc(f.titre)+' · '+esc(f.ville)+(f.modalite?' · '+esc(f.modalite):'')+'</span><button class="of-link" data-a="delf" data-f="'+f.id+'">Retirer</button></div>'; }).join(''):'<p class="of-muted">Aucune formation. Ajoutez votre première formation ci-dessous.</p>')
        +'<details style="margin-top:8px"'+(fs.length?'':' open')+'><summary class="of-link" style="list-style:none;cursor:pointer">+ Ajouter une formation</summary><div class="of-f" style="margin-top:10px"><div class="of-row"><label>Intitulé<input id="of-ft" placeholder="Ex : Développeur web et web mobile"></label><label>Ville (ou « À distance »)<input id="of-fv" placeholder="Ex : Caen"></label></div>'
        +'<div class="of-row"><label>Modalité<select id="of-fm"><option>Présentiel</option><option>Distanciel</option><option>Hybride</option></select></label><label>Durée<input id="of-fdu" placeholder="Ex : 9 mois"></label></div>'
        +'<div class="of-row"><label>Début<input id="of-fdb" placeholder="Ex : Janvier 2027"></label><label>Financements possibles<input id="of-ffi" placeholder="Ex : CPF, France Travail"></label></div>'
        +'<label>Domaine et mots-clés<input id="of-fd" placeholder="Ex : développement web, informatique"></label>'
        +'<label>Public visé</label><div class="of-chips" id="of-fp">'+STATUTS.map(function(s){ return '<label style="display:inline-flex;gap:5px;align-items:center;font-size:.72rem;font-weight:600"><input type="checkbox" value="'+s[0]+'" style="width:auto">'+s[1]+'</label>'; }).join('')+'</div>'
        +'<label>Description<textarea id="of-fdesc" placeholder="Objectifs, contenu, débouchés…"></textarea></label><div class="of-btns"><button class="of-btn pri" data-a="addf">'+S(I.plus)+'Ajouter la formation</button></div></div></details></div>';
      if(fs.length){ var f=fs.filter(function(x){ return x.id===ST.matchF; })[0]||fs[0]; ST.matchF=f.id;
        h+='<div class="of-card"><h4>'+S(I.target)+'Correspondance avec mes formations</h4><div class="of-sel" style="margin-top:0"><select id="of-mf">'+fs.map(function(x){ return '<option value="'+x.id+'"'+(x.id===f.id?' selected':'')+'>'+esc(x.titre)+' — '+esc(x.ville)+'</option>'; }).join('')+'</select></div><p class="of-muted" style="margin-top:8px">EVA compare chaque candidat visible avec cette formation : projet, ville, public visé et disponibilité.</p></div>';
        var list=ST.cands.map(function(c){ return { c:c, m:match(c,f) }; }).sort(function(a,b){ return b.m.pct-a.m.pct; });
        h+=list.length?list.map(function(x){ return candCard(x.c,{ m:x.m, why:x.m.why, label:'Correspondance avec '+esc(f.titre) }); }).join(''):'<div class="of-card"><div class="of-empty">'+S(I.users)+'Aucun candidat visible pour le moment.</div></div>';
      }
    } else if(ST.tab==='props'){
      h=ST.props.length ? ST.props.map(function(p){ var f=p.formation||{};
        return '<div class="of-card"><div class="of-name">'+esc(p.candRef||'Candidat')+' · '+esc(f.titre)+'</div><div class="of-btns" style="margin-top:8px"><span class="of-st '+(p.statut==='interesse'?'acceptee':p.statut==='envoyee'?'envoyee':'refusee')+'">'+(p.statut==='envoyee'?'En attente de réponse':p.statut==='interesse'?'Intéressé(e)':p.statut==='signalee'?'Signalée':'Pas intéressé(e)')+'</span></div>'
          +(p.statut==='interesse'?'<div class="of-contact">Le candidat a reçu vos coordonnées. <b>S\'il le souhaite, il vous contactera directement.</b></div>':'')+'</div>'; }).join('')
        : '<div class="of-card"><div class="of-empty">'+S(I.send)+'Aucune formation présentée pour le moment.</div></div>';
    } else if(ST.tab==='org'){
      h='<div class="of-card"><h4>'+S(I.school)+'Mon organisme</h4><p class="of-muted" style="margin:0 0 10px">Ces coordonnées sont montrées au candidat <b>uniquement</b> s\'il se déclare intéressé par votre formation.</p><div class="of-f">'
        +'<div class="of-row"><label>Nom de l\'organisme<input id="of-onom" value="'+esc(o.nom||'')+'"></label><label>Ville<input id="of-oville" value="'+esc(o.ville||'')+'"></label></div>'
        +'<div class="of-row"><label>E-mail de contact<input id="of-omail" type="email" value="'+esc(o.email||'')+'"></label><label>Téléphone<input id="of-otel" value="'+esc(o.tel||'')+'"></label></div>'
        +'<label>Site internet<input id="of-osite" value="'+esc(o.site||'')+'" placeholder="www.mon-organisme.fr"></label>'
        +'<div class="of-btns"><button class="of-btn pri" data-a="saveorg">'+S(I.check)+'Enregistrer</button></div></div></div>';
    }
    t.innerHTML=h;
    if(ST.tab==='match'){ var fsel=document.getElementById('of-mf'); if(fsel) fsel.onchange=function(){ ST.matchF=fsel.value; drawTab(); };
      t.querySelectorAll('[data-sel]').forEach(function(s){ if(ST.matchF) s.value=ST.matchF; }); }
    if(ST.tab==='search' && ST.lastQ) runSearch();
  }
  function runSearch(){
    var q=ST.lastQ, out=document.getElementById('of-res'); if(!out) return;
    var r=search(q,ST.cands), c=r.crit;
    var crit=[]; if(c.statut) crit.push(stLabel(c.statut)); c.villes.forEach(function(v){ crit.push(v.replace(/\b\w/g,function(x){return x.toUpperCase();})); }); if(c.dom.length) crit.push(c.dom.join(', '));
    out.innerHTML='<div class="of-card" style="box-shadow:none"><div class="of-muted">EVA a compris : <b>'+(crit.length?esc(crit.join(' · ')):'tous les candidats')+'</b> — '+r.res.length+' résultat'+(r.res.length>1?'s':'')+'.</div></div>'
      +(r.res.length?r.res.map(function(x){ return candCard(x.c,{ m:{ pct:x.pct }, why:x.why, label:'Pertinence par rapport à votre recherche' }); }).join(''):'<div class="of-card"><div class="of-empty">'+S(I.search)+'Aucun candidat ne correspond exactement. Essayez une recherche plus large.</div></div>');
  }
  function orgClick(e){
    var tb=e.target.closest('[data-tab]'); if(tb){ ST.tab=tb.getAttribute('data-tab'); root.querySelectorAll('.of-tabs button').forEach(function(b){ b.classList.toggle('on',b===tb); }); drawTab(); return; }
    var b=e.target.closest('[data-a]'); if(!b) return; var a=b.getAttribute('data-a'), ref=db().collection('organismes').doc(user().uid);
    if(a==='go'){ ST.lastQ=val('of-q'); if(!ST.lastQ){ toast('Écrivez votre recherche en une phrase'); return; } runSearch(); }
    else if(a==='saveorg'){
      var o={ nom:val('of-onom'), ville:val('of-oville'), email:val('of-omail'), tel:val('of-otel'), site:val('of-osite') };
      if(!o.nom || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email)){ toast('Indiquez le nom de l\'organisme et un e-mail de contact valide'); return; }
      b.disabled=true; ref.set(o,{merge:true}).then(function(){ Object.assign(ST.org,o); toast('Coordonnées enregistrées'); b.disabled=false; }).catch(function(x){ b.disabled=false; err(x); });
    }
    else if(a==='addf'){
      var f={ id:uid(), titre:val('of-ft'), ville:val('of-fv'), modalite:val('of-fm'), duree:val('of-fdu'), debut:val('of-fdb'), financement:val('of-ffi'), domaine:val('of-fd'), motscles:val('of-fd'), description:val('of-fdesc'), publics:[].map.call(document.querySelectorAll('#of-fp input:checked'),function(i){ return i.value; }) };
      if(!f.titre || !f.ville){ toast('Indiquez au moins l\'intitulé et la ville'); return; }
      var fs=((ST.org&&ST.org.formations)||[]).concat([f]); b.disabled=true;
      ref.set({ formations:fs },{merge:true}).then(function(){ ST.org.formations=fs; ST.matchF=f.id; toast('Formation ajoutée'); drawTab(); }).catch(function(x){ b.disabled=false; err(x); });
    } else if(a==='delf'){
      var id=b.getAttribute('data-f'), fs2=(ST.org.formations||[]).filter(function(x){ return x.id!==id; });
      ref.set({ formations:fs2 },{merge:true}).then(function(){ ST.org.formations=fs2; drawTab(); }).catch(err);
    } else if(a==='propose'){
      var card=b.closest('[data-c]'), cu=card.getAttribute('data-c'), sel=card.querySelector('[data-sel]'), msg=(card.querySelector('[data-msg]')||{}).value||'', f2=(ST.org.formations||[]).filter(function(x){ return x.id===sel.value; })[0];
      var c=ST.cands.filter(function(x){ return x.uid===cu; })[0]; if(!f2||!c) return;
      if(ST.props.some(function(p){ return p.candUid===cu && (p.formation||{}).id===f2.id; })){ toast('Cette formation a déjà été présentée à ce candidat'); return; }
      b.disabled=true;
      var O=ST.org, m=match(c,f2), p={ orgUid:user().uid, orgNom:O.nom||'', orgEmail:O.email||'', orgTel:O.tel||'', orgSite:O.site||'', orgVerifie:true, candUid:cu, candRef:c.raw.ref||'',
        formation:{ id:f2.id, titre:f2.titre, ville:f2.ville, modalite:f2.modalite||'', duree:f2.duree||'', debut:f2.debut||'', financement:f2.financement||'', description:f2.description||'' }, message:String(msg).trim().slice(0,1000), score:m.pct, statut:'envoyee', createdAt:new Date().toISOString() };
      db().collection('propositions').add(p).then(function(r){ p.id=r.id; ST.props.unshift(p); toast('Formation présentée au candidat '+(c.raw.ref||'')); b.innerHTML=S(I.check)+'Formation présentée'; }).catch(function(x){ b.disabled=false; err(x); });
    }
  }

  /* Pastille « propositions en attente » dans la navigation du candidat */
  function badge(){
    var u=user(); if(!u || !db() || ST.role==='org') return;
    var n=ST.props.filter(function(p){ return p.statut==='envoyee'; }).length;
    document.querySelectorAll('#eva-side [data-go="eva-of"]').forEach(function(b){ var x=b.querySelector('.of-badge'); if(!x){ x=el('span','of-badge'); b.appendChild(x); } x.textContent=n; x.style.display=n?'':'none'; });
  }
  function checkInbox(){
    var u=user(); if(!u || !db()) return;
    db().collection('propositions').where('candUid','==',u.uid).where('statut','==','envoyee').get().then(function(q){
      ST.props=q.docs.map(function(d){ var x=d.data(); x.id=d.id; return x; }); badge();
      if(q.size && !sessionStorage.getItem('of-notified')){ sessionStorage.setItem('of-notified','1'); toast('Nouvelle réponse à tes demandes : ouvre « Organismes de formation »'); }
    }).catch(function(){});
  }
  /* Branchement : rendu à l'ouverture de la page */
  var was=false;
  function tick(){ var s=document.getElementById('s-eva-of'); var on=s && s.classList.contains('active'); if(on && !was) render(); was=!!on; }
  function init(){
    try{ new MutationObserver(function(){ clearTimeout(window._ofT); window._ofT=setTimeout(tick,40); }).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']}); }catch(e){}
    var n=0; (function wait(){ if(user() && db()){ checkInbox(); return; } if(++n<40) setTimeout(wait,500); })();
    tick();
  }
  if(document.readyState!=='loading') setTimeout(init,0); else document.addEventListener('DOMContentLoaded',init);
  window.cpOfRender=render;
})();
(function(){ function sync(){ var a=document.querySelector('.evad-screen.active,.nova-screen.active,.eva-subpage.active,#s-eva.active'); document.documentElement.classList.toggle('cp-eva-on', !!a); }
  if(document.readyState!=='loading') setTimeout(sync,0); else document.addEventListener('DOMContentLoaded',function(){ setTimeout(sync,0); }); window.addEventListener('load',sync); })();
