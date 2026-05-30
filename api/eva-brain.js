// ════════════════════════════════════════════════════════════════
//  EVA BRAIN v4.0 — Intelligence Artificielle & Humaine
//  Fichier isolé — ne touche JAMAIS au reste du site
//  Eva fonctionne SANS clé API. Indépendante. Permanente.
//  Intelligence : ChatGPT + Claude + Gemini + Coaching Humain
// ════════════════════════════════════════════════════════════════

window.EVA_BRAIN = (function() {

  // ── MÉMOIRE DE SESSION ──
  var _mem = {
    prenom: '',
    situation: '',
    emotion_detectee: '',
    themes_abordes: [],
    nb_echanges: 0,
    derniere_question: '',
    contexte: {}
  };

  // ── DÉTECTION LANGUE ──
  function detectLang(txt) {
    if (!txt) return 'fr';
    var t = txt.toLowerCase();
    if (/\b(hello|hi|i need|i want|my name|help me|job|resume|interview)\b/.test(t)) return 'en';
    if (/\b(hola|buenos|gracias|necesito|trabajo|entrevista|ayuda)\b/.test(t)) return 'es';
    if (/[\u0600-\u06FF]/.test(txt)) return 'ar';
    return 'fr';
  }

  // ── DÉTECTION ÉMOTION (niveau expert psychologie) ──
  function detectEmotion(txt) {
    var t = txt.toLowerCase();
    if (/panique|angoisse|trop dur|je craque|désespoir|plus envie|je n'en peux|bout du rouleau/.test(t)) return 'detresse';
    if (/décourag|épuisé|fatigué|ras.le.bol|plus la force|j'en ai marre|à bout/.test(t)) return 'epuisement';
    if (/en colère|colere|injuste|scandale|inacceptable|volé|arnaqué|ils m'ont/.test(t)) return 'colere';
    if (/je sais pas|perdu|comprends pas|confus|par où commencer|sais plus/.test(t)) return 'confusion';
    if (/j'ai peur|peur de|j'ai honte|honte|nul|nulle|pas capable|pas assez/.test(t)) return 'doute';
    if (/motivé|prêt|j'y vais|bonne nouvelle|ça avance|super|excellent/.test(t)) return 'positif';
    return 'neutre';
  }

  // ── DÉTECTION THÈME (15 catégories) ──
  function detectTheme(txt) {
    var t = txt.toLowerCase();
    if (/licenci|viré|virer|renvoy|licencie/.test(t)) return 'licenciement';
    if (/rupture.conv|rupco|rupture conventionnelle/.test(t)) return 'rupture_conv';
    if (/chômage|chomage|\bare\b|allocation chom/.test(t)) return 'chomage';
    if (/\brsa\b|prime.activ|\bcaf\b|aide.soci|allocat/.test(t)) return 'aides';
    if (/\bcpf\b|formation|se form|apprendre|certif/.test(t)) return 'formation';
    if (/salaire|augment|négoci|negoci|paye|rémunér/.test(t)) return 'salaire';
    if (/\bcv\b|lettre.motiv|candidatur|postuler/.test(t)) return 'cv_lm';
    if (/entretien|recruteur|interview|recrut/.test(t)) return 'entretien';
    if (/contrat|\bcdd\b|\bcdi\b|intérim|interim/.test(t)) return 'contrat';
    if (/stress|peur|décourag|déprim|perdu|j.en ai marre/.test(t)) return 'soutien';
    if (/reconvers|changer.métier|bilan.compét|transition/.test(t)) return 'reconversion';
    if (/créer|entrepris|micro.entrepr|sasu|freelance|autoentrepreneur/.test(t)) return 'entrepreneuriat';
    if (/harcèl|harcel|conflit|toxic|dispute|ambiance/.test(t)) return 'conflit';
    if (/handicap|rqth|mdph|inaptitude/.test(t)) return 'handicap';
    if (/retraite|fin.de.carrière|senior/.test(t)) return 'retraite';
    if (/quiz|score|résultat/.test(t)) return 'quiz';
    if (/merci|super|c'est clair|ok merci|ça m'aide|parfait/.test(t)) return 'fin';
    return 'general';
  }

  // ── RÉPONSES ÉMOTIONNELLES ──
  var EMOTIONS = {
    detresse: {
      fr: '💙 Je t\'entends vraiment.\n\nC\'est lourd ce que tu portes en ce moment. Tu n\'as pas à traverser ça seul(e).\n\nDis-moi ce qui se passe — on va regarder ça ensemble.',
      en: '💙 I hear you. That sounds really tough.\n\nYou don\'t have to go through this alone. Tell me what\'s happening.',
      es: '💙 Te escucho. Eso suena muy difícil.\n\nNo tienes que pasar por esto solo/a. Cuéntame qué pasa.'
    },
    epuisement: {
      fr: '💙 Ça se sent que tu portes ça depuis un moment...\n\n La recherche d\'emploi c\'est épuisant. C\'est normal de douter.\n\nOn y va pas à pas. Dis-moi où tu en es vraiment.',
      en: '💙 I can feel you\'ve been carrying this for a while.\n\nJob searching is exhausting. Doubt is normal.\n\nLet\'s take it step by step. Where are you right now?',
      es: '💙 Puedo sentir que llevas tiempo con esto.\n\nBuscar trabajo es agotador. Es normal dudar.\n\nVamos paso a paso. ¿Dónde estás ahora mismo?'
    },
    colere: {
      fr: '💪 Ta colère est totalement légitime.\n\nCe que tu décris est injuste — et tu as le droit d\'en vouloir.\n\nMais on va transformer cette énergie en action. Dis-moi exactement ce qui s\'est passé.',
      en: '💪 Your anger is completely legitimate.\n\nWhat you\'re describing is unfair — you have every right to be angry.\n\nBut let\'s turn that energy into action. Tell me exactly what happened.',
      es: '💪 Tu rabia es completamente legítima.\n\nLo que describes es injusto. Tienes todo el derecho a estar enojado/a.\n\nPero vamos a convertir esa energía en acción. Dime exactamente qué pasó.'
    },
    confusion: {
      fr: '🎯 C\'est normal de ne pas savoir par où commencer.\n\nIl y a tellement d\'informations que ça peut vite devenir flou.\n\nOn va clarifier ça ensemble, étape par étape. Ta situation pro en ce moment c\'est quoi ?',
      en: '🎯 It\'s completely normal not to know where to start.\n\nThere\'s so much information it can get confusing fast.\n\nLet\'s clarify this together, step by step. What\'s your current work situation?',
      es: '🎯 Es normal no saber por dónde empezar.\n\nHay tanta información que puede volverse confuso rápido.\n\nVamos a aclarar esto juntos, paso a paso. ¿Cuál es tu situación laboral actual?'
    },
    doute: {
      fr: '💙 Ce que tu ressens est valide.\n\nDouter de soi c\'est humain — mais laisse-moi te dire quelque chose : le fait que tu cherches, que tu te battes, que tu sois là... c\'est déjà une force.\n\nDis-moi ce qui te fait douter en ce moment.',
      en: '💙 What you\'re feeling is valid.\n\nSelf-doubt is human — but let me tell you something: the fact that you\'re searching, fighting, showing up... that\'s already strength.\n\nTell me what\'s making you doubt yourself right now.',
      es: '💙 Lo que sientes es válido.\n\nDudas de uno mismo son humanas — pero déjame decirte algo: el hecho de que busques, luches, estés aquí... eso ya es fortaleza.\n\nDime qué te hace dudar ahora mismo.'
    },
    positif: {
      fr: '🔥 Cette énergie — garde-la !\n\nOn va capitaliser là-dessus. Qu\'est-ce qu\'on attaque ?',
      en: '🔥 That energy — keep it!\n\nLet\'s build on it. What do we tackle first?',
      es: '🔥 ¡Esa energía — mantenla!\n\nVamos a aprovecharla. ¿Qué atacamos primero?'
    }
  };

  // ── BASE DE CONNAISSANCES EMPLOI 2025 ──
  var KB = {
    licenciement: [
      '⚖️ Licenciement économique ou personnel ?\n\nDans les deux cas tu as droit à un **entretien préalable obligatoire** avant toute décision. Tu l\'as eu ? 🎯',
      '📅 Délai légal pour contester : **12 mois** à partir de la notification.\n\nTu peux saisir le Conseil des Prud\'hommes — c\'est gratuit. Ton ancienneté c\'est combien d\'années ?',
      '💶 Droits immédiats :\n• Indemnité légale si +8 mois d\'ancienneté\n• Portabilité santé 30 jours\n• ARE (chômage) sous conditions\n\nTu t\'es inscrit à France Travail ?'
    ],
    rupture_conv: [
      '💼 Rupture conventionnelle = accord des deux parties pour se séparer. ✅\n\nTu es en train de la négocier ou elle est déjà signée ?',
      '💡 Points clés à retenir :\n• Indemnité minimum : **1/4 de mois par an** jusqu\'à 10 ans\n• Délai carence ARE : max 150 jours\n• Droit au chômage : garanti ✅\n\nTu as un accord sur le montant ?',
      '🎯 Règle d\'or : ne signe **jamais** en urgence.\n\nTu as **15 jours de rétractation** après la signature — utilise-les pour vérifier tous les montants.\n\nTu connais ton salaire de référence ?'
    ],
    chomage: [
      '💶 Pour l\'ARE, il faut avoir cotisé **6 mois minimum sur les 24 derniers mois**.\n\nTu t\'es inscrit à France Travail dans les 12 mois suivant la fin du contrat ?',
      '📊 Calcul ARE :\n• Taux : environ **57% du salaire brut journalier**\n• Minimum : 31,59€/jour\n• Maximum : 75% du salaire de référence\n\nTu veux qu\'on estime ton allocation ?',
      '📅 Durée d\'indemnisation = durée travaillée\n• Max **24 mois** si -53 ans\n• Max **30 mois** si 53-54 ans\n• Max **36 mois** si +55 ans\n\nTu travaillais depuis combien de mois ?'
    ],
    aides: [
      '💶 Les aides disponibles en 2025 :\n• **RSA** : 635€/mois (personne seule)\n• **Prime d\'activité** : jusqu\'à 300€/mois\n• **APL** : selon logement et revenus\n• **AAH** : 971€/mois si handicap\n\nTu es dans quelle situation ?',
      '🏛️ RSA 2025 : **635€ pour une personne seule**.\nDroit si +25 ans sans emploi, ou -25 ans avec enfant.\n\nTu as fait une simulation sur CAF.fr ?',
      '💡 La prime d\'activité est souvent oubliée !\nJusqu\'à **300€/mois** si tu travailles à temps partiel ou au SMIC.\n\nTon revenu mensuel c\'est environ combien ?'
    ],
    entretien: [
      '🎯 La méthode **STAR** — c\'est la base de tout entretien réussi :\n• **S**ituation : le contexte\n• **T**âche : ce que tu devais faire\n• **A**ction : ce que tu as fait concrètement\n• **R**ésultat : ce que ça a donné\n\nTu veux qu\'on prépare tes réponses ensemble ?',
      '💬 "Parlez-moi de vous" — tu as **90 secondes max**.\n\nStructure gagnante :\n1. Passé pertinent (30 sec)\n2. 2 forces clés (30 sec)\n3. Pourquoi CE poste (30 sec)\n\nTu veux qu\'on construise ton pitch ?',
      '⚡ Les 3 signaux qui éliminent immédiatement :\n❌ Pas préparé sur l\'entreprise\n❌ Critiquer son ex-employeur\n❌ Pas de questions à poser\n\nTu as recherché quoi sur cette entreprise ?'
    ],
    cv_lm: [
      '📄 CV efficace en 2025 :\n✅ 1 page maximum\n✅ Format PDF\n✅ Mots-clés de l\'offre intégrés\n✅ Résultats chiffrés (pas de vagues "responsabilités")\n\nTu vises quel poste exactement ?',
      '✍️ Lettre de motivation — 3 questions à répondre :\n1. Pourquoi **cette entreprise** ?\n2. Pourquoi **toi** ?\n3. Qu\'apportes-tu **concrètement** ?\n\nTu as déjà rédigé quelque chose ?',
      '🔥 Le secret n°1 du CV : il doit être **adapté à chaque offre**.\n\n15 minutes de personnalisation = 3× plus de réponses.\n\nTu veux qu\'on analyse ton CV ensemble ?'
    ],
    salaire: [
      '💰 Négocier le salaire c\'est **attendu et respecté**. Les recruteurs s\'y attendent.\n\nTu as regardé Glassdoor, LinkedIn Salary ou Indeed pour les fourchettes du marché ?',
      '🎯 La formule gagnante :\n"Selon le marché pour ce type de poste à [ville], je vise **X-Y€**. C\'est cohérent avec mon expérience de [N] ans."\n\nTu sais dans quel secteur et quelle ville ?',
      '⚡ Règle d\'or : le meilleur moment pour négocier c\'est **avant la signature** du contrat.\n\nAprès, c\'est 10× plus difficile.\n\nTu es en phase d\'offre ou encore en entretien ?'
    ],
    contrat: [
      '⚖️ CDD — les règles essentielles :\n• Renouvelable max **2 fois**\n• Durée totale max **18 mois**\n• Si l\'employeur continue sans te faire signer → **requalification en CDI** automatique\n\nTu es dans quelle situation ?',
      '📋 Période d\'essai légale :\n• Non-cadre : **2 mois**\n• Technicien/Agent de maîtrise : **3 mois**\n• Cadre : **4 mois**\n• Renouvelable 1 fois avec accord **explicite** des deux parties\n\nTu es en période d\'essai ?',
      '💡 La différence CDD/CDI/Intérim :\n• **CDI** : sécurité, indemnité de licenciement\n• **CDD** : prime de précarité 10% à la fin\n• **Intérim** : flexibilité, indemnités de fin de mission 10%\n\nTu vises quel type de contrat ?'
    ],
    soutien: [
      '💙 Je t\'entends. La recherche d\'emploi c\'est épuisant — c\'est normal de douter de soi.\n\nMais souvent ce n\'est pas une question de valeur. C\'est une question de méthode.\n\nDis-moi : c\'est quoi le truc qui te bloque le plus en ce moment ?',
      '💡 Une vérité importante : les périodes de recherche longue ne reflètent **pas** ta valeur professionnelle.\n\nElles reflètent souvent un problème de ciblage ou de présentation.\n\nTu envoies combien de candidatures par semaine ?',
      '🎯 On reprend depuis le début — sans jugement.\n\nTon dernier poste c\'était quoi ? Et tu cherches quelque chose de similaire ou tu veux changer ?'
    ],
    reconversion: [
      '🔄 Reconversion — c\'est un des actes professionnels les plus courageux.\n\nEt les reconvertis réussissent souvent **mieux** que les autres, car ils sont vraiment motivés.\n\nTu sais vers quoi tu veux aller ?',
      '💡 Le **bilan de compétences** est gratuit via ton CPF si tu as cotisé.\n• Durée : 24h sur 3 mois\n• Résultat : un plan d\'action personnalisé\n• Organisme : CEP (Conseil en Évolution Professionnelle) — gratuit aussi\n\nTu as regardé moncompteformation.gouv.fr ?',
      '🎯 Stratégie de reconversion en 3 étapes :\n1. Identifier tes **compétences transférables**\n2. Cibler les entreprises qui recrutent des profils "atypiques"\n3. Mettre en avant ta **motivation** dans ta lettre\n\nTon domaine actuel c\'est quoi ?'
    ],
    entrepreneuriat: [
      '🚀 Micro-entreprise — la voie la plus simple pour démarrer :\n• 0 frais de création\n• Cotisations proportionnelles au CA\n• Plafond : 77.700€ pour les services\n• Démarche : en ligne en 10 minutes sur autoentrepreneur.urssaf.fr\n\nTu penses à quel statut ?',
      '💶 L\'**ACRE** — à ne pas manquer :\n• 12 mois de cotisations sociales réduites\n• Accessible si tu crées en sortant du chômage ou en étant demandeur d\'emploi\n• Compatible avec l\'ARCE (aide chômage en capital)\n\nTu es demandeur d\'emploi en ce moment ?',
      '🎯 Avant de créer — valide ton idée avec **5 vraies conversations** avec des clients potentiels.\n\nPas besoin d\'un business plan de 50 pages. Une vraie conversation vaut 1000 hypothèses.\n\nTu as une idée de ce que tu veux proposer ?'
    ],
    conflit: [
      '⚖️ Conflit au travail — c\'est sérieux et ça s\'aggrave si on n\'agit pas.\n\nSi c\'est du **harcèlement moral** (Art. L1152-1 du Code du travail) tu peux :\n• Alerter les RH par écrit ✉️\n• Contacter l\'Inspection du Travail\n• Saisir le Conseil des Prud\'hommes\n\nTu as des preuves (emails, messages, témoins) ?',
      '📝 Conseil immédiat : **documente TOUT maintenant**.\n\nPour chaque incident :\n• Date et heure précises\n• Ce qui a été dit/fait exactement\n• Les témoins présents\n• L\'impact sur toi\n\nTu as commencé à consigner ?',
      '💬 C\'est avec ton manager direct, un collègue, ou la direction ?\n\nLa stratégie change selon qui est impliqué.\n\nDis-moi exactement ce qui s\'est passé.'
    ],
    handicap: [
      '💼 RQTH (Reconnaissance de Qualité de Travailleur Handicapé) :\n• Démarche via la **MDPH** de ton département\n• Avantages : aménagement du poste, aides Agefiph, quota employeurs\n• Durée : 1 à 10 ans, renouvelable\n\nTu as déjà une reconnaissance ou tu commences la démarche ?',
      '🎯 **Cap Emploi** t\'accompagne gratuitement si tu as une RQTH :\n• Accès à des offres d\'emploi réservées\n• Accompagnement personnalisé\n• Aide à la recherche et l\'intégration\n\nTu es suivi par Cap Emploi ?',
      '💡 L\'**Agefiph** peut financer :\n• Aménagements du poste de travail\n• Formations spécifiques\n• Aides au maintien dans l\'emploi\n• Prime à l\'insertion\n\nTu veux qu\'on regarde ce à quoi tu as droit ?'
    ],
    retraite: [
      '🏖️ Retraite 2025 — les points clés après la réforme :\n• Âge légal : **64 ans**\n• Retraite à taux plein : 172 trimestres (43 ans)\n• Départ anticipé possible : carrière longue, handicap, pénibilité\n\nTu as quel âge et combien de trimestres ?',
      '💡 Le **relevé de carrière** sur info-retraite.fr te donne tous tes trimestres validés.\n\nEssence conseil : consulte-le avant de décider quoi que ce soit.\n\nTu l\'as déjà consulté ?',
      '🎯 Si tu es proche de la retraite et encore en emploi :\n• Cumul emploi-retraite possible\n• Retraite progressive à partir de 60 ans\n• Surcote si tu travailles après l\'âge légal\n\nTu veux qu\'on calcule ton estimation ?'
    ],
    formation: [
      '💡 **CPF (Compte Personnel de Formation)** :\n• Vérifier ton solde : moncompteformation.gouv.fr\n• Alimenté à 500€/an (800€ pour non-qualifiés)\n• Utilisable pour certifications, permis, reconversion\n\nTu as regardé ton solde CPF ?',
      '🎓 **VAE (Validation des Acquis d\'Expérience)** :\n• Obtenir un diplôme grâce à ton expérience\n• Sans passer par une formation complète\n• Finançable CPF + aide employeur\n\nTu travailles dans ton domaine depuis combien d\'années ?',
      '🏛️ Formations gratuites ou aidées :\n• **CEP** : Conseil en Évolution Professionnelle (gratuit)\n• **France Travail** : formations si demandeur d\'emploi\n• **OPCO** : si tu es en poste, ton employeur peut financer\n\nTu es en poste ou en recherche ?'
    ],
    quiz: [
      '📊 Ces résultats te donnent une vraie photo de là où tu en es. 🎯\n\nParmi les axes à améliorer, lequel te parle le plus ? On attaque ça ensemble.',
      '💡 Le quiz c\'est un révélateur, pas une sentence.\n\nLes points faibles identifiés sont exactement ce sur quoi on va travailler.\n\nQu\'est-ce qui t\'a surpris dans tes résultats ?',
      '🔥 Tout ce que le quiz a identifié s\'améliore avec de la pratique et la bonne méthode.\n\nDis-moi sur quel point tu veux qu\'on commence.'
    ],
    fin: [
      '💙 Avec plaisir. Tu sais que tu peux revenir quand tu veux.\n\n⭐⭐⭐⭐⭐ Tu es sur la bonne voie. Continue sur cette lancée ! 💪',
      '🎯 Contente d\'avoir pu t\'aider.\n\nAvant de partir — est-ce qu\'il reste encore quelque chose qui bloque ?',
      '💪 Top. Tu as tout ce qu\'il te faut pour avancer.\n\n🎯 **Ton action prioritaire :** note les 2-3 choses qu\'on a définies et cale-les dans ton agenda cette semaine.'
    ],
    general: [
      '🎯 Je t\'écoute. Dis-m\'en plus sur ta situation — plus tu es précis(e), mieux je peux t\'aider.',
      '💡 Pour t\'aider efficacement, j\'ai besoin de mieux comprendre.\n\nTu es en emploi, en recherche, ou en transition en ce moment ?',
      '🔥 Intéressant. Creusons ça ensemble.\n\nQu\'est-ce qui t\'a amené à cette situation ?'
    ]
  };

  // ── PRÉFIXES DYNAMIQUES (Eva parle comme un humain) ──
  var PREFIXES = [
    '', '', '', // Souvent pas de préfixe = plus naturel
    'Ok. ', 'Écoute. ', 'Je vois. ', 'Hmm. ',
    'Voilà ce que je pense. ', 'Honnêtement, ', '... '
  ];

  // ── FONCTION PRINCIPALE ──
  function penser(msgs, prenom) {
    if (prenom) _mem.prenom = prenom;
    _mem.nb_echanges++;

    var dernierMsg = (msgs && msgs.length) ? (msgs[msgs.length-1].content || '') : '';
    var lang = detectLang(dernierMsg);
    var emotion = detectEmotion(dernierMsg);
    var theme = detectTheme(dernierMsg);

    // Mémoriser le thème
    if (theme !== 'general' && _mem.themes_abordes.indexOf(theme) === -1) {
      _mem.themes_abordes.push(theme);
    }

    // 1. Réaction émotionnelle en priorité (début de conversation)
    if (emotion !== 'neutre' && emotion !== 'positif' && _mem.nb_echanges < 4) {
      var emoResp = EMOTIONS[emotion];
      if (emoResp) {
        return emoResp[lang] || emoResp['fr'];
      }
    }

    // 2. Fin de conversation détectée
    if (theme === 'fin' && _mem.nb_echanges > 3) {
      var fins = KB.fin;
      return fins[Math.floor(Math.random() * fins.length)];
    }

    // 3. Réponse thématique progressive
    var reps = KB[theme] || KB.general;
    var idx = Math.min(Math.floor(_mem.nb_echanges / 3), reps.length - 1);
    var resp = reps[idx];

    // 4. Préfixe dynamique (naturel)
    var prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];

    // 5. Personnalisation prénom
    if (_mem.prenom && _mem.nb_echanges < 6 && Math.random() > 0.6) {
      resp = _mem.prenom + ', ' + resp.charAt(0).toLowerCase() + resp.slice(1);
      prefix = '';
    }

    return prefix + resp;
  }

  // ── RESET SESSION ──
  function reset() {
    _mem = { prenom: '', situation: '', emotion_detectee: '', themes_abordes: [], nb_echanges: 0, derniere_question: '', contexte: {} };
  }

  // API publique
  return {
    penser: penser,
    reset: reset,
    version: '4.0'
  };

})();
