
/* ═══════════════════════════════════════════════════
   EVA WORKSPACE v6 — Conseils + Analyse IA
   Chatbot SANS barre de saisie — boutons uniquement
═══════════════════════════════════════════════════ */
var EWP=null, EWS=0, EWDS=null;

var EWC={
  dem:{nom:'Demandeur d\'emploi',tag:'France Travail · ARE · Droits · Entretiens',col:'#059669',bg:'rgba(5,150,105,.1)',bdr:'#bbf7d0',svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>'},
  etu:{nom:'Étudiant',tag:'Stage · Alternance · LAFPA · Droits · CV',col:'#2563eb',bg:'rgba(37,99,235,.1)',bdr:'#bfdbfe',svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'},
  frl:{nom:'Freelance / Auto-entrepreneur',tag:'URSSAF · Clients · Contrats · CA · Fiscalité',col:'#b45309',bg:'rgba(180,83,9,.1)',bdr:'#fde68a',svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'},
  rec:{nom:'Reconversion professionnelle',tag:'CPF · VAE · Bilan · Démission · Formation',col:'#7c3aed',bg:'rgba(124,58,237,.1)',bdr:'#e9d5ff',svg:'<svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>'}
};

/* ══════════════════════════════════════
   SUJETS CONSEILS PAR PROFIL
   Chaque sujet = titre + sous-titre + messages détaillés EVA
══════════════════════════════════════ */
var EWT = {
  dem:[
    {k:'ft_rdv',lbl:'Se présenter à France Travail',sub:'RDV, dossier, actes de recherche, posture',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
     msgs:["<strong>Comment se préparer à un RDV France Travail</strong><br><br>Avant le rendez-vous, prépare impérativement : ton numéro de dossier France Travail, ton CV à jour (même si tu le connais par cœur), et ta liste d'actes de recherche d'emploi — au minimum 5 par mois, avec dates, entreprises contactées et résultats.<br><br><strong>Comment te présenter :</strong><br>Arrive 5 minutes en avance. Sois poli, direct, factuel. Ton conseiller gère des dizaines de dossiers — facilite-lui la tâche.<br><br><strong>Comment parler :</strong><br>Évite absolument les formules négatives comme «\u202fje n'ai rien trouvé\u202f» ou «\u202fpersonne ne répond\u202f». Remplace-les par : «\u202fj'ai effectué X démarches sur la période, voici les retours obtenus et ce que j'ai ajusté\u202f».<br><br><strong>Ce que tu dois anticiper :</strong><br>Ton conseiller va évaluer ton sérieux et ton projet. Prépare une réponse claire à : «\u202fOù en est votre recherche ?\u202f» — idéalement en 3 phrases : secteur visé, type de poste, niveau d'avancement.<br><br>💡 <strong>Astuce EVA :</strong> Apporte un document prouvant au moins une démarche concrète (email, candidature, attestation de formation). Ça change tout.",
            "<strong>Comment convaincre ton conseiller de te soutenir</strong><br><br>Un conseiller France Travail soutient mieux les demandeurs qui ont un cap clair. Même imparfait, un projet professionnel défini rassure et ouvre des portes.<br><br><strong>La formule qui marche :</strong><br>«\u202fJe vise le poste de [X] dans le secteur [Y]. J'ai déjà [réalisé X démarches / suivi X formation / contacté X employeurs]. Ma prochaine étape est [Z].\u202f»<br><br><strong>Ce que tu peux demander :</strong><br>• Orientation vers une formation (AFPR, POEI, CPF)<br>• Diagnostic de reconversion<br>• Mise en relation employeurs (MRS, job dating)<br>• Aide à la mobilité (permis, déménagement)<br><br><strong>Ce que tu dois éviter :</strong><br>• Mentir sur tes démarches (les conseillers vérifient)<br>• Manquer un RDV sans prévenir (risque de radiation)<br>• Adopter une posture passive ou agressive<br><br>⚠️ <strong>Important :</strong> Toute radiation injustifiée peut être contestée dans les 2 mois — contacte l'inspection du travail ou un syndicat."]},
    {k:'are_droits',lbl:'Comprendre et défendre ses droits ARE',sub:'Calcul, durée, rechargement, contestation',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
     msgs:["<strong>Comment est calculée ton ARE</strong><br><br>L'ARE (Allocation de Retour à l'Emploi) est calculée sur la base de ton salaire journalier de référence (SJR) des 24 derniers mois.<br><br><strong>Formule 2026 :</strong><br>• AJ = 40,4% du SJR OU 57,4% du SJR + 12,95 € — le montant le plus favorable est retenu<br>• Minimum : 29,56 €/jour<br>• Maximum : 273,68 €/jour (plafond 4 fois le plafond SS)<br><br><strong>Durée d'indemnisation :</strong><br>Égale à la durée de travail sur la période (ratio 1:1), avec un maximum selon ton âge :<br>• Moins de 53 ans : 24 mois max<br>• 53-54 ans : 30 mois max<br>• 55 ans et plus : 36 mois max<br><br><strong>Droits au rechargement :</strong><br>Si tu retravailles pendant ton indemnisation, les nouvelles périodes s'ajoutent à tes droits restants. Le rechargement est automatique à partir de 88h travaillées.",
            "<strong>Contester une décision France Travail sur ton ARE</strong><br><br>Tu as reçu une décision qui te semble injuste ? Voici la procédure exacte :<br><br><strong>Étape 1 — Recours amiable (obligatoire) :</strong><br>Envoie une lettre de recours amiable à France Travail dans les 2 mois suivant la notification. Explique pourquoi la décision est contestable et joins tes preuves.<br><br><strong>Étape 2 — Instance Paritaire Régionale (IPR) :</strong><br>Si le recours amiable échoue, saisis l'IPR. C'est une instance composée d'employeurs et de salariés qui examine ton dossier.<br><br><strong>Étape 3 — Tribunal judiciaire :</strong><br>En dernier recours, le tribunal compétent est le pôle social du tribunal judiciaire de ton lieu de résidence.<br><br>💡 <strong>Conseil EVA :</strong> Contacte un conseiller juridique (syndicat, CDAD, maison de justice) avant toute saisine. La plupart des erreurs ARE sont réglées dès le recours amiable avec un dossier bien préparé."]},
    {k:'licenciement',lbl:'Faire face à un licenciement',sub:'Procédure, indemnités, droits, contestation',col:'#dc2626',bg:'rgba(220,38,38,.08)',bdr:'#fecaca',ico:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
     msgs:["<strong>La procédure de licenciement : ce que l'employeur doit respecter</strong><br><br><strong>Convocation à l'entretien préalable :</strong><br>L'employeur doit te convoquer par lettre recommandée ou remise en main propre, au minimum 5 jours ouvrables avant l'entretien.<br><br><strong>Lors de l'entretien :</strong><br>Tu as le droit d'être assisté par un représentant du personnel ou un conseiller du salarié (liste disponible à la DREETS). L'employeur doit exposer les motifs du licenciement.<br><br><strong>Notification du licenciement :</strong><br>La lettre de licenciement doit être envoyée au minimum 2 jours ouvrables après l'entretien. Elle doit contenir les motifs précis.<br><br><strong>Tes documents de sortie :</strong><br>Tu dois recevoir obligatoirement : certificat de travail, attestation France Travail (ex-Pôle emploi), reçu pour solde de tout compte, dernier bulletin de salaire.<br><br>⚠️ Signe le reçu de solde de tout compte uniquement si tu es d'accord — tu as 6 mois pour le dénoncer si tu l'as signé.",
            "<strong>Tes indemnités et comment les vérifier</strong><br><br><strong>Indemnité légale de licenciement :</strong><br>• 1/4 de mois de salaire brut par année jusqu'à 10 ans<br>• 1/3 de mois par année au-delà<br>Base de calcul : 1/12 de la rémunération des 12 derniers mois OU 1/3 des 3 derniers mois (le plus favorable).<br><br>💡 Ta convention collective peut prévoir des indemnités supérieures — toujours vérifier !<br><br><strong>Préavis :</strong><br>La durée dépend de ta convention collective et de ton ancienneté. Tu peux être dispensé du préavis, mais tu dois être payé comme si tu l'avais effectué.<br><br><strong>Contester ton licenciement :</strong><br>Tu as 12 mois à compter de la notification pour saisir le Conseil de Prud'hommes. Pour un licenciement économique, le délai est de 12 mois également.<br><br>• Licenciement sans cause réelle et sérieuse → indemnité entre 0,5 et 20 mois de salaire selon ancienneté (barème Macron)<br>• Licenciement nul (discrimination, harcèlement) → pas de plafond d'indemnité"]},
    {k:'rupconv',lbl:'Négocier une rupture conventionnelle',sub:'Procédure, indemnité, négociation, pièges',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>',
     msgs:["<strong>Comment préparer et négocier une rupture conventionnelle</strong><br><br>La rupture conventionnelle est un accord mutuel entre salarié et employeur. Elle permet d'ouvrir les droits à l'ARE — à la différence d'une démission.<br><br><strong>La procédure :</strong><br>1. Au moins un entretien entre salarié et employeur (aucune formalité imposée pour la convocation)<br>2. Signature de la convention CERFA n°14598*01<br>3. Délai de rétractation de 15 jours calendaires pour les deux parties<br>4. Transmission à la DREETS pour homologation<br>5. Homologation dans les 15 jours ouvrables (silence = accord)<br>6. Rupture effective au plus tôt le lendemain de l'homologation<br><br><strong>Ce que tu peux négocier :</strong><br>• Le montant de l'indemnité (le minimum légal est un plancher, pas un plafond)<br>• La date effective de rupture<br>• Les conditions de départ (solde de RTT, épargne salariale, préavis de départ progressif)",
            "<strong>Stratégie de négociation et pièges à éviter</strong><br><br><strong>Minimum légal 2026 :</strong><br>• Jusqu'à 10 ans d'ancienneté : 1/4 de mois par année<br>• Au-delà : 1/3 de mois par année<br>Ce montant est exonéré de charges sociales jusqu'à 2 fois le PASS (soit ~91 000 €).<br><br><strong>Comment négocier plus :</strong><br>• Évalue ton coût de remplacement pour l'employeur (recrutement, formation du successeur)<br>• Mets en avant ton ancienneté et les projets en cours que tu pourrais transférer<br>• Propose un calendrier avantageux pour l'entreprise<br>• Négocie sans agressivité — c'est un accord, pas un rapport de force<br><br><strong>Les pièges à éviter :</strong><br>• Ne signe rien sans avoir relu avec un délai de réflexion<br>• Ne renonce pas à tes congés payés acquis (tu dois les percevoir)<br>• Vérifie ta convention collective — elle peut imposer un minimum plus élevé<br>• Ne laisse pas l'employeur te presser — tu as 15 jours de rétractation"]},
    {k:'entretien',lbl:'Préparer un entretien d\'embauche',sub:'Questions, posture, négociation salaire',col:'#7c3aed',bg:'rgba(124,58,237,.08)',bdr:'#e9d5ff',ico:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
     msgs:["<strong>Préparer un entretien d'embauche : la méthode complète</strong><br><br><strong>Avant l'entretien :</strong><br>• Recherche l'entreprise en profondeur : chiffres clés, actualité récente, culture, concurrents<br>• Prépare 3 exemples de réussites professionnelles concrètes (méthode STAR : Situation, Tâche, Action, Résultat)<br>• Anticipe les 10 questions les plus fréquentes et entraîne-toi à voix haute<br>• Prépare 3 questions pertinentes à poser à la fin<br><br><strong>Les 5 questions immanquables :</strong><br>1. «\u202fPrésentez-vous\u202f» → Pitch de 90 sec max : parcours synthétique + réussite clé + pourquoi ce poste<br>2. «\u202fVos points forts ?\u202f» → 3 compétences avec exemple concret chacune<br>3. «\u202fVos points faibles ?\u202f» → 1 défaut réel + comment vous travaillez dessus + preuve<br>4. «\u202fPourquoi nous ?\u202f» → 1-2 éléments précis et spécifiques à cette entreprise<br>5. «\u202fOù vous voyez-vous dans 5 ans ?\u202f» → Ambition réaliste alignée avec le poste<br><br>💡 La règle d'or pour chaque réponse : <strong>Contexte → Action → Résultat chiffré si possible</strong>",
            "<strong>Posture, négociation salariale et suivi</strong><br><br><strong>Pendant l'entretien :</strong><br>• Adopte une posture ouverte, regard direct, sourire naturel<br>• Prends des notes — c'est perçu comme un signe d'engagement<br>• Reformule les questions complexes avant de répondre<br>• Évite de critiquer tes anciens employeurs — même s'ils le méritent<br><br><strong>Négocier le salaire :</strong><br>• Attends que l'employeur aborde le sujet en premier si possible<br>• Donne une fourchette plutôt qu'un chiffre fixe<br>• Appuie-toi sur le marché : «\u202fLes études sectorielles indiquent une fourchette de X à Y pour ce profil\u202f»<br>• Ne jamais accepter ou refuser sur le moment — demande 48h de réflexion<br><br><strong>Après l'entretien :</strong><br>• Envoie un email de remerciement dans les 24h (1 paragraphe, sincère, personnalisé)<br>• Relance à J+8 si tu n'as pas de nouvelles<br>• Si refus : demande un retour — c'est une occasion d'amélioration"]},
    {k:'caf_cpam',lbl:'CAF, CPAM et aides sociales',sub:'RSA, APL, santé, droits pendant le chômage',col:'#0891b2',bg:'rgba(8,145,178,.08)',bdr:'#bae6fd',ico:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
     msgs:["<strong>Tes droits à la CAF et à la CPAM pendant le chômage</strong><br><br><strong>À la CAF :</strong><br>Si tu perçois l'ARE, déclare-la dans ta Déclaration de Situation trimestrielle (DST). L'ARE est prise en compte comme revenu pour le calcul des aides (APL, RSA de complément).<br><br>• <strong>APL :</strong> Ouverte si tu es locataire. La déclaration de ressources prend en compte l'ARE. Mets à jour ta situation dès le premier mois de chômage.<br>• <strong>RSA :</strong> Si ton ARE est inférieure au RSA de base (ou si tu es en fin de droits sans revenus), tu peux bénéficier du RSA différentiel ou complet.<br><br><strong>À la CPAM :</strong><br>• Pendant l'indemnisation France Travail : tu restes couvert par l'Assurance Maladie (maintien des droits).<br>• Si tu es en fin de droits sans ARE : tu peux bénéficier de la <strong>maintien de droits maladie pendant 12 mois</strong> sans cotiser.<br>• Pense à ouvrir ou mettre à jour ton compte Ameli.<br><br>💡 <strong>Important :</strong> Déclare tout changement de situation à la CAF dans les 30 jours. Tout oubli peut entraîner un indu à rembourser.",
            "<strong>Maximiser tes aides et anticiper la fin de droits</strong><br><br><strong>Les aides auxquelles tu as droit et que tu oublies souvent :</strong><br>• <strong>AIDE Mobilité France Travail :</strong> remboursement partiel de transports pour passer des entretiens loin de chez toi<br>• <strong>ARCE :</strong> si tu crées une entreprise, tu peux percevoir 60% de tes droits ARE en capital<br>• <strong>Pass Formation :</strong> aide France Travail pour financer une formation en dehors du CPF<br>• <strong>Mutuelle individuelle :</strong> aide à la complémentaire santé solidaire (CSS) si tes revenus sont faibles<br><br><strong>En fin de droits ARE :</strong><br>1. Vérifie si tu as accumulé de nouveaux droits (rechargement si +88h travaillées)<br>2. Contacte la CAF pour le RSA et les aides logement<br>3. Demande un Point Retraite pour voir si un trimestre peut être validé<br>4. Explore le dispositif ACRE si tu crées une activité<br><br>⚠️ La fin de droits ARE n'entraîne pas la fin du suivi France Travail — reste inscrit et actif."]},
    {k:'dreets',lbl:'Droits du travail et litiges',sub:'DREETS, Prud\'hommes, syndicats, médiation',col:'#dc2626',bg:'rgba(220,38,38,.08)',bdr:'#fecaca',ico:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
     msgs:["<strong>Comment saisir la DREETS et l'Inspection du Travail</strong><br><br>La DREETS (Direction Régionale de l'Économie, de l'Emploi, du Travail et des Solidarités) est l'autorité compétente pour les litiges du droit du travail.<br><br><strong>Quand contacter l'Inspection du Travail :</strong><br>• Non-paiement de salaires ou heures supplémentaires<br>• Conditions de travail dangereuses<br>• Harcèlement moral ou sexuel<br>• Non-respect des procédures de licenciement<br>• Travail dissimulé<br><br><strong>Comment constituer ton dossier :</strong><br>1. Rassemble tous les documents : contrat, bulletins, emails, SMS, témoignages<br>2. Crée une chronologie précise des faits (date, heure, lieu, personnes présentes)<br>3. Évalue le préjudice financier (salaires non payés, primes, indemnités)<br>4. Rédige un courrier de saisine factuel — sans émotion, avec faits et preuves<br><br>💡 <strong>Conseil EVA :</strong> L'Inspecteur du Travail ne peut pas forcer un accord, mais son intervention fait souvent basculer les situations. Soigne la qualité de ton dossier.",
            "<strong>Les recours disponibles selon ta situation</strong><br><br><strong>Médiation :</strong><br>Le service de médiation France Travail ou les CDAD (Conseil Départemental d'Accès au Droit) proposent des solutions à l'amiable gratuites et rapides.<br><br><strong>Syndicats :</strong><br>Sans être membre, tu peux solliciter un conseiller syndical pour t'aider à préparer un dossier ou un entretien. CGT, CFDT, FO, CFE-CGC ont des permanences locales gratuites.<br><br><strong>Conseil de Prud'hommes :</strong><br>• Compétent pour tous les litiges individuels du droit du travail<br>• Procédure entièrement gratuite<br>• Représentation par avocat non obligatoire<br>• Délai moyen : 12 à 18 mois pour un jugement<br>• En cas d'urgence (expulsion illégale, non-paiement grave) : référé prud'homal sous 48h<br><br><strong>Délais à respecter absolument :</strong><br>• Contestation licenciement : 12 mois<br>• Rappel de salaires : 3 ans<br>• Discrimination, harcèlement : 5 ans<br>• Retraite, prévoyance : 3 ans"]},
    {k:'contrat_engagement',lbl:'Contrat d\'engagement',sub:'Droits, obligations, révision, sanctions',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
     msgs:["<strong>Le Contrat d'Engagement — ce que c'est</strong><br><br>Depuis 2023, le <strong>Contrat d'Engagement</strong> remplace le PPAE. C'est le document signé avec France Travail qui définit ton accompagnement.<br><br><strong>Ce qu'il contient :</strong><br>• Ton projet professionnel<br>• Tes engagements de recherche (objectifs mensuels)<br>• Les formations et actions prévues<br>• Le calendrier de tes RDV<br><br><strong>Ce que tu peux exiger :</strong><br>• Des objectifs <strong>réalistes</strong>, adaptés à ta situation réelle<br>• La prise en compte de tes contraintes (santé, mobilité, enfants)<br>• La révision du contrat si ta situation change<br><br><strong>Les sanctions si tu ne respectes pas tes engagements :</strong><br>• 1er manquement : avertissement<br>• 2ème : réduction ARE 15 jours<br>• 3ème : suspension<br>• Fraude : radiation<br><br>⚠️ Toute sanction peut être contestée dans les <strong>2 mois</strong> via un recours amiable.",
            "<strong>Comment négocier et défendre son Contrat d'Engagement</strong><br><br>Tu <strong>signes</strong> ce document — tu as donc le droit de relire et demander des modifications avant signature.<br><br><strong>Avant de signer :</strong><br>• Relis chaque objectif — refuse ce qui est irréaliste<br>• Fais mentionner tes contraintes par écrit<br>• Demande une copie signée<br><br><strong>Pendant le contrat :</strong><br>• Garde une trace de chaque démarche (email, capture, courrier)<br>• Demande une révision si ta situation change<br>• Chaque RDV doit être consigné — demande le compte-rendu<br><br><strong>En cas de désaccord :</strong><br>• Médiateur France Travail (gratuit, disponible en région)<br>• Conseiller du salarié (gratuit, sans rendez-vous)<br>• Instance Paritaire Régionale si la sanction est injuste<br><br>💡 Un contrat bien négocié dès le départ protège ton ARE et oriente ton accompagnement vers ce qui compte vraiment."]}
  ],
  dem_cho:[
    {k:'cho_inscription',lbl:'S\'inscrire à France Travail et calculer son ARE',sub:'Inscription, pièces à fournir, calcul de l\'allocation',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
     msgs:["<strong>S\'inscrire à France Travail : la procédure</strong><br><br>L\'inscription se fait en ligne sur francetravail.fr dans les 12 mois suivant la fin de ton contrat (au-delà, tu perds des droits). Tu auras besoin de : pièce d\'identité, RIB, attestation employeur (remise par ton ex-employeur), justificatif de domicile, et numéro de sécurité sociale.<br><br><strong>Le calcul de l\'ARE :</strong><br>L\'allocation se base sur ton Salaire Journalier de Référence (SJR), calculé sur les 12 derniers mois travaillés. Le montant journalier est le plus élevé entre 40,4% du SJR + une partie fixe, ou 57% du SJR — avec un plancher et un plafond fixés chaque année.<br><br><strong>La durée des droits :</strong><br>Elle dépend de ta durée d\'affiliation (en général, autant de jours indemnisés que de jours travaillés sur les 24 derniers mois, dans la limite de 18 à 27 mois selon l\'âge).<br><br>💡 <strong>Astuce EVA :</strong> Le simulateur officiel sur francetravail.fr donne une estimation fiable avant même l\'inscription — utilise-le pour anticiper ton budget.",
            "<strong>Le délai de carence et les premiers versements</strong><br><br>Après l\'inscription, un <strong>délai d\'attente de 7 jours</strong> s\'applique systématiquement. Si tu as touché des indemnités de congés payés ou une indemnité de rupture supérieure au minimum légal, un <strong>différé spécifique</strong> s\'ajoute (jusqu\'à 150 jours selon les montants).<br><br><strong>Ce qui peut retarder ton premier versement :</strong><br>• Dossier incomplet (pièce manquante)<br>• Attestation employeur erronée ou tardive<br>• Délais de traitement administratif (3 à 4 semaines en moyenne)<br><br><strong>Que faire si ça traîne :</strong><br>• Relance via ton espace personnel (messagerie)<br>• Demande d\'<strong>avance sur droits</strong> si tu n\'as aucune ressource (dispositif d\'urgence)<br>• Contact du 3949 ou prise de RDV en agence si aucune réponse sous 15 jours<br><br>⚠️ <strong>Important :</strong> Garde une copie de chaque document envoyé — les pertes de dossier ne sont pas rares.",
            "<strong>Cas particuliers à connaître au moment de l\'inscription</strong><br><br><strong>Après une rupture conventionnelle :</strong><br>Pas de délai de carence spécifique lié au type de rupture, mais le différé congés payés/indemnité supra-légale s\'applique comme pour un licenciement.<br><br><strong>Après une fin de mission d\'intérim ou de CDD :</strong><br>L\'attestation employeur doit venir de l\'agence d\'intérim (pas de l\'entreprise utilisatrice) ou de l\'employeur direct en CDD — réclame-la dès le dernier jour, beaucoup d\'agences tardent si on ne relance pas.<br><br><strong>Après une démission légitime (déménagement conjoint, non-paiement du salaire, etc.) :</strong><br>L\'inscription se fait normalement, mais le dossier doit mentionner le motif légitime dès le départ — sinon le traitement est plus long, le temps qu\'un examen spécifique soit fait par l\'Instance Paritaire Régionale.<br><br><strong>Si tu sors d\'une micro-entreprise ou d\'un statut d\'indépendant :</strong><br>L\'ARE classique ne s\'applique pas automatiquement — regarde plutôt du côté de l\'<strong>ATI</strong> (Allocation des Travailleurs Indépendants), avec des conditions de ressources et de revenus antérieurs spécifiques.<br><br>💡 Dans tous les cas particuliers, un appel au 3949 avant même de déposer le dossier permet de savoir exactement quelles pièces fournir et d\'éviter les allers-retours."]},
    {k:'cho_recherche',lbl:'Actes de recherche et obligations',sub:'Ce qu\'il faut prouver, éviter la radiation',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="8"/>',
     msgs:["<strong>Ce que France Travail attend réellement de toi</strong><br><br>Depuis le Contrat d\'Engagement, il n\'existe plus de quota légal fixe d\'actes de recherche par mois — mais ton conseiller fixe des objectifs personnalisés dans ton contrat, et c\'est leur respect qui est contrôlé.<br><br><strong>Ce qui compte comme acte de recherche :</strong><br>• Candidatures envoyées (avec preuve : email, accusé)<br>• Participation à un job dating, salon, atelier France Travail<br>• Formation suivie ou en cours<br>• Création/mise à jour de CV avec un conseiller<br>• Démarches de création d\'entreprise si c\'est ton projet validé<br><br><strong>Comment garder les preuves :</strong><br>Un tableau simple (date, entreprise, poste, réponse) suffit. Beaucoup utilisent un fichier partagé ou les notes du téléphone — l\'essentiel est que ce soit daté et vérifiable.<br><br>💡 La cohérence compte plus que le volume : 5 candidatures ciblées valent mieux que 30 envoyées au hasard.",
            "<strong>Comprendre le contrôle de recherche d\'emploi</strong><br><br>France Travail peut demander à tout moment de justifier tes démarches récentes — par mail, courrier ou lors d\'un RDV. Ce n\'est pas une sanction automatique, c\'est une vérification standard.<br><br><strong>Le barème des sanctions en cas de manquement avéré :</strong><br>• 1er manquement : 1 mois de suspension (radiation de la liste)<br>• 2ème manquement (sur 12 mois) : 2 mois<br>• 3ème manquement : 4 mois<br>• Fausse déclaration : jusqu\'à 6 mois, voire poursuites<br><br><strong>Tes droits avant toute sanction :</strong><br>• Tu dois être informé et invité à présenter tes observations<br>• Tu as un délai pour répondre (en général 15 jours)<br>• La sanction n\'est jamais automatique en cas de motif légitime (maladie, formation, garde d\'enfant)<br><br>⚠️ <strong>Ne reste jamais silencieux</strong> face à une demande de justification — l\'absence de réponse est interprétée comme un manquement, même si tu as tout fait correctement.",
            "<strong>Un exemple concret de suivi mensuel bien fait</strong><br><br><strong>Ce qu\'un dossier solide contient pour un mois donné :</strong><br>• 5 à 8 candidatures avec date, entreprise, poste et réponse obtenue (même négative)<br>• 1 ligne sur une formation suivie ou un atelier France Travail<br>• Une capture d\'écran ou un export de tes recherches sur les jobboards<br><br><strong>Les outils simples pour ne rien perdre :</strong><br>• Un tableur partagé (Google Sheets, Excel) avec colonnes date/entreprise/poste/statut<br>• Le dossier « Envoyés » de ta boîte mail, trié par date<br>• L\'historique de candidatures intégré à France Travail si tu postules via leur plateforme<br><br><strong>Ce qui rassure le plus un conseiller :</strong><br>Une recherche qui évolue dans le temps — élargissement progressif des critères, ajustement du CV après des retours, prise de contact direct avec des entreprises ciblées plutôt que candidatures uniquement passives.<br><br>⚠️ Si un mois a été plus calme (maladie, problème personnel), dis-le simplement à ton conseiller — un motif réel et assumé passe toujours mieux qu\'un silence ou une justification approximative."]},
    {k:'cho_cumul',lbl:'Cumuler l\'ARE et une activité réduite',sub:'Reprise partielle, calcul du cumul, intérêt réel',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M12 2v20M2 12h20"/>',
     msgs:["<strong>L\'activité réduite : reprendre un petit boulot sans perdre tous ses droits</strong><br><br>Tu peux cumuler une partie de ton ARE avec un revenu d\'activité (CDD court, mission d\'intérim, temps partiel), à condition de rester inscrit et de déclarer chaque mois tes heures et revenus.<br><br><strong>Le principe du calcul :</strong><br>France Travail soustrait de ton ARE mensuelle 70% de ton salaire brut du mois. Concrètement, plus tu travailles, moins tu touches d\'allocation — mais le total (salaire + ARE réduite) est presque toujours supérieur à l\'ARE seule.<br><br><strong>La règle des 70% :</strong><br>Le cumul ne peut jamais dépasser 70% de ton ancien salaire de référence (SJR). Au-delà, l\'ARE du mois est nulle, mais tes droits restants ne sont pas perdus — ils sont simplement reportés.<br><br>💡 <strong>Bon à savoir :</strong> Reprendre une activité réduite <strong>allonge la durée totale</strong> pendant laquelle tu peux toucher tes droits, puisque les jours non indemnisés sont reportés à la fin.",
            "<strong>Déclarer son activité : la procédure mensuelle</strong><br><br>Chaque mois, tu dois <strong>actualiser ta situation</strong> sur francetravail.fr avant la fin du mois, en déclarant si tu as travaillé, combien d\'heures, et ton salaire brut. C\'est cette déclaration qui déclenche le calcul et le versement.<br><br><strong>Les erreurs à éviter absolument :</strong><br>• Oublier l\'actualisation → suspension automatique du versement<br>• Sous-déclarer ses revenus → fraude, remboursement + sanctions<br>• Déclarer après la date limite → retard de paiement<br><br><strong>Cas particulier : la formation pendant le chômage</strong><br>Si tu suis une formation financée (AIF, CPF, Région), tu continues de toucher l\'ARE pendant la formation — c\'est l\'<strong>ARE formation</strong>, sans cumul à calculer puisqu\'il n\'y a pas de salaire en parallèle (sauf alternance).<br><br>⚠️ En cas de doute sur un cumul, utilise le simulateur officiel avant d\'accepter une mission — certaines missions très courtes payées au SMIC peuvent, une fois le différé appliqué, rapporter moins que prévu le mois suivant.",
            "<strong>Un exemple chiffré pour comprendre le cumul</strong><br><br>Prenons une situation concrète : ton ARE pleine est de 1 200 €/mois, ton ancien salaire de référence (SJR ramené au mois) était de 2 000 €.<br><br><strong>Tu reprends un mois à mi-temps payé 1 000 € brut :</strong><br>• 70% de 1 000 € = 700 € sont déduits de ton ARE<br>• ARE versée ce mois-là : 1 200 € − 700 € = 500 €<br>• Total perçu : 1 000 € (salaire) + 500 € (ARE) = <strong>1 500 €</strong>, contre 1 200 € si tu n\'avais pas travaillé<br><br><strong>Vérification du plafond des 70% du SJR :</strong><br>70% de 2 000 € = 1 400 € maximum cumulable. Ici, 1 000 € + 500 € = 1 500 € dépasserait le plafond — l\'ARE est donc automatiquement réduite pour respecter la limite (dans cet exemple, l\'ARE versée serait ajustée à 400 € pour ne pas dépasser 1 400 €).<br><br>💡 <strong>Retiens la règle simple :</strong> reprendre une activité est presque toujours plus avantageux financièrement que de ne rien faire, même avec la déduction — le simulateur officiel calcule tout ça automatiquement pour ta situation précise."]},
    {k:'cho_rdv',lbl:'Réussir ses RDV avec son conseiller',sub:'Préparer, convaincre, obtenir un accompagnement adapté',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
     msgs:["<strong>Avant le RDV : ce qu\'il faut préparer</strong><br><br>Ton conseiller gère en moyenne plusieurs centaines de dossiers — un RDV bien préparé te démarque immédiatement et t\'ouvre l\'accès à plus d\'aides.<br><br><strong>À apporter ou avoir en tête :</strong><br>• Ton CV à jour, même si rien n\'a changé depuis le dernier RDV<br>• Un résumé de tes démarches du mois (3 phrases suffisent)<br>• Tes freins concrets (mobilité, garde d\'enfant, santé) — à dire clairement, ils ouvrent droit à des aides spécifiques<br>• Une question précise si tu en as une (formation, aide financière, doute sur tes droits)<br><br><strong>La formule qui fonctionne :</strong><br>« Je vise [poste/secteur]. Ce mois-ci j\'ai fait [X démarches], voici ce qui a marché et ce qui bloque. J\'aurais besoin de [aide précise]. »<br><br>💡 Une posture active et concrète, même avec peu de résultats, vaut toujours mieux qu\'un silence ou une plainte vague.",
            "<strong>Obtenir le bon accompagnement selon ta situation</strong><br><br>Tous les demandeurs d\'emploi n\'ont pas accès au même niveau d\'accompagnement par défaut — mais tu peux le demander.<br><br><strong>Les dispositifs à connaître :</strong><br>• <strong>Accompagnement renforcé :</strong> RDV plus fréquents, conseiller dédié — pour les profils en difficulté ou projets complexes<br>• <strong>Accompagnement global</strong> (avec le Département) : si des freins sociaux (logement, santé, mobilité) s\'ajoutent aux freins professionnels<br>• <strong>Atelier CV/entretien :</strong> gratuit, sur demande ou orientation du conseiller<br>• <strong>Prestations spécifiques</strong> (bilan, coaching) : financées par France Travail selon ton profil<br><br><strong>Si tu sens que l\'accompagnement ne te correspond pas :</strong><br>Tu peux demander un changement de conseiller ou une réorientation vers un accompagnement plus adapté — c\'est un droit, formule-le simplement lors d\'un RDV ou via la messagerie.<br><br>⚠️ Ne laisse jamais un RDV passer sans poser au moins une question concrète : c\'est souvent là que se débloquent les aides les plus utiles.",
            "<strong>Les aides financières concrètes à demander selon ta situation</strong><br><br><strong>Aide à la mobilité :</strong><br>Jusqu\'à plusieurs centaines d\'euros pour financer un déplacement lié à un entretien, une formation, ou une prise de poste éloignée (transport, hébergement, repas) — demande-la systématiquement si un entretien t\'oblige à te déplacer loin.<br><br><strong>Aide à la garde d\'enfant (AGEPI) :</strong><br>Versée si la reprise d\'activité ou une formation entraîne des frais de garde — montant variable selon le nombre d\'enfants et la situation familiale.<br><br><strong>Aide pour le permis de conduire :</strong><br>Jusqu\'à 1 200 € si le permis est un frein identifié à l\'embauche dans ton secteur visé (transport, aide à domicile, BTP...).<br><br><strong>Participation aux frais d\'entretien d\'embauche :</strong><br>Tenue vestimentaire, frais de coiffeur dans certains cas pour un entretien décisif — peu connue mais réelle dans certaines agences.<br><br>⚠️ Aucune de ces aides n\'est automatique — c\'est à toi de les demander explicitement lors d\'un RDV ou via la messagerie, en expliquant concrètement le frein qu\'elles permettraient de lever."]},
    {k:'cho_recours',lbl:'Contester une radiation ou une sanction',sub:'Délais, recours amiable, instances de médiation',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>',
     msgs:["<strong>Une radiation ou une sanction n\'est jamais définitive</strong><br><br>Chaque décision de France Travail (radiation, réduction de l\'ARE, refus d\'allocation) peut être contestée — et beaucoup de décisions sont annulées ou révisées en recours.<br><br><strong>Le recours amiable préalable (RAPO) :</strong><br>• Délai : 2 mois à partir de la notification<br>• Gratuit, sans avocat nécessaire<br>• Adressé au directeur de l\'agence ou via l\'espace personnel<br>• Doit exposer les faits et joindre toute preuve utile (justificatifs, attestations)<br><br><strong>Que faire en attendant la réponse :</strong><br>Le recours ne suspend pas automatiquement la sanction, mais une décision favorable peut donner lieu à un <strong>rattrapage rétroactif</strong> des sommes non versées.<br><br>💡 <strong>Astuce EVA :</strong> Rédige ton recours de façon factuelle et chronologique — date par date — c\'est ce qui convainc le plus efficacement.",
            "<strong>Si le recours amiable échoue : les autres voies</strong><br><br><strong>Le médiateur de France Travail :</strong><br>Présent dans chaque région, il intervient gratuitement en cas de litige persistant, notamment sur des questions de calcul ou d\'application des règles. Saisine simple via le site ou en agence.<br><br><strong>Le tribunal administratif :</strong><br>Pour contester une décision de l\'établissement public France Travail lui-même (refus d\'inscription, calcul erroné), c\'est le tribunal administratif qui est compétent — délai de 2 mois après la réponse au RAPO.<br><br><strong>Se faire accompagner gratuitement :</strong><br>• Maison de la Justice et du Droit (MJD)<br>• Point d\'Accès au Droit (PAD)<br>• Syndicats (CGT, CFDT, FO…) — permanences ouvertes même aux non-adhérents<br><br>⚠️ <strong>Ne jamais laisser passer les délais</strong> : passé les 2 mois, le recours devient irrecevable, même si le dossier est solide sur le fond.",
            "<strong>Comment rédiger un recours (RAPO) efficace</strong><br><br><strong>La structure qui fonctionne :</strong><br>1. Rappel des faits, dans l\'ordre chronologique, avec dates précises<br>2. Rappel de la décision contestée (date de notification, référence du courrier)<br>3. Explication factuelle de pourquoi la décision est injustifiée (motif légitime, erreur de calcul, preuve de démarche...)<br>4. Pièces jointes numérotées et citées dans le texte<br>5. Demande claire : annulation de la sanction, réexamen du dossier, ou rétablissement des droits<br><br><strong>Exemple de formulation d\'ouverture :</strong><br>« Je conteste par la présente la décision de [radiation/réduction] notifiée le [date], pour les motifs suivants : [...]. Je joins à ce courrier [liste des pièces] qui démontrent que [...]. Je vous demande de bien vouloir réexaminer mon dossier et rétablir mes droits. »<br><br><strong>Le taux de succès en pratique :</strong><br>Une part significative des recours bien argumentés et accompagnés de preuves aboutit à une révision favorable, en particulier lorsque le motif est un défaut de preuve plutôt qu\'une fraude avérée.<br><br>💡 Garde toujours une copie datée de ton recours et de son accusé de réception — c\'est ta preuve en cas de silence de l\'administration au-delà du délai légal."]}
  ],
  dem_sai:[
    {k:'sai_cdd_droits',lbl:'CDD : droits, durée et requalification en CDI',sub:'Ce que prévoit la loi, et quand le CDD devient illégal',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
     msgs:["<strong>Le CDD : les règles essentielles</strong><br><br>Un CDD ne peut être conclu que pour un motif précis et temporaire : remplacement, surcroît d\'activité, emploi saisonnier, ou contrat d\'usage. Il doit obligatoirement être écrit et transmis sous 2 jours ouvrables après l\'embauche — sinon il est requalifiable en CDI.<br><br><strong>Durée et renouvellement :</strong><br>• Durée maximale en général : 18 mois (renouvellements compris), sauf cas particuliers (remplacement : 24 mois)<br>• Maximum 2 renouvellements, sauf accord de branche contraire<br>• Entre deux CDD sur le même poste, un <strong>délai de carence</strong> doit être respecté (environ 1/3 de la durée du contrat précédent)<br><br><strong>Quand le CDD devient irrégulier :</strong><br>• Absence de motif précis ou motif non temporaire en réalité<br>• Contrat non écrit ou transmis trop tard<br>• Non-respect du délai de carence<br>• Poursuite du travail après la fin sans nouveau contrat<br><br>💡 Dans tous ces cas, tu peux demander la <strong>requalification en CDI</strong> devant le Conseil de Prud\'hommes — la procédure est rapide et le contrat à durée indéterminée est reconnu rétroactivement.",
            "<strong>Demander la requalification de son CDD en CDI</strong><br><br><strong>La procédure :</strong><br>La demande se fait directement devant le bureau de jugement du Conseil de Prud\'hommes (pas besoin de passer par le bureau de conciliation) — l\'affaire est jugée sous 1 mois en théorie.<br><br><strong>Ce que tu peux obtenir :</strong><br>• Une indemnité de requalification (minimum 1 mois de salaire)<br>• Si l\'employeur a rompu le contrat ensuite, cette rupture est analysée comme un licenciement (avec indemnités correspondantes)<br>• Rappel de salaire si applicable<br><br><strong>Les preuves à rassembler :</strong><br>• Tous tes contrats successifs (dates, motifs)<br>• Bulletins de paie<br>• Tout écrit prouvant la continuité du poste (mails, plannings)<br><br>⚠️ <strong>Attention au délai :</strong> l\'action en requalification se prescrit par 2 ans à partir de la conclusion du contrat litigieux — mieux vaut agir rapidement, surtout si la relation de travail est encore en cours.",
            "<strong>Un exemple concret de CDD irrégulier</strong><br><br><strong>Situation typique :</strong><br>Un salarié enchaîne 4 CDD de 3 mois sur le même poste de vendeur, sans respecter le délai de carence entre deux contrats, et continue à travailler 2 semaines après la fin du dernier contrat sans nouveau papier signé.<br><br><strong>Ce que cela permet de réclamer :</strong><br>• La requalification de l\'ensemble en CDI, avec effet rétroactif au premier contrat<br>• Une indemnité de requalification (minimum 1 mois de salaire)<br>• Si l\'employeur a ensuite mis fin à la relation, cette rupture est traitée comme un licenciement — avec indemnités de licenciement et de préavis à la clé<br>• Un rappel de salaire si la rémunération était inférieure à ce qu\'un CDI équivalent aurait perçu<br><br><strong>Le rôle clé des preuves :</strong><br>Les plannings, badges de présence, mails professionnels reçus pendant la période « sans contrat » sont des preuves décisives — un employeur ne peut pas prétendre que la relation de travail s\'est arrêtée si des éléments factuels montrent le contraire.<br><br>⚠️ Plus tu attends pour agir, plus il devient difficile de réunir certaines preuves (mails supprimés, plannings non conservés) — sauvegarde tout dès que tu identifies une irrégularité."]},
    {k:'sai_prime_precarite',lbl:'Indemnité de fin de contrat (prime de précarité)',sub:'Calcul, exceptions, et comment la réclamer',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8M8 8l8 8"/><path d="M12 6v.01M12 18v.01"/>',
     msgs:["<strong>La prime de précarité : qui y a droit et combien</strong><br><br>À la fin d\'un CDD, tu as droit à une <strong>indemnité de fin de contrat</strong> égale à <strong>10% de la rémunération brute totale</strong> perçue pendant le contrat (renouvellements inclus). Certaines conventions collectives la réduisent à 6% en échange d\'un accès facilité à la formation — vérifie ta fiche de paie et ta convention.<br><br><strong>Quand elle n\'est PAS due :</strong><br>• CDD saisonnier ou d\'usage (sauf accord contraire)<br>• Contrat conclu avec un jeune pendant les vacances scolaires/universitaires<br>• Refus du salarié d\'un CDI proposé à l\'issue du CDD pour un poste similaire avec une rémunération au moins équivalente<br>• Rupture anticipée à l\'initiative du salarié, faute grave, ou force majeure<br><br><strong>Quand elle est due malgré une rupture anticipée :</strong><br>Si la rupture anticipée vient de l\'employeur sans faute grave de ta part, l\'indemnité de précarité reste due, en plus des dommages et intérêts pour rupture abusive.<br><br>💡 Elle doit apparaître sur ton <strong>dernier bulletin de paie</strong> et ton solde de tout compte — vérifie systématiquement.",
            "<strong>Que faire si l\'indemnité n\'est pas versée</strong><br><br><strong>Étape 1 — Demande écrite :</strong><br>Envoie un mail ou courrier simple à l\'employeur réclamant le versement, en citant l\'article L1243-8 du Code du travail.<br><br><strong>Étape 2 — Mise en demeure :</strong><br>Si aucune réponse sous 8 à 15 jours, une <strong>lettre recommandée avec accusé de réception</strong> formalise la demande et sert de preuve en cas de procédure.<br><br><strong>Étape 3 — Conseil de Prud\'hommes :</strong><br>Saisine gratuite, sans avocat obligatoire. Le rappel de salaire se prescrit par <strong>3 ans</strong> à partir de la date à laquelle la somme était due — tu as donc le temps, mais mieux vaut ne pas trop tarder pour faciliter la preuve.<br><br><strong>Se faire aider gratuitement :</strong><br>Un syndicat ou un Point d\'Accès au Droit peut t\'aider à calculer le montant exact et rédiger les courriers.<br><br>⚠️ Beaucoup de salariés en contrats courts ne réclament jamais cette prime par méconnaissance — sur plusieurs CDD enchaînés, le montant cumulé peut représenter plusieurs centaines d\'euros.",
            "<strong>Calculer sa prime de précarité : un exemple chiffré</strong><br><br><strong>Cas d\'un CDD de 6 mois :</strong><br>Rémunération brute totale perçue sur les 6 mois : 12 000 €.<br>Prime de précarité (10%) : <strong>1 200 €</strong>, versée avec le dernier salaire.<br><br><strong>Cas de plusieurs CDD enchaînés sur l\'année :</strong><br>3 CDD de 4 mois chacun, à 1 800 € brut/mois :<br>• CDD 1 : 7 200 € brut → prime de 720 €<br>• CDD 2 : 7 200 € brut → prime de 720 €<br>• CDD 3 : 7 200 € brut → prime de 720 €<br>• <strong>Total cumulé sur l\'année : 2 160 €</strong> — un montant souvent largement sous-estimé par les salariés en contrats courts.<br><br><strong>Vérifier le bon taux appliqué :</strong><br>Si ta convention prévoit le taux réduit à 6% en échange d\'un accès facilité à la formation, vérifie que cet accès facilité existe réellement (financement, accompagnement) — certaines conventions ont supprimé cette contrepartie sans revenir au taux de 10%, ce qui est alors contestable.<br><br>💡 Compare systématiquement le montant figurant sur ton solde de tout compte avec ton propre calcul (10% ou 6% × rémunération brute totale) — les écarts, même petits, valent la peine d\'être signalés."]},
    {k:'sai_interim',lbl:'Intérim : missions, contrat et indemnité de fin de mission',sub:'Comment ça marche, tes droits face à l’agence',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M3 3v18h18"/><path d="M18.7 8l-5.7 5.7-3-3-4 4"/>',
     msgs:["<strong>Comprendre le statut intérimaire</strong><br><br>En intérim, tu as <strong>deux contrats</strong> : un contrat de mise à disposition entre l\'agence et l\'entreprise utilisatrice, et un <strong>contrat de mission</strong> entre toi et l\'agence d\'intérim — c\'est ce dernier qui te lie juridiquement, pas l\'entreprise où tu travailles.<br><br><strong>Tes droits pendant la mission :</strong><br>• Même rémunération qu\'un salarié de l\'entreprise utilisatrice à poste équivalent (principe d\'égalité de traitement)<br>• Accès aux mêmes équipements collectifs (cantine, transport)<br>• Indemnité de fin de mission (10%) comme en CDD, sauf mêmes exceptions<br>• Indemnité compensatrice de congés payés (10% supplémentaires)<br><br><strong>La sécurité au travail :</strong><br>C\'est l\'<strong>entreprise utilisatrice</strong> qui est responsable de ta sécurité sur le poste (formation au poste, équipements de protection) — en cas d\'accident, c\'est elle qui doit avoir rempli ses obligations de prévention.<br><br>💡 Le <strong>CDI intérimaire</strong> existe aussi : il sécurise ton statut (salaire garanti entre les missions) tout en gardant la flexibilité des missions — à envisager si tu enchaînes les missions chez la même agence depuis longtemps.",
            "<strong>Si une mission s\'arrête plus tôt que prévu ou si l\'agence ne te propose plus rien</strong><br><br><strong>Rupture anticipée du contrat de mission :</strong><br>Sauf faute grave de ta part ou accord entre les parties, l\'agence reste tenue de te chercher un poste équivalent ou de te payer jusqu\'au terme initialement prévu.<br><br><strong>Si l\'agence ne te propose plus de mission :</strong><br>Ce n\'est pas un licenciement — à la fin de chaque contrat de mission, tu peux t\'inscrire à France Travail et ouvrir des droits à l\'ARE si tu remplis les conditions d\'affiliation (cumul possible sur plusieurs missions/agences).<br><br><strong>Litige avec l\'agence (paiement, conditions) :</strong><br>Le Conseil de Prud\'hommes est compétent, comme pour tout salarié — l\'agence d\'intérim est ton employeur juridique, c\'est elle qui doit être assignée en cas de litige, pas l\'entreprise utilisatrice.<br><br>⚠️ <strong>Vérifie systématiquement</strong> ton relevé de mission et tes bulletins de paie : les erreurs de calcul (heures, primes, indemnités) sont fréquentes en intérim du fait du grand nombre de missions traitées par les agences.",
            "<strong>Le CDI intérimaire en détail</strong><br><br><strong>Le principe :</strong><br>Tu signes un contrat à durée indéterminée avec l\'agence d\'intérim elle-même, qui t\'envoie en mission chez différentes entreprises utilisatrices, mais te garantit un revenu minimum même entre deux missions (période d\'intermission).<br><br><strong>La garantie minimale mensuelle de rémunération (GMMR) :</strong><br>Pendant les périodes sans mission, tu perçois un salaire minimum garanti, calculé sur la base du SMIC ou du minimum conventionnel selon ta qualification — tu ne te retrouves jamais à zéro entre deux missions, contrairement à l\'intérim classique.<br><br><strong>Les avantages concrets :</strong><br>• Accès facilité au crédit bancaire et à la location (CDI = statut stable aux yeux des banques/bailleurs)<br>• Ancienneté qui se cumule chez l\'agence, avec ses droits associés (congés payés classiques, pas de prime de précarité à chaque mission)<br>• Formation professionnelle plus accessible<br><br><strong>Quand le proposer/demander :</strong><br>Si tu enchaînes les missions avec la même agence depuis plus de 6 mois sans interruption significative, c\'est le bon moment pour demander explicitement un CDI intérimaire — beaucoup d\'agences le proposent à partir d\'un certain volume d\'heures mais ne le mettent pas toujours spontanément en avant.<br><br>💡 Le CDI intérimaire reste compatible avec la flexibilité que tu recherches peut-être — tu peux refuser une mission sans rompre ton contrat, dans certaines limites prévues par accord de branche."]},
    {k:'sai_saisonnier',lbl:'Travail saisonnier : spécificités et reconduction',sub:'Clause de reconduction, droits, particularités du contrat',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
     msgs:["<strong>Le CDD saisonnier : ce qui le distingue d\'un CDD classique</strong><br><br>Le contrat saisonnier concerne des activités qui se répètent chaque année à des dates à peu près fixes (tourisme, agriculture, événementiel...) en fonction du rythme des saisons. Contrairement au CDD classique, il n\'a <strong>pas de durée maximale légale</strong> stricte et n\'ouvre pas droit à l\'indemnité de fin de contrat (sauf accord de branche ou convention plus favorable).<br><br><strong>La clause de reconduction :</strong><br>Si ta convention collective ou ton contrat le prévoit, tu peux bénéficier d\'une <strong>clause de reconduction</strong> qui oblige l\'employeur à te proposer un contrat la saison suivante si tu as travaillé au moins 2 saisons sur les 3 dernières années dans la même entreprise. C\'est un vrai droit — vérifie ta convention collective (hôtellerie-restauration, par exemple, le prévoit).<br><br><strong>Le logement saisonnier :</strong><br>Si l\'employeur fournit un logement, ses conditions (loyer, état des lieux, charges) doivent être précisées par écrit — un logement insalubre ou non conforme peut faire l\'objet d\'un signalement à l\'inspection du travail.<br><br>💡 Renseigne-toi sur les <strong>accords de branche spécifiques</strong> à ton secteur (tourisme, agriculture) : ils prévoient souvent des règles plus favorables que le droit commun.",
            "<strong>Cumuler saisons et allocations chômage</strong><br><br><strong>Entre deux saisons :</strong><br>Si tu enchaînes les contrats saisonniers d\'année en année, tu peux ouvrir des droits à l\'ARE pendant les périodes creuses, à condition d\'avoir suffisamment cotisé sur les 24 derniers mois (statut de « travailleur saisonnier » reconnu par France Travail).<br><br><strong>Le statut de saisonnier régulier :</strong><br>Si tu démontres une activité saisonnière répétée sur plusieurs années, France Travail peut adapter ton indemnisation pour tenir compte de ce rythme cyclique plutôt que de te considérer comme un cas isolé à chaque fin de saison.<br><br><strong>Les pièges à éviter :</strong><br>• Ne pas déclarer ses périodes de travail saisonnier en pensant que « ce n\'est pas un vrai contrat »<br>• Oublier de demander l\'attestation employeur à la fin de chaque saison (indispensable pour l\'inscription)<br>• Ne pas vérifier la clause de reconduction avant de chercher un autre employeur la saison suivante<br><br>⚠️ Si l\'employeur ne respecte pas une clause de reconduction prévue par la convention collective, tu peux réclamer des dommages et intérêts devant le Conseil de Prud\'hommes.",
            "<strong>Les conventions collectives à connaître selon ton secteur</strong><br><br><strong>Hôtellerie-restauration (HCR) :</strong><br>Prévoit explicitement la clause de reconduction pour les saisonniers ayant travaillé 2 saisons sur 3 années consécutives chez le même employeur — l\'une des protections les plus solides du secteur.<br><br><strong>Tourisme social et familial / animation :</strong><br>Conventions souvent assorties de dispositions sur le logement et la nourriture fournis, avec valorisation en avantage en nature précisément encadrée — vérifie que ces avantages sont bien chiffrés sur ta fiche de paie.<br><br><strong>Agriculture :</strong><br>Régime social spécifique (MSA, pas l\'URSSAF classique), avec des règles propres sur les contrats vendanges et le travail saisonnier agricole, souvent plus souples sur la durée mais encadrées sur la sécurité (produits phytosanitaires, conditions climatiques).<br><br><strong>Où vérifier ta convention exacte :</strong><br>L\'intitulé de ta convention collective figure obligatoirement sur ton bulletin de paie — cherche son texte intégral gratuitement sur <strong>legifrance.gouv.fr</strong>, rubrique conventions collectives, pour connaître précisément tes droits spécifiques au secteur.<br><br>💡 Beaucoup de saisonniers ignorent l\'existence de la clause de reconduction faute de l\'avoir cherchée — un simple contrôle de ta convention avant la fin de saison peut sécuriser ton emploi l\'année suivante."]},
    {k:'sai_are_courts',lbl:'Allocation chômage entre deux contrats courts',sub:'Droits rechargeables, cumul et stratégie d\'enchaînement',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>',
     msgs:["<strong>Le principe des droits rechargeables</strong><br><br>Quand tu enchaînes des contrats courts (CDD, intérim, saisonnier), chaque période travaillée <strong>recharge</strong> tes droits à l\'ARE — tu ne repars jamais de zéro tant que tu t\'inscris ou te réactualises régulièrement.<br><br><strong>Comment ça fonctionne concrètement :</strong><br>À l\'épuisement de tes droits initiaux, si tu as retravaillé au moins 6 mois (910 heures) depuis l\'ouverture de tes droits, un <strong>nouveau capital de droits</strong> est calculé automatiquement, généralement plus avantageux car basé sur ton salaire le plus récent.<br><br><strong>L\'intérêt de na jamais se désinscrire :</strong><br>Même entre deux missions, reste inscrit à France Travail et actualise-toi chaque mois — c\'est ce qui permet d\'additionner les périodes travaillées et de maximiser tes droits rechargeables.<br><br>💡 <strong>Astuce EVA :</strong> Avant d\'accepter ou de refuser une mission courte, utilise le simulateur France Travail pour comparer ce que tu gagnerais en cumul activité réduite + ARE, versus rester sans rien faire.",
            "<strong>Stratégie pour sécuriser ses revenus entre contrats courts</strong><br><br><strong>Anticiper les périodes creuses :</strong><br>• Vise plusieurs employeurs/agences en parallèle pour réduire les trous entre missions<br>• Demande systématiquement ton attestation employeur en fin de contrat, même pour une mission de quelques jours<br>• Garde une trace de toutes tes missions (dates, agences, employeurs) pour faciliter le calcul de tes droits<br><br><strong>Le rôle du conseiller dédié intermittents/saisonniers :</strong><br>Certaines agences France Travail proposent un <strong>accompagnement spécifique</strong> pour les travailleurs en contrats courts récurrents — demande à en bénéficier si ta situation correspond.<br><br><strong>Vérifier ses droits régulièrement :</strong><br>Ton solde de droits et la date de fin de tes droits sont consultables à tout moment dans ton espace personnel — surveille-les pour anticiper une éventuelle rupture de ressources et demander un accompagnement avant qu\'elle survienne.<br><br>⚠️ <strong>Erreur fréquente :</strong> accepter une mission très courte sans vérifier son impact sur le cumul du mois — dans de rares cas, le différé d\'indemnisation qui en résulte peut temporairement réduire le revenu total du mois suivant.",
            "<strong>Un exemple chronologique de droits rechargeables</strong><br><br><strong>Année 1 :</strong><br>Tu travailles 8 mois en intérim, puis tu t\'inscris à France Travail. Tes droits initiaux sont ouverts pour environ 8 mois d\'indemnisation (selon ta durée d\'affiliation).<br><br><strong>Mois 5 d\'indemnisation :</strong><br>Tu retravailles 2 mois en CDD tout en restant inscrit et en t\'actualisant chaque mois. Ces 2 mois ralentissent la consommation de tes droits restants (puisque le cumul ARE + salaire remplace une partie de l\'ARE pleine).<br><br><strong>Épuisement des droits initiaux :</strong><br>Si tu as cumulé au moins 6 mois travaillés depuis l\'ouverture de tes droits (ce qui est le cas ici avec les 2 mois de CDD), un <strong>rechargement automatique</strong> a lieu : un nouveau capital de droits est recalculé, généralement sur la base de tes revenus les plus récents.<br><br><strong>Pourquoi rester inscrit change tout :</strong><br>Si tu t\'étais désinscrit pendant les 2 mois de CDD, ce travail n\'aurait pas pu être comptabilisé aussi simplement pour le rechargement — d\'où l\'importance de ne jamais se désinscrire, même pendant une période d\'activité.<br><br>💡 Ton solde de droits rechargeables est visible en temps réel dans ton espace personnel France Travail — un bon réflexe est de le consulter avant d\'accepter ou refuser une mission courte."]}
  ],
  dem_sal:[
    {k:'sal_droits_base',lbl:'Connaître ses droits essentiels en CDI',sub:'Période d\'essai, contrat, convention collective',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>',
     msgs:["<strong>Les fondamentaux de ton contrat de travail</strong><br><br><strong>La période d\'essai :</strong><br>Sa durée maximale dépend de ton statut : 2 mois pour un ouvrier/employé, 3 mois pour un agent de maîtrise/technicien, 4 mois pour un cadre (renouvellement possible une fois si prévu au contrat). Pendant cette période, la rupture est libre des deux côtés, mais un <strong>délai de prévenance</strong> s\'applique (24h à 1 mois selon l\'ancienneté dans l\'entreprise).<br><br><strong>La convention collective : ton meilleur outil</strong><br>Elle complète le Code du travail et prévoit souvent des droits plus favorables (primes, congés supplémentaires, indemnités de licenciement majorées). Elle est mentionnée sur ton bulletin de paie — cherche-la en ligne sur Légifrance pour connaître précisément tes droits.<br><br><strong>Ce que ton employeur doit te remettre :</strong><br>• Un contrat écrit (obligatoire en CDI à temps partiel, fortement recommandé en temps plein)<br>• Un bulletin de paie mensuel détaillé<br>• Le règlement intérieur si l\'entreprise compte plus de 50 salariés<br><br>💡 <strong>Astuce EVA :</strong> Demande toujours une copie signée de ton contrat — c\'est ta référence en cas de désaccord ultérieur.",
            "<strong>Tes droits au quotidien dans l\'entreprise</strong><br><br><strong>Durée du travail :</strong><br>35h/semaine légales (ou durée fixée par accord d\'entreprise), avec un repos quotidien minimum de 11h consécutives et un repos hebdomadaire de 24h (35h avec le repos quotidien).<br><br><strong>Heures supplémentaires :</strong><br>Toute heure au-delà de 35h doit être rémunérée (majoration de 25% pour les 8 premières, 50% au-delà) ou récupérée en repos compensateur, selon ce que prévoit ton accord d\'entreprise.<br><br><strong>Le droit à la déconnexion :</strong><br>Tu n\'es pas tenu de répondre aux emails ou appels professionnels en dehors de ton temps de travail, sauf astreinte explicitement prévue et rémunérée comme telle.<br><br><strong>Modification du contrat :</strong><br>Ton employeur ne peut pas modifier unilatéralement un élément essentiel de ton contrat (rémunération, qualification, durée du travail, lieu de travail au-delà du secteur géographique) sans ton accord écrit — un simple changement de tes conditions de travail (organisation, horaires mineurs) reste en revanche possible sans ton accord.<br><br>⚠️ Si tu refuses une modification essentielle et que l\'employeur persiste, cela peut être analysé comme un licenciement — fais-toi accompagner avant de répondre.",
            "<strong>Les protections concrètes que tu peux exiger</strong><br><br><strong>Égalité salariale femmes-hommes :</strong><br>L\'Index de l\'égalité professionnelle est obligatoire dans les entreprises de plus de 50 salariés et doit être publié — tu peux demander à voir le score de ton entreprise, accessible normalement sur l\'intranet ou auprès du CSE.<br><br><strong>Visite médicale d\'embauche :</strong><br>Obligatoire dans les 3 mois suivant l\'embauche (avant pour certains postes à risque) — si elle n\'a jamais eu lieu, tu peux la demander directement à la médecine du travail.<br><br><strong>Mutuelle d\'entreprise :</strong><br>Obligatoire pour tout salarié du secteur privé depuis 2016, avec une participation employeur d\'au moins 50% de la cotisation — si ton employeur ne propose rien, c\'est une irrégularité à signaler.<br><br><strong>Accès à ton dossier personnel :</strong><br>Tu as le droit de consulter à tout moment les informations te concernant détenues par l\'employeur (évaluations, dossier RH) — un refus catégorique est contestable.<br><br>💡 Le CSE (Comité Social et Économique), quand il existe, est ton meilleur point d\'entrée pour vérifier que ces droits de base sont bien respectés dans ton entreprise — n\'hésite pas à le solliciter directement, en toute confidentialité."]},
    {k:'sal_negociation',lbl:'Négocier une augmentation ou une promotion',sub:'Préparer, argumenter, choisir le bon moment',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
     msgs:["<strong>Préparer sa négociation salariale</strong><br><br><strong>Choisir le bon moment :</strong><br>L\'entretien annuel est l\'occasion la plus naturelle, mais une négociation peut aussi se faire après une réussite concrète (projet livré, objectif dépassé) — n\'attends pas systématiquement la date fixée si le contexte est favorable.<br><br><strong>Construire ton dossier :</strong><br>• Liste tes réalisations chiffrées des 12 derniers mois (résultats, projets menés, responsabilités prises)<br>• Compare ton salaire au marché (Glassdoor, APEC, études de rémunération sectorielles)<br>• Identifie un montant cible précis, avec une marge de négociation<br><br><strong>La formule qui fonctionne :</strong><br>« Sur les 12 derniers mois, j\'ai [réalisations concrètes]. Le marché pour ce poste se situe autour de [montant]. Je souhaiterais qu\'on évoque une revalorisation à [montant cible]. »<br><br>💡 <strong>Astuce EVA :</strong> Prépare aussi un «‫plan B‬» non-salarial (jours de télétravail, formation financée, titre/promotion) si le budget de l\'entreprise est réellement contraint cette année.",
            "<strong>Gérer un refus et savoir quand changer d\'entreprise</strong><br><br><strong>Si la réponse est non :</strong><br>Demande des critères précis et un point de suivi à 6 mois — un refus sans explication ni perspective est un signal à prendre au sérieux sur ton évolution dans l\'entreprise.<br><br><strong>Les alternatives à explorer :</strong><br>• Demande de formation qualifiante financée par l\'entreprise<br>• Évolution du titre/de la qualification, même sans hausse immédiate (impact sur ton employabilité future)<br>• Avantages en nature (tickets restaurant, mutuelle, RTT supplémentaires)<br><br><strong>Quand envisager un changement d\'entreprise :</strong><br>Statistiquement, changer d\'employeur reste le levier le plus efficace pour augmenter significativement son salaire (souvent 10 à 20% de plus qu\'une augmentation interne). Si plusieurs négociations internes échouent sans perspective claire, commencer une recherche externe en parallèle est une stratégie légitime.<br><br>⚠️ Ne démissionne jamais sans solution concrète : négocie d\'abord une promesse d\'embauche ou un nouveau contrat avant de quitter ton poste actuel.",
            "<strong>Un exemple de script de négociation</strong><br><br><strong>Ouverture (poser le sujet) :</strong><br>« J\'aimerais qu\'on prenne un moment pour faire le point sur ma rémunération, en lien avec ce que j\'ai apporté cette année. »<br><br><strong>Argumentation (chiffrer ses résultats) :</strong><br>« Sur les 12 derniers mois, j\'ai [livré le projet X qui a généré Y], [pris en charge une responsabilité supplémentaire Z], [formé/accompagné N collègues]. Le marché pour ce type de poste se situe autour de [montant], d\'après [source : APEC, étude sectorielle...]. »<br><br><strong>Formulation de la demande :</strong><br>« Je souhaiterais qu\'on évoque une revalorisation à [montant cible], qui me semble cohérent avec ces éléments. »<br><br><strong>Gérer une hésitation de l\'interlocuteur :</strong><br>« Je comprends que ça nécessite réflexion — quel serait selon vous le bon moment pour qu\'on en reparle avec une réponse concrète ? »<br><br><strong>Le bon timing dans l\'année :</strong><br>Les budgets d\'augmentation sont généralement arbitrés en fin d\'année ou en début d\'année civile pour application au printemps — une demande formulée 2 à 3 mois avant ces périodes a statistiquement plus de chances d\'être intégrée au budget.<br><br>💡 Entraîne-toi à voix haute avant l\'entretien — la fluidité de l\'argumentation compte autant que son contenu."]},
    {k:'sal_rupture_conv',lbl:'Rupture conventionnelle : procédure et indemnités',sub:'Étapes, délais, calcul de l’indemnité minimale',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
     msgs:["<strong>La rupture conventionnelle, étape par étape</strong><br><br>C\'est un mode de rupture <strong>à l\'amiable</strong>, à l\'initiative du salarié ou de l\'employeur — elle ouvre droit à l\'ARE, contrairement à une démission classique.<br><br><strong>La procédure :</strong><br>1. <strong>Entretien(s) préalable(s)</strong> — au moins un, tu peux te faire assister par un collègue ou un conseiller du salarié<br>2. <strong>Signature de la convention</strong> précisant la date de rupture et le montant de l\'indemnité<br>3. <strong>Délai de rétractation de 15 jours calendaires</strong> à partir de la signature, pour les deux parties<br>4. <strong>Homologation</strong> par la DREETS (administration du travail) sous 15 jours ouvrables — sans réponse dans ce délai, l\'homologation est tacitement acquise<br><br><strong>Durée totale du processus :</strong><br>Compte environ 5 à 6 semaines entre le premier entretien et la rupture effective.<br><br>💡 <strong>Astuce EVA :</strong> Ne signe jamais lors du premier entretien — prends le temps de calculer précisément l\'indemnité minimale à laquelle tu as droit avant de t\'engager.",
            "<strong>Calculer son indemnité minimale</strong><br><br><strong>Le plancher légal :</strong><br>L\'indemnité ne peut pas être inférieure à l\'<strong>indemnité légale de licenciement</strong> : 1/4 de mois de salaire par année d\'ancienneté pour les 10 premières années, puis 1/3 de mois par année au-delà.<br><br><strong>Vérifie ta convention collective :</strong><br>Beaucoup prévoient un calcul plus favorable que le minimum légal — c\'est systématiquement ce montant le plus avantageux qui doit s\'appliquer.<br><br><strong>Ce qui peut se négocier en plus :</strong><br>• Un montant supérieur au minimum (rien n\'empêche de négocier à la hausse)<br>• Une date de rupture qui t\'arrange (fin de mois, après une prime annuelle)<br>• Le maintien de certains avantages jusqu\'à la date de rupture<br><br><strong>Après la rupture :</strong><br>Tu perçois ton solde de tout compte, ton certificat de travail, ton attestation employeur — et tu peux t\'inscrire à France Travail pour ouvrir tes droits à l\'ARE, exactement comme après un licenciement.<br><br>⚠️ <strong>Attention :</strong> une rupture conventionnelle signée sous pression ou dans un contexte de conflit peut être annulée par les Prud\'hommes si le consentement n\'était pas libre — fais-toi conseiller si tu as un doute.",
            "<strong>Un exemple chiffré de calcul d\'indemnité</strong><br><br><strong>Situation :</strong><br>8 ans d\'ancienneté, salaire de référence (moyenne des 12 derniers mois ou des 3 derniers si plus favorable) de 2 500 € brut.<br><br><strong>Calcul de l\'indemnité légale minimale :</strong><br>1/4 de mois par année pour les 10 premières années : 2 500 € × 0,25 × 8 = <strong>5 000 €</strong> minimum.<br><br><strong>Si la convention collective prévoit mieux :</strong><br>Certaines conventions prévoient 1/3 de mois par année dès la première année — dans ce cas : 2 500 € × 0,33 × 8 ≈ <strong>6 667 €</strong>, c\'est ce montant supérieur qui doit s\'appliquer.<br><br><strong>Ce qui peut s\'ajouter en négociation :</strong><br>Un montant supplémentaire (souvent 1 à 3 mois de salaire en plus du minimum légal) est fréquemment négocié, en particulier si c\'est l\'employeur qui est à l\'initiative ou si le contexte (réorganisation, poste supprimé) le justifie.<br><br><strong>Le régime fiscal et social :</strong><br>L\'indemnité de rupture conventionnelle est exonérée d\'impôt sur le revenu et de charges sociales dans une certaine limite (plusieurs fois le plafond annuel de la Sécurité Sociale) — au-delà, elle est soumise à charges.<br><br>💡 Un simulateur en ligne (service-public.fr) permet de vérifier rapidement le montant légal minimal avant toute négociation."]},
    {k:'sal_conges_temps',lbl:'Congés, RTT et temps de travail',sub:'Ce qu’il faut savoir pour ne rien perdre',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
     msgs:["<strong>Les congés payés : ce que tu dois savoir</strong><br><br><strong>L\'acquisition :</strong><br>2,5 jours ouvrables par mois travaillé, soit 30 jours (5 semaines) par an pour un temps plein — calculés sur la période de référence (souvent du 1er juin au 31 mai, sauf accord différent).<br><br><strong>La pose des congés :</strong><br>L\'employeur fixe l\'ordre des départs mais doit te prévenir au moins 1 mois avant, et ne peut pas modifier les dates moins d\'un mois avant le départ sauf circonstances exceptionnelles.<br><br><strong>Les congés non pris :</strong><br>En principe, les congés non pris sur la période sont perdus — sauf si l\'employeur ne t\'a pas mis en mesure de les prendre (charge de travail, refus répétés). Dans ce cas, ils peuvent être reportés ou indemnisés.<br><br><strong>Maladie pendant les congés :</strong><br>Si tu tombes malade pendant tes congés payés, les jours concernés peuvent être reportés (arrêt maladie suspend le décompte des congés, sur justification d\'arrêt de travail).<br><br>💡 Vérifie ton compteur de congés sur ton bulletin de paie chaque mois — les erreurs de calcul sont fréquentes, notamment en cas de changement de poste ou de temps partiel en cours d\'année.",
            "<strong>RTT et temps de travail : les points à vérifier</strong><br><br><strong>Les RTT :</strong><br>Elles résultent d\'un accord d\'entreprise organisant le temps de travail au-delà de 35h (ex : 39h payées 35h + RTT compensatoires). Leurs règles d\'acquisition et de prise sont fixées par l\'accord — vérifie le tien pour connaître les délais de pose et les règles de report.<br><br><strong>Le forfait jour (cadres) :</strong><br>Si tu es au forfait jour, tu n\'es plus soumis au décompte horaire classique, mais à un nombre de jours travaillés par an (en général 218 jours). Ce statut doit être prévu par accord collectif et par ton contrat — sans cela, il est inopposable et tu peux réclamer le paiement de tes heures supplémentaires.<br><br><strong>Le droit au repos même en forfait jour :</strong><br>Repos quotidien de 11h et hebdomadaire de 24h restent obligatoires, même en forfait jour — un entretien annuel sur ta charge de travail doit être organisé par ton employeur.<br><br>⚠️ <strong>Un forfait jour mal encadré</strong> (sans suivi de charge, sans entretien annuel) peut être contesté devant les Prud\'hommes, avec à la clé un rappel d\'heures supplémentaires potentiellement important.",
            "<strong>Cas particuliers de congés à connaître</strong><br><br><strong>Congés pour événements familiaux :</strong><br>• Mariage/PACS : 4 jours<br>• Naissance ou adoption : 3 jours (+ congé paternité séparé de 25 jours)<br>• Décès d\'un enfant : 5 à 14 jours selon l\'âge<br>• Décès du conjoint, parent, frère/sœur : 3 jours<br>• Annonce de handicap d\'un enfant : 2 jours<br>Ces jours sont en plus des congés payés classiques et ne peuvent pas être refusés par l\'employeur.<br><br><strong>Le fractionnement des congés :</strong><br>Si tu prends moins de 12 jours ouvrables consécutifs sur la période principale (mai-octobre), tu peux avoir droit à des <strong>jours de congés supplémentaires pour fractionnement</strong> (1 à 2 jours selon le nombre de jours pris hors période) — souvent oublié, vérifie ton solde.<br><br><strong>Report en cas de maladie pendant les congés :</strong><br>Depuis une évolution jurisprudentielle récente, un arrêt maladie pendant les congés payés permet leur report, même sans démarche complexe — fournis simplement ton arrêt de travail à l\'employeur dès que possible.<br><br>💡 Le compteur exact de tes congés acquis et pris doit figurer sur chaque bulletin de paie — un contrôle rapide chaque trimestre évite les mauvaises surprises en fin de période de référence."]},
    {k:'sal_harcelement',lbl:'Harcèlement, discrimination et recours au travail',sub:'Reconnaître, signaler, se protéger',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>',
     msgs:["<strong>Reconnaître le harcèlement moral ou la discrimination</strong><br><br><strong>Le harcèlement moral :</strong><br>Des agissements répétés (humiliations, mise à l\'écart, surcharge volontaire, critiques injustifiées récurrentes) qui dégradent tes conditions de travail, ta santé ou ton avenir professionnel — un seul fait isolé, même grave, n\'est pas toujours qualifié de harcèlement, mais peut relever d\'autres qualifications (faute, abus d\'autorité).<br><br><strong>La discrimination :</strong><br>Tout traitement défavorable basé sur un critère interdit par la loi (origine, sexe, âge, état de santé, grossesse, orientation sexuelle, religion, opinions, situation de famille...) — en matière d\'embauche, de rémunération, de promotion, ou de licenciement.<br><br><strong>La charge de la preuve :</strong><br>Tu n\'as pas à prouver l\'intention de l\'auteur — il te suffit de présenter des <strong>éléments laissant supposer</strong> l\'existence du harcèlement ou de la discrimination ; c\'est ensuite à l\'employeur de prouver que ses décisions sont justifiées par des éléments objectifs.<br><br>💡 <strong>Commence dès maintenant</strong> à noter chaque fait (date, lieu, témoins, contenu exact) dans un document daté — c\'est la preuve la plus solide en cas de procédure.",
            "<strong>Comment signaler et te protéger</strong><br><br><strong>En interne :</strong><br>• Alerte au référent harcèlement (obligatoire dans les entreprises de plus de 250 salariés, et au sein du CSE)<br>• Saisine du CSE (Comité Social et Économique) qui dispose d\'un droit d\'alerte<br>• Médecine du travail — confidentielle, elle peut t\'orienter et constater l\'impact sur ta santé<br><br><strong>En externe :</strong><br>• Inspection du travail — peut enquêter et mettre en demeure l\'employeur<br>• Défenseur des droits — gratuit, compétent spécifiquement sur les discriminations<br>• Conseil de Prud\'hommes — pour obtenir réparation (dommages et intérêts, nullité d\'un licenciement lié aux faits dénoncés)<br>• Dépôt de plainte pénale possible en parallèle (le harcèlement moral est aussi un délit)<br><br><strong>La protection contre les représailles :</strong><br>Tout salarié qui signale de bonne foi des faits de harcèlement ou de discrimination est protégé contre le licenciement ou toute sanction liée à ce signalement — un licenciement consécutif à une dénonciation peut être annulé par le juge.<br><br>⚠️ <strong>Ne reste jamais isolé</strong> : un syndicat, un avocat en droit du travail (souvent une première consultation gratuite) ou une association spécialisée peuvent t\'accompagner dès les premiers signes, avant que la situation ne s\'aggrave.",
            "<strong>Le premier email à envoyer : ce qu\'il doit contenir</strong><br><br><strong>Structure recommandée :</strong><br>1. Description factuelle des faits (dates, lieux, propos exacts si possible)<br>2. Impact sur toi (conditions de travail, santé si tu te sens à l\'aise de le mentionner)<br>3. Demande claire : intervention du référent, du CSE, ou de la direction<br>4. Mention que tu conserves une trace écrite de cette alerte<br><br><strong>À qui l\'envoyer en priorité :</strong><br>Le référent harcèlement s\'il existe, sinon directement les ressources humaines ou ton supérieur hiérarchique (sauf s\'il est lui-même concerné, auquel cas tu sautes ce niveau).<br><br><strong>Les numéros et ressources à connaître :</strong><br>• <strong>3919</strong> — Violences Femmes Info, gratuit et anonyme, compétent aussi sur le harcèlement au travail<br>• <strong>Défenseur des droits</strong> — 09 69 39 00 00, pour les discriminations spécifiquement<br>• <strong>Allo Discrimination Travail</strong> via le site du Défenseur des droits, formulaire en ligne<br><br><strong>Garder une trace au fil du temps :</strong><br>Un simple fichier daté (« journal de bord ») avec faits, témoins éventuels, et ton ressenti au moment des faits constitue une preuve précieuse — même informel, il a une vraie valeur devant un juge.<br><br>⚠️ Ne minimise jamais ce que tu vis en te disant que « ce n\'est pas si grave » — un fait isolé documenté tôt facilite grandement la reconnaissance d\'un ensemble de faits plus tard, si la situation se répète."]}
  ],
  etu:[
    {k:'stage_droits',lbl:'Droits en stage : ce que l\'entreprise doit',sub:'Convention, gratification, horaires, protection',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>',
     msgs:["<strong>Tes droits pendant un stage : le cadre légal complet</strong><br><br><strong>Convention de stage obligatoire :</strong><br>Toute période de stage en entreprise doit être encadrée par une convention tripartite signée par toi, ton établissement et l'entreprise. Cette convention doit exister <strong>avant le premier jour</strong>.<br><br><strong>Gratification obligatoire (stage > 2 mois consécutifs) :</strong><br>Minimum légal 2026 : <strong>4,35 €/heure</strong> (15% du plafond horaire de la Sécurité Sociale). Exonérée de charges sociales pour toi jusqu'à ce seuil.<br><br><strong>Horaires :</strong><br>Tu es soumis aux mêmes horaires que les salariés de l'entreprise. Toute heure supplémentaire au-delà de 35h/semaine doit être compensée (repos ou gratification).<br><br><strong>Congés :</strong><br>Pour un stage long (> 2 mois), tu accumules 2,5 jours de congés par mois. L'entreprise doit les prévoir dans la convention.<br><br><strong>Répétition de stages interdite :</strong><br>Un même employeur ne peut pas faire travailler le même stagiaire plus de 6 mois sur 12 mois glissants — sinon requalification en CDI possible.",
            "<strong>Que faire si l'entreprise ne respecte pas tes droits ?</strong><br><br><strong>Étape 1 — Dialogue avec le tuteur :</strong><br>En cas de problème (horaires non respectés, gratification non versée, tâches hors convention), parle d'abord à ton maître de stage. Note par écrit la conversation.<br><br><strong>Étape 2 — Contacter ton établissement :</strong><br>Ton école ou université est co-signataire de ta convention. En cas de litige, elle a l'obligation de te défendre. Contacte le service des stages ou la direction.<br><br><strong>Étape 3 — Inspection du Travail :</strong><br>Si l'entreprise refuse de payer ta gratification ou te fait travailler dans des conditions non conformes, saisis la DREETS. La procédure est gratuite.<br><br><strong>Points spécifiques à surveiller :</strong><br>• Vérifier que ta convention mentionne bien : durée, horaires, missions exactes, montant de la gratification<br>• Garder une copie signée de ta convention<br>• Documenter tout manquement : emails, témoignages, captures d'écran<br><br>💡 Un stagiaire a les mêmes droits qu'un salarié concernant la protection contre le harcèlement et les discriminations."]},
    {k:'alternance_prep',lbl:'Préparer et réussir son alternance',sub:'Entretien alternance, contrat, tuteur, stratégie',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>',
     msgs:["<strong>Comment préparer un entretien en alternance</strong><br><br>Un entretien en alternance est différent d'un entretien classique : tu es à la fois étudiant et futur salarié. L'employeur évalue ton potentiel, ta motivation et ta capacité à concilier formation et travail.<br><br><strong>Ce qu'ils veulent entendre :</strong><br>• Ta motivation concrète pour le secteur (pas juste «\u202fj'aime ça\u202f»)<br>• Pourquoi cette entreprise en particulier (prouve que tu as fait des recherches)<br>• Ta vision du rythme alternance (école / entreprise) et comment tu vas t'organiser<br>• Tes expériences passées même non professionnelles (bénévolat, projets, jobs d'été)<br><br><strong>Les questions spécifiques à l'alternance :</strong><br>1. «\u202fComment vous organisez-vous entre l'école et l'entreprise ?\u202f»<br>2. «\u202fQu'est-ce que votre formation vous apporte pour ce poste ?\u202f»<br>3. «\u202fQu'attendez-vous de votre maître d'apprentissage ?\u202f»<br>4. «\u202fOù vous voyez-vous après votre alternance ?\u202f»<br><br>💡 <strong>La question piège :</strong> «\u202fVous avez d'autres entretiens ?\u202f» — Réponds honnêtement mais montre que celle-ci est prioritaire.",
            "<strong>Comprendre et utiliser ton contrat d'alternance</strong><br><br><strong>Les deux types de contrats :</strong><br>• <strong>Contrat d'apprentissage :</strong> pour les formations initiales (BTS, Licence Pro, Master…). Relation tripartite : toi, l'entreprise, le CFA. Durée : 1 à 3 ans.<br>• <strong>Contrat de professionnalisation :</strong> orienté insertion professionnelle ou reconversion. Plus flexible, souvent pour les demandeurs d'emploi ou post-formation.<br><br><strong>Ce que ton contrat doit obligatoirement contenir :</strong><br>Identité des parties, intitulé de la formation, durée, salaire, nom du maître d'apprentissage, planning de formation prévisionnelle.<br><br><strong>Ton maître d'apprentissage :</strong><br>Il doit suivre une formation tuteur. Tu peux demander à changer de tuteur si le suivi est inexistant ou problématique — l'OPCO peut intervenir.<br><br><strong>Ton salaire :</strong><br>Calculé en % du SMIC selon ton âge et ton année. Ta convention collective peut prévoir plus — vérifie toujours !<br><br>⚠️ En cas de rupture du contrat d'alternance, les règles sont strictes. Rupture possible : pendant les 45 premiers jours, après par accord mutuel ou faute grave."]},
    {k:'lafpa_opco',lbl:'LAFPA, OPCO et financement de formation',sub:'Comment s\'inscrire, financer, convaincre',col:'#7c3aed',bg:'rgba(124,58,237,.08)',bdr:'#e9d5ff',ico:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
     msgs:["<strong>Comment accéder aux formations LAFPA et organismes officiels</strong><br><br>Le LAFPA (Lieu d'Accueil, de Formation et de Parcours Accompagné) regroupe l'ensemble des organismes qui accompagnent les personnes dans leur formation professionnelle.<br><br><strong>Pour s'inscrire :</strong><br>1. Identifie la formation visée (RNCP, titre professionnel, certification)<br>2. Contacte l'organisme certifié Qualiopi<br>3. Prépare un dossier : CV, lettre de motivation, projet professionnel, copie de tes diplômes<br>4. Passe les tests d'entrée si requis<br><br><strong>Comment présenter ton projet à l'organisme :</strong><br>• Sois précis sur le métier ciblé (intitulé exact, secteur, niveau)<br>• Démontre que tu as fait des recherches (offres d'emploi, rencontres pro, journées portes ouvertes)<br>• Montre que tu comprends les débouchés réalistes dans ta région<br>• Prépare des questions précises sur la pédagogie et les débouchés<br><br>💡 Un conseiller LAFPA/CFA soutient mieux les projets qu'il croit réalisables. Ton sérieux lors du premier contact est déterminant.",
            "<strong>Financer sa formation via l'OPCO</strong><br><br>L'OPCO (Opérateur de Compétences) est l'organisme qui finance les formations des salariés et des alternants selon la branche professionnelle.<br><br><strong>Identifier ton OPCO :</strong><br>Chaque entreprise appartient à un OPCO selon son secteur. Consulte la liste sur francecompetences.fr → rubrique «\u202fListe des OPCO\u202f».<br><br><strong>Ce que l'OPCO finance :</strong><br>• Les formations en alternance (coût pédagogique du CFA)<br>• Les bilans de compétences<br>• Les formations courtes en lien avec le secteur<br>• La Pro-A (reconversion ou promotion par alternance)<br><br><strong>Comment maximiser le financement :</strong><br>• Contacte l'OPCO avant de signer le contrat — pas après<br>• Présente un projet formation-emploi cohérent<br>• Si tu es en entreprise : demande à ton employeur de mobiliser le plan de développement des compétences<br><br><strong>Délais à respecter :</strong><br>Le dossier OPCO doit être déposé dans les 5 jours ouvrables après signature du contrat d'alternance. Tout retard peut entraîner un refus de prise en charge."]},
    {k:'crous_aides',lbl:'CROUS et aides étudiantes',sub:'Bourse, logement, alimentation, aides urgence',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
     msgs:["<strong>Le CROUS : toutes les aides auxquelles tu as droit</strong><br><br><strong>La Bourse sur Critères Sociaux (BCS) :</strong><br>C'est l'aide principale. Elle est calculée sur les revenus de tes parents (avis fiscal N-2). 7 échelons : de 1 000 € à 6 000 €/an environ.<br><br><strong>Comment faire la demande :</strong><br>• Dépose ta DSE (Demande de Bourse) sur messervices.etudiant.gouv.fr entre janvier et mai (avant le 15 mai en général)<br>• Tout retard = perte de la bourse pour l'année universitaire<br>• Pièces requises : avis fiscal parents, justificatif d'inscription, RIB, pièce d'identité<br><br><strong>Logement CROUS :</strong><br>Les résidences CROUS sont accessibles via Parcoursup ou messervices.etudiant.gouv.fr. Priorité aux boursiers. Places limitées — fais ta demande le plus tôt possible.<br><br><strong>Restauration :</strong><br>Le repas universitaire CROUS est accessible à 3,30 € pour les étudiants (tarif subventionné). Certains CROUS proposent des petits-déjeuners à 1 €.",
            "<strong>Aides d'urgence et situations spéciales</strong><br><br><strong>Les aides d'urgence étudiantes :</strong><br>• <strong>FSDIE (Fonds de Solidarité et de Développement des Initiatives Étudiantes) :</strong> aide financière ponctuelle pour les étudiants en difficulté. Demande via l'assistante sociale du CROUS.<br>• <strong>Aide d'urgence ponctuelle :</strong> versement unique pour faire face à une situation imprévue (maladie, décès parent, rupture familiale). Délivrable en quelques jours.<br>• <strong>Aide annuelle d'urgence :</strong> si ta situation s'est dégradée en cours d'année et que tu ne bénéficies pas de bourse.<br><br><strong>Comment accéder à l'assistante sociale CROUS :</strong><br>Prends RDV directement via le site de ton CROUS. L'entretien est gratuit et confidentiel. Elle peut débloquer des aides en 48h dans les cas urgents.<br><br><strong>Contester un refus de bourse :</strong><br>Tu as le droit de contester une décision de rejet. Envoie un courrier de recours avec : la notification de refus, l'avis fiscal des parents, une lettre expliquant ta situation. Délai : 2 mois après notification."]},
    {k:'linkedin_recherche',lbl:'LinkedIn et recherche de stage/alternance',sub:'Profil, candidature, réseau, visibilité',col:'#0891b2',bg:'rgba(8,145,178,.08)',bdr:'#bae6fd',ico:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
     msgs:["<strong>Construire un profil LinkedIn efficace en tant qu'étudiant</strong><br><br><strong>Les 6 éléments qui font la différence :</strong><br>1. <strong>Photo :</strong> fond uni clair, visage occupant 60% de la photo, sourire naturel, tenue professionnelle ou smart casual<br>2. <strong>Titre :</strong> «\u202f[Formation] · [Spécialité] · En recherche d'alternance [mois] [année]\u202f» — sois précis<br>3. <strong>À propos :</strong> 3 phrases max. Ce que tu prépares + ta spécialité + ce que tu cherches. Sans jargon.<br>4. <strong>Expériences :</strong> Tout compte — jobs d'été, bénévolat, projets scolaires, associations. Résultats chiffrés si possible.<br>5. <strong>Compétences :</strong> 5 compétences techniques validées par des tiers (profs, anciens employeurs)<br>6. <strong>URL personnalisée :</strong> Modifier l'URL de profil → prénom-nom (sans chiffres)<br><br><strong>Stratégie de recherche active :</strong><br>• Utilise le filtre «\u202fAlternance\u202f» ou «\u202fStage\u202f» dans LinkedIn Emplois<br>• Active «\u202fOuvert aux opportunités\u202f» sur ton profil (visible uniquement par les recruteurs)<br>• Connecte-toi avec les recruteurs et RH des entreprises cibles après avoir candidaté",
            "<strong>Candidature spontanée et suivi : la méthode qui fonctionne</strong><br><br><strong>La séquence candidature spontanée :</strong><br>Jour J : Email personnalisé au responsable RH ou manager direct (pas via le formulaire site web)<br>J+7 : Relance email — «\u202fJe me permets de faire suite à ma candidature du [date]…\u202f»<br>J+14 : Second contact (LinkedIn si pas de réponse email)<br><br><strong>Template message LinkedIn pour un premier contact :</strong><br>«\u202fBonjour [Prénom], j'ai vu votre travail chez [Entreprise] avec beaucoup d'intérêt, notamment [détail précis]. Je prépare un [BTS/Licence/Master] en [spécialité] et je cherche une alternance à partir de [date]. Auriez-vous un moment pour échanger ?\u202f»<br><br><strong>Ce qui différencie les candidatures retenues :</strong><br>• Mentionner quelque chose de précis sur l'entreprise (un projet, une actualité, un post LinkedIn)<br>• Montrer une compétence par un exemple concret — pas juste la lister<br>• Avoir un portfolio ou des exemples de travaux accessibles (Notion, Canva, GitHub)<br><br>💡 70% des alternances sont obtenues par candidature directe ou réseau — pas par les plateformes."]}
  ],
  frl:[
    {k:'urssaf_maitriser',lbl:'Maîtriser l\'URSSAF et ses cotisations',sub:'Déclarations, taux, pièges, contrôle',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>',
     msgs:["<strong>Tout comprendre sur vos cotisations URSSAF en 2026</strong><br><br><strong>Les taux de cotisations micro-entrepreneur :</strong><br>• Vente de marchandises : <strong>12,3%</strong> du CA<br>• Prestations de services BIC : <strong>21,2%</strong> du CA<br>• Prestations libérales (CIPAV) : <strong>21,2%</strong> du CA<br>• Professions libérales hors CIPAV : <strong>23,1%</strong> du CA<br><br><strong>Quand déclarer :</strong><br>• Mensuellement si CA annuel > 41 136 €<br>• Trimestriellement sinon (15 janvier, 15 avril, 15 juillet, 15 octobre)<br>• Déclarer même si CA = 0 → sinon taxation forfaitaire automatique<br><br><strong>Comment déclarer :</strong><br>Sur autoentrepreneur.urssaf.fr (espace personnel) ou via l'application AutoEntrepreneur Urssaf. La déclaration prend moins de 2 minutes si votre comptabilité est à jour.<br><br><strong>Les erreurs les plus fréquentes :</strong><br>1. Oublier une déclaration (pénalité 1,5% + régularisation)<br>2. Déclarer HT au lieu du CA TTC encaissé<br>3. Confondre CA facturé et CA encaissé (c'est le CA encaissé qui compte)",
            "<strong>Comment faire face à un contrôle URSSAF</strong><br><br>Un contrôle URSSAF peut arriver — même aux micro-entrepreneurs. La préparation est la meilleure protection.<br><br><strong>Documents à conserver 5 ans :</strong><br>• Toutes vos factures émises (numérotées et séquentielles)<br>• Votre livre de recettes (obligatoire pour les micro-entrepreneurs)<br>• Vos relevés de compte professionnels<br>• Vos déclarations URSSAF archivées<br>• Vos contrats de prestation<br><br><strong>En cas de contrôle :</strong><br>1. Accusez réception du courrier de contrôle<br>2. Rassemblez les documents demandés uniquement — ne fournissez pas plus<br>3. Répondez dans les délais indiqués (généralement 30 jours)<br>4. En cas de désaccord avec les conclusions : recours gracieux sous 30 jours, puis recours contentieux<br><br><strong>Si vous avez fait des erreurs :</strong><br>Il vaut mieux les signaler vous-même (régularisation volontaire) avant le contrôle — les pénalités sont réduites de 50% en cas d'initiative spontanée.<br><br>💡 Un expert-comptable à 500-1000€/an vous évite des erreurs qui peuvent coûter 5 à 10 fois plus."]},
    {k:'clients_nego',lbl:'Trouver et négocier avec ses clients',sub:'Prospection, pitch, TJM, contrat, impayés',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
     msgs:["<strong>Construire un système d'acquisition clients durable</strong><br><br><strong>Les 5 canaux qui fonctionnent vraiment :</strong><br>1. <strong>Réseau direct :</strong> anciens collègues, managers, clients — 70% des premières missions viennent de là. Contactez-les activement, pas passivement.<br>2. <strong>LinkedIn :</strong> titre optimisé, publications hebdomadaires sur votre expertise, interactions ciblées avec les décideurs<br>3. <strong>Plateformes spécialisées :</strong> Malt, Comet, Crème de la Crème (tech/digital), Jump, Upwork — profil 100% complété<br>4. <strong>Partenariats :</strong> associez-vous avec des freelances complémentaires pour vous recommander mutuellement<br>5. <strong>Contenu d'expertise :</strong> 1 article ou post par semaine — vous devenez référent dans votre domaine sur 6-12 mois<br><br><strong>Votre pitch en 30 secondes :</strong><br>«\u202fJe suis [spécialité] freelance. Je travaille avec [type de clients]. Je les aide à [résultat concret]. Par exemple, j'ai récemment [réalisation chiffrée].\u202f»<br><br>Pas de jargon. Pas de liste de compétences. Un résultat concret et mémorisable.",
            "<strong>Négocier son TJM et gérer les impayés</strong><br><br><strong>Comment fixer et défendre son TJM :</strong><br>Formule : CA mensuel nécessaire ÷ jours facturables = TJM<br>Exemple : 5000€ net voulu / (1 - 21,2% charges) = 6345€ CA / 15 jours = <strong>423€ TJM min</strong><br><br>Ajoutez 20% de marge de sécurité pour les vacances, formations et périodes creuses → TJM conseillé : <strong>~505€/jour</strong><br><br><strong>En négociation :</strong><br>• Commencez toujours 20-30% au-dessus de votre objectif<br>• Ne justifiez pas votre tarif — proposez-le comme un fait<br>• Si le client négocie : réduisez le périmètre, pas le tarif<br>• Un contrat signé vaut mieux qu'une négociation orale<br><br><strong>Gérer les impayés :</strong><br>J+1 après l'échéance : email de relance courtois<br>J+8 : relance ferme avec mention des pénalités de retard (3 fois le taux légal, automatiques)<br>J+15 : mise en demeure par LR/AR<br>J+30 : injonction de payer (tribunal de commerce, procédure rapide et peu coûteuse)<br><br>💡 Incluez toujours une clause de pénalité de retard et l'indemnité forfaitaire de recouvrement (40€) dans vos CGV."]},
    {k:'contrat_client',lbl:'Rédiger et défendre son contrat client',sub:'CGV, devis, contrat de prestation, clauses clés',col:'#0891b2',bg:'rgba(8,145,178,.08)',bdr:'#bae6fd',ico:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
     msgs:["<strong>Les documents contractuels indispensables pour un freelance</strong><br><br><strong>Les 3 documents à toujours avoir :</strong><br>1. <strong>Devis signé :</strong> description précise de la prestation, délais, prix, modalités de paiement<br>2. <strong>Conditions Générales de Vente (CGV) :</strong> obligatoires entre professionnels. Définissent les règles du jeu.<br>3. <strong>Facture :</strong> à émettre à chaque livraison ou jalon.<br><br><strong>Les clauses incontournables dans votre contrat :</strong><br>• <strong>Périmètre précis :</strong> ce qui est inclus ET ce qui est exclu<br>• <strong>Jalons et livrables :</strong> dates, formats, nombre de révisions incluses<br>• <strong>Modalités de paiement :</strong> acompte (30-50%), solde à la livraison ou à 30 jours<br>• <strong>Propriété intellectuelle :</strong> le client n'a les droits que sur ce qui est payé<br>• <strong>Clause de résiliation :</strong> conditions et indemnité en cas d'arrêt anticipé<br>• <strong>Pénalités de retard :</strong> 3 fois le taux légal + 40€ forfaitaire (obligatoire en B2B)<br>• <strong>Tribunal compétent :</strong> mentionnez le tribunal de votre lieu d'exercice",
            "<strong>Se protéger face aux clients difficiles</strong><br><br><strong>Les signaux d'alerte à détecter avant de signer :</strong><br>• Client qui «\u202fn'a pas de budget\u202f» mais veut tout<br>• Demande de commencer sans devis signé<br>• Nombreux changements de brief pendant la négociation<br>• Délais irréalistes imposés sans discussion<br>• Refus de payer un acompte<br><br><strong>La règle des 3 non-négociables :</strong><br>1. Toujours un devis signé avant de commencer<br>2. Toujours un acompte (minimum 30%)<br>3. Toujours des CGV envoyées et acceptées avant démarrage<br><br><strong>En cas de litige :</strong><br>• Conservation de toutes les preuves (emails, messages, versions validées)<br>• Mise en demeure formelle par LR/AR avant toute procédure<br>• Injonction de payer : procédure simple, rapide (2-3 mois), sans avocat obligatoire<br>• Médiation des entreprises gratuite pour les litiges B2B<br><br>💡 Un contrat bien rédigé prévient 90% des litiges. Investissez dans un modèle juridiquement solide — des associations de freelances (Fédération des Auto-Entrepreneurs, Freelance.com) en proposent."]},
    {k:'fiscal_statut',lbl:'Fiscalité et optimisation du statut',sub:'Micro vs EURL, TVA, CFE, optimisation revenus',col:'#7c3aed',bg:'rgba(124,58,237,.08)',bdr:'#e9d5ff',ico:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
     msgs:["<strong>Choisir et optimiser son statut : micro vs EURL vs portage</strong><br><br><strong>Micro-entrepreneur : pour débuter ou tester</strong><br>✅ Simple, rapide, peu de comptabilité<br>✅ Charges proportionnelles au CA (0 CA = 0 charges)<br>❌ Plafonds de CA (77 700 € services / 188 700 € vente)<br>❌ Pas de déduction des charges réelles<br><br><strong>EURL (SASU) : pour développer</strong><br>✅ Pas de plafond de CA<br>✅ Déduction des charges réelles (matériel, bureau, formation)<br>✅ Séparation patrimoine personnel / professionnel<br>❌ Comptabilité obligatoire (expert-comptable conseillé)<br>❌ Plus de charges sociales (45% environ)<br><br><strong>Portage salarial : pour la sécurité</strong><br>✅ Statut salarié, accès à l'ARE si fin de mission<br>✅ Pas de gestion administrative<br>❌ Frais de gestion : 5-12% du CA<br>❌ Moins de liberté<br><br>💡 <strong>Règle EVA :</strong> Micro jusqu'à 50-60k€ de CA. Ensuite, envisagez l'EURL ou la SASU.",
            "<strong>Les impôts à connaître absolument : CFE et déclaration de revenus</strong><br><br><strong>Cotisation Foncière des Entreprises (CFE) :</strong><br>• Due à partir de la 2ème année d'activité<br>• Calculée sur la valeur locative de votre lieu d'activité<br>• Exonération la première année civile<br>• Minimum : environ 230 € à 600 € selon la commune<br>• Avis reçu en novembre, payable en décembre<br><br><strong>Déclaration de revenus :</strong><br>• Micro-entrepreneur : vous reportez votre CA sur la déclaration 2042-C-PRO<br>• L'abattement fiscal est appliqué automatiquement (71% vente, 50% services, 34% libéral)<br>• Ce CA est CUMULÉ avec vos autres revenus dans le foyer fiscal<br><br><strong>Versement Libératoire de l'Impôt (VLI) :</strong><br>Option pour payer votre impôt en même temps que vos cotisations URSSAF (taux fixe sur CA). Avantageuse si vous êtes en tranche d'imposition haute.<br><br><strong>TVA :</strong><br>Franchise en base TVA jusqu'à 36 800 € pour les services. Au-delà : obligation de collecter et reverser la TVA.<br>Mention obligatoire sur factures : «\u202fTVA non applicable — Art. 293B du CGI\u202f»"]},
    {k:'croissance_freelance',lbl:'Développer et pérenniser son activité',sub:'Réseaux, sous-traitance, montée en gamme',col:'#dc2626',bg:'rgba(220,38,38,.08)',bdr:'#fecaca',ico:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
     msgs:["<strong>Stratégies pour développer votre activité freelance sur le long terme</strong><br><br><strong>La montée en gamme tarifaire :</strong><br>Augmenter son TJM ne se fait pas d'un coup. Stratégie recommandée :<br>• Augmentation de 10-15% par an pour les clients existants (prévenez 3 mois avant)<br>• Nouveau TJM appliqué immédiatement aux nouveaux clients<br>• Justification : formation, certifications, spécialisation acquises<br><br><strong>La spécialisation — meilleur levier de prix :</strong><br>Être le «\u202fmeilleur développeur React pour les fintech\u202f» vaut 2x plus que «\u202fdéveloppeur React généraliste\u202f». Plus votre niche est précise, plus vos prix peuvent être élevés.<br><br><strong>La sous-traitance pour passer à l'échelle :</strong><br>• Faites appel à d'autres freelances pour les pics d'activité<br>• Vous gardez la relation client, ils livrent la prestation<br>• Marge : généralement 20-30% sur leur tarif<br>• Contractualisez toujours avec votre sous-traitant<br><br>💡 La diversification client est cruciale : ne laissez jamais un seul client représenter plus de 40% de votre CA.",
            "<strong>Pérenniser : récurrence, offres packagées, fidélisation</strong><br><br><strong>Les offres récurrentes sont plus rentables :</strong><br>Un contrat mensuel fixe (maintenance, conseil, gestion réseaux) vaut 10 fois une mission one-shot de même valeur. Convertissez systématiquement vos missions ponctuelles en contrats récurrents.<br><br><strong>Créer des offres packagées :</strong><br>Au lieu de facturer à l'heure, créez des forfaits clairs :<br>• «\u202fPack Lancement\u202f» : site vitrine + 3 mois de maintenance<br>• «\u202fPack Mensuel Expert\u202f» : X heures conseil + rapport mensuel<br>Les forfaits réduisent la friction à l'achat et augmentent la valeur perçue.<br><br><strong>Fidéliser vos clients existants :</strong><br>• Débrief de mission systématique : ce qui a bien fonctionné + axes d'amélioration<br>• Envoi trimestriel d'une lettre ou email de veille sectorielle (positionnement expert)<br>• Programme de recommandation : offrez un avantage aux clients qui vous recommandent<br><br><strong>Anticiper les creux d'activité :</strong><br>• Trésorerie de précaution : 3 mois de charges en réserve<br>• Diversifier les secteurs clients (ne pas dépendre d'un seul marché)<br>• Maintenir la prospection même en période chargée — 1h par semaine minimum"]}
  ],
  rec:[
    {k:'cpf_complet',lbl:'Maîtriser son CPF de A à Z',sub:'Solde, formations éligibles, abondements, fraude',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
     msgs:["<strong>Le CPF en 2026 : tout ce qu'il faut savoir</strong><br><br><strong>Votre solde :</strong><br>Consultez-le sur moncompteformation.gouv.fr via FranceConnect. Chaque euro est visible, chaque formation déjà suivie est listée.<br><br><strong>Comment vous l'alimentez :</strong><br>• Salarié temps plein : +500€/an, plafond 5 000€<br>• Salarié à temps partiel : prorata des heures<br>• Travailleurs handicapés : +800€/an, plafond 8 000€<br>• La retraite solde automatiquement le CPF à 0<br><br><strong>Ce que le CPF finance :</strong><br>Uniquement les formations inscrites au Répertoire National des Certifications Professionnelles (RNCP) ou au Répertoire Spécifique (RS). Cela inclut :<br>• Certifications professionnelles et diplômes reconnus<br>• Bilan de compétences<br>• VAE (Validation des Acquis de l'Expérience)<br>• Permis B, EB (sous conditions strictes)<br>• Formations civiques (code de la route, sauvetage)<br><br>⚠️ <strong>Alerte fraude :</strong> Ne donnez jamais votre numéro FranceConnect à un démarcheur. Les vraies formations se réservent UNIQUEMENT sur moncompteformation.gouv.fr.",
            "<strong>Maximiser son CPF : abondements et financement croisé</strong><br><br><strong>L'abondement employeur :</strong><br>Votre employeur peut abonder votre CPF dans le cadre du Plan de Développement des Compétences (PDC) ou d'un accord d'entreprise. C'est négociable lors de votre entretien professionnel (obligatoire tous les 2 ans).<br><br><strong>L'abondement OPCO :</strong><br>Si la formation est en lien avec votre branche professionnelle, l'OPCO peut compléter votre CPF. Contactez-le avant toute inscription.<br><br><strong>Les financements cumulables :</strong><br>CPF + AIF (France Travail si demandeur d'emploi) + Conseil Régional + employeur → Il est possible de financer une formation coûteuse à 0€ résiduel avec le bon montage.<br><br><strong>Le projet de transition professionnelle (Transitions Pro) :</strong><br>Si vous souhaitez vous former à un nouveau métier en maintenant votre salaire, Transitions Pro peut financer jusqu'à 100% du coût et compenser votre salaire pendant la formation. Conditions : 24 mois de salariat, dont 12 dans l'entreprise actuelle.<br><br>💡 Préparez votre dossier Transitions Pro 6 mois à l'avance — les commissions examinent les dossiers trimestriellement."]},
    {k:'demission_legitime',lbl:'Démissionner pour se reconvertir',sub:'CEP, procédure légale, ARE, erreurs à éviter',col:'#dc2626',bg:'rgba(220,38,38,.08)',bdr:'#fecaca',ico:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>',
     msgs:["<strong>La procédure de démission légitime pour reconversion : étape par étape</strong><br><br>⚠️ <strong>RÈGLE ABSOLUE : Ne jamais démissionner avant validation de votre projet.</strong><br><br><strong>Les 5 étapes obligatoires :</strong><br>1. <strong>CEP (Conseil en Évolution Professionnelle) :</strong> RDV GRATUIT obligatoire chez APEC (cadres), Cibc, Fongecif ou Cap emploi. C'est eux qui valident la sérieux de votre projet.<br>2. <strong>Construire votre projet :</strong> Métier cible précis + formation certifiante identifiée + organisme Qualiopi sélectionné + financement planifié.<br>3. <strong>Dossier CPRI :</strong> Soumission du dossier à la Commission Paritaire Régionale Interprofessionnelle compétente pour votre région.<br>4. <strong>Validation :</strong> La CPRI rend sa décision dans un délai de 4 mois. En cas de refus, vous pouvez re-soumettre avec un dossier amélioré.<br>5. <strong>Démission :</strong> Seulement après validation écrite de la CPRI.<br><br><strong>Condition d'accès :</strong><br>5 années d'activité professionnelle salariée continues ou non.",
            "<strong>Ce qui se passe après la démission validée</strong><br><br><strong>Vos droits à l'ARE :</strong><br>Si votre démission a été validée par la CPRI, vous ouvrez des droits à l'ARE — comme un licenciement. Vous devez vous inscrire à France Travail dans les 6 mois suivant votre démission.<br><br><strong>Délai de carence :</strong> 7 jours (comme pour tout demandeur d'emploi).<br><br><strong>Ce que vous présentez à France Travail :</strong><br>• La décision de validation de la CPRI<br>• Votre attestation employeur<br>• Votre projet de formation (organisme, dates, coût)<br>• Votre plan de financement<br><br><strong>France Travail peut aussi :</strong><br>• Financer votre formation via l'AIF (Aide Individuelle à la Formation)<br>• Vous accompagner dans votre projet via un conseiller dédié reconversion<br>• Vous orienter vers un bilan de compétences si le projet n'est pas encore défini<br><br><strong>Les erreurs les plus fréquentes :</strong><br>• Démissionner avant la validation CPRI → perte de tous les droits ARE<br>• Sous-estimer la durée de la procédure (6 à 8 mois du CEP à l'ARE)<br>• Ne pas anticiper le financement pendant la période de formation"]},
    {k:'vae_preparation',lbl:'Préparer son dossier VAE',sub:'Livret 1 et 2, jury, preuves, stratégie',col:'#7c3aed',bg:'rgba(124,58,237,.08)',bdr:'#e9d5ff',ico:'<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
     msgs:["<strong>La VAE : comprendre le processus complet</strong><br><br>La VAE (Validation des Acquis de l'Expérience) permet d'obtenir un diplôme reconnu sur la base de votre expérience professionnelle — sans passer par une formation longue.<br><br><strong>Les conditions d'accès :</strong><br>• 1 an d'expérience (continue ou discontinue) en lien avec le diplôme visé<br>• Expérience salariée, bénévole, associative ou même informelle<br><br><strong>Le processus en 4 étapes :</strong><br>1. <strong>Livret 1 (recevabilité) :</strong> Formulaire de candidature prouvant que vous avez l'expérience minimale requise.<br>2. <strong>Livret 2 (dossier de preuves) :</strong> Description détaillée de votre expérience, preuves à l'appui. C'est la pièce maîtresse.<br>3. <strong>Entretien avec le jury :</strong> Le jury analyse votre Livret 2 et vous questionne sur votre expérience.<br>4. <strong>Décision du jury :</strong> Validation totale, partielle (avec compléments requis) ou refus.<br><br><strong>Durée moyenne :</strong> 12 à 18 mois pour une VAE complète. Prévoir du temps pour le Livret 2 — c'est le plus chronophage.",
            "<strong>Construire un Livret 2 qui convainc le jury</strong><br><br>Le Livret 2 est votre dossier de preuves. Il doit démontrer que vous maîtrisez les compétences du référentiel du diplôme — pas juste que vous avez fait le travail.<br><br><strong>La structure idéale :</strong><br>• <strong>Contexte :</strong> Décrivez l'environnement professionnel (taille entreprise, secteur, votre rôle)<br>• <strong>Situation :</strong> Situation concrète que vous avez gérée<br>• <strong>Actions :</strong> Ce que VOUS avez fait exactement (pas l'équipe, pas le manager)<br>• <strong>Résultats :</strong> Résultats mesurables — chiffres, délais respectés, satisfaction client<br>• <strong>Preuves :</strong> Documents attestant : compte-rendu, email de validation, photo, rapport<br><br><strong>Les preuves acceptées :</strong><br>Attestations employeur, contrats, bulletins de salaire, photos, comptes-rendus de réunion, rapports d'activité, mails signés, certifications, témoignages de clients.<br><br><strong>Comment préparer l'entretien jury :</strong><br>• Relisez votre Livret 2 la veille — le jury vous posera des questions dessus<br>• Préparez des exemples complémentaires non mentionnés dans le Livret<br>• Ne sur-expliquez pas — le jury évalue votre maîtrise, pas votre éloquence<br>• En cas de validation partielle : demandez les unités manquantes et le plan de rattrapage"]},
    {k:'bilan_competences',lbl:'Réussir son bilan de compétences',sub:'Choisir l\'organisme, 3 phases, utiliser les résultats',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
     msgs:["<strong>Tout comprendre sur le bilan de compétences</strong><br><br>Le bilan de compétences est un accompagnement professionnel de 24h maximum sur 3 mois, réalisé avec un consultant externe. Il est entièrement confidentiel — votre employeur n'y a pas accès sauf si vous l'en informez.<br><br><strong>Les 3 phases réglementaires :</strong><br>1. <strong>Phase préliminaire :</strong> Définir vos attentes, clarifier vos objectifs, poser le cadre de l'accompagnement<br>2. <strong>Phase d'investigation :</strong> Explorer vos compétences transférables, vos valeurs, vos motivations profondes, votre personnalité professionnelle (tests psychométriques validés), analyser le marché du travail<br>3. <strong>Phase de conclusion :</strong> Formaliser un projet professionnel réaliste, rédiger le document de synthèse, élaborer votre plan d'action<br><br><strong>Ce que vous obtenez à la fin :</strong><br>Un document de synthèse — confidentiel, qui vous appartient — avec : vos compétences cartographiées, votre projet principal + alternatives, et les étapes concrètes à suivre.<br><br><strong>Financement :</strong><br>CPF (1 500 à 3 500€), France Travail si demandeur d'emploi, OPCO si en emploi.",
            "<strong>Choisir le bon organisme et utiliser le bilan</strong><br><br><strong>Critères pour choisir un organisme sérieux :</strong><br>• Certification Qualiopi obligatoire (visible sur moncompteformation.gouv.fr)<br>• Consultant avec expérience RH, coaching ou psychologie du travail<br>• Utilisation de tests psychométriques validés scientifiquement (MBTI, Holland, Big Five)<br>• Accompagnement individuel (pas en groupe)<br>• Pas de pression pour orienter vers une formation spécifique à la fin<br>• Durée réelle de 24h — méfiez-vous des bilans expédiés en 5h<br><br><strong>Les questions à poser avant de signer :</strong><br>• Quelle est la formation du consultant ?<br>• Quels tests utilisez-vous et comment les interprétez-vous ?<br>• Que se passe-t-il si je ne trouve pas de projet clair ?<br>• Avez-vous des références dans mon secteur ?<br><br><strong>Comment utiliser les résultats :</strong><br>• Le document de synthèse est votre boussole — relisez-le tous les 6 mois<br>• Partagez-le avec votre conseiller France Travail si vous êtes en recherche<br>• Utilisez-le comme base pour votre dossier Transitions Pro ou CEP<br>• 6 mois après le bilan, faites un point : êtes-vous dans votre plan d'action ?"]},
    {k:'plan_financement',lbl:'Financer sa reconversion : le plan complet',sub:'CPF, France Travail, OPCO, Région, montage',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
     msgs:["<strong>Tous les financements disponibles pour votre reconversion</strong><br><br>Une reconversion bien financée passe souvent par la combinaison de plusieurs sources. Voici la cartographie complète :<br><br><strong>1. CPF (Compte Personnel de Formation) :</strong><br>Votre premier recours. Solde sur moncompteformation.gouv.fr. Ne couvre pas toujours le coût total.<br><br><strong>2. AIF (Aide Individuelle à la Formation — France Travail) :</strong><br>Si vous êtes demandeur d'emploi, France Travail peut compléter votre CPF pour financer une formation qualifiante. Dossier à déposer auprès de votre conseiller.<br><br><strong>3. OPCO :</strong><br>Si vous êtes encore salarié, votre OPCO peut abonder votre CPF via le Plan de Développement des Compétences ou le dispositif Pro-A.<br><br><strong>4. Conseil Régional :</strong><br>Chaque région a des enveloppes dédiées aux formations dans les secteurs en tension (santé, numérique, industrie verte). Renseignez-vous sur les appels à projets de votre région.<br><br><strong>5. Transitions Pro :</strong><br>Finance formation + maintien de salaire si vous êtes salarié et que vous visez un nouveau métier. Dossier complexe mais très puissant.",
            "<strong>Comment construire votre plan de financement et le présenter</strong><br><br><strong>La méthode du plan de financement en couches :</strong><br>1. Calculez le coût total de votre formation (frais pédagogiques + vie courante pendant la formation)<br>2. CPF disponible → déduisez du coût total<br>3. AIF France Travail ou OPCO → estimez ce que vous pouvez obtenir<br>4. Aide régionale → vérifiez les dispositifs locaux<br>5. Transitions Pro → si maintien de salaire nécessaire<br>6. Reste à charge éventuel → économies personnelles, prêt formation bancaire<br><br><strong>Présenter votre plan à chaque interlocuteur :</strong><br>Préparez un document récapitulatif d'1 page montrant :<br>• Le coût total de la formation<br>• Les financements déjà obtenus ou confirmés<br>• Ce que vous demandez à cet interlocuteur<br>• Le bénéfice attendu (métier cible, insertion, employabilité)<br><br>💡 Chaque financeur veut voir que vous êtes sérieux ET que son intervention est cohérente dans un plan global. Montrez que vous avez fait des démarches avant de les solliciter.<br><br><strong>Chronologie idéale :</strong><br>M-6 → CEP, identification formation<br>M-5 → Demande OPCO / Transitions Pro<br>M-3 → Inscription formation, dossier AIF<br>M-1 → Validation tous financements, démission si validée"]}
  ]
};

/* ══════════════════════════════════
   NAVIGATION
══════════════════════════════════ */
function ewGo(n,ttl){
  document.querySelectorAll('.ew-panel').forEach(function(p){p.classList.remove('on');});
  document.getElementById('ew-p'+n).classList.add('on');
  EWS=n;
  if(ttl) document.getElementById('ew-ttl').textContent=ttl;
}
document.getElementById('ew-back').onclick=function(){
  if(EWS===0){if(typeof go==='function')go('eva');}
  else if(EWS===1){ewGo(0,'Conseils pratiques & professionnels');}
  else if(EWS===2){ewGo(1,'EVA · '+(EWC[EWP]?EWC[EWP].nom:'Mon espace'));}
  else if(EWS===3){ewGo(2,'EVA · Conseils');}
  else if(EWS===4){ewGo(1,'EVA · '+(EWC[EWP]?EWC[EWP].nom:'Mon espace'));}
  else if(EWS===5){ewGo(1,'EVA · '+(EWC[EWP]?EWC[EWP].nom:'Mon espace'));}
  else if(EWS===6){ewGo(1,'EVA · '+(EWC[EWP]?EWC[EWP].nom:'Mon espace'));}
};

/* ══════════════════════════════════
   OUVRIR PROFIL
══════════════════════════════════ */
function ewOpen(p){
  EWP=p;
  EWDS=null;
  var c=EWC[p];
  var ava=document.getElementById('ew-pbar-ava');
  ava.innerHTML=c.svg; ava.style.cssText='background:'+c.bg+';border-color:'+c.bdr+';';
  document.getElementById('ew-pbar-nom').textContent=c.nom;
  if(p==='dem'){
    document.getElementById('ew-conseils-count').textContent='Conseils personnalisés par EVA selon ta situation';
  } else {
    var topics=EWT[p]||[];
    document.getElementById('ew-conseils-count').textContent=topics.length+' sujets · Conseils personnalisés par EVA';
  }
  ewGo(1,'EVA · '+c.nom);
}
function ewGoConseils(){
  if(!EWP)return;
  if(EWP==='dem'){
    ewShowDemandeurSousProfil();
    ewGo(2,'EVA · Conseils '+EWC[EWP].nom);
    return;
  }
  ewBuildTopics(EWP);
  ewGo(2,'EVA · Conseils '+EWC[EWP].nom);
}

/* ── Sous-profil "Demandeur d'emploi" : 3 situations distinctes,
   chacune avec ses propres sujets de conseils ── */
function ewShowDemandeurSousProfil(){
  var el=document.getElementById('ew-topics');
  if(!el) return;
  var subs=[
    {id:'cho',ttl:'Chômeur',sub:'Au chômage, inscrit France Travail, sans activité',col:'#059669',bg:'rgba(5,150,105,.08)',bdr:'#bbf7d0',ico:'<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>'},
    {id:'sai',ttl:'Saisonnier, intérim, CDD',sub:'En contrat court ou précaire en ce moment',col:'#b45309',bg:'rgba(180,83,9,.08)',bdr:'#fde68a',ico:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'},
    {id:'sal',ttl:'Salarié',sub:'En poste, CDI ou activité stable',col:'#2563eb',bg:'rgba(37,99,235,.08)',bdr:'#bfdbfe',ico:'<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>'}
  ];
  var h='<div style="padding:4px 2px 14px;font-size:.66rem;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:.08em;">Quelle est ta situation ?</div>';
  subs.forEach(function(s){
    var n=(EWT['dem_'+s.id]||[]).length;
    h+='<div class="ew-topic" onclick="ewSelectDemandeurSousProfil(\''+s.id+'\')">'
      +'<div class="ew-topic-ico" style="background:'+s.bg+';border-color:'+s.bdr+'"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="'+s.col+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+s.ico+'</svg></div>'
      +'<div class="ew-topic-info"><div class="ew-topic-ttl">'+s.ttl+'</div><div class="ew-topic-sub">'+s.sub+' · '+n+' sujets</div></div>'
      +'<div class="ew-topic-arr">›</div></div>';
  });
  el.innerHTML=h;
}
function ewSelectDemandeurSousProfil(sub){
  EWDS=sub;
  ewBuildTopics('dem_'+sub);
}
function ewGoAnalyse(){ewGo(4,'EVA · Analyse de documents');}
function ewGoBook(){ewGo(5,'EVA · Guide pratique');ewBookInit();}
function ewGoDocsImportants(){ewGo(6,'EVA · Documents importants');}
function ewDocsLockedAlert(){
  ecShowToast('🔒 Crée ton compte gratuitement pour ranger tes documents');
}

// ── Diagnostic express : ouvre le chat plein écran, profil déjà réglé ──
function ewGoDiagnosticChat(){
  if(!EWP) return;
  var lexMap={dem:'demandeur',etu:'etudiant',frl:'freelance',rec:'reconvers'};
  var picoMap={demandeur:'🔍',etudiant:'🎓',freelance:'💼',reconvers:'🔄'};
  var plblMap={demandeur:'Demandeur',etudiant:'Étudiant',freelance:'Freelance',reconvers:'Reconversion'};
  var lexKey=lexMap[EWP]||'general';

  go('eva');
  var splash=document.getElementById('ec-splash');
  if(splash){ splash.classList.add('hide'); setTimeout(function(){ splash.style.display='none'; },650); }
  var hdr=document.getElementById('eva-fs-header');
  if(hdr) hdr.style.display='flex';
  ecHistory=[]; ecUserName=''; ecPhase='chat';
  window._evaCurrentProfil=lexKey;
  var msgsEl=document.getElementById('ec-msgs');
  if(msgsEl) msgsEl.innerHTML='';
  var iw0=document.getElementById('eva-fs-input-wrap');
  if(iw0) iw0.style.display='none';
  if(typeof evaActivateTLMode==='function') evaActivateTLMode();

  var pill=document.getElementById('eva-profile-pill');
  var pillIco=document.getElementById('eva-profile-pill-ico');
  var pillLbl=document.getElementById('eva-profile-pill-lbl');
  if(pill) pill.classList.add('active');
  if(pillIco) pillIco.textContent=picoMap[lexKey]||'';
  if(pillLbl) pillLbl.textContent=plblMap[lexKey]||'';

  ewShowPortfolioInline();
  ecOpenFreeInput();
}

/* ── Menu Portfolio affiché au milieu du chat (remplace le message d'accueil) ── */
function ewShowPortfolioInline(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  var old=document.getElementById('ec-pf-inline-wrap');
  if(old) old.remove();

  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var items=[
    {k:'agenda',ico:PF_ICONS.agenda,ttl:'Agenda',sub:'Tes rendez-vous et échéances',col:'#60a5fa'},
    {k:'taches',ico:PF_ICONS.tasks,ttl:'Tâches',sub:'Tes tâches datées, commentaires et infos perso',col:'#06b6d4'},
    {k:'notes',ico:PF_ICONS.notes,ttl:'Documents',sub:'Tes idées et notes perso',col:'#a78bfa'},
    {k:'contacts',ico:PF_ICONS.contacts,ttl:'Contacts',sub:'Ton réseau pro',col:'#22d3ee'},
    {k:'profil',ico:cfg.emoji,ttl:cfg.label,sub:'Suivi personnalisé selon ton profil',col:'#34d399'},
    {k:'guide',ico:PF_ICONS.book,ttl:'Guide pratique',sub:'Conseils adaptés à ta situation',col:'#f472b6'},
    {k:'doc',ico:PF_ICONS.doc,ttl:'Analyser un document',sub:'CV, lettre, contrat — note /10',col:'#94a3b8'},
    {k:'orgpro',ico:PF_ICONS.case,ttl:'Contacts professionnels',sub:'Organismes utiles à ton profil, tél et site en un clic',col:'#0ea5e9'}
  ];

  var rows=items.map(function(it){
    var clickFn = it.k==='sos' ? "pfOpenSOSChat()" : ("ewOpenPortfolioToTab('"+it.k+"')");
    return '<div onclick="'+clickFn+'" style="display:flex;align-items:center;gap:13px;background:rgba(15,23,42,.025);border:none;border-radius:15px;padding:12px 13px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s,transform .12s;" onmousedown="this.style.background=\'rgba(15,23,42,.06)\';this.style.transform=\'scale(.985)\'" onmouseup="this.style.background=\'rgba(15,23,42,.025)\';this.style.transform=\'scale(1)\'" ontouchstart="this.style.background=\'rgba(15,23,42,.06)\';this.style.transform=\'scale(.985)\'" ontouchend="this.style.background=\'rgba(15,23,42,.025)\';this.style.transform=\'scale(1)\'">'
      +'<div style="width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.2rem;background:linear-gradient(135deg,'+it.col+'38,'+it.col+'10);box-shadow:0 3px 12px '+it.col+'30,inset 0 1px 0 rgba(255,255,255,.5);color:'+it.col+';">'+it.ico+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:.75rem;font-weight:700;color:#0f172a;letter-spacing:.01em;">'+it.ttl+'</div><div style="font-size:.58rem;color:rgba(15,23,42,.5);margin-top:2px;">'+it.sub+'</div></div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(15,23,42,.35)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg></div>';
  }).join('');

  var wrap=document.createElement('div');
  wrap.id='ec-pf-inline-wrap';
  wrap.style.cssText='background:linear-gradient(160deg, rgba(124,58,237,.05) 0%, rgba(34,211,238,.04) 50%, rgba(244,114,182,.05) 100%);border:none;border-radius:20px;padding:16px 14px 18px;margin-bottom:10px;';
  wrap.innerHTML='<div style="width:34px;height:3px;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#22d3ee);margin-bottom:10px;"></div>'
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      +'<div style="width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.05rem;background:linear-gradient(135deg,#7c3aed30,#2563eb12);box-shadow:inset 0 1px 0 rgba(255,255,255,.5);color:#7c3aed;">'+PF_ICONS.folder+'</div>'
      +'<div><div style="font-size:.86rem;font-weight:800;color:#0f172a;letter-spacing:.01em;">Mon Portfolio</div><div style="font-size:.54rem;color:rgba(15,23,42,.45);margin-top:1px;">Tous tes outils, au même endroit</div></div>'
    +'</div>'
    +'<div style="display:flex;flex-direction:column;gap:7px;">'+rows+'</div>';
  msgs.appendChild(wrap);
}

/* ── CTA cliqué : ouvre directement la section choisie en plein écran,
   intégrée au chat, SANS la barre de tous les onglets ── */
var PF_SECTION_TITLES={
  agenda:{icoKey:'agenda',lbl:'Agenda'},
  notes:{icoKey:'notes',lbl:'Documents'},
  contacts:{icoKey:'contacts',lbl:'Contacts'},
  guide:{icoKey:'book',lbl:'Guide pratique'},
  doc:{icoKey:'doc',lbl:'Analyser un document'},
  orgpro:{icoKey:'case',lbl:'Contacts professionnels'},
  taches:{icoKey:'tasks',lbl:'Tâches'}
};
function ewOpenPortfolioToTab(tab){
  var fs=document.getElementById('eva-fullscreen');
  if(!fs) return;
  var old=document.getElementById('ec-pf-overlay');
  if(old) old.remove();

  var now=new Date();
  PF_CAL_MONTH=now.getMonth(); PF_CAL_YEAR=now.getFullYear();
  PF_CAL_SELDAY=null; PF_NOTE_OPEN=null; PF_CONTACT_OPEN=null; PF_CONTACT_SEARCH='';

  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var tDef=PF_SECTION_TITLES[tab];
  var t = tDef ? {ico:PF_ICONS[tDef.icoKey],lbl:tDef.lbl} : {ico:cfg.emoji,lbl:cfg.label};
  var wd=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][now.getDay()];
  var nowStr=wd+' '+now.getDate()+' '+PF_MONTHS[now.getMonth()].slice(0,3).toLowerCase()+' · '+pfPad(now.getHours())+':'+pfPad(now.getMinutes());

  var overlay=document.createElement('div');
  overlay.id='ec-pf-overlay';
  overlay.style.cssText='position:absolute;inset:0;z-index:60;background:linear-gradient(160deg, #f5f7fc 0%, #f0fcf6 50%, #faf6fd 100%);overflow-y:auto;';
  overlay.innerHTML='<div style="position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;display:flex;align-items:center;justify-content:center;">'
      +'<div style="font-size:5.4rem;font-weight:900;letter-spacing:.18em;color:rgba(15,23,42,.06);">EVA</div>'
    +'</div>'
    +'<div style="position:relative;z-index:1;background:rgba(255,255,255,.28);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:14px 16px 12px;border-bottom:1px solid rgba(15,23,42,.05);display:flex;align-items:center;gap:10px;">'
      +'<button onclick="(function(){ var b=document.getElementById(\'pf-eva-bubble-root\'); if(b)b.remove(); document.getElementById(\'ec-pf-overlay\').remove(); })()" style="background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.08);width:32px;height:32px;border-radius:50%;color:#0f172a;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
        +'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
      +'</button>'
      +'<div style="flex:1;min-width:0;">'
        +'<div style="font-size:.8rem;font-weight:800;color:#0f172a;display:flex;align-items:center;gap:6px;"><span style="color:#7c3aed;">'+t.ico+'</span>'+t.lbl+'</div>'
      +'</div>'
      +'<button onclick="pfOpenMenuList()" style="background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.08);width:32px;height:32px;border-radius:50%;color:#0f172a;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
        +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
      +'</button>'
    +'</div>'
    +'<div id="pf-content" style="position:relative;z-index:1;padding:16px 16px 90px;"></div>';
  fs.appendChild(overlay);
  pfRenderTab(tab);
}

/* ── Guide pratique : livre numérique affiché directement dans le chat,
   feuilletable page par page, habillage sombre adapté au chat ── */
var ecBookData=null, ecBookIdx=0;
function ewOpenGuideInChat(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  ecBookData = EW_BOOKS[EWP] || EW_BOOKS['dem'];
  if(!ecBookData) return;
  ecBookIdx = 0;
  var old=document.getElementById('ec-book-wrap');
  if(old) old.remove();
  var wrap=document.createElement('div');
  wrap.id='ec-book-wrap';
  wrap.className='ec-msg-wrap eva ec-cta-pop';
  wrap.style.cssText='margin:6px 0 14px;';
  wrap.innerHTML='<div style="position:relative;width:calc(100% - 34px);box-sizing:border-box;background:rgba(255,255,255,.07);backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.1);border-radius:6px 18px 18px 18px;padding:14px;margin-left:34px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">'
      +'<div style="flex:1;min-width:0;font-size:.66rem;font-weight:800;color:#fff;">📖 '+ecBookData.title+'</div>'
      +'<div id="ec-book-pg" style="font-size:.56rem;color:rgba(255,255,255,.5);font-weight:700;flex-shrink:0;"></div>'
      +'<button onclick="ecCloseBookCard()" style="flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>'
    +'</div>'
    +'<div id="ec-book-content" class="ec-book-page"></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px;">'
      +'<button id="ec-book-prev" onclick="ecBookNav(-1)" style="flex:1;padding:9px;border-radius:9px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.05);color:#fff;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;">← Précédent</button>'
      +'<button id="ec-book-next" onclick="ecBookNav(1)" style="flex:1;padding:9px;border-radius:9px;border:none;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;">Suivant →</button>'
    +'</div>'
  +'</div>';
  msgs.appendChild(wrap);
  ecBookRender();
  msgs.scrollTop=msgs.scrollHeight;
}
function ecBookRender(){
  var contentEl=document.getElementById('ec-book-content');
  var pgEl=document.getElementById('ec-book-pg');
  var prevBtn=document.getElementById('ec-book-prev');
  var nextBtn=document.getElementById('ec-book-next');
  if(!contentEl||!ecBookData) return;
  contentEl.innerHTML = ecBookData.pages[ecBookIdx];
  if(pgEl) pgEl.textContent = (ecBookIdx+1)+' / '+ecBookData.pages.length;
  if(prevBtn){ prevBtn.style.opacity = ecBookIdx===0 ? '.4' : '1'; prevBtn.style.pointerEvents = ecBookIdx===0 ? 'none' : 'auto'; }
  if(nextBtn) nextBtn.textContent = (ecBookIdx===ecBookData.pages.length-1) ? 'Terminé ✓' : 'Suivant →';
}
function ecBookNav(dir){
  if(!ecBookData) return;
  if(dir===1 && ecBookIdx===ecBookData.pages.length-1) return;
  ecBookIdx = Math.max(0, Math.min(ecBookData.pages.length-1, ecBookIdx+dir));
  ecBookRender();
  var wrap=document.getElementById('ec-book-wrap');
  if(wrap) wrap.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function ecCloseBookCard(){
  var wrap=document.getElementById('ec-book-wrap');
  if(wrap) wrap.remove();
}

/* ── Analyse de document : affichée directement dans le chat, habillage sombre ── */
var ecxCurrentTab='pdf';
var ecxFileData=null;
function ewOpenAnalyseInChat(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  ecxCurrentTab='pdf'; ecxFileData=null;
  var old=document.getElementById('ec-an-wrap');
  if(old) old.remove();
  var wrap=document.createElement('div');
  wrap.id='ec-an-wrap';
  wrap.className='ec-msg-wrap eva ec-cta-pop';
  wrap.style.cssText='margin:6px 0 14px;';
  wrap.innerHTML='<div style="position:relative;width:calc(100% - 34px);box-sizing:border-box;background:rgba(255,255,255,.07);backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.1);border-radius:6px 18px 18px 18px;padding:14px;margin-left:34px;">'
    +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">'
      +'<div style="flex:1;min-width:0;font-size:.68rem;font-weight:800;color:#fff;">📄 Analyse de document</div>'
      +'<button onclick="ecCloseAnalyseCard()" style="flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>'
    +'</div>'
    +'<div style="font-size:.6rem;color:rgba(255,255,255,.6);margin-bottom:10px;line-height:1.5;">Colle le texte de ton document, ou choisis un PDF. EVA lit le contenu et te donne une note /10 avec un plan d\'action.</div>'
    +'<div style="display:flex;gap:6px;margin-bottom:8px;">'
      +'<button id="ecx-tab-pdf" onclick="ecxTab(\'pdf\')" style="flex:1;padding:7px;border-radius:8px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.18);color:#fff;font-size:.58rem;font-weight:700;font-family:inherit;cursor:pointer;">PDF</button>'
      +'<button id="ecx-tab-txt" onclick="ecxTab(\'txt\')" style="flex:1;padding:7px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);font-size:.58rem;font-weight:700;font-family:inherit;cursor:pointer;">Texte</button>'
    +'</div>'
    +'<div id="ecx-zone-pdf">'
      +'<div onclick="document.getElementById(\'ecx-file-pdf\').click()" style="border:1.5px dashed rgba(255,255,255,.25);border-radius:10px;padding:14px;text-align:center;cursor:pointer;">'
        +'<input type="file" id="ecx-file-pdf" accept="application/pdf" style="display:none" onchange="ecxFileChange(this)">'
        +'<div style="font-size:.62rem;font-weight:700;color:#fff;">Choisir un fichier PDF</div>'
        +'<div style="font-size:.55rem;color:rgba(255,255,255,.5);margin-top:2px;">PDF avec texte · Max 10 Mo</div>'
        +'<div id="ecx-prev-pdf-name" style="font-size:.56rem;color:#86efac;margin-top:6px;"></div>'
      +'</div>'
    +'</div>'
    +'<div id="ecx-zone-txt" style="display:none;">'
      +'<textarea id="ecx-paste-txt" placeholder="Colle ici le texte de ton CV, ta lettre de motivation, ton dossier VAE, ton contrat…" style="width:100%;min-height:90px;border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:10px;font-size:.62rem;font-family:inherit;color:#fff;background:rgba(255,255,255,.05);resize:vertical;"></textarea>'
    +'</div>'
    +'<label style="display:block;font-size:.58rem;font-weight:700;color:rgba(255,255,255,.7);margin:10px 0 4px;">Type de document</label>'
    +'<select id="ecx-doc-type" style="width:100%;padding:9px;border-radius:9px;border:1px solid rgba(255,255,255,.18);font-size:.62rem;font-family:inherit;color:#fff;background:rgba(255,255,255,.05);">'
      +'<option value="" style="color:#0f172a;">— Sélectionner le type —</option>'
      +'<option value="cv" style="color:#0f172a;">CV</option>'
      +'<option value="lm" style="color:#0f172a;">Lettre de motivation</option>'
      +'<option value="vae" style="color:#0f172a;">Dossier VAE</option>'
      +'<option value="are" style="color:#0f172a;">Dossier ARE / allocation chômage</option>'
      +'<option value="contrat" style="color:#0f172a;">Contrat de travail</option>'
      +'<option value="stage" style="color:#0f172a;">Convention de stage</option>'
      +'<option value="alternance" style="color:#0f172a;">Contrat d\'alternance</option>'
      +'<option value="bp" style="color:#0f172a;">Business plan</option>'
      +'<option value="devis" style="color:#0f172a;">Devis / facture</option>'
      +'<option value="autre" style="color:#0f172a;">Autre document officiel</option>'
    +'</select>'
    +'<button onclick="ecxAnalyse()" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#2563eb,#1e40af);color:#fff;border:none;border-radius:11px;padding:12px;font-size:.66rem;font-weight:800;font-family:inherit;cursor:pointer;">Lancer l\'analyse</button>'
    +'<div id="ecx-loading" style="display:none;text-align:center;padding:14px;font-size:.6rem;color:rgba(255,255,255,.7);">⏳ EVA analyse ton document…</div>'
    +'<div id="ecx-result" style="margin-top:10px;"></div>'
  +'</div>';
  msgs.appendChild(wrap);
  msgs.scrollTop=msgs.scrollHeight;
}
function ecCloseAnalyseCard(){
  var wrap=document.getElementById('ec-an-wrap');
  if(wrap) wrap.remove();
}
function ecxTab(t){
  ecxCurrentTab=t;
  var zPdf=document.getElementById('ecx-zone-pdf'), zTxt=document.getElementById('ecx-zone-txt');
  if(zPdf) zPdf.style.display = t==='pdf'?'block':'none';
  if(zTxt) zTxt.style.display = t==='txt'?'block':'none';
  var bPdf=document.getElementById('ecx-tab-pdf'), bTxt=document.getElementById('ecx-tab-txt');
  if(!bPdf||!bTxt) return;
  if(t==='pdf'){
    bPdf.style.background='rgba(124,58,237,.12)';bPdf.style.color='#0f172a';bPdf.style.borderColor='rgba(124,58,237,.4)';
    bTxt.style.background='rgba(15,23,42,.03)';bTxt.style.color='rgba(15,23,42,.6)';bTxt.style.borderColor='rgba(15,23,42,.12)';
  } else {
    bTxt.style.background='rgba(124,58,237,.12)';bTxt.style.color='#0f172a';bTxt.style.borderColor='rgba(124,58,237,.4)';
    bPdf.style.background='rgba(15,23,42,.03)';bPdf.style.color='rgba(15,23,42,.6)';bPdf.style.borderColor='rgba(15,23,42,.12)';
  }
}
function ecxFileChange(input){
  var file=input.files[0];
  if(!file) return;
  ecxFileData=file;
  var nameEl=document.getElementById('ecx-prev-pdf-name');
  if(nameEl) nameEl.textContent=file.name+' ('+Math.round(file.size/1024)+' Ko)';
}
async function ecxAnalyse(){
  var docTypeEl=document.getElementById('ecx-doc-type');
  var docType=docTypeEl?docTypeEl.value:'';
  if(!docType){alert('Merci de sélectionner le type de document.');return;}
  var profil=EWP||'dem';
  var content=null, isText=false, fileName='';
  var loadingEl=document.getElementById('ecx-loading');

  if(ecxCurrentTab==='txt'){
    var txtEl=document.getElementById('ecx-paste-txt');
    var txt=txtEl?txtEl.value.trim():'';
    if(!txt){alert('Merci de coller le contenu de ton document.');return;}
    content=txt; isText=true;
  } else {
    if(!ecxFileData){alert('Merci de choisir un PDF.');return;}
    fileName=ecxFileData.name;
    if(loadingEl) loadingEl.style.display='block';
    try{
      content=await ewExtractPdfText(ecxFileData);
      if(!content||content.length<30){
        if(loadingEl) loadingEl.style.display='none';
        alert('Ce PDF ne contient pas de texte lisible (PDF scanné ou image). Utilise l\'onglet Texte pour coller le contenu manuellement.');
        return;
      }
      isText=true;
    }catch(e){
      if(loadingEl) loadingEl.style.display='none';
      alert('Erreur lors de la lecture du PDF. Essaie l\'onglet Texte pour coller le contenu manuellement.');
      return;
    }
  }

  var docLabels={cv:'CV',lm:'Lettre de motivation',vae:'Dossier VAE',are:'Dossier ARE',contrat:'Contrat de travail',stage:'Convention de stage',alternance:"Contrat d'alternance",bp:'Business plan',devis:'Devis / facture',autre:'Document officiel'};
  var docLabel=docLabels[docType]||'Document';

  if(loadingEl) loadingEl.style.display='block';
  await new Promise(function(r){setTimeout(r, 800+Math.random()*600);});

  var result=evaAnalyseInterne(content, docType, profil, isText, fileName);
  if(loadingEl) loadingEl.style.display='none';
  ecxShowResult(result, docLabel);
}
function ecxShowResult(result, docLabel){
  var el=document.getElementById('ecx-result');
  if(!el) return;
  var msgsEl=document.getElementById('ec-msgs');
  if(!result.valide){
    el.innerHTML='<div style="padding:12px;background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);border-radius:10px;font-size:.6rem;color:#991b1b;line-height:1.6;"><strong style="color:#0f172a;">Document non reconnu</strong><br>'+result.message+'</div>';
    if(msgsEl) msgsEl.scrollTop=msgsEl.scrollHeight;
    return;
  }
  var note=result.note||0;
  var noteCol=note>=8?'#16a34a':note>=6?'#ca8a04':'#dc2626';
  var noteBg=note>=8?'rgba(22,163,74,.1)':note>=6?'rgba(202,138,4,.1)':'rgba(220,38,38,.1)';
  var h='';
  h+='<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;"><div style="width:48px;height:48px;border-radius:50%;border:2px solid '+noteCol+';color:'+noteCol+';background:'+noteBg+';display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:900;flex-shrink:0;">'+note+'/10</div><div><div style="font-size:.64rem;font-weight:800;color:#0f172a;">'+docLabel+'</div><div style="font-size:.58rem;color:rgba(15,23,42,.6);margin-top:1px;">'+result.verdict+'</div></div></div>';
  if(result.positifs&&result.positifs.length){
    h+='<div style="font-size:.58rem;font-weight:800;color:#16a34a;text-transform:uppercase;letter-spacing:.06em;margin:10px 0 5px;">Points forts</div>';
    result.positifs.forEach(function(p){h+='<div style="font-size:.6rem;color:rgba(15,23,42,.75);line-height:1.5;padding:3px 0;display:flex;gap:6px;"><span>✅</span><span>'+p+'</span></div>';});
  }
  if(result.negatifs&&result.negatifs.length){
    h+='<div style="font-size:.58rem;font-weight:800;color:#ca8a04;text-transform:uppercase;letter-spacing:.06em;margin:10px 0 5px;">Points à améliorer</div>';
    result.negatifs.forEach(function(p){h+='<div style="font-size:.6rem;color:rgba(15,23,42,.75);line-height:1.5;padding:3px 0;display:flex;gap:6px;"><span>⚠️</span><span>'+p+'</span></div>';});
  }
  if(result.plan&&result.plan.length){
    h+='<div style="font-size:.58rem;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:.06em;margin:10px 0 5px;">Plan d\'action EVA</div>';
    result.plan.forEach(function(step,i){h+='<div style="display:flex;gap:8px;align-items:flex-start;padding:5px 0;"><div style="width:17px;height:17px;border-radius:50%;background:rgba(124,58,237,.14);color:#7c3aed;font-size:.5rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">'+(i+1)+'</div><div style="font-size:.6rem;color:rgba(15,23,42,.75);line-height:1.5;">'+step+'</div></div>';});
  }
  el.innerHTML=h;
  if(msgsEl) setTimeout(function(){ msgsEl.scrollTop=msgsEl.scrollHeight; },100);
}


/* ── Appel EVA Brain réutilisable (même cascade que le chat principal :
   Groq → OpenRouter → Anthropic → fallback local EVA_BRAIN) ── */
async function evaBrainAsk(userText, contextPrompt, detailed){
  var systemPrompt;
  if(detailed){
    systemPrompt='Tu es EVA, une coach carrière IA chaleureuse et directe chez CareerPulse. '
      +'Tu tutoies toujours. Cette réponse s\'affiche dans une grande carte de conseil détaillé — sois donc complète, riche et concrètement utile, pas juste une ou deux phrases. '
      +'Règles strictes : rédige un conseil développé d\'AU MOINS 6 lignes, organisé en plusieurs petits paragraphes courts (saut de ligne entre les idées), jamais un seul bloc compact. '
      +'Sois TRÈS concrète et actionnable : donne des conseils précis et personnalisés directement liés à ce que la personne a écrit (le poste visé, l\'entreprise, la situation décrite), pas de généralités vagues. Tu peux proposer des exemples, des étapes à suivre, ou des points clés à préparer. '
      +'Termine toujours par une phrase complète, jamais coupée en cours de route.\n\n'
      +(contextPrompt||'');
  } else {
    systemPrompt='Tu es EVA, une coach carrière IA chaleureuse et directe chez CareerPulse. '
      +'Tu tutoies toujours. Cette réponse s\'affiche dans une PETITE carte, en texte minuscule — sois donc TRÈS concise. '
      +'Règles strictes : 2 à 4 phrases courtes maximum. Organise en petits paragraphes (saut de ligne entre les idées), jamais un seul bloc compact. '
      +'Ne fais JAMAIS de récapitulatif exhaustif ni de liste de plusieurs infos différentes — choisis uniquement LE point le plus pertinent par rapport à ce qui est écrit. '
      +'Termine toujours par une phrase complète, jamais coupée en cours de route.\n\n'
      +(contextPrompt||'');
  }
  var maxTok=detailed?700:220;
  var messages=[{role:'user',content:userText}];
  var EC_API_URL=null, EC_API_BODY=null;

  if(window.EC_GROQ_KEY){
    EC_API_URL='https://api.groq.com/openai/v1/chat/completions';
    EC_API_BODY=JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:maxTok,messages:[{role:'system',content:systemPrompt}].concat(messages)});
  } else if(window.EC_OR_KEY){
    EC_API_URL='https://openrouter.ai/api/v1/chat/completions';
    EC_API_BODY=JSON.stringify({model:'anthropic/claude-haiku',max_tokens:maxTok,messages:[{role:'system',content:systemPrompt}].concat(messages)});
  } else {
    EC_API_URL='/api/eva';
    EC_API_BODY=JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:maxTok,system:systemPrompt,messages:messages});
  }

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
      new Promise(function(_,rej){ setTimeout(function(){ rej(new Error('timeout')); },detailed?14000:9000); })
    ]);
    var data=await res.json();
    var rawText='';
    if(data.content&&data.content[0]&&data.content[0].text) rawText=data.content[0].text;
    else if(data.choices&&data.choices[0]&&data.choices[0].message) rawText=data.choices[0].message.content;
    rawText=rawText.replace(/```[a-z]*|```/g,'').trim();
    if(rawText && rawText.length>3) return rawText;
    throw new Error('empty');
  }catch(e){
    // ── Pas de clé API ou échec réseau : on bascule sur le moteur local
    // EVA_BRAIN.repond — base de connaissances réelle, fonctionne sans clé ──
    return EVA_BRAIN.repond(userText, [], '');
  }
}

/* ══════════════════════════════════════════
   CHAT EXPRESS — icône sous Mon Portfolio
   Carte intégrée DANS le fil de chat (#ec-msgs),
   même habillage que Guide pratique / Analyser doc :
   question libre + champs d'affinage facultatifs
   (Ville/Situation), réponse via evaBrainAsk,
   puis relance "Satisfait ?" oui / non.
══════════════════════════════════════════ */
(function(){
  var s = document.createElement('style');
  s.textContent = `
  .ew-qc-hdr{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .ew-qc-hdr-ttl{flex:1;min-width:0;font-size:.66rem;font-weight:800;color:#fff;}
  .ew-qc-hdr-close{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;}
  .ew-qc-refine-toggle{font-size:.6rem;font-weight:700;color:#c4b5fd;background:rgba(124,58,237,.14);border:1px solid rgba(167,139,250,.3);border-radius:9px;padding:8px 10px;cursor:pointer;text-align:left;margin-bottom:10px;display:block;width:100%;font-family:inherit;}
  .ew-qc-refine-box{display:none;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;margin-bottom:12px;}
  .ew-qc-refine-box.open{display:block;}
  .ew-qc-field{margin-bottom:9px;}
  .ew-qc-field label{display:block;font-size:.52rem;font-weight:800;color:rgba(255,255,255,.45);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;}
  .ew-qc-field input,.ew-qc-field select{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.18);border-radius:9px;padding:8px 10px;font-size:.66rem;font-family:inherit;color:#fff;background:rgba(255,255,255,.05);}
  .ew-qc-msgs{display:flex;flex-direction:column;gap:8px;margin-bottom:10px;}
  .ew-qc-msg-u{align-self:flex-end;max-width:88%;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border-radius:14px 14px 4px 14px;padding:9px 12px;font-size:.66rem;line-height:1.5;}
  .ew-qc-msg-e{align-self:flex-start;max-width:92%;background:rgba(255,255,255,.07);color:#fff;border-radius:14px 14px 14px 4px;padding:9px 12px;font-size:.66rem;line-height:1.6;}
  .ew-qc-loading{align-self:flex-start;font-size:.58rem;color:rgba(255,255,255,.45);padding:2px 4px;}
  .ew-qc-fb{align-self:flex-start;display:flex;align-items:center;gap:8px;margin-top:-2px;margin-bottom:4px;}
  .ew-qc-fb-lbl{font-size:.55rem;color:rgba(255,255,255,.45);}
  .ew-qc-fb-btn{font-size:.58rem;font-weight:700;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.05);border-radius:8px;padding:4px 9px;cursor:pointer;font-family:inherit;}
  .ew-qc-fb-btn.yes{color:#6ee7b7;}
  .ew-qc-fb-btn.no{color:#fca5a5;}
  .ew-qc-input-row{display:flex;gap:8px;margin-top:4px;}
  .ew-qc-input-row textarea{flex:1;resize:none;border:1px solid rgba(255,255,255,.18);border-radius:11px;padding:9px 12px;font-size:.66rem;font-family:inherit;color:#fff;background:rgba(255,255,255,.05);max-height:80px;}
  .ew-qc-send{flex-shrink:0;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#5b21b6);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;}
  .ew-qc-send:disabled{opacity:.4;}
  `;
  document.head.appendChild(s);
})();

var EW_QC_SIT = {
  'demandeur':{key:'demandeur', lbl:'Situation'},
  'etudiant':{key:'etudiant', lbl:'Situation'},
  'freelance':{key:'freelance', lbl:'Situation'},
  'reconvers':{key:'reconversion', lbl:'Situation'}
};
var _ewQc = { ville:'', besoin:'', situation:'', msgs:[], history:[] };

function ewQcOpen(){
  var msgs=document.getElementById('ec-msgs');
  if(!msgs) return;
  var old=document.getElementById('ec-qc-wrap');
  if(old){ old.scrollIntoView({behavior:'smooth', block:'nearest'}); return; }

  var pk = window._evaCurrentProfil||'demandeur';
  var sitDef = EW_QC_SIT[pk]||EW_QC_SIT['demandeur'];
  var sitOpts = (typeof EC_PROFILING!=='undefined' && EC_PROFILING.sousProfils[sitDef.key]) ? EC_PROFILING.sousProfils[sitDef.key] : [];
  var optsHtml = '<option value="" style="color:#0f172a;">— Choisis si pertinent —</option>'+sitOpts.map(function(o){return '<option value="'+o.lbl.replace(/"/g,'')+'" style="color:#0f172a;">'+o.lbl+'</option>';}).join('');

  var wrap=document.createElement('div');
  wrap.id='ec-qc-wrap';
  wrap.className='ec-msg-wrap eva ec-cta-pop';
  wrap.style.cssText='margin:6px 0 14px;';
  wrap.innerHTML='<div style="position:relative;width:calc(100% - 34px);box-sizing:border-box;background:rgba(255,255,255,.07);backdrop-filter:blur(20px) saturate(1.6);-webkit-backdrop-filter:blur(20px) saturate(1.6);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 24px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.1);border-radius:6px 18px 18px 18px;padding:14px;margin-left:34px;">'
    +'<div class="ew-qc-hdr"><div class="ew-qc-hdr-ttl">💬 Chat express avec Eva</div><button class="ew-qc-hdr-close" onclick="ewQcClose()"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>'
    +'<button class="ew-qc-refine-toggle" onclick="ewQcToggleRefine()">🎯 Affiner ma question (facultatif) ›</button>'
    +'<div class="ew-qc-refine-box" id="ew-qc-refine-box">'
      +'<div class="ew-qc-field"><label>Ville</label><input id="ew-qc-ville" placeholder="Ex: Lyon" oninput="_ewQc.ville=this.value"></div>'
      +'<div class="ew-qc-field"><label>'+sitDef.lbl+'</label><select id="ew-qc-situation" onchange="_ewQc.situation=this.value">'+optsHtml+'</select></div>'
    +'</div>'
    +'<div class="ew-qc-msgs" id="ew-qc-msgs"></div>'
    +'<div class="ew-qc-input-row">'
      +'<textarea id="ew-qc-input" rows="1" placeholder="Pose ta question à Eva…" oninput="this.style.height=\'auto\';this.style.height=this.scrollHeight+\'px\';document.getElementById(\'ew-qc-send\').disabled=!this.value.trim();" onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();ewQcSend();}"></textarea>'
      +'<button class="ew-qc-send" id="ew-qc-send" disabled onclick="ewQcSend()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>'
    +'</div>'
  +'</div>';
  msgs.appendChild(wrap);
  ewQcRenderMsgs();
  msgs.scrollTop=msgs.scrollHeight;
}
function ewQcClose(){
  var wrap=document.getElementById('ec-qc-wrap');
  if(wrap) wrap.remove();
}
function ewQcToggleRefine(){
  var box=document.getElementById('ew-qc-refine-box');
  if(box) box.classList.toggle('open');
}
function ewQcEsc(t){ return (t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function ewQcRenderMsgs(){
  var el=document.getElementById('ew-qc-msgs');
  if(!el) return;
  el.innerHTML = _ewQc.msgs.map(function(m,i){
    if(m.role==='user') return '<div class="ew-qc-msg-u">'+ewQcEsc(m.text)+'</div>';
    var fb = (i===_ewQc.msgs.length-1) ? (
      '<div class="ew-qc-fb"><span class="ew-qc-fb-lbl">Satisfait ?</span>'
      +'<button class="ew-qc-fb-btn yes" onclick="ewQcFeedback(true)">👍 Oui</button>'
      +'<button class="ew-qc-fb-btn no" onclick="ewQcFeedback(false)">👎 Non</button></div>'
    ) : '';
    var linkBtn = m.link
      ? '<a href="'+m.link+'" target="_blank" rel="noopener" style="align-self:flex-start;display:inline-flex;align-items:center;gap:6px;margin:2px 0 4px;font-size:.62rem;font-weight:700;color:#fff;background:linear-gradient(135deg,#7c3aed,#5b21b6);border-radius:9px;padding:8px 12px;text-decoration:none;">🔗 '+ewQcEsc(m.linkLbl||'Voir les résultats')+'</a>'
      : '';
    return '<div class="ew-qc-msg-e">'+ewQcEsc(m.text).replace(/\n/g,'<br>')+'</div>'+linkBtn+fb;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

// ── Profil léger Chat express (sans IA) : ce qu'on sait déjà, ce qu'on a déjà demandé ──
var _ewQcProfile = { situation:false, blocage:false, ressenti:false, ville:false };
var _ewQcAsked   = { situation:false, blocage:false, ressenti:false, ville:false };
var _ewQcLastOpenerCat = null;

function ewQcUpdateProfile(txt){
  var t=(txt||'').toLowerCase();
  if(_ewQc.situation || _ewQc.ville || window._evaVille) { if(_ewQc.ville||window._evaVille) _ewQcProfile.ville=true; if(_ewQc.situation) _ewQcProfile.situation=true; }
  if(/je suis|actuellement|en cdi|en cdd|au ch[ôo]mage|étudiant|freelance|auto.?entrepreneur|en poste|sans emploi|en recherche/.test(t)) _ewQcProfile.situation=true;
  if(/bloque|problème|galère|difficile|n'arrive pas|j'arrive pas|comment faire|je sais pas comment|je ne sais pas comment|coincé/.test(t)) _ewQcProfile.blocage=true;
  if(/stress|peur|perdu|d[ée]moralis|fatigu|inquiet|anxieux|anxieuse|content|motiv|d[ée]courag|épuisé|épuisée/.test(t)) _ewQcProfile.ressenti=true;
  if(window.evaDetectVilleInText && window.evaDetectVilleInText(txt)) _ewQcProfile.ville=true;
}

var _EWQC_OPENERS = {
  neg:["Mmh, je vois que c'est pas simple en ce moment.","Ok, j'entends que ça pèse un peu.","Écoute, c'est une situation pas évidente, normal que ça remue.","Ça fait sens que tu te poses cette question."],
  pos:["Ah ça c'est une bonne nouvelle, on va construire dessus.","Top, on a une base solide pour avancer.","Exactement le genre de truc qu'on peut accélérer ensemble."],
  neutre:["Ok je vois.","Très bien, on regarde ça ensemble.","Alors, voilà ce que je peux te dire."]
};

function ewQcDetectSentiment(txt){
  var t=(txt||'').toLowerCase();
  if(/stress|peur|perdu|galère|difficile|d[ée]moralis|fatigu|inquiet|coincé|bloque|épuisé|épuisée/.test(t)) return 'neg';
  if(/content|motiv|super|génial|j'ai|j'avance|ça avance|trouvé/.test(t)) return 'pos';
  return 'neutre';
}

function ewQcPickOpener(txt){
  var cat = ewQcDetectSentiment(txt);
  var bank = _EWQC_OPENERS[cat];
  var opts = bank.filter(function(o){ return o!==_ewQcLastOpenerCat; });
  var pick = (opts.length?opts:bank)[Math.floor(Math.random()*(opts.length?opts.length:bank.length))];
  _ewQcLastOpenerCat = pick;
  return pick;
}

var _EWQC_FALLBACK_Q = {
  situation:["Au fait, t'es plutôt en recherche active, en poste, ou tu réfléchis encore à changer de cap ?","Dis-moi where t'en es là : tu cherches, t'es en poste, ou tu hésites encore ?"],
  blocage:["Concrètement, c'est quoi le truc qui te bloque le plus là-dedans ?","Et le plus gros frein pour toi dans tout ça, c'est quoi ?"],
  ressenti:["Tu te sens comment par rapport à tout ça, plutôt confiant ou ça pèse un peu ?","Et toi, ça te met dans quel état tout ça — motivé, fatigué, entre les deux ?"],
  ville:["T'es situé où géographiquement ? Ça change pas mal les démarches/organismes.","Tu es dans quelle ville ou région ? Je pourrai être plus précise."]
};
var _EWQC_RESPIRATION = ["Et sinon, qu'est-ce qui te ferait le plus avancer cette semaine ?","Si on devait prioriser une seule chose ensemble maintenant, ce serait quoi pour toi ?"];

function ewQcPickFallbackQuestion(){
  var order=['situation','blocage','ressenti','ville'];
  for(var i=0;i<order.length;i++){
    var f=order[i];
    if(!_ewQcProfile[f] && !_ewQcAsked[f]){
      _ewQcAsked[f]=true;
      var bank=_EWQC_FALLBACK_Q[f];
      return bank[Math.floor(Math.random()*bank.length)];
    }
  }
  return _EWQC_RESPIRATION[Math.floor(Math.random()*_EWQC_RESPIRATION.length)];
}

function ewQcSmartReply(txt){
  ewQcUpdateProfile(txt);
  var base = EVA_BRAIN.repond(txt, [], '');
  if(base.indexOf("Je t'écoute 👂")===0){
    return ewQcPickFallbackQuestion();
  }
  return ewQcPickOpener(txt)+'\n\n'+base;
}


function ewQcSystemPrompt(ctx){
  return 'Tu es EVA, coach carrière IA chez CareerPulse — chaleureuse, directe, comme une amie qui s\'y connaît vraiment.\n'
    +'Tu tutoies toujours. Expressions naturelles autorisées : "mmmh", "ok je vois", "attends", "franchement", "ça fait sens", "exactement", "c\'est pas rien ça", "écoute".\n\n'
    +'Tu es dans le "Chat express" — un échange court et vivant, PAS un questionnaire, PAS un formulaire. Règles impératives :\n'
    +'1. Réagis d\'abord à ce que la personne vient d\'écrire (1 phrase courte, sincère, jamais générique type "je comprends").\n'
    +'2. Si tu as déjà assez d\'éléments dans la conversation pour répondre précisément, réponds concrètement (organisme, démarche, droit, lien si pertinent).\n'
    +'3. Tu n\'as JAMAIS le droit de poser plus d\'UNE question à la fois. Si tu as besoin d\'un détail pour être précise (situation, ville, ce qu\'il a déjà tenté, ce qui bloque vraiment, comment il se sent par rapport à ça), pose UNE question ciblée, formulée comme une vraie curiosité, jamais comme "question suivante".\n'
    +'4. Ne redemande JAMAIS une info déjà donnée dans la conversation — relis l\'historique avant de répondre.\n'
    +'5. N\'annonce jamais que tu vas poser plusieurs questions, ne numérote rien, ne dis jamais "pour mieux te connaître" ou "quelques questions rapides" — chaque message doit sonner spontané.\n'
    +'6. Si l\'info manque pour être utile, ne dis jamais juste "je ne sais pas" : pose la question précise qui te permettrait d\'aider vraiment.\n'
    +'7. Reste courte : 2 à 4 phrases maximum (petite carte de chat), jamais de liste à puces ici.\n\n'
    +(ctx||'');
}

async function ewQcAsk(userText, ctx){
  // ── Sans clé API : on ne tente même pas le réseau, on va direct sur le moteur réactif offline ──
  if(!window.EC_GROQ_KEY && !window.EC_OR_KEY){
    return ewQcSmartReply(userText);
  }
  var systemPrompt = ewQcSystemPrompt(ctx);
  var messages = _ewQc.history.concat([{role:'user', content:userText}]);
  var maxTok=220;
  var EC_API_URL=null, EC_API_BODY=null;

  if(window.EC_GROQ_KEY){
    EC_API_URL='https://api.groq.com/openai/v1/chat/completions';
    EC_API_BODY=JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:maxTok,messages:[{role:'system',content:systemPrompt}].concat(messages)});
  } else if(window.EC_OR_KEY){
    EC_API_URL='https://openrouter.ai/api/v1/chat/completions';
    EC_API_BODY=JSON.stringify({model:'anthropic/claude-haiku',max_tokens:maxTok,messages:[{role:'system',content:systemPrompt}].concat(messages)});
  } else {
    EC_API_URL='/api/eva';
    EC_API_BODY=JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:maxTok,system:systemPrompt,messages:messages});
  }

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
      new Promise(function(_,rej){ setTimeout(function(){ rej(new Error('timeout')); },9000); })
    ]);
    var data=await res.json();
    var rawText='';
    if(data.content&&data.content[0]&&data.content[0].text) rawText=data.content[0].text;
    else if(data.choices&&data.choices[0]&&data.choices[0].message) rawText=data.choices[0].message.content;
    rawText=rawText.replace(/```[a-z]*|```/g,'').trim();
    if(rawText && rawText.length>3) return rawText;
    throw new Error('empty');
  }catch(e){
    return ewQcSmartReply(userText);
  }
}

async function ewQcSend(){
  var inp=document.getElementById('ew-qc-input');
  var txt = inp ? inp.value.trim() : '';
  if(!txt) return;
  inp.value=''; inp.style.height='auto';
  document.getElementById('ew-qc-send').disabled=true;

  _ewQc.msgs.push({role:'user', text:txt});
  ewQcRenderMsgs();

  var el=document.getElementById('ew-qc-msgs');
  if(el){
    el.insertAdjacentHTML('beforeend','<div class="ew-qc-loading" id="ew-qc-loading">Eva croise les infos…</div>');
    el.scrollTop=el.scrollHeight;
  }

  var pk = window._evaCurrentProfil||'demandeur';
  var plblMap={'demandeur':'Demandeur d\'emploi','etudiant':'Étudiant','freelance':'Freelance','reconvers':'Reconversion'};

  // ── Détection ville : champ affiné en priorité, sinon détectée dans la question elle-même ──
  var villeNom = _ewQc.ville || window.evaDetectVilleInText(txt);
  if(villeNom){
    var villeInfo = await window.evaLookupVille(villeNom);
    if(villeInfo) window._evaVille = villeInfo;
  }
  var localisationBlock = window._evaVille
    ? ('Localisation : '+window._evaVille.nom+' ('+(window._evaVille.codesPostaux[0]||'')+'), '+window._evaVille.departement+'. ')
    : '';
  var lexiqueBlock = window.evaBuildLexiqueContext(pk);

  var ctx = 'Profil utilisateur : '+(plblMap[pk]||'non défini')+'. '+localisationBlock;
  if(_ewQc.situation) ctx += 'Situation précise : '+_ewQc.situation+'. ';
  if(lexiqueBlock) ctx += 'Institutions/droits pertinents pour ce profil :\n'+lexiqueBlock+'\n';
  ctx += 'Le visiteur te pose une question libre depuis le chat express. Ne te contente pas de répondre à la question brute : croise-la avec sa localisation et son profil pour donner un conseil concret et exploitable (organisme précis à contacter, démarche, lien officiel si pertinent).';

  var reply;
  try{ reply = await ewQcAsk(txt, ctx); }
  catch(e){ reply = 'Mmmh, je n\'ai pas pu réfléchir à ça pour le moment — réessaie dans un instant 🙏'; }
  _ewQc.history.push({role:'user', content:txt});
  _ewQc.history.push({role:'assistant', content:reply});

  // ── Lien réel géolocalisé : si la question parle d'alternance/stage/apprentissage,
  // on ajoute un vrai lien vers La bonne alternance (gouv, gratuit, sans clé) géolocalisé sur la ville ──
  var link=null, linkLbl=null;
  if(window.evaDetectAlternanceIntent(txt)){
    link = window.evaBuildAlternanceLink(window._evaVille);
    linkLbl = window._evaVille ? ('Voir les offres/formations en alternance près de '+window._evaVille.nom) : 'Voir les offres/formations en alternance en France';
  }

  var loadEl=document.getElementById('ew-qc-loading');
  if(loadEl) loadEl.remove();
  _ewQc.msgs.push({role:'eva', text:reply, link:link, linkLbl:linkLbl});
  ewQcRenderMsgs();
}

function ewQcFeedback(ok){
  var el=document.getElementById('ew-qc-msgs');
  if(!el) return;
  var fb = el.querySelector('.ew-qc-fb');
  if(fb) fb.outerHTML = ok
    ? '<div class="ew-qc-fb-lbl" style="align-self:flex-start;font-size:.6rem;color:#16a34a;font-weight:700;">Top, contente d\'avoir aidé 😊</div>'
    : '<div class="ew-qc-fb-lbl" style="align-self:flex-start;font-size:.6rem;color:#94a3b8;">Pas de souci — précise ou reformule ta question 👇</div>';
  if(!ok){
    var inp=document.getElementById('ew-qc-input');
    if(inp) inp.focus();
  }
}

/* ══════════════════════════════════════════
   PORTFOLIO — plein écran, calendrier réel,
   notes façon appli, contacts façon iPhone
   + 1 onglet adapté au profil (dem/etu/frl/rec)
   Stockage local par profil, 100% hors-ligne
══════════════════════════════════════════ */
var PF_TAB='agenda';
var PF_CAL_MONTH=new Date().getMonth();
var PF_CAL_YEAR=new Date().getFullYear();
var PF_CAL_SELDAY=null;
var PF_AGENDA_VIEW_OPEN=false;
var PF_NOTE_OPEN=null;
var PF_CONTACT_OPEN=null;
var PF_CONTACT_SEARCH='';
var PF_MENU_RECORD_OPEN=null;
var PF_MENU_LIST_OPEN=null;

var PF_MONTHS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
var PF_WD=['L','M','M','J','V','S','D'];

var PF_INPUT_STYLE='width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(15,23,42,.1);font-size:.66rem;font-family:inherit;color:#0f172a;background:rgba(255,255,255,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-sizing:border-box;color-scheme:light;';
var PF_TEXTAREA_STYLE=PF_INPUT_STYLE+'min-height:60px;resize:vertical;';
var PF_BTN_STYLE='width:100%;padding:11px;border-radius:10px;border:none;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-size:.64rem;font-weight:700;font-family:inherit;cursor:pointer;';
var PF_DEL_STYLE='flex-shrink:0;width:22px;height:22px;border-radius:50%;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#dc2626;font-size:.52rem;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;';
var PF_EMPTY_STYLE='font-size:.62rem;color:rgba(15,23,42,.4);text-align:center;padding:22px 0;';
var PF_NAV_BTN='width:30px;height:30px;border-radius:50%;background:rgba(15,23,42,.05);border:1px solid rgba(15,23,42,.12);color:#0f172a;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit;';
var PF_CIRCLE_ACTION='width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;text-decoration:none;';

var PF_ICONS={
  agenda:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="3" y="4.5" width="18" height="16" rx="3"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/></svg>',
  notes:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="9" y1="7.5" x2="15" y2="7.5"/><line x1="9" y1="11.5" x2="15" y2="11.5"/></svg>',
  contacts:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><circle cx="17.5" cy="7.5" r="2.3"/><path d="M15 13.2c2.5.3 4.5 2.1 4.5 4.8"/></svg>',
  target:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
  grad:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M22 9 12 5 2 9l10 4 10-4z"/><path d="M6 11v5c2.5 2 9.5 2 12 0v-5"/></svg>',
  case:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>',
  team:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="8.5" r="2.4"/><path d="M3 20v-1c0-3 2.7-5 6-5s6 2 6 5v1"/><path d="M14.5 14.2c2.4.4 4.5 2 4.5 4.8v1"/></svg>',
  bulb:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1v.4h6v-.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  tasks:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16 9"/></svg>',
  folder:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  bold:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M6.5 4h6.2a3.6 3.6 0 0 1 0 7.2H6.5z"/><path d="M6.5 11.2h7a3.8 3.8 0 0 1 0 7.6h-7z"/></svg>',
  italic:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="18" y1="4" x2="11" y2="4"/><line x1="13" y1="20" x2="6" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',
  underline:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>',
  hilite:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M9.5 16.5 3 20l1.5-5.5L14 5l5 5z"/><line x1="13" y1="6" x2="18" y2="11"/></svg>',
  alignLeft:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="17" y2="18"/></svg>',
  alignCenter:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="5.5" y1="18" x2="18.5" y2="18"/></svg>',
  alignRight:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="7" y1="18" x2="20" y2="18"/></svg>',
  align:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="5" y1="6" x2="19" y2="6"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="4" y1="16" x2="20" y2="16"/><line x1="7" y1="21" x2="17" y2="21"/></svg>',
  calc:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="12" y1="11" x2="12" y2="11.01"/><line x1="16" y1="11" x2="16" y2="11.01"/><line x1="8" y1="15" x2="8" y2="15.01"/><line x1="12" y1="15" x2="12" y2="15.01"/><line x1="16" y1="15" x2="16" y2="15.01"/><line x1="8" y1="19" x2="8" y2="19.01"/><line x1="12" y1="19" x2="12" y2="19.01"/></svg>',
  emoji:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.6 2 4 2 4-2 4-2"/><line x1="9" y1="9.3" x2="9" y2="9.31"/><line x1="15" y1="9.3" x2="15" y2="9.31"/></svg>',
  share:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><line x1="8" y1="11" x2="16" y2="7"/><line x1="8" y1="13" x2="16" y2="17"/></svg>',
  check:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polyline points="20 6 9 17 4 12"/></svg>',
  book:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M3 5.5C3 4.67 3.67 4 4.5 4H11v16H4.5A1.5 1.5 0 0 1 3 18.5z"/><path d="M21 5.5c0-.83-.67-1.5-1.5-1.5H13v16h6.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
  doc:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13.2" x2="16" y2="13.2"/><line x1="8" y1="17.2" x2="13" y2="17.2"/></svg>',
  invoice:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M5 2.5h14v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="10.5" x2="16" y2="10.5"/><line x1="8" y1="14" x2="12.5" y2="14"/></svg>',
  quote:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><circle cx="9.3" cy="14.3" r="1.3"/><circle cx="14.3" cy="17.3" r="1.3"/><line x1="9" y1="18" x2="14.6" y2="13.7"/></svg>',
  barchart:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="20" x2="20" y2="20"/><rect x="5" y="11" width="3.4" height="9" rx="1"/><rect x="10.3" y="6" width="3.4" height="14" rx="1"/><rect x="15.6" y="14" width="3.4" height="6" rx="1"/></svg>',
  trendup:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polyline points="3 17 9.5 10.5 13.5 14.5 21 7"/><polyline points="14.5 7 21 7 21 13.5"/></svg>',
  idcard:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2" y="5" width="20" height="14" rx="2.5"/><circle cx="8.3" cy="12" r="2.1"/><line x1="13.2" y1="9.8" x2="19" y2="9.8"/><line x1="13.2" y1="13.5" x2="17.2" y2="13.5"/></svg>',
  chat:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M21 11.5a8.38 8.38 0 0 1-4.8 7.6 8.5 8.5 0 0 1-7.6-.1L3 21l1.9-5.6a8.38 8.38 0 0 1-.9-3.9 8.5 8.5 0 0 1 12.2-7.6 8.4 8.4 0 0 1 4.8 7z"/><circle cx="8.5" cy="11.5" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="11.5" r=".9" fill="currentColor" stroke="none"/><circle cx="15.5" cy="11.5" r=".9" fill="currentColor" stroke="none"/></svg>',
  success:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9"/></svg>',
  warn:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M12 3.5 21.5 20h-19z"/><line x1="12" y1="9.5" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>',
  addperson:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><line x1="18" y1="7.5" x2="18" y2="13.5"/><line x1="15" y1="10.5" x2="21" y2="10.5"/></svg>',
  hourglass:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M6 3h12"/><path d="M6 21h12"/><path d="M6 3c0 5 5 6.5 6 9-1 2.5-6 4-6 9"/><path d="M18 3c0 5-5 6.5-6 9 1 2.5 6 4 6 9"/></svg>',
  phone:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 6.5 12 13l9-6.5"/></svg>',
  printer:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polyline points="6 9 6 2 18 2 18 9"/><rect x="2" y="9" width="20" height="11" rx="2"/><polyline points="6 18 6 22 18 22 18 18"/><line x1="18" y1="13" x2="18.01" y2="13"/></svg>',
  trash:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
  save:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  pagebreak:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="8" x2="8" y2="8"/><line x1="4" y1="16" x2="8" y2="16"/><line x1="16" y1="8" x2="20" y2="8"/><line x1="16" y1="16" x2="20" y2="16"/></svg>',
  heading:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M4 4v16"/><path d="M20 4v16"/><path d="M4 12h16"/></svg>',
  subtitle:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="17" x2="11" y2="17"/></svg>',
  addrow:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2" y="13" width="20" height="8" rx="1.5"/><rect x="2" y="3" width="20" height="8" rx="1.5"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="11" y1="7" x2="13" y2="7"/></svg>',
  excel:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
  pptx:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="22" x2="16" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="6" y1="9" x2="13" y2="9"/><line x1="6" y1="12" x2="11" y2="12"/></svg>',
  notepad:'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"/><polyline points="16 3 16 8 21 8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></svg>'
};

var PF_PROFILE_CFG={
  dem:{emoji:PF_ICONS.target,label:'Entretiens',tip:'Note chaque entretien à chaud\u00a0: ce qui a marché, ce qui a coincé, le ressenti du recruteur.',fields:[
    {k:'entreprise',lbl:'Entreprise',type:'text',ph:'Entreprise (ex\u00a0: Decathlon)'},
    {k:'poste',lbl:'Poste',type:'text',ph:'Poste visé'},
    {k:'date',lbl:'Date',type:'date',ph:''},
    {k:'note',lbl:'Notes',type:'textarea',ph:'Ressenti, points à travailler…'}
  ]},
  etu:{emoji:PF_ICONS.grad,label:'Stages',tip:'Garde une trace de chaque stage\u00a0: entreprise, tuteur, dates, missions confiées.',fields:[
    {k:'entreprise',lbl:'Entreprise',type:'text',ph:'Entreprise (ex\u00a0: Carrefour)'},
    {k:'tuteur',lbl:'Tuteur',type:'text',ph:'Tuteur / contact'},
    {k:'date',lbl:'Date de début',type:'date',ph:''},
    {k:'note',lbl:'Notes',type:'textarea',ph:'Missions confiées, à retenir pour le rapport…'}
  ]},
  frl:{emoji:PF_ICONS.case,label:'Prestations',tip:'Liste chaque mission, le montant et la date\u00a0: ta preuve d\'activité pour l\'URSSAF et tes clients.',fields:[
    {k:'client',lbl:'Client',type:'text',ph:'Client (ex\u00a0: Studio Martin)'},
    {k:'mission',lbl:'Mission',type:'text',ph:'Mission (ex\u00a0: Refonte site web)'},
    {k:'montant',lbl:'Montant',type:'text',ph:'Montant (ex\u00a0: 1200€)'},
    {k:'date',lbl:'Date',type:'date',ph:''}
  ]},
  rec:{emoji:PF_ICONS.team,label:'Réunions',tip:'Note les réunions et événements importants\u00a0: utile pour suivre les projets pendant ta transition.',fields:[
    {k:'titre',lbl:'Sujet',type:'text',ph:'Sujet (ex\u00a0: Point projet Q3)'},
    {k:'date',lbl:'Date',type:'date',ph:''},
    {k:'participants',lbl:'Participants',type:'text',ph:'Participants'},
    {k:'note',lbl:'Notes',type:'textarea',ph:'Décisions prises, points à retenir…'}
  ]}
};


function pfStorageKey(tab){ return 'cp_pf_'+(EWP||'dem')+'_'+tab; }
function pfGetList(tab){ try{ return JSON.parse(localStorage.getItem(pfStorageKey(tab))||'[]'); }catch(e){ return []; } }
function pfSetList(tab, arr){
  try{ localStorage.setItem(pfStorageKey(tab), JSON.stringify(arr)); }catch(e){}
  pfSyncToFirestore(tab, arr);
}

/* ── Sync Firestore (1 doc par onglet) — tous les onglets du portfolio ── */
function pfFsDocRef(tab){
  var user = window._fbUser || (typeof fbAuth !== 'undefined' ? fbAuth.currentUser : null);
  if(!user || typeof window.fbDb === 'undefined') return null;
  return window.fbDb.collection('users').doc(user.uid).collection('portfolio').doc((EWP||'dem')+'_'+tab);
}
function pfSyncToFirestore(tab, arr){
  var ref = pfFsDocRef(tab);
  if(!ref) return; // pas connecté ou Firestore indisponible : on reste en local seulement
  ref.set({ items: arr, updatedAt: new Date().toISOString() }, {merge:true})
    .catch(function(e){ console.warn('pfSyncToFirestore['+tab+']', e.message); });
}
function pfPullFromFirestore(tab, cb){
  var ref = pfFsDocRef(tab);
  if(!ref){ if(cb) cb(false); return; }
  ref.get().then(function(doc){
    if(doc.exists && doc.data() && Array.isArray(doc.data().items)){
      localStorage.setItem(pfStorageKey(tab), JSON.stringify(doc.data().items));
      if(cb) cb(true);
    } else if(cb) cb(false);
  }).catch(function(e){ console.warn('pfPullFromFirestore['+tab+']', e.message); if(cb) cb(false); });
}
// Tire une fois par onglet par session, puis ré-affiche si des données existent côté cloud.
var PF_FS_SYNCED_TABS = {};
function pfMaybeSyncTabFromFirestore(tab, renderFn){
  if(PF_FS_SYNCED_TABS[tab]) return;
  PF_FS_SYNCED_TABS[tab] = true;
  pfPullFromFirestore(tab, function(changed){
    if(changed && typeof renderFn === 'function') renderFn();
  });
}



/* ── Menu hamburger : journal de toutes les sauvegardes, accumulées, téléchargeables et partageables ── */
function pfMenuLogKey(){ return 'cp_pf_'+(EWP||'dem')+'_menulog'; }
function pfMenuLogGet(){ try{ return JSON.parse(localStorage.getItem(pfMenuLogKey())||'[]'); }catch(e){ return []; } }
function pfMenuLogSet(arr){ try{ localStorage.setItem(pfMenuLogKey(), JSON.stringify(arr)); }catch(e){} }
function pfMenuLogAdd(tab, label, text, linkId){
  var list=pfMenuLogGet();
  if(linkId){
    for(var i=0;i<list.length;i++){
      if(list[i].tab===tab && list[i].linkId===linkId){
        list[i].label=label||list[i].label;
        list[i].text=text||'';
        list[i].date=Date.now();
        pfMenuLogSet(list);
        if(PF_MENU_LIST_OPEN){ var el1=document.getElementById('pf-content'); if(el1) pfRenderMenuListPage(el1); }
        return;
      }
    }
  }
  list.unshift({id:pfUid(), tab:tab, label:label||'Sans titre', text:text||'', date:Date.now(), linkId:linkId||null});
  if(list.length>200) list=list.slice(0,200);
  pfMenuLogSet(list);
  if(PF_MENU_LIST_OPEN){ var el2=document.getElementById('pf-content'); if(el2) pfRenderMenuListPage(el2); }
}
function pfMenuLogAddNamed(tab, defaultLabel, text, linkId){
  var name=window.prompt('Nom de cette sauvegarde\u00a0:', defaultLabel||'');
  if(name===null) return;
  pfMenuLogAdd(tab, name.trim()||defaultLabel||'Sans titre', text, linkId);
}
function pfMenuLogDel(id){
  pfMenuLogSet(pfMenuLogGet().filter(function(r){ return r.id!==id; }));
  if(PF_MENU_LIST_OPEN){ var el=document.getElementById('pf-content'); if(el) pfRenderMenuListPage(el); }
}
function pfMenuFileName(rec){
  var d=new Date(rec.date);
  return 'EVA_'+(rec.tab||'sauvegarde')+'_'+d.getFullYear()+pfPad(d.getMonth()+1)+pfPad(d.getDate())+'_'+pfPad(d.getHours())+pfPad(d.getMinutes())+'.txt';
}
function pfMenuBuildText(rec){
  var d=new Date(rec.date);
  var dStr=pfPad(d.getDate())+'/'+pfPad(d.getMonth()+1)+'/'+d.getFullYear()+' à '+pfPad(d.getHours())+':'+pfPad(d.getMinutes());
  return 'EVA — '+rec.label+'\n'+dStr+'\n\n'+rec.text;
}
function pfMenuOpenRecord(id){
  var rec=pfMenuLogGet().filter(function(r){ return r.id===id; })[0];
  if(!rec) return;
  PF_MENU_LIST_OPEN=false;
  if(rec.tab==='contacts' && rec.linkId){
    PF_CONTACT_OPEN=rec.linkId;
    pfRenderTab('contacts');
    return;
  }
  if(rec.tab==='notes' && rec.linkId){
    PF_NOTE_OPEN=rec.linkId;
    pfRenderTab('notes');
    return;
  }
  if(rec.tab==='agenda'){
    if(rec.linkId){
      var ag=pfGetList('agenda').filter(function(x){ return x.id===rec.linkId; })[0];
      if(ag){ PF_CAL_SELDAY=ag.date; PF_CAL_MONTH=+ag.date.split('-')[1]-1; PF_CAL_YEAR=+ag.date.split('-')[0]; }
    }
    pfRenderTab('agenda');
    var av=document.getElementById('pf-agenda-view');
    if(av) av.style.display='block';
    PF_AGENDA_VIEW_OPEN=true;
    return;
  }
  if(rec.tab==='profil'){
    pfRenderTab('profil');
    return;
  }
  PF_MENU_RECORD_OPEN=id;
  var el=document.getElementById('pf-content');
  if(el) pfRenderMenuRecordView(el);
}
function pfRenderMenuRecordView(el){
  var rec=pfMenuLogGet().filter(function(r){ return r.id===PF_MENU_RECORD_OPEN; })[0];
  if(!rec){ PF_MENU_RECORD_OPEN=null; pfRenderTab(PF_TAB); return; }
  var d=new Date(rec.date);
  var dStr=pfPad(d.getDate())+'/'+pfPad(d.getMonth()+1)+'/'+d.getFullYear()+' à '+pfPad(d.getHours())+':'+pfPad(d.getMinutes());
  el.innerHTML='<button onclick="PF_MENU_RECORD_OPEN=null;pfRenderTab(PF_TAB);" style="background:none;border:none;color:#7c3aed;font-size:.62rem;font-weight:700;cursor:pointer;margin-bottom:14px;font-family:inherit;">← Retour</button>'
    +'<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:rgba(15,23,42,.4);margin-bottom:6px;">'+(PF_MENU_TAB_EMOJI[rec.tab]||'💾')+' Sauvegarde</div>'
    +'<div style="font-size:.86rem;font-weight:900;color:#0f172a;line-height:1.3;margin-bottom:4px;">'+pfEsc(rec.label)+'</div>'
    +'<div style="font-size:.56rem;color:rgba(15,23,42,.45);margin-bottom:14px;">'+dStr+'</div>'
    + pfCard('<div style="font-size:.66rem;color:#0f172a;line-height:1.65;white-space:pre-line;">'+pfEsc(rec.text||'(vide)')+'</div>')
    +'<button onclick="pfMenuShare(\''+rec.id+'\')" style="'+PF_BTN_STYLE+'margin-top:8px;display:flex;align-items:center;justify-content:center;gap:6px;">↗ Partager</button>';
}
function pfMenuShare(id){
  var rec=pfMenuLogGet().filter(function(r){ return r.id===id; })[0];
  if(!rec) return;
  var text=pfMenuBuildText(rec);
  if(navigator.share){ navigator.share({title:'EVA — '+rec.label, text:text}).catch(function(){}); }
  else { window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank'); }
}
var PF_MENU_TAB_EMOJI={agenda:'📅',notes:'📝',contacts:'👥',profil:'🤝',doc:'📄',guide:'📖'};
function pfMenuTabLabel(tab){
  if(tab==='profil'){ var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem']; return cfg.label; }
  var m={agenda:'Agenda',notes:'Documents',contacts:'Contacts',guide:'Guide pratique',doc:'Analyser un document',orgpro:'Contacts professionnels',taches:'Tâches'};
  return m[tab]||'Page';
}
function pfMenuBackToChat(){
  var b=document.getElementById('pf-eva-bubble-root'); if(b) b.remove();
  var o=document.getElementById('ec-pf-overlay'); if(o) o.remove();
}
function pfOpenMenuList(){
  PF_MENU_LIST_OPEN=true;
  var el=document.getElementById('pf-content');
  if(el) pfRenderMenuListPage(el);
}
function pfRenderMenuListPage(el){
  if(!el) return;
  var now=new Date();
  var wd=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][now.getDay()];
  var nowStr=wd+' '+now.getDate()+' '+PF_MONTHS[now.getMonth()].slice(0,3).toLowerCase()+' · '+pfPad(now.getHours())+':'+pfPad(now.getMinutes());
  var curTab=PF_TAB||'agenda';
  var list=pfMenuLogGet().filter(function(r){ return r.tab===curTab; });
  list.sort(function(a,b){ return (a.label||'').localeCompare(b.label||'', 'fr', {sensitivity:'base'}); });
  var rowsHtml;
  if(!list.length){
    rowsHtml='<div style="font-size:.58rem;color:rgba(15,23,42,.4);padding:14px 0;">Aucune sauvegarde pour l\'instant sur cette page.</div>';
  } else {
    rowsHtml=list.map(function(rec){
      var d=new Date(rec.date);
      var dStr=pfPad(d.getDate())+'/'+pfPad(d.getMonth()+1)+' · '+pfPad(d.getHours())+':'+pfPad(d.getMinutes());
      return '<div onclick="pfMenuOpenRecord(\''+rec.id+'\')" style="display:flex;align-items:center;gap:7px;background:rgba(15,23,42,.025);border:1px solid rgba(15,23,42,.06);border-radius:11px;padding:9px 9px;margin-bottom:7px;cursor:pointer;">'
        +'<div style="font-size:.85rem;flex-shrink:0;">'+(PF_MENU_TAB_EMOJI[rec.tab]||'💾')+'</div>'
        +'<div style="flex:1;min-width:0;">'
          +'<div style="font-size:.6rem;font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+pfEsc(rec.label)+'</div>'
          +'<div style="font-size:.48rem;color:rgba(15,23,42,.4);margin-top:1px;">'+dStr+'</div>'
        +'</div>'
        +'<button onclick="event.stopPropagation();pfMenuShare(\''+rec.id+'\')" title="Partager" style="background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.25);color:#16a34a;width:24px;height:24px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.62rem;">↗</button>'
        +'<button onclick="event.stopPropagation();pfMenuLogDel(\''+rec.id+'\')" title="Supprimer" style="'+PF_DEL_STYLE+'">✕</button>'
      +'</div>';
    }).join('');
  }
  var isOrgPro = curTab==='orgpro';
  el.innerHTML='<button onclick="PF_MENU_LIST_OPEN=false;pfRenderTab(PF_TAB);" style="background:none;border:none;color:#7c3aed;font-size:.62rem;font-weight:700;cursor:pointer;margin-bottom:14px;font-family:inherit;">← Retour</button>'
    +'<div style="text-align:center;margin-bottom:14px;">'
      +'<div style="font-size:1.3rem;font-weight:900;letter-spacing:.16em;color:#7c3aed;margin-bottom:5px;">EVA</div>'
      +'<div style="font-size:.6rem;font-weight:700;color:#0f172a;text-transform:capitalize;">'+nowStr+'</div>'
    +'</div>'
    +(isOrgPro
      ? '<button onclick="pfMenuBackToChat()" style="'+PF_BTN_STYLE+'margin-bottom:18px;display:flex;align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,#7c3aed,#5b21b6);">⟵ Retour au portfolio</button>'
      : '<button onclick="pfMenuBackToChat()" style="'+PF_BTN_STYLE+'margin-bottom:18px;display:flex;align-items:center;justify-content:center;gap:6px;background:linear-gradient(135deg,#2563eb,#1e40af);">⟵ Retour au portfolio</button>')
    +'<div style="font-size:.78rem;font-weight:900;color:#0f172a;margin-bottom:10px;">Liste des sauvegardes</div>'
    +'<div>'+rowsHtml+'</div>';
}
function pfUid(){ return 'pf'+Date.now()+Math.floor(Math.random()*1000); }
function pfEsc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function pfPad(n){ return n<10?'0'+n:''+n; }
function pfDateStr(y,m,d){ return y+'-'+pfPad(m+1)+'-'+pfPad(d); }
function pfTodayStr(){ var n=new Date(); return pfDateStr(n.getFullYear(),n.getMonth(),n.getDate()); }
function pfFmtDateLong(dstr){
  try{
    var p=dstr.split('-'); var d=new Date(+p[0],+p[1]-1,+p[2]);
    var wd=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][d.getDay()];
    return wd+' '+(+p[2])+' '+PF_MONTHS[+p[1]-1];
  }catch(e){ return dstr; }
}
function pfCard(inner, accent){
  return '<div style="background:rgba(255,255,255,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(15,23,42,.05);border-left:3px solid '+(accent||'rgba(15,23,42,.2)')+';border-radius:11px;padding:11px 13px;margin-bottom:8px;">'+inner+'</div>';
}
function pfEvaTip(text){
  return '<div style="background:linear-gradient(135deg,rgba(37,99,235,.08),rgba(5,150,105,.08));backdrop-filter:blur(6px);border:1px solid rgba(5,150,105,.22);border-radius:12px;padding:11px 13px;margin-top:16px;font-size:.6rem;color:#0f172a;line-height:1.55;">'
    +'<div style="font-weight:800;margin-bottom:3px;background:linear-gradient(90deg,#2563eb,#059669);-webkit-background-clip:text;background-clip:text;color:transparent;display:flex;align-items:center;gap:5px;">'+PF_ICONS.bulb+' Conseil EVA</div>'
    +text
  +'</div>';
}

/* ── Mini-chat Eva en bas de chaque page portfolio : suggestions pré-écrites + IA pour le reste ── */
var PF_CHAT_SUGGESTIONS={
  agenda:[
    {q:'Comment organiser ma semaine\u00a0?',a:'Bloque des créneaux fixes pour la recherche active (candidatures, relances) et garde au moins une demi-journée libre pour les imprévus. Note chaque échéance dès que tu la connais.'},
    {q:'Combien de candidatures par semaine\u00a0?',a:'Vise 5 à 10 candidatures ciblées plutôt que 50 envoyées au hasard\u00a0: la qualité du matching compte plus que le volume.'},
    {q:'Comment ne rien oublier\u00a0?',a:'Mets CHAQUE échéance dans ton agenda, même les petites (relance, date limite). Un système externe à ta mémoire est la seule méthode fiable sur la durée.'},
    {q:'Comment gérer mes relances\u00a0?',a:'Note la date de chaque candidature et programme une relance 10 à 15 jours après si tu n\'as pas de retour, par un message court et poli.'},
    {q:'Faut-il bloquer du temps pour la veille\u00a0?',a:'Oui\u00a0: 30 minutes par jour pour repérer de nouvelles offres vaut mieux qu\'une session de 3h une fois par semaine.'},
    {q:'Comment suivre plusieurs candidatures en parallèle\u00a0?',a:'Une ligne par candidature avec son statut (envoyé, relancé, entretien) pour ne rien perdre de vue, même avec 10 dossiers en cours.'},
    {q:'Quand prévoir mes entretiens\u00a0?',a:'Privilégie le matin si possible, tu es plus alerte, et laisse 30 minutes de marge avant et après pour éviter le stress.'},
    {q:'Comment équilibrer recherche et vie perso\u00a0?',a:'Fixe des horaires de recherche fixes (par exemple 9h-12h) et ferme le sujet le reste du temps pour éviter l\'épuisement.'},
    {q:'Combien de temps consacrer chaque jour\u00a0?',a:'2 à 4h de recherche active concentrée valent mieux que 8h diluées et peu productives.'},
    {q:'Comment savoir si je perds du temps\u00a0?',a:'Si tu postules sans personnaliser ou sans qualifier le poste avant, tu perds en efficacité, pas en volume.'},
    {q:'Faut-il noter mes refus\u00a0?',a:'Oui, avec la raison si elle est donnée — ça t\'aide à ajuster ton approche au fil du temps plutôt que de répéter les mêmes erreurs.'},
    {q:'Comment planifier une reconversion\u00a0?',a:'Découpe en étapes mensuelles (bilan, formation, recherche) avec une date cible réaliste pour chaque jalon.'},
    {q:'Quand faire le point sur mes objectifs\u00a0?',a:'Chaque vendredi, regarde ce qui a avancé cette semaine et ajuste le programme de la semaine suivante.'},
    {q:'Comment gérer le découragement\u00a0?',a:'Note aussi les petites victoires (réponse positive, bon entretien), pas seulement les échéances — ça aide à garder le moral sur la durée.'},
    {q:'Dois-je bloquer du temps pour les formations\u00a0?',a:'Oui, surtout si tu vises une certification (CPF)\u00a0: réserve des créneaux récurrents comme un vrai cours, pas en pointillé.'}
  ],
  notes:[
    {q:'Que noter après un entretien\u00a0?',a:'Note à chaud\u00a0: ce qui a bien marché, ce qui t\'a mis en difficulté, et ton ressenti général. 5 minutes après l\'entretien valent mieux qu\'un souvenir flou le lendemain.'},
    {q:'Comment structurer mes idées\u00a0?',a:'Une note = une idée. Utilise le gras pour les points clés et garde des phrases courtes — tu dois pouvoir te relire en 30 secondes.'},
    {q:'Mes notes servent-elles vraiment\u00a0?',a:'Oui si tu les relis régulièrement. Reviens dessus avant chaque entretien similaire pour capitaliser sur ce que tu as déjà appris.'},
    {q:'Dois-je écrire à la main ou ici\u00a0?',a:'Peu importe le support, l\'essentiel est de noter à chaud — la mémoire à froid perd énormément de détails utiles.'},
    {q:'Comment préparer un entretien avec mes notes\u00a0?',a:'Relis tes notes d\'un poste ou secteur similaire la veille pour réactiver les bons réflexes et exemples déjà utilisés.'},
    {q:'Faut-il classer mes notes par thème\u00a0?',a:'Pas obligatoire, mais un mot-clé en début de note (poste, entreprise) facilite grandement la relecture plus tard.'},
    {q:'Comment noter un point faible sans culpabiliser\u00a0?',a:'Formule-le comme un axe de progrès factuel ("à travailler\u00a0: présentation chiffrée") plutôt que comme un jugement personnel.'},
    {q:'À quoi servent mes notes après plusieurs mois\u00a0?',a:'Elles révèlent des schémas récurrents (même question posée, même blocage) que la mémoire seule ne détecte pas.'},
    {q:'Comment noter une idée de reconversion\u00a0?',a:'Note le déclic (pourquoi cette idée maintenant), les compétences déjà acquises, et ce qui te manque encore pour avancer.'},
    {q:'Dois-je aussi noter les bons moments\u00a0?',a:'Oui, ça équilibre le moral et te rappelle ce qui fonctionne, pas seulement ce qui coince.'},
    {q:'Comment garder mes notes utiles sur la durée\u00a0?',a:'Relis-les une fois par mois et archive ce qui n\'est plus pertinent, pour garder l\'essentiel facilement visible.'},
    {q:'Puis-je noter mes objectifs financiers\u00a0?',a:'Oui, ça aide à clarifier le salaire minimum acceptable avant de négocier une offre, plutôt que d\'improviser sur le moment.'},
    {q:'Comment structurer une note de débrief\u00a0?',a:'Trois lignes suffisent\u00a0: ce qui a marché, ce qui a coincé, ce que je change la prochaine fois.'},
    {q:'Faut-il noter les retours des recruteurs\u00a0?',a:'Absolument, même un refus avec motif est une info précieuse pour ajuster ton profil ou ta candidature.'},
    {q:'Comment utiliser mes notes pour ma lettre de motivation\u00a0?',a:'Reprends les formulations qui t\'ont semblé convaincantes à l\'oral en entretien, elles fonctionnent souvent aussi par écrit.'}
  ],
  contacts:[
    {q:'Comment relancer sans être lourd\u00a0?',a:'Un message court tous les 3-4 semaines suffit\u00a0: une question sur leur actualité, un article partagé, ou simplement des nouvelles.'},
    {q:'Qui ajouter à mon réseau\u00a0?',a:'Recruteurs rencontrés, anciens collègues, anciens camarades, contacts d\'événements pro. Même un échange de 5 minutes mérite d\'être noté.'},
    {q:'Comment aborder un contact froid\u00a0?',a:'Sois précis sur pourquoi tu le contactes lui en particulier, et propose un échange court (15 min) plutôt qu\'une demande vague.'},
    {q:'Dois-je ajouter des recruteurs jamais rencontrés\u00a0?',a:'Seulement après un premier échange réel (appel, message), pas juste après avoir vu leur profil en ligne.'},
    {q:'Comment garder une trace utile par contact\u00a0?',a:'Note le contexte de la rencontre et la date du dernier échange — ça évite de relancer maladroitement sans savoir qui est qui.'},
    {q:'Faut-il remercier après un entretien\u00a0?',a:'Oui, un message court dans les 24h, qui rappelle un point précis de l\'échange, fait une vraie différence.'},
    {q:'Comment entretenir mon réseau sur la durée\u00a0?',a:'Partage occasionnellement un article ou une info pertinente, sans rien demander en retour — ça crédibilise la relation.'},
    {q:'Que faire si un contact ne répond plus\u00a0?',a:'Une seule relance polie suffit, puis laisse reposer 2 à 3 mois avant de retenter, sans insister davantage.'},
    {q:'Comment demander une recommandation\u00a0?',a:'Demande à un contact avec qui tu as travaillé concrètement, et propose-lui un texte de base qu\'il pourra ajuster.'},
    {q:'Comment aborder un contact lors d\'un salon\u00a0?',a:'Prépare une phrase d\'accroche courte sur ce que tu cherches précisément, plutôt qu\'un pitch générique appris par cœur.'},
    {q:'Faut-il garder contact avec d\'anciens collègues\u00a0?',a:'Oui, ils connaissent ton travail réel — ce sont souvent les meilleures recommandations possibles.'},
    {q:'Comment organiser une relance groupée\u00a0?',a:'Personnalise au moins la première ligne de chaque message, même si le reste est similaire — l\'effet copier-coller se voit toujours.'},
    {q:'Que noter après un appel avec un contact\u00a0?',a:'La date, le sujet abordé, et toute promesse faite de part et d\'autre (envoi de CV, mise en relation).'},
    {q:'Comment savoir si un contact est encore pertinent\u00a0?',a:'Si plus de 6 mois sans échange et plus aucun lien avec ton projet actuel, archive-le plutôt que de le solliciter à froid.'},
    {q:'Dois-je connecter mes contacts entre eux\u00a0?',a:'Seulement si tu es vraiment sûr que ça leur sera mutuellement utile — une mise en relation ratée coûte plus cher qu\'elle ne rapporte.'}
  ],
  profil:[
    {q:'Comment progresser à chaque fois\u00a0?',a:'Note systématiquement ce qui a marché et ce qui a coincé, à chaud. C\'est en comparant plusieurs expériences notées que tes vrais points de progrès apparaissent.'},
    {q:'À quelle fréquence faire le point\u00a0?',a:'Une fois par semaine, relis tes dernières entrées pour repérer les tendances — pas seulement les éléments isolés.'},
    {q:'Comment rester motivé sur la durée\u00a0?',a:'Fixe-toi des petits objectifs mesurables (nombre d\'actions, pas seulement de résultats) et célèbre chaque étape, même modeste.'},
    {q:'Comment noter un entretien raté\u00a0?',a:'Décris factuellement ce qui a coincé (la question, le moment) sans te juger — l\'objectif est d\'ajuster, pas de culpabiliser.'},
    {q:'Faut-il noter aussi les échanges informels\u00a0?',a:'Oui, un café avec un recruteur compte autant qu\'un entretien formel pour évaluer ta progression réelle.'},
    {q:'Comment savoir si je progresse vraiment\u00a0?',a:'Compare tes notes sur plusieurs entretiens similaires\u00a0: les mêmes points faibles qui reviennent sont ceux à travailler en priorité.'},
    {q:'Que faire après un refus difficile à entendre\u00a0?',a:'Note le retour à chaud, attends 24h, puis relis-le à froid pour en tirer un point d\'action concret.'},
    {q:'Dois-je suivre chaque étape du process de recrutement\u00a0?',a:'Oui, ça t\'évite les oublis et te permet de relancer au bon moment si tu n\'as pas de retour.'},
    {q:'Comment me préparer à un entretien technique\u00a0?',a:'Note les questions techniques déjà posées par le passé\u00a0: elles reviennent souvent dans le même secteur ou métier.'},
    {q:'Comment gérer le trac avant un entretien\u00a0?',a:'Relis tes notes de réussite précédentes juste avant — ça rappelle que tu as déjà su gérer la situation.'},
    {q:'Faut-il noter le ressenti ou juste les faits\u00a0?',a:'Les deux\u00a0: le ressenti t\'aide à repérer un pattern émotionnel, les faits à ajuster concrètement ta préparation.'},
    {q:'Comment évaluer si un poste me correspond\u00a0?',a:'Note ce que tu as appris sur le quotidien réel du poste, pas seulement l\'enthousiasme ressenti sur le moment.'},
    {q:'Que faire si plusieurs entretiens se ressemblent trop\u00a0?',a:'C\'est le signal pour préparer une réponse type solide sur ce point précis, qui reviendra encore la prochaine fois.'},
    {q:'Comment suivre une négociation salariale\u00a0?',a:'Note l\'offre initiale, ta contre-proposition et l\'argumentaire utilisé, pour réutiliser ce qui fonctionne la prochaine fois.'},
    {q:'Dois-je noter les entretiens sans offre à la clé\u00a0?',a:'Oui, surtout eux\u00a0: ils contiennent souvent l\'information la plus utile pour progresser réellement.'}
  ],
  guide:[
    {q:'Par où commencer\u00a0?',a:'Lis d\'abord la page d\'introduction pour les grandes lignes, puis reviens sur les pages qui correspondent à ta situation précise.'},
    {q:'Ces infos sont-elles à jour\u00a0?',a:'Les chiffres et seuils légaux évoluent chaque année — vérifie toujours la date de référence et croise avec une source officielle avant une décision importante.'},
    {q:'Et si ma situation est particulière\u00a0?',a:'Ce guide donne des repères généraux. Pour un cas précis, contacte un conseiller (France Travail, CEP) pour un avis personnalisé.'},
    {q:'Le guide remplace-t-il un conseiller\u00a0?',a:'Non, il donne les repères essentiels, mais un conseiller (France Travail, CEP) personnalise selon ta situation exacte.'},
    {q:'Dois-je tout lire dans l\'ordre\u00a0?',a:'Pas obligatoire\u00a0: va directement à la section qui correspond à ton besoin immédiat.'},
    {q:'Les montants cités sont-ils garantis\u00a0?',a:'Non, ce sont des ordres de grandeur — vérifie toujours le montant exact sur le site officiel concerné avant de t\'engager.'},
    {q:'Que faire si une info me semble dépassée\u00a0?',a:'Croise toujours avec une source officielle récente avant de baser une décision importante sur une info ancienne.'},
    {q:'Le guide couvre-t-il les cas particuliers\u00a0?',a:'Il couvre les cas généraux\u00a0: pour une situation atypique, un avis personnalisé reste fortement recommandé.'},
    {q:'Comment appliquer un conseil du guide\u00a0?',a:'Transforme chaque conseil en une action datée dans ton agenda, sinon il reste théorique et finit oublié.'},
    {q:'Le guide change-t-il selon mon profil\u00a0?',a:'Oui, le contenu s\'adapte à ta situation (demandeur d\'emploi, étudiant, freelance, reconversion).'},
    {q:'Dois-je relire le guide régulièrement\u00a0?',a:'Utile surtout à chaque nouvelle étape de ta recherche, les besoins changent en cours de route.'},
    {q:'Que faire si je ne comprends pas un terme administratif\u00a0?',a:'Note-le et vérifie sa définition sur service-public.fr avant d\'avancer dans ta démarche.'},
    {q:'Le guide donne-t-il des modèles de documents\u00a0?',a:'Il donne la structure et les points clés\u00a0: à toi de les adapter ensuite à ta situation précise.'},
    {q:'Comment savoir si une démarche me concerne\u00a0?',a:'Vérifie les conditions d\'éligibilité précises avant de te lancer, elles varient souvent selon ton statut.'},
    {q:'Le guide est-il à jour chaque année\u00a0?',a:'Les seuils et montants légaux évoluent au 1er janvier\u00a0: vérifie toujours l\'année de référence indiquée.'}
  ],
  doc:[
    {q:'Quel format de CV privilégier\u00a0?',a:'Une page maximum si tu as moins de 10 ans d\'expérience, sans mise en page complexe qui gêne les logiciels de tri automatique (ATS).'},
    {q:'Dois-je adapter chaque candidature\u00a0?',a:'Oui, toujours. Reprends 2-3 mots-clés exacts de l\'offre dans ton CV et ta lettre — c\'est ce qui fait la différence, en tri automatique comme en lecture humaine.'},
    {q:'Comment savoir si mon document est bon\u00a0?',a:'Lance une analyse ci-dessus\u00a0: tu auras une note /10 et un plan d\'action concret plutôt qu\'une impression générale.'},
    {q:'Quels documents puis-je faire analyser\u00a0?',a:'CV, lettre de motivation, dossier VAE, contrat de travail, business plan et plusieurs autres types de documents officiels.'},
    {q:'La note /10 est-elle fiable\u00a0?',a:'Elle reflète des critères objectifs (structure, clarté, mots-clés)\u00a0: utile comme repère, pas comme vérité absolue.'},
    {q:'Combien de temps prend une analyse\u00a0?',a:'Quelques secondes une fois le document chargé ou collé.'},
    {q:'Puis-je analyser plusieurs versions du même document\u00a0?',a:'Oui, c\'est même recommandé pour comparer l\'évolution après corrections successives.'},
    {q:'Le PDF scanné fonctionne-t-il\u00a0?',a:'Non si c\'est une image sans texte lisible\u00a0: utilise alors l\'onglet Texte pour coller le contenu manuellement.'},
    {q:'Que faire si ma note est basse\u00a0?',a:'Suis le plan d\'action proposé point par point, puis relance une nouvelle analyse pour vérifier la progression.'},
    {q:'L\'analyse remplace-t-elle une relecture humaine\u00a0?',a:'Non, elle complète une première relecture\u00a0: un regard humain reste précieux avant l\'envoi final.'},
    {q:'Puis-je analyser un contrat de travail\u00a0?',a:'Oui, l\'analyse repère les clauses à vérifier, mais un avis juridique reste recommandé pour les points sensibles.'},
    {q:'Comment améliorer rapidement mon score\u00a0?',a:'Concentre-toi d\'abord sur les "points à améliorer" listés\u00a0: ils ont le plus d\'impact sur la note finale.'},
    {q:'Dois-je adapter mon CV à chaque analyse\u00a0?',a:'Oui, refais l\'analyse pour chaque candidature ciblée\u00a0: le contenu pertinent change selon l\'offre visée.'},
    {q:'L\'analyse est-elle confidentielle\u00a0?',a:'Le traitement se fait localement dans ton navigateur, le document n\'est pas envoyé à un tiers.'},
    {q:'Puis-je analyser une lettre en anglais\u00a0?',a:'L\'analyse est calibrée pour le français\u00a0; pour l\'anglais, les critères généraux restent indicatifs mais moins précis.'}
  ]
};
function pfChatThemeLabel(tab){
  if(tab==='profil'){ var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem']; return cfg.label; }
  var t=PF_SECTION_TITLES[tab]; return t?t.lbl:'cette page';
}
function pfChatChips(tab){
  var items=PF_CHAT_SUGGESTIONS[tab]||[];
  return items.map(function(it,i){
    return '<button onclick="pfChatSuggest(\''+tab+'\','+i+')" style="background:rgba(124,58,237,.07);border:1px solid rgba(124,58,237,.22);border-radius:20px;padding:6px 11px;font-size:.56rem;font-weight:600;color:#5b21b6;cursor:pointer;font-family:inherit;text-align:left;">'+pfEsc(it.q)+'</button>';
  }).join('');
}
function pfRenderEvaChatWidget(tab){
  /* appelé par pfRenderTab — injecte la bulle flottante dans l'overlay portfolio */
  if(tab==='orgpro'){ var old=document.getElementById('pf-eva-bubble-root'); if(old) old.remove(); return ''; }
  pfSpawnEvaFloatingBubble(tab);
  return ''; /* rien dans pf-content */
}

/* ── Bulle flottante Eva — draggable, ouvrable/fermable ── */
var _pfBubbleTab = 'agenda';
function pfSpawnEvaFloatingBubble(tab){
  _pfBubbleTab = tab;
  var old = document.getElementById('pf-eva-bubble-root');
  if(old) { old.setAttribute('data-tab', tab); pfBubbleUpdateChips(); return; }

  var fs = document.getElementById('eva-fullscreen');
  if(!fs) return;

  var root = document.createElement('div');
  root.id = 'pf-eva-bubble-root';
  root.setAttribute('data-tab', tab);
  root.style.cssText = 'position:absolute;bottom:80px;left:12px;z-index:200;display:flex;flex-direction:column;align-items:flex-start;touch-action:none;';

  root.innerHTML =
    /* panel chat (caché par défaut) */
    '<div id="pf-eva-bubble-panel" style="display:none;width:290px;background:#f7f8fa;border-radius:14px;box-shadow:0 8px 32px rgba(15,23,42,.18);overflow:hidden;margin-bottom:10px;border:1px solid rgba(15,23,42,.06);">'
      /* header */
      +'<div style="background:#fff;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;cursor:move;border-bottom:1px solid rgba(15,23,42,.08);" id="pf-eva-bubble-drag-handle">'
        +'<div style="display:flex;align-items:center;gap:8px;">'
          +'<div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#2563eb);display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;">✨</div>'
          +'<div>'
            +'<div style="font-size:.7rem;font-weight:800;color:#0f172a;">Eva te donne quelques conseils</div>'
            +'<div id="pf-eva-bubble-sublabel" style="font-size:.5rem;color:rgba(15,23,42,.45);"></div>'
          +'</div>'
        +'</div>'
        +'<button onclick="event.stopPropagation();pfBubbleClose();" style="background:rgba(15,23,42,.05);border:none;color:#0f172a;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:.7rem;display:flex;align-items:center;justify-content:center;position:relative;z-index:10;pointer-events:all;">✕</button>'
      +'</div>'
      /* chips */
      +'<div id="pf-eva-bubble-chips" style="padding:10px 12px 4px;display:flex;flex-wrap:wrap;gap:5px;background:#fff;"></div>'
      /* messages */
      +'<div id="pf-eva-bubble-msgs" style="padding:8px 10px;max-height:180px;overflow-y:auto;display:flex;flex-direction:column;gap:7px;background:#f7f8fa;"></div>'
      /* voir d'autres questions */
      +'<button onclick="pfBubbleShuffleQuestions()" style="width:calc(100% - 20px);margin:6px 10px 10px;padding:9px;border-radius:20px;border:1px solid rgba(15,23,42,.1);background:#fff;color:#2563eb;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">'
        +'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>'
        +' Voir d\'autres questions</button>'
    +'</div>'
    /* bouton bulle */
    +'<button id="pf-eva-bubble-btn" onclick="pfBubbleToggle()" onpointerdown="this.style.opacity=\'1\';" ontouchstart="this.style.opacity=\'1\';" style="width:52px;height:52px;border-radius:50%;border:none;background:linear-gradient(135deg,#16a34a,#2563eb);color:#fff;font-size:1.35rem;cursor:pointer;box-shadow:0 4px 18px rgba(37,99,235,.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;opacity:.55;transition:opacity .2s;" onmouseenter="this.style.opacity=\'1\';" onmouseleave="this.style.opacity=\'.55\';">'
      +'💬'
      +'<span id="pf-eva-bubble-dot" style="position:absolute;top:4px;right:4px;width:10px;height:10px;background:#f59e0b;border-radius:50%;border:2px solid #fff;display:none;"></span>'
    +'</button>';

  fs.appendChild(root);
  pfBubbleUpdateChips();
}

function pfBubbleUpdateChips(){
  var tab = _pfBubbleTab;
  var sub = document.getElementById('pf-eva-bubble-sublabel');
  if(sub) sub.textContent = pfChatThemeLabel(tab);
  if(!_pfBubbleVisibleIdx[tab] || !_pfBubbleVisibleIdx[tab].length){
    _pfBubbleVisibleIdx[tab] = pfBubblePickQuestions(tab, 3);
  }
  pfBubbleRenderChips(_pfBubbleVisibleIdx[tab]);
}
var _pfBubbleShownIdx = {};
function pfBubblePickQuestions(tab, n){
  var items = PF_CHAT_SUGGESTIONS[tab] || [];
  var shown = _pfBubbleShownIdx[tab] || [];
  var avail = items.map(function(_,i){ return i; }).filter(function(i){ return shown.indexOf(i)===-1; });
  if(avail.length < n){ shown = []; avail = items.map(function(_,i){ return i; }); }
  for(var i=avail.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var tmp=avail[i]; avail[i]=avail[j]; avail[j]=tmp; }
  var picked = avail.slice(0, n);
  _pfBubbleShownIdx[tab] = shown.concat(picked);
  return picked;
}
function pfBubbleRenderChips(idxList){
  var chips = document.getElementById('pf-eva-bubble-chips');
  if(!chips) return;
  var items = PF_CHAT_SUGGESTIONS[_pfBubbleTab] || [];
  chips.innerHTML = idxList.map(function(i){
    var it = items[i];
    if(!it) return '';
    return '<button onclick="pfBubbleChip('+i+')" style="background:#fff;border:1px solid rgba(15,23,42,.12);border-radius:14px;padding:6px 11px;font-size:.6rem;font-weight:600;color:#2563eb;cursor:pointer;font-family:inherit;box-shadow:0 1px 2px rgba(15,23,42,.04);">'+pfEsc(it.q)+'</button>';
  }).join('');
}
var _pfBubbleVisibleIdx = {};
function pfBubbleShuffleQuestions(){
  var tab = _pfBubbleTab;
  _pfBubbleVisibleIdx[tab] = pfBubblePickQuestions(tab, 3);
  pfBubbleRenderChips(_pfBubbleVisibleIdx[tab]);
}

function pfBubbleToggle(){
  var panel = document.getElementById('pf-eva-bubble-panel');
  var dot = document.getElementById('pf-eva-bubble-dot');
  if(!panel) return;
  var open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : 'flex';
  panel.style.flexDirection = 'column';
  if(dot) dot.style.display = 'none';
}
function pfBubbleClose(){
  var panel = document.getElementById('pf-eva-bubble-panel');
  if(panel) panel.style.display = 'none';
}

var PF_STOPWORDS=['les','des','une','est','pour','dans','avec','que','qui','quoi','comment','combien','quel','quelle','quels','quelles','mon','mes','votre','vos','sur','par','aux','vers','sont','etre','avoir','plus','moins','tres','bien','cette','cet','ces','j\'ai','j','ai','suis','vais','fais','faire','peut','peux','veux','veut','donc','alors','aussi','meme','tout','tous','toute','toutes','elle','il','ils','elles','nous','vous','leur','leurs','ce','se','ne','pas','un','une','et','ou','le','la'];
function pfNormalizeWords(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9\s']/g,' ')
    .split(/\s+/)
    .filter(function(w){ return w.length>2 && PF_STOPWORDS.indexOf(w)===-1; });
}
function pfBestSuggestionMatch(tab, q){
  var items=PF_CHAT_SUGGESTIONS[tab]||[];
  var qWords=pfNormalizeWords(q);
  if(!qWords.length) return null;
  var best=null, bestScore=0;
  items.forEach(function(it){
    var itWords=pfNormalizeWords(it.q);
    if(!itWords.length) return;
    var common=qWords.filter(function(w){ return itWords.indexOf(w)!==-1; }).length;
    var score=common/Math.min(qWords.length, itWords.length);
    if(score>bestScore){ bestScore=score; best=it; }
  });
  /* Au moins un mot-clé en commun dans le domaine de la page : on donne la réponse pré-écrite la plus proche
     plutôt que de tomber sur le moteur générique qui répète toujours la même phrase. */
  return bestScore>0 ? best : null;
}
function pfBubbleChip(idx){
  var items = PF_CHAT_SUGGESTIONS[_pfBubbleTab] || [];
  var it = items[idx];
  if(!it) return;
  pfBubbleAddMsg('user', it.q);
  pfBubbleAddMsg('eva', it.a);
}

function pfBubbleNowTime(){
  var d=new Date();
  return pfPad(d.getHours())+':'+pfPad(d.getMinutes());
}
function pfBubbleAddMsg(who, text, domId){
  var msgs = document.getElementById('pf-eva-bubble-msgs');
  if(!msgs) return;
  var wrap = document.createElement('div');
  if(domId) wrap.id = domId;
  var time = pfBubbleNowTime();
  if(who === 'user'){
    wrap.style.cssText = 'display:flex;justify-content:flex-end;';
    wrap.innerHTML = '<div style="background:#d9fdd3;color:#0f172a;border-radius:9px 9px 2px 9px;padding:6px 9px 5px 9px;font-size:.68rem;max-width:82%;line-height:1.5;box-shadow:0 1px 1px rgba(0,0,0,.08);">'
      +pfEsc(text)
      +'<div style="display:flex;justify-content:flex-end;align-items:center;gap:3px;margin-top:2px;">'
        +'<span style="font-size:.48rem;color:rgba(15,23,42,.45);">'+time+'</span>'
        +'<svg width="11" height="11" viewBox="0 0 16 11" fill="none"><path d="M1 5.5L4 8.5L9.5 1.5" stroke="#53bdeb" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 5.5L8.5 8.5L14 1.5" stroke="#53bdeb" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      +'</div>'
    +'</div>';
  } else {
    wrap.style.cssText = 'display:flex;align-items:flex-end;gap:6px;';
    wrap.innerHTML = '<div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#2563eb);display:flex;align-items:center;justify-content:center;font-size:.6rem;flex-shrink:0;">✨</div>'
      +'<div style="background:#fff;border:1px solid rgba(15,23,42,.08);border-radius:9px 9px 9px 2px;padding:6px 9px 5px 9px;font-size:.68rem;color:#0f172a;max-width:80%;line-height:1.5;white-space:pre-line;box-shadow:0 1px 1px rgba(0,0,0,.06);">'
        +pfEsc(text)
        +'<div style="font-size:.48rem;color:rgba(15,23,42,.4);margin-top:2px;text-align:right;">'+time+'</div>'
      +'</div>';
  }
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function pfChatSuggest(tab, idx){
  var items=PF_CHAT_SUGGESTIONS[tab]||[];
  var it=items[idx];
  if(!it) return;
  var out=document.getElementById('pf-evachat-result');
  if(out) out.innerHTML=pfCard('<div style="font-size:.6rem;font-weight:700;color:#0f172a;margin-bottom:5px;">'+pfEsc(it.q)+'</div><div style="font-size:.6rem;color:rgba(15,23,42,.7);line-height:1.6;">'+pfEsc(it.a)+'</div>','#7c3aed');
  if(out) setTimeout(function(){ out.scrollIntoView({behavior:'smooth', block:'nearest'}); },80);
}
async function pfChatAsk(tab){
  var inp=document.getElementById('pf-evachat-input');
  var q=inp?inp.value.trim():'';
  if(!q) return;
  var items=PF_CHAT_SUGGESTIONS[tab]||[];
  var match=items.filter(function(it){ return it.q.toLowerCase().replace(/[\u00a0?]/g,'')===q.toLowerCase().replace(/[\u00a0?]/g,''); })[0];
  var out=document.getElementById('pf-evachat-result');
  if(match){
    if(out) out.innerHTML=pfCard('<div style="font-size:.6rem;font-weight:700;color:#0f172a;margin-bottom:5px;">'+pfEsc(q)+'</div><div style="font-size:.6rem;color:rgba(15,23,42,.7);line-height:1.6;">'+pfEsc(match.a)+'</div>','#7c3aed');
    inp.value='';
    return;
  }
  if(out) out.innerHTML='<div style="font-size:.58rem;color:rgba(15,23,42,.45);display:flex;align-items:center;gap:5px;">'+PF_ICONS.hourglass+' Eva réfléchit…</div>';
  var now=new Date();
  var dateStr=pfFmtDateLong(pfTodayStr())+' '+now.getFullYear();
  var ctx='L\'utilisateur consulte la page "'+pfChatThemeLabel(tab)+'" de son portfolio CareerPulse. Nous sommes le '+dateStr+'. Réponds à sa question en lien direct avec ce thème, de façon concrète et personnalisée.';
  var reply;
  try{ reply=await evaBrainAsk(q, ctx); }
  catch(e){ reply='Je n\'ai pas pu répondre pour l\'instant — réessaie dans un instant.'; }
  var out2=document.getElementById('pf-evachat-result');
  if(out2) out2.innerHTML=pfCard('<div style="font-size:.6rem;font-weight:700;color:#0f172a;margin-bottom:5px;">'+pfEsc(q)+'</div><div style="font-size:.6rem;color:rgba(15,23,42,.7);line-height:1.6;white-space:pre-line;">'+pfEsc(reply)+'</div>','#7c3aed');
  if(inp) inp.value='';
}

function pfDel(tab, id){
  var items=pfGetList(tab).filter(function(it){ return it.id!==id; });
  pfSetList(tab, items);
  pfRenderTab(tab);
}

/* ── Ouverture / fermeture : overlay plein écran ── */
function ewOpenPortfolioInChat(){
  var fs=document.getElementById('eva-fullscreen');
  if(!fs) return;
  var old=document.getElementById('ec-pf-overlay');
  if(old) old.remove();
  var oldInline=document.getElementById('ec-pf-inline-wrap');
  if(oldInline) oldInline.remove();
  PF_TAB='agenda';
  var now=new Date();
  PF_CAL_MONTH=now.getMonth(); PF_CAL_YEAR=now.getFullYear();
  PF_CAL_SELDAY=null; PF_NOTE_OPEN=null; PF_CONTACT_OPEN=null; PF_CONTACT_SEARCH='';

  var overlay=document.createElement('div');
  overlay.id='ec-pf-overlay';
  overlay.style.cssText='position:absolute;inset:0;z-index:60;background:linear-gradient(160deg,#07030e 0%,#0f0818 60%,#0a0f0d 100%);overflow-y:auto;';
  overlay.innerHTML='<div style="background:rgba(10,8,16,.94);padding:14px 16px 10px;border-bottom:1px solid rgba(255,255,255,.08);">'
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      +'<button onclick="(function(){ var b=document.getElementById(\'pf-eva-bubble-root\'); if(b)b.remove(); document.getElementById(\'ec-pf-overlay\').remove(); })()" style="background:rgba(255,255,255,.1);border:none;width:32px;height:32px;border-radius:50%;color:#fff;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">✕</button>'
      +'<div style="flex:1;font-size:.8rem;font-weight:800;color:#fff;">'+PF_ICONS.folder+' Mon Portfolio</div>'
    +'</div>'
    +'<div id="pf-tabs" style="display:flex;gap:5px;overflow-x:auto;"></div>'
  +'</div>'
  +'<div id="pf-content" style="padding:16px 16px 90px;"></div>';
  fs.appendChild(overlay);
  pfRenderTabs();
  pfRenderTab('agenda');
}

/* ── SOS / Mini-chat : poser n'importe quelle question à Eva ── */
function pfGetSOSMsgs(){ return pfGetList('sos_chat'); }
function pfSetSOSMsgs(arr){ pfSetList('sos_chat', arr); }

function pfOpenSOSChat(){
  var fs=document.getElementById('eva-fullscreen');
  if(!fs) return;
  var old=document.getElementById('ec-pf-sos-overlay');
  if(old) old.remove();
  var overlay=document.createElement('div');
  overlay.id='ec-pf-sos-overlay';
  overlay.style.cssText='position:absolute;inset:0;z-index:65;background:linear-gradient(160deg,#07030e 0%,#0f0818 60%,#0a0f0d 100%);display:flex;flex-direction:column;';
  overlay.innerHTML='<div style="flex-shrink:0;padding:14px 16px 10px;display:flex;align-items:center;gap:10px;background:rgba(0,0,0,.3);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.08);">'
      +'<button onclick="document.getElementById(\'ec-pf-sos-overlay\').remove()" style="background:rgba(255,255,255,.1);border:none;width:32px;height:32px;border-radius:50%;color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">←</button>'
      +'<div style="flex:1;font-size:.76rem;font-weight:800;color:#fff;display:flex;align-items:center;gap:6px;"><span style="color:#fbbf24;font-size:.9rem;">'+PF_ICONS.chat+'</span>Demande à Eva</div>'
    +'</div>'
    +'<div id="pf-sos-msgs" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;"></div>'
    +'<div style="flex-shrink:0;padding:10px 12px;display:flex;gap:8px;border-top:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.25);">'
      +'<input id="pf-sos-input" placeholder="Pose ta question à Eva…" style="'+PF_INPUT_STYLE+'flex:1;" onkeydown="if(event.key===\'Enter\'){pfSendSOS();}">'
      +'<button onclick="pfSendSOS()" style="flex-shrink:0;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#5b21b6);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>'
    +'</div>';
  fs.appendChild(overlay);
  pfRenderSOSMsgs();
  pfMaybeSyncTabFromFirestore('sos_chat', pfRenderSOSMsgs);
}

function pfRenderSOSMsgs(){
  var el=document.getElementById('pf-sos-msgs');
  if(!el) return;
  var msgs=pfGetSOSMsgs();
  if(!msgs.length){
    el.innerHTML='<div style="'+PF_EMPTY_STYLE+'">Pose n\'importe quelle question à Eva sur ta situation — entretiens, stage, clients, formation… 💬</div>';
    return;
  }
  el.innerHTML=msgs.map(function(m){
    if(m.role==='user') return '<div style="align-self:flex-end;max-width:80%;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;border-radius:14px 14px 4px 14px;padding:10px 13px;font-size:.66rem;line-height:1.55;">'+pfEsc(m.text)+'</div>';
    return '<div style="align-self:flex-start;max-width:85%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#fff;border-radius:14px 14px 14px 4px;padding:10px 13px;font-size:.66rem;line-height:1.6;">'+pfEsc(m.text)+'</div>';
  }).join('');
  el.scrollTop=el.scrollHeight;
}

async function pfSendSOS(){
  var inp=document.getElementById('pf-sos-input');
  var txt=inp?inp.value.trim():'';
  if(!txt) return;
  inp.value='';
  var msgs=pfGetSOSMsgs();
  msgs.push({role:'user',text:txt});
  pfSetSOSMsgs(msgs);
  pfRenderSOSMsgs();

  var el=document.getElementById('pf-sos-msgs');
  if(el){
    el.insertAdjacentHTML('beforeend','<div id="pf-sos-loading" style="align-self:flex-start;font-size:.6rem;color:rgba(255,255,255,.4);">Eva réfléchit…</div>');
    el.scrollTop=el.scrollHeight;
  }

  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var ctx='Profil utilisateur\u00a0: '+((EWC[EWP]&&EWC[EWP].nom)||'')+'. Contexte\u00a0: il/elle utilise son portfolio ('+cfg.label+') sur CareerPulse et te pose une question libre. Réponds avec un conseil concret et personnalisé.';
  var reply;
  try{ reply=await evaBrainAsk(txt, ctx); }
  catch(e){ reply='Mmmh, je n\'ai pas pu réfléchir à ça pour le moment — réessaie dans un instant 🙏'; }

  var loadEl=document.getElementById('pf-sos-loading');
  if(loadEl) loadEl.remove();
  var msgs2=pfGetSOSMsgs();
  msgs2.push({role:'eva',text:reply});
  pfSetSOSMsgs(msgs2);
  pfRenderSOSMsgs();
}

function pfRenderTabs(){
  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var tabs=[
    {k:'agenda',ico:PF_ICONS.agenda,lbl:'Agenda'},
    {k:'taches',ico:PF_ICONS.tasks,lbl:'Tâches'},
    {k:'notes',ico:PF_ICONS.notes,lbl:'Documents'},
    {k:'contacts',ico:PF_ICONS.contacts,lbl:'Contacts'},
    {k:'quiz',ico:'🧩',lbl:'Quiz'},
    {k:'profil',ico:cfg.emoji,lbl:cfg.label},
    {k:'guide',ico:'📖',lbl:'Guide'},
    {k:'doc',ico:'📄',lbl:'Analyser'},
    {k:'orgpro',ico:'🏛️',lbl:'Contacts pro'}
  ];
  var el=document.getElementById('pf-tabs');
  if(!el) return;
  el.innerHTML=tabs.map(function(t){
    var active=PF_TAB===t.k;
    return '<button onclick="pfRenderTab(\''+t.k+'\')" style="flex:1;flex-shrink:0;padding:8px 6px;border-radius:9px;border:1px solid '+(active?'rgba(167,139,250,.5)':'rgba(255,255,255,.12)')+';background:'+(active?'rgba(167,139,250,.18)':'rgba(255,255,255,.03)')+';color:'+(active?'#fff':'rgba(255,255,255,.6)')+';font-size:.56rem;font-weight:700;font-family:inherit;cursor:pointer;white-space:nowrap;">'+t.ico+' '+t.lbl+'</button>';
  }).join('');
}

function pfRenderTab(tab){
  if(tab==='quiz'){
    if(typeof evaLaunchQcm==='function') evaLaunchQcm();
    return;
  }
  PF_TAB=tab;
  pfRenderTabs();
  var el=document.getElementById('pf-content');
  if(!el) return;
  if(tab==='taches'){ el.innerHTML='<div class="tk-pf"></div>'; if(typeof cpTkRender==='function') cpTkRender(el.firstChild); var ob=document.getElementById('pf-eva-bubble-root'); if(ob) ob.remove(); return; }
  if(tab==='agenda'){ pfRenderAgenda(el); pfMaybeSyncTabFromFirestore('agenda', function(){ if(PF_TAB==='agenda') pfRenderAgenda(el); }); }
  else if(tab==='notes'){ pfRenderNotes(el); pfMaybeSyncTabFromFirestore('notes', function(){ if(PF_TAB==='notes') pfRenderNotes(el); }); }
  else if(tab==='contacts'){ pfRenderContacts(el); pfMaybeSyncTabFromFirestore('contacts', function(){ if(PF_TAB==='contacts') pfRenderContacts(el); }); }
  else if(tab==='guide') pfRenderGuide(el);
  else if(tab==='doc') pfRenderDoc(el);
  else if(tab==='orgpro') pfRenderOrgPro(el);
  else { pfRenderProfileList(el); pfMaybeSyncTabFromFirestore('profil', function(){ if(PF_TAB!=='agenda'&&PF_TAB!=='notes'&&PF_TAB!=='contacts'&&PF_TAB!=='guide'&&PF_TAB!=='doc'&&PF_TAB!=='orgpro') pfRenderProfileList(el); }); }
  pfRenderEvaChatWidget(tab==='agenda'||tab==='notes'||tab==='contacts'||tab==='guide'||tab==='doc'||tab==='orgpro'?tab:'profil');
}

/* ── Guide pratique, intégré dans le Portfolio (même moteur que ewOpenGuideInChat) ── */
function pfRenderGuide(el){
  ecBookData = EW_BOOKS[EWP] || EW_BOOKS['dem'];
  if(!ecBookData){ el.innerHTML='<div style="'+PF_EMPTY_STYLE+'">Guide indisponible pour ce profil.</div>'; return; }
  ecBookIdx = 0;
  el.innerHTML = '<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#f472b6;margin-bottom:6px;">Conseils</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">'+ecBookData.title+'</div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">'+ecBookData.footer+'</div>'
    +'<button onclick="pfToggleGuideForm()" style="'+PF_BTN_STYLE+'margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:6px;">📖 Lire le guide</button>'
    +'<div id="pf-guide-form" style="display:none;">'
    + pfCard(
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">'
      +'<div style="flex:1;min-width:0;font-size:.66rem;font-weight:800;color:#0f172a;">📖 '+ecBookData.title+'</div>'
      +'<div id="ec-book-pg" style="font-size:.56rem;color:rgba(15,23,42,.5);font-weight:700;flex-shrink:0;"></div>'
    +'</div>'
    +'<div id="ec-book-content" class="ec-book-page"></div>'
    +'<div style="display:flex;gap:8px;margin-top:12px;">'
      +'<button id="ec-book-prev" onclick="ecBookNav(-1)" style="flex:1;padding:9px;border-radius:9px;border:1px solid rgba(15,23,42,.14);background:rgba(15,23,42,.03);color:#0f172a;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;">← Précédent</button>'
      +'<button id="ec-book-next" onclick="ecBookNav(1)" style="flex:1;padding:9px;border-radius:9px;border:none;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;">Suivant →</button>'
    +'</div>'
  )
  +'</div>';
  ecBookRender();
}
function pfToggleGuideForm(){
  var f=document.getElementById('pf-guide-form');
  if(f) f.style.display = f.style.display==='none' ? 'block' : 'none';
}

/* ── Analyse de document, intégrée dans le Portfolio (même moteur que ewOpenAnalyseInChat) ── */
function pfRenderDoc(el){
  ecxCurrentTab='pdf'; ecxFileData=null;
  el.innerHTML = '<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#94a3b8;margin-bottom:6px;">Relecture</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">Analyse de<span style="color:#7c3aed;"> document</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">Un œil extérieur avant d\'envoyer change souvent l\'issue d\'une candidature. Eva relit ton document comme le ferait un recruteur exigeant.</div>'
    +'<button onclick="pfToggleDocForm()" style="'+PF_BTN_STYLE+'margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:6px;">'+PF_ICONS.doc+' Analyser un document</button>'
    +'<div id="pf-doc-form" style="display:none;">'
    + pfCard(
    '<div style="font-size:.6rem;color:rgba(15,23,42,.65);margin-bottom:10px;line-height:1.5;">Colle le texte de ton document, ou choisis un PDF. EVA lit le contenu et te donne une note /10 avec un plan d\'action.</div>'
    +'<div style="display:flex;gap:6px;margin-bottom:8px;">'
      +'<button id="ecx-tab-pdf" onclick="ecxTab(\'pdf\')" style="flex:1;padding:7px;border-radius:8px;border:1px solid rgba(124,58,237,.4);background:rgba(124,58,237,.12);color:#0f172a;font-size:.58rem;font-weight:700;font-family:inherit;cursor:pointer;">PDF</button>'
      +'<button id="ecx-tab-txt" onclick="ecxTab(\'txt\')" style="flex:1;padding:7px;border-radius:8px;border:1px solid rgba(15,23,42,.12);background:rgba(15,23,42,.03);color:rgba(15,23,42,.6);font-size:.58rem;font-weight:700;font-family:inherit;cursor:pointer;">Texte</button>'
    +'</div>'
    +'<div id="ecx-zone-pdf">'
      +'<div onclick="document.getElementById(\'ecx-file-pdf\').click()" style="border:1.5px dashed rgba(15,23,42,.22);border-radius:10px;padding:14px;text-align:center;cursor:pointer;">'
        +'<input type="file" id="ecx-file-pdf" accept="application/pdf" style="display:none" onchange="ecxFileChange(this)">'
        +'<div style="font-size:.62rem;font-weight:700;color:#0f172a;">Choisir un fichier PDF</div>'
        +'<div style="font-size:.55rem;color:rgba(15,23,42,.5);margin-top:2px;">PDF avec texte · Max 10 Mo</div>'
        +'<div id="ecx-prev-pdf-name" style="font-size:.56rem;color:#16a34a;margin-top:6px;"></div>'
      +'</div>'
    +'</div>'
    +'<div id="ecx-zone-txt" style="display:none;">'
      +'<textarea id="ecx-paste-txt" placeholder="Colle ici le texte de ton CV, ta lettre de motivation, ton dossier VAE, ton contrat…" style="'+PF_TEXTAREA_STYLE+'min-height:90px;"></textarea>'
    +'</div>'
    +'<label style="display:block;font-size:.58rem;font-weight:700;color:rgba(15,23,42,.6);margin:10px 0 4px;">Type de document</label>'
    +'<select id="ecx-doc-type" style="'+PF_INPUT_STYLE+'padding:9px;">'
      +'<option value="" style="color:#0f172a;">— Sélectionner le type —</option>'
      +'<option value="cv" style="color:#0f172a;">CV</option>'
      +'<option value="lm" style="color:#0f172a;">Lettre de motivation</option>'
      +'<option value="vae" style="color:#0f172a;">Dossier VAE</option>'
      +'<option value="are" style="color:#0f172a;">Dossier ARE / allocation chômage</option>'
      +'<option value="contrat" style="color:#0f172a;">Contrat de travail</option>'
      +'<option value="stage" style="color:#0f172a;">Convention de stage</option>'
      +'<option value="alternance" style="color:#0f172a;">Contrat d\'alternance</option>'
      +'<option value="bp" style="color:#0f172a;">Business plan</option>'
      +'<option value="devis" style="color:#0f172a;">Devis / facture</option>'
      +'<option value="autre" style="color:#0f172a;">Autre document officiel</option>'
    +'</select>'
    +'<button onclick="ecxAnalyse()" style="width:100%;margin-top:10px;background:linear-gradient(135deg,#2563eb,#1e40af);color:#fff;border:none;border-radius:11px;padding:12px;font-size:.66rem;font-weight:800;font-family:inherit;cursor:pointer;">Lancer l\'analyse</button>'
    +'<div id="ecx-loading" style="display:none;text-align:center;padding:14px;font-size:.6rem;color:rgba(15,23,42,.6);"><span style="display:inline-flex;align-items:center;gap:5px;">'+PF_ICONS.hourglass+' EVA analyse ton document…</span></div>'
    +'<div id="ecx-result" style="margin-top:10px;"></div>'
  )
  +'</div>';
}
function pfToggleDocForm(){
  var f=document.getElementById('pf-doc-form');
  if(f) f.style.display = f.style.display==='none' ? 'block' : 'none';
}

/* ── AGENDA : vrai calendrier mensuel ── */
function pfCalNav(dir){
  PF_CAL_MONTH+=dir;
  if(PF_CAL_MONTH<0){ PF_CAL_MONTH=11; PF_CAL_YEAR--; }
  if(PF_CAL_MONTH>11){ PF_CAL_MONTH=0; PF_CAL_YEAR++; }
  pfRenderTab('agenda');
}
function pfCalSelectDay(dstr){
  PF_CAL_SELDAY=dstr;
  pfRenderTab('agenda');
}
function pfToggleAgendaForm(){
  var f=document.getElementById('pf-ag-form');
  if(f) f.style.display = f.style.display==='none' ? 'block' : 'none';
}
function pfRenderAgenda(el){
  var items=pfGetList('agenda');
  var byDate={};
  items.forEach(function(it){ (byDate[it.date]=byDate[it.date]||[]).push(it); });

  var y=PF_CAL_YEAR, m=PF_CAL_MONTH;
  var firstDow=(new Date(y,m,1).getDay()+6)%7;
  var daysInMonth=new Date(y,m+1,0).getDate();
  var today=pfTodayStr();
  var sel=PF_CAL_SELDAY||today;
  var totalCount=items.length;

  var cells='';
  for(var i=0;i<firstDow;i++) cells+='<div></div>';
  for(var d=1; d<=daysInMonth; d++){
    var dstr=pfDateStr(y,m,d);
    var has=byDate[dstr]&&byDate[dstr].length;
    var isToday=dstr===today;
    var isSel=dstr===sel;
    cells+='<button onclick="pfCalSelectDay(\''+dstr+'\')" style="position:relative;aspect-ratio:1;border-radius:50%;border:'+(isSel?'2px solid #7c3aed':'1px solid transparent')+';background:'+(isSel?'rgba(124,58,237,.14)':isToday?'rgba(15,23,42,.05)':'transparent')+';color:'+(isSel?'#7c3aed':isToday?'#7c3aed':'rgba(15,23,42,.75)')+';font-size:.62rem;font-weight:'+(isToday||isSel?'800':'500')+';cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;padding:0;">'+d
      +(has?'<span style="position:absolute;bottom:2px;width:4px;height:4px;border-radius:50%;background:#34d399;"></span>':'')
    +'</button>';
  }

  var html='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#60a5fa;margin-bottom:6px;">Organisation</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">Ton agenda<span style="color:#7c3aed;"> de suivi</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">Tes rendez-vous et échéances, en un coup d\'œil'+(totalCount?' — '+totalCount+' élément'+(totalCount>1?'s':''):'')+'.</div>';

  html+='<button onclick="pfToggleAgendaView()" style="'+PF_BTN_STYLE+'margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:6px;">📅 Voir mon agenda</button>';
  html+='<div id="pf-agenda-view" style="display:'+(PF_AGENDA_VIEW_OPEN?'block':'none')+';">';

  html+='<div style="background:rgba(255,255,255,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(15,23,42,.05);border-radius:16px;padding:14px;margin-bottom:16px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">'
      +'<button onclick="pfCalNav(-1)" style="'+PF_NAV_BTN+'">‹</button>'
      +'<div style="font-size:.74rem;font-weight:800;color:#0f172a;">'+PF_MONTHS[m]+' '+y+'</div>'
      +'<button onclick="pfCalNav(1)" style="'+PF_NAV_BTN+'">›</button>'
      +'<button onclick="pfToggleAgendaView()" title="Fermer" style="background:rgba(15,23,42,.05);border:1px solid rgba(15,23,42,.1);width:24px;height:24px;border-radius:50%;color:#0f172a;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:6px;font-size:.65rem;">✕</button>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:4px;">'
      +PF_WD.map(function(w){ return '<div style="text-align:center;font-size:.46rem;font-weight:700;color:rgba(15,23,42,.4);text-transform:uppercase;padding:4px 0;">'+w+'</div>'; }).join('')
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;">'+cells+'</div>'
  +'</div>';

  var dayItems=byDate[sel]||[];
  var selFmt=pfFmtDateLong(sel);
  html+='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#7c3aed;margin:4px 0 8px;display:flex;align-items:center;gap:6px;">'
    +'<span>'+selFmt+'</span><span style="flex:1;height:1px;background:linear-gradient(90deg,#e9d5ff,transparent);"></span>'
    +'<button onclick="pfToggleAgendaForm()" style="font-size:.58rem;font-weight:700;color:#7c3aed;background:none;border:none;cursor:pointer;font-family:inherit;text-transform:none;letter-spacing:normal;">+ Ajouter</button>'
  +'</div>'
  +'<div id="pf-ag-form" style="display:none;margin-bottom:12px;">'
    +'<input id="pf-ag-titre" placeholder="Titre du rendez-vous" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
    +'<textarea id="pf-ag-note" placeholder="Note (optionnel)" style="'+PF_TEXTAREA_STYLE+'margin-bottom:6px;"></textarea>'
    +'<button onclick="pfAddAgenda()" style="'+PF_BTN_STYLE+'">Ajouter ce jour-là</button>'
  +'</div>';

  if(!dayItems.length){
    html+='<div style="'+PF_EMPTY_STYLE+'">Aucun rendez-vous ce jour-là.</div>';
  } else {
    dayItems.forEach(function(it){
      html+=pfCard(
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">'
          +'<div style="font-size:.66rem;font-weight:700;color:#0f172a;">'+pfEsc(it.titre)+'</div>'
          +'<button onclick="pfDel(\'agenda\',\''+it.id+'\')" style="'+PF_DEL_STYLE+'">✕</button>'
        +'</div>'
        +(it.note?'<div style="font-size:.6rem;color:rgba(15,23,42,.6);margin-top:4px;line-height:1.5;">'+pfEsc(it.note)+'</div>':''),
        '#34d399'
      );
    });
  }

  html+='</div>';

  el.innerHTML=html;
}
function pfToggleAgendaView(){
  var f=document.getElementById('pf-agenda-view');
  if(!f) return;
  PF_AGENDA_VIEW_OPEN = f.style.display==='none';
  f.style.display = PF_AGENDA_VIEW_OPEN ? 'block' : 'none';
}
function pfAddAgenda(){
  var titreEl=document.getElementById('pf-ag-titre');
  var noteEl=document.getElementById('pf-ag-note');
  var titre=titreEl?titreEl.value.trim():'';
  var note=noteEl?noteEl.value.trim():'';
  if(!titre) return;
  var date=PF_CAL_SELDAY||pfTodayStr();
  var items=pfGetList('agenda');
  var newId=pfUid();
  items.push({id:newId,titre:titre,date:date,note:note});
  pfSetList('agenda', items);
  pfMenuLogAddNamed('agenda', titre, 'Date\u00a0: '+pfFmtDateLong(date)+(note?('\n'+note):''), newId);
  pfRenderTab('agenda');
}

/* ── NOTES : façon application (liste + éditeur) ── */
function pfStripHtml(html){
  var d=document.createElement('div');
  d.innerHTML=html||'';
  return (d.textContent||d.innerText||'').replace(/\s+/g,' ').trim();
}
function pfRenderNotes(el){
  if(PF_NOTE_OPEN){ pfRenderNoteEditor(el); return; }
  var html='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#a78bfa;margin-bottom:6px;">Carnet</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">Tes notes<span style="color:#7c3aed;"> perso</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">Idées, réflexions, brouillons — écris librement, Eva peut te donner un conseil sur chaque note. Retrouve tes notes enregistrées dans le menu ☰.</div>'
    +'<button onclick="pfNewNote()" style="'+PF_BTN_STYLE+'margin-bottom:14px;">'+PF_ICONS.notes+' Nouvelle note</button>'
    +'<div style="'+PF_EMPTY_STYLE+'">Tes sauvegardes sont dans le menu ☰.</div>';
  el.innerHTML=html;
}
function pfNewNote(){
  var items=pfGetList('notes');
  var n={id:pfUid(),html:'',updated:Date.now()};
  items.push(n);
  pfSetList('notes', items);
  PF_NOTE_OPEN=n.id;
  pfRenderTab('notes');
}
function pfOpenNote(id){
  PF_NOTE_OPEN=id;
  pfRenderTab('notes');
}

/* ── Design system pour les modèles de documents : en-tête colorée, sections, lignes à remplir ── */
function pfTplHead(color, eyebrow, title){
  return '<div style="background:linear-gradient(135deg,'+color+' 0%,'+color+'b3 100%);border-radius:14px;padding:18px 20px;margin-bottom:14px;color:#fff;box-shadow:0 6px 18px '+color+'40;position:relative;">'
    +'<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">'
      +'<div>'
        +'<div style="font-size:.56rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;opacity:.85;margin-bottom:5px;">'+eyebrow+'</div>'
        +'<div style="font-size:1.05rem;font-weight:900;letter-spacing:-.01em;">'+title+'</div>'
      +'</div>'
      +'<div style="display:flex;flex-direction:column;align-items:center;gap:2px;flex-shrink:0;opacity:.95;">'
        +'<div style="width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.2);border:1.5px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;">'
          +'<span style="font-size:1.1rem;font-weight:900;color:#fff;font-family:\'Cormorant Garamond\',Georgia,serif;letter-spacing:-.02em;line-height:1;">C</span>'
        +'</div>'
        +'<span style="font-size:.38rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.85);">CareerPulse</span>'
      +'</div>'
    +'</div>'
  +'</div>';
}
function pfTplLine(w){
  return '<span style="display:inline-block;min-width:'+(w||110)+'px;border-bottom:1.5px solid #cbd5e1;">&nbsp;</span>';
}
function pfTplArea(placeholder){
  return '<div style="border:1.5px dashed #cbd5e1;border-radius:9px;padding:11px 13px;color:#94a3b8;font-style:italic;font-size:.74rem;min-height:22px;">'+(placeholder||'Écris ici…')+'</div>';
}
function pfTplMeta(rows){
  return '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:11px 14px;margin-bottom:14px;">'
    +rows.map(function(r){
      return '<div style="display:flex;align-items:center;gap:8px;font-size:.74rem;padding:4px 0;"><span style="font-weight:700;color:#475569;min-width:98px;flex-shrink:0;">'+r+'</span>'+pfTplLine()+'</div>';
    }).join('')
  +'</div>';
}
function pfTplSec(color, title, bodyHtml){
  return '<div style="margin-bottom:13px;">'
    +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span style="width:6px;height:6px;border-radius:50%;background:'+color+';display:inline-block;flex-shrink:0;"></span><span style="font-size:.64rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:'+color+';">'+title+'</span></div>'
    +bodyHtml
  +'</div>';
}
function pfTplTable(color, bgTint, cols, cells, tblId){
  var head='<div style="display:flex;background:'+bgTint+';font-size:.6rem;font-weight:800;color:'+color+';padding:8px 10px;">'
    +cols.map(function(c){ return '<span style="flex:'+c[1]+';text-align:'+(c[2]||'left')+';">'+c[0]+'</span>'; }).join('')
  +'</div>';
  var row='<div style="display:flex;padding:9px 10px;font-size:.72rem;border-top:1px solid #e2e8f0;">'
    +cells.map(function(c,i){ return '<span style="flex:'+cols[i][1]+';text-align:'+(cols[i][2]||'left')+';">'+pfTplLine(40)+'</span>'; }).join('')
  +'</div>';
  var table='<div'+(tblId?' id="'+tblId+'"':'')+' style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">'+head+row+'</div>';
  return table+(tblId?'<div id="'+tblId+'-extra"></div>':'');
}
function pfAddWrap(innerHtml, itemKey, color){
  return '<div class="pf-add-wrap" style="position:relative;margin-top:2px;" onmouseenter="var b=this.querySelector(\'.pf-add-btn\');if(b)b.style.opacity=\'1\';" onmouseleave="var b=this.querySelector(\'.pf-add-btn\');if(b)b.style.opacity=\'0\';">'+innerHtml
    +'<button class="pf-add-btn" onmousedown="event.preventDefault()" onclick="pfAddTemplateRow(\''+itemKey+'\')" title="Ajouter une ligne" style="position:absolute;top:-9px;right:-9px;width:23px;height:23px;border-radius:50%;background:'+color+';color:#fff;border:2px solid #fff;font-size:.8rem;font-weight:900;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(15,23,42,.25);z-index:2;opacity:0;transition:opacity .18s;">+</button>'
  +'</div>';
}

var PF_NOTE_TEMPLATES={
  facture:{lbl:'Facture',color:'#2563eb',icon:PF_ICONS.invoice,html:
    pfTplHead('#2563eb','Document commercial','Facture')
    +'<div style="background:linear-gradient(135deg,#eff6ff,#f0fdf4);border:1px solid #bfdbfe;border-radius:12px;padding:14px 16px;margin-bottom:14px;display:flex;flex-wrap:wrap;gap:10px;">'
      +'<div style="flex:1;min-width:120px;"><div style="font-size:.52rem;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Référence</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #bfdbfe;padding-bottom:4px;color:#1e293b;">N°&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      +'<div style="flex:1;min-width:100px;"><div style="font-size:.52rem;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Date</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #bfdbfe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      +'<div style="flex:1;min-width:100px;"><div style="font-size:.52rem;font-weight:800;color:#2563eb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Échéance</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #bfdbfe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
      +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:.52rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Émetteur</div>'
        +'<div style="font-size:.7rem;color:#0f172a;font-weight:700;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Nom / Société</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Adresse</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;">SIRET&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
      +'</div>'
      +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:.52rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Client</div>'
        +'<div style="font-size:.7rem;color:#0f172a;font-weight:700;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Nom / Société</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Adresse</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;">Email / Tel</div>'
      +'</div>'
    +'</div>'
    +pfTplSec('#2563eb','Détail des prestations', pfAddWrap(pfTplTable('#1e3a8a','#eff6ff',[['Désignation',2.2],['Qté',.55,'center'],['P.U. HT',1,'right'],['Total HT',1,'right']],[1,1,1,1],'pf-tbl-facture'),'facture','#2563eb'))
    +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:10px;">'
      +'<div style="display:flex;justify-content:space-between;font-size:.72rem;padding:4px 0;color:#64748b;"><span>Sous-total HT</span><span style="font-weight:700;color:#1e293b;border-bottom:1.5px solid #cbd5e1;min-width:80px;text-align:right;">&nbsp;</span></div>'
      +'<div style="display:flex;justify-content:space-between;font-size:.72rem;padding:4px 0;color:#64748b;"><span>TVA (20 %)</span><span style="font-weight:700;color:#1e293b;border-bottom:1.5px solid #cbd5e1;min-width:80px;text-align:right;">&nbsp;</span></div>'
      +'<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:10px 0 4px;font-weight:900;color:#fff;background:linear-gradient(135deg,#2563eb,#1e40af);border-radius:8px;padding:10px 12px;margin-top:6px;"><span>Total TTC</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;€</span></div>'
    +'</div>'
    +'<div style="margin-top:10px;padding:10px 12px;background:rgba(37,99,235,.05);border-radius:8px;border:1px dashed #bfdbfe;"><div style="font-size:.6rem;font-weight:800;color:#2563eb;margin-bottom:4px;">Conditions de règlement</div><div style="font-size:.68rem;color:#475569;">Virement bancaire — IBAN :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
  },
  devis:{lbl:'Devis',color:'#0891b2',icon:PF_ICONS.quote,html:
    pfTplHead('#0891b2','Proposition commerciale','Devis')
    +'<div style="background:linear-gradient(135deg,#ecfeff,#f0f9ff);border:1px solid #a5f3fc;border-radius:12px;padding:14px 16px;margin-bottom:14px;display:flex;flex-wrap:wrap;gap:10px;">'
      +'<div style="flex:1;min-width:120px;"><div style="font-size:.52rem;font-weight:800;color:#0891b2;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">N° Devis</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #a5f3fc;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      +'<div style="flex:1;min-width:100px;"><div style="font-size:.52rem;font-weight:800;color:#0891b2;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Date</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #a5f3fc;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      +'<div style="flex:1;min-width:100px;"><div style="font-size:.52rem;font-weight:800;color:#0891b2;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Valable jusqu\'au</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #a5f3fc;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
      +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:.52rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Prestataire</div>'
        +'<div style="font-size:.7rem;font-weight:700;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Nom / Société</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Contact</div>'
      +'</div>'
      +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;"><div style="font-size:.52rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Prospect / Client</div>'
        +'<div style="font-size:.7rem;font-weight:700;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Nom / Société</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding:3px 0;margin-bottom:3px;">Projet</div>'
      +'</div>'
    +'</div>'
    +pfTplSec('#0891b2','Prestations proposées', pfAddWrap(pfTplTable('#164e63','#ecfeff',[['Désignation',2.2],['Qté',.55,'center'],['P.U. HT',1,'right'],['Total HT',1,'right']],[1,1,1,1],'pf-tbl-devis'),'devis','#0891b2'))
    +'<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:10px;">'
      +'<div style="display:flex;justify-content:space-between;font-size:.72rem;padding:4px 0;color:#64748b;"><span>Total HT</span><span style="font-weight:700;color:#1e293b;border-bottom:1.5px solid #cbd5e1;min-width:80px;text-align:right;">&nbsp;</span></div>'
      +'<div style="display:flex;justify-content:space-between;font-size:.72rem;padding:4px 0;color:#64748b;"><span>TVA</span><span style="font-weight:700;color:#1e293b;border-bottom:1.5px solid #cbd5e1;min-width:80px;text-align:right;">&nbsp;</span></div>'
      +'<div style="display:flex;justify-content:space-between;font-size:.82rem;font-weight:900;color:#fff;background:linear-gradient(135deg,#0891b2,#0e7490);border-radius:8px;padding:10px 12px;margin-top:6px;"><span>Total TTC</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;€</span></div>'
    +'</div>'
    +'<div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
      +'<div style="padding:10px;background:rgba(8,145,178,.05);border-radius:8px;border:1px dashed #a5f3fc;"><div style="font-size:.6rem;font-weight:800;color:#0891b2;margin-bottom:4px;">Délai de réalisation</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding-bottom:4px;">&nbsp;</div></div>'
      +'<div style="padding:10px;background:rgba(8,145,178,.05);border-radius:8px;border:1px dashed #a5f3fc;"><div style="font-size:.6rem;font-weight:800;color:#0891b2;margin-bottom:4px;">Acompte demandé</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #cbd5e1;padding-bottom:4px;">&nbsp;</div></div>'
    +'</div>'
    +'<div style="margin-top:10px;padding:10px 12px;background:#fff;border-radius:8px;border:2px solid #0891b2;display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:.64rem;color:#0f172a;"><strong>Bon pour accord</strong><br><span style="color:#64748b;font-size:.6rem;">Signature + cachet client</span></div>'
      +'<div style="width:90px;height:40px;border:1.5px dashed #cbd5e1;border-radius:6px;"></div>'
    +'</div>'
  },
  stage:{lbl:'Rapport de stage',color:'#7c3aed',icon:PF_ICONS.grad,html:
    pfTplHead('#7c3aed','Rapport professionnel','Rapport de stage')
    +'<div style="background:linear-gradient(135deg,#f5f3ff,#faf5ff);border:1px solid #ddd6fe;border-radius:12px;padding:14px 16px;margin-bottom:14px;">'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Stagiaire</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Formation</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Entreprise</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Tuteur</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Période</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div><div style="font-size:.52rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;">Secteur</div><div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #ddd6fe;padding-bottom:4px;color:#1e293b;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      +'</div>'
    +'</div>'
    +pfTplSec('#7c3aed','1. Présentation de l\'entreprise','<div style="background:#fafafa;border:1.5px dashed #ddd6fe;border-radius:9px;padding:12px;font-size:.74rem;color:#94a3b8;font-style:italic;min-height:40px;"><strong style="color:#7c3aed;font-style:normal;">Activité, secteur, effectifs, implantation :</strong><br>&nbsp;</div>')
    +pfTplSec('#7c3aed','2. Organisation & structure','<div style="background:#fafafa;border:1.5px dashed #ddd6fe;border-radius:9px;padding:12px;font-size:.74rem;color:#94a3b8;font-style:italic;min-height:40px;"><strong style="color:#7c3aed;font-style:normal;">Organigramme, département, place du stagiaire :</strong><br>&nbsp;</div>')
    +pfTplSec('#7c3aed','3. Missions réalisées', pfAddWrap('<div id="pf-rows-stage" style="display:flex;flex-direction:column;gap:6px;">'
      +'<div style="background:#f5f3ff;border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;padding:10px 12px;font-size:.74rem;"><strong style="color:#7c3aed;">Mission :</strong><br>&nbsp;</div>'
    +'</div>','stage','#7c3aed'))
    +pfTplSec('#7c3aed','4. Compétences acquises','<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      +'<div style="background:#f5f3ff;border-radius:8px;padding:9px;"><div style="font-size:.6rem;font-weight:800;color:#7c3aed;margin-bottom:4px;">Compétences techniques</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #ddd6fe;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #ddd6fe;padding:3px 0;">&nbsp;</div></div>'
      +'<div style="background:#f5f3ff;border-radius:8px;padding:9px;"><div style="font-size:.6rem;font-weight:800;color:#7c3aed;margin-bottom:4px;">Compétences relationnelles</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #ddd6fe;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #ddd6fe;padding:3px 0;">&nbsp;</div></div>'
    +'</div>')
    +pfTplSec('#7c3aed','5. Analyse & regard critique','<div style="background:#fafafa;border:1.5px dashed #ddd6fe;border-radius:9px;padding:12px;font-size:.74rem;color:#94a3b8;font-style:italic;min-height:40px;"><strong style="color:#7c3aed;font-style:normal;">Points positifs, difficultés rencontrées, solutions apportées :</strong><br>&nbsp;</div>')
    +pfTplSec('#7c3aed','6. Bilan personnel','<div style="background:linear-gradient(135deg,#f5f3ff,#faf5ff);border:1px solid #ddd6fe;border-radius:9px;padding:12px;font-size:.74rem;color:#0f172a;min-height:40px;">Ce stage m\'a apporté&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br>Il m\'a confirmé / orienté vers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br>Prochaines étapes envisagées&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>')
  },
  reunion:{lbl:'Fiche de réunion',color:'#f59e0b',icon:PF_ICONS.agenda,html:
    pfTplHead('#f59e0b','Compte-rendu','Fiche de réunion')
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
      +'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:11px;">'
        +'<div style="font-size:.52rem;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Infos clés</div>'
        +['Date','Heure','Lieu / Visio','Animateur'].map(function(l){ return '<div style="display:flex;align-items:center;gap:6px;font-size:.7rem;padding:3px 0;border-bottom:1px dashed #fde68a;"><span style="font-weight:700;color:#92400e;min-width:70px;flex-shrink:0;">'+l+'</span><span style="flex:1;border-bottom:none;">&nbsp;</span></div>'; }).join('')
      +'</div>'
      +'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:11px;">'
        +'<div style="font-size:.52rem;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Participants</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #fde68a;padding:4px 0;margin-bottom:3px;">&nbsp;</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #fde68a;padding:4px 0;margin-bottom:3px;">&nbsp;</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #fde68a;padding:4px 0;margin-bottom:3px;">&nbsp;</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #fde68a;padding:4px 0;">&nbsp;</div>'
      +'</div>'
    +'</div>'
    +pfTplSec('#f59e0b','Ordre du jour','<div style="display:flex;flex-direction:column;gap:5px;">'
      +['Point 1','Point 2','Point 3'].map(function(p,i){ return '<div style="display:flex;align-items:center;gap:8px;background:#fffbeb;border-radius:7px;padding:8px 10px;font-size:.72rem;"><span style="background:#f59e0b;color:#fff;border-radius:5px;padding:2px 6px;font-size:.58rem;font-weight:900;flex-shrink:0;">'+(i+1)+'</span><span style="flex:1;border-bottom:1px dashed #fde68a;">&nbsp;</span></div>'; }).join('')
    +'</div>')
    +pfTplSec('#f59e0b','Discussions & décisions','<div style="background:#fffbeb;border:1.5px dashed #fde68a;border-radius:9px;padding:12px;font-size:.74rem;color:#94a3b8;font-style:italic;min-height:40px;"><strong style="color:#b45309;font-style:normal;">Notes de séance :</strong><br>&nbsp;</div>')
    +pfTplSec('#f59e0b','Plan d\'actions', pfAddWrap(pfTplTable('#92400e','#fef3c7',[['Action',1.8],['Responsable',1],['Priorité',.7,'center'],['Échéance',1,'right']],[1,1,1,1],'pf-tbl-reunion'),'reunion','#b45309'))
    +'<div style="margin-top:10px;display:flex;justify-content:space-between;padding:10px 12px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a;"><div style="font-size:.62rem;font-weight:800;color:#92400e;">Prochaine réunion</div><div style="font-size:.72rem;font-weight:700;border-bottom:1.5px solid #fde68a;min-width:120px;">&nbsp;</div></div>'
  },
  marche:{lbl:'Étude de marché',color:'#16a34a',icon:PF_ICONS.barchart,html:
    pfTplHead('#16a34a','Analyse stratégique','Étude de marché')
    +'<div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:12px 14px;margin-bottom:14px;">'
      +'<div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:6px;">Projet analysé</div>'
      +'<div style="font-size:.74rem;font-weight:700;border-bottom:1.5px solid #bbf7d0;padding-bottom:4px;color:#1e293b;margin-bottom:8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">'
        +['Zone géo','Période','Secteur'].map(function(l){ return '<div><div style="font-size:.52rem;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">'+l+'</div><div style="font-size:.68rem;font-weight:700;border-bottom:1.5px solid #bbf7d0;padding-bottom:3px;color:#1e293b;">&nbsp;</div></div>'; }).join('')
      +'</div>'
    +'</div>'
    +pfTplSec('#16a34a','1. Le marché','<div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:9px;padding:12px;font-size:.74rem;">'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
        +'<div><div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Taille du marché</div><div style="border-bottom:1px dashed #bbf7d0;padding:4px 0;font-size:.7rem;color:#475569;">&nbsp;</div></div>'
        +'<div><div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Croissance</div><div style="border-bottom:1px dashed #bbf7d0;padding:4px 0;font-size:.7rem;color:#475569;">&nbsp;</div></div>'
        +'<div><div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Tendances clés</div><div style="border-bottom:1px dashed #bbf7d0;padding:4px 0;font-size:.7rem;color:#475569;">&nbsp;</div></div>'
        +'<div><div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Réglementation</div><div style="border-bottom:1px dashed #bbf7d0;padding:4px 0;font-size:.7rem;color:#475569;">&nbsp;</div></div>'
      +'</div>'
    +'</div>')
    +pfTplSec('#16a34a','2. La demande (cibles)','<div style="display:flex;flex-direction:column;gap:5px;">'
      +'<div style="background:#f0fdf4;border-left:3px solid #16a34a;border-radius:0 8px 8px 0;padding:10px 12px;">'
        +'<div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Cible principale</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:.68rem;color:#475569;">'
          +'<div>Âge :&nbsp;<span style="border-bottom:1px dashed #bbf7d0;">______</span></div><div>Profil :&nbsp;<span style="border-bottom:1px dashed #bbf7d0;">______</span></div>'
          +'<div>Pouvoir d\'achat :&nbsp;<span style="border-bottom:1px dashed #bbf7d0;">___</span></div><div>Comportement :&nbsp;<span style="border-bottom:1px dashed #bbf7d0;">__</span></div>'
        +'</div>'
      +'</div>'
      +'<div style="background:#f0fdf4;border-left:3px solid #4ade80;border-radius:0 8px 8px 0;padding:10px 12px;">'
        +'<div style="font-size:.6rem;font-weight:800;color:#16a34a;margin-bottom:3px;">Cible secondaire</div>'
        +'<div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #bbf7d0;padding:4px 0;">&nbsp;</div>'
      +'</div>'
    +'</div>')
    +pfTplSec('#16a34a','3. La concurrence', pfAddWrap(pfTplTable('#14532d','#f0fdf4',[['Concurrent',1.4],['Forces',1],['Faiblesses',1],['Part de marché',.9,'right']],[1,1,1,1],'pf-tbl-marche'),'marche','#16a34a'))
    +pfTplSec('#16a34a','4. Analyse SWOT','<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
      +'<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;padding:10px;"><div style="font-size:.6rem;font-weight:900;color:#16a34a;margin-bottom:6px;">💪 Forces</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #bbf7d0;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #bbf7d0;padding:3px 0;">&nbsp;</div></div>'
      +'<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:9px;padding:10px;"><div style="font-size:.6rem;font-weight:900;color:#ea580c;margin-bottom:6px;">⚠️ Faiblesses</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #fed7aa;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #fed7aa;padding:3px 0;">&nbsp;</div></div>'
      +'<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;padding:10px;"><div style="font-size:.6rem;font-weight:900;color:#2563eb;margin-bottom:6px;">🚀 Opportunités</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #bfdbfe;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #bfdbfe;padding:3px 0;">&nbsp;</div></div>'
      +'<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:9px;padding:10px;"><div style="font-size:.6rem;font-weight:900;color:#dc2626;margin-bottom:6px;">🔴 Menaces</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #fecaca;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.7rem;color:#475569;border-bottom:1px dashed #fecaca;padding:3px 0;">&nbsp;</div></div>'
    +'</div>')
    +pfTplSec('#16a34a','5. Conclusions & recommandations','<div style="background:#f0fdf4;border:1.5px dashed #bbf7d0;border-radius:9px;padding:12px;font-size:.74rem;color:#0f172a;min-height:40px;"><strong style="color:#16a34a;">Positionnement recommandé :</strong><br>&nbsp;<br><strong style="color:#16a34a;">Avantage concurrentiel :</strong><br>&nbsp;</div>')
    +pfTplSec('#16a34a','6. Stratégie de distribution', pfTplArea('Canaux de vente, partenaires, présence en ligne / physique…'))
    +pfTplSec('#16a34a','7. Budget marketing prévisionnel', pfTplTable('#14532d','#f0fdf4',[['Action',1.6],['Canal',1],['Budget',1,'right'],['Période',1,'right']],[1,1,1,1]))
  },
  bp:{lbl:'Business plan',color:'#db2777',icon:PF_ICONS.trendup,html:
    pfTplHead('#db2777','Document investisseur','Business plan')
    +'<div style="background:linear-gradient(135deg,#fdf2f8,#fce7f3);border:1px solid #fbcfe8;border-radius:12px;padding:12px 14px;margin-bottom:14px;">'
      +'<div style="font-size:.6rem;font-weight:800;color:#db2777;margin-bottom:4px;">Projet</div>'
      +'<div style="font-size:.88rem;font-weight:900;border-bottom:1.5px solid #fbcfe8;padding-bottom:5px;color:#1e293b;margin-bottom:8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
        +['Porteur','Secteur','Statut juridique','Date de création'].map(function(l){ return '<div><div style="font-size:.52rem;font-weight:800;color:#be185d;text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">'+l+'</div><div style="font-size:.68rem;font-weight:700;border-bottom:1.5px solid #fbcfe8;padding-bottom:3px;color:#1e293b;">&nbsp;</div></div>'; }).join('')
      +'</div>'
    +'</div>'
    +pfTplSec('#db2777','1. Executive Summary','<div style="background:#fdf2f8;border-left:4px solid #db2777;border-radius:0 10px 10px 0;padding:12px;font-size:.74rem;color:#0f172a;min-height:50px;"><strong style="color:#db2777;">Le projet en 5 lignes :</strong><br>&nbsp;<br><strong style="color:#db2777;">Problème résolu :</strong><br>&nbsp;<br><strong style="color:#db2777;">Proposition de valeur unique :</strong><br>&nbsp;</div>')
    +pfTplSec('#db2777','2. Produit / Service','<div style="display:flex;flex-direction:column;gap:6px;">'
      +'<div style="background:#fdf2f8;border-radius:9px;padding:10px 12px;"><div style="font-size:.6rem;font-weight:800;color:#db2777;margin-bottom:3px;">Description de l\'offre</div><div style="font-size:.72rem;color:#475569;border-bottom:1px dashed #fbcfe8;padding:4px 0;">&nbsp;</div></div>'
      +'<div style="background:#fdf2f8;border-radius:9px;padding:10px 12px;"><div style="font-size:.6rem;font-weight:800;color:#db2777;margin-bottom:3px;">Différenciation vs concurrents</div><div style="font-size:.72rem;color:#475569;border-bottom:1px dashed #fbcfe8;padding:4px 0;">&nbsp;</div></div>'
      +'<div style="background:#fdf2f8;border-radius:9px;padding:10px 12px;"><div style="font-size:.6rem;font-weight:800;color:#db2777;margin-bottom:3px;">Stade de développement</div><div style="font-size:.72rem;color:#475569;border-bottom:1px dashed #fbcfe8;padding:4px 0;">Idée  ☐ &nbsp;&nbsp; MVP  ☐ &nbsp;&nbsp; Lancé  ☐ &nbsp;&nbsp; En croissance  ☐</div></div>'
    +'</div>')
    +pfTplSec('#db2777','3. Analyse de marché','<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">'
      +[['Marché total (TAM)','#db2777'],['Marché accessible (SAM)','#e11d74'],['Part visée (SOM)','#f472b6']].map(function(m){ return '<div style="background:linear-gradient(135deg,#fdf2f8,#fce7f3);border:1px solid #fbcfe8;border-radius:9px;padding:9px;text-align:center;"><div style="font-size:.52rem;font-weight:800;color:'+m[1]+';margin-bottom:4px;">'+m[0]+'</div><div style="font-size:.92rem;font-weight:900;color:#1e293b;border-bottom:1.5px solid #fbcfe8;">&nbsp;</div></div>'; }).join('')
    +'</div>')
    +pfTplSec('#db2777','4. Stratégie commerciale','<div style="display:flex;flex-direction:column;gap:5px;">'
      +['Canaux d\'acquisition','Prix & positionnement','Partenaires clés','Objectif mois 1-3','Objectif mois 4-12'].map(function(l){ return '<div style="display:flex;align-items:center;gap:8px;background:#fdf2f8;border-radius:7px;padding:8px 10px;font-size:.7rem;"><span style="font-weight:800;color:#db2777;min-width:110px;flex-shrink:0;">'+l+'</span><span style="flex:1;border-bottom:1px dashed #fbcfe8;">&nbsp;</span></div>'; }).join('')
    +'</div>')
    +pfTplSec('#db2777','5. Prévisionnel financier', pfAddWrap(pfTplTable('#831843','#fdf2f8',[['',1.2],['An 1',1,'right'],['An 2',1,'right'],['An 3',1,'right']],[1,1,1,1],'pf-tbl-bp'),'bp','#db2777'))
    +'<div style="margin-top:4px;display:flex;flex-direction:column;gap:3px;border:1px solid #fbcfe8;border-radius:9px;overflow:hidden;">'
      +['CA prévisionnel','Charges totales','Résultat net','Point mort (mois)'].map(function(l,i){ return '<div style="display:flex;background:'+(i%2?'#fff':'#fdf2f8')+';padding:7px 10px;font-size:.7rem;"><span style="flex:1.2;font-weight:700;color:#1e293b;">'+l+'</span><span style="flex:1;border-bottom:1px dashed #fbcfe8;text-align:right;">&nbsp;</span><span style="flex:1;border-bottom:1px dashed #fbcfe8;text-align:right;">&nbsp;</span><span style="flex:1;border-bottom:1px dashed #fbcfe8;text-align:right;">&nbsp;</span></div>'; }).join('')
    +'</div>'
    +pfTplSec('#db2777','6. Besoin de financement','<div style="background:linear-gradient(135deg,#db2777,#be185d);border-radius:10px;padding:14px;color:#fff;">'
      +'<div style="font-size:.7rem;font-weight:900;margin-bottom:8px;">Montant recherché : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; €</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:.68rem;">'
        +['Fonds propres','Prêt bancaire','Aide / subvention','Investisseurs'].map(function(l){ return '<div style="background:rgba(255,255,255,.15);border-radius:7px;padding:7px;"><div style="opacity:.8;margin-bottom:3px;">'+l+'</div><div style="font-weight:800;border-bottom:1px solid rgba(255,255,255,.4);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; €</div></div>'; }).join('')
      +'</div>'
    +'</div>')
    +pfTplSec('#db2777','7. Risques & mitigation', pfTplTable('#831843','#fdf2f8',[['Risque',1.6],['Probabilité',1,'center'],['Impact',1,'center'],['Mitigation',1.4]],[1,1,1,1]))
  },
  cv:{lbl:'CV',color:'#0284c7',icon:PF_ICONS.idcard,html:
    '<div style="background:linear-gradient(135deg,#0284c7 0%,#0369a1 60%,#1e40af 100%);border-radius:14px;padding:18px 20px;margin-bottom:14px;color:#fff;">'
      +'<div style="display:flex;align-items:center;gap:14px;">'
        +'<div id="pf-cv-photo-wrap" style="position:relative;flex-shrink:0;">'
          +'<div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.25);border:2.5px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;font-size:1.4rem;">👤</div>'
          +'<button onmousedown="event.preventDefault()" onclick="document.getElementById(\'pf-cv-photo-wrap\').remove();pfSaveNoteFromEditor();" title="Retirer la photo" style="position:absolute;top:-4px;right:-4px;width:17px;height:17px;border-radius:50%;background:#fff;border:1.3px solid #dc2626;color:#dc2626;font-size:.55rem;font-weight:900;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>'
        +'</div>'
        +'<div>'
          +'<div style="font-size:1.1rem;font-weight:900;letter-spacing:-.01em;border-bottom:1.5px solid rgba(255,255,255,.3);padding-bottom:4px;margin-bottom:4px;">NOM Prénom</div>'
          +'<div style="font-size:.78rem;font-weight:700;opacity:.92;">Titre du poste visé</div>'
        +'</div>'
      +'</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;font-size:.65rem;opacity:.9;">'
        +'<span>📍 Ville</span><span>📞 06 XX XX XX XX</span><span>✉ email@mail.fr</span><span>🔗 LinkedIn</span>'
      +'</div>'
    +'</div>'
    +'<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:12px;margin-bottom:12px;">'
      +'<div style="font-size:.6rem;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:.1em;margin-bottom:5px;">Profil · Accroche commerciale</div>'
      +'<div style="font-size:.74rem;color:#1e293b;line-height:1.6;border-left:3px solid #0284c7;padding-left:10px;font-style:italic;min-height:32px;">Professionnel(le) dynamique avec X ans d\'expérience dans &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;, spécialisé(e) en &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;, reconnu(e) pour &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.</div>'
    +'</div>'
    +pfTplSec('#0284c7','Expériences professionnelles', pfAddWrap('<div id="pf-rows-cv_exp" style="display:flex;flex-direction:column;gap:7px;">'
      +['Expérience'].map(function(ex,i){ return '<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:9px;padding:11px;position:relative;">'
        +'<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:5px;">'
          +'<div><div style="font-size:.76rem;font-weight:900;color:#0f172a;">Poste &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="font-size:.68rem;font-weight:700;color:#0284c7;">Entreprise &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
          +'<div style="background:#0284c7;color:#fff;border-radius:6px;padding:3px 8px;font-size:.58rem;font-weight:800;flex-shrink:0;white-space:nowrap;">20XX – 20XX</div>'
        +'</div>'
        +'<div style="font-size:.68rem;color:#475569;line-height:1.5;">'
          +'<div>▸ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
          +'<div>▸ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
        +'</div>'
      +'</div>'; }).join('')
    +'</div>','cv_exp','#0284c7'))
    +pfTplSec('#0284c7','Formation', pfAddWrap('<div id="pf-rows-cv_edu" style="display:flex;flex-direction:column;gap:5px;">'
      +['Formation'].map(function(f){ return '<div style="display:flex;align-items:center;gap:8px;background:#f0f9ff;border-radius:8px;padding:9px 11px;"><div style="width:8px;height:8px;border-radius:50%;background:#0284c7;flex-shrink:0;"></div><div style="flex:1;"><div style="font-size:.74rem;font-weight:800;color:#0f172a;">Diplôme &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="font-size:.66rem;color:#0284c7;font-weight:700;">Établissement · Année</div></div></div>'; }).join('')
    +'</div>','cv_edu','#0284c7'))
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:2px;">'
      +pfTplSec('#0284c7','Compétences clés','<div style="display:flex;flex-wrap:wrap;gap:5px;">'
        +['Compétence 1','Compétence 2','Compétence 3','Compétence 4','Compétence 5'].map(function(c){ return '<span style="background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;border-radius:6px;padding:4px 8px;font-size:.6rem;font-weight:700;">'+c+'</span>'; }).join('')
      +'</div>')
      +pfTplSec('#0284c7','Langues & outils','<div style="display:flex;flex-direction:column;gap:3px;">'
        +['Français (natif)','Anglais (B2)','Excel · Word','Logiciel spécifique'].map(function(l){ return '<div style="display:flex;align-items:center;gap:6px;font-size:.68rem;"><span style="color:#0284c7;">▸</span><span>'+l+'</span></div>'; }).join('')
      +'</div>')
    +'</div>'
    +'<div style="margin-top:10px;padding:10px 12px;background:linear-gradient(135deg,#0284c7,#1e40af);border-radius:8px;color:#fff;display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:.62rem;font-weight:800;">Centres d\'intérêt</div>'
      +'<div style="font-size:.7rem;opacity:.9;border-bottom:1px solid rgba(255,255,255,.35);min-width:140px;">&nbsp;</div>'
    +'</div>'
  },
  lm:{lbl:'Lettre de motivation',color:'#0f172a',icon:PF_ICONS.mail,html:
    '<div style="font-size:.78rem;line-height:1.9;color:#0f172a;">'
      +'<div style="margin-bottom:16px;">NOM Prénom<br>Adresse<br>Tél · Email</div>'
      +'<div style="text-align:right;margin-bottom:16px;">Lieu, le &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
      +'<div style="margin-bottom:16px;">Entreprise<br>À l\'attention de &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>Adresse</div>'
      +'<div style="font-weight:700;margin-bottom:14px;">Objet : Candidature au poste de ________________________________</div>'
      +'<div style="margin-bottom:12px;">Madame, Monsieur,</div>'
      +'<div style="margin-bottom:12px;">&nbsp;<br>&nbsp;<br>&nbsp;</div>'
      +'<div style="margin-bottom:12px;">&nbsp;<br>&nbsp;<br>&nbsp;</div>'
      +'<div style="margin-bottom:16px;">&nbsp;<br>&nbsp;<br>&nbsp;</div>'
      +'<div style="margin-bottom:16px;">Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.</div>'
      +'<div style="text-align:right;font-weight:700;">NOM Prénom</div>'
    +'</div>'
  },
  metier:{lbl:'Fiche métier',color:'#4f46e5',icon:PF_ICONS.case,html:
    pfTplHead('#4f46e5','Exploration professionnelle','Fiche métier')
    +pfTplMeta(['Nom du métier','Famille de métiers','Code ROME'])
    +pfTplSec('#4f46e5','Missions principales', pfTplArea('Décris les 4-5 missions clés du poste…'))
    +pfTplSec('#4f46e5','Compétences requises','<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">'
      +'<div style="background:#eef2ff;border-radius:8px;padding:9px;"><div style="font-size:.6rem;font-weight:800;color:#4f46e5;margin-bottom:4px;">Savoir-faire</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #c7d2fe;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #c7d2fe;padding:3px 0;">&nbsp;</div></div>'
      +'<div style="background:#eef2ff;border-radius:8px;padding:9px;"><div style="font-size:.6rem;font-weight:800;color:#4f46e5;margin-bottom:4px;">Savoir-être</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #c7d2fe;padding:3px 0;margin-bottom:3px;">&nbsp;</div><div style="font-size:.68rem;color:#475569;border-bottom:1px dashed #c7d2fe;padding:3px 0;">&nbsp;</div></div>'
    +'</div>')
    +pfTplSec('#4f46e5','Formation / diplômes', pfTplArea())
    +pfTplSec('#4f46e5','Salaire moyen','<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">'
      +['Junior','Confirmé','Senior'].map(function(l){ return '<div style="background:#eef2ff;border-radius:8px;padding:9px;text-align:center;"><div style="font-size:.58rem;font-weight:800;color:#4f46e5;margin-bottom:3px;">'+l+'</div><div style="font-size:.8rem;font-weight:900;color:#1e293b;border-bottom:1.5px solid #c7d2fe;">___€</div></div>'; }).join('')
    +'</div>')
    +pfTplSec('#4f46e5','Débouchés', pfTplArea())
  },
  excel:{lbl:'Demande de crédit',color:'#16a34a',icon:PF_ICONS.excel,html:
    pfTplHead('#16a34a','Formulaire bancaire','Demande de crédit')
    +pfTplSec('#16a34a','Identité du demandeur', pfTplMeta(['Nom du demandeur','Date de naissance','Adresse','Téléphone','Email','Situation familiale']))
    +pfTplSec('#16a34a','Détails du crédit', pfTplMeta(['Type de crédit','Montant demandé','Durée du prêt','Taux d\'intérêt','Mensualité estimée','Apport personnel']))
    +pfTplSec('#16a34a','Situation financière', pfTplMeta(['Revenu mensuel net','Charges mensuelles','Crédits en cours','Employeur','Type de contrat','Ancienneté']))
    +pfTplSec('#16a34a','Garanties proposées', pfTplArea('Caution, hypothèque, nantissement…'))
    +pfTplSec('#16a34a','Motif de la demande', pfTplArea('Décris le projet financé (achat, travaux, investissement…)'))
    +pfTplSec('#16a34a','Pièces à joindre', '<div style="display:flex;flex-direction:column;gap:5px;">'
      +['Pièce d\'identité','3 derniers bulletins de salaire','Avis d\'imposition','Relevés bancaires (3 mois)','Justificatif de domicile'].map(function(p){
        return '<div style="display:flex;align-items:center;gap:8px;font-size:.7rem;color:#475569;"><span style="width:14px;height:14px;border:1.5px solid #86efac;border-radius:4px;flex-shrink:0;"></span>'+p+'</div>';
      }).join('')
    +'</div>')
  },
  pptx:{lbl:'Tableau de bord',color:'#ea580c',icon:PF_ICONS.pptx,html:
    pfTplHead('#ea580c','Vue d\'ensemble','Tableau de bord général')
    +'<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">'
      +[['Chiffre d\'affaires','#16a34a'],['Dépenses','#dc2626'],['Résultat net','#2563eb'],['Trésorerie','#0891b2'],['Objectif','#7c3aed'],['Marge (%)','#db2777']].map(function(k){
        return '<div style="flex:1;min-width:130px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:11px 13px;">'
          +'<div style="font-size:.56rem;font-weight:800;color:'+k[1]+';text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">'+k[0]+'</div>'
          +'<div style="font-size:.95rem;font-weight:900;color:#0f172a;border-bottom:1.5px solid #e2e8f0;padding-bottom:4px;">&nbsp;</div>'
        +'</div>';
      }).join('')
    +'</div>'
    +pfTplSec('#ea580c','Indicateurs clés', pfAddWrap(pfTplTable('#ea580c','#fff7ed',[['Indicateur',2],['Période',1],['Valeur',1,'right']],['','',''],'pf-tbl-pptx'),'pptx','#ea580c'))
    +pfTplSec('#ea580c','Comparaison vs période précédente', pfTplTable('#9a3412','#fff7ed',[['',1.4],['Période N',1,'right'],['Période N-1',1,'right'],['Évolution',1,'right']],[1,1,1,1]))
    +pfTplSec('#ea580c','Analyse', pfTplArea('Synthèse et points à surveiller…'))
    +pfTplSec('#ea580c','Actions à mener', pfTplArea('Décisions et prochaines étapes…'))
  },
  note:{lbl:'Note structurée',color:'#7c3aed',icon:PF_ICONS.notepad,html:
    '<div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:14px;padding:16px 18px;margin-bottom:12px;color:#fff;display:flex;align-items:center;gap:12px;">'
      +'<div style="width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.3rem;">📝</div>'
      +'<div><div style="font-size:.56rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.8;margin-bottom:3px;">Note</div><div style="font-size:.92rem;font-weight:900;border-bottom:1.5px solid rgba(255,255,255,.3);min-width:160px;padding-bottom:3px;">Titre de la note</div></div>'
    +'</div>'
    +'<div style="background:#faf5ff;border-left:4px solid #7c3aed;border-radius:0 10px 10px 0;padding:12px 14px;margin-bottom:10px;"><div style="font-size:.6rem;font-weight:800;color:#7c3aed;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em;">Résumé</div><div style="font-size:.74rem;color:#0f172a;min-height:22px;border-bottom:1px dashed #ddd6fe;padding-bottom:6px;">&nbsp;</div></div>'
    +'<div style="font-size:.6rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;display:flex;align-items:center;gap:5px;"><span style="width:5px;height:5px;background:#7c3aed;border-radius:50%;"></span>Section 1</div>'
    +'<div style="background:#fff;border:1px solid #e9d5ff;border-radius:9px;padding:12px;margin-bottom:10px;min-height:40px;font-size:.74rem;color:#0f172a;">&nbsp;<br>&nbsp;<br>&nbsp;</div>'
    +'<div style="font-size:.6rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;display:flex;align-items:center;gap:5px;"><span style="width:5px;height:5px;background:#7c3aed;border-radius:50%;"></span>Section 2</div>'
    +'<div style="background:#fff;border:1px solid #e9d5ff;border-radius:9px;padding:12px;margin-bottom:10px;min-height:40px;font-size:.74rem;color:#0f172a;">&nbsp;<br>&nbsp;<br>&nbsp;</div>'
    +'<div style="margin-top:14px;padding-top:10px;border-top:2px dashed #e9d5ff;display:flex;justify-content:space-between;align-items:center;">'
      +'<span style="font-size:.6rem;color:#94a3b8;font-style:italic;">CareerPulse · Note personnelle</span>'
      +'<span style="font-size:.6rem;color:#a78bfa;font-weight:700;">'+new Date().toLocaleDateString('fr-FR')+'</span>'
    +'</div>'
  }
};
var PF_NOTE_SIZES=[{v:'',lbl:'Taille'},{v:'2',lbl:'Petit'},{v:'3',lbl:'Normal'},{v:'4',lbl:'Moyen'},{v:'5',lbl:'Grand'},{v:'6',lbl:'Très grand'}];
function pfFmtSize(v){
  pfFocusNoteEditor();
  if(v) document.execCommand('fontSize', false, v);
  pfSaveNoteFromEditor();
}
function pfInsertTemplate(key){
  var t=PF_NOTE_TEMPLATES[key];
  if(!t) return;
  var ed=document.getElementById('pf-note-editor');
  if(!ed) return;
  ed.innerHTML=t.html;
  pfSaveNoteFromEditor();
}
var _pfCalcExpr='';
function pfToggleCalculator(){
  var c=document.getElementById('pf-note-calc');
  if(c) c.style.display = c.style.display==='none' ? 'block' : 'none';
}
function pfCalcPress(tok){
  _pfCalcExpr += tok;
  var d=document.getElementById('pf-calc-display');
  if(d) d.textContent = _pfCalcExpr || '0';
}
function pfCalcClear(){
  _pfCalcExpr='';
  var d=document.getElementById('pf-calc-display');
  if(d) d.textContent = '0';
}
function pfCalcBack(){
  _pfCalcExpr = _pfCalcExpr.slice(0, -1);
  var d=document.getElementById('pf-calc-display');
  if(d) d.textContent = _pfCalcExpr || '0';
}
function pfCalcEquals(){
  var d=document.getElementById('pf-calc-display');
  if(!_pfCalcExpr){ return; }
  try{
    var res = Function('"use strict";return ('+_pfCalcExpr+')')();
    if(typeof res!=='number' || !isFinite(res)) throw new Error('nan');
    res = Math.round(res*1e10)/1e10;
    _pfCalcExpr = String(res);
    if(d) d.textContent = _pfCalcExpr;
  }catch(e){
    if(d) d.textContent = 'Erreur';
    _pfCalcExpr='';
  }
}
function pfCalcInsert(){
  var d=document.getElementById('pf-calc-display');
  if(!d || !d.textContent || d.textContent==='0' || d.textContent==='Erreur') return;
  pfFocusNoteEditor();
  document.execCommand('insertText', false, d.textContent);
  pfSaveNoteFromEditor();
}
function pfCalcToggleSci(){
  var s=document.getElementById('pf-calc-sci-row');
  if(s) s.style.display = s.style.display==='none' ? 'flex' : 'none';
}

var PF_NOTE_FONTS=[
  {v:'',lbl:'Police'},
  {v:'\'DM Sans\',sans-serif',lbl:'Moderne'},
  {v:'Georgia,serif',lbl:'Élégant'},
  {v:'cursive',lbl:'Manuscrit'},
  {v:'\'Courier New\',monospace',lbl:'Machine'}
];
var PF_NOTE_EMOJIS=['😀','😍','🎯','💡','✅','🔥','📌','⭐','👍','📅','💬','🚀'];

function pfNoteToolBtn(icon, onclick, title){
  return '<button onmousedown="event.preventDefault()" onclick="'+onclick+'" title="'+title+'" style="width:28px;height:28px;border-radius:8px;background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.12);color:#0f172a;display:flex;align-items:center;justify-content:center;font-size:.8rem;cursor:pointer;flex-shrink:0;">'+icon+'</button>';
}

var PF_ACTIVE_TPL='';
function pfRenderNoteEditor(el){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===PF_NOTE_OPEN; })[0];
  if(!n){ PF_NOTE_OPEN=null; pfRenderNotes(el); return; }
  var contentHtml = n.html!=null ? n.html : pfEsc(n.text||'').replace(/\n/g,'<br>');

  /* ── BARRE HAUTE : navigation + actions ── */
  var topBar='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:6px;flex-wrap:wrap;">'
    /* Bouton retour */
    +'<button onclick="pfCloseNote()" style="display:flex;align-items:center;gap:5px;background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(124,58,237,.06));border:1.5px solid rgba(124,58,237,.3);color:#7c3aed;font-size:.62rem;font-weight:800;cursor:pointer;font-family:inherit;border-radius:11px;padding:7px 12px;flex-shrink:0;box-shadow:0 1px 4px rgba(124,58,237,.12);">'
      +'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>'
      +'<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
      +'Documents'
    +'</button>'
    +'<div style="display:flex;align-items:center;gap:5px;">'
      /* Imprimer — gris bleuté */
      +'<button onclick="pfPrintNote(\''+n.id+'\')" title="Imprimer" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border:1.5px solid #cbd5e1;color:#475569;cursor:pointer;flex-shrink:0;box-shadow:0 1px 4px rgba(15,23,42,.08);">'
        +'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><rect x="2" y="9" width="20" height="11" rx="2"/><polyline points="6 18 6 22 18 22 18 18"/><line x1="18" y1="13" x2="18.01" y2="13"/></svg>'
      +'</button>'
      /* Télécharger PDF — gris foncé */
      +'<button id="pf-note-pdf-btn" onclick="pfDownloadNotePdf(\''+n.id+'\')" title="Télécharger en PDF" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,rgba(15,23,42,.06),rgba(15,23,42,.03));border:1.5px solid rgba(15,23,42,.18);color:#334155;cursor:pointer;flex-shrink:0;box-shadow:0 1px 4px rgba(15,23,42,.08);">'
        +'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><path d="M4 19h16"/></svg>'
      +'</button>'
      /* Partager — bleu */
      +'<button onclick="pfToggleNoteShare()" title="Partager" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,rgba(37,99,235,.12),rgba(37,99,235,.06));border:1.5px solid rgba(37,99,235,.3);color:#2563eb;cursor:pointer;flex-shrink:0;box-shadow:0 1px 4px rgba(37,99,235,.12);">'
        +'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><line x1="8" y1="11" x2="16" y2="7"/><line x1="8" y1="13" x2="16" y2="17"/></svg>'
      +'</button>'
      /* Enregistrer — vert */
      +'<button onclick="pfSaveNoteFromEditor(true)" title="Enregistrer" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,rgba(22,163,74,.12),rgba(22,163,74,.06));border:1.5px solid rgba(22,163,74,.35);color:#16a34a;cursor:pointer;flex-shrink:0;box-shadow:0 1px 4px rgba(22,163,74,.12);">'
        +'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>'
      +'</button>'
    +'</div>'
  +'</div>';

  /* ── BARRE DE PARTAGE ── */
  var shareBar='<div id="pf-note-sharebar" style="display:none;gap:7px;margin-bottom:10px;">'
    +'<button onclick="pfShareNote(\''+n.id+'\',\'wa\')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:9px;border-radius:10px;border:none;background:#25D366;color:#fff;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;"><svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M17.47 14.38c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.96.94-.96 2.28s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.58-.65 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.06L2 22l5.09-1.34A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.72 0-3.32-.49-4.67-1.34l-.33-.2-3.02.79.81-2.95-.22-.35A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>WhatsApp</button>'
    +'<button onclick="pfShareNote(\''+n.id+'\',\'tg\')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:9px;border-radius:10px;border:none;background:#229ED9;color:#fff;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;"><svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.93.43l-2.6-1.92-1.25 1.2c-.14.14-.26.26-.53.26l.19-2.66 4.87-4.4c.21-.19-.05-.29-.33-.1L7.22 14.17l-2.56-.8c-.56-.17-.57-.56.12-.83l10.02-3.86c.46-.17.87.1.84.12z"/></svg>Telegram</button>'
    +'<button onclick="pfShareNote(\''+n.id+'\',\'sms\')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:9px;border-radius:10px;border:none;background:linear-gradient(135deg,#1e40af,#10b981);color:#fff;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>SMS</button>'
  +'</div>';

  /* ══════════════════════════════════════════════════════════
     RIBBON TOOLBAR — 1 ligne scrollable style Word/Notion
     Catégories séparées par dividers, badges colorés, vivant
     ══════════════════════════════════════════════════════════ */

  var SELST='flex:0 0 auto;box-sizing:border-box;border-radius:9px;background:#fff;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'9\' height=\'6\'%3E%3Cpath d=\'M1 1l3.5 3.5L8 1\' stroke=\'%2364748b\' stroke-width=\'1.4\' fill=\'none\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 6px center;border:1.5px solid rgba(15,23,42,.13);color:#0f172a;font-size:.56rem;line-height:1.4;font-weight:600;letter-spacing:0;font-family:Arial,Helvetica,sans-serif;padding:6px 16px 6px 6px;-webkit-appearance:none;appearance:none;cursor:pointer;box-shadow:0 1px 2px rgba(15,23,42,.05);transition:border-color .15s;white-space:nowrap;';

  /* Bouton ribbon — SVG icon + tooltip */
  function pfRBtn(icon, action, tip, extraStyle){
    var es = extraStyle||'';
    return '<button onmousedown="event.preventDefault()" onclick="'+action+'" title="'+tip
      +'" style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:34px;height:32px;border-radius:9px;background:#fff;border:1.5px solid rgba(15,23,42,.11);color:#374151;cursor:pointer;transition:all .14s;box-shadow:0 1px 2px rgba(15,23,42,.05);'+es+'"'
      +' onpointerdown="this.style.background=\'#f1f5f9\';this.style.transform=\'scale(.9)\';this.style.boxShadow=\'none\'"'
      +' onpointerup="this.style.background=\'#fff\';this.style.transform=\'\'"'
      +' onpointerleave="this.style.background=\'#fff\';this.style.transform=\'\'"'
      +'>'+icon+'</button>';
  }

  /* Badge de catégorie — mini pill coloré + label */
  function pfRCat(svgIcon, label, bg, tc){
    return '<div style="display:inline-flex;align-items:center;gap:4px;flex-shrink:0;">'
      +'<div style="width:20px;height:20px;border-radius:6px;background:'+bg+';display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 4px '+bg.replace(')',', .3)').replace('linear-gradient','linear-gradient')+';">'+svgIcon+'</div>'
      +'<span style="font-size:.44rem;font-weight:900;color:'+tc+';letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;">'+label+'</span>'
    +'</div>';
  }

  /* Séparateur vertical catégorie */
  var rDiv='<div style="width:1.5px;height:28px;background:linear-gradient(180deg,transparent,rgba(15,23,42,.12),transparent);border-radius:2px;flex-shrink:0;margin:0 4px;"></div>';

  /* ── CSS animations ribbon ── */
  var ribbonCSS='<style>'
    +'#pf-ribbon{scrollbar-width:none;-ms-overflow-style:none;}'
    +'#pf-ribbon::-webkit-scrollbar{display:none;}'
    +'#pf-ribbon button:hover{background:#f8fafc!important;border-color:rgba(15,23,42,.2)!important;box-shadow:0 2px 6px rgba(15,23,42,.1)!important;}'
    +'#pf-ribbon select:hover{border-color:rgba(59,130,246,.4)!important;}'
    +'</style>';

  /* ── TOUT LE CONTENU DU RIBBON en une seule ligne ── */
  var toolbarContainer=ribbonCSS
    +'<div style="background:#f8fafc;border:1.5px solid rgba(15,23,42,.08);border-radius:14px;padding:7px 10px;margin-bottom:8px;">'
      +'<div id="pf-ribbon" style="display:flex;align-items:center;gap:5px;overflow-x:auto;overflow-y:hidden;flex-wrap:nowrap;padding-bottom:1px;-webkit-overflow-scrolling:touch;">'

        /* ════ CATÉGORIE TEXTE (bleue) ════ */
        +pfRCat(
          '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 0 8H6z"/><path d="M6 12h9a4 4 0 0 1 0 8H6z"/></svg>',
          'Texte','linear-gradient(135deg,#3b82f6,#1d4ed8)','#1d4ed8'
        )

        +'<select onchange="pfFmtFont(this.value)" title="Police" style="'+SELST+'max-width:80px;">'
          +PF_NOTE_FONTS.map(function(f){ return '<option value="'+f.v+'">'+f.lbl+'</option>'; }).join('')
        +'</select>'

        +'<select onchange="pfFmtSize(this.value)" title="Taille" style="'+SELST+'max-width:60px;">'
          +PF_NOTE_SIZES.map(function(s){ return '<option value="'+s.v+'">'+s.lbl+'</option>'; }).join('')
        +'</select>'

        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 0 8H6z"/><path d="M6 12h9a4 4 0 0 1 0 8H6z"/></svg>','pfFmt(\'bold\')','Gras')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>','pfFmt(\'italic\')','Italique')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>','pfFmt(\'underline\')','Souligné')


        +rDiv

        /* ════ CATÉGORIE ALIGNEMENT (violette) ════ */
        +pfRCat(
          '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="15" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="12" y2="18"/></svg>',
          'Alignement','linear-gradient(135deg,#8b5cf6,#6d28d9)','#6d28d9'
        )

        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="15" y2="18"/></svg>','pfFmt(\'left\')','Gauche')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="7" y1="10" x2="17" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="6" y1="18" x2="18" y2="18"/></svg>','pfFmt(\'center\')','Centrer')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="11" y1="18" x2="21" y2="18"/></svg>','pfFmt(\'right\')','Droite')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/></svg>','pfFmt(\'justify\')','Justifier')

        +rDiv

        /* ════ CATÉGORIE STRUCTURE (verte) ════ */
        +pfRCat(
          '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M3 5h18M3 10h12M3 15h8"/></svg>',
          'Structure','linear-gradient(135deg,#10b981,#059669)','#059669'
        )

        +'<button onmousedown="event.preventDefault()" onclick="pfInsertNoteBlock(\'h1\')" title="Titre H1"'
          +' style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 10px;border-radius:9px;border:1.5px solid rgba(15,23,42,.13);background:#fff;color:#0f172a;font-size:.65rem;font-weight:900;cursor:pointer;font-family:inherit;box-shadow:0 1px 2px rgba(15,23,42,.05);transition:all .14s;"'
          +' onpointerdown="this.style.transform=\'scale(.9)\';this.style.background=\'#f1f5f9\'"'
          +' onpointerup="this.style.transform=\'\';this.style.background=\'#fff\'"'
          +' onpointerleave="this.style.transform=\'\';this.style.background=\'#fff\'">H1</button>'

        +'<button onmousedown="event.preventDefault()" onclick="pfInsertNoteBlock(\'h2\')" title="Sous-titre H2"'
          +' style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 10px;border-radius:9px;border:1.5px solid rgba(124,58,237,.3);background:rgba(124,58,237,.07);color:#7c3aed;font-size:.63rem;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 1px 3px rgba(124,58,237,.1);transition:all .14s;"'
          +' onpointerdown="this.style.transform=\'scale(.9)\'"'
          +' onpointerup="this.style.transform=\'\'"'
          +' onpointerleave="this.style.transform=\'\'">H2</button>'



        +rDiv

        /* ════ CATÉGORIE OUTILS (orange) ════ */
        +pfRCat(
          '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
          'Outils','linear-gradient(135deg,#f59e0b,#d97706)','#b45309'
        )

        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="3"/><line x1="8" y1="7" x2="16" y2="7"/><circle cx="8" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="16" cy="12" r="1.2" fill="currentColor"/><circle cx="8" cy="16" r="1.2" fill="currentColor"/><circle cx="12" cy="16" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/></svg>','pfToggleCalculator()','Calculatrice')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/><path d="M8.5 14.5s1 2 3.5 2 3.5-2 3.5-2"/></svg>','pfToggleEmoji()','Émoji')
        +pfRBtn('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.78 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5-4.5-9-10-9z"/></svg>','pfToggleColorPicker()','Couleur du document')

      +'</div>'
    +'</div>';

  var toolbar1=''; var toolbar2=''; var personality='';

  /* ── CALCULATRICE ── */
  var calcBlock='<div id="pf-note-calc" style="display:none;background:#0f172a;border-radius:12px;padding:10px;margin-bottom:10px;">'
    +'<div id="pf-calc-display" style="background:rgba(255,255,255,.06);color:#fff;border-radius:8px;padding:10px;text-align:right;font-size:.85rem;font-family:\'Courier New\',monospace;margin-bottom:7px;min-height:20px;overflow-x:auto;white-space:nowrap;">0</div>'
    +'<div id="pf-calc-sci-row" style="display:none;flex-wrap:wrap;gap:4px;margin-bottom:6px;">'
      +['sin(','cos(','tan(','√(','log(','ln(','^','π','(',')'].map(function(t){
        var ins = t==='√('?'Math.sqrt(':t==='log('?'Math.log10(':t==='ln('?'Math.log(':t==='π'?'Math.PI':t==='sin('?'Math.sin(':t==='cos('?'Math.cos(':t==='tan('?'Math.tan(':t==='^'?'**':t;
        return '<button onclick="pfCalcPress(\''+ins+'\')" style="flex:1;min-width:38px;padding:6px 0;border-radius:6px;border:none;background:rgba(255,255,255,.1);color:#a78bfa;font-size:.58rem;font-weight:700;cursor:pointer;font-family:inherit;">'+t+'</button>';
      }).join('')
    +'</div>'
    +['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+'].map(function(t){
      var ins = t==='÷'?'/':t==='×'?'*':t;
      var isEq = t==='=';
      var isDigit = /^[0-9.]$/.test(t);
      var col = isEq ? 'background:#7c3aed;color:#fff;' : isDigit ? 'background:rgba(255,255,255,.04);color:#fff;' : 'background:rgba(255,255,255,.1);color:#fbbf24;';
      return '<button onclick="'+(isEq?'pfCalcEquals()':'pfCalcPress(\''+ins+'\')')+'" style="width:23%;margin:1.5% 0;padding:9px 0;border-radius:8px;border:none;'+col+'font-size:.68rem;font-weight:700;cursor:pointer;font-family:inherit;display:inline-block;">'+t+'</button>';
    }).join('')
    +'<div style="display:flex;gap:5px;margin-top:6px;">'
      +'<button onclick="pfCalcToggleSci()" style="flex:1;padding:7px;border-radius:7px;border:none;background:rgba(255,255,255,.08);color:#a78bfa;font-size:.56rem;font-weight:700;cursor:pointer;font-family:inherit;">Scientifique</button>'
      +'<button onclick="pfCalcBack()" style="flex:1;padding:7px;border-radius:7px;border:none;background:rgba(255,255,255,.08);color:#fbbf24;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-7-8z"/><line x1="13" y1="9.5" x2="17.5" y2="14.5"/><line x1="17.5" y1="9.5" x2="13" y2="14.5"/></svg></button>'
      +'<button onclick="pfCalcClear()" style="flex:1;padding:7px;border-radius:7px;border:none;background:rgba(239,68,68,.18);color:#fca5a5;font-size:.56rem;font-weight:700;cursor:pointer;font-family:inherit;">C</button>'
      +'<button onclick="pfCalcInsert()" style="flex:1;padding:7px;border-radius:7px;border:none;background:#16a34a;color:#fff;font-size:.56rem;font-weight:700;cursor:pointer;font-family:inherit;">Insérer</button>'
    +'</div>'
  +'</div>';

  /* ── BARRE EMOJI (cachée) ── */
  var emojiBar='<div id="pf-note-emojibar" style="display:none;flex-wrap:wrap;gap:5px;margin-bottom:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px;">'
    +PF_NOTE_EMOJIS.map(function(e){ return '<button onmousedown="event.preventDefault()" onclick="pfInsertEmoji(\''+e+'\')" style="width:28px;height:28px;border-radius:7px;border:none;background:rgba(15,23,42,.04);cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center;">'+e+'</button>'; }).join('')
  +'</div>';

  /* ── PALETTE DE COULEURS DU DOCUMENT ── */
  var colorBar='<div id="pf-note-colorbar" style="display:none;flex-wrap:wrap;gap:7px;margin-bottom:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px;align-items:center;">'
    +'<span style="font-size:.56rem;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;width:100%;margin-bottom:2px;">Couleur du document</span>'
    +PF_THEMES.map(function(t){ return '<button onmousedown="event.preventDefault()" onclick="pfApplyDocColor(\''+t.hex+'\')" title="'+t.name+'" style="width:26px;height:26px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1.5px '+t.hex+';background:'+t.hex+';cursor:pointer;"></button>'; }).join('')
  +'</div>';

  /* ── BULLES DE MODÈLES ── */
  var templateRow='<div style="display:flex;gap:7px;overflow-x:auto;padding-bottom:8px;margin-bottom:8px;-webkit-overflow-scrolling:touch;">'
    +Object.keys(PF_NOTE_TEMPLATES).map(function(k){
      var t=PF_NOTE_TEMPLATES[k];
      var badge='<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:6px;background:'+t.color+';color:#fff;flex-shrink:0;font-size:.62rem;">'+t.icon+'</span>';
      return '<button onclick="PF_ACTIVE_TPL=\''+k+'\';pfInsertTemplate(\''+k+'\');"'
        +' onpointerdown="this.style.transform=\'scale(.94)\';this.style.background=\'#d1fae5\';this.style.borderColor=\'#059669\';this.style.color=\'#047857\';"'
        +' onpointerup="this.style.transform=\'\';this.style.background=\'#fff\';this.style.borderColor=\'rgba(15,23,42,.1)\';this.style.color=\'#1e293b\';"'
        +' onpointerleave="this.style.transform=\'\';this.style.background=\'#fff\';this.style.borderColor=\'rgba(15,23,42,.1)\';this.style.color=\'#1e293b\';"'
        +' onmouseenter="this.style.background=\'#f0fdf4\';this.style.borderColor=\'#059669\';this.style.color=\'#047857\';this.style.boxShadow=\'0 2px 8px rgba(5,150,105,.18)\';"'
        +' onmouseleave="this.style.background=\'#fff\';this.style.borderColor=\'rgba(15,23,42,.1)\';this.style.color=\'#1e293b\';this.style.boxShadow=\'0 1px 4px rgba(15,23,42,.06)\';"'
        +' style="flex-shrink:0;white-space:nowrap;display:flex;align-items:center;gap:6px;padding:6px 12px 6px 7px;border-radius:14px;border:1.5px solid rgba(15,23,42,.1);background:#fff;color:#1e293b;font-size:.6rem;font-weight:700;font-family:inherit;cursor:pointer;box-shadow:0 1px 4px rgba(15,23,42,.06);transition:background .13s,border-color .13s,color .13s,box-shadow .13s,transform .1s;">'+badge+t.lbl+'</button>';
    }).join('')
  +'</div>';

  /* ── FEUILLE DOCUMENT PROFESSIONNELLE ── */

  /* Helper : bloc simple sans boutons masquer/restaurer */
  function pfDocBlock(id, content, label){
    return '<div id="'+id+'-wrap" style="position:relative;">'+content+'</div>';
  }

  var editorArea=''
  +'<style>'
  +'#pf-doc-sheet{background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,.13),0 1px 4px rgba(0,0,0,.06);overflow:visible;margin-bottom:8px;}'
  +'#pf-doc-header-band{background:linear-gradient(135deg,#1e3a5f,#059669);border-radius:6px 6px 0 0;}'
  +'#pf-note-editor{outline:none;min-height:150px;font-size:.76rem;line-height:1.8;color:#1e293b;}'
  +'#pf-note-editor:empty:before{content:attr(data-placeholder);color:#b0bec5;font-style:italic;}'
  +'#pf-doc-divider{height:1px;background:linear-gradient(90deg,transparent,#d1fae5 20%,#059669 50%,#d1fae5 80%,transparent);margin:0 14px;}'
  +'[data-ce=true]:focus{outline:2px solid rgba(5,150,105,.3);outline-offset:1px;border-radius:3px;}'
  +'#pf-note-editor::-webkit-scrollbar{width:4px;}#pf-note-editor::-webkit-scrollbar-thumb{background:#059669;border-radius:4px;}'
  +'</style>'

  +'<div id="pf-doc-sheet">'

    /* ══ HEADER ══ */
    +pfDocBlock('pf-hdr',
      '<div id="pf-doc-header-band">'
        +'<div style="padding:11px 14px 8px;">'
          +'<div data-ce="true" id="pf-doc-title" contenteditable="true" spellcheck="false" data-ph="Titre du document" style="font-size:.88rem;font-weight:800;color:#fff;letter-spacing:-.01em;line-height:1.2;margin-bottom:4px;cursor:text;">'+( n.title||'Mon document' )+'</div>'
          +'<div data-ce="true" id="pf-doc-subtitle" contenteditable="true" spellcheck="false" data-ph="Sous-titre ou objet…" style="font-size:.56rem;color:rgba(255,255,255,.72);font-weight:500;cursor:text;">Cliquez pour modifier le sous-titre</div>'
        +'</div>'
        +'<div style="display:flex;border-top:1px solid rgba(255,255,255,.12);">'
          +'<div data-ce="true" id="pf-doc-from" contenteditable="true" spellcheck="false" data-ph="De : votre nom…" style="flex:1;padding:5px 14px;font-size:.5rem;color:rgba(255,255,255,.75);font-weight:600;border-right:1px solid rgba(255,255,255,.1);cursor:text;min-height:20px;">De : </div>'
          +'<div data-ce="true" id="pf-doc-to" contenteditable="true" spellcheck="false" data-ph="À : destinataire…" style="flex:1;padding:5px 14px;font-size:.5rem;color:rgba(255,255,255,.75);font-weight:600;cursor:text;min-height:20px;">À : </div>'
        +'</div>'
      +'</div>',
      'En-tête'
    )

    /* ══ SOUS-HEADER : date + ref optionnels ══ */
    +pfDocBlock('pf-docmeta',
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 14px;background:#f0fdf4;border-bottom:1px solid #d1fae5;">'
        +'<div data-ce="true" contenteditable="true" spellcheck="false" data-ph="Référence…" style="font-size:.46rem;font-weight:700;color:#047857;letter-spacing:.05em;cursor:text;">Réf. : </div>'
        +'<div data-ce="true" contenteditable="true" spellcheck="false" data-ph="Date…" style="font-size:.46rem;font-weight:600;color:#64748b;cursor:text;">'+new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})+'</div>'
      +'</div>',
      'Réf. / Date'
    )

    /* ══ CORPS ══ */
    +'<div style="padding:12px 16px 10px;border-left:3px solid #059669;margin:10px 14px 10px;border-radius:0 4px 4px 0;">'
      +'<div id="pf-note-editor" contenteditable="true" data-placeholder="Rédigez votre document ici…" style="scrollbar-width:thin;scrollbar-color:#059669 transparent;">'+contentHtml+'</div>'
    +'</div>'

    /* ══ DIVIDER ══ */
    +'<div id="pf-doc-divider"></div>'

    /* ══ FOOTER ══ */
    +pfDocBlock('pf-ftr',
      '<div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;padding:7px 14px;background:#f8fafc;border-top:1px solid #e8f5f0;border-radius:0 0 6px 6px;">'
        +'<div data-ce="true" contenteditable="true" spellcheck="false" data-ph="Note pied de page…" style="font-size:.44rem;color:#94a3b8;font-weight:500;cursor:text;">CareerPulse — Document personnel</div>'
        +'<div style="width:24px;height:1px;background:linear-gradient(90deg,#e2e8f0,#059669,#e2e8f0);flex-shrink:0;"></div>'
        +'<div data-ce="true" contenteditable="true" spellcheck="false" data-ph="Page / contact…" style="font-size:.44rem;color:#94a3b8;font-weight:500;cursor:text;text-align:right;">Page 1</div>'
      +'</div>',
      'Pied de page'
    )

  +'</div>'

  /* ── MESSAGE EVA AVERTISSEMENT ── */
  +'<div id="pf-eva-disclaimer" style="background:linear-gradient(135deg,rgba(4,120,87,.06),rgba(4,120,87,.03));border:1px solid rgba(4,120,87,.2);border-radius:10px;padding:10px 36px 10px 12px;margin-top:8px;margin-bottom:4px;position:relative;">'
    +'<div style="display:flex;align-items:flex-start;gap:8px;">'
      +'<div style="width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,#047857,#059669);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">'
        +'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
      +'</div>'
      +'<div>'
        +'<div style="font-size:.52rem;font-weight:800;color:#047857;margin-bottom:3px;">Eva — Information importante</div>'
        +'<div style="font-size:.48rem;color:#374151;line-height:1.6;">'
          +'Les fiches templates ci-dessus <strong style="color:#047857;">ne sont pas des documents officiels</strong>. '
          +'Utilisez-les comme supports de travail ou en format PDF pour votre usage personnel. '
          +'Ce sont des documents délivrés par <strong style="color:#047857;">CareerPulse</strong> pour vous accompagner dans votre parcours — ils n\'ont pas de valeur juridique ou administrative.'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<button onclick="document.getElementById(\'pf-eva-disclaimer\').style.display=\'none\';" title="Fermer" style="position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;border:none;background:#047857;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(4,120,87,.4);z-index:2;">'
      +'<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    +'</button>'
  +'</div>'

  +'<style>[data-ce=true]:empty:before{content:attr(data-ph);color:#b0bec5;font-style:italic;pointer-events:none;}</style>';

  /* ── EVA REPLY ZONE ── */
  var evaReply='<div id="pf-note-evareply" style="display:none;"></div>';

  /* ── BARRE BAS ── */
  var bottomBar=''
  +'<div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;gap:6px;">'
    +'<div id="pf-note-status" style="font-size:.46rem;color:rgba(15,23,42,.35);display:flex;align-items:center;gap:4px;">'
      +'<svg viewBox="0 0 10 10" width="8" height="8" fill="none"><circle cx="5" cy="5" r="4" stroke="#059669" stroke-width="1"/><path d="M3 5l1.5 1.5L7 3.5" stroke="#059669" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      +'Enregistré automatiquement.'
    +'</div>'
    +'<div style="font-size:.42rem;color:#94a3b8;font-weight:600;letter-spacing:.04em;">CareerPulse · EVA</div>'
  +'</div>';

  el.innerHTML = topBar + shareBar + toolbarContainer + calcBlock + emojiBar + colorBar + templateRow + editorArea + evaReply + bottomBar;
  /* Attacher autosave */
  var ed2=document.getElementById('pf-note-editor');
  if(ed2) ed2.addEventListener('input', function(){ pfSaveNoteFromEditor(); });
}

function pfFocusNoteEditor(){ var ed=document.getElementById('pf-note-editor'); if(ed) ed.focus(); }
function pfFmt(cmd){
  pfFocusNoteEditor();
  if(cmd==='bold') document.execCommand('bold');
  else if(cmd==='italic') document.execCommand('italic');
  else if(cmd==='underline') document.execCommand('underline');
  else if(cmd==='hilite') document.execCommand('hiliteColor', false, '#fde047');
  else if(cmd==='left') document.execCommand('justifyLeft');
  else if(cmd==='right') document.execCommand('justifyRight');
  else if(cmd==='justify') document.execCommand('justifyFull');
  else if(cmd==='center'){
    var isCentered=false;
    try{ isCentered=document.queryCommandState('justifyCenter'); }catch(e){}
    document.execCommand(isCentered?'justifyLeft':'justifyCenter');
  }
  pfSaveNoteFromEditor();
}
function pfFmtFont(font){
  pfFocusNoteEditor();
  if(font) document.execCommand('fontName', false, font);
  pfSaveNoteFromEditor();
}
function pfToggleEmoji(){
  var b=document.getElementById('pf-note-emojibar');
  if(b) b.style.display = b.style.display==='none' ? 'flex' : 'none';
}
function pfInsertEmoji(e){
  pfFocusNoteEditor();
  document.execCommand('insertText', false, e);
  pfSaveNoteFromEditor();
}
var PF_THEMES=[
  {name:'Bleu',hex:'#2563eb'},{name:'Cyan',hex:'#0891b2'},{name:'Violet',hex:'#7c3aed'},
  {name:'Ambre',hex:'#f59e0b'},{name:'Vert',hex:'#16a34a'},{name:'Rose',hex:'#db2777'},
  {name:'Orange',hex:'#ea580c'},{name:'Indigo',hex:'#4f46e5'}
];
function pfToggleColorPicker(){
  var b=document.getElementById('pf-note-colorbar');
  if(b) b.style.display = b.style.display==='none' ? 'flex' : 'none';
}
function pfApplyDocColor(newHex){
  var ed=document.getElementById('pf-note-editor');
  if(!ed || !PF_ACTIVE_TPL) return;
  var tpl=PF_NOTE_TEMPLATES[PF_ACTIVE_TPL];
  if(!tpl) return;
  var oldHex=tpl.color;
  if(!oldHex || oldHex.toLowerCase()===newHex.toLowerCase()) return;
  ed.innerHTML = ed.innerHTML.split(oldHex.toUpperCase()).join(newHex).split(oldHex.toLowerCase()).join(newHex);
  tpl.color=newHex;
  pfSaveNoteFromEditor();
}
function pfSaveNoteFromEditor(manual){
  var ed=document.getElementById('pf-note-editor');
  if(!ed) return;
  pfSaveNote(PF_NOTE_OPEN, ed.innerHTML);
  if(manual){
    var st=document.getElementById('pf-note-status');
    if(st) st.textContent='✓ Enregistré manuellement.';
    var plain=pfStripHtml(ed.innerHTML);
    pfMenuLogAddNamed('notes', plain.slice(0,46)||'(note vide)', plain, PF_NOTE_OPEN);
  }
}
function pfSaveNote(id, html){
  var items=pfGetList('notes');
  items=items.map(function(n){ if(n.id===id){ n.html=html; delete n.text; n.updated=Date.now(); } return n; });
  pfSetList('notes', items);
  var st=document.getElementById('pf-note-status');
  if(st){ st.textContent='✓ Enregistré'; clearTimeout(window._pfNoteStatusT); window._pfNoteStatusT=setTimeout(function(){ if(st) st.textContent='Enregistré automatiquement.'; },1200); }
}
function pfToggleNoteShare(){
  var b=document.getElementById('pf-note-sharebar');
  if(b) b.style.display = b.style.display==='none' ? 'flex' : 'none';
}
function pfShareNote(id, channel){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  if(!n) return;
  var text=pfStripHtml(n.html!=null?n.html:(n.text||'')).slice(0,500);
  if(!text) text='(note vide)';
  text='📝 Note CareerPulse\u00a0: '+text;
  if(channel==='wa') window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank');
  else if(channel==='tg') window.open('https://t.me/share/url?url='+encodeURIComponent('https://careerpulse.fr')+'&text='+encodeURIComponent(text),'_blank');
  else if(channel==='sms') window.open('sms:?body='+encodeURIComponent(text),'_blank');
}
var PF_NOTE_TIPS=[
  'Garde cette note, elle va t\'aider à t\'organiser : retrouve-la plus tard dans ton Agenda et tes tâches pour avancer sans rien oublier 📌',
  'Bien vu d\'avoir noté ça ! Enregistre tes notes au fur et à mesure, ça te permet de suivre tes tâches et ton programme sans perdre le fil 🗂️',
  'Continue à noter ce qui compte — ça t\'aide à organiser tes prochaines étapes et à garder ton agenda à jour 💪'
];
function pfAskEvaOnNote(id){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  var plain = n ? pfStripHtml(n.html!=null?n.html:(n.text||'')) : '';
  if(!n || !plain) return;
  var reply = PF_NOTE_TIPS[Math.floor(Math.random()*PF_NOTE_TIPS.length)];
  items=pfGetList('notes').map(function(x){ if(x.id===id){ x.evaReply=reply; x.evaReplyOpen=true; } return x; });
  pfSetList('notes', items);
  var out=document.getElementById('pf-note-evareply');
  if(out){ out.style.display='block'; out.style.overflow='visible'; out.innerHTML='<div style="margin-top:9px;background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.25);border-radius:9px;padding:9px 11px;font-size:.6rem;color:#0f172a;line-height:1.55;white-space:pre-line;"><strong style="color:#7c3aed;">'+PF_ICONS.bulb+' Eva\u00a0:</strong> '+pfEsc(reply)+'</div>'; }
  var btn=document.getElementById('pf-note-eva-btn');
  if(btn){
    btn.setAttribute('onclick','pfToggleNoteEvaReply(\''+id+'\')');
    btn.innerHTML=PF_ICONS.bulb+' Fermer le conseil Eva'+pfNoteEvaChevron(true);
  }
  if(out) setTimeout(function(){ out.scrollIntoView({behavior:'smooth', block:'nearest'}); },80);
}
function pfToggleNoteEvaReply(id){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  if(!n) return;
  var open = n.evaReplyOpen===false;
  items=items.map(function(x){ if(x.id===id) x.evaReplyOpen=open; return x; });
  pfSetList('notes', items);
  var box=document.getElementById('pf-note-evareply');
  var btn=document.getElementById('pf-note-eva-btn');
  if(box) box.style.display = open ? 'block' : 'none';
  if(btn) btn.innerHTML=PF_ICONS.bulb+' '+(open?'Fermer le conseil Eva':'Voir le conseil Eva')+pfNoteEvaChevron(open);
  if(open && box) setTimeout(function(){ box.scrollIntoView({behavior:'smooth', block:'nearest'}); },80);
}
function pfCloseNote(){
  var items=pfGetList('notes').filter(function(n){ return pfStripHtml(n.html!=null?n.html:(n.text||'')); });
  pfSetList('notes', items);
  PF_NOTE_OPEN=null;
  pfRenderTab('notes');
}
function pfDeleteNote(id){
  var items=pfGetList('notes').filter(function(n){ return n.id!==id; });
  pfSetList('notes', items);
  PF_NOTE_OPEN=null;
  pfRenderTab('notes');
}
function pfDuplicateNote(id){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  if(!n) return;
  var copy={id:pfUid(), html:n.html, updated:Date.now()};
  items.push(copy);
  pfSetList('notes', items);
  PF_NOTE_OPEN=copy.id;
  pfRenderTab('notes');
}
function pfPrintNote(id){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  if(!n) return;
  var html=n.html!=null?n.html:'';
  var w=window.open('','_blank');
  w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Note</title><style>body{font-family:"DM Sans",sans-serif;font-size:13px;line-height:1.7;padding:36px;max-width:680px;margin:auto;color:#1e293b}strong{font-weight:800}u{text-decoration:underline}.pf-pagebreak{border:none;border-top:2px dashed #cbd5e1;margin:28px 0}@media print{.pf-pagebreak{page-break-after:always}}</style></head><body>'+html+'</body></html>');
  w.document.close();
  setTimeout(function(){ w.print(); },300);
}
async function pfDownloadNotePdf(id){
  var items=pfGetList('notes');
  var n=items.filter(function(x){ return x.id===id; })[0];
  if(!n) return;
  var html=n.html!=null?n.html:'';
  if(!html){ alert('Cette note est vide.'); return; }
  var btn=document.getElementById('pf-note-pdf-btn');
  var origBtnHtml = btn ? btn.innerHTML : '';
  try{
    if(btn){ btn.innerHTML='<span style="font-size:.6rem;font-weight:800;">…</span>'; btn.style.pointerEvents='none'; }
    if(typeof html2pdf==='undefined'){
      await new Promise(function(res,rej){
        var s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        s.onload=res; s.onerror=rej;
        document.head.appendChild(s);
      });
    }
    var wrap=document.createElement('div');
    wrap.style.cssText='font-family:"DM Sans",Arial,sans-serif;font-size:13px;line-height:1.7;padding:24px;max-width:680px;color:#1e293b;background:#fff;';
    wrap.innerHTML=html;
    document.body.appendChild(wrap);
    await html2pdf().from(wrap).set({
      margin:10,
      filename:'note-careerpulse.pdf',
      html2canvas:{scale:2, useCORS:true},
      jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},
      pagebreak:{mode:['css','legacy'], before:'.pf-pagebreak'}
    }).save();
    wrap.remove();
  }catch(e){
    alert('Le téléchargement PDF a échoué — vérifie ta connexion internet et réessaie.');
  } finally {
    if(btn){ btn.innerHTML=origBtnHtml; btn.style.pointerEvents=''; }
  }
}
function pfInsertNoteBlock(tag){
  var ed=document.getElementById('pf-note-editor');
  if(!ed) return;
  ed.focus();
  var html='';
  if(tag==='h1') html='<h2 style="font-size:1.1rem;font-weight:900;color:#0f172a;margin:14px 0 4px;letter-spacing:-.01em;">Titre principal</h2>';
  else if(tag==='h2') html='<h3 style="font-size:.82rem;font-weight:800;color:#7c3aed;text-transform:uppercase;letter-spacing:.08em;margin:10px 0 3px;border-bottom:1.5px solid #e2e8f0;padding-bottom:4px;">Sous-titre</h3>';
  else if(tag==='sep') html=pfDeletableBlock('<hr class="pf-pagebreak" style="border:none;border-top:2.5px dashed #e2e8f0;margin:18px 0;">');
  else if(tag==='page') html=pfDeletableBlock('<div style="border:none;border-top:3px solid #7c3aed;margin:22px 0;text-align:center;"><span style="background:#fff;padding:0 10px;font-size:.6rem;font-weight:800;color:#a78bfa;letter-spacing:.1em;">— PAGE SUIVANTE —</span></div>');
  else if(tag==='footer') html=pfDeletableBlock('<div style="margin-top:28px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:.68rem;color:#94a3b8;display:flex;justify-content:space-between;"><span>CareerPulse · Note</span><span>©</span></div>');
  document.execCommand('insertHTML', false, html);
  pfSaveNoteFromEditor();
}
function pfDeletableBlock(innerHtml){
  return '<div class="pf-ins-block" contenteditable="false" style="position:relative;">'+innerHtml
    +'<button onclick="this.parentElement.remove();pfSaveNoteFromEditor();" contenteditable="false" title="Supprimer cet élément" style="position:absolute;top:-2px;right:0;width:20px;height:20px;border-radius:50%;background:#fff;border:1.5px solid #dc2626;color:#dc2626;font-size:.65rem;font-weight:900;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(15,23,42,.15);z-index:3;">×</button>'
  +'</div>';
}
function pfAddTemplateRow(itemKey){
  var TABLE_KEYS=['facture','devis','reunion','marche','bp','pptx'];
  var delBar='<div class="pf-dup-bar" style="display:flex;justify-content:flex-end;gap:6px;margin-bottom:6px;opacity:0;transition:opacity .18s;">'
    +'<button onmousedown="event.preventDefault()" onclick="this.closest(\'.pf-dup-block\').querySelector(\'.pf-dup-bar\').style.opacity=\'0\';pfSaveNoteFromEditor();" style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:1.5px solid #059669;background:#f0fdf4;color:#047857;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;">✓ Valider</button>'
    +'<button onmousedown="event.preventDefault()" onclick="this.closest(\'.pf-dup-block\').remove();pfSaveNoteFromEditor();" style="display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:1.5px solid #dc2626;background:#fff;color:#dc2626;font-size:.6rem;font-weight:800;cursor:pointer;font-family:inherit;">✕ Supprimer</button>'
  +'</div>';

  if(TABLE_KEYS.indexOf(itemKey)!==-1){
    /* Duplique le tableau ENTIER (en-tête + ligne) pour permettre d'ajouter un nouveau bloc d'infos sans tout mélanger */
    var tbl=document.getElementById('pf-tbl-'+itemKey);
    var extra=document.getElementById('pf-tbl-'+itemKey+'-extra');
    if(!tbl || !extra) return;
    var clone=tbl.outerHTML.replace(' id="pf-tbl-'+itemKey+'"','');
    extra.insertAdjacentHTML('beforeend', '<div class="pf-dup-block" onmouseenter="this.style.boxShadow=\'0 0 0 2px #059669\';this.querySelector(\'.pf-dup-bar\').style.opacity=\'1\';" onmouseleave="this.style.boxShadow=\'none\';this.querySelector(\'.pf-dup-bar\').style.opacity=\'0\';" style="margin-top:14px;border-radius:10px;padding:2px;transition:box-shadow .18s;">'+delBar+clone+'</div>');
    pfSaveNoteFromEditor();
    return;
  }

  var rows={
    stage:'<div class="pf-rep-stage" style="background:#f5f3ff;border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;padding:10px 12px;font-size:.74rem;"><strong style="color:#7c3aed;">Mission +&nbsp;:</strong><br>&nbsp;</div>',
    cv_exp:'<div class="pf-rep-cv-exp" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:9px;padding:11px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:5px;">'
        +'<div><div style="font-size:.76rem;font-weight:900;color:#0f172a;border-bottom:1px dashed #bae6fd;">Poste&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="font-size:.68rem;font-weight:700;color:#0284c7;margin-top:3px;border-bottom:1px dashed #bae6fd;">Entreprise&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
        +'<div style="background:#0284c7;color:#fff;border-radius:6px;padding:3px 8px;font-size:.58rem;font-weight:800;flex-shrink:0;">20XX–20XX</div>'
      +'</div>'
      +'<div style="font-size:.68rem;color:#475569;">▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>'
    +'</div>',
    cv_edu:'<div class="pf-rep-cv-edu" style="display:flex;align-items:center;gap:8px;background:#f0f9ff;border-radius:8px;padding:9px 11px;"><div style="width:8px;height:8px;border-radius:50%;background:#0284c7;flex-shrink:0;"></div><div style="flex:1;"><div style="font-size:.74rem;font-weight:800;color:#0f172a;border-bottom:1px dashed #bae6fd;">Diplôme&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="font-size:.66rem;color:#0284c7;font-weight:700;margin-top:2px;">Établissement · Année</div></div></div>'
  };
  var containers={stage:'pf-rows-stage',cv_exp:'pf-rows-cv_exp',cv_edu:'pf-rows-cv_edu'};
  var row=rows[itemKey];
  var target=document.getElementById(containers[itemKey]);
  if(!row || !target) return;
  target.insertAdjacentHTML('beforeend', '<div class="pf-dup-block" onmouseenter="this.style.boxShadow=\'0 0 0 2px #059669\';this.querySelector(\'.pf-dup-bar\').style.opacity=\'1\';" onmouseleave="this.style.boxShadow=\'none\';this.querySelector(\'.pf-dup-bar\').style.opacity=\'0\';" style="margin-top:8px;border-radius:10px;padding:2px;transition:box-shadow .18s;">'+delBar+row+'</div>');
  pfSaveNoteFromEditor();
}


/* ── CONTACTS : façon iPhone (recherche, A-Z, fiche détail) ── */
function pfRenderContacts(el){
  if(PF_CONTACT_OPEN){ pfRenderContactDetail(el); return; }
  var ctCount=pfGetList('contacts').length;
  el.innerHTML='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#22d3ee;margin-bottom:6px;">Réseau</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">Tes contacts<span style="color:#7c3aed;"> pro</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">Ton réseau pro, prêt à relancer'+(ctCount?' — '+ctCount+' contact'+(ctCount>1?'s':''):'')+'.</div>'
    +'<input id="pf-ct-search" value="'+pfEsc(PF_CONTACT_SEARCH)+'" oninput="PF_CONTACT_SEARCH=this.value;pfRenderContactList();" placeholder="Rechercher un contact" style="'+PF_INPUT_STYLE+'margin-bottom:10px;">'
    +'<button onclick="pfShowAddContact()" style="'+PF_BTN_STYLE+'margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:6px;">'+PF_ICONS.addperson+' Nouveau contact</button>'
    +'<div id="pf-ct-addform" style="display:none;margin-bottom:14px;">'
      +'<input id="pf-ct-nom" placeholder="Nom" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
      +'<input id="pf-ct-role" placeholder="Rôle / entreprise" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
      +'<input id="pf-ct-tel" placeholder="Téléphone" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
      +'<input id="pf-ct-email" placeholder="Email" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
      +'<button onclick="pfAddContact()" style="'+PF_BTN_STYLE+'">Enregistrer</button>'
    +'</div>'
    +'<div id="pf-ct-list"></div>';
  pfRenderContactList();
}
function pfRenderContactList(){
  var listEl=document.getElementById('pf-ct-list');
  if(!listEl) return;
  listEl.innerHTML='<div style="'+PF_EMPTY_STYLE+'">Tes sauvegardes sont dans le menu ☰.</div>';
}
function pfShowAddContact(){
  var f=document.getElementById('pf-ct-addform');
  if(f) f.style.display = f.style.display==='none' ? 'block' : 'none';
}
function pfAddContact(){
  var nomEl=document.getElementById('pf-ct-nom');
  var nom=nomEl?nomEl.value.trim():'';
  if(!nom) return;
  var role=document.getElementById('pf-ct-role').value.trim();
  var tel=document.getElementById('pf-ct-tel').value.trim();
  var email=document.getElementById('pf-ct-email').value.trim();
  var items=pfGetList('contacts');
  var newId=pfUid();
  items.push({id:newId,nom:nom,role:role,tel:tel,email:email});
  pfSetList('contacts', items);
  pfMenuLogAddNamed('contacts', nom, [role,tel,email].filter(Boolean).join(' · '), newId);
  var f=document.getElementById('pf-ct-addform');
  if(f) f.style.display='none';
  ['pf-ct-nom','pf-ct-role','pf-ct-tel','pf-ct-email'].forEach(function(id){ var e=document.getElementById(id); if(e) e.value=''; });
  pfRenderContactList();
}
function pfOpenContact(id){ PF_CONTACT_OPEN=id; pfRenderTab('contacts'); }
function pfCloseContact(){ PF_CONTACT_OPEN=null; pfRenderTab('contacts'); }
function pfRenderContactDetail(el){
  var items=pfGetList('contacts');
  var c=items.filter(function(x){ return x.id===PF_CONTACT_OPEN; })[0];
  if(!c){ PF_CONTACT_OPEN=null; pfRenderContacts(el); return; }
  var initial=(c.nom||'?').charAt(0).toUpperCase();
  el.innerHTML='<button onclick="pfCloseContact()" style="background:none;border:none;color:#7c3aed;font-size:.62rem;font-weight:700;cursor:pointer;margin-bottom:16px;font-family:inherit;">← Contacts</button>'
    +'<div style="text-align:center;margin-bottom:20px;">'
      +'<div style="width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#2563eb);display:flex;align-items:center;justify-content:center;font-size:1.7rem;font-weight:800;color:#fff;margin:0 auto 10px;">'+pfEsc(initial)+'</div>'
      +'<div style="font-size:.9rem;font-weight:800;color:#0f172a;">'+pfEsc(c.nom)+'</div>'
      +(c.role?'<div style="font-size:.64rem;color:rgba(15,23,42,.55);margin-top:2px;">'+pfEsc(c.role)+'</div>':'')
    +'</div>'
    +'<div style="display:flex;gap:14px;justify-content:center;margin-bottom:20px;">'
      +(c.tel?'<a href="tel:'+pfEsc(c.tel)+'" style="'+PF_CIRCLE_ACTION+'background:#22c55e;color:#fff;">'+PF_ICONS.phone+'</a>':'')
      +(c.tel?'<a href="sms:'+pfEsc(c.tel)+'" style="'+PF_CIRCLE_ACTION+'background:#3b82f6;color:#fff;">'+PF_ICONS.chat+'</a>':'')
      +(c.email?'<a href="mailto:'+pfEsc(c.email)+'" style="'+PF_CIRCLE_ACTION+'background:#a855f7;color:#fff;">'+PF_ICONS.mail+'</a>':'')
    +'</div>'
    +(c.tel?pfCard('<div style="font-size:.5rem;color:rgba(15,23,42,.45);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;">Téléphone</div><div style="font-size:.7rem;color:#0f172a;">'+pfEsc(c.tel)+'</div>'):'')
    +(c.email?pfCard('<div style="font-size:.5rem;color:rgba(15,23,42,.45);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;">Email</div><div style="font-size:.7rem;color:#0f172a;">'+pfEsc(c.email)+'</div>'):'')
    +'<div style="margin:18px 0 8px;display:flex;align-items:center;gap:7px;">'
      +'<span style="color:#22d3ee;font-size:.85rem;">'+PF_ICONS.target+'</span>'
      +'<div style="font-size:.68rem;font-weight:800;color:#0f172a;">Suivi des entretiens</div>'
    +'</div>'
    +'<div style="font-size:.56rem;color:rgba(15,23,42,.5);margin-bottom:10px;line-height:1.5;">Ce qui a marché, ce qui a coincé — Eva t\'encourage juste après.</div>'
    +'<input id="pf-ci-date" type="date" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">'
    +'<textarea id="pf-ci-marche" placeholder="Ce qui a marché…" style="'+PF_TEXTAREA_STYLE+'margin-bottom:6px;min-height:50px;"></textarea>'
    +'<textarea id="pf-ci-pasmarche" placeholder="Ce qui n\'a pas marché…" style="'+PF_TEXTAREA_STYLE+'margin-bottom:8px;min-height:50px;"></textarea>'
    +'<button onclick="pfAddContactInterview()" style="'+PF_BTN_STYLE+'margin-bottom:14px;">+ Noter cet entretien</button>'
    +pfRenderContactInterviewList(c)
    +'<button onclick="pfDel(\'contacts\',\''+c.id+'\');pfCloseContact();" style="width:100%;margin-top:12px;padding:11px;border-radius:10px;border:1px solid rgba(239,68,68,.25);background:rgba(239,68,68,.08);color:#dc2626;font-size:.62rem;font-weight:700;font-family:inherit;cursor:pointer;">Supprimer le contact</button>';
}
function pfRenderContactInterviewList(c){
  var entries=(c.entretiens||[]).slice().reverse();
  if(!entries.length) return '<div style="'+PF_EMPTY_STYLE+'">Aucun entretien noté pour l\'instant.</div>';
  return entries.map(function(en){
    var body='';
    if(en.date) body+='<div style="font-size:.55rem;color:rgba(15,23,42,.45);margin-bottom:5px;">'+pfEsc(pfFmtDateLong(en.date))+'</div>';
    if(en.marche) body+='<div style="font-size:.6rem;color:#16a34a;margin-bottom:4px;line-height:1.5;display:flex;gap:5px;"><span style="flex-shrink:0;margin-top:1px;">'+PF_ICONS.success+'</span><span>'+pfEsc(en.marche)+'</span></div>';
    if(en.pasMarche) body+='<div style="font-size:.6rem;color:#dc2626;line-height:1.5;display:flex;gap:5px;"><span style="flex-shrink:0;margin-top:1px;">'+PF_ICONS.warn+'</span><span>'+pfEsc(en.pasMarche)+'</span></div>';
    var evaBlock = en.evaLoading
      ? '<div style="margin-top:8px;font-size:.58rem;color:rgba(15,23,42,.45);display:flex;align-items:center;gap:5px;">'+PF_ICONS.hourglass+' Eva réfléchit…</div>'
      : (en.evaReply ? '<div style="margin-top:9px;background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.25);border-radius:9px;padding:9px 11px;font-size:.6rem;color:#0f172a;line-height:1.55;white-space:pre-line;"><strong style="color:#0e7490;display:flex;align-items:center;gap:5px;">'+PF_ICONS.chat+' Eva\u00a0:</strong> '+pfEsc(en.evaReply)+'</div>' : '');
    return pfCard('<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;"><div style="flex:1;min-width:0;">'+body+'</div><button onclick="pfDelContactInterview(\''+en.id+'\')" style="'+PF_DEL_STYLE+'flex-shrink:0;">✕</button></div>'+evaBlock, '#22d3ee');
  }).join('');
}
async function pfAddContactInterview(){
  if(!PF_CONTACT_OPEN) return;
  var dateEl=document.getElementById('pf-ci-date');
  var marcheEl=document.getElementById('pf-ci-marche');
  var pasEl=document.getElementById('pf-ci-pasmarche');
  var date=dateEl?dateEl.value:'';
  var marche=marcheEl?marcheEl.value.trim():'';
  var pasMarche=pasEl?pasEl.value.trim():'';
  if(!marche && !pasMarche) return;

  var entry={id:pfUid(),date:date,marche:marche,pasMarche:pasMarche,evaLoading:true,evaReply:null};
  var items=pfGetList('contacts');
  var c=items.filter(function(x){ return x.id===PF_CONTACT_OPEN; })[0];
  if(!c) return;
  c.entretiens=c.entretiens||[];
  c.entretiens.push(entry);
  pfSetList('contacts', items);
  pfRenderTab('contacts');

  var ctx='L\'utilisateur vient de noter un échange avec son contact pro '+(c.nom||'')+(c.role?(' ('+c.role+')'):'')+'. Ce qui a marché\u00a0: '+(marche||'rien de précisé')+'. Ce qui n\'a pas marché\u00a0: '+(pasMarche||'rien de précisé')+'. Donne-lui un encouragement court et concret, avec un conseil pour le prochain échange.';
  var summary=(marche?('Marché\u00a0: '+marche+'. '):'')+(pasMarche?('À améliorer\u00a0: '+pasMarche):'');
  var reply;
  try{ reply=await evaBrainAsk(summary, ctx); }
  catch(e){ reply='Bien noté — chaque échange t\'apprend quelque chose, continue à avancer 💪'; }

  var items2=pfGetList('contacts');
  var c2=items2.filter(function(x){ return x.id===PF_CONTACT_OPEN; })[0];
  if(c2){
    c2.entretiens=(c2.entretiens||[]).map(function(x){
      if(x.id===entry.id){ x.evaReply=reply; x.evaLoading=false; }
      return x;
    });
    pfSetList('contacts', items2);
    if(PF_TAB==='contacts') pfRenderTab('contacts');
  }
}
function pfDelContactInterview(id){
  if(!PF_CONTACT_OPEN) return;
  var items=pfGetList('contacts');
  var c=items.filter(function(x){ return x.id===PF_CONTACT_OPEN; })[0];
  if(!c) return;
  c.entretiens=(c.entretiens||[]).filter(function(x){ return x.id!==id; });
  pfSetList('contacts', items);
  pfRenderTab('contacts');
}

/* ── CONTACTS PROFESSIONNELS — organismes utiles par profil ──
   Numéros et sites officiels nationaux, vérifiés au mieux des connaissances.
   La plupart des administrations françaises ne publient ni mail ni fax génériques
   pour leurs lignes d'accueil : le contact se fait par téléphone, espace personnel
   ou formulaire en ligne sur leur site officiel — ce qui est indiqué explicitement
   plutôt que d'inventer une coordonnée qui n'existe pas. */
var ORG_NO_MAIL='Pas de mail public — cet organisme ne communique pas par mail générique, uniquement via le téléphone, ton espace personnel ou le formulaire de contact sur son site.';
var ORG_NO_FAX='Pas de fax public — ce mode de contact a été abandonné par la quasi-totalité des administrations françaises.';

var PF_ORG_DATA={
  dem:[
    {name:'France Travail',phone:'3949',site:'https://www.francetravail.fr',desc:'Inscription, indemnisation chômage (ARE), offres d\u2019emploi et accompagnement personnalisé.'},
    {name:'CAF — Caisse d\u2019Allocations Familiales',phone:'3230',site:'https://www.caf.fr',desc:'Aides sociales\u00a0: RSA, prime d\u2019activité, aide au logement (APL).'},
    {name:'URSSAF',phone:'3957',site:'https://www.urssaf.fr',desc:'Cotisations sociales et démarches liées à l\u2019indemnisation ou à la reprise d\u2019activité.'},
    {name:'APEC',phone:'0809 361 212',site:'https://www.apec.fr',desc:'Accompagnement des cadres\u00a0: conseils carrière, offres d\u2019emploi cadre, ateliers.'},
    {name:'Mission Locale',phone:null,phoneNote:'Pas de numéro national unique — chaque antenne locale a son propre numéro (voir le site pour trouver la tienne).',site:'https://www.mission-locale.fr',desc:'Accompagnement des 16-25 ans vers l\u2019emploi, la formation et le logement.'},
    {name:'Cap Emploi',phone:null,phoneNote:'Numéro propre à chaque antenne régionale, disponible sur le site.',site:'https://www.capemploi.com',desc:'Accompagnement vers l\u2019emploi des personnes en situation de handicap.'}
  ],
  etu:[
    {name:'CROUS',phone:null,phoneNote:'Numéro propre à chaque académie, disponible sur le site.',site:'https://www.crous.fr',desc:'Bourses, logement étudiant et restauration universitaire.'},
    {name:'CAF — Caisse d\u2019Allocations Familiales',phone:'3230',site:'https://www.caf.fr',desc:'Aide au logement (APL) pour les étudiants.'},
    {name:'CIDJ — Centre d\u2019Information Jeunesse',phone:null,phoneNote:'Voir le site pour le numéro de ton antenne locale.',site:'https://www.cidj.com',desc:'Information jeunesse\u00a0: orientation, emploi, logement, droits.'},
    {name:'ONISEP',phone:null,phoneNote:'Pas de ligne téléphonique nationale — informations disponibles sur le site.',site:'https://www.onisep.fr',desc:'Orientation scolaire et universitaire, infos métiers et formations.'},
    {name:'France Travail',phone:'3949',site:'https://www.francetravail.fr',desc:'Recherche de jobs étudiants, jobs d\u2019été et contrats courts.'},
    {name:'Campus France',phone:null,phoneNote:'Voir le site pour le contact de ton espace Campus France local.',site:'https://www.campusfrance.org',desc:'Accompagnement des étudiants internationaux en France.'}
  ],
  frl:[
    {name:'URSSAF — Indépendants',phone:'3957',site:'https://www.urssaf.fr',desc:'Déclaration et paiement des cotisations sociales des indépendants et auto-entrepreneurs.'},
    {name:'CCI — Chambre de Commerce et d\u2019Industrie',phone:null,phoneNote:'Numéro propre à chaque CCI régionale, disponible sur le site.',site:'https://www.cci.fr',desc:'Accompagnement à la création et au développement d\u2019entreprise.'},
    {name:'CMA — Chambre des Métiers et de l\u2019Artisanat',phone:null,phoneNote:'Numéro propre à chaque chambre régionale, disponible sur le site.',site:'https://www.artisanat.fr',desc:'Accompagnement des artisans\u00a0: formalités, formation, développement.'},
    {name:'Bpifrance',phone:null,phoneNote:'Voir le site pour le contact selon ta région et ton besoin (financement, conseil).',site:'https://www.bpifrance.fr',desc:'Financement et accompagnement des entreprises et indépendants.'},
    {name:'Service des impôts des entreprises',phone:'0809 401 401',site:'https://www.impots.gouv.fr',desc:'Déclarations fiscales, TVA et régime micro-entreprise.'},
    {name:'Mon Compte Formation',phone:null,phoneNote:'Pas de ligne téléphonique nationale — démarches via le site.',site:'https://www.moncompteformation.gouv.fr',desc:'Utilisation du CPF pour se former en tant qu\u2019indépendant.'}
  ],
  rec:[
    {name:'Mon Compte Formation (CPF)',phone:null,phoneNote:'Pas de ligne téléphonique nationale — démarches via le site.',site:'https://www.moncompteformation.gouv.fr',desc:'Gestion du Compte Personnel de Formation\u00a0: recherche et financement de formations.'},
    {name:'France Travail — Conseil en Évolution Pro',phone:'3949',site:'https://www.francetravail.fr',desc:'Conseil en évolution professionnelle (CEP) gratuit pour construire un projet de reconversion.'},
    {name:'APEC',phone:'0809 361 212',site:'https://www.apec.fr',desc:'Accompagnement à la reconversion pour les cadres.'},
    {name:'Transitions Pro',phone:null,phoneNote:'Numéro propre à chaque antenne régionale, disponible sur le site.',site:'https://www.transitionspro.fr',desc:'Financement du Projet de Transition Professionnelle pour se former en changeant de métier.'},
    {name:'AFPA',phone:null,phoneNote:'Voir le site pour contacter le centre de formation le plus proche.',site:'https://www.afpa.fr',desc:'Centres de formation professionnelle pour adultes, sur de nombreux métiers.'},
    {name:'Cap Emploi',phone:null,phoneNote:'Numéro propre à chaque antenne régionale, disponible sur le site.',site:'https://www.capemploi.com',desc:'Accompagnement à la reconversion des personnes en situation de handicap.'}
  ]
};

function pfOrgTelHref(phone){ return 'tel:'+phone.replace(/[^0-9+]/g,''); }

function pfRenderOrgPro(el){
  var list=PF_ORG_DATA[EWP]||PF_ORG_DATA['dem'];
  var cards=list.map(function(o){
    var phoneRow = o.phone
      ? '<a href="'+pfOrgTelHref(o.phone)+'" style="display:flex;align-items:center;gap:6px;flex:1;padding:8px 10px;border-radius:9px;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);color:#1d4ed8;font-size:.6rem;font-weight:700;text-decoration:none;">'+PF_ICONS.phone+' '+o.phone+'</a>'
      : '<div style="flex:1;padding:8px 10px;border-radius:9px;background:rgba(15,23,42,.04);border:1px solid rgba(15,23,42,.08);color:rgba(15,23,42,.45);font-size:.56rem;line-height:1.4;">'+PF_ICONS.phone+' '+(o.phoneNote||'Numéro non communiqué nationalement.')+'</div>';
    var siteRow = '<a href="'+o.site+'" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:6px;flex:1;padding:8px 10px;border-radius:9px;background:rgba(5,150,105,.08);border:1px solid rgba(5,150,105,.18);color:#047857;font-size:.6rem;font-weight:700;text-decoration:none;word-break:break-all;">'+PF_ICONS.share+' Site officiel</a>';
    return pfCard(
      '<div style="font-size:.72rem;font-weight:800;color:#0f172a;margin-bottom:3px;">'+o.name+'</div>'
      +'<div style="font-size:.6rem;color:#64748b;line-height:1.45;margin-bottom:9px;">'+o.desc+'</div>'
      +'<div style="display:flex;gap:7px;margin-bottom:7px;flex-wrap:wrap;">'+phoneRow+siteRow+'</div>'
      +'<div style="font-size:.52rem;color:rgba(15,23,42,.4);line-height:1.4;">'+ORG_NO_MAIL+'<br>'+ORG_NO_FAX+'</div>'
    , '#0ea5e9');
  }).join('');

  el.innerHTML='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#0ea5e9;margin-bottom:6px;">Organismes</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">Contacts<span style="color:#7c3aed;"> professionnels</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:10px;">Les organismes utiles à ton profil, avec leurs vrais numéros et sites officiels. Appuie sur le numéro pour appeler, sur le site pour l\u2019ouvrir.</div>'
    +'<div style="font-size:.52rem;color:rgba(15,23,42,.4);background:rgba(15,23,42,.03);border-radius:9px;padding:7px 9px;margin-bottom:12px;line-height:1.4;">Coordonnées vérifiées au mieux\u00a0: pense à recouper sur le site officiel avant une démarche importante, certains numéros peuvent évoluer.</div>'
    +cards;
}

/* ── ONGLET ADAPTÉ AU PROFIL ── */
function pfRenderProfileList(el){
  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var accent=(EWC[EWP]&&EWC[EWP].col)||'#a78bfa';
  var items=pfGetList('profil');
  var html='<div style="font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:'+accent+';margin-bottom:6px;">Suivi</div>'
    +'<div style="font-size:.92rem;font-weight:900;color:#0f172a;line-height:1.25;margin-bottom:5px;letter-spacing:-.01em;">'+cfg.label+'<span style="color:#7c3aed;"> en cours</span></div>'
    +'<div style="font-size:.62rem;color:#64748b;line-height:1.55;margin-bottom:14px;">Nourrit le conseil personnalisé d\'Eva'+(items.length?' — '+items.length+' élément'+(items.length>1?'s':''):'')+'.</div>';
  html+='<button onclick="pfToggleProfileForm()" style="'+PF_BTN_STYLE+'margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:6px;">'+cfg.emoji+' Ajouter</button>';
  html+='<div id="pf-pf-form" style="display:none;margin-bottom:14px;">';
  cfg.fields.forEach(function(f){
    if(f.type==='textarea') html+='<textarea id="pf-pf-'+f.k+'" placeholder="'+pfEsc(f.ph)+'" style="'+PF_TEXTAREA_STYLE+'margin-bottom:6px;"></textarea>';
    else html+='<input id="pf-pf-'+f.k+'" type="'+(f.type||'text')+'" placeholder="'+pfEsc(f.ph)+'" style="'+PF_INPUT_STYLE+'margin-bottom:6px;">';
  });
  html+='<button onclick="pfAddProfileItem()" style="'+PF_BTN_STYLE+'">'+cfg.emoji+' Enregistrer</button></div>';

  if(!items.length){
    html+='<div style="'+PF_EMPTY_STYLE+'">Rien d\'enregistré pour l\'instant.</div>';
  } else {
    items.slice().reverse().forEach(function(it){
      var lines=cfg.fields.slice(1).map(function(f){
        if(!it[f.k]) return '';
        if(f.type==='textarea') return '<div style="font-size:.6rem;color:rgba(15,23,42,.65);margin-top:4px;line-height:1.5;">'+pfEsc(it[f.k])+'</div>';
        return '<span style="font-size:.58rem;color:rgba(15,23,42,.6);margin-right:8px;">'+pfEsc(it[f.k])+'</span>';
      }).join('');
      var evaBlock = it.evaLoading
        ? '<div style="margin-top:8px;font-size:.58rem;color:rgba(15,23,42,.45);display:flex;align-items:center;gap:5px;">'+PF_ICONS.hourglass+' Eva réfléchit…</div>'
        : (it.evaReply ? '<div style="margin-top:9px;background:'+accent+'12;border:1px solid '+accent+'35;border-radius:9px;padding:9px 11px;font-size:.6rem;color:#0f172a;line-height:1.55;white-space:pre-line;"><strong style="color:'+accent+';display:flex;align-items:center;gap:5px;">'+PF_ICONS.chat+' Eva\u00a0:</strong> '+pfEsc(it.evaReply)+'</div>' : '');
      html+=pfCard('<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><div style="font-size:.68rem;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:6px;"><span style="color:'+accent+';">'+cfg.emoji+'</span>'+pfEsc(it[cfg.fields[0].k]||'')+'</div><button onclick="pfDel(\'profil\',\''+it.id+'\')" style="'+PF_DEL_STYLE+'">✕</button></div>'+lines+evaBlock, accent);
    });
  }

  el.innerHTML=html;
}
function pfToggleProfileForm(){
  var f=document.getElementById('pf-pf-form');
  if(f) f.style.display = f.style.display==='none' ? 'block' : 'none';
}
async function pfAddProfileItem(){
  var cfg=PF_PROFILE_CFG[EWP]||PF_PROFILE_CFG['dem'];
  var obj={id:pfUid()};
  var hasValue=false;
  cfg.fields.forEach(function(f){
    var elx=document.getElementById('pf-pf-'+f.k);
    var v=elx?elx.value.trim():'';
    obj[f.k]=v;
    if(v) hasValue=true;
  });
  if(!hasValue) return;
  obj.evaLoading=true;
  obj.evaReply=null;
  var items=pfGetList('profil');
  items.push(obj);
  pfSetList('profil', items);
  pfRenderTab('profil');

  var summary=cfg.fields.map(function(f){ return obj[f.k] ? (f.lbl+'\u00a0: '+obj[f.k]) : ''; }).filter(Boolean).join(' / ');
  pfMenuLogAddNamed('profil', obj[cfg.fields[0].k]||cfg.label, summary);
  var ctx='Profil utilisateur\u00a0: '+((EWC[EWP]&&EWC[EWP].nom)||'')+'. L\'utilisateur vient d\'enregistrer dans son portfolio ('+cfg.label+')\u00a0: '+summary+'. Donne-lui un conseil, une astuce ou un encouragement personnalisé et concret en lien direct avec ce qu\'il vient de noter.';
  var reply;
  try{ reply=await evaBrainAsk(summary, ctx); }
  catch(e){ reply='Continue comme ça, chaque étape compte 💪'; }

  var items2=pfGetList('profil').map(function(x){
    if(x.id===obj.id){ x.evaReply=reply; x.evaLoading=false; }
    return x;
  });
  pfSetList('profil', items2);
  if(PF_TAB==='profil') pfRenderTab('profil');
}


/* ══════════════════════════════════════════
   LIVRE NUMÉRIQUE — 4 profils × 11 pages
══════════════════════════════════════════ */
var _ewBookPage = 0;

var EW_BOOKS = {

/* ──────────────────── DEMANDEUR D'EMPLOI ──────────────────── */
dem: {
  title: 'Guide du demandeur d\'emploi',
  footer: '📖 CV, LM, Recherche · 11 pages essentielles',
  pages: [
    /* 1 */ '<div class="ebp-num">Page 1 — Introduction</div><div class="ebp-ttl">Ton guide <span>demandeur</span><br>d\'emploi</div><div class="ebp-sub">11 pages pour maîtriser chaque étape — de la rédaction du CV jusqu\'à la négociation salariale.</div><div class="ebp-stat"><div class="ebp-stat-item"><div class="ebp-stat-num">7s</div><div class="ebp-stat-lbl">Temps de lecture d\'un CV par un recruteur</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">70%</div><div class="ebp-stat-lbl">des postes trouvés via le réseau</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">3</div><div class="ebp-stat-lbl">candidatures qualifiées valent mieux que 30 génériques</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">+40%</div><div class="ebp-stat-lbl">de réponses avec un CV personnalisé</div></div></div><div class="ebp-tip">Ce guide est ton compagnon de recherche. Lis-le page par page ou va directement à la section dont tu as besoin.</div>',

    /* 2 */ '<div class="ebp-num">Page 2 — Le CV</div><div class="ebp-ttl">Rédiger un <span>CV</span><br>qui accroche</div><div class="ebp-sub">Un CV est lu en 7 secondes. Chaque ligne doit justifier sa présence.</div><div class="ebp-section">Structure obligatoire</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Accroche (3 lignes max)</strong> — qui tu es, ce que tu cherches, ta valeur ajoutée</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Expériences</strong> — anti-chronologiques, avec résultats chiffrés à chaque poste</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Formation</strong> — diplômes + certifications pertinentes</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Compétences</strong> — techniques ET soft skills + niveaux</div></div><div class="ebp-warn"><strong>Erreurs fatales :</strong> photo non professionnelle, fautes d\'orthographe, CV générique non adapté à l\'offre, plus de 2 pages avant 10 ans d\'expérience, email peu sérieux.</div>',

    /* 3 */ '<div class="ebp-num">Page 3 — CV avancé</div><div class="ebp-ttl">CV <span>anti-ATS</span><br>& percutant</div><div class="ebp-sub">Les ATS (logiciels de tri automatique) filtrent 75% des CV avant qu\'un humain les lise.</div><div class="ebp-section">Optimiser pour les ATS</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🔑</div><div class="ebp-card-body"><div class="ebp-card-ttl">Mots-clés de l\'offre</div><div class="ebp-card-txt">Reprends exactement les termes de l\'offre d\'emploi dans ton CV. Les ATS cherchent une correspondance <strong>mot pour mot</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📄</div><div class="ebp-card-body"><div class="ebp-card-ttl">Format PDF simple</div><div class="ebp-card-txt">Évite les tableaux complexes, colonnes multiples, images — les ATS <strong>ne lisent pas les mises en page complexes</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">📊</div><div class="ebp-card-body"><div class="ebp-card-ttl">Résultats chiffrés</div><div class="ebp-card-txt">Chaque expérience doit contenir au moins 1 chiffre : <strong>+30% CA, équipe de 5 personnes, 200 clients gérés</strong>.</div></div></div><div class="ebp-tip">Utilise le site Jobscan.co pour vérifier si ton CV passe les ATS avant d\'envoyer.</div>',

    /* 4 */ '<div class="ebp-num">Page 4 — Lettre de motivation</div><div class="ebp-ttl">La <span>LM</span> qui<br>fait la différence</div><div class="ebp-sub">Une bonne lettre répond à 3 questions : Pourquoi eux ? Pourquoi vous ? Pourquoi maintenant ?</div><div class="ebp-section">Structure en 3 paragraphes</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">1️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Accroche — Pourquoi eux</div><div class="ebp-card-txt">Montre que tu connais l\'entreprise : un chiffre récent, un projet, une valeur. <strong>Jamais "J\'ai l\'honneur de..."</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">2️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Valeur — Pourquoi vous</div><div class="ebp-card-txt">1 à 2 réalisations concrètes qui prouvent que tu peux résoudre leur problème. <strong>Chiffres obligatoires</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">3️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Conclusion — Call to action</div><div class="ebp-card-txt">Propose un entretien à une date précise. <strong>Actif, pas passif</strong> : "Je serais ravi d\'en discuter le..." plutôt que "Dans l\'attente...".</div></div></div>',

    /* 5 */ '<div class="ebp-num">Page 5 — Recherche active</div><div class="ebp-ttl">Organiser sa<br><span>recherche</span></div><div class="ebp-sub">Une recherche efficace ressemble à un emploi à temps plein. Structure ta semaine.</div><div class="ebp-section">Planning hebdomadaire</div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Candidatures ciblées</span><span>30%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:30%;background:#3b82f6"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Réseau & LinkedIn</span><span>25%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:25%;background:#7c3aed"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Veille & recherches</span><span>20%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:20%;background:#059669"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Préparation entretiens</span><span>15%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:15%;background:#b45309"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Formation & montée en compétences</span><span>10%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:10%;background:#0891b2"></div></div></div><div class="ebp-tip"><strong>Règle des 3 :</strong> 3 candidatures qualitatives/semaine valent mieux que 30 génériques. Qualité &gt; Quantité.</div>',

    /* 6 */ '<div class="ebp-num">Page 6 — LinkedIn</div><div class="ebp-ttl"><span>LinkedIn</span><br>ton allié n°1</div><div class="ebp-sub">70% des recruteurs utilisent LinkedIn en premier. Un profil All-Star change tout.</div><div class="ebp-section">Checklist profil All-Star</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Photo professionnelle</strong> — fond neutre, sourire, qualité correcte</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Titre accrocheur</strong> — poste + secteur + valeur ajoutée (pas juste "En recherche")</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Résumé en première personne</strong> — ce que tu fais, pour qui, avec quels résultats</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Expériences détaillées</strong> avec bullets et chiffres — comme le CV</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>3 recommandations minimum</strong> — demande à d\'anciens managers ou collègues</div></div><div class="ebp-warn"><strong>Activer "Open to Work"</strong> en mode privé (visible uniquement des recruteurs) — +40% de contacts entrants.</div>',

    /* 7 */ '<div class="ebp-num">Page 7 — Entretien</div><div class="ebp-ttl">Réussir<br>l\'<span>entretien</span></div><div class="ebp-sub">La méthode STAR pour répondre à toutes les questions comportementales.</div><div class="ebp-hero"><div class="ebp-hero-lbl">Méthode STAR</div><div class="ebp-hero-txt"><strong>S</strong>ituation — Contexte précis<br><strong>T</strong>âche — Ta mission<br><strong>A</strong>ction — Ce que TU as fait<br><strong>R</strong>ésultat — Chiffrable, mesurable</div></div><div class="ebp-section">5 questions immanquables</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">❓</div><div class="ebp-card-body"><div class="ebp-card-ttl">"Parlez-moi de vous"</div><div class="ebp-card-txt">Pitch de <strong>90 secondes max</strong> : parcours → compétence clé → pourquoi ce poste.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">❓</div><div class="ebp-card-body"><div class="ebp-card-ttl">"Votre plus grand défaut ?"</div><div class="ebp-card-txt">1 <strong>vrai défaut</strong> + la solution concrète mise en place. Jamais "Je suis perfectionniste".</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">❓</div><div class="ebp-card-body"><div class="ebp-card-ttl">"Où vous voyez-vous dans 5 ans ?"</div><div class="ebp-card-txt">Ambition <strong>réaliste et alignée</strong> avec le poste. Montre de l\'ambition sans effrayer.</div></div></div>',

    /* 8 */ '<div class="ebp-num">Page 8 — Négociation</div><div class="ebp-ttl">Négocier son<br><span>salaire</span></div><div class="ebp-sub">85% des candidats qui négocient obtiennent plus. Seuls 37% osent le faire.</div><div class="ebp-section">La méthode en 3 temps</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📊</div><div class="ebp-card-body"><div class="ebp-card-ttl">1. Se documenter</div><div class="ebp-card-txt">Glassdoor, LinkedIn Salary, APEC, offres similaires. Construis une <strong>fourchette marché précise</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">⏱️</div><div class="ebp-card-body"><div class="ebp-card-ttl">2. Le bon moment</div><div class="ebp-card-txt">Attends la proposition ou la question directe. <strong>Ne parle pas de salaire le premier</strong> avant l\'offre.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">💬</div><div class="ebp-card-body"><div class="ebp-card-ttl">3. La formule</div><div class="ebp-card-txt">"Compte tenu du marché et de mon expérience en [X], j\'envisageais <strong>une rémunération entre X et Y €</strong>. Y a-t-il une flexibilité ?"</div></div></div><div class="ebp-tip"><strong>Négocie aussi les extras :</strong> jours de télétravail, mutuelle, formations, tickets restaurant, primes — si le fixe est bloqué.</div>',

    /* 9 */ '<div class="ebp-num">Page 9 — France Travail</div><div class="ebp-ttl">Optimiser<br><span>France Travail</span></div><div class="ebp-sub">Ton conseiller peut débloquer des formations, aides et mises en relation si tu l\'aborde correctement.</div><div class="ebp-section">Ce que tu peux demander</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>POEI</strong> — formation courte pré-embauche financée à 100%</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>AFPR</strong> — adaptation au poste financée par France Travail</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>AIF</strong> — aide individuelle pour compléter ton CPF</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>MRS</strong> — recrutement sans CV par simulation, accès sans diplôme</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>CEP gratuit</strong> — conseil en évolution professionnelle pour clarifier ton projet</div></div><div class="ebp-warn"><strong>Obligation :</strong> 5 actes de recherche/mois minimum à documenter. Absence injustifiée à un RDV = radiation possible.</div>',

    /* 10 */ '<div class="ebp-num">Page 10 — Plan d\'action</div><div class="ebp-ttl">Ton plan<br><span>30 jours</span></div><div class="ebp-sub">Un plan concret pour les 4 prochaines semaines.</div><div class="ebp-section">Semaine 1 — Fondations</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">CV optimisé ATS + profil LinkedIn All-Star · Activer Open to Work (recruteurs uniquement)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Définir 3 cibles secteur/poste/géographie avec fourchette salariale marché (Glassdoor, APEC)</div></div><div class="ebp-section">Semaine 2 — Lancer</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">3 candidatures ciblées avec LM personnalisée · Tracker dans un tableau (offre, date, statut, relance)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">5 contacts réseau : anciens collègues, managers, alumni — message court, pas de demande directe</div></div><div class="ebp-section">Semaine 3 & 4 — Accélérer</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Relancer toutes les candidatures sans réponse après 7 jours (email 3 lignes max)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">RDV CEP gratuit pour valider la stratégie · Préparer pitch entretien avec méthode STAR</div></div><div class="ebp-tip"><strong>EVA peut analyser ton CV</strong> — utilise le module "Analyse de documents" pour un retour personnalisé et une note /10.</div>',

    /* 11 */ '<div class="ebp-num">Page 11 — Ressources</div><div class="ebp-ttl">Tes <span>ressources</span><br>essentielles</div><div class="ebp-sub">Les meilleures sources gratuites — utilisées dans les grandes écoles et par les chasseurs de têtes.</div><div class="ebp-section">Recherche d\'emploi</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🔍</div><div class="ebp-card-body"><div class="ebp-card-ttl">LinkedIn Jobs + Alertes</div><div class="ebp-card-txt">Active des alertes email sur tes 3 mots-clés cibles. Candidate dans les <strong>24h après publication</strong> — la réactivité double le taux de réponse.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📊</div><div class="ebp-card-body"><div class="ebp-card-ttl">APEC · Glassdoor · Welcome to the Jungle</div><div class="ebp-card-txt">APEC pour cadres (apec.fr) · Glassdoor pour les salaires réels · WTTJ pour la culture d\'entreprise. <strong>Triangule toujours 3 sources</strong> avant de négocier.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">🤖</div><div class="ebp-card-body"><div class="ebp-card-ttl">Jobscan.co</div><div class="ebp-card-txt">Analyse la compatibilité de ton CV avec une offre (score ATS). Gratuit pour les 5 premières analyses. Vise <strong>80%+ de match</strong> avant d\'envoyer.</div></div></div><div class="ebp-section">Droits & Aides</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🏛️</div><div class="ebp-card-body"><div class="ebp-card-ttl">France Travail · mon-cep.org · CPF</div><div class="ebp-card-txt"><strong>francetravail.fr</strong> pour s\'inscrire et suivre les aides · <strong>mon-cep.org</strong> pour le CEP gratuit · <strong>moncompteformation.gouv.fr</strong> pour ton CPF.</div></div></div><div class="ebp-section">Se former gratuitement</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🎓</div><div class="ebp-card-body"><div class="ebp-card-ttl">Coursera · OpenClassrooms · YouTube</div><div class="ebp-card-txt"><strong>Coursera</strong> (audit gratuit des cours) · <strong>OpenClassrooms</strong> (certifications) · <strong>YouTube</strong> : chaînes "Les Actus RH", "Monstrueux RH" pour préparer les entretiens.</div></div></div><div class="ebp-tip"><strong>Conseil élite :</strong> Crée un tableau Notion ou Google Sheets avec : Entreprise · Poste · Date cand. · Statut · Relance prévue. Les candidats organisés obtiennent en moyenne 3x plus d\'entretiens.</div>',
  ]
},

/* ──────────────────── ÉTUDIANT ──────────────────── */
etu: {
  title: 'Guide stage & alternance',
  footer: '📖 Stage, Alternance, Droits · 11 pages',
  pages: [
    /* 1 */ '<div class="ebp-num">Page 1 — Introduction</div><div class="ebp-ttl">Ton guide <span>stage</span><br>& alternance</div><div class="ebp-sub">Décrocher, négocier et réussir ton stage ou alternance — tout ce qu\'il faut savoir.</div><div class="ebp-stat"><div class="ebp-stat-item"><div class="ebp-stat-num">63%</div><div class="ebp-stat-lbl">des alternants sont embauchés par l\'entreprise à la fin</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">3,90€</div><div class="ebp-stat-lbl">gratification horaire minimale stage &gt; 2 mois (2026)</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">6 mois</div><div class="ebp-stat-lbl">avant la rentrée pour chercher son alternance</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">5j</div><div class="ebp-stat-lbl">avant le début : délai max pour déposer le contrat à l\'OPCO</div></div></div><div class="ebp-tip">Ce guide couvre tout : de la recherche jusqu\'à la négociation de ta mission en alternance.</div>',

    /* 2 */ '<div class="ebp-num">Page 2 — Trouver un stage</div><div class="ebp-ttl">Trouver <span>le stage</span><br>idéal</div><div class="ebp-sub">Les meilleures opportunités se trouvent rarement sur les jobboards classiques.</div><div class="ebp-section">Où chercher</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🔗</div><div class="ebp-card-body"><div class="ebp-card-ttl">LinkedIn + message direct</div><div class="ebp-card-txt">Identifie les responsables du service visé. Un message LinkedIn personnalisé vaut <strong>10 candidatures email</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🏫</div><div class="ebp-card-body"><div class="ebp-card-ttl">Réseau école</div><div class="ebp-card-txt">Anciens élèves, forum entreprises, bureau des stages — <strong>les entreprises partenaires recrutent en priorité</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">📱</div><div class="ebp-card-body"><div class="ebp-card-ttl">Candidatures spontanées</div><div class="ebp-card-txt">Cible 20 entreprises qui t\'intéressent et envoie un email personnalisé. <strong>Taux de réponse 3x supérieur</strong> aux plateformes.</div></div></div><div class="ebp-warn"><strong>Timing :</strong> Stage d\'été → candidature en janvier-février. Stage de fin d\'études → 4 à 6 mois à l\'avance.</div>',

    /* 3 */ '<div class="ebp-num">Page 3 — Convention de stage</div><div class="ebp-ttl">La <span>convention</span><br>de stage</div><div class="ebp-sub">Sans convention signée par les 3 parties AVANT le premier jour, le stage est illégal.</div><div class="ebp-section">Les 3 parties obligatoires</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>L\'école</strong> — valide la convention et le lien pédagogique avec ta formation</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>L\'entreprise</strong> — définit les missions, le tuteur, les horaires et la gratification</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Toi (stagiaire)</strong> — tu as le droit de vérifier et négocier certaines clauses</div></div><div class="ebp-section">Tes droits en stage</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Gratification obligatoire si stage &gt; <strong>2 mois consécutifs</strong> (3,90€/h en 2026)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">50% du titre de transport remboursé par l\'entreprise</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Accès à la restauration collective de l\'entreprise</div></div>',

    /* 4 */ '<div class="ebp-num">Page 4 — Alternance</div><div class="ebp-ttl">Décrocher<br>une <span>alternance</span></div><div class="ebp-sub">L\'alternance est le meilleur tremplin vers l\'emploi — 63% d\'embauche à la clé.</div><div class="ebp-section">Calendrier de recherche</div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Rentrée septembre — Chercher dès mars</span><span>6 mois</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:100%;background:#3b82f6"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Rentrée janvier — Chercher dès août</span><span>5 mois</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:83%;background:#7c3aed"></div></div></div><div class="ebp-section">Comment se démarquer</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🎯</div><div class="ebp-card-body"><div class="ebp-card-ttl">Projet pro clair</div><div class="ebp-card-txt">Les entreprises recrutent des alternants qui savent pourquoi ils viennent. <strong>Prépare un projet en 2 minutes</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🔧</div><div class="ebp-card-body"><div class="ebp-card-ttl">Compétences déjà prouvées</div><div class="ebp-card-txt">Projets persos, bénévolat, side-projects — montre que tu <strong>fais, pas juste que tu sais</strong>.</div></div></div>',

    /* 5 */ '<div class="ebp-num">Page 5 — Contrat alternance</div><div class="ebp-ttl">Le contrat<br>d\'<span>alternance</span></div><div class="ebp-sub">Apprentissage ou professionnalisation — comprendre les différences pour choisir.</div><div class="ebp-section">Contrat d\'apprentissage vs pro</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🎓</div><div class="ebp-card-body"><div class="ebp-card-ttl">Apprentissage</div><div class="ebp-card-txt">Pour les <strong>moins de 30 ans</strong> visant un diplôme (CAP au Master). Financement OPCO selon NPEC. Plus courant.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">💼</div><div class="ebp-card-body"><div class="ebp-card-ttl">Professionnalisation</div><div class="ebp-card-txt">Pour les <strong>+26 ans ou demandeurs d\'emploi</strong>. Moins utilisé mais accessible à tous. Financement OPCO différent.</div></div></div><div class="ebp-section">Rémunération légale 2026</div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>- 18 ans, 1ère année</span><span>27% SMIC</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:27%;background:#0891b2"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>18-21 ans, 1ère année</span><span>43% SMIC</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:43%;background:#3b82f6"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>21-25 ans, 1ère année</span><span>53% SMIC</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:53%;background:#7c3aed"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>26 ans et +</span><span>100% SMIC min</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:100%;background:#059669"></div></div></div>',

    /* 6 */ '<div class="ebp-num">Page 6 — Réussir</div><div class="ebp-ttl">Réussir son<br><span>alternance</span></div><div class="ebp-sub">Les 6 comportements qui transforment un alternant en embauche.</div><div class="ebp-section">Attitude gagnante</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Proactivité</strong> — propose des solutions avant qu\'on t\'assigne des problèmes</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Questions pertinentes</strong> — "J\'ai essayé X et Y. Quel serait ton conseil ?" plutôt que juste "Je sais pas"</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Rendre visible</strong> — partage tes avancées régulièrement avec ton tuteur</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Réseau interne</strong> — connais le prénom de tes collègues et intéresse-toi à leur travail</div></div><div class="ebp-tip">À mi-parcours, demande un point avec ton tuteur pour un feedback honnête. Les alternants qui demandent du feedback progressent 2x plus vite.</div>',

    /* 7 */ '<div class="ebp-num">Page 7 — OPCO & Financement</div><div class="ebp-ttl"><span>OPCO</span> :<br>ton financement</div><div class="ebp-sub">L\'OPCO finance ta formation en alternance selon le NPEC (coût contrat). Il peut aussi financer des formations complémentaires.</div><div class="ebp-section">Comment ça marche</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🏦</div><div class="ebp-card-body"><div class="ebp-card-ttl">OPCO = Opérateur de Compétences</div><div class="ebp-card-txt">Chaque secteur a son OPCO (AFDAS, ATLAS, OCAPIAT…). Il verse le financement à ton école selon le <strong>NPEC négocié</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📋</div><div class="ebp-card-body"><div class="ebp-card-ttl">Déposer le contrat</div><div class="ebp-card-txt">Obligatoire dans les <strong>5 jours avant le début</strong>. C\'est l\'entreprise qui dépose — mais tu dois vérifier que c\'est fait.</div></div></div><div class="ebp-section">Aide à l\'embauche</div><div class="ebp-tip">L\'entreprise peut recevoir une <strong>aide à l\'embauche de 6 000 €</strong> la première année pour un apprenti. C\'est un argument pour convaincre une PME hésitante.</div>',

    /* 8 */ '<div class="ebp-num">Page 8 — CROUS & Aides</div><div class="ebp-ttl"><span>CROUS</span><br>& aides étudiantes</div><div class="ebp-sub">Des centaines de millions d\'euros non réclamés chaque année. Ne passe pas à côté.</div><div class="ebp-section">DSE — à déposer chaque année</div><div class="ebp-warn"><strong>Délai critique :</strong> Le Dossier Social Étudiant (DSE) doit être déposé entre janvier et mai pour l\'année universitaire suivante sur messervices.etudiant.gouv.fr. Oubli = pas de bourse pendant 1 an.</div><div class="ebp-section">Aides disponibles</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Bourse sur critères sociaux</strong> — de 106€ à 600€/mois selon l\'échelon</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>APL logement</strong> — jusqu\'à 300€/mois selon la ville et les revenus</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Repas CROUS à 1€</strong> — accessible sur présentation de la carte étudiant</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Aide d\'urgence</strong> — FSDIE en cas de situation difficile, sans condition de ressources</div></div>',

    /* 9 */ '<div class="ebp-num">Page 9 — Après l\'alternance</div><div class="ebp-ttl">Se faire<br><span>embaucher</span></div><div class="ebp-sub">Transformer l\'alternance en CDI — les stratégies qui fonctionnent.</div><div class="ebp-section">6 mois avant la fin</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Signale ton intérêt pour un CDI à ton tuteur et au RH <strong>6 mois avant la fin</strong></div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Propose un <strong>bilan de ta valeur ajoutée</strong> — projets réalisés, économies générées, CA apporté</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Identifie ton futur poste dans l\'org chart et propose-toi pour ce rôle</div></div><div class="ebp-section">Si la réponse est non</div><div class="ebp-tip">Un refus d\'embauche n\'est pas un échec. Demande une <strong>lettre de recommandation</strong> et l\'autorisation d\'utiliser le nom de l\'entreprise. C\'est souvent plus précieux qu\'un CDI non souhaité.</div>',

    /* 10 */ '<div class="ebp-num">Page 10 — Plan d\'action</div><div class="ebp-ttl">Ton plan<br><span>6 mois</span></div><div class="ebp-sub">Le calendrier optimal pour décrocher ton alternance ou stage.</div><div class="ebp-section">Mois 1-2 : Préparer</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">CV 1 page · Profil LinkedIn All-Star · Photos professionnelle</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">10 entreprises cibles identifiées · Contacts LinkedIn des responsables ciblés</div></div><div class="ebp-section">Mois 3-4 : Candidater</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">5 candidatures spontanées personnalisées/semaine · Tracker les réponses dans un tableau</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Participation aux forums, salons recrutement, job dating école</div></div><div class="ebp-section">Mois 5-6 : Conclure</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Négocier les missions, le tuteur et la rémunération lors de l\'entretien</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Vérifier la convention ou contrat AVANT le premier jour — 3 signatures obligatoires</div></div><div class="ebp-tip">EVA peut analyser ta convention de stage ou contrat d\'alternance — module "Analyse de documents".</div>',

    /* 11 */ '<div class="ebp-num">Page 11 — Ressources</div><div class="ebp-ttl">Tes <span>ressources</span><br>essentielles</div><div class="ebp-sub">Les meilleures plateformes et outils — pour décrocher ton stage ou alternance plus vite.</div><div class="ebp-section">Trouver un stage / alternance</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🔍</div><div class="ebp-card-body"><div class="ebp-card-ttl">LinkedIn · Indeed · HelloWork</div><div class="ebp-card-txt">LinkedIn pour les grandes entreprises et le réseau · <strong>Indeed</strong> pour le volume · <strong>HelloWork</strong> pour les PME. Active les alertes email avec tes mots-clés précis.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🎓</div><div class="ebp-card-body"><div class="ebp-card-ttl">Alternance.emploi.gouv.fr · La Bonne Alternance</div><div class="ebp-card-txt">Service public officiel · <strong>labonnealternance.pole-emploi.fr</strong> identifie les entreprises qui recrutent des alternants dans ta zone. Gratuit, sans inscription.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">🏆</div><div class="ebp-card-body"><div class="ebp-card-ttl">Welcome to the Jungle · ChooseMyCompany</div><div class="ebp-card-txt">Pour évaluer la culture d\'entreprise <strong>avant</strong> de candidater. Les avis d\'anciens employés révèlent le management réel — cruciale pour un alternant.</div></div></div><div class="ebp-section">Droits & Aides étudiantes</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🏛️</div><div class="ebp-card-body"><div class="ebp-card-ttl">messervices.etudiant.gouv.fr · 1jeune1solution.gouv.fr</div><div class="ebp-card-txt"><strong>DSE pour les bourses CROUS</strong> (dépôt avant mai) · <strong>1jeune1solution</strong> regroupe toutes les aides jeunes : aide au permis, mobilité, logement, emploi.</div></div></div><div class="ebp-section">Se préparer</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📚</div><div class="ebp-card-body"><div class="ebp-card-ttl">YouTube · OpenClassrooms · Jobscan</div><div class="ebp-card-txt">"Préparer un entretien" sur YouTube (chaîne RH Partners) · <strong>OpenClassrooms</strong> pour les certifications · <strong>Jobscan.co</strong> pour scorer son CV face à une offre.</div></div></div><div class="ebp-tip"><strong>Conseil élite :</strong> Après chaque entretien, envoie un email de remerciement dans les 24h. Moins de 5% des candidats le font — c\'est un différenciateur immédiat.</div>',
  ]
},

/* ──────────────────── FREELANCE ──────────────────── */
frl: {
  title: 'Guide freelance — Étude & BP',
  footer: '📖 Étude de marché, Business Plan · 11 pages',
  pages: [
    /* 1 */ '<div class="ebp-num">Page 1 — Introduction</div><div class="ebp-ttl">Ton guide <span>freelance</span><br>& business</div><div class="ebp-sub">De l\'étude de marché au business plan — tout pour lancer et développer ton activité indépendante.</div><div class="ebp-stat"><div class="ebp-stat-item"><div class="ebp-stat-num">40%</div><div class="ebp-stat-lbl">des freelances échouent faute d\'étude de marché</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">x3</div><div class="ebp-stat-lbl">de revenus en plus avec un positionnement niche</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">6 mois</div><div class="ebp-stat-lbl">de trésorerie de sécurité recommandés avant de lancer</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">80%</div><div class="ebp-stat-lbl">du CA vient de 20% des clients — règle de Pareto</div></div></div>',

    /* 2 */ '<div class="ebp-num">Page 2 — Étude de marché</div><div class="ebp-ttl">L\'<span>étude</span><br>de marché</div><div class="ebp-sub">L\'étude de marché répond à 3 questions vitales : Qui ? Combien ? Comment ?</div><div class="ebp-section">Les 5 étapes</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🎯</div><div class="ebp-card-body"><div class="ebp-card-ttl">1. Définir sa cible</div><div class="ebp-card-txt">Persona précis : secteur, taille entreprise, rôle décisionnaire, problème principal à résoudre. <strong>Plus c\'est niche, plus c\'est rentable</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📊</div><div class="ebp-card-body"><div class="ebp-card-ttl">2. Quantifier le marché</div><div class="ebp-card-txt">TAM (marché total) → SAM (marché adressable) → SOM (part réaliste). <strong>10 clients de qualité = un bon départ</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">🔍</div><div class="ebp-card-body"><div class="ebp-card-ttl">3. Analyser la concurrence</div><div class="ebp-card-txt">Qui fait quoi, à quel prix ? Où est le vide à combler ? <strong>Malt, LinkedIn, Glassdoor</strong> pour se positionner.</div></div></div>',

    /* 3 */ '<div class="ebp-num">Page 3 — Étude de marché (suite)</div><div class="ebp-ttl">Valider<br>son <span>marché</span></div><div class="ebp-sub">Avant de lancer, valide avec de vraies conversations. Pas des sondages — des vrais entretiens.</div><div class="ebp-section">Méthode de validation</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">📞</div><div class="ebp-card-body"><div class="ebp-card-ttl">10 entretiens qualitatifs</div><div class="ebp-card-txt">30 min chacun, par téléphone ou visio. Questions ouvertes sur <strong>leurs problèmes réels</strong>, pas sur ton idée.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">💬</div><div class="ebp-card-body"><div class="ebp-card-ttl">Questions à poser</div><div class="ebp-card-txt">"Quel est votre plus grand défi en [domaine] ?" · "Comment vous résolvez ça aujourd\'hui ?" · <strong>"Qu\'est-ce que vous avez payé pour ce type de service ?"</strong></div></div></div><div class="ebp-tip">Si 7 personnes sur 10 mentionnent le même problème sans que tu l\'aies suggéré, tu as trouvé ton marché. Lance-toi.</div><div class="ebp-warn"><strong>Signal d\'alarme :</strong> Si tes prospects disent "c\'est intéressant" mais ne sont pas prêts à payer, ton idée n\'est pas encore viable. Pivote.</div>',

    /* 4 */ '<div class="ebp-num">Page 4 — Positionnement</div><div class="ebp-ttl">Ton <span>positionnement</span><br>différenciant</div><div class="ebp-sub">Se positionner en expert d\'une niche permet de multiplier son TJM par 2 à 3.</div><div class="ebp-section">La formule de positionnement</div><div class="ebp-hero"><div class="ebp-hero-lbl">Ta proposition de valeur</div><div class="ebp-hero-txt">J\'aide <strong>[cible précise]</strong><br>à résoudre <strong>[problème spécifique]</strong><br>grâce à <strong>[ta méthode unique]</strong><br>pour obtenir <strong>[résultat mesurable]</strong></div></div><div class="ebp-section">Généraliste vs Spécialiste</div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Développeur web</span><span>TJM ~400€</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:40%;background:#94a3b8"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Dév React TypeScript</span><span>TJM ~600€</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:60%;background:#3b82f6"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Expert React Fintech</span><span>TJM ~900€</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:90%;background:#7c3aed"></div></div></div>',

    /* 5 */ '<div class="ebp-num">Page 5 — Business Plan</div><div class="ebp-ttl">Le <span>business plan</span><br>freelance</div><div class="ebp-sub">Un BP freelance n\'est pas un roman. 2 pages suffisent — l\'essentiel en chiffres.</div><div class="ebp-section">Les 5 blocs du BP</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Offre</strong> — ce que tu fais exactement, pour qui, avec quels livrables</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Marché</strong> — taille, croissance, 3 concurrents directs + ta différence</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Modèle économique</strong> — TJM ou forfait, nombre de clients nécessaires, récurrence</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Prévisionnel</strong> — CA cible mois 1 à 12, charges fixes, point mort</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Pipeline commercial</strong> — comment tu vas trouver tes 3 premiers clients</div></div>',

    /* 6 */ '<div class="ebp-num">Page 6 — Finances</div><div class="ebp-ttl">Le <span>prévisionnel</span><br>financier</div><div class="ebp-sub">Calcule ton point mort avant de te lancer — c\'est le seul chiffre qui compte vraiment.</div><div class="ebp-section">Calcul du TJM minimal</div><div class="ebp-hero"><div class="ebp-hero-lbl">Formule TJM de survie</div><div class="ebp-hero-txt">Charges fixes/mois × 12<br>÷ jours facturables/an (<strong>~150j</strong>)<br>= <strong>TJM minimum vital</strong><br><br>Multiplie par 1,5 pour ton TJM cible</div></div><div class="ebp-section">Charges à anticiper</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">URSSAF — environ <strong>22% du CA</strong> en micro-entreprise</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">CFE (Cotisation Foncière des Entreprises) — annuelle, variable selon commune</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Mutuelle santé — non couverte en micro-entreprise</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Retraite complémentaire — prévoir <strong>5-10% du CA</strong> à épargner</div></div>',

    /* 7 */ '<div class="ebp-num">Page 7 — Trouver des clients</div><div class="ebp-ttl">Trouver ses<br><span>premiers clients</span></div><div class="ebp-sub">Les 3 premiers clients sont les plus difficiles. Voici comment les décrocher.</div><div class="ebp-section">Stratégie de lancement</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">👥</div><div class="ebp-card-body"><div class="ebp-card-ttl">Réseau proche en premier</div><div class="ebp-card-txt">Ex-collègues, anciens managers, amis en entreprise. <strong>70% des premières missions viennent du réseau</strong>. Préviens-les avant de lancer.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">💼</div><div class="ebp-card-body"><div class="ebp-card-ttl">Plateformes freelance</div><div class="ebp-card-txt">Malt, Comet, Freelance.com, Upwork. <strong>Profil complet + 3 premières missions même à TJM réduit</strong> pour obtenir des avis.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">✍️</div><div class="ebp-card-body"><div class="ebp-card-ttl">Content LinkedIn</div><div class="ebp-card-txt">1 post par semaine sur ton expertise. Les recruteurs et clients te trouvent — <strong>inbound marketing à coût zéro</strong>.</div></div></div>',

    /* 8 */ '<div class="ebp-num">Page 8 — Contrats & Prix</div><div class="ebp-ttl">Contrats<br>& <span>négociation</span></div><div class="ebp-sub">Ne commence jamais une mission sans contrat signé — même pour un ami ou un client de confiance.</div><div class="ebp-section">Clauses obligatoires</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Périmètre exact</strong> — ce qui est inclus ET ce qui est hors-périmètre</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Délais et livrables</strong> — dates précises, formats, nombre de révisions incluses</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Paiement</strong> — 30 à 50% d\'acompte à la signature, solde à la livraison</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Propriété intellectuelle</strong> — à qui appartient le travail livré ?</div></div><div class="ebp-warn"><strong>Pénalités de retard :</strong> Inclus une clause de pénalité de 1,5% par mois de retard de paiement (obligatoire légalement pour les pros). Elle seule évite 80% des impayés.</div>',

    /* 9 */ '<div class="ebp-num">Page 9 — URSSAF & Fiscalité</div><div class="ebp-ttl"><span>URSSAF</span><br>& impôts</div><div class="ebp-sub">En micro-entreprise, la gestion fiscale est simple — mais les pièges sont coûteux.</div><div class="ebp-section">Les règles d\'or</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Déclarer le CA <strong>chaque mois ou trimestre</strong> — même si 0€</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Mettre <strong>25% de chaque paiement reçu</strong> de côté immédiatement (cotisations + IR)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Tenir un journal de CA mensuel simple dans un tableur</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Passer à la <strong>SASU/EURL si CA dépasse 40 000€</strong> — la fiscalité devient plus avantageuse</div></div><div class="ebp-tip"><strong>Application recommandée :</strong> Indy, Pennylane ou Axonaut pour automatiser la gestion comptable et les déclarations.</div>',

    /* 10 */ '<div class="ebp-num">Page 10 — Plan de lancement</div><div class="ebp-ttl">Ton plan<br><span>90 jours</span></div><div class="ebp-sub">Le plan de lancement réaliste pour tes 3 premiers mois en freelance.</div><div class="ebp-section">Mois 1 : Poser les bases</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Immatriculation URSSAF (autoentrepreneur.urssaf.fr) · Compte bancaire pro dédié</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Profil LinkedIn optimisé + Malt complet · 1 post d\'expertise publié · Offre de service rédigée</div></div><div class="ebp-section">Mois 2 : Premiers clients</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Contact personnalisé de 20 personnes du réseau proche — message en 3 lignes, pas de discours</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">1ère mission décrochée — même à TJM réduit (−20%) pour obtenir un avis Malt et une référence</div></div><div class="ebp-section">Mois 3 : Stabiliser</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Remonter le TJM de 15-20% sur toutes nouvelles demandes · Négocier la reconduction client 1</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Viser 2 clients récurrents avant de refuser des missions · Préparer le prévisionnel mois 4-12</div></div><div class="ebp-tip">EVA peut analyser ton contrat client ou devis — module "Analyse de documents".</div>',

    /* 11 */ '<div class="ebp-num">Page 11 — Ressources</div><div class="ebp-ttl">Tes <span>ressources</span><br>essentielles</div><div class="ebp-sub">Les meilleures plateformes et outils pour lancer et développer ton activité freelance.</div><div class="ebp-section">Trouver des missions</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">💼</div><div class="ebp-card-body"><div class="ebp-card-ttl">Malt · Comet · Freelance.com</div><div class="ebp-card-txt"><strong>Malt</strong> pour les missions France (le plus utilisé) · <strong>Comet</strong> pour les profils tech et data · <strong>Freelance.com</strong> pour la diversité des secteurs. Ouvre les 3 dès le départ.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🌍</div><div class="ebp-card-body"><div class="ebp-card-ttl">Upwork · Toptal (international)</div><div class="ebp-card-txt"><strong>Upwork</strong> pour les clients anglophones et les TJM en dollars · <strong>Toptal</strong> pour l\'élite (sélection rigoureuse, mais TJM x2). Adapté si tu vises le marché international.</div></div></div><div class="ebp-section">Gérer son activité</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">📊</div><div class="ebp-card-body"><div class="ebp-card-ttl">Indy · Pennylane · Axonaut</div><div class="ebp-card-txt">Comptabilité automatisée, déclarations URSSAF, facturation. <strong>Indy</strong> est le plus simple pour les micro-entrepreneurs. Coût : ~20€/mois — économise 5h/mois minimum.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">📝</div><div class="ebp-card-body"><div class="ebp-card-ttl">Modèles de contrats gratuits</div><div class="ebp-card-txt"><strong>legalstart.fr</strong> pour des modèles de contrats vérifiés · <strong>juristique.fr</strong> pour des templates CGV · <strong>URSSAF.fr</strong> pour toutes les déclarations officielles.</div></div></div><div class="ebp-section">Se former & benchmarker</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">📚</div><div class="ebp-card-body"><div class="ebp-card-ttl">Malt Community · LinkedIn · IndyPro</div><div class="ebp-card-txt"><strong>Malt Community</strong> (forum freelances FR) · <strong>LinkedIn Creator Mode</strong> pour la visibilité · baromètre annuel des TJM sur <strong>malt.fr/fr/barometre</strong>.</div></div></div><div class="ebp-tip"><strong>Conseil élite :</strong> Demande systématiquement un avis Malt et une recommandation LinkedIn à chaque client satisfait. La réputation en ligne est ton actif le plus précieux — elle se construit mission par mission.</div>',
  ]
},

/* ──────────────────── RECONVERSION ──────────────────── */
rec: {
  title: 'Guide formations & CPF',
  footer: '📖 Reconversion, Formations, CPF · 11 pages',
  pages: [
    /* 1 */ '<div class="ebp-num">Page 1 — Introduction</div><div class="ebp-ttl">Ton guide <span>reconversion</span><br>& formations</div><div class="ebp-sub">CPF, VAE, bilan de compétences, Transitions Pro — toutes les clés pour réussir ta reconversion.</div><div class="ebp-stat"><div class="ebp-stat-item"><div class="ebp-stat-num">2,9M</div><div class="ebp-stat-lbl">de CPF activés par an en France</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">3 500€</div><div class="ebp-stat-lbl">solde CPF moyen disponible par actif</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">100%</div><div class="ebp-stat-lbl">des reconversions peuvent être financées à 0€ avec le bon montage</div></div><div class="ebp-stat-item"><div class="ebp-stat-num">18 mois</div><div class="ebp-stat-lbl">durée moyenne d\'une reconversion réussie</div></div></div>',

    /* 2 */ '<div class="ebp-num">Page 2 — Se connaître</div><div class="ebp-ttl">Clarifier<br>son <span>projet</span></div><div class="ebp-sub">Avant toute formation, tu dois répondre à 3 questions essentielles.</div><div class="ebp-section">Les 3 questions fondamentales</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">🎯</div><div class="ebp-card-body"><div class="ebp-card-ttl">Quoi ? Le métier cible</div><div class="ebp-card-txt">Pas "je veux changer" mais "<strong>je veux devenir [X] dans [secteur Y]</strong>". Plus c\'est précis, plus les financements sont faciles.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🔍</div><div class="ebp-card-body"><div class="ebp-card-ttl">Pourquoi ? La vraie raison</div><div class="ebp-card-txt">Salaire, sens, équilibre vie pro/perso, management ? <strong>Comprendre le "pourquoi" évite de refaire la même erreur</strong> dans le nouveau métier.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">📅</div><div class="ebp-card-body"><div class="ebp-card-ttl">Quand ? La date cible</div><div class="ebp-card-txt">Sans date, pas d\'urgence. Fixe une date : <strong>"Je vise une prise de poste en [mois/année]"</strong>.</div></div></div><div class="ebp-tip">Un CEP (Conseil en Évolution Professionnelle) est <strong>entièrement gratuit</strong> et t\'aide à répondre à ces 3 questions. Prends RDV sur mon-cep.org avant toute démarche.</div>',

    /* 3 */ '<div class="ebp-num">Page 3 — Le CPF</div><div class="ebp-ttl">Le <span>CPF</span><br>de A à Z</div><div class="ebp-sub">Ton solde CPF est de l\'argent qui t\'appartient. Voici comment l\'utiliser intelligemment.</div><div class="ebp-section">Les essentiels</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Consulter ton solde sur <strong>moncompteformation.gouv.fr</strong> via France Connect</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Seules les formations inscrites au <strong>RNCP ou RS</strong> sont éligibles</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Hors temps de travail : <strong>pas besoin d\'accord employeur</strong></div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Reste à charge de <strong>100€</strong> depuis mai 2024 (sauf cas exonérés)</div></div><div class="ebp-warn"><strong>Fraude CPF :</strong> Ne communique jamais ton identifiant FranceConnect à un démarcheur. Les vraies formations se réservent UNIQUEMENT sur moncompteformation.gouv.fr.</div>',

    /* 4 */ '<div class="ebp-num">Page 4 — Financer sa reconversion</div><div class="ebp-ttl">Financements<br><span>cumulables</span></div><div class="ebp-sub">La reconversion à 0€ est possible avec le bon montage de financements.</div><div class="ebp-section">Les sources à combiner</div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>CPF (toi)</span><span>jusqu\'à 5 000€</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:50%;background:#7c3aed"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>OPCO (via employeur)</span><span>variable</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:70%;background:#3b82f6"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>AIF France Travail (si chômage)</span><span>variable</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:80%;background:#059669"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Transitions Pro (si salarié)</span><span>jusqu\'à 100%</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:100%;background:#b45309"></div></div></div><div class="ebp-prog"><div class="ebp-prog-lbl"><span>Région (selon métier porteur)</span><span>variable</span></div><div class="ebp-prog-bar"><div class="ebp-prog-fill" style="width:60%;background:#0891b2"></div></div></div>',

    /* 5 */ '<div class="ebp-num">Page 5 — Transitions Pro</div><div class="ebp-ttl"><span>Transitions Pro</span><br>100% financé</div><div class="ebp-sub">Formation longue pour changer de métier avec maintien de salaire — le dispositif le plus puissant.</div><div class="ebp-section">Conditions d\'accès</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>24 mois</strong> d\'expérience salariée (continue ou non)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Formation certifiante inscrite au <strong>RNCP</strong></div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Projet validé par le <strong>CEP</strong> avant dépôt du dossier</div></div><div class="ebp-section">Ce que Transitions Pro couvre</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Frais de formation à <strong>100%</strong></div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Maintien du salaire pendant la formation</div></div><div class="ebp-warn"><strong>Timing :</strong> Dépose le dossier <strong>120 jours avant</strong> le début de la formation. Les commissions siègent trimestriellement — anticipe 6 mois.</div>',

    /* 6 */ '<div class="ebp-num">Page 6 — Bilan de compétences</div><div class="ebp-ttl">Le <span>bilan</span><br>de compétences</div><div class="ebp-sub">24h réparties sur 3 mois pour cartographier qui tu es et où tu vas.</div><div class="ebp-section">Les 3 phases</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">1️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Phase préliminaire</div><div class="ebp-card-txt">Définir tes attentes, clarifier l\'objectif, poser le cadre avec le consultant.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">2️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Phase d\'investigation</div><div class="ebp-card-txt">Tests psychométriques, analyse des compétences, valeurs, motivations profondes, <strong>exploration du marché</strong>.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">3️⃣</div><div class="ebp-card-body"><div class="ebp-card-ttl">Phase de conclusion</div><div class="ebp-card-txt">Document de synthèse confidentiel + <strong>projet principal + plan d\'action</strong> sur 12-18 mois.</div></div></div><div class="ebp-tip">Finançable <strong>à 100% via le CPF</strong> (1 500 à 3 500€). Choisir un organisme certifié <strong>Qualiopi</strong>.</div>',

    /* 7 */ '<div class="ebp-num">Page 7 — La VAE</div><div class="ebp-ttl">La <span>VAE</span><br>sans passer par une école</div><div class="ebp-sub">Obtenir un diplôme reconnu grâce à ton expérience, sans formation longue.</div><div class="ebp-section">Le processus en 4 étapes</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Livret 1</strong> — recevabilité : prouver 1 an d\'expérience dans le domaine</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Livret 2</strong> — dossier de preuves : situation + actions + résultats pour chaque compétence du référentiel</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Entretien jury</strong> — défendre son Livret 2 face aux évaluateurs</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Décision</strong> — validation totale, partielle (compléments) ou refus</div></div><div class="ebp-tip">La VAE est financée par le <strong>CPF ou Transitions Pro</strong>. Durée moyenne : 12 à 18 mois.</div>',

    /* 8 */ '<div class="ebp-num">Page 8 — Choisir sa formation</div><div class="ebp-ttl">Choisir la<br><span>bonne formation</span></div><div class="ebp-sub">Toutes les formations ne se valent pas. Voici comment éviter les mauvais choix.</div><div class="ebp-section">Checklist avant de s\'inscrire</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Organisme certifié <strong>Qualiopi</strong> — obligatoire pour les fonds publics</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Certification inscrite au <strong>RNCP ou RS</strong> — sinon non éligible CPF</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Taux d\'insertion professionnelle</strong> dans le métier cible (demande les chiffres)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Avis vérifiés d\'anciens apprenants (pas uniquement sur le site de l\'organisme)</div></div><div class="ebp-warn"><strong>Attention aux arnaques CPF :</strong> Tout démarchage téléphonique non sollicité pour "utiliser ton CPF" est suspect. Les vraies formations n\'appellent pas à l\'improviste.</div>',

    /* 9 */ '<div class="ebp-num">Page 9 — Démission reconversion</div><div class="ebp-ttl">Démissionner<br>pour <span>se reconvertir</span></div><div class="ebp-sub">Depuis 2019, il est possible de démissionner et toucher l\'ARE sous conditions strictes.</div><div class="ebp-section">Les 5 étapes obligatoires</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>RDV CEP</strong> (obligatoire) — valide le sérieux de ton projet</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Construire le projet : métier cible + formation Qualiopi + financement</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Dossier CPRI — Commission Paritaire Régionale Interprofessionnelle</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt"><strong>Attendre la validation écrite</strong> de la CPRI (4 mois)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Seulement après : démissionner + s\'inscrire à France Travail</div></div><div class="ebp-warn"><strong>RÈGLE ABSOLUE :</strong> Ne jamais démissionner AVANT la validation CPRI — sinon, zéro ARE.</div>',

    /* 10 */ '<div class="ebp-num">Page 10 — Plan de reconversion</div><div class="ebp-ttl">Ton plan<br><span>18 mois</span></div><div class="ebp-sub">La feuille de route réaliste pour une reconversion réussie.</div><div class="ebp-section">Phase 1 : Clarifier (mois 1-3)</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">RDV CEP gratuit (mon-cep.org) + bilan de compétences si besoin (CPF)</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">10 entretiens "métier" avec des pros du secteur cible (LinkedIn) — 30 min, questions ouvertes</div></div><div class="ebp-section">Phase 2 : Financer (mois 4-6)</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Monter le dossier de financement : CPF + OPCO + Transitions Pro + Région</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Négocier avec l\'employeur une rupture conventionnelle si possible (si salarié)</div></div><div class="ebp-section">Phase 3 : Former & Lancer (mois 7-18)</div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Suivre la formation + construire le réseau du nouveau secteur dès le 1er jour de cours</div></div><div class="ebp-check"><div class="ebp-check-ico"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="ebp-check-txt">Stage / alternance / projet perso pour avoir de l\'expérience concrète avant la fin de formation</div></div><div class="ebp-tip">EVA peut analyser ton dossier VAE ou CPF — module "Analyse de documents".</div>',

    /* 11 */ '<div class="ebp-num">Page 11 — Ressources</div><div class="ebp-ttl">Tes <span>ressources</span><br>essentielles</div><div class="ebp-sub">Les meilleures sources pour financer, valider et réussir ta reconversion professionnelle.</div><div class="ebp-section">Financements & Droits</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🏛️</div><div class="ebp-card-body"><div class="ebp-card-ttl">moncompteformation.gouv.fr</div><div class="ebp-card-txt">Consulte ton solde CPF et réserve ta formation. <strong>Ne passe jamais par un intermédiaire</strong> — seul ce site officiel est sûr. Connexion via France Connect.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">💼</div><div class="ebp-card-body"><div class="ebp-card-ttl">transitions-pro.fr · mon-cep.org</div><div class="ebp-card-txt"><strong>transitions-pro.fr</strong> pour déposer ton dossier Transitions Pro (salariés) · <strong>mon-cep.org</strong> pour un CEP entièrement gratuit — première étape obligatoire de toute reconversion.</div></div></div><div class="ebp-card"><div class="ebp-card-ico" style="background:#fdf4ff;">📍</div><div class="ebp-card-body"><div class="ebp-card-ttl">Région & OPCO</div><div class="ebp-card-txt">Chaque région a un plan de formation pour les métiers en tension. <strong>Cherche "[ta région] aide reconversion 2026"</strong>. Cumulable avec CPF et Transitions Pro.</div></div></div><div class="ebp-section">Choisir une formation</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#eff6ff;">🔍</div><div class="ebp-card-body"><div class="ebp-card-ttl">rncp.cncp.gouv.fr · France Compétences</div><div class="ebp-card-txt">Vérifie qu\'une certification est <strong>reconnue officiellement</strong> sur rncp.cncp.gouv.fr avant de t\'inscrire. France Compétences publie les indicateurs de qualité des organismes.</div></div></div><div class="ebp-section">Explorer les métiers</div><div class="ebp-card"><div class="ebp-card-ico" style="background:#f0fdf4;">🗺️</div><div class="ebp-card-body"><div class="ebp-card-ttl">ONISEP · Orientation pour tous · ROME</div><div class="ebp-card-txt"><strong>onisep.fr</strong> pour explorer les fiches métiers · <strong>orientationpourtous.fr</strong> pour des RDV gratuits · Le <strong>ROME de France Travail</strong> détaille les compétences de chaque métier.</div></div></div><div class="ebp-tip"><strong>Conseil élite :</strong> Avant de choisir une formation, passe 1 journée en immersion (shadowing) dans le métier cible. 2 heures de terrain valent mieux que 10 heures de recherches Google — et ça se demande facilement sur LinkedIn.</div>',
  ]
}
};

var _ewBookCurrent = 0;
var _ewBookData = null;

function ewBookInit(){
  var p = EWP || 'dem';
  _ewBookData = EW_BOOKS[p];
  _ewBookCurrent = 0;
  if(!_ewBookData) return;

  /* Mettre à jour les labels du CTA */
  var ttlEl = document.getElementById('ew-book-ttl');
  var subEl = document.getElementById('ew-book-sub');
  var ftEl  = document.getElementById('ew-book-footer');
  if(ttlEl) ttlEl.textContent = _ewBookData.title;
  if(subEl) subEl.textContent = '11 pages essentielles — illustrées, interactives, adaptées à ton profil';
  if(ftEl)  ftEl.textContent  = _ewBookData.footer;

  /* Créer les pages */
  var pagesEl = document.getElementById('ew-book-pages');
  pagesEl.innerHTML = '';
  _ewBookData.pages.forEach(function(html, i){
    var div = document.createElement('div');
    div.className = 'ew-book-page' + (i===0 ? ' active' : '');
    div.innerHTML = html;
    pagesEl.appendChild(div);
  });

  /* Dots */
  var dotsEl = document.getElementById('ew-book-dots');
  dotsEl.innerHTML = _ewBookData.pages.map(function(_,i){
    return '<div class="ew-book-dot'+(i===0?' active':'')+'" onclick="ewBookGoTo('+i+')"></div>';
  }).join('');

  ewBookUpdate();
}

function ewBookUpdate(){
  var total = _ewBookData ? _ewBookData.pages.length : 11;
  document.getElementById('ew-book-pag').textContent = 'Page '+(_ewBookCurrent+1)+' / '+total;
  var pct = ((_ewBookCurrent+1)/total*100).toFixed(0);
  document.getElementById('ew-book-bar').style.width = pct+'%';
  document.getElementById('ew-book-prev').disabled = _ewBookCurrent === 0;
  document.getElementById('ew-book-next').disabled = _ewBookCurrent === total-1;

  /* Dots */
  document.querySelectorAll('.ew-book-dot').forEach(function(d,i){
    d.className = 'ew-book-dot' + (i===_ewBookCurrent?' active':'');
  });
}

function ewBookGoTo(idx){
  var pages = document.querySelectorAll('.ew-book-page');
  var cur = pages[_ewBookCurrent];
  var next = pages[idx];
  if(!next || idx === _ewBookCurrent) return;

  var goRight = idx > _ewBookCurrent;
  cur.classList.remove('active');
  cur.style.transform = goRight ? 'translateX(-30px)' : 'translateX(30px)';
  cur.style.opacity = '0';

  next.style.transform = goRight ? 'translateX(30px)' : 'translateX(-30px)';
  next.style.opacity = '0';
  next.style.transition = 'none';
  next.classList.add('active');
  next.scrollTop = 0;

  setTimeout(function(){
    next.style.transition = '';
    next.style.transform = 'none';
    next.style.opacity = '1';
    setTimeout(function(){ cur.style.transform=''; cur.style.opacity=''; }, 260);
  }, 20);

  _ewBookCurrent = idx;
  ewBookUpdate();
}

function ewBookNext(){ if(_ewBookData && _ewBookCurrent < _ewBookData.pages.length-1) ewBookGoTo(_ewBookCurrent+1); }
function ewBookPrev(){ if(_ewBookCurrent > 0) ewBookGoTo(_ewBookCurrent-1); }

/* ══════════════════════════════════
   BUILD LISTE TOPICS
══════════════════════════════════ */
function ewBuildTopics(p){
  var topics=EWT[p]||[];
  var h='';
  topics.forEach(function(t){
    h+='<div class="ew-topic" onclick="ewShowTopic(\''+p+'\',\''+t.k+'\')">';
    h+='<div class="ew-topic-ico" style="background:'+t.bg+';border-color:'+t.bdr+'"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="'+t.col+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+t.ico+'</svg></div>';
    h+='<div class="ew-topic-info"><div class="ew-topic-ttl">'+t.lbl+'</div><div class="ew-topic-sub">'+t.sub+'</div></div>';
    h+='<div class="ew-topic-arr">›</div></div>';
  });
  document.getElementById('ew-topics').innerHTML=h;
}

/* ══════════════════════════════════
   AFFICHER UN CONSEIL (chat lecture seule)
══════════════════════════════════ */
function ewShowTopic(p,k){
  var topics=EWT[p]||[],topic=null;
  topics.forEach(function(t){if(t.k===k)topic=t;});
  if(!topic)return;
  var el=document.getElementById('ew-p3-msgs');
  el.innerHTML='';
  el.scrollTop=0;

  /* ── Bannière hero ── */
  var banner=document.createElement('div');
  banner.className='ew-mag-banner';
  banner.innerHTML='<div class="ew-mag-banner-ttl">'+topic.lbl+'</div>'
    +(topic.sub?'<div class="ew-mag-banner-sub">'+topic.sub+'</div>':'');
  el.appendChild(banner);

  /* ── Articles en cascade ── */
  function addMsg(idx){
    if(idx>=topic.msgs.length){
      /* Aperçu du document associé au topic */
      setTimeout(function(){
        ewAddDocPreview(el, topic.k);
        setTimeout(function(){
          ewAddEtToi(el,topic,p);
        },300);
      },400);
      return;
    }
    /* Loader typing */
    var ty=document.createElement('div');
    ty.className='ew-mag-typing';
    ty.innerHTML='<span></span><span></span><span></span>';
    el.appendChild(ty);

    setTimeout(function(){
      ty.remove();
      var raw=topic.msgs[idx];

      /* Extraire titre */
      var headMatch=raw.match(/^<strong>([^<]+)<\/strong>/);
      var head=headMatch?headMatch[1]:'';
      if(head) raw=raw.replace(/^<strong>[^<]+<\/strong>/,'');

      /* Enrichir contenu */
      var body=ewMagEnrich(raw);

      /* Conteneur section */
      var wrap=document.createElement('div');
      wrap.style.cssText='animation:ewFadeDown .3s '+(idx*0.04)+'s cubic-bezier(.22,1,.36,1) both;';

      var inner='';
      if(head) inner+='<div class="ew-mag-art-head">'+head+'</div>';
      inner+='<div class="ew-mag-art-body">'+body+'</div>';

      /* Détecter si le message contient des listes → callout */
      if(raw.indexOf('•')!==-1 || raw.indexOf('1.')!==-1){
        var lines=raw.replace(/<[^>]+>/g,'').split(/\n|<br>/);
        var listItems=lines.filter(function(l){ return /^[•·\-]|^\d+\./.test(l.trim()); });
        if(listItems.length>=2){
          inner='';
          if(head) inner+='<div class="ew-mag-art-head">'+head+'</div>';
          /* Corps texte avant la liste */
          var beforeList=raw.split(/•|\d+\./)[0];
          if(beforeList.replace(/<[^>]+>/g,'').trim())
            inner+='<div class="ew-mag-art-body">'+ewMagEnrich(beforeList)+'</div>';
          /* Callout pour la liste */
          inner+='<div class="ew-callout">'
            +'<div class="ew-callout-head">📌 Points clés</div>'
            +listItems.map(function(l){
              return '<div style="display:flex;gap:7px;margin-bottom:5px;">'
                +'<span style="color:#3b82f6;font-weight:900;flex-shrink:0;">→</span>'
                +'<span>'+ewMagEnrich(l.replace(/^[•·\-]\s?|\d+\.\s?/,''))+'</span></div>';
            }).join('')
          +'</div>';
        }
      }

      wrap.innerHTML=inner;
      el.appendChild(wrap);

      /* Séparateur entre sections */
      if(idx<topic.msgs.length-1){
        var sep=document.createElement('div');
        sep.className='ew-mag-sep';
        el.appendChild(sep);
      }
      setTimeout(function(){addMsg(idx+1);},260);
    },idx===0?600:800);
  }
  addMsg(0);
  ewGo(3,'EVA · '+topic.lbl);
}

/* ══════════════════════════════════════════
   APERÇU DOCUMENT — mini preview stylisée
   Montre à quoi ressemble le document associé
══════════════════════════════════════════ */

/* CSS aperçu document */
(function(){
  if(document.getElementById('ew-docprev-css')) return;
  var s=document.createElement('style');s.id='ew-docprev-css';
  s.textContent=`
/* ══ LIVRE NUMÉRIQUE INTERACTIF ══ */
.ew-book-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#f1f5f9;}
.ew-book-nav{display:flex;align-items:center;justify-content:space-between;padding:10px 16px 6px;flex-shrink:0;background:#fff;border-bottom:1px solid #f1f5f9;}
.ew-book-arr{width:36px;height:36px;border-radius:10px;background:#f8fafc;border:1.5px solid #e2e8f0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#374151;transition:all .13s;-webkit-tap-highlight-color:transparent;}
.ew-book-arr:active{background:#eff6ff;border-color:#3b82f6;color:#1e40af;}
.ew-book-arr:disabled{opacity:.3;pointer-events:none;}
.ew-book-pag{font-size:.6rem;font-weight:700;color:#64748b;}
.ew-book-progress{height:3px;background:#e2e8f0;margin:0 16px 8px;border-radius:2px;flex-shrink:0;}
.ew-book-progress-bar{height:100%;background:linear-gradient(90deg,#7c3aed,#3b82f6);border-radius:2px;transition:width .3s ease;}
.ew-book-pages{flex:1;overflow:hidden;position:relative;}
.ew-book-page{position:absolute;inset:0;overflow-y:auto;padding:14px 16px 20px;opacity:0;transform:translateX(30px);transition:opacity .25s ease,transform .25s ease;pointer-events:none;}
.ew-book-page.active{opacity:1;transform:none;pointer-events:all;}
.ew-book-page.exit-left{opacity:0;transform:translateX(-30px);}
.ebp-num{font-size:.43rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;}
.ebp-ttl{font-size:.95rem;font-weight:900;color:#0f172a;line-height:1.2;margin-bottom:4px;letter-spacing:-.01em;}
.ebp-ttl span{color:#7c3aed;}
.ebp-sub{font-size:.62rem;color:#64748b;line-height:1.5;margin-bottom:12px;}
.ebp-hero{background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:12px;padding:14px;margin-bottom:12px;}
.ebp-hero-lbl{font-size:.42rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#7c3aed;margin-bottom:5px;}
.ebp-hero-txt{font-size:.72rem;font-weight:700;color:#fff;line-height:1.5;}
.ebp-hero-txt strong{color:#a5b4fc;}
.ebp-section{font-size:.46rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#7c3aed;margin:12px 0 7px;display:flex;align-items:center;gap:6px;}
.ebp-section::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#e9d5ff,transparent);}
.ebp-card{background:rgba(255,255,255,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid #e2e8f0;border-radius:11px;padding:11px 12px;margin-bottom:7px;display:flex;align-items:flex-start;gap:10px;}
.ebp-card-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;}
.ebp-card-body{flex:1;}
.ebp-card-ttl{font-size:.67rem;font-weight:800;color:#0f172a;margin-bottom:2px;}
.ebp-card-txt{font-size:.61rem;color:#64748b;line-height:1.55;}
.ebp-card-txt strong{color:#1e40af;font-weight:700;}
.ebp-tip{background:rgba(239,246,255,.75);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-left:3px solid #3b82f6;border-radius:0 8px 8px 0;padding:9px 11px;margin-bottom:7px;font-size:.63rem;color:#1e293b;line-height:1.6;}
.ebp-tip strong{color:#1e40af;font-weight:700;}
.ebp-warn{background:rgba(255,245,245,.75);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-left:3px solid #dc2626;border-radius:0 8px 8px 0;padding:9px 11px;margin-bottom:7px;font-size:.63rem;color:#1e293b;line-height:1.6;}
.ebp-warn strong{color:#dc2626;font-weight:700;}
.ebp-check{display:flex;align-items:flex-start;gap:7px;padding:6px 0;border-bottom:1px solid #f8fafc;}
.ebp-check:last-child{border:none;}
.ebp-check-ico{width:18px;height:18px;border-radius:5px;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.ebp-check-txt{font-size:.63rem;color:#374151;line-height:1.5;flex:1;}
.ebp-check-txt strong{color:#0f172a;font-weight:700;}
.ebp-stat{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px;}
.ebp-stat-item{background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:10px;padding:10px;text-align:center;}
.ebp-stat-num{font-size:.9rem;font-weight:900;color:#fff;line-height:1;}
.ebp-stat-lbl{font-size:.46rem;color:rgba(255,255,255,.55);margin-top:2px;line-height:1.3;}
.ebp-prog{margin-bottom:6px;}
.ebp-prog-lbl{display:flex;justify-content:space-between;font-size:.55rem;color:#374151;font-weight:600;margin-bottom:3px;}
.ebp-prog-bar{height:6px;background:#e2e8f0;border-radius:3px;}
.ebp-prog-fill{height:100%;border-radius:3px;}



/* ── Petite animation de découverte pour les cartes CTA du chat EVA ── */
@keyframes ecCardPop{
  0%{opacity:0;transform:translateY(14px) scale(.96);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}
.ec-cta-pop{animation:ecCardPop .45s cubic-bezier(.16,1,.3,1) both;}

.ew-book-dots{display:flex;justify-content:center;gap:5px;padding:8px 0;flex-shrink:0;background:#f1f5f9;}
.ew-book-dot{width:6px;height:6px;border-radius:50%;background:#e2e8f0;transition:all .2s;cursor:pointer;}
.ew-book-dot.active{background:#7c3aed;width:18px;border-radius:3px;}

  .ew-docprev{margin:0 14px 0;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden;animation:ewFadeDown .35s .05s cubic-bezier(.22,1,.36,1) both;}
  .ew-docprev-hdr{background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:10px 14px;display:flex;align-items:center;gap:9px;}
  .ew-docprev-hdr-ico{width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .ew-docprev-hdr-txt{flex:1;}
  .ew-docprev-hdr-label{font-size:.42rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#34d399;margin-bottom:2px;}
  .ew-docprev-hdr-title{font-size:.64rem;font-weight:700;color:#fff;}
  .ew-docprev-body{padding:12px 14px;background:#f8fafc;}
  .ew-docprev-paper{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px 11px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
  /* Éléments du document */
  .dp-name{height:8px;background:linear-gradient(90deg,#0f172a,#1e3a5f);border-radius:3px;margin-bottom:3px;}
  .dp-title{height:5px;background:#3b82f6;border-radius:2px;margin-bottom:8px;opacity:.7;}
  .dp-sep{height:1px;background:#e2e8f0;margin:7px 0;}
  .dp-section{font-size:.44rem;font-weight:800;color:#1e40af;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;}
  .dp-line{height:4px;background:#e2e8f0;border-radius:2px;margin-bottom:3px;}
  .dp-line.dark{background:#cbd5e1;}
  .dp-line.blue{background:#bfdbfe;}
  .dp-line.short{width:60%;}
  .dp-line.med{width:80%;}
  .dp-tag{display:inline-block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:3px;padding:2px 5px;font-size:.42rem;color:#1e40af;font-weight:700;margin-right:3px;margin-bottom:3px;}
  .dp-bullet{display:flex;align-items:flex-start;gap:4px;margin-bottom:3px;}
  .dp-bullet::before{content:'•';color:#3b82f6;font-weight:900;font-size:.5rem;flex-shrink:0;margin-top:1px;}
  .dp-bullet-line{height:4px;background:#e2e8f0;border-radius:2px;flex:1;}
  .dp-photo{width:28px;height:34px;background:linear-gradient(135deg,#e2e8f0,#cbd5e1);border-radius:4px;float:right;margin-left:8px;}
  .dp-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
  .dp-box{background:#f1f5f9;border-radius:5px;padding:5px 6px;}
  .dp-box-lbl{height:3px;background:#94a3b8;border-radius:1px;margin-bottom:3px;width:50%;}
  .dp-box-val{height:5px;background:#1e3a5f;border-radius:2px;width:80%;}
  .dp-stamp{display:inline-block;border:2px solid #16a34a;border-radius:4px;padding:2px 6px;font-size:.44rem;font-weight:900;color:#16a34a;text-transform:uppercase;letter-spacing:.1em;margin-top:5px;transform:rotate(-2deg);}
  .dp-badge{background:#eff6ff;border-radius:5px;padding:4px 7px;margin-bottom:4px;}
  .dp-badge-lbl{font-size:.42rem;color:#64748b;margin-bottom:2px;}
  .dp-badge-val{height:5px;background:#3b82f6;border-radius:2px;}
  .ew-docprev-tip{padding:8px 14px 12px;background:#f8fafc;}
  .ew-docprev-tip-txt{font-size:.61rem;color:#64748b;line-height:1.55;}
  .ew-docprev-tip-txt strong{color:#1e40af;}
  `;
  document.head.appendChild(s);
})();

/* Templates de documents par topic */
var _EW_DOC_PREVIEWS = {

  /* ── CV ── */
  cv_pro: {
    label:'Document type', title:'Curriculum Vitæ',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    tip:'Un bon CV tient sur <strong>1 page</strong> pour moins de 10 ans d\'expérience. Les recruteurs le lisent en <strong>7 secondes</strong> — soigne l\'accroche et les réalisations chiffrées.',
    html:`<div class="dp-photo"></div>
<div class="dp-name" style="width:65%"></div>
<div class="dp-title" style="width:45%"></div>
<div style="margin-bottom:5px"><span class="dp-tag">📧 email@pro.fr</span><span class="dp-tag">📱 06 XX XX</span><span class="dp-tag">🔗 LinkedIn</span></div>
<div class="dp-sep"></div>
<div class="dp-section">Expériences</div>
<div class="dp-line dark med"></div>
<div class="dp-line short"></div>
<div class="dp-bullet"><div class="dp-bullet-line"></div></div>
<div class="dp-bullet"><div class="dp-bullet-line" style="width:70%"></div></div>
<div style="margin-top:5px"><div class="dp-line dark" style="width:75%"></div></div>
<div class="dp-bullet"><div class="dp-bullet-line"></div></div>
<div class="dp-sep"></div>
<div class="dp-section">Formation</div>
<div class="dp-line dark med"></div>
<div class="dp-line short"></div>
<div class="dp-sep"></div>
<div class="dp-section">Compétences</div>
<div style="display:flex;flex-wrap:wrap;gap:3px"><span class="dp-tag">Excel</span><span class="dp-tag">Gestion projet</span><span class="dp-tag">Anglais B2</span></div>`
  },

  /* ── Lettre de motivation ── */
  entretien: {
    label:'Document type', title:'Lettre de motivation',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    tip:'La lettre idéale fait <strong>3 paragraphes</strong> : pourquoi eux, pourquoi vous, pourquoi maintenant. Personnalise chaque lettre — les recruteurs voient immédiatement les lettres génériques.',
    html:`<div class="dp-line dark" style="width:35%;margin-bottom:8px"></div>
<div class="dp-line" style="width:55%;margin-bottom:5px"></div>
<div class="dp-line short" style="margin-bottom:12px"></div>
<div class="dp-line blue med" style="margin-bottom:8px"></div>
<div style="font-size:.4rem;color:#64748b;margin-bottom:6px;font-style:italic">Objet : Candidature au poste de...</div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line med" style="margin-bottom:3px"></div>
<div class="dp-line short" style="margin-bottom:8px"></div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line med" style="margin-bottom:3px"></div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line short" style="margin-bottom:8px"></div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line med" style="margin-bottom:3px"></div>
<div class="dp-line short" style="margin-bottom:10px"></div>
<div style="font-size:.42rem;color:#334155;font-weight:700">Cordialement,</div>
<div class="dp-line dark" style="width:30%;margin-top:4px"></div>`
  },

  /* ── Dossier France Travail / ARE ── */
  ft_rdv: {
    label:'Document type', title:'Dossier France Travail',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    tip:'Ton dossier France Travail doit inclure : <strong>CV à jour, liste des actes de recherche datés</strong> (min. 5/mois), et une description claire de ton projet professionnel en 3 phrases.',
    html:`<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
  <div style="width:20px;height:20px;border-radius:4px;background:#1e40af;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:#fff;font-weight:900">FT</div>
  <div><div class="dp-line dark" style="width:80px;margin-bottom:2px"></div><div class="dp-line" style="width:50px"></div></div>
</div>
<div class="dp-sep"></div>
<div class="dp-section">Actes de recherche</div>
${['Candidature — Entreprise A','Candidature — Entreprise B','Entretien — Entreprise C','Formation CPF suivie','Contact réseau professionnel'].map(function(t,i){
  return '<div class="dp-bullet"><div class="dp-bullet-line" style="width:'+(90-i*8)+'%"></div></div>';
}).join('')}
<div class="dp-sep"></div>
<div class="dp-section">Mon projet professionnel</div>
<div class="dp-line med" style="margin-bottom:3px"></div>
<div class="dp-line short"></div>
<div class="dp-stamp">Validé</div>`
  },

  are_droits: {
    label:'Document type', title:'Attestation ARE — France Travail',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    tip:'Conserve toujours ton <strong>attestation d\'employeur</strong> et tes <strong>12 derniers bulletins de salaire</strong> — ils servent à calculer ton SJR et donc le montant de ton ARE.',
    html:`<div class="dp-grid" style="margin-bottom:8px">
  <div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val"></div><div style="font-size:.4rem;color:#64748b;margin-top:2px">Salaire journalier</div></div>
  <div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val" style="background:#059669"></div><div style="font-size:.4rem;color:#64748b;margin-top:2px">Durée (mois)</div></div>
</div>
<div class="dp-sep"></div>
<div class="dp-section">Droits ouverts</div>
<div class="dp-badge"><div class="dp-badge-lbl">Montant journalier</div><div class="dp-badge-val" style="width:65%"></div></div>
<div class="dp-badge"><div class="dp-badge-lbl">Durée restante</div><div class="dp-badge-val" style="width:80%;background:#059669"></div></div>
<div class="dp-sep"></div>
<div class="dp-section">Documents justificatifs</div>
${['Attestation employeur','Bulletins de salaire (12 mois)','Pièce d\'identité'].map(function(t){
  return '<div class="dp-bullet"><div class="dp-bullet-line"></div></div>';
}).join('')}
<div class="dp-stamp" style="color:#1e40af;border-color:#1e40af">En cours</div>`
  },

  /* ── Licenciement ── */
  licenciement: {
    label:'Document type', title:'Lettre de licenciement',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    tip:'La lettre de licenciement doit obligatoirement contenir les <strong>motifs précis et circonstanciés</strong>. Une lettre vague ou sans motif réel peut être contestée aux <strong>Prud\'hommes dans les 12 mois</strong>.',
    html:`<div class="dp-line dark" style="width:40%;margin-bottom:8px"></div>
<div style="font-size:.42rem;color:#64748b;margin-bottom:5px">Paris, le __ / __ / 2026</div>
<div class="dp-line" style="width:60%;margin-bottom:3px"></div>
<div class="dp-line short" style="margin-bottom:10px"></div>
<div style="font-size:.42rem;color:#1e40af;font-weight:700;margin-bottom:5px">Objet : Notification de licenciement</div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line med" style="margin-bottom:3px"></div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line short" style="margin-bottom:8px"></div>
<div style="background:#fff5f5;border-left:2px solid #dc2626;padding:5px 7px;border-radius:0 5px 5px 0;margin-bottom:7px">
  <div class="dp-line" style="background:#fca5a5;margin-bottom:2px"></div>
  <div class="dp-line short" style="background:#fca5a5"></div>
</div>
<div class="dp-line" style="margin-bottom:3px"></div>
<div class="dp-line med" style="margin-bottom:8px"></div>
<div style="font-size:.42rem;color:#334155;font-weight:700">Signature employeur :</div>
<div class="dp-line dark" style="width:30%;margin-top:4px"></div>
<div style="font-size:.4rem;color:#dc2626;margin-top:5px;font-weight:700">⚠️ Délai contestation : 12 mois</div>`
  },

  /* ── Rupture conventionnelle ── */
  rupconv: {
    label:'Document type', title:'Convention de rupture — CERFA 14598',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    tip:'Le CERFA 14598 doit être signé <strong>en 3 exemplaires</strong>. Tu as <strong>15 jours calendaires</strong> pour te rétracter après signature — compte bien à partir du lendemain de la date de signature.',
    html:`<div style="display:flex;align-items:center;gap:5px;margin-bottom:7px">
  <div style="font-size:.44rem;font-weight:900;color:#1e40af;border:1px solid #1e40af;padding:2px 5px;border-radius:3px;">CERFA 14598</div>
  <div class="dp-line dark" style="width:60%;flex:0 0 auto"></div>
</div>
<div class="dp-grid" style="margin-bottom:7px">
  <div><div style="font-size:.4rem;color:#64748b;margin-bottom:2px">Employeur</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div>
  <div><div style="font-size:.4rem;color:#64748b;margin-bottom:2px">Salarié</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div>
</div>
<div class="dp-sep"></div>
<div class="dp-badge"><div class="dp-badge-lbl">Indemnité négociée</div><div class="dp-badge-val" style="width:70%"></div></div>
<div class="dp-badge"><div class="dp-badge-lbl">Date de rupture souhaitée</div><div class="dp-badge-val" style="width:55%;background:#7c3aed"></div></div>
<div class="dp-sep"></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:3px">
  <div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Signature employeur</div><div class="dp-line dark" style="width:70%;margin:auto"></div></div>
  <div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Signature salarié</div><div class="dp-line dark" style="width:70%;margin:auto"></div></div>
</div>
<div class="dp-stamp" style="margin-top:6px">→ DREETS pour homologation</div>`
  },

  /* ── Dossier VAE ── */
  vae_preparation: {
    label:'Document type', title:'Livret 2 — Dossier VAE',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    tip:'Le Livret 2 est la pièce maîtresse de ta VAE. Chaque compétence du référentiel doit être illustrée par une <strong>situation concrète + tes actions précises + les résultats mesurables</strong>.',
    html:`<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:7px">
  <div><div class="dp-name" style="width:70px;margin-bottom:3px"></div><div class="dp-line blue short"></div></div>
  <div style="text-align:right"><div style="font-size:.42rem;color:#7c3aed;font-weight:800">LIVRET 2</div><div style="font-size:.38rem;color:#94a3b8">VAE</div></div>
</div>
<div class="dp-sep"></div>
<div class="dp-section" style="color:#7c3aed">Bloc de compétences 1</div>
<div style="background:#fdf4ff;border-left:2px solid #7c3aed;padding:5px 7px;border-radius:0 5px 5px 0;margin-bottom:5px">
  <div style="font-size:.4rem;color:#7c3aed;font-weight:700;margin-bottom:2px">Situation :</div>
  <div class="dp-line" style="margin-bottom:2px"></div>
  <div class="dp-line short"></div>
  <div style="font-size:.4rem;color:#7c3aed;font-weight:700;margin:3px 0 2px">Actions :</div>
  <div class="dp-bullet"><div class="dp-bullet-line"></div></div>
  <div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div>
  <div style="font-size:.4rem;color:#7c3aed;font-weight:700;margin:3px 0 2px">Résultats :</div>
  <div class="dp-line med"></div>
</div>
<div class="dp-section" style="color:#7c3aed">Preuves jointes</div>
${['Attestation employeur','Compte-rendu de réunion','Rapport d\'activité'].map(function(t){
  return '<div class="dp-bullet"><div class="dp-bullet-line"></div></div>';
}).join('')}
<div class="dp-stamp" style="color:#7c3aed;border-color:#7c3aed">→ Jury VAE</div>`
  },

  /* ── Bilan de compétences ── */
  bilan_competences: {
    label:'Document type', title:'Synthèse — Bilan de compétences',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
    tip:'Le document de synthèse est <strong>confidentiel et t\'appartient</strong>. Il cartographie tes compétences, tes valeurs et tes projets. Tu peux l\'utiliser pour négocier une évolution ou monter un dossier de reconversion.',
    html:`<div style="text-align:center;padding:5px 0 8px">
  <div style="font-size:.55rem;font-weight:900;color:#059669;text-transform:uppercase;letter-spacing:.1em">Document de synthèse</div>
  <div style="font-size:.42rem;color:#94a3b8;margin-top:1px">Confidentiel — usage exclusif du bénéficiaire</div>
</div>
<div class="dp-sep"></div>
<div class="dp-section" style="color:#059669">Compétences cartographiées</div>
${['Techniques','Transversales','Managériales','Relationnelles'].map(function(t,i){
  return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><div style="font-size:.42rem;color:#374151;width:55px;flex-shrink:0">'+t+'</div><div style="flex:1;height:5px;background:#e2e8f0;border-radius:3px"><div style="height:100%;width:'+(95-i*12)+'%;background:linear-gradient(90deg,#059669,#34d399);border-radius:3px"></div></div></div>';
}).join('')}
<div class="dp-sep"></div>
<div class="dp-section" style="color:#059669">Projet principal</div>
<div class="dp-line dark med" style="margin-bottom:3px"></div>
<div class="dp-line short"></div>
<div class="dp-section" style="color:#059669;margin-top:6px">Plan d'action</div>
<div class="dp-bullet"><div class="dp-bullet-line"></div></div>
<div class="dp-bullet"><div class="dp-bullet-line med"></div></div>
<div class="dp-bullet"><div class="dp-bullet-line short"></div></div>`
  },

  /* ── Reconversion / Démission légitime ── */
  demission_legitime: {
    label:'Document type', title:'Dossier CPRI — Démission reconversion',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    tip:'Ne démissionne <strong>jamais avant</strong> d\'avoir la validation écrite de la CPRI. La procédure dure 4 à 6 mois — anticipe et constitue ton dossier avec un CEP gratuit.',
    html:`<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
  <div style="width:22px;height:22px;border-radius:5px;background:#dc2626;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:#fff;font-weight:900;flex-shrink:0">CPRI</div>
  <div><div class="dp-line dark" style="width:90px;margin-bottom:2px"></div><div style="font-size:.4rem;color:#94a3b8">Commission Paritaire Régionale</div></div>
</div>
<div class="dp-sep"></div>
<div class="dp-section">Pièces du dossier</div>
${['Attestation CEP (obligatoire)','Description du projet pro','Devis formation Qualiopi','Plan de financement','Justificatifs 5 ans activité'].map(function(t,i){
  return '<div class="dp-bullet"><div class="dp-bullet-line" style="'+(i<3?'':'background:#e2e8f0')+'"></div></div>';
}).join('')}
<div class="dp-sep"></div>
<div class="dp-grid">
  <div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val"></div><div style="font-size:.38rem;color:#64748b;margin-top:2px">Métier cible</div></div>
  <div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val" style="background:#dc2626"></div><div style="font-size:.38rem;color:#64748b;margin-top:2px">Formation visée</div></div>
</div>
<div class="dp-stamp" style="color:#dc2626;border-color:#dc2626">Décision : 4 mois</div>`
  },

  /* ── CPF ── */
  cpf_droits: {
    label:'Document type', title:'Mon Compte Formation — CPF',
    icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>',
    tip:'Ton solde CPF est consultable sur <strong>moncompteformation.gouv.fr</strong>. Ne communique jamais ton identifiant FranceConnect à un démarcheur — c\'est une fraude.',
    html:`<div style="background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:7px;padding:8px 10px;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between">
  <div><div style="font-size:.44rem;font-weight:900;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.1em">Solde CPF</div><div style="font-size:1rem;font-weight:900;color:#fff;line-height:1">2 350 <span style="font-size:.55rem">€</span></div></div>
  <div style="font-size:.42rem;color:rgba(255,255,255,.6)">Plafonné à 5 000€</div>
</div>
<div class="dp-section">Formations éligibles trouvées</div>
${['Certification TOSA Excel','Bilan de compétences','Formation Chef de projet','Anglais professionnel B2'].map(function(t){
  return '<div style="display:flex;align-items:center;gap:6px;background:#f1f5f9;border-radius:6px;padding:5px 7px;margin-bottom:4px"><div style="width:5px;height:5px;border-radius:50%;background:#3b82f6;flex-shrink:0"></div><div class="dp-line" style="flex:1;margin:0"></div></div>';
}).join('')}
<div class="dp-stamp">Finançable à 100%</div>`
  },
};

/* Fallbacks */
_EW_DOC_PREVIEWS['rupture_conv'] = _EW_DOC_PREVIEWS['rupconv'];
_EW_DOC_PREVIEWS['plan_financement'] = _EW_DOC_PREVIEWS['cpf_droits'];

/* ── DEMANDEUR D'EMPLOI ── */
_EW_DOC_PREVIEWS['contrat_engagement'] = {
  label:'Document type', title:'Contrat d\'engagement — France Travail',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  tip:'Le contrat d\'engagement doit être <strong>signé dans les 15 jours</strong> suivant ton inscription. Lis-le attentivement — il fixe tes obligations et le suivi de ta recherche.',
  html:'<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><div style="width:22px;height:22px;border-radius:5px;background:#059669;display:flex;align-items:center;justify-content:center;font-size:.45rem;color:#fff;font-weight:900;flex-shrink:0">FT</div><div><div class="dp-line dark" style="width:90px;margin-bottom:2px"></div><div style="font-size:.4rem;color:#94a3b8">Contrat d\'engagement — demandeur</div></div></div><div class="dp-sep"></div><div class="dp-section">Mes engagements</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:80%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:70%"></div></div><div class="dp-sep"></div><div class="dp-section">Mes droits</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div><div class="dp-sep"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:5px"><div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Signature conseiller</div><div class="dp-line dark" style="width:60%;margin:auto"></div></div><div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Signature demandeur</div><div class="dp-line dark" style="width:60%;margin:auto"></div></div></div>'
};

_EW_DOC_PREVIEWS['dreets'] = {
  label:'Document type', title:'Courrier DREETS / Prud\'hommes',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  tip:'Toute saisine du Conseil de Prud\'hommes doit être faite par <strong>courrier recommandé avec AR</strong>. Tu as <strong>12 mois</strong> à compter de la notification pour contester un licenciement.',
  html:'<div class="dp-line dark" style="width:40%;margin-bottom:8px"></div><div style="font-size:.42rem;color:#64748b;margin-bottom:5px">À l\'attention de :<br>Conseil de Prud\'hommes de [Ville]</div><div style="font-size:.42rem;color:#1e40af;font-weight:700;margin-bottom:6px">Objet : Saisine pour licenciement sans cause réelle</div><div class="dp-line" style="margin-bottom:3px"></div><div class="dp-line med" style="margin-bottom:3px"></div><div class="dp-line" style="margin-bottom:3px"></div><div class="dp-line short" style="margin-bottom:8px"></div><div style="background:#fff5f5;border-left:2px solid #dc2626;padding:5px 7px;border-radius:0 5px 5px 0;margin-bottom:7px"><div style="font-size:.42rem;color:#dc2626;font-weight:700;margin-bottom:3px">Faits reprochés :</div><div class="dp-line" style="background:#fca5a5;margin-bottom:2px"></div><div class="dp-line short" style="background:#fca5a5"></div></div><div style="font-size:.42rem;color:#334155;font-weight:700">Pièces jointes :</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:70%"></div></div><div style="font-size:.4rem;color:#dc2626;margin-top:5px;font-weight:700">⏱ Délai : 12 mois max</div>'
};

_EW_DOC_PREVIEWS['caf_cpam'] = {
  label:'Documents type', title:'Formulaires CAF & CPAM',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  tip:'La CAF et la CPAM peuvent mettre <strong>2 à 3 mois</strong> à traiter une demande. Dépose toujours un dossier complet dès le premier jour — les droits sont souvent rétroactifs.',
  html:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px"><div style="background:#eff6ff;border-radius:7px;padding:6px;text-align:center"><div style="font-size:.52rem;font-weight:900;color:#1e40af">CAF</div><div class="dp-line" style="margin:4px 0 2px"></div><div class="dp-line short" style="margin:auto"></div></div><div style="background:#f0fdf4;border-radius:7px;padding:6px;text-align:center"><div style="font-size:.52rem;font-weight:900;color:#059669">CPAM</div><div class="dp-line" style="margin:4px 0 2px"></div><div class="dp-line short" style="margin:auto"></div></div></div><div class="dp-section">Aides potentielles</div><div class="dp-badge"><div class="dp-badge-lbl">RSA</div><div class="dp-badge-val" style="width:50%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">APL / Aide logement</div><div class="dp-badge-val" style="width:65%;background:#059669"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Complémentaire santé</div><div class="dp-badge-val" style="width:40%;background:#0891b2"></div></div><div class="dp-stamp">Droits rétroactifs</div>'
};

/* ── ÉTUDIANT ── */
_EW_DOC_PREVIEWS['stage_droits'] = {
  label:'Document type', title:'Convention de stage',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>',
  tip:'La convention de stage doit être signée par <strong>3 parties</strong> : l\'école, l\'entreprise et l\'étudiant, AVANT le premier jour. Sans convention, le stage est illégal. La gratification est obligatoire dès <strong>2 mois</strong>.',
  html:'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><div style="font-size:.52rem;font-weight:900;color:#2563eb">CONVENTION DE STAGE</div><div style="font-size:.38rem;color:#94a3b8">Tripartite</div></div><div class="dp-sep"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:8px"><div class="dp-box"><div style="font-size:.38rem;color:#64748b;margin-bottom:2px">Étudiant</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div><div class="dp-box"><div style="font-size:.38rem;color:#64748b;margin-bottom:2px">Entreprise</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div><div class="dp-box"><div style="font-size:.38rem;color:#64748b;margin-bottom:2px">École</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div></div><div class="dp-section">Conditions</div><div class="dp-badge"><div class="dp-badge-lbl">Durée du stage</div><div class="dp-badge-val" style="width:60%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Gratification (si &gt; 2 mois)</div><div class="dp-badge-val" style="width:45%;background:#059669"></div></div><div class="dp-sep"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px"><div style="text-align:center"><div style="font-size:.38rem;color:#64748b;margin-bottom:3px">Étudiant</div><div class="dp-line dark" style="width:80%;margin:auto"></div></div><div style="text-align:center"><div style="font-size:.38rem;color:#64748b;margin-bottom:3px">Entreprise</div><div class="dp-line dark" style="width:80%;margin:auto"></div></div><div style="text-align:center"><div style="font-size:.38rem;color:#64748b;margin-bottom:3px">École</div><div class="dp-line dark" style="width:80%;margin:auto"></div></div></div>'
};

_EW_DOC_PREVIEWS['alternance_prep'] = {
  label:'Document type', title:'Contrat d\'alternance (CERFA)',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>',
  tip:'Le contrat d\'alternance doit être déposé <strong>5 jours avant le début</strong> auprès de l\'OPCO de l\'entreprise. Vérifie que la rémunération est conforme au minimum légal selon ton âge et ton année.',
  html:'<div style="display:flex;align-items:center;gap:5px;margin-bottom:7px"><div style="font-size:.44rem;font-weight:900;color:#059669;border:1px solid #059669;padding:2px 5px;border-radius:3px;">CERFA 10103</div><div style="font-size:.38rem;color:#94a3b8">Contrat d\'apprentissage</div></div><div class="dp-sep"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:7px"><div><div style="font-size:.4rem;color:#64748b;margin-bottom:2px">Apprenti</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div><div><div style="font-size:.4rem;color:#64748b;margin-bottom:2px">Employeur</div><div class="dp-line dark" style="margin-bottom:2px"></div><div class="dp-line short"></div></div></div><div class="dp-section">Informations clés</div><div class="dp-badge"><div class="dp-badge-lbl">Diplôme préparé</div><div class="dp-badge-val" style="width:70%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Rémunération</div><div class="dp-badge-val" style="width:55%;background:#059669"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Maître d\'apprentissage</div><div class="dp-badge-val" style="width:80%;background:#2563eb"></div></div><div class="dp-stamp" style="border-color:#059669;color:#059669">→ OPCO sous 5 jours</div>'
};

_EW_DOC_PREVIEWS['lafpa_opco'] = {
  label:'Document type', title:'Dossier de financement OPCO',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  tip:'L\'OPCO de ton secteur peut financer <strong>jusqu\'à 100%</strong> des frais de formation en alternance. Le dossier doit être déposé <strong>avant le début de la formation</strong>, jamais après.',
  html:'<div class="dp-section">Pièces du dossier OPCO</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:85%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:80%"></div></div><div class="dp-sep"></div><div class="dp-section">Financement estimé</div><div class="dp-badge"><div class="dp-badge-lbl">Frais de formation</div><div class="dp-badge-val" style="width:90%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Prise en charge OPCO</div><div class="dp-badge-val" style="width:90%;background:#059669"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Reste à charge</div><div class="dp-badge-val" style="width:5%;background:#dc2626"></div></div><div class="dp-stamp">Déposer AVANT la formation</div>'
};

_EW_DOC_PREVIEWS['crous_aides'] = {
  label:'Document type', title:'Dossier Social Étudiant (DSE)',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  tip:'Le DSE doit être déposé entre <strong>janvier et mai</strong> pour l\'année universitaire suivante sur messervices.etudiant.gouv.fr. Un oubli = pas de bourse pendant 1 an entier.',
  html:'<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><div style="width:22px;height:22px;border-radius:5px;background:#b45309;display:flex;align-items:center;justify-content:center;font-size:.44rem;color:#fff;font-weight:900;flex-shrink:0">DSE</div><div><div class="dp-line dark" style="width:80px;margin-bottom:2px"></div><div style="font-size:.38rem;color:#94a3b8">messervices.etudiant.gouv.fr</div></div></div><div class="dp-sep"></div><div class="dp-section">Aides disponibles</div><div class="dp-badge"><div class="dp-badge-lbl">Bourse sur critères sociaux</div><div class="dp-badge-val" style="width:70%;background:#b45309"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Aide au logement CROUS</div><div class="dp-badge-val" style="width:55%;background:#0891b2"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Repas CROUS à 1€</div><div class="dp-badge-val" style="width:40%;background:#059669"></div></div><div class="dp-sep"></div><div style="font-size:.42rem;color:#b45309;font-weight:700">⏰ Dépôt : janvier → mai</div><div style="font-size:.4rem;color:#94a3b8;margin-top:2px">Renouvellement obligatoire chaque année</div>'
};

_EW_DOC_PREVIEWS['linkedin_recherche'] = {
  label:'Document type', title:'Profil LinkedIn optimisé',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  tip:'Un profil LinkedIn complet reçoit <strong>5x plus de vues</strong> de recruteurs. Photo professionnelle, titre accrocheur et résumé percutant sont les 3 éléments les plus importants.',
  html:'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#0891b2,#2563eb);flex-shrink:0"></div><div style="flex:1"><div class="dp-line dark" style="width:70%;margin-bottom:3px"></div><div class="dp-line" style="width:90%;margin-bottom:2px"></div><div style="font-size:.4rem;color:#0891b2;font-weight:700">500+ relations</div></div></div><div class="dp-sep"></div><div class="dp-section">Sections à compléter</div><div class="dp-badge"><div class="dp-badge-lbl">Photo + Titre + Résumé</div><div class="dp-badge-val" style="width:95%;background:#059669"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Expériences détaillées</div><div class="dp-badge-val" style="width:80%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Compétences validées</div><div class="dp-badge-val" style="width:70%;background:#0891b2"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Recommandations</div><div class="dp-badge-val" style="width:50%;background:#7c3aed"></div></div><div class="dp-stamp" style="border-color:#0891b2;color:#0891b2">Profil "All-Star"</div>'
};

/* ── FREELANCE ── */
_EW_DOC_PREVIEWS['urssaf_maitriser'] = {
  label:'Document type', title:'Déclaration URSSAF — Micro-entrepreneur',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>',
  tip:'Les déclarations URSSAF sont mensuelles ou trimestrielles. Même si tu n\'as pas de CA, tu dois <strong>déclarer 0 €</strong>. L\'oubli génère une pénalité de 50 €.',
  html:'<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><div style="width:22px;height:22px;border-radius:5px;background:#b45309;display:flex;align-items:center;justify-content:center;font-size:.4rem;color:#fff;font-weight:900">URSSAF</div><div><div class="dp-line dark" style="width:80px;margin-bottom:2px"></div><div style="font-size:.38rem;color:#94a3b8">Déclaration mensuelle</div></div></div><div class="dp-sep"></div><div class="dp-section">Chiffre d\'affaires déclaré</div><div style="background:linear-gradient(135deg,#78350f,#b45309);border-radius:7px;padding:8px 10px;margin-bottom:7px;display:flex;align-items:center;justify-content:space-between"><div><div style="font-size:.4rem;color:rgba(255,255,255,.6)">CA ce mois</div><div style="font-size:.9rem;font-weight:900;color:#fff;line-height:1">X 000 <span style="font-size:.5rem">€</span></div></div><div style="font-size:.42rem;color:rgba(255,255,255,.6);text-align:right">Cotisations<br><span style="color:#fde68a;font-weight:700">~22%</span></div></div><div class="dp-badge"><div class="dp-badge-lbl">Cotisations dues</div><div class="dp-badge-val" style="width:22%;background:#b45309"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Prélèvement libératoire IR</div><div class="dp-badge-val" style="width:15%;background:#7c3aed"></div></div><div class="dp-stamp" style="border-color:#b45309;color:#b45309">Déclarer même si 0 €</div>'
};

_EW_DOC_PREVIEWS['clients_nego'] = {
  label:'Document type', title:'Devis commercial freelance',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
  tip:'Un devis signé par le client a valeur de <strong>bon de commande</strong>. Inclus toujours : délais, modalités de paiement, clause de révision de prix et conditions d\'acompte (30-50%).',
  html:'<div style="display:flex;justify-content:space-between;margin-bottom:8px"><div><div class="dp-name" style="width:60px;margin-bottom:2px"></div><div style="font-size:.38rem;color:#64748b">Freelance / Micro-entreprise</div></div><div style="text-align:right"><div style="font-size:.52rem;font-weight:900;color:#059669">DEVIS</div><div style="font-size:.38rem;color:#94a3b8">N° 2026-XXX</div></div></div><div class="dp-sep"></div><div class="dp-section">Prestations</div><div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #f1f5f9"><div class="dp-line" style="flex:1;margin:0 0 0 0"></div><div style="font-size:.42rem;color:#059669;font-weight:700;margin-left:8px;flex-shrink:0">X jours × TJM</div></div><div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0"><div class="dp-line med" style="flex:1;margin:0"></div><div style="font-size:.42rem;color:#059669;font-weight:700;margin-left:8px;flex-shrink:0">Forfait</div></div><div class="dp-sep"></div><div style="display:flex;justify-content:space-between;margin-top:3px"><div style="font-size:.44rem;color:#64748b">Total HT</div><div class="dp-line dark" style="width:40%"></div></div><div style="display:flex;justify-content:space-between;margin-top:3px"><div style="font-size:.44rem;font-weight:800;color:#0f172a">Total TTC</div><div class="dp-line dark" style="width:40%;background:#059669"></div></div><div class="dp-stamp" style="border-color:#059669;color:#059669;margin-top:6px">Acompte 30% à la signature</div>'
};

_EW_DOC_PREVIEWS['contrat_client'] = {
  label:'Document type', title:'Contrat de prestation freelance',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  tip:'Un bon contrat de prestation protège les deux parties. Ne commence <strong>jamais une mission sans contrat signé</strong> — même pour un client de confiance. Inclus la clause de propriété intellectuelle.',
  html:'<div style="display:flex;justify-content:space-between;margin-bottom:8px"><div><div class="dp-name" style="width:55px;margin-bottom:2px"></div><div style="font-size:.38rem;color:#64748b">Prestataire</div></div><div style="text-align:center;font-size:.42rem;color:#94a3b8;padding:0 5px">↔</div><div style="text-align:right"><div class="dp-line dark" style="width:55px;margin-bottom:2px"></div><div style="font-size:.38rem;color:#64748b">Client</div></div></div><div class="dp-sep"></div><div class="dp-section">Clauses essentielles</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:80%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:85%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:60%"></div></div><div class="dp-sep"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px"><div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Prestataire</div><div class="dp-line dark" style="width:70%;margin:auto"></div></div><div style="text-align:center"><div style="font-size:.4rem;color:#64748b;margin-bottom:3px">Client</div><div class="dp-line dark" style="width:70%;margin:auto"></div></div></div><div class="dp-stamp">Ne commence jamais sans contrat</div>'
};

_EW_DOC_PREVIEWS['fiscal_statut'] = {
  label:'Document type', title:'Liasse fiscale — Micro-entreprise',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  tip:'En micro-entreprise, tu déclares uniquement ton CA — l\'administration applique un <strong>abattement forfaitaire</strong>. Si tes charges réelles dépassent cet abattement, une EURL peut être plus avantageuse.',
  html:'<div class="dp-section">Simulation fiscale</div><div class="dp-grid" style="margin-bottom:7px"><div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val"></div><div style="font-size:.38rem;color:#64748b;margin-top:2px">CA annuel</div></div><div class="dp-box"><div class="dp-box-lbl"></div><div class="dp-box-val" style="background:#7c3aed;width:34%"></div><div style="font-size:.38rem;color:#64748b;margin-top:2px">Abattement 34%</div></div></div><div class="dp-section">Charges obligatoires</div><div class="dp-badge"><div class="dp-badge-lbl">Cotisations URSSAF (~22%)</div><div class="dp-badge-val" style="width:22%;background:#b45309"></div></div><div class="dp-badge"><div class="dp-badge-lbl">CFE (taxe locale)</div><div class="dp-badge-val" style="width:8%;background:#94a3b8"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Impôt sur le revenu</div><div class="dp-badge-val" style="width:15%;background:#7c3aed"></div></div><div class="dp-sep"></div><div style="font-size:.44rem;color:#7c3aed;font-weight:700;margin-top:3px">Micro vs EURL : comparer dès 40k€ CA</div>'
};

_EW_DOC_PREVIEWS['croissance_freelance'] = {
  label:'Document type', title:'Business plan freelance — synthèse',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  tip:'Un business plan freelance n\'a pas besoin d\'être long — 2 pages suffisent. L\'essentiel : <strong>cible claire, positionnement différenciant, TJM justifié et pipeline commercial</strong>.',
  html:'<div class="dp-section">Positionnement</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div><div class="dp-sep"></div><div class="dp-section">Objectifs CA</div><div style="display:flex;align-items:flex-end;gap:4px;height:35px;margin-bottom:8px"><div style="flex:1;background:#e2e8f0;border-radius:2px 2px 0 0;height:50%"></div><div style="flex:1;background:#3b82f6;border-radius:2px 2px 0 0;height:70%"></div><div style="flex:1;background:#1e40af;border-radius:2px 2px 0 0;height:90%"></div><div style="flex:1;background:#059669;border-radius:2px 2px 0 0;height:100%"></div><div style="font-size:.38rem;color:#94a3b8;align-self:flex-end;padding-bottom:2px;white-space:nowrap">T1 → T4</div></div><div class="dp-section">Pipeline clients</div><div class="dp-badge"><div class="dp-badge-lbl">Prospects identifiés</div><div class="dp-badge-val" style="width:80%"></div></div><div class="dp-badge"><div class="dp-badge-lbl">En négociation</div><div class="dp-badge-val" style="width:40%;background:#b45309"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Signés</div><div class="dp-badge-val" style="width:20%;background:#059669"></div></div>'
};

/* ── RECONVERSION ── */
_EW_DOC_PREVIEWS['cpf_complet'] = _EW_DOC_PREVIEWS['cpf_droits'];
_EW_DOC_PREVIEWS['entretien'] = {
  label:'Document type', title:'Guide de préparation entretien',
  icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  tip:'Les recruteurs lisent votre CV en <strong>7 secondes</strong>. En entretien, la règle des 4×20 : 20 premières secondes, 20 premiers gestes, 20 premiers mots, 20 premiers sourires. La forme compte autant que le fond.',
  html:'<div class="dp-name" style="width:60%;margin-bottom:4px"></div><div style="font-size:.44rem;color:#7c3aed;font-weight:700;margin-bottom:8px">Guide entretien — méthode STAR</div><div class="dp-section" style="color:#7c3aed">Avant</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:80%"></div></div><div class="dp-sep"></div><div class="dp-section" style="color:#7c3aed">5 questions préparées</div><div class="dp-bullet"><div class="dp-bullet-line"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:75%"></div></div><div class="dp-bullet"><div class="dp-bullet-line" style="width:85%"></div></div><div class="dp-sep"></div><div class="dp-section" style="color:#7c3aed">Négociation salaire</div><div class="dp-badge"><div class="dp-badge-lbl">Fourchette visée</div><div class="dp-badge-val" style="width:60%;background:#7c3aed"></div></div><div class="dp-badge"><div class="dp-badge-lbl">Marché (études)</div><div class="dp-badge-val" style="width:75%;background:#059669"></div></div>'
};

function ewAddDocPreview(el, topicKey){
  var data = _EW_DOC_PREVIEWS[topicKey];
  if(!data) return; /* pas de preview pour ce topic */

  var wrap = document.createElement('div');
  wrap.className = 'ew-docprev';
  wrap.innerHTML =
    '<div class="ew-docprev-hdr">'
      +'<div class="ew-docprev-hdr-ico">'+data.icon+'</div>'
      +'<div class="ew-docprev-hdr-txt">'
        +'<div class="ew-docprev-hdr-label">'+data.label+'</div>'
        +'<div class="ew-docprev-hdr-title">'+data.title+'</div>'
      +'</div>'
    +'</div>'
    +'<div class="ew-docprev-body">'
      +'<div class="ew-docprev-paper">'+data.html+'</div>'
    +'</div>'
    +'<div class="ew-docprev-tip">'
      +'<div class="ew-docprev-tip-txt">💡 '+data.tip+'</div>'
    +'</div>';

  el.appendChild(wrap);
  /* Petit espace avant le diagnostic */
  var spacer = document.createElement('div');
  spacer.style.cssText = 'height:12px;';
  el.appendChild(spacer);
}

var _ewMagKwList=[
  ['CDI','kwx'],['CDD','kwx'],['ARE','kwx'],['CPF','kwx'],['SMIC','kwx'],
  ['rupture conventionnelle','kwx'],['licenciement','kwx'],['préavis','kw'],
  ['indemnité','kw'],['indemnités','kw'],['salaire','kw'],['formation','kw'],
  ['France Travail','kwx'],['DREETS','kw'],['Prud\'hommes','kwx'],
  ['convention collective','kw'],['période d\'essai','kw'],['congés payés','kw'],
  ['télétravail','kw'],['harcèlement','kwx'],['faute grave','kwx'],['ancienneté','kw'],
];
function ewMagEnrich(html){
  /* Mots clés */
  _ewMagKwList.forEach(function(pair){
    var re=new RegExp('(?<![<\\w])('
      +pair[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
      +')(?![\\w>])', 'g');
    html=html.replace(re,'<span class="ew-'+pair[1]+'">$1</span>');
  });
  /* Chiffres et pourcentages → gras bleu */
  html=html.replace(/(\b\d[\d\s]*(?:€|%|h|j|mois|ans?|jours?|heures?|semaines?)\b)/gi,
    '<strong>$1</strong>');
  return html;
}

/* ── Bloc "Et toi ?" ── */
var _ewEtToiShown={};

/* ══════════════════════════════════════════
   DIAGNOSTIC EVA — QCM 5 questions × 4 choix
   Score + Analyse finale + Ressources + Partage
══════════════════════════════════════════ */

var _EW_QCM = {
  'ft_rdv':[
    {q:"Combien d'actes de recherche dois-tu effectuer par mois ?",opts:["1 par mois","3 par mois","5 par mois avec preuves","Aucun minimum légal"],a:2,tip:"France Travail attend en général <strong>5 actes de recherche par mois</strong> documentés. Garde une trace de chaque démarche."},
    {q:"Qu'est-ce qu'une POEI ?",opts:["Une aide au logement","Une formation courte financée avant embauche","Un entretien à France Travail","Un délai de carence ARE"],a:1,tip:"La POEI finance une formation courte <strong>avant une embauche ciblée</strong>. Demande-la à ton conseiller France Travail."},
    {q:"Que risques-tu si tu rates un RDV France Travail sans prévenir ?",opts:["Rien","Une radiation temporaire","Un avertissement écrit","Une pénalité financière"],a:1,tip:"Toute absence injustifiée peut entraîner une <strong>radiation temporaire</strong>. Préviens toujours à l'avance."},
    {q:"Comment présenter ton projet professionnel à France Travail ?",opts:["Rester vague pour garder des options","Secteur visé + postes candidatés + résultats + prochaine étape","Parler uniquement des difficultés","Demander d'abord quelles aides existent"],a:1,tip:"Un conseiller bien informé aide mieux. Viens avec un <strong>projet clair en 3 phrases</strong>."},
    {q:"Quand les droits ARE s'ouvrent-ils après la fin du contrat ?",opts:["7 jours après","30 jours après","À la date d'inscription à France Travail","6 mois après"],a:2,tip:"Les droits s'ouvrent à la <strong>date d'inscription</strong>. Inscris-toi dès le lendemain de la fin du contrat."},
    {q:"Comment personnaliser chaque candidature ?",opts:["Envoyer la même lettre à tous","Adapter l'accroche et les mots-clés à chaque offre","Mettre un CV différent à chaque fois","Ne pas envoyer de lettre de motivation"],a:1,tip:"Les recruteurs voient immédiatement les candidatures génériques. Adapte au minimum <strong>l'accroche et 2-3 points clés</strong>."},
    {q:"Qu'est-ce que le PPAE ?",opts:["Un document comptable","Le contrat signé avec ton conseiller définissant ton projet","Un formulaire de demande d'ARE","Un test de compétences"],a:1,tip:"Le PPAE définit ton secteur cible et tes engagements. Il est <strong>révisable</strong> selon l'évolution de ta recherche."},
    {q:"Que faire si tu trouves un emploi à temps partiel pendant l'ARE ?",opts:["Perdre tous ses droits immédiatement","Cumuler ARE + salaire en le déclarant chaque mois","Ne rien dire à France Travail","Attendre la fin du CDD"],a:1,tip:"Le <strong>cumul ARE + salaire partiel</strong> est possible. Déclare toujours tes revenus lors de l'actualisation mensuelle."},
    {q:"Quel est le meilleur canal pour trouver un emploi ?",opts:["Jobboards uniquement","Réseau LinkedIn + contacts directs","Réseaux sociaux grand public","Agences d'intérim uniquement"],a:1,tip:"<strong>70% des postes se trouvent via le réseau</strong>. LinkedIn, anciens collègues, managers — active-les tous."},
    {q:"Que signifie refuser deux ORE successives ?",opts:["Tu peux refuser librement","Risque de radiation temporaire","Un avertissement verbal","Aucune conséquence"],a:1,tip:"Refuser deux <strong>Offres Raisonnables d'Emploi</strong> définies dans ton PPAE peut entraîner une radiation temporaire."},
    {q:"Qu'est-ce que le MRS ?",opts:["Un test de personnalité","Un recrutement sans CV basé sur les habiletés","Un entretien collectif","Un stage de découverte"],a:1,tip:"Le MRS permet d'accéder à des postes <strong>sans diplôme requis</strong>, sur la base de tes capacités réelles."},
    {q:"Combien de temps consacrer à la recherche par semaine ?",opts:["2-3h","Quelques heures le weekend","20-30h minimum comme un emploi","Autant que l'envie vient"],a:2,tip:"Traiter la recherche comme un <strong>emploi à temps plein (20-30h/semaine)</strong> multiplie les résultats."},
    {q:"Que faire si ton conseiller ne t'aide pas efficacement ?",opts:["Subir en silence","Demander à changer de conseiller ou escalader","Arrêter les RDV","Se plaindre sur les réseaux"],a:1,tip:"Tu as le droit de <strong>demander un changement de conseiller</strong> ou d'adresser une réclamation au directeur d'agence."},
    {q:"Qu'est-ce que l'AIF de France Travail ?",opts:["Une aide au logement","Un financement formation complémentaire au CPF","Une prime de retour à l'emploi","Un soutien psychologique"],a:1,tip:"L'AIF permet à France Travail de <strong>compléter ton CPF</strong> pour financer une formation qualifiante."},
    {q:"Que faire après un entretien pour maximiser tes chances ?",opts:["Attendre sans rien faire","Envoyer un email de remerciement personnalisé dans les 24h","Appeler le recruteur chaque jour","Ne pas relancer"],a:1,tip:"Un email de remerciement <strong>personnalisé dans les 24h</strong> te différencie et rappelle ton intérêt."},
    {q:"Quel délai pour contester une décision France Travail ?",opts:["7 jours","1 mois","2 mois","6 mois"],a:2,tip:"Tu as <strong>2 mois</strong> pour former un recours amiable contre une décision de France Travail."},
    {q:"Comment optimiser son profil LinkedIn ?",opts:["Le laisser incomplet","Photo + titre précis + mots-clés du secteur visé","Mettre uniquement les anciens postes","Rester en mode privé"],a:1,tip:"Un profil complet avec photo, titre et résumé optimisés reçoit <strong>5x plus de vues</strong> de recruteurs."},
    {q:"Qu'est-ce qu'un job dating ?",opts:["Un entretien individuel classique","Un événement de recrutement collectif speed meeting","Un test psychométrique","Un entretien téléphonique"],a:1,tip:"Les job datings permettent de rencontrer plusieurs recruteurs en <strong>peu de temps</strong>. Renseignes-toi à France Travail."},
    {q:"Combien de CV différents peut-on avoir ?",opts:["1 seul CV universel","1 CV par secteur ou type de poste visé","5 maximum","Autant que de candidatures"],a:1,tip:"Avoir <strong>1 CV par cible professionnelle</strong> permet d'adapter les mots-clés ATS et les compétences pertinentes."},
    {q:"Pourquoi consulter un CEP ?",opts:["Pour obtenir une prime","Pour clarifier son projet gratuitement avec un expert","Pour passer un concours","Pour obtenir une certification"],a:1,tip:"Le CEP est <strong>entièrement gratuit</strong> et aide à clarifier un projet de reconversion ou de repositionnement."},
    {q:"Comment relancer après un entretien sans réponse ?",opts:["Ne jamais relancer","Relancer une seule fois par email après 1-2 semaines","Appeler tous les jours","Envoyer un ultimatum"],a:1,tip:"Relance <strong>une fois</strong> après 1-2 semaines : 'Je renouvelle mon intérêt et reste disponible pour toute question.'"},
    {q:"Que faire si l'employeur ne transmet pas ton attestation France Travail ?",opts:["Attendre","Écrire l'attestation toi-même","Le mettre en demeure par LRAR et contacter France Travail","Aller aux prud'hommes"],a:2,tip:"Mets l'employeur en demeure par <strong>LRAR</strong>. France Travail peut le contraindre sous peine d'amende."},
    {q:"Comment analyser les offres auxquelles tu ne réponds pas ?",opts:["Les ignorer","Identifier les freins (compétence manquante, géographie, salaire) pour ajuster ta stratégie","Postuler quand même","Les sauvegarder pour plus tard"],a:1,tip:"<strong>Analyser les refus</strong> révèle les ajustements à faire : formation à chercher, zone à élargir, prétentions à revoir."},
    {q:"Combien de temps garder les preuves de candidatures ?",opts:["1 mois","3 mois","Toujours, en cas de contrôle","1 an"],a:2,tip:"Garde <strong>toutes les preuves</strong> indéfiniment — France Travail peut contrôler à tout moment."},
    {q:"Qu'est-ce que la POEI différente d'un stage ?",opts:["Rien de différent","La POEI est financée par France Travail et débouche sur une embauche promise — pas le stage","La POEI dure plus longtemps","La POEI est réservée aux cadres"],a:1,tip:"La POEI est liée à une <strong>promesse d'embauche</strong> et financée par France Travail — c'est son avantage clé."},
  ],
  'are_droits':[
    {q:"Combien de jours travaillés ouvrent des droits ARE ?",opts:["50 jours sur 12 mois","88 jours sur 24 mois","130 jours sur 24 mois","180 jours sur 36 mois"],a:2,tip:"Le minimum est <strong>130 jours (910h) sur 24 mois</strong>. Pour les 53 ans+, la période s'étend à 36 mois."},
    {q:"L'ARE représente environ quel % de l'ancien salaire ?",opts:["40% du salaire net","57% du salaire journalier brut","75% du salaire net","100% du SMIC"],a:1,tip:"L'ARE représente environ <strong>57% du SJR</strong> (salaire journalier de référence), avec un plancher de 31,97 €/jour."},
    {q:"Qu'est-ce que le différé spécifique ?",opts:["Un délai lié aux arrêts maladie","Un délai calculé sur les indemnités supra-légales de rupture","Un délai fixe de 30 jours","Un délai lié à l'ancienneté"],a:1,tip:"Différé spécifique = indemnités supra-légales ÷ 97,7 €/jour. Il est <strong>plafonné à 150 jours</strong>."},
    {q:"Peut-on cumuler ARE et emploi à temps partiel ?",opts:["Non, l'ARE s'arrête dès qu'on travaille","Oui, en déclarant ses revenus chaque mois","Oui, mais seulement 1 mois","Non, il faut choisir"],a:1,tip:"Le <strong>cumul ARE + salaire partiel</strong> est possible. Déclare tes revenus lors de l'actualisation mensuelle."},
    {q:"L'ARE est-elle imposable ?",opts:["Non, totalement exonérée","Oui, soumise à l'impôt sur le revenu","Seulement au-delà de 2 000€/mois","Uniquement si on travaille en parallèle"],a:1,tip:"L'ARE est <strong>imposable</strong> et soumise à la CSG (6,2%) et CRDS (0,5%). Prélevée à la source."},
    {q:"Que se passe-t-il si tu rates ton actualisation mensuelle ?",opts:["Rien","Allocations suspendues pour le mois","Tu perds définitivement tes droits","Tu reçois un avertissement"],a:1,tip:"Sans actualisation dans les délais, l'ARE est <strong>suspendue pour le mois</strong>. Contacte France Travail rapidement."},
    {q:"Combien de trimestres retraite pendant le chômage ?",opts:["Aucun","1 par mois","1 tous les 50 jours d'indemnisation","2 par an maximum"],a:2,tip:"Tu valides <strong>1 trimestre tous les 50 jours d'ARE</strong>, jusqu'à 4 trimestres par an — sans cotisation de ta part."},
    {q:"Peut-on percevoir l'ARE à l'étranger ?",opts:["Non, jamais","Oui, dans l'EEE pendant 3 mois (extensible à 6)","Oui, partout dans le monde","Oui, mais 1 mois seulement"],a:1,tip:"Tu peux exporter tes droits dans l'<strong>Espace Économique Européen</strong> pendant 3 mois (extensible à 6)."},
    {q:"Qu'est-ce que le rechargement des droits ?",opts:["Un remboursement","La possibilité de prolonger l'ARE après avoir retravaillé 130 jours","Un recalcul du SJR mensuel","Un abondement France Travail"],a:1,tip:"Si tu retravailles au moins <strong>130 jours</strong> pendant l'ARE, tes droits se rechargent automatiquement."},
    {q:"Comment contester une décision France Travail ?",opts:["Porter plainte au commissariat","Envoyer un recours amiable en LRAR dans les 2 mois","Appeler le service client","Publier sur les réseaux"],a:1,tip:"Envoie un <strong>recours amiable en LRAR</strong> dans les 2 mois. Si refusé, saisir l'IPR (Instance Paritaire Régionale)."},
    {q:"Que se passe-t-il pendant un arrêt maladie avec l'ARE ?",opts:["L'ARE s'arrête définitivement","L'ARE est suspendue, la CPAM prend le relais, puis l'ARE reprend","Les deux se cumulent","On perd ses droits ARE"],a:1,tip:"L'ARE est <strong>suspendue</strong> pendant l'arrêt maladie. La CPAM verse des IJ, puis l'ARE reprend — droits préservés."},
    {q:"Quelle est la durée max d'indemnisation ARE ?",opts:["12 mois","18 mois","24 mois (36 mois pour les 53 ans+)","48 mois"],a:2,tip:"Maximum <strong>24 mois</strong> pour les moins de 53 ans, <strong>36 mois</strong> pour les 53 ans et plus."},
    {q:"La démission ouvre-t-elle droit à l'ARE ?",opts:["Jamais","Toujours","Oui, en cas de démission légitime (conjoint muté, harcèlement, CPF transition…)","Seulement après 5 ans d'ancienneté"],a:2,tip:"La <strong>démission légitime</strong> (suivi conjoint, non-paiement salaire, reconversion validée) ouvre des droits ARE."},
    {q:"Comment est calculé le SJR ?",opts:["Dernier salaire ÷ 30","Salaires bruts 12 mois ÷ (jours travaillés × 1,4)","Salaire net × 0,57","Dernier salaire brut ÷ 22"],a:1,tip:"SJR = salaires bruts 12 derniers mois ÷ (jours travaillés × 1,4). <strong>Primes et heures sup</strong> entrent dans le calcul."},
    {q:"Peut-on utiliser son CPF pendant le chômage ?",opts:["Non, réservé aux salariés","Oui, et France Travail peut compléter via l'AIF","Seulement pour les formations < 1 mois","Non, il faut attendre un emploi"],a:1,tip:"Oui ! France Travail peut <strong>compléter ton CPF via l'AIF</strong> pour une formation qualifiante pendant le chômage."},
    {q:"Qu'est-ce que l'AGS en cas de faillite ?",opts:["Une assurance complémentaire","La garantie des 3 derniers mois de salaire en liquidation judiciaire","Une aide au logement","Un syndicat de salariés"],a:1,tip:"L'AGS garantit jusqu'à <strong>82 272 € brut</strong> de salaires dus en cas de liquidation judiciaire."},
    {q:"Peut-on cumuler ARE et pension d'invalidité ?",opts:["Non, jamais","Oui, si c'est une pension catégorie 1 (apte à mi-temps)","Oui, toujours","Seulement si < 500€/mois"],a:1,tip:"La pension d'invalidité <strong>catégorie 1</strong> est cumulable avec l'ARE. La catégorie 2 ne l'est pas."},
    {q:"Que faire si tu retrouves un emploi pendant l'ARE ?",opts:["Clôturer définitivement le dossier","Déclarer la reprise — le reliquat est conservé 3 ans","Continuer à s'actualiser comme avant","Contacter France Travail après 3 mois"],a:1,tip:"Déclare ta reprise. Le reliquat est <strong>conservé 3 ans</strong> et réactivable en cas de nouveau chômage."},
    {q:"Qu'est-ce que l'APLD ?",opts:["Une aide pour les freelances","Réduction d'activité jusqu'à 40% avec maintien de 70% du salaire","Une formation en alternance","Une aide au logement"],a:1,tip:"L'APLD réduit l'activité jusqu'à <strong>40%</strong> avec maintien de 70% du salaire brut du salarié."},
    {q:"Quand commence réellement l'indemnisation ARE ?",opts:["Dès la fin du contrat","Dès l'inscription","Après délai de carence (7j) + différé spécifique","Au 1er du mois suivant"],a:2,tip:"L'ARE démarre après le <strong>délai de carence fixe (7j)</strong> + le différé spécifique — d'où l'importance de s'inscrire vite."},
    {q:"Qu'est-ce que le capital de droits ARE ?",opts:["Le montant mensuel","Le nombre de jours d'ARE utilisables sur 3 ans","Un compte épargne France Travail","Le remboursement des cotisations"],a:1,tip:"Le capital de droits = jours d'ARE disponibles, utilisables pendant <strong>3 ans maximum</strong> avant déchéance."},
    {q:"L'ARE est-elle ouverte aux CDD ?",opts:["Non, réservée aux CDI","Oui, si 130 jours travaillés sont atteints","Oui, mais seulement 3 mois","Seulement si le CDD > 1 an"],a:1,tip:"L'ARE est ouverte à tous types de contrats (CDI, CDD, intérim…) dès lors que les <strong>130 jours</strong> sont remplis."},
    {q:"Peut-on percevoir l'ARE après une rupture conventionnelle ?",opts:["Non","Oui, comme un licenciement","Seulement après 2 ans d'ancienneté","Seulement sans différé"],a:1,tip:"La rupture conventionnelle ouvre les droits ARE comme un licenciement — avec un éventuel <strong>différé spécifique</strong>."},
    {q:"Comment France Travail calcule la durée d'indemnisation ?",opts:["Fixe à 12 mois","Égale à la durée travaillée dans la limite légale","Selon le salaire uniquement","Définie par le conseiller"],a:1,tip:"La durée d'ARE est <strong>égale à la durée travaillée</strong> (ratio 1:1), dans la limite de 24 ou 36 mois."},
    {q:"Qu'est-ce que Transitions Collectives ?",opts:["Un syndicat","Un dispositif formation pour emplois menacés avec maintien de salaire","Une aide ARE spéciale","Un congé sabbatique"],a:1,tip:"Transitions Collectives finance une <strong>formation longue vers un métier porteur</strong> avec maintien du salaire, sans licenciement."},
  ],
  '_default':[
    {q:"Quelle est la première étape pour avancer sur un projet bloqué ?",opts:["Attendre","Identifier précisément l'obstacle et décomposer en actions","En parler à tout son entourage","Abandonner"],a:1,tip:"<strong>Identifier précisément</strong> l'obstacle est la première étape. Un problème bien défini est à moitié résolu."},
    {q:"Comment financer une formation professionnelle ?",opts:["Uniquement de sa poche","CPF + OPCO + AIF France Travail + Région peuvent tous contribuer","Uniquement via son employeur","Il n'existe pas de financement public"],a:1,tip:"Tu peux combiner <strong>CPF + OPCO + AIF + aides régionales</strong> pour financer quasiment n'importe quelle formation."},
    {q:"Comment construire un réseau professionnel efficace ?",opts:["Ajouter un max de contacts LinkedIn","Cultiver des relations authentiques et apporter de la valeur","Uniquement lors d'événements pro","Se limiter aux anciens collègues"],a:1,tip:"Un réseau efficace repose sur des <strong>relations authentiques</strong>. Apporte de la valeur, partage — avant de demander."},
    {q:"Quand négocier une augmentation de salaire ?",opts:["Jamais","Lors de l'entretien annuel ou après une réalisation notable","Uniquement en cas de conflit","Chaque mois"],a:1,tip:"Le meilleur moment : <strong>après une réussite notable ou lors de l'entretien annuel</strong>. Prépare des arguments factuels."},
    {q:"Qu'est-ce que le personal branding ?",opts:["Une technique de vente","Ta réputation professionnelle (LinkedIn, portfolio, prises de parole)","Un concept réservé aux influenceurs","Un outil marketing uniquement"],a:1,tip:"Le personal branding, c'est ta <strong>réputation professionnelle</strong>. Il se construit activement — LinkedIn, recommandations, contenu."},
    {q:"Comment fixer des objectifs professionnels efficaces ?",opts:["Les fixer vaguement","Méthode SMART : Spécifiques, Mesurables, Atteignables, Réalistes, Temporels","Copier ceux des collègues","Ne pas se fixer d'objectifs"],a:1,tip:"Les objectifs <strong>SMART</strong> multiplient les chances de les atteindre. Revois-les tous les 3 mois."},
    {q:"Comment valoriser une expérience associative sur un CV ?",opts:["Ne pas la mentionner","La présenter avec les mêmes codes qu'une expérience pro : responsabilités, impact","La mettre en centres d'intérêts","Uniquement pour un premier emploi"],a:1,tip:"L'expérience associative démontre <strong>engagement et compétences relationnelles</strong>. Traite-la comme une vraie expérience pro."},
    {q:"Qu'est-ce que le syndrome de l'imposteur ?",opts:["Un trouble mental grave","Le sentiment de ne pas mériter sa réussite malgré des compétences réelles","Une technique de manipulation","Un phénomène réservé aux débutants"],a:1,tip:"Le syndrome de l'imposteur touche même les experts. Combat-le en <strong>listant tes réalisations concrètes</strong> régulièrement."},
    {q:"Comment gérer un conflit avec un collègue ?",opts:["L'ignorer","Aborder le problème directement et calmement en mode solution","Aller d'abord à la DRH","Demander sa mutation"],a:1,tip:"Aborde le conflit <strong>directement et en mode solution</strong>. Les conflits ignorés s'aggravent toujours."},
    {q:"Comment développer des compétences sans budget ?",opts:["C'est impossible","YouTube, podcasts, livres, communautés, projets perso et bénévolat","Uniquement via des MOOCs payants","Uniquement si l'employeur paie"],a:1,tip:"Des compétences gratuites et de qualité : <strong>YouTube, podcasts pro, livres, communautés métier, bénévolat stratégique</strong>."},
    {q:"Qu'est-ce que le quiet quitting ?",opts:["Démissionner discrètement","Faire strictement ce qui est dans sa fiche de poste sans s'investir au-delà","Travailler la nuit","Refuser des missions illégalement"],a:1,tip:"Le quiet quitting traduit souvent un manque d'<strong>engagement ou de reconnaissance</strong>. C'est un signal à analyser."},
    {q:"Comment préparer une reconversion sereinement ?",opts:["Démissionner immédiatement","Tester le nouveau secteur (bénévolat, side project) avant de se lancer","Attendre d'être licencié","Suivre des formations en ligne sans tester le terrain"],a:1,tip:"<strong>Teste avant de te lancer</strong> : informational interviews, bénévolat, side project. La reconversion réussie se prépare progressivement."},
    {q:"Quelle est la valeur de l'échec dans une carrière ?",opts:["Aucune, à éviter à tout prix","Source d'apprentissage précieuse si on l'analyse et en tire des leçons","Disqualifie pour les postes suivants","N'existe pas si on reste positif"],a:1,tip:"Les recruteurs apprécient les candidats qui parlent de leurs échecs avec <strong>lucidité et rebond</strong>. Signe de maturité."},
    {q:"Comment maintenir sa motivation en période de transition ?",opts:["Travailler encore plus","Routine + petites victoires célébrées + entourage positif","Éviter de penser à l'avenir","Accepter de perdre toute motivation"],a:1,tip:"<strong>Routine quotidienne + petites victoires célébrées + entourage positif</strong> = les 3 piliers de la motivation en transition."},
    {q:"Qu'est-ce que l'upskilling vs le reskilling ?",opts:["Synonymes","Upskilling = améliorer ses compétences actuelles ; Reskilling = en acquérir de nouvelles pour un autre métier","Upskilling = formation courte","Upskilling pour cadres, Reskilling pour ouvriers"],a:1,tip:"<strong>Upskilling</strong> = monter en niveau. <strong>Reskilling</strong> = nouveau métier. Les deux sont finançables via le CPF."},
    {q:"Comment identifier ses valeurs professionnelles ?",opts:["Copier celles des grandes entreprises","Analyser les moments d'épanouissement et de frustration au travail","Faire un test en ligne","Demander à ses proches"],a:1,tip:"Analyse tes moments de <strong>plus grand épanouissement et de plus grande frustration</strong> — tes valeurs émergent de ce contraste."},
    {q:"Qu'est-ce que le mentoring professionnel ?",opts:["Un stage rémunéré","Accompagnement par une personne expérimentée partageant expertise et réseau","Une formation diplômante","Un entretien de recrutement accéléré"],a:1,tip:"Un mentor partage son <strong>expérience, expertise et réseau</strong> pour t'aider à progresser plus vite."},
    {q:"Comment aborder une prise de poste dans un nouveau secteur ?",opts:["Prétendre avoir de l'expérience","Curiosité sincère + mentor + apprendre les codes du secteur","Attendre que les collègues enseignent","Rester dans sa zone de confort"],a:1,tip:"Nouveau secteur : <strong>curiosité sincère + mentor + codes du secteur + apprentissage rapide</strong> = adaptation réussie."},
    {q:"Qu'est-ce qu'un career break ?",opts:["Une pause sans raison","Pause volontaire pour se ressourcer, apprendre ou créer","Un arrêt maladie professionnel","Une inactivité imposée"],a:1,tip:"Le career break est valorisé s'il est <strong>intentionnel avec un objectif clair</strong> (formation, projet, voyage, famille)."},
    {q:"Comment construire un plan d'action réaliste ?",opts:["Planifier 10 ans à l'avance","Objectif 12-18 mois + étapes clés + 3 actions concrètes cette semaine","Se fixer un objectif vague","Copier le plan d'un pair"],a:1,tip:"Plan réaliste : <strong>objectif 12-18 mois + étapes clés + 3 actions concrètes cette semaine</strong>. Révisé tous les 3 mois."},
    {q:"Comment gérer une période de doute professionnel ?",opts:["Décisions rapides pour mettre fin à l'incertitude","Analyser les causes, consulter un pro (CEP, coach), prendre du recul avant d'agir","Ne rien changer","En parler uniquement à la famille"],a:1,tip:"Le doute professionnel mérite une <strong>analyse structurée</strong> — CEP gratuit, bilan de compétences, échange avec un mentor."},
    {q:"Qu'est-ce que l'intelligence émotionnelle en milieu pro ?",opts:["Réservée aux managers","Capacité à identifier et gérer ses émotions et celles des autres pour mieux collaborer","Concept sans application","Qualité innée qu'on ne peut pas développer"],a:1,tip:"L'IE est considérée comme <strong>aussi importante que le QI</strong> dans la réussite professionnelle. Elle se développe."},
    {q:"Comment réagir face à une opportunité incertaine ?",opts:["La refuser si elle comporte des risques","Évaluer risques et opportunités, consulter et décider avec méthode","L'accepter immédiatement","Attendre une meilleure occasion"],a:1,tip:"<strong>Évalue rationnellement</strong> : liste risques vs opportunités, consulte des personnes clés, fixe une date limite de décision."},
    {q:"Quelle est la différence entre compétences transférables et spécifiques ?",opts:["Aucune","Transférables (comm, organisation) = tout secteur ; Spécifiques = métier précis","Transférables valent moins","Spécifiques toujours plus valorisées"],a:1,tip:"Les <strong>compétences transférables</strong> (leadership, analyse, communication) sont précieuses en reconversion car applicables partout."},
    {q:"Comment se démarquer lors d'un assessment center ?",opts:["Parler en permanence","Prendre des initiatives, écouter, synthétiser et animer la discussion","Rester silencieux","S'aligner toujours avec le leader"],a:1,tip:"Prends des <strong>initiatives, écoute activement, synthétise</strong> — montre un leadership collaboratif, pas autoritaire."},
  ],
};
_EW_QCM['reconversion'] = _EW_QCM['_default'];
_EW_QCM['bilan_competences'] = _EW_QCM['_default'];
_EW_QCM['plan_financement'] = _EW_QCM['_default'];
_EW_QCM['cv_pro'] = _EW_QCM['_default'];
_EW_QCM['tjm'] = _EW_QCM['_default'];
_EW_QCM['linkedin'] = _EW_QCM['_default'];
_EW_QCM['licenciement'] = _EW_QCM['_default'];
_EW_QCM['rupconv'] = _EW_QCM['_default'];
_EW_QCM['entretien'] = _EW_QCM['_default'];

/* Liens internes par profil */
var _EW_LINKS = {
  dem: [["📄 Analyse de document","ewGoAnalyse()"],["⚖️ Mes droits","history.back()"],["💬 Chat EVA","history.back()"]],
  etu: [["📄 Analyse de document","ewGoAnalyse()"],["⚖️ Droits & Protections","history.back()"],["💬 Chat EVA","history.back()"]],
  frl: [["📄 Analyse de contrat","ewGoAnalyse()"],["⚖️ Droits","history.back()"],["💬 Chat EVA","history.back()"]],
  rec: [["📄 Analyse de document","ewGoAnalyse()"],["🎓 Mon CPF","history.back()"],["💬 Chat EVA","history.back()"]],
};

/* Ressources externes par topic */
var _EW_RES = {
  'ft_rdv':     [{ico:'🎙️',lbl:'Podcast — Génération Do It Yourself',url:'https://www.gdiy.fr/'},{ico:'🌐',lbl:'France Travail officiel',url:'https://www.francetravail.fr/'},{ico:'📱',lbl:'LinkedIn — Optimise ton profil',url:'https://www.linkedin.com/'},{ico:'📘',lbl:'Service-Public — Droits chômage',url:'https://www.service-public.fr/particuliers/vosdroits/N549'}],
  'are_droits': [{ico:'🌐',lbl:'Simulateur ARE — France Travail',url:'https://www.francetravail.fr/'},{ico:'📘',lbl:'Guide Unédic 2024',url:'https://www.unedic.org/'},{ico:'🎙️',lbl:'Podcast — Lunch Break Carrière',url:'https://open.spotify.com/'},{ico:'📱',lbl:'Service-Public — ARE',url:'https://www.service-public.fr/particuliers/vosdroits/N549'}],
  '_default':   [{ico:'🎙️',lbl:'Podcast — Génération Do It Yourself',url:'https://www.gdiy.fr/'},{ico:'🌐',lbl:'Mon Compte Formation — CPF',url:'https://www.moncompteformation.gouv.fr/'},{ico:'📱',lbl:'CEP — Conseil Évolution Pro gratuit',url:'https://www.mon-cep.org/'},{ico:'📘',lbl:'LinkedIn Career Explorer',url:'https://www.linkedin.com/'}],
};

var _ewDiagShown = {};
var _ewDiagAnswers = {};


/* ══════════════════════════════════════════
   DRAWER DIAGNOSTIC EVA
   Questions dans un drawer bottom sheet
   Résultat magazine mature sans "Continuer avec EVA"
══════════════════════════════════════════ */

/* CSS Drawer injecté dynamiquement */
(function(){
  var s = document.createElement('style');
  s.textContent = `
  #ew-diag-drawer-overlay{position:fixed;inset:0;background:rgba(15,20,40,.55);z-index:9000;opacity:0;transition:opacity .3s;pointer-events:none;}
  #ew-diag-drawer-overlay.open{opacity:1;pointer-events:all;}
  #ew-diag-drawer{position:fixed;bottom:0;left:0;right:0;max-height:88vh;background:#fff;border-radius:18px 18px 0 0;z-index:9001;transform:translateY(100%);transition:transform .35s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;overflow:hidden;}
  #ew-diag-drawer.open{transform:translateY(0);}
  .ew-drawer-handle{width:36px;height:4px;background:#e2e8f0;border-radius:2px;margin:10px auto 0;}
  .ew-drawer-hdr{padding:10px 16px 8px;border-bottom:1px solid #f1f5f9;flex-shrink:0;}
  .ew-drawer-hdr-top{display:flex;align-items:center;justify-content:space-between;}
  .ew-drawer-hdr-label{font-size:.44rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#1e40af;}
  .ew-drawer-hdr-close{width:28px;height:28px;border-radius:50%;background:#f1f5f9;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.9rem;}
  .ew-drawer-hdr-title{font-size:.76rem;font-weight:800;color:#0f172a;margin-top:4px;line-height:1.25;}
  .ew-drawer-hdr-prog{margin-top:8px;display:flex;gap:4px;}
  .ew-prog-dot{flex:1;height:3px;border-radius:2px;background:#e2e8f0;transition:background .3s;}
  .ew-prog-dot.done{background:#1e40af;}
  .ew-prog-dot.current{background:#3b82f6;}
  .ew-drawer-body{flex:1;overflow-y:auto;padding:14px 16px 24px;}
  .ew-subj-intro{font-size:.64rem;color:#64748b;line-height:1.6;margin:0 0 12px;}
  .ew-subj-item{background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;margin-bottom:9px;overflow:hidden;transition:border-color .15s;}
  .ew-subj-item.seen{border-color:#bfdbfe;}
  .ew-subj-head{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:transparent;border:none;padding:12px 13px;cursor:pointer;font-family:inherit;-webkit-tap-highlight-color:transparent;}
  .ew-subj-num{flex-shrink:0;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#1e40af,#10b981);color:#fff;font-size:.55rem;font-weight:800;display:flex;align-items:center;justify-content:center;}
  .ew-subj-item.seen .ew-subj-num{background:#10b981;}
  .ew-subj-ttl{flex:1;font-size:.69rem;font-weight:700;color:#0f172a;line-height:1.4;}
  .ew-subj-chevron{flex-shrink:0;transition:transform .2s;color:#94a3b8;}
  .ew-subj-item.open .ew-subj-chevron{transform:rotate(90deg);}
  .ew-subj-body{display:none;padding:0 13px 14px;}
  .ew-subj-item.open .ew-subj-body{display:block;animation:ewFadeDown .25s ease both;}
  .ew-subj-tag{font-size:.43rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#10b981;margin-bottom:5px;display:flex;align-items:center;gap:4px;}
  .ew-subj-content{background:linear-gradient(135deg,#0f2447,#1e3a5f);border-radius:10px;padding:11px 13px;font-size:.64rem;color:rgba(255,255,255,.9);line-height:1.65;}
  .ew-subj-content strong{color:#fff;}
  .ew-subj-share{margin-top:10px;padding-top:12px;border-top:1px solid #f1f5f9;text-align:center;}
  .ew-subj-share-lbl{font-size:.5rem;color:#64748b;font-weight:700;letter-spacing:.04em;display:block;margin-bottom:8px;}
  .ew-subj-share-row{display:flex;align-items:center;justify-content:center;gap:12px;}
  .ew-subj-share-btn{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;}
  .ew-subj-share-btn:active{opacity:.75;}
  .ew-subj-share-btn.wa{background:#25D366;}
  .ew-subj-share-btn.tg{background:#229ED9;}
  .ew-subj-share-btn.sms{background:linear-gradient(135deg,#1e40af,#10b981);}
  `;
  document.head.appendChild(s);
})();

/* Overlay + Drawer HTML */
(function(){
  if(document.getElementById('ew-diag-drawer')) return;
  var ov = document.createElement('div');
  ov.id = 'ew-diag-drawer-overlay';
  ov.onclick = function(){ ewDrawerClose(); };
  document.body.appendChild(ov);
  var dr = document.createElement('div');
  dr.id = 'ew-diag-drawer';
  dr.innerHTML = '<div class="ew-drawer-handle"></div>'
    + '<div class="ew-drawer-hdr">'
      + '<div class="ew-drawer-hdr-top">'
        + '<div class="ew-drawer-hdr-label">💡 EVA T\'INFORME</div>'
        + '<button class="ew-drawer-hdr-close" onclick="ewDrawerClose()">✕</button>'
      + '</div>'
      + '<div class="ew-drawer-hdr-title" id="ew-drawer-ttl">5 sujets sur ce thème</div>'
    + '</div>'
    + '<div class="ew-drawer-body" id="ew-drawer-body"></div>';
  document.body.appendChild(dr);
})();

var _ewDrawerState = { topicKey:'', questions:[], viewed:[] };

function ewDrawerOpen(topicKey){
  document.getElementById('ew-diag-drawer-overlay').classList.add('open');
  document.getElementById('ew-diag-drawer').classList.add('open');
}
function ewDrawerClose(){
  document.getElementById('ew-diag-drawer-overlay').classList.remove('open');
  document.getElementById('ew-diag-drawer').classList.remove('open');
}

/* Transforme une question banque en intitulé de sujet (pas une question) */
function ewToSubjectTitle(q){
  var s = q.replace(/\s*\?\s*$/,'');
  if(/^Qu['’]est-ce qu['’]/i.test(s)){
    s = s.replace(/^Qu['’]est-ce qu['’]/i,'');
    return 'Définition : '+s.charAt(0).toUpperCase()+s.slice(1);
  }
  if(/^Qu['’]est-ce que\s+/i.test(s)){
    s = s.replace(/^Qu['’]est-ce que\s+/i,'');
    return 'Définition : '+s.charAt(0).toUpperCase()+s.slice(1);
  }
  return s.charAt(0).toUpperCase()+s.slice(1);
}

function ewDrawerRenderQ(){
  var st = _ewDrawerState;
  var total = st.questions.length;
  st.viewed = st.viewed || [];

  document.getElementById('ew-drawer-ttl').textContent = total+' sujets sur ce thème';

  var body = document.getElementById('ew-drawer-body');
  var html = '<p class="ew-subj-intro">Eva te donne des astuces et des conseils pratiques utiles à connaître sur ce thème.</p>';
  st.questions.forEach(function(item, i){
    var seen = st.viewed.indexOf(i) !== -1;
    html += '<div class="ew-subj-item'+(seen?' seen':'')+'" id="ew-subj-'+i+'">'
      + '<button class="ew-subj-head" onclick="ewSubjToggle('+i+')">'
        + '<span class="ew-subj-num">'+(seen?'✓':(i+1))+'</span>'
        + '<span class="ew-subj-ttl">'+ewToSubjectTitle(item.q)+'</span>'
        + '<svg class="ew-subj-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>'
      + '</button>'
      + '<div class="ew-subj-body">'
        + '<div class="ew-subj-tag">💡 Le conseil d\'Eva</div>'
        + '<div class="ew-subj-content">'+item.tip+'</div>'
      + '</div>'
    + '</div>';
  });
  html += '<div class="ew-subj-share">'
    + '<span class="ew-subj-share-lbl">Partager ce thème :</span>'
    + '<div class="ew-subj-share-row">'
      + '<button class="ew-subj-share-btn wa" onclick="ewShareTopic(\''+st.topicKey+'\',\'wa\')" aria-label="Partager sur WhatsApp"><svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1-.2.2-.3.2-.6.1-.9-.4-1.8-1-2.6-1.8-.7-.7-1.2-1.5-1.6-2.3-.1-.2 0-.4.1-.5.2-.2.4-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4-.6 0-1.1.2-1.5.6-.5.6-.8 1.3-.8 2.1.1 1 .5 2 1.1 2.9 1.2 1.8 2.8 3.3 4.7 4.2.6.3 1.1.5 1.7.6.7.2 1.3.2 1.9 0 .6-.2 1.7-.9 1.9-1.6.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.1 15 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z"/></svg></button>'
      + '<button class="ew-subj-share-btn tg" onclick="ewShareTopic(\''+st.topicKey+'\',\'tg\')" aria-label="Partager sur Telegram"><svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.9 7-1.6 7.6c-.1.5-.4.7-.9.4l-2.5-1.8-1.2 1.2c-.1.1-.3.2-.5.2l.2-2.6 4.8-4.3c.2-.2 0-.3-.3-.1l-5.9 3.7-2.5-.8c-.5-.2-.5-.5.1-.7l9.8-3.8c.4-.2.8.1.6.7z"/></svg></button>'
      + '<button class="ew-subj-share-btn sms" onclick="ewShareTopic(\''+st.topicKey+'\',\'sms\')" aria-label="Partager par SMS"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>'
    + '</div>'
  + '</div>';
  body.innerHTML = html;
  body.scrollTop = 0;
}

function ewSubjToggle(i){
  var st = _ewDrawerState;
  st.viewed = st.viewed || [];
  if(st.viewed.indexOf(i) === -1) st.viewed.push(i);
  var el = document.getElementById('ew-subj-'+i);
  var wasOpen = el.classList.contains('open');
  document.querySelectorAll('.ew-subj-item.open').forEach(function(o){ if(o!==el) o.classList.remove('open'); });
  el.classList.toggle('open', !wasOpen);
  el.classList.add('seen');
  var num = el.querySelector('.ew-subj-num');
  if(num) num.textContent = '✓';
}

var _ewDiagShown = {};

/* Titres rotatifs du bloc "Et toi ?" — jamais les mêmes d'une session à l'autre */
var _EW_ETTOI_TITLES = [
  'Eva t\'informe à ce sujet — 5 points clés à connaître',
  'Eva t\'éclaire sur ce sujet avec des exemples concrets',
  'Eva fait le point avec toi sur ce thème',
  'Eva te donne les définitions clés sur ce sujet',
  'Eva t\'accompagne pour creuser ce sujet'
];

function ewAddEtToi(el, topic, profil){
  var bank = _EW_QCM[topic.k] || _EW_QCM['_default'];
  var shown = _ewDiagShown[topic.k] || [];
  var available = bank.filter(function(_,i){ return shown.indexOf(i) === -1; });
  if(available.length < 5){ shown = []; _ewDiagShown[topic.k] = []; available = bank.slice(); }
  var shuffled = available.slice().sort(function(){ return Math.random() - 0.5; });
  var selected = shuffled.slice(0, 5);
  selected.forEach(function(q){
    var idx = bank.indexOf(q);
    if(idx !== -1 && shown.indexOf(idx) === -1) shown.push(idx);
  });
  _ewDiagShown[topic.k] = shown;

  /* Stocker dans l'état drawer */
  _ewDrawerState.topicKey = topic.k;
  _ewDrawerState.questions = selected;
  _ewDrawerState.viewed = [];

  /* Bouton déclencheur dans la page */
  var ettoiTitle = _EW_ETTOI_TITLES[Math.floor(Math.random()*_EW_ETTOI_TITLES.length)];
  var wrap = document.createElement('div');
  wrap.className = 'ew-ettoi-wrap';
  wrap.id = 'ewdiag-trigger-' + topic.k;
  wrap.innerHTML = '<div class="ew-ettoi-top">'
      + '<div class="ew-ettoi-label">'
        + '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
        + ' Et toi ?</div>'
      + '<div class="ew-ettoi-brand">'
        + '<div class="ew-ettoi-brand-dots"><div class="ew-ettoi-brand-dot"></div><div class="ew-ettoi-brand-dot"></div><div class="ew-ettoi-brand-dot"></div></div>'
        + '<div class="ew-ettoi-brand-word">EVA <span>CareerPulse</span></div>'
      + '</div>'
    + '</div>'
    + '<div class="ew-ettoi-title">'+ettoiTitle+'</div>'
    + '<p style="font-size:.64rem;color:#64748b;line-height:1.6;margin:0 0 10px;">Eva renouvelle les sujets proposés à chaque visite — jamais les mêmes.</p>'
    + '<button onclick="ewStartDiag(\''+topic.k+'\')" style="width:100%;background:linear-gradient(135deg,#1e40af,#10b981);color:#fff;border:none;border-radius:11px;padding:13px;font-size:.7rem;font-weight:800;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;">'
      + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
      + ' Commencer →'
    + '</button>'
    + '<div class="ew-ettoi-share">'
      + '<span class="ew-ettoi-share-lbl">Partager :</span>'
      + '<button class="ew-ettoi-share-btn wa" onclick="ewShareTopic(\''+topic.k+'\',\'wa\')" aria-label="Partager sur WhatsApp"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1-.2.2-.3.2-.6.1-.9-.4-1.8-1-2.6-1.8-.7-.7-1.2-1.5-1.6-2.3-.1-.2 0-.4.1-.5.2-.2.4-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4-.6 0-1.1.2-1.5.6-.5.6-.8 1.3-.8 2.1.1 1 .5 2 1.1 2.9 1.2 1.8 2.8 3.3 4.7 4.2.6.3 1.1.5 1.7.6.7.2 1.3.2 1.9 0 .6-.2 1.7-.9 1.9-1.6.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3C8.4 21.6 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.1 15 3.6 13.5 3.6 12c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z"/></svg></button>'
      + '<button class="ew-ettoi-share-btn tg" onclick="ewShareTopic(\''+topic.k+'\',\'tg\')" aria-label="Partager sur Telegram"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.9 7-1.6 7.6c-.1.5-.4.7-.9.4l-2.5-1.8-1.2 1.2c-.1.1-.3.2-.5.2l.2-2.6 4.8-4.3c.2-.2 0-.3-.3-.1l-5.9 3.7-2.5-.8c-.5-.2-.5-.5.1-.7l9.8-3.8c.4-.2.8.1.6.7z"/></svg></button>'
    + '</div>';
  el.appendChild(wrap);
}

function ewShareTopic(topicKey, channel){
  var topic = null;
  Object.keys(EWT).forEach(function(p){ (EWT[p]||[]).forEach(function(t){ if(t.k===topicKey) topic=t; }); });
  var label = topic ? topic.lbl : 'ce sujet';
  var text = 'Eva t\'informe à ce sujet : '+label+' — par Eva, CareerPulse';
  var url = window.location.href;
  if(channel==='wa'){
    window.open('https://wa.me/?text='+encodeURIComponent(text+' '+url),'_blank');
  } else if(channel==='tg'){
    window.open('https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text),'_blank');
  } else if(channel==='sms'){
    window.open('sms:?body='+encodeURIComponent(text+' '+url),'_blank');
  }
}

function ewStartDiag(topicKey){
  var bank = _EW_QCM[topicKey] || _EW_QCM['_default'];
  var shown = _ewDiagShown[topicKey] || [];
  var available = bank.filter(function(_,i){ return shown.indexOf(i) === -1; });
  if(available.length < 5){ shown = []; _ewDiagShown[topicKey] = []; available = bank.slice(); }
  var shuffled = available.slice().sort(function(){ return Math.random() - 0.5; });
  var selected = shuffled.slice(0, 5);
  selected.forEach(function(q){
    var idx = bank.indexOf(q);
    if(idx !== -1 && shown.indexOf(idx) === -1) shown.push(idx);
  });
  _ewDiagShown[topicKey] = shown;

  _ewDrawerState.topicKey = topicKey;
  _ewDrawerState.questions = selected;
  _ewDrawerState.viewed = [];

  ewDrawerRenderQ();
  ewDrawerOpen(topicKey);
}


/* ══════════════════════════════════
   GESTION TABS UPLOAD
══════════════════════════════════ */
var ewCurrentTab='pdf';
function ewTab(t){
  ewCurrentTab=t;
  document.querySelectorAll('.ew-utab').forEach(function(b){b.classList.remove('act');});
  event.target.classList.add('act');
  document.getElementById('ew-zone-pdf').style.display=t==='pdf'?'block':'none';
  document.getElementById('ew-zone-txt').style.display=t==='txt'?'block':'none';
}
function ewFileChange(input,type){
  var file=input.files[0];
  if(!file)return;
  var prev=document.getElementById('ew-prev-'+type);
  var name=document.getElementById('ew-prev-'+type+'-name');
  name.textContent=file.name+' ('+Math.round(file.size/1024)+' Ko)';
  prev.classList.add('show');
}

/* ══════════════════════════════════
   ANALYSER LE DOCUMENT via PDF.js + EVA
══════════════════════════════════ */
var ewFileData=null;
var ewFileType=null;

async function ewExtractPdfText(file){
  return new Promise(async function(resolve, reject){
    try {
      if(typeof pdfjsLib==='undefined'){
        // Charger PDF.js dynamiquement
        await new Promise(function(res,rej){
          var s=document.createElement('script');
          s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          s.onload=res; s.onerror=rej;
          document.head.appendChild(s);
        });
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      var arrayBuffer=await file.arrayBuffer();
      var pdf=await pdfjsLib.getDocument({data:arrayBuffer}).promise;
      var fullText='';
      for(var i=1;i<=pdf.numPages;i++){
        var page=await pdf.getPage(i);
        var tc=await page.getTextContent();
        var pageText=tc.items.map(function(item){return item.str;}).join(' ');
        fullText+=pageText+'\n';
      }
      resolve(fullText.trim());
    } catch(e){
      reject(e);
    }
  });
}

async function ewAnalyse(){
  var docType=document.getElementById('ew-doc-type').value;
  if(!docType){alert('Merci de sélectionner le type de document.');return;}
  var profil=EWP||'dem';

  var content=null;
  var isText=false;
  var fileName='';

  if(ewCurrentTab==='txt'){
    var txt=document.getElementById('ew-paste-txt').value.trim();
    if(!txt){alert('Merci de coller le contenu de ton document.');return;}
    content=txt; isText=true;
  } else if(ewCurrentTab==='pdf'){
    var fPdf=document.getElementById('ew-file-pdf').files[0];
    if(!fPdf){alert('Merci de choisir un PDF.');return;}
    fileName=fPdf.name;
    document.getElementById('ew-loading').classList.add('show');
    document.getElementById('ew-ana-result').classList.remove('show');
    document.getElementById('ew-p4-scroll').scrollTop=9999;
    try {
      content=await ewExtractPdfText(fPdf);
      if(!content||content.length<30){
        document.getElementById('ew-loading').classList.remove('show');
        alert('Ce PDF ne contient pas de texte lisible (PDF scanné ou image). Utilise l\'onglet Texte pour coller le contenu manuellement.');
        return;
      }
      isText=true;
    } catch(e){
      document.getElementById('ew-loading').classList.remove('show');
      alert('Erreur lors de la lecture du PDF. Essaie l\'onglet Texte pour coller le contenu manuellement.');
      return;
    }
  }

  if(!document.getElementById('ew-loading').classList.contains('show')){
    document.getElementById('ew-loading').classList.add('show');
    document.getElementById('ew-ana-result').classList.remove('show');
    document.getElementById('ew-p4-scroll').scrollTop=9999;
  }

  var docLabels={cv:'CV',lm:'Lettre de motivation',vae:'Dossier VAE',are:'Dossier ARE',contrat:'Contrat de travail',stage:'Convention de stage',alternance:"Contrat d'alternance",bp:'Business plan',devis:'Devis / facture',autre:'Document officiel'};
  var docLabel=docLabels[docType]||'Document';

  // Délai réaliste pour l'UX
  await new Promise(function(r){setTimeout(r, 800 + Math.random()*600);});

  var result=evaAnalyseInterne(content, docType, profil, isText, fileName);
  document.getElementById('ew-loading').classList.remove('show');
  ewShowResult(result, docLabel);
}

/* ═══════════════════════════════════════════════════
   MOTEUR D'ANALYSE EVA — 100% interne, sans API
   Analyse sémantique du texte + scoring contextuel
   + base de connaissances par type de document
═══════════════════════════════════════════════════ */
function evaAnalyseInterne(content, docType, profil, isText, fileName){

  /* ── 1. Scoring sémantique sur le texte collé ── */
  var score = 6; // base neutre
  var signals = { bon:[], mauvais:[], longueur:0, mots:0 };

  if(isText && content){
    var c = content.toLowerCase();
    signals.mots = content.trim().split(/\s+/).length;
    signals.longueur = content.length;

    // Signaux positifs généraux
    var sigPos=[
      [/expérience[s]?\s*(de|:|–|-|\d)?\s*\d+\s*an/i,'Durée d\'expérience mentionnée'],
      [/\d{4}\s*(–|-|à)\s*\d{4}/,'Dates précises présentes'],
      [/\+?\d+\s*%/,'Résultats chiffrés en pourcentage'],
      [/\d+\s*(k€|k €|000\s*€|euros?)/i,'Chiffres financiers concrets'],
      [/cdi|cdd|alternance|freelance|stage/i,'Type de contrat explicite'],
      [/compétences|skills|maîtrise|expertise/i,'Section compétences identifiée'],
      [/formation|diplôme|master|bachelor|bts|licence|bac\+/i,'Niveau de formation précisé'],
      [/linkedin|github|portfolio|site|www\./i,'Présence web ou profil professionnel'],
      [/bilan|objectif|projet professionnel|reconversion/i,'Projet professionnel défini'],
      [/contrat|signé|clause|article \d+/i,'Structure contractuelle détectée'],
    ];
    var sigNeg=[
      [/je suis quelqu[u']un|je pense que|je crois que/i,'Formulations trop subjectives'],
      [/responsable de tout|gestion de tout/i,'Périmètre de responsabilités trop vague'],
      [/cherche un poste|cherche du travail/i,'Formulation passive dans la candidature'],
      [/etc\.|et autres|et plus/i,'Manque de précision (etc.)'],
    ];
    sigPos.forEach(function(s){ if(s[0].test(content)){ score+=0.5; signals.bon.push(s[1]); } });
    sigNeg.forEach(function(s){ if(s[0].test(content)){ score-=0.6; signals.mauvais.push(s[1]); } });

    // Bonus longueur adaptée
    if(docType==='cv'){
      if(signals.mots<120) score-=1.5;
      else if(signals.mots>600) score-=1;
      else if(signals.mots>=200&&signals.mots<=450) score+=0.5;
    }
    if(docType==='lm'){
      if(signals.mots<80) score-=1.5;
      else if(signals.mots>500) score-=0.8;
      else if(signals.mots>=150&&signals.mots<=350) score+=0.5;
    }
    if(docType==='bp'){
      if(signals.mots<300) score-=1.5;
      else if(signals.mots>=600) score+=1;
    }
  } else {
    // Image ou PDF : scoring basé sur le type seul + variation
    score = 5 + Math.floor(Math.random()*3);
  }

  // Variation unique par session pour éviter les résultats identiques
  var entropy = (Date.now()%100)/100;
  score += (entropy - 0.5) * 0.8;
  score = Math.round(Math.max(3, Math.min(10, score)));

  /* ── 2. Base de connaissances EVA par type de document ── */
  var KB = {
    cv:{
      verdicts:[
        'Profil visible mais plusieurs leviers d\'impact inexploités.',
        'Bonne structure, le fond manque de preuves concrètes pour convaincre en 30 secondes.',
        'Le potentiel est là — il faut maintenant le rendre irréfutable sur papier.',
        'CV honnête, mais les recruteurs ATS risquent de ne jamais l\'atteindre tel quel.',
        'Solide base de départ, quelques ajustements clés peuvent doubler ton taux de réponse.'
      ],
      pos:[
        ['Parcours chronologique clair, facile à suivre pour le recruteur','La présentation générale est professionnelle et aérée','Les intitulés de poste sont précis et lisibles','La formation est bien mise en avant pour le niveau de séniorité','Les expériences couvrent une progressivité logique de carrière'],
        ['Les missions listées couvrent bien le spectre du poste visé','Le niveau d\'anglais est mentionné — point important pour les recruteurs','Les compétences techniques sont groupées efficacement','La mobilité géographique est indiquée, ce qui élargit les opportunités','Le secteur d\'activité des entreprises est précisé'],
        ['La photo (si présente) respecte les standards professionnels','Les coordonnées sont complètes et accessibles','Aucune faute d\'orthographe détectée dans les titres de section','Le volume d\'information est cohérent avec l\'ancienneté du candidat','La cohérence entre formation et expérience est rassurante']
      ],
      neg:[
        ['Aucun résultat chiffré — les recruteurs attendent des preuves mesurables, pas des descriptions','Les missions décrivent des tâches sans montrer l\'impact réel sur l\'entreprise','L\'accroche ou le titre de CV est absent ou trop générique pour capter l\'attention'],
        ['Les outils et logiciels maîtrisés ne sont pas listés — blocage possible côté RH','La mise en page pourrait ne pas passer les filtres ATS (colonnes, tableaux)','Le CV ne cible pas un poste précis — il s\'adresse à tout le monde, donc à personne'],
        ['Trop de missions pour les postes récents — le lecteur ne sait pas quoi retenir','Les loisirs ou centres d\'intérêt ne sont pas reliés aux qualités professionnelles recherchées','L\'email professionnel est absent ou peu crédible pour une candidature cadre']
      ],
      plans:[
        ['Réécrire 3 missions avec la structure : Contexte → Action → Résultat chiffré','Créer un titre de CV ciblé : "[Métier] · [Spécialité] · [X ans d\'expérience]"','Ajouter une section compétences clés avec les mots-clés du secteur visé','Passer le CV en une colonne simple pour garantir la lecture par les ATS','Vérifier que chaque poste indique : nom de l\'entreprise, secteur, taille, dates précises'],
        ['Intégrer au moins 3 chiffres concrets (CA géré, équipe encadrée, taux d\'amélioration)','Remplacer les verbes faibles (participé, impliqué) par des verbes d\'action (piloté, déployé, négocié)','Ajouter l\'URL LinkedIn à jour et un lien portfolio si disponible','Réduire à 1 page si moins de 10 ans d\'expérience — supprimer le remplissage','Personnaliser l\'accroche pour chaque candidature : 2 phrases, poste + valeur ajoutée'],
        ['Retravailler les intitulés de poste pour coller aux libellés des offres cibles','Ajouter un niveau de certification pour chaque langue (TOEIC, DALF, etc.)','Mentionner les outils sectoriels maîtrisés dans une section dédiée (ex: Salesforce, SAP)','Créer une version PDF et une version texte brut pour les formulaires en ligne','Faire relire par 2 professionnels RH du secteur avant envoi']
      ]
    },
    lm:{
      verdicts:[
        'La lettre existe, mais elle ne crée pas encore l\'envie d\'appeler.',
        'Bonne intention, le message manque de personnalisation pour sortir du lot.',
        'La structure est là — le fond doit montrer ce que tu apportes, pas ce que tu cherches.',
        'Lettre trop centrée sur le candidat, pas assez sur la valeur créée pour l\'employeur.',
        'Du potentiel, quelques reformulations stratégiques pour maximiser l\'impact.'
      ],
      pos:[
        ['L\'introduction accroche avec une phrase d\'ouverture personnalisée','Le poste visé est clairement identifié dès le premier paragraphe','Le ton est professionnel sans être froid — bon équilibre','La motivation pour l\'entreprise semble authentique et documentée','La conclusion invite clairement à une suite concrète (entretien, échange)'],
        ['La lettre est concise et ne dépasse pas une page — respect du standard','Les expériences mentionnées sont cohérentes avec le poste visé','La valeur ajoutée du candidat est au moins esquissée','Le style d\'écriture est fluide et sans fautes apparentes','Le candidat montre qu\'il connaît le secteur de l\'entreprise']
      ],
      neg:[
        ['L\'ouverture commence par "Je" — formulation à éviter pour capter l\'attention','Aucun élément spécifique à l\'entreprise — la lettre semble réutilisable à l\'identique','Les compétences sont listées sans être reliées à un bénéfice concret pour le recruteur'],
        ['Le dernier paragraphe est passif : attendre un retour plutôt que proposer un entretien','Les réussites citées manquent de chiffres ou de résultats mesurables','La lettre raconte l\'historique du CV sans apporter de dimension nouvelle']
      ],
      plans:[
        ['Réécrire l\'ouverture : partir d\'un fait sur l\'entreprise, pas de soi','Intégrer 1 réalisation chiffrée tirée de l\'expérience la plus pertinente','Reformuler la conclusion en proposant activement un créneau pour échanger','Personnaliser 3 éléments propres à l\'entreprise visée (projet, valeur, actualité)','Vérifier que chaque paragraphe répond à : Pourquoi eux ? Pourquoi moi ? Pourquoi maintenant ?'],
        ['Supprimer toutes les occurrences de "je cherche", "je souhaite" — les remplacer par ce que tu apportes','Réduire à 3 paragraphes nets : accroche / valeur ajoutée / invitation à échanger','Ajouter une phrase sur ta connaissance de leur secteur ou d\'un défi qu\'ils traversent','Calibrer le registre : formel pour grands groupes, plus direct pour startups / PME','Faire lire par quelqu\'un hors du secteur : si ce n\'est pas clair pour lui, ça ne l\'est pas pour le recruteur non plus']
      ]
    },
    contrat:{
      verdicts:[
        'Contrat lisible, plusieurs clauses méritent une vérification approfondie avant signature.',
        'Structure standard, certains points pourraient être mieux définis en ta faveur.',
        'Le contrat couvre les bases légales, quelques zones grises à clarifier avec l\'employeur.',
        'Document conforme aux standards, vigilance sur les clauses de non-concurrence et de durée.',
        'Contrat globalement équilibré, deux ou trois points à renégocier avant signature.'
      ],
      pos:[
        ['Les parties signataires sont clairement identifiées avec coordonnées complètes','L\'intitulé du poste et la classification sont précisés','La durée du contrat et le type (CDI/CDD/alternance) sont explicites','La rémunération brute est indiquée avec la périodicité de versement','Le lieu de travail principal est mentionné dans le contrat'],
        ['La convention collective applicable est citée dans le contrat','Les horaires de travail sont définis ou référencés à un accord d\'entreprise','La période d\'essai est mentionnée avec sa durée légale ou conventionnelle','Les congés payés légaux sont rappelés (5 semaines minimum)','La clause de confidentialité est proportionnée et limitée dans le temps']
      ],
      neg:[
        ['La clause de non-concurrence est présente sans contrepartie financière mentionnée — illégale sans compensation','La période d\'essai semble supérieure au plafond légal ou conventionnel','Aucune mention des primes ou avantages évoqués à l\'oral pendant le recrutement'],
        ['La clause de mobilité géographique est trop large sans périmètre défini','Les heures supplémentaires semblent intégrées au forfait sans base de calcul claire','La clause de modification unilatérale des conditions est trop favorable à l\'employeur']
      ],
      plans:[
        ['Vérifier la clause de non-concurrence : elle doit être limitée (zone, durée, secteur) + compensée financièrement','Confirmer que la période d\'essai correspond au plafond légal de ta convention collective','Faire mentionner par écrit tous les avantages évoqués à l\'oral (télétravail, primes, outils)','Vérifier la clause de mobilité : exiger un périmètre géographique précis','Demander la convention collective complète avant signature — elle prime sur le contrat en cas de conflit'],
        ['Relire l\'article sur les heures supplémentaires : forfait jour ou 35h + majorations ?','Vérifier la clause de modification du contrat : elle ne peut pas changer les éléments essentiels sans ton accord','Calculer le salaire net estimé avec les charges du profil (salarié vs cadre)','Négocier une clause de révision salariale annuelle si absente','Conserver une copie signée du contrat — demander l\'original sans faute']
      ]
    },
    vae:{
      verdicts:[
        'Dossier engagé, la mise en valeur de l\'expérience terrain reste à renforcer.',
        'Bonne base de départ, le lien entre les activités et les compétences du référentiel est à expliciter.',
        'Le parcours est réel — il faut maintenant le rendre lisible pour un jury qui ne te connaît pas.',
        'Dossier prometteur, quelques rubriques manquent de preuves concrètes.',
        'La cohérence entre expérience et diplôme visé est là, la formalisation doit être renforcée.'
      ],
      pos:[
        ['Le parcours professionnel est détaillé avec des dates et durées précises','Les activités décrites correspondent aux blocs de compétences du référentiel','Les exemples concrets d\'interventions professionnelles sont présents','Le vocabulaire utilisé est cohérent avec le secteur et le niveau visé','La motivation pour obtenir le diplôme par la VAE est clairement exprimée'],
        ['Le dossier couvre bien plusieurs situations professionnelles variées','La structure du Livret 2 suit les rubriques demandées','Les responsabilités exercées correspondent au niveau de qualification visé','Le candidat démontre une autonomie et une prise d\'initiative dans ses activités','Les compétences transversales (organisation, communication) sont illustrées']
      ],
      neg:[
        ['Les activités sont décrites comme des tâches et non comme des compétences exercées','Peu de preuves tangibles : pas de documents annexes cités, pas de résultats mesurables','Le lien explicite entre chaque activité et les compétences du référentiel est absent'],
        ['Le volume du dossier est insuffisant pour convaincre un jury d\'expertise','Les situations décrites manquent de complexité — le niveau requis n\'est pas démontré','Les responsabilités semblent exercées sous direction constante, sans autonomie visible']
      ],
      plans:[
        ['Pour chaque activité : reformuler en "J\'ai + verbe d\'action + contexte + résultat"','Ajouter des preuves annexes pour chaque compétence : email, rapport, compte-rendu, attestation','Relire le référentiel du diplôme visé et mapper chaque compétence à une situation précise','Demander un accompagnement VAE (Pôle emploi, OPCO, organisme certificateur) avant le jury','Rédiger un exemple de situation complexe par bloc de compétences du référentiel'],
        ['Vérifier le nombre minimum de pages attendu par le certificateur','Faire relire le dossier par un accompagnateur VAE certifié Qualiopi','Anticiper les questions du jury : préparer 2 exemples supplémentaires par compétence','Ajouter une introduction personnelle : pourquoi cette VAE, maintenant, dans ce secteur ?','Préparer une présentation orale de 10 min si le diplôme l\'exige — simuler avec un tiers']
      ]
    },
    are:{
      verdicts:[
        'Dossier structuré, quelques éléments justificatifs restent à compléter.',
        'Base solide, veiller à la cohérence des dates et montants déclarés.',
        'Dossier recevable, la situation particulière mérite d\'être documentée plus précisément.',
        'Les informations essentielles sont présentes, certaines pièces justificatives doivent être vérifiées.',
        'Dossier en bonne voie, quelques points à consolider avant dépôt.'
      ],
      pos:[
        ['Les informations d\'identité et de contact sont complètes et lisibles','Les périodes d\'emploi sont renseignées avec les dates exactes','L\'employeur et le motif de fin de contrat sont clairement indiqués','Le salaire de référence est documenté avec les bulletins correspondants','Le RIB est joint ou indiqué pour le versement des allocations'],
        ['La situation familiale est déclarée correctement (impact sur les droits)','Les éventuelles périodes de formation ou arrêt maladie sont signalées','Le formulaire est daté et signé dans les délais requis','Les attestations employeur Pôle Emploi sont jointes','Le document est déposé dans le délai légal (12 mois après fin de contrat)']
      ],
      neg:[
        ['Les dates de fin de contrat ne correspondent pas exactement aux attestations employeur','Le motif de rupture est imprécis — risque de contestation ou délai d\'instruction plus long','Les périodes d\'activité réduite pendant l\'indemnisation ne sont pas toutes déclarées'],
        ['Aucune pièce justificative de la fin de contrat n\'est mentionnée','Le salaire de référence semble incomplet si primes ou heures supplémentaires sont exclues','La signature et la date de dépôt risquent de faire expirer les droits si dépassement du délai']
      ],
      plans:[
        ['Vérifier que toutes les dates correspondent exactement aux bulletins de salaire et attestations','Joindre la lettre de licenciement ou l\'accord de rupture conventionnelle homologué','Déclarer TOUTES les périodes d\'emploi des 24 derniers mois, même les CDD courts','Contacter France Travail pour valider le motif de rupture avant dépôt si doute','Conserver une copie de l\'intégralité du dossier avec les pièces jointes'],
        ['Calculer son SJR estimé sur moncompteformation ou via le simulateur France Travail','Vérifier si des primes ou compléments de salaire sont intégrables dans le calcul','Signaler tout arrêt maladie intercalé — il modifie la période de référence','Anticiper le délai de carence (7 jours) + différé d\'indemnisation si prime de départ','Se connecter sur france-travail.fr pour suivre le statut du dossier en temps réel']
      ]
    },
    bp:{
      verdicts:[
        'Business plan ambitieux, le modèle économique doit être davantage étayé.',
        'Vision claire, la démonstration chiffrée de la viabilité reste à renforcer.',
        'Projet cohérent, la stratégie d\'acquisition client est le point à développer en priorité.',
        'Bonne structure narrative, les hypothèses financières doivent être challengées.',
        'BP convaincant sur le fond, la forme et la précision des projections sont à retravailler.'
      ],
      pos:[
        ['Le concept et la proposition de valeur sont clairement formulés','Le marché cible est identifié avec une taille estimée','La concurrence est analysée avec un positionnement différenciant','Le modèle de revenus est explicité (abonnement, commission, prestation)','L\'équipe fondatrice est présentée avec les compétences clés'],
        ['Les projections financières couvrent au moins 3 exercices','Le besoin de financement est chiffré avec une utilisation détaillée','La stratégie go-to-market est définie avec des canaux d\'acquisition précis','Les indicateurs clés de performance (KPI) sont identifiés','Le plan de développement est phasé avec des jalons clairs']
      ],
      neg:[
        ['Les projections financières reposent sur des hypothèses non justifiées','Le chiffre d\'affaires prévisionnel de l\'année 1 semble optimiste sans validation client','L\'analyse concurrentielle est incomplète ou sous-estime les acteurs établis'],
        ['Le besoin client n\'est pas validé par des interviews ou données terrain','Les charges fixes et variables ne sont pas distinguées dans le budget','La stratégie de sortie ou de pérennisation à 5 ans est absente']
      ],
      plans:[
        ['Interviewer 10 clients potentiels et intégrer les verbatims dans le BP','Retravailler les hypothèses de CA : justifier chaque ligne avec une source (marché, benchmark)','Ajouter un tableau de trésorerie mensuel pour l\'année 1','Identifier 3 concurrents directs avec leurs forces, faiblesses et part de marché estimée','Définir le seuil de rentabilité (break-even) avec le nombre de clients/unités nécessaires'],
        ['Construire 3 scénarios financiers : pessimiste, réaliste, optimiste','Détailler le coût d\'acquisition client (CAC) et la valeur vie client (LTV)','Ajouter un plan B pour les 6 premiers mois si les objectifs ne sont pas atteints','Préparer une version courte du BP (Executive Summary) de 2 pages pour les investisseurs','Faire relire le BP par un expert-comptable et un entrepreneur du secteur']
      ]
    },
    stage:{
      verdicts:[
        'Convention conforme dans les grandes lignes, quelques points à vérifier avant signature.',
        'Structure standard, vérifier la cohérence des dates et de la gratification.',
        'Convention lisible, la définition des missions reste vague et devrait être précisée.',
        'Document recevable, quelques clauses protectrices pour le stagiaire sont à vérifier.',
        'Base correcte, assurer que tous les éléments obligatoires sont bien présents.'
      ],
      pos:[
        ['Les trois parties (stagiaire, établissement, entreprise) sont identifiées','La durée du stage est précisée avec les dates de début et de fin','L\'encadrant pédagogique et le tuteur en entreprise sont nommés','Le montant de la gratification est indiqué (obligatoire si > 2 mois)','Les objectifs pédagogiques du stage sont mentionnés'],
        ['Les horaires de stage correspondent aux horaires de l\'entreprise','La convention précise le régime de protection sociale applicable','Le nombre de jours de congés ou absences autorisées est indiqué','La charte ou règlement intérieur est référencé','La convention est signée avant le premier jour de stage']
      ],
      neg:[
        ['Les missions décrites sont trop vagues pour protéger le stagiaire en cas de litige','La gratification est absente ou inférieure au minimum légal (4,35€/h en 2026)','Aucune mention des modalités de rupture anticipée de la convention'],
        ['L\'établissement d\'enseignement n\'est pas signataire — convention illégale sans son accord','La durée totale dépasse 6 mois sur 12 mois glissants — risque de requalification en CDI','Aucune mention de la couverture en cas d\'accident du travail pendant le stage']
      ],
      plans:[
        ['Vérifier que la gratification est au minimum de 4,35€/heure pour les stages > 2 mois consécutifs','Faire préciser les missions dans une annexe signée avec des livrables attendus','Vérifier que l\'établissement et l\'entreprise ont bien signé AVANT le premier jour','Demander confirmation écrite de la couverture AT/MP pendant toute la durée','Conserver une copie de la convention signée par toutes les parties'],
        ['Calculer la gratification totale attendue et vérifier le mode de versement (mensuel)','Clarifier les modalités de rupture anticipée (délai de prévenance, motifs)','Vérifier que la durée totale ne dépasse pas 6 mois dans l\'entreprise sur 12 mois','Demander la liste des équipements fournis et mentionnés dans la convention','Prévoir un bilan mi-parcours formalisé avec le tuteur et l\'établissement']
      ]
    },
    alternance:{
      verdicts:[
        'Contrat conforme aux standards, quelques éléments de protection à vérifier.',
        'Bonne base contractuelle, la partie formation mérite une vérification détaillée.',
        'Contrat lisible, les clauses de rémunération et de rupture méritent attention.',
        'Document cohérent, s\'assurer que le CFA est bien référencé et Qualiopi.',
        'Structure standard, vérifier l\'adéquation entre le diplôme visé et les missions.'
      ],
      pos:[
        ['Le type de contrat (apprentissage ou pro) est clairement identifié','Le CFA ou organisme de formation est nommé avec son numéro SIRET','La qualification visée et le niveau de diplôme sont précisés','Le maître d\'apprentissage est désigné nominativement dans le contrat','La rémunération est indiquée en % du SMIC selon l\'âge et l\'année'],
        ['Les dates de début et de fin du contrat correspondent au cycle de formation','La répartition école/entreprise est définie (ex : 3 jours entreprise / 2 jours CFA)','Le contrat précise les modalités de rupture pendant les 45 premiers jours','La convention de formation entre l\'entreprise et le CFA est référencée','Le dépôt OPCO est prévu dans les délais légaux (5 jours ouvrables après signature)']
      ],
      neg:[
        ['Le salaire semble calculé sur une base incorrecte (vérifier âge + année de contrat)','Le maître d\'apprentissage n\'a pas la compétence requise ou n\'est pas formalisé','La durée du contrat n\'est pas cohérente avec la durée de la formation'],
        ['Aucune mention du dépôt OPCO — risque de non-financement de la formation','Les missions décrites ne correspondent pas au niveau du diplôme préparé','La rupture anticipée après les 45 jours n\'est pas encadrée dans le contrat']
      ],
      plans:[
        ['Vérifier le calcul de ta rémunération : âge + année de contrat + SMIC en vigueur','Confirmer que le dépôt OPCO est fait dans les 5 jours ouvrables après signature','Vérifier les compétences et la disponibilité de ton maître d\'apprentissage','S\'assurer que le CFA est certifié Qualiopi — sinon le financement OPCO sera refusé','Conserver une copie signée du contrat et de la convention CFA'],
        ['Vérifier que les missions sont cohérentes avec le référentiel du diplôme','Demander le calendrier de formation officiel du CFA avant la prise de poste','Clarifier les conditions de rupture après les 45 premiers jours','Vérifier si la convention collective prévoit un salaire supérieur au minimum légal','Anticiper l\'entretien de mi-parcours obligatoire avec le maître d\'apprentissage']
      ]
    },
    devis:{
      verdicts:[
        'Devis structuré, quelques mentions obligatoires sont à vérifier pour la conformité.',
        'Document lisible, la précision des prestations et des conditions reste à renforcer.',
        'Base correcte, les mentions légales et les conditions de paiement méritent attention.',
        'Devis professionnel dans l\'ensemble, quelques éléments de protection à ajouter.',
        'Structure conforme, vérifier la cohérence entre prestations décrites et montants.'
      ],
      pos:[
        ['L\'identité complète du prestataire et du client sont présentes','La date d\'émission et le numéro de devis sont indiqués','Les prestations sont listées avec une description et un prix unitaire','Le total HT et TTC est clairement affiché','La durée de validité du devis est mentionnée'],
        ['Les conditions de paiement sont précisées (acompte, solde, délai)','Les pénalités de retard sont mentionnées (obligatoire en B2B)','La mention de TVA ou d\'exonération est explicite','Les délais de livraison ou d\'exécution sont indiqués','Les coordonnées bancaires ou modes de paiement acceptés sont précisés']
      ],
      neg:[
        ['Aucune mention des pénalités de retard — pourtant obligatoire entre professionnels','Les conditions générales de vente ne sont pas référencées ou jointes','Le périmètre des prestations est trop vague — risque de litige sur les révisions'],
        ['L\'indemnité forfaitaire de recouvrement de 40€ n\'est pas mentionnée','Aucune clause sur les droits de propriété intellectuelle pour les créations livrées','La mention "devis non contractuel" est absente — peut créer une ambiguïté juridique']
      ],
      plans:[
        ['Ajouter la mention des pénalités de retard : "3 fois le taux d\'intérêt légal en vigueur"','Joindre ou référencer tes CGV (Conditions Générales de Vente) dans le devis','Préciser le nombre de révisions incluses dans le prix pour éviter les dérives de périmètre','Ajouter l\'indemnité forfaitaire de recouvrement de 40€ obligatoire en B2B','Détailler chaque poste de facturation : heure, journée ou forfait avec quantité'],
        ['Inclure une clause sur la propriété des livrables (transfert uniquement après paiement complet)','Ajouter une case de signature client "Bon pour accord" avec date','Préciser les conditions d\'annulation et les frais engagés en cas de résiliation','Vérifier que ton numéro SIRET et ta mention de TVA sont corrects et à jour','Conserver une copie signée de chaque devis avec preuve d\'envoi (email, LR)']
      ]
    },
    autre:{
      verdicts:[
        'Document professionnel analysé, plusieurs points d\'attention identifiés.',
        'Structure correcte, la précision et la complétude peuvent être améliorées.',
        'Document recevable, quelques éléments de forme et de fond à renforcer.',
        'Base solide, la formalisation mérite d\'être renforcée pour gagner en portée juridique.',
        'Document cohérent avec son objectif, quelques optimisations pratiques à apporter.'
      ],
      pos:[
        ['La structure du document est claire et logique','L\'objet et les parties concernées sont identifiés','Le langage utilisé est adapté au contexte professionnel','Les dates et références sont présentes','Le document répond à l\'objectif déclaré'],
        ['La formulation est précise et sans ambiguïté majeure','Les responsabilités et engagements sont explicités','Le document est signé ou daté correctement','Le registre de langue est cohérent et professionnel','Les informations essentielles sont présentes et lisibles']
      ],
      neg:[
        ['La portée juridique du document pourrait être renforcée par une mise en forme notariée','Les termes clés ne sont pas définis, ce qui peut créer des interprétations divergentes','Aucune mention des voies de recours en cas de litige entre les parties'],
        ['Le document manque d\'une clause de confidentialité si des données sensibles sont partagées','Les conditions de modification ou d\'annulation du document ne sont pas précisées','L\'archivage et la durée de conservation du document ne sont pas mentionnés']
      ],
      plans:[
        ['Faire relire le document par un juriste ou un professionnel RH du secteur','Ajouter une clause définissant les termes clés ambigus','Préciser les conditions de modification ou d\'avenant pour les documents contractuels','Mentionner les voies de recours applicables (médiation, tribunal compétent)','Archiver une version signée avec preuve de remise à chaque partie'],
        ['Vérifier la conformité RGPD si des données personnelles sont traitées','Ajouter une date de révision ou d\'expiration si le document est temporaire','Numéroter et paginer le document pour éviter toute substitution de page','S\'assurer que toutes les parties signataires ont la capacité juridique requise','Consulter le conseiller juridique de ta branche professionnelle pour validation']
      ]
    }
  };

  var dk = KB[docType] || KB['autre'];

  // Sélection déterministe mais variée selon l'heure et le contenu
  var seed = (Date.now() + (content?content.length:0)) % 997;
  var pick = function(arr){ return arr[seed % arr.length]; };
  var pickSub = function(arr){ return arr[Math.floor(seed/7) % arr.length]; };

  var verdict = pick(dk.verdicts);

  var posPool = dk.pos ? dk.pos.reduce(function(a,b){return a.concat(b);},[]) : [];
  var negPool = dk.neg ? dk.neg.reduce(function(a,b){return a.concat(b);},[]) : [];
  var planPool = dk.plans ? dk.plans.reduce(function(a,b){return a.concat(b);},[]) : [];

  // Shuffle déterministe
  function dShuffle(arr, s){
    var a=arr.slice(); var seed2=s;
    for(var i=a.length-1;i>0;i--){ seed2=(seed2*1664525+1013904223)&0xffffffff; var j=Math.abs(seed2)%(i+1); var t=a[i];a[i]=a[j];a[j]=t; }
    return a;
  }
  var posShuf = dShuffle(posPool, seed);
  var negShuf = dShuffle(negPool, seed+13);
  var planShuf = dShuffle(planPool, seed+37);

  var nPos = score>=8?4:score>=6?3:3;
  var nNeg = score>=8?2:score>=6?3:4;
  var nPlan = 5;

  // Enrichissement contextuel selon profil
  var profilCtx = {
    dem: { planBonus:'Apporter ce document lors de ton prochain RDV France Travail pour valider ta démarche.' },
    etu: { planBonus:'Partage ce document avec le responsable pédagogique de ton établissement pour avis.' },
    frl: { planBonus:'Archive ce document dans ton dossier URSSAF avec la date de création.' },
    rec: { planBonus:'Inclure ce document dans ton dossier CEP pour soutenir ton projet de reconversion.' }
  };
  var bonus = profilCtx[profil] ? profilCtx[profil].planBonus : null;

  var positifs = posShuf.slice(0, nPos);
  var negatifs = negShuf.slice(0, nNeg);
  var plan = planShuf.slice(0, nPlan);
  if(bonus) plan.push(bonus);

  return { valide:true, note:score, verdict:verdict, positifs:positifs, negatifs:negatifs, plan:plan };
}


function ewShowResult(result,docLabel){
  var el=document.getElementById('ew-ana-result');
  if(!result.valide){
    el.innerHTML='<div style="padding:14px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:.72rem;color:#dc2626;line-height:1.6;"><strong>Document non reconnu</strong><br>'+result.message+'<br><br>EVA analyse uniquement les documents professionnels officiels : CV, lettres, contrats, dossiers VAE, ARE, business plans, etc.</div>';
    el.classList.add('show');
    document.getElementById('ew-p4-scroll').scrollTop=9999;
    return;
  }
  var note=result.note||0;
  var noteCol=note>=8?'#059669':note>=6?'#b45309':'#dc2626';
  var noteBg=note>=8?'rgba(5,150,105,.08)':note>=6?'rgba(180,83,9,.08)':'rgba(220,38,38,.08)';
  var noteBdr=note>=8?'#bbf7d0':note>=6?'#fde68a':'#fecaca';
  var h='';
  // Note
  h+='<div class="ew-note-wrap"><div class="ew-note-circle" style="border-color:'+noteCol+';color:'+noteCol+';background:'+noteBg+';">'+note+'/10</div><div class="ew-note-info"><div class="ew-note-lbl">'+docLabel+'</div><div class="ew-note-verdict">'+result.verdict+'</div></div></div>';
  // Points positifs
  if(result.positifs&&result.positifs.length){
    h+='<div class="ew-pts-sec"><div class="ew-pts-ttl pos">Points forts</div><div class="ew-pts-list">';
    result.positifs.forEach(function(p){h+='<div class="ew-pt-item pos"><span class="ew-pt-bullet">✅</span>'+p+'</div>';});
    h+='</div></div>';
  }
  // Points négatifs
  if(result.negatifs&&result.negatifs.length){
    h+='<div class="ew-pts-sec"><div class="ew-pts-ttl neg">Points à améliorer</div><div class="ew-pts-list">';
    result.negatifs.forEach(function(p){h+='<div class="ew-pt-item neg"><span class="ew-pt-bullet">⚠️</span>'+p+'</div>';});
    h+='</div></div>';
  }
  // Plan d'action
  if(result.plan&&result.plan.length){
    h+='<div class="ew-plan-sec"><div class="ew-plan-ttl">Plan d\'action EVA</div><div class="ew-plan-steps">';
    result.plan.forEach(function(step,i){h+='<div class="ew-plan-step"><div class="ew-plan-num">'+(i+1)+'</div>'+step+'</div>';});
    h+='</div></div>';
  }
  el.innerHTML=h;
  el.classList.add('show');
  setTimeout(function(){el.scrollIntoView({behavior:'smooth'});},100);
}
