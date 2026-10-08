
// ══════════════════════════════════════════
//  EVA DROITS — Données & Navigation
// ══════════════════════════════════════════

var _evadCurrentProfile = null;

var EVAD_PROFILES = {
  salarie: {
    title: '💼 Salarié & Demandeur d\'emploi',
    tag: '💼 Profil Salarié · Eva CareerPulse',
    tagColor: '#93c5fd',
    heroGrad: 'linear-gradient(135deg,#1e3a5f,#1e40af)', accentDark:'#1e3a5f', accentMid:'#1e40af', accentLight:'#dbeafe', accentText:'#1e3a5f',
    desc: 'Encyclopédie de vos droits en tant que salarié ou demandeur d\'emploi. Articles sourcés, données 2026.',
  },
  freelance: {
    title: '🚀 Freelance & Indépendant',
    tag: '🚀 Profil Freelance · Eva CareerPulse',
    tagColor: '#fde68a',
    heroGrad: 'linear-gradient(135deg,#78350f,#b45309)', accentDark:'#78350f', accentMid:'#b45309', accentLight:'#fef3c7', accentText:'#92400e',
    desc: 'Tout ce que vous devez savoir sur vos droits et obligations en tant que travailleur indépendant.',
  },
  reconversion: {
    title: '🔄 Reconversion professionnelle',
    tag: '🔄 Profil Reconversion · Eva CareerPulse',
    tagColor: '#ddd6fe',
    heroGrad: 'linear-gradient(135deg,#4c1d95,#7c3aed)', accentDark:'#4c1d95', accentMid:'#7c3aed', accentLight:'#f5f3ff', accentText:'#6d28d9',
    desc: 'Guide complet pour financer, sécuriser et réussir votre reconversion professionnelle.',
  },
  etudiant: {
    title: '🎓 Étudiant',
    tag: '🎓 Profil Étudiant · Eva CareerPulse',
    tagColor: '#6ee7b7',
    heroGrad: 'linear-gradient(135deg,#064e3b,#059669)', accentDark:'#064e3b', accentMid:'#059669', accentLight:'#dcfce7', accentText:'#047857',
    desc: 'Toutes les aides et droits étudiants expliqués clairement — bourses, APL, alternance, premier emploi.',
  }
};

// ── Données articles ──
var EVAD_ARTICLES = {

  salarie: [
    {
      id:'are', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>', title:'ARE — Allocation de Retour à l\'Emploi',
      sub:'Conditions · Calcul · Durée · Démarches',
      content: function(){return `
        <div class="art-lead">L'ARE est versée par France Travail aux salariés involontairement privés d'emploi. Les règles ont changé en 2025 et 2026 : comprendre son calcul évite des erreurs qui coûtent des centaines d'euros.</div>
        <div class="art-h2">📌 Conditions d'éligibilité</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Condition</th><th>Exigence 2026</th></tr></thead><tbody>
          <tr><td>Durée travaillée</td><td><strong>130 jours ou 910 heures</strong> sur les 24 derniers mois (36 mois à partir de 55 ans)</td></tr>
          <tr><td>Première ouverture de droits</td><td><strong>108 jours ou 758 heures</strong> suffisent depuis le 1er avril 2026 si vous n'avez jamais été indemnisé(e) au cours des 20 dernières années</td></tr>
          <tr><td>Âge</td><td>Moins de 65 ans</td></tr>
          <tr><td>Inscription France Travail</td><td>Dans les <strong>12 mois</strong> suivant la rupture</td></tr>
          <tr><td>Résidence</td><td>France métropolitaine ou DOM-TOM</td></tr>
          <tr><td>Motif de rupture</td><td>Licenciement, rupture conventionnelle, fin de CDD, démission légitime</td></tr>
        </tbody></table></div>
        <div class="art-h2">💶 Calcul du montant 2026</div>
        <div class="art-p">Le montant journalier = <strong>partie fixe + partie variable</strong>. Le résultat retenu est toujours le plus favorable entre la somme (fixe + variable) et 57 % du SJR.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Élément</th><th>Valeur 2026</th></tr></thead><tbody>
          <tr><td>Partie fixe</td><td><strong>13,18 €/jour</strong></td></tr>
          <tr><td>Partie variable</td><td><strong>40,4 %</strong> du SJR</td></tr>
          <tr><td>Minimum garanti</td><td><strong>32,13 €/jour</strong></td></tr>
          <tr><td>Maximum</td><td><strong>75 %</strong> du SJR brut</td></tr>
          <tr><td>Durée max (moins de 55 ans)</td><td><strong>18 mois</strong></td></tr>
          <tr><td>Durée max (55-56 ans)</td><td><strong>22,5 mois</strong></td></tr>
          <tr><td>Durée max (57 ans et +)</td><td><strong>27 mois</strong></td></tr>
          <tr><td>Après une rupture conventionnelle (depuis le 1er sept. 2026)</td><td><strong>15 mois</strong> avant 55 ans, <strong>20,5 mois</strong> ensuite</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Exemple concret</div><div class="art-hl-p">Salaire 2 500 €/mois → SJR = (2 500 × 12) ÷ 365 = <strong>82,19 €</strong><br>ARE = 13,18 + (40,4% × 82,19) = <strong>46,38 €/jour</strong> ≈ <strong>1 391 €/mois</strong> (mois de 30 jours)</div></div>
        <div class="art-h2">📋 Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">S'inscrire sur France Travail</div><div class="art-step-d">Sur francetravail.fr ou en agence — <strong>dans les 12 mois</strong> suivant la rupture.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Renseigner son dossier</div><div class="art-step-d">Contrat, bulletins de salaire, motif de rupture. France Travail calcule votre SJR.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Attendre le délai de carence</div><div class="art-step-d"><strong>7 jours</strong> + différés selon les congés payés et les indemnités perçues (différé spécifique : 150 jours maximum, 75 en licenciement économique).</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Actualiser chaque mois</div><div class="art-step-d">Avant le <strong>15 du mois</strong> sur francetravail.fr. Tout revenu doit être déclaré.</div></div></li>
          <li class="art-step"><div class="art-step-n">5</div><div><div class="art-step-t">Recevoir le virement</div><div class="art-step-d">Entre le <strong>25 et le 28</strong> du mois.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text"><strong>Ne tardez pas à vous inscrire.</strong> Chaque jour de retard réduit votre durée d'indemnisation. Le délai de 12 mois est une limite absolue sans exception.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.francetravail.fr/candidat/vos-droits-aux-aides-et-allocations/acceder-a-vos-droits-a-allocations/quelle-allocation-percevrez-vous.html','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">France Travail — Calcul de l'allocation</div><div class="art-src-url">francetravail.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F14860','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public.fr — ARE</div><div class="art-src-url">service-public.fr/particuliers/vosdroits/F14860</div></div></div>
        </div>`;}
    },
    {
      id:'conges', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>', title:'Congés payés — Calcul & droits',
      sub:'Acquisition · Méthodes de calcul · Nouveautés 2024',
      content: function(){return `
        <div class="art-lead">Depuis une décision historique de la Cour de cassation d'<strong>octobre 2023</strong>, les règles sur les congés payés ont changé. Les arrêts maladie ouvrent désormais droit à des congés — une révolution pour des millions de salariés.</div>
        <div class="art-h2">📐 Règle d'acquisition</div>
        <div class="art-p">Chaque salarié acquiert <strong>2,5 jours ouvrables</strong> par mois de travail effectif, soit <strong>30 jours ouvrables</strong> (5 semaines) par an pour un temps plein.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Méthode de calcul</th><th>Formule</th></tr></thead><tbody>
          <tr><td>Règle du 1/10e</td><td>1/10 de la rémunération brute totale de la période de référence</td></tr>
          <tr><td>Règle du maintien</td><td>Salaire qu'on aurait perçu si on avait travaillé</td></tr>
          <tr><td>Règle retenue</td><td>Toujours <strong>la plus favorable</strong> pour le salarié</td></tr>
          <tr><td>Période de référence</td><td>1er juin N-1 au 31 mai N (sauf accord d'entreprise)</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⚡ Nouveauté 2024 — Congés et maladie</div><div class="art-hl-p">Depuis le <strong>24 avril 2024</strong>, vous acquérez <strong>2 jours ouvrables par mois d'arrêt maladie</strong>. Ces congés doivent être posés dans les <strong>15 mois</strong> suivant la reprise. L'employeur a l'obligation de vous informer à votre retour.</div></div>
        <div class="art-h2">✅ Comment faire valoir ses droits à congés</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier son compteur sur l'espace RH</div><div class="art-step-d">Comparez le solde affiché avec le calcul 2,5j × mois travaillés. Tout écart doit être signalé par écrit à votre RH.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Réclamer les congés maladie après retour</div><div class="art-step-d">À votre retour d'arrêt maladie, demandez par email à la RH le détail des <strong>2 jours/mois</strong> acquis pendant l'arrêt — l'employeur doit vous en informer.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Vérifier le solde dans le solde de tout compte</div><div class="art-step-d">À la rupture, vérifiez les congés payés restants avec les <strong>deux méthodes</strong> (1/10e et maintien) — prenez la plus favorable.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Contester dans les 6 mois si erreur</div><div class="art-step-d">Après signature du solde de tout compte, vous avez <strong>6 mois</strong> pour contester par lettre recommandée les sommes mentionnées.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Vérifiez <strong>toujours</strong> les congés dans votre solde de tout compte — c'est l'une des erreurs les plus fréquentes des RH. Vous avez <strong>6 mois</strong> pour contester après signature.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F2258','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Congés payés</div><div class="art-src-url">service-public.fr/particuliers/vosdroits/F2258</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.legifrance.gouv.fr','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Légifrance — Code du Travail Art. L3141</div><div class="art-src-url">legifrance.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'licenciement', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>', title:'Licenciement — Droits & recours',
      sub:'Indemnités · Préavis · Prud\'hommes · Délais',
      content: function(){return `
        <div class="art-lead">Un licenciement suit une procédure stricte encadrée par le Code du travail. <strong>Toute irrégularité peut donner lieu à des dommages-intérêts.</strong> Connaître la procédure, c'est savoir quand vous avez été lésé.</div>
        <div class="art-h2">💶 Indemnités légales</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Ancienneté</th><th>Indemnité minimale</th></tr></thead><tbody>
          <tr><td>Moins de 10 ans</td><td><strong>1/4 de mois</strong> de salaire par année</td></tr>
          <tr><td>Plus de 10 ans</td><td><strong>1/3 de mois</strong> par année (au-delà de 10 ans)</td></tr>
          <tr><td>Minimum requis</td><td><strong>8 mois</strong> d'ancienneté</td></tr>
          <tr><td>Faute grave ou lourde</td><td>❌ Pas d'indemnité</td></tr>
        </tbody></table></div>
        <div class="art-h2">⏱️ Préavis légal</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Ancienneté</th><th>Durée préavis</th></tr></thead><tbody>
          <tr><td>6 mois à 2 ans</td><td><strong>1 mois</strong></td></tr>
          <tr><td>Plus de 2 ans</td><td><strong>2 mois</strong></td></tr>
          <tr><td>Cadres (convention)</td><td>Souvent <strong>3 mois</strong></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-red"><div class="art-hl-h">⏱️ Délais de contestation</div><div class="art-hl-p">• <strong>12 mois</strong> pour saisir le Conseil de Prud'hommes<br>• <strong>3 ans</strong> pour des rappels de salaire<br>• <strong>5 ans</strong> pour harcèlement moral ou discrimination</div></div>
        <div class="art-h2">📋 Que faire dès réception de la lettre de licenciement</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier la procédure</div><div class="art-step-d">Convocation à entretien préalable reçue ? Délai de réflexion respecté ? Lettre en recommandé ? Toute irrégularité de forme est un levier juridique.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Calculer ses indemnités</div><div class="art-step-d">Utilisez le <strong>simulateur code.travail.gouv.fr</strong>. Comparez avec la somme proposée — les erreurs de calcul sont fréquentes, surtout pour les cadres.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Consulter un syndicat ou un avocat</div><div class="art-step-d">Avant de signer quoi que ce soit. Un syndicat vous conseille gratuitement. Un avocat spécialisé peut être consulté pour une première analyse souvent sous 100–200 €.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Saisir le Prud'hommes si contestation</div><div class="art-step-d">Gratuit, sans avocat obligatoire. À faire dans les <strong>12 mois</strong> suivant la notification. Le barème Macron plafonne les indemnités selon l'ancienneté.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">La saisine du Prud'hommes est <strong>gratuite</strong>. En cas de licenciement abusif, le barème peut vous accorder jusqu'à <strong>20 mois de salaire</strong>. Ne renoncez pas sans avoir consulté un syndicat ou un avocat spécialisé.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F433','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Licenciement</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://code.travail.gouv.fr/outils/indemnite-licenciement','_blank')"><div class="art-src-ico">🧮</div><div class="art-src-info"><div class="art-src-name">Simulateur indemnité de licenciement</div><div class="art-src-url">code.travail.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'mutuelle', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>', title:'Mutuelle & portabilité',
      sub:'Maintien gratuit · Durée · Conditions · Démarches',
      content: function(){return `
        <div class="art-lead">Quitter son entreprise ne signifie pas perdre sa mutuelle immédiatement. La <strong>portabilité</strong> vous permet de conserver la même couverture — <strong>gratuitement</strong> — pendant votre chômage. Mais il faut le demander.</div>
        <div class="art-h2">📋 Règles de portabilité 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Règle</th><th>Détail</th></tr></thead><tbody>
          <tr><td>Durée</td><td>Égale à la durée ARE — <strong>maximum 12 mois</strong></td></tr>
          <tr><td>Coût</td><td><strong>Gratuit</strong> — mutualisé entre employeur et actifs</td></tr>
          <tr><td>Condition</td><td>Percevoir l'ARE (être indemnisé France Travail)</td></tr>
          <tr><td>Garanties</td><td><strong>Identiques</strong> à celles en tant que salarié actif</td></tr>
          <tr><td>Fin automatique</td><td>Reprise d'emploi, fin ARE ou 12 mois</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Comment activer la portabilité</div><div class="art-hl-p">1. Mentionnez-la dans votre demande de <strong>solde de tout compte</strong><br>2. Obtenez un certificat de travail mentionnant vos droits<br>3. Transmettez votre attestation d'inscription France Travail à l'assureur</div></div>
        <div class="art-h2">📋 Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Exiger la mention dans le solde de tout compte</div><div class="art-step-d">La portabilité doit être mentionnée <strong>explicitement</strong> dans votre solde de tout compte. Si elle est absente, réclamez-la par écrit avant de signer.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Récupérer votre certificat de travail</div><div class="art-step-d">Il doit mentionner vos droits à portabilité et les coordonnées de l'assureur de la mutuelle d'entreprise.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">S'inscrire à France Travail</div><div class="art-step-d">La portabilité est conditionnée au fait d'être <strong>indemnisé par l'ARE</strong>. L'inscription France Travail déclenche automatiquement vos droits.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Transmettre l'attestation à l'assureur</div><div class="art-step-d">Envoyez votre attestation d'inscription France Travail à l'assureur de la mutuelle. La couverture démarre sans délai de carence ni coût supplémentaire.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Cette portabilité est méconnue de <strong>60 % des salariés</strong>. Exigez qu'elle soit mentionnée dans votre solde de tout compte — si l'employeur omet de vous en informer, il engage sa responsabilité.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F31972','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Portabilité mutuelle</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F15504','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Service-Public — Mutuelle d'entreprise obligatoire</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'rupture', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m23 21-3-3m0 0a5 5 0 1 0-7.07-7.07L16 14l3 3z"/></svg>', title:'Rupture conventionnelle — Guide complet',
      sub:'Indemnités · Procédure · Négociation · ARE',
      content: function(){return `
        <div class="art-lead">La rupture conventionnelle est la séparation à l'amiable entre vous et votre employeur. Elle ouvre droit à l'ARE — mais <strong>vous avez plus à perdre que votre employeur</strong> si vous ne négociez pas correctement.</div>
        <div class="art-h2">💶 Indemnités légales 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Ancienneté</th><th>Indemnité minimale</th></tr></thead><tbody>
          <tr><td>Jusqu'à 10 ans</td><td><strong>1/4 de mois</strong> par année d'ancienneté</td></tr>
          <tr><td>Au-delà de 10 ans</td><td><strong>1/3 de mois</strong> par année supplémentaire</td></tr>
          <tr><td>Base de calcul</td><td>Meilleure des moyennes : <strong>12 ou 3 derniers mois</strong></td></tr>
          <tr><td>Délai rétractation</td><td><strong>15 jours calendaires</strong> après signature</td></tr>
          <tr><td>Homologation DREETS</td><td><strong>15 jours ouvrables</strong> après délai de rétractation</td></tr>
          <tr><td>Délai carence ARE</td><td>Maximum <strong>75 jours</strong></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⚡ Ce que vous pouvez négocier au-delà du minimum</div><div class="art-hl-p">✅ Indemnité supérieure au minimum légal<br>✅ Date de départ (plus tard = plus de droits ARE)<br>✅ RTT et congés payés restants<br>✅ Clause de non-concurrence rémunérée<br>✅ Maintien de la mutuelle pendant la portabilité</div></div>
        <div class="art-h2">📋 Procédure pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Demander un entretien à l'employeur</div><div class="art-step-d">La rupture se fait d'un commun accord. Prenez le temps de préparer votre négociation — montant, date, avantages annexes — <strong>avant</strong> le premier entretien.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Calculer l'indemnité minimale</div><div class="art-step-d">Sur <strong>code.travail.gouv.fr</strong>. C'est le plancher légal — vous pouvez négocier davantage. La base de calcul : meilleure des moyennes 12 ou 3 derniers mois.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Signer le formulaire CERFA et exercer son droit de rétractation</div><div class="art-step-d">Vous disposez de <strong>15 jours calendaires</strong> après signature pour vous rétracter sans justification. Ne le faites pas sous pression.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Attendre l'homologation DREETS</div><div class="art-step-d">La DREETS dispose de <strong>15 jours ouvrables</strong> pour valider ou rejeter. Sans réponse = homologation tacite. Vous pouvez ensuite vous inscrire à France Travail.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Ne signez <strong>jamais sous pression</strong>. Vous avez 15 jours pour vous rétracter sans justification. L'employeur a souvent plus intérêt à éviter un Prud'hommes qu'à payer seulement le minimum légal.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F19030','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Rupture conventionnelle</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://code.travail.gouv.fr/outils/indemnite-licenciement','_blank')"><div class="art-src-ico">🧮</div><div class="art-src-info"><div class="art-src-name">Simulateur indemnité — Code du Travail</div><div class="art-src-url">code.travail.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'salaire', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', title:'Salaire minimum — SMIC 2026',
      sub:'Montants · Grilles · Heures supplémentaires',
      content: function(){return `
        <div class="art-lead">Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est revalorisé chaque année au 1er janvier. En 2026, il a été augmenté de <strong>2,2 %</strong>. Connaître son montant exact vous permet de vérifier que vous êtes correctement rémunéré.</div>
        <div class="art-h2">💶 SMIC 2026 — Montants officiels</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Référence</th><th>Montant brut 2026</th></tr></thead><tbody>
          <tr><td>SMIC horaire brut</td><td><strong>11,88 €/heure</strong></td></tr>
          <tr><td>SMIC mensuel brut (35h)</td><td><strong>1 801,80 €</strong></td></tr>
          <tr><td>SMIC mensuel net estimé</td><td><strong>~1 430 €</strong></td></tr>
          <tr><td>SMIC annuel brut</td><td><strong>21 621,60 €</strong></td></tr>
        </tbody></table></div>
        <div class="art-h2">⏰ Heures supplémentaires</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Heures</th><th>Majoration</th></tr></thead><tbody>
          <tr><td>De la 36e à la 43e heure</td><td><strong>+25 %</strong></td></tr>
          <tr><td>À partir de la 44e heure</td><td><strong>+50 %</strong></td></tr>
          <tr><td>Contingent annuel</td><td>220 heures (sauf accord de branche)</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Exemple concret — Vérification bulletin</div><div class="art-hl-p">Salarié à 2 000 € brut/mois (35h). S'il fait <strong>5h sup/semaine</strong> en plus :<br>5h × 4,33 × 2 000/151,67 × 1,25 = <strong>+ 357 €/mois</strong> à revendiquer.<br>Ne pas les déclarer est un manque à gagner de plus de <strong>4 000 €/an</strong>.</div></div>
        <div class="art-h2">✅ Comment vérifier son bulletin de salaire</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier le taux horaire</div><div class="art-step-d">Salaire brut ÷ 151,67h = taux horaire. Il doit être ≥ <strong>11,88 €/h</strong> (SMIC 2026).</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Contrôler les heures supplémentaires</div><div class="art-step-d">Chaque heure au-delà de 35h/semaine doit être majorée de <strong>25 % ou 50 %</strong> selon le volume.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Consulter votre convention collective</div><div class="art-step-d">Votre convention peut prévoir un salaire <strong>supérieur au SMIC</strong>. Vérifiez sur <strong>legifrance.gouv.fr</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Réclamer par écrit si erreur</div><div class="art-step-d">Un email suffit. Vous avez <strong>3 ans</strong> pour réclamer un rappel de salaire (prescription triennale).</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Vérifiez chaque mois votre bulletin de salaire. Les erreurs sur les heures supplémentaires sont fréquentes — et souvent non intentionnelles. Vous avez <strong>3 ans</strong> pour réclamer un rappel de salaire.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F2300','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — SMIC</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://code.travail.gouv.fr','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Code du Travail numérique — Simulateur</div><div class="art-src-url">code.travail.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'solde', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>', title:'Solde de tout compte — Ce qu\'il doit contenir',
      sub:'Documents obligatoires · Vérification · Contestation',
      content: function(){return `
        <div class="art-lead">Le solde de tout compte est le document financier remis à la rupture du contrat. C'est votre <strong>dernier contrôle qualité</strong> avant de partir. Un solde mal calculé peut vous coûter plusieurs milliers d'euros si vous ne le vérifiez pas.</div>
        <div class="art-h2">📋 Documents obligatoires à la rupture</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Document</th><th>Utilité</th></tr></thead><tbody>
          <tr><td>Reçu pour solde de tout compte</td><td>Récapitulatif de toutes les sommes versées</td></tr>
          <tr><td>Attestation France Travail</td><td>Pour ouvrir vos droits ARE</td></tr>
          <tr><td>Certificat de travail</td><td>Mentionne dates et nature du poste</td></tr>
          <tr><td>Dernier bulletin de salaire</td><td>Vérification congés payés restants</td></tr>
          <tr><td>Portabilité mutuelle</td><td>Doit être mentionnée explicitement</td></tr>
        </tbody></table></div>
        <div class="art-h2">✅ Ce que vous devez vérifier</div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🔍 Checklist de vérification</div><div class="art-hl-p">✅ Congés payés restants (calcul 1/10e vs maintien)<br>✅ RTT non pris (si applicable)<br>✅ Heures supplémentaires non payées<br>✅ Prime de précarité CDD (10 % si applicable)<br>✅ Indemnité de rupture (calcul correct)<br>✅ Préavis effectué ou payé</div></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⏱️ Délai de contestation</div><div class="art-hl-p">Vous avez <strong>6 mois</strong> pour contester un solde de tout compte après signature. Au-delà, il devient libératoire pour les sommes mentionnées.</div></div>
        <div class="art-h2">📋 Démarches avant de signer</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Demander 48h avant de signer</div><div class="art-step-d">Vous avez le droit de ne pas signer sur-le-champ. Demandez le document par email, relisez-le calmement à la maison.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Recalculer les congés payés</div><div class="art-step-d">Appliquez les deux méthodes (1/10e et maintien) — prenez la plus favorable. Comparez avec le solde affiché. C'est le poste le plus souvent mal calculé.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Vérifier tous les documents remis</div><div class="art-step-d">5 documents obligatoires : reçu solde, attestation France Travail, certificat de travail, dernier bulletin, portabilité mutuelle. Tout doit être présent.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Contester par LRAR si erreur détectée après</div><div class="art-step-d">Lettre recommandée avec accusé de réception dans les <strong>6 mois</strong>. Citez les montants contestés et les calculs justificatifs.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text"><strong>Ne signez jamais sans vérifier.</strong> Demandez 48h pour relire. Comparez le calcul des congés payés avec les deux méthodes légales — l'erreur la plus courante concerne précisément ce poste.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F86','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Solde de tout compte</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://code.travail.gouv.fr','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Code du Travail numérique — Vos droits</div><div class="art-src-url">code.travail.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'teletravail', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', title:'Télétravail — Droits & obligations',
      sub:'Accord · Indemnisation · Équipement · Accident du travail',
      content: function(){return `
        <div class="art-lead">Le télétravail est devenu un droit encadré depuis les ordonnances Macron de 2017. En 2026, plus de <strong>35 % des salariés</strong> pratiquent le télétravail régulier. Vos droits y sont complets — mais différents de ceux du bureau.</div>
        <div class="art-h2">📋 Cadre légal 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Point</th><th>Règle</th></tr></thead><tbody>
          <tr><td>Mise en place</td><td>Accord collectif ou charte unilatérale de l'employeur</td></tr>
          <tr><td>Refus de l'employeur</td><td>Possible — mais doit être <strong>motivé par écrit</strong></td></tr>
          <tr><td>Indemnisation frais</td><td>Oui — au minimum <strong>2,50 €/jour</strong> exonéré de charges (limite : 55,80 €/mois)</td></tr>
          <tr><td>Équipement</td><td>Fourni par l'employeur ou remboursé (forfait)</td></tr>
          <tr><td>Accident du travail</td><td>Couvert pendant les horaires de travail convenus</td></tr>
          <tr><td>Droit à la déconnexion</td><td>Obligatoirement encadré dans l'accord ou la charte</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⚡ Ce que vous pouvez exiger</div><div class="art-hl-p">✅ <strong>Remboursement des frais</strong> internet, électricité (min. 2,50 €/jour)<br>✅ <strong>Équipement fourni</strong> ou remboursé si vous utilisez le vôtre<br>✅ <strong>Couverture accident</strong> identique au bureau pendant vos horaires<br>✅ <strong>Refus motivé par écrit</strong> si l'employeur s'oppose — sinon contestable</div></div>
        <div class="art-h2">✅ Démarches pour faire valoir vos droits</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier l'accord ou la charte</div><div class="art-step-d">Demandez à votre RH l'accord collectif ou la charte de télétravail. Elle définit vos droits précis.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Réclamer l'indemnisation des frais</div><div class="art-step-d">Minimum <strong>2,50 €/jour télétravaillé</strong>. Calculez votre manque à gagner sur 12 mois et envoyez un courrier RH.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Déclarer tout accident sur le lieu de travail</div><div class="art-step-d">Un accident à domicile pendant vos horaires est un <strong>accident du travail</strong>. Déclarez-le dans les <strong>24h</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Vérifier votre convention collective</div><div class="art-step-d">Sur <strong>legifrance.gouv.fr</strong> — votre branche peut prévoir des indemnisations bien supérieures au minimum légal.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">L'indemnisation de 2,50 €/jour n'est qu'un minimum. De nombreuses conventions collectives prévoient des montants plus élevés. Vérifiez votre convention collective sur <strong>legifrance.gouv.fr</strong>.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F13851','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Télétravail</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.urssaf.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">URSSAF — Remboursement frais télétravail</div><div class="art-src-url">urssaf.fr</div></div></div>
        </div>`;}
    }
  ],

  freelance: [
    {
      id:'ati', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>', title:'ATI — Allocation Travailleurs Indépendants',
      sub:'Conditions strictes · Montant · Durée · Démarches',
      content: function(){return `
        <div class="art-lead">L'ATI (Allocation des Travailleurs Indépendants) a été créée en 2019 pour pallier l'absence de chômage chez les indépendants. Elle reste <strong>très restrictive</strong> — mais elle existe, et beaucoup d'indépendants l'ignorent.</div>
        <div class="art-h2">📋 Conditions d'éligibilité</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Condition</th><th>Exigence 2026</th></tr></thead><tbody>
          <tr><td>Motif de cessation</td><td>Liquidation judiciaire ou redressement judiciaire uniquement</td></tr>
          <tr><td>Durée d'activité</td><td><strong>Minimum 2 ans</strong> d'activité non salariée</td></tr>
          <tr><td>Revenu antérieur</td><td><strong>Minimum 10 000 €/an</strong> sur les 2 dernières années</td></tr>
          <tr><td>Ressources personnelles</td><td>Inférieures au RSA (635,71 €/mois)</td></tr>
          <tr><td>Inscription France Travail</td><td>Obligatoire</td></tr>
        </tbody></table></div>
        <div class="art-h2">💶 Montant et durée</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Élément</th><th>Valeur 2026</th></tr></thead><tbody>
          <tr><td>Montant mensuel</td><td><strong>800 €/mois</strong> (montant forfaitaire)</td></tr>
          <tr><td>Durée</td><td><strong>6 mois maximum</strong> — non renouvelable</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-red"><div class="art-hl-h">⚠️ Limites à connaître absolument</div><div class="art-hl-p">❌ <strong>Démission et fermeture volontaire excluent l'ATI</strong> — seule la liquidation judiciaire ouvre le droit<br>❌ 800 €/mois pour <strong>6 mois maximum</strong> — insuffisant pour couvrir des charges fixes<br>❌ Vos ressources doivent être inférieures au RSA (635,71 €/mois) — conditions très strictes</div></div>
        <div class="art-h2">📋 Démarches pour demander l'ATI</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Obtenir le jugement de liquidation</div><div class="art-step-d">Le tribunal de commerce prononce la liquidation judiciaire. Ce document est <strong>obligatoire</strong> pour constituer le dossier.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">S'inscrire à France Travail</div><div class="art-step-d">Dans les <strong>12 mois</strong> suivant la liquidation. L'inscription est une condition sine qua non d'ouverture des droits.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Constituer le dossier ATI</div><div class="art-step-d">Fournir : justificatif de liquidation, relevés de revenus sur 2 ans (min. 10 000 €/an), avis d'imposition.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Actualiser chaque mois</div><div class="art-step-d">Comme l'ARE, l'ATI exige une <strong>actualisation mensuelle</strong> avant le 15 du mois sur francetravail.fr.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">L'ATI est insuffisante pour vivre — c'est un filet minimal. La vraie protection passe par une <strong>épargne de précaution (3–6 mois de charges)</strong> et une prévoyance privée. Ne comptez pas sur l'ATI comme plan principal.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/professionnels-entreprises/vosdroits/F35464','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — ATI</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.francetravail.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">France Travail — Dossier ATI</div><div class="art-src-url">francetravail.fr</div></div></div>
        </div>`;}
    },
    {
      id:'cipav', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V10l8-7 8 7v10"/><path d="M10 20v-5h4v5"/><path d="M9 10h6"/></svg>', title:'CIPAV — Retraite des professions libérales',
      sub:'Affiliation · Points retraite · Cotisations · Rachat',
      content: function(){return `
        <div class="art-lead">La CIPAV est la caisse de retraite complémentaire des professions libérales. Elle gère les points retraite de <strong>plus de 650 000 professionnels</strong> — architectes, consultants, coachs, informaticiens et de nombreux autres.</div>
        <div class="art-h2">📋 Qui est affilié à la CIPAV ?</div>
        <div class="art-p">Depuis 2018, les professions libérales non réglementées (consultants, formateurs, coachs…) cotisent à la <strong>SSI (Sécurité Sociale des Indépendants)</strong> et non à la CIPAV. Seules les professions libérales <strong>réglementées</strong> restent à la CIPAV (architectes, géomètres, ostéopathes…).</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Cotisation CIPAV 2026</th><th>Taux</th></tr></thead><tbody>
          <tr><td>Retraite de base</td><td>Calculée sur le revenu professionnel</td></tr>
          <tr><td>Retraite complémentaire</td><td>Système par points — classe selon revenus</td></tr>
          <tr><td>Invalidité-décès</td><td>Inclus dans les cotisations</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⚡ Depuis 2018 — Qui cotise où ?</div><div class="art-hl-p">Depuis le 1er janvier 2018, les professions libérales <strong>non réglementées</strong> (consultants, formateurs, coachs, graphistes…) cotisent à la <strong>SSI</strong>, pas à la CIPAV.<br>Seules les professions <strong>réglementées</strong> restent CIPAV : architectes, géomètres, médecins, ostéopathes…<br>✅ En cas de doute, vérifiez impérativement sur <strong>cipav.fr</strong>.</div></div>
        <div class="art-h2">✅ Démarches pratiques CIPAV</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier son affiliation</div><div class="art-step-d">Connectez-vous à <strong>cipav.fr → Mon espace</strong>. Votre numéro d'affilié et votre classe de cotisation y sont visibles.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Déclarer ses revenus annuellement</div><div class="art-step-d">La déclaration se fait via <strong>net-entreprises.fr</strong> ou directement dans votre espace CIPAV chaque année.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Consulter son relevé de points</div><div class="art-step-d">Sur cipav.fr → Retraite → Relevé de carrière. Chaque année compte — vérifiez les cohérences.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Signaler toute anomalie rapidement</div><div class="art-step-d">Une erreur d'affiliation peut impacter des années de droits. Contactez la CIPAV par courrier recommandé avec justificatifs.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Vérifiez votre affiliation sur <strong>cipav.fr</strong> — des erreurs d'affiliation sont fréquentes lors des changements de statut. Une mauvaise affiliation peut se corriger, mais mieux vaut le faire tôt.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.cipav.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">CIPAV.fr — Votre espace personnel</div><div class="art-src-url">cipav.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/professionnels-entreprises/vosdroits/F23512','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Retraite professions libérales</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'cumul-are', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>', title:'Cumul ARE + activité freelance',
      sub:'Règles · Calcul ARE réduite · Déclaration mensuelle',
      content: function(){return `
        <div class="art-lead">Si vous créez votre activité en tant qu'ex-salarié indemnisé par l'ARE, vous pouvez <strong>cumuler les deux</strong>. C'est l'une des aides les plus sous-utilisées pour financer le lancement d'une activité indépendante.</div>
        <div class="art-h2">📐 Règles de cumul 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Règle</th><th>Détail</th></tr></thead><tbody>
          <tr><td>Cumul possible ?</td><td>✅ Oui — ARE réduite selon les revenus</td></tr>
          <tr><td>Formule de calcul</td><td>Jours non indemnisés = Revenus ÷ (SJR × 0,7)</td></tr>
          <tr><td>Plafond total</td><td>ARE + revenus ≤ <strong>ancien salaire brut</strong></td></tr>
          <tr><td>Durée</td><td>Jusqu'à épuisement des droits ARE</td></tr>
          <tr><td>Déclaration</td><td>Revenus à déclarer <strong>chaque mois</strong> lors de l'actualisation</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Exemple concret</div><div class="art-hl-p">SJR = 80 €. Vous facturez <strong>1 500 €</strong> ce mois-ci.<br>Jours non indemnisés = 1 500 ÷ (80 × 0,7) = <strong>26,8 jours</strong><br>→ Vous percevez <strong>3 jours d'ARE</strong> ce mois, mais vos droits restants sont préservés.</div></div>
        <div class="art-h2">📋 Démarches pour bien gérer le cumul</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Déclarer son activité à France Travail</div><div class="art-step-d">Dès la création ou le démarrage de l'activité freelance, informez France Travail. Aucune démarche préalable d'autorisation — la déclaration suffit.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Déclarer ses revenus chaque mois</div><div class="art-step-d">Lors de l'actualisation mensuelle sur <strong>francetravail.fr avant le 15</strong>, déclarez le montant exact encaissé ce mois. Ne jamais déclarer 0 € si vous avez facturé.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Conserver les justificatifs</div><div class="art-step-d">Factures, relevés de compte — France Travail peut demander des justificatifs à tout moment. Un trop-perçu non déclaré entraîne remboursement + pénalités.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Surveiller le plafond de cumul</div><div class="art-step-d">ARE + revenus freelance ne peuvent pas dépasser votre <strong>ancien salaire brut mensuel</strong>. Au-delà, l'ARE est suspendue ce mois-là.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Ce mécanisme vous offre un <strong>filet de sécurité de 24 mois</strong>. Les mois à faible CA, l'ARE compense. Ne déclarez jamais 0 € si vous avez eu des revenus — le risque de trop-perçu est majeur.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.francetravail.fr/candidat/vos-droits-aux-aides-et-allocations/acceder-a-vos-droits-a-allocations/cumul-are-activite.html','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">France Travail — Cumul ARE et activité</div><div class="art-src-url">francetravail.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F14860','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — ARE et activité non salariée</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'micro', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', title:'Micro-entreprise — Cotisations URSSAF 2026',
      sub:'Taux par activité · Plafonds CA · Versement libératoire',
      content: function(){return `
        <div class="art-lead">En micro-entreprise, vos cotisations sociales sont calculées sur le <strong>chiffre d'affaires encaissé</strong> — pas sur votre bénéfice. Ce système simplifié a un avantage : zéro CA, zéro cotisation. Mais les taux réels sont souvent sous-estimés.</div>
        <div class="art-h2">📊 Taux de cotisations 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Activité</th><th>Taux 2026</th><th>Plafond CA</th></tr></thead><tbody>
          <tr><td>Vente de marchandises</td><td><strong>12,3 %</strong></td><td>188 700 €</td></tr>
          <tr><td>Prestations de services BIC</td><td><strong>21,2 %</strong></td><td>77 700 €</td></tr>
          <tr><td>Professions libérales SSI</td><td><strong>23,1 %</strong></td><td>77 700 €</td></tr>
          <tr><td>Professions libérales CIPAV</td><td><strong>23,2 %</strong></td><td>77 700 €</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">💡 Versement libératoire de l'IR</div><div class="art-hl-p">Si votre revenu fiscal de référence est &lt; <strong>27 478 €</strong> (par part), vous pouvez opter pour un taux forfaitaire IR supplémentaire : 1 % (vente), 1,7 % (services BIC), 2,2 % (libéral).</div></div>
        <div class="art-h2">✅ Démarches URSSAF — micro-entrepreneur</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">S'immatriculer en ligne</div><div class="art-step-d">Sur <strong>autoentrepreneur.urssaf.fr</strong> ou <strong>guichet-entreprises.fr</strong>. Gratuit, délai : 24–48h. Vous recevez votre SIRET par email.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Déclarer son CA chaque mois ou trimestre</div><div class="art-step-d">Sur <strong>autoentrepreneur.urssaf.fr</strong>. Même si CA = 0, la déclaration est obligatoire. Pas de déclaration = pénalité forfaitaire.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Ouvrir un compte bancaire dédié</div><div class="art-step-d">Obligatoire si CA &gt; <strong>10 000 €</strong> sur 2 ans consécutifs. Recommandé dès le départ pour séparer perso et pro.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Surveiller les plafonds de CA</div><div class="art-step-d">Dépassement 2 années de suite → bascule automatique au régime réel. Anticipez avec un expert-comptable dès <strong>50 000 € de CA</strong>.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Au-delà de <strong>50 000 € de CA/an</strong>, comparez avec l'EURL ou la SASU. L'optimisation des charges peut représenter <strong>10 000 € de gain annuel</strong> — une simulation avec un expert-comptable s'amortit en quelques mois.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.autoentrepreneur.urssaf.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">URSSAF — Auto-entrepreneur</div><div class="art-src-url">autoentrepreneur.urssaf.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/professionnels-entreprises/vosdroits/F23948','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Micro-entreprise</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'per-freelance', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', title:'PER — Plan Épargne Retraite pour indépendants',
      sub:'Déduction fiscale · Plafonds · Ouverture · Stratégie',
      content: function(){return `
        <div class="art-lead">Le Plan Épargne Retraite (PER) est l'outil de retraite le plus puissant pour les indépendants. Il cumule <strong>avantage fiscal immédiat</strong> et constitution d'un capital retraite. C'est le premier placement à ouvrir quand on se lance.</div>
        <div class="art-h2">💶 Avantage fiscal 2026</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Paramètre</th><th>Valeur 2026</th></tr></thead><tbody>
          <tr><td>Plafond de déduction</td><td><strong>10 %</strong> du revenu professionnel net N-1</td></tr>
          <tr><td>Plafond maximum</td><td><strong>32 908 €</strong> (soit 10 % de 8 × PASS)</td></tr>
          <tr><td>Plafond minimum</td><td><strong>4 114 €</strong> (10 % du PASS)</td></tr>
          <tr><td>Versements déduits de</td><td>Revenu imposable (BIC, BNC, rémunération gérant)</td></tr>
          <tr><td>Sortie en capital</td><td>Possible à 100 % à la retraite (PER individuel)</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">🧮 Exemple concret — Impact fiscal</div><div class="art-hl-p">Revenu imposable : <strong>60 000 €</strong> → TMI 30 %<br>Versement PER : <strong>6 000 €</strong> → Économie d'impôt : <strong>1 800 €</strong><br>Coût réel de l'investissement retraite : <strong>4 200 €</strong></div></div>
        <div class="art-h2">✅ Démarches pour ouvrir et utiliser son PER</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Choisir le bon PER individuel</div><div class="art-step-d">Comparez les frais de gestion (&lt; 1 %/an), les supports d'investissement et la flexibilité des versements. Les assureurs et banques proposent tous des PER.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Calculer son plafond de déduction</div><div class="art-step-d">10 % de votre revenu professionnel net N-1, entre <strong>4 114 €</strong> et <strong>32 908 €</strong>. Vérifiez votre plafond sur votre avis d'imposition (case « épargne retraite »).</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Effectuer les versements avant le 31 décembre</div><div class="art-step-d">Les versements doivent être réalisés avant la <strong>clôture de l'exercice fiscal</strong> pour être déductibles cette année-là.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Déclarer à l'impôt</div><div class="art-step-d">Les versements PER se reportent <strong>case 6NS</strong> de la déclaration de revenus. La déduction est automatique sur le revenu imposable.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Ouvrez un PER <strong>dès la première année</strong>, même avec de petits versements. La déductibilité est un avantage immédiat en trésorerie. Augmentez progressivement au fil de la croissance de votre CA.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F34982','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Plan d'Épargne Retraite</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.impots.gouv.fr/particulier/plan-depargne-retraite-per','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">Impots.gouv.fr — Déduction PER</div><div class="art-src-url">impots.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'protection-sociale', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11h8M12 8v6"/></svg>', title:'Protection sociale freelance — État des lieux',
      sub:'Maladie · IJ · Maternité · Retraite · Chômage',
      content: function(){return `
        <div class="art-lead">Le freelance bénéficie d'une protection sociale réelle mais <strong>incomplète comparée à un salarié</strong>. Identifier les trous dans votre couverture, c'est décider où vous devez vous protéger davantage.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Protection</th><th>Couverture</th><th>Niveau</th></tr></thead><tbody>
          <tr><td>Remboursements maladie</td><td>Identiques salariés (CPAM)</td><td><span class="t-g">Bon</span></td></tr>
          <tr><td>IJ maladie</td><td>À partir de <strong>60 jours</strong> d'arrêt, après 1 an</td><td><span class="t-a">Limité</span></td></tr>
          <tr><td>Maternité/Paternité</td><td>Allocation forfaitaire + IJ si CA suffisant</td><td><span class="t-a">Partiel</span></td></tr>
          <tr><td>Retraite de base</td><td>CNAV ou CIPAV selon activité</td><td><span class="t-g">Oui</span></td></tr>
          <tr><td>Chômage</td><td>ATI uniquement (restrictif)</td><td><span class="t-r">Faible</span></td></tr>
          <tr><td>Invalidité/Décès</td><td>Couverture minimale</td><td><span class="t-a">Faible</span></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-red"><div class="art-hl-h">⚠️ Les 3 grands trous de couverture à combler</div><div class="art-hl-p">❌ <strong>IJ maladie</strong> : aucune indemnité les 60 premiers jours d'arrêt (contrairement au salarié dès J4)<br>❌ <strong>Chômage</strong> : l'ATI ne couvre que la liquidation judiciaire — une démission ne donne rien<br>❌ <strong>Invalidité grave</strong> : couverture minimale insuffisante face à un arrêt de longue durée</div></div>
        <div class="art-h2">✅ Plan d'action protection optimale</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Souscrire une prévoyance privée</div><div class="art-step-d">40–80 €/mois couvrent les IJ dès le <strong>1er ou 8e jour</strong> d'arrêt. Priorité absolue pour tout freelance.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Constituer une épargne de précaution</div><div class="art-step-d"><strong>3 à 6 mois</strong> de charges fixes en réserve. C'est le filet minimum avant toute prévoyance.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Vérifier sa mutuelle (complémentaire santé)</div><div class="art-step-d">Vous n'avez plus de mutuelle d'entreprise. Une mutuelle individuelle est essentielle — déductible des charges en BNC.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Ouvrir un PER pour la retraite</div><div class="art-step-d">Le PER (Plan Épargne Retraite) est déductible du revenu imposable. Voir l'article PER pour les plafonds 2026.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Une <strong>prévoyance privée à 40–80 €/mois</strong> couvre les IJ dès le 1er jour d'arrêt. C'est l'investissement le plus rentable pour un freelance — un seul mois d'arrêt sans couverture peut représenter plusieurs milliers d'euros perdus.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.secu-independants.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">Sécurité Sociale des Indépendants</div><div class="art-src-url">secu-independants.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/professionnels-entreprises/vosdroits/F23689','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Protection sociale TNS</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'statuts', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v4H3z"/><path d="M3 10h18v4H3z"/><path d="M3 17h11v4H3z"/><circle cx="19" cy="19" r="3"/><path d="m21.5 21.5-1.2-1.2"/></svg>', title:'Statuts juridiques — Comparatif complet',
      sub:'Micro · EURL · SASU · Portage salarial',
      content: function(){return `
        <div class="art-lead">Le choix du statut est la décision la plus structurante pour un freelance. Il impacte vos charges, votre protection sociale, votre fiscalité et votre crédibilité clients. <strong>Il n'existe pas de statut universel.</strong></div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Statut</th><th>Charges</th><th>Protection</th><th>Pour qui</th></tr></thead><tbody>
          <tr><td>Micro-entreprise</td><td>12–23 % CA</td><td>Moyenne</td><td>Démarrage, CA &lt; 40k€</td></tr>
          <tr><td>EURL (gérant TNS)</td><td>~45 % bénéfice</td><td>Bonne</td><td>CA 40–150k€/an</td></tr>
          <tr><td>SASU (président salarié)</td><td>~75 % rémunération</td><td>Salarié complète</td><td>Revenus élevés</td></tr>
          <tr><td>Portage salarial</td><td>~50 % CA HT</td><td>Salarié complète</td><td>Missions courtes, ARE</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Comparaison sur 60 000 € de CA annuel</div><div class="art-hl-p">• <strong>Micro-entreprise</strong> (services BIC) : 21,2 % = 12 720 € de cotisations<br>• <strong>EURL</strong> (bénéfice 40 000 €) : ~45 % = 18 000 € de cotisations mais meilleure protection<br>• <strong>SASU</strong> (rémunération 40 000 €) : ~75 % = 30 000 € charges mais protection salarié complète<br>→ La micro est plus légère, la SASU plus coûteuse mais mieux protégée</div></div>
        <div class="art-h2">✅ Comment choisir son statut</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Estimer son CA annuel prévisionnel</div><div class="art-step-d">Sous <strong>40 000 €</strong> : la micro-entreprise est quasi systématiquement la bonne option pour démarrer.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Évaluer ses besoins de protection</div><div class="art-step-d">Besoins forts en ARE et retraite ? La <strong>SASU ou le portage salarial</strong> offrent une protection salarié complète.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Simuler avec un expert-comptable</div><div class="art-step-d">Au-delà de 50 000 € de CA, une simulation EURL vs SASU peut révéler <strong>5 000–15 000 € de gain annuel</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Créer en ligne (immatriculation)</div><div class="art-step-d">Via <strong>guichet-entreprises.fr</strong> pour toutes les formes juridiques. Gratuit pour la micro, ~250 € pour EURL/SASU.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Le <strong>portage salarial</strong> est sous-estimé : pour 50 % de frais, vous avez ARE, mutuelle, retraite complète, zéro gestion administrative. Idéal pour tester le freelance ou rester salarié pendant une transition.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://bpifrance-creation.fr/encyclopedie/structures-juridiques','_blank')"><div class="art-src-ico">📚</div><div class="art-src-info"><div class="art-src-name">BPI Création — Structures juridiques</div><div class="art-src-url">bpifrance-creation.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.guichet-entreprises.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">Guichet-Entreprises — Immatriculation</div><div class="art-src-url">guichet-entreprises.fr</div></div></div>
        </div>`;}
    }
  ],

  reconversion: [
    {
      id:'bilan', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v3l2 2"/></svg>', title:'Bilan de compétences — Mode d\'emploi',
      sub:'Durée · Financement · Prestataire · Résultats',
      content: function(){return `
        <div class="art-lead">Le bilan de compétences est l'outil le plus puissant pour construire une reconversion durable. Ceux qui le font sérieusement <strong>réduisent drastiquement leur risque d'erreur d'orientation</strong>.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Caractéristique</th><th>Détail 2026</th></tr></thead><tbody>
          <tr><td>Durée légale maximale</td><td><strong>24 heures</strong> sur plusieurs semaines</td></tr>
          <tr><td>Coût moyen</td><td><strong>1 500 – 3 500 €</strong></td></tr>
          <tr><td>Financement CPF</td><td>Oui — jusqu'au plafond du solde</td></tr>
          <tr><td>Financement France Travail</td><td>Possible pour demandeurs d'emploi</td></tr>
          <tr><td>Confidentialité</td><td><strong>Totale</strong> — appartient au salarié</td></tr>
          <tr><td>Certification obligatoire</td><td>Qualiopi <strong>obligatoire</strong> pour financement CPF</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Ce que contient un vrai bilan de compétences</div><div class="art-hl-p">🔹 <strong>Phase préliminaire</strong> : analyse des besoins, objectifs, faisabilité<br>🔹 <strong>Phase d'investigation</strong> : tests psychométriques, bilan de compétences réelles, exploration de pistes<br>🔹 <strong>Phase de conclusion</strong> : plan d'action détaillé et document de synthèse confidentiel<br>⚠️ Un bilan &lt; 10h est insuffisant — méfiez-vous des offres low-cost</div></div>
        <div class="art-h2">📋 Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Consulter son solde CPF</div><div class="art-step-d">Sur <strong>moncompteformation.gouv.fr</strong>. Le bilan peut être financé jusqu'à 3 500 € via le CPF.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Choisir un organisme certifié Qualiopi</div><div class="art-step-d">Obligatoire pour financement CPF. Vérifiez la certification sur <strong>data.gouv.fr/qualiopi</strong> avant de vous engager.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Réaliser le bilan (8 à 24 heures)</div><div class="art-step-d">Entretiens + tests. Le bilan se fait pendant ou hors temps de travail selon l'accord avec l'employeur.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Utiliser la synthèse pour agir</div><div class="art-step-d">Le document de synthèse est <strong>votre propriété</strong>. Il définit votre plan d'action formation ou reconversion.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Méfiez-vous des bilans en moins de 10 heures. Un vrai bilan inclut des entretiens individuels, des tests psychométriques et une restitution approfondie. Vérifiez le profil du consultant — c'est lui qui fait la différence.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F3401','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Bilan de compétences</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.moncompteformation.gouv.fr','_blank')"><div class="art-src-ico">💳</div><div class="art-src-info"><div class="art-src-name">Mon Compte Formation — Financement bilan</div><div class="art-src-url">moncompteformation.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'cep', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', title:'CEP — Conseil en Évolution Professionnelle',
      sub:'Rôle · Opérateurs · Démarche · Gratuit',
      content: function(){return `
        <div class="art-lead">Le CEP est un service d'accompagnement <strong>gratuit et personnalisé</strong> pour construire votre projet d'évolution professionnelle. Il est obligatoire pour valider une démission reconversion et ouvrir des droits ARE.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Opérateur CEP</th><th>Pour qui</th></tr></thead><tbody>
          <tr><td>France Travail</td><td>Salariés et demandeurs d'emploi</td></tr>
          <tr><td>APEC</td><td>Cadres et ingénieurs</td></tr>
          <tr><td>Cap emploi</td><td>Personnes en situation de handicap</td></tr>
          <tr><td>Missions Locales</td><td>Jeunes de 16 à 25 ans</td></tr>
          <tr><td>Association Transitions Pro</td><td>Demandes CPF de transition</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">📋 Ce que fait le CEP pour vous</div><div class="art-hl-p">✅ Analyse de votre situation et de vos compétences<br>✅ Définition de votre projet professionnel<br>✅ Identification des formations et financements adaptés<br>✅ Validation du projet pour démission reconversion (ARE)</div></div>
        <div class="art-h2">📋 Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Identifier son opérateur CEP</div><div class="art-step-d">Salarié → <strong>France Travail ou APEC</strong> (cadres). Demandeur d'emploi → France Travail. Jeune → Mission Locale. Le service est entièrement gratuit.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Prendre rendez-vous 6 à 8 mois à l'avance</div><div class="art-step-d">Surtout si vous préparez une démission reconversion — l'instruction du dossier prend 2 mois minimum. Ne pas attendre la dernière minute.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Construire son projet avec le conseiller</div><div class="art-step-d">Le CEP vous aide à définir votre cible, identifier la formation adaptée et trouver les financements (CPF, AIF, OPCO…).</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Obtenir la validation écrite du projet</div><div class="art-step-d">Document indispensable pour la démission reconversion — sans lui, <strong>pas d'ARE</strong>. Conservez-le précieusement avant de démissionner.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Prenez rendez-vous au CEP <strong>6 à 8 mois avant</strong> votre démission prévue. L'instruction du dossier prend du temps — anticiper évite de rater la fenêtre d'ouverture des droits ARE.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F10098','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — CEP</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.francetravail.fr/candidat/conseil-en-evolution-professionnelle.html','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">France Travail — Conseil en Évolution Pro</div><div class="art-src-url">francetravail.fr</div></div></div>
        </div>`;}
    },
    {
      id:'cpf', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/><path d="M6 15h4"/></svg>', title:'CPF — Compte Personnel de Formation',
      sub:'Solde · Alimentation · Reste à charge · Abondements',
      content: function(){return `
        <div class="art-lead">Le CPF est votre droit individuel à la formation, utilisable tout au long de votre vie professionnelle. <strong>Plus de 36 millions de personnes</strong> ont un CPF — dont la majorité ne savent pas exactement ce qu'il contient ni comment bien l'utiliser.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Règle CPF 2026</th><th>Montant / Condition</th></tr></thead><tbody>
          <tr><td>Alimentation annuelle (temps plein)</td><td><strong>500 €/an</strong></td></tr>
          <tr><td>Sans qualification reconnue</td><td><strong>800 €/an</strong></td></tr>
          <tr><td>Plafond</td><td><strong>5 000 €</strong> (8 000 € sans qualification)</td></tr>
          <tr><td>Reste à charge depuis 2024</td><td><strong>100 €</strong> (sauf exonérations)</td></tr>
          <tr><td>Abondement employeur</td><td>Possible par accord d'entreprise</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Exonérations du reste à charge 100 €</div><div class="art-hl-p">• Abondement de l'employeur<br>• Prise en charge France Travail (demandeurs d'emploi)<br>• Financement OPCO via accord de branche<br>• CPF de transition professionnelle</div></div>
        <div class="art-h2">📋 Utiliser son CPF — Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Consulter son solde</div><div class="art-step-d">Sur <strong>moncompteformation.gouv.fr</strong> avec votre numéro de Sécurité sociale. Votre solde s'affiche immédiatement.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Choisir une formation éligible</div><div class="art-step-d">Toutes les formations sur la plateforme sont éligibles. Vérifiez les avis, la certification (RNCP, Qualiopi) et le reste à charge.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Négocier un abondement avant de partir</div><div class="art-step-d">Si vous êtes encore en poste, demandez à votre employeur un <strong>abondement CPF</strong> dans le cadre de votre entretien annuel ou de la rupture.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Payer le reste à charge de 100 €</div><div class="art-step-d">Obligatoire depuis 2024 sauf exonérations. Si vous êtes demandeur d'emploi, France Travail peut le prendre en charge via l'AIF.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Consultez votre solde sur <strong>moncompteformation.gouv.fr</strong>. Si vous êtes encore en poste, négociez un abondement employeur <strong>avant</strong> la rupture — cette opportunité disparaît après votre départ.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.moncompteformation.gouv.fr','_blank')"><div class="art-src-ico">💳</div><div class="art-src-info"><div class="art-src-name">Mon Compte Formation — Consulter mon solde</div><div class="art-src-url">moncompteformation.gouv.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F10705','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Compte Personnel de Formation</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'cpf-transition', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9"/><path d="M3 12a9 9 0 0 1 9-9"/><polyline points="21 3 21 9 15 9"/><polyline points="3 21 3 15 9 15"/></svg>', title:'CPF de transition professionnelle',
      sub:'Conditions · Salaire maintenu · Commission · Durée',
      content: function(){return `
        <div class="art-lead">Le CPF de transition (ex-CIF) est l'un des dispositifs les plus puissants pour se reconvertir : il <strong>maintient votre salaire pendant toute la formation</strong> et finance les frais pédagogiques. Mais ses conditions sont strictes.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Condition</th><th>Exigence 2026</th></tr></thead><tbody>
          <tr><td>Ancienneté minimale</td><td><strong>24 mois</strong> dont <strong>12 mois</strong> chez l'employeur actuel</td></tr>
          <tr><td>Type de contrat</td><td>CDI ou CDD (avec conditions spécifiques)</td></tr>
          <tr><td>Formation éligible</td><td>Certifiante, inscrite au RNCP ou répertoire spécifique</td></tr>
          <tr><td>Durée maximale</td><td><strong>24 mois</strong> (1 200 heures)</td></tr>
          <tr><td>Salaire pendant la formation</td><td><strong>Maintenu à 100 %</strong> si salaire ≤ 2 × SMIC</td></tr>
          <tr><td>Salaire &gt; 2 × SMIC</td><td><strong>90 %</strong> du salaire brut</td></tr>
          <tr><td>Organisme instructeur</td><td>Transitions Pro de votre région</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Avantages clés du CPF de transition</div><div class="art-hl-p">🔹 <strong>Salaire maintenu 100 %</strong> pendant toute la formation (si ≤ 2 × SMIC)<br>🔹 <strong>Frais pédagogiques pris en charge</strong> intégralement par Transitions Pro<br>🔹 Vous restez <strong>salarié de votre entreprise</strong> pendant la formation<br>🔹 Votre <strong>emploi est protégé</strong> à votre retour si CDD/CDI maintenu</div></div>
        <div class="art-h2">📋 Démarches pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Se faire accompagner par le CEP</div><div class="art-step-d">Le Conseil en Évolution Professionnelle est le premier interlocuteur. Il aide à construire et valider le dossier.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Choisir une formation certifiante RNCP</div><div class="art-step-d">La formation doit être inscrite au RNCP ou au répertoire spécifique. Vérifiez sur <strong>francecompetences.fr</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Déposer le dossier à Transitions Pro</div><div class="art-step-de">Délai d'instruction : <strong>2 mois</strong>. Le dossier doit inclure : projet professionnel, devis formation, CV, lettre de motivation.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Informer l'employeur</div><div class="art-step-d"><strong>60 jours avant</strong> si formation &lt; 6 mois, <strong>120 jours avant</strong> si formation ≥ 6 mois. L'employeur ne peut pas refuser.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Le CPF de transition est le dispositif le plus protecteur mais le moins connu. Constituez votre dossier avec l'aide du CEP — un bon dossier bien argumenté sur la pertinence du projet a beaucoup plus de chances d'être accepté.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.transitionspro.fr','_blank')"><div class="art-src-ico">🎓</div><div class="art-src-info"><div class="art-src-name">Transitions Pro — CPF de transition</div><div class="art-src-url">transitionspro.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F14018','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — CPF de transition</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'demission-reconversion', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>', title:'Démission pour reconversion — ARE exceptionnelle',
      sub:'Conditions · Validation CEP · Procédure · Droits ARE',
      content: function(){return `
        <div class="art-lead">Depuis le 1er novembre 2019, une démission peut ouvrir droit à l'ARE si elle est motivée par un projet de reconversion sérieux <strong>validé par le CEP avant la démission</strong>. Une révolution pour ceux qui veulent changer de voie.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Condition</th><th>Exigence</th></tr></thead><tbody>
          <tr><td>Ancienneté requise</td><td><strong>5 ans continus</strong> chez le même employeur</td></tr>
          <tr><td>Projet éligible</td><td>Formation qualifiante certifiante OU création/reprise d'entreprise</td></tr>
          <tr><td>Validation obligatoire</td><td>Par le CEP <strong>avant</strong> la démission — ordre impératif</td></tr>
          <tr><td>Délai instruction CEP</td><td><strong>2 mois</strong> après dossier complet</td></tr>
          <tr><td>ARE après démission</td><td>Oui — mêmes règles que licenciement</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-red"><div class="art-hl-h">⚠️ L'erreur fatale à ne pas commettre</div><div class="art-hl-p">Vous devez obtenir la <strong>validation CEP avant de démissionner</strong>. Si vous démissionnez d'abord, vous perdez définitivement vos droits ARE. L'ordre est non négociable.</div></div>
        <div class="art-h2">📋 Procédure chronologique obligatoire</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Prendre RDV au CEP (6–8 mois avant)</div><div class="art-step-d">France Travail, APEC (cadres) ou tout opérateur CEP agréé. Anticipez — le dossier prend <strong>au minimum 2 mois</strong> à instruire.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Construire et déposer son dossier au CEP</div><div class="art-step-d">Projet professionnel détaillé, formation cible certifiante (RNCP), financement prévu. Le CEP instruit en <strong>2 mois maximum</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Obtenir la validation écrite du CEP</div><div class="art-step-d">Ce document est <strong>la clé</strong>. Sans lui, toute démission reste une démission simple — sans ARE. Conservez-le impérativement.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Démissionner et s'inscrire à France Travail</div><div class="art-step-d">Seulement <strong>après</strong> la validation CEP. L'inscription France Travail ouvre les droits ARE dans les mêmes conditions qu'un licenciement.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Anticipez de <strong>6 à 8 mois</strong> avant votre démission prévue. La validation du dossier, l'instruction et les éventuels allers-retours prennent du temps — la précipitation coûte cher.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F14860','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Démission reconversion</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.francetravail.fr/candidat/vos-droits-aux-aides-et-allocations/acceder-a-vos-droits-a-allocations/vous-avez-demissionne.html','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">France Travail — ARE après démission</div><div class="art-src-url">francetravail.fr</div></div></div>
        </div>`;}
    },
    {
      id:'financement', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', title:'Financement formation — Toutes les aides',
      sub:'CPF · AIF · FNE · Régions · OPCO — Tableau complet',
      content: function(){return `
        <div class="art-lead">Une formation de reconversion ne se finance pas qu'avec le CPF. En cumulant les dispositifs, il est souvent possible de la <strong>financer à 100 %</strong>. La clé : savoir quels leviers activer selon votre situation.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Aide</th><th>Pour qui</th><th>Montant</th></tr></thead><tbody>
          <tr><td>CPF</td><td>Tout actif</td><td>Jusqu'à <strong>5 000 €</strong></td></tr>
          <tr><td>AIF — France Travail</td><td>Demandeurs d'emploi</td><td>Variable, peut couvrir 100 %</td></tr>
          <tr><td>FNE-Formation</td><td>Salariés en chômage partiel</td><td><strong>100 %</strong> des coûts</td></tr>
          <tr><td>Aide régionale</td><td>Selon région</td><td><strong>500 – 5 000 €</strong></td></tr>
          <tr><td>OPCO (via employeur)</td><td>Salariés</td><td>Selon accord de branche</td></tr>
          <tr><td>CPF de transition</td><td>CDI/CDD</td><td>Salaire maintenu + frais</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Exemple de financement cumulé</div><div class="art-hl-p">Formation de <strong>3 500 €</strong> pour un demandeur d'emploi :<br>• CPF : <strong>2 000 €</strong> (solde disponible)<br>• AIF France Travail : <strong>1 500 €</strong> (complément accordé)<br>→ <strong>Reste à charge : 0 €</strong> — formation financée à 100 %</div></div>
        <div class="art-h2">✅ Stratégie de financement selon votre situation</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Consulter son solde CPF</div><div class="art-step-d">Sur <strong>moncompteformation.gouv.fr</strong>. C'est le premier levier à activer — souvent suffisant pour les formations courtes.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Vérifier les aides régionales</div><div class="art-step-d">Chaque région a ses propres dispositifs. Consultez le <strong>Conseil Régional de votre région</strong> ou France Travail pour les cumuler.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Demander l'AIF si demandeur d'emploi</div><div class="art-step-d">L'Aide Individuelle à la Formation de France Travail <strong>complète le CPF</strong> — demandez-la à votre conseiller avant toute inscription.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Explorer le CPF de transition si en poste</div><div class="art-step-d">Salaire maintenu + frais couverts — le dispositif le plus puissant pour les salariés en CDI.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Ne partez pas du principe que votre CPF ne suffit pas. Simulez le cumul CPF + AIF + aide régionale. Dans la majorité des cas, une formation de 2 000 à 4 000 € est <strong>finançable sans reste à charge</strong> pour un demandeur d'emploi.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.moncompteformation.gouv.fr','_blank')"><div class="art-src-ico">💳</div><div class="art-src-info"><div class="art-src-name">Mon Compte Formation</div><div class="art-src-url">moncompteformation.gouv.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.transitionspro.fr','_blank')"><div class="art-src-ico">🎓</div><div class="art-src-info"><div class="art-src-name">Transitions Pro</div><div class="art-src-url">transitionspro.fr</div></div></div>
        </div>`;}
    },
    {
      id:'proa', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>', title:'Pro-A — Reconversion par l\'alternance',
      sub:'Conditions · Durée · Financement OPCO · Salaire maintenu',
      content: function(){return `
        <div class="art-lead">La Pro-A permet de se former en alternance <strong>sans quitter son emploi</strong>. Votre salaire est maintenu à 100 % pendant toute la formation, financée par l'OPCO de votre branche.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Caractéristique</th><th>Règle 2026</th></tr></thead><tbody>
          <tr><td>Condition de salaire</td><td>≤ <strong>2 × SMIC</strong> (≈ 3 682 €/mois brut)</td></tr>
          <tr><td>Durée</td><td>6 à <strong>24 mois</strong></td></tr>
          <tr><td>Volume formation</td><td>15 à 25 % du temps de travail</td></tr>
          <tr><td>Financement</td><td>OPCO de la branche professionnelle</td></tr>
          <tr><td>Salaire</td><td><strong>Maintenu à 100 %</strong></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Avantages Pro-A vs autres dispositifs</div><div class="art-hl-p">🔹 Vous restez en poste — <strong>aucune perte de revenu</strong><br>🔹 Formation prise en charge par l'<strong>OPCO de votre branche</strong><br>🔹 Idéal pour <strong>montée en compétences interne</strong> ou changement de métier dans la même entreprise<br>🔹 Pas de limite de solde CPF — c'est l'employeur et l'OPCO qui financent</div></div>
        <div class="art-h2">📋 Démarches pour obtenir la Pro-A</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier l'accord de branche</div><div class="art-step-d">La Pro-A n'est accessible que si votre <strong>accord de branche</strong> la prévoit. Vérifiez sur <strong>legifrance.gouv.fr</strong> ou demandez à votre RH.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Identifier la formation cible</div><div class="art-step-d">La formation doit permettre une <strong>promotion ou reconversion</strong> dans votre branche. Elle doit être certifiante (RNCP).</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Construire le projet avec votre RH</div><div class="art-step-d">La Pro-A se met en place par <strong>avenant au contrat de travail</strong>. Présentez un argumentaire bénéfice-employeur clair.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Valider avec l'OPCO</div><div class="art-step-d">L'employeur dépose la demande de financement auprès de l'OPCO. L'accord est généralement rapide si le dossier est complet.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">La Pro-A se propose — préparez un argumentaire centré sur les bénéfices pour votre entreprise. Un bon dossier présenté au bon moment a de grandes chances d'aboutir.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F15478','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Pro-A</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/professionnels-entreprises/vosdroits/F31212','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Service-Public — OPCO et financement</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    }
  ],

  etudiant: [
    {
      id:'apl', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>', title:'APL — Aide Personnalisée au Logement',
      sub:'Logements éligibles · Calcul · Démarche CAF · Montants 2026',
      content: function(){return `
        <div class="art-lead">Les APL peuvent couvrir entre 150 et 420 €/mois de votre loyer. Depuis 2021, le calcul se base sur vos <strong>revenus personnels des 12 derniers mois</strong> — très avantageux pour les étudiants à faibles revenus.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Zone géographique</th><th>Montant moyen 2026</th></tr></thead><tbody>
          <tr><td>Zone 1 (Paris + grande couronne)</td><td><strong>280 – 420 €/mois</strong></td></tr>
          <tr><td>Zone 2 (grandes agglomérations)</td><td><strong>180 – 280 €/mois</strong></td></tr>
          <tr><td>Zone 3 (reste de la France)</td><td><strong>130 – 200 €/mois</strong></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">🏘️ Logements éligibles</div><div class="art-hl-p">✅ Résidences CROUS<br>✅ Logements privés conventionnés CAF<br>✅ Foyers de jeunes travailleurs<br>❌ Logement chez les parents<br>❌ Logements non conventionnés</div></div>
        <div class="art-h2">📋 Démarches pour obtenir les APL</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Simuler son montant sur caf.fr</div><div class="art-step-d">Le simulateur CAF calcule votre APL estimée en 3 minutes. Renseignez votre loyer, zone géographique et revenus des 12 derniers mois.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Faire la demande dès le 1er jour du bail</div><div class="art-step-d">Sur <strong>caf.fr → Mes aides → Aide au logement</strong>. Les APL ne sont <strong>pas rétroactives</strong> — chaque mois de retard est définitivement perdu.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Fournir les justificatifs</div><div class="art-step-d">Contrat de bail, RIB, avis d'imposition (ou déclaration de revenus), justificatif de scolarité. Tout en ligne sur caf.fr.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Déclarer tout changement de situation</div><div class="art-step-d">Reprise d'emploi, changement de logement, modification des revenus — signalez-le dans les <strong>60 jours</strong> pour éviter un trop-perçu.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Faites la demande sur <strong>caf.fr dès le premier jour</strong> de votre bail. Les APL ne sont pas rétroactives — chaque mois de retard est un mois perdu.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.caf.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">CAF.fr — Aide au logement</div><div class="art-src-url">caf.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F12006','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — APL</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'alternance', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title:'Alternance — Droits & rémunération 2026',
      sub:'Grille de salaires · Droits sociaux · Rupture',
      content: function(){return `
        <div class="art-lead">L'alternant est un salarié à part entière. Tickets restaurant, mutuelle, congés payés — vous avez les <strong>mêmes droits qu'un salarié</strong>, mais beaucoup ne les réclament pas.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Profil apprenti</th><th>% SMIC</th><th>Salaire brut/mois</th></tr></thead><tbody>
          <tr><td>Moins de 18 ans — 1re année</td><td>27 %</td><td>~<strong>499 €</strong></td></tr>
          <tr><td>Moins de 18 ans — 2e année</td><td>39 %</td><td>~<strong>720 €</strong></td></tr>
          <tr><td>18–25 ans — 1re année</td><td>43 %</td><td>~<strong>793 €</strong></td></tr>
          <tr><td>18–25 ans — 2e année</td><td>51 %</td><td>~<strong>941 €</strong></td></tr>
          <tr><td>18–25 ans — 3e année</td><td>67 %</td><td>~<strong>1 236 €</strong></td></tr>
          <tr><td>26 ans et plus</td><td>100 % SMIC min.</td><td>~<strong>1 802 €</strong></td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">💡 Exonération d'impôt sur le revenu</div><div class="art-hl-p">Le salaire des apprentis est exonéré d'IR jusqu'à <strong>21 744 € brut/an</strong> (1 × SMIC annuel 2026). La quasi-totalité des apprentis ne paient donc aucun impôt sur leur salaire d'alternance.</div></div>
        <div class="art-h2">✅ Droits à réclamer dès le début du contrat</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Vérifier son salaire dès le 1er bulletin</div><div class="art-step-d">Calculez votre % SMIC attendu selon votre âge et année de contrat. Si le montant est inférieur, signalez-le immédiatement à la RH par email.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Réclamer l'affiliation à la mutuelle</div><div class="art-step-d">Obligatoire dès le 1er jour. L'employeur paie <strong>50 % minimum</strong> de la cotisation. Si vous n'avez pas reçu l'attestation dans les 15 jours, relancez par écrit.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Accumuler ses congés payés</div><div class="art-step-d">Vous acquérez <strong>2,5 jours ouvrables/mois</strong> comme tout salarié. Vérifiez votre compteur et demandez à les poser avant la fin du contrat.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Connaître les conditions de rupture</div><div class="art-step-d">Pendant la période d'essai (45 jours en entreprise), rupture libre. Après : accord des deux parties ou faute grave. Le CFA doit être informé.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Votre employeur <strong>doit vous affilier à sa mutuelle</strong> et payer 50 % des cotisations. Si ce n'est pas fait, réclamez-le — c'est une obligation légale. Ne renoncez pas à ce droit par timidité.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F2918','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Rémunération apprenti</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F11244','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Service-Public — Contrat d'apprentissage</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'bourses', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>', title:'Bourses CROUS — Montants & démarche DSE 2026',
      sub:'8 échelons · Conditions · Calendrier · Cumuls',
      content: function(){return `
        <div class="art-lead">Les bourses sur critères sociaux sont accordées selon les revenus de vos parents, votre éloignement et votre situation familiale. <strong>Plus de 760 000 étudiants</strong> en bénéficient — mais des milliers y renoncent faute d'avoir fait la demande.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Échelon</th><th>Mensuel 2026</th><th>Annuel</th></tr></thead><tbody>
          <tr><td>Échelon 0bis</td><td><strong>108 €</strong></td><td>1 084 €</td></tr>
          <tr><td>Échelon 1</td><td><strong>108 €</strong></td><td>1 084 €</td></tr>
          <tr><td>Échelon 2</td><td><strong>238 €</strong></td><td>2 378 €</td></tr>
          <tr><td>Échelon 3</td><td><strong>304 €</strong></td><td>3 040 €</td></tr>
          <tr><td>Échelon 4</td><td><strong>391 €</strong></td><td>3 911 €</td></tr>
          <tr><td>Échelon 5</td><td><strong>451 €</strong></td><td>4 514 €</td></tr>
          <tr><td>Échelon 6</td><td><strong>538 €</strong></td><td>5 379 €</td></tr>
          <tr><td>Échelon 7</td><td><strong>589 €</strong></td><td>5 894 €</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">📅 Calendrier DSE — Ne ratez pas la fenêtre</div><div class="art-hl-p">• <strong>Janvier–Mai</strong> : Ouverture du DSE sur messervices.etudiant.gouv.fr<br>• <strong>Juin</strong> : Notification conditionnelle<br>• <strong>Octobre</strong> : Premier versement<br>⚠️ Aucune session de rattrapage après fermeture</div></div>
        <div class="art-h2">📋 Démarches DSE pas à pas</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Simuler son échelon</div><div class="art-step-d">Sur <strong>messervices.etudiant.gouv.fr → Simulateur DSE</strong>. Le calcul dépend des revenus parentaux, de l'éloignement et de la composition familiale.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Constituer le dossier entre janvier et mai</div><div class="art-step-d">Créez votre compte sur <strong>messervices.etudiant.gouv.fr</strong>. Joignez : avis fiscal des parents, justificatif de scolarité, RIB.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Confirmer son inscription en formation</div><div class="art-step-d">La bourse conditionnelle devient définitive après confirmation de votre inscription dans l'établissement à la rentrée. Délai : <strong>septembre</strong>.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Renouveler chaque année</div><div class="art-step-d">Le DSE se refait <strong>chaque année</strong> entre janvier et mai. Aucun renouvellement automatique — ne ratez pas la fenêtre l'année suivante.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Faites la démarche <strong>même si vous doutez</strong>. Le simulateur DSE est gratuit et sans engagement. Des milliers d'étudiants qui pensaient ne pas être éligibles ont été agréablement surpris.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.messervices.etudiant.gouv.fr','_blank')"><div class="art-src-ico">🎓</div><div class="art-src-info"><div class="art-src-name">Mes Services Étudiant — DSE en ligne</div><div class="art-src-url">messervices.etudiant.gouv.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F12214','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Bourse sur critères sociaux</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'css', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>', title:'CSS — Complémentaire Santé Solidaire',
      sub:'Conditions · Montant · Démarche ameli.fr',
      content: function(){return `
        <div class="art-lead">La CSS est la mutuelle gratuite (ou quasi-gratuite) pour les personnes à faibles revenus. Elle est <strong>massivement sous-demandée</strong> par les étudiants éligibles — alors qu'elle couvre 100 % du ticket modérateur.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Dispositif</th><th>Condition de revenus</th><th>Coût</th></tr></thead><tbody>
          <tr><td>CSS gratuite</td><td>Revenus &lt; <strong>9 719 €/an</strong></td><td><strong>Gratuite</strong></td></tr>
          <tr><td>CSS avec participation</td><td>Entre 9 719 et <strong>14 211 €/an</strong></td><td>~<strong>1 €/mois</strong></td></tr>
          <tr><td>Mutuelle privée étudiante</td><td>Tous</td><td>10 – 45 €/mois</td></tr>
          <tr><td>Mutuelle alternance</td><td>Apprentis</td><td>50 % employeur</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-green"><div class="art-hl-h">✅ Ce que la CSS couvre — mieux que beaucoup de mutuelles</div><div class="art-hl-p">🔹 <strong>100 % du ticket modérateur</strong> sur tous les soins remboursés<br>🔹 <strong>Forfait dentaire et optique</strong> inclus (paniers 100 % Santé)<br>🔹 <strong>Pas de délai de carence</strong> — protection immédiate dès l'accord<br>🔹 Valable un an renouvelable — à renouveler chaque année sur ameli.fr</div></div>
        <div class="art-h2">📋 Démarches pour demander la CSS</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Simuler son éligibilité</div><div class="art-step-d">Sur <strong>ameli.fr → CSS → Simulateur</strong>. Saisissez vos revenus des 12 derniers mois (bourses incluses).</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Faire la demande en ligne</div><div class="art-step-d">Depuis votre compte <strong>ameli.fr</strong>. Joignez votre avis d'imposition et justificatifs de revenus.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Choisir un organisme complémentaire</div><div class="art-step-d">Vous choisissez l'assureur partenaire (mutuelle, assurance). La CPAM prend en charge la cotisation directement.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Renouveler chaque année</div><div class="art-step-d">La CSS s'arrête au bout d'un an. Pensez à renouveler <strong>2 mois avant la fin</strong> pour éviter toute interruption.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">La CSS rembourse <strong>100 % du ticket modérateur</strong> — c'est mieux que la plupart des mutuelles payantes. Simulez votre éligibilité sur <strong>ameli.fr</strong> avant de souscrire une mutuelle privée.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.ameli.fr/assure/droits-demarches/situations-particulieres/etudiants','_blank')"><div class="art-src-ico">🏥</div><div class="art-src-info"><div class="art-src-name">Ameli.fr — CSS étudiants</div><div class="art-src-url">ameli.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F10027','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Complémentaire Santé Solidaire</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'premier-emploi', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m5 3 14 9-14 9V3z"/></svg>', title:'Premier emploi — Vos droits dès le 1er jour',
      sub:'SMIC 2026 · Période d\'essai · Documents obligatoires',
      content: function(){return `
        <div class="art-lead">Le premier emploi est une étape excitante — mais dans l'enthousiasme, beaucoup de jeunes acceptent des conditions qui ne respectent pas leurs droits. <strong>Connaître les règles dès le départ</strong>, c'est éviter des mois de préjudice.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Droit</th><th>Règle 2026</th></tr></thead><tbody>
          <tr><td>SMIC horaire brut</td><td><strong>11,88 €/heure</strong></td></tr>
          <tr><td>SMIC mensuel brut (35h)</td><td><strong>1 801,80 €</strong></td></tr>
          <tr><td>Période d'essai CDI — employés</td><td><strong>2 mois</strong> (renouvelable une fois)</td></tr>
          <tr><td>Période d'essai CDI — cadres</td><td><strong>4 mois</strong></td></tr>
          <tr><td>Congés payés</td><td>2,5 jours/mois dès le <strong>1er jour</strong></td></tr>
          <tr><td>Préavis rupture essai</td><td>24h (&lt;8j) / 48h (8j–1m) / 2 semaines (1–3m)</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">📋 Documents que l'employeur doit vous remettre</div><div class="art-hl-p">✅ Contrat de travail signé (avant ou dès le 1er jour)<br>✅ Bulletin de salaire mensuel<br>✅ Attestation mutuelle d'entreprise<br>✅ Règlement intérieur ou livret d'accueil</div></div>
        <div class="art-h2">✅ Démarches dès le 1er jour</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Exiger son contrat signé avant de commencer</div><div class="art-step-d">Le contrat doit être remis <strong>avant ou le jour J</strong>. S'il n'est pas là, envoyez un email de relance — cela crée une trace écrite en cas de litige.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Vérifier son salaire sur le 1er bulletin</div><div class="art-step-d">Taux horaire ≥ <strong>11,88 €/h</strong> (SMIC 2026). Vérifiez aussi que votre convention collective n'impose pas un minimum supérieur.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">S'affilier à la mutuelle d'entreprise</div><div class="art-step-d">Obligatoire dès le 1er jour. L'employeur paie 50 % minimum. Si on ne vous propose pas, demandez-le expressément par email à la RH.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Connaître ses droits pendant la période d'essai</div><div class="art-step-d">L'employeur peut rompre librement — mais doit respecter les délais de prévenance. Vous aussi pouvez partir librement. Aucune indemnité de licenciement n'est due.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text"><strong>N'attendez jamais</strong> qu'on vous remette votre contrat — relancez par email si nécessaire. La trace écrite vous protège en cas de litige. Un employeur sérieux n'y verra aucun problème.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F1922','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Période d'essai</div><div class="art-src-url">service-public.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://code.travail.gouv.fr','_blank')"><div class="art-src-ico">⚖️</div><div class="art-src-info"><div class="art-src-name">Code du Travail numérique</div><div class="art-src-url">code.travail.gouv.fr</div></div></div>
        </div>`;}
    },
    {
      id:'rsa-etudiant', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>', title:'RSA & aides sociales pour étudiants',
      sub:'Conditions RSA · Aides CAF · Prime d\'activité',
      content: function(){return `
        <div class="art-lead">Les étudiants peuvent bénéficier de plusieurs aides sociales souvent méconnues — RSA (sous conditions strictes), prime d'activité si vous travaillez, et aides ponctuelles du CROUS.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Aide</th><th>Conditions étudiants</th><th>Montant 2026</th></tr></thead><tbody>
          <tr><td>RSA</td><td>Interdit aux -25 ans <strong>sauf</strong> parent isolé ou si travaillé 2 ans sur 3</td><td>635,71 €/mois</td></tr>
          <tr><td>Prime d'activité</td><td>Accessible si revenus d'activité > <strong>0,5 × SMIC</strong>/mois</td><td>Variable selon revenus</td></tr>
          <tr><td>Aide d'urgence CROUS</td><td>Situation financière difficile ponctuelle</td><td>Variable</td></tr>
          <tr><td>Aide à la complémentaire santé</td><td>CSS si revenus &lt; 14 211 €/an</td><td>Gratuite ou ~1 €/mois</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-blue"><div class="art-hl-h">💡 Focus prime d'activité — la plus accessible</div><div class="art-hl-p">Vous travaillez à côté de vos études ? Si vos revenus dépassent <strong>0,5 × SMIC soit ~900 €/mois</strong>, vous pouvez percevoir 100 à 200 €/mois de prime d'activité.<br>Exemple : job étudiant à 1 000 €/mois → prime d'activité estimée à <strong>~130 €/mois</strong><br>→ Simulez en 3 minutes sur <strong>caf.fr</strong></div></div>
        <div class="art-h2">📋 Démarches pour les aides CAF</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Simuler sur caf.fr</div><div class="art-step-d">Le simulateur CAF calcule toutes vos aides en 5 minutes : APL, prime d'activité, CSS, RSA. <strong>Gratuit et sans engagement.</strong></div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Créer son espace CAF</div><div class="art-step-d">Sur <strong>caf.fr</strong> avec votre numéro de Sécurité sociale. Toutes les demandes se font en ligne, sans RDV.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Déclarer ses revenus trimestriellement</div><div class="art-step-d">La prime d'activité se déclare tous les <strong>3 mois</strong>. Aucune déclaration = aucun versement. Ne pas oublier !</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Contacter le CROUS en urgence</div><div class="art-step-d">En cas de difficultés ponctuelles graves, une <strong>aide d'urgence CROUS</strong> peut être accordée rapidement, sans condition de revenus stricte.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Si vous travaillez à côté de vos études, simulez votre <strong>prime d'activité sur caf.fr</strong>. Dès 0,5 × SMIC de revenus mensuels, elle peut vous rapporter 100 à 200 €/mois.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.caf.fr','_blank')"><div class="art-src-ico">🏛️</div><div class="art-src-info"><div class="art-src-name">CAF.fr — Simulateur d'aides</div><div class="art-src-url">caf.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F31713','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Prime d'activité</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    },
    {
      id:'securite-sociale-etudiant', ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></svg>', title:'Sécurité sociale étudiant — Ce qui a changé',
      sub:'Rattachement régime général · Droits CPAM · Démarches',
      content: function(){return `
        <div class="art-lead">Depuis 2019, les étudiants sont rattachés au <strong>régime général de la Sécurité sociale</strong> — comme tout salarié. La mutuelle étudiante obligatoire a disparu. Mais vos droits CPAM restent complets.</div>
        <div class="art-table-wrap"><table class="art-table"><thead><tr><th>Point</th><th>Détail 2026</th></tr></thead><tbody>
          <tr><td>Régime d'affiliation</td><td>Régime général CPAM (même que les salariés)</td></tr>
          <tr><td>Mutuelle étudiante obligatoire</td><td>Supprimée depuis 2019</td></tr>
          <tr><td>Carte Vitale</td><td>À demander sur <strong>ameli.fr</strong> si première fois</td></tr>
          <tr><td>Médecin traitant</td><td>Obligatoire pour remboursements complets</td></tr>
          <tr><td>Téléconsultation</td><td>Remboursée si médecin traitant déclaré</td></tr>
          <tr><td>Frais de scolarité</td><td>Exonération partielle pour boursiers échelon 1–7</td></tr>
        </tbody></table></div>
        <div class="art-hl art-hl-amber"><div class="art-hl-h">⚠️ Ce qui change avec le régime général étudiant</div><div class="art-hl-p">✅ <strong>Pas de cotisation</strong> à une mutuelle étudiante obligatoire (supprimée en 2019)<br>✅ Vos droits CPAM restent <strong>identiques à ceux d'un salarié</strong><br>⚠️ Sans médecin traitant déclaré, vos remboursements sont réduits de <strong>70 % à 30 %</strong><br>⚠️ La carte Vitale n'est pas automatique — faites la demande sur <strong>ameli.fr</strong></div></div>
        <div class="art-h2">📋 Démarches essentielles à la rentrée</div>
        <ul class="art-steps">
          <li class="art-step"><div class="art-step-n">1</div><div><div class="art-step-t">Créer son compte ameli.fr</div><div class="art-step-d">Sur <strong>ameli.fr → Créer mon compte</strong> avec votre numéro de Sécurité sociale. Accès à tous vos remboursements.</div></div></li>
          <li class="art-step"><div class="art-step-n">2</div><div><div class="art-step-t">Demander sa carte Vitale</div><div class="art-step-d">Si première carte : formulaire sur ameli.fr + photo d'identité. Délai : <strong>3 à 6 semaines</strong>. En attendant, l'attestation papier suffit.</div></div></li>
          <li class="art-step"><div class="art-step-n">3</div><div><div class="art-step-t">Déclarer un médecin traitant</div><div class="art-step-d">Absolument prioritaire — sans lui, remboursements réduits à 30 %. Formulaire Cerfa à remettre au médecin ou à saisir sur ameli.fr.</div></div></li>
          <li class="art-step"><div class="art-step-n">4</div><div><div class="art-step-t">Vérifier l'éligibilité à la CSS</div><div class="art-step-d">Si revenus &lt; 14 211 €/an, simulez la <strong>Complémentaire Santé Solidaire</strong> sur ameli.fr — gratuite ou 1 €/mois.</div></div></li>
        </ul>
        <div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d'Eva</div><div class="art-eva-text">Déclarez un <strong>médecin traitant dès votre arrivée</strong> dans une nouvelle ville — sans lui, vos remboursements sont réduits à 30 %. Démarche gratuite et rapide sur ameli.fr.</div></div></div>
        <div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>
          <div class="art-src-row" onclick="window.open('https://www.ameli.fr','_blank')"><div class="art-src-ico">🏥</div><div class="art-src-info"><div class="art-src-name">Ameli.fr — Espace assuré</div><div class="art-src-url">ameli.fr</div></div></div>
          <div class="art-src-row" onclick="window.open('https://www.service-public.fr/particuliers/vosdroits/F20543','_blank')"><div class="art-src-ico">🇫🇷</div><div class="art-src-info"><div class="art-src-name">Service-Public — Sécurité sociale étudiants</div><div class="art-src-url">service-public.fr</div></div></div>
        </div>`;}
    }
  ]
};

/* ═══ Encyclopédie EVA : générateur d'articles + onglets Salarié / Demandeur d'emploi ═══ */
function evadSP(q){ return 'https://www.service-public.gouv.fr/particuliers/recherche?keyword='+encodeURIComponent(q); }
function evadMk(o){
  return { id:o.id, aud:o.aud, ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+o.ico+'</svg>',
    title:o.title, sub:o.sub,
    content:function(){
      var h='<div class="art-lead">'+o.lead+'</div>';
      (o.sec||[]).forEach(function(s){
        if(s.h) h+='<div class="art-h2">'+s.h+'</div>';
        if(s.p) h+='<div class="art-p">'+s.p+'</div>';
        if(s.t) h+='<div class="art-table-wrap"><table class="art-table"><thead><tr><th>'+s.t[0][0]+'</th><th>'+s.t[0][1]+'</th></tr></thead><tbody>'+s.t.slice(1).map(function(r){ return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>'; }).join('')+'</tbody></table></div>';
        if(s.steps) h+='<ul class="art-steps">'+s.steps.map(function(x,i){ return '<li class="art-step"><div class="art-step-n">'+(i+1)+'</div><div><div class="art-step-t">'+x[0]+'</div><div class="art-step-d">'+x[1]+'</div></div></li>'; }).join('')+'</ul>';
        if(s.hl) h+='<div class="art-hl art-hl-'+(s.hl[2]||'blue')+'"><div class="art-hl-h">'+s.hl[0]+'</div><div class="art-hl-p">'+s.hl[1]+'</div></div>';
      });
      if(o.eva) h+='<div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d\'Eva</div><div class="art-eva-text">'+o.eva+'</div></div></div>';
      h+='<div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>'+(o.src||[]).map(function(x){
        var url=x[1].indexOf('http')===0?x[1]:evadSP(x[1]); var dom=url.replace(/^https?:\/\/(www\.)?/,'').split('/')[0];
        return '<div class="art-src-row" onclick="window.open(\''+url+'\',\'_blank\')"><div class="art-src-ico">'+(x[2]||'🏛️')+'</div><div class="art-src-info"><div class="art-src-name">'+x[0]+'</div><div class="art-src-url">'+dom+'</div></div></div>';
      }).join('')+'</div>';
      return h;
    } };
}
/* Onglets du profil « Salarié & Demandeur d'emploi » */
var _evadSubTab='sal';
var EVAD_TABS={ salarie:[
  ['sal','Salarié','Contrat, paie, congés, santé','<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/><path d="M3 13h18"/>'],
  ['dem','Demandeur d\'emploi','Chômage, aides, recherche','<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8v6M8 11h6"/>'] ] };
function evadCurArticles(){
  var all=EVAD_ARTICLES[_evadCurrentProfile]||[], T=EVAD_TABS[_evadCurrentProfile];
  if(!T) return all;
  return all.filter(function(a){ return !a.aud || a.aud==='both' || a.aud===_evadSubTab; });
}
function evadDrawTabs(){
  var wrap=document.getElementById('evad-subtabs'), T=EVAD_TABS[_evadCurrentProfile];
  var sw=document.querySelector('#s-eva-droits-list .az-search-wrap'); if(!sw) return;
  if(!wrap){ wrap=document.createElement('div'); wrap.id='evad-subtabs'; }
  if(wrap.nextSibling!==sw) sw.parentNode.insertBefore(wrap,sw);
  if(!T){ wrap.style.display='none'; wrap.innerHTML=''; return; }
  var p=EVAD_PROFILES[_evadCurrentProfile]||{}, all=EVAD_ARTICLES[_evadCurrentProfile]||[];
  wrap.style.display='';
  wrap.innerHTML='<div class="evst">'+T.map(function(t){
    var n=all.filter(function(a){ return !a.aud || a.aud==='both' || a.aud===t[0]; }).length;
    return '<button type="button" class="evst-b evst-'+t[0]+(t[0]===_evadSubTab?' on':'')+'" data-k="'+t[0]+'"><span class="evst-ring"></span>'
      +'<span class="evst-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+t[3]+'</svg></span>'
      +'<span class="evst-t">'+t[1]+'</span><span class="evst-s">'+t[2]+'</span><span class="evst-n">'+n+' articles</span></button>';
  }).join('')+'</div>';
  wrap.querySelector('.evst').style.setProperty('--evst-a',p.accentDark||'#1e3a5f'); wrap.querySelector('.evst').style.setProperty('--evst-b',p.accentMid||'#1e40af');
  wrap.querySelectorAll('.evst-b').forEach(function(b){ b.onclick=function(){ _evadSubTab=b.getAttribute('data-k'); _evadActiveAlpha='ALL'; evadRefreshList(true); }; });
}
function evadRefreshList(fromTab){
  var arts=evadCurArticles();
  evadDrawTabs();
  var c=document.getElementById('evad-list-count'); if(c) c.textContent=arts.length+' thèmes classés A → Z';
  evadBuildAlphaBar(arts); evadRenderList(arts);
  if(fromTab){ var w=document.getElementById('evad-subtabs'); if(w) try{ var sp=w.parentNode; while(sp && sp!==document.body){ var o=getComputedStyle(sp).overflowY; if(o==='auto'||o==='scroll') break; sp=sp.parentNode; }
    if(sp && sp!==document.body){ var d=w.getBoundingClientRect().top-sp.getBoundingClientRect().top-96; sp.scrollBy({ top:d, behavior:'smooth' }); } }catch(e){} }
}



var _EV_ENG={}, _EV_QZ={};
/* ═══ Refonte Droits & aides : modèle d'article officiel ═══
   Intro → Le droit en bref → Qui ? → Quoi ? → Quand ? → Comment faire → Pourquoi c'est important
   → Conseil d'Eva → Sources officielles datées → (checklist en fin d'article, mini hero) */
function evadMk3(o){
  _EV_ENG[o.id]={ checklist:o.check?{title:o.check[0],items:o.check[1]}:undefined, estimator:o.est, related:o.rel };
  if(o.quiz) _EV_QZ[o.id]=o.quiz.map(function(x){ return { q:x[0], r:x[1] }; });
  return { id:o.id, aud:o.aud, v3:true, title:o.title, sub:o.sub,
    ico:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+o.ico+'</svg>',
    content:function(){
      var h='<div class="art-lead">'+o.intro+'</div>';
      var H=function(t){ h+='<div class="art-h2">'+t+'</div>'; };
      var P=function(t){ h+='<div class="art-p">'+t+'</div>'; };
      var T=function(t){ h+='<div class="art-table-wrap"><table class="art-table"><thead><tr><th>'+t[0][0]+'</th><th>'+t[0][1]+'</th></tr></thead><tbody>'+t.slice(1).map(function(r){ return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>'; }).join('')+'</tbody></table></div>'; };
      if(o.loi){ H('⚖️ Le droit en bref'); P(o.loi[0]); if(o.loi[1]) h+='<div class="art-ref">📜 '+o.loi[1]+'</div>'; }
      if(o.qui){ H('👥 Qui est concerné ?'); if(typeof o.qui==='string') P(o.qui); else h+='<ul class="art-list">'+o.qui.map(function(x){ return '<li>'+x+'</li>'; }).join('')+'</ul>'; }
      if(o.quoi){ H('📌 Quoi : ce que ça vous apporte'); if(o.quoi.p) P(o.quoi.p); if(o.quoi.t) T(o.quoi.t); if(o.quoi.ex) h+='<div class="art-hl art-hl-blue"><div class="art-hl-h">🧮 Exemple</div><div class="art-hl-p">'+o.quoi.ex+'</div></div>'; }
      if(o.quand){ H('Quand : les délais'); if(o.quand.p) P(o.quand.p); if(o.quand.t) T(o.quand.t); }
      if(o.comment){ H('✅ Comment faire'); h+='<ul class="art-steps">'+o.comment.map(function(x,i){ return '<li class="art-step"><div class="art-step-n">'+(i+1)+'</div><div><div class="art-step-t">'+x[0]+'</div><div class="art-step-d">'+x[1]+'</div></div></li>'; }).join('')+'</ul>'; }
      if(o.pourquoi) h+='<div class="art-hl art-hl-amber"><div class="art-hl-h">⚠️ Pourquoi c\'est important</div><div class="art-hl-p">'+o.pourquoi+'</div></div>';
      if(o.eva) h+='<div class="art-eva"><div class="art-eva-av">EVA</div><div><div class="art-eva-label">💡 Le conseil d\'Eva</div><div class="art-eva-text">'+o.eva+'</div></div></div>';
      h+='<div class="art-sources"><div class="art-src-label">📚 Sources officielles</div>'+(o.src||[]).map(function(x){
        var dom=x[1].replace(/^https?:\/\/(www\.)?/,'').split('/')[0];
        return '<div class="art-src-row" onclick="window.open(\''+x[1]+'\',\'_blank\')"><div class="art-src-ico">'+(x[3]||'🇫🇷')+'</div><div class="art-src-info"><div class="art-src-name">'+x[0]+'</div><div class="art-src-url">'+dom+(x[2]?' · <b class="art-src-date">'+x[2]+'</b>':'')+'</div></div></div>';
      }).join('')+'</div>';
      return h;
    } };
}
/* Remplace (ou ajoute) un article dans un profil, en gardant sa place */
function evadPut(profile,art){ var L=EVAD_ARTICLES[profile], i=L.findIndex(function(a){ return a.id===art.id; }); if(i>-1) L[i]=art; else L.push(art); }

/* ── Profil Salarié & Demandeur d'emploi : nouveaux articles (onglet Demandeur d'emploi + communs) ── */
(function(){
var I={ doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  euro:'<path d="M18 7a7 7 0 1 0 0 10"/><path d="M4 10h9M4 14h9"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  trend:'<path d="M3 7l6 6 4-4 8 8"/><path d="M21 11v6h-6"/>', door:'<path d="M14 3h5v18h-5"/><path d="M10 17l5-5-5-5M15 12H3"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9 11h6M12 8v6"/>',
  shield:'<path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>', scale:'<path d="M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6z"/>',
  hands:'<path d="M12 21s-8-5-8-11a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6-8 11-8 11z"/>', car:'<path d="M5 17h14M6 17l1-6h10l1 6"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
  child:'<circle cx="12" cy="6" r="3"/><path d="M8 21v-6l-2-3h12l-2 3v6"/>', book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/>',
  access:'<circle cx="12" cy="4" r="2"/><path d="M12 7v6l4 5M12 13l-4 5M7 10h10"/>', life:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>'
};
var M=evadMk, A=[
M({ id:'plein-emploi', aud:'dem', ico:I.doc, title:'Loi plein emploi — Inscription et obligations', sub:'Inscription · Contrat d\'engagement · Activités · Sanctions',
  lead:'Depuis le <strong>1er janvier 2025</strong>, la loi pour le plein emploi a changé l\'accompagnement des demandeurs d\'emploi. Mieux vaut connaître vos engagements… et vos droits.',
  sec:[{h:'👥 Qui est inscrit à France Travail ?',p:'En plus des demandeurs d\'emploi qui s\'inscrivent eux-mêmes, sont désormais <strong>inscrits automatiquement</strong> : les allocataires du RSA, les jeunes suivis par une mission locale et les personnes accompagnées par Cap emploi.'},
    {h:'📝 Le contrat d\'engagement',p:'Avec votre conseiller, vous signez un <strong>contrat d\'engagement</strong> qui fixe votre plan d\'action : objectifs, démarches, formations. Pour les allocataires du RSA, il prévoit en principe <strong>15 heures d\'activités par semaine</strong> (ateliers, immersions, formation…), adaptables selon votre situation.'},
    {h:'⚠️ Les sanctions',hl:['La « suspension-remobilisation »','En cas de manquement, votre allocation peut être <strong>suspendue</strong> plutôt que supprimée. Si vous reprenez vos démarches, les sommes peuvent être <strong>reversées</strong>. Répondez toujours aux convocations et gardez une trace de vos démarches.','amber']}],
  eva:'Le contrat d\'engagement se <strong>négocie</strong> : si une contrainte (garde d\'enfant, santé, transport) vous empêche de tenir un engagement, signalez-la à votre conseiller avant qu\'elle ne devienne un manquement.',
  src:[['Service-Public — Loi plein emploi','loi pour le plein emploi','🇫🇷'],['France Travail','https://www.francetravail.fr','🏛️']] }),
M({ id:'droits-rechargeables', aud:'dem', ico:I.refresh, title:'Droits rechargeables — Prolonger son chômage', sub:'Principe · Conditions · Rechargement',
  lead:'Chaque période travaillée pendant votre indemnisation peut vous apporter de <strong>nouveaux droits</strong>. C\'est le principe des droits rechargeables.',
  sec:[{h:'🔁 Comment ça marche',p:'Quand vous retravaillez tout en étant indemnisé(e), les jours non indemnisés sont <strong>reportés</strong> : votre fin de droits recule d\'autant.'},
    {h:'📌 Le rechargement',t:[['Condition','Règle'],['Quand ?','À l\'épuisement de vos droits'],['Durée travaillée','Au moins <strong>130 jours ou 910 heures</strong> (environ 6 mois)'],['Démarche','France Travail examine vos droits automatiquement à la fin de l\'indemnisation']]}],
  eva:'Accepter des missions courtes pendant le chômage n\'est jamais du temps perdu : vous gagnez un revenu <strong>et</strong> vous allongez votre filet de sécurité.',
  src:[['Service-Public — Droits rechargeables','droits rechargeables assurance chomage','🇫🇷'],['Unédic','https://www.unedic.org','📊']] }),
M({ id:'cumul-are', aud:'dem', ico:I.euro, title:'Cumul ARE et salaire — Reprendre un emploi', sub:'Calcul · Plafond · Déclaration',
  lead:'Reprendre un travail ne fait pas perdre toute son allocation : l\'ARE peut se <strong>cumuler</strong> avec un salaire, sous conditions.',
  sec:[{h:'🧮 Le calcul',p:'France Travail retire de votre allocation mensuelle <strong>70 % du salaire brut</strong> de votre nouvelle activité. Le total (salaire + allocation) ne peut pas dépasser votre ancien salaire de référence.'},
    {h:'',hl:['🧮 Exemple','ARE mensuelle de 1 200 € et reprise à 800 € brut : 1 200 − (70 % × 800) = <strong>640 € d\'allocation</strong> + 800 € de salaire.','blue']},
    {h:'📋 Les bons réflexes',steps:[['Déclarer chaque mois','Indiquez heures et salaire lors de l\'actualisation, même si la paie n\'est pas encore versée.'],['Envoyer les bulletins','Transmettez vos bulletins de salaire dans votre espace France Travail.'],['Suivre ses droits','Les jours non versés sont reportés : votre fin de droits recule.']]}],
  eva:'Une activité réduite n\'est pas un piège : elle vous fait gagner plus <strong>et</strong> prolonge vos droits.',
  src:[['Service-Public — Cumul allocation et salaire','cumul allocation chomage salaire','🇫🇷']] }),
M({ id:'degressivite', aud:'dem', ico:I.trend, title:'Dégressivité de l\'ARE — Qui est concerné ?', sub:'Seuil · 7e mois · Exceptions',
  lead:'Pour les plus hautes allocations, l\'ARE peut <strong>baisser de 30 %</strong> à partir du 7e mois. Mais beaucoup de demandeurs ne sont pas concernés.',
  sec:[{h:'📌 Les règles 2026',t:[['Élément','Règle'],['Âge','Moins de <strong>55 ans</strong> à la fin du contrat'],['Seuil','Allocation journalière supérieure à <strong>92,57 €</strong>'],['Baisse','Jusqu\'à <strong>30 %</strong>, sans descendre sous le seuil'],['Début','À partir du <strong>7e mois</strong> d\'indemnisation']]},
    {h:'✅ Pas de dégressivité si…',p:'Vous aviez <strong>55 ans ou plus</strong> à la fin de votre contrat, ou votre allocation est sous le seuil. Une formation suivie pendant le chômage peut aussi reporter la baisse.'}],
  eva:'Vérifiez votre allocation journalière sur votre notification de droits : si elle est sous le seuil, la dégressivité ne vous concerne <strong>pas du tout</strong>.',
  src:[['Unédic — Règles d\'indemnisation','https://www.unedic.org','📊'],['Service-Public — Dégressivité','degressivite allocation chomage','🇫🇷']] }),
M({ id:'carence-differe', aud:'dem', ico:I.clock, title:'Délai de carence et différés — Quand arrive le 1er paiement ?', sub:'7 jours · Congés payés · Indemnités',
  lead:'Votre premier versement n\'arrive pas le lendemain de la fin du contrat. Trois délais peuvent s\'additionner.',
  sec:[{h:'⏱️ Les trois délais',t:[['Délai','Ce qu\'il faut savoir'],['Délai d\'attente','<strong>7 jours</strong> dans tous les cas'],['Différé congés payés','Calculé à partir de l\'indemnité de congés payés reçue'],['Différé spécifique','Lié aux indemnités de rupture supérieures au minimum légal, <strong>150 jours maximum</strong> (75 en licenciement économique)']]},
    {h:'',hl:['💡 Bon à savoir','Les indemnités <strong>légales</strong> de licenciement ou de rupture conventionnelle ne créent pas de différé spécifique : seule la part qui dépasse le minimum légal compte.','blue']}],
  eva:'Inscrivez-vous <strong>dès le lendemain</strong> de la fin du contrat : les délais courent pendant ce temps-là, autant ne pas en ajouter.',
  src:[['Service-Public — Délai d\'attente et différé','delai attente differe indemnisation chomage','🇫🇷']] }),
M({ id:'demission-legitime', aud:'dem', ico:I.door, title:'Démission légitime — Toucher le chômage après une démission', sub:'Cas reconnus · Réexamen à 121 jours',
  lead:'Une démission ne prive pas toujours du chômage. Certaines démissions sont dites <strong>légitimes</strong> et ouvrent droit à l\'ARE.',
  sec:[{h:'✅ Exemples de cas reconnus',p:'Suivre son conjoint qui change de lieu de travail, salaires non payés (avec une décision du juge), violences conjugales obligeant à déménager, démission peu après une embauche qui suivait un licenciement, ou projet de reconversion validé (démission-reconversion).'},
    {h:'🔄 Pas dans ces cas ? Le réexamen',p:'Après <strong>121 jours</strong> de chômage, vous pouvez demander un réexamen de votre situation, en montrant vos démarches de recherche d\'emploi. Une instance paritaire peut alors vous accorder l\'ARE.'}],
  eva:'Avant de démissionner, <strong>vérifiez votre cas précis</strong> auprès de France Travail : une démission non légitime, c\'est au minimum 4 mois sans allocation.',
  src:[['Service-Public — Démission et chômage','demission legitime chomage','🇫🇷']] }),
M({ id:'maladie-chomage', aud:'dem', ico:I.heart, title:'Arrêt maladie pendant le chômage', sub:'Indemnités · Déclaration · Droits reportés',
  lead:'Tomber malade pendant le chômage ne fait pas perdre ses droits : l\'ARE est <strong>suspendue</strong>, et l\'Assurance maladie prend le relais.',
  sec:[{h:'📋 Ce qui se passe',steps:[['Envoyer l\'arrêt','Transmettez l\'arrêt de travail à votre CPAM dans les délais habituels.'],['Le déclarer','Signalez l\'arrêt à France Travail lors de votre actualisation.'],['Indemnités journalières','La CPAM peut vous verser des indemnités, calculées à partir de vos anciens salaires.'],['Droits reportés','Les jours d\'arrêt ne sont pas décomptés de vos droits ARE : ils reprennent après.']]}],
  eva:'Ne cumulez jamais ARE et indemnités journalières sur la même période : tout trop-perçu vous serait réclamé.',
  src:[['Ameli — Arrêt de travail','https://www.ameli.fr','🏥'],['Service-Public — Maladie et chômage','arret maladie chomage','🇫🇷']] }),
M({ id:'retraite-chomage', aud:'dem', ico:I.clock, title:'Retraite et chômage — Vos trimestres comptent', sub:'Trimestres · Points complémentaires',
  lead:'Les périodes de chômage <strong>comptent pour la retraite</strong>. Beaucoup l\'ignorent, et c\'est une bonne nouvelle.',
  sec:[{h:'📊 Ce qui est validé',t:[['Période','Effet sur la retraite'],['Chômage indemnisé','<strong>1 trimestre par tranche de 50 jours</strong> indemnisés (4 maximum par an)'],['Chômage non indemnisé','Validation limitée dans le temps'],['Retraite complémentaire','Des <strong>points Agirc-Arrco</strong> sont attribués pendant l\'indemnisation']]}],
  eva:'Vérifiez votre relevé de carrière sur <strong>info-retraite.fr</strong> : une période de chômage oubliée se corrige, mais plus vite elle est repérée, mieux c\'est.',
  src:[['Info-retraite — Relevé de carrière','https://www.info-retraite.fr','👵'],['Service-Public — Chômage et retraite','chomage retraite trimestres','🇫🇷']] }),
M({ id:'mediateur-ft', aud:'dem', ico:I.scale, title:'Médiateur de France Travail — Contester sans procès', sub:'Réclamation · Médiation · Gratuit',
  lead:'Un désaccord avec France Travail (radiation, trop-perçu, refus d\'aide) ? Avant le tribunal, il existe un recours <strong>gratuit</strong> : le médiateur.',
  sec:[{h:'📋 Les étapes',steps:[['Réclamation','Écrivez d\'abord à votre agence ou à votre conseiller, en gardant une copie.'],['Médiateur régional','Sans réponse satisfaisante, saisissez le médiateur de votre région, par écrit, avec les pièces.'],['Recommandation','Le médiateur examine votre dossier et peut recommander une solution à France Travail.']]},
    {h:'',hl:['💡 À savoir','La médiation est gratuite et ne vous empêche pas d\'engager ensuite un autre recours si besoin.','blue']}],
  eva:'Joignez toujours vos preuves (courriers, captures d\'actualisation, attestations) : un dossier clair se règle beaucoup plus vite.',
  src:[['France Travail — Le médiateur','https://www.francetravail.fr','🏛️']] }),
M({ id:'ass', aud:'dem', ico:I.life, title:'ASS — Allocation de solidarité spécifique', sub:'Fin de droits · Conditions · Avenir',
  lead:'Quand vos droits au chômage sont épuisés, l\'<strong>ASS</strong> peut prendre le relais, sous conditions de ressources et d\'activité passée.',
  sec:[{h:'📌 Conditions principales',t:[['Condition','Exigence'],['Situation','Avoir épuisé ses droits à l\'ARE'],['Activité passée','<strong>5 ans</strong> d\'activité salariée dans les 10 ans avant la fin du contrat'],['Ressources','Sous un plafond, seul(e) ou en couple'],['Recherche d\'emploi','Être inscrit(e) et en recherche active']]},
    {h:'🧭 Son avenir',hl:['À vérifier','La suppression de l\'ASS a été annoncée en 2024, avec une bascule vers le RSA. Vérifiez sa situation actuelle sur Service-Public avant toute décision.','amber']}],
  eva:'L\'ASS permet aussi de <strong>valider des trimestres de retraite</strong>, ce que le RSA ne fait pas. Un argument à garder en tête.',
  src:[['Service-Public — ASS','allocation de solidarite specifique','🇫🇷']] }),
M({ id:'aides-mobilite', aud:'dem', ico:I.car, title:'Aides à la mobilité de France Travail', sub:'Transport · Repas · Hébergement',
  lead:'France Travail peut rembourser vos frais de <strong>transport, repas et hébergement</strong> pour un entretien, un concours, une formation ou une reprise d\'emploi. Pourtant, moins d\'un tiers des demandeurs éligibles connaissent ces aides.',
  sec:[{h:'✅ Pour quoi ?',p:'Un entretien d\'embauche, un concours public, une prestation ou une formation validée, ou la reprise d\'un emploi (CDI, CDD ou intérim d\'une certaine durée).'},
    {h:'📍 Conditions habituelles',p:'Le lieu doit être éloigné de chez vous (en général <strong>plus de 60 km aller-retour ou 2 h de trajet</strong>), et l\'aide dépend de vos ressources. Un plafond annuel s\'applique.'},
    {h:'📋 Démarche',steps:[['Demander à temps','Faites la demande dans votre espace France Travail, idéalement avant le déplacement.'],['Garder les justificatifs','Billets, tickets, factures d\'hôtel : tout se justifie.']]}],
  eva:'Un entretien loin de chez vous ? Demandez l\'aide <strong>avant</strong> de renoncer : c\'est exactement pour ça qu\'elle existe.',
  src:[['France Travail — Aides à la mobilité','https://www.francetravail.fr','🏛️'],['Service-Public — Aide à la mobilité','aide mobilite demandeur emploi','🇫🇷']] }),
M({ id:'agepi', aud:'dem', ico:I.child, title:'AGEPI — Aide à la garde d\'enfants', sub:'Parents isolés · Reprise d\'emploi · Formation',
  lead:'Parent isolé et de retour à l\'emploi ou en formation ? L\'<strong>AGEPI</strong> aide à payer la garde de vos jeunes enfants. Elle reste très peu demandée.',
  sec:[{h:'📌 Conditions principales',t:[['Condition','Exigence'],['Situation familiale','Élever seul(e) au moins un enfant de <strong>moins de 10 ans</strong>'],['Projet','Reprise d\'emploi ou entrée en formation'],['Ressources','Sous conditions, selon votre situation']]},
    {h:'📋 Démarche',p:'La demande se fait auprès de France Travail, dans un délai court après la reprise d\'emploi ou le début de la formation. Le montant dépend du nombre d\'enfants et de votre temps de travail.'}],
  eva:'Faites la demande <strong>dès la signature</strong> du contrat : un retard peut vous faire perdre l\'aide.',
  src:[['France Travail — AGEPI','https://www.francetravail.fr','🏛️'],['Service-Public — AGEPI','agepi garde enfant parent isole','🇫🇷']] }),
M({ id:'permis-ft', aud:'dem', ico:I.car, title:'Aide au permis de conduire de France Travail', sub:'Conditions · Projet · Démarche',
  lead:'Le permis vous manque pour décrocher un emploi ? France Travail peut <strong>financer une partie</strong> de votre permis B.',
  sec:[{h:'📌 Conditions habituelles',p:'Être inscrit(e) comme demandeur d\'emploi depuis un certain temps, avoir un projet professionnel qui <strong>nécessite le permis</strong>, et des ressources limitées. L\'aide est plafonnée et versée à l\'auto-école.'},
    {h:'📋 Démarche',steps:[['En parler','Expliquez à votre conseiller pourquoi le permis est nécessaire à votre projet.'],['Devis','Fournissez un devis d\'une auto-école.'],['Décision','France Travail étudie votre dossier et vous répond.']]}],
  eva:'Votre argument clé : montrez des <strong>offres d\'emploi précises</strong> qui exigent le permis. C\'est ce qui convainc.',
  src:[['France Travail — Aide au permis','https://www.francetravail.fr','🏛️']] }),
M({ id:'are-formation', aud:'dem', ico:I.book, title:'Se former pendant le chômage — ARE et rémunération', sub:'AREF · Rémunération de formation',
  lead:'Suivre une formation pendant le chômage, c\'est possible <strong>sans perdre ses revenus</strong>, à condition que la formation soit validée.',
  sec:[{h:'💶 Vos revenus pendant la formation',t:[['Situation','Ce que vous percevez'],['Indemnisé(e) par l\'ARE','Votre allocation continue (AREF) si la formation est validée'],['Non indemnisé(e)','Une <strong>rémunération de formation</strong> peut être versée sous conditions'],['Frais','Transport ou hébergement parfois pris en charge']]},
    {h:'',hl:['⚠️ Condition clé','La formation doit être <strong>validée par votre conseiller</strong> et inscrite dans votre projet, avant son démarrage.','amber']}],
  eva:'Faites valider la formation <strong>avant</strong> de vous inscrire : c\'est ce qui garantit le maintien de vos revenus.',
  src:[['France Travail — Se former','https://www.francetravail.fr','🏛️'],['Service-Public — Formation et chômage','formation demandeur emploi remuneration','🇫🇷']] }),
M({ id:'prime-activite', aud:'both', ico:I.euro, title:'Prime d\'activité — Le complément de revenus', sub:'Conditions · Simulation · Déclaration',
  lead:'Vous travaillez avec de petits revenus ? La <strong>prime d\'activité</strong> complète votre salaire chaque mois. Beaucoup de personnes y ont droit sans le savoir.',
  sec:[{h:'👥 Qui peut en bénéficier ?',p:'Les personnes de <strong>18 ans ou plus</strong> qui travaillent (salariés, indépendants, et sous conditions les étudiants et apprentis), avec des revenus modestes. Le montant dépend de vos revenus et de votre foyer.'},
    {h:'📋 Démarche',steps:[['Simuler','Faites la simulation sur caf.fr (ou msa.fr) : 5 minutes suffisent.'],['Demander','Faites la demande en ligne si la simulation est positive.'],['Déclarer','Déclarez vos revenus <strong>tous les 3 mois</strong> pour continuer à la percevoir.']]}],
  eva:'Refaites la simulation à <strong>chaque changement</strong> (nouveau contrat, temps partiel, naissance) : le droit peut s\'ouvrir du jour au lendemain.',
  src:[['CAF — Prime d\'activité','https://www.caf.fr','🏠'],['Service-Public — Prime d\'activité','prime d activite','🇫🇷']] }),
M({ id:'rqth', aud:'both', ico:I.access, title:'RQTH — Reconnaissance de travailleur handicapé', sub:'MDPH · Aides Agefiph · Droits',
  lead:'La <strong>RQTH</strong> ouvre des droits concrets au travail. Elle concerne bien plus de monde qu\'on ne le croit : maladies chroniques, troubles invisibles, séquelles d\'accident…',
  sec:[{h:'✅ Ce qu\'elle apporte',t:[['Avantage','Détail'],['Accompagnement','Cap emploi, en plus de France Travail'],['Aides financières','Aides de l\'<strong>Agefiph</strong> (aménagement de poste, formation, mobilité)'],['Emploi','Les entreprises de 20 salariés et plus doivent employer des travailleurs handicapés'],['Licenciement','Préavis doublé, dans la limite de 3 mois']]},
    {h:'📋 Démarche',p:'La demande se fait auprès de la <strong>MDPH</strong> de votre département, avec un certificat médical. La reconnaissance est accordée pour une durée limitée ou sans limite selon les cas.'}],
  eva:'La RQTH est <strong>confidentielle</strong> : vous n\'êtes jamais obligé(e) d\'en parler à votre employeur. Vous choisissez quand et si vous l\'utilisez.',
  src:[['Agefiph','https://www.agefiph.fr','♿'],['Service-Public — RQTH','reconnaissance qualite travailleur handicape','🇫🇷']] }),
M({ id:'csp', aud:'both', ico:I.shield, title:'CSP — Contrat de sécurisation professionnelle', sub:'Licenciement économique · Allocation · Accompagnement',
  lead:'En cas de licenciement économique, votre employeur doit vous proposer le <strong>CSP</strong>. Bien choisi, il est souvent plus avantageux que le chômage classique.',
  sec:[{h:'📌 L\'essentiel',t:[['Élément','Règle'],['Qui ?','Licenciement économique dans une entreprise de moins de 1 000 salariés (ou en redressement ou liquidation)'],['Délai de réflexion','<strong>21 jours</strong> pour accepter ou refuser'],['Allocation','<strong>75 % du salaire de référence</strong> pendant 12 mois, si vous avez au moins 1 an d\'ancienneté'],['Accompagnement','Suivi renforcé par un conseiller dédié et formations']]},
    {h:'',hl:['⚠️ À savoir','Si vous acceptez le CSP, votre contrat est rompu d\'un commun accord, et une partie du préavis est versée à France Travail.','amber']}],
  eva:'Comparez avant de signer : <strong>CSP</strong> ou ARE classique. Avec au moins un an d\'ancienneté, l\'allocation du CSP est généralement plus élevée la première année.',
  src:[['Service-Public — CSP','contrat de securisation professionnelle','🇫🇷'],['Unédic','https://www.unedic.org','📊']] })
];
A.forEach(function(a){ EVAD_ARTICLES.salarie.push(a); });
var AUD={ are:'dem', conges:'sal', licenciement:'both', mutuelle:'both', rupture:'both', salaire:'sal', solde:'sal', teletravail:'sal' };
EVAD_ARTICLES.salarie.forEach(function(a){ if(!a.aud && AUD[a.id]) a.aud=AUD[a.id]; });
})();

/* ── Onglet Salarié : 36 nouveaux articles ── */
(function(){
var I={ doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
 hand:'<path d="M8 13V5a2 2 0 0 1 4 0v6M12 11V4a2 2 0 0 1 4 0v7M16 11V6a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L4 14a2 2 0 0 1 3.4-2L8 13"/>',
 half:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>', lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 pin:'<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>', euro:'<path d="M18 7a7 7 0 1 0 0 10"/><path d="M4 10h9M4 14h9"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', piggy:'<path d="M19 10c1 0 2 1 2 2v2h-2l-1 3h-3v-2H9v2H6l-1-3a6 6 0 0 1 5-9h3a6 6 0 0 1 6 5z"/><circle cx="15" cy="10" r=".8"/>',
 gift:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8S10 3 7.5 4.5 9 8 12 8zM12 8s2-5 4.5-3.5S15 8 12 8z"/>',
 fork:'<path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M17 3c-2 2-2 6 0 8v10"/>', receipt:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 bike:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h5l3 8M10 9l-1-3H7"/>', coffee:'<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', moon:'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>', baby:'<circle cx="12" cy="8" r="4"/><path d="M6 21a6 6 0 0 1 12 0"/><path d="M10 8h.01M14 8h.01"/>',
 hands:'<path d="M12 21s-8-5-8-11a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6-8 11-8 11z"/>', share:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m8.6 10.5 6.8-3.5M8.6 13.5l6.8 3.5"/>',
 bank:'<path d="M3 10 12 4l9 6M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18"/>', plug:'<path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5"/>',
 med:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 6V4h6v2M12 10v6M9 13h6"/>', warn:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
 steth:'<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>', team:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20c-.5-2.6-2-4.5-4.2-5.2"/>',
 gavel:'<path d="m14 13-7 7-3-3 7-7M13 4l7 7M10 7l7 7M16 2l6 6"/>', mega:'<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', door:'<path d="M14 3h5v18h-5"/><path d="M10 17l5-5-5-5M15 12H3"/>',
 senior:'<circle cx="12" cy="5" r="2.5"/><path d="M12 8v6l-3 7M12 14l3 7M8 11h8M17 11v10"/>'
};
var M=evadMk, SP=function(t,q){ return ['Service-Public — '+t,q,'🇫🇷']; }, CT=['Code du travail numérique','https://code.travail.gouv.fr','⚖️'];
var A=[
/* ── Contrat ── */
M({ id:'periode-essai', aud:'sal', ico:I.hand, title:'Période d\'essai — Durées et rupture', sub:'Durées · Renouvellement · Délai de prévenance',
 lead:'La période d\'essai permet à chacun de tester la relation de travail. Elle est <strong>encadrée</strong> : durée maximale, renouvellement et délai de prévenance.',
 sec:[{h:'⏱️ Durées maximales en CDI',t:[['Catégorie','Durée (renouvellement compris)'],['Ouvriers, employés','2 mois (4 mois)'],['Agents de maîtrise, techniciens','3 mois (6 mois)'],['Cadres','4 mois (8 mois)']]},
  {h:'',hl:['⚠️ Le renouvellement','Il n\'est possible qu\'une fois, s\'il est prévu par un accord de branche <strong>et</strong> par votre contrat, et avec votre <strong>accord écrit</strong>.','amber']},
  {h:'📣 Délai de prévenance de l\'employeur',t:[['Temps de présence','Délai'],['Moins de 8 jours','24 heures'],['8 jours à 1 mois','48 heures'],['Après 1 mois','2 semaines'],['Après 3 mois','1 mois']]}],
 eva:'Un renouvellement ne se présume jamais : <strong>refusez de signer</strong> si vous n\'êtes pas d\'accord, l\'employeur ne peut pas l\'imposer.',
 src:[SP('Période d\'essai','periode d essai salarie'),CT] }),
M({ id:'promesse-embauche', aud:'sal', ico:I.doc, title:'Promesse d\'embauche — Ce qui vous engage', sub:'Offre · Promesse unilatérale · Rétractation',
 lead:'Un e-mail « on vous embauche » peut déjà valoir contrat. Tout dépend de ce qu\'il contient.',
 sec:[{h:'📌 Deux situations différentes',t:[['Document','Effet'],['Offre de contrat','Précise le poste, la rémunération et la date. L\'employeur peut la retirer tant que vous ne l\'avez pas reçue ou avant la fin du délai qu\'il a fixé.'],['Promesse unilatérale','Vous offre le choix d\'accepter. Si l\'employeur se rétracte pendant votre délai de réponse, le contrat est <strong>quand même formé</strong>.']]},
  {h:'',hl:['💡 En cas de rétractation abusive','Vous pouvez demander des dommages et intérêts devant le conseil de prud\'hommes.','blue']}],
 eva:'Ne démissionnez <strong>jamais</strong> de votre poste actuel avant d\'avoir une promesse ou un contrat écrit, daté et précis.',
 src:[SP('Promesse d\'embauche','promesse d embauche'),CT] }),
M({ id:'temps-partiel', aud:'sal', ico:I.half, title:'Temps partiel — Vos droits', sub:'Durée minimale · Heures complémentaires · Priorité',
 lead:'Travailler à temps partiel ne fait pas de vous un salarié « à part » : vous avez les <strong>mêmes droits</strong>, au prorata, et des garanties en plus.',
 sec:[{h:'📌 Les règles clés',t:[['Point','Règle'],['Durée minimale','<strong>24 h par semaine</strong>, sauf dérogation (à votre demande ou accord de branche)'],['Heures complémentaires','Majorées d\'au moins <strong>10 %</strong>, puis 25 % au-delà du dixième de la durée prévue'],['Limite','Au maximum un tiers de la durée prévue au contrat'],['Répartition','Le contrat précise vos horaires et les conditions de modification']]},
  {h:'⭐ Priorité',p:'Vous êtes <strong>prioritaire</strong> pour obtenir un emploi à temps plein dans l\'entreprise s\'il correspond à votre catégorie.'}],
 eva:'Notez vos heures réelles chaque semaine : si vous dépassez régulièrement votre durée, vous pouvez demander la <strong>révision de votre contrat</strong>.',
 src:[SP('Temps partiel','temps partiel salarie'),CT] }),
M({ id:'non-concurrence', aud:'sal', ico:I.lock, title:'Clause de non-concurrence — Est-elle valable ?', sub:'Conditions · Contrepartie · Renonciation',
 lead:'Votre contrat vous interdit de travailler pour un concurrent après votre départ ? Cette clause n\'est valable que si elle respecte <strong>4 conditions</strong>.',
 sec:[{h:'✅ Les 4 conditions cumulatives',steps:[['Utile à l\'entreprise','Elle protège un intérêt légitime de l\'employeur.'],['Limitée dans le temps','Une durée précise.'],['Limitée dans l\'espace','Une zone géographique définie.'],['Payée','Une <strong>contrepartie financière</strong> obligatoire versée après le départ.']]},
  {h:'',hl:['💡 Sans contrepartie ?','La clause est nulle : vous pouvez travailler librement et, si vous l\'avez respectée, demander une indemnisation.','blue']}],
 eva:'Au moment du départ, vérifiez si l\'employeur <strong>renonce</strong> à la clause dans les délais prévus : sinon, la contrepartie vous est due.',
 src:[SP('Clause de non-concurrence','clause de non concurrence'),CT] }),
M({ id:'clause-mobilite', aud:'sal', ico:I.pin, title:'Clause de mobilité — Peut-on vous muter ?', sub:'Zone · Délai · Refus',
 lead:'Une clause de mobilité permet à l\'employeur de changer votre lieu de travail. Mais elle a des <strong>limites</strong>.',
 sec:[{h:'📌 Pour être valable',p:'Elle doit définir une <strong>zone géographique précise</strong>, être appliquée de bonne foi, avec un <strong>délai de prévenance raisonnable</strong>, et sans atteinte disproportionnée à votre vie personnelle et familiale.'},
  {h:'⚖️ Et si vous refusez ?',p:'Si la clause est valable et appliquée correctement, le refus peut être une faute. Si elle est floue ou abusive, votre refus est légitime.'}],
 eva:'Avant de refuser, faites lire votre clause : une zone comme « toute la France » sans précision est souvent <strong>contestable</strong>.',
 src:[SP('Clause de mobilité','clause de mobilite'),CT] }),
/* ── Paie ── */
M({ id:'bulletin-paie', aud:'sal', ico:I.receipt, title:'Bulletin de paie — Le lire sans se tromper', sub:'Mentions · Brut / net · Conservation',
 lead:'Votre bulletin de paie est la preuve de vos droits : salaire, heures, congés, cotisations. Savoir le lire évite bien des erreurs.',
 sec:[{h:'🔍 À vérifier chaque mois',steps:[['Les heures','Heures normales, supplémentaires et leurs majorations.'],['Le net à payer','Ce qui arrive sur votre compte.'],['Le net imposable','Le montant pris en compte pour l\'impôt.'],['Les congés','Jours acquis et pris.']]},
  {h:'📦 Conservation',hl:['Gardez-les longtemps','Conservez vos bulletins <strong>jusqu\'à la liquidation de votre retraite</strong> : ils prouvent vos périodes travaillées. Le format électronique est possible, sauf si vous vous y opposez.','blue']}],
 eva:'Une erreur de salaire se réclame : la prescription est de <strong>3 ans</strong>. Plus vous agissez tôt, plus c\'est simple.',
 src:[SP('Bulletin de paie','bulletin de paie'),CT] }),
M({ id:'heures-sup', aud:'sal', ico:I.clock, title:'Heures supplémentaires — Majorations et impôt', sub:'Taux · Contingent · Défiscalisation',
 lead:'Au-delà de 35 heures par semaine, chaque heure en plus est une heure supplémentaire : elle doit être <strong>majorée</strong>.',
 sec:[{h:'💶 Les majorations (à défaut d\'accord)',t:[['Heures','Majoration'],['De la 36e à la 43e','<strong>+25 %</strong>'],['À partir de la 44e','<strong>+50 %</strong>'],['Par accord collectif','Au moins <strong>+10 %</strong>']]},
  {h:'🎁 Bon à savoir',p:'Les heures supplémentaires sont exonérées d\'impôt sur le revenu dans une limite annuelle, et bénéficient d\'une réduction de cotisations salariales.'}],
 eva:'Gardez un relevé personnel de vos horaires (agenda, e-mails) : en cas de litige, il compte comme <strong>élément de preuve</strong>.',
 src:[SP('Heures supplémentaires','heures supplementaires'),CT] }),
M({ id:'epargne-salariale', aud:'sal', ico:I.piggy, title:'Épargne salariale — Intéressement, participation, PEE', sub:'Dispositifs · Blocage · Déblocage anticipé',
 lead:'Beaucoup de salariés ont de l\'argent qui dort sur un plan d\'épargne d\'entreprise… sans le savoir.',
 sec:[{h:'📌 Les dispositifs',t:[['Dispositif','Principe'],['Participation','Obligatoire dans les entreprises de 50 salariés et plus'],['Intéressement','Facultatif, lié aux résultats ou aux performances'],['PEE','Plan d\'épargne, souvent abondé par l\'employeur'],['PER collectif','Épargne pour la retraite']]},
  {h:'🔓 Déblocage anticipé',p:'Les sommes sont en général bloquées 5 ans, mais peuvent être débloquées avant dans certains cas : mariage ou PACS, naissance du 3e enfant, achat de la résidence principale, fin du contrat de travail…'}],
 eva:'Quand vous quittez une entreprise, <strong>demandez le relevé</strong> de votre épargne salariale : elle vous appartient, même après votre départ.',
 src:[SP('Épargne salariale','epargne salariale'),['Épargne salariale','https://www.service-public.gouv.fr','🏛️']] }),
M({ id:'ppv', aud:'sal', ico:I.gift, title:'Prime de partage de la valeur — Comment ça marche', sub:'Principe · Exonérations · Versement',
 lead:'La <strong>prime de partage de la valeur</strong> (ex-« prime Macron ») est une prime facultative que l\'employeur peut verser, avec des avantages fiscaux et sociaux.',
 sec:[{h:'📌 L\'essentiel',p:'Elle est décidée par l\'employeur (décision unilatérale ou accord). Son montant peut varier selon des critères objectifs (salaire, ancienneté, temps de travail). Les exonérations dépendent de votre salaire et de la taille de l\'entreprise.'},
  {h:'',hl:['À vérifier','Les plafonds et les conditions d\'exonération évoluent : vérifiez les règles en vigueur sur Service-Public ou l\'URSSAF.','amber']}],
 eva:'Une prime de partage de la valeur peut aussi être <strong>placée sur un plan d\'épargne</strong> salariale, avec un régime fiscal parfois plus favorable.',
 src:[SP('Prime de partage de la valeur','prime de partage de la valeur'),['URSSAF','https://www.urssaf.fr','🏛️']] }),
M({ id:'titres-restaurant', aud:'sal', ico:I.fork, title:'Titres-restaurant — Vos droits', sub:'Financement · Utilisation · Validité',
 lead:'Les titres-restaurant ne sont pas obligatoires, mais s\'ils existent dans votre entreprise, des <strong>règles précises</strong> s\'appliquent.',
 sec:[{h:'📌 Les règles',t:[['Point','Règle'],['Financement','L\'employeur paie entre <strong>50 et 60 %</strong> de la valeur'],['Attribution','Un titre par repas compris dans votre horaire de travail'],['Égalité','Les télétravailleurs y ont droit dans les mêmes conditions'],['Validité','Jusqu\'à la fin de l\'année civile, échangeables ensuite pendant une courte période']]}],
 eva:'Vous télétravaillez ? Si vos collègues sur site reçoivent des titres-restaurant, <strong>vous y avez droit aussi</strong>.',
 src:[SP('Titres-restaurant','titre restaurant salarie'),CT] }),
M({ id:'frais-pro', aud:'sal', ico:I.receipt, title:'Frais professionnels — Ce que l\'employeur doit rembourser', sub:'Remboursement · Télétravail · Impôts',
 lead:'Les frais que vous engagez <strong>pour votre travail</strong> (déplacements, repas en mission, matériel) doivent en principe être pris en charge par l\'employeur.',
 sec:[{h:'📌 Ce qu\'il faut savoir',steps:[['Justifier','Gardez tous les justificatifs (billets, notes, factures).'],['Demander','Suivez la procédure de note de frais de l\'entreprise.'],['Télétravail','Une allocation peut être versée si un accord ou une charte la prévoit.']]},
  {h:'🧾 Côté impôts',p:'Vous pouvez choisir la déduction forfaitaire de 10 % ou les <strong>frais réels</strong>, si vos frais non remboursés sont plus élevés.'}],
 eva:'Ne payez pas de votre poche du matériel imposé par l\'employeur sans <strong>accord écrit de remboursement</strong>.',
 src:[SP('Frais professionnels','frais professionnels salarie'),['Impots.gouv','https://www.impots.gouv.fr','🧾']] }),
M({ id:'transport', aud:'sal', ico:I.bike, title:'Transport domicile-travail — Prise en charge et forfait mobilités', sub:'Abonnement · Vélo · Covoiturage',
 lead:'Votre employeur doit prendre en charge une partie de vos trajets. Et il existe un forfait <strong>souvent oublié</strong> pour le vélo et le covoiturage.',
 sec:[{h:'📌 Les aides',t:[['Aide','Règle'],['Abonnement transports publics','<strong>50 %</strong> pris en charge, <strong>obligatoire</strong>'],['Forfait mobilités durables','Facultatif : vélo, trottinette, covoiturage, autopartage'],['Prime de transport','Facultative, notamment pour les frais de carburant']]}],
 eva:'Vous venez à vélo ou en covoiturage ? Demandez si l\'entreprise a mis en place le <strong>forfait mobilités durables</strong> : beaucoup l\'ignorent.',
 src:[SP('Frais de transport','prise en charge frais transport salarie'),CT] }),
/* ── Temps et congés ── */
M({ id:'pauses-repos', aud:'sal', ico:I.coffee, title:'Pauses et temps de repos — Les minimums légaux', sub:'Pause · Repos quotidien · Durées maximales',
 lead:'La loi fixe des <strong>minimums de repos</strong> qui protègent votre santé. Votre employeur doit les respecter.',
 sec:[{h:'📌 Les règles',t:[['Règle','Minimum / maximum'],['Pause','<strong>20 minutes</strong> dès 6 h de travail'],['Repos quotidien','<strong>11 heures</strong> consécutives'],['Repos hebdomadaire','<strong>35 heures</strong> consécutives (24 h + 11 h)'],['Durée maximale','10 h par jour, 48 h par semaine']]}],
 eva:'Si on vous rappelle régulièrement le soir et que vous reprenez tôt le matin, votre <strong>repos de 11 heures</strong> n\'est peut-être pas respecté.',
 src:[SP('Temps de pause','temps de pause salarie'),CT] }),
M({ id:'feries-dimanche', aud:'sal', ico:I.cal, title:'Jours fériés et travail le dimanche', sub:'1er mai · Majorations · Repos dominical',
 lead:'Sur les 11 jours fériés, un seul est obligatoirement chômé et payé : le <strong>1er mai</strong>. Pour le reste, tout dépend de votre convention collective.',
 sec:[{h:'📌 Jours fériés',p:'Le 1er mai travaillé est payé <strong>double</strong>. Pour les autres jours fériés, c\'est la convention collective ou l\'usage qui décide.'},
  {h:'📌 Le dimanche',p:'Le repos hebdomadaire est donné en principe le dimanche. Des dérogations existent (commerces, zones touristiques, services continus), avec souvent des <strong>contreparties</strong> prévues par accord.'}],
 eva:'Cherchez votre convention collective sur le Code du travail numérique : c\'est elle qui fixe vos <strong>majorations réelles</strong>.',
 src:[SP('Jours fériés','jours feries salarie'),CT] }),
M({ id:'travail-nuit', aud:'sal', ico:I.moon, title:'Travail de nuit — Protections et contreparties', sub:'Définition · Repos · Suivi médical',
 lead:'Le travail de nuit use la santé : la loi impose des <strong>contreparties</strong> et un suivi renforcé.',
 sec:[{h:'📌 Qui est travailleur de nuit ?',p:'Le travail de nuit couvre en principe la période de <strong>21 h à 6 h</strong>. Vous êtes travailleur de nuit si vous y travaillez régulièrement un certain nombre d\'heures (au moins 3 heures, deux fois par semaine, par exemple).'},
  {h:'✅ Vos droits',t:[['Droit','Détail'],['Contrepartie','Repos compensateur obligatoire, et souvent une majoration de salaire'],['Santé','Suivi médical individuel adapté'],['Retour en journée','Priorité pour un poste de jour, notamment pour raisons familiales']]}],
 eva:'Enceinte et travailleuse de nuit ? Vous pouvez demander à être <strong>affectée à un poste de jour</strong> pendant la grossesse.',
 src:[SP('Travail de nuit','travail de nuit salarie'),CT] }),
M({ id:'conges-familiaux', aud:'sal', ico:I.heart, title:'Congés pour événements familiaux', sub:'Mariage · Naissance · Décès · Handicap',
 lead:'Mariage, naissance, décès : la loi vous accorde des jours de congé <strong>payés</strong>, en plus de vos congés annuels.',
 sec:[{h:'📅 Durées minimales légales',t:[['Événement','Jours'],['Votre mariage ou PACS','4 jours'],['Naissance ou adoption','3 jours'],['Mariage d\'un enfant','1 jour'],['Décès du conjoint, d\'un parent, frère ou sœur','3 jours'],['Décès d\'un enfant','5 jours (7 jours ouvrés s\'il avait moins de 25 ans), plus un congé de deuil'],['Annonce du handicap ou d\'une maladie grave d\'un enfant','5 jours']]}],
 eva:'Votre convention collective peut prévoir <strong>plus de jours</strong> : vérifiez-la avant de poser votre demande.',
 src:[SP('Congés pour événements familiaux','conges evenements familiaux'),CT] }),
M({ id:'maternite-paternite', aud:'sal', ico:I.baby, title:'Congé maternité et congé paternité', sub:'Durées · Indemnités · Protection',
 lead:'L\'arrivée d\'un enfant ouvre des congés <strong>indemnisés</strong> et une protection contre le licenciement.',
 sec:[{h:'📅 Durées (1er ou 2e enfant)',t:[['Congé','Durée'],['Maternité','<strong>16 semaines</strong> (6 avant, 10 après la naissance)'],['Paternité et accueil de l\'enfant','<strong>25 jours</strong> (32 pour des naissances multiples), dont 4 obligatoires après le congé de naissance'],['Congé de naissance','3 jours payés par l\'employeur']]},
  {h:'',hl:['À vérifier','Une réforme des congés de naissance est en discussion : vérifiez les règles en vigueur avant de poser vos dates.','amber']}],
 eva:'Prévenez votre employeur du congé paternité <strong>au moins 1 mois à l\'avance</strong> pour la partie non obligatoire.',
 src:[SP('Congé maternité','conge maternite salariee'),SP('Congé paternité','conge paternite'),['Ameli','https://www.ameli.fr','🏥']] }),
M({ id:'conge-parental', aud:'sal', ico:I.baby, title:'Congé parental d\'éducation', sub:'Conditions · Durée · PreParE',
 lead:'Le congé parental permet d\'arrêter ou de réduire son activité pour élever son enfant, avec un <strong>retour garanti</strong> dans l\'entreprise.',
 sec:[{h:'📌 Les règles',t:[['Point','Règle'],['Ancienneté','Au moins <strong>1 an</strong> dans l\'entreprise'],['Forme','Arrêt total ou temps partiel'],['Durée','Jusqu\'aux <strong>3 ans</strong> de l\'enfant en principe'],['Retour','Votre poste ou un poste similaire, avec une rémunération au moins équivalente']]},
  {h:'💶 Et l\'argent ?',p:'L\'employeur ne vous paie pas, mais la CAF peut verser la <strong>PreParE</strong> (prestation partagée d\'éducation de l\'enfant), sous conditions.'}],
 eva:'Faites la simulation PreParE sur caf.fr <strong>avant</strong> de choisir entre arrêt total et temps partiel.',
 src:[SP('Congé parental d\'éducation','conge parental education'),['CAF','https://www.caf.fr','🏠']] }),
M({ id:'presence-parentale', aud:'sal', ico:I.heart, title:'Congé de présence parentale — Enfant gravement malade', sub:'Conditions · Durée · AJPP',
 lead:'Votre enfant est gravement malade, handicapé ou accidenté ? Ce congé vous permet d\'être à ses côtés, avec une <strong>allocation</strong> de la CAF.',
 sec:[{h:'📌 Les règles',t:[['Point','Règle'],['Durée','Jusqu\'à <strong>310 jours ouvrés</strong> sur une période de 3 ans'],['Souplesse','Pris en continu, à temps partiel ou par jours'],['Indemnisation','AJPP versée par la CAF, par jour d\'absence'],['Contrat','Suspendu, avec retour garanti']]}],
 eva:'Un certificat médical précisant la nécessité d\'une présence soutenue suffit pour lancer la demande. N\'attendez pas pour <strong>demander l\'AJPP</strong>.',
 src:[SP('Congé de présence parentale','conge de presence parentale'),['CAF','https://www.caf.fr','🏠']] }),
M({ id:'proche-aidant', aud:'sal', ico:I.hands, title:'Congé de proche aidant — Aider un proche sans perdre son emploi', sub:'Conditions · Durée · AJPA',
 lead:'Vous aidez un proche âgé, malade ou handicapé ? Le <strong>congé de proche aidant</strong> existe, et il peut être indemnisé.',
 sec:[{h:'📌 Les règles',t:[['Point','Règle'],['Pour qui ?','Un proche (famille, conjoint, personne avec qui vous avez des liens étroits) en perte d\'autonomie ou handicapé'],['Durée','Jusqu\'à <strong>3 mois</strong>, renouvelable, dans la limite d\'<strong>1 an</strong> sur toute la carrière'],['Formes','Temps plein, temps partiel ou fractionné'],['Indemnisation','AJPA, versée par la CAF ou la MSA']]}],
 eva:'Ce congé ne peut pas vous être refusé si vous remplissez les conditions. Prévenez simplement votre employeur dans les délais.',
 src:[SP('Congé de proche aidant','conge proche aidant'),['CAF','https://www.caf.fr','🏠']] }),
M({ id:'solidarite-familiale', aud:'sal', ico:I.hands, title:'Congé de solidarité familiale — Accompagner un proche en fin de vie', sub:'Conditions · Durée · Allocation',
 lead:'Pour accompagner un proche en fin de vie, ce congé vous permet de vous absenter, avec une <strong>allocation journalière</strong>.',
 sec:[{h:'📌 Les règles',t:[['Point','Règle'],['Pour qui ?','Un proche souffrant d\'une maladie grave mettant sa vie en jeu, ou en phase avancée'],['Durée','<strong>3 mois</strong>, renouvelable une fois'],['Formes','Continu, temps partiel ou fractionné'],['Indemnisation','Allocation journalière versée par l\'Assurance maladie']]}],
 eva:'Ce congé est un droit : l\'employeur <strong>ne peut pas le refuser</strong>. Un certificat médical suffit.',
 src:[SP('Congé de solidarité familiale','conge de solidarite familiale'),['Ameli','https://www.ameli.fr','🏥']] }),
M({ id:'don-jours', aud:'sal', ico:I.share, title:'Don de jours de repos — Aider un collègue', sub:'Principe · Bénéficiaires · Anonymat',
 lead:'Vous pouvez <strong>donner des jours de repos</strong> à un collègue qui en a besoin. Un geste de solidarité méconnu.',
 sec:[{h:'📌 Comment ça marche',p:'Avec l\'accord de l\'employeur, un salarié peut renoncer anonymement à des jours de repos (RTT, une partie des congés) au profit d\'un collègue parent d\'un enfant gravement malade, proche aidant, ou qui a perdu un enfant.'},
  {h:'✅ Pour le bénéficiaire',p:'Les jours reçus sont <strong>payés</strong> normalement et comptent comme du temps de travail.'}],
 eva:'Vous traversez une épreuve ? Parlez-en aux RH ou au CSE : un appel au don peut être organisé <strong>sans révéler votre situation</strong>.',
 src:[SP('Don de jours de repos','don de jours de repos'),CT] }),
M({ id:'cet', aud:'sal', ico:I.bank, title:'Compte épargne-temps (CET) — Épargner ses congés', sub:'Alimentation · Utilisation · Départ',
 lead:'Le CET permet de <strong>mettre de côté</strong> des jours de congés ou des primes, pour les utiliser plus tard.',
 sec:[{h:'📌 L\'essentiel',t:[['Point','Règle'],['Mise en place','Par accord collectif : il n\'existe pas partout'],['Alimentation','Jours de congé au-delà de 24 jours ouvrables, RTT, primes selon l\'accord'],['Utilisation','Congé rémunéré, passage à temps partiel, complément de salaire ou épargne retraite selon l\'accord'],['Au départ','Les droits sont payés ou transférés selon les règles prévues']]}],
 eva:'Avant un projet long (congé sabbatique, création d\'entreprise), un CET bien rempli peut <strong>financer plusieurs semaines</strong> d\'absence.',
 src:[SP('Compte épargne-temps','compte epargne temps'),CT] }),
M({ id:'deconnexion', aud:'sal', ico:I.plug, title:'Droit à la déconnexion', sub:'Principe · Charte · Que faire',
 lead:'Ne pas répondre aux mails le soir, c\'est un <strong>droit</strong>. Il est inscrit dans le Code du travail.',
 sec:[{h:'📌 Ce que dit la loi',p:'Les entreprises d\'au moins 50 salariés doivent négocier les modalités du droit à la déconnexion. À défaut d\'accord, l\'employeur établit une <strong>charte</strong>.'},
  {h:'🛡️ Que faire si on vous sollicite sans cesse ?',steps:[['Garder des traces','Notez les heures des sollicitations hors horaires.'],['En parler','Au manager, aux RH ou au CSE.'],['Alerter','Si votre santé est touchée, consultez le médecin du travail.']]}],
 eva:'Le droit à la déconnexion protège aussi votre <strong>temps de repos de 11 heures</strong> : les deux vont ensemble.',
 src:[SP('Droit à la déconnexion','droit a la deconnexion'),CT] }),
/* ── Santé ── */
M({ id:'arret-maladie', aud:'sal', ico:I.med, title:'Arrêt maladie — Indemnités et obligations', sub:'48 h · Carence · Complément employeur',
 lead:'Un arrêt maladie ouvre droit à des <strong>indemnités journalières</strong> de la Sécurité sociale, parfois complétées par l\'employeur.',
 sec:[{h:'📋 Les étapes',steps:[['Envoyer l\'arrêt','Sous <strong>48 heures</strong> à la CPAM (volets 1 et 2) et à l\'employeur (volet 3).'],['Délai de carence','En général <strong>3 jours</strong> non indemnisés par la Sécurité sociale.'],['Indemnités','Versées par la CPAM, calculées sur vos salaires.'],['Complément employeur','Après 1 an d\'ancienneté, l\'employeur complète sous conditions, souvent plus selon la convention collective.']]},
  {h:'',hl:['⚠️ Les heures de sortie','Respectez les heures de présence indiquées sur l\'arrêt : un contrôle peut avoir lieu.','amber']}],
 eva:'Votre convention collective prévoit peut-être un <strong>maintien de salaire</strong> plus généreux : vérifiez-la.',
 src:[['Ameli — Arrêt maladie','https://www.ameli.fr','🏥'],SP('Arrêt maladie','arret maladie salarie')] }),
M({ id:'accident-travail', aud:'sal', ico:I.warn, title:'Accident du travail et maladie professionnelle', sub:'Déclaration · Indemnités · Protection',
 lead:'Un accident au travail ou sur le trajet ouvre des droits <strong>plus protecteurs</strong> qu\'un arrêt maladie classique.',
 sec:[{h:'📋 Les délais',steps:[['Prévenir l\'employeur','Dans les <strong>24 heures</strong>.'],['Déclaration','L\'employeur déclare l\'accident à la CPAM sous 48 heures.'],['Feuille d\'accident','Remise par l\'employeur : soins pris en charge sans avance de frais.']]},
  {h:'✅ Vos avantages',t:[['Avantage','Détail'],['Pas de carence','Indemnisé dès le lendemain de l\'accident'],['Indemnités','Plus élevées qu\'en maladie ordinaire'],['Protection','Licenciement très encadré pendant l\'arrêt']]}],
 eva:'L\'employeur refuse de déclarer ? Vous pouvez déclarer <strong>vous-même</strong> l\'accident à la CPAM, dans un délai de 2 ans.',
 src:[['Ameli — Accident du travail','https://www.ameli.fr','🏥'],SP('Accident du travail','accident du travail')] }),
M({ id:'medecine-travail', aud:'sal', ico:I.steth, title:'Médecine du travail — Visites et rôle', sub:'Embauche · Reprise · Pré-reprise',
 lead:'Le médecin du travail est là pour <strong>protéger votre santé</strong>, pas pour contrôler vos arrêts. Ses visites sont un droit.',
 sec:[{h:'📅 Les visites',t:[['Visite','Quand ?'],['Information et prévention','Dans les 3 mois suivant l\'embauche'],['Visite périodique','Au moins tous les 5 ans (plus souvent si poste à risque)'],['Reprise','Après un congé maternité, un arrêt pour maladie professionnelle, un accident du travail d\'au moins 30 jours ou une maladie d\'au moins 60 jours'],['Pré-reprise','Pendant un arrêt long, pour préparer le retour']]}],
 eva:'Vous pouvez demander une visite <strong>à tout moment</strong>, sans passer par votre manager. C\'est confidentiel.',
 src:[SP('Visite médicale','visite medicale travail'),CT] }),
M({ id:'inaptitude', aud:'sal', ico:I.steth, title:'Inaptitude — Reclassement ou licenciement', sub:'Constat · Reclassement · Indemnités',
 lead:'Quand votre état de santé ne permet plus d\'occuper votre poste, seul le <strong>médecin du travail</strong> peut déclarer l\'inaptitude.',
 sec:[{h:'📋 La procédure',steps:[['Constat','Le médecin du travail déclare l\'inaptitude après échange avec vous et l\'employeur.'],['Reclassement','L\'employeur doit chercher un poste adapté, sauf dispense écrite du médecin.'],['Délai d\'1 mois','Sans reclassement ni licenciement dans le mois, l\'employeur doit <strong>reprendre le paiement du salaire</strong>.']]},
  {h:'',hl:['💡 Origine professionnelle','Si l\'inaptitude vient d\'un accident du travail ou d\'une maladie professionnelle, l\'indemnité de licenciement est <strong>doublée</strong>.','blue']}],
 eva:'Avant la visite, préparez la liste des tâches que vous pouvez encore faire : elle aide le médecin à proposer un <strong>aménagement</strong> plutôt qu\'une inaptitude.',
 src:[SP('Inaptitude','inaptitude medicale salarie'),CT] }),
M({ id:'tpt', aud:'sal', ico:I.half, title:'Temps partiel thérapeutique — Reprendre en douceur', sub:'Principe · Indemnités · Démarches',
 lead:'Après une maladie, vous pouvez reprendre <strong>à temps partiel</strong> tout en touchant une partie de vos indemnités journalières.',
 sec:[{h:'📋 Les étapes',steps:[['Prescription','Votre médecin prescrit une reprise à temps partiel thérapeutique.'],['Accord','L\'employeur doit donner son accord ; le médecin du travail peut être consulté.'],['Revenus','Salaire pour les heures travaillées + une partie des indemnités journalières de la CPAM.']]}],
 eva:'Le temps partiel thérapeutique est souvent <strong>méconnu des employeurs</strong> : venez avec la prescription et proposez un planning précis.',
 src:[['Ameli — Temps partiel thérapeutique','https://www.ameli.fr','🏥'],SP('Temps partiel thérapeutique','temps partiel therapeutique')] }),
M({ id:'droit-retrait', aud:'sal', ico:I.warn, title:'Droit de retrait — Danger grave et imminent', sub:'Conditions · Procédure · Protection',
 lead:'Face à un <strong>danger grave et imminent</strong> pour votre vie ou votre santé, vous pouvez cesser le travail sans être sanctionné(e).',
 sec:[{h:'📋 Comment l\'exercer',steps:[['Alerter','Prévenez immédiatement votre employeur (par écrit si possible).'],['Se retirer','Quittez la situation dangereuse, sans créer de nouveau danger pour les autres.'],['Reprendre','Quand le danger est écarté.']]},
  {h:'🛡️ Protection',p:'Si vous aviez un <strong>motif raisonnable</strong> de penser qu\'il y avait danger, aucune sanction ni retenue de salaire n\'est possible.'}],
 eva:'Le CSE peut aussi déclencher une <strong>alerte</strong> : prévenez un représentant du personnel en même temps.',
 src:[SP('Droit de retrait','droit de retrait salarie'),CT] }),
/* ── Collectif ── */
M({ id:'cse', aud:'sal', ico:I.team, title:'CSE — Vos représentants du personnel', sub:'Rôle · Seuils · Comment les saisir',
 lead:'Le <strong>comité social et économique</strong> représente les salariés. C\'est un allié précieux, souvent sous-utilisé.',
 sec:[{h:'📌 L\'essentiel',t:[['Point','Règle'],['Obligation','Dès <strong>11 salariés</strong>'],['Missions','Porter les réclamations, veiller à la santé, sécurité et conditions de travail'],['À partir de 50 salariés','Consultation sur la marche de l\'entreprise et activités sociales et culturelles'],['Contact','Les élus sont joignables : leurs noms sont affichés']]}],
 eva:'Un problème de planning, de sécurité ou de harcèlement ? Un élu du CSE peut vous <strong>accompagner</strong> et intervenir auprès de la direction.',
 src:[SP('CSE','comite social et economique'),CT] }),
M({ id:'sanction', aud:'sal', ico:I.gavel, title:'Sanction disciplinaire — Procédure et contestation', sub:'Entretien · Délais · Recours',
 lead:'Avertissement, mise à pied, mutation : une sanction doit suivre une <strong>procédure précise</strong>, sinon elle est contestable.',
 sec:[{h:'📋 Les règles',t:[['Règle','Délai'],['Engager la procédure','Dans les <strong>2 mois</strong> après la connaissance des faits'],['Entretien préalable','Obligatoire, sauf pour un simple avertissement'],['Notification','Entre 2 jours ouvrables et 1 mois après l\'entretien'],['Assistance','Vous pouvez venir accompagné(e) à l\'entretien']]},
  {h:'⚖️ Contester',p:'Répondez par écrit pour donner votre version, puis saisissez le conseil de prud\'hommes si la sanction est injustifiée ou disproportionnée.'}],
 eva:'Ne signez jamais « lu et approuvé » une sanction avec laquelle vous n\'êtes pas d\'accord : écrivez plutôt « <strong>reçu le</strong> » avec la date.',
 src:[SP('Sanction disciplinaire','sanction disciplinaire salarie'),CT] }),
M({ id:'lanceur-alerte', aud:'sal', ico:I.mega, title:'Lanceur d\'alerte — Signaler et être protégé', sub:'Signalement · Canaux · Protection',
 lead:'Vous avez connaissance d\'une fraude, d\'un danger ou d\'une violation de la loi ? Le statut de <strong>lanceur d\'alerte</strong> vous protège.',
 sec:[{h:'📋 Les canaux',steps:[['En interne','Via la procédure de signalement de l\'entreprise.'],['En externe','Directement auprès d\'une autorité compétente ou du Défenseur des droits.'],['Public','En dernier recours, ou en cas de danger imminent.']]},
  {h:'🛡️ Protection',p:'Aucune sanction, licenciement ou mesure de représailles ne peut viser un lanceur d\'alerte de bonne foi. Les personnes qui l\'aident sont aussi protégées.'}],
 eva:'Rassemblez des preuves <strong>sans enfreindre la loi</strong>, et contactez le Défenseur des droits pour être orienté(e).',
 src:[['Défenseur des droits','https://www.defenseurdesdroits.fr','⚖️'],SP('Lanceur d\'alerte','lanceur d alerte')] }),
M({ id:'vie-privee', aud:'sal', ico:I.eye, title:'Vie privée et données personnelles au travail', sub:'Surveillance · RGPD · Droit d\'accès',
 lead:'Caméras, géolocalisation, logiciels : votre employeur peut contrôler l\'activité, mais <strong>pas n\'importe comment</strong>.',
 sec:[{h:'📌 Les règles',t:[['Règle','Ce que ça veut dire'],['Information','Tout dispositif de contrôle doit vous être annoncé avant'],['Proportionnalité','Le contrôle doit être justifié et limité'],['Vos données','Droit d\'accès, de rectification et d\'opposition (RGPD)'],['Recours','CNIL en cas de manquement']]}],
 eva:'Vous pouvez demander à votre employeur la <strong>copie des données</strong> qu\'il détient sur vous : il doit répondre en principe sous un mois.',
 src:[['CNIL — Travail et données','https://www.cnil.fr','🔐'],CT] }),
/* ── Départ ── */
M({ id:'abandon-poste', aud:'sal', ico:I.door, title:'Abandon de poste — La présomption de démission', sub:'Mise en demeure · Délai · Chômage',
 lead:'Depuis 2023, un abandon de poste peut être considéré comme une <strong>démission</strong>… et faire perdre le droit au chômage.',
 sec:[{h:'📋 La procédure',steps:[['Mise en demeure','L\'employeur vous demande de justifier votre absence et de reprendre le travail.'],['Délai','Au moins <strong>15 jours</strong> pour répondre ou revenir.'],['Présomption','Sans retour ni motif légitime, vous êtes présumé(e) démissionnaire.']]},
  {h:'',hl:['⚠️ Conséquence','Comme pour une démission classique, vous n\'avez en principe <strong>pas droit à l\'ARE</strong>.','amber']},
  {h:'✅ Motifs légitimes',p:'Raisons médicales, droit de retrait, droit de grève, refus d\'une modification du contrat… Répondez en justifiant votre motif par écrit.'}],
 eva:'Plutôt que l\'abandon de poste, parlez d\'une <strong>rupture conventionnelle</strong> : elle préserve votre droit au chômage.',
 src:[SP('Abandon de poste','abandon de poste presomption de demission'),CT] }),
M({ id:'cumul-retraite', aud:'sal', ico:I.senior, title:'Cumul emploi-retraite — Travailler en étant retraité', sub:'Cumul intégral · Nouveaux droits · Démarches',
 lead:'Retraité(e), vous pouvez reprendre une activité. Et depuis 2024, ce travail peut vous ouvrir de <strong>nouveaux droits</strong> à retraite.',
 sec:[{h:'📌 Les deux cas',t:[['Cas','Règle'],['Cumul intégral','Si toutes vos retraites sont liquidées et à taux plein : pas de limite de revenus'],['Cumul plafonné','Sinon : revenus limités, au-delà la pension est réduite'],['Nouveaux droits','En cumul intégral, l\'activité peut ouvrir une seconde pension, sous conditions']]}],
 eva:'Avant de reprendre, faites le point sur <strong>info-retraite.fr</strong> : selon votre situation, le gain de la seconde pension peut être intéressant.',
 src:[['Info-retraite','https://www.info-retraite.fr','👵'],SP('Cumul emploi-retraite','cumul emploi retraite')] })
];
A.forEach(function(a){ EVAD_ARTICLES.salarie.push(a); });
})();

/* ── Refonte · Demandeur d'emploi · Lot 1 (source : Service-Public F38881, vérifié le 23 juillet 2026) ── */
(function(){
var F='https://www.service-public.gouv.fr/particuliers/vosdroits/F38881', FD='Vérifié le 23 juillet 2026';
var A18888='https://www.service-public.gouv.fr/particuliers/actualites/A18888';
var LEG='https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006178163';
function sjrOf(m){ return m*12/365; }
function areOf(sjr){ var d=Math.max(13.18+0.404*sjr, 0.57*sjr); return Math.min(d, 0.70*sjr); }
var arts=[
evadMk3({ id:'are', aud:'dem', ico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', title:'ARE — Allocation de Retour à l\'Emploi', sub:'Conditions · Montant · Durée · Démarches',
 intro:'L\'<strong>allocation d\'aide au retour à l\'emploi (ARE)</strong> est le revenu de remplacement versé par France Travail aux personnes <strong>involontairement privées d\'emploi</strong>. Ses règles dépendent de votre âge et de la date de fin de votre contrat : voici celles qui s\'appliquent aux contrats terminés depuis le 1er avril 2025.',
 loi:['L\'assurance chômage garantit un revenu de remplacement aux salariés qui perdent leur emploi sans l\'avoir voulu. Les règles de calcul sont fixées par la convention d\'assurance chômage du 15 novembre 2024.','Code du travail, articles L5421-1 à L5421-4'],
 qui:['Vous êtes <strong>involontairement privé(e) d\'emploi</strong> : licenciement, rupture conventionnelle, fin de CDD non renouvelé ou démission considérée comme légitime.','Vous avez travaillé au moins <strong>6 mois (130 jours ou 910 heures)</strong> dans les 24 derniers mois, ou dans les 36 derniers mois si vous avez 55 ans ou plus.','<strong>Nouveau depuis le 1er avril 2026</strong> : si vous n\'avez jamais été indemnisé(e), ou pas depuis plus de 20 ans, <strong>5 mois (108 jours ou 758 heures)</strong> suffisent.','Vous êtes physiquement apte à travailler, vous résidez en France de manière stable et vous êtes inscrit(e) à France Travail.'],
 quoi:{ t:[['Élément','Règle'],['Montant brut par jour','<strong>13,18 €</strong> + <strong>40,4 %</strong> de votre salaire journalier de référence (SJR)'],['Encadrement','Entre <strong>57 %</strong> et <strong>70 %</strong> du SJR'],['Minimum','<strong>32,13 €</strong> net par jour'],['Versement','Sur la base de <strong>30 jours</strong> par mois, quel que soit le mois'],['Durée maximale (moins de 55 ans)','<strong>548 jours</strong>'],['Durée maximale (55 ou 56 ans)','<strong>685 jours</strong>'],['Durée maximale (57 ans et plus)','<strong>822 jours</strong>']],
   ex:'Salaire de 2 500 € brut par mois : SJR ≈ 82 €. ARE ≈ 13,18 + (40,4 % × 82) ≈ <strong>46 € brut par jour</strong>, soit environ <strong>1 390 € brut</strong> pour un mois de 30 jours.' },
 quand:{ t:[['Étape','Délai'],['Inscription à France Travail','Dans les <strong>12 mois</strong> qui suivent la fin du contrat'],['Délai d\'attente','<strong>7 jours</strong>, plus d\'éventuels différés (congés payés, indemnités supra-légales)'],['Paiement','Chaque mois, après votre actualisation (par exemple début novembre pour octobre)']] },
 comment:[['S\'inscrire à France Travail','Faites votre inscription en ligne dès la fin de votre contrat : c\'est elle qui déclenche l\'étude de vos droits.'],['Transmettre l\'attestation employeur','Votre employeur la remet à la fin du contrat ; vérifiez qu\'elle apparaît bien dans votre espace personnel.'],['S\'actualiser chaque mois','Déclarez chaque mois votre situation : reprise d\'activité, formation, maladie… Le paiement en dépend.'],['Faire des démarches de recherche','Vous devez accomplir des actes positifs et répétés pour retrouver un emploi ou créer une entreprise.']],
 pourquoi:'Passé le délai de <strong>12 mois</strong> après la fin du contrat, vos droits peuvent être perdus. Les allocations ne sont versées que sur un compte bancaire en France ou dans la zone SEPA, et une <strong>déclaration inexacte</strong> met fin au versement.',
 eva:'Inscrivez-vous <strong>dès le lendemain</strong> de la fin de votre contrat : les délais d\'attente courent pendant ce temps-là. Et utilisez le simulateur officiel de France Travail pour vérifier votre montant.',
 src:[['Service-Public — ARE après le 1er avril 2025',F,FD],['Service-Public — Conditions assouplies pour les primo-entrants',A18888,'Publié le 23 avril 2026'],['Légifrance — Code du travail, art. L5421-1 à L5421-4',LEG,'','⚖️']],
 check:['Vos démarches pour toucher l\'ARE',['Je me suis inscrit(e) à France Travail dans les 12 mois après la fin du contrat','Mon attestation employeur apparaît dans mon espace personnel','J\'ai vérifié ma durée de travail (6 mois, ou 5 mois si je suis primo-entrant)','J\'ai renseigné un compte bancaire en France ou dans la zone SEPA','Je m\'actualise chaque mois et je déclare toute reprise d\'activité']],
 est:{ title:'Eva estime votre ARE', subtitle:'Estimation brute — Service-Public, règles 2026', fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500}],
   calc:function(v){ var s=sjrOf(v[0]), d=Math.max(areOf(s),32.13); return { val:Math.round(d*30)+'€<span>/mois brut</span>', detail:'SJR estimé : '+Math.round(s)+' €/j · ARE : '+d.toFixed(2).replace('.',',')+' €/j' }; } },
 rel:['carence-differe','cumul-are','droits-rechargeables'],
 quiz:[['Combien de temps faut-il avoir travaillé pour avoir droit à l\'ARE ?','En règle générale, <strong>6 mois</strong> (130 jours ou 910 heures) sur les 24 derniers mois, ou 36 mois à partir de 55 ans. Depuis le 1er avril 2026, les primo-entrants peuvent être indemnisés avec <strong>5 mois</strong>.'],['Une démission ouvre-t-elle droit à l\'ARE ?','En principe non, car il faut être involontairement privé d\'emploi. Mais une <strong>démission considérée comme légitime</strong> (par exemple pour suivre son conjoint) ouvre droit à l\'ARE.'],['Comment est calculé le montant de l\'ARE ?','Une partie fixe de <strong>13,18 €</strong> plus <strong>40,4 %</strong> du salaire journalier de référence, dans la limite de 57 % à 70 % de ce salaire, avec un minimum de 32,13 € net par jour.'],['Quelle est la durée maximale d\'indemnisation avant 55 ans ?','<strong>548 jours</strong> pour un contrat terminé depuis le 1er avril 2025, la durée ayant été réduite de 25 % en raison de la situation du marché du travail.'],['Dans quel délai faut-il s\'inscrire à France Travail ?','Dans les <strong>12 mois</strong> qui suivent la fin du contrat de travail, ce délai pouvant être prolongé dans certaines situations comme un congé maladie.']] }),

evadMk3({ id:'droits-rechargeables', aud:'dem', ico:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>', title:'Droits rechargeables — Prolonger son chômage', sub:'Reprise des droits · Rechargement · Droit d\'option',
 intro:'Retravailler pendant votre indemnisation ne vous fait <strong>rien perdre</strong> : vos droits restants sont conservés et de nouveaux droits peuvent s\'ajouter. C\'est le principe des <strong>droits rechargeables</strong>.',
 loi:['Quand vous reprenez un emploi sans avoir épuisé vos droits puis le perdez, vous reprenez vos droits initiaux jusqu\'à leur épuisement. Les périodes travaillées permettent ensuite d\'ouvrir de nouveaux droits.','Code du travail, article L5422-2-1 (droits rechargeables)'],
 qui:['Vous avez repris une activité professionnelle <strong>alors que vos droits n\'étaient pas épuisés</strong>.','Pour de nouveaux droits : vous avez travaillé <strong>6 mois</strong> (130 jours ou 910 heures) dans les 24 derniers mois, ou 36 mois à partir de 55 ans (5 mois pour les primo-entrants).','Exception : pas de droits rechargeables pour un contrat d\'apprentissage déjà indemnisé par France Travail.'],
 quoi:{ t:[['Mécanisme','Ce que ça vous apporte'],['Reprise des droits','Vos droits initiaux reprennent jusqu\'à leur épuisement'],['Rechargement','De nouveaux droits, avec une nouvelle durée d\'indemnisation'],['Droit d\'option','Choisir tout de suite l\'allocation issue de votre dernier emploi, sans attendre la fin des anciens droits']] },
 quand:{ t:[['Démarche','Délai'],['Exercer le droit d\'option','<strong>21 jours</strong> de réflexion pour informer France Travail par écrit'],['Effet du choix','À partir du jour de votre demande, et le choix est <strong>définitif</strong>']] },
 comment:[['Déclarer chaque reprise d\'activité','Lors de votre actualisation mensuelle, indiquez tous vos contrats.'],['Garder vos bulletins de salaire','Ils prouvent vos heures et vos jours travaillés pour le rechargement.'],['Vérifier le droit d\'option','Il faut des allocations non versées, au moins 6 mois travaillés depuis l\'ouverture des droits, et une allocation journalière de 20 € ou moins, ou une hausse d\'au moins 30 %.'],['Répondre par écrit dans les 21 jours','Si France Travail vous propose l\'option, faites votre choix par écrit dans le délai.']],
 pourquoi:'Le droit d\'option est <strong>irréversible</strong> : une fois choisi, vous ne pourrez plus revenir en arrière. Comparez bien le montant et la durée des deux droits avant de répondre.',
 eva:'Accepter des missions pendant le chômage n\'est jamais du temps perdu : vous gagnez un salaire <strong>et</strong> vous construisez vos prochains droits.',
 src:[['Service-Public — ARE après le 1er avril 2025 (rechargement)',F,FD],['Légifrance — Code du travail, art. L5422-1 à L5422-2-2','https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006195891/','','⚖️']],
 check:['Vos démarches pour recharger vos droits',['Je déclare chaque reprise d\'activité lors de mon actualisation','Je conserve tous mes bulletins de salaire','J\'ai compté mes jours ou heures travaillés depuis l\'ouverture de mes droits','J\'ai vérifié si je remplis les 3 conditions du droit d\'option','Si on me propose l\'option, je réponds par écrit dans les 21 jours']],
 rel:['are','cumul-are','carence-differe'],
 quiz:[['Que se passe-t-il si je perds un emploi repris pendant mon chômage ?','Vous reprenez vos <strong>droits initiaux</strong> jusqu\'à leur épuisement, à condition de ne pas les avoir épuisés avant la reprise.'],['Combien faut-il travailler pour obtenir de nouveaux droits ?','<strong>6 mois</strong> (130 jours ou 910 heures) dans les 24 derniers mois, ou 36 mois à partir de 55 ans ; 5 mois pour les primo-entrants.'],['Qu\'est-ce que le droit d\'option ?','La possibilité de choisir l\'allocation issue de votre <strong>dernière période d\'activité</strong> sans attendre l\'épuisement de vos anciens droits.'],['De combien de temps dispose-t-on pour exercer le droit d\'option ?','De <strong>21 jours</strong> de réflexion pour informer France Travail par écrit. Le choix est ensuite définitif.'],['Un apprenti indemnisé peut-il recharger ses droits ?','Non : les droits rechargeables ne s\'appliquent pas si vous avez été en contrat d\'apprentissage et indemnisé par France Travail pour ce contrat.']] }),

evadMk3({ id:'cumul-are', aud:'dem', ico:'<path d="M18 7a7 7 0 1 0 0 10"/><path d="M4 10h9M4 14h9"/>', title:'Cumul ARE et salaire — Reprendre un emploi', sub:'Calcul · Plafond · Activité non salariée',
 intro:'Reprendre un travail ne fait pas perdre toute son allocation : tant que vous restez à la recherche d\'un emploi, l\'ARE peut se <strong>cumuler</strong> avec votre nouveau salaire.',
 loi:['Si vous exercez une activité tout en déclarant être toujours à la recherche d\'un emploi, l\'ARE vous est versée partiellement, selon un calcul fixé par la réglementation d\'assurance chômage.','Code du travail, articles L5425-1 à L5425-2'],
 qui:['Vous percevez l\'ARE et vous reprenez une activité <strong>salariée</strong> ou <strong>non salariée</strong> (micro-entreprise par exemple).','Vous déclarez rester à la recherche d\'un emploi.','Si vous perdez un emploi mais en gardez un autre, l\'ARE calculée sur l\'emploi perdu se cumule <strong>intégralement</strong> avec l\'emploi conservé.'],
 quoi:{ t:[['Situation','Calcul des jours indemnisés dans le mois'],['Activité salariée','(ARE mensuelle − <strong>70 %</strong> du nouveau salaire) ÷ ARE journalière'],['Activité non salariée','(ARE mensuelle − <strong>60 %</strong> des rémunérations déclarées) ÷ ARE journalière'],['Plafond','ARE versée + revenus ≤ votre salaire journalier de référence'],['Non salarié : limite','Complément plafonné à <strong>60 %</strong> du reliquat de droits, les 40 % restants pouvant être repris ensuite']],
   ex:'ARE de 40 € par jour (1 200 € par mois) et reprise à 800 € brut : (1 200 − 560) ÷ 40 = <strong>16 jours indemnisés</strong>, soit 640 € d\'ARE en plus du salaire.' },
 quand:{ p:'Chaque mois, lors de votre <strong>actualisation</strong>. Si vous n\'avez pas encore votre justificatif de revenus, France Travail verse une avance provisoire puis régularise le mois suivant.' },
 comment:[['Déclarer la reprise','Indiquez votre activité et vos revenus lors de l\'actualisation mensuelle.'],['Envoyer les justificatifs','Transmettez vos bulletins de salaire (ou vos revenus non salariés) dans votre espace personnel.'],['Contrôler le calcul','Vérifiez le nombre de jours indemnisés sur votre avis de paiement.'],['Suivre la fin de vos droits','Les jours non indemnisés reculent d\'autant la fin de votre indemnisation.']],
 pourquoi:'Les jours non payés ne sont <strong>pas perdus</strong> : ils repoussent la fin de vos droits. Ne pas déclarer une reprise d\'activité, en revanche, entraîne un trop-perçu à rembourser.',
 eva:'Une activité réduite vous fait gagner plus <strong>et</strong> prolonge vos droits. Déclarez-la toujours, même pour quelques heures.',
 src:[['Service-Public — Cumul ARE et revenus d\'activité',F,FD],['Légifrance — Code du travail, art. L5425-1 à L5425-2','https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006189832','','⚖️']],
 check:['Vos démarches pour cumuler ARE et salaire',['J\'ai déclaré ma reprise d\'activité lors de mon actualisation','J\'ai transmis mon bulletin de salaire ou mes revenus','J\'ai vérifié le nombre de jours indemnisés sur mon avis de paiement','Je sais que les jours non payés reculent la fin de mes droits','Je déclare chaque mois, même une activité de quelques heures']],
 est:{ title:'Eva calcule votre cumul', subtitle:'Activité salariée — formule Service-Public', fields:[{id:'aj',label:'ARE journalière',min:20,max:120,step:1,unit:'€',default:40},{id:'sal',label:'Nouveau salaire brut mensuel',min:100,max:3000,step:50,unit:'€',default:800}],
   calc:function(v){ var m=v[0]*30, j=Math.max(0,Math.min(30,Math.round((m-0.7*v[1])/v[0]))); return { val:j*v[0]+'€<span> d\'ARE</span>', detail:j+' jours indemnisés · total avec salaire : '+(j*v[0]+v[1])+' € brut' }; } },
 rel:['are','droits-rechargeables','prime-activite'],
 quiz:[['Peut-on toucher l\'ARE en retravaillant ?','Oui, si vous déclarez rester à la recherche d\'un emploi : l\'ARE est alors versée <strong>partiellement</strong>.'],['Quel pourcentage du nouveau salaire est déduit de l\'ARE ?','<strong>70 %</strong> du salaire de la nouvelle activité salariée, pour calculer le nombre de jours indemnisés.'],['Et pour une activité non salariée ?','C\'est <strong>60 %</strong> des rémunérations déclarées qui est pris en compte.'],['Que deviennent les jours non indemnisés ?','Ils <strong>reculent d\'autant</strong> la fin de votre indemnisation : vos droits sont prolongés.'],['Le cumul est-il plafonné ?','Oui : l\'ARE versée plus vos revenus ne peuvent pas dépasser votre <strong>salaire journalier de référence</strong>.']] }),

evadMk3({ id:'degressivite', aud:'dem', ico:'<path d="M3 7l6 6 4-4 8 8"/><path d="M21 11v6h-6"/>', title:'Dégressivité de l\'ARE — Qui est concerné ?', sub:'Seuil · 7e mois · Plancher',
 intro:'Pour les anciens hauts salaires, l\'ARE peut <strong>baisser de 30 %</strong> à partir du 7e mois. La grande majorité des demandeurs d\'emploi n\'est pas concernée.',
 loi:['La réglementation d\'assurance chômage prévoit une réduction de l\'allocation pour les personnes dont le salaire antérieur était élevé, avec un montant plancher garanti.','Convention d\'assurance chômage du 15 novembre 2024 et textes associés'],
 qui:['Les allocataires de <strong>moins de 55 ans</strong>.','Dont le salaire antérieur journalier brut moyen dépasse <strong>159,68 €</strong>, soit environ <strong>4 857,81 € brut par mois</strong>.'],
 quoi:{ t:[['Élément','Règle'],['Baisse','<strong>30 %</strong> de l\'allocation journalière'],['Début','À partir du <strong>7e mois</strong> de versement'],['Plancher','L\'allocation ne peut pas descendre sous <strong>92,57 € brut par jour</strong> (environ 2 777 € pour 30 jours)']] },
 quand:{ p:'La baisse s\'applique à partir du <strong>7e mois</strong> de versement de l\'allocation, pas du 7e mois de chômage.' },
 comment:[['Lire sa notification de droits','Elle indique votre salaire de référence et votre allocation journalière.'],['Comparer au seuil','Si votre ancien salaire était sous 4 857,81 € brut par mois, vous n\'êtes pas concerné(e).'],['Anticiper le 7e mois','Si vous êtes concerné(e), prévoyez votre budget avec le montant réduit.'],['Parler formation à votre conseiller','Une formation peut faire évoluer votre indemnisation : posez la question avant de vous engager.']],
 pourquoi:'Beaucoup de demandeurs d\'emploi s\'inquiètent à tort de la dégressivité. Seuls les anciens salaires élevés de moins de 55 ans sont concernés, et un <strong>plancher</strong> protège l\'allocation.',
 eva:'Vérifiez votre salaire de référence sur votre notification : si vous êtes sous le seuil, la dégressivité <strong>ne vous concerne pas du tout</strong>.',
 src:[['Service-Public — ARE après le 1er avril 2025 (dégressivité)',F,FD],['Unédic — Réglementation d\'assurance chômage','https://www.unedic.org','','📊']],
 check:['Vérifier si la dégressivité vous concerne',['J\'ai retrouvé ma notification de droits France Travail','J\'ai comparé mon ancien salaire au seuil de 4 857,81 € brut par mois','J\'ai noté mon âge à la fin du contrat (moins de 55 ans ?)','J\'ai calculé mon allocation après le 7e mois si je suis concerné(e)','J\'en ai parlé à mon conseiller si j\'envisage une formation']],
 est:{ title:'Eva vérifie la dégressivité', subtitle:'Estimation brute — seuils Service-Public 2026', fields:[{id:'sal',label:'Ancien salaire brut mensuel',min:2000,max:12000,step:100,unit:'€',default:5500}],
   calc:function(v){ var s=sjrOf(v[0]), d=areOf(s); if(s<=159.68) return { val:'Non concerné', detail:'Salaire journalier ≈ '+Math.round(s)+' € : sous le seuil de 159,68 €' }; var a=Math.max(d*0.7,92.57); return { val:Math.round(a*30)+'€<span>/mois dès le 7e mois</span>', detail:'Avant : ≈ '+Math.round(d*30)+' € · baisse de 30 % avec plancher de 92,57 €/j' }; } },
 rel:['are','carence-differe','cumul-are'],
 quiz:[['Qui est concerné par la dégressivité ?','Les allocataires de <strong>moins de 55 ans</strong> dont le salaire antérieur journalier brut moyen dépassait 159,68 €.'],['De combien l\'allocation baisse-t-elle ?','De <strong>30 %</strong>.'],['À partir de quand ?','À partir du <strong>7e mois</strong> de versement de l\'allocation.'],['Existe-t-il un minimum après la baisse ?','Oui : l\'allocation ne peut pas descendre sous <strong>92,57 € brut par jour</strong>.'],['Un salarié qui gagnait 3 000 € brut par mois est-il concerné ?','Non : son salaire est sous le seuil d\'environ <strong>4 857,81 € brut par mois</strong>.']] }),

evadMk3({ id:'carence-differe', aud:'dem', ico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', title:'Délai d\'attente et différés — Quand arrive le 1er paiement ?', sub:'7 jours · Congés payés · Indemnités supra-légales',
 intro:'Votre indemnisation ne commence pas le lendemain de la fin du contrat. <strong>Trois délais</strong> peuvent s\'appliquer, selon les sommes que vous avez reçues.',
 loi:['La réglementation d\'assurance chômage prévoit un délai d\'attente et des différés d\'indemnisation, qui courent à partir du lendemain de la fin du contrat de travail.','Convention d\'assurance chômage du 15 novembre 2024'],
 qui:'Tous les demandeurs d\'emploi indemnisés par l\'ARE. Les différés ne s\'appliquent que si vous avez reçu une indemnité de congés payés ou des indemnités de rupture <strong>supérieures au minimum légal</strong>.',
 quoi:{ t:[['Délai','Calcul'],['Délai d\'attente','<strong>7 jours</strong>, sauf s\'il a déjà été appliqué dans les 12 mois précédents'],['Différé congés payés','Indemnité compensatrice de congés payés ÷ salaire journalier de référence (arrondi au supérieur)'],['Différé spécifique','Indemnités supra-légales ÷ <strong>109,6</strong> (arrondi au supérieur)'],['Plafond du différé spécifique','<strong>150 jours</strong>, ou <strong>75 jours</strong> en cas de licenciement économique']],
   ex:'Indemnité supra-légale de 10 000 € : 10 000 ÷ 109,6 = 91 jours. Avec les 7 jours d\'attente, l\'indemnisation commence après environ <strong>100 jours</strong>.' },
 quand:{ p:'Les délais courent à partir du <strong>lendemain de la fin du contrat</strong>. Le délai d\'attente débute à la fin des différés.' },
 comment:[['Rassembler vos documents de fin de contrat','Solde de tout compte, attestation employeur, montant des indemnités.'],['Repérer la part supra-légale','Seule la part qui dépasse l\'indemnité légale crée un différé spécifique.'],['Calculer vos jours de différé','Utilisez les formules ci-dessus ou le simulateur France Travail.'],['Prévoir votre budget','Organisez vos finances jusqu\'au premier paiement.']],
 pourquoi:'Une <strong>indemnité négociée élevée</strong> retarde votre premier versement d\'ARE. Mieux vaut le savoir avant de signer une rupture conventionnelle, pour prévoir votre budget.',
 eva:'Les indemnités <strong>légales</strong> de licenciement ou de rupture conventionnelle ne créent pas de différé spécifique : seule la part au-dessus du minimum légal compte.',
 src:[['Service-Public — ARE après le 1er avril 2025 (délais et différés)',F,FD],['Unédic — Réglementation d\'assurance chômage','https://www.unedic.org','','📊']],
 check:['Préparer l\'arrivée de votre premier paiement',['J\'ai mon solde de tout compte et mon attestation employeur','J\'ai repéré le montant de mon indemnité de congés payés','J\'ai identifié la part de mes indemnités au-dessus du minimum légal','J\'ai estimé mon nombre de jours de différé','J\'ai prévu mon budget jusqu\'au premier versement']],
 est:{ title:'Eva calcule votre différé', subtitle:'Formules Service-Public — estimation', fields:[{id:'cp',label:'Indemnité de congés payés',min:0,max:6000,step:100,unit:'€',default:1000},{id:'sup',label:'Indemnités supra-légales',min:0,max:30000,step:500,unit:'€',default:5000},{id:'sjr',label:'Salaire journalier de référence',min:30,max:300,step:1,unit:'€',default:80}],
   calc:function(v){ var cp=Math.ceil(v[0]/v[2]), sp=Math.min(Math.ceil(v[1]/109.6),150), t=cp+sp+7; return { val:t+'<span> jours</span>', detail:'Congés payés : '+cp+' j · spécifique : '+sp+' j · attente : 7 j' }; } },
 rel:['are','rupture','solde'],
 quiz:[['Combien dure le délai d\'attente ?','<strong>7 jours</strong>, sauf s\'il a déjà été appliqué dans les 12 mois précédents.'],['Comment est calculé le différé congés payés ?','En divisant l\'indemnité compensatrice de congés payés par le <strong>salaire journalier de référence</strong>.'],['Quelles sommes créent un différé spécifique ?','Les indemnités de rupture <strong>supérieures au minimum légal</strong> (part conventionnelle ou supra-légale, clause de non-concurrence…).'],['Quel est le plafond du différé spécifique ?','<strong>150 jours</strong>, ou 75 jours en cas de licenciement économique.'],['Par quel nombre divise-t-on les indemnités supra-légales ?','Par <strong>109,6</strong>, en arrondissant au nombre entier supérieur.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();
/* ── Refonte · Demandeur d'emploi · Lot 2 ── */
(function(){
var F='https://www.service-public.gouv.fr/particuliers/vosdroits/F38881', FD='Vérifié le 23 juillet 2026';
var arts=[
evadMk3({ id:'demission-legitime', aud:'dem', ico:'<path d="M14 3h5v18h-5"/><path d="M10 17l5-5-5-5M15 12H3"/>', title:'Démission légitime — Toucher le chômage après une démission', sub:'Cas reconnus · Réexamen à 121 jours · Reconversion',
 intro:'En principe, démissionner ne donne pas droit au chômage, puisque le départ est volontaire. Mais il existe des <strong>exceptions</strong> : certaines démissions sont reconnues comme légitimes, et d\'autres situations permettent quand même d\'être indemnisé.',
 loi:['Seules les personnes involontairement privées d\'emploi peuvent en principe bénéficier des allocations chômage. Le régime d\'assurance chômage prévoit toutefois des dérogations pour le salarié démissionnaire.','Code du travail — fiche du ministère du Travail sur le droit au chômage du démissionnaire'],
 qui:['Le salarié dont la démission est <strong>considérée comme légitime</strong> par l\'assurance chômage : par exemple un déménagement lié à un mariage ou à un Pacs, des violences conjugales, ou certaines situations après une nouvelle embauche.','Le salarié dont la démission n\'est pas légitime, mais qui demande un <strong>réexamen</strong> après 121 jours (4 mois) de chômage non indemnisé.','Le salarié qui justifie d\'une durée d\'activité salariée suffisante et poursuit un projet de <strong>reconversion</strong>, de <strong>création</strong> ou de <strong>reprise d\'entreprise</strong> réel et sérieux, attesté par une commission paritaire.'],
 quoi:{ t:[['Situation','Ce que vous obtenez'],['Démission légitime','L\'ARE dans les conditions habituelles'],['Réexamen après 121 jours','Une nouvelle étude de votre dossier, qui peut ouvrir l\'indemnisation'],['Démission pour un projet validé','L\'ARE, si le projet est reconnu réel et sérieux par la commission paritaire']] },
 quand:{ t:[['Démarche','Délai'],['Réexamen','Après <strong>121 jours</strong> (4 mois) de chômage non indemnisé, à votre demande'],['Projet de reconversion','Le projet doit être validé par la commission paritaire, avant de démissionner']] },
 comment:[['Vérifier votre cas avant de démissionner','Comparez votre situation aux cas de démission légitime listés par Service-Public.'],['Pour une reconversion, faire valider le projet d\'abord','Rencontrez un conseiller en évolution professionnelle, puis faites attester votre projet par la commission paritaire régionale.'],['S\'inscrire à France Travail','Après la démission, inscrivez-vous et transmettez les justificatifs de votre situation.'],['Demander le réexamen si besoin','Sans indemnisation, demandez le réexamen de votre situation après 121 jours.']],
 pourquoi:'Une démission <strong>non légitime</strong> vous prive de l\'ARE pendant au moins 4 mois. Pour une reconversion, démissionner <strong>avant</strong> la validation du projet peut vous faire perdre le droit au chômage.',
 eva:'Ne démissionnez jamais sur une supposition : vérifiez votre cas exact avec France Travail. Et si votre projet est une reconversion, faites-le valider <strong>avant</strong> de poser votre lettre.',
 src:[['Ministère du Travail — Le droit au chômage du salarié démissionnaire','https://code.travail.gouv.fr/fiche-ministere-travail/le-droit-aux-allocations-chomage-du-salarie-demissionnaire','Mis à jour le 2 janvier 2025','⚖️'],['Service-Public — Un salarié peut-il toucher le chômage en cas de démission ?','https://code.travail.gouv.fr/fiche-service-public/un-salarie-peut-il-toucher-lallocation-chomage-en-cas-de-demission','Mis à jour le 1er avril 2025']],
 check:['Avant et après une démission',['J\'ai vérifié si ma démission entre dans un cas de démission légitime','Pour une reconversion, j\'ai rencontré un conseiller en évolution professionnelle','Mon projet a été validé par la commission paritaire avant ma démission','Je me suis inscrit(e) à France Travail avec mes justificatifs','Sans indemnisation, j\'ai noté la date des 121 jours pour demander un réexamen']],
 rel:['are','rupture','plein-emploi'],
 quiz:[['Une démission donne-t-elle droit au chômage ?','En principe non, car le départ est volontaire. Mais une <strong>démission légitime</strong> ouvre droit à l\'ARE dans les conditions habituelles.'],['Après combien de temps peut-on demander un réexamen ?','Après <strong>121 jours</strong> (4 mois) de chômage non indemnisé.'],['Qui valide un projet de reconversion pour un démissionnaire ?','Une <strong>commission paritaire</strong>, qui atteste que le projet est réel et sérieux.'],['Un déménagement pour se marier peut-il rendre la démission légitime ?','Oui : un déménagement lié à un <strong>mariage ou un Pacs</strong> fait partie des cas reconnus.'],['Faut-il démissionner avant ou après la validation du projet ?','<strong>Après</strong> : le projet doit être validé avant la démission.']] }),

evadMk3({ id:'ass', aud:'dem', ico:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>', title:'ASS — Allocation de solidarité spécifique', sub:'Fin de droits · Montant 2026 · Ressources',
 intro:'Quand vos droits à l\'ARE sont épuisés, l\'<strong>allocation de solidarité spécifique (ASS)</strong> peut prendre le relais, si vos ressources ne dépassent pas un plafond et si vous avez suffisamment travaillé auparavant.',
 loi:['L\'ASS est une allocation de solidarité versée par France Travail aux demandeurs d\'emploi en fin de droits. Son montant journalier a été revalorisé au 1er avril 2026.','Décret n° 2026-219 du 30 mars 2026 revalorisant l\'ASS'],
 qui:['Vous avez <strong>épuisé vos droits</strong> à l\'allocation chômage (ARE).','Vous justifiez de <strong>5 ans d\'activité salariée</strong> dans les 10 ans précédant la fin de votre contrat.','Vos ressources mensuelles ne dépassent pas le plafond fixé (calculé sur la moyenne des 12 derniers mois).','Vous êtes à la recherche d\'un emploi.'],
 quoi:{ t:[['Élément','Montant ou règle'],['Montant journalier','<strong>19,48 €</strong> depuis le 1er avril 2026'],['Montant pour 30 jours','<strong>584,40 €</strong>'],['Plafond de ressources (personne seule)','ASS versée = <strong>1 363,60 €</strong> moins vos ressources, dans la limite du montant maximal'],['Plafond de ressources (couple)','ASS versée = <strong>2 142,80 €</strong> moins les ressources du couple'],['Durée','Par périodes de <strong>6 mois renouvelables</strong>']] },
 quand:{ p:'L\'étude du droit à l\'ASS intervient <strong>à l\'épuisement</strong> de vos droits à l\'ARE. Vous n\'avez <strong>aucune démarche</strong> à faire : France Travail examine votre situation. Le droit est ensuite réexaminé tous les 6 mois.' },
 comment:[['Surveiller la fin de vos droits ARE','Repérez la date d\'épuisement sur votre espace France Travail.'],['Préparer vos justificatifs d\'activité','Rassemblez les preuves de vos 5 ans d\'activité salariée sur les 10 dernières années.'],['Déclarer vos ressources','Indiquez vos ressources et celles de votre conjoint lorsque France Travail vous le demande.'],['Rester en recherche d\'emploi','Continuez à vous actualiser chaque mois pour garder le droit.']],
 pourquoi:'Le montant de l\'ASS dépend de vos <strong>ressources</strong> : au-delà du plafond, aucune allocation n\'est versée. Une reprise d\'activité qui se poursuit interrompt aussi le versement.',
 eva:'Vérifiez vos années d\'activité <strong>avant</strong> la fin de vos droits : si la condition des 5 ans n\'est pas remplie, renseignez-vous tout de suite sur les autres aides, comme le RSA.',
 src:[['Service-Public — Allocation de solidarité spécifique (ASS)','https://www.service-public.gouv.fr/particuliers/vosdroits/F12484','Mis à jour le 1er avril 2026'],['France Travail — Ouverture de droits à l\'ASS','https://www.francetravail.fr/files/live/sites/PE/files/fichiers-en-telechargement/fichiers-en-telechargement---dem/1-algo-Admission-ASS-vd.pdf','','🏛️']],
 check:['Préparer le relais de l\'ASS',['J\'ai repéré la date de fin de mes droits à l\'ARE','J\'ai vérifié mes 5 ans d\'activité salariée sur les 10 dernières années','J\'ai calculé mes ressources mensuelles des 12 derniers mois','Je garde mes justificatifs de ressources à jour','Je continue à m\'actualiser chaque mois']],
 est:{ title:'Eva estime votre ASS', subtitle:'Personne seule — barème Service-Public au 1er avril 2026', fields:[{id:'res',label:'Vos ressources mensuelles',min:0,max:1400,step:20,unit:'€',default:300}],
   calc:function(v){ var m=Math.max(0,Math.min(584.40,1363.60-v[0])); return m>0 ? { val:Math.round(m)+'€<span>/mois</span>', detail:'1 363,60 € − '+v[0]+' € de ressources, plafonné à 584,40 €' } : { val:'Pas d\'ASS', detail:'Vos ressources dépassent le plafond' }; } },
 rel:['are','prime-activite','plein-emploi'],
 quiz:[['Quand peut-on toucher l\'ASS ?','Quand on a <strong>épuisé ses droits</strong> à l\'ARE et qu\'on remplit les conditions de ressources et d\'activité.'],['Quel est le montant journalier de l\'ASS ?','<strong>19,48 €</strong> par jour depuis le 1er avril 2026, soit 584,40 € pour 30 jours.'],['Combien d\'années d\'activité faut-il justifier ?','<strong>5 ans</strong> d\'activité salariée dans les 10 ans précédant la fin du contrat.'],['Faut-il faire une demande ?','Non : vous n\'avez <strong>aucune démarche</strong> à faire, France Travail étudie votre droit à la fin de l\'ARE.'],['Pour combien de temps l\'ASS est-elle accordée ?','Par périodes de <strong>6 mois renouvelables</strong>.']] }),

evadMk3({ id:'aides-mobilite', aud:'dem', ico:'<path d="M5 17h14M6 17l1-6h10l1 6"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>', title:'Aide à la mobilité de France Travail', sub:'Déplacement · Repas · Hébergement · 5 200 € par an',
 intro:'Un emploi, un entretien ou une formation loin de chez vous ? France Travail peut prendre en charge une partie de vos <strong>frais de déplacement, de repas et d\'hébergement</strong>.',
 loi:['L\'aide à la mobilité est une aide de France Travail destinée à faciliter la reprise d\'emploi des demandeurs d\'emploi qui doivent se déplacer loin de leur domicile.','Délibération du conseil d\'administration de France Travail'],
 qui:['Vous êtes <strong>inscrit(e)</strong> à France Travail.','Vous remplissez la condition de ressources, par exemple si vous percevez le RSA, une rémunération de formation, l\'AAH ou une pension de retraite.','Le lieu de votre reprise d\'emploi est situé à plus de <strong>60 km aller-retour</strong> ou à <strong>2 heures de trajet</strong> aller-retour de votre domicile (20 km en Outre-mer).'],
 quoi:{ t:[['Frais','Prise en charge'],['Déplacement','Jusqu\'à <strong>0,23 € par km</strong> parcouru aller-retour'],['Repas','Forfait de <strong>6,25 € par jour</strong>, sauf si l\'employeur les prend déjà en charge'],['Hébergement','Jusqu\'à <strong>31,20 € par nuitée</strong>, sur justificatifs'],['Plafond annuel','<strong>5 200 €</strong>, tous frais confondus'],['Période couverte','Les frais du <strong>premier mois</strong> de reprise d\'emploi']],
   ex:'Un emploi à 40 km de chez vous : 80 km aller-retour × 0,23 € = <strong>18,40 € par jour</strong> de trajet, plus 6,25 € de repas.' },
 quand:{ p:'Faites la demande depuis votre espace personnel France Travail, <strong>de préférence avant</strong> le déplacement.' },
 comment:[['Vérifier la distance','Le lieu doit être à plus de 60 km ou 2 heures aller-retour de votre domicile.'],['Faire la demande en ligne','Depuis votre espace personnel France Travail, avant de vous déplacer si possible.'],['Garder tous les justificatifs','Billets, factures d\'hôtel, preuves de trajet : ils sont nécessaires au versement.'],['Suivre votre plafond','Toutes les aides de l\'année comptent dans la limite de 5 200 €.']],
 pourquoi:'Ces aides restent <strong>peu connues</strong>, alors qu\'elles peuvent rendre possible une reprise d\'emploi éloignée. Sans justificatifs, aucun remboursement n\'est possible.',
 eva:'Une offre intéressante mais loin de chez vous ? Parlez de l\'aide à la mobilité à votre conseiller <strong>avant</strong> de la refuser.',
 src:[['France Travail — Reprise d\'emploi : l\'aide au déplacement','https://www.francetravail.fr/candidat/vos-recherches/les-aides-financieres/reprise-demploi---laide-au-depla.html','Consulté le 4 octobre 2026','🏛️']],
 check:['Obtenir votre aide à la mobilité',['J\'ai vérifié que le lieu est à plus de 60 km ou 2 h aller-retour','J\'ai vérifié que je remplis la condition de ressources','J\'ai fait ma demande dans mon espace personnel France Travail','Je garde tous mes billets et factures','Je suis mon plafond annuel de 5 200 €']],
 est:{ title:'Eva calcule vos frais de trajet', subtitle:'Barème France Travail : 0,23 €/km + 6,25 € de repas par jour', fields:[{id:'km',label:'Distance aller simple',min:30,max:200,step:5,unit:'km',default:40},{id:'j',label:'Jours travaillés le 1er mois',min:1,max:23,step:1,unit:'j',default:20}],
   calc:function(v){ var t=Math.min(5200,v[1]*(v[0]*2*0.23+6.25)); return { val:Math.round(t)+'€<span> sur le 1er mois</span>', detail:'Trajet : '+(v[0]*2*0.23).toFixed(2).replace('.',',')+' €/j + repas : 6,25 €/j' }; } },
 rel:['permis-ft','are','agepi'],
 quiz:[['Quelle distance minimale ouvre droit à l\'aide à la mobilité ?','Plus de <strong>60 km aller-retour</strong>, ou 2 heures de trajet aller-retour (20 km en Outre-mer).'],['Combien est remboursé le kilomètre ?','Jusqu\'à <strong>0,23 €</strong> par kilomètre parcouru aller-retour.'],['Quel est le forfait repas ?','<strong>6,25 €</strong> par jour, sauf si l\'employeur prend déjà les repas en charge.'],['Quel est le plafond annuel ?','<strong>5 200 €</strong>, tous types de frais confondus.'],['Quand faire la demande ?','Depuis l\'espace personnel France Travail, <strong>de préférence avant</strong> le déplacement.']] }),

evadMk3({ id:'are-formation', aud:'dem', ico:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/>', title:'Se former pendant le chômage — L\'Aref', sub:'Allocation · Durée allongée · Conditions',
 intro:'Suivre une formation pendant le chômage ne fait pas perdre ses revenus : si la formation est prescrite par France Travail, l\'ARE devient l\'<strong>Aref</strong>, l\'allocation d\'aide au retour à l\'emploi formation.',
 loi:['Le demandeur d\'emploi qui suit une formation prescrite par France Travail perçoit l\'Aref à la place de l\'ARE. Une formation inscrite au contrat d\'engagement peut aussi allonger la durée d\'indemnisation.','Convention d\'assurance chômage du 15 novembre 2024'],
 qui:['Vous percevez l\'ARE et vous suivez une formation <strong>prescrite par France Travail</strong>.','Pour l\'allongement de la durée : vous avez moins de 55 ans, 55-56 ans ou 57 ans et plus, et vous justifiez d\'au moins <strong>652 jours travaillés</strong>.'],
 quoi:{ t:[['Élément','Règle'],['Allocation pendant la formation','L\'<strong>Aref</strong>, à la place de l\'ARE'],['Montant minimal de l\'Aref','<strong>22,99 €</strong> par jour'],['Allongement de la durée','Jusqu\'à <strong>137 jours</strong> de plus en cas de formation indemnisée en Aref'],['Complément de fin de formation','Possible sous conditions, pour une formation qualifiante d\'au moins 6 mois inscrite au contrat d\'engagement']] },
 quand:{ p:'La formation doit être <strong>prescrite par France Travail</strong> pour être indemnisée en Aref : faites-la valider avant de vous inscrire.' },
 comment:[['Choisir une formation liée à votre projet','Repérez une formation qui correspond à votre projet professionnel.'],['La faire prescrire par votre conseiller','Sans prescription de France Travail, l\'Aref ne s\'applique pas.'],['Vérifier son inscription au contrat d\'engagement','C\'est utile pour un éventuel complément de fin de formation.'],['Continuer à s\'actualiser','Déclarez chaque mois votre entrée en formation et sa poursuite.']],
 pourquoi:'Une formation suivie <strong>sans prescription</strong> de France Travail ne garantit pas le maintien de vos revenus. La validation préalable fait toute la différence.',
 eva:'Une formation peut <strong>prolonger</strong> votre indemnisation : parlez-en à votre conseiller avant d\'arriver en fin de droits, pas après.',
 src:[['Service-Public — ARE après le 1er avril 2025 (Aref et allongement)',F,FD],['Service-Public — Allocation d\'aide au retour à l\'emploi formation (Aref)','https://www.service-public.gouv.fr/particuliers/vosdroits/F291','']],
 check:['Vos démarches pour vous former sans perdre vos revenus',['J\'ai choisi une formation liée à mon projet professionnel','Ma formation est prescrite par France Travail','Elle est inscrite à mon contrat d\'engagement','J\'ai vérifié si je peux bénéficier de l\'allongement de durée','Je déclare mon entrée en formation lors de mon actualisation']],
 rel:['are','droits-rechargeables','aides-mobilite'],
 quiz:[['Comment s\'appelle l\'allocation versée pendant une formation prescrite ?','L\'<strong>Aref</strong>, allocation d\'aide au retour à l\'emploi formation.'],['Quel est son montant minimal ?','<strong>22,99 €</strong> par jour.'],['De combien de jours la durée peut-elle être allongée ?','Jusqu\'à <strong>137 jours</strong> en cas de formation indemnisée en Aref.'],['Combien de jours travaillés faut-il pour cet allongement ?','Au moins <strong>652 jours travaillés</strong>.'],['Qui doit prescrire la formation ?','<strong>France Travail</strong> : sans prescription, l\'Aref ne s\'applique pas.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();
/* ── Refonte · Articles communs Salarié / Demandeur d'emploi + période d'essai ── */
(function(){
var LEG=function(q){ return 'https://www.legifrance.gouv.fr/search/code?tab_selection=code&searchField=ALL&query='+encodeURIComponent(q); };
var LD='Texte en vigueur · consulté le 4 octobre 2026';
var arts=[
evadMk3({ id:'rupture', aud:'both', ico:'<path d="M8 12h8"/><path d="M3 12a4 4 0 0 1 4-4h2M21 12a4 4 0 0 0-4-4h-2M3 12a4 4 0 0 0 4 4h2M21 12a4 4 0 0 1-4 4h-2"/>', title:'Rupture conventionnelle — Procédure et indemnité', sub:'Accord · Rétractation · Homologation',
 intro:'La <strong>rupture conventionnelle</strong> permet à l\'employeur et au salarié en CDI de mettre fin au contrat <strong>d\'un commun accord</strong>. Elle suit une procédure précise, qui protège votre consentement.',
 loi:['La rupture conventionnelle repose sur la volonté commune des deux parties. Elle ne peut être imposée ni par l\'employeur, ni par le salarié.','Code du travail, articles L1237-11 à L1237-16'],
 qui:['Les salariés en <strong>CDI</strong>, d\'un commun accord avec leur employeur.','Les salariés protégés (élus du personnel, délégués syndicaux), mais avec l\'<strong>autorisation de l\'inspecteur du travail</strong> au lieu de l\'homologation.'],
 quoi:{ t:[['Élément','Règle'],['Indemnité minimale','Au moins l\'<strong>indemnité légale de licenciement</strong>, ou l\'indemnité conventionnelle si elle est plus favorable'],['Indemnité légale','<strong>1/4 de mois</strong> de salaire par année jusqu\'à 10 ans, puis <strong>1/3 de mois</strong> au-delà'],['Chômage','La rupture conventionnelle ouvre droit à l\'ARE'],['Date de fin','Au plus tôt le lendemain de l\'homologation']] },
 quand:{ t:[['Étape','Délai'],['Rétractation','<strong>15 jours calendaires</strong> à partir du lendemain de la signature, pour chacune des parties'],['Homologation','La DREETS dispose de <strong>15 jours ouvrables</strong> après réception de la demande'],['Sans réponse','L\'homologation est considérée comme acquise']] },
 comment:[['Négocier lors d\'un ou plusieurs entretiens','Vous pouvez vous faire assister pendant les entretiens.'],['Signer la convention','Elle fixe le montant de l\'indemnité et la date de fin du contrat.'],['Utiliser votre délai de rétractation','Vous avez 15 jours calendaires pour changer d\'avis, par écrit.'],['Vérifier l\'homologation','La demande se fait obligatoirement en ligne sur TéléRC ; gardez l\'attestation.']],
 pourquoi:'Avant l\'homologation, le contrat <strong>n\'est pas rompu</strong>. Une indemnité inférieure au minimum légal ou un consentement forcé peuvent entraîner un refus d\'homologation.',
 eva:'Calculez votre indemnité minimale avec le simulateur officiel du Code du travail numérique <strong>avant</strong> le premier entretien : vous négocierez en connaissant votre plancher.',
 src:[['Code du travail numérique — Qu\'est-ce qu\'une rupture conventionnelle ?','https://code.travail.gouv.fr/contribution/quest-ce-quune-rupture-conventionnelle','Mis à jour le 4 octobre 2023','⚖️'],['Légifrance — Code du travail, art. L1237-11 à L1237-16',LEG('L1237-11'),LD,'⚖️']],
 check:['Préparer votre rupture conventionnelle',['J\'ai calculé mon indemnité minimale avec le simulateur officiel','J\'ai vérifié si ma convention collective prévoit plus','J\'ai noté la fin de mon délai de rétractation de 15 jours','J\'ai vérifié l\'homologation sur TéléRC et gardé l\'attestation','Je me suis inscrit(e) à France Travail après la fin du contrat']],
 est:{ title:'Eva calcule votre indemnité minimale', subtitle:'Indemnité légale — 1/4 de mois par an jusqu\'à 10 ans, 1/3 au-delà', fields:[{id:'s',label:'Salaire brut mensuel moyen',min:1200,max:8000,step:100,unit:'€',default:2500},{id:'a',label:'Ancienneté',min:1,max:40,step:1,unit:'ans',default:5}],
   calc:function(v){ var s=v[0],a=v[1], i=a<=10?s/4*a:s/4*10+s/3*(a-10); return { val:Math.round(i)+'€', detail:'Minimum légal · votre convention collective peut prévoir plus' }; } },
 rel:['licenciement','are','carence-differe'],
 quiz:[['Qui peut imposer une rupture conventionnelle ?','Personne : elle repose sur la <strong>volonté commune</strong> de l\'employeur et du salarié.'],['Combien de temps dure le délai de rétractation ?','<strong>15 jours calendaires</strong> à partir du lendemain de la signature.'],['Combien de temps la DREETS a-t-elle pour homologuer ?','<strong>15 jours ouvrables</strong> ; sans réponse, l\'homologation est acquise.'],['Quelle est l\'indemnité minimale ?','Au moins l\'<strong>indemnité légale de licenciement</strong>, ou l\'indemnité conventionnelle si elle est plus favorable.'],['La rupture conventionnelle ouvre-t-elle droit au chômage ?','<strong>Oui</strong>, elle ouvre droit à l\'ARE si vous remplissez les autres conditions.']] }),

evadMk3({ id:'licenciement', aud:'both', ico:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13l6 4M15 13l-6 4"/>', title:'Licenciement — Procédure, préavis et indemnité', sub:'Entretien préalable · Lettre · Indemnité légale',
 intro:'Un licenciement doit reposer sur une <strong>cause réelle et sérieuse</strong> et suivre une procédure stricte. Chaque étape a ses délais : les connaître permet de défendre vos droits.',
 loi:['Le licenciement d\'un salarié en CDI suppose une cause réelle et sérieuse. L\'employeur doit convoquer le salarié à un entretien préalable, puis lui notifier sa décision par lettre.','Code du travail, articles L1232-1 à L1232-6 et L1234-1 à L1234-9'],
 qui:['Les salariés en <strong>CDI</strong>, licenciés pour motif personnel (faute ou non) ou pour motif économique.','L\'indemnité légale concerne les salariés qui ont au moins <strong>8 mois d\'ancienneté</strong> et ne sont pas licenciés pour faute grave ou lourde.'],
 quoi:{ t:[['Élément','Règle'],['Indemnité légale','<strong>1/4 de mois</strong> de salaire par année jusqu\'à 10 ans, puis <strong>1/3 de mois</strong> au-delà'],['Préavis (6 mois à moins de 2 ans d\'ancienneté)','<strong>1 mois</strong>'],['Préavis (2 ans et plus)','<strong>2 mois</strong>'],['Faute grave ou lourde','Ni préavis, ni indemnité de licenciement'],['Toujours dû','Salaire restant, congés payés non pris']] },
 quand:{ t:[['Étape','Délai minimum'],['Convocation → entretien','<strong>5 jours ouvrables</strong> après la première présentation de la lettre'],['Entretien → lettre de licenciement','<strong>2 jours ouvrables</strong>'],['Contester devant les prud\'hommes','Dans les <strong>12 mois</strong> suivant la notification']] },
 comment:[['Lire attentivement la convocation','Elle indique l\'objet, la date, l\'heure et le lieu de l\'entretien.'],['Vous faire assister à l\'entretien','Par un salarié de l\'entreprise ou, sans représentant du personnel, par un conseiller du salarié.'],['Analyser la lettre de licenciement','Elle doit énoncer le motif : c\'est lui qui sera examiné en cas de litige.'],['Vérifier vos sommes de fin de contrat','Indemnité, préavis, congés payés, puis inscrivez-vous à France Travail.']],
 pourquoi:'Un délai non respecté ou une lettre sans motif précis peuvent vous ouvrir droit à une <strong>indemnisation</strong>. Le délai pour contester est limité : n\'attendez pas.',
 eva:'Gardez la convocation, vos notes d\'entretien et la lettre de licenciement : ce sont vos trois pièces clés si vous contestez.',
 src:[['Légifrance — Code du travail, art. L1232-1 et suivants',LEG('L1232-2'),LD,'⚖️'],['Légifrance — Code du travail, art. L1234-9 (indemnité légale)',LEG('L1234-9'),LD,'⚖️'],['Code du travail numérique — Simulateur d\'indemnité de licenciement','https://code.travail.gouv.fr/outils/indemnite-licenciement','','⚖️']],
 check:['Vos démarches face à un licenciement',['J\'ai vérifié le délai de 5 jours ouvrables avant l\'entretien','Je me suis fait assister à l\'entretien','J\'ai relu le motif dans ma lettre de licenciement','J\'ai calculé mon indemnité avec le simulateur officiel','Je me suis inscrit(e) à France Travail après la fin du contrat']],
 est:{ title:'Eva calcule votre indemnité légale', subtitle:'Art. R1234-2 du Code du travail', fields:[{id:'s',label:'Salaire brut mensuel moyen',min:1200,max:8000,step:100,unit:'€',default:2500},{id:'a',label:'Ancienneté',min:1,max:40,step:1,unit:'ans',default:5}],
   calc:function(v){ var s=v[0],a=v[1], i=a<=10?s/4*a:s/4*10+s/3*(a-10); return { val:Math.round(i)+'€', detail:'Minimum légal, dû à partir de 8 mois d\'ancienneté (hors faute grave)' }; } },
 rel:['rupture','are','csp'],
 quiz:[['Quel délai minimum entre la convocation et l\'entretien préalable ?','<strong>5 jours ouvrables</strong> après la première présentation de la lettre.'],['Quand l\'employeur peut-il envoyer la lettre de licenciement ?','Au moins <strong>2 jours ouvrables</strong> après l\'entretien.'],['À partir de quelle ancienneté l\'indemnité légale est-elle due ?','<strong>8 mois</strong>, sauf faute grave ou lourde.'],['Quel préavis après 2 ans d\'ancienneté ?','<strong>2 mois</strong>, sauf disposition plus favorable.'],['Combien de temps pour contester devant les prud\'hommes ?','<strong>12 mois</strong> à partir de la notification.']] }),

evadMk3({ id:'mutuelle', aud:'both', ico:'<path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6z"/><path d="M9 12h6M12 9v6"/>', title:'Mutuelle et prévoyance — La portabilité', sub:'Maintien gratuit · Durée · Conditions',
 intro:'Quand votre contrat se termine et que vous êtes indemnisé(e) par l\'assurance chômage, vous pouvez garder <strong>gratuitement</strong> la mutuelle et la prévoyance de votre ancienne entreprise. C\'est la <strong>portabilité</strong>.',
 loi:['Les salariés garantis collectivement par l\'entreprise bénéficient du maintien de ces garanties en cas de cessation du contrat ouvrant droit à l\'assurance chômage.','Code de la sécurité sociale, article L911-8'],
 qui:['Les salariés dont le contrat prend fin, <strong>sauf faute lourde</strong>.','Qui ont droit à l\'<strong>assurance chômage</strong>.','Qui bénéficiaient de la mutuelle ou de la prévoyance collective de l\'entreprise.'],
 quoi:{ t:[['Élément','Règle'],['Garanties','Les mêmes que celles des salariés en poste'],['Coût','<strong>Gratuit</strong> pour l\'ancien salarié'],['Durée','Égale à la durée du dernier contrat, dans la limite de <strong>12 mois</strong>'],['Fin anticipée','Dès la reprise d\'un emploi ou la fin de l\'indemnisation chômage']] },
 quand:{ p:'La portabilité commence <strong>dès le lendemain</strong> de la fin du contrat. Vous devez justifier auprès de l\'organisme de votre indemnisation par l\'assurance chômage.' },
 comment:[['Vérifier la mention de la portabilité','Votre employeur doit signaler le maintien des garanties dans le certificat de travail.'],['Envoyer vos justificatifs','Transmettez à la mutuelle votre attestation d\'indemnisation par France Travail.'],['Signaler la fin de l\'indemnisation','Prévenez la mutuelle si vous retrouvez un emploi.'],['Anticiper la sortie','Avant la fin de la portabilité, comparez les mutuelles individuelles ou la complémentaire santé solidaire.']],
 pourquoi:'Sans justificatif d\'indemnisation, la mutuelle peut cesser de rembourser. La portabilité est <strong>gratuite</strong> : ne payez pas une nouvelle mutuelle avant d\'avoir vérifié vos droits.',
 eva:'Avant la fin des 12 mois, vérifiez si vous avez droit à la <strong>complémentaire santé solidaire</strong> : elle peut être gratuite selon vos ressources.',
 src:[['Légifrance — Code de la sécurité sociale, art. L911-8',LEG('L911-8'),LD,'⚖️'],['Service-Public — Mutuelle et chômage','https://www.service-public.gouv.fr/particuliers/recherche?keyword=portabilite%20mutuelle','']],
 check:['Garder votre mutuelle après le contrat',['La portabilité est mentionnée dans mon certificat de travail','J\'ai envoyé mon attestation d\'indemnisation à la mutuelle','J\'ai noté la date de fin de ma portabilité (12 mois maximum)','Je préviendrai la mutuelle si je reprends un emploi','J\'ai regardé mes droits à la complémentaire santé solidaire']],
 rel:['are','licenciement','rupture'],
 quiz:[['Combien coûte la portabilité de la mutuelle ?','Rien : elle est <strong>gratuite</strong> pour l\'ancien salarié.'],['Combien de temps dure-t-elle au maximum ?','<strong>12 mois</strong>, dans la limite de la durée du dernier contrat.'],['Qui est exclu de la portabilité ?','Le salarié licencié pour <strong>faute lourde</strong>.'],['Faut-il avoir droit au chômage ?','<strong>Oui</strong>, la portabilité est liée à l\'indemnisation par l\'assurance chômage.'],['Quand la portabilité s\'arrête-t-elle avant 12 mois ?','À la <strong>reprise d\'un emploi</strong> ou à la fin de l\'indemnisation chômage.']] }),

evadMk3({ id:'periode-essai', aud:'sal', ico:'<path d="M8 13V5a2 2 0 0 1 4 0v6M12 11V4a2 2 0 0 1 4 0v7M16 11V6a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L4 14a2 2 0 0 1 3.4-2L8 13"/>', title:'Période d\'essai — Durées et rupture', sub:'Durées · Renouvellement · Délai de prévenance',
 intro:'La période d\'essai permet à l\'employeur d\'évaluer vos compétences, et à vous de vérifier que le poste vous convient. Elle n\'est pas automatique et elle est <strong>strictement encadrée</strong>.',
 loi:['La période d\'essai et sa durée ne se présument pas : elles doivent être prévues dans la lettre d\'engagement ou le contrat de travail.','Code du travail, articles L1221-19 à L1221-26'],
 qui:['Les salariés en <strong>CDI</strong> dont le contrat prévoit une période d\'essai.','Pour un CDD, des règles de durée particulières s\'appliquent selon la durée du contrat.'],
 quoi:{ t:[['Catégorie (CDI)','Durée maximale initiale'],['Ouvriers et employés','<strong>2 mois</strong>'],['Agents de maîtrise et techniciens','<strong>3 mois</strong>'],['Cadres','<strong>4 mois</strong>'],['Renouvellement','Une seule fois, s\'il est prévu par un accord de branche étendu <strong>et</strong> par le contrat']] },
 quand:{ t:[['Rupture par l\'employeur : temps de présence','Délai de prévenance'],['Moins de 8 jours','24 heures'],['Entre 8 jours et 1 mois','48 heures'],['Après 1 mois','2 semaines'],['Après 3 mois','1 mois'],['Rupture par le salarié','48 heures (24 heures avant 8 jours de présence)']] },
 comment:[['Vérifier votre contrat','La période d\'essai et sa durée doivent y être écrites.'],['Contrôler la durée','Comparez-la aux maximums légaux et à votre convention collective.'],['Refuser un renouvellement non souhaité','Il faut votre accord exprès : il ne peut pas vous être imposé.'],['Respecter le délai de prévenance','Si vous partez, prévenez dans le délai ; l\'employeur aussi.']],
 pourquoi:'Une période d\'essai <strong>non écrite</strong> dans le contrat n\'existe pas. Et un renouvellement sans votre accord n\'est pas valable.',
 eva:'Ne signez jamais un renouvellement sous la pression : votre <strong>accord exprès</strong> est indispensable.',
 src:[['Légifrance — Code du travail, art. L1221-19 à L1221-26',LEG('L1221-19'),LD,'⚖️'],['Code du travail numérique — Rupture en période d\'essai (modèle)','https://code.travail.gouv.fr/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie','','⚖️']],
 check:['Sécuriser votre période d\'essai',['La période d\'essai est écrite dans mon contrat','Sa durée respecte le maximum légal de ma catégorie','J\'ai vérifié ma convention collective','Je n\'accepte un renouvellement que si je suis d\'accord, par écrit','Je connais les délais de prévenance si je pars']],
 rel:['promesse-embauche','licenciement','are'],
 quiz:[['La période d\'essai est-elle automatique ?','Non : elle doit être <strong>prévue par écrit</strong> dans la lettre d\'engagement ou le contrat.'],['Quelle durée maximale pour un cadre ?','<strong>4 mois</strong>, avant un éventuel renouvellement.'],['Le renouvellement peut-il être imposé ?','Non : il faut un accord de branche, une clause au contrat et <strong>votre accord exprès</strong>.'],['Quel délai de prévenance après 3 mois de présence ?','<strong>1 mois</strong> si l\'employeur met fin à l\'essai.'],['Quel délai pour le salarié qui part ?','<strong>48 heures</strong>, ou 24 heures avant 8 jours de présence.']] }),

evadMk3({ id:'rqth', aud:'both', ico:'<circle cx="12" cy="4" r="2"/><path d="M12 7v6l4 5M12 13l-4 5M7 10h10"/>', title:'RQTH — Reconnaissance de travailleur handicapé', sub:'MDPH · Obligation d\'emploi · Protection',
 intro:'La <strong>reconnaissance de la qualité de travailleur handicapé (RQTH)</strong> ouvre des droits concrets pour trouver ou garder un emploi. Elle concerne aussi des maladies chroniques ou des handicaps invisibles.',
 loi:['Est considérée comme travailleur handicapé toute personne dont les possibilités d\'obtenir ou de conserver un emploi sont effectivement réduites par l\'altération d\'une ou plusieurs fonctions physique, sensorielle, mentale ou psychique.','Code du travail, articles L5213-1 et L5212-2'],
 qui:['Toute personne dont l\'état de santé réduit effectivement ses possibilités d\'obtenir ou de garder un emploi.','Salariés comme demandeurs d\'emploi.'],
 quoi:{ t:[['Avantage','Règle'],['Obligation d\'emploi','Les entreprises d\'au moins <strong>20 salariés</strong> doivent employer des travailleurs handicapés à hauteur de <strong>6 %</strong> de leur effectif'],['Accompagnement','Cap emploi, en plus de France Travail'],['Aménagements','Mesures appropriées pour accéder à un emploi ou le conserver'],['Licenciement','Préavis <strong>doublé</strong>, dans la limite de 3 mois']] },
 quand:{ p:'La demande est faite auprès de la <strong>MDPH</strong> de votre département. La reconnaissance est accordée pour une durée déterminée, ou sans limite de durée selon la situation.' },
 comment:[['Obtenir un certificat médical','Votre médecin remplit le certificat médical à joindre à la demande.'],['Déposer la demande à la MDPH','Avec le formulaire de demande et vos justificatifs.'],['Choisir si vous en parlez','Vous n\'êtes pas obligé(e) d\'informer votre employeur.'],['Mobiliser l\'accompagnement','Cap emploi et les aides à l\'aménagement de poste.']],
 pourquoi:'Beaucoup de personnes concernées <strong>ne la demandent pas</strong>, faute de savoir qu\'elles y ont droit. La RQTH reste confidentielle : c\'est vous qui décidez de l\'utiliser.',
 eva:'Une maladie chronique qui vous gêne au travail ? Parlez-en à votre médecin : la RQTH peut vous apporter des <strong>aménagements</strong> sans que votre employeur connaisse votre diagnostic.',
 src:[['Légifrance — Code du travail, art. L5213-1',LEG('L5213-1'),LD,'⚖️'],['Légifrance — Code du travail, art. L5212-2 (obligation d\'emploi)',LEG('L5212-2'),LD,'⚖️'],['Agefiph','https://www.agefiph.fr','','♿']],
 check:['Demander et utiliser votre RQTH',['J\'ai obtenu le certificat médical de mon médecin','J\'ai déposé ma demande auprès de la MDPH','J\'ai noté la durée de ma reconnaissance','J\'ai décidé si j\'en parle ou non à mon employeur','J\'ai contacté Cap emploi pour être accompagné(e)']],
 rel:['prime-activite','are','medecine-travail'],
 quiz:[['Qui délivre la RQTH ?','La <strong>MDPH</strong> de votre département.'],['Faut-il en informer son employeur ?','Non : vous <strong>n\'êtes pas obligé(e)</strong> d\'en parler.'],['Quel est le taux d\'obligation d\'emploi des travailleurs handicapés ?','<strong>6 %</strong> de l\'effectif dans les entreprises d\'au moins 20 salariés.'],['Que devient le préavis en cas de licenciement ?','Il est <strong>doublé</strong>, dans la limite de 3 mois.'],['Une maladie chronique peut-elle ouvrir droit à la RQTH ?','Oui, si elle <strong>réduit effectivement</strong> vos possibilités d\'obtenir ou de garder un emploi.']] }),

evadMk3({ id:'csp', aud:'both', ico:'<path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>', title:'CSP — Contrat de sécurisation professionnelle', sub:'Licenciement économique · 21 jours · Accompagnement',
 intro:'En cas de licenciement pour <strong>motif économique</strong>, l\'employeur doit proposer le <strong>CSP</strong>. Ce dispositif offre un accompagnement renforcé vers l\'emploi et une allocation spécifique.',
 loi:['Dans les entreprises de moins de 1 000 salariés et dans celles en redressement ou liquidation judiciaire, l\'employeur propose le contrat de sécurisation professionnelle à chaque salarié dont il envisage le licenciement pour motif économique.','Code du travail, articles L1233-65 à L1233-70'],
 qui:['Les salariés dont le licenciement pour <strong>motif économique</strong> est envisagé.','Dans une entreprise de <strong>moins de 1 000 salariés</strong>, ou en redressement ou liquidation judiciaire.'],
 quoi:{ t:[['Élément','Ce que ça vous apporte'],['Accompagnement','Un suivi renforcé vers l\'emploi : bilan, formation, aide à la recherche'],['Allocation','L\'allocation de sécurisation professionnelle (ASP), versée pendant le CSP'],['Rupture','En cas d\'acceptation, le contrat est rompu d\'un commun accord'],['Durée','Le dispositif dure jusqu\'à <strong>12 mois</strong>']] },
 quand:{ p:'Vous disposez de <strong>21 jours</strong> pour accepter ou refuser le CSP. Sans réponse dans ce délai, vous êtes considéré(e) comme l\'ayant refusé.' },
 comment:[['Recevoir la proposition','L\'employeur vous remet le document d\'information lors de l\'entretien préalable ou de la réunion des représentants du personnel.'],['Comparer avec l\'ARE classique','Demandez à France Travail une simulation des deux options.'],['Répondre dans les 21 jours','Acceptez ou refusez par écrit, avant la fin du délai.'],['S\'engager dans l\'accompagnement','En cas d\'acceptation, participez aux actions prévues avec votre conseiller.']],
 pourquoi:'Le délai de <strong>21 jours</strong> est court et le silence vaut refus. Comparez les deux options avant de répondre : le choix a des effets sur votre indemnisation.',
 eva:'Demandez une simulation à France Travail <strong>dès la remise du document</strong> : vous aurez le temps de comparer avant la fin des 21 jours.',
 src:[['Légifrance — Code du travail, art. L1233-65 et suivants',LEG('L1233-65'),LD,'⚖️'],['Unédic — Contrat de sécurisation professionnelle','https://www.unedic.org','','📊']],
 check:['Bien choisir face au CSP',['J\'ai reçu le document d\'information sur le CSP','J\'ai noté la date de fin de mon délai de 21 jours','J\'ai demandé une simulation à France Travail','J\'ai répondu par écrit avant la fin du délai','J\'ai préparé mon premier rendez-vous d\'accompagnement']],
 rel:['licenciement','are','aides-mobilite'],
 quiz:[['Dans quel cas le CSP est-il proposé ?','En cas de licenciement pour <strong>motif économique</strong> envisagé.'],['Quelles entreprises doivent le proposer ?','Celles de <strong>moins de 1 000 salariés</strong>, ou en redressement ou liquidation judiciaire.'],['Combien de temps pour se décider ?','<strong>21 jours</strong>.'],['Que se passe-t-il sans réponse ?','Le silence vaut <strong>refus</strong> du CSP.'],['Comment est rompu le contrat en cas d\'acceptation ?','D\'un <strong>commun accord</strong>.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();
/* ── Refonte · Demandeur d'emploi · Lot 4 ── */
(function(){
var arts=[
evadMk3({ id:'prime-activite', aud:'both', ico:'<path d="M18 7a7 7 0 1 0 0 10"/><path d="M4 10h9M4 14h9"/>', title:'Prime d\'activité — Le complément de revenus', sub:'Conditions · Calcul · Réforme 2026',
 intro:'Vous travaillez avec des revenus modestes ? La <strong>prime d\'activité</strong> complète vos revenus chaque mois. Elle a été revalorisée et réformée au <strong>1er avril 2026</strong>.',
 loi:['La prime d\'activité, créée en 2015 en remplacement du RSA activité et de la prime pour l\'emploi, est un complément de revenu versé sous conditions aux actifs les plus modestes.','Code de la sécurité sociale, articles L841-1 et suivants · Décret n° 2026-222 du 30 mars 2026'],
 qui:['Les personnes de 18 ans ou plus qui exercent une <strong>activité professionnelle</strong> (salariés, indépendants…) avec des revenus modestes.','Les étudiants et apprentis, sous conditions de revenus d\'activité.','Le droit dépend des revenus et de la composition de tout le foyer.'],
 quoi:{ t:[['Élément','Règle 2026'],['Montant forfaitaire (personne seule)','<strong>638,28 €</strong> depuis le 1er avril 2026 (633,21 € auparavant)'],['Calcul','(Montant forfaitaire + <strong>59,85 %</strong> des revenus professionnels + bonifications) − ressources du foyer'],['Enfant à charge','Supplément de <strong>42,804 %</strong> du montant forfaitaire par enfant'],['Réforme 2026','Jusqu\'à <strong>54 € de plus</strong> par mois et par bénéficiaire'],['Revenus pris en compte','Le montant <strong>net social</strong> de vos revenus']] },
 quand:{ p:'La demande se fait en ligne auprès de la <strong>CAF</strong> ou de la <strong>MSA</strong>. Les revenus sont ensuite déclarés <strong>tous les 3 mois</strong> pour recalculer le droit.' },
 comment:[['Faire la simulation','Sur caf.fr ou msa.fr, avec vos revenus nets sociaux.'],['Déposer la demande en ligne','Si la simulation est positive, faites la demande depuis votre espace.'],['Déclarer chaque trimestre','Indiquez vos revenus tous les 3 mois pour garder le droit à jour.'],['Refaire la simulation à chaque changement','Nouveau contrat, naissance, séparation : le droit peut évoluer.']],
 pourquoi:'Beaucoup de personnes y ont droit <strong>sans la demander</strong>. La réforme du 1er avril 2026 a élargi le nombre de bénéficiaires : même si vous n\'y aviez pas droit avant, refaites la simulation.',
 eva:'Utilisez le montant <strong>net social</strong> indiqué sur votre bulletin de paie pour la simulation : c\'est lui qui compte.',
 src:[['Service-Public — La prime d\'activité revalorisée en 2026','https://www.service-public.gouv.fr/particuliers/actualites/A18815','Mis à jour le 22 juillet 2026'],['Ministère de l\'Économie — Prime d\'activité','https://www.economie.gouv.fr/node/34212','Mis à jour le 31 mars 2026','🏛️']],
 check:['Obtenir votre prime d\'activité',['J\'ai repéré mon salaire net social sur mon bulletin','J\'ai fait la simulation sur caf.fr ou msa.fr','J\'ai déposé ma demande en ligne','J\'ai noté mes dates de déclaration trimestrielle','Je refais la simulation à chaque changement de situation']],
 rel:['cumul-are','rqth','ass'],
 quiz:[['Quel est le montant forfaitaire de la prime d\'activité pour une personne seule ?','<strong>638,28 €</strong> depuis le 1er avril 2026.'],['Quel pourcentage des revenus professionnels entre dans le calcul ?','<strong>59,85 %</strong>.'],['Combien la réforme 2026 peut-elle rapporter ?','Jusqu\'à <strong>54 € de plus</strong> par mois et par bénéficiaire.'],['À quelle fréquence faut-il déclarer ses revenus ?','<strong>Tous les 3 mois</strong>.'],['Quel montant de salaire faut-il utiliser ?','Le montant <strong>net social</strong>.']] }),

evadMk3({ id:'agepi', aud:'dem', ico:'<circle cx="12" cy="6" r="3"/><path d="M8 21v-6l-2-3h12l-2 3v6"/>', title:'AGE — Aide à la garde d\'enfants (ex-AGEPI)', sub:'Reprise d\'emploi · Formation · Montants',
 intro:'Depuis le <strong>1er mai 2024</strong>, l\'<strong>aide à la garde d\'enfants (AGE)</strong> de France Travail a remplacé l\'AGEPI. Elle aide à payer la garde de vos enfants de <strong>moins de 12 ans</strong> quand vous reprenez un emploi ou entrez en formation.',
 loi:['L\'AGE est une aide financière forfaitaire de France Travail, déterminée par votre volume d\'heures de travail ou de formation et par le nombre d\'enfants à faire garder.','Délibération du conseil d\'administration de France Travail'],
 qui:['Vous êtes inscrit(e) à France Travail et vous reprenez un emploi (CDI, CDD ou intérim, même à temps partiel) ou entrez en formation.','Vous élevez seul(e) un ou plusieurs enfants de <strong>moins de 12 ans</strong> dont vous avez la charge, selon Service-Public.','Vous n\'avez pas perçu cette aide dans les <strong>12 derniers mois</strong>.'],
 quoi:{ t:[['Volume horaire','Montant forfaitaire'],['De 15 à 35 heures par semaine','<strong>416 €</strong> pour le 1er enfant, puis <strong>62,40 €</strong> par enfant en plus, dans la limite de <strong>540,80 €</strong>'],['Moins de 15 heures par semaine','<strong>176,80 €</strong> pour le 1er enfant, puis <strong>26 €</strong> par enfant en plus, dans la limite de <strong>228,80 €</strong>'],['Fréquence','Une seule fois par période de <strong>12 mois</strong>']] },
 quand:{ p:'Faites la demande dans votre espace personnel France Travail, rubrique <strong>« Mes aides »</strong>, avec vos justificatifs, dès votre reprise d\'emploi ou entrée en formation.' },
 comment:[['Vérifier l\'âge de vos enfants','L\'aide concerne les enfants de moins de 12 ans.'],['Préparer vos justificatifs','Contrat de travail ou attestation d\'entrée en formation, justificatifs de garde.'],['Faire la demande en ligne','Rubrique « Mes aides » de votre espace personnel, ou auprès de votre conseiller.'],['Penser aux autres aides','Complément de libre choix du mode de garde de la CAF, crédit d\'impôt pour frais de garde…']],
 pourquoi:'L\'AGE n\'est versée qu\'<strong>une fois tous les 12 mois</strong> : faites la demande au bon moment, lors de la reprise qui compte le plus pour vous.',
 eva:'Les frais de garde sont souvent ce qui fait renoncer à un emploi. Demandez l\'AGE <strong>en même temps</strong> que vous signez votre contrat.',
 src:[['France Travail — Reprise d\'emploi : l\'aide à la garde d\'enfants (AGE)','https://www.francetravail.fr/candidat/vos-recherches/les-aides-financieres/reprise-demploi---laide-a-la-gar.html','Consulté le 4 octobre 2026','🏛️'],['Service-Public (via justice.fr) — Aide à la garde d\'enfants pour le demandeur d\'emploi','https://www.justice.fr/fiche/aide-garde-enfants-age-demandeur-emploi','']],
 check:['Obtenir l\'aide à la garde d\'enfants',['Mes enfants à faire garder ont moins de 12 ans','Je n\'ai pas reçu cette aide dans les 12 derniers mois','J\'ai mon contrat ou mon attestation d\'entrée en formation','J\'ai fait ma demande dans « Mes aides » sur francetravail.fr','J\'ai vérifié les autres aides à la garde (CAF, crédit d\'impôt)']],
 est:{ title:'Eva calcule votre AGE', subtitle:'Barème France Travail', fields:[{id:'n',label:'Enfants de moins de 12 ans',min:1,max:4,step:1,unit:'',default:1},{id:'h',label:'Heures par semaine',min:5,max:35,step:1,unit:'h',default:35}],
   calc:function(v){ var n=v[0], m=v[1]>=15?Math.min(540.80,416+62.40*(n-1)):Math.min(228.80,176.80+26*(n-1)); return { val:m.toFixed(2).replace('.',',')+'€', detail:'Aide forfaitaire versée une fois par période de 12 mois' }; } },
 rel:['aides-mobilite','are','prime-activite'],
 quiz:[['Quelle aide a remplacé l\'AGEPI ?','L\'<strong>aide à la garde d\'enfants (AGE)</strong>, depuis le 1er mai 2024.'],['Jusqu\'à quel âge des enfants ?','<strong>Moins de 12 ans</strong>.'],['Combien pour un enfant et un emploi de 35 heures ?','<strong>416 €</strong>.'],['Quel est le montant maximal ?','<strong>540,80 €</strong> pour 15 à 35 heures par semaine.'],['Peut-on la recevoir plusieurs fois dans l\'année ?','Non : <strong>une seule fois</strong> par période de 12 mois.']] }),

evadMk3({ id:'retraite-chomage', aud:'dem', ico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', title:'Retraite et chômage — Vos trimestres comptent', sub:'Chômage indemnisé · Non indemnisé · Limites',
 intro:'Les périodes de chômage <strong>comptent pour votre retraite</strong>, qu\'elles soient indemnisées ou, dans certains cas, non indemnisées.',
 loi:['Les périodes indemnisées par l\'assurance chômage, ainsi que certaines périodes non indemnisées, permettent de valider des trimestres au régime de retraite de base.','Code de la sécurité sociale — périodes assimilées'],
 qui:['Les demandeurs d\'emploi <strong>indemnisés</strong> par France Travail.','Certains demandeurs d\'emploi <strong>non indemnisés</strong>, s\'ils sont affiliés au régime général, à la MSA ou au régime des indépendants.'],
 quoi:{ t:[['Situation','Trimestres validés'],['Chômage indemnisé','<strong>1 trimestre pour 50 jours</strong>, dans la limite de 4 par an'],['1re période de chômage non indemnisé','Jusqu\'à <strong>6 trimestres</strong> (18 mois)'],['Chômage non indemnisé après une période indemnisée','Jusqu\'à <strong>4 trimestres</strong> (12 mois)'],['Cas particulier','Limite portée à <strong>20 trimestres</strong> (5 ans) sous conditions']] },
 quand:{ p:'La validation est faite par votre caisse de retraite à partir des informations transmises. Vérifiez votre <strong>relevé de carrière</strong> régulièrement, pas seulement à l\'approche de la retraite.' },
 comment:[['Ouvrir votre compte retraite','Sur info-retraite.fr, avec FranceConnect.'],['Consulter votre relevé de carrière','Repérez vos périodes de chômage et les trimestres validés.'],['Signaler un oubli','Demandez une correction à votre caisse avec vos attestations France Travail.'],['Garder vos justificatifs','Conservez vos attestations de paiement et de fin de droits.']],
 pourquoi:'Une période de chômage <strong>oubliée</strong> sur votre relevé peut vous coûter des trimestres. Plus vous la repérez tôt, plus la correction est simple.',
 eva:'Gardez vos attestations France Travail <strong>jusqu\'à la retraite</strong> : elles prouvent vos périodes de chômage si une correction est nécessaire.',
 src:[['France Travail — Quels sont mes droits à la retraite ?','https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/lessentiel-a-savoir-sur-lallocat/quels-sont-mes-droits-a-la-retra.html','Consulté le 4 octobre 2026','🏛️'],['Info-retraite — Mon relevé de carrière','https://www.info-retraite.fr','','👵']],
 check:['Protéger vos trimestres de retraite',['J\'ai ouvert mon compte sur info-retraite.fr','J\'ai vérifié mes périodes de chômage sur mon relevé de carrière','J\'ai compté mes trimestres validés (1 pour 50 jours)','J\'ai signalé un oubli à ma caisse si nécessaire','Je conserve mes attestations France Travail']],
 rel:['are','ass','cumul-retraite'],
 quiz:[['Combien de jours de chômage indemnisé valident un trimestre ?','<strong>50 jours</strong>, dans la limite de 4 trimestres par an.'],['Le chômage non indemnisé compte-t-il ?','Oui, dans certaines limites : jusqu\'à <strong>6 trimestres</strong> pour la première période.'],['Et après une période indemnisée ?','Jusqu\'à <strong>4 trimestres</strong> de chômage non indemnisé.'],['La limite peut-elle être portée plus haut ?','Oui, jusqu\'à <strong>20 trimestres</strong> (5 ans) sous conditions.'],['Où vérifier ses trimestres ?','Sur votre <strong>relevé de carrière</strong>, sur info-retraite.fr.']] }),

evadMk3({ id:'mediateur-ft', aud:'dem', ico:'<path d="M12 3v18M5 7h14M7 7l-3 7h6zM17 7l-3 7h6z"/>', title:'Médiateur de France Travail — Contester sans procès', sub:'Réclamation · Médiation · Recours obligatoire',
 intro:'Radiation, trop-perçu, refus d\'aide : en cas de désaccord avec France Travail, le <strong>médiateur</strong> peut réexaminer votre dossier, gratuitement et de façon impartiale.',
 loi:['Le médiateur de France Travail recherche des solutions amiables aux litiges entre France Travail et les demandeurs d\'emploi, employeurs ou partenaires. Pour certaines décisions, sa saisine est un passage obligatoire avant le juge.','Code du travail, article L5312-12-1'],
 qui:['Les <strong>demandeurs d\'emploi</strong>, mais aussi les employeurs et les partenaires de France Travail.','Après une <strong>réclamation préalable</strong> auprès du service concerné, restée sans réponse satisfaisante.'],
 quoi:{ t:[['Élément','Règle'],['Réclamation préalable','Obligatoire avant de saisir le médiateur'],['Délai de réponse de l\'agence','<strong>7 jours</strong> en général'],['Examen','Nouvel examen impartial et indépendant de votre dossier'],['Refus','Le médiateur doit vous en donner les raisons'],['Médiation obligatoire','Pour certaines décisions (ASS, allocation du contrat d\'engagement jeune, remboursement de trop-perçus), avant le juge administratif']] },
 quand:{ p:'Saisissez le médiateur <strong>après</strong> la réponse (ou l\'absence de réponse) à votre réclamation. Pour les décisions où la médiation est obligatoire, ne laissez pas passer les délais de recours indiqués dans le courrier de décision.' },
 comment:[['Déposer une réclamation','Auprès de votre agence : espace personnel, courrier ou 3949.'],['Attendre la réponse','France Travail répond en général sous 7 jours.'],['Saisir le médiateur régional','Par courrier ou e-mail, avec l\'objet du litige et tous les justificatifs.'],['Conserver toutes les preuves','Copies de la réclamation, réponses, captures d\'actualisation.']],
 pourquoi:'Sans <strong>réclamation préalable</strong>, le médiateur ne peut pas être saisi. Et pour certaines décisions, passer par lui est <strong>obligatoire</strong> avant de pouvoir aller devant le juge.',
 eva:'Écrivez une demande courte et factuelle : <strong>ce qui s\'est passé, ce que vous demandez, vos preuves</strong>. Un dossier clair se règle beaucoup plus vite.',
 src:[['Service-Public (via justice.fr) — Recourir au médiateur France Travail','https://www.justice.fr/fiche/mediateur-france-travail-anciennement-pole-emploi-recourir','Mis à jour le 8 octobre 2024'],['France Travail — Déposer une réclamation','https://www.francetravail.fr/region/auvergne-rhone-alpes/candidat/vos-droits-et-demarches/deposer-une-reclamation.html','','🏛️']],
 check:['Contester une décision de France Travail',['J\'ai déposé une réclamation auprès de mon agence','J\'ai gardé une copie de ma réclamation et de la réponse','J\'ai rassemblé tous mes justificatifs','J\'ai saisi le médiateur de ma région par écrit','J\'ai noté les délais de recours indiqués dans la décision']],
 rel:['are','ass','plein-emploi'],
 quiz:[['Que faut-il faire avant de saisir le médiateur ?','Déposer une <strong>réclamation préalable</strong> auprès du service concerné.'],['Sous quel délai l\'agence répond-elle en général ?','<strong>7 jours</strong>.'],['La médiation est-elle parfois obligatoire ?','Oui, pour certaines décisions comme l\'<strong>ASS</strong> ou le remboursement de trop-perçus, avant le juge administratif.'],['Le médiateur doit-il justifier un refus ?','<strong>Oui</strong>, il doit vous en donner les raisons.'],['Qui peut saisir le médiateur ?','Les demandeurs d\'emploi, mais aussi les <strong>employeurs et partenaires</strong> de France Travail.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();
/* ── Refonte · Salarié · Lot S1 (sources : Code du travail sur Légifrance + Code du travail numérique) ── */
(function(){
var LEG=function(q){ return 'https://www.legifrance.gouv.fr/search/code?tab_selection=code&searchField=ALL&query='+encodeURIComponent(q); };
var LD='Texte en vigueur · consulté le 4 octobre 2026', CTN='https://code.travail.gouv.fr';
function L(t,q){ return ['Légifrance — Code du travail, '+t,LEG(q),LD,'⚖️']; }
var C=['Code du travail numérique',CTN,'','⚖️'];
var arts=[
evadMk3({ id:'pauses-repos', aud:'sal', ico:'<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3"/>', title:'Pauses et temps de repos — Les minimums légaux', sub:'Pause · Repos quotidien · Durées maximales',
 intro:'Le Code du travail fixe des <strong>temps de repos minimums</strong> et des <strong>durées maximales</strong> de travail. Ils protègent votre santé et s\'imposent à l\'employeur.',
 loi:['Le salarié bénéficie d\'un temps de pause dès que son temps de travail quotidien atteint 6 heures, d\'un repos quotidien et d\'un repos hebdomadaire minimums. Les durées maximales de travail sont encadrées.','Code du travail, articles L3121-16, L3121-18 à L3121-22, L3131-1 et L3132-2'],
 qui:'Tous les salariés, sauf règles particulières (cadres dirigeants, certains régimes dérogatoires prévus par accord).',
 quoi:{ t:[['Règle','Minimum ou maximum'],['Pause','<strong>20 minutes</strong> consécutives dès 6 heures de travail'],['Repos quotidien','<strong>11 heures</strong> consécutives'],['Repos hebdomadaire','<strong>24 heures</strong> + les 11 heures de repos quotidien'],['Durée maximale par jour','<strong>10 heures</strong>, sauf dérogation'],['Durée maximale par semaine','<strong>48 heures</strong>, et 44 heures en moyenne sur 12 semaines']] },
 quand:{ p:'Ces règles s\'appliquent <strong>chaque jour et chaque semaine</strong>. Un accord collectif peut prévoir certaines dérogations, dans les limites fixées par la loi.' },
 comment:[['Noter vos horaires réels','Gardez un relevé de vos heures de début, de fin et de pause.'],['Vérifier votre convention collective','Elle peut prévoir des pauses plus longues ou des dérogations encadrées.'],['En parler à votre manager ou aux RH','Signalez par écrit les dépassements répétés.'],['Alerter si besoin','Le CSE ou l\'inspection du travail peuvent être saisis.']],
 pourquoi:'Des repos non respectés mettent votre <strong>santé</strong> en jeu et engagent la responsabilité de l\'employeur. Vos relevés d\'horaires sont votre meilleure preuve.',
 eva:'Si on vous rappelle tard le soir et que vous reprenez tôt le matin, comptez : les <strong>11 heures</strong> de repos sont-elles respectées ?',
 src:[L('art. L3121-16 (pause)','L3121-16'),L('art. L3131-1 (repos quotidien)','L3131-1'),C],
 check:['Vérifier vos temps de repos',['Je note mes horaires réels de début et de fin','J\'ai au moins 20 minutes de pause dès 6 heures de travail','J\'ai 11 heures de repos entre deux journées','Je ne dépasse pas 10 heures par jour, sauf dérogation','J\'ai signalé par écrit les dépassements répétés']],
 rel:['heures-sup','deconnexion','travail-nuit'],
 quiz:[['À partir de combien d\'heures de travail a-t-on droit à une pause ?','<strong>6 heures</strong> : la pause est alors d\'au moins 20 minutes consécutives.'],['Quel est le repos quotidien minimum ?','<strong>11 heures</strong> consécutives.'],['Quel est le repos hebdomadaire minimum ?','<strong>24 heures</strong>, auxquelles s\'ajoutent les 11 heures de repos quotidien.'],['Quelle est la durée maximale de travail par jour ?','<strong>10 heures</strong>, sauf dérogation.'],['Quelle est la durée maximale sur une semaine ?','<strong>48 heures</strong>, et 44 heures en moyenne sur 12 semaines.']] }),

evadMk3({ id:'heures-sup', aud:'sal', ico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', title:'Heures supplémentaires — Majorations et contingent', sub:'Taux · Contingent · Repos',
 intro:'Toute heure accomplie au-delà de <strong>35 heures par semaine</strong> est une heure supplémentaire. Elle doit être <strong>majorée</strong> ou compensée par un repos.',
 loi:['Les heures supplémentaires sont accomplies au-delà de la durée légale hebdomadaire. Elles ouvrent droit à une majoration de salaire ou, le cas échéant, à un repos compensateur équivalent.','Code du travail, articles L3121-27 à L3121-36'],
 qui:'Les salariés soumis à la durée légale du travail, à la demande ou avec l\'accord de l\'employeur. Les cadres au forfait jours suivent d\'autres règles.',
 quoi:{ t:[['Heures','Majoration (sans accord collectif)'],['De la 36e à la 43e heure','<strong>+25 %</strong>'],['À partir de la 44e heure','<strong>+50 %</strong>'],['Avec un accord collectif','Taux fixé par l\'accord, au moins <strong>+10 %</strong>'],['Contingent annuel','Fixé par accord, ou à défaut <strong>220 heures</strong> par an et par salarié']] },
 quand:{ p:'Les heures supplémentaires se décomptent <strong>par semaine</strong>. Elles sont payées avec le salaire du mois, sauf si elles sont remplacées par un repos.' },
 comment:[['Relever vos heures','Notez vos horaires et gardez les demandes de votre employeur (e-mails, plannings).'],['Contrôler votre bulletin de paie','Les heures supplémentaires et leurs majorations doivent y figurer.'],['Réclamer par écrit','Signalez toute heure non payée à votre employeur.'],['Agir dans les délais','Un rappel de salaire peut être réclamé dans un délai de 3 ans.']],
 pourquoi:'Les heures supplémentaires non déclarées sont un <strong>manque à gagner</strong>, et elles comptent aussi pour vos droits sociaux. Sans relevé d\'heures, elles sont difficiles à prouver.',
 eva:'Un simple agenda tenu au jour le jour vaut déjà <strong>élément de preuve</strong> : notez vos heures de début et de fin.',
 src:[L('art. L3121-27 à L3121-36','L3121-28'),['Code du travail numérique — Heures supplémentaires',CTN+'/themes/temps-de-travail','','⚖️']],
 check:['Être payé(e) pour vos heures supplémentaires',['Je note chaque jour mes heures réelles','Je garde les demandes de mon employeur','J\'ai vérifié les heures et majorations sur mon bulletin','J\'ai vérifié le taux prévu par ma convention collective','J\'ai réclamé par écrit les heures non payées']],
 est:{ title:'Eva calcule vos heures sup', subtitle:'Taux légaux sans accord : +25 % puis +50 %', fields:[{id:'t',label:'Taux horaire brut',min:12,max:40,step:0.5,unit:'€',default:14},{id:'h',label:'Heures sup dans la semaine',min:1,max:13,step:1,unit:'h',default:4}],
   calc:function(v){ var t=v[0],h=v[1], a=Math.min(h,8)*t*1.25+Math.max(0,h-8)*t*1.5; return { val:Math.round(a)+'€<span> brut / semaine</span>', detail:Math.min(h,8)+' h à +25 %'+(h>8?' · '+(h-8)+' h à +50 %':'') }; } },
 rel:['pauses-repos','bulletin-paie','salaire'],
 quiz:[['À partir de quand une heure est-elle supplémentaire ?','Au-delà de <strong>35 heures</strong> par semaine.'],['Quelle majoration pour les 8 premières heures sup ?','<strong>+25 %</strong>, sans accord collectif.'],['Et au-delà ?','<strong>+50 %</strong> à partir de la 44e heure.'],['Un accord peut-il prévoir moins ?','Oui, mais jamais moins de <strong>+10 %</strong>.'],['Quel contingent annuel à défaut d\'accord ?','<strong>220 heures</strong> par an et par salarié.']] }),

evadMk3({ id:'conges-familiaux', aud:'sal', ico:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>', title:'Congés pour événements familiaux', sub:'Mariage · Naissance · Décès · Handicap',
 intro:'Mariage, naissance, décès : la loi vous accorde des jours de congé <strong>sans perte de salaire</strong>, en plus de vos congés payés.',
 loi:['Le salarié a droit, sur justification, à un congé pour certains événements familiaux. Ces jours n\'entraînent pas de réduction de rémunération et sont assimilés à du travail effectif.','Code du travail, articles L3142-1 à L3142-5'],
 qui:'Tous les salariés, <strong>sans condition d\'ancienneté</strong>, sur présentation d\'un justificatif.',
 quoi:{ t:[['Événement','Durée minimale légale'],['Votre mariage ou Pacs','<strong>4 jours</strong>'],['Mariage d\'un enfant','<strong>1 jour</strong>'],['Naissance ou adoption','<strong>3 jours</strong>'],['Décès du conjoint, d\'un parent, d\'un frère ou d\'une sœur','<strong>3 jours</strong>'],['Décès d\'un enfant','<strong>5 jours</strong>, ou <strong>7 jours ouvrés</strong> s\'il avait moins de 25 ans, plus un congé de deuil de 8 jours'],['Annonce d\'un handicap, d\'une maladie chronique ou d\'un cancer chez un enfant','<strong>5 jours</strong>']] },
 quand:{ p:'Les jours se prennent <strong>au moment de l\'événement</strong> ou dans une période raisonnable autour de celui-ci. Une convention collective peut prévoir des durées plus longues.' },
 comment:[['Prévenir votre employeur','Dès que possible, en indiquant l\'événement.'],['Fournir un justificatif','Acte de mariage, de naissance, de décès, certificat médical…'],['Vérifier votre convention collective','Elle peut prévoir plus de jours que la loi.'],['Contrôler votre bulletin de paie','Ces jours ne doivent pas être retenus sur votre salaire.']],
 pourquoi:'Ces congés sont <strong>payés</strong> et ne peuvent pas être imputés sur vos congés annuels. Beaucoup de salariés posent des congés payés à la place, par méconnaissance.',
 eva:'Votre convention collective prévoit souvent <strong>plus de jours</strong> : vérifiez-la sur le Code du travail numérique avant de poser votre demande.',
 src:[L('art. L3142-1 à L3142-5','L3142-4'),['Code du travail numérique — Congés pour événements familiaux',CTN+'/contribution/les-conges-pour-evenements-familiaux','','⚖️']],
 check:['Poser un congé pour événement familial',['J\'ai identifié l\'événement et le nombre de jours prévu','J\'ai vérifié ma convention collective','J\'ai prévenu mon employeur','J\'ai fourni le justificatif','J\'ai vérifié que ces jours n\'ont pas été retenus sur mon salaire']],
 rel:['maternite-paternite','conges','presence-parentale'],
 quiz:[['Combien de jours pour son mariage ou son Pacs ?','<strong>4 jours</strong>.'],['Combien de jours pour une naissance ?','<strong>3 jours</strong>.'],['Faut-il de l\'ancienneté ?','Non, <strong>aucune condition</strong> d\'ancienneté.'],['Ces jours sont-ils payés ?','<strong>Oui</strong>, sans perte de salaire.'],['Combien pour l\'annonce d\'un handicap chez un enfant ?','<strong>5 jours</strong>.']] }),

evadMk3({ id:'conge-parental', aud:'sal', ico:'<circle cx="12" cy="8" r="4"/><path d="M6 21a6 6 0 0 1 12 0"/>', title:'Congé parental d\'éducation', sub:'Ancienneté · Durée · Retour garanti',
 intro:'Le congé parental d\'éducation permet d\'<strong>arrêter</strong> ou de <strong>réduire</strong> son activité pour élever son enfant, avec un retour garanti dans l\'entreprise.',
 loi:['Tout salarié justifiant d\'une ancienneté minimale d\'un an à la naissance ou à l\'arrivée de l\'enfant a droit à un congé parental d\'éducation ou à une réduction de sa durée de travail.','Code du travail, articles L1225-47 à L1225-59'],
 qui:'Les salariés qui ont au moins <strong>1 an d\'ancienneté</strong> à la naissance ou à l\'arrivée au foyer de l\'enfant. La mère et le père peuvent le prendre.',
 quoi:{ t:[['Élément','Règle'],['Forme','Arrêt total, ou temps partiel d\'au moins 16 heures par semaine'],['Durée initiale','<strong>1 an</strong> maximum, renouvelable'],['Fin','Au plus tard au <strong>3e anniversaire</strong> de l\'enfant (en cas de naissance)'],['Retour','Votre emploi ou un emploi similaire, avec une rémunération au moins équivalente'],['Rémunération','Non payé par l\'employeur ; la CAF peut verser la PreParE']] },
 quand:{ p:'Informez votre employeur par lettre recommandée ou remise en main propre : <strong>1 mois</strong> avant la fin du congé maternité ou d\'adoption, sinon <strong>2 mois</strong> avant le début du congé.' },
 comment:[['Vérifier votre ancienneté','Un an minimum à la naissance ou à l\'arrivée de l\'enfant.'],['Informer l\'employeur dans les délais','Par lettre recommandée ou remise contre décharge.'],['Simuler la PreParE','Sur caf.fr, avant de choisir entre arrêt total et temps partiel.'],['Préparer le retour','Vous avez droit à un entretien professionnel à votre retour.']],
 pourquoi:'L\'employeur <strong>ne peut pas refuser</strong> ce congé si vous remplissez les conditions. Mais un délai d\'information non respecté peut compliquer vos démarches.',
 eva:'Comparez les deux options sur caf.fr : le <strong>temps partiel</strong> peut parfois préserver davantage vos revenus et vos droits.',
 src:[L('art. L1225-47 et suivants','L1225-47'),['CAF — PreParE','https://www.caf.fr','','🏠']],
 check:['Préparer votre congé parental',['J\'ai au moins 1 an d\'ancienneté','J\'ai choisi entre arrêt total et temps partiel','J\'ai simulé la PreParE sur caf.fr','J\'ai informé mon employeur par écrit dans les délais','J\'ai noté la date de mon entretien professionnel au retour']],
 rel:['maternite-paternite','presence-parentale','conges-familiaux'],
 quiz:[['Quelle ancienneté faut-il ?','<strong>1 an</strong> à la naissance ou à l\'arrivée de l\'enfant.'],['Le congé peut-il être à temps partiel ?','Oui, avec au moins <strong>16 heures</strong> par semaine.'],['Jusqu\'à quand peut-il durer ?','Au plus tard jusqu\'au <strong>3e anniversaire</strong> de l\'enfant.'],['L\'employeur peut-il refuser ?','<strong>Non</strong>, si les conditions sont remplies.'],['Qui peut verser une aide financière ?','La <strong>CAF</strong>, avec la PreParE.']] }),

evadMk3({ id:'presence-parentale', aud:'sal', ico:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9 11h6M12 8v6"/>', title:'Congé de présence parentale — Enfant gravement malade', sub:'310 jours · AJPP · Souplesse',
 intro:'Votre enfant est gravement malade, handicapé ou victime d\'un accident grave ? Le <strong>congé de présence parentale</strong> vous permet d\'être à ses côtés.',
 loi:['Le salarié dont l\'enfant à charge est atteint d\'une maladie, d\'un handicap ou victime d\'un accident d\'une particulière gravité rendant indispensable une présence soutenue a droit à un congé de présence parentale.','Code du travail, articles L1225-62 à L1225-65'],
 qui:'Tout salarié, <strong>sans condition d\'ancienneté</strong>, dont l\'enfant à charge nécessite une présence soutenue et des soins contraignants, attestés par un certificat médical.',
 quoi:{ t:[['Élément','Règle'],['Durée','Jusqu\'à <strong>310 jours ouvrés</strong> sur une période de <strong>3 ans</strong>'],['Souplesse','En continu, à temps partiel ou par journées'],['Indemnisation','Allocation journalière de présence parentale (AJPP), versée par la CAF'],['Contrat','Suspendu, avec retour dans votre emploi ou un emploi similaire']] },
 quand:{ p:'Informez votre employeur au moins <strong>15 jours</strong> avant le début du congé, par lettre recommandée ou remise contre décharge, avec le certificat médical. En cas d\'urgence, le congé peut commencer immédiatement.' },
 comment:[['Obtenir le certificat médical','Il atteste la gravité et la nécessité d\'une présence soutenue.'],['Informer l\'employeur','Au moins 15 jours avant, sauf urgence.'],['Demander l\'AJPP à la CAF','Pour être indemnisé(e) pendant les jours d\'absence.'],['Prévenir de chaque absence','Indiquez à l\'employeur les jours pris si vous fractionnez le congé.']],
 pourquoi:'Ce congé est <strong>de droit</strong> : l\'employeur ne peut pas le refuser. Sans demande d\'AJPP, en revanche, vos jours d\'absence ne sont pas indemnisés.',
 eva:'Faites la demande d\'AJPP <strong>en même temps</strong> que vous prévenez votre employeur : vous serez indemnisé(e) plus vite.',
 src:[L('art. L1225-62 à L1225-65','L1225-62'),['CAF — Allocation journalière de présence parentale','https://www.caf.fr','','🏠']],
 check:['Être auprès de votre enfant',['J\'ai obtenu le certificat médical','J\'ai informé mon employeur au moins 15 jours avant (sauf urgence)','J\'ai demandé l\'AJPP à la CAF','Je préviens l\'employeur de chaque jour d\'absence','Je suis mon compteur de 310 jours']],
 rel:['conge-parental','proche-aidant','don-jours'],
 quiz:[['Combien de jours au maximum ?','<strong>310 jours ouvrés</strong> sur 3 ans.'],['Faut-il de l\'ancienneté ?','<strong>Non</strong>.'],['Qui verse l\'indemnisation ?','La <strong>CAF</strong>, avec l\'AJPP.'],['Peut-on le prendre par journées ?','<strong>Oui</strong>, en continu, à temps partiel ou par journées.'],['Quel délai pour prévenir l\'employeur ?','Au moins <strong>15 jours</strong>, sauf urgence.']] }),

evadMk3({ id:'proche-aidant', aud:'sal', ico:'<path d="M12 21s-8-5-8-11a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6-8 11-8 11z"/>', title:'Congé de proche aidant', sub:'Conditions · 1 an sur la carrière · AJPA',
 intro:'Vous aidez un proche âgé, malade ou handicapé ? Le <strong>congé de proche aidant</strong> vous permet de suspendre ou de réduire votre activité.',
 loi:['Le salarié peut bénéficier d\'un congé de proche aidant lorsqu\'un proche présente un handicap ou une perte d\'autonomie d\'une particulière gravité.','Code du travail, articles L3142-16 à L3142-27'],
 qui:'Tout salarié, <strong>sans condition d\'ancienneté</strong>, qui aide un proche : conjoint, ascendant, descendant, frère, sœur, personne avec qui il a des liens étroits et stables…',
 quoi:{ t:[['Élément','Règle'],['Durée','Fixée par accord, ou à défaut <strong>3 mois</strong>, renouvelable'],['Limite','<strong>1 an</strong> sur l\'ensemble de la carrière'],['Formes','Temps plein, temps partiel ou fractionné, avec l\'accord de l\'employeur pour ces deux dernières'],['Indemnisation','Allocation journalière du proche aidant (AJPA), versée par la CAF ou la MSA']] },
 quand:{ p:'Prévenez votre employeur, à défaut de règle conventionnelle, au moins <strong>1 mois</strong> avant le début du congé. En cas d\'urgence, il peut débuter immédiatement.' },
 comment:[['Rassembler les justificatifs','Lien avec le proche, justificatif de sa perte d\'autonomie ou de son handicap.'],['Informer votre employeur','Dans le délai prévu, par écrit.'],['Demander l\'AJPA','Auprès de la CAF ou de la MSA.'],['Suivre votre compteur','La limite est d\'un an sur toute la carrière.']],
 pourquoi:'Beaucoup d\'aidants s\'épuisent sans connaître ce congé. Il est <strong>indemnisé</strong> par l\'AJPA et votre emploi est protégé.',
 eva:'Ne restez pas seul(e) : le congé de proche aidant se combine avec d\'autres aides. Renseignez-vous aussi auprès de votre CAF.',
 src:[L('art. L3142-16 et suivants','L3142-16'),['CAF — Allocation journalière du proche aidant','https://www.caf.fr','','🏠']],
 check:['Prendre votre congé de proche aidant',['J\'ai vérifié mon lien avec la personne aidée','J\'ai rassemblé les justificatifs de sa situation','J\'ai informé mon employeur par écrit dans les délais','J\'ai demandé l\'AJPA à la CAF ou à la MSA','Je suis mon compteur d\'un an sur la carrière']],
 rel:['presence-parentale','solidarite-familiale','don-jours'],
 quiz:[['Quelle durée à défaut d\'accord ?','<strong>3 mois</strong>, renouvelable.'],['Quelle limite sur toute la carrière ?','<strong>1 an</strong>.'],['Faut-il de l\'ancienneté ?','<strong>Non</strong>.'],['Quelle allocation peut être versée ?','L\'<strong>AJPA</strong>, par la CAF ou la MSA.'],['Peut-il être pris à temps partiel ?','Oui, avec l\'<strong>accord de l\'employeur</strong>.']] }),

evadMk3({ id:'solidarite-familiale', aud:'sal', ico:'<path d="M12 21s-8-5-8-11a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 6-8 11-8 11z"/>', title:'Congé de solidarité familiale — Accompagner un proche en fin de vie', sub:'Durée · Formes · Allocation',
 intro:'Pour accompagner un proche en fin de vie, le <strong>congé de solidarité familiale</strong> vous permet de vous absenter, avec une allocation journalière.',
 loi:['Le salarié dont un proche souffre d\'une pathologie mettant en jeu le pronostic vital ou est en phase avancée ou terminale d\'une affection grave et incurable a droit à un congé de solidarité familiale.','Code du travail, articles L3142-6 à L3142-15'],
 qui:'Tout salarié, <strong>sans condition d\'ancienneté</strong>, qui accompagne un proche (ascendant, descendant, frère, sœur, personne partageant son domicile ou l\'ayant désigné comme personne de confiance).',
 quoi:{ t:[['Élément','Règle'],['Durée','Fixée par accord, ou à défaut <strong>3 mois</strong>, renouvelable une fois'],['Formes','Continu, ou à temps partiel / fractionné avec l\'accord de l\'employeur'],['Indemnisation','Allocation journalière d\'accompagnement d\'une personne en fin de vie, versée par l\'Assurance maladie'],['Fin','À l\'expiration de la durée, dans les 3 jours suivant le décès, ou à une date antérieure choisie']] },
 quand:{ p:'Informez votre employeur au moins <strong>15 jours</strong> avant le début du congé. En cas d\'urgence attestée par le médecin, le congé débute <strong>sans délai</strong>.' },
 comment:[['Obtenir le certificat médical','Il atteste l\'état de santé de votre proche.'],['Informer l\'employeur','Par lettre recommandée ou remise contre décharge.'],['Demander l\'allocation','Auprès de l\'Assurance maladie.'],['Prévenir de la fin du congé','Indiquez à l\'employeur la date de votre retour.']],
 pourquoi:'Ce congé est un <strong>droit</strong> : il ne peut pas vous être refusé, et votre emploi est protégé pendant toute sa durée.',
 eva:'Dans ces moments difficiles, pensez aussi au <strong>don de jours</strong> de vos collègues : il peut compléter ce congé.',
 src:[L('art. L3142-6 et suivants','L3142-6'),['Ameli — Allocation d\'accompagnement d\'une personne en fin de vie','https://www.ameli.fr','','🏥']],
 check:['Accompagner votre proche',['J\'ai obtenu le certificat médical','J\'ai informé mon employeur par écrit','J\'ai demandé l\'allocation à l\'Assurance maladie','J\'ai choisi la forme du congé (continu, temps partiel, fractionné)','J\'ai prévenu mon employeur de la date de retour']],
 rel:['proche-aidant','don-jours','conges-familiaux'],
 quiz:[['Quelle durée à défaut d\'accord ?','<strong>3 mois</strong>, renouvelable une fois.'],['L\'employeur peut-il le refuser ?','<strong>Non</strong>.'],['Qui verse l\'allocation ?','L\'<strong>Assurance maladie</strong>.'],['Quel délai pour prévenir l\'employeur ?','<strong>15 jours</strong>, sauf urgence.'],['Quand prend-il fin ?','À la fin de la durée, dans les <strong>3 jours suivant le décès</strong>, ou à une date choisie.']] }),

evadMk3({ id:'don-jours', aud:'sal', ico:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="m8.6 10.5 6.8-3.5M8.6 13.5l6.8 3.5"/>', title:'Don de jours de repos — Aider un collègue', sub:'Anonymat · Bénéficiaires · Maintien du salaire',
 intro:'Vous pouvez <strong>donner des jours de repos</strong> à un collègue qui traverse une épreuve. Un geste de solidarité prévu par la loi, encore peu connu.',
 loi:['Un salarié peut, sur sa demande et avec l\'accord de l\'employeur, renoncer anonymement et sans contrepartie à des jours de repos non pris au bénéfice d\'un autre salarié de l\'entreprise.','Code du travail, articles L1225-65-1 et L1225-65-2'],
 qui:['<strong>Donneur</strong> : tout salarié, pour ses jours de repos non pris (RTT, congés au-delà de 24 jours ouvrables…).','<strong>Bénéficiaire</strong> : le parent d\'un enfant gravement malade, handicapé ou victime d\'un accident grave, le parent qui perd un enfant de moins de 25 ans, ou un proche aidant.'],
 quoi:{ t:[['Pour le bénéficiaire','Effet'],['Salaire','Maintenu pendant l\'absence'],['Temps de travail','La période d\'absence est assimilée à du travail effectif'],['Ancienneté','Prise en compte normalement'],['Pour le donneur','Le don est anonyme et sans contrepartie']] },
 quand:{ p:'Le don se fait <strong>à tout moment</strong>, avec l\'accord de l\'employeur. Il ne concerne que des jours de repos <strong>non pris</strong>.' },
 comment:[['Repérer un besoin','Un collègue concerné, ou vous-même si vous traversez une épreuve.'],['En parler aux RH ou au CSE','Ils peuvent organiser l\'appel au don, sans révéler la situation.'],['Faire la demande de don','Le donneur précise les jours qu\'il souhaite céder.'],['Obtenir l\'accord de l\'employeur','Le don nécessite son accord.']],
 pourquoi:'Ce dispositif peut faire la différence pour un collègue <strong>sans congé suffisant</strong> face à une maladie grave ou à un deuil.',
 eva:'Vous vivez une situation difficile ? Le CSE peut organiser un appel au don <strong>en toute discrétion</strong>.',
 src:[L('art. L1225-65-1 et L1225-65-2','L1225-65-1'),C],
 check:['Donner ou recevoir des jours de repos',['J\'ai vérifié les jours de repos non pris que je peux donner','J\'en ai parlé aux RH ou au CSE','J\'ai fait la demande de don par écrit','L\'employeur a donné son accord','Le don reste anonyme']],
 rel:['presence-parentale','proche-aidant','cet'],
 quiz:[['Le don de jours est-il anonyme ?','<strong>Oui</strong>, et sans contrepartie.'],['Qui peut en bénéficier ?','Notamment le parent d\'un <strong>enfant gravement malade</strong> ou un <strong>proche aidant</strong>.'],['Le salaire du bénéficiaire est-il maintenu ?','<strong>Oui</strong>.'],['Faut-il l\'accord de l\'employeur ?','<strong>Oui</strong>.'],['Quels jours peut-on donner ?','Des jours de repos <strong>non pris</strong>.']] }),

evadMk3({ id:'deconnexion', aud:'sal', ico:'<path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5"/>', title:'Droit à la déconnexion', sub:'Principe · Accord ou charte · Que faire',
 intro:'Ne pas répondre aux messages professionnels pendant vos temps de repos, c\'est un <strong>droit</strong>. Il est inscrit dans le Code du travail depuis 2017.',
 loi:['Les modalités du plein exercice du droit à la déconnexion du salarié sont négociées dans les entreprises concernées. À défaut d\'accord, l\'employeur élabore une charte.','Code du travail, article L2242-17'],
 qui:'Tous les salariés. L\'obligation de négocier concerne les entreprises d\'au moins <strong>50 salariés</strong> dotées d\'un délégué syndical.',
 quoi:{ t:[['Élément','Règle'],['Objectif','Respecter les temps de repos et de congé, et la vie personnelle et familiale'],['Mise en œuvre','Par accord collectif'],['À défaut d\'accord','Une <strong>charte</strong> de l\'employeur, après avis du CSE'],['Lien avec le repos','Le droit à la déconnexion protège aussi le repos quotidien de 11 heures']] },
 quand:{ p:'Il s\'applique en dehors de vos <strong>horaires de travail</strong> : soirs, week-ends, congés et arrêts de travail.' },
 comment:[['Consulter l\'accord ou la charte','Demandez le document aux RH ou au CSE.'],['Garder une trace des sollicitations','Notez les messages reçus hors horaires.'],['En parler','À votre manager, aux RH ou au CSE.'],['Alerter si votre santé est touchée','Le médecin du travail peut être consulté.']],
 pourquoi:'Être joignable en permanence peut nuire à votre <strong>santé</strong>. L\'employeur a une obligation de sécurité envers ses salariés.',
 eva:'Activez la mise en veille de vos notifications professionnelles en dehors de vos horaires : c\'est <strong>votre droit</strong>.',
 src:[L('art. L2242-17','L2242-17'),C],
 check:['Faire respecter votre déconnexion',['J\'ai consulté l\'accord ou la charte de mon entreprise','Je note les sollicitations hors horaires','J\'ai mis en veille mes notifications professionnelles','J\'en ai parlé à mon manager, aux RH ou au CSE','J\'ai consulté le médecin du travail si ma santé est touchée']],
 rel:['pauses-repos','teletravail','medecine-travail'],
 quiz:[['Depuis quand le droit à la déconnexion existe-t-il ?','Depuis <strong>2017</strong>.'],['Quelles entreprises doivent le négocier ?','Celles d\'au moins <strong>50 salariés</strong> avec un délégué syndical.'],['Que se passe-t-il sans accord ?','L\'employeur élabore une <strong>charte</strong>.'],['À quoi sert ce droit ?','À respecter vos <strong>temps de repos</strong> et votre vie personnelle.'],['Qui consulter si votre santé est touchée ?','Le <strong>médecin du travail</strong>.']] }),

evadMk3({ id:'droit-retrait', aud:'sal', ico:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', title:'Droit de retrait — Danger grave et imminent', sub:'Alerte · Retrait · Protection',
 intro:'Face à un <strong>danger grave et imminent</strong> pour votre vie ou votre santé, vous pouvez quitter votre poste sans sanction ni perte de salaire.',
 loi:['Le travailleur alerte immédiatement l\'employeur de toute situation de travail dont il a un motif raisonnable de penser qu\'elle présente un danger grave et imminent pour sa vie ou sa santé. Il peut se retirer d\'une telle situation.','Code du travail, articles L4131-1 à L4131-4'],
 qui:'Tous les salariés qui ont un <strong>motif raisonnable</strong> de penser qu\'une situation présente un danger grave et imminent.',
 quoi:{ t:[['Élément','Règle'],['Alerte','Prévenir immédiatement l\'employeur'],['Retrait','Quitter la situation dangereuse'],['Protection','Aucune sanction ni retenue de salaire si le motif était raisonnable'],['Limite','Le retrait ne doit pas créer un nouveau danger pour d\'autres personnes']] },
 quand:{ p:'Le retrait s\'exerce <strong>immédiatement</strong>, dès que le danger est identifié. Vous reprenez le travail quand la situation est sécurisée.' },
 comment:[['Alerter l\'employeur','Immédiatement, et par écrit si possible.'],['Vous retirer','Sans mettre d\'autres personnes en danger.'],['Prévenir le CSE','Un représentant du personnel peut aussi déclencher une alerte.'],['Garder une trace','Notez la date, l\'heure, la situation et les personnes présentes.']],
 pourquoi:'Le droit de retrait est une <strong>protection</strong>, pas une simple désobéissance : bien exercé, il ne peut entraîner aucune sanction.',
 eva:'Écrivez un message court à votre employeur : <strong>la situation, le danger, l\'heure</strong>. C\'est votre meilleure protection.',
 src:[L('art. L4131-1 à L4131-4','L4131-1'),C],
 check:['Exercer votre droit de retrait',['J\'ai alerté immédiatement mon employeur','Je me suis retiré(e) sans créer de nouveau danger','J\'ai prévenu un membre du CSE','J\'ai noté la date, l\'heure et la situation','Je reprends le travail une fois le danger écarté']],
 rel:['cse','accident-travail','medecine-travail'],
 quiz:[['Quand peut-on exercer son droit de retrait ?','Face à un <strong>danger grave et imminent</strong> pour sa vie ou sa santé.'],['Qui faut-il prévenir ?','L\'<strong>employeur</strong>, immédiatement.'],['Peut-on être sanctionné ?','<strong>Non</strong>, si le motif était raisonnable.'],['Le salaire est-il maintenu ?','<strong>Oui</strong>.'],['Quelle limite au retrait ?','Ne pas créer de <strong>nouveau danger</strong> pour d\'autres personnes.']] }),

evadMk3({ id:'sanction', aud:'sal', ico:'<path d="m14 13-7 7-3-3 7-7M13 4l7 7M10 7l7 7M16 2l6 6"/>', title:'Sanction disciplinaire — Procédure et contestation', sub:'Délai de 2 mois · Entretien · Notification',
 intro:'Avertissement, mise à pied, mutation : une sanction disciplinaire doit suivre une <strong>procédure stricte</strong>, sinon elle peut être annulée.',
 loi:['Aucun fait fautif ne peut donner lieu à lui seul à l\'engagement de poursuites disciplinaires au-delà d\'un délai de deux mois à compter du jour où l\'employeur en a eu connaissance. Sauf avertissement, la sanction est précédée d\'un entretien.','Code du travail, articles L1331-1 à L1334-1'],
 qui:'Tous les salariés. La procédure complète s\'applique pour toute sanction autre qu\'un simple avertissement ayant une incidence sur la présence, la fonction, la carrière ou la rémunération.',
 quoi:{ t:[['Garantie','Règle'],['Information','Aucune sanction sans que le salarié soit informé des griefs'],['Assistance','Vous pouvez vous faire assister par un salarié de l\'entreprise'],['Proportion','La sanction doit être proportionnée à la faute'],['Interdiction','Les sanctions pécuniaires (amendes) sont interdites']] },
 quand:{ t:[['Étape','Délai'],['Engager la procédure','Dans les <strong>2 mois</strong> après la connaissance des faits'],['Notification de la sanction','Au moins <strong>2 jours ouvrables</strong> et au plus <strong>1 mois</strong> après l\'entretien']] },
 comment:[['Lire la convocation','Elle indique l\'objet, la date, l\'heure et le lieu de l\'entretien.'],['Préparer l\'entretien','Rassemblez vos explications et vos preuves.'],['Vous faire assister','Par un collègue de votre choix dans l\'entreprise.'],['Contester si besoin','Répondez par écrit, puis saisissez le conseil de prud\'hommes.']],
 pourquoi:'Une sanction notifiée <strong>hors délai</strong>, disproportionnée ou sans entretien préalable peut être annulée par le juge.',
 eva:'Ne signez jamais « lu et approuvé » une sanction contestée : écrivez plutôt « <strong>reçu le</strong> » suivi de la date.',
 src:[L('art. L1332-1 à L1332-4','L1332-2'),C],
 check:['Réagir à une sanction disciplinaire',['J\'ai vérifié que les faits datent de moins de 2 mois','J\'ai préparé mes explications pour l\'entretien','Je me suis fait assister','J\'ai vérifié les délais de notification','J\'ai répondu par écrit si je conteste']],
 rel:['licenciement','cse','lanceur-alerte'],
 quiz:[['Dans quel délai l\'employeur doit-il engager la procédure ?','<strong>2 mois</strong> après avoir eu connaissance des faits.'],['L\'entretien est-il obligatoire pour un avertissement ?','<strong>Non</strong>, mais il l\'est pour les autres sanctions.'],['Dans quel délai la sanction est-elle notifiée ?','Entre <strong>2 jours ouvrables</strong> et <strong>1 mois</strong> après l\'entretien.'],['Les amendes sont-elles autorisées ?','<strong>Non</strong>, elles sont interdites.'],['Peut-on se faire assister ?','<strong>Oui</strong>, par un salarié de l\'entreprise.']] }),

evadMk3({ id:'abandon-poste', aud:'sal', ico:'<path d="M14 3h5v18h-5"/><path d="M10 17l5-5-5-5M15 12H3"/>', title:'Abandon de poste — La présomption de démission', sub:'Mise en demeure · 15 jours · Chômage',
 intro:'Depuis 2023, un salarié qui abandonne volontairement son poste peut être <strong>présumé démissionnaire</strong>, ce qui le prive en principe du chômage.',
 loi:['Le salarié qui a abandonné volontairement son poste et ne reprend pas le travail après avoir été mis en demeure de justifier son absence et de reprendre son poste, dans le délai fixé par l\'employeur, est présumé avoir démissionné.','Code du travail, article L1237-1-1 · Décret n° 2023-275 du 17 avril 2023'],
 qui:'Les salariés en CDI qui s\'absentent sans justification et ne répondent pas à la mise en demeure de l\'employeur.',
 quoi:{ t:[['Élément','Règle'],['Mise en demeure','Lettre recommandée ou remise en main propre contre décharge'],['Délai pour reprendre','Au moins <strong>15 jours</strong> à compter de la présentation de la mise en demeure'],['Conséquence','Présomption de démission'],['Chômage','En principe <strong>pas d\'ARE</strong>, comme pour une démission'],['Motif légitime','Raisons médicales, droit de retrait, droit de grève, refus d\'une modification du contrat…']] },
 quand:{ p:'Vous avez au moins <strong>15 jours</strong> après la présentation de la mise en demeure pour justifier votre absence ou reprendre le travail. Pour contester la présomption, le conseil de prud\'hommes statue au fond dans un délai d\'un mois.' },
 comment:[['Ne pas ignorer la mise en demeure','Lisez-la et notez le délai fixé.'],['Justifier votre absence','Envoyez par écrit votre motif légitime, avec vos justificatifs.'],['Reprendre le poste si possible','Dans le délai fixé par l\'employeur.'],['Contester si besoin','Devant le conseil de prud\'hommes.']],
 pourquoi:'L\'abandon de poste peut vous <strong>priver du chômage</strong>. Un motif légitime, signalé à temps, change tout.',
 eva:'Si vous voulez quitter l\'entreprise, privilégiez une <strong>rupture conventionnelle</strong> : elle préserve votre droit au chômage.',
 src:[L('art. L1237-1-1','L1237-1-1'),C],
 check:['Réagir face à une mise en demeure',['J\'ai lu la mise en demeure et noté le délai','J\'ai rassemblé les justificatifs de mon absence','J\'ai répondu par écrit avec mon motif légitime','J\'ai repris mon poste dans le délai si possible','J\'ai envisagé une rupture conventionnelle si je veux partir']],
 rel:['rupture','demission-legitime','are'],
 quiz:[['Que risque un salarié qui abandonne son poste ?','D\'être <strong>présumé démissionnaire</strong>.'],['Quel délai minimum après la mise en demeure ?','<strong>15 jours</strong>.'],['A-t-on droit au chômage ?','En principe <strong>non</strong>, comme pour une démission.'],['Citez un motif légitime d\'absence.','Par exemple des <strong>raisons médicales</strong> ou le droit de retrait.'],['Quelle alternative préserve le chômage ?','La <strong>rupture conventionnelle</strong>.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();
/* ── Refonte · Salarié · Lot S2 ── */
(function(){
var LEG=function(q){ return 'https://www.legifrance.gouv.fr/search/code?tab_selection=code&searchField=ALL&query='+encodeURIComponent(q); };
var LD='Texte en vigueur · consulté le 4 octobre 2026', CTN='https://code.travail.gouv.fr';
function L(t,q,code){ return ['Légifrance — '+(code||'Code du travail')+', '+t,LEG(q),LD,'⚖️']; }
var C=['Code du travail numérique',CTN,'','⚖️'];
var JUD=['Cour de cassation — Jurisprudence','https://www.courdecassation.fr','','⚖️'];
var arts=[
evadMk3({ id:'temps-partiel', aud:'sal', ico:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>', title:'Temps partiel — Vos droits', sub:'24 heures · Heures complémentaires · Priorité',
 intro:'Travailler à temps partiel, c\'est avoir les <strong>mêmes droits</strong> que les salariés à temps plein, au prorata, avec des garanties spécifiques sur vos horaires.',
 loi:['Le salarié à temps partiel bénéficie des droits reconnus aux salariés à temps complet. Sa durée de travail, ses heures complémentaires et la répartition de ses horaires sont encadrées.','Code du travail, articles L3123-1 à L3123-34'],
 qui:'Tout salarié dont la durée de travail est inférieure à la durée légale (35 heures) ou à la durée conventionnelle.',
 quoi:{ t:[['Règle','Contenu'],['Durée minimale','<strong>24 heures</strong> par semaine, sauf dérogation (à votre demande écrite ou par accord de branche)'],['Heures complémentaires','Majorées d\'au moins <strong>10 %</strong> jusqu\'au dixième de la durée prévue, puis <strong>25 %</strong>'],['Plafond','Les heures complémentaires ne peuvent pas porter la durée au niveau d\'un temps plein'],['Contrat écrit','Durée, répartition des horaires et conditions de modification'],['Priorité','Pour obtenir un emploi à temps plein dans l\'entreprise']] },
 quand:{ p:'Toute modification de la répartition de vos horaires doit vous être notifiée au moins <strong>7 jours ouvrés</strong> à l\'avance, sauf accord prévoyant un délai différent (au minimum 3 jours ouvrés).' },
 comment:[['Relire votre contrat','Il doit indiquer la durée et la répartition de vos horaires.'],['Relever vos heures','Comptez vos heures complémentaires chaque semaine.'],['Contrôler votre bulletin de paie','Les heures complémentaires et leurs majorations doivent apparaître.'],['Demander un temps plein','Faites valoir votre priorité par écrit si un poste se libère.']],
 pourquoi:'Si vos heures complémentaires dépassent régulièrement votre durée prévue, votre contrat peut être <strong>révisé</strong>. Vos relevés sont la clé.',
 eva:'Gardez les plannings qu\'on vous envoie : un changement d\'horaires annoncé trop tard peut être contesté.',
 src:[L('art. L3123-1 et suivants','L3123-27'),C],
 check:['Faire respecter votre temps partiel',['Mon contrat écrit précise ma durée et mes horaires','Je relève mes heures complémentaires','J\'ai vérifié leurs majorations sur mon bulletin','Je garde les plannings et changements d\'horaires','J\'ai fait valoir ma priorité pour un temps plein si je le souhaite']],
 rel:['heures-sup','bulletin-paie','salaire'],
 quiz:[['Quelle est la durée minimale d\'un temps partiel ?','<strong>24 heures</strong> par semaine, sauf dérogation.'],['Quelle majoration pour les premières heures complémentaires ?','Au moins <strong>10 %</strong>.'],['Et au-delà du dixième de la durée prévue ?','<strong>25 %</strong>.'],['Quel délai pour modifier vos horaires ?','<strong>7 jours ouvrés</strong>, sauf accord (3 jours minimum).'],['Avez-vous une priorité pour un temps plein ?','<strong>Oui</strong>, pour un emploi de votre catégorie.']] }),

evadMk3({ id:'non-concurrence', aud:'sal', ico:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', title:'Clause de non-concurrence — Est-elle valable ?', sub:'4 conditions · Contrepartie · Renonciation',
 intro:'Votre contrat vous interdit de travailler pour un concurrent après votre départ ? Cette clause n\'est valable que si elle respecte <strong>4 conditions cumulatives</strong>.',
 loi:['Selon la Cour de cassation, une clause de non-concurrence n\'est licite que si elle est indispensable aux intérêts légitimes de l\'entreprise, limitée dans le temps et dans l\'espace, tient compte des spécificités de l\'emploi et comporte une contrepartie financière.','Cour de cassation, chambre sociale, 10 juillet 2002 (n° 00-45.135)'],
 qui:'Les salariés dont le contrat ou la convention collective prévoit une clause de non-concurrence.',
 quoi:{ t:[['Condition','Ce que ça veut dire'],['Intérêt légitime','Elle protège réellement l\'entreprise'],['Limite dans le temps','Une durée précise'],['Limite dans l\'espace','Une zone géographique définie'],['Contrepartie financière','<strong>Obligatoire</strong>, versée après le départ']] },
 quand:{ p:'La clause s\'applique <strong>après la fin du contrat</strong>. L\'employeur peut y renoncer seulement si le contrat ou la convention le prévoit, et dans le délai fixé.' },
 comment:[['Relire la clause','Vérifiez durée, zone, activités visées et contrepartie.'],['Vérifier la renonciation','L\'employeur a-t-il renoncé à la clause dans le délai prévu ?'],['Réclamer la contrepartie','Si vous respectez la clause, la contrepartie vous est due.'],['Faire contrôler une clause douteuse','Le conseil de prud\'hommes peut l\'annuler ou la réduire.']],
 pourquoi:'Une clause <strong>sans contrepartie financière</strong> est nulle : vous êtes libre de travailler pour un concurrent.',
 eva:'Au moment du départ, demandez par écrit si l\'employeur <strong>maintient ou renonce</strong> à la clause : vous saurez où vous en êtes.',
 src:[JUD,C],
 check:['Vérifier votre clause de non-concurrence',['J\'ai relu la durée et la zone géographique','J\'ai vérifié la contrepartie financière prévue','J\'ai demandé par écrit si l\'employeur maintient la clause','Je reçois la contrepartie si je respecte la clause','J\'ai fait contrôler une clause qui me semble abusive']],
 rel:['clause-mobilite','licenciement','rupture'],
 quiz:[['Combien de conditions doit respecter la clause ?','<strong>4</strong>, cumulativement.'],['La contrepartie financière est-elle obligatoire ?','<strong>Oui</strong>.'],['Que se passe-t-il sans contrepartie ?','La clause est <strong>nulle</strong>.'],['Quand s\'applique la clause ?','<strong>Après la fin</strong> du contrat.'],['Qui peut annuler une clause abusive ?','Le <strong>conseil de prud\'hommes</strong>.']] }),

evadMk3({ id:'clause-mobilite', aud:'sal', ico:'<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>', title:'Clause de mobilité — Peut-on vous muter ?', sub:'Zone précise · Bonne foi · Refus',
 intro:'La clause de mobilité permet à l\'employeur de modifier votre lieu de travail. Mais elle est <strong>strictement encadrée</strong> par les juges.',
 loi:['Pour être valable, la clause de mobilité doit définir de façon précise sa zone géographique d\'application et ne peut pas conférer à l\'employeur le pouvoir d\'en étendre unilatéralement la portée.','Cour de cassation, chambre sociale, jurisprudence constante'],
 qui:'Les salariés dont le contrat de travail contient une clause de mobilité.',
 quoi:{ t:[['Condition','Ce que ça veut dire'],['Zone précise','La zone géographique doit être définie dans le contrat'],['Bonne foi','La mutation doit répondre à l\'intérêt de l\'entreprise'],['Délai de prévenance','Vous devez être prévenu(e) dans un délai raisonnable'],['Vie personnelle','Pas d\'atteinte disproportionnée à votre vie personnelle et familiale']] },
 quand:{ p:'La mise en œuvre doit respecter un <strong>délai de prévenance suffisant</strong>, apprécié selon votre situation.' },
 comment:[['Relire la clause','Vérifiez que la zone est précise et non extensible.'],['Analyser la mutation','Est-elle justifiée et annoncée à temps ?'],['Exposer vos contraintes','Signalez par écrit vos contraintes familiales ou de santé.'],['Se faire conseiller avant de refuser','Un refus d\'une clause valable peut être une faute.']],
 pourquoi:'Une clause floue (« tout le territoire », sans précision) ou appliquée de mauvaise foi peut être <strong>contestée</strong>. À l\'inverse, refuser une clause valable expose à un licenciement.',
 eva:'Avant de répondre, faites relire votre clause : <strong>la précision de la zone</strong> est souvent le point décisif.',
 src:[JUD,C],
 check:['Réagir à une demande de mutation',['J\'ai relu ma clause et vérifié la précision de la zone','J\'ai vérifié le délai de prévenance','J\'ai exposé mes contraintes par écrit','Je me suis fait conseiller avant de refuser','J\'ai gardé tous les échanges écrits']],
 rel:['non-concurrence','licenciement','teletravail'],
 quiz:[['Que doit préciser la clause ?','Une <strong>zone géographique précise</strong>.'],['L\'employeur peut-il étendre la zone seul ?','<strong>Non</strong>.'],['La mutation doit-elle être annoncée à l\'avance ?','<strong>Oui</strong>, avec un délai raisonnable.'],['Refuser une clause valable est-il sans risque ?','Non, cela peut être une <strong>faute</strong>.'],['Une atteinte disproportionnée à la vie familiale est-elle admise ?','<strong>Non</strong>.']] }),

evadMk3({ id:'promesse-embauche', aud:'sal', ico:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>', title:'Promesse d\'embauche — Ce qui vous engage', sub:'Offre · Promesse unilatérale · Rétractation',
 intro:'Un écrit qui vous propose un poste peut déjà <strong>engager l\'employeur</strong>. Tout dépend de sa forme : offre de contrat ou promesse unilatérale.',
 loi:['Depuis 2017, la Cour de cassation distingue l\'offre de contrat de travail, qui peut être rétractée tant qu\'elle n\'est pas parvenue à son destinataire, et la promesse unilatérale de contrat, dont la révocation pendant le délai d\'option n\'empêche pas la formation du contrat.','Cour de cassation, chambre sociale, 21 septembre 2017 · Code civil, articles 1114 et 1124'],
 qui:'Les candidats qui reçoivent une proposition écrite d\'emploi.',
 quoi:{ t:[['Document','Effet'],['Offre de contrat','Précise l\'emploi, la rémunération et la date d\'entrée ; l\'employeur peut la retirer avant qu\'elle vous parvienne'],['Après réception','Le retrait de l\'offre engage la responsabilité de l\'employeur'],['Promesse unilatérale','Vous accorde le choix d\'accepter ; une révocation pendant votre délai n\'empêche pas la formation du contrat']] },
 quand:{ p:'Respectez le <strong>délai de réponse</strong> indiqué dans le document : votre acceptation dans ce délai est décisive.' },
 comment:[['Demander un écrit','Exigez un document daté, précis et signé.'],['Vérifier son contenu','Poste, rémunération, date d\'entrée en fonction.'],['Accepter par écrit','Dans le délai fixé, en gardant une preuve.'],['Ne pas démissionner trop tôt','Attendez d\'avoir l\'écrit et votre acceptation formalisée.']],
 pourquoi:'Démissionner sur la base d\'une simple promesse orale est <strong>risqué</strong>. Un écrit précis vous protège en cas de revirement de l\'employeur.',
 eva:'Gardez tous les e-mails de recrutement : un message précis sur le poste, le salaire et la date peut valoir <strong>offre de contrat</strong>.',
 src:[JUD,L('art. 1114 et 1124','1124','Code civil')],
 check:['Sécuriser une promesse d\'embauche',['J\'ai un écrit daté et signé','Il précise poste, rémunération et date d\'entrée','J\'ai accepté par écrit dans le délai','J\'ai gardé une preuve de mon acceptation','Je n\'ai démissionné qu\'après avoir sécurisé l\'écrit']],
 rel:['periode-essai','non-concurrence','bulletin-paie'],
 quiz:[['Une offre de contrat peut-elle être retirée ?','Oui, <strong>avant qu\'elle vous parvienne</strong>.'],['Que se passe-t-il si une promesse unilatérale est révoquée pendant le délai ?','Le contrat est <strong>quand même formé</strong>.'],['Que doit préciser une offre ?','L\'<strong>emploi</strong>, la <strong>rémunération</strong> et la <strong>date d\'entrée</strong>.'],['Faut-il accepter par écrit ?','C\'est fortement conseillé, <strong>dans le délai</strong>.'],['Peut-on démissionner sur une promesse orale ?','C\'est <strong>risqué</strong> : attendez un écrit.']] }),

evadMk3({ id:'bulletin-paie', aud:'sal', ico:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>', title:'Bulletin de paie — Le lire et le conserver', sub:'Mentions · Format électronique · Prescription',
 intro:'Votre bulletin de paie prouve votre salaire, vos heures et vos droits. Savoir le lire permet de repérer une <strong>erreur</strong> rapidement.',
 loi:['L\'employeur remet au salarié une pièce justificative, le bulletin de paie, lors du paiement du salaire. Il peut être remis sous forme électronique, sauf opposition du salarié.','Code du travail, articles L3243-1 à L3243-5 et R3243-1'],
 qui:'Tous les salariés, à chaque paiement du salaire.',
 quoi:{ t:[['Élément','Règle'],['Mentions','Employeur, emploi, convention collective, période, heures, salaire brut, cotisations, net à payer…'],['Format','Papier ou électronique, sauf opposition du salarié'],['Conservation par l\'employeur','Un double pendant <strong>5 ans</strong>'],['Rappel de salaire','Réclamable sur <strong>3 ans</strong>']] },
 quand:{ p:'Le bulletin est remis à <strong>chaque paiement</strong> du salaire. En cas d\'erreur, vous pouvez réclamer les sommes dues sur les <strong>3 dernières années</strong>.' },
 comment:[['Vérifier les heures','Heures normales, supplémentaires et leurs majorations.'],['Contrôler le net à payer','Et le montant net social, utile pour la prime d\'activité.'],['Vérifier les congés','Jours acquis et pris.'],['Conserver vos bulletins','Gardez-les jusqu\'à la liquidation de votre retraite.']],
 pourquoi:'Vos bulletins prouvent vos périodes travaillées pour la <strong>retraite</strong> et vos droits au chômage. Une erreur non contestée peut vous coûter cher.',
 eva:'Gardez vos bulletins <strong>toute votre vie professionnelle</strong> : ils sont la meilleure preuve de votre carrière.',
 src:[L('art. L3243-1 et suivants','L3243-2'),C],
 check:['Contrôler votre bulletin de paie',['J\'ai vérifié mes heures et leurs majorations','J\'ai contrôlé mon net à payer','J\'ai vérifié mon compteur de congés','J\'ai signalé par écrit toute erreur','Je conserve tous mes bulletins']],
 rel:['heures-sup','salaire','conges'],
 quiz:[['Le bulletin de paie peut-il être électronique ?','<strong>Oui</strong>, sauf opposition du salarié.'],['Combien de temps l\'employeur garde-t-il un double ?','<strong>5 ans</strong>.'],['Sur combien d\'années peut-on réclamer un rappel de salaire ?','<strong>3 ans</strong>.'],['Quand est-il remis ?','À <strong>chaque paiement</strong> du salaire.'],['Combien de temps le salarié doit-il le garder ?','Idéalement <strong>jusqu\'à la retraite</strong>.']] }),

evadMk3({ id:'medecine-travail', aud:'sal', ico:'<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>', title:'Médecine du travail — Visites et rôle', sub:'Embauche · Périodique · Reprise',
 intro:'Le médecin du travail <strong>protège votre santé</strong> au travail. Ses visites sont obligatoires, et vous pouvez aussi le consulter à votre demande.',
 loi:['Tout travailleur bénéficie d\'un suivi individuel de son état de santé assuré par le service de prévention et de santé au travail. Des visites sont prévues à l\'embauche, périodiquement et lors de la reprise.','Code du travail, articles R4624-10 à R4624-34'],
 qui:'Tous les salariés. Les postes à risque bénéficient d\'un suivi renforcé.',
 quoi:{ t:[['Visite','Quand ?'],['Information et prévention','Dans les <strong>3 mois</strong> suivant la prise de poste'],['Suivi périodique','Au maximum tous les <strong>5 ans</strong>'],['Visite de reprise','Après un congé maternité, une maladie professionnelle, un accident du travail d\'au moins <strong>30 jours</strong> ou une maladie d\'au moins <strong>60 jours</strong>'],['Pré-reprise','Pendant un arrêt de plus de 30 jours, pour préparer le retour'],['À votre demande','À tout moment']] },
 quand:{ p:'La visite de reprise a lieu le jour de la reprise et au plus tard dans les <strong>8 jours</strong> qui suivent.' },
 comment:[['Repérer vos échéances','Notez la date de votre dernière visite.'],['Demander une visite si besoin','Directement auprès du service de santé au travail.'],['Préparer la visite','Listez vos difficultés et tâches pénibles.'],['Demander une pré-reprise','Pendant un arrêt long, pour aménager votre retour.']],
 pourquoi:'Le médecin du travail peut proposer des <strong>aménagements de poste</strong>. La visite est confidentielle : votre employeur ne connaît pas votre diagnostic.',
 eva:'Un problème de santé qui vous gêne au travail ? Demandez une visite <strong>vous-même</strong>, sans attendre la visite périodique.',
 src:[L('art. R4624-10 et suivants','R4624-31'),C],
 check:['Suivre votre santé au travail',['J\'ai noté la date de ma dernière visite','J\'ai demandé une visite si j\'ai une difficulté','J\'ai préparé mes questions pour le médecin','J\'ai demandé une pré-reprise pendant un arrêt long','J\'ai passé la visite de reprise dans les 8 jours']],
 rel:['inaptitude','tpt','accident-travail'],
 quiz:[['Dans quel délai a lieu la visite d\'information et de prévention ?','Dans les <strong>3 mois</strong> suivant la prise de poste.'],['Quelle périodicité maximale pour le suivi ?','<strong>5 ans</strong>.'],['Après combien de jours de maladie la visite de reprise est-elle obligatoire ?','<strong>60 jours</strong>.'],['Peut-on demander une visite soi-même ?','<strong>Oui</strong>, à tout moment.'],['Dans quel délai a lieu la visite de reprise ?','Au plus tard <strong>8 jours</strong> après la reprise.']] }),

evadMk3({ id:'inaptitude', aud:'sal', ico:'<path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="12" r="2"/>', title:'Inaptitude — Reclassement ou licenciement', sub:'Constat · Reclassement · Délai d\'un mois',
 intro:'Seul le <strong>médecin du travail</strong> peut déclarer un salarié inapte à son poste. L\'employeur doit alors chercher à le reclasser.',
 loi:['Lorsque le salarié est déclaré inapte, l\'employeur lui propose un autre emploi approprié à ses capacités. S\'il n\'est ni reclassé ni licencié dans le délai d\'un mois, l\'employeur lui verse le salaire correspondant à son emploi.','Code du travail, articles L1226-2 à L1226-4 (origine non professionnelle) et L1226-10 à L1226-17 (origine professionnelle)'],
 qui:'Les salariés déclarés inaptes par le médecin du travail, que l\'inaptitude soit d\'origine professionnelle ou non.',
 quoi:{ t:[['Élément','Règle'],['Constat','Par le médecin du travail uniquement, après échange avec vous et l\'employeur'],['Reclassement','Proposition d\'un emploi adapté, sauf dispense écrite du médecin'],['Délai d\'un mois','Sans reclassement ni licenciement, reprise du paiement du salaire'],['Origine professionnelle','Indemnité spéciale de licenciement égale au <strong>double</strong> de l\'indemnité légale']] },
 quand:{ p:'Le délai d\'<strong>1 mois</strong> court à partir de la date de l\'avis d\'inaptitude.' },
 comment:[['Préparer la visite','Listez les tâches que vous pouvez encore faire.'],['Lire l\'avis du médecin','Il précise vos capacités et les aménagements possibles.'],['Étudier les propositions de reclassement','Elles doivent être adaptées à vos capacités.'],['Surveiller le délai d\'un mois','Vérifiez la reprise du salaire si rien n\'est décidé.']],
 pourquoi:'Si l\'employeur ne vous reclasse ni ne vous licencie dans le mois, il doit <strong>reprendre le paiement</strong> de votre salaire.',
 eva:'Avant l\'avis, parlez au médecin des <strong>aménagements possibles</strong> : une solution sur mesure vaut souvent mieux qu\'une inaptitude.',
 src:[L('art. L1226-2 à L1226-4','L1226-4'),L('art. L1226-14 (indemnité spéciale)','L1226-14'),C],
 check:['Faire face à une inaptitude',['J\'ai préparé la liste de mes capacités','J\'ai lu attentivement l\'avis du médecin du travail','J\'ai étudié les propositions de reclassement','J\'ai noté la date de l\'avis pour le délai d\'un mois','J\'ai vérifié l\'origine professionnelle ou non de l\'inaptitude']],
 rel:['medecine-travail','accident-travail','licenciement'],
 quiz:[['Qui peut déclarer l\'inaptitude ?','Le <strong>médecin du travail</strong> uniquement.'],['Que doit faire l\'employeur ?','Rechercher un <strong>reclassement</strong>.'],['Que se passe-t-il après un mois sans décision ?','L\'employeur doit <strong>reprendre le paiement du salaire</strong>.'],['Quelle indemnité en cas d\'origine professionnelle ?','Le <strong>double</strong> de l\'indemnité légale.'],['À partir de quand court le délai d\'un mois ?','De la <strong>date de l\'avis</strong> d\'inaptitude.']] }),

evadMk3({ id:'cse', aud:'sal', ico:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.4 3.4-5.5 6.5-5.5s5.7 2.1 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20c-.5-2.6-2-4.5-4.2-5.2"/>', title:'CSE — Vos représentants du personnel', sub:'Seuils · Missions · Comment le saisir',
 intro:'Le <strong>comité social et économique (CSE)</strong> représente les salariés auprès de l\'employeur. C\'est un appui précieux, souvent sous-utilisé.',
 loi:['Un comité social et économique est mis en place dans les entreprises d\'au moins 11 salariés, lorsque cet effectif est atteint pendant 12 mois consécutifs.','Code du travail, articles L2311-2 et L2312-1 à L2312-8'],
 qui:'Tous les salariés des entreprises d\'au moins <strong>11 salariés</strong> (12 mois consécutifs).',
 quoi:{ t:[['Taille','Missions principales'],['À partir de 11 salariés','Présenter les réclamations individuelles et collectives, veiller à la santé, sécurité et conditions de travail, saisir l\'inspection du travail'],['À partir de 50 salariés','Consultation sur la marche de l\'entreprise, activités sociales et culturelles'],['Droit d\'alerte','En cas d\'atteinte aux droits des personnes, de danger grave et imminent…']] },
 quand:{ p:'Vous pouvez contacter un élu <strong>à tout moment</strong>. Les élus disposent d\'heures de délégation pour exercer leur mandat.' },
 comment:[['Identifier vos élus','Leurs noms sont affichés dans l\'entreprise.'],['Exposer votre situation','Par écrit, de façon factuelle.'],['Demander leur appui','Ils peuvent porter votre réclamation auprès de la direction.'],['Suivre la réponse','Gardez une trace des échanges.']],
 pourquoi:'Un élu du CSE peut <strong>intervenir</strong> sur un problème de planning, de sécurité ou de harcèlement, et déclencher un droit d\'alerte.',
 eva:'Vous hésitez à aller voir la direction seul(e) ? Passez d\'abord par un élu du CSE : il connaît les <strong>bons interlocuteurs</strong>.',
 src:[L('art. L2311-2','L2311-2'),C],
 check:['Mobiliser le CSE',['J\'ai repéré les élus du CSE','J\'ai exposé ma situation par écrit','J\'ai demandé leur appui','J\'ai gardé une trace des échanges','J\'ai suivi la réponse de la direction']],
 rel:['droit-retrait','sanction','lanceur-alerte'],
 quiz:[['À partir de combien de salariés un CSE est-il obligatoire ?','<strong>11 salariés</strong>, pendant 12 mois consécutifs.'],['Le CSE peut-il porter une réclamation individuelle ?','<strong>Oui</strong>.'],['À partir de quel seuil gère-t-il les activités sociales et culturelles ?','<strong>50 salariés</strong>.'],['Le CSE a-t-il un droit d\'alerte ?','<strong>Oui</strong>, notamment en cas de danger grave et imminent.'],['Où trouver les noms des élus ?','Ils sont <strong>affichés</strong> dans l\'entreprise.']] }),

evadMk3({ id:'travail-nuit', aud:'sal', ico:'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>', title:'Travail de nuit — Protections et contreparties', sub:'Définition · Durées · Repos compensateur',
 intro:'Le travail de nuit est <strong>exceptionnel</strong> et doit être justifié. La loi impose des contreparties et un suivi de santé adapté.',
 loi:['Le recours au travail de nuit est exceptionnel. Il prend en compte les impératifs de protection de la santé et de la sécurité des travailleurs et est justifié par la nécessité d\'assurer la continuité de l\'activité.','Code du travail, articles L3122-1 à L3122-24'],
 qui:'Les salariés qui travaillent régulièrement la nuit. Par défaut, est travailleur de nuit celui qui accomplit au moins <strong>3 heures</strong> de nuit au moins <strong>2 fois par semaine</strong>, ou un nombre minimal d\'heures sur 12 mois.',
 quoi:{ t:[['Règle','Contenu'],['Période de nuit','Au moins 9 heures consécutives incluant minuit à 5 heures ; à défaut d\'accord, de <strong>21 heures à 6 heures</strong>'],['Durée quotidienne','<strong>8 heures</strong> maximum, sauf dérogation'],['Durée hebdomadaire','<strong>40 heures</strong> en moyenne sur 12 semaines, sauf accord (44 heures)'],['Contreparties','<strong>Repos compensateur</strong> obligatoire, et le cas échéant compensation salariale'],['Santé','Suivi médical adapté']] },
 quand:{ p:'Vous bénéficiez d\'une <strong>priorité</strong> pour passer sur un poste de jour, notamment pour des obligations familiales impérieuses.' },
 comment:[['Vérifier votre statut','Comptez vos heures de nuit par semaine.'],['Contrôler les contreparties','Repos compensateur et éventuelle majoration.'],['Suivre votre santé','Demandez une visite au médecin du travail si besoin.'],['Demander un poste de jour','Faites valoir votre priorité par écrit.']],
 pourquoi:'Le travail de nuit use la santé. Les <strong>contreparties</strong> ne sont pas un bonus facultatif : elles sont obligatoires.',
 eva:'Enceinte et travailleuse de nuit ? Vous pouvez demander à être <strong>affectée à un poste de jour</strong>.',
 src:[L('art. L3122-1 et suivants','L3122-2'),C],
 check:['Vos droits de travailleur de nuit',['J\'ai vérifié si je suis travailleur de nuit','Je bénéficie d\'un repos compensateur','J\'ai vérifié une éventuelle majoration de salaire','Je suis mon suivi médical','J\'ai demandé un poste de jour si nécessaire']],
 rel:['pauses-repos','medecine-travail','feries-dimanche'],
 quiz:[['Quelle est la période de nuit à défaut d\'accord ?','De <strong>21 heures à 6 heures</strong>.'],['Quelle durée quotidienne maximale ?','<strong>8 heures</strong>, sauf dérogation.'],['Le repos compensateur est-il obligatoire ?','<strong>Oui</strong>.'],['Qui est travailleur de nuit par défaut ?','Celui qui fait au moins <strong>3 heures de nuit 2 fois par semaine</strong>.'],['Peut-on demander un poste de jour ?','<strong>Oui</strong>, avec une priorité.']] }),

evadMk3({ id:'feries-dimanche', aud:'sal', ico:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', title:'Jours fériés et travail le dimanche', sub:'11 jours fériés · 1er mai · Repos dominical',
 intro:'Il existe <strong>11 jours fériés</strong> en France, mais un seul est obligatoirement chômé et payé : le <strong>1er mai</strong>. Le dimanche est, en principe, jour de repos.',
 loi:['Le 1er mai est jour férié et chômé ; le chômage du 1er mai ne peut entraîner de réduction de salaire. Le repos hebdomadaire est donné le dimanche, sauf dérogations prévues par la loi.','Code du travail, articles L3133-1 à L3133-6 et L3132-3'],
 qui:'Tous les salariés. Les dérogations au repos dominical concernent certains secteurs et zones (commerces, services continus, zones touristiques…).',
 quoi:{ t:[['Règle','Contenu'],['Jours fériés','11 jours fixés par la loi'],['1er mai chômé','Sans perte de salaire'],['1er mai travaillé','Indemnité égale au montant du salaire de la journée, soit un salaire <strong>doublé</strong>'],['Autres jours fériés','Chômés ou non selon accord, convention ou décision de l\'employeur'],['Dimanche','Repos de principe, avec des dérogations et des contreparties souvent prévues par accord']] },
 quand:{ p:'Vérifiez votre <strong>convention collective</strong> avant chaque jour férié : c\'est elle qui fixe le plus souvent les règles et majorations.' },
 comment:[['Consulter votre convention collective','Sur le Code du travail numérique.'],['Vérifier votre planning','Jours fériés travaillés et dimanches.'],['Contrôler votre bulletin de paie','Majorations et repos compensateurs éventuels.'],['Réclamer par écrit','Toute majoration oubliée.']],
 pourquoi:'Le 1er mai travaillé doit être <strong>payé double</strong>. Pour les autres jours, seule votre convention collective permet de savoir ce qui vous est dû.',
 eva:'Retrouvez votre convention collective grâce à son nom ou son numéro IDCC, indiqué sur votre bulletin de paie.',
 src:[L('art. L3133-1 et suivants','L3133-6'),['Code du travail numérique — Trouver sa convention collective',CTN+'/outils/convention-collective','','⚖️']],
 check:['Vos droits les jours fériés et le dimanche',['J\'ai trouvé ma convention collective','J\'ai vérifié les jours fériés chômés dans mon entreprise','Mon 1er mai travaillé est payé double','J\'ai vérifié les contreparties du travail le dimanche','J\'ai réclamé par écrit toute majoration oubliée']],
 rel:['travail-nuit','pauses-repos','bulletin-paie'],
 quiz:[['Combien y a-t-il de jours fériés légaux ?','<strong>11</strong>.'],['Quel jour férié est obligatoirement chômé ?','Le <strong>1er mai</strong>.'],['Comment est payé le 1er mai travaillé ?','<strong>Double</strong>.'],['Le dimanche est-il un jour de repos ?','<strong>Oui</strong>, en principe, sauf dérogations.'],['Où trouver vos règles exactes ?','Dans votre <strong>convention collective</strong>.']] })
];
arts.forEach(function(a){ evadPut('salarie',a); });
})();






// ══ Fonctions de navigation ══

function evadShowList(profile) {
  _evadCurrentProfile = profile;
  var p = EVAD_PROFILES[profile];
  var articles = EVAD_ARTICLES[profile];

  // Mise à jour header
  document.getElementById('evad-list-title').textContent = p.title;

  // Hero
  var hero = document.getElementById('evad-list-hero');
  hero.style.background = p.heroGrad;
  document.getElementById('evad-list-tag').textContent = p.tag;
  document.getElementById('evad-list-tag').style.color = p.tagColor;
  document.getElementById('evad-list-h').textContent = p.title.replace(/^[^\s]+\s/,'');
  document.getElementById('evad-list-p').textContent = p.desc;
  // Réinitialiser filtre alpha + onglet (Salarié par défaut)
  _evadActiveAlpha = 'ALL';
  if(EVAD_TABS[profile] && EVAD_TABS[profile].map(function(t){ return t[0]; }).indexOf(_evadSubTab)<0) _evadSubTab=EVAD_TABS[profile][0][0];

  // Onglets + pastilles A-Z + liste
  evadRefreshList();

  // Naviguer
  var screens = document.querySelectorAll('.evad-screen, .screen');
  screens.forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById('s-eva-droits-list');
  if(el){ el.classList.add('active'); }

  // Masquer tnav/bnav
  var tnav=document.getElementById('tnav');
  var bnav=document.getElementById('bnav');
  if(tnav) tnav.style.display='none';
  if(bnav) bnav.style.display='none';
}

var _evadActiveAlpha = 'ALL';

function evadBuildAlphaBar(articles) {
  var p = EVAD_PROFILES[_evadCurrentProfile] || {};
  var dark  = p.accentDark  || '#0f172a';
  var mid   = p.accentMid   || '#059669';
  var light = p.accentLight || '#f0fdf4';
  var txt   = p.accentText  || mid;

  // CSS dynamique profil — injecté une fois
  var sid = 'az-profile-style';
  var sel = document.getElementById(sid);
  if(!sel){ sel=document.createElement('style'); sel.id=sid; document.head.appendChild(sel); }
  sel.textContent =
    '.az-search-wrap{background:linear-gradient(180deg,'+light+' 0%,#fff 100%) !important;border-bottom:2px solid '+mid+'22 !important;}' +
    '.az-filter-hook{color:'+mid+' !important;}' +
    '.az-alpha-btn{border-color:'+mid+'33;color:'+txt+'44;}' +
    '.az-alpha-btn.has-items{border-color:'+mid+'99;color:'+txt+';background:'+light+';}' +
    '.az-alpha-btn.active,.az-alpha-btn.has-items.active{background:linear-gradient(135deg,'+dark+','+mid+');border-color:'+dark+';color:#fff;box-shadow:0 2px 10px '+mid+'55;}' +
    '.az-alpha-all{background:'+dark+';border-color:'+dark+';color:#fff;font-weight:800;}' +
    '.az-alpha-all.active{background:linear-gradient(135deg,'+dark+','+mid+');}' +
    '.az-letter-anchor{color:'+mid+'77;}' +
    '.az-letter-anchor::before{background:'+mid+'55;}' +
    '.az-item::before{background:linear-gradient(180deg,'+dark+','+mid+');}' +
    '.az-item-ico{background:'+light+';border:1.5px solid '+mid+'33;}' +
    '.az-item-ico svg{stroke:'+txt+';}' +
    '.az-item-arr{background:'+light+';}' +
    '.az-item-arr svg{stroke:'+mid+';}' +
    '.az-item-read{background:'+light+';color:'+txt+';}' +
    '.az-item:active{background:#f8fafc;}';

  var sorted = articles.slice().sort(function(a,b){ return a.title.localeCompare(b.title,'fr'); });
  var available = {};
  sorted.forEach(function(art){
    var letter = art.title.replace(/^[^\w]*/,'')[0].toUpperCase();
    available[letter] = true;
  });
  var allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var bar = document.getElementById('evad-alpha-bar');
  if(!bar) return;
  var html = '<button class="az-alpha-btn az-alpha-all' + (_evadActiveAlpha==='ALL' ? ' active' : '') + '" onclick="evadAlphaFilter(\'ALL\')">Tout</button>';
  allLetters.forEach(function(l){
    var has = available[l] ? ' has-items' : ' disabled';
    var act = _evadActiveAlpha===l ? ' active' : '';
    html += '<button class="az-alpha-btn'+has+act+'" onclick="evadAlphaFilter(\''+l+'\')">' + l + '</button>';
  });
  bar.innerHTML = html;
}

function evadAlphaFilter(letter) {
  _evadActiveAlpha = letter;
  var articles = evadCurArticles();
  evadBuildAlphaBar(articles);
  evadRenderList(articles);
}

function evadRenderList(articles) {
  var p = EVAD_PROFILES[_evadCurrentProfile] || {};
  var dark  = p.accentDark  || '#0f172a';
  var mid   = p.accentMid   || '#059669';
  var light = p.accentLight || '#f0fdf4';
  var txt   = p.accentText  || mid;

  var sorted = articles.slice().sort(function(a,b){ return a.title.localeCompare(b.title,'fr'); });
  var filtered = _evadActiveAlpha==='ALL' ? sorted : sorted.filter(function(art){
    return art.title.replace(/^[^\w]*/,'')[0].toUpperCase() === _evadActiveAlpha;
  });
  var grouped = {};
  filtered.forEach(function(art){
    var letter = art.title.replace(/^[^\w]*/,'')[0].toUpperCase();
    if(!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(art);
  });
  var letters = Object.keys(grouped).sort();
  var html = '';
  if(!letters.length){ html='<div class="az-empty">Aucun thème pour cette lettre.</div>'; }
  else {
    letters.forEach(function(letter){
      html += '<div class="az-letter-anchor">' + letter + '</div>';
      html += '<div class="az-cards-group">';
      grouped[letter].forEach(function(art){
        var mins = art.sub.split('·').length <= 3 ? '2 min' : art.sub.split('·').length <= 5 ? '3 min' : '4 min';
        var ico = art.ico.replace(/stroke="currentColor"/g,'stroke="'+txt+'"');
        html +=
          '<div class="az-item" onclick="evadShowArticle(\''+art.id+'\')">'+
            '<div class="az-item-ico">'+ico+'</div>'+
            '<div class="az-item-body">'+
              '<div class="az-item-title">'+art.title+'</div>'+
              '<div class="az-item-sub">'+art.sub+'</div>'+
              '<div class="az-item-read">'+
                '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 3"/></svg>'+
                mins+' de lecture'+
              '</div>'+
            '</div>'+
            '<div class="az-item-arr"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></div>'+
          '</div>';
      });
      html += '</div>';
    });
  }
  document.getElementById('evad-list-body').innerHTML = html;
}

function evadFilter() { /* remplacé par filtre alpha */ }

function evadShowArticle(id) {
  var articles = EVAD_ARTICLES[_evadCurrentProfile];
  var art = articles.find(function(a){ return a.id === id; });
  if(!art) return;

  // Remplir l'article
  var p = EVAD_PROFILES[_evadCurrentProfile];
  document.getElementById('evad-art-hdtitle').textContent = art.title;
  var icoEl = document.getElementById('evad-art-ico');
  icoEl.innerHTML = art.ico;
  icoEl.style.background = '#f0fdf4';
  document.getElementById('evad-art-title').textContent = art.title;
  document.getElementById('evad-art-sub').textContent = art.sub;
  document.getElementById('evad-art-body').innerHTML = evadFormatContent(art.content()) +
    evadBuildEngagement(art.id) + `
    <div class="art-quiz-wrap">
      <div class="art-quiz-label">🎯 Quiz EVA — Testez vos connaissances</div>
      <div class="art-quiz-title">5 questions sur ce sujet — les réponses sont générées par EVA</div>
      <div id="art-quiz-block"><div class="art-quiz-loading"><span></span><span></span><span></span> Chargement des questions…</div></div>
    </div>
    ` + evadChecklistHero(art.id) + `
    <div class="art-eva-footer">
      <div class="art-eva-footer-top">
        <div class="art-eva-footer-logo">
          <div class="art-eva-footer-logo-dots">
            <div class="art-eva-footer-logo-dot"></div>
            <div class="art-eva-footer-logo-dot"></div>
            <div class="art-eva-footer-logo-dot"></div>
          </div>
          <div>
            <div class="art-eva-footer-logo-name">EVA</div>
            <div class="art-eva-footer-logo-tag">CareerPulse</div>
          </div>
        </div>
        <div class="art-eva-footer-divider"></div>
        <div class="art-eva-footer-meta">
          <div class="art-eva-footer-meta-title">Assistante RH & Droit du travail</div>
          <div class="art-eva-footer-meta-sub">Données 2026 · Sources officielles vérifiées · Articles mis à jour régulièrement</div>
        </div>
      </div>
      <div class="art-share-label">Partager cet article</div>
      <div class="art-share-btns">
        <a class="art-share-btn art-share-btn-wa" href="#" onclick="(function(){var url=encodeURIComponent('https://careerpulse.fr');var txt=encodeURIComponent('💼 Découvre CareerPulse — la plateforme IA qui t\'aide à booster ta carrière, connaître tes droits et prendre les bonnes décisions pro. 👇');window.open('https://wa.me/?text='+txt+'%20'+url,'_blank');return false;})();return false;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.144 1.547 5.878L0 24l6.305-1.524A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 01-5.032-1.378l-.36-.214-3.742.905.952-3.641-.235-.374A9.845 9.845 0 012.118 12C2.118 6.53 6.53 2.118 12 2.118S21.882 6.53 21.882 12 17.47 21.882 12 21.882z"/></svg>
          WhatsApp
        </a>
        <a class="art-share-btn art-share-btn-tg" href="#" onclick="(function(){var url=encodeURIComponent('https://careerpulse.fr');var txt=encodeURIComponent('💼 CareerPulse — l\'IA qui t\'aide à booster ta carrière, connaître tes droits et prendre les bonnes décisions pro.');window.open('https://t.me/share/url?url='+url+'&text='+txt,'_blank');return false;})();return false;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 13.49l-2.95-.924c-.64-.204-.657-.64.136-.954l11.57-4.461c.537-.194 1.006.131.978.07z"/></svg>
          Telegram
        </a>
      </div>
    </div>
  `;

  // Barre de progression
  var pbWrap = document.getElementById('art-pb-wrap');
  if(pbWrap) {
    pbWrap.innerHTML = '<div class="art-progress-bar" id="art-pb-'+art.id+'"></div>';
  }

  // Init estimateur valeurs par défaut
  setTimeout(function(){ evadInitEstimator(art.id); }, 50);

  // Init progression + fait choc
  setTimeout(function(){ evadInitProgress(art.id); }, 100);

  // Générer quiz IA
  setTimeout(function(){ evadGenQuiz(art); }, 80);

  // Remonter en haut
  var scroll = document.getElementById('evad-art-scroll');
  if(scroll) scroll.scrollTop = 0;

  // Naviguer
  var screens = document.querySelectorAll('.evad-screen, .screen');
  screens.forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById('s-eva-droits-article');
  if(el){ el.classList.add('active'); }
}

function evadBackToList() {
  var screens = document.querySelectorAll('.evad-screen, .screen');
  screens.forEach(function(s){ s.classList.remove('active'); });
  var el = document.getElementById('s-eva-droits-list');
  if(el){ el.classList.add('active'); }
  var tnav=document.getElementById('tnav');
  var bnav=document.getElementById('bnav');
  if(tnav) tnav.style.display='none';
  if(bnav) bnav.style.display='none';
}

/* ══════════════════════════════════════════
   FORMAT CONTENU — emojis + mots clés bleus
══════════════════════════════════════════ */
var _artKeywords = [
  // Droits & contrats
  'CDI','CDD','rupture conventionnelle','licenciement','préavis','indemnité','indemnités',
  'contrat de travail','période d\'essai','clause de non-concurrence','heures supplémentaires',
  // Salaire & finance
  'salaire','rémunération','SMIC','prime','13ème mois','augmentation','négociation',
  // Formation & évolution
  'CPF','formation professionnelle','VAE','bilan de compétences','reconversion',
  'promotion','évolution professionnelle',
  // Chômage & social
  'ARE','allocation chômage','France Travail','Pôle emploi','indemnisation',
  // Santé & congés
  'congé maternité','congé paternité','arrêt maladie','accident du travail',
  'congés payés','RTT','télétravail',
  // Retraite
  'retraite','pension','trimestres','cumul emploi-retraite',
];

var _artEmojis = {
  // Sections h2 enrichissements
  'définition': '📖', 'conditions': '✅', 'démarches': '📋', 'délai': '⏱️',
  'calcul': '🧮', 'montant': '💶', 'durée': '📅', 'droits': '⚖️',
  'avantages': '✨', 'attention': '⚠️', 'conseil': '💡', 'exemple': '📌',
  'procédure': '🔄', 'document': '📄', 'employeur': '🏢', 'salarié': '👤',
  'rupture': '🔚', 'retraite': '🏖️', 'formation': '🎓', 'salaire': '💰',
  'maladie': '🏥', 'congé': '🌴', 'télétravail': '💻', 'syndicat': '🤝',
};

function evadFormatContent(html) {
  // 1. Surligher les mots clés importants en bleu gras (dans les .art-p seulement)
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Traiter les paragraphes de texte
  tempDiv.querySelectorAll('.art-p, .art-lead, .art-hl-p, .art-step-d').forEach(function(el){
    var text = el.innerHTML;
    _artKeywords.forEach(function(kw){
      var re = new RegExp('(?<![<a-zA-Z-])(' + kw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')(?![a-zA-Z>])', 'gi');
      text = text.replace(re, function(match){
        // Ne pas re-envelopper si déjà dans un tag
        return '<span class="art-kw">' + match + '</span>';
      });
    });
    el.innerHTML = text;
  });

  // 2. Ajouter emojis aux titres h2
  tempDiv.querySelectorAll('.art-h2').forEach(function(h){
    var txt = h.textContent.toLowerCase();
    var found = false;
    Object.keys(_artEmojis).forEach(function(k){
      if(!found && txt.includes(k)){
        // Ajouter l'emoji s'il n'y en a pas déjà
        if(!/[\u{1F300}-\u{1F9FF}]/u.test(h.textContent)){
          h.innerHTML = _artEmojis[k] + ' ' + h.innerHTML;
          found = true;
        }
      }
    });
  });

  return tempDiv.innerHTML;
}

/* ══════════════════════════════════════════
   QUIZ EVA — 100% interne, zéro API
   25 questions + 25 réponses par thème
   Tirage aléatoire, jamais les mêmes
══════════════════════════════════════════ */
var _evadQuizShown = {};

var QUIZ_BANK = {

  /* ─── banque générique (fallback) ─── */
  '_default': [
    {q:'Quel est le délai légal de réponse de l\'employeur en cas de demande écrite d\'un salarié ?',r:'L\'employeur n\'est soumis à <strong>aucun délai légal imposé</strong> pour répondre aux demandes écrites, sauf dispositions conventionnelles. Cependant, le silence prolongé peut être invoqué comme manquement à l\'obligation de bonne foi. Il est conseillé d\'envoyer votre demande en <strong>recommandé avec accusé de réception</strong> pour dater votre démarche.'},
    {q:'Qu\'est-ce que l\'obligation de sécurité de résultat pour l\'employeur ?',r:'L\'employeur a une <strong>obligation de sécurité de résultat</strong> : il doit prendre toutes les mesures nécessaires pour protéger la santé physique et mentale des salariés. Tout manquement engage sa responsabilité civile et pénale, même sans faute prouvée. Cela couvre le <strong>harcèlement, les RPS (risques psychosociaux), les accidents du travail</strong>.'},
    {q:'Un salarié peut-il refuser une tâche non prévue dans son contrat ?',r:'Oui, dans certains cas. Le salarié peut refuser une tâche <strong>hors de sa qualification professionnelle</strong>, dangereuse, ou constituant une modification unilatérale substantielle du contrat. En revanche, les tâches accessoires liées au poste relèvent du <strong>pouvoir de direction</strong> de l\'employeur et ne peuvent pas être refusées.'},
    {q:'Quelle est la différence entre une faute grave et une faute lourde ?',r:'La <strong>faute grave</strong> rend impossible le maintien du salarié dans l\'entreprise — elle supprime le préavis et l\'indemnité de licenciement. La <strong>faute lourde</strong> suppose une intention de nuire à l\'employeur — elle supprime en plus l\'indemnité compensatrice de congés payés. La faute lourde est très rare et difficile à prouver.'},
    {q:'Le télétravail est-il un droit ou une possibilité ?',r:'C\'est une <strong>possibilité encadrée</strong>, pas un droit absolu. Depuis la loi de 2017, le télétravail doit être prévu par accord collectif ou charte. En cas de circonstances exceptionnelles (pandémie, catastrophe naturelle), il peut être imposé par l\'employeur. Un salarié ne peut ni l\'exiger ni être sanctionné pour avoir demandé à en bénéficier si son poste le permet.'},
    {q:'Qu\'est-ce que le droit à la déconnexion ?',r:'Instauré par la <strong>loi El Khomri (2016)</strong>, ce droit permet au salarié de ne pas être joignable en dehors de ses heures de travail. Il doit être formalisé par accord d\'entreprise ou charte unilatérale. En pratique, l\'employeur ne peut pas sanctionner un salarié qui ne répond pas aux emails ou appels <strong>hors temps de travail</strong>.'},
    {q:'Combien de temps un employeur peut-il garder un salarié en CDD ?',r:'Un CDD ne peut pas dépasser <strong>18 mois au total</strong> (renouvellements compris), sauf exceptions : remplacement d\'un salarié absent (24 mois), contrat à l\'étranger (24 mois), emplois saisonniers. Au-delà, le contrat est requalifié en <strong>CDI</strong> par le juge, avec toutes les indemnités associées.'},
    {q:'Un salarié peut-il être licencié pendant un arrêt maladie ?',r:'Oui, <strong>sauf</strong> si l\'arrêt est dû à un <strong>accident du travail ou maladie professionnelle</strong> (protection absolue sauf faute grave ou impossibilité de maintenir le contrat). Pour un arrêt maladie ordinaire, le licenciement est possible pour motif économique ou si des absences répétées perturbent l\'entreprise. La procédure normale s\'applique.'},
    {q:'Quelles sont les obligations de l\'employeur en matière d\'entretien annuel ?',r:'L\'<strong>entretien annuel d\'évaluation</strong> n\'est pas obligatoire légalement (sauf accord de branche). En revanche, l\'<strong>entretien professionnel</strong> est obligatoire tous les <strong>2 ans</strong> depuis la loi 2014. Tous les 6 ans, un bilan récapitulatif doit confirmer au moins 2 des 3 éléments : formation suivie, augmentation ou promotion, certification obtenue.'},
    {q:'Qu\'est-ce que la modulation du temps de travail ?',r:'La modulation permet à l\'employeur de faire varier la durée hebdomadaire de travail <strong>sur une période de référence pouvant aller jusqu\'à 1 an</strong>. En cas de forte activité, des semaines à 48h compensent des semaines creuses. Seules les heures dépassant la durée annuelle (1 607h) constituent des <strong>heures supplémentaires</strong>. Elle doit être prévue par accord.'},
    {q:'Peut-on licencier un représentant du personnel ?',r:'Oui, mais avec une procédure spéciale. Le représentant du personnel bénéficie d\'une <strong>protection renforcée</strong> : l\'employeur doit obtenir l\'autorisation de l\'<strong>inspecteur du travail</strong> avant tout licenciement. Cette protection dure pendant le mandat et jusqu\'à <strong>12 mois</strong> après sa fin. Le non-respect entraîne la nullité du licenciement.'},
    {q:'Qu\'est-ce que le principe d\'égalité de traitement entre salariés ?',r:'L\'employeur ne peut pas traiter différemment des salariés placés dans une <strong>situation identique</strong> sans justification objective. Ce principe s\'applique au salaire (<strong>à travail égal, salaire égal</strong>), aux avantages, promotions et conditions de travail. Toute différence doit reposer sur des raisons objectives vérifiables, liées aux compétences, l\'ancienneté ou les responsabilités.'},
    {q:'Qu\'est-ce que la clause de mobilité ?',r:'La clause de mobilité permet à l\'employeur de muter un salarié dans un autre lieu de travail <strong>sans que cela constitue une modification du contrat</strong>. Elle doit être précise : définir la zone géographique couverte. Si la zone est trop large ou indéterminée, la clause est nulle. L\'employeur doit la mettre en œuvre de <strong>bonne foi</strong>, avec un délai de prévenance raisonnable.'},
    {q:'Quelle est la durée légale de conservation des bulletins de paie ?',r:'Le salarié doit conserver ses bulletins de paie <strong>sans limitation de durée</strong> depuis 2016. L\'employeur doit les conserver <strong>5 ans</strong>. Ils sont indispensables pour le calcul des droits à la retraite, les demandes d\'ARE et toute contestation salariale. Il est conseillé de les scanner et stocker sur un espace numérique sécurisé (coffre-fort numérique).'},
    {q:'Qu\'est-ce que le solde de tout compte ?',r:'Le solde de tout compte est un <strong>document remis par l\'employeur à la fin du contrat</strong>, récapitulant toutes les sommes versées (salaire, indemnités, congés payés). Le salarié a <strong>6 mois</strong> pour le contester par lettre recommandée. Passé ce délai, il devient libératoire pour l\'employeur. Il ne faut jamais le signer sous pression sans vérifier les montants.'},
    {q:'Un employeur peut-il baisser le salaire d\'un salarié ?',r:'Non, le salaire ne peut pas être baissé <strong>sans accord exprès du salarié</strong>. Toute réduction constitue une modification substantielle du contrat. Le salarié peut refuser — l\'employeur devra alors soit maintenir l\'ancien salaire, soit entamer une procédure de <strong>licenciement pour refus de modification</strong>. La réduction doit être justifiée (difficultés économiques prouvées).'},
    {q:'Quand peut-on invoquer la résiliation judiciaire du contrat de travail ?',r:'Le salarié peut saisir le <strong>Conseil de Prud\'hommes</strong> pour demander la résiliation judiciaire s\'il reproche à l\'employeur des manquements graves : non-paiement de salaire, harcèlement, modification unilatérale du contrat. Si le juge y fait droit, la résiliation produit les effets d\'un <strong>licenciement sans cause réelle et sérieuse</strong>, avec toutes les indemnités.'},
    {q:'Qu\'est-ce que la prise d\'acte de rupture du contrat ?',r:'La prise d\'acte permet au salarié de <strong>rompre immédiatement son contrat</strong> en imputant la faute à l\'employeur. Si le CPH confirme les manquements, elle produit les effets d\'un <strong>licenciement sans cause réelle et sérieuse</strong>. Si elle est infondée, elle équivaut à une démission sans indemnités. C\'est une décision risquée à prendre avec un avocat.'},
    {q:'Peut-on cumuler plusieurs emplois à temps partiel ?',r:'Oui, un salarié peut cumuler plusieurs CDD ou CDI à temps partiel. La limite : la durée totale ne doit pas dépasser <strong>10h/jour et 48h/semaine</strong>. Le salarié doit informer chaque employeur de son statut multi-employeurs. Certaines clauses d\'exclusivité peuvent interdire le cumul — elles sont valides sous conditions strictes.'},
    {q:'Qu\'est-ce que le forfait jours ?',r:'Le forfait jours permet à certains cadres de travailler selon un <strong>nombre de jours fixé par an</strong> (max 218 jours) sans référence aux 35h hebdomadaires. Il doit être prévu par accord collectif et acte individuel. L\'employeur doit assurer un <strong>suivi régulier de la charge de travail</strong>. En l\'absence de suivi, le forfait peut être annulé et des heures supplémentaires réclamées.'},
    {q:'Qu\'est-ce que la garantie de salaire (AGS) en cas de faillite ?',r:'L\'<strong>AGS (Association pour la Gestion du régime de garantie des Salaires)</strong> garantit le paiement des salaires en cas de liquidation judiciaire de l\'entreprise. Elle couvre les <strong>3 derniers mois de salaire</strong>, les indemnités de licenciement, de préavis et de congés payés. Le plafond est de <strong>82 272 € brut</strong> (2024). Toujours déclarer sa créance au mandataire judiciaire.'},
    {q:'Qu\'est-ce que le CSE (Comité Social et Économique) ?',r:'Le <strong>CSE</strong> est l\'instance représentative du personnel obligatoire dans les entreprises de <strong>11 salariés et plus</strong>. Il a remplacé les délégués du personnel, le CE et le CHSCT depuis 2020. Dans les entreprises de +50 salariés, il a des attributions élargies : consultation sur la stratégie, les effectifs, les conditions de travail, et gère les <strong>activités sociales et culturelles</strong>.'},
    {q:'Peut-on être licencié pour avoir refusé une formation ?',r:'En principe non, si la formation entraîne une <strong>modification du contrat ou des conditions de travail</strong> importantes (lieu, horaires, rémunération pendant). Mais si la formation est liée à l\'adaptation au poste ou à l\'évolution imposée par l\'emploi, le refus peut justifier un licenciement. Tout dépend de la nature et de l\'impact réel de la formation sur la vie du salarié.'},
    {q:'Qu\'est-ce que l\'entretien préalable au licenciement ?',r:'Avant tout licenciement, l\'employeur doit convoquer le salarié à un <strong>entretien préalable</strong> par courrier remis en main propre ou LRAR, avec un délai minimum de <strong>5 jours ouvrables</strong>. Le salarié peut se faire assister. À l\'issue, l\'employeur doit attendre au moins <strong>2 jours ouvrables</strong> avant d\'envoyer la lettre de licenciement. Le non-respect de ces délais rend le licenciement irrégulier.'},
    {q:'Qu\'est-ce que le droit d\'alerte économique du CSE ?',r:'Dans les entreprises de +50 salariés, le CSE peut déclencher une <strong>procédure d\'alerte</strong> s\'il détecte des faits préoccupants pour la situation économique (baisse brutale de commandes, endettement…). Il demande des explications à la direction, qui doit répondre dans <strong>1 mois</strong>. Si insatisfait, le CSE peut saisir le président du tribunal de commerce.'},
  ],

  /* ─── ARE / Chômage ─── */
  'are': [
    {q:'Combien de temps faut-il avoir travaillé pour toucher l\'ARE ?',r:'Il faut avoir travaillé au moins <strong>130 jours (910 heures)</strong> dans les 24 derniers mois (36 mois pour les 53 ans et plus). Ce sont les durées minimales. Plus vous avez travaillé, plus la durée d\'indemnisation sera longue — jusqu\'à <strong>24 mois</strong> (36 mois pour les 53 ans et plus).'},
    {q:'Combien touche-t-on avec l\'ARE ?',r:'L\'ARE est calculée sur le salaire journalier de référence (SJR). La formule retient le <strong>plus avantageux</strong> entre : 40,4% du SJR + 12,47 € OU 57% du SJR. Le montant minimum est <strong>31,97 €/jour</strong> (2024). Le montant ne peut dépasser 75% du SJR. En pratique, vous touchez environ <strong>57 à 72% de votre ancien salaire brut</strong>.'},
    {q:'Peut-on cumuler ARE et activité partielle ?',r:'Oui ! Le <strong>cumul ARE + activité reprise</strong> est possible. Si vous gagnez moins que votre ancien salaire en travaillant, France Travail verse une partie de vos allocations. Il faut déclarer chaque mois vos revenus d\'activité lors de l\'actualisation. Des jours d\'indemnisation sont déduits au prorata, mais la durée totale des droits est allongée d\'autant.'},
    {q:'La démission ouvre-t-elle droit à l\'ARE ?',r:'En principe <strong>non</strong>, sauf démission légitime : suivi du conjoint muté, non-paiement de salaire, harcèlement, création/reprise d\'entreprise. Depuis <strong>novembre 2019</strong>, la "démission pour reconversion" est possible après 5 ans d\'ancienneté et avec un projet validé par une commission régionale (CEP obligatoire). Dans ce cas, les droits s\'ouvrent après validation.'},
    {q:'Combien de temps dure l\'ARE ?',r:'La durée d\'indemnisation est <strong>égale à la durée de travail</strong> dans la limite de 24 mois (36 mois pour les 53+ ans). Ex : 12 mois travaillés = 12 mois d\'ARE. Le délai de carence est de 7 jours. Le différé spécifique lié aux indemnités de rupture peut repousser le versement de <strong>plusieurs semaines à plusieurs mois</strong> (plafonné à 150 jours en 2024).'},
    {q:'Qu\'est-ce que le différé d\'indemnisation ?',r:'Avant de toucher l\'ARE, deux délais s\'appliquent : le <strong>délai de carence fixe de 7 jours</strong> (toujours), puis un <strong>différé spécifique</strong> calculé sur les indemnités supra-légales de rupture (primes, indemnités au-delà du légal). Ce différé est calculé : indemnités supra-légales ÷ 97,7 €/jour. Il est plafonné à <strong>150 jours calendaires</strong>.'},
    {q:'Comment actualiser sa situation à France Travail chaque mois ?',r:'L\'actualisation mensuelle est obligatoire, entre le <strong>28 du mois et le 15 du mois suivant</strong>. Elle se fait sur le site France Travail ou l\'application. Vous déclarez : si vous avez travaillé, vos revenus d\'activité, si vous êtes toujours en recherche d\'emploi. Sans actualisation = <strong>suspension des allocations</strong>. En cas d\'oubli, contactez France Travail rapidement.'},
    {q:'Peut-on percevoir l\'ARE à l\'étranger ?',r:'Oui, sous conditions. Vous pouvez exporter vos droits dans un pays de l\'<strong>Espace Économique Européen (EEE)</strong> pendant 3 mois (extensibles à 6 mois). Hors EEE, les allocations sont suspendues. Vous devez vous inscrire auprès du service de l\'emploi local et continuer votre recherche d\'emploi active. Prévenez France Travail <strong>avant votre départ</strong>.'},
    {q:'Que se passe-t-il si on retrouve un emploi pendant l\'ARE ?',r:'Vous devez déclarer la reprise d\'activité à France Travail. Si le nouveau salaire est inférieur à l\'ancien, vous pouvez bénéficier du <strong>cumul ARE + salaire</strong> (dispositif de reprise partielle). Le reliquat de droits non utilisés est conservé pendant <strong>3 ans</strong> et peut être réactivé en cas de nouveau chômage, sous conditions.'},
    {q:'L\'ARE est-elle imposable ?',r:'Oui, les allocations chômage ARE sont <strong>soumises à l\'impôt sur le revenu</strong>. Elles sont prélevées à la source depuis 2019. France Travail verse directement les allocations nettes après prélèvement. Elles apparaissent dans votre déclaration de revenus. Attention : la <strong>CSG (6,2%) et la CRDS (0,5%)</strong> sont également prélevées, sauf si vos revenus sont modestes (taux réduit ou exonération).'},
    {q:'Quelles cotisations retraite pendant le chômage ?',r:'Pendant l\'ARE, des <strong>trimestres de retraite sont validés</strong> : 1 trimestre tous les 50 jours d\'indemnisation (jusqu\'à 4 trimestres/an). Cela permet de ne pas perdre ses droits retraite pendant la période de chômage. Ces trimestres sont pris en compte par l\'Assurance retraite mais sans cotisation à la retraite complémentaire (Agirc-Arrco), sauf droits spécifiques.'},
    {q:'Peut-on cumuler ARE et retraite ?',r:'Non, en principe vous devez choisir. Dès que vous liquidez votre retraite, les droits ARE s\'éteignent. Cependant, le <strong>cumul emploi-retraite</strong> est possible si vous travaillez. Une exception : si vous avez atteint l\'âge légal mais pas le taux plein, France Travail peut maintenir l\'ARE jusqu\'à ce que vous atteigniez le taux plein, sous conditions.'},
    {q:'Qu\'est-ce que l\'APLD (chômage partiel de longue durée) ?',r:'L\'APLD permet à une entreprise en difficulté de réduire l\'activité de ses salariés jusqu\'à <strong>40% du temps de travail</strong>, avec une indemnisation de l\'État. Le salarié perçoit <strong>70% de son salaire brut</strong> (minimum SMIC net). L\'accord doit être conclu avec les organisations syndicales. Elle peut durer jusqu\'à <strong>24 mois sur 3 ans</strong>.'},
    {q:'Comment calculer le montant de ses indemnités chômage ?',r:'Calcul en 3 étapes : 1️⃣ <strong>SJR</strong> = (salaires bruts des 24 derniers mois) ÷ (nombre de jours travaillés × 1,4). 2️⃣ Appliquer la formule : max(40,4% × SJR + 12,47€ ; 57% × SJR). 3️⃣ Vérifier le plancher (31,97 €/j) et le plafond (75% du SJR). France Travail met à disposition un <strong>simulateur officiel</strong> sur son site.'},
    {q:'Qu\'est-ce que le rechargement des droits ?',r:'Si vous retrouvez un emploi et retombez au chômage, vous pouvez <strong>recharger vos droits</strong> à condition d\'avoir travaillé au moins <strong>130 jours (910h)</strong> depuis la dernière ouverture de droits. France Travail calcule alors si vos nouveaux droits sont supérieurs au reliquat. Le mécanisme le plus favorable vous est appliqué automatiquement.'},
    {q:'Qu\'est-ce que l\'indemnisation en cas de rupture conventionnelle ?',r:'La rupture conventionnelle ouvre droit à l\'ARE comme un licenciement. Le calcul est identique. La seule différence : un <strong>différé spécifique</strong> peut s\'appliquer si l\'indemnité de rupture dépasse l\'indemnité légale de licenciement. Ce différé est plafonné à <strong>150 jours</strong>. L\'indemnité de rupture conventionnelle est exonérée de cotisations jusqu\'au plafond légal.'},
    {q:'France Travail peut-il radier un demandeur d\'emploi ?',r:'Oui. La radiation peut survenir en cas de : refus de <strong>deux offres raisonnables d\'emploi</strong> (ORE), absence à une convocation sans motif, fausse déclaration, refus de suivre une formation prescrite. La durée de radiation varie de <strong>15 jours à 12 mois</strong>. La décision est notifiée et contestable devant le directeur de France Travail puis le tribunal administratif.'},
    {q:'Qu\'est-ce qu\'une offre raisonnable d\'emploi (ORE) ?',r:'L\'ORE est définie dans le <strong>PPAE (Projet Personnalisé d\'Accès à l\'Emploi)</strong> établi avec le conseiller France Travail. Elle tient compte du poste recherché, des qualifications, de la rémunération souhaitée (qui peut baisser progressivement) et de la zone géographique. Le refus de 2 ORE successives peut entraîner une <strong>radiation temporaire</strong>.'},
    {q:'Peut-on percevoir l\'ARE en étant en arrêt maladie ?',r:'Oui, l\'arrêt maladie <strong>suspend</strong> le versement des allocations ARE mais <strong>ne les supprime pas</strong>. La CPAM verse des <strong>indemnités journalières maladie</strong> à la place. À la reprise, France Travail reprend le versement de l\'ARE pour la durée restante. L\'arrêt maladie prolonge donc la durée totale de vos droits.'},
    {q:'Quel est le délai pour s\'inscrire à France Travail après une rupture ?',r:'Il n\'y a <strong>pas de délai légal imposé</strong> pour s\'inscrire. Cependant, il est conseillé de s\'inscrire <strong>dans les 12 mois</strong> suivant la fin du contrat car les droits s\'ouvrent à la date d\'inscription, pas à la date de rupture. Plus vous tardez, plus vous perdez des jours d\'indemnisation potentiels. L\'inscription se fait en ligne sur francetravail.fr.'},
    {q:'Peut-on cumuler ARE et pension d\'invalidité ?',r:'Oui, sous conditions. Le cumul ARE + pension d\'invalidité de <strong>catégorie 1</strong> (personne pouvant travailler à mi-temps) est possible. En revanche, la pension de catégorie 2 ou 3 (incapacité totale) est incompatible avec l\'ARE. Le montant total (ARE + pension) ne peut dépasser le salaire antérieur. Déclarez votre pension à France Travail.'},
    {q:'Qu\'est-ce que le capital de droits ?',r:'Le capital de droits représente le <strong>nombre total de jours d\'ARE</strong> auxquels vous avez droit. Il est calculé dès l\'ouverture de droits et s\'épuise au fur et à mesure des versements. En cas de reprise d\'emploi, le capital non consommé est conservé. Il ne peut être utilisé que pendant une durée maximale de <strong>3 ans</strong> (déchéance quadriennale après).'},
    {q:'Qu\'est-ce que l\'ATA (Allocation Temporaire d\'Attente) ?',r:'L\'ATA a été supprimée en 2017. Elle était versée aux personnes en attente d\'une décision sur leur statut (demandeurs d\'asile, rapatriés…). Elle a été remplacée partiellement par l\'<strong>ADA (Allocation pour Demandeur d\'Asile)</strong> gérée par l\'OFII. Pour les personnes ne relevant pas du chômage classique, le RSA (via la CAF) reste la principale aide.'},
    {q:'Peut-on toucher l\'ARE après une rupture pendant la période d\'essai ?',r:'Oui, si la rupture de la période d\'essai est à l\'initiative de l\'<strong>employeur</strong> et que les conditions de durée sont remplies (130 jours sur 24 mois). Si c\'est le salarié qui rompt la période d\'essai, c\'est assimilé à une démission — pas de droits sauf démission légitime. La durée travaillée est prise en compte pour le calcul du montant.'},
    {q:'Qu\'est-ce que le dispositif "Transitions collectives" ?',r:'Ce dispositif permet aux salariés occupant un emploi menacé de suivre une <strong>formation longue vers un métier porteur</strong>, pendant leur période de chômage partiel. L\'entreprise identifie les postes fragilisés, les salariés volontaires s\'inscrivent en formation (prise en charge à 100%). Objectif : anticiper les mutations économiques <strong>sans licenciement</strong>.'},
  ],

  /* ─── Rupture conventionnelle ─── */
  'rupture-conventionnelle': [
    {q:'Quel est le montant minimum de l\'indemnité de rupture conventionnelle ?',r:'L\'indemnité spécifique de rupture conventionnelle ne peut pas être inférieure à l\'<strong>indemnité légale de licenciement</strong> : 1/4 de mois de salaire par année d\'ancienneté pour les 10 premières années, puis 1/3 au-delà. Exemple : 5 ans d\'ancienneté × 1/4 de salaire mensuel brut = 1,25 mois de salaire minimum. Elle peut être supérieure par accord entre les parties.'},
    {q:'Quel est le délai de rétractation après signature d\'une rupture conventionnelle ?',r:'Les deux parties disposent d\'un <strong>délai de rétractation de 15 jours calendaires</strong> à compter du lendemain de la signature. La rétractation doit être faite par <strong>lettre recommandée avec accusé de réception</strong> ou remise en main propre contre décharge. Passé ce délai, la convention est transmise à la DREETS pour homologation (15 jours supplémentaires).'},
    {q:'La rupture conventionnelle est-elle possible pendant un arrêt maladie ?',r:'Oui, mais avec vigilance. La jurisprudence admet la rupture conventionnelle pendant un arrêt maladie ordinaire si le consentement du salarié est libre et éclairé. En revanche, elle est <strong>interdite pendant un arrêt AT/MP</strong> (accident du travail ou maladie professionnelle). Le contexte de pression ou harcèlement peut entraîner la nullité.'},
    {q:'L\'employeur peut-il refuser une rupture conventionnelle ?',r:'Oui, l\'employeur peut tout à fait refuser. La rupture conventionnelle repose sur le <strong>consentement mutuel</strong> des deux parties — aucune n\'est obligée d\'accepter. Si l\'employeur refuse, le salarié ne peut pas forcer la procédure. Il devra soit négocier, soit envisager une démission, soit attendre un licenciement si les conditions l\'y conduisent.'},
    {q:'La rupture conventionnelle est-elle possible en cas de litige ?',r:'Légalement oui, mais la Cour de cassation est vigilante. Si la rupture intervient dans un contexte de <strong>conflit ou de pression</strong> (harcèlement, procédure disciplinaire en cours, litige prud\'homal), le juge peut l\'annuler pour vice du consentement. Il est recommandé d\'attendre la résolution du litige ou de faire constater la bonne foi des deux parties par écrit.'},
    {q:'Quand l\'homologation est-elle accordée par la DREETS ?',r:'La DREETS (ex-DIRECCTE) dispose de <strong>15 jours ouvrables</strong> à compter de la réception du dossier pour homologuer ou refuser. En l\'absence de réponse dans ce délai, l\'homologation est réputée <strong>accordée tacitement</strong>. Les motifs de refus : délai de rétractation non respecté, consentement vicié, indemnité insuffisante, absence de l\'entretien.'},
    {q:'L\'indemnité de rupture conventionnelle est-elle imposable ?',r:'L\'indemnité est <strong>exonérée d\'impôt sur le revenu</strong> dans la limite du montant le plus élevé entre : l\'indemnité légale de licenciement OU 2 fois la rémunération annuelle brute OU 50% du montant de l\'indemnité (plafond : 6 fois le PASS = environ 278 208 € en 2024). La partie excédant ces plafonds est imposable et soumise aux cotisations sociales.'},
    {q:'Peut-on faire une rupture conventionnelle avec un salarié protégé ?',r:'Oui, mais la procédure est différente. Pour un représentant du personnel ou délégué syndical, la rupture conventionnelle doit être <strong>autorisée par l\'inspecteur du travail</strong> (pas simple homologation DREETS). L\'inspecteur vérifie notamment l\'absence de lien avec le mandat représentatif. Le délai d\'instruction est plus long.'},
    {q:'Combien d\'entretiens sont obligatoires pour une rupture conventionnelle ?',r:'La loi prévoit <strong>au moins un entretien</strong> entre les parties. En pratique, il est recommandé d\'en tenir deux pour documenter le processus. Le salarié peut se faire assister par un représentant du personnel ou un conseiller extérieur (si pas de représentant dans l\'entreprise). L\'employeur peut aussi être assisté. L\'assistance doit être mentionnée dans la convention.'},
    {q:'La rupture conventionnelle affecte-t-elle le calcul de l\'ARE ?',r:'Non, le calcul de l\'ARE est <strong>identique à un licenciement</strong>. Le seul impact : un <strong>différé spécifique d\'indemnisation</strong> peut s\'appliquer si l\'indemnité perçue dépasse l\'indemnité légale. Ce différé = (indemnités supra-légales) ÷ 97,7 €, plafonné à <strong>150 jours</strong>. Les droits à l\'ARE restent ouverts dès l\'homologation.'},
    {q:'Peut-on négocier une rupture conventionnelle collective ?',r:'Oui, la <strong>RCC (Rupture Conventionnelle Collective)</strong> depuis la loi Avenir 2018 permet des départs volontaires collectifs sans PSE (Plan de Sauvegarde de l\'Emploi). Elle doit être négociée avec les syndicats ou le CSE, homologuée par la DREETS. Elle offre plus de souplesse que le PSE mais ne peut pas se substituer à lui en cas de licenciements contraints.'},
    {q:'Quel est le délai entre la signature et la date de rupture effective ?',r:'Après la signature, le délai de rétractation de <strong>15 jours calendaires</strong> doit s\'écouler. Puis la DREETS dispose de <strong>15 jours ouvrables</strong> pour homologuer. La rupture effective peut intervenir <strong>le lendemain de l\'homologation</strong>. En pratique, comptez au minimum <strong>1 à 2 mois</strong> entre la signature et la fin du contrat.'},
    {q:'Un salarié en période d\'essai peut-il bénéficier d\'une rupture conventionnelle ?',r:'Non, la rupture conventionnelle est <strong>impossible pendant la période d\'essai</strong>. Elle est réservée aux contrats CDI en cours d\'exécution normale. Pendant la période d\'essai, les deux parties peuvent rompre librement et simplement, avec un délai de prévenance. Après confirmation, le CDI peut faire l\'objet d\'une rupture conventionnelle.'},
    {q:'Peut-on réintégrer l\'entreprise après une rupture conventionnelle ?',r:'Oui, il n\'existe <strong>aucune interdiction légale</strong> de réembauche après une rupture conventionnelle. L\'employeur peut recruter l\'ancien salarié immédiatement, en CDI, CDD ou mission. Cependant, si la rupture est jugée fictive (rupture + réembauche immédiate organisée frauduleusement), l\'administration peut la requalifier et réclamer les cotisations éludées.'},
    {q:'Qu\'est-ce que le formulaire CERFA de rupture conventionnelle ?',r:'La convention doit être établie sur le <strong>formulaire CERFA n°14598*02</strong> (téléchargeable sur le site du ministère du Travail). Il formalise : identité des parties, date des entretiens, montant de l\'indemnité, date envisagée de rupture, assistance éventuelle. Un exemplaire est remis à chaque partie. C\'est ce formulaire qui est transmis à la DREETS pour homologation.'},
    {q:'La rupture conventionnelle génère-t-elle un préavis ?',r:'Non, <strong>aucun préavis</strong> n\'est imposé dans le cadre d\'une rupture conventionnelle. La date de rupture effective est librement fixée par les parties, sous réserve qu\'elle ne soit pas antérieure au lendemain de l\'homologation. Les parties peuvent néanmoins convenir d\'un délai supplémentaire si elles le souhaitent.'},
    {q:'Qu\'est-ce que la requalification d\'une rupture conventionnelle en licenciement ?',r:'Le Conseil de Prud\'hommes peut requalifier la rupture en <strong>licenciement sans cause réelle et sérieuse</strong> si le consentement est vicié (pression, harcèlement), l\'indemnité insuffisante, ou la procédure non respectée. La requalification ouvre droit à des <strong>indemnités supérieures</strong> et des dommages-intérêts. Le délai de prescription est de 12 mois après l\'homologation.'},
    {q:'Y a-t-il une différence entre rupture conventionnelle et accord transactionnel ?',r:'Oui. La <strong>rupture conventionnelle</strong> est une procédure légale encadrée (homologation DREETS, délai de rétractation). La <strong>transaction</strong> est un accord amiable signé après la rupture du contrat (licenciement, démission), pour éviter un procès. On ne peut pas conclure une transaction sur les mêmes objets que la rupture conventionnelle. Les deux peuvent coexister.'},
    {q:'Un salarié peut-il prendre ses congés payés avant la rupture conventionnelle ?',r:'Oui, les parties peuvent convenir que le salarié prend ses congés payés restants avant la date de rupture effective. Dans ce cas, les congés payés sont pris et non indemnisés dans le solde de tout compte. Alternativement, ils sont indemnisés lors du solde de tout compte en <strong>indemnité compensatrice de congés payés</strong>, calculée sur 1/10ème de la rémunération.'},
    {q:'La rupture conventionnelle est-elle valable pour un CDD ?',r:'Non, la rupture conventionnelle est <strong>réservée aux contrats à durée indéterminée (CDI)</strong>. Pour un CDD, la rupture anticipée d\'un commun accord est possible mais ne suit pas la même procédure. Elle n\'ouvre pas de droits à l\'ARE sauf si les conditions d\'ouverture de droits sur d\'autres périodes sont remplies.'},
    {q:'Que faire si l\'employeur refuse de remettre le formulaire CERFA ?',r:'Si l\'employeur refuse de formaliser la rupture conventionnelle malgré un accord verbal, le salarié peut mettre en demeure l\'employeur par <strong>lettre recommandée</strong>. En cas de blocage persistant, le salarié peut saisir le <strong>Conseil de Prud\'hommes</strong> pour faire constater le manquement ou explorer d\'autres voies de rupture (démission pour manquement, prise d\'acte).'},
    {q:'Quelles sont les conditions pour bénéficier d\'une exonération de cotisations ?',r:'L\'indemnité de rupture conventionnelle est exonérée de cotisations sociales dans la limite du plus élevé de : 2 × rémunération annuelle brute N-1 OU l\'indemnité légale de licenciement. <strong>Au-delà du PASS (46 368 €)</strong>, même si dans les plafonds d\'exonération fiscale, des cotisations CSG/CRDS peuvent s\'appliquer. Le calcul exact dépend de la situation individuelle.'},
    {q:'Le médecin du travail doit-il être consulté pour une rupture conventionnelle ?',r:'Non, la <strong>consultation du médecin du travail n\'est pas obligatoire</strong> pour une rupture conventionnelle standard. Cependant, si le salarié est reconnu <strong>travailleur handicapé (RQTH)</strong>, la DREETS vérifiera que les droits sont préservés. En cas de salarié déclaré inapte par le médecin du travail, la rupture conventionnelle est interdite — seul le licenciement pour inaptitude est possible.'},
    {q:'Peut-on inclure une clause de confidentialité dans une rupture conventionnelle ?',r:'Oui, les parties peuvent inclure une <strong>clause de confidentialité</strong> sur les termes financiers de la rupture (montant de l\'indemnité). En revanche, une clause qui interdirait au salarié de parler de sa situation à France Travail ou aux CPH serait nulle car contraire à ses droits fondamentaux. La clause doit être réciproque pour être valide.'},
    {q:'Qu\'est-ce que l\'homologation tacite ?',r:'Si la DREETS ne répond pas dans les <strong>15 jours ouvrables</strong> suivant la réception du dossier complet, l\'homologation est réputée accordée — c\'est l\'<strong>homologation tacite</strong>. Dans ce cas, la rupture peut prendre effet le lendemain de l\'expiration du délai. Il est conseillé de conserver la preuve de dépôt du dossier (récépissé de transmission en ligne ou accusé de réception postal).'},
  ],

  /* ─── CPF / Formation ─── */
  'cpf': [
    {q:'Comment consulter son solde CPF ?',r:'Le solde CPF est consultable sur le site <strong>moncompteformation.gouv.fr</strong> ou l\'application Mon Compte Formation. Connectez-vous avec France Connect (vos identifiants Ameli, impots.gouv ou FranceConnect). Vous verrez vos droits en euros, les formations éligibles, et pourrez initier une demande directement en ligne.'},
    {q:'Combien d\'euros le CPF alimente-t-il chaque année ?',r:'Pour un salarié à temps plein : <strong>500 € par an</strong>, avec un plafond de <strong>5 000 €</strong>. Pour les non-qualifiés (sans diplôme de niveau CAP ou sans qualification reconnue) : <strong>800 €/an</strong>, plafond à <strong>8 000 €</strong>. Les droits sont crédités chaque année en début d\'année suivant la période d\'emploi.'},
    {q:'Peut-on utiliser le CPF sans accord de l\'employeur ?',r:'Oui, pour une formation <strong>hors temps de travail</strong> : l\'employeur n\'a pas son mot à dire. Pour une formation <strong>pendant le temps de travail</strong> : son accord est nécessaire (demande à faire 60 jours avant pour une formation < 6 mois, 120 jours pour une formation plus longue). En cas de refus, il doit motiver sa décision.'},
    {q:'Qu\'est-ce que le CPF de transition professionnelle (ex-CIF) ?',r:'Le <strong>CPF de transition (CPFT)</strong> finance une formation longue pour changer de métier, pendant le temps de travail avec maintien de salaire. Il faut : 24 mois d\'ancienneté (dont 12 dans l\'entreprise actuelle), un projet validé par la commission paritaire interprofessionnelle (CPIR). Le financement est assuré par les <strong>AT-PRO (associations Transitions Pro)</strong>.'},
    {q:'Quelles formations ne sont pas éligibles au CPF ?',r:'Ne sont pas éligibles : les formations non certifiantes (sensibilisation, team building, cours de langue non certifiants), les formations non inscrites sur <strong>Mon Compte Formation</strong>, les bilans de compétences non réalisés par un organisme certifié Qualiopi, et les coachings purement personnels. Seules les formations débouchant sur une certification reconnue (RNCP, RS) sont éligibles.'},
    {q:'Le CPF est-il transférable si on change d\'employeur ?',r:'Oui, c\'est l\'un des avantages majeurs du CPF. Les droits sont <strong>attachés à la personne et non à l\'employeur</strong>. Ils vous suivent tout au long de votre carrière, quel que soit l\'employeur, le type de contrat, et même pendant les périodes de chômage (les droits continuent à être alimentés via France Travail dans certains cas).'},
    {q:'Peut-on utiliser le CPF pour passer le permis de conduire ?',r:'Oui, depuis 2020, le permis B est éligible au CPF <strong>si la formation est liée à la mobilité professionnelle</strong>. Le permis doit être suivi dans une auto-école référencée sur Mon Compte Formation. Le CPF peut couvrir tout ou partie du coût. En pratique, les droits sont souvent insuffisants pour couvrir le coût total (~1 500 à 2 500 €).'},
    {q:'Qu\'est-ce que le reste à charge CPF depuis 2023 ?',r:'Depuis le <strong>2 mai 2024</strong>, un reste à charge de <strong>100 €</strong> est exigé de la part du salarié pour toute formation CPF (décret n°2024-394). Exceptions : demandeurs d\'emploi, CPF de transition, formations prescrites par France Travail ou l\'employeur dans le cadre d\'un accord. Ce reste à charge ne s\'applique pas aux abondements employeur.'},
    {q:'Comment utiliser le CPF pour un bilan de compétences ?',r:'Le bilan de compétences est éligible au CPF. Il dure <strong>maximum 24 heures</strong> sur plusieurs semaines. Pour l\'utiliser sur le temps de travail, l\'accord de l\'employeur est nécessaire. Pour hors temps de travail, aucun accord requis. Choisissez un prestataire certifié <strong>Qualiopi</strong>. Le coût moyen est de 1 500 à 3 000 €.'},
    {q:'Peut-on cumuler CPF et autres financements ?',r:'Oui, le CPF peut être <strong>abondé</strong> par plusieurs financeurs : l\'OPCO (Opérateur de Compétences) si l\'entreprise cotise, France Travail pour les demandeurs d\'emploi, la Région via des dispositifs locaux, l\'employeur (abondement volontaire ou prévu par accord). Ces abondements s\'ajoutent à vos droits CPF sans les consommer.'},
    {q:'Les droits CPF sont-ils perdus si on ne les utilise pas ?',r:'Les droits acquis <strong>ne sont jamais perdus</strong> (sauf en cas de départ en retraite — les droits sont soldés). Ils s\'accumulent jusqu\'au plafond (5 000 ou 8 000 €). Attention : si vous partez en retraite, vous perdez vos droits non utilisés. Pensez à les utiliser avant ou à demander leur mobilisation dans le cadre d\'une VAE.'},
    {q:'Comment fonctionne la VAE avec le CPF ?',r:'La VAE (Validation des Acquis de l\'Expérience) est éligible au CPF. Elle permet d\'obtenir un diplôme ou certification en faisant valider son expérience professionnelle. Le CPF finance : l\'accompagnement VAE, les frais de jury, les formations complémentaires. Durée minimum : <strong>1 an d\'expérience</strong> dans le domaine visé.'},
    {q:'Qu\'est-ce que l\'abondement employeur du CPF ?',r:'L\'employeur peut <strong>abonder le CPF</strong> du salarié en y versant des fonds supplémentaires, au-delà des droits acquis normalement. Cela peut être prévu par accord collectif ou décision unilatérale. Les abondements employeur sont exonérés de cotisations dans certaines limites. C\'est un outil de fidélisation et d\'accompagnement des projets de formation.'},
    {q:'Peut-on contester le refus d\'utiliser son CPF par l\'employeur ?',r:'Si l\'employeur refuse la formation sur temps de travail, il doit répondre par écrit sous <strong>30 jours</strong> (60 jours si la demande concerne une formation longue). Si le refus est injustifié ou répété, le salarié peut saisir le <strong>Conseil de Prud\'hommes</strong>. Deux refus successifs sans motif permettent au salarié de financer la formation hors temps de travail avec maintien du CPF.'},
    {q:'Que se passe-t-il si on est licencié en cours de formation CPF ?',r:'La formation CPF en cours peut être <strong>poursuivie</strong> même en cas de licenciement. Si la formation est sur le temps de travail, le licenciement ne l\'interrompt pas. Le financement reste acquis. En revanche, si la formation est liée à un congé formation, les modalités de maintien de salaire ou indemnisation dépendent du type de licenciement.'},
    {q:'Comment valider une formation CPF sur Mon Compte Formation ?',r:'Après avoir sélectionné et payé votre formation, vous recevez un <strong>code de connexion de 7 chiffres</strong> à donner à votre organisme de formation le premier jour. Ce code valide votre présence et déclenche le paiement. À la fin, vous devez confirmer votre satisfaction sur la plateforme. Sans validation, le paiement peut être bloqué.'},
    {q:'Qu\'est-ce que la certification Qualiopi ?',r:'<strong>Qualiopi</strong> est la certification qualité obligatoire depuis 2022 pour tous les organismes de formation souhaitant bénéficier de fonds publics ou mutualisés (CPF, OPCO, État, Région). Elle garantit la qualité des processus pédagogiques. Avant de choisir une formation CPF, vérifiez que l\'organisme est certifié Qualiopi sur le registre officiel datadock.fr.'},
    {q:'Peut-on utiliser le CPF pour une formation en ligne (e-learning) ?',r:'Oui, les formations en ligne sont éligibles au CPF à condition qu\'elles soient <strong>inscrites sur Mon Compte Formation</strong> et proposées par un organisme certifié Qualiopi. De nombreuses plateformes (OpenClassrooms, CNED, universités en ligne) proposent des formations certifiantes éligibles. Vérifiez que la formation débouche sur une certification reconnue (RNCP ou RS).'},
    {q:'Le CPF peut-il financer une formation pour créer son entreprise ?',r:'Oui, certaines formations à la création d\'entreprise sont éligibles au CPF si elles débouchent sur une certification reconnue (ex : titre de Gestionnaire de PME). La <strong>POEI (Préparation Opérationnelle à l\'Emploi Individuelle)</strong> via France Travail peut compléter le financement. Le CPF ne finance pas le simple accompagnement à la création sans certification.'},
    {q:'Qu\'est-ce que le projet de transition professionnelle (PTP) ?',r:'Le PTP permet de suivre une formation certifiante longue pour changer de métier, sur le temps de travail, avec maintien de salaire (total ou partiel selon les revenus). Il est financé via le <strong>CPF de transition</strong> et géré par les commissions Transitions Pro régionales. Il faut 24 mois d\'expérience professionnelle. La demande doit être déposée <strong>60 à 120 jours avant</strong> le début de la formation.'},
    {q:'Comment les heures CPF acquises avant 2019 sont-elles converties ?',r:'Avant 2019, le CPF était calculé en <strong>heures</strong>. Depuis le 1er janvier 2019, les droits ont été convertis en euros : <strong>1 heure = 15 €</strong> (dans la limite des plafonds). La conversion a été automatique. Si vous aviez 150 heures, vous avez obtenu 2 250 €. Cette conversion est visible sur Mon Compte Formation.'},
    {q:'Peut-on utiliser le CPF pour des formations courtes ?',r:'Oui, il n\'y a pas de durée minimale imposée pour les formations CPF. Des formations courtes (quelques heures à quelques jours) sont éligibles si elles débouchent sur une <strong>certification inscrite au RNCP ou RS</strong>. Exemples : certification TOSA (bureautique), PIX (numérique), SST (Sauveteur Secouriste du Travail), certifications de langues (TOEIC, DELF).'},
    {q:'Que se passe-t-il si la formation CPF coûte plus que mes droits ?',r:'Vous pouvez <strong>compléter par un abondement</strong> : de l\'employeur, de la Région, de l\'OPCO, ou de votre propre poche. Sur Mon Compte Formation, le paiement personnel par carte bancaire est possible pour compléter la différence. Des organismes proposent aussi des prix négociés ou des formations spécifiquement dimensionnées pour les droits CPF disponibles.'},
    {q:'Les intérimaires ont-ils droit au CPF ?',r:'Oui, les travailleurs intérimaires cumulent des droits CPF comme tout salarié : <strong>500 €/an</strong> dans la limite de 5 000 €. En complément, le <strong>FASTT (Fonds d\'Action Sociale du Travail Temporaire)</strong> propose des aides à la formation et à la qualification. Les intérimaires peuvent aussi bénéficier de l\'accompagnement des agences d\'intérim pour identifier les formations éligibles.'},
  ]
};

// Alias pour couvrir les variantes d\'ID
QUIZ_BANK['rupture'] = QUIZ_BANK['rupture-conventionnelle'];
QUIZ_BANK['chomage'] = QUIZ_BANK['are'];
QUIZ_BANK['formation'] = QUIZ_BANK['cpf'];

/* ══════════════════════════════════════════
   MOTEUR DE GÉNÉRATION DE RÉPONSE — zéro API
   Chaque réponse = fragments combinés au hasard
   → intro + core + extra + lien + tip + outro
   → jamais la même formulation deux fois
══════════════════════════════════════════ */

var _qIntros = [
  '📌 <strong>EVA répond :</strong> ','💡 <strong>Ce qu\'il faut savoir :</strong> ',
  '⚡ <strong>L\'essentiel :</strong> ','🎯 <strong>Réponse précise :</strong> ',
  '✅ <strong>EVA vous éclaire :</strong> ','📋 <strong>Point clé :</strong> ',
  '🔎 <strong>EVA analyse :</strong> ','💼 <strong>En droit du travail :</strong> ',
];
var _qLinks = [
  'À noter : ','Il faut savoir que ','Concrètement, ','En pratique, ',
  'Important : ','Attention : ','Rappel : ','En résumé, ',
  'La règle est claire : ','Juridiquement parlant, ',
];
var _qOutros = [
  '💬 <em>Un doute ? Parlez-en à EVA dans le chat.</em>',
  '📞 <em>En cas de litige, consultez un avocat spécialisé en droit du travail.</em>',
  '✍️ <em>Conservez toujours vos documents par écrit (recommandé avec AR).</em>',
  '🔐 <em>Vos droits sont protégés — faites-les valoir !</em>',
  '📅 <em>Vérifiez les délais : ils sont souvent courts et impératifs.</em>',
  '⚖️ <em>En cas de désaccord, le Conseil de Prud\'hommes reste votre recours.</em>',
  '💡 <em>Renseignez-vous aussi auprès de votre syndicat ou représentant du personnel.</em>',
  '🗂️ <em>Gardez une trace écrite de toutes vos démarches.</em>',
];
function _rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* Fragments de réponse indexés par artId + index dans QUIZ_BANK
   Structure : { core:[], extra:[], tip:[] }
   core = le fait principal (obligatoire)
   extra = précision complémentaire (aléatoire)
   tip = conseil pratique (aléatoire)
   → combinés différemment à chaque appui bouton */
var _QF = {};

/* Helper pour créer un fragment */
function _qf(core, extra, tip){ return {core:core, extra:extra||[], tip:tip||[]}; }

/* ── GÉNÉRIQUE (_default) ── */
_QF['_default'] = [
  _qf(['L\'employeur n\'est soumis à <strong>aucun délai légal imposé</strong> pour répondre aux demandes écrites salariales.','La loi n\'impose pas de délai de réponse patronal, sauf dispositions conventionnelles spécifiques.'],['Le silence prolongé peut être invoqué comme manquement à l\'obligation de bonne foi contractuelle.','Envoyer la demande en recommandé avec AR date officiellement votre démarche.'],['Toujours formuler les demandes importantes par écrit, même par email avec accusé de réception.','Certaines conventions collectives prévoient des délais spécifiques — vérifiez la vôtre.']),
  _qf(['L\'employeur a une <strong>obligation de sécurité</strong> pour protéger la santé physique et mentale des salariés.','Tout manquement à l\'obligation de sécurité engage la responsabilité civile et pénale de l\'employeur.'],['Depuis 2015, la jurisprudence est passée à une obligation de <strong>moyens renforcée</strong>.','Cela couvre harcèlement, risques psychosociaux, accidents du travail et maladies professionnelles.'],['Signalez tout danger immédiatement par écrit à votre employeur ou représentant du personnel.','Le DUERP (Document Unique d\'Évaluation des Risques) doit être accessible à tous les salariés.']),
  _qf(['Le salarié peut refuser une tâche <strong>hors de sa qualification</strong> ou constituant une modification substantielle du contrat.','Un refus est légitime si la tâche est dangereuse, déqualifiante ou radicalement différente du poste prévu.'],['Les tâches accessoires connexes au poste relèvent du pouvoir de direction de l\'employeur.','Un refus abusif peut constituer une faute pouvant justifier un licenciement disciplinaire.'],['Avant de refuser, vérifiez votre fiche de poste et votre convention collective.','Formulez votre refus par écrit en expliquant objectivement les raisons.']),
  _qf(['La <strong>faute grave</strong> rend impossible le maintien dans l\'entreprise et supprime préavis et indemnité de licenciement.','La <strong>faute lourde</strong> implique une intention de nuire et supprime en plus l\'indemnité de congés payés.'],['La faute lourde est très rare et difficile à prouver — les juges l\'apprécient très strictement.','En cas de faute grave contestée, le CPH requalifie souvent en licenciement sans cause réelle.'],['Ces qualifications ont des conséquences financières majeures — ne les acceptez pas sans conseil juridique.','La mise à pied conservatoire est possible en attendant la procédure disciplinaire.']),
  _qf(['Le télétravail est une <strong>possibilité encadrée</strong>, pas un droit absolu — il doit être prévu par accord ou charte.','Depuis la loi de 2017, le télétravail régulier nécessite un accord collectif ou une charte avec le CSE.'],['L\'employeur ne peut pas sanctionner un salarié pour avoir demandé le télétravail si son poste le permet.','En circonstances exceptionnelles (crise sanitaire), le télétravail peut être rendu obligatoire.'],['Demandez toujours l\'accord de télétravail par écrit avec les modalités clairement définies.','Le refus de l\'employeur doit être motivé si votre poste est éligible selon les critères de l\'accord.']),
  _qf(['Le droit à la déconnexion, instauré par la <strong>loi El Khomri (2016)</strong>, protège le salarié hors de ses heures de travail.','L\'employeur ne peut pas sanctionner un salarié qui ne répond pas aux emails hors de son temps de travail.'],['Ce droit doit être formalisé dans un accord d\'entreprise ou une charte unilatérale avec le CSE.','Les entreprises de +50 salariés doivent négocier sur ce sujet lors des NAO.'],['Si vous êtes régulièrement sollicité hors heures, signalez-le par écrit à votre RH.','La charge numérique doit être intégrée dans les entretiens professionnels annuels.']),
  _qf(['Un CDD ne peut pas dépasser <strong>18 mois au total</strong> (renouvellements compris) dans les cas courants.','Au-delà du délai maximum, le juge requalifie automatiquement en <strong>CDI</strong> avec toutes les indemnités associées.'],['Exceptions : remplacement de salarié absent (24 mois), contrat à l\'étranger (24 mois), emplois saisonniers.','Le renouvellement n\'est possible que deux fois et doit être prévu dans le contrat initial.'],['Si votre CDD arrive à terme sans requalification, réclamez l\'indemnité de précarité (10% de rémunération).','Tout CDD sans motif valable dépassant les délais peut être requalifié en CDI aux Prud\'hommes.']),
  _qf(['Le licenciement pendant un arrêt maladie ordinaire est possible pour motif économique ou absences répétées.','En cas d\'<strong>accident du travail ou maladie professionnelle</strong>, le salarié bénéficie d\'une protection absolue.'],['La protection AT/MP s\'applique pendant l\'arrêt et la suspension — sauf faute grave ou impossibilité de maintien.','Pour un arrêt maladie ordinaire, l\'employeur doit prouver une désorganisation réelle de l\'entreprise.'],['Informez toujours votre employeur dès le premier jour d\'arrêt pour éviter tout risque disciplinaire.','Conservez tous vos avis d\'arrêt envoyés à l\'employeur et à la CPAM.']),
  _qf(['L\'entretien professionnel est <strong>obligatoire tous les 2 ans</strong> pour faire le point sur l\'évolution du salarié.','À 6 ans, un bilan récapitulatif doit confirmer au moins 2 critères : formation, augmentation ou certification.'],['L\'entretien annuel d\'évaluation performance n\'est pas légalement obligatoire — c\'est une pratique d\'entreprise.','En cas d\'entretien professionnel non réalisé dans une entreprise +50, le salarié reçoit un abondement CPF de 3 000 €.'],['Demandez par écrit la tenue de votre entretien si votre employeur ne le propose pas.','Rédigez un compte-rendu de l\'entretien et faites-le valider par votre manager.']),
  _qf(['La modulation permet de <strong>varier les horaires hebdomadaires</strong> sur une période de référence jusqu\'à 1 an.','Seules les heures dépassant le seuil annuel de <strong>1 607 heures</strong> constituent des heures supplémentaires.'],['En semaines hautes, la durée peut atteindre 48h, compensée par des semaines plus courtes.','La modulation doit être prévue par un accord collectif — l\'employeur ne peut pas l\'imposer seul.'],['Vérifiez que votre accord de modulation précise les délais de prévenance avant changement d\'horaire.','Exigez un suivi individuel de vos heures pour vérifier que vous ne dépassez pas le seuil annuel.']),
  _qf(['Le représentant du personnel bénéficie d\'une <strong>protection renforcée</strong> : licenciement soumis à autorisation de l\'inspecteur du travail.','Cette protection couvre toute la durée du mandat et se prolonge <strong>12 mois après</strong> la fin de celui-ci.'],['Le non-respect de cette procédure entraîne la nullité absolue du licenciement et réintégration possible.','L\'inspecteur vérifie que le licenciement n\'est pas lié à l\'exercice du mandat représentatif.'],['Si vous êtes élu ou désigné, informez immédiatement votre employeur par écrit pour activer la protection.','En cas de licenciement irrégulier d\'un salarié protégé, des sanctions pénales sont applicables.']),
  _qf(['Le principe <strong>"à travail égal, salaire égal"</strong> interdit toute différence de traitement sans justification objective.','L\'employeur ne peut pas traiter différemment des salariés en situation identique sans raison vérifiable.'],['Les différences admises reposent sur : ancienneté, compétences, responsabilités, résultats individuels.','Ce principe s\'applique aussi aux avantages, promotions, formations et conditions de travail.'],['Si vous suspectez une inégalité, demandez à votre DRH les critères de rémunération de votre catégorie.','Le Défenseur des Droits peut être saisi en cas de discrimination salariale liée à un critère protégé.']),
  _qf(['La clause de mobilité permet la mutation du salarié sans modification du contrat, mais doit définir une <strong>zone géographique précise</strong>.','Une clause trop vague ou couvrant un périmètre trop large peut être annulée par le juge.'],['L\'employeur doit mettre en œuvre la clause de <strong>bonne foi</strong> avec un délai de prévenance raisonnable.','Un préavis de 1 à 3 mois est attendu avant toute mutation selon les circonstances.'],['Refuser une mutation prévue par une clause valide peut constituer une faute justifiant licenciement.','Négociez les conditions pratiques (aide au déménagement, logement) avant d\'accepter la mutation.']),
  _qf(['Depuis 2016, le salarié doit conserver ses bulletins de paie <strong>sans limitation de durée</strong>.','L\'employeur est tenu de les conserver <strong>5 ans minimum</strong>.'],['Ils sont indispensables pour le calcul des droits retraite, les demandes d\'ARE et les litiges salariaux.','Depuis 2017, l\'employeur doit proposer le bulletin de paie électronique, sauf refus du salarié.'],['Numérisez et sauvegardez vos bulletins dans un coffre-fort numérique (ex : Digiposte).','En cas de perte, vous pouvez demander des duplicatas à votre ancien employeur pendant 5 ans.']),
  _qf(['Le solde de tout compte récapitule toutes les sommes versées à la fin du contrat.','Le salarié dispose de <strong>6 mois</strong> pour le contester par lettre recommandée — passé ce délai, il est libératoire.'],['Ne signez jamais le solde de tout compte sous pression ou sans vérification de chaque ligne.','La mention "pour solde de tout compte" n\'empêche pas de saisir les Prud\'hommes pendant 6 mois.'],['Exigez le solde de tout compte le dernier jour ou dans les jours qui suivent la rupture.','Comparez chaque montant avec vos bulletins de paie et votre contrat.']),
  _qf(['L\'employeur ne peut pas réduire unilatéralement le salaire — c\'est une modification nécessitant <strong>l\'accord du salarié</strong>.','Le refus du salarié est légitime ; l\'employeur doit maintenir le salaire ou entamer une procédure de licenciement.'],['En cas de difficultés économiques, le salarié reste libre de refuser sans être fautif.','Une prime variable supprimée n\'équivaut pas à une baisse si elle était liée à des objectifs non atteints.'],['Formalisez immédiatement votre refus par écrit de toute baisse salariale non acceptée.','Consultez un avocat ou syndicat avant de signer tout avenant réduisant votre rémunération.']),
  _qf(['La résiliation judiciaire permet au salarié de demander au CPH de rompre le contrat aux torts de l\'employeur.','Elle produit les effets d\'un <strong>licenciement sans cause réelle et sérieuse</strong> si les manquements sont prouvés.'],['Les motifs invocables : non-paiement de salaire, harcèlement, modification unilatérale du contrat.','La procédure peut durer 12 à 24 mois — le salarié reste dans l\'entreprise pendant ce temps.'],['Continuez à travailler normalement pendant la procédure pour ne pas affaiblir votre position.','Rassemblez toutes les preuves des manquements de l\'employeur avant de saisir le CPH.']),
  _qf(['La prise d\'acte permet une rupture immédiate du contrat en imputant la faute à l\'employeur.','Si le CPH confirme les manquements, elle produit les effets d\'un <strong>licenciement sans cause réelle</strong>.'],['Si le juge estime la prise d\'acte injustifiée, elle produit les effets d\'une <strong>démission</strong> — sans indemnité ni ARE.','C\'est une décision risquée à prendre uniquement avec conseil juridique et preuves solides.'],['Évitez la prise d\'acte impulsive : la résiliation judiciaire est moins risquée et permet de rester en poste.','Rédigez la lettre de prise d\'acte avec précision en listant les manquements factuels et datés.']),
  _qf(['Le cumul de plusieurs emplois est autorisé dans la limite de <strong>10h/jour et 48h/semaine</strong> au total.','Chaque employeur doit être informé de la situation de multi-emplois, surtout si une clause d\'exclusivité existe.'],['Certains secteurs (santé, sécurité, enseignement) ont des règles spécifiques limitant le cumul.','La clause d\'exclusivité est valide si elle est justifiée par la nature des fonctions et proportionnée.'],['Vérifiez votre contrat : une clause d\'exclusivité non respectée peut justifier un licenciement.','Déclarez tous vos revenus aux impôts et à l\'URSSAF pour éviter tout redressement.']),
  _qf(['Le forfait jours permet à certains cadres de travailler selon un <strong>nombre de jours annuel fixé</strong> (max 218 jours).','Il doit être prévu par accord collectif ET acte individuel signé par le salarié pour être valide.'],['L\'employeur doit assurer un <strong>suivi régulier de la charge de travail</strong> lors d\'entretiens périodiques.','Sans accord collectif valide ou suivi, le forfait est nul et des heures supplémentaires peuvent être réclamées.'],['Si votre forfait jours n\'est pas encadré par un accord récent, consultez un avocat pour évaluer vos droits.','Documentez vos jours de travail et vos jours de repos tout au long de l\'année.']),
  _qf(['L\'AGS garantit le paiement des salaires en cas de <strong>liquidation judiciaire</strong>, jusqu\'à 3 mois de salaire brut.','Le plafond AGS est fixé à <strong>82 272 € brut</strong> (2024), couvrant salaires, indemnités et congés payés.'],['Le mandataire judiciaire déclenche la garantie AGS — déclarez votre créance salariale rapidement.','L\'AGS ne couvre pas les remboursements de frais professionnels ni les notes de frais.'],['En cas de faillite employeur, inscrivez-vous immédiatement à France Travail pour ouvrir vos droits ARE.','Contactez le mandataire judiciaire dans les 2 mois pour faire valoir vos créances salariales.']),
  _qf(['Le CSE est obligatoire dans les entreprises de <strong>11 salariés et plus</strong> depuis 2020.','Dans les entreprises de +50 salariés, le CSE a des attributions étendues sur la stratégie et les conditions de travail.'],['Il remplace les délégués du personnel, le comité d\'entreprise et le CHSCT en une seule instance.','Le CSE gère les activités sociales et culturelles avec un budget minimum de 0,8% de la masse salariale.'],['Renseignez-vous auprès de votre CSE pour connaître les avantages disponibles (chèques vacances, réductions…).','Le CSE peut vous aider dans les situations de conflit avec l\'employeur.']),
  _qf(['Le refus d\'une formation liée à l\'adaptation au poste peut justifier un licenciement pour faute dans certains cas.','En revanche, le refus est légitime si la formation entraîne une modification substantielle du contrat.'],['Une formation obligatoire liée à la sécurité ne peut jamais être refusée sous peine de faute grave.','L\'employeur ne peut imposer une formation avec des contraintes personnelles disproportionnées sans accord.'],['Avant de refuser une formation, vérifiez si elle est contractuellement imposable selon votre accord de branche.','Proposez des alternatives si la contrainte est temporaire plutôt qu\'un refus sec.']),
  _qf(['L\'employeur doit convoquer le salarié à un entretien préalable avec un délai minimum de <strong>5 jours ouvrables</strong>.','La lettre de licenciement ne peut être envoyée qu\'après au moins <strong>2 jours ouvrables</strong> après l\'entretien.'],['La convocation doit préciser la date, l\'heure, le lieu et la possibilité d\'être assisté.','Le non-respect de ces délais rend le licenciement irrégulier et ouvre droit à indemnité pour vice de forme.'],['Vous pouvez vous faire assister par un représentant du personnel ou un conseiller extérieur (liste en mairie).','Préparez l\'entretien en notant par écrit vos arguments et les faits que vous contestez.']),
  _qf(['Le droit d\'alerte économique permet au CSE de déclencher une procédure si des faits préoccupants sont détectés.','La direction doit répondre dans <strong>1 mois</strong> aux questions du CSE dans le cadre de cette alerte.'],['En cas de réponse insatisfaisante, le CSE peut saisir le président du tribunal de commerce.','Cette procédure est distincte de l\'alerte sociale gérée par d\'autres commissions du CSE.'],['Si vous êtes élu CSE, formez-vous à la lecture des documents comptables pour détecter les signaux précoces.','Le recours à un expert-comptable du CSE est possible en cas d\'alerte économique déclenchée.']),
];

/* ── ARE ── */
_QF['are'] = [
  _qf(['Il faut avoir travaillé au moins <strong>130 jours (910 heures)</strong> dans les 24 derniers mois pour ouvrir des droits ARE.','La condition minimale est de 6 mois de travail effectif dans les 2 ans précédant la fin de contrat.'],['Pour les 53 ans et plus, la période de référence est élargie à <strong>36 mois</strong>.','Plus la durée travaillée est longue, plus la durée d\'indemnisation sera importante, jusqu\'à 24 mois.'],['Comptabilisez toutes vos périodes : CDD, CDI, intérim — tout compte pour atteindre les 130 jours.','En cas de doute, France Travail peut réaliser un calcul prévisionnel de vos droits.']),
  _qf(['L\'ARE représente environ <strong>57% de votre salaire journalier brut de référence</strong>, avec un plancher de 31,97 €/jour.','Le calcul retient la formule la plus favorable : 40,4% du SJR + 12,47 € OU 57% du SJR.'],['Le montant journalier ne peut pas dépasser <strong>75% du salaire journalier de référence</strong>.','Les primes et 13ème mois entrent dans le calcul du SJR si versés régulièrement.'],['Utilisez le simulateur officiel de France Travail pour estimer votre allocation avant de démissionner.','Conservez vos bulletins de paie — ils servent de base au calcul du SJR.']),
  _qf(['Le cumul ARE + activité reprise est possible si le nouveau salaire est inférieur à l\'ancien.','Les revenus d\'activité doivent être déclarés chaque mois lors de l\'actualisation mensuelle.'],['Des jours d\'indemnisation sont déduits au prorata, mais la durée totale des droits est allongée.','Ce mécanisme encourage la reprise d\'emploi partiel sans pénaliser financièrement le demandeur.'],['Déclarez toujours vos revenus d\'activité, même minimes — toute omission est considérée comme fraude.','Calculez l\'impact du cumul sur France Travail avant de refuser certaines heures de travail.']),
  _qf(['La démission n\'ouvre généralement <strong>pas droit à l\'ARE</strong>, sauf dans les cas de démission légitime reconnus.','Les cas légitimes : suivi du conjoint muté, non-paiement de salaire, harcèlement, création d\'entreprise.'],['Depuis novembre 2019, la démission pour reconversion peut ouvrir des droits après 5 ans d\'ancienneté et validation de projet.','Le salarié doit consulter un CEP et faire valider son projet par une commission régionale.'],['Avant de démissionner, vérifiez si votre situation correspond à un motif légitime reconnu par France Travail.','En cas de doute, un entretien avec un conseiller France Travail peut clarifier votre situation.']),
  _qf(['La durée d\'indemnisation ARE est <strong>égale à la durée de travail</strong> dans la limite de 24 mois (36 mois pour 53 ans et plus).','Un délai de carence de 7 jours s\'applique systématiquement avant le premier versement.'],['Un différé spécifique lié aux indemnités supra-légales peut repousser le premier paiement jusqu\'à 150 jours.','La durée est calculée en jours calendaires à partir de la date d\'ouverture effective des droits.'],['Inscrivez-vous à France Travail dès la fin de votre contrat — chaque jour de retard réduit votre indemnisation.','Demandez un calcul prévisionnel de votre différé pour anticiper vos besoins de trésorerie.']),
  _qf(['Le différé comporte un délai fixe de <strong>7 jours</strong> plus un différé spécifique calculé sur les indemnités supra-légales.','Le différé spécifique = indemnités supra-légales ÷ 97,7 €/jour, plafonné à <strong>150 jours calendaires</strong>.'],['Les indemnités légales n\'entrent pas dans ce calcul — seule la partie supérieure au légal est prise en compte.','Plus les indemnités de rupture sont élevées, plus le début de l\'indemnisation ARE sera retardé.'],['Anticipez cette période sans revenus en constituant une épargne de précaution avant la rupture.','Vérifiez avec France Travail la date exacte de démarrage de votre indemnisation dès l\'inscription.']),
  _qf(['L\'actualisation mensuelle est <strong>obligatoire entre le 28 et le 15 du mois suivant</strong> sur francetravail.fr ou l\'application.','Sans actualisation dans les délais, les allocations sont automatiquement suspendues.'],['Lors de l\'actualisation, vous déclarez : jours travaillés, revenus perçus, et si vous cherchez toujours un emploi.','En cas d\'oubli ponctuel, contactez rapidement votre agence France Travail — une régularisation est souvent possible.'],['Activez les rappels sur l\'appli France Travail pour ne jamais manquer la fenêtre mensuelle.','Conservez vos justificatifs de revenus en cas de contrôle par France Travail.']),
  _qf(['Vous pouvez exporter vos droits ARE dans les pays de l\'<strong>EEE (Espace Économique Européen)</strong> pendant 3 mois, extensibles à 6 mois.','Hors EEE, les allocations ARE sont suspendues pendant la période passée à l\'étranger.'],['Vous devez vous inscrire auprès du service de l\'emploi local et continuer votre recherche active.','Prévenez France Travail avant votre départ pour obtenir le formulaire U2 nécessaire.'],['Le maintien des droits n\'est pas automatique — démarchez France Travail au moins 4 semaines avant.','Les séjours touristiques courts sont généralement sans impact sur l\'indemnisation si déclarés.']),
  _qf(['En cas de reprise d\'activité, vous devez déclarer la reprise à France Travail qui ajuste ou suspend l\'indemnisation.','Le reliquat de droits ARE non consommé est conservé pendant <strong>3 ans</strong> et peut être réactivé.'],['Si le nouveau salaire est inférieur à l\'ancien, le cumul ARE + salaire permet de maintenir une partie de l\'allocation.','France Travail compare les nouveaux droits calculés avec le reliquat et applique le plus favorable.'],['Ne tardez pas à déclarer la reprise d\'emploi — toute allocation perçue après est un trop-perçu.','Documentez bien la fin de chaque contrat pour faciliter la réactivation de vos droits si besoin.']),
  _qf(['Les allocations chômage ARE sont <strong>soumises à l\'impôt sur le revenu</strong> depuis 2019, avec prélèvement à la source.','La CSG au taux de <strong>6,2%</strong> et la CRDS à 0,5% sont prélevées, sauf revenus modestes exonérés.'],['France Travail verse les allocations nettes après prélèvement et transmet les infos à l\'administration fiscale.','Les allocataires aux revenus modestes peuvent bénéficier d\'un taux de CSG réduit (3,8%) ou d\'une exonération.'],['Vérifiez votre taux de prélèvement à la source sur impots.gouv.fr pour anticiper le net perçu.','Si votre taux est trop élevé, demandez une modulation en cours d\'année sur impots.gouv.fr.']),
  _qf(['Pendant l\'ARE, des <strong>trimestres de retraite sont validés</strong> : 1 trimestre tous les 50 jours d\'indemnisation.','Ces trimestres sont pris en compte pour la retraite de base sans cotisation complémentaire.'],['La retraite complémentaire Agirc-Arrco n\'est pas alimentée pendant le chômage, sauf droits spécifiques.','Les périodes de chômage validées n\'ouvrent des droits retraite que jusqu\'à un certain plafond de durée.'],['Relevez régulièrement votre relevé de carrière sur lassuranceretraite.fr pour vérifier la prise en compte.','En cas d\'écart, signalez-le avec vos attestations Pôle Emploi comme justificatifs.']),
  _qf(['Dès que vous liquidez votre retraite, les droits ARE s\'éteignent — vous devez choisir entre les deux.','Une exception : si vous n\'avez pas le taux plein, France Travail peut maintenir l\'ARE jusqu\'à l\'obtention du taux plein.'],['Le cumul emploi-retraite reste possible si vous reprenez une activité professionnelle après liquidation.','La retraite progressive peut se combiner avec un travail à temps partiel avant liquidation totale.'],['Planifiez votre départ en retraite avec votre conseiller France Travail pour optimiser vos droits ARE.','Vérifiez l\'impact du cumul emploi-retraite sur votre pension avant de reprendre une activité.']),
  _qf(['L\'APLD permet une réduction d\'activité jusqu\'à <strong>40% du temps de travail</strong> avec prise en charge partielle par l\'État.','Le salarié perçoit <strong>70% de son salaire brut</strong> (au moins équivalent au SMIC net) pendant l\'APLD.'],['L\'APLD doit faire l\'objet d\'un accord avec les syndicats ou le CSE et être validée par la DREETS.','Elle peut durer jusqu\'à <strong>24 mois sur une période de 36 mois</strong> — plus longtemps que le chômage partiel classique.'],['En APLD, vos droits ARE ne sont pas consommés — avantage majeur par rapport à un licenciement économique.','Vérifiez que votre employeur respecte les engagements d\'emploi prévus dans l\'accord APLD.']),
  _qf(['Le SJR = salaires bruts des 12 derniers mois ÷ (jours travaillés × 1,4).','L\'ARE journalière = max(40,4% × SJR + 12,47 € ; 57% × SJR), dans les limites plancher et plafond.'],['Le plancher est de 31,97 €/jour (2024) et le plafond est de 75% du SJR.','Les primes, 13ème mois, heures supplémentaires entrent dans le SJR si versés régulièrement.'],['Utilisez le simulateur officiel de France Travail pour un calcul personnalisé avant votre inscription.','Contestez le calcul si vous estimez que certains éléments de rémunération ont été omis.']),
  _qf(['Le rechargement des droits est possible si vous avez retravaillé au moins <strong>130 jours (910h)</strong> depuis votre dernière ouverture.','France Travail compare le reliquat non consommé avec les nouveaux droits et applique le plus favorable.'],['Le rechargement peut allonger significativement la durée totale d\'indemnisation en cas d\'emplois successifs courts.','Le droit recharge automatiquement — vous n\'avez pas à en faire la demande explicite lors de la réinscription.'],['Conservez vos attestations Pôle Emploi de chaque emploi pour justifier les périodes travaillées.','Même une courte période de travail peut recharger vos droits et allonger l\'indemnisation.']),
  _qf(['La rupture conventionnelle ouvre droit à l\'ARE dans les mêmes conditions qu\'un licenciement.','Un <strong>différé spécifique</strong> peut s\'appliquer si l\'indemnité dépasse l\'indemnité légale minimale de licenciement.'],['Le différé est plafonné à 150 jours — au-delà, l\'ARE démarre quoi qu\'il arrive.','L\'indemnité de rupture conventionnelle est exonérée de cotisations jusqu\'au plafond légal.'],['Anticipez le différé lors de la négociation — une indemnité élevée repoussera votre ARE.','Inscrivez-vous à France Travail dès la fin du contrat même si le différé est long.']),
  _qf(['France Travail peut radier en cas de refus de deux ORE successives ou d\'absence injustifiée à une convocation.','La durée de radiation varie de <strong>15 jours à 12 mois</strong> selon la gravité du manquement.'],['La décision est notifiée par courrier et contestable devant le directeur de France Travail puis le tribunal administratif.','Une fausse déclaration peut entraîner radiation et remboursement des sommes indûment perçues.'],['En cas de convocation France Travail, justifiez toujours votre absence par écrit dans les meilleurs délais.','Conservez la preuve de vos candidatures et démarches en cas de contrôle sur votre PPAE.']),
  _qf(['L\'ORE est définie dans le <strong>PPAE</strong> (Projet Personnalisé d\'Accès à l\'Emploi) établi avec le conseiller.','Elle tient compte du poste souhaité, des qualifications, de la rémunération et de la zone géographique.'],['Le refus de deux ORE successives peut entraîner une radiation temporaire avec suspension des allocations.','Les critères s\'assouplissent progressivement avec la durée du chômage.'],['Étudiez attentivement chaque ORE avant de la refuser — documentez les raisons objectives d\'un éventuel refus.','Mettez à jour régulièrement votre PPAE pour que les ORE correspondent à votre profil réel.']),
  _qf(['L\'arrêt maladie <strong>suspend</strong> le versement des allocations ARE mais ne les supprime pas — la CPAM prend le relais.','À la reprise, France Travail reprend le versement pour la durée restante, prolongeant les droits.'],['Vous êtes indemnisé sans interruption : d\'abord par ARE, puis indemnités journalières maladie, puis de nouveau ARE.','L\'arrêt maladie pendant le chômage ne fait pas perdre de droits ARE — il les décale simplement.'],['Informez simultanément France Travail et la CPAM de votre arrêt maladie pour éviter les doublons.','Continuez à vous actualiser mensuellement auprès de France Travail même pendant l\'arrêt maladie.']),
  _qf(['Il n\'y a <strong>pas de délai légal imposé</strong> pour s\'inscrire à France Travail après la fin du contrat.','Cependant, les droits s\'ouvrent à la date d\'inscription — tout retard réduit la durée d\'indemnisation.'],['Il est conseillé de s\'inscrire dans les <strong>12 mois</strong> suivant la fin du contrat au maximum.','L\'inscription en ligne sur francetravail.fr est disponible 24h/24 — inutile d\'attendre un rendez-vous physique.'],['Inscrivez-vous dès le lendemain de la fin du contrat pour ne perdre aucun jour d\'indemnisation.','Même si vous retrouvez un emploi rapidement, inscrivez-vous pour préserver vos droits en cas de nouveau chômage.']),
  _qf(['La pension d\'invalidité de <strong>catégorie 1</strong> est cumulable avec l\'ARE si vous êtes apte à mi-temps.','La pension de catégorie 2 ou 3 (incapacité totale) est incompatible avec l\'ARE.'],['Le cumul ARE + pension ne peut pas dépasser le montant du salaire antérieur au chômage.','Déclarez votre pension d\'invalidité à France Travail dès l\'inscription pour un calcul correct.'],['Consultez la MDPH et un conseiller France Travail pour établir la meilleure stratégie selon votre catégorie.','En cas de changement de catégorie, informez immédiatement France Travail.']),
  _qf(['Le capital de droits représente le <strong>nombre total de jours d\'ARE</strong> auxquels vous avez droit à l\'ouverture.','Il ne peut être utilisé que pendant <strong>3 ans maximum</strong> avant déchéance quadriennale.'],['En cas de reprise d\'emploi, le capital non consommé est préservé pendant 3 ans.','Le capital de droits est recalculé à chaque rechargement.'],['Vérifiez régulièrement votre capital de droits restant sur votre espace personnel France Travail.','Si le capital approche de la déchéance, signalez-le à votre conseiller pour envisager un rechargement.']),
  _qf(['L\'ATA a été supprimée en 2017. Elle a été remplacée par l\'<strong>ADA</strong> (Allocation pour Demandeur d\'Asile) gérée par l\'OFII.','Pour les personnes hors chômage classique, le <strong>RSA</strong> via la CAF reste la principale aide de substitution.'],['L\'ADA est versée pendant l\'examen de la demande d\'asile et est cumulable avec l\'hébergement en CADA.','Les montants et conditions d\'accès à l\'ADA sont différents de l\'ancienne ATA.'],['Pour toute demande d\'asile, contactez France Asile ou une association d\'aide aux réfugiés.','Si vous ne relevez pas du droit d\'asile, renseignez-vous sur le RSA ou d\'autres dispositifs régionaux.']),
  _qf(['Si la rupture de la période d\'essai est à l\'initiative de l\'<strong>employeur</strong>, elle ouvre droit à l\'ARE comme un licenciement.','Si c\'est le salarié qui rompt la PE, c\'est assimilé à une démission — pas de droits ARE sauf cas légitimes.'],['La durée travaillée pendant la PE compte pour le calcul des droits ARE si les 130 jours sont atteints globalement.','L\'employeur qui rompt la PE doit respecter un délai de prévenance minimal.'],['Vérifiez que la rupture de PE est bien à l\'initiative de l\'employeur avant de vous inscrire à France Travail.','Demandez une attestation employeur et un solde de tout compte même en cas de rupture de PE.']),
  _qf(['Transitions Collectives permet aux salariés d\'emplois menacés de suivre une <strong>formation longue vers un métier porteur</strong>.','La formation est prise en charge à 100% et le salarié maintient son salaire pendant toute sa durée.'],['L\'entreprise identifie les postes fragilisés, les salariés volontaires s\'y inscrivent et sont formés.','Ce dispositif vise à anticiper les mutations économiques sans passer par le licenciement économique.'],['Renseignez-vous auprès de votre CSE si votre poste figure dans la liste des emplois fragilisés.','Consultez la liste des métiers porteurs cibles dans votre bassin d\'emploi sur les sites AT-PRO régionales.']),
];

/* Alias */
_QF['rupture-conventionnelle'] = _QF['_default'];
_QF['rupture'] = _QF['_default'];
_QF['cpf'] = _QF['_default'];
_QF['chomage'] = _QF['are'];
_QF['formation'] = _QF['_default'];

function evadBuildResponse(bankIdx, artId){
  var bank = artId === 'are' ? _QF['are'] : _QF['_default'];
  var idx = bankIdx % bank.length;
  var entry = bank[idx];
  if(!entry) return '<em>Information non disponible.</em>';

  var core  = _rnd(entry.core);
  var extra = entry.extra && entry.extra.length ? _rnd(entry.extra) : '';
  var tip   = entry.tip   && entry.tip.length   ? _rnd(entry.tip)   : '';

  var parts = [core];
  if(extra) parts.push(_rnd(_qLinks) + extra);
  if(tip)   parts.push('💡 ' + tip);

  return _rnd(_qIntros) + parts.join('<br>') + '<br><br>' + _rnd(_qOutros);
}

function evadGenQuiz(art) {
  var quizWrap = document.getElementById('art-quiz-block');
  if(!quizWrap) return;

  var bank = QUIZ_BANK[art.id] || QUIZ_BANK['_default'];
  var shown = _evadQuizShown[art.id] || [];
  var available = bank.filter(function(_, i){ return shown.indexOf(i) === -1; });

  if(available.length < 5){
    shown = []; _evadQuizShown[art.id] = []; available = bank.slice();
  }

  var shuffled = available.slice().sort(function(){ return Math.random() - 0.5; });
  var selected = shuffled.slice(0, 5);

  selected.forEach(function(item){
    var idx = bank.indexOf(item);
    if(idx !== -1 && shown.indexOf(idx) === -1) shown.push(idx);
  });
  _evadQuizShown[art.id] = shown;

  var html = '';
  selected.forEach(function(item, i){
    var bankIdx = bank.indexOf(item);
    html += '<div class="art-quiz-q" id="art-quiz-q-'+i+'">' +
      '<div class="art-quiz-q-text">❓ ' + item.q + '</div>' +
      '<button class="art-quiz-q-btn" onclick="evadAskQuiz(this,'+i+','+bankIdx+',\''+art.id+'\')">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>' +
        ' Générer la réponse avec EVA' +
      '</button>' +
      '<div class="art-quiz-answer" id="art-quiz-ans-'+i+'"></div>' +
    '</div>';
  });
  quizWrap.innerHTML = html;
}

function evadAskQuiz(btn, displayIdx, bankIdx, artId){
  var ansEl = document.getElementById('art-quiz-ans-' + displayIdx);
  if(!ansEl || btn.disabled) return;

  btn.disabled = true;
  btn.style.opacity = '.5';
  ansEl.innerHTML = '<div class="art-quiz-loading"><span></span><span></span><span></span> EVA génère votre réponse…</div>';
  ansEl.classList.add('show');

  /* Délai simulé pour l'effet "génération" (500-1000ms) */
  var delay = 500 + Math.floor(Math.random() * 500);
  setTimeout(function(){
    var reponse = evadBuildResponse(bankIdx, artId);
    ansEl.innerHTML = '<div class="art-quiz-answer-label">✨ Réponse EVA</div>' +
      '<div class="art-quiz-answer-text">' + reponse + '</div>' +
      '<button style="margin-top:8px;background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.7);border-radius:7px;padding:5px 10px;font-size:.55rem;cursor:pointer;font-family:inherit;" onclick="evadRegenQuizAns(this,'+displayIdx+','+bankIdx+',\''+artId+'\')">🔄 Autre formulation</button>';
  }, delay);
}

function evadRegenQuizAns(btn, displayIdx, bankIdx, artId){
  var ansEl = document.getElementById('art-quiz-ans-' + displayIdx);
  if(!ansEl) return;
  btn.textContent = '…';
  btn.disabled = true;
  setTimeout(function(){
    var reponse = evadBuildResponse(bankIdx, artId);
    ansEl.innerHTML = '<div class="art-quiz-answer-label">✨ Réponse EVA</div>' +
      '<div class="art-quiz-answer-text">' + reponse + '</div>' +
      '<button style="margin-top:8px;background:transparent;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.7);border-radius:7px;padding:5px 10px;font-size:.55rem;cursor:pointer;font-family:inherit;" onclick="evadRegenQuizAns(this,'+displayIdx+','+bankIdx+',\''+artId+'\')">🔄 Autre formulation</button>';
  }, 350 + Math.floor(Math.random()*300));
}
/* ══════════════════════════════════════════
   DONNÉES ENGAGEMENT PAR ARTICLE
══════════════════════════════════════════ */
var EVAD_ENGAGE = {

  'are': {
    fact: { stat:'34 %', text:'des demandeurs d\'emploi éligibles ne réclament jamais leur ARE faute d\'information. En 2025, c\'est plus de <strong>800 millions €</strong> non réclamés chaque année.', source:'Unédic 2025' },
    checklist: {
      title:'Êtes-vous éligible à l\'ARE ?',
      items:['J\'ai travaillé au moins 130 jours (ou 910h) dans les 24 derniers mois','Ma rupture est involontaire (licenciement, rupture conv., fin CDD…)','J\'ai moins de 65 ans','Je réside en France métropolitaine ou DOM-TOM','Je suis inscrit(e) ou prêt(e) à m\'inscrire à France Travail']
    },
    estimator: {
      title:'Eva calcule votre ARE',
      subtitle:'Glissez pour estimer votre allocation mensuelle',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500}],
      calc: function(v){ var sjr=(v[0]*12)/365; var f1=sjr*0.404+13.11; var f2=sjr*0.57; var daily=Math.max(f1,f2); daily=Math.min(daily,sjr*0.75); daily=Math.max(daily,31.97); var monthly=Math.round(daily*30); return {val:monthly+'€<span>/mois</span>',detail:'SJR estimé : '+Math.round(sjr)+'€/j · ARE journalière : '+Math.round(daily)+'€'}; }
    },
    related:['licenciement','rupture','solde']
  },

  'licenciement': {
    fact: { stat:'1 sur 3', text:'des licenciements contestés aux Prud\'hommes révèle une <strong>irrégularité de procédure</strong>. Une lettre mal rédigée ou un délai manqué peut vous valoir des dommages-intérêts.', source:'Ministère du Travail 2024' },
    checklist: {
      title:'Votre licenciement est-il régulier ?',
      items:['J\'ai reçu une convocation à entretien préalable par LRAR','Le délai de 5 jours ouvrables avant l\'entretien a été respecté','La lettre de licenciement précise le motif réel et sérieux','Le préavis légal ou conventionnel a été respecté','L\'indemnité légale (si éligible) a été versée']
    },
    estimator: {
      title:'Eva calcule votre indemnité',
      subtitle:'Indemnité légale minimum — Art. R1234-2 Code du travail',
      fields:[{id:'salaire',label:'Salaire brut mensuel moyen',min:1200,max:8000,step:100,unit:'€',default:2500},{id:'anciennete',label:'Ancienneté (années)',min:1,max:35,step:1,unit:'ans',default:5}],
      calc: function(v){ var s=v[0],a=v[1]; var ind=0; if(a<=10) ind=s*(1/4)*a; else ind=s*(1/4)*10+s*(1/3)*(a-10); ind=Math.round(ind); return {val:ind+'€',detail:'1/4 mois × '+Math.min(a,10)+'ans'+(a>10?' + 1/3 mois × '+(a-10)+'ans':'')+'  · Exonéré d\'IR'}; }
    },
    related:['rupture','are','solde']
  },

  'rupture': {
    fact: { stat:'500 000', text:'ruptures conventionnelles signées en France chaque année — mais <strong>42 % des salariés</strong> ne négocient pas au-dessus du minimum légal, alors qu\'ils le pourraient.', source:'DARES 2025' },
    checklist: {
      title:'Avez-vous bien négocié votre rupture ?',
      items:['J\'ai calculé mon indemnité minimum légale avant de signer','J\'ai vérifié si ma convention collective prévoit un plancher supérieur','J\'ai demandé le maintien de la mutuelle (portabilité)','J\'ai exigé la mention de la portabilité dans le solde de tout compte','J\'ai attendu 15 jours pour exercer mon droit de rétractation']
    },
    estimator: {
      title:'Eva calcule votre indemnité',
      subtitle:'Minimum légal — Art. L1237-13 Code du travail',
      fields:[{id:'salaire',label:'Salaire brut mensuel moyen',min:1200,max:8000,step:100,unit:'€',default:2500},{id:'anciennete',label:'Ancienneté (années)',min:1,max:35,step:1,unit:'ans',default:5}],
      calc: function(v){ var s=v[0],a=v[1]; var ind=0; if(a<=10) ind=s*(1/4)*a; else ind=s*(1/4)*10+s*(1/3)*(a-10); ind=Math.round(ind); return {val:ind+'€<span> minimum</span>',detail:'Exonéré d\'IR jusqu\'à 96 120€ · Vous pouvez négocier davantage'}; }
    },
    related:['are','solde','mutuelle']
  },

  'salaire': {
    fact: { stat:'62 %', text:'des salariés ne vérifient jamais leur bulletin de salaire en détail. Les erreurs sur les heures supplémentaires représentent en moyenne <strong>2 400 € perdus par an</strong>.', source:'Ifop 2024' },
    checklist: {
      title:'Votre bulletin est-il correct ?',
      items:['Mon taux horaire est ≥ 11,88 €/h (SMIC 2026)','Mes heures sup sont majorées (25 % ou 50 %)','Ma convention collective ne prévoit pas un salaire supérieur','Les cotisations correspondent aux taux légaux','J\'ai un bulletin de salaire pour chaque mois travaillé']
    },
    estimator: {
      title:'Eva calcule vos heures sup',
      subtitle:'Majoration légale — Art. L3121-22 Code du travail',
      fields:[{id:'salaire',label:'Salaire brut mensuel (35h)',min:1200,max:6000,step:100,unit:'€',default:2000},{id:'hsup',label:'Heures sup / semaine',min:1,max:20,step:1,unit:'h',default:5}],
      calc: function(v){ var s=v[0],h=v[1]; var taux=s/151.67; var h1=Math.min(h,8); var h2=Math.max(0,h-8); var maj=(h1*taux*1.25+h2*taux*1.5)*4.33; maj=Math.round(maj); var annual=maj*12; return {val:'+'+maj+'€<span>/mois</span>',detail:'Soit +'+annual+'€/an · Taux horaire : '+taux.toFixed(2)+'€'}; }
    },
    related:['solde','conges','teletravail']
  },

  'conges': {
    fact: { stat:'1 milliard €', text:'de congés payés non récupérés chaque année en France. Depuis <strong>avril 2024</strong>, les arrêts maladie ouvrent droit à des congés — la plupart des salariés l\'ignorent encore.', source:'Cour de cassation 2023' },
    checklist: {
      title:'Connaissez-vous vos droits à congés ?',
      items:['Je sais que j\'acquiers 2,5 jours de congés par mois travaillé','Je sais que mes arrêts maladie depuis avril 2024 ouvrent droit à 2j/mois','Mon employeur m\'a informé de mes congés maladie à mon retour','J\'ai vérifié mon solde de congés dans mon espace RH','Je sais que j\'ai 6 mois pour contester mon solde de tout compte']
    },
    estimator: {
      title:'Eva calcule votre indemnité de congés',
      subtitle:'Méthode la plus favorable — Art. L3141-24',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500},{id:'jours',label:'Jours de congés restants',min:1,max:30,step:1,unit:'j',default:10}],
      calc: function(v){ var s=v[0],j=v[1]; var maintien=s/22*j; var dixieme=(s*12)*0.1/30*j; var ind=Math.round(Math.max(maintien,dixieme)); return {val:ind+'€',detail:'Méthode retenue : '+(maintien>=dixieme?'Maintien du salaire':'Règle du 1/10e')+'  · Toujours la + favorable'}; }
    },
    related:['solde','licenciement','are']
  },

  'solde': {
    fact: { stat:'1 sur 4', text:'des soldes de tout compte contiennent au moins une erreur selon les contrôles URSSAF. <strong>89 % des salariés</strong> les signent sans vérifier le calcul des congés payés.', source:'Inspection du Travail 2024' },
    checklist: {
      title:'Avez-vous tout vérifié avant de signer ?',
      items:['J\'ai reçu les 5 documents obligatoires (reçu, attestation FT, certificat travail, bulletin, portabilité)','J\'ai recalculé mes congés payés avec les 2 méthodes','J\'ai vérifié le solde de mes RTT et heures supplémentaires','J\'ai demandé 48h avant de signer','Je sais que j\'ai 6 mois pour contester après signature']
    },
    estimator: {
      title:'Eva vérifie votre solde',
      subtitle:'Calcul des congés payés — 2 méthodes légales',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500},{id:'jours',label:'Jours de congés non pris',min:1,max:30,step:1,unit:'j',default:12}],
      calc: function(v){ var s=v[0],j=v[1]; var m1=Math.round(s/22*j); var m2=Math.round((s*12)*0.1/30*j); var best=Math.max(m1,m2); return {val:best+'€',detail:'Méthode 1 (maintien) : '+m1+'€ · Méthode 2 (1/10e) : '+m2+'€'}; }
    },
    related:['licenciement','rupture','conges']
  },

  'mutuelle': {
    fact: { stat:'60 %', text:'des salariés ignorent l\'existence de la portabilité mutuelle. <strong>12 mois de couverture gratuite</strong> sont perdus faute de l\'avoir réclamée au moment du départ.', source:'Baromètre Santéclair 2024' },
    checklist: {
      title:'Votre portabilité est-elle activée ?',
      items:['Mon solde de tout compte mentionne la portabilité explicitement','J\'ai obtenu mon certificat de travail avec les coordonnées de l\'assureur','Je perçois ou vais percevoir l\'ARE (condition obligatoire)','J\'ai transmis mon attestation France Travail à l\'assureur','Je sais que la portabilité dure au maximum 12 mois']
    },
    estimator: {
      title:'Eva calcule la valeur de votre portabilité',
      subtitle:'Économie réalisée grâce à la portabilité',
      fields:[{id:'cotisation',label:'Cotisation mutuelle mensuelle estimée',min:20,max:200,step:5,unit:'€',default:60},{id:'duree',label:'Durée chômage estimée (mois)',min:1,max:12,step:1,unit:'mois',default:6}],
      calc: function(v){ var c=v[0],d=v[1]; var eco=c*d; return {val:eco+'€<span> économisés</span>',detail:'Portabilité gratuite pendant '+d+' mois · Couverture identique à celle d\'un salarié actif'}; }
    },
    related:['solde','are','rupture']
  },

  'teletravail': {
    fact: { stat:'2,50€', text:'par jour télétravaillé — c\'est le <strong>minimum légal que votre employeur doit vous verser</strong>. 55 % des télétravailleurs ne perçoivent aucune indemnité alors qu\'ils y ont droit.', source:'URSSAF 2025' },
    checklist: {
      title:'Percevez-vous ce à quoi vous avez droit ?',
      items:['Mon employeur m\'indemnise au minimum 2,50€/jour de télétravail','J\'ai un accord écrit ou une charte de télétravail','Mon matériel est fourni ou remboursé','Je sais qu\'un accident à domicile pendant mes horaires est un AT','Mon droit à la déconnexion est encadré']
    },
    estimator: {
      title:'Eva calcule votre indemnité télétravail',
      subtitle:'Minimum légal URSSAF exonéré de charges',
      fields:[{id:'jours',label:'Jours télétravaillés par semaine',min:1,max:5,step:1,unit:'j/sem',default:2}],
      calc: function(v){ var j=v[0]; var monthly=Math.round(j*4.33*2.5); var annual=monthly*12; return {val:monthly+'€<span>/mois</span>',detail:'Soit '+annual+'€/an exonérés de charges · Plafond : 55,80€/mois'}; }
    },
    related:['salaire','conges','mutuelle']
  },

  'arret-maladie': {
    fact: { stat:'3 jours', text:'de carence non indemnisés — mais <strong>votre convention collective peut les supprimer</strong> dès 1 an d\'ancienneté. 68 % des salariés ignorent ce droit et perdent en moyenne 150 €/arrêt.', source:'Ameli 2025' },
    checklist: {
      title:'Connaissez-vous vos droits en arrêt maladie ?',
      items:['J\'ai transmis mon arrêt à l\'employeur dans les 48h','J\'ai envoyé les volets 1&2 à la CPAM et le volet 3 à l\'employeur','Je connais les heures de sortie autorisées (9h–11h / 14h–16h)','J\'ai vérifié si ma convention supprime le délai de carence','Je sais que mes IJ sont plafonnées à 52,28€/jour']
    },
    estimator: {
      title:'Eva calcule vos indemnités journalières',
      subtitle:'Calcul CPAM — Art. L321-1 Code de la Sécurité sociale',
      fields:[{id:'salaire',label:'Salaire brut mensuel moyen (3 mois)',min:1200,max:8000,step:100,unit:'€',default:2500},{id:'duree',label:'Durée arrêt (jours)',min:4,max:90,step:1,unit:'j',default:15}],
      calc: function(v){ var s=v[0],d=v[1]; var sjb=(s*3)/(3*30.42); var ij=Math.min(sjb*0.5,52.28); ij=Math.round(ij*100)/100; var total=Math.round(ij*(d-3)); return {val:total+'€<span> net estimé</span>',detail:'SJB : '+Math.round(sjb)+'€ · IJ : '+ij+'€/j · Après 3j carence · Hors maintien employeur'}; }
    },
    related:['accident-travail','conges','salaire']
  },

  'harcelement': {
    fact: { stat:'40 000', text:'plaintes pour harcèlement moral déposées chaque année. Pourtant <strong>1 victime sur 3</strong> n\'agit jamais faute de connaître les recours — et la charge de la preuve est partagée, pas sur vous seul.', source:'Défenseur des droits 2025' },
    checklist: {
      title:'Êtes-vous protégé(e) face au harcèlement ?',
      items:['J\'ai identifié et daté les agissements répétés','J\'ai conservé des preuves écrites (emails, SMS, témoignages)','J\'ai alerté le CSE ou les RH par email (trace écrite)','Je sais que je peux saisir le Défenseur des droits gratuitement','Je sais que la charge de la preuve est partagée devant les Prud\'hommes']
    },
    estimator: {
      title:'Eva évalue vos recours possibles',
      subtitle:'Délai de prescription — Art. L1152-1 Code du travail',
      fields:[{id:'mois',label:'Depuis combien de mois ?',min:1,max:60,step:1,unit:'mois',default:6}],
      calc: function(v){ var m=v[0]; var penal=m<=24?'✅ Plainte pénale possible (délai 3 ans)':'⚠️ Vérifiez la prescription pénale'; var prudhommes=m<=24?'✅ Prud\'hommes possible (délai 2 ans)':'❌ Prescription Prud\'hommes dépassée'; return {val:m<=24?'Recours ouverts':'Agissez vite',detail:penal+' · '+prudhommes}; }
    },
    related:['cse-syndicats','arret-maladie','non-concurrence']
  },

  'prime-activite': {
    fact: { stat:'4,4M', text:'de foyers bénéficient de la prime d\'activité — mais <strong>plus de 30 % des éligibles</strong> ne la demandent pas. Pour un salarié au SMIC, c\'est ~190€/mois non réclamés soit 2 280€/an.', source:'CAF 2026' },
    checklist: {
      title:'Avez-vous simulé votre droit à la prime ?',
      items:['J\'ai simulé mon droit sur caf.fr (5 min, sans engagement)','J\'ai vérifié que je fais une déclaration fiscale propre (pas rattaché aux parents)','Je sais que la prime est cumulable avec les APL','Je déclare mes revenus réels chaque trimestre sur caf.fr','Je sais que la prime n\'est pas rétroactive — chaque mois perdu est définitif']
    },
    estimator: {
      title:'Eva estime votre prime d\'activité',
      subtitle:'Estimation indicative — Simulez exactement sur caf.fr',
      fields:[{id:'salaire',label:'Salaire net mensuel',min:600,max:2000,step:50,unit:'€',default:1400},{id:'foyer',label:'Personnes dans le foyer (1-4)',min:1,max:4,step:1,unit:'',default:1}],
      calc: function(v){ var s=v[0],f=Math.round(v[1]); var base=[557.74,836.61,1003.93,1171.26][f-1]||557.74; var bonus=s*0.617; var prime=Math.max(0,Math.round(base+bonus-s*1.617+base*0.5)); var indicatif=prime>0?prime:0; return {val:indicatif>0?'~'+indicatif+'€<span>/mois</span>':'Non éligible',detail:'Estimation indicative · Simulez sur caf.fr pour un montant exact'}; }
    },
    related:['salaire','are','solde']
  },

  'heures-supp': {
    fact: { stat:'4 700€', text:'par an — c\'est ce que perd en moyenne un salarié faisant 5h sup/semaine <strong>non majorées</strong>. 62 % des heures supplémentaires sont mal ou non payées selon l\'inspection du travail.', source:'DARES 2025' },
    checklist: {
      title:'Vos heures sup sont-elles bien payées ?',
      items:['Je sais que les 8 premières h. sup doivent être majorées à +25%','Je sais qu\'au-delà de la 43e heure, la majoration est +50%','Je note mes horaires réels chaque semaine','Je sais que j\'ai 3 ans pour réclamer un rappel de salaire','Je connais mon contingent annuel (220h légal, ou accord de branche)']
    },
    estimator: {
      title:'Eva calcule vos heures sup non payées',
      subtitle:'Majoration légale — Art. L3121-22 Code du travail',
      fields:[{id:'salaire',label:'Salaire brut mensuel (35h)',min:1200,max:6000,step:100,unit:'€',default:2200},{id:'hsup',label:'Heures sup / semaine',min:1,max:20,step:1,unit:'h',default:5}],
      calc: function(v){ var s=v[0],h=v[1]; var taux=s/151.67; var h1=Math.min(h,8); var h2=Math.max(0,h-8); var maj=Math.round((h1*taux*1.25+h2*taux*1.5)*4.33); return {val:'+'+maj+'€<span>/mois</span>',detail:'Soit +'+maj*12+'€/an · Taux horaire : '+taux.toFixed(2)+'€ · Prescr. 3 ans'}; }
    },
    related:['salaire','cdd-droits','solde']
  },

  'cdd-droits': {
    fact: { stat:'10 %', text:'de prime de précarité obligatoire à la fin de tout CDD. Pourtant <strong>1 salarié en CDD sur 4</strong> ne réclame pas cette prime ou part sans vérifier ses ICP (indemnités de congés payés).', source:'Inspection du Travail 2024' },
    checklist: {
      title:'Avez-vous tous vos droits en fin de CDD ?',
      items:['J\'ai reçu la prime de précarité (10% de ma rémunération brute totale)','J\'ai reçu mes indemnités de congés payés (ICP = 10%)','J\'ai reçu mes 5 documents de fin de contrat (solde, attestation FT, etc.)','Je vérifie si mon CDD est requalifiable en CDI (durée dépassée, motif absent)','Je sais que la prescription pour réclamer est de 2 ans (requalification)']
    },
    estimator: {
      title:'Eva calcule votre prime de précarité',
      subtitle:'Art. L1243-8 Code du travail — 10% obligatoire',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:5000,step:100,unit:'€',default:2000},{id:'duree',label:'Durée du CDD (mois)',min:1,max:18,step:1,unit:'mois',default:6}],
      calc: function(v){ var s=v[0],d=v[1]; var remun=s*d; var precarite=Math.round(remun*0.10); var icp=Math.round(remun*0.10); var total=precarite+icp; return {val:precarite+'€<span> précarité</span>',detail:'+ ICP : '+icp+'€ · Total à recevoir : '+total+'€ brut'}; }
    },
    related:['are','solde','salaire']
  },

  'retraite-salarie': {
    fact: { stat:'172', text:'trimestres requis pour une retraite à taux plein. Pourtant <strong>1 salarié sur 3</strong> a des trimestres manquants dans son relevé de carrière — des erreurs récupérables si on agit avant la retraite.', source:'Info-retraite.fr 2025' },
    checklist: {
      title:'Votre dossier retraite est-il en ordre ?',
      items:['J\'ai consulté mon relevé de carrière sur info-retraite.fr','Tous mes emplois passés (CDD, stages longs, jobs d\'été) sont bien comptabilisés','J\'ai vérifié si je suis éligible à un départ anticipé (carrière longue, handicap)','Je sais que le taux plein est de 50% du salaire des 25 meilleures années','J\'ai simulé ma pension sur info-retraite.fr']
    },
    estimator: {
      title:'Eva estime votre retraite de base',
      subtitle:'Régime général — Taux plein 50%',
      fields:[{id:'salaire',label:'Salaire brut moyen (25 meilleures années)',min:1200,max:8000,step:100,unit:'€',default:3000},{id:'trimestres',label:'Trimestres cotisés estimés',min:40,max:172,step:1,unit:'trim.',default:140}],
      calc: function(v){ var s=v[0],t=v[1]; var taux=Math.min(0.50,0.50-(Math.max(0,172-t)*0.0125)); var retraite=Math.round(s*taux); var decote=t<172?Math.round((172-t)*1.25)+'% décote':'Taux plein'; return {val:retraite+'€<span>/mois brut</span>',detail:decote+' · +AGIRC-ARRCO complémentaire (~30-40% salaire brut)'}; }
    },
    related:['cpf-salarie','salaire','arret-maladie']
  },

  'cpf-salarie': {
    fact: { stat:'500€', text:'crédités chaque année sur votre CPF — mais <strong>40 % des salariés</strong> n\'ont jamais consulté leur solde. En 2026, le ticket modérateur de 100€ s\'applique à chaque utilisation (sauf exonérations).', source:'Caisse des Dépôts 2026' },
    checklist: {
      title:'Optimisez-vous votre CPF ?',
      items:['J\'ai consulté mon solde sur moncompteformation.gouv.fr','Je sais que mon solde est plafonné à 5 000€ (8 000€ sans qualification)','Je sais qu\'un ticket modérateur de 100€ s\'applique depuis mai 2024','J\'ai vérifié si mon employeur peut abonder mon CPF','Je n\'ai jamais donné mes identifiants FranceConnect par téléphone (arnaques)']
    },
    estimator: {
      title:'Eva calcule le coût réel de votre formation',
      subtitle:'CPF + ticket modérateur 2024',
      fields:[{id:'cout',label:'Coût de la formation visée (€)',min:200,max:10000,step:100,unit:'€',default:2000},{id:'solde',label:'Solde CPF disponible (€)',min:0,max:5000,step:100,unit:'€',default:1500}],
      calc: function(v){ var c=v[0],s=v[1]; var reste=Math.max(0,c-s+100); var couvert=Math.min(s,c-100); return {val:reste>0?reste+'€<span> à financer</span>':'Entièrement couvert',detail:'CPF utilisé : '+Math.min(s,c)+'€ · Ticket modérateur : 100€ · Reste : '+reste+'€'}; }
    },
    related:['retraite-salarie','non-concurrence','harcelement']
  },

  'non-concurrence': {
    fact: { stat:'30–50%', text:'du salaire mensuel — c\'est la contrepartie financière <strong>obligatoire</strong> pour qu\'une clause de non-concurrence soit valide. Sans elle, la clause est nulle et vous pouvez rejoindre un concurrent immédiatement.', source:'Cour de cassation 2024' },
    checklist: {
      title:'Votre clause de non-concurrence est-elle valide ?',
      items:['Ma clause précise une zone géographique délimitée','Ma clause est limitée dans le temps (idéalement ≤ 2 ans)','Ma clause est liée à mon poste spécifique (pas générale)','Ma clause prévoit une contrepartie financière explicite','Je sais que l\'employeur peut lever la clause au moment du départ']
    },
    estimator: {
      title:'Eva calcule votre contrepartie financière',
      subtitle:'Minimum recommandé par la jurisprudence',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:10000,step:100,unit:'€',default:3000},{id:'duree',label:'Durée clause (mois)',min:3,max:24,step:1,unit:'mois',default:12}],
      calc: function(v){ var s=v[0],d=v[1]; var min=Math.round(s*0.30*d); var rec=Math.round(s*0.40*d); return {val:min+'€<span> minimum</span>',detail:'Minimum 30% : '+min+'€ · Recommandé 40% : '+rec+'€ · À verser mois par mois'}; }
    },
    related:['solde','rupture','licenciement']
  },

  'accident-travail': {
    fact: { stat:'640 000', text:'accidents du travail déclarés en France en 2025. Mais <strong>1 accidenté sur 5</strong> ne sait pas qu\'il a droit à 80% de son salaire dès le 29e jour — soit 30% de plus qu\'en maladie ordinaire.', source:'Ameli 2025' },
    checklist: {
      title:'Avez-vous déclaré et protégé vos droits ?',
      items:['J\'ai informé mon employeur dans les 24h','Mon employeur a déclaré l\'accident à la CPAM dans les 48h (ou je l\'ai fait moi-même)','J\'ai conservé tous les documents : CMI, feuille d\'accident, témoignages','Je sais que je suis protégé contre le licenciement pendant mon arrêt','Je sais qu\'une IPP ≥ 10% ouvre droit à une rente viagère']
    },
    estimator: {
      title:'Eva compare AT vs maladie ordinaire',
      subtitle:'Indemnisation — Art. L433-1 Code de la Sécurité sociale',
      fields:[{id:'salaire',label:'Salaire journalier brut',min:50,max:300,step:5,unit:'€/j',default:100},{id:'duree',label:'Durée arrêt (jours)',min:1,max:180,step:1,unit:'j',default:30}],
      calc: function(v){ var sjb=v[0],d=v[1]; var d1=Math.min(d,28); var d2=Math.max(0,d-28); var ij_at=Math.round(sjb*0.60*d1+sjb*0.80*d2); var ij_mal=Math.round(sjb*0.50*Math.max(0,d-3)); var diff=ij_at-ij_mal; return {val:ij_at+'€<span> (AT)</span>',detail:'Maladie ordinaire : '+ij_mal+'€ · Avantage AT : +'+diff+'€ · Pas de carence'}; }
    },
    related:['arret-maladie','harcelement','cse-syndicats']
  },

  'cse-syndicats': {
    fact: { stat:'Gratuit', text:'et confidentiel — c\'est le service d\'assistance du CSE. <strong>76 % des salariés</strong> ne savent pas qu\'ils peuvent se faire assister par un élu CSE aux Prud\'hommes sans frais d\'avocat.', source:'Ministère du Travail 2025' },
    checklist: {
      title:'Connaissez-vous vos représentants ?',
      items:['Je connais le nom d\'au moins un élu CSE dans mon entreprise','Je sais que le CSE peut m\'assister aux Prud\'hommes gratuitement','Je sais que les élus CSE sont protégés contre le licenciement','Je connais les activités sociales et culturelles disponibles dans mon CSE','Je sais que je peux saisir le CSE pour tout problème : sécurité, discrimination, conditions de travail']
    },
    estimator: {
      title:'Eva calcule vos avantages CSE potentiels',
      subtitle:'Estimation des bénéfices annuels possibles',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500},{id:'taille',label:'Taille entreprise (1=<50 2=50-250 3=>250)',min:1,max:3,step:1,unit:'',default:2}],
      calc: function(v){ var s=v[0],t=Math.round(v[1]); var budgets=[0,200,500][t-1]||200; var legal='Assistance Prud\'hommes : valeur avocat ~1 500€'; return {val:'~'+budgets+'€<span>/an</span>',detail:'Avantages CSE estimés · '+legal}; }
    },
    related:['harcelement','licenciement','arret-maladie']
  },

  'ati': {
    fact: { stat:'800 €', text:'par mois pendant 6 mois maximum — c\'est tout ce que l\'ATI couvre. <strong>78 % des indépendants</strong> pensent être mieux protégés en cas de fermeture. La réalité est bien plus dure.', source:'Bpifrance 2024' },
    checklist: {
      title:'Êtes-vous éligible à l\'ATI ?',
      items:['Mon activité a fait l\'objet d\'une liquidation judiciaire (pas une démission)','J\'ai exercé mon activité pendant au moins 2 ans','Mon revenu moyen était d\'au moins 10 000€/an sur les 2 dernières années','Mes ressources actuelles sont inférieures au RSA (635,71€/mois)','Je suis inscrit(e) ou prêt(e) à m\'inscrire à France Travail']
    },
    estimator: {
      title:'Eva estime votre protection réelle',
      subtitle:'ATI vs épargne de précaution recommandée',
      fields:[{id:'charges',label:'Charges fixes mensuelles (loyer, etc.)',min:500,max:3000,step:100,unit:'€',default:1200}],
      calc: function(v){ var c=v[0]; var ati=800; var deficit=Math.max(0,c-ati); var epargne=c*6; return {val:deficit>0?'-'+deficit+'€<span>/mois</span>':'Couvert',detail:'ATI : 800€/mois · Déficit mensuel : '+deficit+'€ · Épargne recommandée : '+epargne+'€'}; }
    },
    related:['protection-sociale','statuts','micro']
  },

  'micro': {
    fact: { stat:'21,2 %', text:'de votre CA en services BIC — mais beaucoup de micro-entrepreneurs calculent mal leurs charges réelles. <strong>Au-delà de 50 000€ de CA</strong>, l\'EURL peut faire économiser 8 000€/an.', source:'URSSAF 2026' },
    checklist: {
      title:'Optimisez-vous votre micro-entreprise ?',
      items:['Je connais mon taux de cotisation exact selon mon activité','Je déclare mon CA chaque mois (même si 0€)','J\'ai évalué le versement libératoire de l\'IR','J\'ai un compte bancaire dédié à mon activité','Je surveille mon CA pour anticiper le plafond']
    },
    estimator: {
      title:'Eva calcule vos cotisations',
      subtitle:'Barème URSSAF 2026 — Calcul en temps réel',
      fields:[{id:'ca',label:'Chiffre d\'affaires mensuel',min:500,max:10000,step:100,unit:'€',default:3000},{id:'type',label:'Type (1=vente 2=BIC 3=libéral)',min:1,max:3,step:1,unit:'',default:2}],
      calc: function(v){ var ca=v[0],t=Math.round(v[1]); var taux=[0.123,0.212,0.231][t-1]||0.212; var cotis=Math.round(ca*taux); var net=ca-cotis; return {val:cotis+'€<span>/mois</span>',detail:'Taux '+(taux*100)+'% · Net estimé : '+net+'€ · Annuel : '+(cotis*12)+'€'}; }
    },
    related:['statuts','protection-sociale','per-freelance']
  },

  'cumul-are': {
    fact: { stat:'24 mois', text:'de filet de sécurité cumulé ARE + revenus freelance — mais <strong>67 % des créateurs</strong> qui y ont droit ne savent pas comment déclarer leurs revenus correctement et risquent un trop-perçu.', source:'France Travail 2025' },
    checklist: {
      title:'Gérez-vous bien votre cumul ARE ?',
      items:['J\'ai déclaré mon activité à France Travail dès le démarrage','Je déclare mes revenus exacts chaque mois avant le 15','Je connais la formule : jours non indemnisés = revenus ÷ (SJR × 0,7)','Mes revenus + ARE ne dépassent pas mon ancien salaire brut','Je conserve toutes mes factures comme justificatifs']
    },
    estimator: {
      title:'Eva calcule votre ARE résiduelle',
      subtitle:'Jours ARE restants selon vos revenus du mois',
      fields:[{id:'revenus',label:'Revenus freelance ce mois',min:0,max:5000,step:100,unit:'€',default:1500},{id:'sjr',label:'Votre SJR (salaire ÷ 30)',min:30,max:200,step:5,unit:'€/j',default:80}],
      calc: function(v){ var rev=v[0],sjr=v[1]; var joursNonIndemnises=Math.min(30,rev/(sjr*0.7)); var joursARE=Math.max(0,Math.round(30-joursNonIndemnises)); var montantARE=Math.round(joursARE*sjr*0.57); return {val:joursARE+' jours<span> d\'ARE</span>',detail:'ARE perçue : ~'+montantARE+'€ · Jours non indemnisés : '+Math.round(joursNonIndemnises)}; }
    },
    related:['are','micro','statuts']
  },

  'per-freelance': {
    fact: { stat:'30 %', text:'d\'économie d\'impôt immédiate sur chaque euro versé dans votre PER (TMI 30%). <strong>Moins de 15 %</strong> des indépendants ouvrent un PER la première année malgré cet avantage exceptionnel.', source:'Banque de France 2025' },
    checklist: {
      title:'Optimisez-vous votre épargne retraite ?',
      items:['J\'ai consulté mon plafond de déduction PER sur mon avis d\'imposition','J\'ai ouvert un PER individuel (ou prévu de le faire)','Je connais mon TMI pour calculer l\'économie d\'impôt réelle','J\'effectue mes versements avant le 31 décembre','Je déclare mes versements case 6NS de ma déclaration de revenus']
    },
    estimator: {
      title:'Eva calcule votre économie d\'impôt PER',
      subtitle:'Déduction fiscale immédiate — Art. 163 quatervicies CGI',
      fields:[{id:'revenu',label:'Revenu professionnel net annuel',min:10000,max:150000,step:1000,unit:'€',default:60000},{id:'versement',label:'Versement PER annuel',min:500,max:30000,step:500,unit:'€',default:6000}],
      calc: function(v){ var r=v[0],p=v[1]; var tmi=r<27479?0.11:r<78571?0.30:r<168995?0.41:0.45; var eco=Math.round(p*tmi); var cout=p-eco; var plafond=Math.round(Math.max(4114,Math.min(32908,r*0.1))); return {val:eco+'€<span> économisés</span>',detail:'TMI : '+(tmi*100)+'% · Coût réel : '+cout+'€ · Plafond : '+plafond+'€'}; }
    },
    related:['micro','statuts','protection-sociale']
  },

  'cipav': {
    fact: { stat:'12 %', text:'des affiliés CIPAV cotisent dans le mauvais régime depuis la réforme 2018 — soit des milliers d\'euros de cotisations mal calculées. <strong>Vérifiez votre affiliation</strong> sur cipav.fr.', source:'CIPAV 2024' },
    checklist: {
      title:'Êtes-vous bien affilié à la CIPAV ?',
      items:['Mon activité est une profession libérale réglementée (architecte, médecin, ostéo…)','Je cotise bien à la CIPAV et non à la SSI (risque depuis 2018)','J\'ai consulté mon relevé de points retraite sur cipav.fr','Je déclare mes revenus annuellement via net-entreprises.fr','J\'ai signalé toute anomalie par courrier recommandé']
    },
    estimator: {
      title:'Eva estime vos cotisations CIPAV',
      subtitle:'Cotisations retraite de base + complémentaire',
      fields:[{id:'revenu',label:'Revenu professionnel annuel',min:5000,max:150000,step:1000,unit:'€',default:50000}],
      calc: function(v){ var r=v[0]; var base=Math.round(r*0.0885); var comp=Math.round(r*0.027); var total=base+comp; return {val:total+'€<span>/an</span>',detail:'Retraite base : '+base+'€ · Complémentaire : '+comp+'€ · Total : '+total+'€'}; }
    },
    related:['protection-sociale','statuts','per-freelance']
  },

  'protection-sociale': {
    fact: { stat:'0 €', text:'d\'indemnités journalières pendant les <strong>60 premiers jours d\'arrêt maladie</strong> pour un freelance sans prévoyance. Un salarié est couvert dès le 4e jour.', source:'Sécurité Sociale des Indépendants 2026' },
    checklist: {
      title:'Votre protection est-elle suffisante ?',
      items:['J\'ai souscrit une prévoyance couvrant les IJ dès le 1er ou 8e jour d\'arrêt','J\'ai constitué une épargne de précaution de 3 à 6 mois de charges','J\'ai une mutuelle individuelle (non remplacée par la mutuelle employeur)','J\'ai ouvert ou prévu d\'ouvrir un PER pour ma retraite','Je connais le montant réel de mes indemnités maladie actuelles']
    },
    estimator: {
      title:'Eva calcule votre besoin de prévoyance',
      subtitle:'Découvert en cas d\'arrêt maladie sans prévoyance',
      fields:[{id:'ca',label:'CA mensuel moyen',min:1000,max:15000,step:500,unit:'€',default:4000},{id:'charges',label:'Charges fixes mensuelles',min:500,max:5000,step:100,unit:'€',default:2000}],
      calc: function(v){ var ca=v[0],ch=v[1]; var ij60=ch*2; var prev=Math.round(ca*0.015); return {val:'-'+ij60+'€<span> risque</span>',detail:'Perte sur 60j sans prévoyance · Prévoyance estimée : '+prev+'€/mois · Protection immédiate'}; }
    },
    related:['ati','statuts','cipav']
  },

  'statuts': {
    fact: { stat:'10 000€', text:'d\'économies potentielles par an en passant de micro-entreprise à EURL au-delà de 60 000€ de CA. <strong>La plupart des indépendants restent en micro</strong> par méconnaissance.', source:'Expert-comptable.com 2025' },
    checklist: {
      title:'Avez-vous le bon statut ?',
      items:['Mon CA annuel dépasse ou va dépasser 50 000€','J\'ai comparé micro / EURL / SASU avec un expert-comptable','Je connais les implications sur ma protection sociale','Je sais que la SASU donne droit à l\'ARE et à une protection salarié complète','J\'ai simulé l\'impact sur mon revenu net disponible']
    },
    estimator: {
      title:'Eva compare vos statuts',
      subtitle:'Charges estimées selon votre CA annuel',
      fields:[{id:'ca',label:'CA annuel estimé',min:20000,max:200000,step:5000,unit:'€',default:60000}],
      calc: function(v){ var ca=v[0]; var micro=Math.round(ca*0.212); var eurl=Math.round(ca*0.35); var sasu=Math.round(ca*0.50); return {val:micro+'€<span> en micro</span>',detail:'EURL ~'+eurl+'€ · SASU ~'+sasu+'€ · Écart micro/EURL : '+(eurl-micro)+'€/an'}; }
    },
    related:['micro','protection-sociale','per-freelance']
  },

  'sasu-micro': {
    fact: { stat:'45 €', text:'nets pour 100 € facturés en SASU — contre 78 € en micro-entreprise. Mais la SASU donne droit à <strong>l\'ARE, la retraite complète et le congé maladie</strong> comme un salarié. Choisir, c\'est arbitrer.', source:'BPI Création 2025' },
    checklist: {
      title:'Avez-vous le bon statut freelance ?',
      items:['Mon CA annuel est supérieur ou va dépasser 40 000€','J\'ai estimé mon besoin réel de protection sociale (ARE, maternité, retraite)','J\'ai comparé micro vs SASU avec un simulateur ou expert-comptable','Je connais le coût réel du portage salarial pour ma situation','Je sais que je peux changer de statut au fil de l\'eau']
    },
    estimator: {
      title:'Eva compare micro vs SASU',
      subtitle:'Revenu net estimé selon votre facturation',
      fields:[{id:'ca',label:'CA mensuel HT',min:1000,max:15000,step:500,unit:'€',default:5000}],
      calc: function(v){ var ca=v[0]; var micro=Math.round(ca*(1-0.212)*0.77); var sasu=Math.round(ca*0.45); var diff=micro-sasu; return {val:micro+'€<span> net micro</span>',detail:'SASU net : '+sasu+'€ · Écart : '+diff+'€/mois · mais SASU = protection salarié complète'}; }
    },
    related:['portage-salarial','protection-sociale','statuts']
  },

  'tva-franchise': {
    fact: { stat:'37 500€', text:'de CA services — c\'est le seuil de franchise TVA 2026. <strong>1 freelance sur 3</strong> oublie la mention obligatoire sur ses factures et risque un redressement fiscal, même en dessous du seuil.', source:'Impôts.gouv.fr 2026' },
    checklist: {
      title:'Votre facturation TVA est-elle conforme ?',
      items:['Mes factures mentionnent "TVA non applicable — art. 293 B du CGI" (si franchise)','Je surveille mon CA cumulé chaque mois','Je sais que le dépassement du seuil majoré (41 250€) déclenche la TVA immédiatement','J\'ai évalué si l\'option TVA volontaire est avantageuse pour ma clientèle B2B','Je sais comment émettre une facture rectificative en cas de dépassement']
    },
    estimator: {
      title:'Eva vérifie votre seuil TVA',
      subtitle:'Franchise en base — Art. 293 B CGI 2026',
      fields:[{id:'ca',label:'CA annuel estimé (services)',min:0,max:80000,step:1000,unit:'€',default:30000}],
      calc: function(v){ var ca=v[0]; var seuil=37500,majoré=41250; var statut=ca<seuil?'✅ Franchise TVA':ca<majoré?'⚠️ Zone de vigilance':'❌ Assujetti TVA obligatoire'; var reste=ca<seuil?seuil-ca:0; return {val:statut,detail:ca<seuil?'Marge restante : '+reste+'€ · Vérifiez vos factures mensuellement':'Dépassement : '+(ca-seuil)+'€ · Contactez votre SIE'}; }
    },
    related:['contrat-cgv','facturation-retards','statuts']
  },

  'contrat-cgv': {
    fact: { stat:'60 %', text:'des litiges freelance impliquent une mission <strong>sans contrat signé</strong>. Un devis accepté par email ou des CGV bien rédigées ont valeur juridique — mais encore faut-il les avoir rédigées.', source:'Freelances.com 2025' },
    checklist: {
      title:'Vos missions sont-elles bien contractualisées ?',
      items:['J\'ai des CGV rédigées et à jour','Chaque mission commence par un devis ou contrat signé (email suffit)','Mes CGV mentionnent les pénalités de retard légales','J\'exige un acompte de 30-50% avant de démarrer','Mes CGV précisent qui détient la propriété intellectuelle']
    },
    estimator: {
      title:'Eva évalue votre acompte idéal',
      subtitle:'Protection optimale avant démarrage mission',
      fields:[{id:'montant',label:'Montant total de la mission HT',min:500,max:50000,step:500,unit:'€',default:5000},{id:'duree',label:'Durée de la mission (semaines)',min:1,max:52,step:1,unit:'sem.',default:4}],
      calc: function(v){ var m=v[0],d=v[1]; var acompte30=Math.round(m*0.30); var acompte50=Math.round(m*0.50); return {val:acompte30+'€<span> (30%)</span>',detail:'Acompte 50% : '+acompte50+'€ · Solde à la livraison · Délai légal paiement : 30j max'}; }
    },
    related:['facturation-retards','rc-pro','tva-franchise']
  },

  'rc-pro': {
    fact: { stat:'300€', text:'par an en moyenne — c\'est le coût d\'une RC Pro freelance. Un seul sinistre non couvert peut coûter <strong>10 à 100 fois plus</strong>. C\'est l\'assurance avec le meilleur ratio coût/protection.', source:'Hiscox 2025' },
    checklist: {
      title:'Êtes-vous couvert par une RC Pro ?',
      items:['J\'ai souscrit une RC Pro adaptée à mon activité','Mon plafond de garantie est suffisant (≥ 500 000€ minimum)','Je sais si ma RC Pro couvre les erreurs et omissions','J\'ai vérifié si ma profession rend la RC Pro obligatoire','Ma RC Pro couvre les missions à l\'étranger si j\'ai des clients hors France']
    },
    estimator: {
      title:'Eva compare le risque vs la prime',
      subtitle:'Analyse coût-bénéfice RC Pro',
      fields:[{id:'ca',label:'CA annuel HT',min:10000,max:200000,step:5000,unit:'€',default:60000},{id:'prime',label:'Prime RC Pro annuelle estimée',min:100,max:2000,step:50,unit:'€/an',default:400}],
      calc: function(v){ var ca=v[0],p=v[1]; var ratio=Math.round(p/ca*100*10)/10; var sinistre=Math.round(ca*0.30); return {val:ratio+'%<span> du CA</span>',detail:'Prime : '+p+'€/an · Sinistre moyen couvert : ~'+sinistre+'€ · ROI si 1 sinistre évité : '+(sinistre-p)+'€'}; }
    },
    related:['prevoyance-freelance','contrat-cgv','protection-sociale']
  },

  'maternite-independant': {
    fact: { stat:'3 864€', text:'d\'allocation de repos maternel — mais <strong>40 % des indépendantes</strong> ne déposent pas leur dossier à temps ou perdent des IJSS en reprenant trop tôt. La déclaration avant le 3e mois est cruciale.', source:'SSI 2026' },
    checklist: {
      title:'Votre dossier maternité est-il prêt ?',
      items:['J\'ai déclaré ma grossesse à la SSI avant la fin du 3e mois','J\'ai transmis le certificat médical de grossesse','Je sais que je dois cesser toute activité pendant 44 jours minimum','J\'ai planifié ma trésorerie pour 3-4 mois sans revenus','Je connais le montant de mon allocation (3 864€) et mes IJSS (~56€/j)']
    },
    estimator: {
      title:'Eva calcule vos indemnités maternité',
      subtitle:'Régime SSI 2026',
      fields:[{id:'arret',label:'Durée d\'arrêt souhaitée (jours)',min:44,max:112,step:1,unit:'j',default:70}],
      calc: function(v){ var d=v[0]; var allocation=3864; var ijss=Math.round(56.35*d); var total=allocation+ijss; return {val:total+'€<span> total estimé</span>',detail:'Allocation : '+allocation+'€ · IJSS '+d+'j : '+ijss+'€ · Conditions : 44j arrêt min + déclaration &lt; 3e mois'}; }
    },
    related:['arret-maladie-independant','prevoyance-freelance','protection-sociale']
  },

  'prevoyance-freelance': {
    fact: { stat:'28€', text:'par jour — c\'est l\'IJ SSI en cas d\'arrêt maladie pour un indépendant avec 3 ans de cotisation. Un salarié au même salaire toucherait <strong>50 €/jour</strong>. La prévoyance privée comble cet écart.', source:'SSI 2025' },
    checklist: {
      title:'Êtes-vous suffisamment protégé(e) ?',
      items:['Je connais mes IJ SSI en cas d\'arrêt maladie prolongé','J\'ai évalué mes charges fixes que mes IJ SSI ne couvrent pas','J\'ai souscrit (ou évalué) une prévoyance Madelin complémentaire','Je sais que les cotisations Madelin sont déductibles du revenu imposable','J\'ai choisie un délai de franchise adapté à ma trésorerie (30j, 60j, 90j)']
    },
    estimator: {
      title:'Eva calcule votre besoin de prévoyance',
      subtitle:'Déficit de couverture en cas d\'arrêt 90 jours',
      fields:[{id:'charges',label:'Charges fixes mensuelles',min:500,max:4000,step:100,unit:'€',default:1800},{id:'ij',label:'IJ SSI estimées (€/jour)',min:10,max:90,step:5,unit:'€/j',default:28}],
      calc: function(v){ var c=v[0],ij=v[1]; var ijmois=ij*30; var deficit=Math.max(0,c-ijmois); var annuel=deficit*12; return {val:deficit+'€<span>/mois non couvert</span>',detail:'IJ SSI mensuel : '+ijmois+'€ · Déficit : '+deficit+'€/mois · Besoin prévoyance : ~'+annuel+'€/an'}; }
    },
    related:['arret-maladie-independant','maternite-independant','rc-pro']
  },

  'portage-salarial': {
    fact: { stat:'50 %', text:'de frais de gestion en portage — mais vous obtenez ARE, retraite et maladie <strong>comme un vrai salarié</strong>. Pour les consultants à 350€+ TJM, le portage peut être plus avantageux que la micro-entreprise.', source:'PEPS 2025' },
    checklist: {
      title:'Le portage salarial est-il fait pour vous ?',
      items:['Mon TJM est supérieur à 250€/jour (seuil de viabilité minimum)','J\'ai besoin de la protection ARE ou du régime général de retraite','J\'ai comparé les frais de gestion de plusieurs sociétés de portage','J\'ai vérifié que la société de portage est membre du PEPS','J\'ai simulé mon salaire net avec l\'outil de la société de portage']
    },
    estimator: {
      title:'Eva calcule votre salaire en portage',
      subtitle:'Estimation selon votre facturation mensuelle',
      fields:[{id:'ca',label:'CA mensuel HT facturé',min:2000,max:25000,step:500,unit:'€',default:8000},{id:'frais',label:'Frais de gestion (%)',min:5,max:12,step:1,unit:'%',default:8}],
      calc: function(v){ var ca=v[0],f=v[1]/100; var apresGestion=ca*(1-f); var netEstime=Math.round(apresGestion*0.50); var micro=Math.round(ca*(1-0.212)*0.77); return {val:netEstime+'€<span> net estimé</span>',detail:'Après frais gestion : '+Math.round(apresGestion)+'€ · Micro-entreprise : '+micro+'€ net · Écart : '+(micro-netEstime)+'€/mois'}; }
    },
    related:['sasu-micro','protection-sociale','statuts']
  },

  'facturation-retards': {
    fact: { stat:'52 jours', text:'de délai de paiement moyen pour les freelances en France — alors que la loi impose <strong>30 jours maximum</strong>. Les pénalités légales s\'appliquent automatiquement, sans procédure.', source:'Observatoire des délais de paiement 2025' },
    checklist: {
      title:'Gérez-vous bien vos impayés ?',
      items:['Mes factures mentionnent les conditions de paiement et pénalités de retard','Je relance à J+1 du dépassement (email professionnel)','Je connais la procédure d\'injonction de payer (35€, rapide)','Je sais que 40€ d\'indemnité forfaitaire sont dus automatiquement par facture en retard','Je sais que les pénalités courent au taux BCE+10 points (~13-14%/an)']
    },
    estimator: {
      title:'Eva calcule vos pénalités de retard',
      subtitle:'Art. L441-10 Code de Commerce — Automatiques',
      fields:[{id:'montant',label:'Montant facture impayée (€)',min:500,max:50000,step:500,unit:'€',default:3000},{id:'retard',label:'Jours de retard',min:1,max:180,step:1,unit:'j',default:45}],
      calc: function(v){ var m=v[0],r=v[1]; var taux=0.135; var penalites=Math.round(m*taux*(r/365)); var forfait=40; var total=penalites+forfait; return {val:total+'€<span> réclamables</span>',detail:'Pénalités : '+penalites+'€ + forfait 40€ · Taux annuel : 13,5% · Exigibles sans procédure judiciaire'}; }
    },
    related:['contrat-cgv','tva-franchise','rc-pro']
  },

  'arret-maladie-independant': {
    fact: { stat:'3 ans', text:'de revenus moyens — c\'est la base de calcul des IJ SSI. Un indépendant débutant ou à revenus variables peut se retrouver avec <strong>moins de 10€/jour</strong> en cas d\'arrêt. La prévoyance privée est indispensable.', source:'SSI 2026' },
    checklist: {
      title:'Connaissez-vous vos droits en cas d\'arrêt ?',
      items:['Je connais le montant de mes IJ SSI actuelles (simulateur secu-independants.fr)','Je sais que mes IJ se basent sur mes revenus des 3 dernières années','J\'ai déclaré un arrêt maladie à la SSI dans les 48h','Je sais que je ne dois pas travailler pendant mon arrêt (contrôle possible)','J\'ai évalué l\'impact d\'un arrêt de 3 mois sur ma trésorerie']
    },
    estimator: {
      title:'Eva compare IJ SSI vs vos charges',
      subtitle:'Déficit de protection en cas d\'arrêt prolongé',
      fields:[{id:'revenu',label:'Revenu annuel moyen (3 dernières années)',min:5000,max:100000,step:1000,unit:'€/an',default:40000},{id:'charges',label:'Charges fixes mensuelles',min:500,max:4000,step:100,unit:'€',default:1500}],
      calc: function(v){ var r=v[0],c=v[1]; var ij=Math.round((r/365)*0.50); var ijmois=ij*30; var deficit=Math.max(0,c-ijmois); return {val:ij+'€<span>/jour SSI</span>',detail:'IJ mensuel : '+ijmois+'€ · Charges : '+c+'€ · Déficit : '+deficit+'€/mois → Besoin prévoyance'}; }
    },
    related:['prevoyance-freelance','maternite-independant','ati']
  },

  'bilan': {
    fact: { stat:'94 %', text:'des personnes ayant réalisé un bilan de compétences sérieux (20h+) confirment avoir <strong>clarifié leur projet</strong> et évité une reconversion ratée. Un bilan low-cost ne donne pas ce résultat.', source:'FFCB 2024' },
    checklist: {
      title:'Êtes-vous prêt pour un bilan de compétences ?',
      items:['J\'ai consulté mon solde CPF sur moncompteformation.gouv.fr','J\'ai identifié un organisme certifié Qualiopi (obligatoire pour financement CPF)','Je sais qu\'un vrai bilan dure au minimum 10 à 24 heures','J\'ai vérifié les avis du consultant ou de l\'organisme','Je suis prêt(e) à m\'investir sincèrement dans la démarche']
    },
    estimator: {
      title:'Eva estime votre reste à charge',
      subtitle:'Financement bilan de compétences via CPF',
      fields:[{id:'cout',label:'Coût du bilan (€)',min:800,max:4000,step:100,unit:'€',default:2500},{id:'solde',label:'Solde CPF disponible',min:0,max:5000,step:100,unit:'€',default:1500}],
      calc: function(v){ var c=v[0],s=v[1]; var rac=Math.max(0,c-s); return {val:rac===0?'0€ !':rac+'€',detail:rac===0?'Financement CPF total possible — reste à charge nul':'CPF : '+s+'€ · Reste à charge : '+rac+'€ · Demandez l\'AIF à France Travail'}; }
    },
    related:['cpf','cpf-transition','financement']
  },

  'cep': {
    fact: { stat:'6 mois', text:'d\'anticipation minimum recommandés avant de démissionner pour reconversion. <strong>1 démissionnaire sur 5</strong> perd ses droits ARE en ne faisant pas valider son dossier CEP avant de partir.', source:'Transitions Pro 2025' },
    checklist: {
      title:'Avez-vous bien utilisé le CEP ?',
      items:['J\'ai identifié mon opérateur CEP (France Travail, APEC, Cap Emploi…)','J\'ai pris rendez-vous au moins 6 mois avant ma démission prévue','Mon projet professionnel est formalisé et argumenté','J\'ai obtenu la validation écrite du CEP','Je n\'ai pas encore démissionné avant cette validation']
    },
    estimator: {
      title:'Eva calcule le délai idéal',
      subtitle:'Chronologie recommandée avant démission',
      fields:[{id:'mois',label:'Mois avant démission envisagée',min:1,max:12,step:1,unit:'mois',default:6}],
      calc: function(v){ var m=v[0]; var ok=m>=5; return {val:ok?'✓ OK':'⚠ Court',detail:ok?'Vous avez le temps — prenez RDV CEP maintenant':'Délai serré · Instruction CEP = 2 mois · Urgence : contactez France Travail cette semaine'}; }
    },
    related:['demission-reconversion','cpf-transition','bilan']
  },

  'cpf': {
    fact: { stat:'36 millions', text:'de personnes ont un CPF en France — mais <strong>moins de 8 %</strong> l\'utilisent chaque année. Des milliers d\'euros dorment sur des comptes non consultés depuis des années.', source:'Caisse des Dépôts 2025' },
    checklist: {
      title:'Optimisez-vous votre CPF ?',
      items:['J\'ai consulté mon solde sur moncompteformation.gouv.fr','La formation que je vise est certifiante (RNCP ou répertoire spécifique)','J\'ai vérifié si mon employeur peut abonder mon CPF','Je sais que les demandeurs d\'emploi peuvent bénéficier de l\'AIF','J\'ai anticipé le reste à charge de 100€']
    },
    estimator: {
      title:'Eva calcule votre solde CPF estimé',
      subtitle:'Alimentation légale — 500€/an (temps plein)',
      fields:[{id:'annees',label:'Années d\'activité professionnelle',min:1,max:30,step:1,unit:'ans',default:8}],
      calc: function(v){ var a=v[0]; var solde=Math.min(5000,a*500); return {val:solde+'€<span> estimés</span>',detail:'500€/an × '+a+' ans · Plafond : 5 000€ · Vérifiez votre solde réel sur moncompteformation.gouv.fr'}; }
    },
    related:['cpf-transition','bilan','financement']
  },

  'cpf-transition': {
    fact: { stat:'100 %', text:'du salaire maintenu pendant toute la formation — c\'est le dispositif le plus puissant existant. Pourtant <strong>seulement 35 000 dossiers</strong> sont déposés chaque année alors que des millions de salariés sont éligibles.', source:'Transitions Pro 2025' },
    checklist: {
      title:'Êtes-vous éligible au CPF de transition ?',
      items:['J\'ai au moins 24 mois d\'ancienneté dont 12 mois chez mon employeur actuel','Mon contrat est un CDI ou un CDD en cours','La formation visée est certifiante (inscrite au RNCP)','Je connais l\'organisme Transitions Pro de ma région','J\'ai prévu d\'informer mon employeur 60 à 120 jours avant']
    },
    estimator: {
      title:'Eva calcule votre maintien de salaire',
      subtitle:'Salaire maintenu pendant toute la formation',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500},{id:'duree',label:'Durée formation (mois)',min:1,max:24,step:1,unit:'mois',default:12}],
      calc: function(v){ var s=v[0],d=v[1]; var taux=s<=3682*2?1.0:0.9; var total=Math.round(s*taux*d); return {val:total+'€<span> maintenus</span>',detail:''+Math.round(taux*100)+'% du salaire × '+d+' mois · Frais pédagogiques pris en charge par Transitions Pro'}; }
    },
    related:['cpf','cep','demission-reconversion']
  },

  'demission-reconversion': {
    fact: { stat:'1 sur 5', text:'des personnes qui démissionnent pour reconversion <strong>perdent leurs droits ARE</strong> en ne faisant pas valider leur dossier CEP avant de démissionner. L\'ordre est non négociable.', source:'France Travail 2025' },
    checklist: {
      title:'Avez-vous respecté la procédure ?',
      items:['J\'ai au moins 5 ans d\'ancienneté continue chez mon employeur','Mon projet vise une formation certifiante RNCP OU une création/reprise d\'entreprise','J\'ai contacté le CEP AVANT de démissionner','J\'ai obtenu la validation écrite du CEP','Je n\'ai pas encore remis ma démission']
    },
    estimator: {
      title:'Eva estime vos droits ARE',
      subtitle:'Mêmes droits qu\'un licenciement après validation CEP',
      fields:[{id:'salaire',label:'Salaire brut mensuel',min:1200,max:6000,step:100,unit:'€',default:2500}],
      calc: function(v){ var s=v[0]; var sjr=(s*12)/365; var daily=Math.max(sjr*0.404+13.11,sjr*0.57); daily=Math.min(daily,sjr*0.75); daily=Math.max(daily,31.97); var monthly=Math.round(daily*30); return {val:monthly+'€<span>/mois</span>',detail:'ARE estimée identique à un licenciement · Durée selon ancienneté'}; }
    },
    related:['cep','are','cpf-transition']
  },

  'financement': {
    fact: { stat:'0 €', text:'de reste à charge est possible pour une formation de 2 000 à 4 000€ en cumulant CPF + AIF France Travail. <strong>La plupart des demandeurs d\'emploi</strong> pensent à tort qu\'ils ne peuvent pas se former.', source:'France Travail 2025' },
    checklist: {
      title:'Avez-vous activé tous vos leviers ?',
      items:['J\'ai consulté mon solde CPF sur moncompteformation.gouv.fr','J\'ai demandé l\'AIF à mon conseiller France Travail','J\'ai vérifié les aides régionales de mon Conseil Régional','J\'ai vérifié si mon OPCO peut financer (si en poste)','J\'ai calculé le cumul de toutes les aides']
    },
    estimator: {
      title:'Eva calcule votre financement',
      subtitle:'Cumul des aides disponibles',
      fields:[{id:'cout',label:'Coût total de la formation',min:500,max:15000,step:500,unit:'€',default:3000},{id:'cpf',label:'Solde CPF disponible',min:0,max:5000,step:100,unit:'€',default:1500}],
      calc: function(v){ var c=v[0],cpf=v[1]; var aif=Math.min(c-cpf,3000); var rac=Math.max(0,c-cpf-aif); return {val:rac===0?'0€ !':rac+'€<span> restant</span>',detail:'CPF : '+cpf+'€ + AIF estimée : '+aif+'€ · Reste à charge estimé : '+rac+'€'}; }
    },
    related:['cpf','cpf-transition','bilan']
  },

  'proa': {
    fact: { stat:'15 à 25%', text:'du temps de travail consacré à la formation — tout en restant salarié à <strong>100 % du salaire maintenu</strong>. La Pro-A est le dispositif le plus méconnu des salariés éligibles.', source:'Ministère du Travail 2025' },
    checklist: {
      title:'Êtes-vous éligible à la Pro-A ?',
      items:['Mon salaire est ≤ 2 × SMIC (≈ 3 682€/mois brut)','Mon accord de branche prévoit la Pro-A (vérifier sur legifrance.gouv.fr)','La formation visée est certifiante et permettra une promotion ou reconversion','J\'ai parlé de ce projet à mon employeur ou à la RH','Je sais que l\'OPCO finance — l\'employeur dépose la demande']
    },
    estimator: {
      title:'Eva calcule la durée de formation',
      subtitle:'Volume horaire formation selon durée Pro-A',
      fields:[{id:'duree',label:'Durée contrat Pro-A (mois)',min:6,max:24,step:1,unit:'mois',default:12}],
      calc: function(v){ var d=v[0]; var hmin=Math.round(151.67*d*0.15); var hmax=Math.round(151.67*d*0.25); return {val:hmin+'-'+hmax+'h<span> de formation</span>',detail:'15-25% du temps de travail sur '+d+' mois · Salaire maintenu à 100% · Coût : 0€ pour vous'}; }
    },
    related:['cpf-transition','cpf','financement']
  },

  'vae': {
    fact: { stat:'1 an', text:'d\'expérience minimum suffit pour valider un diplôme en VAE. <strong>70 000 dossiers</strong> déposés en 2025, mais beaucoup de candidats abandonnent le Livret 2 — l\'accompagnement multiplie par 3 les chances de validation totale.', source:'VAE.gouv.fr 2025' },
    checklist: {
      title:'Êtes-vous prêt(e) pour la VAE ?',
      items:['J\'ai au moins 1 an d\'expérience en lien avec le diplôme visé','J\'ai identifié le diplôme cible et l\'organisme certificateur','J\'ai déposé ou suis prêt(e) à déposer le Livret 1 (recevabilité)','J\'ai évalué le financement : CPF, AIF France Travail ou employeur','Je sais qu\'un accompagnateur VAE est fortement recommandé']
    },
    estimator: {
      title:'Eva évalue le financement de votre VAE',
      subtitle:'Coûts et financement VAE 2026',
      fields:[{id:'solde',label:'Solde CPF disponible (€)',min:0,max:5000,step:100,unit:'€',default:1500}],
      calc: function(v){ var s=v[0]; var accomp=1500; var frais=500; var total=accomp+frais; var rac=Math.max(0,total-s); return {val:rac===0?'0€ reste à charge':rac+'€<span> reste</span>',detail:'Accompagnement : ~'+accomp+'€ · Frais : ~'+frais+'€ · CPF : '+Math.min(s,total)+'€ · Reste : '+rac+'€'}; }
    },
    related:['cpf','bilan','cpf-transition']
  },

  'afpr-poe': {
    fact: { stat:'0€', text:'de reste à charge pour vous — c\'est le principe de l\'AFPR et de la POE. France Travail <strong>finance intégralement</strong> jusqu\'à 400h de formation, avec l\'ARE maintenue pendant toute la durée.', source:'France Travail 2025' },
    checklist: {
      title:'Avez-vous envisagé l\'AFPR ou la POE ?',
      items:['Je suis inscrit(e) à France Travail (ou je vais l\'être)','J\'ai un projet d\'emploi précis et un employeur potentiellement intéressé (AFPR)','J\'ai présenté mon projet à mon conseiller France Travail','Je sais que ma ARE reste maintenue pendant la formation','Je connais la durée maximum : 400h de formation']
    },
    estimator: {
      title:'Eva calcule la valeur de l\'AFPR/POE',
      subtitle:'Financement total — Formation + maintien ARE',
      fields:[{id:'duree',label:'Durée formation souhaitée (semaines)',min:2,max:10,step:1,unit:'sem.',default:6},{id:'are',label:'Montant ARE journalier (€/j)',min:20,max:200,step:5,unit:'€/j',default:55}],
      calc: function(v){ var d=v[0],are=v[1]; var heures=d*35; var maintienARE=Math.round(are*d*5); var valeurFormation=Math.round(heures*15); var total=maintienARE+valeurFormation; return {val:'~'+total+'€<span> de valeur</span>',detail:'Formation : ~'+valeurFormation+'€ · ARE maintenue : '+maintienARE+'€ · Coût pour vous : 0€'}; }
    },
    related:['are-reconversion','cpf','demission-reconversion']
  },

  'clause-mobilite': {
    fact: { stat:'1 salarié sur 5', text:'refuse chaque année une mutation imposée. Pourtant <strong>beaucoup ignorent</strong> que refuser une mobilité sans délai suffisant ou pour raisons familiales n\'est pas automatiquement une faute grave.', source:'Prud\'hommes 2024' },
    checklist: {
      title:'Votre clause de mobilité est-elle valide ?',
      items:['La zone géographique est précisément définie dans le contrat','Un délai raisonnable (1-3 mois) vous est accordé pour organiser le déménagement','La mutation n\'est pas une sanction déguisée','La mutation répond à un vrai besoin de l\'entreprise (pas ciblé personnellement)','Je sais que je peux négocier des conditions (aide déménagement, prime)']
    },
    estimator: {
      title:'Eva évalue vos options face à la mutation',
      subtitle:'Analyse délai de préavis recommandé',
      fields:[{id:'distance',label:'Distance domicile → nouveau site (km)',min:10,max:1000,step:10,unit:'km',default:200},{id:'famille',label:'Contraintes familiales (1=aucune 2=modérées 3=fortes)',min:1,max:3,step:1,unit:'',default:2}],
      calc: function(v){ var d=v[0],f=Math.round(v[1]); var preav=d>100?3:2; var motif=['Mobilité raisonnable','Motifs légitimes à invoquer','Motifs sérieux — consultez un avocat'][f-1]; return {val:preav+' mois<span> préavis min</span>',detail:motif+' · Distance : '+d+'km · Négociez : aide déménagement, prime, bilan mobilité'}; }
    },
    related:['are-reconversion','cpf-transition','bilan']
  },

  'are-reconversion': {
    fact: { stat:'100 %', text:'de l\'ARE maintenue pendant une formation prescrite par France Travail. <strong>Pourtant 1 demandeur d\'emploi sur 3</strong> commence une formation sans l\'accord de son conseiller et perd ses droits.', source:'France Travail 2025' },
    checklist: {
      title:'Votre formation est-elle compatible avec l\'ARE ?',
      items:['J\'ai obtenu l\'accord écrit de mon conseiller France Travail','Ma formation est inscrite dans mon PPAE (Projet Personnalisé d\'Accès à l\'Emploi)','Je continue à actualiser mensuellement sur francetravail.fr en cochant "Formation"','J\'ai évalué le financement (CPF + AIF si besoin)','Je sais que l\'AIF peut compléter mon CPF gratuitement si accord FT']
    },
    estimator: {
      title:'Eva calcule la valeur de votre reconversion',
      subtitle:'ARE maintenue + formation financée',
      fields:[{id:'are',label:'ARE mensuelle (€/mois)',min:500,max:3000,step:50,unit:'€/mois',default:1200},{id:'duree',label:'Durée formation (mois)',min:1,max:24,step:1,unit:'mois',default:6}],
      calc: function(v){ var are=v[0],d=v[1]; var total=are*d; var formation=Math.round(d*800); return {val:total+'€<span> d\'ARE maintenue</span>',detail:'+ Formation ~'+formation+'€ financée · Total valeur reconversion : ~'+(total+formation)+'€ · Coût pour vous : 0€ si prescrit FT'}; }
    },
    related:['cpf-transition','afpr-poe','demission-reconversion']
  },

  'apl': {
    fact: { stat:'150 à 420€', text:'par mois d\'économie possible sur votre loyer. Pourtant <strong>1 étudiant éligible sur 3</strong> ne fait pas la demande ou attend plusieurs mois — chaque mois perdu est définitif.', source:'CAF 2025' },
    checklist: {
      title:'Avez-vous fait votre demande APL ?',
      items:['Mon logement est conventionné CAF (résidence CROUS, foyer, ou logement privé conventionné)','J\'ai fait ma demande sur caf.fr dès le 1er jour de mon bail','J\'ai déclaré mes revenus des 12 derniers mois (bourses incluses)','Je déclare tout changement de situation dans les 60 jours','Je sais que les APL ne sont pas rétroactives']
    },
    estimator: {
      title:'Eva estime vos APL',
      subtitle:'Estimation indicative selon zone et loyer',
      fields:[{id:'loyer',label:'Loyer mensuel (hors charges)',min:200,max:1500,step:50,unit:'€',default:600},{id:'zone',label:'Zone (1=Paris 2=grande ville 3=autre)',min:1,max:3,step:1,unit:'',default:2}],
      calc: function(v){ var l=v[0],z=Math.round(v[1]); var taux=[0.60,0.42,0.32][z-1]||0.42; var apl=Math.round(Math.min(l*taux,z===1?420:z===2?280:200)); return {val:apl+'€<span>/mois</span>',detail:'Zone '+z+' · Loyer '+l+'€ · Estimation indicative — simuler sur caf.fr'}; }
    },
    related:['rsa-etudiant','css','bourses']
  },

  'alternance': {
    fact: { stat:'50 %', text:'des frais de mutuelle pris en charge obligatoirement par votre employeur. <strong>Pourtant 1 apprenti sur 4</strong> n\'est pas affilié à la mutuelle d\'entreprise — une économie de 240 à 500€/an non réclamée.', source:'DARES 2024' },
    checklist: {
      title:'Réclamez-vous tous vos droits ?',
      items:['Mon salaire correspond bien au % SMIC de mon âge et année de contrat','Mon employeur m\'a affilié à la mutuelle d\'entreprise (50% pris en charge)','Je cumule des congés payés (2,5 jours/mois)','Je sais que mon salaire est exonéré d\'IR jusqu\'à 21 744€/an','Je connais les conditions de rupture du contrat d\'apprentissage']
    },
    estimator: {
      title:'Eva calcule votre salaire',
      subtitle:'Grille de rémunération apprenti 2026',
      fields:[{id:'age',label:'Âge',min:16,max:30,step:1,unit:'ans',default:21},{id:'annee',label:'Année de contrat (1, 2 ou 3)',min:1,max:3,step:1,unit:'',default:1}],
      calc: function(v){ var age=v[0],an=Math.round(v[1]); var smic=1801.80; var grid={1:[0.27,0.39,0.53],2:[0.43,0.51,0.67],3:[0.53,0.61,0.78]}; var key=age<18?1:age<=25?2:3; var pct=(grid[key]||grid[2])[an-1]||0.43; var sal=Math.round(smic*pct); return {val:sal+'€<span> brut/mois</span>',detail:Math.round(pct*100)+'% du SMIC · Exonéré d\'IR · Net estimé : '+Math.round(sal*0.78)+'€'}; }
    },
    related:['premier-emploi','bourses','css']
  },

  'bourses': {
    fact: { stat:'30 %', text:'des étudiants éligibles aux bourses CROUS ne font jamais la demande. Et <strong>la fenêtre DSE se ferme définitivement en mai</strong> — aucun rattrapage possible après.', source:'MESRI 2025' },
    checklist: {
      title:'Avez-vous fait votre DSE à temps ?',
      items:['J\'ai simulé mon échelon sur messervices.etudiant.gouv.fr','J\'ai soumis mon DSE entre janvier et mai','J\'ai confirmé mon inscription en formation pour la notification définitive','Je sais que le DSE se renouvelle chaque année (pas automatique)','J\'ai préparé : avis fiscal parents, justificatif scolarité, RIB']
    },
    estimator: {
      title:'Eva estime votre bourse CROUS',
      subtitle:'Montants 2026 par échelon — Barème officiel',
      fields:[{id:'echelon',label:'Échelon estimé (0 à 7)',min:0,max:7,step:1,unit:'',default:3}],
      calc: function(v){ var e=Math.round(v[0]); var montants=[0,108,238,304,391,451,538,589]; var m=montants[e]||0; var annual=m*10; return {val:m+'€<span>/mois</span>',detail:'Échelon '+e+' · Soit '+annual+'€/an sur 10 mois · Simulez sur messervices.etudiant.gouv.fr'}; }
    },
    related:['apl','css','rsa-etudiant']
  },

  'css': {
    fact: { stat:'1€/mois', text:'maximum pour une mutuelle qui couvre 100% du ticket modérateur. <strong>Des milliers d\'étudiants</strong> paient 30 à 50€/mois une mutuelle privée alors qu\'ils seraient éligibles à la CSS gratuite.', source:'CPAM 2025' },
    checklist: {
      title:'Êtes-vous éligible à la CSS ?',
      items:['Mes revenus sont inférieurs à 14 211€/an (bourses incluses)','J\'ai simulé mon éligibilité sur ameli.fr','J\'ai un médecin traitant déclaré sur ameli.fr','J\'ai renouvelé ma CSS (elle dure 1 an — pas de renouvellement automatique)','Je sais que la CSS couvre dentaire et optique (paniers 100% Santé)']
    },
    estimator: {
      title:'Eva calcule votre économie CSS',
      subtitle:'Économie vs mutuelle privée étudiante',
      fields:[{id:'mutuelle',label:'Cotisation mutuelle actuelle (€/mois)',min:10,max:80,step:5,unit:'€/mois',default:35}],
      calc: function(v){ var m=v[0]; var eco=m*12; return {val:eco+'€<span>/an économisés</span>',detail:'CSS gratuite ou 1€/mois vs '+m+'€/mois · Même couverture · Simulez sur ameli.fr'}; }
    },
    related:['securite-sociale-etudiant','apl','rsa-etudiant']
  },

  'premier-emploi': {
    fact: { stat:'1 sur 3', text:'des jeunes en premier emploi reçoivent un bulletin de salaire erroné les 3 premiers mois. <strong>Trop peu osent le signaler</strong> par crainte de nuire à leur période d\'essai.', source:'CFDT 2024' },
    checklist: {
      title:'Vos droits sont-ils respectés dès le 1er jour ?',
      items:['J\'ai reçu mon contrat signé avant ou le jour J','Mon salaire est ≥ au SMIC (11,88€/h) ou au minimum conventionnel','Mon employeur m\'a affilié à la mutuelle d\'entreprise (50% pris en charge)','Je comprends ma période d\'essai et mes droits de rupture','Je sais que j\'acquiers des congés payés dès le 1er jour']
    },
    estimator: {
      title:'Eva vérifie votre salaire net',
      subtitle:'Conversion brut → net selon statut',
      fields:[{id:'brut',label:'Salaire brut mensuel',min:1200,max:5000,step:50,unit:'€',default:1800}],
      calc: function(v){ var b=v[0]; var net=Math.round(b*0.782); var heure=(b/151.67).toFixed(2); return {val:net+'€<span> net/mois</span>',detail:'Taux horaire : '+heure+'€ · SMIC min : 11,88€/h · '+(parseFloat(heure)>=11.88?'✓ Conforme':'⚠ Inférieur au SMIC')}; }
    },
    related:['alternance','css','apl']
  },

  'rsa-etudiant': {
    fact: { stat:'130€', text:'en moyenne de prime d\'activité pour un étudiant travaillant à mi-temps à côté de ses études. <strong>2 millions d\'étudiants travailleurs</strong> n\'ont jamais demandé cette aide disponible sur caf.fr en 3 minutes.', source:'CAF 2025' },
    checklist: {
      title:'Percevez-vous toutes vos aides ?',
      items:['J\'ai simulé toutes mes aides sur caf.fr (APL + prime activité + RSA)','Je déclare mes revenus à la CAF tous les trimestres','Je sais que la prime d\'activité est accessible dès 0,5 × SMIC de revenus','Je connais les aides d\'urgence CROUS disponibles ponctuellement','Je sais que le RSA est accessible à 25 ans ou en cas de situation spéciale']
    },
    estimator: {
      title:'Eva estime votre prime d\'activité',
      subtitle:'Calcul simplifié — Art. L842-1 Code sécurité sociale',
      fields:[{id:'revenus',label:'Revenus mensuels d\'activité',min:0,max:2500,step:50,unit:'€',default:800}],
      calc: function(v){ var r=v[0]; var smic=1801.80; if(r<smic*0.5){return {val:'Non éligible',detail:'Revenus inférieurs à 0,5 × SMIC ('+Math.round(smic*0.5)+'€/mois) · Continuez à simuler sur caf.fr'};} var prime=Math.round(597-(r-smic*0.5)*0.38); prime=Math.max(0,prime); return {val:prime>0?prime+'€<span>/mois</span>':'0€',detail:'Simulation indicative · Vérifiez sur caf.fr avec votre situation réelle'}; }
    },
    related:['apl','css','bourses']
  },

  'securite-sociale-etudiant': {
    fact: { stat:'30 %', text:'seulement de remboursement sans médecin traitant déclaré. <strong>400 000 étudiants</strong> changent de ville chaque année sans mettre à jour leur médecin traitant — et perdent 40% de leurs remboursements.', source:'Ameli 2025' },
    checklist: {
      title:'Votre couverture est-elle optimale ?',
      items:['J\'ai un compte ameli.fr actif avec ma carte Vitale à jour','J\'ai déclaré un médecin traitant dans ma ville d\'études','Je suis rattaché(e) au régime général (pas d\'ancienne mutuelle étudiante)','J\'ai vérifié mon éligibilité à la CSS (gratuite si revenus < 14 211€/an)','Je sais que la téléconsultation est remboursée avec médecin traitant']
    },
    estimator: {
      title:'Eva calcule votre remboursement',
      subtitle:'Impact du médecin traitant sur les remboursements',
      fields:[{id:'depenses',label:'Dépenses santé mensuelles estimées',min:10,max:300,step:10,unit:'€',default:60}],
      calc: function(v){ var d=v[0]; var avec=Math.round(d*0.70); var sans=Math.round(d*0.30); var gain=avec-sans; return {val:'+'+gain+'€<span>/mois</span>',detail:'Avec médecin traitant : '+avec+'€ remboursés · Sans : '+sans+'€ · Déclarez le sur ameli.fr gratuitement'}; }
    },
    related:['css','apl','rsa-etudiant']
  },

  'job-etudiant': {
    fact: { stat:'964h', text:'maximum par an pour un job étudiant — soit environ 20h/semaine. Mais <strong>1 étudiant salarié sur 3</strong> ne réclame pas ses 10% d\'indemnités de congés payés en fin de CDD, perdant parfois 200-400€.', source:'Urssaf 2025' },
    checklist: {
      title:'Êtes-vous bien protégé(e) dans votre job ?',
      items:['J\'ai un contrat écrit (CDD, extra ou CDI partiel)','Je perçois au moins 11,88€/heure (SMIC 2026)','Je sais que j\'ai droit aux ICP (10% du brut) en fin de contrat','J\'ai évalué l\'impact de mes revenus sur ma bourse CROUS (année N+1)','Je sais que je suis protégé(e) contre les accidents du travail même en job court']
    },
    estimator: {
      title:'Eva calcule vos ICP en fin de CDD',
      subtitle:'Indemnités de congés payés — 10% obligatoire',
      fields:[{id:'salaire',label:'Salaire brut horaire',min:11.88,max:20,step:0.12,unit:'€/h',default:11.88},{id:'heures',label:'Heures travaillées au total',min:10,max:500,step:5,unit:'h',default:100}],
      calc: function(v){ var tx=v[0],h=v[1]; var brut=Math.round(tx*h); var icp=Math.round(brut*0.10); return {val:icp+'€<span> d\'ICP</span>',detail:'Salaire brut total : '+brut+'€ · ICP 10% : '+icp+'€ · À réclamer à la fin du contrat'}; }
    },
    related:['apprentissage','stage-gratification','alternance']
  },

  'apprentissage': {
    fact: { stat:'5 jours', text:'de congés supplémentaires avant les examens — un droit légal que <strong>beaucoup d\'apprentis ignorent</strong>. Votre maître d\'apprentissage ne peut pas vous les refuser. Demandez-les par écrit 1 mois à l\'avance.', source:'Code du Travail L6222-35' },
    checklist: {
      title:'Réclamez-vous tous vos droits d\'apprenti ?',
      items:['Mon salaire correspond à la grille légale selon mon âge et année de contrat','J\'ai bien 5 jours de congés supplémentaires avant examens dans mon contrat','Mon employeur m\'a affilié à la mutuelle (50% pris en charge)','Je sais que j\'ai 45 jours de période d\'essai où chacun peut rompre librement','Je connais le médiateur de l\'apprentissage en cas de litige']
    },
    estimator: {
      title:'Eva calcule votre salaire apprenti',
      subtitle:'Grille légale 2026 — % SMIC selon âge',
      fields:[{id:'age',label:'Votre âge',min:16,max:29,step:1,unit:'ans',default:20},{id:'annee',label:'Année de contrat (1, 2 ou 3)',min:1,max:3,step:1,unit:'',default:1}],
      calc: function(v){ var age=Math.round(v[0]),annee=Math.round(v[1]); var grille=[[27,39,53],[43,51,67],[53,61,78]]; var tranche=age<18?0:age<26?1:2; var pct=grille[tranche][annee-1]||43; var brut=Math.round(1801.80*pct/100); return {val:brut+'€<span> brut/mois</span>',detail:pct+'% SMIC · Net estimé : ~'+Math.round(brut*0.79)+'€ · Exonéré IR jusqu\'à 21 744€/an'}; }
    },
    related:['job-etudiant','alternance','stage-gratification']
  },

  'stage-gratification': {
    fact: { stat:'4,35€', text:'de l\'heure — c\'est la gratification minimale légale pour tout stage de plus de 2 mois. Pourtant <strong>1 stagiaire sur 5</strong> ne réclame pas son remboursement de transports (50% obligatoire), soit 30-80€/mois perdus.', source:'Etudiant.gouv.fr 2026' },
    checklist: {
      title:'Connaissez-vous vos droits de stagiaire ?',
      items:['Mon stage de plus de 2 mois est rémunéré (min 4,35€/h)','Mon abonnement de transport est remboursé à 50% par l\'entreprise','J\'ai accès au restaurant d\'entreprise aux mêmes conditions que les salariés','J\'ai une convention de stage signée par les 3 parties','Je sais que je peux signaler un stage abusif à la DREETS']
    },
    estimator: {
      title:'Eva calcule votre gratification totale',
      subtitle:'Gratification + avantages légaux du stagiaire',
      fields:[{id:'heures',label:'Heures par semaine',min:20,max:35,step:5,unit:'h/sem',default:35},{id:'duree',label:'Durée du stage (mois)',min:1,max:6,step:1,unit:'mois',default:6}],
      calc: function(v){ var h=v[0],d=v[1]; var grat=Math.round(4.35*h*4.33*d); var icp=d>=2?Math.round(grat*0.10):0; return {val:grat+'€<span> gratification</span>',detail:(d>=2?'+ ICP : '+icp+'€ · ':'Stage < 2 mois → ICP optionnelle · ')+'+ 50% transport + accès RIE'}; }
    },
    related:['apprentissage','job-etudiant','premier-emploi']
  },

  'cvec': {
    fact: { stat:'103€', text:'par an — obligatoire avant toute inscription universitaire. <strong>Boursiers CROUS : exonération totale automatique</strong>. Sans attestation CVEC, aucune inscription n\'est possible, quelle que soit l\'université.', source:'MESRI 2026' },
    checklist: {
      title:'Votre CVEC est-elle en ordre ?',
      items:['J\'ai payé (ou obtenu l\'exonération de) la CVEC sur cvec.etudiant.gouv.fr','J\'ai téléchargé et conservé mon attestation CVEC en PDF','Je sais que boursier CROUS = exonération automatique','Je sais que l\'attestation est valable pour toute inscription dans l\'année','J\'ai transmis l\'attestation à mon université lors de l\'inscription']
    },
    estimator: {
      title:'Eva calcule votre coût total rentrée',
      subtitle:'CVEC + frais d\'inscription 2026',
      fields:[{id:'cycle',label:'Cycle (1=Licence 2=Master 3=Doctorat)',min:1,max:3,step:1,unit:'',default:1},{id:'boursier',label:'Boursier CROUS ? (0=Non 1=Oui)',min:0,max:1,step:1,unit:'',default:0}],
      calc: function(v){ var c=Math.round(v[0]),b=Math.round(v[1]); var cvec=b?0:103; var droits=[175,250,396][c-1]||175; var exoboursierd=b?0:droits; var total=cvec+(b?0:exoboursierd); return {val:total+'€<span> frais inscription</span>',detail:'CVEC : '+cvec+'€ · Droits : '+(b?0:exoboursierd)+'€ · '+(b?'Exonération boursier ✅':'Simulez votre bourse sur messervices.etudiant.gouv.fr')}; }
    },
    related:['bourses','logement-crous','mutuelle-etudiante']
  },

  'carte-etudiante-internationale': {
    fact: { stat:'15€', text:'pour la carte ISIC — reconnue dans 130 pays. <strong>Un seul trajet SNCF étudiant</strong> avec la réduction ISIC rembourse la carte. Les étudiants Erasmus économisent en moyenne 300€ par semestre grâce à l\'ISIC.', source:'ISIC France 2025' },
    checklist: {
      title:'Profitez-vous de toutes les réductions ?',
      items:['J\'ai commandé la carte ISIC sur isic.fr (ou je vais le faire)','J\'ai téléchargé l\'application ISIC pour accéder aux réductions en temps réel','Je cumule ISIC avec ma carte de transport étudiant régionale','Je sais que l\'ISIC inclut souvent une assurance médicale voyage','J\'ai vérifié les réductions sur logiciels et outils (Microsoft, Adobe…)']
    },
    estimator: {
      title:'Eva calcule votre économie annuelle ISIC',
      subtitle:'Estimation des économies par catégorie',
      fields:[{id:'voyages',label:'Voyages/sorties culture par mois',min:0,max:10,step:1,unit:'/',default:3},{id:'erasmus',label:'Erasmus prévu ? (0=Non 1=Oui)',min:0,max:1,step:1,unit:'',default:0}],
      calc: function(v){ var v1=Math.round(v[0]),erasmus=Math.round(v[1]); var eco=v1*8+erasmus*300; var cout=15; var roi=eco-cout; return {val:roi>0?'+'+roi+'€<span>/an</span>':'Calculez vos économies',detail:'Économies estimées : '+eco+'€ · Coût carte : '+cout+'€ · ROI : '+(roi>0?roi+'€':'-')+'€'}; }
    },
    related:['logement-crous','bourses','apl']
  },

  'logement-crous': {
    fact: { stat:'200–500€', text:'économisés par mois en résidence CROUS vs marché privé. Sur 2 ans, c\'est jusqu\'à <strong>12 000€ d\'économies</strong>. Pourtant beaucoup renoncent sans même candidater — la clé : le DSE avant mars.', source:'CROUS 2026' },
    checklist: {
      title:'Avez-vous maximisé vos chances CROUS ?',
      items:['J\'ai rempli mon DSE (bourse) avant mars — c\'est le critère principal d\'attribution','J\'ai sélectionné un maximum de résidences sur trouverunlogement.lescrous.fr','Je sais que des logements se libèrent en juillet-septembre (désistements)','Je suis prêt(e) à répondre dans les 48h si un logement m\'est proposé','J\'ai candidaté même si j\'ai été refusé l\'année précédente']
    },
    estimator: {
      title:'Eva calcule l\'économie CROUS vs privé',
      subtitle:'Comparaison loyer CROUS vs marché 2026',
      fields:[{id:'ville',label:'Zone (1=Paris 2=grande ville 3=autre)',min:1,max:3,step:1,unit:'',default:2},{id:'duree',label:'Durée des études (années)',min:1,max:5,step:1,unit:'ans',default:2}],
      calc: function(v){ var z=Math.round(v[0]),d=v[1]; var crous=[350,250,180][z-1]||250; var marche=[900,600,450][z-1]||600; var eco=(marche-crous)*12*d; return {val:eco+'€<span> économisés</span>',detail:'CROUS : ~'+crous+'€/mois · Marché : ~'+marche+'€/mois · Sur '+d+' an(s) : '+eco+'€ d\'économies'}; }
    },
    related:['bourses','apl','cvec']
  },

  'mutuelle-etudiante': {
    fact: { stat:'0€', text:'de reste à charge pour les boursiers avec la CSS. <strong>40 % des étudiants éligibles</strong> à la Complémentaire Santé Solidaire ne la demandent pas et payent une mutuelle privée inutilement.', source:'CPAM 2025' },
    checklist: {
      title:'Votre couverture santé est-elle optimale ?',
      items:['J\'ai vérifié si je suis encore couvert(e) par la mutuelle de mes parents','J\'ai simulé mon droit à la CSS (gratuite si revenus < ~12 000€/an)','Je sais que CSS et bourse CROUS sont cumulables','Je sais que sans mutuelle, mes soins dentaires et optiques ne sont pas remboursés','Si alternant(e), je suis affilié(e) à la mutuelle d\'entreprise (50% employeur)']
    },
    estimator: {
      title:'Eva calcule votre économie mutuelle',
      subtitle:'CSS vs mutuelle privée étudiante',
      fields:[{id:'mutuelle',label:'Mutuelle mensuelle actuelle ou prévue (€)',min:10,max:80,step:5,unit:'€/mois',default:35},{id:'css',label:'Éligible CSS ? (0=Non 1=Oui)',min:0,max:1,step:1,unit:'',default:0}],
      calc: function(v){ var m=v[0],css=Math.round(v[1]); var annuel=m*12; var eco=css?annuel:0; return {val:css?eco+'€<span> économisés/an</span>':annuel+'€<span>/an</span>',detail:css?'CSS gratuite applicable → Économie : '+eco+'€/an · Demandez-la sur ameli.fr':'Simulez votre droit à la CSS sur ameli.fr — économie potentielle : '+annuel+'€/an'}; }
    },
    related:['cvec','securite-sociale-etudiant','css']
  },

  'prime-activite-etudiant': {
    fact: { stat:'~1 064€', text:'net/mois minimum de revenus salariaux pour un étudiant éligible à la prime d\'activité. Les <strong>alternants bien rémunérés</strong> y ont droit — et peuvent cumuler avec leur bourse CROUS et les APL.', source:'CAF 2026' },
    checklist: {
      title:'Êtes-vous éligible à la prime d\'activité ?',
      items:['Je gagne au moins ~1 064€ net/mois de revenus professionnels','Je fais ma propre déclaration fiscale (non rattaché aux parents)','J\'ai vérifié sur caf.fr → simulateur prime d\'activité','Je sais que la prime d\'activité est cumulable avec la bourse et les APL','Je déclare mes revenus chaque trimestre sur caf.fr pour maintenir mes droits']
    },
    estimator: {
      title:'Eva estime votre prime d\'activité',
      subtitle:'Estimation indicative — Simulez exactement sur caf.fr',
      fields:[{id:'salaire',label:'Salaire ou revenu net mensuel',min:800,max:2000,step:50,unit:'€',default:1100}],
      calc: function(v){ var s=v[0]; var seuil=1064; if(s<seuil){ return {val:'Non éligible',detail:'Seuil minimum : 1 064€/mois net · Votre revenu : '+s+'€ · Écart : '+(seuil-s)+'€'}; } var prime=Math.max(0,Math.round(557.74+s*0.617-s*1.617+557.74*0.5)); return {val:prime>0?'~'+prime+'€<span>/mois</span>':'Simulez',detail:'Estimation indicative · Cumulable avec bourse et APL · Simulez sur caf.fr'}; }
    },
    related:['job-etudiant','apl','bourses']
  }

};

/* ══════════════════════════════════════════
   RENDU DES MODULES ENGAGEMENT
══════════════════════════════════════════ */
function evadBuildEngagement(artId) {
  var d = EVAD_ENGAGE[artId];
  if(!d) return '';
  var html = '';

  // — Checklist : affichée en fin d'article (mini hero, voir evadChecklistHero) —
  if(false && d.checklist) {
    var items = d.checklist.items.map(function(it,i){
      return '<div class="art-checklist-item" onclick="evadCheckItem(this,\''+artId+'\')">'+
        '<div class="art-checklist-box"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>'+
        '<div class="art-checklist-label">'+it+'</div>'+
      '</div>';
    }).join('');
    html += '<div class="art-checklist" id="cl-'+artId+'">'+
      '<div class="art-checklist-header">'+
        '<div class="art-checklist-header-logo">'+
          '<div class="art-checklist-header-dots">'+
            '<div class="art-checklist-header-dot"></div>'+
            '<div class="art-checklist-header-dot"></div>'+
            '<div class="art-checklist-header-dot"></div>'+
          '</div>'+
          '<div class="art-checklist-header-name">EVA vérifie</div>'+
        '</div>'+
        '<div class="art-checklist-header-tag">Checklist</div>'+
      '</div>'+
      '<div class="art-checklist-body">'+
        '<div class="art-checklist-q">'+d.checklist.title+'</div>'+
        items+
        '<div class="art-checklist-result" id="cl-res-'+artId+'"></div>'+
      '</div>'+
    '</div>';
  }

  // — Estimateur EVA —
  if(d.estimator) {
    var fields = d.estimator.fields.map(function(f,i){
      var pct = Math.round((f.default-f.min)/(f.max-f.min)*100);
      return '<div class="art-estimator-field">'+
        '<div class="art-estimator-field-label">'+f.label+' <span id="ev-v-'+artId+'-'+i+'">'+f.default+' '+f.unit+'</span></div>'+
        '<input type="range" class="art-estimator-slider" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+f.default+'" '+
          'style="--pct:'+pct+'%"'+
          ' oninput="evadUpdateEstimator(\''+artId+'\',this,'+i+')"'+
        '/>'+
      '</div>';
    }).join('');
    html += '<div class="art-estimator">'+
      '<div class="art-estimator-header">'+
        '<div class="art-estimator-header-logo">'+
          '<div class="art-estimator-header-dots">'+
            '<div class="art-estimator-header-dot"></div>'+
            '<div class="art-estimator-header-dot"></div>'+
            '<div class="art-estimator-header-dot"></div>'+
          '</div>'+
          '<div class="art-estimator-header-name">'+d.estimator.title+'</div>'+
        '</div>'+
        '<div class="art-estimator-header-tag">Eva calcule</div>'+
      '</div>'+
      '<div class="art-estimator-body">'+
        '<div class="art-estimator-subtitle">'+d.estimator.subtitle+'</div>'+
        fields+
        '<div class="art-estimator-result-wrap">'+
          '<div class="art-estimator-result-label">Eva calcule pour vous</div>'+
          '<div class="art-estimator-result-val" id="ev-res-'+artId+'"></div>'+
          '<div class="art-estimator-result-detail" id="ev-det-'+artId+'"></div>'+
        '</div>'+
        '<div class="art-estimator-disclaimer">⚠ Estimation indicative — le montant réel dépend de votre dossier complet</div>'+
      '</div>'+
    '</div>';
  }

  // — Fait choc (rendu mais caché — dévoilé à 100% de lecture) —
  if(d.fact) {
    html += '<div class="art-fact-choc" id="fc-'+artId+'">'+
      '<div class="art-fact-choc-header">'+
        '<div class="art-fact-choc-ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>'+
        '<div class="art-fact-choc-label">Eva révèle — Le saviez-vous ?</div>'+
      '</div>'+
      '<div class="art-fact-choc-body">'+
        '<div class="art-fact-choc-stat">'+d.fact.stat+'</div>'+
        '<div class="art-fact-choc-text">'+d.fact.text+'</div>'+
        '<div class="art-fact-choc-source">Source : '+d.fact.source+'</div>'+
      '</div>'+
    '</div>';
  }

  // — Articles liés —
  if(d.related && d.related.length) {
    var relHtml = d.related.map(function(rid){
      var allArts = [];
      Object.values(EVAD_ARTICLES).forEach(function(arr){ allArts = allArts.concat(arr); });
      var ra = allArts.find(function(a){ return a.id===rid; });
      if(!ra) return '';
      return '<div class="art-related-item" onclick="evadShowArticle(\''+rid+'\')">'+
        '<div class="art-related-item-ico">'+ra.ico+'</div>'+
        '<div class="art-related-item-body">'+
          '<div class="art-related-item-title">'+ra.title.replace(/^[^—]+— /,'')+'</div>'+
          '<div class="art-related-item-sub">'+ra.sub+'</div>'+
        '</div>'+
        '<div class="art-related-item-arr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></div>'+
      '</div>';
    }).filter(Boolean).join('');
    if(relHtml) {
      html += '<div class="art-related">'+
        '<div class="art-related-label">Articles liés — Continuez votre lecture</div>'+
        '<div class="art-related-list">'+relHtml+'</div>'+
      '</div>';
    }
  }

  return html;
}


/* Checklist de fin d'article : mini hero en surbrillance + progression + conseil Portfolio */
function evadChecklistHero(artId){
  var d=(typeof EVAD_ENGAGE!=='undefined')?EVAD_ENGAGE[artId]:null; if(!d||!d.checklist) return '';
  var items=d.checklist.items.map(function(it){
    return '<div class="art-checklist-item" onclick="evadCheckItem(this,\''+artId+'\')"><div class="art-checklist-box"><svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="art-checklist-label">'+it+'</div></div>';
  }).join('');
  return '<div class="art-checklist evck" id="cl-'+artId+'">'
    +'<div class="evck-hd"><span class="evck-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>'
    +'<div><div class="evck-k">Mes démarches · avec EVA</div><div class="evck-t">'+d.checklist.title+'</div></div></div>'
    +'<div class="evck-pg"><div class="evck-bar"><i class="evck-fill"></i></div><b class="evck-n">0/'+d.checklist.items.length+' · 0 %</b></div>'
    +'<div class="evck-body">'+items+'</div>'
    +'<div class="art-checklist-result evck-res" id="cl-res-'+artId+'"></div>'
    +'<div class="evck-tip"><span>💡</span><p><b>Le conseil d\'EVA</b> : avec autant d\'articles, notez ces démarches dans votre <b>Portfolio</b>, rubrique <b>Tâches à réaliser</b>, pour vous organiser. C\'est un conseil, rien n\'est obligatoire.</p></div>'
    +'</div>';
}
function evadCheckItem(el, artId) {
  var box = el.querySelector('.art-checklist-box');
  box.classList.toggle('checked');
  var cl = document.getElementById('cl-'+artId);
  var total = cl.querySelectorAll('.art-checklist-item').length;
  var checked = cl.querySelectorAll('.art-checklist-box.checked').length;
  if(cl.classList.contains('evck')){
    var pc=Math.round(checked/total*100), f=cl.querySelector('.evck-fill'), n=cl.querySelector('.evck-n');
    if(f) f.style.width=pc+'%'; if(n) n.textContent=checked+'/'+total+' · '+pc+' %';
    cl.classList.toggle('done', checked===total);
    var r=document.getElementById('cl-res-'+artId);
    if(r) r.innerHTML = checked===total ? '🎉 Toutes vos démarches sont cochées. Bravo, vous êtes à jour !' : (checked ? 'Encore '+(total-checked)+' démarche'+(total-checked>1?'s':'')+' à faire, à votre rythme.' : '');
    return;
  }
  var res = document.getElementById('cl-res-'+artId);
  if(checked === total) {
    res.className = 'art-checklist-result eligible';
    res.innerHTML = '✅ Vous avez coché toutes les cases — vous semblez bien en règle. Posez vos questions à Eva pour confirmer votre situation spécifique.';
  } else if(checked >= Math.ceil(total/2)) {
    res.className = 'art-checklist-result partial';
    res.innerHTML = '⚠️ '+checked+'/'+total+' cases cochées — certains points méritent attention. Eva peut vous aider à sécuriser les cases manquantes.';
  } else if(checked > 0) {
    res.className = 'art-checklist-result not-eligible';
    res.innerHTML = '🔴 '+checked+'/'+total+' — des droits pourraient ne pas être respectés ou des démarches restent à faire. Consultez Eva maintenant.';
  } else {
    res.className = 'art-checklist-result';
  }
}

function evadUpdateEstimator(artId, slider, fieldIdx) {
  var d = EVAD_ENGAGE[artId];
  if(!d || !d.estimator) return;
  var pct = Math.round((slider.value - slider.min) / (slider.max - slider.min) * 100);
  slider.style.setProperty('--pct', pct+'%');
  var valEl = document.getElementById('ev-v-'+artId+'-'+fieldIdx);
  if(valEl) valEl.textContent = slider.value + ' ' + d.estimator.fields[fieldIdx].unit;
  var vals = d.estimator.fields.map(function(f,i){
    var s = document.querySelector('[oninput*="\''+artId+'\',this,'+i+'"]');
    return s ? parseFloat(s.value) : f.default;
  });
  try {
    var res = d.estimator.calc(vals);
    var rv = document.getElementById('ev-res-'+artId);
    var rd = document.getElementById('ev-det-'+artId);
    if(rv) rv.innerHTML = res.val;
    if(rd) rd.textContent = res.detail;
  } catch(e){}
}

function evadInitEstimator(artId) {
  var d = EVAD_ENGAGE[artId];
  if(!d || !d.estimator) return;
  var vals = d.estimator.fields.map(function(f){ return f.default; });
  try {
    var res = d.estimator.calc(vals);
    var rv = document.getElementById('ev-res-'+artId);
    var rd = document.getElementById('ev-det-'+artId);
    if(rv) rv.innerHTML = res.val;
    if(rd) rd.textContent = res.detail;
  } catch(e){}
}

// Barre de progression + déverrouillage fait choc
var _artProgressAnim = null;
function evadInitProgress(artId) {
  var scroll = document.getElementById('evad-art-scroll');
  var bar = document.getElementById('art-pb-'+artId);
  if(!scroll || !bar) return;
  var revealed = false;
  scroll.onscroll = function(){
    var max = scroll.scrollHeight - scroll.clientHeight;
    if(max <= 0) return;
    var pct = Math.min(100, Math.round(scroll.scrollTop / max * 100));
    bar.style.width = pct + '%';
    if(pct >= 95 && !revealed) {
      revealed = true;
      var fc = document.getElementById('fc-'+artId);
      if(fc) { fc.classList.add('visible'); fc.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    }
  };
}
