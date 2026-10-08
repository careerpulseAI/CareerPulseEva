
// ── State minimal ──
var S = {
  plan: (localStorage.getItem('cp_plan')||'free'),
  email: (localStorage.getItem('cp_email')||''),
  name: (localStorage.getItem('cp_name')||''),
  scores: (function(){ try{ var v=localStorage.getItem('cp_scores'); return v?JSON.parse(v):null; }catch(e){ return null; } })(),
  profile: (function(){ try{ var v=localStorage.getItem('cp_profile'); return v?JSON.parse(v):{name:'',headline:'',loc:'',email:'',tel:'',linkedin:'',sector:'',about:'',salary:'',experiences:[],education:[],skills:[],certifications:[],languages:[]}; }catch(e){ return {name:'',headline:'',loc:'',email:'',tel:'',linkedin:'',sector:'',about:'',salary:'',experiences:[],education:[],skills:[],certifications:[],languages:[]}; } })(),
  visible: (localStorage.getItem('cp_visible')==='true'),
  openToWork: (localStorage.getItem('cp_otw')==='true'),
};
function ls(k,d){return localStorage.getItem(k)||d;}
function lsn(k,d){return parseInt(localStorage.getItem(k)||d);}
function lsj(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}}
function sv(k,v){localStorage.setItem(k,JSON.stringify(v));}

// ── Partage CareerPulse ──
function shareCareerPulse(platform){
  var url = 'https://careerpulseia.com';
  var msg = '🎯 Viens toi aussi tester nos quiz et profiter des services de notre site — bientôt encore plus ! 👉 ' + url;
  if(platform==='whatsapp'){
    window.location.href = 'whatsapp://send?text=' + encodeURIComponent(msg);
  } else if(platform==='telegram'){
    window.location.href = 'tg://msg?text=' + encodeURIComponent(msg);
  } else if(platform==='facebook'){
    window.location.href = 'fb://share?href=' + encodeURIComponent(url);
    setTimeout(function(){ window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(msg), '_blank'); }, 800);
  } else if(platform==='tiktok'){
    window.location.href = 'snssdk1233://user/profile/self';
    setTimeout(function(){ window.open('https://www.tiktok.com', '_blank'); }, 800);
    try{ navigator.clipboard.writeText(msg); }catch(e){}
    toast('Texte copié — colle-le sur TikTok 🎵');
  }
}

// ── Toast ──
function toast(msg,dur){
  dur=dur||2800;
  var t=document.getElementById('toast');
  t.textContent=msg;t.style.display='block';
  clearTimeout(t._t);t._t=setTimeout(function(){t.style.display='none';},dur);
}

// ── Copie le lien CareerPulse dans le presse-papier (carte résultat quiz) ──
function copierLienCP(el, txt){
  try {
    navigator.clipboard.writeText(txt).then(function(){
      // Feedback visuel : icône ✓ vert pendant 2s
      var svgEl = el.querySelector('svg');
      var spanEl = el.querySelector('span');
      var oldBorder = el.style.border;
      el.style.borderColor = '#059669';
      el.style.background = 'linear-gradient(135deg,#f0fdf4,#dcfce7)';
      if(svgEl) svgEl.style.display = 'none';
      if(spanEl){ spanEl.textContent = '✓'; spanEl.style.fontSize = '1rem'; spanEl.style.color = '#059669'; }
      toast('Lien copié ! Colle-le dans n\'importe quelle app pour partager 📋');
      setTimeout(function(){
        el.style.borderColor = '';
        el.style.background = '';
        if(svgEl) svgEl.style.display = '';
        if(spanEl){ spanEl.textContent = 'Copier'; spanEl.style.fontSize = ''; }
      }, 2000);
    }).catch(function(){ fallbackCopy(txt); });
  } catch(e){ fallbackCopy(txt); }
}
function fallbackCopy(txt){
  var ta = document.createElement('textarea');
  ta.value = txt; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); toast('Lien copié ! 📋'); }catch(e){ toast('Copie manuelle : '+txt); }
  document.body.removeChild(ta);
}

// ── Navigation principale ──
function evadToggle(header){
  var body=header.parentElement.querySelector('.evad-article-body');
  var arr=header.querySelector('.evad-article-arr');
  var isOpen=body.classList.contains('open');
  // Fermer tous les autres articles du même parent
  var container=header.closest('.evad-body');
  if(container){
    container.querySelectorAll('.evad-article-body.open').forEach(function(b){b.classList.remove('open');});
    container.querySelectorAll('.evad-article-arr.open').forEach(function(a){a.classList.remove('open');});
  }
  if(!isOpen){body.classList.add('open');if(arr)arr.classList.add('open');}
}

function go(id){
  // Garde Eva — bloquer toute navigation si diagnostic en cours
  var evaScreen=document.getElementById('s-eva-coach');
  if(window._evaInSession && evaScreen && evaScreen.classList.contains('active') && id!=='eva-coach'){
    window._evaPendingNav=id;
    evaQuitterGuard();
    return;
  }
  // Stopper le stream Eva quiz si on quitte une page résultat
  (function(){
    var _qr=['quiz-admin-result','quiz-rh-result','quiz-rupture-result'];
    var _cur=document.querySelector('.screen.active');
    var _cid=_cur?_cur.id.replace('s-',''):'';
    if(_qr.indexOf(_cid)>-1 && _qr.indexOf(id)===-1){
      window._evaStreamAbort=true;
      try{ if(window._evaSndCtx) window._evaSndCtx.suspend(); }catch(e){}
    }
  })();
  document.querySelectorAll('.screen,.evad-screen,.nova-screen,.eva-subpage').forEach(function(s){s.classList.remove('active');});
  var sc=document.getElementById('s-'+id);
  if(sc){
    var isEvaPage=sc.classList.contains('evad-screen')||sc.classList.contains('nova-screen')||sc.classList.contains('eva-subpage')||sc.id==='s-eva';
    if(isEvaPage && id==='eva' && window.innerWidth<900){
      /* Retour à l'accueil EVA (mobile) : pas de fondu depuis 0, sinon la page CareerPulse transparaît */
      sc.style.transition='none'; sc.style.opacity='1'; sc.classList.add('active');
    } else if(isEvaPage){
      sc.style.opacity='0';
      sc.style.transition='opacity .35s ease';
      sc.classList.add('active');
      requestAnimationFrame(function(){requestAnimationFrame(function(){sc.style.opacity='1';});});
    } else {
      sc.classList.remove('page-visible');
      sc.classList.add('active');
      requestAnimationFrame(function(){requestAnimationFrame(function(){sc.classList.add('page-visible');});});
    }
  }
  // Mobile : la barre CareerPulse (#tnav, forcée visible en CSS) est masquée sur toutes les pages EVA,
  // sinon elle transparaît pendant les transitions de retour
  try{ document.documentElement.classList.toggle('cp-eva-on', !!(sc && (sc.classList.contains('evad-screen')||sc.classList.contains('nova-screen')||sc.classList.contains('eva-subpage')||sc.id==='s-eva'))); }catch(e){}
  scrollTo(0,0);
  // Cacher tnav/bnav quand Eva est actif (plein écran) ou sous-pages Eva
  var tnav=document.getElementById('tnav');
  var bnav=document.getElementById('bnav');
  var _evaScreens=['eva','eva-droits','eva-droits-list','eva-droits-article',
    'eva-methodes','eva-outils','eva-entretien','eva-workspace','eva-bienetre','eva-identity',
    'entretien-salarie','entretien-demandeur','entretien-reconversion','entretien-freelance',
    'entretien-salarie-result','entretien-demandeur-result','entretien-reconversion-result','entretien-freelance-result',
    'mise-situation-salarie','mise-situation-demandeur','mise-situation-reconversion','mise-situation-freelance',
    'mise-situation-salarie-result','mise-situation-demandeur-result','mise-situation-reconversion-result','mise-situation-freelance-result'];
  if(_evaScreens.indexOf(id)>-1){
    if(tnav) tnav.style.display='none';
    if(bnav) bnav.style.display='none';
    if(id==='eva') try{ ecInit(); }catch(e){}
    if(id==='eva-identity'){
      var _scAll=document.querySelectorAll('.evad-screen, .screen');
      _scAll.forEach(function(s){s.classList.remove('active');});
      var evaId=document.getElementById('s-eva-identity');
      if(evaId){evaId.classList.add('active');evaId.style.opacity='1';}
      return;
    }
  } else {
    if(tnav) tnav.style.display='';
    if(bnav) bnav.style.display='';
  }
  // Bouton maison dans header
  var homeBtn=document.getElementById('tnav-home-btn');
  if(homeBtn){
    homeBtn.style.display=(id==='home')?'none':'flex';
  }
  // Init quiz — écran intro prénom + chrono (une seule fois)
  if(id==='quiz-admin'){ if(!qadState.done&&!qadState.started) quizIntro(function(){ qadState.started=true; resetQuizAdmin(); renderQuizAdmin(); }); else if(qadState.started&&!qadState.done) renderQuizAdmin(); }
  if(id==='quiz-rh'){ if(!qrhState.done&&!qrhState.started) quizIntro(function(){ qrhState.started=true; resetQuizRH(); renderQuizRH(); }); else if(qrhState.started&&!qrhState.done) renderQuizRH(); }
  if(id==='quiz-rupture'){ if(!qruptState.done&&!qruptState.started) quizIntro(function(){ qruptState.started=true; resetQuizRupture(); renderQuizRupture(); }); else if(qruptState.started&&!qruptState.done) renderQuizRupture(); }
  if(id==='quiz-bulletin') openQuizPDF('bulletin');
  if(id==='quiz-droit') openQuizPDF('droit');
  if(id==='quiz-salaire') openQuizPDF('salaire');
  if(id==='quiz-entretien') openQuizPDF('entretien');
  // Init profil
  if(id==='profil'){ try{ updateFpScore(); loadFichePro(); }catch(e){} }
  // Init cvlettre
  if(id==='cvlettre'){ try{ initCVLettre(); }catch(e){} }
  // Init eva-coach
  if(id==='eva-coach'){ try{ ecInit(); }catch(e){} }
}

// ── Fiche Pro ──
var _fpVis = false;

function loadFichePro(){
  try{
    var d = JSON.parse(localStorage.getItem('cp_fiche_pro')||'{}');
    if(d.name) { var el=document.getElementById('fp-name'); if(el) el.value=d.name; }
    if(d.titre) { var el=document.getElementById('fp-titre'); if(el) el.value=d.titre; }
    if(d.secteur) { var el=document.getElementById('fp-secteur'); if(el) el.value=d.secteur; }
    if(d.ville) { var el=document.getElementById('fp-ville'); if(el) el.value=d.ville; }
    if(d.exp) { var el=document.getElementById('fp-exp'); if(el) el.value=d.exp; }
    if(d.salaire) { var el=document.getElementById('fp-salaire'); if(el) el.value=d.salaire; }
    if(d.accroche) { var el=document.getElementById('fp-accroche'); if(el) el.value=d.accroche; }
    updateFpScore();
  }catch(e){}
}

function toggleShare(type){
  var tog=document.getElementById('tog-share-'+type);
  var knob=document.getElementById('knob-share-'+type);
  var inp=document.getElementById('fp-share-'+type);
  if(!tog||!knob||!inp) return;
  var isOn=inp.value==='1';
  isOn=!isOn;
  inp.value=isOn?'1':'0';
  tog.style.background=isOn?'#059669':'#cbd5e1';
  knob.style.transform=isOn?'translateX(18px)':'none';
}
function getShareVal(type){
  var inp=document.getElementById('fp-share-'+type);
  return inp?inp.value==='1':false;
}
function setShareToggle(type,val){
  var tog=document.getElementById('tog-share-'+type);
  var knob=document.getElementById('knob-share-'+type);
  var inp=document.getElementById('fp-share-'+type);
  if(!tog||!knob||!inp) return;
  inp.value=val?'1':'0';
  tog.style.background=val?'#059669':'#cbd5e1';
  knob.style.transform=val?'translateX(18px)':'none';
}

function saveFichePro(){
  if(!cpRequireAccount()) return;
  var obligatoires = [
    {id:'fp-name', label:'Prénom & Nom'},
    {id:'fp-titre', label:'Titre professionnel'},
    {id:'fp-secteur', label:'Secteur'},
    {id:'fp-ville', label:'Ville / Remote'},
    {id:'fp-exp', label:'Expérience'},
    {id:'fp-salaire', label:'Salaire souhaité'},
    {id:'fp-accroche', label:'Accroche'}
  ];
  for(var i=0;i<obligatoires.length;i++){
    var el=document.getElementById(obligatoires[i].id);
    if(!el) continue;
    var val=(el.value||'').trim();
    if(!val){
      el.style.border='1.5px solid #dc2626';
      el.scrollIntoView({behavior:'smooth',block:'center'});
      ecShowToast('⚠️ '+obligatoires[i].label+' est obligatoire');
      return;
    }
    el.style.border='1.5px solid rgba(5,150,105,.2)';
  }
  var d = {
    name: (document.getElementById('fp-name')||{value:''}).value.trim(),
    titre: (document.getElementById('fp-titre')||{value:''}).value.trim(),
    secteur: (document.getElementById('fp-secteur')||{value:''}).value,
    ville: (document.getElementById('fp-ville')||{value:''}).value.trim(),
    exp: (document.getElementById('fp-exp')||{value:''}).value,
    salaire: (document.getElementById('fp-salaire')||{value:''}).value.trim(),
    accroche: (document.getElementById('fp-accroche')||{value:''}).value.trim(),
    emailPublic: (document.getElementById('fp-email-public')||{value:''}).value.trim(),
    telPublic: (document.getElementById('fp-tel-public')||{value:''}).value.trim(),
    shareEmail: getShareVal('email'),
    shareTel: getShareVal('tel'),
    shareCv: getShareVal('cv'),
    shareLm: getShareVal('lm'),
    updatedAt: new Date().toISOString()
  };
  // Sauvegarder en local (fallback)
  localStorage.setItem('cp_fiche_pro', JSON.stringify(d));
  // Sauvegarder dans Firestore si connecté
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(user && typeof fbDb !== 'undefined'){
    fbDb.collection('profils').doc(user.uid).set(d, {merge:true})
      .then(function(){ ecShowToast('✅ Profil sauvegardé dans le cloud !'); })
      .catch(function(e){ ecShowToast('Erreur cloud : ' + e.message); });
  } else {
    ecShowToast('✓ Fiche pro enregistrée localement');
  }
  updateFpScore();
}

function loadFicheProFromFirestore(){
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(!user || typeof fbDb === 'undefined') return;
  fbDb.collection('profils').doc(user.uid).get()
    .then(function(doc){
      if(doc.exists){
        var d = doc.data();
        if(d.name){ var el=document.getElementById('fp-name'); if(el) el.value=d.name; }
        if(d.titre){ var el=document.getElementById('fp-titre'); if(el) el.value=d.titre; }
        if(d.secteur){ var el=document.getElementById('fp-secteur'); if(el) el.value=d.secteur; }
        if(d.ville){ var el=document.getElementById('fp-ville'); if(el) el.value=d.ville; }
        if(d.exp){ var el=document.getElementById('fp-exp'); if(el) el.value=d.exp; }
        if(d.salaire){ var el=document.getElementById('fp-salaire'); if(el) el.value=d.salaire; }
        if(d.accroche){ var el=document.getElementById('fp-accroche'); if(el) el.value=d.accroche; }
        if(d.emailPublic){ var el=document.getElementById('fp-email-public'); if(el) el.value=d.emailPublic; }
        if(d.telPublic){ var el=document.getElementById('fp-tel-public'); if(el) el.value=d.telPublic; }
        if(d.shareEmail!==undefined) setShareToggle('email',d.shareEmail);
        if(d.shareTel!==undefined) setShareToggle('tel',d.shareTel);
        if(d.shareCv!==undefined) setShareToggle('cv',d.shareCv);
        if(d.shareLm!==undefined) setShareToggle('lm',d.shareLm);
        updateFpScore();
      }
    })
    .catch(function(e){ console.log('Firestore load error:', e); });
}

function toggleAccordion(id){
  var el=document.getElementById(id);
  var arrow=document.getElementById(id+'-arrow');
  if(!el) return;
  var open=el.style.display==='block';
  el.style.display=open?'none':'block';
  if(arrow) arrow.style.transform=open?'':'rotate(180deg)';
}
function showLetterGen(){
  var g=document.getElementById('letter-gen');
  var u=document.getElementById('letter-upl');
  if(g){ g.style.display=g.style.display==='none'?'block':'none'; }
  if(u){ u.style.display='none'; }
}
function showLetterUpload(){
  var g=document.getElementById('letter-gen');
  var u=document.getElementById('letter-upl');
  if(u){ u.style.display=u.style.display==='none'?'block':'none'; }
  if(g){ g.style.display='none'; }
}
function updateFpScore(){
  var criteria = [
    { id:'fp-secteur', pts:25, label:'Secteur', why:'Les recruteurs filtrent par secteur en priorité' },
    { id:'fp-titre', pts:20, label:'Titre pro', why:'Un titre percutant multiplie par 3 les vues' },
    { id:'fp-ville', pts:15, label:'Localisation', why:'Géolocalisation des offres et recruteurs' },
    { id:'fp-exp', pts:15, label:'Expérience', why:'Critère de tri automatique des candidatures' },
    { id:'fp-accroche', pts:15, label:'Accroche', why:'Augmente le taux de lecture de +60%' },
    { id:'fp-name', pts:10, label:'Identité', why:'Profil anonyme = 0 contact recruteur possible' },
  ];
  var score = 0;
  var missing = [];
  criteria.forEach(function(c){
    var el = document.getElementById(c.id);
    if(el && el.value && el.value.trim() !== ''){
      score += c.pts;
    } else {
      missing.push(c);
    }
  });
  var bar = document.getElementById('prof-score-bar');
  var pct = document.getElementById('prof-score-pct');
  if(bar) bar.style.width = score+'%';
  if(pct) pct.innerHTML = score+'<span style="font-size:.52rem;color:#94a3b8">/100</span>';

  var levelColor, levelLabel, advice;
  if(score >= 90){ levelLabel='Profil Excellent'; levelColor='#059669'; advice='Ton profil est optimisé — les recruteurs te trouveront en priorité.'; }
  else if(score >= 65){ levelLabel='Profil Visible'; levelColor='#d97706'; advice=missing.length?'Ajoute ton <strong style="color:#d97706">'+missing[0].label+'</strong> pour passer devant 80% des candidats.':''; }
  else if(score >= 35){ levelLabel='Profil Incomplet'; levelColor='#ea580c'; advice=missing.length?'<strong style="color:#ea580c">'+missing[0].label+'</strong> manquant — '+missing[0].why+'.':''; }
  else { levelLabel='Profil invisible'; levelColor='#dc2626'; advice='Complète ton profil pour apparaître dans les recherches recruteurs.'; }

  // Mettre à jour le dot et le label statut dans le CTA fusionné
  var dot = document.getElementById('prof-dot');
  var lbl = document.getElementById('prof-status-lbl');
  if(dot){ dot.style.background = levelColor; }
  if(lbl){ lbl.textContent = levelLabel; lbl.style.color = levelColor; }

  // Mettre à jour l'advice sous le titre
  var badge = document.getElementById('prof-score-badge');
  if(badge){
    var tagsHtml = (missing.length&&score<90) ? '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px">'+missing.slice(0,3).map(function(c){ return '<span style="font-size:.5rem;font-weight:700;background:rgba(5,150,105,.08);border:1px solid rgba(5,150,105,.2);border-radius:20px;padding:2px 8px;color:#059669">+ '+c.label+'</span>'; }).join('')+'</div>' : '';
    badge.innerHTML = '<span style="color:#64748b">'+advice+'</span>'+tagsHtml;
  }

  // Steps progression
  var nameOk = (function(){ var el=document.getElementById('fp-name'); return el&&el.value&&el.value.trim()!==''; })();
  var titreOk = (function(){ var el=document.getElementById('fp-titre'); return el&&el.value&&el.value.trim()!==''; })();
  var stepProfil = nameOk&&titreOk;
  var stepVisible = score>=65;
  ['hero-step-profil','hero-step-cv','hero-step-visible'].forEach(function(sid,i){
    var el=document.getElementById(sid); if(!el) return;
    var ok=[stepProfil,false,stepVisible][i];
    el.style.background=ok?'rgba(5,150,105,.35)':'#f1f5f9';
    el.style.borderColor=ok?'rgba(52,211,153,.7)':'#cbd5e1';
  });
}

function handleFpPhoto(input){
  if(!input.files||!input.files[0]) return;
  var file=input.files[0];
  if(file.size>5*1024*1024){ toast('Image trop lourde (max 5 Mo)'); return; }
  var r=new FileReader();
  r.onload=function(e){
    var av=document.getElementById('fp-avatar-wrap');
    if(av) av.innerHTML='<img src="'+e.target.result+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
    toast('📸 Photo mise à jour !');
  };
  r.readAsDataURL(file);
}

function showPublicProfil(uid){
  if(!uid) return;

  function tryLoad(){
    if(typeof window.fbDb === 'undefined'){ setTimeout(tryLoad, 200); return; }
    window.fbDb.collection('profils').doc(uid).get().then(function(doc){
      if(!doc.exists || !doc.data().visible){
        // Profil non public - afficher page erreur
        document.documentElement.style.visibility='';
        document.body.innerHTML='<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:DM Sans,sans-serif;background:#f8fafc;padding:40px 20px;text-align:center"><div style="font-size:3rem;margin-bottom:16px">🔒</div><h2 style="font-size:1.2rem;font-weight:800;color:#0f172a;margin-bottom:8px">Profil non disponible</h2><p style="font-size:.82rem;color:#64748b;margin-bottom:24px">Ce profil est privé ou n\'existe pas.</p><a href="/" style="background:#059669;color:#fff;text-decoration:none;border-radius:10px;padding:12px 24px;font-size:.78rem;font-weight:700">← Retour à CareerPulse</a></div>';
        return;
      }
      var d = doc.data();
      // Cacher tout sauf la page publique
      document.querySelectorAll('.screen').forEach(function(s){ s.style.display='none'; });
      var nav=document.getElementById('topnav'); if(nav) nav.style.display='none';
      var tnav=document.getElementById('tnav'); if(tnav) tnav.style.display='none';
      var pub=document.getElementById('s-profil-public'); if(pub) pub.style.display='block';
      // Remplir les infos
      var av=document.getElementById('pub-avatar'); if(av) av.textContent=(d.name||'?').charAt(0).toUpperCase();
      var nm=document.getElementById('pub-name'); if(nm) nm.textContent=d.name||'—';
      var ti=document.getElementById('pub-titre'); if(ti) ti.textContent=d.titre||'—';
      var lo=document.getElementById('pub-location'); if(lo) lo.textContent=(d.ville||'')+(d.ville&&d.secteur?' · ':'')+( d.secteur||'');
      var ac=document.getElementById('pub-accroche'); if(ac) ac.textContent=d.accroche||'—';
      var se=document.getElementById('pub-secteur'); if(se) se.textContent=d.secteur||'—';
      var ex=document.getElementById('pub-exp'); if(ex) ex.textContent=d.exp?d.exp+' exp.':'—';
      var sa=document.getElementById('pub-salaire'); if(sa) sa.textContent=d.salaire?d.salaire+'€/an':'—';
      // Contact
      var contDiv=document.getElementById('pub-contact-section');
      if(contDiv){
        var html='';
        if(d.shareEmail&&d.emailPublic) html+='<a href="mailto:'+d.emailPublic+'" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:9px;margin-bottom:8px;text-decoration:none;color:#059669;font-size:.76rem;font-weight:600"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'+d.emailPublic+'</a>';
        if(d.shareTel&&d.telPublic) html+='<a href="tel:'+d.telPublic+'" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:#f0fdf4;border-radius:9px;margin-bottom:8px;text-decoration:none;color:#059669;font-size:.76rem;font-weight:600"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .07 1.18 2 2 0 0 1 2.03 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 7.09a16 16 0 0 0 6 6l.36-.36a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'+d.telPublic+'</a>';
        if(html){ contDiv.innerHTML='<div style="font-size:.65rem;font-weight:700;color:#059669;margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em">Contact direct</div>'+html; }
        else contDiv.style.display='none';
      }
      // SEO
      document.title=(d.name||'Candidat')+' — '+(d.titre||'Profil')+' | CareerPulse';
      // Révéler la page
      document.documentElement.style.visibility='';
    }).catch(function(e){
      document.documentElement.style.visibility='';
      document.body.innerHTML='<div style="text-align:center;padding:60px;font-family:sans-serif"><h2 style="color:#dc2626">Erreur</h2><p>'+e.message+'</p><a href="/">← Retour</a></div>';
    });
  }
  tryLoad();
}

// Détecter /profil/UID dans l'URL au chargement
document.addEventListener('DOMContentLoaded', function(){
  if(window._isPublicProfil && window._publicProfilUid){
    showPublicProfil(window._publicProfilUid);
  }
});

function toggleFpVis(){
  var name=document.getElementById('fp-name')&&document.getElementById('fp-name').value.trim();
  var sect=document.getElementById('fp-secteur')&&document.getElementById('fp-secteur').value;
  if(!_fpVis&&(!name||!sect)){
    toast('Remplis au minimum ton nom et ton secteur avant de te rendre visible');
    return;
  }
  _fpVis=!_fpVis;
  localStorage.setItem('cp_visible', _fpVis ? 'true' : 'false');
  var tog=document.getElementById('fp-vis-tog');
  var knob=document.getElementById('fp-vis-knob');
  var confirm=document.getElementById('fp-vis-confirm');
  if(tog) tog.style.background=_fpVis?'#059669':'var(--g200)';
  if(knob) knob.style.transform=_fpVis?'translateX(20px)':'none';
  if(confirm) confirm.style.display=_fpVis?'block':'none';
  // Sauvegarder dans Firestore
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(user && typeof window.fbDb !== 'undefined'){
    window.fbDb.collection('profils').doc(user.uid).set({
      visible: _fpVis,
      uid: user.uid,
      updatedAt: new Date().toISOString()
    }, {merge:true}).then(function(){
      if(_fpVis){
        toast('✅ Profil visible ! URL : career-pulse-eva.vercel.app/profil/' + user.uid.substring(0,8));
      } else {
        toast('Profil masqué');
      }
    });
  }
}

// ── CV & LM files ──
function initCVLettre(){
  var cvName=localStorage.getItem('cp_cv_name');
  var lmName=localStorage.getItem('cp_lm_name');
  if(cvName){
    var el=document.getElementById('cv-filename'); if(el){el.textContent='✓ '+cvName;el.style.display='block';}
    var info=document.getElementById('cv-file-info'); if(info) info.style.display='block';
  }
  if(lmName){
    var el2=document.getElementById('lm-filename'); if(el2){el2.textContent='✓ '+lmName;el2.style.display='block';}
    var info2=document.getElementById('lm-file-info'); if(info2) info2.style.display='block';
  }
}

function handleCVFile(inp){
  if(!inp.files||!inp.files[0]) return;
  var f=inp.files[0];
  localStorage.setItem('cp_cv_name',f.name);
  var el=document.getElementById('cv-filename'); if(el){el.textContent='✓ '+f.name;el.style.display='block';}
  var info=document.getElementById('cv-file-info'); if(info) info.style.display='block';
  toast('CV chargé ✓');
  inp.value='';
}

function handleLMFile(inp){
  if(!inp.files||!inp.files[0]) return;
  var f=inp.files[0];
  localStorage.setItem('cp_lm_done','1');
  localStorage.setItem('cp_lm_name',f.name);
  var el=document.getElementById('lm-filename'); if(el){el.textContent='✓ '+f.name;el.style.display='block';}
  var info=document.getElementById('lm-file-info'); if(info) info.style.display='block';
  toast('Lettre chargée ✓');
  inp.value='';
}

function fsel(input, zoneId, nameId){
  var file = input.files[0];
  if(!file) return;
  if(!cpRequireAccount()) { input.value=''; return; }
  // Afficher le nom du fichier
  var nameEl = document.getElementById(nameId);
  if(nameEl){ nameEl.textContent = '📄 ' + file.name; nameEl.style.display='block'; }
  var zone = document.getElementById(zoneId);
  if(zone) zone.style.borderColor='#059669';
  // Sauvegarde en base64 dans Firestore (pas besoin de Firebase Storage / plan payant)
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(!user){ ecShowToast('Connecte-toi pour sauvegarder ton fichier'); return; }
  if(file.size > 700*1024){ ecShowToast('Fichier trop lourd (max ~700 Ko)'); return; }
  var type = zoneId === 'cv-zone' ? 'cv' : 'lm';
  ecShowToast('⏳ Sauvegarde en cours...');
  var r = new FileReader();
  r.onload = function(e){
    var data = {};
    data[type + '_data'] = e.target.result; // base64
    data[type + '_name'] = file.name;
    fbDb.collection('profils').doc(user.uid).set(data, {merge:true}).then(function(){
      ecShowToast('✅ ' + (type==='cv'?'CV':'Lettre') + ' sauvegardé !');
    }).catch(function(err){
      ecShowToast('Erreur sauvegarde : ' + err.message);
    });
  };
  r.onerror = function(){ ecShowToast('Erreur de lecture du fichier'); };
  r.readAsDataURL(file);
}

// ── Documents (accordéon 3) : ajout infini, renommage façon Windows, sauvegarde / suppression ──
var docsCounter = 0;
function docsAddFile(input){
  var file = input.files[0];
  if(!file) return;
  docsCounter++;
  var rowId = 'doc-row-'+docsCounter;
  var dotIdx = file.name.lastIndexOf('.');
  var defaultName = dotIdx > 0 ? file.name.substring(0,dotIdx) : file.name;
  var ext = dotIdx > 0 ? file.name.substring(dotIdx) : '';
  var row = document.createElement('div');
  row.id = rowId;
  row.style.cssText = 'display:flex;align-items:center;gap:8px;background:var(--g50);border:1px solid var(--g100);border-radius:12px;padding:8px 10px;margin-bottom:8px';
  row.innerHTML =
    '<div style="width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#059669,#047857);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 6px rgba(5,150,105,.3)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>' +
    '<input type="text" value="'+defaultName.replace(/"/g,'&quot;')+'" style="flex:1;min-width:0;border:none;background:transparent;font-size:.74rem;font-weight:600;color:var(--g700);outline:none;font-family:inherit">' +
    '<span style="font-size:.6rem;color:var(--g400);flex-shrink:0">'+ext+'</span>' +
    '<button onclick="docsSaveFile(\''+rowId+'\')" title="Enregistrer" style="width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#059669,#047857);border:none;cursor:pointer;color:#fff;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(5,150,105,.35);transition:opacity .15s" onmousedown="this.style.opacity=\'.75\'" onmouseup="this.style.opacity=\'1\'"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg></button>' +
    '<button onclick="docsDeleteFile(\''+rowId+'\')" title="Supprimer" style="width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#ef4444,#b91c1c);border:none;cursor:pointer;color:#fff;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(220,38,38,.35);transition:opacity .15s" onmousedown="this.style.opacity=\'.75\'" onmouseup="this.style.opacity=\'1\'"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"/></svg></button>';
  row._file = file;
  row._ext = ext;
  document.getElementById('docs-list').appendChild(row);
  input.value = ''; // permet de réajouter le même fichier plus tard si besoin
}

function docsDeleteFile(rowId){
  var row = document.getElementById(rowId);
  if(row) row.remove();
}

function docsSaveFile(rowId){
  var row = document.getElementById(rowId);
  if(!row || !row._file) return;
  if(!cpRequireAccount()) return;
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(row._file.size > 700*1024){ ecShowToast('Fichier trop lourd (max ~700 Ko)'); return; }
  var nameInput = row.querySelector('input[type="text"]');
  var customName = (nameInput.value || '').trim() || 'document';
  var finalName = customName + (row._ext || '');
  ecShowToast('⏳ Sauvegarde en cours...');
  var r = new FileReader();
  r.onload = function(e){
    fbDb.collection('profils').doc(user.uid).collection('documents').doc(finalName).set({
      name: finalName, data: e.target.result, uploadedAt: new Date().toISOString()
    }).then(function(){
      ecShowToast('✅ "' + finalName + '" sauvegardé !');
    }).catch(function(err){
      ecShowToast('Erreur sauvegarde : ' + err.message);
    });
  };
  r.onerror = function(){ ecShowToast('Erreur de lecture du fichier'); };
  r.readAsDataURL(row._file);
}

function dov(e,id){e.preventDefault();var el=document.getElementById(id);if(el)el.classList.add('drag');}
function dlv(id){var el=document.getElementById(id);if(el)el.classList.remove('drag');}

// ── Stub evaOpenWithMessage ──
function evaOpenWithMessage(ctx){ go('eva-coach'); }

// ── QUIZ ADMIN ──
var QAD_BANK = [
  {q:"Quel organisme gère les allocations chômage en France depuis 2024 ?",opts:["Pôle Emploi","France Travail","La CAF","L'URSSAF"],a:1},
  {q:"Combien de temps faut-il avoir travaillé pour avoir droit au chômage (ARE) ?",opts:["3 mois","6 mois","12 mois sur les 24 derniers mois","24 mois consécutifs"],a:2},
  {q:"Dans quel délai devez-vous vous inscrire à France Travail après la fin de votre contrat ?",opts:["24h","12 mois","Pas de délai imposé","48h maximum"],a:2},
  {q:"Qu'est-ce que le CPF ?",opts:["Compte Personnel de Formation","Contrat de Professionnalisation Financé","Certificat Professionnel de Formation","Comité Paritaire de Formation"],a:0},
  {q:"Quel document doit obligatoirement remettre l'employeur à la fin d'un contrat ?",opts:["Une lettre de recommandation","Le solde de tout compte et l'attestation France Travail","Un rapport d'évaluation","Un avis d'imposition"],a:1},
  {q:"La rupture conventionnelle donne-t-elle droit au chômage ?",opts:["Non, jamais","Oui, toujours","Seulement si le salarié a 2 ans d'ancienneté","Seulement en CDI avec accord de l'inspection du travail"],a:1},
  {q:"Qu'est-ce que l'ARE ?",opts:["Aide au Retour à l'Emploi (allocation chômage)","Allocation de Recherche d'Emploi","Aide au Revenu d'Entreprise","Aucune de ces réponses"],a:0},
  {q:"Peut-on cumuler une allocation chômage avec une activité à temps partiel ?",opts:["Non, c'est interdit","Oui, sous conditions et avec déclaration","Oui, sans aucune limite","Seulement pendant 1 mois"],a:1},
  {q:"Qu'est-ce que le RSA ?",opts:["Un remboursement de sécurité sociale","Le Revenu de Solidarité Active","Un régime de retraite complémentaire","Le Régime Social des Artisans"],a:1},
  {q:"Comment déclarer sa reprise d'activité à France Travail ?",opts:["Par courrier uniquement","Dans les 72h, via son espace personnel en ligne","Pas besoin de le déclarer","Uniquement par téléphone"],a:1},
  {q:"Qu'est-ce que l'ASS (Allocation de Solidarité Spécifique) ?",opts:["Une aide pour les moins de 25 ans","Une allocation versée quand les droits ARE sont épuisés","Un complément de retraite","Une aide au logement"],a:1},
  {q:"Peut-on refuser un CDI après un CDD et continuer à percevoir le chômage ?",opts:["Oui, toujours","Non, jamais","Oui, mais seulement 2 fois sur 12 mois","Oui si le salaire est inférieur à l'ARE perçu"],a:2},
  {q:"Qu'est-ce que la portabilité de la mutuelle d'entreprise ?",opts:["Le fait de garder sa mutuelle jusqu'à 12 mois après la fin du contrat","Un transfert automatique vers la Sécurité Sociale","Une assurance vie liée au contrat","Un remboursement des cotisations"],a:0},
  {q:"Quel est le montant du SMIC horaire brut en 2024 ?",opts:["9,50 €","10,10 €","11,65 €","12,00 €"],a:2},
  {q:"Qu'est-ce qu'un contrat de professionnalisation ?",opts:["Un CDD classique","Un contrat en alternance pour adultes demandeurs d'emploi","Un stage conventionné","Un contrat aidé pour les jeunes de moins de 26 ans uniquement"],a:1},
  {q:"Que signifie 'DIF' dans le contexte professionnel ?",opts:["Droit Individuel à la Formation (remplacé par le CPF)","Dispositif d'Insertion Financière","Direction de l'Innovation et de la Formation","Diplôme d'Insertion Fédérale"],a:0},
  {q:"En cas d'abandon de poste, que risque le salarié depuis 2023 ?",opts:["Rien, c'est légal","Être présumé démissionnaire et perdre ses droits chômage","Un licenciement pour faute lourde automatique","Une amende"],a:1},
  {q:"Qu'est-ce que l'allocation de retour à l'emploi formation (AREF) ?",opts:["Une aide pour créer son entreprise","Le maintien de l'ARE pendant une formation validée par France Travail","Une prime à l'embauche","Un prêt sans intérêt de l'État"],a:1},
  {q:"Quel organisme finance les formations des demandeurs d'emploi en France ?",opts:["France Travail uniquement","Le CPF, les OPCO, les Régions et France Travail selon les cas","La Sécurité Sociale","L'Education Nationale"],a:1},
  {q:"Quelle est la durée maximale d'indemnisation chômage pour un salarié de moins de 53 ans ?",opts:["12 mois","18 mois","24 mois","36 mois"],a:1},
  {q:"Qu'est-ce que le CEJ (Contrat d'Engagement Jeune) ?",opts:["Un CDI subventionné","Un dispositif d'accompagnement intensif pour les 16-25 ans sans emploi ni formation","Un contrat aidé dans la fonction publique","Un stage de 6 mois rémunéré"],a:1},
  {q:"Peut-on percevoir le chômage après une démission ?",opts:["Non, jamais","Oui, toujours","Oui, dans certains cas légitimes reconnus par France Travail","Seulement après 5 ans d'ancienneté"],a:2},
  {q:"Qu'est-ce que le Plan de Sauvegarde de l'Emploi (PSE) ?",opts:["Un accord de réduction du temps de travail","Un plan obligatoire lors de licenciements collectifs dans les grandes entreprises","Une aide de l'État aux PME en difficulté","Un congé spécial pour les salariés seniors"],a:1},
  {q:"Quel est le délai de carence avant de toucher le chômage après inscription à France Travail ?",opts:["Aucun","7 jours + les jours de congés payés non pris","30 jours","15 jours fixes"],a:1},
  {q:"Qu'est-ce que la prime d'activité ?",opts:["Une prime versée par l'employeur","Un complément de revenu de la CAF pour les travailleurs à faibles revenus","Une aide au transport","Un bonus versé par France Travail"],a:1}
];
// ══════════════════════════════════════════════════════════
// GRILLE BARÈME — Coefficients par thème (style bac France)
// Niveaux : 1=connaissance, 2=compréhension, 3=application, 4=analyse
// ══════════════════════════════════════════════════════════
var GRILLE = {
  // ── Démarches administratives ──
  "Quel organisme gère les allocations chômage en France depuis 2024 ?": {c:1, theme:"institutions", cat:"connaissance"},
  "Combien de temps faut-il avoir travaillé pour avoir droit au chômage (ARE) ?": {c:2, theme:"droits", cat:"règle chiffrée"},
  "Dans quel délai devez-vous vous inscrire à France Travail après la fin de votre contrat ?": {c:2, theme:"procédure", cat:"délai"},
  "Qu'est-ce que le CPF ?": {c:1, theme:"formation", cat:"définition"},
  "Quel document doit obligatoirement remettre l'employeur à la fin d'un contrat ?": {c:2, theme:"documents", cat:"obligation"},
  "La rupture conventionnelle donne-t-elle droit au chômage ?": {c:3, theme:"droits", cat:"application"},
  "Qu'est-ce que l'ARE ?": {c:1, theme:"allocations", cat:"définition"},
  "Peut-on cumuler une allocation chômage avec une activité à temps partiel ?": {c:3, theme:"droits", cat:"application"},
  "Qu'est-ce que le RSA ?": {c:1, theme:"allocations", cat:"définition"},
  "Comment déclarer sa reprise d'activité à France Travail ?": {c:2, theme:"procédure", cat:"démarche"},
  "Qu'est-ce que l'ASS (Allocation de Solidarité Spécifique) ?": {c:2, theme:"allocations", cat:"définition avancée"},
  "Peut-on refuser un CDI après un CDD et continuer à percevoir le chômage ?": {c:4, theme:"droits", cat:"analyse"},
  "Qu'est-ce que la portabilité de la mutuelle d'entreprise ?": {c:3, theme:"protection", cat:"mécanisme"},
  "Quel est le montant du SMIC horaire brut en 2024 ?": {c:2, theme:"salaire", cat:"chiffre clé"},
  "Qu'est-ce qu'un contrat de professionnalisation ?": {c:2, theme:"formation", cat:"définition"},
  "Que signifie 'DIF' dans le contexte professionnel ?": {c:2, theme:"formation", cat:"sigle"},
  "En cas d'abandon de poste, que risque le salarié depuis 2023 ?": {c:4, theme:"rupture", cat:"analyse réforme"},
  "Qu'est-ce que l'allocation de retour à l'emploi formation (AREF) ?": {c:3, theme:"formation", cat:"mécanisme"},
  "Quel organisme finance les formations des demandeurs d'emploi en France ?": {c:3, theme:"formation", cat:"acteurs"},
  "Quelle est la durée maximale d'indemnisation chômage pour un salarié de moins de 53 ans ?": {c:3, theme:"droits", cat:"règle chiffrée"},
  "Qu'est-ce que le CEJ (Contrat d'Engagement Jeune) ?": {c:2, theme:"insertion", cat:"dispositif"},
  "Peut-on percevoir le chômage après une démission ?": {c:4, theme:"droits", cat:"analyse"},
  "Qu'est-ce que le Plan de Sauvegarde de l'Emploi (PSE) ?": {c:3, theme:"licenciement", cat:"mécanisme"},
  "Quel est le délai de carence avant de toucher le chômage après inscription à France Travail ?": {c:3, theme:"procédure", cat:"délai"},
  "Qu'est-ce que la prime d'activité ?": {c:2, theme:"allocations", cat:"définition"},
  // ── Rupture conventionnelle ──
  "C'est quoi une rupture conventionnelle ?": {c:1, theme:"définition", cat:"base"},
  "La rupture conventionnelle est possible pour quel type de contrat ?": {c:2, theme:"périmètre", cat:"règle"},
  "Est-ce que les deux parties peuvent changer d'avis après avoir signé ?": {c:3, theme:"procédure", cat:"droit rétractation"},
  "Combien de fois au minimum doit-on se rencontrer avant de signer ?": {c:2, theme:"procédure", cat:"étape"},
  "Est-ce que le salarié peut amener quelqu'un avec lui lors de la réunion ?": {c:3, theme:"procédure", cat:"assistance"},
  "Qui valide officiellement la rupture conventionnelle ?": {c:2, theme:"institutions", cat:"acteur"},
  "Combien de temps l'État a-t-il pour valider ou refuser le dossier ?": {c:3, theme:"délais", cat:"règle chiffrée"},
  "Après une rupture conventionnelle, peut-on toucher le chômage ?": {c:2, theme:"droits", cat:"conséquence"},
  "Est-ce que l'employeur peut forcer le salarié à accepter une rupture conventionnelle ?": {c:3, theme:"consentement", cat:"principe"},
  "Est-ce qu'on touche une indemnité quand on part en rupture conventionnelle ?": {c:2, theme:"indemnité", cat:"droit"},
  "Plus on a travaillé longtemps, plus l'indemnité est élevée ?": {c:2, theme:"indemnité", cat:"calcul"},
  "Peut-on négocier une indemnité plus élevée que le minimum ?": {c:3, theme:"négociation", cat:"marge"},
  "Est-ce que l'indemnité reçue est imposée comme un salaire ?": {c:4, theme:"fiscalité", cat:"analyse"},
  "Peut-on faire une rupture conventionnelle quand on est en arrêt maladie ?": {c:3, theme:"conditions", cat:"cas particulier"},
  "Y a-t-il un préavis à effectuer après une rupture conventionnelle ?": {c:2, theme:"procédure", cat:"règle"},
  "Quand est-ce que le contrat se termine officiellement ?": {c:3, theme:"procédure", cat:"date"},
  "Si on n'est pas content de la rupture, on peut contester devant les prud'hommes. Dans quel délai ?": {c:4, theme:"recours", cat:"délai"},
  "Que se passe-t-il si l'État ne répond pas dans les délais ?": {c:4, theme:"procédure", cat:"cas particulier"},
  "Un représentant du personnel (délégué syndical) peut-il faire une rupture conventionnelle ?": {c:4, theme:"cas particuliers", cat:"analyse"},
  "Si on a été obligé de signer sous pression, la rupture est-elle valable ?": {c:4, theme:"consentement", cat:"analyse"},
  "L'employeur doit-il expliquer pourquoi il veut une rupture conventionnelle ?": {c:3, theme:"obligations", cat:"règle"},
  "Un salarié en CDI depuis 3 ans part en rupture conventionnelle. Il a droit à une indemnité ?": {c:3, theme:"indemnité", cat:"application"},
  "La rupture conventionnelle est-elle possible si l'entreprise licencie beaucoup de monde en même temps ?": {c:4, theme:"conditions", cat:"cas particulier"},
  "Après la rupture, l'employeur remet quels documents au salarié ?": {c:2, theme:"documents", cat:"obligation"},
  "La rupture conventionnelle, c'est une bonne idée pour qui ?": {c:3, theme:"conseil", cat:"synthèse"},
  // ── Entretien RH ──
  "Quelle méthode utilise-t-on pour structurer une réponse comportementale en entretien ?": {c:1, theme:"méthode", cat:"outil"},
  "Que signifie 'culture fit' dans le contexte du recrutement ?": {c:2, theme:"recrutement", cat:"concept"},
  "Combien de temps dure en moyenne un premier entretien téléphonique de présélection ?": {c:1, theme:"process", cat:"connaissance"},
  "Quelle question est illégale en France lors d'un entretien d'embauche ?": {c:3, theme:"légal", cat:"droit"},
  "Que doit contenir obligatoirement une offre d'emploi en France ?": {c:2, theme:"légal", cat:"obligation"},
  "Lors de la question 'Quel est votre plus grand défaut ?', quelle approche est la meilleure ?": {c:3, theme:"technique", cat:"stratégie"},
  "Quel est le délai légal de réponse d'un recruteur après un entretien en France ?": {c:2, theme:"légal", cat:"règle"},
  "Qu'est-ce qu'un entretien en panel ou jury ?": {c:1, theme:"process", cat:"définition"},
  "Quelle est la meilleure façon de conclure un entretien d'embauche ?": {c:3, theme:"technique", cat:"stratégie"},
  "Comment se préparer aux questions techniques d'un entretien ?": {c:3, theme:"préparation", cat:"méthode"},
  "Qu'est-ce qu'un ATS dans le processus de recrutement ?": {c:2, theme:"outils", cat:"définition"},
  "Comment optimiser son CV pour passer les filtres ATS ?": {c:3, theme:"outils", cat:"application"},
  "Qu'est-ce que le 'ghosting' de la part d'un recruteur ?": {c:1, theme:"process", cat:"définition"},
  "Quelle est la durée idéale d'un CV pour un profil avec moins de 10 ans d'expérience ?": {c:2, theme:"CV", cat:"règle"},
  "Que signifie 'onboarding' dans le contexte RH ?": {c:1, theme:"intégration", cat:"définition"},
  "Quelle est la meilleure façon de répondre à 'Pourquoi vous et pas un autre ?'": {c:4, theme:"technique", cat:"stratégie avancée"},
  "Qu'est-ce qu'une lettre de motivation efficace doit obligatoirement contenir ?": {c:3, theme:"candidature", cat:"contenu"},
  "Combien de temps avant l'heure prévue faut-il arriver à un entretien ?": {c:1, theme:"comportement", cat:"règle"},
  "Que faire si on ne connaît pas la réponse à une question technique en entretien ?": {c:3, theme:"technique", cat:"gestion"},
  "Qu'est-ce qu'un entretien en assessment center ?": {c:2, theme:"process", cat:"définition"},
  "Quelle est la règle d'or pour le langage non-verbal en entretien ?": {c:2, theme:"comportement", cat:"règle"},
  "Pourquoi recherche-t-on les informations sur l'entreprise avant un entretien ?": {c:3, theme:"préparation", cat:"stratégie"},
  "Quel est le meilleur moment pour aborder la question du salaire ?": {c:4, theme:"négociation", cat:"stratégie"},
  "Comment relancer un recruteur après un entretien sans nouvelles ?": {c:3, theme:"suivi", cat:"stratégie"},
  "Qu'est-ce qu'une période d'essai ?": {c:1, theme:"contrat", cat:"définition"}
};

// ── Profils par quiz selon score pondéré ──
var PROFILS = {
  admin: [
    {min:90, label:"Expert administratif", stars:"★★★★★", icon:"🏆",
     pattern:"Raisonnement institutionnel maîtrisé. Tu connais les acteurs, les délais, les droits — et tu sais les articuler.",
     lacunes:[], conseil:"Consolide en explorant les cas limite : démission légitime, droits après contrat courts."},
    {min:70, label:"Profil averti", stars:"★★★★☆", icon:"💼",
     pattern:"Bonne maîtrise des droits fondamentaux. Tu hésites encore sur les mécanismes complexes (cumuls, refus CDI).",
     lacunes:["cumul allocations","refus CDI"], conseil:"Focus sur les règles de cumul et les cas de démission légitime."},
    {min:50, label:"Profil en construction", stars:"★★★☆☆", icon:"📈",
     pattern:"Tu as les bases mais les détails procéduraux t'échappent encore — délais, documents, conditions précises.",
     lacunes:["délais","documents obligatoires"], conseil:"Mémorise les 3 documents de fin de contrat et les délais clés."},
    {min:30, label:"Profil débutant", stars:"★★☆☆☆", icon:"🌱",
     pattern:"Tu connais l'existence des dispositifs mais pas leur fonctionnement réel. Les notions sont floues.",
     lacunes:["ARE","CPF","procédures"], conseil:"Commence par France Travail et le CPF — 2 piliers essentiels."},
    {min:0, label:"Profil à initier", stars:"★☆☆☆☆", icon:"🚀",
     pattern:"Tu pars de zéro — c'est le meilleur point de départ. Tout ce que tu apprendras sera une découverte concrète.",
     lacunes:["tous les fondamentaux"], conseil:"Commence par comprendre ce qu'est l'ARE et qui y a droit."}
  ],
  rupture: [
    {min:90, label:"Expert rupture conventionnelle", stars:"★★★★★", icon:"🏆",
     pattern:"Maîtrise totale du mécanisme. Tu comprends les droits, les délais, la fiscalité et les cas particuliers.",
     lacunes:[], conseil:"Va plus loin : explore les ruptures en cas de harcèlement ou de PSE simultané."},
    {min:70, label:"Profil solide", stars:"★★★★☆", icon:"💼",
     pattern:"Tu maîtrises le déroulé standard. Les cas atypiques (arrêt maladie, pression, représentants du personnel) restent flous.",
     lacunes:["cas particuliers","fiscalité"], conseil:"Focus sur la fiscalité de l'indemnité et les cas de salariés protégés."},
    {min:50, label:"Profil intermédiaire", stars:"★★★☆☆", icon:"📈",
     pattern:"Tu sais que la rupture existe et qu'elle donne le chômage — mais les détails procéduraux t'échappent.",
     lacunes:["délais homologation","calcul indemnité"], conseil:"Retiens : 15 jours rétractation, 15 jours homologation, indemnité = 1/4 mois/an."},
    {min:30, label:"Profil débutant", stars:"★★☆☆☆", icon:"🌱",
     pattern:"Tu confonds rupture, démission et licenciement. Les droits associés ne sont pas encore clairs.",
     lacunes:["distinction démission/rupture","droits chômage"], conseil:"La différence clé : rupture = accord mutuel + chômage garanti."},
    {min:0, label:"Profil à initier", stars:"★☆☆☆☆", icon:"🚀",
     pattern:"Sujet entièrement nouveau pour toi — ce qui est parfait pour apprendre sans fausses certitudes.",
     lacunes:["définition","procédure","droits"], conseil:"Commence par la définition simple : accord amiable entre salarié et employeur."}
  ],
  rh: [
    {min:90, label:"Expert entretien", stars:"★★★★★", icon:"🏆",
     pattern:"Tu maîtrises la stratégie, la méthode STAR, le non-verbal et la négociation. Tu sais te vendre.",
     lacunes:[], conseil:"Travaille maintenant l'assessment center et les entretiens en panel."},
    {min:70, label:"Candidat préparé", stars:"★★★★☆", icon:"💼",
     pattern:"Bonne base stratégique. Tu maîtrises la forme mais certaines questions difficiles te déstabilisent encore.",
     lacunes:["gestion questions difficiles","négociation salaire"], conseil:"Prépare 3 réponses type aux questions pièges les plus fréquentes."},
    {min:50, label:"Candidat en progression", stars:"★★★☆☆", icon:"📈",
     pattern:"Tu connais les bases (STAR, CV, ponctualité) mais ta stratégie reste superficielle.",
     lacunes:["stratégie entretien","ATS"], conseil:"Optimise ton CV pour les ATS et prépare la méthode STAR avec 3 exemples concrets."},
    {min:30, label:"Candidat à préparer", stars:"★★☆☆☆", icon:"🌱",
     pattern:"Tu improvises encore beaucoup. Les processus RH (ATS, assessment, onboarding) sont flous.",
     lacunes:["processus RH","préparation"], conseil:"Commence par rechercher l'entreprise avant chaque entretien — c'est la base."},
    {min:0, label:"Candidat débutant", stars:"★☆☆☆☆", icon:"🚀",
     pattern:"Tu abordes l'entretien sans méthode. C'est une compétence qui s'apprend — et tu commences maintenant.",
     lacunes:["méthode STAR","préparation","stratégie"], conseil:"Apprends la méthode STAR en 10 minutes — elle change tout."}
  ],
  droit: [
    {min:90, label:"Expert droit du travail", stars:"★★★★★", icon:"🏆",
     pattern:"Maîtrise solide du Code du travail. Tu connais les délais, les procédures et les recours.",
     lacunes:[], conseil:"Approfondis les conventions collectives et le droit à la déconnexion."},
    {min:70, label:"Profil averti", stars:"★★★★☆", icon:"💼",
     pattern:"Bonne connaissance des droits fondamentaux. Les mécanismes complexes (forfait jour, CSE) restent flous.",
     lacunes:["forfait jour","CSE","conventions collectives"], conseil:"Focus sur les instances représentatives et le temps de travail."},
    {min:50, label:"Profil intermédiaire", stars:"★★★☆☆", icon:"📈",
     pattern:"Tu connais les notions de base (35h, congés, licenciement) mais les détails procéduraux t'échappent.",
     lacunes:["procédure licenciement","délais prud'hommes"], conseil:"Retiens la procédure de licenciement en 3 étapes : convocation, entretien, notification."},
    {min:30, label:"Profil débutant", stars:"★★☆☆☆", icon:"🌱",
     pattern:"Tu as entendu parler de ces droits mais tu ne les maîtrises pas encore. Beaucoup de confusion.",
     lacunes:["CDI/CDD","congés payés","licenciement"], conseil:"Commence par la différence CDI/CDD et les 25 jours de congés."},
    {min:0, label:"Profil à initier", stars:"★☆☆☆☆", icon:"🚀",
     pattern:"Droit du travail = terrain inconnu. Tu as tout à gagner — chaque notion apprise te protège.",
     lacunes:["tous les fondamentaux"], conseil:"Commence par lire ta fiche de paie et ton contrat de travail."}
  ]
};

// ── Calculer le score pondéré avec la grille ──
function calculerScorePondere(answers, quizKey){
  var totalCoeff = 0, scoreCoeff = 0;
  var themes = {}, nbParTheme = {};
  answers.forEach(function(a){
    var g = GRILLE[a.q] || {c:2, theme:"general", cat:"standard"};
    var coeff = g.c;
    totalCoeff += coeff;
    if(a.ok) scoreCoeff += coeff;
    if(!nbParTheme[g.theme]) nbParTheme[g.theme] = {total:0, ok:0};
    nbParTheme[g.theme].total += coeff;
    if(a.ok) nbParTheme[g.theme].ok += coeff;
  });
  var pctPondere = totalCoeff > 0 ? Math.round((scoreCoeff/totalCoeff)*100) : 0;

  // Trouver le profil
  var profilList = PROFILS[quizKey] || PROFILS.admin;
  var profil = profilList[profilList.length-1];
  for(var i=0; i<profilList.length; i++){
    if(pctPondere >= profilList[i].min){ profil = profilList[i]; break; }
  }

  // Note sur 20 style bac
  var note20 = Math.round(pctPondere * 20 / 100);
  // Mention
  var mention = note20>=18?"Très Bien":note20>=16?"Bien":note20>=14?"Assez Bien":note20>=12?"Passable":note20>=10?"Insuffisant":"À reprendre";

  // Thèmes faibles
  var themesFailbles = [];
  Object.keys(nbParTheme).forEach(function(t){
    var r = nbParTheme[t];
    if(r.total>0 && (r.ok/r.total)<0.5) themesFailbles.push(t);
  });

  return {pct:pctPondere, note20:note20, mention:mention, profil:profil, themesFailbles:themesFailbles, scoreCoeff:scoreCoeff, totalCoeff:totalCoeff};
}

// ── Détecter le quizKey selon le nom ──
function getQuizKey(quizName){
  var n = (quizName||'').toLowerCase();
  if(n.indexOf('rupture')>=0) return 'rupture';
  if(n.indexOf('rh')>=0||n.indexOf('entretien')>=0) return 'rh';
  if(n.indexOf('droit')>=0||n.indexOf('travail')>=0||n.indexOf('bulletin')>=0||n.indexOf('salaire')>=0) return 'droit';
  return 'admin';
}

function shuffleAndPick(arr, n){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
  return a.slice(0,n).map(function(q){
    var correct = q.opts[q.a];
    var opts = q.opts.slice();
    for(var i=opts.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=opts[i];opts[i]=opts[j];opts[j]=t; }
    return {q:q.q, opts:opts, a:opts.indexOf(correct)};
  });
}
// ── Variantes QAD — 10 formulations différentes des mêmes notions ──
var QAD_VAR = [
  {q:"Depuis le 1er janvier 2024, comment s'appelle l'organisme qui gère le chômage en France ?",opts:["Pôle Emploi","France Travail","La CAF","L'URSSAF"],a:1},
  {q:"Pour ouvrir des droits au chômage, combien de mois de travail faut-il avoir accumulé ?",opts:["3 mois","6 mois","12 mois sur les 24 derniers mois","18 mois"],a:2},
  {q:"Tu viens de perdre ton emploi. Dans quel délai dois-tu t'inscrire à France Travail ?",opts:["Immédiatement le lendemain","Pas de délai imposé — mais plus vite c'est mieux","48h maximum","1 semaine"],a:1},
  {q:"Le CPF finance des formations. Qui alimente ce compte chaque année ?",opts:["L'État uniquement","L'employeur via les cotisations","Le salarié lui-même","La Sécurité Sociale"],a:1},
  {q:"Quels sont les 3 documents que l'employeur doit remettre à la fin d'un contrat ?",opts:["CV, contrat, fiche de poste","Solde de tout compte, certificat de travail, attestation France Travail","Attestation fiscale, contrat, lettre de licenciement","Fiche de paie, contrat, lettre de recommandation"],a:1},
  {q:"Une rupture conventionnelle te prive-t-elle du chômage ?",opts:["Oui, comme une démission","Non, tu gardes tes droits ARE","Oui, sauf si tu as 5 ans d'ancienneté","Ça dépend de ton employeur"],a:1},
  {q:"L'ARE, c'est quoi exactement ?",opts:["Une aide au logement","L'Allocation de Retour à l'Emploi — le chômage classique","Une aide pour créer son entreprise","Un revenu minimum garanti"],a:1},
  {q:"Tu reprends un mi-temps tout en touchant le chômage. C'est possible ?",opts:["Non, interdit","Oui, sous conditions — tu dois déclarer ton activité","Oui, sans aucune limite","Non, sauf si c'est un CDD"],a:1},
  {q:"Quelle est la différence entre le RSA et l'ARE ?",opts:["Aucune, c'est la même chose","L'ARE est le chômage, le RSA est un revenu minimum pour les personnes sans ressources suffisantes","Le RSA est réservé aux moins de 25 ans","L'ARE est versé par la CAF, le RSA par France Travail"],a:1},
  {q:"Tu reprends un emploi sans le déclarer à France Travail. Quelles sont les conséquences ?",opts:["Aucune si c'est un CDD court","Remboursement des allocations indûment perçues et sanctions","Une simple mise en garde","Une suspension temporaire de 1 mois"],a:1},
  // ── 15 nouvelles questions démarches administratives ──
  {q:"Qu'est-ce que le CEJ (Contrat d'Engagement Jeune) ?",opts:["Un CDI subventionné","Un dispositif d'accompagnement intensif pour les 16-25 ans sans emploi ni formation","Un contrat aidé dans la fonction publique","Un stage de 6 mois rémunéré"],a:1},
  {q:"Peut-on percevoir le chômage après une démission ?",opts:["Non, jamais","Oui, toujours","Oui, dans certains cas légitimes reconnus par France Travail","Seulement après 5 ans d'ancienneté"],a:2},
  {q:"Quel est le délai de carence avant de toucher le chômage après inscription à France Travail ?",opts:["Aucun","7 jours + les jours de congés payés non pris","30 jours","15 jours fixes"],a:1},
  {q:"Qu'est-ce que l'ASS (Allocation de Solidarité Spécifique) ?",opts:["Une aide pour les moins de 25 ans","Une allocation versée quand les droits ARE sont épuisés","Un complément de retraite","Une aide au logement"],a:1},
  {q:"Qu'est-ce que la portabilité de la mutuelle d'entreprise ?",opts:["Garder sa mutuelle jusqu'à 12 mois après la fin du contrat","Un transfert vers la Sécurité Sociale","Une assurance vie liée au contrat","Un remboursement des cotisations"],a:0},
  {q:"Qu'est-ce qu'un contrat de professionnalisation ?",opts:["Un CDD classique","Un contrat en alternance pour adultes demandeurs d'emploi","Un stage conventionné","Un contrat aidé pour les moins de 26 ans uniquement"],a:1},
  {q:"Qu'est-ce que le Plan de Sauvegarde de l'Emploi (PSE) ?",opts:["Un accord de réduction du temps de travail","Un plan obligatoire lors de licenciements collectifs dans les grandes entreprises","Une aide de l'État aux PME","Un congé spécial seniors"],a:1},
  {q:"Quelle est la durée maximale d'indemnisation chômage pour un salarié de moins de 53 ans ?",opts:["12 mois","18 mois","24 mois","36 mois"],a:1},
  {q:"Que signifie DIF dans le contexte professionnel ?",opts:["Droit Individuel à la Formation (remplacé par le CPF)","Dispositif d'Insertion Financière","Direction de l'Innovation et de la Formation","Diplôme d'Insertion Fédérale"],a:0},
  {q:"Quel organisme finance les formations des demandeurs d'emploi en France ?",opts:["France Travail uniquement","Le CPF, les OPCO, les Régions et France Travail selon les cas","La Sécurité Sociale","L'Education Nationale"],a:1},
  {q:"Peut-on refuser un CDI après un CDD et continuer à percevoir le chômage ?",opts:["Oui, toujours","Non, jamais","Oui, mais seulement 2 fois sur 12 mois","Oui si le salaire est inférieur à l'ARE perçu"],a:2},
  {q:"Qu'est-ce que l'AREF (Allocation de Retour à l'Emploi Formation) ?",opts:["Une aide pour créer son entreprise","Le maintien de l'ARE pendant une formation validée par France Travail","Une prime à l'embauche","Un prêt sans intérêt de l'État"],a:1},
  {q:"Qu'est-ce qu'un OPCO ?",opts:["Un organisme de contrôle du chômage","Un opérateur de compétences qui finance les formations en entreprise","Une alternative au CPF","Un syndicat de formation"],a:1},
  {q:"En cas d'abandon de poste depuis 2023, que risque le salarié ?",opts:["Rien, c'est légal","Être présumé démissionnaire et perdre ses droits chômage","Un licenciement pour faute lourde automatique","Une amende"],a:1},
  {q:"Quel est le montant du SMIC horaire brut en 2024 ?",opts:["9,50 €","10,10 €","11,65 €","12,00 €"],a:2}
];
function buildQAD(){ var pool=QAD_BANK.concat(QAD_VAR); for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;} return pool.slice(0,25).map(function(q){var correct=q.opts[q.a];var opts=q.opts.slice();for(var i=opts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=opts[i];opts[i]=opts[j];opts[j]=t;}return{q:q.q,opts:opts,a:opts.indexOf(correct)};}); }
var QAD = buildQAD();
var qadState = {cur:0, score:0, answers:[], done:false};

// ════ MOTEUR JOKERS + INTRO QUIZ ════
var _QSession={prenom:'',chrono:false,timerEl:null,timerInterval:null,elapsed:0};
var _QJokers={cinqcinq:true,ami:true,pct:true};
var _QJokerUsedThisQ=false;

/* ── Sons premium style "Qui veut gagner des millions" ── */
function _jSound(type){
  try{
    var c=window._jSndCtx||(window._jSndCtx=new(window.AudioContext||window.webkitAudioContext)());
    function tone(freq,start,dur,vol,wave){
      var o=c.createOscillator(),g=c.createGain();
      o.type=wave||'sine';o.connect(g);g.connect(c.destination);
      o.frequency.value=freq;
      g.gain.setValueAtTime(vol||.09,c.currentTime+start);
      g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+start+dur);
      o.start(c.currentTime+start);o.stop(c.currentTime+start+dur+.02);
    }
    if(type==='start'){
      // Fanfare montante dramatique
      [261,329,392,523,659,784,1047].forEach(function(f,i){tone(f,i*.07,.18,.11);});
      tone(1047,.55,.45,.13);tone(784,.6,.4,.1);
    } else if(type==='correct'){
      // Ding-dong victorieux
      tone(784,.0,.12,.12);tone(1047,.1,.12,.12);tone(1319,.2,.3,.14);
      tone(1568,.35,.5,.1);
    } else if(type==='wrong'){
      // Ti-ti-ti — 3 bips courts graves
      tone(280,.0,.07,.12);tone(280,.12,.07,.12);tone(280,.24,.07,.12);
    } else if(type==='cinqcinq'){
      // Swoosh électrique coupant 2 options
      tone(1200,.0,.06,.1,'sawtooth');tone(800,.08,.06,.1,'sawtooth');
      tone(523,.18,.15,.12);tone(659,.28,.2,.1);
    } else if(type==='ami'){
      // Sonnerie téléphone rétro
      tone(880,.0,.08,.09);tone(880,.1,.08,.09);
      tone(1100,.25,.08,.09);tone(1100,.35,.08,.09);
      tone(880,.5,.12,.1);
    } else if(type==='pct'){
      // Suspense montée statistique
      [349,392,440,494,523].forEach(function(f,i){tone(f,i*.06,.1,.08);});
      tone(784,.35,.4,.12);
    } else if(type==='chrono_warn'){
      // Bip d'urgence
      tone(880,.0,.05,.15);tone(880,.12,.05,.15);tone(880,.24,.05,.15);
    } else {
      tone(440,.0,.15,.07);
    }
  }catch(e){}
}

function _chronoStart(elId, onExpire){
  _chronoStop();
  if(!_QSession.chrono) return;
  var limit=10;
  var left=limit;
  var el=document.getElementById(elId);
  function tick(){
    if(!el) el=document.getElementById(elId);
    if(el){
      el.textContent=left+'s';
      el.style.color=left<=5?'#dc2626':'#475569';
      el.style.fontWeight=left<=10?'900':'800';
    }
    
    if(left<=0){ _chronoStop(); if(onExpire) onExpire(); return; }
    left--;
  }
  tick();
  _QSession.timerInterval=setInterval(tick,1000);
}
function _chronoStop(){if(_QSession.timerInterval){clearInterval(_QSession.timerInterval);_QSession.timerInterval=null;}}

/* ── Notification règles — affichée une seule fois par session ── */
var _rulesShown=false;
function _showRules(onDone){
  if(_rulesShown){onDone();return;}
  _rulesShown=true;
  var ov=document.createElement('div');ov.id='_rulesOv';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9995;display:flex;align-items:center;justify-content:center;padding:16px';
  var svgChrono='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 15 15"/><line x1="9" y1="2" x2="15" y2="2"/><line x1="12" y1="2" x2="12" y2="5"/></svg>';
  var svg5050='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="8" y1="8" x2="16" y2="16"/><line x1="16" y1="8" x2="8" y2="16"/></svg>';
  var svgPhone='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.99-2.18H6.6a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 15.09 16l.92-.92a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var svgStats='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
  ov.innerHTML=''
    +'<div style="background:#fff;border-radius:20px;padding:22px 18px 18px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3)">'
    +'<div style="font-size:1.5rem;text-align:center;margin-bottom:8px">📋</div>'
    +'<div style="font-size:.82rem;font-weight:800;color:#0f172a;text-align:center;margin-bottom:16px">Règles du quiz</div>'
    +'<div style="font-size:.73rem;color:#334155;line-height:1.65">'
    // Chrono
    +'<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;background:#fefce8;border-radius:10px;padding:9px 11px">'
    +svgChrono
    +'<div><strong style="color:#92400e">Chrono</strong> — 10 secondes par question. À 5s il passe au rouge, à 0 la question est skippée.</div></div>'
    // 50/50
    +'<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;background:#fef2f2;border-radius:10px;padding:9px 11px">'
    +svg5050
    +'<div><strong style="color:#991b1b">50/50</strong> — 2 mauvaises réponses grisées, il reste 2 choix.</div></div>'
    // Appel ami
    +'<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;background:#eff6ff;border-radius:10px;padding:9px 11px">'
    +svgPhone
    +'<div><strong style="color:#1e40af">Appel ami</strong> — Un indice apparaît juste sous la question.</div></div>'
    // Stats
    +'<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;background:#f5f3ff;border-radius:10px;padding:9px 11px">'
    +svgStats
    +'<div><strong style="color:#5b21b6">Statistiques</strong> — Ce que les autres ont répondu. La bonne réponse a souvent le plus grand %, mais pas toujours !</div></div>'
    +'</div>'
    +'<button onclick="document.getElementById(\'_rulesOv\').remove();(window._rulesCb&&window._rulesCb())" style="width:100%;background:#059669;border:none;border-radius:12px;padding:13px;font-family:inherit;font-size:.84rem;font-weight:700;color:#fff;cursor:pointer">J\'ai compris, on joue ! 🎯</button>'
    +'</div>';
  document.body.appendChild(ov);
  window._rulesCb=onDone;
}

function _jokersBar(ns, onChronoExpire){
  var ch=_QSession.chrono;
  return ''
    +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;flex-wrap:wrap">'
    // 50/50
    +'<button id="jk50_'+ns+'" onclick="_jokerCinqCinq(\''+ns+'\')" style="display:flex;align-items:center;gap:5px;background:linear-gradient(135deg,#f59e0b,#b45309);border:none;border-radius:20px;padding:7px 11px;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(245,158,11,.4);flex-shrink:0">'
    +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/><circle cx="12" cy="12" r="10"/></svg>'
    +'<span style="font-size:.62rem;font-weight:900;color:#fff;white-space:nowrap">50/50</span>'
    +'</button>'
    // Appel ami
    +'<button id="jkA_'+ns+'" onclick="_jokerAmi(\''+ns+'\')" style="display:flex;align-items:center;gap:5px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);border:none;border-radius:20px;padding:7px 11px;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(59,130,246,.4);flex-shrink:0">'
    +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.99-2.18H6.6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 15.09 16l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    +'<span style="font-size:.62rem;font-weight:900;color:#fff;white-space:nowrap">Ami</span>'
    +'</button>'
    // Stats
    +'<button id="jkP_'+ns+'" onclick="_jokerPct(\''+ns+'\')" style="display:flex;align-items:center;gap:5px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);border:none;border-radius:20px;padding:7px 11px;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(139,92,246,.4);flex-shrink:0">'
    +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
    +'<span style="font-size:.62rem;font-weight:900;color:#fff;white-space:nowrap">Stats</span>'
    +'</button>'
    // Chrono
    +(ch
      ?'<div style="display:flex;align-items:center;gap:5px;background:#0f172a;border-radius:20px;padding:7px 12px;margin-left:auto;flex-shrink:0">'
      +'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
      +'<span id="chrono_'+ns+'" style="font-size:.64rem;font-weight:800;color:#475569;min-width:26px;transition:color .3s">60s</span>'
      +'</div>'
      :'')
    +'</div>';
}

function _nsState(ns){
  if(ns==='AD') return qadState;
  if(ns==='RH') return qrhState;
  if(ns==='RUP') return qruptState;
  // QCM dynamiques : état stocké dans window._qcmActiveState
  if(window._qcmActiveState && window._qcmActiveState._ns===ns) return window._qcmActiveState;
  return null;
}
function _nsQ(ns){
  if(ns==='AD') return QAD;
  if(ns==='RH') return QRH;
  if(ns==='RUP') return QRUP;
  if(window._qcmActiveState && window._qcmActiveState._ns===ns) return window._qcmActiveState.questions;
  return null;
}

function _jokerCinqCinq(ns){
  if(!_QJokers.cinqcinq){_jToast('✂️ 50/50 déjà utilisé !');return;}
  _QJokers.cinqcinq=false;_QJokerUsedThisQ=true;_jSound('cinqcinq');
  var b=document.getElementById('jk50_'+ns);
  if(b){b.style.opacity='.3';b.style.pointerEvents='none';}
  var st=_nsState(ns),Q=_nsQ(ns);if(!st||!Q)return;
  var cur=st.cur!==undefined?st.cur:0;
  var q=Q[cur],w=[];
  for(var i=0;i<q.opts.length;i++)if(i!==q.a)w.push(i);
  w.sort(function(){return Math.random()-.5;}).slice(0,2).forEach(function(idx){
    document.querySelectorAll('[data-oi="'+idx+'"][data-ns="'+ns+'"]').forEach(function(el){
      el.style.opacity='.18';el.style.pointerEvents='none';
      el.style.transition='opacity .4s';
    });
  });
  _jToast('✂️ 2 mauvaises réponses éliminées !');
}

function _jokerAmi(ns){
  if(!_QJokers.ami){_jToast('📞 Joker ami déjà utilisé');return;}
  _QJokers.ami=false;_QJokerUsedThisQ=true;_jSound('ami');
  var b=document.getElementById('jkA_'+ns);if(b){b.style.opacity='.3';b.style.pointerEvents='none';}
  var st=_nsState(ns),Q=_nsQ(ns);if(!st||!Q)return;
  var cur=st.cur!==undefined?st.cur:0;
  var q=Q[cur];
  var pr=_QSession.prenom?_QSession.prenom:'toi';
  // Indice affiché directement sous la question dans la zone
  var hints=[
    '📞 <em>"Je pencherais pour la réponse <strong>'+String.fromCharCode(65+q.a)+'</strong> — mais vérifie !"</em>',
    '📞 <em>"Ça commence par <strong>'+q.opts[q.a].substring(0,6)+'…</strong> si je me souviens bien !"</em>',
    '📞 <em>"Option n°'+(q.a+1)+' selon moi, '+pr+' !"</em>'
  ];
  var hint=hints[Math.floor(Math.random()*hints.length)];
  // Chercher la zone d'indice déjà présente ou l'insérer sous la question
  var hintZone=document.getElementById('_amiHint_'+ns);
  if(!hintZone){
    // Insérer après le texte de la question
    var zone=document.querySelector('[data-ns="'+ns+'"]');
    if(zone && zone.parentNode){
      hintZone=document.createElement('div');
      hintZone.id='_amiHint_'+ns;
      hintZone.style.cssText='background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:10px 13px;margin-bottom:10px;font-size:.72rem;color:#1e40af;line-height:1.5';
      zone.parentNode.insertBefore(hintZone,zone);
    }
  }
  if(hintZone) hintZone.innerHTML=hint;
  _jToast('📞 Ton ami t\'a répondu !');
}

function _jokerPct(ns){
  if(!_QJokers.pct){_jToast('📊 Stats déjà utilisées');return;}
  _QJokers.pct=false;_QJokerUsedThisQ=true;_jSound('pct');
  var b=document.getElementById('jkP_'+ns);if(b){b.style.opacity='.3';b.style.pointerEvents='none';}
  var st=_nsState(ns),Q=_nsQ(ns);if(!st||!Q)return;
  var cur=st.cur!==undefined?st.cur:0;
  var q=Q[cur],n=q.opts.length;
  // Générer des % réalistes : bonne réponse a souvent le plus grand %
  // mais PAS toujours (30% du temps une mauvaise a plus) — réaliste
  var pcts=[];
  var bonne_est_max=(Math.random()>0.3); // 70% du temps la bonne est la plus haute
  var total=100;
  // Distribuer aléatoirement
  var base=[];
  for(var i=0;i<n;i++) base.push(5+Math.floor(Math.random()*20));
  var sum=base.reduce(function(a,b){return a+b;},0);
  base=base.map(function(v){return Math.max(5,Math.round(v/sum*80));});
  // Donner le reste à la bonne ou à une mauvaise selon le tirage
  var reste=100-base.reduce(function(a,b){return a+b;},0);
  if(bonne_est_max){
    base[q.a]+=reste+Math.floor(Math.random()*10);
  } else {
    // Une mauvaise au hasard prend le reste
    var faux=[];for(var j=0;j<n;j++)if(j!==q.a)faux.push(j);
    var winner=faux[Math.floor(Math.random()*faux.length)];
    base[winner]+=reste+Math.floor(Math.random()*8);
  }
  // Normaliser à 100
  sum=base.reduce(function(a,b){return a+b;},0);
  pcts=base.map(function(v){return Math.max(3,Math.round(v/sum*100));});

  var html='<div style="font-size:.72rem;font-weight:800;color:#0f172a;margin-bottom:10px">📊 Ce que les autres répondent :</div>';
  var maxPct=Math.max.apply(null,pcts);
  q.opts.forEach(function(o,i){
    var w=pcts[i]||5;
    var isMax=(w===maxPct);
    var col=isMax?'#1d4ed8':'#94a3b8';
    html+='<div style="margin-bottom:8px">'
      +'<div style="display:flex;justify-content:space-between;font-size:.62rem;font-weight:700;margin-bottom:3px">'
      +'<span style="color:#334155">'+String.fromCharCode(65+i)+'. '+o.substring(0,26)+(o.length>26?'…':'')+'</span>'
      +'<span style="color:'+col+';font-weight:900">'+w+'%</span>'
      +'</div>'
      +'<div style="background:#e2e8f0;border-radius:99px;height:7px;overflow:hidden">'
      +'<div style="background:'+col+';border-radius:99px;height:7px;width:0%;transition:width .7s ease" data-w="'+w+'"></div>'
      +'</div></div>';
  });
  if(!bonne_est_max){
    html+='<div style="font-size:.6rem;color:#b45309;margin-top:6px;font-style:italic">⚠️ Attention — le plus grand % n\'est pas forcément la bonne réponse !</div>';
  }
  _jModal(html,true);
  setTimeout(function(){
    document.querySelectorAll('[data-w]').forEach(function(el){el.style.width=el.getAttribute('data-w')+'%';});
  },60);
}

function _jToast(msg){
  var t=document.getElementById('_jT')||(function(){var el=document.createElement('div');el.id='_jT';el.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;border-radius:12px;padding:9px 16px;font-size:.68rem;font-weight:700;z-index:9999;pointer-events:none;transition:opacity .3s;white-space:nowrap;max-width:90vw;text-align:center';document.body.appendChild(el);return el;})();
  t.innerHTML=msg;t.style.opacity='1';clearTimeout(t._t);t._t=setTimeout(function(){t.style.opacity='0';},2400);
}
function _jModal(html,isHtml){
  var m=document.getElementById('_jM');
  if(!m){m=document.createElement('div');m.id='_jM';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;display:flex;align-items:flex-end;justify-content:center;padding-bottom:80px';m.innerHTML='<div style="background:#fff;border-radius:22px 22px 0 0;padding:22px 18px 26px;max-width:440px;width:100%;max-height:65vh;overflow-y:auto"><div id="_jMC" style="font-size:.78rem;color:#1e293b;line-height:1.65;margin-bottom:14px"></div><button onclick="document.getElementById(\'_jM\').style.display=\'none\'" style="width:100%;background:#0f172a;border:none;border-radius:12px;padding:13px;font-family:inherit;font-size:.76rem;font-weight:800;color:#fff;cursor:pointer">OK, compris ! 👊</button></div>';document.body.appendChild(m);}
  m.style.display='flex';
  document.getElementById('_jMC').innerHTML=isHtml?html:html.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
}

/* ── Animation pouce style YouTube ── */
function _thumbAnim(ok){
  var el=document.createElement('div');
  el.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10000;pointer-events:none;';
  // SVG pouce haut ou bas selon résultat
  var color=ok?'#16a34a':'#dc2626';
  var thumb=ok
    ?'<svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 28h-8a2 2 0 00-2 2v18a2 2 0 002 2h8V28z" fill="'+color+'"/><path d="M20 28l8-18c2 0 6 1 6 6v8h14a3 3 0 013 3.3l-2.5 16A3 3 0 0145.5 46H20V28z" fill="'+color+'"/></svg>'
    :'<svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 36h8a2 2 0 002-2V16a2 2 0 00-2-2h-8v22z" fill="'+color+'"/><path d="M44 36l-8 18c-2 0-6-1-6-6v-8H16a3 3 0 01-3-3.3l2.5-16A3 3 0 0118.5 18H44v18z" fill="'+color+'"/></svg>';
  // Particules éclat
  var particles='';
  var pts=ok?8:6;
  for(var i=0;i<pts;i++){
    var angle=(360/pts)*i;
    var dist=ok?52:38;
    var px=Math.round(Math.cos(angle*Math.PI/180)*dist);
    var py=Math.round(Math.sin(angle*Math.PI/180)*dist);
    var pc=ok?['#16a34a','#4ade80','#fbbf24','#34d399'][i%4]:['#dc2626','#f87171','#fb923c'][i%3];
    particles+='<div style="position:absolute;left:50%;top:50%;width:'+(ok?10:8)+'px;height:'+(ok?10:8)+'px;border-radius:50%;background:'+pc
      +';transform:translate(-50%,-50%);animation:_pt'+i+' .55s ease-out forwards"></div>'
      +'<style>@keyframes _pt'+i+'{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(calc(-50% + '+px+'px),calc(-50% + '+py+'px)) scale(0);opacity:0}}</style>';
  }
  el.innerHTML='<div style="position:relative;width:72px;height:72px;animation:_thumbPop .5s cubic-bezier(.34,1.6,.64,1) forwards">'
    +thumb+particles+'</div>'
    +'<style>'
    +'@keyframes _thumbPop{0%{transform:scale(0) rotate('+(ok?'-20deg':'20deg')+');opacity:0}60%{transform:scale(1.25) rotate('+(ok?'8deg':'-8deg')+');opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}'
    +'@keyframes _thumbFade{0%{opacity:1}100%{opacity:0}}'
    +'</style>';
  document.body.appendChild(el);
  // Disparaît après 800ms
  setTimeout(function(){
    el.style.animation='_thumbFade .25s ease forwards';
    setTimeout(function(){el.remove();},260);
  },750);
}
function _confetti(good){
  var colors=good
    ?['#16a34a','#34d399','#fbbf24','#3b82f6','#f59e0b','#10b981']
    :['#94a3b8','#cbd5e1','#e2e8f0','#64748b'];
  var canvas=document.createElement('canvas');
  canvas.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9999';
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  document.body.appendChild(canvas);
  var ctx=canvas.getContext('2d');
  var pieces=[];
  var count=good?90:30;
  for(var i=0;i<count;i++){
    pieces.push({
      x:Math.random()*canvas.width,
      y:-10-Math.random()*200,
      w:6+Math.random()*8,h:4+Math.random()*6,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*360,
      rotSpeed:(Math.random()-0.5)*8,
      vx:(Math.random()-0.5)*4,
      vy:2+Math.random()*(good?5:2),
      alpha:1
    });
  }
  var frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(function(p){
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
      p.x+=p.vx;p.y+=p.vy;p.rot+=p.rotSpeed;
      if(frame>40) p.alpha-=0.018;
    });
    frame++;
    if(frame<100) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

/* ── Garde quitter diagnostic Eva ── */
/* ── Bouton son Eva ── */
var _evaSoundOff=false;
function _evaToggleSound(){
  _evaSoundOff=!_evaSoundOff;
  var ico=document.getElementById('ec-snd-ico');
  var lbl=document.getElementById('ec-snd-lbl');
  var btn=document.getElementById('ec-snd-btn');
  var banner=document.getElementById('ec-snd-banner');
  if(_evaSoundOff){
    // Couper
    try{ if(window._evaSndCtx) window._evaSndCtx.suspend(); }catch(e){}
    window._evaStreamAbort=false; // on ne stoppe pas le streaming, juste le son
    if(ico) ico.innerHTML='<line x1="1" y1="1" x2="23" y2="23"/><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>';
    if(ico) ico.setAttribute('stroke','#ff6b6b');
    if(lbl) lbl.textContent='Son OFF';
    if(btn) btn.style.background='rgba(255,80,80,.2)';
    if(banner) banner.style.display='block';
  } else {
    // Rallumer
    try{ if(window._evaSndCtx) window._evaSndCtx.resume(); }catch(e){}
    if(ico) ico.innerHTML='<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
    if(lbl) lbl.textContent='Son';
    if(btn) btn.style.background='rgba(255,255,255,.12)';
    if(banner) banner.style.display='none';
  }
}

// ── Toggle son Eva Quiz (icône dans header résultat) ──
function _evaQuizToggleSound(uid){
  window._evaSoundOff = !window._evaSoundOff;
  var ico = document.getElementById('eva-snd-ico-'+uid);
  var btn = document.getElementById('eva-snd-btn-'+uid);
  if(window._evaSoundOff){
    try{ if(window._evaSndCtx) window._evaSndCtx.suspend(); }catch(e){}
    if(ico){ ico.innerHTML='<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/>'      +'<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/>'; ico.setAttribute('stroke','#ff6b6b'); }
    if(btn){ btn.style.background='rgba(255,80,80,.25)'; btn.style.borderColor='rgba(255,80,80,.4)'; }
    var _ot=document.createElement('div');
    _ot.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(12px);background:rgba(40,40,40,.96);backdrop-filter:blur(10px);border-radius:40px;padding:9px 18px;font-size:.7rem;font-weight:700;color:#fff;z-index:9990;opacity:0;transition:opacity .3s,transform .3s;white-space:nowrap;pointer-events:none';
    _ot.textContent='🔇 Son coupé';
    document.body.appendChild(_ot);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ _ot.style.opacity='1'; _ot.style.transform='translateX(-50%) translateY(0)'; }); });
    setTimeout(function(){ _ot.style.opacity='0'; setTimeout(function(){ if(_ot.parentNode)_ot.remove(); },350); },1800);
  } else {
    try{ if(window._evaSndCtx) window._evaSndCtx.resume(); }catch(e){}
    if(ico){ ico.innerHTML='<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/>'      +'<path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"/>'      +'<path d=\"M19.07 4.93a10 10 0 0 1 0 14.14\"/>'; ico.setAttribute('stroke','rgba(255,255,255,.85)'); }
    if(btn){ btn.style.background='rgba(255,255,255,.1)'; btn.style.borderColor='rgba(255,255,255,.2)'; }
  }
}


function evaQuitterGuard(){
  var evaScreen=document.getElementById('s-eva-coach');
  var isEvaActive=evaScreen && evaScreen.classList.contains('active');
  if(!isEvaActive || !window._evaInSession){ go('home'); return; }
  // Couper le son dès la tentative de sortie
  try{ if(window._evaSndCtx) window._evaSndCtx.suspend(); }catch(e){}
  window._evaStreamAbort=true;
  var old=document.getElementById('_evaQuitOv');if(old)old.remove();
  var ov=document.createElement('div');ov.id='_evaQuitOv';
  ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9995;display:flex;align-items:center;justify-content:center;padding:20px';
  ov.innerHTML=''
    +'<div style="background:#fff;border-radius:18px;padding:22px 18px 18px;max-width:340px;width:100%;text-align:center">'
    +'<div style="font-size:1.6rem;margin-bottom:10px">🤔</div>'
    +'<div style="font-size:.84rem;font-weight:800;color:#0f172a;margin-bottom:8px">Quitter le diagnostic ?</div>'
    +'<div style="font-size:.72rem;color:#64748b;line-height:1.55;margin-bottom:18px">Tu es en plein diagnostic avec Eva.<br>Ton avancement sera perdu si tu quittes.</div>'
    +'<div style="display:flex;gap:10px">'
    +'<button onclick="try{if(window._evaSndCtx)window._evaSndCtx.resume();}catch(e){}window._evaStreamAbort=false;document.getElementById(\'_evaQuitOv\').remove()" style="flex:1;background:#f1f5f9;border:none;border-radius:11px;padding:12px;font-family:inherit;font-size:.78rem;font-weight:700;color:#334155;cursor:pointer">Non, continuer</button>'
    +'<button onclick="_evaConfirmQuit()" style="flex:1;background:#dc2626;border:none;border-radius:11px;padding:12px;font-family:inherit;font-size:.78rem;font-weight:700;color:#fff;cursor:pointer">Oui, quitter</button>'
    +'</div>'
    +'</div>';
  document.body.appendChild(ov);
}
function _evaConfirmQuit(){
  window._evaInSession=false;
  var ov=document.getElementById('_evaQuitOv');if(ov)ov.remove();
  // Couper le son tic-tic d'Eva immédiatement
  try{ if(window._evaSndCtx) window._evaSndCtx.suspend(); }catch(e){}
  window._evaStreamAbort=true;
  // Message d'au revoir
  var msgs=document.getElementById('ec-msgs');
  if(msgs){
    var pr=(_QSession&&_QSession.prenom)?', '+_QSession.prenom:'';
    var bubble=document.createElement('div');
    bubble.style.cssText='display:flex;gap:8px;margin-bottom:10px;justify-content:flex-start';
    bubble.innerHTML='<div style="background:linear-gradient(135deg,#1e3a5f,#059669);border-radius:14px 14px 14px 4px;padding:10px 14px;max-width:80%;font-size:.78rem;color:#fff;line-height:1.5">'
      +'Au revoir'+pr+' 👋<br><span style="font-size:.7rem;opacity:.85">À très bientôt !</span></div>';
    msgs.appendChild(bubble);
    msgs.scrollTop=msgs.scrollHeight;
  }
  // Naviguer vers la destination en attente ou home
  var dest=window._evaPendingNav||'home';
  window._evaPendingNav=null;
  // Forcer la navigation sans garde
  var evaScreen=document.getElementById('s-eva-coach');
  if(evaScreen) evaScreen.classList.remove('active');
  setTimeout(function(){
    document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
    var sc=document.getElementById('s-'+dest);
    if(sc) sc.classList.add('active');
    scrollTo(0,0);
    var homeBtn=document.getElementById('tnav-home-btn');
    if(homeBtn) homeBtn.style.display=(dest==='home')?'none':'flex';
  },800);
}

// Bloquer le bouton retour Android pendant Eva
window.addEventListener('popstate',function(e){
  var evaScreen=document.getElementById('s-eva-coach');
  if(window._evaInSession && evaScreen && evaScreen.classList.contains('active')){
    history.pushState(null,'',location.href);
    window._evaPendingNav='home';
    evaQuitterGuard();
  }
});
history.pushState(null,'',location.href);

function quizIntro(onConfirm){
  _showRules(function(){
    var old=document.getElementById('_qiOv');if(old)old.remove();
    var ov=document.createElement('div');ov.id='_qiOv';
    ov.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);z-index:9990;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box';
    ov.innerHTML=''
      +'<div id="_qiBox" style="background:#fff;border-radius:22px;padding:24px 20px 22px;max-width:440px;width:100%;box-shadow:0 24px 70px rgba(15,23,42,.28);animation:cpQiIn .32s cubic-bezier(.2,.8,.2,1) both">'
      +'<div style="font-size:.56rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#059669;margin-bottom:14px">&#127919; Avant de commencer</div>'
      +'<div style="margin-bottom:12px">'
      +'<label style="font-size:.66rem;font-weight:700;color:#374151;display:block;margin-bottom:6px">Ton prénom</label>'
      +'<input id="_qiP" type="text" placeholder="Sophie, Karim, Léa…" maxlength="30" autocomplete="given-name" oninput="_qiCheck()" onkeydown="if(event.key===\'Enter\')_qiConfirm()" style="width:100%;box-sizing:border-box;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:11px 13px;font-size:.84rem;color:#0f172a;outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s">'
      +'<div id="_qiErr" style="display:none;margin-top:7px;font-size:.62rem;font-weight:600;color:#dc2626">Indique ton prénom pour commencer le quiz.</div>'
      +'</div>'
      +'<div style="margin-bottom:12px">'
      +'<label style="font-size:.66rem;font-weight:700;color:#374151;display:block;margin-bottom:6px">Nombre de questions</label>'
      +'<div style="display:flex;gap:6px;background:#f3f4f6;border-radius:12px;padding:4px">'
      +'<button type="button" id="_qiN15" onclick="_qiSetN(15)" style="flex:1;border:none;border-radius:9px;padding:9px 6px;font-family:inherit;cursor:pointer;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12);color:#0f172a;transition:all .2s"><div style="font-size:.8rem;font-weight:800">15 questions</div><div style="font-size:.58rem;color:#6b7280;margin-top:1px">≈ 5 min · format court</div></button>'
      +'<button type="button" id="_qiN25" onclick="_qiSetN(25)" style="flex:1;border:none;border-radius:9px;padding:9px 6px;font-family:inherit;cursor:pointer;background:transparent;box-shadow:none;color:#6b7280;transition:all .2s"><div style="font-size:.8rem;font-weight:800">25 questions</div><div style="font-size:.58rem;color:#6b7280;margin-top:1px">≈ 8 min · format complet</div></button>'
      +'</div>'
      +'</div>'
      +'<div onclick="_qiToggle()" style="display:flex;align-items:center;justify-content:space-between;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:11px 13px;margin-bottom:16px;cursor:pointer">'
      +'<div style="font-size:.76rem;font-weight:600;color:#374151">&#9201; Activer le chrono <span style="font-size:.62rem;color:#9ca3af;font-weight:400">(optionnel · 10s/question)</span></div>'
      +'<div id="_qiTog" style="width:42px;height:24px;background:#d1d5db;border-radius:99px;position:relative;transition:background .2s;flex-shrink:0">'
      +'<div id="_qiKnob" style="position:absolute;width:18px;height:18px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)"></div></div>'
      +'</div>'
      +'<button id="_qiGo" onclick="_qiConfirm()" style="width:100%;background:#059669;border:none;border-radius:11px;padding:13px;font-family:inherit;font-size:.84rem;font-weight:700;color:#fff;cursor:pointer;opacity:.45;transition:opacity .2s">C\'est parti !</button>'
      +'</div>';
    document.body.appendChild(ov);
    window._qiCb=onConfirm;window._qiChOn=false;window._qiNb=15;
    setTimeout(function(){var p=document.getElementById('_qiP');if(p)p.focus();},100);
  });
}
function _qiToggle(){
  window._qiChOn=!window._qiChOn;
  var t=document.getElementById('_qiTog'),k=document.getElementById('_qiKnob');
  if(t) t.style.background=window._qiChOn?'#059669':'#d1d5db';
  if(k) k.style.left=window._qiChOn?'21px':'3px';
}
// Choix du nombre de questions (15 ou 25)
function _qiSetN(n){
  window._qiNb=n;
  [15,25].forEach(function(k){
    var b=document.getElementById('_qiN'+k); if(!b) return;
    var on=(k===n);
    b.style.background=on?'#fff':'transparent'; b.style.boxShadow=on?'0 1px 3px rgba(0,0,0,.12)':'none'; b.style.color=on?'#0f172a':'#6b7280';
  });
}
// Blocage : le quiz ne démarre pas sans prénom
function _qiValid(){ var p=document.getElementById('_qiP'); var v=p?(p.value||'').trim():''; return v.length>=2 && /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(v); }
function _qiCheck(){
  var ok=_qiValid(), b=document.getElementById('_qiGo'), e=document.getElementById('_qiErr'), p=document.getElementById('_qiP');
  if(b) b.style.opacity=ok?'1':'.45';
  if(ok){ if(e) e.style.display='none'; if(p){ p.style.setProperty('border-color','#e5e7eb'); p.style.setProperty('box-shadow','none'); } }
}
function _qiConfirm(){
  if(!_qiValid()){
    var p=document.getElementById('_qiP'), e=document.getElementById('_qiErr'), bx=document.getElementById('_qiBox');
    if(e) e.style.display='block';
    if(p){ p.style.setProperty('border-color','#dc2626','important'); p.style.setProperty('box-shadow','0 0 0 4px rgba(220,38,38,.12)','important'); p.focus(); }
    if(bx && bx.animate) bx.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:320});
    return;
  }
  _QSession.prenom=(document.getElementById('_qiP').value||'').trim();
  _QSession.chrono=!!window._qiChOn;
  _QSession.nb=(window._qiNb===25)?25:15;
  _QJokers={cinqcinq:true,ami:true,pct:true};
  var ov=document.getElementById('_qiOv');if(ov)ov.remove();
  if(window._qiCb)window._qiCb();
}
function _patchOpts(zoneId,ns){
  var z=document.getElementById(zoneId);if(!z)return;
  z.querySelectorAll('[onclick*="answer"]').forEach(function(el,i){el.setAttribute('data-oi',i);el.setAttribute('data-ns',ns);});
}

// ── Verrou anti-double-clic + feedback visuel + délai 1s ──
function _qcmSelect(ns, idx, color, cb){
  // 1. Bloquer TOUS les boutons immédiatement
  document.querySelectorAll('[data-ns="'+ns+'"]').forEach(function(el){
    el.style.pointerEvents='none';
    el.style.cursor='default';
    el.onclick=null;
  });
  // 2. Trouver le bouton cliqué et le faire clignoter 2x
  var chosen = document.querySelector('[data-ns="'+ns+'"][data-oi="'+idx+'"]');
  if(chosen){
    var c = color||'#059669';
    chosen.style.borderColor = c;
    chosen.style.background = 'rgba(5,150,105,.12)';
    chosen.style.transition = 'all .15s';
    setTimeout(function(){ chosen.style.opacity='0.35'; }, 150);
    setTimeout(function(){ chosen.style.opacity='1'; }, 320);
    setTimeout(function(){ chosen.style.opacity='0.35'; }, 500);
    setTimeout(function(){ chosen.style.opacity='1'; }, 680);
  }
  // 3. Passer à la suite après 1 seconde
  setTimeout(cb, 1000);
}

function resetQuizAdmin(){ QAD=buildQAD(); qadState={cur:0,score:0,answers:[],done:false}; }
function renderQuizAdmin(){
  var zone=document.getElementById('qad-zone'); if(!zone) return;
  var q=QAD[qadState.cur];
  var pct=Math.round((qadState.cur/QAD.length)*100);
  var bar=document.getElementById('qad-bar'); if(bar) bar.style.width=pct+'%';
  var step=document.getElementById('qad-step'); if(step) step.textContent='Question '+(qadState.cur+1)+' / '+QAD.length;
  var pctEl=document.getElementById('qad-pct'); if(pctEl) pctEl.textContent=pct+'%';
  zone.innerHTML=_jokersBar('AD')
    +'<div style="font-size:.62rem;font-weight:700;color:#059669;margin-bottom:8px">Question '+(qadState.cur+1)+' / '+QAD.length+'</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.22rem;color:#0f172a;line-height:1.5;margin-bottom:20px">'+q.q+'</div>'
    +q.opts.map(function(o,i){
      return '<div onclick="answerQuizAdmin('+i+')" data-oi="'+i+'" data-ns="AD" style="display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:13px 15px;margin-bottom:10px;cursor:pointer;transition:all .15s" onmousedown="this.style.borderColor=\'#059669\';this.style.background=\'#f0fdf4\'" onmouseup="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'" ontouchstart="this.style.borderColor=\'#059669\';this.style.background=\'#f0fdf4\'" ontouchend="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'">'
        +'<div style="width:26px;height:26px;border-radius:50%;background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.62rem;font-weight:800;color:#64748b">'+String.fromCharCode(65+i)+'</div>'
        +'<div style="font-size:.82rem;color:#334155;line-height:1.45;font-weight:500">'+o+'</div>'
        +'</div>';
    }).join('');
  _chronoStart('chrono_AD', function(){ _jToast('⏱️ Temps écoulé !'); if(qadState.cur<QAD.length-1){qadState.cur++;renderQuizAdmin();}else{_chronoStop();showQuizAdminResult();}});
}
function answerQuizAdmin(idx){
  var q=QAD[qadState.cur];
  var correct=idx===q.a;
  if(_QJokerUsedThisQ) _thumbAnim(correct);
  _QJokerUsedThisQ=false;
  qadState.answers.push({q:q.q,chosen:q.opts[idx],correct_ans:q.opts[q.a],ok:correct});
  if(correct) qadState.score++;
  _qcmSelect('AD', idx, '#059669', function(){ if(qadState.cur<QAD.length-1){ qadState.cur++; renderQuizAdmin(); }else { _chronoStop(); showQuizAdminResult(); } });
}
// ── Générateur IA Plan d'Action Eva (API Anthropic, sans clé exposée) ──
// ── Définitions enrichies par notion (base de connaissance Eva) ──
var EVA_DEFS = {
  'allocation de retour': 'L\'ARE-Formation (Allocation de Retour à l\'Emploi Formation) est versée par France Travail aux demandeurs d\'emploi qui suivent une formation prescrite. Elle remplace l\'allocation chômage classique et peut être majorée. Le montant est calculé sur la base des 12 derniers mois de salaire. La durée varie selon la durée de la formation. Elle garantit une sécurité financière pendant la reconversion.',
  'plan de sauvegarde': 'Le PSE (Plan de Sauvegarde de l\'Emploi) est obligatoire dans les entreprises de 50 salariés et plus lors d\'un licenciement collectif d\'au moins 10 salariés sur 30 jours. Il doit proposer des mesures de reclassement, de formation ou de création d\'entreprise. Il est négocié avec les représentants du personnel ou homologué par la DREETS. Sans PSE valide, les licenciements sont nuls. C\'est une protection majeure pour les salariés concernés.',
  'abandon de poste': 'Depuis la loi du 21 décembre 2022, le salarié en abandon de poste peut être présumé démissionnaire après mise en demeure de reprendre le travail restée sans réponse sous 15 jours. Avant 2023, l\'abandon de poste menait souvent à un licenciement. Désormais la présomption de démission prive le salarié de l\'assurance chômage. Le salarié peut contester devant le conseil de prud\'hommes. C\'est un changement fondamental du droit du travail.',
  'indemnisation chômage': 'La durée maximale d\'indemnisation chômage est de 24 mois pour les moins de 53 ans, 30 mois pour les 53-54 ans, et 36 mois pour les 55 ans et plus. Ces durées peuvent être réduites en période de bas chômage (règles de dégressivité). L\'allocation est calculée sur les 24 derniers mois de salaire. Un différé d\'indemnisation peut s\'appliquer en cas d\'indemnités de départ. La condition d\'affiliation minimale est de 6 mois sur les 24 derniers mois.',
  'rupture conventionnelle': 'La rupture conventionnelle homologuée (RCH) est un accord amiable entre employeur et salarié pour rompre le CDI. Elle donne droit à l\'assurance chômage et à une indemnité spécifique au moins égale à l\'indemnité légale de licenciement. Elle nécessite un ou plusieurs entretiens, un délai de rétractation de 15 jours, puis homologation par la DREETS sous 15 jours ouvrables. Elle ne peut pas être imposée. C\'est la forme de séparation la plus répandue en France.',
  'licenciement': 'Le licenciement est la rupture du contrat à l\'initiative de l\'employeur. Il doit reposer sur une cause réelle et sérieuse (personnelle ou économique). La procédure comprend : convocation à entretien préalable, entretien avec délai de réflexion, puis notification par lettre recommandée. Les délais de préavis varient selon l\'ancienneté et la convention collective. Le salarié a 12 mois pour contester devant le conseil de prud\'hommes.',
  'préavis': 'Le préavis est la période de travail effectif entre la notification de rupture et la fin effective du contrat. Sa durée est fixée par la loi, la convention collective ou le contrat (selon le plus favorable au salarié). Il peut être dispensé par l\'employeur mais doit alors être indemnisé. En cas de licenciement pour faute grave ou lourde, il n\'y a pas de préavis. L\'inexécution injustifiée du préavis entraîne une indemnité compensatrice.',
  'convention collective': 'La convention collective est un accord négocié entre syndicats d\'employeurs et de salariés qui complète et améliore le Code du travail dans une branche professionnelle. Elle fixe les minima salariaux, les conditions de travail, les classifications de postes. Elle s\'applique à toutes les entreprises de la branche. Le salarié peut la consulter librement. Elle prime sur le contrat de travail sauf disposition plus favorable pour le salarié.',
  'clause de non-concurrence': 'La clause de non-concurrence interdit au salarié, après la rupture du contrat, d\'exercer des fonctions similaires chez un concurrent ou à son compte. Elle doit être limitée dans le temps, dans l\'espace, et dans l\'objet. Elle doit être indispensable à la protection des intérêts légitimes de l\'entreprise. Elle doit obligatoirement être assortie d\'une contrepartie financière (en général 30 à 50% du salaire mensuel). Sans ces conditions, elle est nulle.',
  'heures supplémentaires': 'Les heures supplémentaires sont les heures effectuées au-delà de la durée légale de 35h/semaine. Elles sont majorées d\'au moins 25% pour les 8 premières heures (36h à 43h) et 50% au-delà. Elles peuvent être compensées par du repos compensateur équivalent. Le contingent annuel est généralement fixé à 220h par convention collective. Au-delà du contingent, une autorisation de l\'inspecteur du travail peut être requise.',
  'période d\'essai': 'La période d\'essai permet à l\'employeur d\'évaluer les compétences du salarié et au salarié de confirmer son choix de poste. En CDI, elle est de 2 mois pour les ouvriers/employés, 3 mois pour les techniciens/agents de maîtrise, 4 mois pour les cadres. Elle peut être renouvelée une fois si la convention collective le prévoit. La rupture pendant l\'essai est libre mais doit respecter un délai de prévenance. Passé l\'essai, le salarié bénéficie de toutes les protections du CDI.',
  'default': 'Cette notion appartient au droit du travail et de l\'emploi français. Elle régit les relations entre employeurs et salariés et protège les droits fondamentaux des travailleurs. Comprendre ce point est essentiel pour défendre ses droits professionnels et naviguer dans les situations de rupture ou de gestion de carrière. Le Code du travail, les conventions collectives et la jurisprudence constituent les trois piliers à maîtriser. Eva peut t\'expliquer chaque aspect en détail sur simple demande.'
};

function evaGetDefinition(question){
  var q = (question||'').toLowerCase();
  for(var key in EVA_DEFS){
    if(key !== 'default' && q.indexOf(key) >= 0) return EVA_DEFS[key];
  }
  // Recherche par mots-clés communs
  if(q.indexOf('licenci')>=0) return EVA_DEFS['licenciement'];
  if(q.indexOf('préavis')>=0||q.indexOf('preavis')>=0) return EVA_DEFS['préavis'];
  if(q.indexOf('convention')>=0) return EVA_DEFS['convention collective'];
  if(q.indexOf('heure')>=0&&q.indexOf('suppl')>=0) return EVA_DEFS['heures supplémentaires'];
  if(q.indexOf('essai')>=0) return EVA_DEFS['période d\'essai'];
  if(q.indexOf('non-concurr')>=0||q.indexOf('concurr')>=0) return EVA_DEFS['clause de non-concurrence'];
  if(q.indexOf('rupture')>=0) return EVA_DEFS['rupture conventionnelle'];
  return EVA_DEFS['default'];
}

// ── Conseils Eva locaux — expert droit & emploi France 1960-2025 ──
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// EVA — STREAMING v2 · Diagnostic enrichi · Ouverture au clic
// ══════════════════════════════════════════════════════════════

function generateEvaAIPlan(uid, quizName, score, total, answers){
  var el = document.getElementById('eva-ai-plan-'+uid);
  if(!el) return;

  var faibles = answers.filter(function(a){ return !a.ok; });
  var pct = Math.round((score/total)*100);
  var quizKey = getQuizKey(quizName);
  var barem = calculerScorePondere(answers, quizKey);
  var n = (quizName||'').toLowerCase();
  var isComport = /entretien|leadership|stress|manager|int[eé]gr|posture|conflit|motivation/.test(n);
  var now = new Date();
  var dateStr = now.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'});
  var heureStr = now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});

  // ── Stocker le contexte ──
  window['_evaCtx_'+uid] = {
    uid:uid, quizName:quizName, score:score, total:total, pct:pct,
    barem:barem, faibles:faibles, isComport:isComport, n:n,
    answers:answers, dateStr:dateStr, heureStr:heureStr, step:0,
    prenom:_QSession.prenom||''
  };

  // ── BOUTON D'OUVERTURE — Eva s'ouvre uniquement au clic ──
  var qn = quizName.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  el.innerHTML =
    '<div id="eva-trigger-'+uid+'" style="margin-bottom:14px">'
    +'<button onclick="evaOpen(\''+uid+'\')" '
    +'style="display:flex;align-items:center;gap:12px;width:100%;background:linear-gradient(135deg,#0a1628,#0f2744);border:1.5px solid rgba(52,211,153,.22);border-radius:16px;padding:15px 16px;cursor:pointer;font-family:inherit;transition:all .2s;text-align:left;box-shadow:0 4px 20px rgba(0,0,0,.25)">'
    +'<div style="width:46px;height:46px;border-radius:13px;background:linear-gradient(135deg,#0f766e,#1e40af);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 16px rgba(15,118,110,.45)">'
    +'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>'
    +'</div>'
    +'<div style="flex:1">'
    +'<div style="font-size:.82rem;font-weight:800;color:#fff;margin-bottom:4px;letter-spacing:-.01em">✨ Voir l\'analyse complète d\'Eva</div>'
    +'<div style="font-size:.63rem;color:rgba(255,255,255,.45);line-height:1.4">Diagnostic · Exemples · Chiffres · Plan d\'action</div>'
    +'</div>'
    +'<div style="width:30px;height:30px;border-radius:50%;background:rgba(52,211,153,.12);border:1.5px solid rgba(52,211,153,.28);display:flex;align-items:center;justify-content:center;flex-shrink:0">'
    +'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>'
    +'</div>'
    +'</button>'
    +'</div>'
    +'<div id="eva-cb-'+uid+'" style="display:none"></div>';
}

// ── Ouverture au clic — construit le shell et lance le flow ──
function evaOpen(uid){
  var trigger = document.getElementById('eva-trigger-'+uid);
  if(trigger) trigger.style.display='none';
  var cb = document.getElementById('eva-cb-'+uid);
  if(!cb) return;
  cb.style.display='block';

  var ctx = window['_evaCtx_'+uid];
  if(!ctx) return;

  cb.innerHTML =
    '<div style="background:linear-gradient(160deg,#0a1628,#0f2744);border-radius:18px;overflow:hidden;margin-bottom:12px;border:1px solid rgba(52,211,153,.10);box-shadow:0 8px 32px rgba(0,0,0,.3)">'
    // ── Header ──
    +'<div style="background:linear-gradient(135deg,#0f766e,#1e40af);padding:14px 16px;display:flex;align-items:center;gap:11px">'
    +'<div style="width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(255,255,255,.15)">'
    +'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>'
    +'</div>'
    +'<div style="flex:1">'
    +'<div style="font-size:.8rem;font-weight:800;color:#fff;letter-spacing:-.01em">⭐ Eva · CareerPulse</div>'
    +'<div style="display:flex;align-items:center;gap:6px;margin-top:3px">'
    +'<div style="width:7px;height:7px;background:#34d399;border-radius:50%;box-shadow:0 0 6px #34d399;animation:pulse 2s infinite"></div>'
    +'<span style="font-size:.52rem;color:rgba(255,255,255,.6)">En ligne · '+ctx.dateStr+' à '+ctx.heureStr+'</span>'
    +'</div>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:8px;">'
    +'<div style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:4px 10px;font-size:.5rem;font-weight:800;color:rgba(255,255,255,.75);letter-spacing:.05em;text-transform:uppercase;max-width:110px;text-align:center;line-height:1.3">'+ctx.quizName+'</div>'
    +'<button id="eva-snd-btn-'+uid+'" onclick="_evaQuizToggleSound(\''+uid+'\')" title="Son" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .2s">'
    +'<svg id="eva-snd-ico-'+uid+'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>'
    +'</button>'
    +'</div>'
    +'</div>'
    // ── Zone messages ──
    +'<div id="eva-msgs-'+uid+'" style="padding:16px 14px 12px;max-height:560px;overflow-y:auto;scroll-behavior:smooth"></div>'
    +'</div>';

  // ── Toast son avant lancement du stream ──
  (function(){
    if(!window._evaSoundOff){
      var _t=document.createElement('div');
      _t.id='eva-snd-toast-'+uid;
      _t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(12px);background:rgba(15,118,110,.97);backdrop-filter:blur(10px);border-radius:40px;padding:9px 14px 9px 11px;display:flex;align-items:center;gap:9px;z-index:9990;box-shadow:0 4px 24px rgba(0,0,0,.4);opacity:0;transition:opacity .3s,transform .3s;max-width:92vw;pointer-events:auto';
      _t.innerHTML=''
        +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
        +'<span style="font-size:.7rem;font-weight:700;color:#fff;white-space:nowrap">Eva va parler — son activé</span>'
        +'<button onclick="_evaQuizToggleSound(\''+uid+'\');this.closest(\'.eva-toast\').style.opacity=0;" style="background:rgba(255,255,255,.2);border:none;border-radius:20px;padding:3px 10px;font-size:.62rem;font-weight:800;color:#fff;cursor:pointer;font-family:inherit">Couper</button>';
      _t.querySelector('button').addEventListener('click',function(){ _t.style.opacity='0'; });
      document.body.appendChild(_t);
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        _t.style.opacity='1'; _t.style.transform='translateX(-50%) translateY(0)';
      }); });
      setTimeout(function(){
        _t.style.opacity='0'; _t.style.transform='translateX(-50%) translateY(12px)';
        setTimeout(function(){ if(_t.parentNode)_t.remove(); },350);
      },3500);
    }
  })();
  window._evaStreamAbort=false;

  setTimeout(function(){ evaNextStep(uid); }, 700);
}

// ── Son discret Eva ──
var _evaSndCtx = null;
function evaPlayTick(freq){
  if(window._evaSoundOff) return;
  try {
    if(!_evaSndCtx) _evaSndCtx = new (window.AudioContext||window.webkitAudioContext)();
    var c=_evaSndCtx, o=c.createOscillator(), g=c.createGain();
    o.connect(g); g.connect(c.destination);
    o.frequency.setValueAtTime(freq||820,c.currentTime);
    o.frequency.exponentialRampToValueAtTime((freq||820)*.75,c.currentTime+.1);
    g.gain.setValueAtTime(.028,c.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.14);
    o.start(c.currentTime); o.stop(c.currentTime+.14);
  } catch(e){}
}

// ── Son "ti-lup" à la réception d'un message Eva (chat principal) ──
function ecPlayTiLup(){
  if(window._evaSoundOff) return;
  try {
    if(!_evaSndCtx) _evaSndCtx = new (window.AudioContext||window.webkitAudioContext)();
    var c = _evaSndCtx;
    // Note 1 : "ti" — montante courte
    var o1=c.createOscillator(), g1=c.createGain();
    o1.connect(g1); g1.connect(c.destination);
    o1.type='sine';
    o1.frequency.setValueAtTime(660, c.currentTime);
    o1.frequency.linearRampToValueAtTime(880, c.currentTime+.07);
    g1.gain.setValueAtTime(.045, c.currentTime);
    g1.gain.exponentialRampToValueAtTime(.0001, c.currentTime+.1);
    o1.start(c.currentTime); o1.stop(c.currentTime+.1);
    // Note 2 : "lup" — descendante douce
    var o2=c.createOscillator(), g2=c.createGain();
    o2.connect(g2); g2.connect(c.destination);
    o2.type='sine';
    o2.frequency.setValueAtTime(520, c.currentTime+.12);
    o2.frequency.linearRampToValueAtTime(380, c.currentTime+.22);
    g2.gain.setValueAtTime(.038, c.currentTime+.12);
    g2.gain.exponentialRampToValueAtTime(.0001, c.currentTime+.26);
    o2.start(c.currentTime+.12); o2.stop(c.currentTime+.28);
  } catch(e){}
}

// ── Afficher / masquer la bannière de streaming ──
function _ecShowStreamWarn(show){
  var w=document.getElementById('ec-stream-warn');
  if(w) w.style.display=show?'flex':'none';
}

// ── Micro — Web Speech API ──
var _ecMicRec = null;
var _ecMicOn  = false;
function ecToggleMic(){
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var btn = document.getElementById('ec-mic-btn');
  var ico = document.getElementById('ec-mic-ico');
  var inp = document.getElementById('ec-input');
  if(!SR){
    _ecToast('🎤 Microphone non supporté sur ce navigateur');
    return;
  }
  if(_ecMicOn){
    // Couper le micro
    if(_ecMicRec) _ecMicRec.stop();
    _ecMicOn=false;
    _ecMicSetUI(false);
    return;
  }
  // Activer le micro
  _ecMicRec = new SR();
  _ecMicRec.lang = 'fr-FR';
  _ecMicRec.continuous = false;
  _ecMicRec.interimResults = true;
  _ecMicRec.onstart = function(){
    _ecMicOn = true;
    _ecMicSetUI(true);
  };
  _ecMicRec.onresult = function(e){
    var transcript = '';
    for(var i=e.resultIndex;i<e.results.length;i++) transcript += e.results[i][0].transcript;
    if(inp){ inp.value = transcript; ecAutoResize(inp); }
  };
  _ecMicRec.onerror = function(){
    _ecMicOn=false; _ecMicSetUI(false);
    _ecToast('🎤 Accès au micro refusé ou erreur');
  };
  _ecMicRec.onend = function(){
    _ecMicOn=false; _ecMicSetUI(false);
    // Envoi automatique si du texte a été dicté
    var v=(inp?inp.value:'').trim();
    if(v && !inp.disabled) setTimeout(function(){ ecSend(); },200);
  };
  try { _ecMicRec.start(); } catch(e){ _ecToast('🎤 Impossible de démarrer le micro'); }
}
function _ecMicSetUI(active){
  var btn=document.getElementById('ec-mic-btn');
  var ico=document.getElementById('ec-mic-ico');
  if(!btn||!ico) return;
  if(active){
    btn.style.background='#ef4444';
    btn.style.borderColor='#dc2626';
    ico.setAttribute('stroke','#fff');
    btn.style.boxShadow='0 0 0 4px rgba(239,68,68,.25)';
    btn.style.animation='ecMicPulse 1s ease-in-out infinite';
  } else {
    btn.style.background='#f1f5f9';
    btn.style.borderColor='#e2e8f0';
    ico.setAttribute('stroke','#64748b');
    btn.style.boxShadow='none';
    btn.style.animation='none';
  }
}
function _ecToast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(10px);background:rgba(15,23,42,.94);border-radius:30px;padding:8px 18px;font-size:.7rem;font-weight:700;color:#fff;z-index:9999;opacity:0;transition:opacity .3s,transform .3s;white-space:nowrap;pointer-events:none';
  t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ t.style.opacity='1';t.style.transform='translateX(-50%) translateY(0)'; }); });
  setTimeout(function(){ t.style.opacity='0'; setTimeout(function(){ if(t.parentNode)t.remove(); },350); },2200);
}
/* Animation pulsation micro */
(function(){
  if(document.getElementById('_ecMicStyle')) return;
  var s=document.createElement('style'); s.id='_ecMicStyle';
  s.textContent='@keyframes ecMicPulse{0%,100%{box-shadow:0 0 0 4px rgba(239,68,68,.25)}50%{box-shadow:0 0 0 8px rgba(239,68,68,.1)}}';
  document.head.appendChild(s);
})();

// ── Formater markdown Eva → HTML riche ──
function evaFmt(txt){
  return txt
    // Titres ###TITRE###
    .replace(/###([^#]+)###/g,'<div style="display:flex;align-items:center;gap:7px;margin:16px 0 8px"><div style="height:1px;flex:1;background:rgba(52,211,153,.2)"></div><span style="font-size:.54rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#34d399;white-space:nowrap">$1</span><div style="height:1px;flex:1;background:rgba(52,211,153,.2)"></div></div>')
    // ==surligné==
    .replace(/==(.*?)==/g,'<span style="background:rgba(52,211,153,.18);color:#a7f3d0;border-radius:4px;padding:1px 5px;font-weight:700">$1</span>')
    // **gras vert**
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#34d399;font-weight:800">$1</strong>')
    // *vert clair*
    .replace(/\*(.*?)\*/g,'<span style="color:#6ee7b7;font-weight:600">$1</span>')
    // sauts de ligne
    .replace(/\n\n/g,'<br><br>')
    .replace(/\n/g,'<br>');
}

// ── Créer une bulle avec meta Eva + heure ──
function evaNewBubble(uid){
  var msgs = document.getElementById('eva-msgs-'+uid);
  if(!msgs) return null;
  var h = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  var wrap = document.createElement('div');
  wrap.style.cssText = 'margin-bottom:22px';
  // Ajouter l'animation si pas encore présente
  if(!document.getElementById('eva-anim-style')){
    var s=document.createElement('style'); s.id='eva-anim-style';
    s.textContent='@keyframes evaBubIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}';
    document.head.appendChild(s);
  }
  wrap.innerHTML =
    // Meta
    '<div style="display:flex;align-items:center;gap:7px;margin-bottom:7px">'
    +'<div style="width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#0f766e,#1e40af);display:flex;align-items:center;justify-content:center;flex-shrink:0">'
    +'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>'
    +'</div>'
    +'<span style="font-size:.56rem;font-weight:800;color:#34d399;letter-spacing:.03em">Eva · CareerPulse</span>'
    +'<span style="font-size:.5rem;color:rgba(255,255,255,.28)">'+h+'</span>'
    +'</div>'
    // Texte
    +'<div class="eva-bt" style="font-size:.84rem;color:rgba(255,255,255,.88);line-height:1.82;padding-left:31px;letter-spacing:.008em;animation:evaBubIn .28s ease both"></div>';
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return wrap.querySelector('.eva-bt');
}

// ── Stream lettre par lettre — rythme de lecture, pas de course ──
function evaStream(uid, text, cb){
  window._evaStreamAbort=false;
  var textEl = evaNewBubble(uid);
  if(!textEl){ if(cb) setTimeout(cb,100); return; }
  var msgs = document.getElementById('eva-msgs-'+uid);

  var chars=text.split(''), i=0, raw='', lastNl=false;
  function next(){
    if(window._evaStreamAbort) return; // Arrêt immédiat si quit
    if(i<chars.length){
      var c=chars[i++];
      raw+=c;
      lastNl=(c==='\n');
      textEl.innerHTML=evaFmt(raw);
      if(msgs) msgs.scrollTop=msgs.scrollHeight;
      var d=(c==='.'||c==='!'||c==='?')?200:(c===','||c===':')?110:(c==='\n')?240:(c===' ')?30:(35+Math.random()*20);
      setTimeout(next,d);
    } else {
      if(cb) setTimeout(cb,600);
    }
  }
  next();
}

// ── Insérer une carte HTML statique ──
function evaCard(uid,html,cb){
  var msgs=document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var d=document.createElement('div');
  d.style.cssText='margin-bottom:16px';
  d.innerHTML=html;
  msgs.appendChild(d);
  msgs.scrollTop=msgs.scrollHeight;
  if(cb) setTimeout(cb,300);
}

// ── Boutons de réponse (compatibilité) ──
function evaShowBtns(uid,options){
  var msgs=document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var btns=document.createElement('div');
  btns.style.cssText='display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px;padding-left:31px';
  options.forEach(function(opt){
    var b=document.createElement('button');
    b.textContent=opt.label;
    b.style.cssText='background:rgba(52,211,153,.1);border:1.5px solid rgba(52,211,153,.28);border-radius:20px;padding:8px 15px;font-size:.68rem;font-weight:700;color:#34d399;cursor:pointer;font-family:inherit;transition:all .15s';
    b.onmouseover=function(){this.style.background='rgba(52,211,153,.22)'};
    b.onmouseout=function(){this.style.background='rgba(52,211,153,.1)'};
    b.onclick=function(){ btns.remove(); if(opt.next) setTimeout(function(){opt.next(uid);},300); };
    btns.appendChild(b);
  });
  msgs.appendChild(btns);
  msgs.scrollTop=msgs.scrollHeight;
}

// ── Bulle utilisateur ──
function evaShowUserChoice(uid,label){
  var msgs=document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var d=document.createElement('div');
  d.style.cssText='display:flex;justify-content:flex-end;margin-bottom:14px';
  d.innerHTML='<div style="background:rgba(52,211,153,.14);border:1px solid rgba(52,211,153,.25);border-radius:12px 0 12px 12px;padding:9px 13px;font-size:.72rem;font-weight:700;color:#6ee7b7;max-width:78%">'+label+'</div>';
  msgs.appendChild(d);
  msgs.scrollTop=msgs.scrollHeight;
}

// ── CTA final — Eva disponible + partage WhatsApp/Telegram ──
function evaShowEvaCallToAction(uid){
  var msgs=document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  setTimeout(function(){
    var _pr=window['_evaCtx_'+uid]?window['_evaCtx_'+uid].prenom:'';
    var _ctaMsg=_pr
      ?'✨ **'+_pr+', Eva est là pour toi.**\n\nTu as des questions sur tes droits, ton contrat, ta carrière ? Je t\'attends — parle-moi directement. 💬'
      :'✨ **Eva est disponible pour toi, maintenant.**\n\nTu as une question sur tes droits, ton contrat, ta carrière ? Parle-moi directement. 💬';
    evaStream(uid,_ctaMsg,function(){
      var enc=encodeURIComponent('🎯 Je viens de passer un quiz sur CareerPulse — diagnostic offert par Eva !\nTeste-toi aussi 👉 https://careerpulseia.com');
      evaCard(uid,
        '<div style="padding-left:31px">'
        +'<button onclick="go(\'eva\')" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:linear-gradient(135deg,#0f766e,#1e40af);border:none;border-radius:13px;padding:14px 18px;font-family:inherit;font-size:.8rem;font-weight:800;color:#fff;cursor:pointer;box-shadow:0 6px 22px rgba(15,118,110,.4);margin-bottom:10px;letter-spacing:.01em">'
        +'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
        +'💬 Parler à Eva maintenant</button>'
        +'<div style="font-size:.54rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.25);text-align:center;margin:8px 0 10px">── Partage ton score ──</div>'
        +'<div style="display:flex;gap:9px">'
        +'<a href="whatsapp://send?text='+enc+'" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:#25d366;border-radius:12px;padding:12px;text-decoration:none">'
        +'<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
        +'<span style="font-size:.72rem;font-weight:700;color:#fff">WhatsApp</span></a>'
        +'<a href="tg://msg?text='+enc+'" style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:#0088cc;border-radius:12px;padding:12px;text-decoration:none">'
        +'<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
        +'<span style="font-size:.72rem;font-weight:700;color:#fff">Telegram</span></a>'
        +'</div>'
        +'</div>'
      );
    });
  },500);
}

// ── Générer et afficher le code guichet dans le chat ──
function evaGenerateGuichet(uid){
  var msgs = document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var ctx = window['_evaCtx_'+uid];
  var stored = localStorage.getItem('cp_guichet_code');
  if(stored){
    var data = JSON.parse(stored);
    if(!data.diagnostics) data.diagnostics = {};
    var key = (ctx.quizName||'quiz').replace(/\s+/g,'_').toLowerCase();
    if(!data.diagnostics[key]){
      data.diagnostics[key] = { base:{score:ctx.score,total:ctx.total,note20:ctx.barem.note20,date:new Date().toISOString()}, sessions:[] };
    }
    data.diagnostics[key].sessions.push({score:ctx.score,total:ctx.total,note20:ctx.barem.note20,date:new Date().toISOString()});
    localStorage.setItem('cp_guichet_code', JSON.stringify(data));
    evaStream(uid, 'J\'ai retrouvé ton code **'+data.code+'**. Ton diagnostic "'+ctx.quizName+'" a bien été enregistré. Tu peux suivre ton évolution à chaque retour. 📊', function(){
      evaShowFinalCard(uid, data.code, data.prenom, false);
    });
  } else {
    evaStream(uid, 'Pour sauvegarder ce diagnostic et suivre ta progression dans le temps, je génère ton **Code Guichet Unique** CareerPulse. 🎫', function(){
      evaShowBtns(uid, [
        { label: '✅ Générer mon code', value: 'oui', next: function(uid){ evaCreateGuichetInChat(uid); } },
        { label: 'Plus tard', value: 'non', next: function(uid){ evaStream(uid, 'Pas de problème. Tu pourras créer ton code depuis le menu Quiz quand tu voudras. Bonne continuation ! 💪', null); } }
      ]);
    });
  }
}

function evaCreateGuichetInChat(uid){
  var msgs = document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var form = document.createElement('div');
  form.style.cssText = 'padding-left:31px;margin-bottom:16px';
  form.innerHTML = '<div style="background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.2);border-radius:12px;padding:12px">'
    +'<div style="font-size:.6rem;font-weight:700;color:#34d399;margin-bottom:8px">Entre ton prénom pour générer ton code :</div>'
    +'<div style="display:flex;gap:8px">'
    +'<input id="guichet-inline-prenom-'+uid+'" type="text" placeholder="Ton prénom" style="flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(52,211,153,.3);border-radius:8px;padding:9px 11px;font-size:.74rem;color:#fff;outline:none;font-family:inherit">'
    +'<button onclick="evaConfirmGuichet(\''+uid+'\')" style="background:#059669;border:none;border-radius:8px;padding:9px 13px;font-size:.68rem;font-weight:800;color:#fff;cursor:pointer;font-family:inherit;white-space:nowrap">Créer →</button>'
    +'</div>'
    +'</div>';
  msgs.appendChild(form);
  msgs.scrollTop = msgs.scrollHeight;
  window['_guichetFormEl_'+uid] = form;
}

function evaConfirmGuichet(uid){
  var inp = document.getElementById('guichet-inline-prenom-'+uid);
  var prenom = (inp ? inp.value : '').trim();
  if(!prenom){ if(inp) inp.style.borderColor='#ef4444'; return; }
  var form = window['_guichetFormEl_'+uid];
  if(form) form.remove();
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var part = '';
  for(var i=0;i<6;i++) part += chars[Math.floor(Math.random()*chars.length)];
  var code = 'CP-'+part+'-'+prenom.substring(0,2).toUpperCase();
  var ctx = window['_evaCtx_'+uid];
  var diagData = {};
  if(ctx){
    var key = (ctx.quizName||'quiz').replace(/\s+/g,'_').toLowerCase();
    diagData[key] = { base:{score:ctx.score,total:ctx.total,note20:ctx.barem.note20,date:new Date().toISOString()}, sessions:[{score:ctx.score,total:ctx.total,note20:ctx.barem.note20,date:new Date().toISOString()}] };
  }
  localStorage.setItem('cp_guichet_code', JSON.stringify({code:code, prenom:prenom, created:new Date().toISOString(), diagnostics:diagData}));
  evaShowUserChoice(uid, prenom);
  evaStream(uid, 'Parfait '+prenom+' ! Voici ton **Code Guichet Unique** — note-le bien. 🎫', function(){
    evaShowFinalCard(uid, code, prenom, true);
  });
}

function evaShowFinalCard(uid, code, prenom, isNew){
  var msgs = document.getElementById('eva-msgs-'+uid);
  if(!msgs) return;
  var card = document.createElement('div');
  card.style.cssText = 'background:linear-gradient(135deg,#065f46,#1e3a5f);border-radius:14px;padding:16px;margin-bottom:10px;text-align:center;margin-left:31px';
  card.innerHTML = '<div style="font-size:.5rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:6px">'+(isNew?'Ton nouveau code':'Ton code')+'</div>'
    +'<div style="font-family:monospace;font-size:1.5rem;font-weight:900;color:#34d399;letter-spacing:.2em;margin-bottom:6px">'+code+'</div>'
    +'<div style="font-size:.58rem;color:rgba(255,255,255,.45);margin-bottom:12px">'+prenom+' · CareerPulse Guichet Unique</div>'
    +'<button onclick="navigator.clipboard.writeText(\''+code+'\').then(function(){toast(\'Code copié ✓\')})" style="background:rgba(52,211,153,.2);border:1px solid rgba(52,211,153,.4);border-radius:8px;padding:7px 16px;font-size:.64rem;font-weight:800;color:#34d399;cursor:pointer;font-family:inherit">📋 Copier le code</button>'
    +(isNew?'<div style="font-size:.56rem;color:#fbbf24;margin-top:9px">📸 Fais une capture d\'écran !</div>':'');
  msgs.appendChild(card);
  msgs.scrollTop = msgs.scrollHeight;
}

// ══════════════════════════════════════════════════════════════
// FLOW — 6 messages enchaînés, zéro question, tout automatique
// ══════════════════════════════════════════════════════════════
// ── Pioche aléatoire dans un tableau ──
function _r(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ── Barème granulaire — 10 paliers sur le score exact ──
function evaBareme(pct){
  if(pct===100) return {tier:10, emoji:'🏆🔥', couleur:'parfait'};
  if(pct>=90)   return {tier:9,  emoji:'🥇⚡', couleur:'expert'};
  if(pct>=80)   return {tier:8,  emoji:'💪🌟', couleur:'solide'};
  if(pct>=70)   return {tier:7,  emoji:'📈✨', couleur:'avancé'};
  if(pct>=60)   return {tier:6,  emoji:'🎯💡', couleur:'confirmé'};
  if(pct>=50)   return {tier:5,  emoji:'🔄🔑', couleur:'intermédiaire'};
  if(pct>=40)   return {tier:4,  emoji:'🌱⬆️', couleur:'en progression'};
  if(pct>=30)   return {tier:3,  emoji:'🔍💥', couleur:'en construction'};
  if(pct>=20)   return {tier:2,  emoji:'🚀🦾', couleur:'débutant'};
  return              {tier:1,  emoji:'🎲💪', couleur:'départ'};
}

function evaNextStep(uid){
  var ctx=window['_evaCtx_'+uid];
  if(!ctx) return;
  var step=ctx.step++;
  var pct=ctx.pct, score=ctx.score, total=ctx.total;
  var quizName=ctx.quizName, faibles=ctx.faibles;
  var barem=ctx.barem, n=ctx.n, isComport=ctx.isComport;
  var br=evaBareme(pct);

  // ── MSG 0 · Score — verdict unique selon palier exact ──
  if(step===0){
    // Pools verdict par tier — jamais les mêmes mots
    var verdicts={
      10:['Score **absolu** — tu dépasses 98% des gens sur ce sujet. Chapeau bas. 🙌','**Maîtrise totale** — chaque règle, chaque nuance. C\'est rarissime. 🏅','Tu connais ce sujet mieux qu\'un grand nombre de pros. **100% — aucune faille.** 🔥'],
      9: ['**Niveau expert** — 1 ou 2 détails t\'ont résisté, mais ton niveau est vraiment au-dessus. 💎','Quasi parfait. =='+score+'/'+total+'== — il manque juste une poignée de nuances pour atteindre le sommet. ⚡','Tu maîtrises ce sujet en profondeur. Ce qui reste est du détail — on va le régler. 🎯'],
      8: ['**Très bon niveau** — tu sais clairement où tu vas sur ce sujet. Peu de gens arrivent là. 👏','=='+score+'/'+total+'== — solide. Quelques angles à affiner, mais la base est vraiment là. 💪','Tu as le niveau pour ne pas te faire avoir. Il reste quelques zones à verrouiller. 🔐'],
      7: ['**Bon niveau** — tu te situes au-dessus de la moyenne. Maintenant on vise l\'excellence. 📈','=='+score+'/'+total+'== — tu as les fondamentaux. Ce qui manque, c\'est la précision sur quelques règles clés. ✨','Tu navigues bien sur ce sujet. Quelques points à consolider et tu passes dans le top. 🚀'],
      6: ['**Niveau confirmé** — tu as plus de la moitié en main. Le reste est accessible et ça va vite. 💡','=='+score+'/'+total+'== — bonne base. Tu as les bons réflexes sur l\'essentiel. 🎯','Plus de la moitié maîtrisée — c\'est un vrai point de départ. Les lacunes restantes, on les règle maintenant. 🔧'],
      5: ['**Niveau intermédiaire** — la moitié est là. L\'autre moitié est ton prochain palier, et il est atteignable. 🔑','=='+score+'/'+total+'== — équilibre. Autant acquis qu\'à travailler. C\'est exactement ici que ça devient intéressant. ⚙️','Tu as les bases — il faut maintenant les transformer en vraie maîtrise. Ça se joue ici. 💥'],
      4: ['**En progression** — chaque bonne réponse est une règle de moins à découvrir. Tu avances. ⬆️','=='+score+'/'+total+'== — les fondations se posent. Ce niveau, c\'est le début d\'une vraie montée en compétence. 🌱','Tu as saisi les premières clés. Maintenant on construit dessus, brique par brique. 🏗️'],
      3: ['**En construction** — tu as identifié ce que tu ne sais pas encore. C\'est une force, pas une faiblesse. 🔍','=='+score+'/'+total+'== — point de départ honnête. On va aller chercher l\'essentiel, sans perdre de temps. 💥','Les bases restent à poser — mais elles se posent vite quand on sait où regarder. C\'est ce qu\'on fait maintenant. 🎯'],
      2: ['**Débutant(e) sur ce sujet** — et c\'est normal. Personne ne naît avec ces connaissances. On démarre. 🚀','=='+score+'/'+total+'== — il y a beaucoup à découvrir, et chaque notion que tu vas apprendre peut te faire gagner du temps ou de l\'argent. 🦾','Score de départ. La plupart des gens ne savent pas ces règles non plus — ils les subissent. Toi, tu vas les apprendre. 💪'],
      1: ['**Départ absolu** — zéro point de départ, zéro jugement. On construit tout depuis maintenant. 🎲','=='+score+'/'+total+'== — l\'honnêteté de tester sans rien savoir, c\'est ça le vrai courage. On y va. 🦾','Tu pars de la base. C\'est de là que les meilleures progressions se font. Chaque point gagné va compter double. 💥']
    };
    // Pools contexte par tier — angle différent selon le score exact
    var contextes={
      10:['Face à un employeur, un organisme ou un recruteur — ==aucune surprise possible==. Tu as l\'avantage absolu sur ce terrain.','Ce niveau te protège dans toutes les situations : négociation, litige, démarche — tu sais exactement quoi dire et quand. 🛡️'],
      9: ['Sur ce sujet, tu parles d\'égal à égal avec un spécialiste. Il manque 1 ou 2 détails techniques — on les cible. 🎯','Tu n\'as presque rien à apprendre — juste à verrouiller les dernières nuances qui font la différence en situation réelle. 🔐'],
      8: ['Tu peux affronter la plupart des situations sans te faire prendre de court. Les zones restantes sont précises — on les isole. 💡','Ton niveau t\'évite les erreurs coûteuses. Ce qui reste ? Des angles avancés que peu de gens connaissent. On va là. ⚡'],
      7: ['Tu sais l\'essentiel. Ce qui te manque, ce sont les règles de précision — celles qui font la différence quand ça compte vraiment. 🎯','Avec ce niveau, tu évites les pièges courants. Mais dans une situation tendue, quelques zones pourraient te coûter cher. On les traite. 🔧'],
      6: ['Tu as les bons réflexes sur plus de la moitié du sujet. Les zones floues restantes peuvent coûter : droits non réclamés, délais ratés. **On règle ça.** ⚙️','Ton socle est là. Ce qui te manque, ce sont les règles que les gens apprennent souvent trop tard — souvent à leurs dépens. 💸'],
      5: ['Autant acquis qu\'inconnu. En situation réelle, les lacunes restantes peuvent peser lourd. **C\'est maintenant qu\'on les comble.** 🔑','La moitié maîtrisée, c\'est solide. L\'autre moitié ? C\'est là que se jouent les vraies décisions professionnelles. 💥'],
      4: ['Tu as les premières clés — mais pas encore assez pour te défendre seul(e) dans une situation complexe. On y remédie. 🌱','Chaque règle que tu vas apprendre va changer quelque chose dans ta vie pro ou tes droits. Ce n\'est pas de la théorie. ⬆️'],
      3: ['Ces règles, la plupart des gens ne les maîtrisent pas — et ils paient cash : droits perdus, erreurs coûteuses, opportunités ratées. **On va là.** 💥','Peu de bases acquises, mais le terrain est vierge — et ça progresse vite quand on cible les bonnes notions. 🎯'],
      2: ['Ces règles existent, elles te concernent, et les ignorer peut coûter. **Chaque notion apprise ici a une valeur concrète.** 🦾','Le niveau de départ n\'est pas le niveau final. Ceux qui progressent le plus vite sont souvent ceux qui partent de zéro — sans mauvaises habitudes. 🚀'],
      1: ['Tout reste à découvrir — et c\'est une vraie chance. Tu n\'as aucune fausse certitude à désapprendre. On pose les bonnes bases dès maintenant. 💡','Le score ne dit pas ce que tu vas devenir sur ce sujet. Il dit où tu en es aujourd\'hui. Et aujourd\'hui, on commence. 💪']
    };
    var t=br.tier;
    var pr=ctx.prenom;
    var prenomLine=pr?br.emoji+' **'+pr+' — '+score+'/'+total+' — '+barem.note20+'/20 — '+barem.mention+'** 🎉\n\n':br.emoji+' **'+score+'/'+total+' — '+barem.note20+'/20 — '+barem.mention+'**\n\n';
    evaStream(uid,
      prenomLine
      +_r(verdicts[t])+'\n\n'
      +'###📊 CE QUE ÇA VEUT DIRE###\n'
      +_r(contextes[t]),
      function(){ evaNextStep(uid); });

  // ── MSG 1 · Points forts — angle unique selon tier ──
  } else if(step===1){
    var nbF=total-faibles.length;
    var t1=br.tier;
    var m1pools;
    if(t1>=7){
      m1pools=[
        '###✅ CE QUE TU TIENS BIEN###\n**'+nbF+'/'+total+'** maîtrisés — c\'est une vraie fondation. 💪\n\n==Tu navigues clairement au-dessus de la moyenne.== En pratique : face à un recruteur ou un organisme, tu poses les bonnes questions. 🥇',
        '###🏅 TES ACQUIS###\n'+nbF+' réponses correctes sur '+total+' — ce n\'est pas du hasard, c\'est de la maîtrise réelle. 🌟\n\nConcrètement, tu peux ==défendre ta position== dans la plupart des situations liées à ce sujet. 🛡️',
        '###💪 TU MAÎTRISES###\n**'+nbF+' questions sur '+total+'** dans le vert — solide. ✅\n\n💡 Ce niveau te place dans les ==20% les mieux informés== sur ce sujet. Peu de gens peuvent en dire autant. 🎯'
      ];
    } else if(t1>=5){
      m1pools=[
        '###✅ TES BONNES RÉPONSES###\n**'+nbF+'/'+total+'** — déjà là. 💡\n\nCes bases t\'évitent les erreurs les plus courantes. Maintenant on **monte d\'un cran** sur ce qui reste flou. 🚀',
        '###🎯 CE QUE TU MAÎTRISES###\n'+nbF+' bonnes réponses — c\'est ton socle. On le garde et on **construit dessus**. ⚙️\n\nEn situation réelle, ce que tu sais déjà peut te protéger dans les cas les plus fréquents. 🛡️',
        '###⚡ TES ACQUIS — pas rien !###\n**'+nbF+'/'+total+'** dans le vert. C\'est une base sur laquelle on peut travailler. 🌱\n\n💡 Ces réponses-là, tu les as eues par intuition ou par expérience — ==maintenant on les transforme en vraie connaissance==. 🔑'
      ];
    } else {
      m1pools=[
        '###🔍 UN REGARD HONNÊTE###\n**'+score+'/'+total+'** — il y a du chemin. Mais voilà ce que ça veut dire vraiment :\n\n⚡ La plupart des gens ne savent pas ces règles non plus. Ils les découvrent en urgence — et ça coûte. **Toi tu choisis de les apprendre maintenant.** 🦾',
        '###💥 SOYONS DIRECTS###\nAvec **'+score+' bonnes réponses**, le terrain est largement libre devant toi. Et c\'est une opportunité :\n\n🔑 Chaque notion que tu vas intégrer peut **changer une situation réelle** dans ta vie pro — droits, négociation, protection. C\'est concret.',
        '###🚀 LE VRAI POINT DE DÉPART###\n**'+score+'/'+total+'** — c\'est honnête. Et l\'honnêteté, c\'est la base de toute progression réelle. 💪\n\n💡 Les gens qui progressent le plus vite sont souvent ceux qui partent de zéro, sans fausses certitudes à désapprendre. ⬆️'
      ];
    }
    evaStream(uid, _r(m1pools), function(){ evaNextStep(uid); });

  // ── MSG 2 · Lacunes — formulation unique par tirage ──
  } else if(step===2){
    if(!faibles.length){
      var zeroLac=[
        '###🌟 ZÉRO LACUNE — HISTORIQUE !###\nTu as tout bon. **Tous les points.** C\'est dans le top 1%. 🏆\n\n🗓️ Reste à jour : SMIC ==11,65 €/h== · abandon de poste = présomption de démission · CPF ==100 €== de participation.\n\n**Reviens dans 6 mois** — ton prochain rendez-vous de veille. 📅',
        '###🏅 TABLEAU PARFAIT !###\nAucune erreur. Zéro faille. **'+total+'/'+total+'** — c\'est le score maximum. 🔥\n\n📌 Pour maintenir ce niveau : surveille les évolutions légales annuelles. Le droit du travail change — ceux qui restent informés gardent l\'avantage. ⚡\n\n==Calendrier de veille recommandé : tous les 6 mois.==',
        '###💎 SANS FAUTE !###\nTu n\'as pas laissé passer une seule réponse incorrecte. C\'est rare, et c\'est solide. 🌟\n\n💡 À ce niveau, l\'enjeu c\'est de **ne pas se laisser surprendre par les évolutions** : SMIC, CPF, nouvelles jurisprudences. ==Reviens dans 6 mois== pour vérifier que tu es toujours au top. 🎯'
      ];
      evaStream(uid, _r(zeroLac), function(){ evaNextStep(uid); });
    } else {
      var lac=faibles.slice(0,3);
      // Titres variés
      var titresLac=['###⚡ TES POINTS À BOOSTER###\n','###🎯 CE QU\'ON VA TRAVAILLER###\n','###🔧 LES ZONES À RENFORCER###\n','###⚠️ LÀ OÙ ÇA RÉSISTE###\n'];
      var m2=_r(titresLac);
      lac.forEach(function(f,i){
        m2+=['🔴','🟡','🟠'][i]+' '+f.q.substring(0,75)+(f.q.length>75?'...':'')+'\n→ =='+f.correct_ans+'==\n\n';
      });
      // Impact — plusieurs formulations par sujet
      var impacts={
        are:['💸 En pratique : une déclaration erronée à France Travail peut **geler 2 à 4 semaines d\'indemnisation**. Ceux qui maîtrisent ces règles récupèrent ==2-3 mois de droits en plus== sur la durée. 🎯',
             '⚡ Ces lacunes, en situation réelle, se traduisent par des **allocations bloquées ou réduites**. Les gens qui savent réclamaient — les autres acceptent. ==Ne fais pas partie des seconds.== 🔑',
             '💡 France Travail n\'est pas obligé de te signaler tes erreurs. Si tu ne sais pas, tu subis. Si tu sais, tu ==pilotes==. La différence peut valoir plusieurs mois d\'indemnisation. 💰'],
        cpf:['💸 Méconnaître le CPF = entre ==500 et 1 500 €== de droits perdus par an. La participation de 100 € depuis 2024 fait renoncer beaucoup de gens — à tort. 💰',
             '⚡ Ton CPF se remplit chaque année. Si tu ne le consultes pas, tu laisses de l\'argent sur la table. ==Solde actuel à vérifier sur moncompteformation.gouv.fr==. 🎯',
             '💡 Le CPF, c\'est une enveloppe formation financée par ton travail. Ne pas l\'utiliser, c\'est offrir ta montée en compétence à quelqu\'un d\'autre. ==Ne fais pas ce cadeau.== 🦾'],
        freelance:['💸 Dépasser un seuil sans anticiper = **redressement URSSAF potentiel**. L\'ACRE (==50% de charges en moins== la 1ère année) se demande dans les 45 jours après création — un seul oubli et c\'est perdu. ⏰',
                   '⚡ Ces lacunes peuvent coûter des milliers d\'euros — pas dans un scénario catastrophe, dans la **gestion courante**. Les seuils, l\'ACRE, la RC Pro : chacun a un impact financier direct. 💸',
                   '💡 Un auto-entrepreneur qui ne connaît pas ses seuils peut se retrouver en régime réel sans l\'avoir voulu. ==La surprise est toujours coûteuse.== Autant l\'éviter. 🛡️'],
        rupture:['💸 Une rupture conventionnelle mal préparée peut faire perdre ==l\'indemnité spécifique== ou compromettre les droits ARE. Le délai de rétractation de **15 jours** est souvent ignoré — et souvent décisif. ⚠️',
                 '⚡ La rupture conventionnelle, c\'est un outil puissant — mais seulement si tu en connais les règles. Mal préparée, elle peut te coûter plusieurs mois d\'indemnisation. ==Savoir, c\'est se protéger.== 🛡️',
                 '💡 Beaucoup signent une rupture sans lire les clauses ni connaître leurs recours. Le délai de ==15 jours== existe pour ça. L\'utiliser ou non, c\'est ton droit. Encore faut-il le savoir. 🔑'],
        comport:['🧠 Les lacunes comportementales se lisent dès les **3 premières minutes** en entretien. ==65% des recruteurs== disent que la posture prime sur le CV à profil équivalent. C\'est factuel. 🎯',
                 '⚡ En entretien, ce que tu **ne dis pas** en parle autant que ce que tu dis. Le non-verbal, la gestion du silence, le rythme — tout ça se travaille. ==Et ça change tout.== 💪',
                 '💡 Les lacunes comportementales sont les plus coûteuses parce que les moins visibles. Tu ne sais pas qu\'elles jouent contre toi — jusqu\'à ce que tu rates l\'entretien sans comprendre pourquoi. ==On les règle maintenant.== 🔧'],
        defaut:['💡 Ces règles = ton **bouclier direct** face aux situations où les autres improviseent. Ceux qui les connaissent ne se font jamais avoir. 🔑',
                '⚡ La méconnaissance de ces règles ne pardonne pas en situation réelle : ==droits perdus, délais ratés, positions de faiblesse==. La connaissance, elle, protège. 🛡️',
                '💸 En droit du travail, l\'ignorance n\'est jamais une excuse valide. Elle est souvent coûteuse. **Ces lacunes-là, on les comble maintenant.** 🎯']
      };
      var impactKey=n.indexOf('are')>=0||n.indexOf('chôm')>=0?'are'
        :n.indexOf('cpf')>=0?'cpf'
        :n.indexOf('freelance')>=0?'freelance'
        :n.indexOf('rupture')>=0?'rupture'
        :isComport?'comport':'defaut';
      m2+=_r(impacts[impactKey]);
      evaStream(uid, m2, function(){ evaNextStep(uid); });
    }

  // ── MSG 3 · Notions clés — 3 pools par sujet, tirage unique ──
  } else if(step===3){
    var titresNotions=['###💎 3 NOTIONS QUI CHANGENT TOUT###\n','###🔑 CE QUE PEU DE GENS SAVENT###\n','###⚡ 3 RÈGLES À RETENIR ABSOLUMENT###\n','###🎯 LES CLÉS QUI FONT LA DIFFÉRENCE###\n'];
    var m3=_r(titresNotions);

    var notionsPools={
      are:[
        '📅 **Délai de carence** : 7 jours fixes + congés non pris (==jusqu\'à 75 jours !==). Le versement commence après. Anticiper = éviter un mois difficile.\n\n🏥 **Portabilité mutuelle** : tu gardes ta mutuelle d\'entreprise **12 mois gratuits** après la fin du contrat. La plupart souscrivent une nouvelle — à tort.\n\n💰 **Abondement CPF** : ==500 €/an== (temps plein) · ==800 €/an== (non-qualifié). Ton employeur peut ajouter. Vérifie sur ==moncompteformation.gouv.fr==.',
        '🔄 **Actualisation mensuelle** : déclarer à France Travail même si tu as travaillé quelques heures. L\'oubli peut déclencher un ==trop-perçu à rembourser==. ⚠️\n\n📋 **Projet personnalisé d\'accès à l\'emploi (PPAE)** : tu as le droit de refuser une offre si elle ne correspond pas au PPAE signé. Peu de gens le savent — et peu l\'utilisent. 🛡️\n\n⏳ **Durée d\'indemnisation** : elle dépend de ton **dernier salaire et de ta durée de cotisation**. Un simulateur officiel existe sur france-travail.fr — utilise-le avant de prendre des décisions.',
        '💼 **Rechargement des droits** : si tu travailles pendant le chômage, tu peux ==recharger de nouveaux droits== à la fin. Beaucoup pensent que travailler fait perdre les droits — c\'est faux. ✅\n\n🔢 **SJR (Salaire Journalier de Référence)** : c\'est lui qui détermine ton allocation quotidienne. Il se calcule sur les 24 derniers mois. Une prime ou une période courte peut le faire varier significativement. 💸\n\n🎓 **Formation pendant le chômage** : suivre une formation maintient ou ==augmente== l\'indemnisation dans certains cas. C\'est cumulable avec le CPF.'
      ],
      freelance:[
        '📊 **Seuils 2024** : ==77 700 €== services · ==188 700 €== commerce. Au-delà = bascule forcée en régime réel. Un trimestre de dépassement peut tout changer. 💥\n\n⏰ **ACRE** : ==50% de charges en moins== la 1ère année. À demander dans les ==45 jours== après création — sinon perdu définitivement. ⚠️\n\n🛡️ **RC Pro** : ==150 à 600 €/an== selon l\'activité. Un seul litige sans couverture peut anéantir plusieurs années de revenus.',
        '🧾 **TVA et franchise en base** : en dessous des seuils micro, pas de TVA à facturer ni à reverser. Au-dessus = obligations comptables complètes. ==Vérifier chaque trimestre.== 🔢\n\n📅 **Déclaration de CA** : mensuelle ou trimestrielle selon le choix initial. Un oubli = majoration automatique. ==Le portail urssaf.fr envoie des rappels — activez-les.== 💡\n\n🏦 **Compte bancaire dédié** : obligatoire au-delà de ==10 000 €/an== de CA. Mixer perso et pro = risque de redressement. C\'est simple à faire, et ça protège.',
        '🤝 **Contrat de prestation** : indispensable même pour une mission courte. Sans contrat, c\'est toi qui es en position de faiblesse en cas de litige. ==Un modèle gratuit existe sur legalstart.fr.== 🛡️\n\n💰 **Cotisation retraite** : les micro-entrepreneurs cotisent à un taux réduit. En contrepartie, ==les droits retraite sont proportionnellement plus faibles==. Anticiper avec un PER dès le début change tout sur le long terme. 📈\n\n🔄 **Radiation si inactivité** : l\'URSSAF peut radier automatiquement après 24 mois sans CA déclaré. ==Signale une cessation d\'activité officiellement== pour éviter des complications.'
      ],
      comport:[
        '🧠 **Règle 7-38-55** : 7% mots · ==38% voix== · ==55% corps==. Travailler sa posture rapporte plus que préparer des réponses parfaites. 💪\n\n🎯 **Méthode STAR** : Situation → Tâche → Action → Résultat. Une réponse STAR = ==3× plus d\'impact== qu\'une réponse intuitive.\n\n🤫 **Silence stratégique** : tenir ==4 secondes== sans remplir = signal de confiance. Les recruteurs utilisent le silence pour déstabiliser. Ceux qui le tiennent passent le test.',
        '👁️ **Contact visuel** : ==70% du temps== en entretien. Pas fixé, mais ancré. Regarder ailleurs trop souvent = signal d\'insécurité détecté en quelques secondes. 🎯\n\n🗣️ **Rythme de parole** : parler ==20% plus lentement== que d\'habitude sous stress. Le cerveau stressé accélère — le recruteur perçoit de la nervosité. Ralentir = contrôle. ✅\n\n💡 **Question finale** : toujours en avoir une, précise, sur le poste ou l\'équipe. ==Ce n\'est pas une formalité — c\'est un signal d\'intérêt et de préparation.== 🔑',
        '🦁 **Assertivité vs agressivité** : défendre sa position sans hausser le ton = ==la compétence la plus rare et la plus valorisée== en entreprise. Ça se pratique, pas juste se comprend.\n\n🔄 **Gestion du stress visible** : les recruteurs repèrent les mains, la voix, les pauses. La technique ==4-7-8== (inspire 4s, retiens 7s, expire 8s) avant l\'entretien réduit le cortisol. Testé et validé. 💪\n\n🎭 **Adaptabilité de posture** : en face d\'un recruteur direct, sois direct. Face à quelqu\'un de méthodique, structure-toi. ==Lire le style de l\'autre et s\'y adapter== — c\'est de l\'intelligence situationnelle, pas de la manipulation. 🧠'
      ],
      defaut:[
        '⏱️ **Préavis** : l\'employeur peut dispenser — mais ==doit toujours payer==. Faute grave = exception. Beaucoup ne réclament pas leurs indemnités compensatrices. 💸\n\n⚖️ **Prud\'hommes** : ==12 mois== après licenciement pour agir. Passé ce délai, aucun recours. Prépare ton dossier dès la notification — pas 6 mois après. 🔑\n\n📋 **Convention collective** : prime sur le contrat si plus favorable. Elle fixe salaires minimaux, classifications, préavis. ==Peu de salariés l\'ont lue — erreur coûteuse.==',
        '📝 **Période d\'essai** : renouvelable ==une seule fois== et seulement si le contrat le prévoit. La rupture pendant la période d\'essai obéit à des délais de prévenance précis — les ignorer = faute de l\'employeur. ✅\n\n💰 **Primes et 13ème mois** : si versés ==3 années de suite==, ils peuvent devenir un droit acquis — même sans mention au contrat. La jurisprudence le reconnaît. 🛡️\n\n🔒 **Clause de non-concurrence** : doit être ==limitée dans le temps, l\'espace et le secteur==, et être assortie d\'une contrepartie financière. Sinon, elle est nulle. Un avocat peut la faire tomber.',
        '📅 **Délai de prescription des salaires** : ==3 ans== pour réclamer des salaires impayés, heures sup ou primes. Beaucoup pensent que passé l\'emploi, c\'est fini. Ce n\'est pas le cas. 💸\n\n🩺 **Visite médicale** : obligatoire à l\'embauche dans certains cas, et ==systématique après un arrêt long==. L\'employeur qui ne la propose pas est en faute — et l\'inaptitude déclarée sans visite peut être contestée. ⚖️\n\n🔄 **CDD et requalification** : un CDD mal rédigé, trop souvent renouvelé ou dépassant les délais légaux peut être ==requalifié en CDI== par les prud\'hommes. C\'est plus fréquent qu\'on ne le pense. 🎯'
      ]
    };
    var nKey=n.indexOf('are')>=0||n.indexOf('chôm')>=0||n.indexOf('admin')>=0?'are'
      :n.indexOf('freelance')>=0||n.indexOf('auto')>=0?'freelance'
      :isComport?'comport':'defaut';
    m3+=_r(notionsPools[nKey]);
    evaStream(uid, m3, function(){ evaNextStep(uid); });

  // ── MSG 4 · Plan + ressources — tirage unique ──
  } else if(step===4){
    var titresPlan=['###🗓️ TON PLAN EN 3 ÉTAPES###\n','###🚀 COMMENT PROGRESSER MAINTENANT###\n','###🎯 TA FEUILLE DE ROUTE###\n','###⚡ 3 ACTIONS — RÉSULTATS GARANTIS###\n'];
    var accrochesPlan=[
      'Simple. Concret. **==+2 à 3 points== par semaine.** 🔥\n\n',
      'Pas un pavé de révisions. Juste **3 actions** qui font vraiment bouger les choses. 💡\n\n',
      'Le secret de la progression ? **La régularité, pas l\'intensité.** Voilà comment. ✊\n\n',
      'Efficace = ciblé. Voilà exactement **ce qu\'il faut faire** — rien de plus. 🎯\n\n'
    ];
    var etapesAujourdhui=[
      '📖 **Aujourd\'hui** — Lis les Notions officielles en bas de page. ==10 min max.==\n\n',
      '📚 **Ce soir** — Parcours les Notions & Définitions dans la page. Pas de prise de notes — juste lire, une fois. ==10 minutes.==\n\n',
      '🧠 **Maintenant** — Descends aux Notions officielles. Lis-les une fois, lentement. ==Ça prend 10 minutes et ça change déjà quelque chose.==\n\n'
    ];

    var ressources={
      are:['→ ==service-public.fr/particuliers/emploi== · ==france-travail.fr==\n→ 📺 YouTube *"droits chômage 2024 expliqués"* · 🎵 TikTok @droitdutravail_fr\n\n',
           '→ ==travail-emploi.gouv.fr== · ==service-public.fr==\n→ 📺 YouTube *"allocation chômage calcul 2024"* · 🎵 TikTok @infos_emploi_fr\n\n'],
      freelance:['→ ==autoentrepreneur.urssaf.fr== · ==guichet-entreprises.fr==\n→ 📺 YouTube *"auto-entrepreneur 2024 URSSAF"* · 🎵 TikTok @entrepreneur_france\n\n',
                 '→ ==freelance.fr== · ==bpifrance-creation.fr==\n→ 📺 YouTube *"micro-entreprise seuils 2024"* · 🎵 TikTok @business_tips_fr\n\n'],
      comport:['→ 📺 YouTube *"méthode STAR entretien embauche"* · 🎵 TikTok @tips_recrutement\n→ 📚 *Influence* — Cialdini · 📚 *Le langage du corps* — Pease\n\n',
               '→ 📺 YouTube *"communication non-verbale entretien"* · 🎵 TikTok @coaching_emploi\n→ 📚 *Oser* — Brian Tracy · 🌐 ==cadremploi.fr/conseils==\n\n'],
      defaut:['→ ==service-public.fr== · ==legifrance.gouv.fr==\n→ 📺 YouTube *"droit du travail salarié 2024"* · 🎵 TikTok @avocat_droit_travail\n\n',
              '→ ==travail-emploi.gouv.fr== · ==service-public.fr==\n→ 📺 YouTube *"droits salariés licenciement"* · 📚 Pascal Lokiec\n\n']
    };
    var rKey=n.indexOf('are')>=0||n.indexOf('chôm')>=0||n.indexOf('admin')>=0?'are'
      :n.indexOf('freelance')>=0?'freelance':isComport?'comport':'defaut';

    var cloturesPlan=[
      '🔁 **J+4** — Repasse ce quiz. ==Mesure la différence.== Tu vas te surprendre. 💥\n\n🎯 *La progression, c\'est une habitude. Pas un sprint.* ✊',
      '🔄 **Dans 4 jours** — Reviens ici et refais le test. ==Le score va bouger.== Garanti. 🔥\n\n💡 *Pas la perfection. La progression. Chaque semaine compte.* 🌟',
      '📊 **J+4** — Quiz à refaire. ==Compare les scores.== Chaque point en plus, c\'est une règle qui te protège. 🛡️\n\n✊ *Ici, on ne vise pas le parfait. On vise le progrès régulier.* 🚀'
    ];

    var m4=_r(titresPlan)+_r(accrochesPlan)+_r(etapesAujourdhui)
      +'🌐 **J+2** — 1 article sur ton point le plus faible :\n'
      +_r(ressources[rKey])
      +_r(cloturesPlan);

    evaStream(uid, m4, function(){ evaShowEvaCallToAction(uid); });
  }
}

// ── Afficher les conseils Eva (compatibilité bouton existant) ──
// ── Génère l'analyse humaine + partage + détail réponses ──
function buildQuizResult(answers, quizName, total){
  var forts   = answers.filter(function(a){ return a.ok; });
  var faibles = answers.filter(function(a){ return !a.ok; });
  var score   = forts.length;
  var pct     = Math.round((score / total) * 100);
  var html    = '';

  // ── SVG icons sérieux ──
  var SVG = {
    trophy:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="M6 9a6 6 0 0 0 12 0V3H6z"/></svg>',
    target:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    chart:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
    seed:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22V12"/><path d="M5 12C5 6.5 8.5 4 12 4s7 2.5 7 8c-2 0-5-1-7-3-2 2-5 3-7 3z"/></svg>',
    rocket:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    check:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="3"/></svg>',
    lock:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    eva:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>',
    book:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="transition:transform .25s"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  // ── Carte score principale — design émotionnel ──
  var cfg;
  if(pct===100){
    cfg={icon:SVG.trophy,title:'Parfait — Maîtrise totale !',sub:'Tu connais ce sujet mieux que 95% des gens. Partage ce score — il mérite d\'être vu.',grad:'linear-gradient(135deg,#065f46,#059669)',badge:'EXPERT',badgeBg:'rgba(255,255,255,.18)',txtBadge:'#fff'};
  } else if(pct>=70){
    cfg={icon:SVG.target,title:'Solide. Tu sais ce que tu fais.',sub:'Quelques points à verrouiller et tu atteins l\'excellence. Tu es déjà dans le top.',grad:'linear-gradient(135deg,#1e3a5f,#1e40af)',badge:'AVANCÉ',badgeBg:'rgba(255,255,255,.18)',txtBadge:'#fff'};
  } else if(pct>=50){
    cfg={icon:SVG.chart,title:'Tu es en train de percer.',sub:'La moitié est acquise. L\'autre moitié est ton prochain niveau — Eva t\'y amène.',grad:'linear-gradient(135deg,#92400e,#b45309)',badge:'EN PROGRESSION',badgeBg:'rgba(255,255,255,.18)',txtBadge:'#fff'};
  } else if(pct>=30){
    cfg={icon:SVG.seed,title:'Tes bases se construisent maintenant.',sub:'Chaque question ratée est une lacune comblée. Tu as exactement ce qu\'il te faut pour monter.',grad:'linear-gradient(135deg,#4c1d95,#7c3aed)',badge:'À CONSTRUIRE',badgeBg:'rgba(255,255,255,.18)',txtBadge:'#fff'};
  } else {
    cfg={icon:SVG.rocket,title:'Point de départ — et c\'est parfait.',sub:'Le seul vrai échec c\'est de ne pas avoir essayé. Tu viens de franchir l\'étape la plus difficile.',grad:'linear-gradient(135deg,#7f1d1d,#dc2626)',badge:'PRIORITÉ',badgeBg:'rgba(255,255,255,.18)',txtBadge:'#fff'};
  }

  // Barre de progression
  var barColor = pct>=70?'#4ade80':pct>=50?'#fbbf24':pct>=30?'#a78bfa':'#f87171';

  html += '<div style="background:'+cfg.grad+';border-radius:18px;padding:18px 16px 16px;margin-bottom:14px;position:relative;overflow:hidden">'
    // Badge niveau
    +'<div style="display:inline-flex;align-items:center;background:'+cfg.badgeBg+';border-radius:6px;padding:3px 9px;margin-bottom:10px">'
    +'<span style="font-size:.44rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:'+cfg.txtBadge+'">'+cfg.badge+'</span>'
    +'</div>'
    // Score + titre
    +'<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">'
    +'<div>'
    +'<div style="font-size:.88rem;font-weight:800;color:#fff;line-height:1.25;margin-bottom:4px">'+cfg.title+'</div>'
    +'<div style="font-size:.66rem;color:rgba(255,255,255,.7);line-height:1.5">'+cfg.sub+'</div>'
    +'</div>'
    +'<div style="text-align:center;flex-shrink:0;margin-left:12px">'
    +'<div style="font-size:2rem;font-weight:900;color:#fff;line-height:1">'+score+'</div>'
    +'<div style="font-size:.58rem;color:rgba(255,255,255,.6);font-weight:700">/'+total+'</div>'
    +'</div>'
    +'</div>'
    // Barre de progression
    +'<div style="background:rgba(255,255,255,.15);border-radius:99px;height:6px;margin-bottom:6px">'
    +'<div style="background:'+barColor+';height:6px;border-radius:99px;width:'+pct+'%;transition:width .8s ease"></div>'
    +'</div>'
    +'<div style="font-size:.56rem;color:rgba(255,255,255,.5);text-align:right">'+pct+'% maîtrisé</div>'
    +'</div>';

  // ── Disclaimer : résultats non sauvegardés ──
  html += '<div style="display:flex;align-items:center;gap:5px;font-size:.56rem;color:#94a3b8;margin-bottom:12px;padding:0 2px;">'
    +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>'
    +'<span>Ce résultat n\'est pas sauvegardé — fais une capture d\'écran si tu veux le garder.</span>'
    +'</div>';

  // ── Ce que tu maîtrises — section verte compacte ──
  if(forts.length){
    var fortsId = 'fb'+Date.now()+Math.floor(Math.random()*9999);
    html += '<div style="background:#fff;border:1.5px solid #d1fae5;border-radius:14px;padding:13px 15px;margin-bottom:10px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="var b=document.getElementById(\''+fortsId+'\');var a=this.querySelector(\'.forts-arr\');if(b.style.display===\'none\'){b.style.display=\'block\';a.style.transform=\'rotate(180deg)\'}else{b.style.display=\'none\';a.style.transform=\'rotate(0deg)\'}">'
      +'<div style="display:flex;align-items:center;gap:7px">'
      +'<div style="width:26px;height:26px;border-radius:8px;background:#dcfce7;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+SVG.check+'</div>'
      +'<span style="font-size:.74rem;font-weight:800;color:#065f46">Acquis solides</span>'
      +'<span style="background:#d1fae5;color:#065f46;font-size:.54rem;font-weight:800;border-radius:99px;padding:2px 8px">'+forts.length+' / '+total+'</span>'
      +'</div>'
      +'<div class="forts-arr" style="color:#059669;transition:transform .25s;transform:rotate(0deg)">'+SVG.chevron+'</div>'
      +'</div>'
      +'<div id="'+fortsId+'" style="display:none;margin-top:10px">'
    forts.forEach(function(a){
      html += '<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f0fdf4">'
        +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" style="flex-shrink:0;margin-top:2px"><polyline points="20 6 9 17 4 12"/></svg>'
        +'<span style="font-size:.7rem;color:#334155;line-height:1.45">'+a.q+'</span>'
        +'</div>';
    });
    html += '</div></div>';
  }

  // ── Questions non maîtrisées — CHALLENGE sans réponses ──
  if(faibles.length){
    var challengeId = 'ch'+Date.now();
    html += '<div style="background:#fff;border:1.5px solid #fde68a;border-radius:14px;padding:13px 15px;margin-bottom:10px">'
      // En-tête avec titre émotionnel — FERMÉ par défaut
      +'<div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:0" onclick="(function(t){var c=t.parentNode.querySelector(\'.ch-body\');var a=t.querySelector(\'.ch-arr\');c.style.display=c.style.display===\'none\'?\'block\':\'none\';a.style.transform=c.style.display===\'none\'?\'rotate(0deg)\':\'rotate(180deg)\'})(this)">'
      +'<div style="display:flex;align-items:center;gap:7px">'
      +'<div style="width:26px;height:26px;border-radius:8px;background:#fef3c7;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+SVG.alert+'</div>'
      +'<div>'
      +'<div style="font-size:.74rem;font-weight:800;color:#92400e">Ton prochain niveau</div>'
      +'<div style="font-size:.6rem;color:#b45309">'+faibles.length+' question'+(faibles.length>1?'s':'')+' à challenger — sauras-tu y répondre ?</div>'
      +'</div>'
      +'</div>'
      +'<div class="ch-arr" style="color:#b45309;transition:transform .25s">'+SVG.chevron+'</div>'
      +'</div>'
      +'<div class="ch-body" style="display:none;margin-top:10px">'
      +'<div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:10px;padding:10px 12px;margin-bottom:10px;border-left:3px solid #f59e0b">'
      +'<div style="font-size:.68rem;font-weight:800;color:#92400e;margin-bottom:3px">🎯 Challenge</div>'
      +'<div style="font-size:.64rem;color:#78350f;line-height:1.55">Ces questions t\'ont résisté cette fois. Reviens les affronter dans 48h — sans aide.</div>'
      +'</div>';
    faibles.forEach(function(a){
      html += '<div style="padding:8px 0;border-bottom:1px solid #fef9c3">'
        +'<div style="display:flex;align-items:flex-start;gap:9px;margin-bottom:6px">'
        +'<div style="width:20px;height:20px;border-radius:6px;background:#fef3c7;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">'+SVG.lock+'</div>'
        +'<span style="font-size:.7rem;color:#334155;line-height:1.5;font-weight:500">'+a.q+'</span>'
        +'</div>'
        // Ce que tu as répondu — rouge
        +'<div style="display:flex;align-items:center;gap:6px;background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:6px 10px;margin-left:29px;margin-bottom:4px">'
        +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        +'<span style="font-size:.65rem;color:#dc2626;font-weight:700">Ta réponse : </span>'
        +'<span style="font-size:.65rem;color:#991b1b">'+a.chosen+'</span>'
        +'</div>'
        // Bonne réponse — vert
        +'<div style="display:flex;align-items:center;gap:6px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:6px 10px;margin-left:29px">'
        +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'
        +'<span style="font-size:.65rem;color:#16a34a;font-weight:700">Bonne réponse : </span>'
        +'<span style="font-size:.65rem;color:#15803d">'+a.correct_ans+'</span>'
        +'</div>'
        +'</div>';
    });
    html += '</div></div>';
  }

  // ── Section définitions officielles avec thème ──
  if(faibles.length){
    var notifDefsId = 'ndefs'+Date.now();
    // Détecter le thème du quiz
    var theme = quizName.toLowerCase().indexOf('rupture')>=0 ? 'droit du travail'
      : quizName.toLowerCase().indexOf('admin')>=0 ? 'démarches administratives'
      : quizName.toLowerCase().indexOf('rh')>=0||quizName.toLowerCase().indexOf('entretien')>=0 ? 'ressources humaines'
      : quizName.toLowerCase().indexOf('product')>=0 ? 'productivité'
      : quizName.toLowerCase().indexOf('content')>=0 ? 'création de contenu'
      : quizName.toLowerCase().indexOf('emploi')>=0||quizName.toLowerCase().indexOf('strat')>=0 ? 'stratégie emploi'
      : quizName.toLowerCase();

    // Prendre jusqu'à 3 questions ratées et générer leur définition
    var defsHtml = '';
    faibles.slice(0,3).forEach(function(a){
      var def = evaGetDefinition(a.q);
      var notionLabel = a.q.length>60 ? a.q.substring(0,57)+'…' : a.q;
      defsHtml += '<div style="background:#f8fafc;border-radius:10px;padding:11px 13px;margin-bottom:9px;border-left:3px solid #0ea5e9">'
        +'<div style="font-size:.64rem;font-weight:800;color:#0369a1;margin-bottom:5px">📌 '+notionLabel+'</div>'
        +'<div style="font-size:.67rem;color:#334155;line-height:1.65">'+def+'</div>'
        +'</div>';
    });

    html += '<div style="background:#fff;border:1.5px solid #bae6fd;border-radius:14px;padding:13px 15px;margin-bottom:12px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="(function(t){var c=t.parentNode.querySelector(\'.defs-body\');var a=t.querySelector(\'.defs-arr\');var open=c.style.display!==\'none\';c.style.display=open?\'none\':\'block\';a.style.transform=open?\'rotate(0deg)\':\'rotate(180deg)\'})(this)">'
      +'<div style="display:flex;align-items:center;gap:7px">'
      +'<div style="width:26px;height:26px;border-radius:8px;background:#e0f2fe;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>'
      +'<div>'
      +'<div style="font-size:.74rem;font-weight:800;color:#0c4a6e">Notions & définitions officielles</div>'
      +'<div style="font-size:.59rem;color:#0369a1">Sur le '+theme+' · Améliore tes connaissances dès maintenant</div>'
      +'</div>'
      +'</div>'
      +'<div class="defs-arr" style="color:#0369a1;transition:transform .25s"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg></div>'
      +'</div>'
      +'<div class="defs-body" style="display:none;margin-top:12px">'
      +'<div style="background:#e0f2fe;border-radius:8px;padding:9px 12px;margin-bottom:10px;font-size:.64rem;color:#0c4a6e;line-height:1.55">'
      +'<strong>Sur le '+theme+' :</strong> Voici quelques notions et définitions officielles qui peuvent dès maintenant améliorer tes connaissances sur ce sujet.'
      +'</div>'
      +defsHtml
      +'</div>'
      +'</div>';
  }

  // ── Placeholder plan IA Eva ──
  var _evaPlanUid = 'ep'+Date.now()+Math.floor(Math.random()*99999);
  window._lastEvaPlanArgs = {uid:_evaPlanUid, quizName:quizName, score:score, total:total, answers:answers};
  html += '<div id="eva-ai-plan-'+_evaPlanUid+'" style="margin-bottom:14px"></div>';

  // ── Partage : carte lien + boutons réseaux ──
  var urlSite = 'https://careerpulseia.com';
  var msgTxt  = '🎯 J\'ai fait '+score+'/'+total+' au quiz "'+quizName+'" sur CareerPulse !\n\nViens toi aussi tester nos quiz et profiter des services de notre site — bientôt encore plus ! 👉 '+urlSite;
  var msgEnc  = encodeURIComponent(msgTxt);
  var msgFlat = msgTxt.replace(/\n/g,' ');

  html += '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:14px 16px;margin-bottom:14px">'
    + '<div style="font-size:.58rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:#0f172a;margin-bottom:6px;text-align:center">📣 PARTAGER MON RÉSULTAT</div>'
    + '<div style="font-size:.64rem;color:#64748b;text-align:center;margin-bottom:12px;line-height:1.5">Partage tes résultats avec tes amis<br>et tes proches sur WhatsApp et Telegram</div>'

    // ── Boutons réseaux : WhatsApp + Telegram ──
    + '<div style="display:flex;flex-direction:column;gap:9px">'

    // WhatsApp — lien direct app
    + '<a href="whatsapp://send?text='+msgEnc+'" style="display:flex;align-items:center;justify-content:center;gap:7px;background:#25d366;border-radius:11px;padding:11px;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg><span style="font-size:.74rem;font-weight:700;color:#fff">WhatsApp</span></a>'

    // Telegram — lien direct app
    + '<a href="tg://msg?text='+msgEnc+'" style="display:flex;align-items:center;justify-content:center;gap:7px;background:#0088cc;border-radius:11px;padding:11px;text-decoration:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg><span style="font-size:.74rem;font-weight:700;color:#fff">Telegram</span></a>'

    + '</div></div>';

  return html;
}

function showQuizAdminResult(){
  var s = qadState.score;
  var level = s>=23?'Expert admin 🏆':s>=18?'Bon niveau ✅':s>=12?'Niveau intermédiaire 📈':'Débutant ⚡';
  var el;
  el=document.getElementById('qad-score'); if(el) el.textContent=s;
  el=document.getElementById('qad-level'); if(el) el.textContent=level;
  el=document.getElementById('qad-detail');
  if(el) el.innerHTML = buildQuizResult(qadState.answers, 'Démarches administratives', QAD.length);
  go('quiz-admin-result');
  setTimeout(function(){_confetti(qadState.score/QAD.length>=0.6);},200);
  if(window._lastEvaPlanArgs){ var _a=window._lastEvaPlanArgs; window._lastEvaPlanArgs=null; generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers); }
}






function showQuizPosteDroitsResult(state){
  var el=document.getElementById('qcm15-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#0f766e,#0d9488);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(15,118,110,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#0f766e;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#0f766e,#0d9488);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#0f766e;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Droits nouveau salarié',tot);
  go('qcm-poste-droits-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm15-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm15-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm15();go(\'qcm-poste-droits\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#0f766e;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizPosteIntegrationResult(state){
  var el=document.getElementById('qcm16-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#dc2626,#b91c1c);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(220,38,38,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#dc2626;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#dc2626,#b91c1c);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#dc2626;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Prise de poste & Intégration',tot);
  go('qcm-poste-integration-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm16-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm16-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm16();go(\'qcm-poste-integration\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#dc2626;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizEtudiantAlternanceResult(state){
  var el=document.getElementById('qcm13-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#0ea5e9,#0284c7);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(14,165,233,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#0ea5e9;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#0ea5e9,#0284c7);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#0ea5e9;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Alternance & Stage',tot);
  go('qcm-etudiant-alternance-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm13-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm13-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm13();go(\'qcm-etudiant-alternance\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#0ea5e9;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizEtudiantEmploiResult(state){
  var el=document.getElementById('qcm14-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#7c3aed);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(139,92,246,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#8b5cf6;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#8b5cf6,#7c3aed);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#8b5cf6;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Premier emploi & Orientation',tot);
  go('qcm-etudiant-emploi-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm14-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm14-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm14();go(\'qcm-etudiant-emploi\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#8b5cf6;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizFreelanceStatutResult(state){
  var el=document.getElementById('qcm11-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(245,158,11,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="2"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#f59e0b;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#f59e0b,#d97706);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#f59e0b;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Statut & Protection sociale',tot);
  go('qcm-freelance-statut-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm11-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm11-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm11();go(\'qcm-freelance-statut\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#f59e0b;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizFreelanceMissionsResult(state){
  var el=document.getElementById('qcm12-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var hdr='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#ea580c,#c2410c);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(234,88,12,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.15 1.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#ea580c;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#ea580c,#c2410c);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#ea580c;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=hdr+buildQuizResult(state.answers,'Missions & Négociation',tot);
  go('qcm-freelance-missions-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=el.parentNode; var old=document.getElementById('qcm12-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm12-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm12();go(\'qcm-freelance-missions\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#ea580c;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizCPFResult(state){
  var el=document.getElementById('qcm9-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var headerHTML='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#6d28d9);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(124,58,237,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#7c3aed;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#7c3aed,#6d28d9);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#7c3aed;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=headerHTML+buildQuizResult(state.answers,'CPF & Bilan de compétences',tot);
  go('qcm-cpf-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=document.getElementById('qcm9-result-content').parentNode;
  var old=document.getElementById('qcm9-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm9-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm9();go(\'qcm-cpf\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#7c3aed;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizReconversionResult(state){
  var el=document.getElementById('qcm10-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var headerHTML='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#059669,#047857);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(5,150,105,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#059669;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#059669,#047857);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#059669;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=headerHTML+buildQuizResult(state.answers,'Reconversion & Transition',tot);
  go('qcm-reconversion-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap=document.getElementById('qcm10-result-content').parentNode;
  var old=document.getElementById('qcm10-btns'); if(old) old.remove();
  var b=document.createElement('div'); b.id='qcm10-btns'; b.style='padding:0 0 24px';
  b.innerHTML='<button onclick="qcmReset_qcm10();go(\'qcm-reconversion\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#059669;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap.appendChild(b);
}

function showQuizAREResult(state){
  var el=document.getElementById('qcm7-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var headerHTML='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#002395,#1e3a8a);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(0,35,149,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#002395;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#002395,#1e3a8a);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#002395;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=headerHTML+buildQuizResult(state.answers,'ARE & Indemnisation chômage',tot);
  go('qcm-are-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap7=document.getElementById('qcm7-result-content').parentNode;
  var old7=document.getElementById('qcm7-btns'); if(old7) old7.remove();
  var b7=document.createElement('div'); b7.id='qcm7-btns'; b7.style='padding:0 0 24px';
  b7.innerHTML='<button onclick="qcmReset_qcm7();go(\'qcm-are\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#002395;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap7.appendChild(b7);
}

function showQuizEntretienDemandeurResult(state){
  var el=document.getElementById('qcm8-result-content');
  var s=state.score; var tot=state.questions.length; var pct=Math.round(s/tot*100);
  var level=s<=(tot*.4)?'Débutant ⚡':s<=(tot*.65)?'En progression 💪':s<=(tot*.85)?'Bon niveau ✅':'Expert 🏆';
  var headerHTML='<div style="text-align:center;padding:24px 0 18px">'
    +'<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#0891b2,#0e7490);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;box-shadow:0 6px 22px rgba(8,145,178,.25)">'
    +'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
    +'</div>'
    +'<div style="font-size:.5rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:#0891b2;margin-bottom:8px">Résultat</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:3rem;font-weight:600;color:#0f172a;line-height:1">'+s+'<span style="font-size:1.4rem;color:#94a3b8">/'+tot+'</span></div>'
    +'<div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin:14px 24px"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#0891b2,#0e7490);border-radius:4px"></div></div>'
    +'<div style="font-size:.86rem;font-weight:700;color:#0891b2;margin-top:4px">'+level+'</div>'
    +'</div>';
  if(el) el.innerHTML=headerHTML+buildQuizResult(state.answers,"Entretien d\'embauche",tot);
  go('qcm-demandeur-entretien-result');
  if(window._lastEvaPlanArgs){var _a=window._lastEvaPlanArgs;window._lastEvaPlanArgs=null;generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);}
  var wrap8=document.getElementById('qcm8-result-content').parentNode;
  var old8=document.getElementById('qcm8-btns'); if(old8) old8.remove();
  var b8=document.createElement('div'); b8.id='qcm8-btns'; b8.style='padding:0 0 24px';
  b8.innerHTML='<button onclick="qcmReset_qcm8();go(\'qcm-demandeur-entretien\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:.76rem;font-weight:700;color:#0891b2;cursor:pointer;font-family:inherit;margin-bottom:8px">↺ Recommencer</button>'
    +'<button onclick="go(\'quiz-hub\')" style="width:100%;background:none;border:none;font-size:.7rem;color:#94a3b8;cursor:pointer;font-family:inherit">← Retour aux quiz</button>';
  wrap8.appendChild(b8);
}

function showQuizRHResult(){
  var s = qrhState.score;
  var level = s>=23?'Expert RH 🏆':s>=18?'Bon niveau ✅':s>=12?'Niveau intermédiaire 📈':'Niveau débutant ⚡';
  var el;
  el=document.getElementById('qrh-score'); if(el) el.textContent=s;
  el=document.getElementById('qrh-level'); if(el) el.textContent=level;
  el=document.getElementById('qrh-detail');
  if(el) el.innerHTML = buildQuizResult(qrhState.answers, 'Mini-test entretien RH', QRH.length);
  go('quiz-rh-result');
  setTimeout(function(){_confetti(qrhState.score/QRH.length>=0.6);},200);
  if(window._lastEvaPlanArgs){ var _a=window._lastEvaPlanArgs; window._lastEvaPlanArgs=null; generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers); }
}

// ── QUIZ RH ──
var QRH_BANK = [
  {q:"Quelle méthode utilise-t-on pour structurer une réponse comportementale en entretien ?",opts:["Méthode SMART","Méthode STAR","Méthode SWOT","Méthode AIDA"],a:1},
  {q:"Que signifie 'culture fit' dans le contexte du recrutement ?",opts:["Le salaire proposé","L'adéquation avec les valeurs de l'entreprise","Le niveau d'études requis","Le poste disponible"],a:1},
  {q:"Combien de temps dure en moyenne un premier entretien téléphonique de présélection ?",opts:["5 à 10 minutes","15 à 30 minutes","1 heure","2 heures"],a:1},
  {q:"Quelle question est illégale en France lors d'un entretien d'embauche ?",opts:["Quels sont vos points forts ?","Parlez-moi de votre expérience","Êtes-vous enceinte ?","Pourquoi quittez-vous votre emploi ?"],a:2},
  {q:"Que doit contenir obligatoirement une offre d'emploi en France ?",opts:["Le salaire exact","La nature du contrat et le poste","La photo du candidat","Les références de l'ancien employeur"],a:1},
  {q:"Lors de la question 'Quel est votre plus grand défaut ?', quelle approche est la meilleure ?",opts:["Dire qu'on n'en a pas","Citer un vrai défaut sans solution","Citer un défaut transformé en atout avec une solution concrète","Parler d'un défaut sans lien avec le poste"],a:2},
  {q:"Quel est le délai légal de réponse d'un recruteur après un entretien en France ?",opts:["24 heures","48 heures","Il n'existe pas de délai légal imposé","1 semaine"],a:2},
  {q:"Qu'est-ce qu'un entretien en panel ou jury ?",opts:["Un entretien par téléphone","Un entretien avec plusieurs recruteurs en même temps","Un entretien avec des tests psychotechniques","Un entretien en anglais"],a:1},
  {q:"Quelle est la meilleure façon de conclure un entretien d'embauche ?",opts:["Demander immédiatement le salaire","Remercier et demander les prochaines étapes","Critiquer l'entreprise concurrente","Partir sans dire au revoir"],a:1},
  {q:"Comment se préparer aux questions techniques d'un entretien ?",opts:["Improviser le jour J","Réviser les fondamentaux du métier + cas pratiques du secteur","Demander les questions à l'avance","Se fier à son expérience uniquement"],a:1},
  {q:"Qu'est-ce qu'un ATS dans le processus de recrutement ?",opts:["Un test de personnalité","Un logiciel de tri automatique des CV","Un type de contrat","Un entretien vidéo différé"],a:1},
  {q:"Comment optimiser son CV pour passer les filtres ATS ?",opts:["Utiliser des images et tableaux","Utiliser les mots-clés de l'offre d'emploi en texte brut","Rédiger en anglais uniquement","Mettre un maximum de couleurs"],a:1},
  {q:"Qu'est-ce que le 'ghosting' de la part d'un recruteur ?",opts:["Un entretien surprise","Disparaître sans répondre après un entretien","Un test psychologique","Un entretien collectif"],a:1},
  {q:"Quelle est la durée idéale d'un CV pour un profil avec moins de 10 ans d'expérience ?",opts:["3 pages minimum","1 page","2 pages maximum","Pas de limite"],a:1},
  {q:"Que signifie 'onboarding' dans le contexte RH ?",opts:["Le processus de départ d'un employé","Le processus d'intégration d'un nouveau collaborateur","Un type d'entretien annuel","La période d'essai légale"],a:1},
  {q:"Quelle est la meilleure façon de répondre à 'Pourquoi vous et pas un autre ?'",opts:["Dire qu'on ne sait pas","Critiquer les autres candidats","Mettre en avant 3 points différenciants concrets liés au poste","Parler de son salaire attendu"],a:2},
  {q:"Qu'est-ce qu'une lettre de motivation efficace doit obligatoirement contenir ?",opts:["Sa date de naissance","Son numéro de Sécurité Sociale","Sa valeur ajoutée pour le poste et sa motivation pour l'entreprise","Ses références personnelles"],a:2},
  {q:"Combien de temps avant l'heure prévue faut-il arriver à un entretien ?",opts:["30 minutes avant","5 à 10 minutes avant","À l'heure pile","15 à 20 minutes avant"],a:1},
  {q:"Que faire si on ne connaît pas la réponse à une question technique en entretien ?",opts:["Inventer une réponse","Quitter l'entretien","Admettre honnêtement et expliquer comment on chercherait la réponse","Changer de sujet"],a:2},
  {q:"Qu'est-ce qu'un entretien en assessment center ?",opts:["Un entretien en visioconférence","Une journée d'évaluation avec mises en situation et exercices collectifs","Un test de QI","Un entretien avec les RH uniquement"],a:1},
  {q:"Quelle est la règle d'or pour le langage non-verbal en entretien ?",opts:["Éviter tout contact visuel","Croiser les bras pour montrer sa concentration","Maintenir un contact visuel naturel et adopter une posture ouverte","Parler très vite pour montrer son énergie"],a:2},
  {q:"Pourquoi recherche-t-on les informations sur l'entreprise avant un entretien ?",opts:["Pour impressionner le recruteur uniquement","Pour évaluer si l'entreprise peut vous payer","Pour personnaliser ses réponses et poser des questions pertinentes","Ce n'est pas nécessaire"],a:2},
  {q:"Quel est le meilleur moment pour aborder la question du salaire ?",opts:["Dès le début du premier entretien","Jamais, c'est tabou","Lors de l'offre, quand l'employeur a clairement manifesté son intérêt","Par email avant le premier entretien"],a:2},
  {q:"Comment relancer un recruteur après un entretien sans nouvelles ?",opts:["Appeler toutes les heures","Envoyer un email poli après 1 à 2 semaines en rappelant son intérêt","Ne jamais relancer","Contacter directement le PDG"],a:1},
  {q:"Qu'est-ce qu'une période d'essai ?",opts:["Une période de formation obligatoire","Une période pendant laquelle l'employeur et le salarié peuvent rompre le contrat librement","Un CDD de 3 mois","Un stage non rémunéré"],a:1}
];
// ── Variantes QRH — 10 formulations + 15 nouvelles questions entretien RH ──
var QRH_VAR = [
  {q:"La méthode STAR en entretien — que signifie le A ?",opts:["Aptitude","Action","Analyse","Argumentation"],a:1},
  {q:"Un recruteur te demande ton salaire actuel. Tu fais quoi ?",opts:["Tu mens légèrement","Tu donnes l'info et tu rediriges vers tes attentes","Tu refuses catégoriquement","Tu changes de sujet"],a:1},
  {q:"C'est quoi le 'culture fit' que les recruteurs évaluent ?",opts:["Ton niveau de culture générale","Ton adéquation avec les valeurs et la culture de l'entreprise","Ton expérience culturelle internationale","Tes diplômes"],a:1},
  {q:"Un recruteur te pose une question illégale en entretien. Tu as le droit de ?",opts:["Répondre obligatoirement","Refuser de répondre ou dévier poliment","Porter plainte immédiatement","Quitter l'entretien"],a:1},
  {q:"Ton CV a un trou de 8 mois. Comment le présenter ?",opts:["Tu le caches","Tu l'expliques brièvement avec ce que tu as appris ou vécu","Tu inventes une mission freelance","Tu attends qu'on te le demande"],a:1},
  {q:"Pourquoi personnaliser sa lettre de motivation est crucial ?",opts:["Pour faire bonne impression uniquement","Pour montrer que tu as compris le poste et l'entreprise spécifiquement","Ce n'est pas nécessaire","Pour dépasser les filtres ATS"],a:1},
  {q:"Un entretien en assessment center c'est quoi ?",opts:["Un entretien téléphonique","Une journée d'évaluation collective avec mises en situation","Un test de personnalité écrit","Un entretien avec le PDG"],a:1},
  {q:"Combien de temps avant l'heure faut-il arriver à un entretien ?",opts:["30 minutes","5 à 10 minutes","À l'heure pile","15 à 20 minutes avant"],a:1},
  {q:"Qu'est-ce que le ghosting d'un recruteur après un entretien ?",opts:["Un test de patience","Disparaître sans donner de réponse","Un entretien surprise","Une technique de négociation"],a:1},
  {q:"Pour passer les filtres ATS, ton CV doit contenir quoi ?",opts:["Des images et graphiques","Les mots-clés exacts de l'offre en texte brut","Beaucoup de couleurs","Un format PDF avec tableau"],a:1},
  {q:"Comment conclure un entretien de façon pro ?",opts:["Demander le salaire immédiatement","Remercier et demander les prochaines étapes","Critiquer les concurrents","Partir rapidement"],a:1},
  {q:"Quelle est la durée idéale d'un CV avec moins de 10 ans d'expérience ?",opts:["3 pages minimum","1 page","2 pages maximum","Pas de limite"],a:1},
  {q:"Pourquoi ne jamais critiquer son ancien employeur en entretien ?",opts:["C'est impoli","Ça révèle un manque de discernement et peut inquiéter le recruteur","C'est interdit légalement","Ça n'a aucune importance"],a:1},
  {q:"Tu ne connais pas la réponse à une question technique. Tu dis ?",opts:["Tu inventes","Tu admets et expliques comment tu trouverais la réponse","Tu changes de sujet","Tu quittes l'entretien"],a:1},
  {q:"Après l'entretien, tu n'as pas de nouvelles depuis 2 semaines. Tu fais ?",opts:["Tu appelles toutes les heures","Tu envoies un email poli de relance","Tu ne fais rien","Tu contactes directement le PDG"],a:1}
];
function buildQRH(){ var pool=QRH_BANK.concat(QRH_VAR); for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;} return pool.slice(0,25).map(function(q){var correct=q.opts[q.a];var opts=q.opts.slice();for(var i=opts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=opts[i];opts[i]=opts[j];opts[j]=t;}return{q:q.q,opts:opts,a:opts.indexOf(correct)};}); }
var QRH = buildQRH();
var qrhState = {cur:0,score:0,answers:[],done:false};
function resetQuizRH(){ QRH=buildQRH(); qrhState={cur:0,score:0,answers:[],done:false}; }

// ── QUIZ RUPTURE CONVENTIONNELLE ──
var QRUP_BANK = [
  {q:"C'est quoi une rupture conventionnelle ?",opts:["L'employeur renvoie le salarié","Le salarié et l'employeur se mettent d'accord pour se séparer","Le salarié démissionne","Un départ forcé à la retraite"],a:1},
  {q:"La rupture conventionnelle est possible pour quel type de contrat ?",opts:["CDD seulement","CDI seulement","CDI et CDD","Tous les contrats"],a:1},
  {q:"Est-ce que les deux parties peuvent changer d'avis après avoir signé ?",opts:["Non, c'est définitif dès la signature","Oui, chacun a 15 jours pour se rétracter","Oui, chacun a 7 jours pour se rétracter","Non, sauf accord du tribunal"],a:2},
  {q:"Combien de fois au minimum doit-on se rencontrer avant de signer ?",opts:["Aucune rencontre obligatoire","1 réunion minimum","2 réunions obligatoires","3 réunions obligatoires"],a:1},
  {q:"Est-ce que le salarié peut amener quelqu'un avec lui lors de la réunion ?",opts:["Non, jamais","Oui, un collègue ou un conseiller","Uniquement un avocat","Uniquement un syndicat"],a:1},
  {q:"Qui valide officiellement la rupture conventionnelle ?",opts:["Le tribunal","Un organisme de l'État appelé DREETS","La Sécurité Sociale","France Travail"],a:1},
  {q:"Combien de temps l'État a-t-il pour valider ou refuser le dossier ?",opts:["7 jours","15 jours ouvrables","30 jours","48 heures"],a:1},
  {q:"Après une rupture conventionnelle, peut-on toucher le chômage ?",opts:["Non, comme une démission","Oui, si on remplit les conditions habituelles","Oui, toujours et sans condition","Non, jamais"],a:1},
  {q:"Est-ce que l'employeur peut forcer le salarié à accepter une rupture conventionnelle ?",opts:["Oui, avec un préavis","Non, les deux doivent être d'accord librement","Oui, si l'entreprise va mal","Oui, après 2 ans d'ancienneté"],a:1},
  {q:"Est-ce qu'on touche une indemnité quand on part en rupture conventionnelle ?",opts:["Non, aucune indemnité","Oui, au minimum la même que pour un licenciement","Oui, mais seulement après 5 ans","Non, sauf si l'employeur accepte"],a:1},
  {q:"Plus on a travaillé longtemps, plus l'indemnité est élevée ?",opts:["Non, c'est toujours le même montant","Oui, elle augmente avec les années d'ancienneté","Non, c'est le salaire qui compte uniquement","Oui, mais seulement après 10 ans"],a:1},
  {q:"Peut-on négocier une indemnité plus élevée que le minimum ?",opts:["Non, la loi fixe un montant précis","Oui, on peut toujours négocier plus","Seulement pour les cadres","Seulement si l'entreprise est grande"],a:1},
  {q:"Est-ce que l'indemnité reçue est imposée comme un salaire ?",opts:["Oui, toujours","Non, jamais","En partie — elle est souvent exonérée jusqu'à un certain plafond","Seulement au-delà de 10 000 €"],a:2},
  {q:"Peut-on faire une rupture conventionnelle quand on est en arrêt maladie ?",opts:["Non, c'est interdit","Oui, sauf si l'arrêt vient d'un accident du travail","Oui, sans aucune restriction","Non, sauf autorisation du médecin"],a:1},
  {q:"Y a-t-il un préavis à effectuer après une rupture conventionnelle ?",opts:["Oui, comme pour un licenciement","Non, il n'y a pas de préavis obligatoire","Oui, 1 mois minimum","Oui, selon l'ancienneté"],a:1},
  {q:"Quand est-ce que le contrat se termine officiellement ?",opts:["Le jour de la signature","Le lendemain de la validation par l'État","À la date choisie ensemble, après validation","3 mois après la signature"],a:2},
  {q:"Si on n'est pas content de la rupture, on peut contester devant les prud'hommes. Dans quel délai ?",opts:["6 mois","1 an à partir de la validation","2 ans","3 ans"],a:1},
  {q:"Que se passe-t-il si l'État ne répond pas dans les délais ?",opts:["La rupture est annulée","La rupture est automatiquement validée","Le délai repart de zéro","L'employeur doit tout recommencer"],a:1},
  {q:"Un représentant du personnel (délégué syndical) peut-il faire une rupture conventionnelle ?",opts:["Non, c'est interdit","Oui, mais avec une procédure spéciale","Oui, exactement comme tout le monde","Non, sauf démission"],a:1},
  {q:"Si on a été obligé de signer sous pression, la rupture est-elle valable ?",opts:["Oui, une fois signée c'est valable","Non, une signature forcée peut être annulée","Oui, sauf si on a un avocat","Non, mais seulement si l'employeur l'admet"],a:1},
  {q:"L'employeur doit-il expliquer pourquoi il veut une rupture conventionnelle ?",opts:["Oui, il doit donner un motif écrit","Non, aucun motif n'est obligatoire","Oui, devant le tribunal","Non, sauf si le salarié le demande"],a:1},
  {q:"Un salarié en CDI depuis 3 ans part en rupture conventionnelle. Il a droit à une indemnité ?",opts:["Non, il faut 5 ans minimum","Oui, dès la première année d'ancienneté","Oui, mais seulement à partir de 2 ans","Non, l'indemnité commence à 10 ans"],a:1},
  {q:"La rupture conventionnelle est-elle possible si l'entreprise licencie beaucoup de monde en même temps ?",opts:["Oui, sans problème","Non, elle est interdite pendant un plan de licenciement collectif","Oui, mais avec accord des syndicats","Non, sauf autorisation de l'inspection du travail"],a:1},
  {q:"Après la rupture, l'employeur remet quels documents au salarié ?",opts:["Rien, c'est à l'amiable","Le solde de tout compte, le certificat de travail et l'attestation France Travail","Uniquement le certificat de travail","Uniquement l'attestation France Travail"],a:1},
  {q:"La rupture conventionnelle, c'est une bonne idée pour qui ?",opts:["Uniquement pour les salariés qui veulent démissionner","Pour un salarié et un employeur qui veulent se séparer sans conflit, en gardant tous leurs droits","Uniquement pour les entreprises en difficulté","Pour les salariés en CDD qui veulent partir"],a:1}
];
// ── Variantes QRUP — 10 formulations + 15 nouvelles questions rupture ──
var QRUP_VAR = [
  {q:"Tu es salarié depuis 2 ans. Ton patron te propose une rupture conventionnelle. Tu peux refuser ?",opts:["Non, il impose","Oui, tu es libre d'accepter ou refuser","Non, après 2 ans c'est obligatoire","Oui, mais tu perds tes droits"],a:1},
  {q:"Quel formulaire officiel utilise-t-on pour une rupture conventionnelle ?",opts:["Un simple courrier","Le formulaire Cerfa n°14598","Un accord devant notaire","Une lettre recommandée suffit"],a:1},
  {q:"La rupture conventionnelle protège-t-elle le salarié d'un licenciement immédiat ?",opts:["Non","Oui — pendant le délai de rétractation et d'homologation","Seulement si le salarié est syndiqué","Non, l'employeur peut licencier quand même"],a:1},
  {q:"Ton employeur retire sa signature pendant le délai de rétractation. C'est possible ?",opts:["Non, la signature est définitive","Oui, chacun peut se rétracter dans les 15 jours","Non, sauf accord du tribunal","Oui, mais il doit payer une pénalité"],a:1},
  {q:"L'indemnité de rupture conventionnelle, c'est au minimum combien par année d'ancienneté ?",opts:["1/2 mois de salaire par année jusqu'à 10 ans","1/4 de mois de salaire brut par année d'ancienneté","1 mois de salaire par année","2 semaines de salaire par année"],a:1},
  {q:"Peut-on faire une rupture conventionnelle en étant en période d'essai ?",opts:["Oui, sans problème","Non, la rupture conventionnelle ne s'applique pas à la période d'essai","Oui, mais avec accord de l'inspection du travail","Non, sauf si les deux parties sont d'accord"],a:1},
  {q:"Si la DREETS ne répond pas dans les 15 jours ouvrables, que se passe-t-il ?",opts:["La rupture est annulée","La rupture est considérée comme homologuée automatiquement","Le délai recommence","L'employeur doit tout recommencer"],a:1},
  {q:"La rupture conventionnelle est-elle possible pour un salarié protégé (délégué syndical) ?",opts:["Non, jamais","Oui, mais avec une procédure spéciale et autorisation de l'inspection du travail","Oui, exactement comme tout le monde","Non, sauf s'il démissionne d'abord"],a:1},
  {q:"Combien de temps minimum entre le 1er entretien et la signature de la convention ?",opts:["Aucun délai obligatoire","Pas de délai légal minimum entre entretiens","7 jours","15 jours"],a:1},
  {q:"Une rupture conventionnelle peut-elle être annulée après homologation ?",opts:["Non, jamais","Oui, par les prud'hommes dans un délai d'1 an si vice du consentement","Non, sauf accord mutuel","Oui, dans les 30 jours"],a:1},
  {q:"L'attestation France Travail après une rupture conventionnelle — qui la remplit ?",opts:["Le salarié","L'employeur","France Travail directement","La DREETS"],a:1},
  {q:"Peut-on cumuler une rupture conventionnelle et une transaction avec son employeur ?",opts:["Non, c'est interdit","Oui, mais la transaction doit régler des litiges autres que la rupture elle-même","Non, sauf avec un avocat","Oui, sans restriction"],a:1},
  {q:"Le salarié peut-il se faire assister lors des entretiens de rupture conventionnelle ?",opts:["Non, jamais","Oui, par un salarié de l'entreprise ou un conseiller extérieur si l'employeur est aussi assisté","Oui, par n'importe qui","Non, sauf représentant syndical"],a:1},
  {q:"Quelle est la date minimum de fin de contrat après l'homologation ?",opts:["Le lendemain de l'homologation","Le jour même de l'homologation","Aucune contrainte — date librement choisie après homologation","30 jours après l'homologation"],a:0},
  {q:"Une rupture conventionnelle signée sous pression peut être contestée comment ?",opts:["Elle ne peut pas être contestée","Devant les prud'hommes dans l'année suivant l'homologation pour vice du consentement","Uniquement par voie pénale","Seulement avec un avocat"],a:1}
];
function buildQRUP(){ var pool=QRUP_BANK.concat(QRUP_VAR); for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;} return pool.slice(0,25).map(function(q){var correct=q.opts[q.a];var opts=q.opts.slice();for(var i=opts.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=opts[i];opts[i]=opts[j];opts[j]=t;}return{q:q.q,opts:opts,a:opts.indexOf(correct)};}); }
var QRUP = buildQRUP();
var qruptState = {cur:0, score:0, answers:[], done:false};
function resetQuizRupture(){ QRUP=buildQRUP(); qruptState={cur:0,score:0,answers:[],done:false}; }
function renderQuizRupture(){
  var zone=document.getElementById('qrup-zone'); if(!zone) return;
  var q=QRUP[qruptState.cur];
  var pct=Math.round((qruptState.cur/QRUP.length)*100);
  var bar=document.getElementById('qrup-bar'); if(bar) bar.style.width=pct+'%';
  var step=document.getElementById('qrup-step'); if(step) step.textContent='Question '+(qruptState.cur+1)+' / '+QRUP.length;
  var pctEl=document.getElementById('qrup-pct'); if(pctEl) pctEl.textContent=pct+'%';
  zone.innerHTML=_jokersBar('RUP')
    +'<div style="font-size:.62rem;font-weight:700;color:#7c3aed;margin-bottom:8px">Question '+(qruptState.cur+1)+' / '+QRUP.length+'</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.22rem;color:#0f172a;line-height:1.5;margin-bottom:20px">'+q.q+'</div>'
    +q.opts.map(function(o,i){
      return '<div onclick="answerQuizRupture('+i+')" data-oi="'+i+'" data-ns="RUP" style="display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:13px 15px;margin-bottom:10px;cursor:pointer;transition:all .15s" onmousedown="this.style.borderColor=\'#7c3aed\';this.style.background=\'#f5f3ff\'" onmouseup="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'" ontouchstart="this.style.borderColor=\'#7c3aed\';this.style.background=\'#f5f3ff\'" ontouchend="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'">'
        +'<div style="width:26px;height:26px;border-radius:50%;background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.62rem;font-weight:800;color:#64748b">'+String.fromCharCode(65+i)+'</div>'
        +'<div style="font-size:.82rem;color:#334155;line-height:1.45;font-weight:500">'+o+'</div>'
        +'</div>';
    }).join('');
  _chronoStart('chrono_RUP', function(){ _jToast('⏱️ Temps écoulé !'); if(qruptState.cur<QRUP.length-1){qruptState.cur++;renderQuizRupture();}else{_chronoStop();showQuizRuptureResult();}});
}
function answerQuizRupture(idx){
  var q=QRUP[qruptState.cur];
  var correct=idx===q.a;
  if(_QJokerUsedThisQ) _thumbAnim(correct);
  _QJokerUsedThisQ=false;
  qruptState.answers.push({q:q.q,chosen:q.opts[idx],correct_ans:q.opts[q.a],ok:correct});
  if(correct) qruptState.score++;
  _qcmSelect('RUP', idx, '#7c3aed', function(){ if(qruptState.cur<QRUP.length-1){ qruptState.cur++; renderQuizRupture(); }else { _chronoStop(); showQuizRuptureResult(); } });
}
function showQuizRuptureResult(){
  var s=qruptState.score;
  var level=s>=23?'Expert rupture conv. 🏆':s>=18?'Bon niveau ✅':s>=12?'Niveau intermédiaire 📈':'Débutant ⚡';
  var el;
  el=document.getElementById('qrup-score'); if(el) el.textContent=s;
  el=document.getElementById('qrup-level'); if(el) el.textContent=level;
  el=document.getElementById('qrup-detail');
  if(el) el.innerHTML=buildQuizResult(qruptState.answers,'Rupture conventionnelle',QRUP.length);
  go('quiz-rupture-result');
  setTimeout(function(){_confetti(qruptState.score/QRUP.length>=0.6);},200);
  if(window._lastEvaPlanArgs){ var _a=window._lastEvaPlanArgs; window._lastEvaPlanArgs=null; generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers); }
}
function renderQuizRH(){
  var zone=document.getElementById('qrh-zone'); if(!zone) return;
  var q=QRH[qrhState.cur];
  var pct=Math.round((qrhState.cur/QRH.length)*100);
  var bar=document.getElementById('qrh-bar'); if(bar) bar.style.width=pct+'%';
  var step=document.getElementById('qrh-step'); if(step) step.textContent='Question '+(qrhState.cur+1)+' / '+QRH.length;
  var pctEl=document.getElementById('qrh-pct'); if(pctEl) pctEl.textContent=pct+'%';
  zone.innerHTML=_jokersBar('RH')
    +'<div style="font-size:.62rem;font-weight:700;color:#059669;margin-bottom:8px">Question '+(qrhState.cur+1)+' / '+QRH.length+'</div>'
    +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.22rem;color:#0f172a;line-height:1.5;margin-bottom:20px">'+q.q+'</div>'
    +q.opts.map(function(o,i){
      return '<div onclick="answerQuizRH('+i+')" data-oi="'+i+'" data-ns="RH" style="display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:13px 15px;margin-bottom:10px;cursor:pointer;transition:all .15s" onmousedown="this.style.borderColor=\'#059669\';this.style.background=\'#f0fdf4\'" onmouseup="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'" ontouchstart="this.style.borderColor=\'#059669\';this.style.background=\'#f0fdf4\'" ontouchend="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'">'
        +'<div style="width:26px;height:26px;border-radius:50%;background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.62rem;font-weight:800;color:#64748b">'+String.fromCharCode(65+i)+'</div>'
        +'<div style="font-size:.82rem;color:#334155;font-weight:500;line-height:1.45">'+o+'</div>'
        +'</div>';
    }).join('');
  _chronoStart('chrono_RH', function(){ _jToast('⏱️ Temps écoulé !'); if(qrhState.cur<QRH.length-1){qrhState.cur++;renderQuizRH();}else{_chronoStop();showQuizRHResult();}});
}
function answerQuizRH(idx){
  var q=QRH[qrhState.cur];
  var correct=idx===q.a;
  if(_QJokerUsedThisQ) _thumbAnim(correct);
  _QJokerUsedThisQ=false;
  qrhState.answers.push({q:q.q,chosen:q.opts[idx],correct_ans:q.opts[q.a],ok:correct});
  if(correct) qrhState.score++;
  _qcmSelect('RH', idx, '#059669', function(){ if(qrhState.cur<QRH.length-1){ qrhState.cur++; renderQuizRH(); }else{ _chronoStop(); showQuizRHResult(); } });
}
// ── Quiz PDF inline (droit / salaire / entretien) ──
function openQuizPDF(type){
  var configs = {
    droit:{
      title:'Droit du travail', color:'#002395', bg:'linear-gradient(135deg,#dbeafe,#93c5fd)',
      pdfSections:['Contrat de travail (CDI/CDD)','Rupture conventionnelle','Licenciement : procédure et droits','Période d\'essai','Temps de travail & heures sup','Congés payés & arrêt maladie','Salaire minimum & primes'],
      questions: shuffleAndPick([
        {q:"Quelle est la durée légale du travail hebdomadaire en France ?",opts:["35 heures","39 heures","40 heures","32 heures"],a:0},
        {q:"Qu'est-ce qu'une rupture conventionnelle ?",opts:["Un licenciement pour faute","Une démission","Une rupture du contrat par accord mutuel","Un abandon de poste"],a:2},
        {q:"Quel est le délai de préavis minimum pour un CDI d'un salarié ayant 3 ans d'ancienneté ?",opts:["1 semaine","1 mois","2 mois","3 mois"],a:1},
        {q:"Un CDD peut-il être renouvelé ?",opts:["Non, jamais","Oui, une seule fois","Oui, deux fois maximum","Autant de fois que nécessaire"],a:2},
        {q:"En cas de licenciement économique, à quoi a droit le salarié ?",opts:["À rien","Aux allocations chômage uniquement","À une indemnité de licenciement + allocations chômage","Au RSA uniquement"],a:2},
        {q:"Qu'est-ce que la période d'essai en CDI pour un cadre ?",opts:["1 mois renouvelable une fois","2 mois","4 mois renouvelables une fois (8 mois max)","6 mois fixes"],a:2},
        {q:"Qu'est-ce qu'un accord de non-concurrence ?",opts:["Une clause illégale en France","Une clause qui interdit au salarié de travailler dans le même secteur après son départ, sous conditions","Un accord entre syndicats","Un contrat de sous-traitance"],a:1},
        {q:"Quel est le délai de prescription pour réclamer des heures supplémentaires impayées ?",opts:["6 mois","1 an","3 ans","5 ans"],a:2},
        {q:"Qu'est-ce que le forfait jour ?",opts:["Un contrat à temps partiel","Un régime de travail basé sur un nombre annuel de jours pour les cadres autonomes","Un accord de 35h/semaine","Un contrat saisonnier"],a:1},
        {q:"En cas d'inaptitude médicale, que doit faire l'employeur ?",opts:["Licencier immédiatement","Chercher un poste de reclassement ou licencier pour inaptitude","Mettre le salarié en congé sans solde","Rien, le salarié démissionne"],a:1},
        {q:"Qu'est-ce que le droit de retrait ?",opts:["Le droit de refuser une mutation","Le droit de quitter son poste face à un danger grave et imminent","Le droit de prendre des congés","Le droit de refuser des heures supplémentaires"],a:1},
        {q:"Quelle est la durée maximale légale du travail quotidien en France ?",opts:["8 heures","10 heures","12 heures en cas de circonstances exceptionnelles","14 heures"],a:1},
        {q:"Qu'est-ce qu'un licenciement pour faute grave ?",opts:["Un licenciement avec préavis payé","Un licenciement sans préavis ni indemnités","Un licenciement économique","Une rupture conventionnelle forcée"],a:1},
        {q:"Combien de jours de congés payés acquiert-on par mois travaillé ?",opts:["2 jours","2,5 jours","3 jours","1 jour"],a:1},
        {q:"Qu'est-ce que le CSE ?",opts:["Un organisme de formation","L'instance représentative du personnel obligatoire depuis 2020","Un syndicat","Un service de l'URSSAF"],a:1},
        {q:"Qu'est-ce qu'une convention collective ?",opts:["Un accord entre deux entreprises","Un accord entre employeurs et syndicats qui complète le Code du travail","Une loi votée par le Parlement","Un contrat standard"],a:1},
        {q:"Peut-on être licencié pendant un arrêt maladie ?",opts:["Non, jamais","Oui, pour un motif non lié à la maladie","Oui, toujours","Seulement après 3 mois d'arrêt"],a:1},
        {q:"Quel est le délai de préavis pour un ouvrier CDI ayant moins de 6 mois d'ancienneté ?",opts:["Aucun","1 semaine","1 mois","2 semaines"],a:1},
        {q:"Qu'est-ce que l'entretien professionnel obligatoire ?",opts:["L'entretien annuel d'évaluation","Un entretien tous les 2 ans pour discuter des perspectives d'évolution","Un entretien de licenciement","Un entretien de recrutement interne"],a:1},
        {q:"Quelle est la durée maximale d'un CDD classique ?",opts:["6 mois","12 mois","18 mois","24 mois"],a:2},
        {q:"Qu'est-ce que la prise d'acte de la rupture du contrat ?",opts:["Une démission classique","Un acte par lequel le salarié rompt son contrat en imputant la faute à l'employeur","Une rupture conventionnelle","Un abandon de poste"],a:1},
        {q:"En cas d'abandon de poste depuis 2023, que risque le salarié ?",opts:["Rien","Être présumé démissionnaire et perdre ses droits chômage","Un licenciement pour faute lourde automatique","Une amende"],a:1},
        {q:"Qu'est-ce que le télétravail imposé unilatéralement par l'employeur ?",opts:["Possible sans formalité","Possible uniquement en cas de circonstances exceptionnelles","Toujours interdit","Possible seulement pour les cadres"],a:1},
        {q:"Qu'est-ce que le harcèlement moral au travail ?",opts:["Un conflit ponctuel entre collègues","Des agissements répétés dégradant les conditions de travail ou la dignité du salarié","Un désaccord avec son manager","Une surcharge de travail temporaire"],a:1},
        {q:"Quel est le délai pour agir aux prud'hommes pour un licenciement sans cause réelle ?",opts:["6 mois","1 an","2 ans","5 ans"],a:1},
        // variantes + nouvelles questions droit du travail
        {q:"Tu travailles 42h cette semaine. Les 7h supplémentaires sont majorées de combien ?",opts:["10%","25%","50%","Pas de majoration"],a:1},
        {q:"Un CDD se termine. L'employeur ne propose pas de CDI. Tu as droit à quoi ?",opts:["Rien","Une prime de précarité de 10% du salaire brut total","Un mois de salaire","Une indemnité de licenciement"],a:1},
        {q:"Peut-on renouveler un CDD plus de 2 fois ?",opts:["Oui, autant que nécessaire","Non, 2 renouvellements maximum","Oui, avec accord des prud'hommes","Non, 1 seul renouvellement"],a:1},
        {q:"Qu'est-ce que le droit à la déconnexion ?",opts:["Le droit de quitter son travail","Le droit de ne pas répondre aux emails pro hors temps de travail","Une coupure internet obligatoire","Un avantage cadres uniquement"],a:1},
        {q:"La période d'essai d'un cadre en CDI dure combien ?",opts:["1 mois","2 mois","4 mois renouvelables une fois","6 mois fixes"],a:2},
        {q:"Qu'est-ce que l'entretien préalable au licenciement ?",opts:["Un entretien annuel","Une réunion obligatoire avant tout licenciement pour entendre le salarié","Un entretien de recrutement","Un bilan de compétences"],a:1},
        {q:"Tu es en arrêt maladie. Ton employeur peut-il te licencier ?",opts:["Non, jamais","Oui, pour un motif non lié à la maladie","Oui, toujours","Seulement après 3 mois d'arrêt"],a:1},
        {q:"Combien de jours de congés payés acquiert-on par mois travaillé ?",opts:["2 jours","2,5 jours","3 jours","1 jour"],a:1},
        {q:"C'est quoi une clause de non-concurrence valide ?",opts:["N'importe quelle clause écrite","Une clause limitée dans le temps, l'espace, l'objet, avec contrepartie financière","Une clause verbale suffit","Une clause sans limite si signée"],a:1},
        {q:"Tu subis du harcèlement moral. Tu alertes qui en premier ?",opts:["La police","Les prud'hommes directement","Le CSE, les RH ou l'inspecteur du travail","Ton syndicat uniquement"],a:2},
        {q:"Quelle est la durée légale hebdomadaire du travail en France ?",opts:["32h","35h","39h","40h"],a:1},
        {q:"Qu'est-ce qu'un PSE (Plan de Sauvegarde de l'Emploi) ?",opts:["Un accord de réduction du temps de travail","Un plan obligatoire lors de licenciements collectifs dans les entreprises de 50+","Une aide de l'État aux PME","Un congé spécial seniors"],a:1},
        {q:"Le forfait annuel en jours concerne qui principalement ?",opts:["Tous les salariés","Les cadres autonomes dont le temps ne peut être prédéterminé","Les ouvriers","Les temps partiels"],a:1},
        {q:"Qu'est-ce que le droit de retrait du salarié ?",opts:["Le droit de refuser une mutation","Le droit de quitter son poste face à un danger grave et imminent","Le droit de prendre des congés","Le droit de refuser des heures supplémentaires"],a:1},
        {q:"Qu'est-ce que la convention collective dans une entreprise ?",opts:["Un accord entre deux entreprises","Un accord entre employeurs et syndicats qui complète le Code du travail pour une branche","Une loi votée par le Parlement","Un contrat standard"],a:1}
      ], 25)
    },
    salaire:{
      title:'Négociation de salaire', color:'#334155', bg:'linear-gradient(135deg,#f1f5f9,#e2e8f0)',
      pdfSections:['Benchmark salaires par secteur','Fourchette et timing de négociation','Scripts de réponse aux objections','Négocier au-delà du fixe','Contre-offre : comment réagir','Erreurs à éviter en négociation','Lettre de négociation type'],
      questions: shuffleAndPick([
        {q:"Quelle est la meilleure réponse quand on vous demande vos prétentions salariales ?",opts:["Donner un chiffre exact immédiatement","Dire que vous n'avez pas de prétentions","Donner une fourchette et laisser l'autre partie répondre en premier si possible","Refuser de répondre"],a:2},
        {q:"Quand est le meilleur moment pour négocier son salaire ?",opts:["Avant même le premier entretien","Lors de l'offre finale, après qu'ils vous ont choisi","Pendant le premier entretien","Jamais, c'est impoli"],a:1},
        {q:"Peut-on négocier autre chose que le salaire fixe ?",opts:["Non, c'est le seul élément négociable","Oui : primes, télétravail, RTT, voiture, formation, tickets restaurant","Oui, mais seulement la prime annuelle","Non, tout est fixé par la convention collective"],a:1},
        {q:"Quel est le piège classique à éviter en négociation salariale ?",opts:["Dire pourquoi on mérite ce salaire","Parler en premier et annoncer un chiffre trop bas","Demander un délai de réflexion","Se préparer avec des données du marché"],a:1},
        {q:"Si l'offre est en dessous de vos attentes, que faire ?",opts:["Accepter immédiatement","Refuser catégoriquement","Remercier, exprimer votre intérêt et demander un délai de réflexion","Négocier agressivement sur le champ"],a:2},
        {q:"Comment calculer sa valeur marchande avant une négociation ?",opts:["Demander à ses amis","Consulter les grilles salariales sur Glassdoor, LinkedIn Salary","Se baser uniquement sur son dernier salaire","Demander au recruteur"],a:1},
        {q:"Que signifie négocier le package salarial ?",opts:["Négocier uniquement le salaire brut","Négocier l'ensemble : fixe, variable, avantages en nature, congés","Négocier uniquement la prime","Demander un CDI à la place d'un CDD"],a:1},
        {q:"Comment répondre à 'C'est notre maximum budgétaire' ?",opts:["Accepter immédiatement","Exprimer de la compréhension et demander si d'autres éléments peuvent être revus","Partir immédiatement","Insister de façon agressive"],a:1},
        {q:"Qu'est-ce que l'effet d'ancrage en négociation ?",opts:["Le fait de s'ancrer dans la réalité","Le premier chiffre annoncé influence les négociations suivantes","Un biais cognitif lié à la fatigue","Une technique de vente agressive"],a:1},
        {q:"Qu'est-ce que l'intéressement en entreprise ?",opts:["Un salaire fixe garanti","Un dispositif collectif lié aux résultats de l'entreprise","Une prime individuelle arbitraire","Un avantage réservé aux dirigeants"],a:1},
        {q:"Quel est l'avantage de donner une fourchette haute en négociation ?",opts:["Ça fait fuir les recruteurs","Cela crée un effet d'ancrage favorable et laisse de la marge","C'est toujours refusé","Ça montre qu'on est désespéré"],a:1},
        {q:"Que faire si vous recevez une contre-offre de votre employeur actuel ?",opts:["L'accepter toujours","La refuser toujours","Évaluer sincèrement si les conditions répondent à vos motivations profondes","Faire une guerre des offres"],a:2},
        {q:"Qu'est-ce que le salaire variable ?",opts:["Le SMIC","Une part de rémunération liée aux performances (bonus, commission, intéressement)","Les tickets restaurant","Le remboursement des transports"],a:1},
        {q:"Pourquoi documenter ses réalisations chiffrées aide en négociation ?",opts:["Pour remplir son CV","Pour justifier concrètement sa valeur ajoutée et sa demande","C'est inutile","Pour impressionner superficiellement"],a:1},
        {q:"Que signifie 'BATNA' en négociation ?",opts:["Budget Annuel Total Net Alloué","Best Alternative To a Negotiated Agreement","Bonus Annuel et Taux de Négociation Appliqué","Aucune de ces réponses"],a:1},
        {q:"Qu'est-ce que la participation aux bénéfices ?",opts:["Un cadeau de Noël","Un mécanisme légal de redistribution d'une partie des bénéfices aux salariés","Un avantage uniquement pour les managers","Un dispositif facultatif"],a:1},
        {q:"Pourquoi ne faut-il pas accepter la première offre sans négocier ?",opts:["C'est impoli","Les employeurs gardent souvent une marge de négociation","C'est illégal","La première offre est toujours la meilleure"],a:1},
        {q:"Qu'est-ce qu'un plan d'épargne entreprise (PEE) ?",opts:["Un compte courant professionnel","Un dispositif d'épargne collectif avec avantages fiscaux","Un prêt à taux zéro","Une assurance chômage privée"],a:1},
        {q:"Quel est le bon moment pour mentionner une offre concurrente ?",opts:["Jamais","Dès le début pour mettre la pression","Après avoir montré son intérêt pour le poste, comme levier","Par email uniquement"],a:2},
        {q:"Comment préparer sa négociation pour une promotion interne ?",opts:["Attendre que l'employeur propose","Documenter ses réalisations, benchmarker le marché et préparer ses arguments","Menacer de partir","Demander à ses collègues leur salaire"],a:1},
        {q:"Que faire si le recruteur demande votre salaire actuel ?",opts:["Mentir pour avoir un avantage","Refuser catégoriquement","Partager l'information et rediriger vers vos attentes","Ne rien dire"],a:2},
        {q:"Quel est le bon état d'esprit pour une négociation réussie ?",opts:["Agressif et compétitif","Passif et reconnaissant","Collaboratif : chercher une solution gagnant-gagnant","Indifférent au résultat"],a:2},
        {q:"Qu'est-ce qu'une clause de révision salariale ?",opts:["Une clause illégale","Une clause permettant de revoir le salaire après une période définie","Un accord de non-concurrence","Une clause de mobilité"],a:1},
        {q:"Pourquoi faut-il éviter de parler de ses besoins personnels pour justifier un salaire ?",opts:["C'est illégal","Cela affaiblit la position : la valeur doit être justifiée par les compétences et le marché","C'est impoli","Le recruteur ne peut pas aider"],a:1},
        {q:"Qu'est-ce que le stock-option en rémunération ?",opts:["Un bonus en espèces","Le droit d'acheter des actions de l'entreprise à un prix préférentiel","Un avantage en nature","Une prime de résultats classique"],a:1}
      ], 25)
    },
    entretien:{
      title:"Questions d'entretien", color:'#ED2939', bg:'linear-gradient(135deg,#fee2e2,#fca5a5)',
      pdfSections:['Méthode STAR expliquée + exemples','50 questions classiques RH + réponses','Questions pièges et comment les déjouer','Présentation personnelle : script type','Questions à poser au recruteur','Relance post-entretien : email type','Grille d\'auto-évaluation entretien'],
      questions: shuffleAndPick([
        {q:"Que signifie la méthode STAR pour répondre aux questions comportementales ?",opts:["Situation, Tâche, Action, Résultat","Style, Temps, Aptitude, Résultat","Savoir, Talent, Ambition, Réussite","Stratégie, Technique, Adaptation, Réponse"],a:0},
        {q:"Comment répondre à 'Parlez-moi de vous' ?",opts:["Raconter toute sa vie depuis l'enfance","Réciter son CV mot pour mot","Faire un pitch de 2 min : parcours, valeur ajoutée, pourquoi ce poste","Parler de ses loisirs uniquement"],a:2},
        {q:"La question 'Où vous voyez-vous dans 5 ans ?' teste surtout quoi ?",opts:["Votre capacité à prévoir l'avenir","Votre ambition et alignement avec l'entreprise","Votre stabilité émotionnelle","Votre connaissance du marché"],a:1},
        {q:"Quand poser des questions à la fin d'un entretien ?",opts:["Jamais, ça montre de la curiosité déplacée","Toujours, c'est une marque d'intérêt professionnel","Seulement si on n'a pas compris quelque chose","Seulement pour les postes senior"],a:1},
        {q:"Quel est le principal piège de la question 'Quel est votre plus grand défaut ?' ?",opts:["Dire qu'on n'en a pas","Donner un vrai défaut rédhibitoire sans solution","Citer un défaut sans rapport avec le poste","Prendre trop de temps pour répondre"],a:1},
        {q:"Comment répondre à 'Pourquoi avez-vous quitté votre dernier emploi ?' après un licenciement ?",opts:["Critiquer l'ancien employeur","Inventer une raison positive","Être honnête, factuel et expliquer ce que vous en avez appris","Refuser de répondre"],a:2},
        {q:"Quelle est la longueur idéale du pitch de présentation ?",opts:["30 secondes maximum","1 à 2 minutes","5 minutes minimum","Il n'y a pas de règle"],a:1},
        {q:"Que faire si on ne comprend pas une question en entretien ?",opts:["Répondre n'importe quoi","Faire semblant de comprendre","Demander poliment de reformuler la question","Changer de sujet"],a:2},
        {q:"Qu'est-ce qu'une question situationnelle en entretien ?",opts:["Une question sur la situation familiale","Une question 'Que feriez-vous si...' pour évaluer le raisonnement","Une question illégale","Une question sur le lieu de résidence"],a:1},
        {q:"Comment se démarquer lors d'un entretien collectif ?",opts:["Parler le plus possible et couper la parole","Écouter activement, construire sur les idées des autres et proposer des synthèses","Rester silencieux","Critiquer les autres candidats"],a:1},
        {q:"Pourquoi faut-il éviter de parler négativement de son ancien employeur ?",opts:["C'est illégal","Cela renvoie une image négative et inquiète le recruteur","C'est impoli uniquement","L'ancien employeur pourrait le savoir"],a:1},
        {q:"Qu'est-ce qu'un entretien de cas (case interview) ?",opts:["Un entretien en anglais","Un exercice de résolution de problème business en temps réel","Un test de personnalité","Un entretien collectif"],a:1},
        {q:"Quel est l'impact de la tenue vestimentaire sur l'entretien ?",opts:["Aucun","Très fort : les premières secondes créent une impression durable","Seulement pour les postes commerciaux","Uniquement pour les postes de direction"],a:1},
        {q:"Comment répondre à 'Avez-vous d'autres entretiens en cours ?' ?",opts:["Mentir et dire non","Dire oui si c'est vrai, cela montre que vous êtes demandé","Refuser de répondre","Donner tous les détails"],a:1},
        {q:"Quelle est la meilleure façon d'utiliser la méthode STAR ?",opts:["Donner une réponse générale et théorique","Raconter une situation réelle et précise avec des résultats chiffrés si possible","Inventer un exemple positif","Parler uniquement de ses succès"],a:1},
        {q:"Que signifie 'fit' dans le contexte d'un recrutement ?",opts:["Être en bonne condition physique","L'adéquation entre le candidat et la culture, les valeurs et les attentes du poste","Avoir fait les mêmes études que le recruteur","Accepter le salaire proposé"],a:1},
        {q:"Comment gérer le stress visible en entretien ?",opts:["Le nier complètement","Préparer intensément ses réponses pour gagner en confiance","Prendre des médicaments","Annuler l'entretien"],a:1},
        {q:"Qu'est-ce qu'un entretien en visioconférence nécessite de particulier ?",opts:["Rien","Vérifier connexion, fond neutre, éclairage, absence de bruit et regarder la caméra","Porter un costume uniquement","Utiliser un fond virtuel obligatoire"],a:1},
        {q:"Pourquoi envoyer un email de remerciement après un entretien ?",opts:["C'est obligatoire légalement","Cela montre votre professionnalisme et votre intérêt","C'est inutile","Uniquement pour les postes de management"],a:1},
        {q:"Quelle erreur est la plus fréquente des candidats en entretien ?",opts:["Arriver trop tôt","Ne pas avoir préparé l'entreprise et le poste","Porter des vêtements trop formels","Poser trop de questions"],a:1},
        {q:"Comment aborder un trou dans son CV en entretien ?",opts:["Le cacher absolument","L'expliquer positivement en mettant en avant ce que vous en avez tiré","Mentir sur les dates","Ne pas en parler sauf si on vous le demande"],a:1},
        {q:"Qu'est-ce qu'un test psychométrique en recrutement ?",opts:["Un test médical","Un outil standardisé évaluant personnalité, aptitudes cognitives ou comportements","Un entretien informel","Un test technique spécifique"],a:1},
        {q:"Comment montrer sa motivation pour un poste ?",opts:["Dire 'je suis très motivé' de façon répétée","Connaître l'entreprise en profondeur et relier ses compétences aux enjeux du poste","Accepter n'importe quel salaire","Arriver très tôt"],a:1},
        {q:"Quelle est la meilleure question à poser au recruteur sur la culture d'entreprise ?",opts:["Combien gagnent mes futurs collègues ?","Quels sont les horaires exacts ?","Quels sont les profils qui réussissent ici et pourquoi ?","Est-ce que je peux prendre des congés l'été ?"],a:2},
        {q:"Comment relancer un recruteur sans nouvelles après un entretien ?",opts:["Appeler toutes les heures","Envoyer un email poli après 1 à 2 semaines en rappelant son intérêt","Ne jamais relancer","Contacter directement le PDG"],a:1}
      ], 25)
    },
    bulletin:{
      title:'Bulletin de salaire', color:'#059669', bg:'linear-gradient(135deg,#d1fae5,#6ee7b7)',
      pdfSections:['Lire sa fiche de paie ligne par ligne','Brut vs Net : les différences clés','Cotisations salariales expliquées','Cotisations patronales','Primes et avantages en nature','Heures supplémentaires sur le bulletin','Vérifier les erreurs sur sa fiche de paie'],
      questions: shuffleAndPick([
        {q:"C'est quoi le salaire brut ?",opts:["Ce que tu touches sur ton compte","Ton salaire avant toutes les déductions","Ce que l'employeur paie en tout","Le salaire fixé dans la convention collective"],a:1},
        {q:"C'est quoi le salaire net ?",opts:["Le salaire avant impôts","Le salaire après déduction des cotisations sociales, que tu touches vraiment","Le même que le brut","Le salaire negocié à l'embauche"],a:1},
        {q:"En moyenne, le net représente combien du brut ?",opts:["50%","65% environ","75% environ","90%"],a:2},
        {q:"À quoi servent les cotisations sociales prélevées sur ton bulletin ?",opts:["À payer les impôts de l'État","À financer la retraite, la santé, le chômage et autres protections sociales","À enrichir l'employeur","À financer les allocations familiales uniquement"],a:1},
        {q:"Qui paie aussi des cotisations en plus du salarié ?",opts:["Personne d'autre","L'employeur paie également des cotisations patronales","L'État paie la moitié","La Sécurité Sociale avance l'argent"],a:1},
        {q:"C'est quoi le salaire net à payer avant impôt ?",opts:["Le salaire après toutes déductions y compris l'impôt","Le salaire net avant prélèvement à la source de l'impôt","Le même que le salaire brut","Le salaire minimum légal"],a:1},
        {q:"C'est quoi le prélèvement à la source sur le bulletin de salaire ?",opts:["Une cotisation retraite supplémentaire","L'impôt sur le revenu directement prélevé chaque mois sur ton salaire","Une cotisation santé","Une taxe sur les heures supplémentaires"],a:1},
        {q:"C'est quoi la CSG ?",opts:["Une caisse de retraite privée","Une cotisation qui finance la Sécurité Sociale","Un impôt local","Une prime exceptionnelle"],a:1},
        {q:"Les heures supplémentaires apparaissent comment sur le bulletin ?",opts:["Elles ne sont jamais indiquées","En ligne séparée avec le taux majoré applicable","Incluses dans le salaire de base sans détail","Uniquement sur la fiche de paie de fin d'année"],a:1},
        {q:"C'est quoi le salaire de base sur le bulletin ?",opts:["Ton salaire total charges comprises","Ta rémunération fixe de référence avant primes et heures sup","Le SMIC","Le salaire négocié sans les avantages"],a:1},
        {q:"Une prime exceptionnelle doit-elle apparaître sur le bulletin ?",opts:["Non, elle est versée séparément","Oui, toute somme versée par l'employeur doit figurer sur le bulletin","Seulement si elle dépasse 1000€","Seulement pour les cadres"],a:1},
        {q:"C'est quoi un avantage en nature sur le bulletin ?",opts:["Un bonus en espèces","Un bien ou service fourni par l'employeur (voiture, repas) intégré dans la rémunération","Une prime de résultats","Un remboursement de frais"],a:1},
        {q:"Le remboursement des frais de transport apparaît-il sur le bulletin ?",opts:["Non, jamais","Oui, en général 50% du pass Navigo ou équivalent","Seulement en Île-de-France","Uniquement si le salarié le demande"],a:1},
        {q:"C'est quoi le net imposable ?",opts:["Le montant sur lequel l'impôt sur le revenu est calculé","Le même que le net à payer","Le salaire brut moins les charges patronales","Le salaire minimum légal"],a:0},
        {q:"Peut-on avoir un net imposable plus élevé que le net à payer ?",opts:["Non, c'est impossible","Oui, car certains avantages sont imposables mais pas en espèces","Non, ils sont toujours égaux","Seulement pour les cadres"],a:1},
        {q:"Combien de temps doit-on conserver ses bulletins de salaire ?",opts:["1 an","5 ans","Toute la vie — ils servent à calculer la retraite","3 ans suffisent"],a:2},
        {q:"Si tu penses qu'il y a une erreur sur ton bulletin, que faire ?",opts:["Rien, c'est forcément juste","Contacter les RH ou le service paie pour signaler l'erreur","Aller directement aux prud'hommes","Refuser de signer"],a:1},
        {q:"C'est quoi le coefficient hiérarchique sur un bulletin ?",opts:["Ton nombre d'années d'ancienneté","Un indice qui détermine le salaire selon la convention collective","Ton niveau de diplôme","Le nombre d'heures travaillées"],a:1},
        {q:"Les tickets restaurant apparaissent-ils sur le bulletin ?",opts:["Non jamais","Oui, la part patronale figure souvent sur le bulletin","Seulement si tu les demandes","Uniquement dans les grandes entreprises"],a:1},
        {q:"C'est quoi la mutuelle d'entreprise sur le bulletin ?",opts:["Une assurance vie","Une complémentaire santé dont une partie est payée par l'employeur","Un remboursement de soins","Une cotisation retraite supplémentaire"],a:1},
        {q:"Qu'est-ce que la cotisation retraite complémentaire (AGIRC-ARRCO) ?",opts:["Une épargne personnelle facultative","Une cotisation obligatoire qui complète la retraite de base de la Sécurité Sociale","Une assurance décès","Un plan d'épargne entreprise"],a:1},
        {q:"Peut-on refuser de recevoir son bulletin de paie par mail ?",opts:["Non, l'employeur impose le format","Oui, le salarié peut demander le format papier","Seulement si la convention collective le prévoit","Non, le bulletin papier est obligatoire"],a:1},
        {q:"C'est quoi le SMIC en France ?",opts:["Le salaire moyen","Le salaire minimum légal en dessous duquel on ne peut pas payer un salarié","Le salaire de référence des fonctionnaires","Un salaire fixé par accord de branche"],a:1},
        {q:"À quoi sert de comprendre son bulletin de salaire ?",opts:["À rien, c'est trop technique","À vérifier qu'on est bien payé, comprendre ses droits et éviter les erreurs","Uniquement pour négocier son salaire","Seulement pour les cadres et managers"],a:1},
        {q:"Le bulletin de salaire prouve quoi officiellement ?",opts:["Que tu es embauché","Que tu as bien reçu ton salaire et cotisé — utile pour la retraite, le chômage, la banque","Que tu as un CDI","Que tu paies tes impôts"],a:1},
        // variantes + nouvelles questions bulletin de salaire
        {q:"Sur ton bulletin, tu vois 2 500€ brut et 1 950€ net. La différence représente quoi ?",opts:["L'impôt uniquement","Les cotisations sociales salariales","Les frais de l'entreprise","Le bénéfice de l'employeur"],a:1},
        {q:"Le prélèvement à la source sur ton bulletin — à quoi ça sert ?",opts:["À payer la retraite","À collecter l'impôt sur le revenu directement chaque mois","À financer la mutuelle","À rembourser un prêt employeur"],a:1},
        {q:"La CSG prélevée sur ton bulletin finance quoi ?",opts:["La retraite uniquement","La Sécurité Sociale (santé, retraite, famille, dépendance)","L'impôt local","Le chômage uniquement"],a:1},
        {q:"Combien de temps légalement dois-tu conserver tes bulletins de salaire ?",opts:["5 ans","10 ans","Toute ta vie — ils servent à calculer la retraite","3 ans"],a:2},
        {q:"Tu repères une erreur sur ton bulletin. Tu contactes qui en premier ?",opts:["Les prud'hommes","Le service paie ou les RH","L'URSSAF","La Sécurité Sociale"],a:1},
        {q:"C'est quoi le net imposable sur ton bulletin ?",opts:["Le même que le net à payer","La base de calcul de ton impôt sur le revenu","Le salaire brut","Le salaire après toutes déductions"],a:1},
        {q:"Les cotisations patronales — qui les paie ?",opts:["Le salarié","L'employeur en plus des cotisations salariales","L'État","La mutuelle"],a:1},
        {q:"Un avantage en nature sur le bulletin, c'est quoi concrètement ?",opts:["Un bonus en espèces","Un bien ou service fourni par l'employeur (voiture, repas) intégré dans la rémunération","Une prime de résultats","Un remboursement de frais"],a:1},
        {q:"Le ticket restaurant apparaît-il sur le bulletin de salaire ?",opts:["Non jamais","Oui, la part patronale figure généralement sur le bulletin","Seulement si tu le demandes","Uniquement dans les grandes entreprises"],a:1},
        {q:"Que signifie AGIRC-ARRCO sur ton bulletin ?",opts:["Une assurance décès","La retraite complémentaire obligatoire","Une épargne facultative","Un remboursement santé"],a:1},
        {q:"Peut-on recevoir son bulletin de salaire uniquement par email ?",opts:["Non, le papier est obligatoire","Oui, par défaut depuis 2017 sauf opposition du salarié","Seulement avec accord écrit","Non, sauf convention collective"],a:1},
        {q:"Le coefficient hiérarchique sur le bulletin indique quoi ?",opts:["Ton ancienneté","Ton positionnement selon la convention collective qui détermine ton salaire minimum","Ton niveau de diplôme","Tes heures travaillées"],a:1},
        {q:"Ton employeur peut-il te payer moins que le SMIC ?",opts:["Oui si tu es en période d'essai","Non, jamais — c'est le minimum légal absolu","Oui pour les apprentis","Oui avec accord de la convention collective"],a:1},
        {q:"La mutuelle d'entreprise est-elle obligatoire en France ?",opts:["Non, c'est facultatif","Oui, l'employeur doit proposer une complémentaire santé à tous les salariés","Seulement dans les entreprises de plus de 50 salariés","Oui, mais uniquement pour les CDI"],a:1},
        {q:"Que faire si tu n'as pas reçu ton bulletin de salaire ce mois-ci ?",opts:["C'est normal, ça peut arriver","Relancer les RH — l'employeur a l'obligation légale de le remettre chaque mois","Attendre le mois suivant","Contacter directement l'URSSAF"],a:1}
      ], 25)
    }
  };
  var d = configs[type]; if(!d) return;
  var pdfQ = {cur:0, score:0, answers:[]};

  var ex=document.getElementById('m-quizpdf'); if(ex) ex.remove();
  var m=document.createElement('div');
  m.id='m-quizpdf';
  m.style.cssText='position:fixed;inset:0;background:#f8fafc;z-index:700;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:\'DM Sans\',sans-serif';

  // ── Bloc PDF grisé "BIENTÔT" ──
  function pdfBientotBlock(){
    return '<div style="margin:20px 16px 0;position:relative;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;background:#fff">'
      // Ruban BIENTÔT
      +'<div style="position:absolute;top:0;right:0;width:80px;height:80px;overflow:hidden;z-index:2;pointer-events:none">'
      +'<div style="position:absolute;top:16px;right:-20px;width:90px;background:#ef4444;color:#fff;font-size:.5rem;font-weight:900;letter-spacing:.1em;text-align:center;padding:4px 0;transform:rotate(45deg);box-shadow:0 2px 6px rgba(0,0,0,.25)">BIENTÔT</div>'
      +'</div>'
      // Contenu grisé
      +'<div style="padding:16px;opacity:.45;pointer-events:none;user-select:none">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
      +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="'+d.color+'" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
      +'<span style="font-size:.72rem;font-weight:800;color:'+d.color+'">Dossier PDF — '+d.title+'</span>'
      +'</div>'
      +d.pdfSections.map(function(s){ return '<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="'+d.color+'" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg><span style="font-size:.72rem;color:#334155">'+s+'</span></div>'; }).join('')
      +'</div>'
      +'<div style="padding:0 16px 14px;opacity:.45;pointer-events:none">'
      +'<div style="width:100%;background:#e2e8f0;border-radius:10px;padding:12px;text-align:center;font-size:.72rem;font-weight:800;color:#94a3b8">Télécharger le dossier PDF →</div>'
      +'</div>'
      +'</div>';
  }

  function renderPDFQ(){
    var q=d.questions[pdfQ.cur];
    var tot=d.questions.length;
    m.innerHTML=
      // Header sticky
      '<div style="position:sticky;top:0;z-index:10;background:'+d.bg+';padding:13px 16px 11px;border-bottom:1px solid rgba(0,0,0,.06)">'
      +'<div style="display:flex;align-items:center;gap:10px">'
      +'<button onclick="document.getElementById(\'m-quizpdf\').remove();go(\'quiz-hub\')" style="width:32px;height:32px;background:rgba(255,255,255,.75);border:none;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>'
      +'<div><div style="font-size:.46rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:'+d.color+'">Quiz + Dossier PDF</div>'
      +'<div style="font-size:.86rem;font-weight:800;color:#0f172a;letter-spacing:-.01em">'+d.title+'</div></div>'
      +'</div></div>'
      // Corps quiz
      +'<div style="padding:18px 16px 0">'
      +'<div style="font-size:.54rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#94a3b8;margin-bottom:12px">Quiz — '+tot+' questions</div>'
      +'<div style="font-size:.62rem;font-weight:700;color:'+d.color+';margin-bottom:6px">Question '+(pdfQ.cur+1)+' / '+tot+'</div>'
      +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:1.22rem;color:#0f172a;line-height:1.5;margin-bottom:20px">'+q.q+'</div>'
      +q.opts.map(function(o,i){
        return '<div onclick="pdfQAnswer('+i+')" style="display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:13px 15px;margin-bottom:10px;cursor:pointer;transition:all .15s" onmousedown="this.style.borderColor=\''+d.color+'\';this.style.background=\'#f0fdf4\'" onmouseup="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'" ontouchstart="this.style.borderColor=\''+d.color+'\';this.style.background=\'#f0fdf4\'" ontouchend="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#fff\'">'
          +'<div style="width:26px;height:26px;border-radius:50%;background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.62rem;font-weight:800;color:#64748b">'+String.fromCharCode(65+i)+'</div>'
          +'<span style="font-size:.82rem;color:#334155;line-height:1.45">'+o+'</span>'
          +'</div>';
      }).join('')
      +'</div>'
      // Section PDF bientôt
      + pdfBientotBlock()
      +'<div style="height:30px"></div>';

    window.pdfQAnswer=function(idx){
      var ok=idx===q.a;
      if(ok) pdfQ.score++;
      pdfQ.answers.push({q:q.q,chosen:q.opts[idx],correct_ans:q.opts[q.a],ok:ok});
      if(pdfQ.cur<d.questions.length-1){ pdfQ.cur++; renderPDFQ(); scrollTo(0,0); }
      else{ showPDFResult(); }
    };
  }

  function shareQuiz(platform){
    var url='https://careerpulseia.com';
    var txt='🎯 J\'ai fait '+pdfQ.score+'/'+d.questions.length+' au quiz "'+d.title+'" sur CareerPulse ! Viens toi aussi tester nos quiz et profiter des services de notre site — bientôt encore plus ! 👉 '+url;
    var enc=encodeURIComponent(txt);
    if(platform==='whatsapp'){ window.location.href='whatsapp://send?text='+enc; }
    else if(platform==='telegram'){ window.location.href='tg://msg?text='+enc; }
    else if(platform==='facebook'){
      window.location.href='fb://share?href='+encodeURIComponent(url);
      setTimeout(function(){ window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),'_blank'); },800);
    } else if(platform==='tiktok'){
      window.location.href='snssdk1233://user/profile/self';
      setTimeout(function(){ window.open('https://www.tiktok.com','_blank'); },800);
      try{ navigator.clipboard.writeText(txt); }catch(e){}
    }
  }

  function showPDFResult(){
    var s=pdfQ.score; var tot=d.questions.length;
    var url='https://careerpulseia.com';
    var txt='🎯 J\'ai fait '+s+'/'+tot+' au quiz "'+d.title+'" sur CareerPulse ! Viens toi aussi tester nos quiz et profiter des services de notre site — bientôt encore plus ! 👉 '+url;
    var enc=encodeURIComponent(txt);

    // Header
    var headerHtml = '<div style="background:'+d.bg+';padding:13px 16px 11px;border-bottom:1px solid rgba(0,0,0,.06);margin-bottom:16px">'
      +'<div style="display:flex;align-items:center;gap:10px">'
      +'<button onclick="document.getElementById(\'m-quizpdf\').remove();go(\'quiz-hub\')" style="width:32px;height:32px;background:rgba(255,255,255,.75);border:none;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>'
      +'<div><div style="font-size:.46rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:'+d.color+'">Résultat</div>'
      +'<div style="font-size:.86rem;font-weight:800;color:#0f172a">'+d.title+'</div></div>'
      +'</div></div>';

    // Résultat enrichi via buildQuizResult (inclut déjà partage)
    var bodyHtml = buildQuizResult(pdfQ.answers, d.title, tot);

    // Bouton retour seulement
    var footerHtml = '<div style="padding:0 0 16px">'
      +'<button onclick="document.getElementById(\'m-quizpdf\').remove();go(\'quiz-hub\')" style="width:100%;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px;font-size:.74rem;font-weight:700;color:#059669;cursor:pointer;font-family:inherit;margin-top:4px">← Retour aux quiz</button>'
      +'</div>';

    m.innerHTML = headerHtml + '<div style="padding:0 16px">' + bodyHtml + footerHtml + '</div>';

    // Déclencher generateEvaAIPlan
    if(window._lastEvaPlanArgs){
      var _a=window._lastEvaPlanArgs;
      window._lastEvaPlanArgs=null;
      generateEvaAIPlan(_a.uid,_a.quizName,_a.score,_a.total,_a.answers);
    }
  }

  document.body.appendChild(m);
  renderPDFQ();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function(){
  go('home');
  requestAnimationFrame(function(){ document.body.style.opacity='1'; });
});
