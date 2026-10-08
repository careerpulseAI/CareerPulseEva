
// ── Données QCM (EL_DATA) ──
var EL_DATA = {
    salarie:[
      {q:"Quelle est la durée légale maximale d'une période d'essai pour un cadre en CDI ?",opts:["2 mois (durée applicable aux employés)","3 mois (durée applicable aux techniciens et agents de maîtrise)","4 mois (durée initiale applicable aux cadres)","8 mois (durée applicable aux cadres, renouvellement compris)"],ans:2,expl:"Pour un cadre, la période d'essai initiale est de 4 mois maximum, renouvelable une fois pour atteindre 8 mois si la convention collective le prévoit. Code du travail L1221-19."},
      {q:"Lors d'un entretien, l'employeur peut-il légalement vous demander votre salaire actuel ?",opts:["Oui, c'est une pratique courante et parfaitement autorisée","Oui, mais uniquement si le poste est dans le même secteur d'activité","Le Code du travail ne l'interdit pas formellement, mais c'est une pratique déconseillée et bientôt encadrée par une directive européenne","Oui, à condition que cela soit mentionné dans l'offre d'emploi"],ans:2,expl:"Le Code du travail ne prohibe pas formellement cette question, mais elle est risquée pour l'employeur (terrain glissant vers la discrimination salariale). La directive européenne sur la transparence salariale (2023/970), à transposer en France au plus tard le 7 juin 2026, interdira explicitement aux employeurs de demander la rémunération antérieure d'un candidat. Vous pouvez déjà décliner poliment et indiquer directement vos prétentions."},
      {q:"Combien de jours de congés payés un salarié acquiert-il par mois de travail effectif ?",opts:["2 jours ouvrables","2,5 jours ouvrables","3 jours ouvrables","1,5 jour ouvrable"],ans:1,expl:"Tout salarié acquiert 2,5 jours ouvrables de congés payés par mois de travail effectif, soit 30 jours ouvrables (5 semaines) pour une année complète — quel que soit le type de contrat (CDI, CDD, intérim) ou le temps de travail. Article L.3141-3 du Code du travail."},
      {q:"Quelle est la majoration de salaire minimale légale pour les 8 premières heures supplémentaires de la semaine ?",opts:["10%","25%","50%","100%"],ans:1,expl:"Les heures supplémentaires sont majorées d'au moins 25% pour les 8 premières heures au-delà de la durée légale de 35h/semaine, puis 50% au-delà — sauf accord collectif prévoyant un taux différent (minimum 10%). Article L.3121-36 du Code du travail."},
      {q:"Un recruteur vous demande votre situation de famille. Que faites-vous ?",opts:["Vous répondez directement et complètement à la question","Vous demandez poliment le lien avec le poste, puis confirmez votre disponibilité","Vous donnez une réponse vague sans préciser si vous avez des enfants","Vous signalez immédiatement que la question est discriminatoire"],ans:1,expl:"La situation de famille est une donnée privée. Vous pouvez répondre : 'Je ne vois pas le lien direct avec les missions du poste, mais je suis totalement disponible.' C'est poli, protège vos droits, sans tension inutile."},
      {q:"Dans quel délai la visite médicale d'embauche (visite d'information et de prévention) doit-elle avoir lieu après la prise de poste ?",opts:["1 mois","3 mois","6 mois","1 an"],ans:1,expl:"L'employeur doit organiser cette visite dans les 3 mois suivant la prise effective de poste — sauf si le salarié est mineur ou travaille de nuit, où elle doit avoir lieu avant l'embauche. Articles R.4624-10 et R.4624-18 du Code du travail."},
      {q:"Quel est le délai légal de réponse d'un recruteur après un entretien ?",opts:["48 heures, par usage professionnel courant","1 semaine, fixé par le code du travail","2 semaines, fixé par convention collective","Aucun délai n'est imposé légalement"],ans:3,expl:"Légalement, aucun délai n'est imposé pour répondre. Un accusé de réception sous 2 semaines reste une bonne pratique, mais ce n'est pas une obligation. Vous pouvez relancer après 10-15 jours sans nouvelle."},
      {q:"Après la signature d'une rupture conventionnelle, de combien de jours dispose chaque partie pour se rétracter ?",opts:["7 jours calendaires","15 jours calendaires","30 jours calendaires","15 jours ouvrables"],ans:1,expl:"Employeur et salarié disposent chacun de 15 jours calendaires (tous les jours, week-ends inclus) à compter de la signature pour se rétracter, sans avoir à se justifier. Article L.1237-13 du Code du travail."},
      {q:"En CDD, quelle est la durée maximale (renouvellements inclus) dans la plupart des cas ?",opts:["12 mois, sauf accord de branche étendu","16 mois, renouvellement compris","18 mois, renouvellement inclus, dans le cas général","24 mois pour les contrats liés à l'export"],ans:2,expl:"Un CDD ne peut excéder 18 mois (renouvellements inclus) dans la majorité des cas. Des durées différentes existent pour certains cas particuliers (saisonnier, remplacement, accords de branche). Au-delà, le contrat peut être requalifié en CDI."},
      {q:"L'indemnité de rupture conventionnelle peut-elle être inférieure à l'indemnité légale de licenciement ?",opts:["Oui, si le salarié l'accepte par écrit","Oui, pour les contrats de moins de 2 ans d'ancienneté","Non, jamais — quel que soit l'accord entre les parties","Oui, si l'ancienneté est inférieure à 1 an"],ans:2,expl:"Le montant de l'indemnité de rupture conventionnelle ne peut jamais être inférieur à l'indemnité légale de licenciement. La DREETS refuse l'homologation si ce plancher n'est pas respecté. Articles L.1237-13 et L.1234-9 du Code du travail."},
      {q:"Un salarié du secteur privé doit-il informer son employeur avant de se mettre en grève ?",opts:["Oui, avec un préavis de 48h","Oui, avec un préavis de 5 jours","Non, aucun préavis n'est légalement exigé dans le secteur privé","Oui, obligatoirement par lettre recommandée"],ans:2,expl:"Dans le secteur privé, le droit de grève (reconnu par le Préambule de la Constitution de 1946) ne nécessite aucun préavis ni formalité particulière, contrairement à certains services publics. L'employeur ne peut pas sanctionner un salarié pour fait de grève licite."},
      {q:"Un employeur peut-il consulter vos réseaux sociaux avant l'embauche ?",opts:["Non, c'est strictement interdit quel que soit le poste","Oui, mais uniquement ce que vous avez rendu public vous-même","Oui, l'employeur peut demander l'accès à tous vos comptes avec votre accord écrit","Non, sauf pour les postes liés à la sécurité ou à la défense"],ans:1,expl:"Un recruteur peut consulter ce que vous avez rendu public. Il ne peut pas vous demander vos mots de passe ni exiger l'accès à vos comptes privés, même avec votre accord. Soignez votre e-réputation professionnelle."},
      {q:"Comment se calcule l'indemnité légale de licenciement au-delà de 10 ans d'ancienneté ?",opts:["1/4 de mois de salaire par année, pour toute la période","1/4 de mois par année jusqu'à 10 ans, puis 1/3 de mois par année au-delà","1/2 mois de salaire par année, sans limite","Aucune règle légale ne s'applique au-delà de 10 ans"],ans:1,expl:"L'indemnité légale de licenciement se calcule à 1/4 de mois de salaire par année d'ancienneté jusqu'à 10 ans, puis 1/3 de mois par année au-delà de 10 ans. Article R.1234-2 du Code du travail."},
      {q:"Qu'est-ce qu'une clause de non-concurrence et quand s'applique-t-elle ?",opts:["Elle s'applique uniquement pendant la durée du contrat","Elle s'applique après la rupture du contrat, sous conditions de validité","Elle est interdite en France depuis la réforme de 2008","Elle ne peut être prévue que pour les postes de cadre dirigeant"],ans:1,expl:"La clause de non-concurrence s'applique après la rupture du contrat. Pour être valide : limitée dans le temps, l'espace, le domaine, et assortie d'une contrepartie financière. Sans ces conditions, elle est nulle."},
      {q:"Quel est le délai de prévenance légal minimum pour convoquer un entretien préalable à licenciement ?",opts:["3 jours ouvrables","5 jours ouvrables","7 jours ouvrables","10 jours ouvrables"],ans:1,expl:"La convocation doit être remise 5 jours ouvrables minimum avant l'entretien préalable (Code du travail L1232-2). Ce délai vous permet de préparer votre défense et de vous faire assister."},
      {q:"Qu'est-ce que le 'droit à la déconnexion' pour un salarié ?",opts:["Une obligation pour l'employeur d'éteindre ses serveurs après 19h","Le droit de ne pas répondre aux sollicitations professionnelles hors temps de travail","Le droit de refuser l'usage de tout outil numérique au travail","Un jour de congé additionnel accordé aux métiers du numérique"],ans:1,expl:"Le droit à la déconnexion (loi El Khomri, 2017) oblige les entreprises de +50 salariés à définir des modalités d'usage des outils numériques pour préserver le temps de repos. En pratique : vous n'êtes pas tenu de répondre aux emails/appels hors horaires de travail — l'employeur n'a aucune obligation technique sur ses serveurs."},
      {q:"Un employeur peut-il modifier unilatéralement votre contrat de travail ?",opts:["Oui, à tout moment, sans justification particulière","Non, aucune modification n'est jamais permise sans accord","Oui pour les éléments non essentiels, mais pas pour les éléments essentiels sans votre accord","Oui, à condition de respecter un préavis d'un mois"],ans:2,expl:"Les éléments essentiels du contrat (salaire, qualification, lieu de travail si précisé) ne peuvent être modifiés sans votre accord. Les conditions de travail (organisation, méthodes) relèvent du pouvoir de direction. Refuser une modification essentielle n'est pas une faute."},
      {q:"Pendant un arrêt maladie non professionnel, un salarié continue-t-il d'acquérir des congés payés ?",opts:["Non, jamais","Oui, dans la limite de 24 jours ouvrables par période de référence","Oui, sans aucune limite","Seulement après 1 an d'ancienneté"],ans:1,expl:"Depuis la loi du 22 avril 2024, un salarié en arrêt pour maladie ou accident non professionnel acquiert 2 jours ouvrables de congés payés par mois d'arrêt, dans la limite de 24 jours ouvrables par période de référence. Pour un accident du travail ou une maladie professionnelle, l'acquisition reste à 2,5 jours/mois sans cette limite réduite. Article L.3141-5-1 du Code du travail."},
      {q:"Quelle est la règle sur le télétravail en cas de désaccord employeur/salarié ?",opts:["L'employeur peut imposer le télétravail sans accord","Le salarié peut exiger le télétravail sans accord","Le refus de télétravail par l'employeur doit être motivé par écrit","Le télétravail est automatique après 6 mois d'ancienneté"],ans:2,expl:"Depuis la loi ANI 2021, aucune partie ne peut imposer le télétravail sans accord. Le refus de l'employeur doit être motivé. En pratique, une charte ou accord collectif encadre souvent les modalités. Le refus du salarié ne peut être une cause de licenciement."},
      {q:"Qu'est-ce que le CSE (Comité Social et Économique) ?",opts:["Un organisme de formation continue","L'instance représentative du personnel obligatoire dans les entreprises de +11 salariés","Un contrat spécial pour les seniors","Un dispositif fiscal pour les PME"],ans:1,expl:"Le CSE remplace depuis 2020 le CE, les DP et le CHSCT. Obligatoire dès 11 salariés, il représente les intérêts des salariés sur les conditions de travail, l'emploi, la santé et la stratégie de l'entreprise. Il gère aussi les activités sociales et culturelles."},
      {q:"Un recruteur vous demande si vous fumez. Comment répondez-vous ?",opts:["Vous répondez honnêtement sans plus de précision","Vous demandez poliment le lien avec le poste, car c'est une question sans rapport direct","Vous évitez de répondre directement et changez de sujet","Vous répondez en insistant que ça ne vous concerne plus depuis peu"],ans:1,expl:"Demander si vous fumez est une question sans lien direct avec les compétences pour la plupart des postes. Vous pouvez répondre : 'Je ne vois pas le lien avec les missions. Je respecte évidemment toutes les règles en vigueur dans l'entreprise.' Poli, ferme, protecteur — sans pour autant dramatiser la situation."},
      {q:"Quelle est la durée minimale de préavis pour un CDI non-cadre en cas de démission ?",opts:["Aucun préavis légal","1 semaine","1 mois","3 mois"],ans:0,expl:"Pour un non-cadre, la loi ne fixe pas de durée minimale légale de préavis en cas de démission. C'est la convention collective ou le contrat qui le détermine. En pratique : 1 à 3 mois selon la convention. Vérifiez votre CCN avant de démissionner."},
      {q:"Après combien de jours d'arrêt de travail (non professionnel) la visite médicale de reprise devient-elle obligatoire ?",opts:["15 jours","30 jours","60 jours","90 jours"],ans:1,expl:"Depuis le 31 mars 2022, la visite médicale de reprise est obligatoire pour tout arrêt de travail de plus de 30 jours (contre 3 mois auparavant). Elle doit être organisée dès le retour effectif du salarié à son poste."},
      {q:"Qu'est-ce que le 'portage salarial' ?",opts:["Un contrat de travail temporaire","Un dispositif qui permet d'exercer en indépendant tout en étant salarié d'une société de portage","Un type de licenciement économique","Une forme de co-gérance en SARL"],ans:1,expl:"Le portage salarial permet à un consultant indépendant d'être rémunéré en salaire via une société de portage, tout en gardant sa liberté commerciale. Avantages : protection sociale de salarié, pas de gestion administrative. Contrepartie : frais de gestion (8-12% du CA)."},
      {q:"Quelle est la différence entre un avertissement et une mise à pied disciplinaire ?",opts:["Ce sont deux termes différents pour désigner la même sanction","L'avertissement est une sanction sans impact salarial ; la mise à pied entraîne une suspension du contrat et de la rémunération","L'avertissement entraîne systématiquement une retenue sur salaire, contrairement à la mise à pied","La mise à pied disciplinaire est annulée automatiquement si le salarié contre-signe le courrier"],ans:1,expl:"L'avertissement est une sanction légère, sans impact sur le salaire ni le contrat. La mise à pied conservatoire (avant licenciement) ou disciplinaire (sanction) suspend le contrat et interrompt la rémunération. Délai de prescription : 2 mois pour toute sanction (hors faute continue)."}
    ],
    demandeur:[
      {q:"Quelle est la durée minimale de travail pour ouvrir des droits à l'ARE (Allocation de Retour à l'Emploi) ?",opts:["3 mois sur les 24 derniers mois","6 mois sur les 24 derniers mois","6 mois sur les 36 derniers mois","12 mois sur les 36 derniers mois"],ans:1,expl:"Depuis 2023, il faut avoir travaillé au minimum 6 mois (130 jours ou 910 heures) sur les 24 derniers mois pour ouvrir des droits à l'ARE. Pour les +53 ans, le calcul s'effectue sur 36 mois."},
      {q:"Comment expliquer une longue période de chômage lors d'un entretien ?",opts:["La minimiser et passer rapidement à autre chose","Expliquer les actions menées (formations, bénévolat, projets)","Présenter cette période comme une pause bien méritée","Insister sur la difficulté du marché de l'emploi actuel"],ans:1,expl:"Valorisez cette période : formation suivie, certification obtenue, projet personnel, bénévolat, ou soins familiaux. Montrez que vous êtes resté actif et que vous avez utilisé ce temps positivement — plutôt que de l'esquiver ou de la justifier par des facteurs externes."},
      {q:"Lors d'un entretien, comment répondre à 'Pourquoi avez-vous du mal à trouver un emploi ?'",opts:["Expliquer que le marché est particulièrement difficile actuellement","Reconnaître honnêtement vos ajustements récents et ce que vous en avez tiré","Dire que vous êtes sélectif et refusez beaucoup de propositions","Évoquer un problème de discrimination à l'âge ou à l'origine"],ans:1,expl:"Répondez avec authenticité : 'J'ai affiné ma cible', 'J'ai suivi une formation pour combler un gap technique', 'Le marché dans mon secteur est compétitif mais je maintiens ma démarche'. Montrez de la lucidité et de la résilience plutôt que d'attribuer la difficulté à des causes externes invérifiables."},
      {q:"Que signifie 'pointer à France Travail' concrètement ?",opts:["Aller physiquement signer chaque semaine","Actualiser sa situation mensuelle en ligne ou par téléphone","Envoyer son CV chaque mois","Se présenter aux offres proposées sans exception"],ans:1,expl:"L'actualisation se fait chaque mois (entre le 28 et le 15) via francetravail.fr, l'appli, ou le 39 49. Vous déclarez votre situation (en recherche, en maladie, etc.) pour maintenir vos droits ARE."},
      {q:"Peut-on travailler et percevoir l'ARE simultanément ?",opts:["Non, jamais","Oui, sans condition","Oui, selon un calcul de cumul partiel","Oui, uniquement pour les missions courtes"],ans:2,expl:"Oui, le cumul emploi-ARE est possible. Vos revenus d'activité sont déduits partiellement de votre allocation selon la formule : allocation journalière - 70% du salaire journalier brut. Déclarez toujours vos revenus."},
      {q:"Quel document devez-vous impérativement conserver après une rupture de contrat ?",opts:["Uniquement votre solde de tout compte","L'attestation France Travail (ex-Pôle Emploi)","Le règlement intérieur de l'entreprise","Vos fiches de paie uniquement"],ans:1,expl:"L'attestation employeur (attestation France Travail) est indispensable pour ouvrir vos droits ARE. L'employeur doit vous la remettre à la fin du contrat. En cas de refus, vous pouvez le contraindre via l'inspection du travail."},
      {q:"Comment valoriser un emploi alimentaire lors d'un entretien pour un poste qualifié ?",opts:["Ne pas le mentionner pour rester focalisé sur le poste qualifié","Le présenter comme preuve de motivation et d'adaptabilité","Préciser que ce n'était qu'un dépannage temporaire sans plus de détails","Expliquer que c'était nécessaire faute d'autre solution à l'époque"],ans:1,expl:"Un emploi alimentaire montre votre sens des responsabilités, votre motivation à travailler et votre adaptabilité. Formulez : 'J'ai maintenu une activité pour rester opérationnel tout en poursuivant ma recherche ciblée.' L'occulter ou le minimiser fait perdre cette occasion de valoriser une qualité réelle."},
      {q:"Que faire si France Travail vous propose une offre que vous considérez inadaptée ?",opts:["Refuser en expliquant brièvement votre désaccord par téléphone","Accepter pour éviter tout risque de sanction, même si elle ne convient pas","Justifier votre refus par écrit avec des critères objectifs précis","Demander un délai de réflexion de plusieurs semaines avant de répondre"],ans:2,expl:"Vous pouvez refuser une Offre Raisonnable d'Emploi (ORE) si elle ne correspond pas à vos qualifications, est trop éloignée géographiquement, ou si le salaire est inférieur à 85% de votre ancien salaire — mais votre refus doit être justifié par écrit avec des critères objectifs, pas juste évoqué oralement ou laissé sans réponse formelle."},
      {q:"Quelle est la durée maximale de versement de l'ARE pour un demandeur de 50 ans ?",opts:["12 mois","18 mois","24 mois","36 mois"],ans:1,expl:"Pour les moins de 53 ans, l'ARE est versée au maximum 18 mois. De 53 à 54 ans : 22,5 mois. À partir de 55 ans : 27 mois. La durée effective correspond à la durée des droits affiliation."},
      {q:"Comment aborder la question 'Où vous voyez-vous dans 5 ans ?' quand on revient de chômage ?",opts:["Dire que vous préférez vous concentrer sur le présent pour l'instant","Présenter un projet professionnel cohérent avec le poste visé","Insister surtout sur votre besoin de stabilité après cette période","Répondre que cela dépendra surtout des opportunités qui se présenteront"],ans:1,expl:"Montrez un projet réaliste et aligné avec le poste : 'Développer mon expertise en X, prendre des responsabilités dans Y.' Cela rassure le recruteur sur votre motivation à long terme — une réponse centrée uniquement sur la stabilité ou l'absence de plan renforce au contraire l'inquiétude liée à la période de chômage."},
      {q:"Peut-on reprendre ses droits ARE si on retrouve un emploi puis le perd à nouveau ?",opts:["Non, les droits sont perdus","Oui, on reprend les droits restants (rechargement)","Oui, mais on recommence à zéro","Seulement si on a travaillé moins de 6 mois"],ans:1,expl:"Le mécanisme de rechargement permet de reprendre les droits ARE non consommés après une reprise d'activité. Si vous avez travaillé assez pour ouvrir de nouveaux droits, France Travail calcule le plus favorable."},
      {q:"Lors d'un entretien, que répondre à 'Avez-vous d'autres processus en cours ?' ",opts:["Dire que non, pour ne pas donner l'impression de comparer les offres","Dire oui si c'est vrai, sans détailler excessivement","Détailler précisément chaque entreprise et le stade de chaque processus","Répondre que vous préférez ne pas en parler par discrétion"],ans:1,expl:"Soyez honnête : 'J'ai quelques processus en cours, votre poste est ma priorité pour ces raisons...' Cela montre que vous êtes demandé et crée une légère urgence sans paraître désespéré — sans pour autant entrer dans le détail de chaque candidature, ce qui n'apporte rien et peut sembler maladroit."},
      {q:"Quelle est la différence entre licenciement économique et licenciement pour motif personnel ?",opts:["Il n'y a aucune différence légale","Le motif économique est lié à l'entreprise, le personnel à l'individu","Le motif économique donne moins de droits","Le motif personnel ouvre plus de droits ARE"],ans:1,expl:"Licenciement économique : suppression de poste, restructuration — lié à l'entreprise. Licenciement personnel : faute, inaptitude, insuffisance — lié au salarié. Tous deux ouvrent des droits ARE si les conditions d'affiliation sont remplies."},
      {q:"Comment préparer efficacement les 48h avant un entretien ?",opts:["Réviser uniquement le site internet de l'entreprise en détail","Étudier l'entreprise, préparer ses réponses STAR, soigner sa tenue","Se reposer entièrement et improviser le jour J","Préparer une longue présentation écrite à lire pendant l'entretien"],ans:1,expl:"Checklist 48h : site + actualités de l'entreprise, offre d'emploi relue, 3-4 réponses STAR préparées, questions à poser, tenue choisie, trajet vérifié, portfolio ou book prêt. Se limiter au site sans préparer ses réponses, ou improviser totalement, laisse une grande partie du travail de préparation de côté."},
      {q:"Quelle est la meilleure façon de relancer après un entretien sans paraître insistant ?",opts:["Appeler chaque jour","Envoyer un email de remerciement sous 24h, puis relancer après 10-15j","Ne jamais relancer","Envoyer un courrier recommandé"],ans:1,expl:"Email de remerciement sous 24h : bref, personnalisé, rappelant votre motivation. Si pas de réponse après 10-15 jours, une relance courte et professionnelle est bienvenue. Au-delà de 2 relances sans réponse, passez à autre chose."},
      {q:"Qu'est-ce que le RSA et peut-on le cumuler avec l'ARE ?",opts:["Oui, toujours et sans plafond","Non, les deux allocations sont incompatibles","Oui, mais seulement si l'ARE est inférieure au montant du RSA socle","Oui, mais uniquement pendant 3 mois"],ans:2,expl:"Le RSA et l'ARE ne se cumulent généralement pas. Si votre ARE est inférieure au montant du RSA, la CAF peut compléter la différence. En fin de droits ARE, vous pouvez basculer sur le RSA si vos ressources le permettent. Déclarez toujours vos situations aux deux organismes."},
      {q:"Comment utiliser LinkedIn efficacement quand on cherche un emploi ?",opts:["Envoyer des invitations en masse à tous les recruteurs visibles","Optimiser son titre, sa bannière, son résumé et activer 'Open to Work' discrètement","Republier systématiquement les offres d'emploi qui vous intéressent","Mettre à jour sa photo de profil chaque semaine pour rester visible"],ans:1,expl:"Stratégie LinkedIn : titre = poste cible + valeur clé, résumé = pitch de 3 lignes orienté résultats, expériences avec bullets chiffrés, compétences validées par le réseau. Activez '#OpenToWork' visible recruteurs seulement. Publiez 1-2x/semaine sur votre expertise pour rester visible — l'envoi massif d'invitations ou le simple partage d'offres n'a que peu d'impact sur votre visibilité réelle."},
      {q:"Quelle est la différence entre une candidature spontanée et une réponse à une offre ?",opts:["Aucune, la démarche est identique","La candidature spontanée cible un besoin non exprimé, la réponse à offre répond à un besoin déclaré","La candidature spontanée est toujours moins efficace","La réponse à offre est réservée aux cadres"],ans:1,expl:"Candidature spontanée : vous identifiez une entreprise, ses enjeux, et proposez votre valeur sans offre publiée — fort impact si bien ciblée. Réponse à offre : vous répondez à un besoin déclaré — concurrence forte. En combinant les deux, vous couvrez 100% du marché."},
      {q:"Comment structurer un pitch de présentation de 2 minutes pour un entretien de retour à l'emploi ?",opts:["Parcours chronologique complet","Qui je suis → ce que j'apporte → pourquoi ce poste maintenant","Liste de compétences techniques","Commencer par ses défauts pour montrer l'humilité"],ans:1,expl:"Structure idéale : 1) Identité professionnelle (rôle, secteur, nb d'années) 2) Valeur ajoutée (compétences clés + 1 réussite chiffrée) 3) Transition positive (pourquoi cette recherche, ce secteur, cet employeur). Répétez à voix haute — 2 minutes max."},
      {q:"Comment gérer psychologiquement une longue période de recherche d'emploi ?",opts:["Arrêter de chercher pour décompresser","Maintenir une routine, se fixer des objectifs hebdomadaires et s'appuyer sur un réseau de soutien","Se concentrer uniquement sur les candidatures online","Accepter n'importe quel poste pour mettre fin à l'incertitude"],ans:1,expl:"La recherche d'emploi longue peut épuiser. Conseils prouvés : routine quotidienne structurée, objectifs mesurables (5 candidatures/semaine, 2 contacts réseau/semaine), activité physique, groupes de job-seekers. La résilience se construit — cherchez du soutien professionnel si besoin."},
      {q:"Quand faut-il mentionner sa situation de demandeur d'emploi à un recruteur ?",opts:["Jamais, c'est stigmatisant","Seulement si on est demandeur depuis plus de 12 mois","Seulement si le recruteur pose la question directement","Toujours, dès le premier contact"],ans:3,expl:"Être en recherche d'emploi n'est pas une honte. La plupart des recruteurs le comprennent. Soyez transparent sur votre situation — cela évite les malentendus sur votre disponibilité. Préparez votre narrative positive : 'Je prends le temps de trouver le bon poste plutôt que le premier venu.'"},
      {q:"Qu'est-ce qu'un bilan de compétences et comment le financer quand on est demandeur d'emploi ?",opts:["C'est réservé aux salariés uniquement","C'est finançable via le CPF, l'AIF de France Travail ou Transition Pro","C'est une formation diplômante","C'est gratuit automatiquement"],ans:1,expl:"Un bilan de compétences (max 24h) analyse vos aptitudes et définit un projet professionnel. Pour les demandeurs d'emploi : CPF utilisable, AIF de France Travail si CPF insuffisant, parfois pris en charge directement par France Travail si lié à votre projet de retour à l'emploi."},
      {q:"Comment évaluer si une offre d'emploi est une arnaque ou un poste réel ?",opts:["Se fier au fait que l'offre soit publiée sur un site connu","Vérifier l'entreprise sur LinkedIn, societe.com et refuser toute demande d'argent ou de données personnelles","Juger sur la cohérence du salaire proposé par rapport au poste","Privilégier les offres avec un processus de recrutement très rapide"],ans:1,expl:"Signaux d'alerte : offre vague sans nom d'entreprise, promesse de salaire irréaliste, demande d'argent ou de documents d'identité, processus 100% par SMS, email en @gmail. Vérifiez : société sur Infogreffe/societe.com, profil LinkedIn de l'employeur, offre aussi sur le site officiel — la présence sur un site connu ou un salaire cohérent ne suffisent pas à garantir la fiabilité d'une offre."},
      {q:"Quelle est la meilleure stratégie pour obtenir des entretiens rapidement ?",opts:["Postuler à 200 offres par semaine sans personnalisation","Cibler 5-10 offres pertinentes avec candidatures personnalisées + activation du réseau","Se concentrer uniquement sur les jobboards","Attendre que les recruteurs vous contactent sur LinkedIn"],ans:1,expl:"Qualité > quantité. Stratégie optimale : 5-10 candidatures ciblées/semaine avec CV + LM personnalisés + réseau activé en parallèle. Le réseau génère 60-70% des recrutements (postes non publiés). Combinez : candidatures directes + LinkedIn + réseau + salons emploi."},
      {q:"Qu'est-ce que le Pass IAE et à qui s'adresse-t-il ?",opts:["Un abonnement de transport pour les demandeurs d'emploi","Un dispositif d'insertion permettant d'accéder à des structures d'insertion par l'activité économique","Une aide au logement pour les chômeurs","Un crédit formation réservé aux moins de 26 ans"],ans:1,expl:"L'Insertion par l'Activité Économique (IAE) permet aux personnes éloignées de l'emploi (chômage long, RSA, handicap...) de retrouver une activité via des SIAE (ESAT, association d'insertion, entreprise adaptée). Le Pass IAE est le mécanisme d'entrée dans ces structures, financé par France Travail."}
    ],
    reconversion:[
      {q:"Qu'est-ce qu'un bilan de compétences ?",opts:["Un entretien annuel d'évaluation","Un dispositif d'analyse de compétences et d'élaboration de projet professionnel","Un test de personnalité obligatoire","Une formation certifiante de courte durée"],ans:1,expl:"Le bilan de compétences (max 24h sur 3 mois) permet d'analyser vos compétences, aptitudes et motivations pour définir un projet professionnel ou de formation. Finançable via le CPF, réalisé par un organisme agréé."},
      {q:"Comment justifier une reconversion lors d'un entretien ?",opts:["Insister sur les limites de votre ancien métier pour expliquer votre départ","Présenter un récit cohérent : déclic, analyse, projet concret","Mettre en avant surtout l'aspect financier de ce changement","Dire que cette nouvelle voie vous est venue presque par hasard"],ans:1,expl:"Le recruteur veut comprendre votre logique, pas votre biographie. Structurez : 'Après X années en Y, j'ai réalisé que Z me manquait. J'ai suivi une formation, réalisé des projets pratiques, je suis maintenant prêt.' Cohérence + preuves concrètes — plutôt qu'un argument centré sur l'argent, le hasard, ou la critique de l'ancien métier."},
      {q:"Le CPF (Compte Personnel de Formation) peut-il financer une reconversion ?",opts:["Non, uniquement des formations courtes","Oui, y compris des formations longues qualifiantes","Oui, mais seulement si on est en emploi","Oui, mais uniquement pour les moins de 45 ans"],ans:1,expl:"Le CPF finance formations certifiantes, titres professionnels, bilans de compétences et VAE. Pour une reconversion complète, il peut être complété par la Transition Pro (CPF de transition), POEC, ou l'AIF de France Travail."},
      {q:"Comment valoriser des compétences transverses lors d'un entretien dans un nouveau domaine ?",opts:["Ne pas en parler pour ne pas sembler novice","Les relier explicitement aux besoins du nouveau poste","Les lister sans contexte","Les comparer aux compétences des candidats seniors"],ans:1,expl:"Chaque compétence transverse a sa traduction : 'En gestion de projet, j'ai développé X qui s'applique directement à Y.' Faites le pont vous-même — ne laissez pas le recruteur deviner. Preuves concrètes obligatoires."},
      {q:"Qu'est-ce que la VAE (Validation des Acquis de l'Expérience) ?",opts:["Un examen pour valider une formation","Un dispositif pour obtenir un diplôme via l'expérience professionnelle","Une aide financière pour se former","Un contrat d'apprentissage pour adultes"],ans:1,expl:"La VAE permet d'obtenir tout ou partie d'un diplôme (du CAP au Master) en faisant reconnaître votre expérience professionnelle. Processus : recevabilité > dossier de preuves > jury. Financée via CPF ou employeur."},
      {q:"Comment répondre à 'Vous n'avez pas d'expérience dans ce domaine, pourquoi vous choisir ?' ",opts:["Reconnaître la faiblesse et se taire","Valoriser la formation, les projets pratiques, la motivation et la transférabilité","Comparer aux candidats juniors du domaine","Promettre d'apprendre rapidement sans preuve"],ans:1,expl:"Répondez avec des preuves : 'J'ai suivi une formation X (certificat), réalisé un projet Y, et mes compétences en Z (ancienne carrière) sont directement utiles pour...' Compensez le manque d'expérience par de la démonstration concrète."},
      {q:"Quel est le rôle de Transition Pro (ex-FONGECIF) dans une reconversion ?",opts:["Financer des formations courtes de perfectionnement","Financer une formation longue en cours d'emploi (CPF de transition)","Accompagner les demandeurs d'emploi uniquement","Financer les bilans de compétences uniquement"],ans:1,expl:"Transition Pro finance le CPF de transition professionnelle : une formation longue suivie pendant le temps de travail, avec maintien de salaire partiel ou total. Le salarié peut ainsi se reconvertir sans perdre son emploi immédiatement."},
      {q:"Comment structurer son récit de reconversion en 2 minutes ?",opts:["Chronologiquement depuis l'enfance","Déclic → Analyse → Action → Résultat → Projet","Liste des formations suivies","Points forts dans l'ancienne carrière uniquement"],ans:1,expl:"Structure en 4 temps : Déclic (pourquoi changer) > Analyse (réflexion et bilan) > Action (formation, projets, network) > Projection (objectif clair lié au poste). C'est un pitch, pas une confession."},
      {q:"Peut-on démissionner et toucher le chômage pour se reconvertir ?",opts:["Non, jamais","Oui, dans le cadre d'un projet de reconversion reconnu par France Travail","Oui, automatiquement après démission","Non, sauf si le projet est validé par un avocat"],ans:1,expl:"Depuis 2019, une démission pour reconversion peut ouvrir des droits ARE si le projet est jugé 'réel et sérieux' par une commission paritaire régionale après 5 ans d'ancienneté. Dossier à monter avec preuves de formation, financement, viabilité."},
      {q:"Qu'est-ce que le POEC (Préparation Opérationnelle à l'Emploi Collective) ?",opts:["Un stage en entreprise rémunéré","Une formation courte pour acquérir des compétences demandées par les employeurs","Un contrat aidé pour les reconversions","Un bilan de compétences collectif"],ans:1,expl:"Le POEC est une formation courte (max 400h) organisée par France Travail pour des demandeurs d'emploi, à la demande d'employeurs en besoin de recrutement. Elle prépare aux métiers cibles tout en étant indemnisée."},
      {q:"Comment aborder la question 'Êtes-vous prêt à accepter un salaire inférieur ?' lors d'une reconversion ?",opts:["Dire oui sans condition","Dire non catégoriquement","Montrer que vous avez étudié le marché et proposer une fourchette réaliste","Esquiver la question"],ans:2,expl:"Soyez préparé : connaissez la fourchette du poste dans ce nouveau secteur. Répondez : 'J'ai ajusté mes attentes au marché du domaine et je suis à l'aise avec une rémunération entre X et Y.' Montrez du réalisme, pas de la résignation."},
      {q:"Quel réseau professionnel est le plus utile lors d'une reconversion ?",opts:["Uniquement votre réseau historique","LinkedIn + associations professionnelles du nouveau secteur + anciens étudiants des formations suivies","Uniquement les jobboards généralistes","Les réseaux sociaux personnels"],ans:1,expl:"Combinez : LinkedIn (personal branding + connexions sectorielles), associations professionnelles (syndicats, clubs métiers), anciens de votre formation. Le réseau dans le nouveau domaine vaut plus que 100 CV envoyés à froid."},
      {q:"Quelle est la différence entre formation qualifiante et formation certifiante ?",opts:["Elles sont identiques","La certifiante donne un titre/diplôme reconnu, la qualifiante améliore des compétences sans certification officielle","La qualifiante donne un diplôme d'État","La certifiante est uniquement finançable par CPF"],ans:1,expl:"Formation certifiante → titre inscrit au RNCP ou RS, reconnu officiellement sur le marché. Formation qualifiante → développe des compétences mais sans certification d'État. Pour une reconversion, privilégiez le certifiant pour faciliter la reconnaissance."},
      {q:"Comment prouver sa motivation dans un nouveau secteur sans expérience ?",opts:["Dire que vous avez toujours aimé ce domaine","Projets personnels, formations, contributions open source, bénévolat, portfolio","Citer des livres lus sur le sujet","Mentionner un ami qui travaille dans le secteur"],ans:1,expl:"La preuve prime sur la déclaration. Portfolio, projets GitHub, missions bénévoles, contributions, mini-missions freelance, certifications... Montrez que vous avez déjà commencé, pas que vous voulez commencer."},
      {q:"Qu'est-ce que l'AIF (Aide Individuelle à la Formation) de France Travail ?",opts:["Une prime de reconversion","Un financement de formation quand le CPF est insuffisant","Un contrat de professionnalisation","Une aide au déplacement pour les formations"],ans:1,expl:"L'AIF complète le financement d'une formation quand le CPF et autres aides sont insuffisants. Accordée par France Travail aux demandeurs d'emploi dont la formation est liée à un projet d'embauche ou de reconversion validé."},
      {q:"Comment identifier si un nouveau secteur vous correspond vraiment avant de vous reconvertir ?",opts:["Lire 2-3 articles sur le secteur","Réaliser des entretiens avec des professionnels du secteur, des missions test et du bénévolat","Regarder des vidéos YouTube","Chercher des témoignages sur les réseaux sociaux"],ans:1,expl:"Avant de vous lancer : informational interviews (30min avec 5-10 professionnels du secteur), shadow day (observer un métier), missions bénévoles ou freelance, formations courtes de découverte. Testez avant de vous engager financièrement dans une longue formation."},
      {q:"Qu'est-ce que le contrat de professionnalisation et à qui s'adresse-t-il ?",opts:["Uniquement aux jeunes de moins de 26 ans","Aux jeunes de 16-25 ans ET aux demandeurs d'emploi de 26 ans et plus","Uniquement aux demandeurs d'emploi","Aux salariés souhaitant se perfectionner"],ans:1,expl:"Le contrat de professionnalisation est ouvert aux jeunes (16-25 ans) et aux demandeurs d'emploi de 26 ans et plus. C'est un contrat en alternance (CDD ou CDI) combinant travail et formation certifiante. Rémunération : % du SMIC selon l'âge et le niveau de qualification."},
      {q:"Comment convaincre un employeur quand on change complètement de secteur ?",opts:["Minimiser son passé pour se présenter comme un junior","Montrer la complémentarité de son expérience passée avec les besoins du poste","Accepter un salaire très bas pour compenser le manque d'expérience","Se concentrer sur les entreprises qui ne connaissent pas son ancien secteur"],ans:1,expl:"Votre expérience passée est un atout — pas un handicap. Identifiez les compétences transférables (gestion de projet, relation client, analyse...) et reliez-les aux enjeux du nouveau poste. Préparez 3 exemples concrets qui prouvent votre valeur dans le nouveau contexte."},
      {q:"Quelle est la durée réaliste pour une reconversion professionnelle complète ?",opts:["3-6 semaines avec une formation intensive","6 mois minimum pour une reconversion vers un poste qualifié","C'est immédiat avec le bon diplôme","10 ans en moyenne"],ans:1,expl:"Une reconversion sérieuse prend du temps. Comptez : 3-6 mois pour le bilan + formation courte, 1-2 ans pour une formation longue qualifiante, + 3-6 mois de recherche active post-formation. Budget temps et argent en conséquence. Les formations courtes peuvent ouvrir des portes mais rarement remplacer un diplôme reconnu."},
      {q:"Comment gérer la baisse de salaire lors d'une reconversion ?",opts:["Refuser toute baisse de salaire","Prévoir un budget de transition et négocier sa montée en charge","Partir uniquement si le nouveau salaire est au moins égal","Attendre d'avoir assez d'économies pour vivre 5 ans sans revenu"],ans:1,expl:"La baisse de salaire est souvent temporaire. Préparez-vous : calculez votre budget minimal viable, identifiez vos économies de transition (3-12 mois de charges fixes), et négociez des revalorisations rapides (6 mois, 1 an). Montrez un plan de montée en compétences pour rassurer l'employeur sur votre trajectoire."},
      {q:"Qu'est-ce que la méthode du 'pivot' dans une reconversion ?",opts:["Changer radicalement et immédiatement de secteur","Évoluer progressivement en utilisant ses compétences actuelles comme pont vers le nouveau métier","Se spécialiser encore plus dans son domaine actuel","Créer son entreprise pour éviter de chercher un emploi"],ans:1,expl:"Le pivot consiste à utiliser votre expertise actuelle comme levier d'entrée dans un nouveau secteur, puis à élargir progressivement. Exemple : un commercial en pharma → commercial en MedTech → chef de produit MedTech. Chaque étape s'appuie sur la précédente. Moins risqué qu'un saut dans le vide."},
      {q:"Comment aborder un trou de CV dû à une période de formation de reconversion ?",opts:["Le cacher","L'expliquer positivement en valorisant la démarche proactive et les compétences acquises","Inventer un poste fictif","Réduire les dates des autres postes pour combler"],ans:1,expl:"Une formation de reconversion est une décision courageuse — valorisez-la. Sur le CV : 'Formation [nom] — [organisme] — [dates]'. En entretien : 'J'ai pris le temps d'une reconversion sérieuse plutôt que de rebondir dans le premier poste venu.' Montrez le projet, les acquis, la cohérence."},
      {q:"Qu'est-ce que le 'T-shape profile' et pourquoi est-ce utile en reconversion ?",opts:["Un profil de CV en forme de T pour se démarquer","Un profil combinant expertise profonde dans un domaine et compétences larges dans plusieurs autres","Un format d'entretien américain","Un type de contrat spécial pour les reconvertis"],ans:1,expl:"Le T-shape = expertise verticale (votre domaine de départ) + compétences horizontales (gestion, communication, digital, data...). En reconversion, vous pouvez vous positionner comme 'expert [ancien domaine] avec compétences [nouveau domaine]' — une combinaison rare et valorisable."},
      {q:"Comment s'assurer que sa formation de reconversion sera reconnue par les employeurs ?",opts:["Choisir la formation la moins chère","Vérifier l'inscription au RNCP, la reconnaissance professionnelle et les débouchés réels","Se baser uniquement sur les témoignages en ligne","Choisir la formation la plus longue"],ans:1,expl:"Critères clés : formation inscrite au RNCP (Répertoire National des Certifications Professionnelles), taux de placement > 70%, partenariats avec des entreprises du secteur, formateurs en activité professionnelle. Demandez aussi la liste des diplômés et contactez-en 2-3 pour avoir un retour terrain."},
      {q:"Qu'est-ce que le mentorat et comment y accéder dans le cadre d'une reconversion ?",opts:["C'est réservé aux entrepreneurs","Un accompagnement par un professionnel expérimenté du secteur cible, accessible via des associations, réseaux LinkedIn ou plateformes dédiées","Un dispositif uniquement finançable via CPF","Un programme réservé aux moins de 30 ans"],ans:1,expl:"Le mentorat consiste à être accompagné par un professionnel expérimenté du secteur visé. Accès : Association 60000 Rebonds, Réseau Entreprendre, MentorCity, réseaux LinkedIn ciblés, anciens de votre formation. Un bon mentor ouvre des portes et accélère l'intégration dans le nouveau secteur — souvent plus efficacement qu'une formation."}
    ],
    freelance:[
      {q:"Comment fixer son Taux Journalier Moyen (TJM) en freelance ?",opts:["Prendre le TJM du marché divisé par 2","Calculer : salaire visé annuel ÷ (220 jours × taux de charge) + marge","Demander à ses clients directement","Copier le TJM d'un concurrent"],ans:1,expl:"Formule de base : (Salaire net annuel visé × 1.5 [charges]) ÷ (220j - 20j vacances - 20j non facturés) ≈ 180j facturables. Ajustez à la hausse selon votre expertise, rareté, et valeur apportée. Benchmarkez sur Crème de la Crème, Malt, LinkedIn."},
      {q:"Lors d'un entretien mission, comment présenter son portfolio ?",opts:["Montrer tous ses projets sans filtre","Sélectionner 3-4 projets pertinents avec contexte, actions et résultats chiffrés","Envoyer un fichier ZIP après l'entretien","Parler uniquement des projets récents"],ans:1,expl:"Qualité > quantité. Sélectionnez les projets les plus pertinents pour ce client. Structure : problème > approche > résultat (ROI, KPIs, délais). Ayez des case studies prêts à présenter visuellement. Le portfolio est votre preuve, pas votre liste."},
      {q:"Un client vous demande de travailler en exclusivité. Que vérifier ?",opts:["Rien, c'est une demande normale","La clause de non-concurrence, la durée, et la compensation financière pour l'exclusivité","Uniquement la durée","Uniquement si d'autres clients sont concernés"],ans:1,expl:"L'exclusivité doit être compensée financièrement (majoration du TJM) et limitée dans le temps et le domaine. Vérifiez qu'elle ne remet pas en cause votre statut d'indépendant (critères de requalification en salarié : lien de subordination, exclusivité totale)."},
      {q:"Quelle est la différence entre auto-entrepreneur et SASU pour un freelance ?",opts:["Aucune différence pratique","Auto-entrepreneur : simplicité, plafond CA, charges sur CA. SASU : structuré, pas de plafond, optimisation possible","SASU est uniquement pour les sociétés de plus de 10 personnes","Auto-entrepreneur est uniquement pour les artisans"],ans:1,expl:"Auto-entrepreneur : idéal pour débuter, plafond CA 77 700€ (services), charges proportionnelles au CA. SASU : pas de plafond, optimisation rémunération/dividendes, mais comptabilité obligatoire. À partir de 50-60k€ de CA, la SASU devient souvent plus avantageuse."},
      {q:"Comment répondre à 'Pourquoi devrions-nous vous choisir plutôt qu'une agence ?' ?",opts:["Critiquer les agences","Valoriser réactivité, expertise pointue, interlocuteur unique, coût optimisé","Dire que vous êtes moins cher","Promettre d'être disponible 7j/7"],ans:1,expl:"Freelance vs agence : interlocuteur unique (pas de game téléphone), expertise directe sans markup, agilité, investissement personnel sur le projet. Chiffrez si possible : 'Sur ce type de mission, un client a économisé X% tout en réduisant les délais de Y%."},
      {q:"Qu'est-ce que la clause de portage de responsabilité dans un contrat mission ?",opts:["Une clause qui vous protège de tous risques","Une clause qui vous transfère la responsabilité des résultats du projet","Une assurance professionnelle incluse","Une clause de confidentialité renforcée"],ans:1,expl:"Attention à ces clauses qui font de vous le responsable des résultats finaux, même si vous n'avez contrôle que sur les livrables. Faites distinguer obligation de moyens (vous faites votre meilleur travail) de résultats (résultat garanti). Négociez clairement."},
      {q:"Un prospect négocie votre TJM à la baisse. Quelle est la meilleure réponse ?",opts:["Accepter systématiquement pour avoir le contrat","Refuser catégoriquement","Proposer de réduire le scope ou la durée plutôt que le taux","Demander un acompte plus élevé"],ans:2,expl:"Ne bradez pas votre TJM — cela établit un mauvais précédent. Alternative : 'Mon TJM reflète la valeur que j'apporte. Si le budget est contraint, nous pouvons réduire le périmètre ou prioriser les livrables les plus impactants.' Donnez le choix."},
      {q:"Quelle est la durée légale minimale entre commande et début de mission pour éviter la requalification en salariat ?",opts:["24h","48h","Il n'y a pas de durée minimale légale, c'est la substance qui compte","1 semaine"],ans:2,expl:"Il n'y a pas de durée minimale légale. Ce qui compte pour éviter la requalification : absence de lien de subordination, liberté d'organisation, multi-clients, outils propres, facturation. Ce sont les conditions réelles de travail qui déterminent le statut, pas la durée."},
      {q:"Comment gérer un client qui refuse de payer une facture ?",opts:["Accepter un paiement partiel sans recours","Envoyer une mise en demeure, puis saisir le tribunal compétent","Attendre 6 mois puis abandonner","Publier sur les réseaux sociaux"],ans:1,expl:"Procédure : 1) Relance email + téléphone. 2) Lettre de mise en demeure (LRAR). 3) Injonction de payer (tribunal compétent selon montant). 4) Médiation ou avocat si nécessaire. Vos CGV et bon de commande signé sont vos meilleures protections."},
      {q:"Que sont les CGV (Conditions Générales de Vente) pour un freelance ?",opts:["Un document optionnel","Un document légalement obligatoire encadrant vos prestations, délais, paiements, litiges","Un document uniquement pour les grandes entreprises","Un document remplacé par le contrat de mission"],ans:1,expl:"Les CGV sont obligatoires (Code de commerce L441-1) et s'imposent au client dès communication. Elles encadrent : délais de paiement, pénalités de retard, droits de propriété intellectuelle, clause de réserve de propriété, responsabilité. Sans CGV, vous êtes exposé."},
      {q:"Comment présenter ses tarifs lors d'un premier appel prospect ?",opts:["Donner un prix précis immédiatement","Qualifier d'abord les besoins, puis communiquer une fourchette","Ne jamais parler d'argent au premier appel","Envoyer un devis sans appel préalable"],ans:1,expl:"Avant de parler prix : découvrez le scope, les délais, les enjeux, le budget indicatif. Puis : 'Pour ce type de mission, ma fourchette est entre X et Y selon le périmètre final. On affine ça dans le devis.' Qualifier avant chiffrer = vous valorisez."},
      {q:"Quel est l'avantage d'être référencé sur une plateforme freelance (Malt, Crème de la Crème) ?",opts:["Aucun, les clients trouvent toujours directement","Visibilité, flux entrant de clients, réduction du temps prospection","Tarifs imposés par la plateforme","Exclusivité avec la plateforme"],ans:1,expl:"Les plateformes apportent visibilité et flux entrant de leads. En contrepartie : commission (souvent 10-15%), moins de liberté tarifaire. Stratégie : utilisez les plateformes pour démarrer, puis construisez votre réseau direct pour réduire la dépendance et la commission."},
      {q:"Comment gérer la question 'Avez-vous des références clients ?' quand on débute ?",opts:["Mentir sur des clients fictifs","Proposer des projets personnels, contributions open source, ou des missions à tarif réduit pour démarrer","Refuser de répondre","Dire que vous venez de commencer sans offrir d'alternative"],ans:1,expl:"Compensez : projets personnels documentés, contributions open source, missions associatives ou à tarif réduit pour des PME, cas d'école détaillés de votre ancienne carrière. Proposez une mission de test ou un audit gratuit si pertinent. Montrez votre approche."},
      {q:"Qu'est-ce que la présomption de salariat et pourquoi un freelance doit-il y faire attention ?",opts:["C'est un avantage fiscal pour les freelances","C'est un risque de requalification du contrat en CDI avec redressement URSSAF","C'est une protection sociale renforcée","C'est un statut intermédiaire choisi"],ans:1,expl:"Si vous travaillez exclusivement pour un client, sous ses directives, avec ses outils, sans liberté d'organisation → risque de requalification en salarié. Conséquences : redressement URSSAF, rappel de cotisations, pénalités. Protections : multi-clients, liberté d'organisation, outils propres."},
      {q:"Comment aborder la propriété intellectuelle dans un contrat de mission ?",opts:["Ne pas en parler, c'est automatiquement cédé","Stipuler clairement ce qui est cédé, à quel usage, et la contrepartie de la cession","Tout céder systématiquement","Garder tous les droits sans exception"],ans:1,expl:"Par défaut, vous restez propriétaire de votre création. La cession doit être explicite : étendue (droits de reproduction, modification, commercialisation), durée, territoire, usage exclusif ou non. La cession étendue se facture. Mentionnez-le dans vos CGV et contrat."},
      {q:"Comment gérer un client qui demande des modifications hors scope en cours de mission ?",opts:["Accepter toutes les modifications pour garder le client","Refuser catégoriquement toute modification","Documenter le scope initial et proposer un avenant pour les modifications","Arrêter la mission immédiatement"],ans:2,expl:"Le scope creep est la principale cause de sous-facturation. Répondez : 'Cette demande dépasse le périmètre initial. Je peux l'intégrer via un avenant — voici l'estimation.' Documentez toutes les demandes par email. Un bon contrat initial avec périmètre précis est votre meilleure protection."},
      {q:"Quelle est la meilleure façon de fidéliser ses clients en freelance ?",opts:["Baisser ses tarifs régulièrement","Livrer en avance, communiquer proactivement et proposer de la valeur au-delà du livrable","Envoyer des newsletters chaque semaine","Être disponible 24h/24"],ans:1,expl:"La fidélisation client passe par : livraisons dans les délais (ou en avance), communication transparente sur les obstacles, suggestions d'améliorations non demandées, rapport de bilan post-mission. Un client fidèle vaut 3 clients nouveaux — il réduit votre coût d'acquisition."},
      {q:"Comment structurer un devis freelance professionnel ?",opts:["Envoyer juste un prix total par email","Inclure contexte, livrables détaillés, délais, tarifs, conditions de paiement et clause de révision","Copier un modèle générique","Donner une fourchette verbalement et finaliser après"],ans:1,expl:"Un devis solide comprend : contexte du projet, livrables listés et définis précisément, délais de livraison et d'itération, tarif et modalités de paiement (acompte 30-50%, échéances), clause de révisions incluses vs supplémentaires, validité du devis. Utilisez un outil comme Malt, Indy ou un PDF professionnel."},
      {q:"Qu'est-ce que le 'Personal Branding' pour un freelance et pourquoi est-ce crucial ?",opts:["C'est juste une belle photo de profil","C'est votre réputation professionnelle visible en ligne : expertise, valeurs, style, preuves","C'est uniquement pour les influenceurs","C'est réservé aux freelances avec plus de 5 ans d'expérience"],ans:1,expl:"Le personal branding = votre position dans l'esprit des clients potentiels. Il comprend : LinkedIn optimisé, site portfolio, témoignages clients, publications régulières sur votre expertise, prise de parole en events. Un freelance reconnu dans sa niche attire des clients sans prospecter — et peut monter ses tarifs."},
      {q:"Comment gérer la saisonnalité de l'activité freelance (creux et pics) ?",opts:["Paniquer pendant les creux et refuser du travail pendant les pics","Prévoir des revenus récurrents (retainer), un fonds de roulement et des missions longues pour lisser","Baisser les tarifs pendant les creux pour attirer plus de clients","Ne travailler que pendant les pics et s'arrêter le reste du temps"],ans:1,expl:"Gestion de la saisonnalité : 1) Fonds de sécurité = 3-6 mois de charges fixes. 2) Contrats retainer (un client paie X€/mois pour un volume garanti). 3) Mix de missions courtes et longues. 4) Utiliser les creux pour prospecter, se former, créer du contenu. 5) Identifier les cycles de votre secteur et anticiper."},
      {q:"Quel statut choisir pour débuter en freelance avec moins de risques ?",opts:["Créer une SASU dès le début","Commencer en micro-entrepreneur (auto-entrepreneur) pour tester avant de structurer","Rester salarié et refuser les missions freelance","Créer une EURL immédiatement"],ans:1,expl:"Le statut micro-entrepreneur (auto-entrepreneur) est idéal pour démarrer : création en ligne en 24h, aucune comptabilité complexe, charges uniquement sur le CA réalisé. Limite : plafond CA (77 700€ pour les services) et pas d'optimisation fiscale. Une fois régulier, évaluez EURL ou SASU avec un expert-comptable."},
      {q:"Comment demander une augmentation de TJM à un client existant ?",opts:["Envoyer un email court avec juste le nouveau tarif","Attendre que le client propose spontanément une augmentation","Préparer un argumentaire basé sur la valeur délivrée et prévenir 2-3 mois à l'avance","Menacer de partir chez un concurrent"],ans:2,expl:"Stratégie d'augmentation de TJM : 1) Anticipez (2-3 mois avant le renouvellement). 2) Documentez la valeur créée (résultats, économies générées). 3) Benchmarkez votre marché. 4) Formulez : 'Pour le prochain cycle, mon tarif évolue à X€. Voici pourquoi.' Une augmentation bien préparée est rarement refusée."},
      {q:"Qu'est-ce que la clause de non-sollicitation dans un contrat freelance ?",opts:["Une clause qui vous interdit de travailler pour des concurrents","Une clause qui interdit au client de recruter vos salariés ou sous-traitants","Une clause de confidentialité sur les projets","Une clause qui garantit un volume minimum de travail"],ans:1,expl:"La clause de non-sollicitation empêche votre client de recruter directement vos collaborateurs ou sous-traitants pendant et après la mission. À distinguer de la non-concurrence (qui vous restreint vous). Limitez-la dans le temps (6-12 mois max) et en périmètre lors des négociations."},
      {q:"Comment évaluer si une mission freelance est rentable avant d'accepter ?",opts:["Accepter toutes les missions pour ne pas perdre de revenus","Calculer le taux horaire réel après déduction du temps de gestion et des charges","Se fier uniquement au TJM annoncé","Accepter si le client est connu, refuser sinon"],ans:1,expl:"TJM affiché ≠ rentabilité réelle. Déduisez : temps de réunion, reporting, révisions non facturés + charges URSSAF + frais pro (logiciels, déplacements). Une mission à 450€/j avec 40% de temps non facturable revient à 270€/j effectif. Calculez votre taux horaire réel et comparez au marché."},
      {q:"Comment construire une proposition de valeur différenciante en freelance ?",opts:["Se positionner comme généraliste pour toucher plus de clients","Choisir une niche précise et articuler sa valeur en termes de résultats clients concrets","Copier le positionnement du freelance le mieux noté sur Malt","Proposer les tarifs les plus bas pour attirer rapidement"],ans:1,expl:"La niche est votre alliée, pas votre ennemi. 'Développeur React pour startups B2B SaaS' attire mieux que 'développeur web'. Articulation de valeur : quel problème vous résolvez, pour qui, avec quelle preuve d'impact (ex : 'j'aide les startups à passer de 0 à 10k users sans refactor coûteux'). C'est cette précision qui vous sort du lot."}
    ]
  };

// ── Données Simulation (MS_DATA) ──
var MS_DATA = {

  salarie:[
    {
      context:"Bonjour, merci de vous être déplacé(e). Pour commencer, est-ce que vous pouvez me parler de vous en 2-3 minutes ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je commence par mon école, mes études, puis mes expériences dans l'ordre chronologique…",
        "Je vais vous présenter mon parcours de façon synthétique : aujourd'hui je suis [rôle], j'ai 5 ans d'expérience en gestion de projet, et ce poste m'intéresse parce que…",
        "Je suis une personne organisée, rigoureuse, j'aime le travail en équipe et j'ai toujours voulu travailler dans une grande entreprise comme Accenture."
      ],
      best:1,
      why:["Réciter son CV chronologiquement est la réponse la plus commune — le recruteur s'ennuie et rate l'essentiel : votre valeur.","✅ Excellent. Structurer en : situation actuelle → compétences clés → motivation ciblée est la méthode PAC. Concis, orienté résultats, et personnalisé pour l'entreprise.","Lister des adjectifs génériques (organisé, rigoureux) sans preuves concrètes ne convainc pas. C'est creux pour un recruteur expérimenté."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Je vois que vous avez quitté votre dernier poste il y a 8 mois. Qu'est-ce qui s'est passé ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Mon manager était très difficile, il y avait beaucoup de tensions dans l'équipe et ça ne correspondait plus à mes valeurs.",
        "J'ai décidé de partir pour prendre du recul et identifier clairement mon prochain cap. J'ai mis ce temps à profit pour [formation/projet], et aujourd'hui je sais exactement ce que je cherche.",
        "Il y a eu des problèmes internes, des réorganisations. Je préfère ne pas trop en parler, c'est du passé."
      ],
      best:1,
      why:["Critiquer son ancien manager est un signal d'alarme immédiat pour tout recruteur. Vous passez pour quelqu'un de difficile — même si c'est vrai.","✅ Parfait. Vous maîtrisez le récit, vous montrez de la maturité et une démarche proactive. La mention d'une action concrète pendant la période rassure.","Éviter de répondre crée de la méfiance. Le recruteur va imaginer le pire. Mieux vaut une réponse neutre et positive."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Quelles sont vos prétentions salariales ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je suis ouvert(e) à la discussion, je m'adapterai à votre grille.",
        "Sur la base de mon expérience et des niveaux du marché pour ce type de poste, je me positionne entre 42 000 et 46 000 € brut annuel.",
        "Mon salaire actuel est de 38 000 €, donc j'espère avoir une augmentation."
      ],
      best:1,
      why:["Dire 'je m'adapterai' vous retire tout pouvoir de négociation. Vous semblez manquer de confiance en votre valeur marché.","✅ Annoncer une fourchette basée sur le marché (pas sur vos besoins) est la stratégie idéale. La fourchette haute donne de la marge, la justification donne de la crédibilité.","Révéler votre salaire actuel vous pénalise : le recruteur peut s'en servir comme plafond. Toujours ancrer sur le marché, pas sur votre historique."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Décrivez-moi une situation où vous avez dû gérer un conflit avec un collègue.",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je n'ai jamais vraiment eu de conflit grave, je m'entends bien avec tout le monde en général.",
        "J'ai eu un désaccord avec un collègue sur les priorités d'un projet. J'ai demandé un échange direct, on a exposé nos points de vue, identifié le vrai problème et proposé une solution à notre manager ensemble.",
        "Une fois un collègue m'a court-circuité devant la direction. Je l'ai recadré clairement pour que ça ne se reproduise pas."
      ],
      best:1,
      why:["Dire qu'il n'y a jamais de conflit n'est pas crédible. Ça donne l'impression que vous évitez les situations difficiles — ou que vous manquez d'introspection.","✅ Parfait exemple STAR : Situation → Action (dialogue direct) → Résultat (solution co-construite). Ça montre maturité, communication et esprit d'équipe.","Parler de 'recadrer un collègue' sonne autoritaire et peut indiquer un manque de gestion relationnelle. Attention au ton."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Avez-vous d'autres entretiens en cours en ce moment ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Non, votre poste est le seul sur lequel je suis en cours.",
        "Oui, j'ai quelques processus en parallèle — votre poste est ma priorité car [raison précise liée à Accenture].",
        "Je préfère garder ça pour moi, c'est une information confidentielle."
      ],
      best:1,
      why:["Dire que vous n'avez pas d'autres processus peut vous affaiblir : le recruteur a moins de pression pour avancer et peut traîner à vous faire une offre.","✅ Être honnête sur les processus parallèles crée une légère urgence et prouve que vous êtes demandé. Justifier pourquoi ce poste est prioritaire rassure sur votre motivation.","Refuser de répondre est perçu comme suspect et fermé. Ça crée une distance inutile."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Où vous voyez-vous dans 3 ans ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Honnêtement, difficile à dire, ça dépend des opportunités qui se présentent.",
        "Dans 3 ans, j'aimerais avoir développé une expertise solide en [domaine lié au poste] et contribuer à des projets plus stratégiques. Si la progression interne le permet, prendre des responsabilités d'équipe m'intéresse.",
        "Idéalement, occuper votre poste ! Je suis ambitieux(se) et j'aime progresser vite."
      ],
      best:1,
      why:["'Ça dépend des opportunités' donne une image de quelqu'un sans cap, sans ambition, sans projet. Ça inquiète sur votre engagement.","✅ Un projet professionnel ancré dans le poste + une ouverture à la progression interne = vous montrez ambition réaliste et alignement. Le recruteur vous projette sur le long terme.","Vouloir 'votre poste dans 3 ans' peut paraître menaçant pour le recruteur ou naïf. Mieux vaut parler d'expertise et de responsabilités que de titres précis."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes en retard de 10 minutes. Comment vous gérez ça ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je ne dis rien et espère que le recruteur n'a pas remarqué.",
        "Je m'excuse brièvement, j'explique la raison sans m'étendre et je recentre immédiatement sur l'entretien.",
        "Je m'excuse profusément pendant 5 minutes et répète que c'est exceptionnel."
      ],
      best:1,
      why:["Ignorer le retard est maladroit — le recruteur l'a remarqué. Ça envoie un signal de manque de conscience professionnelle.","✅ Une excuse brève, honnête et sans sur-explication montre maturité. Recentrer vite sur l'entretien montre que vous savez gérer les imprévus avec sang-froid.","S'excuser en boucle donne l'impression que vous n'êtes pas à l'aise. Une seule excuse claire et concise suffit."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"On vous offre ce poste mais c'est 5% en dessous de vos prétentions. Que faites-vous ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "J'accepte immédiatement pour ne pas risquer de perdre l'offre.",
        "Je remercie, exprime mon enthousiasme pour le poste et demande si une révision est possible après 6 mois ou si d'autres avantages peuvent compenser.",
        "Je refuse immédiatement — mes prétentions sont non négociables."
      ],
      best:1,
      why:["Accepter sans négocier établit un mauvais précédent et vous prive potentiellement de revenus sur plusieurs années. Même un petit écart vaut d'être abordé.","✅ Stratégie optimale : valider votre enthousiasme (vous voulez ce poste), ouvrir une discussion sur la révision à 6 mois ou des compensations (variable, télétravail, formation). Vous montrez maturité et sens de la négociation.","Refuser catégoriquement sans discussion fait rater des opportunités. 5% d'écart peut souvent être compensé autrement."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Parlez-moi d'un échec professionnel et ce que vous en avez appris.",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je n'ai pas vraiment eu d'échec significatif dans ma carrière.",
        "J'ai raté un lancement de projet à cause d'une mauvaise estimation des délais. J'ai appris à systématiser les revues de planning et à communiquer les risques plus tôt. Depuis, aucun retard majeur.",
        "On a eu un projet difficile une fois mais c'était plutôt la faute de l'équipe."
      ],
      best:1,
      why:["Prétendre n'avoir jamais échoué n'est pas crédible. Ça donne l'impression que vous manquez d'introspection ou que vous évitez les défis.","✅ Idéal : un vrai échec + analyse sans excuse + action corrective + résultat amélioré. Vous montrez maturité, résilience et capacité d'apprentissage — des qualités très recherchées.","Rejeter la faute sur l'équipe est un signal rouge immédiat. Le recruteur va anticiper que vous ferez pareil dans leur équipe."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Comment travaillez-vous sous pression et avec des délais serrés ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "J'adore la pression, ça me donne de l'énergie. Je suis toujours à fond.",
        "Je priorise les tâches par urgence et impact, je communique proactivement sur les risques et je découpe les gros livrables en étapes gérables. Je donne un exemple concret si vous le souhaitez.",
        "Je ne suis pas très à l'aise avec la pression, j'ai besoin de conditions calmes pour être efficace."
      ],
      best:1,
      why:["'J'adore la pression' sonne comme un cliché sans substance. Sans exemple ni méthode, c'est vide.","✅ Méthode + offre d'exemple concret = vous montrez que vous gérez vraiment. La priorisation et la communication proactive sont des compétences concrètes et vérifiables.","Dire que vous n'êtes pas à l'aise avec la pression peut être honnête, mais dans un contexte professionnel, ça peut inquiéter sur votre capacité à tenir en période intense."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Pourquoi devrait-on vous choisir plutôt qu'un candidat avec 2 ans d'expérience de plus ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je ne sais pas, à vous de décider.",
        "Mon expérience m'a permis de développer [compétences spécifiques] qui correspondent exactement à [enjeux du poste]. De plus, je suis dans une phase active de montée en compétences — ce qui se traduit par une forte adaptabilité et une motivation au-dessus de la moyenne.",
        "Parce que je suis plus jeune et donc plus dynamique et moins cher."
      ],
      best:1,
      why:["Se décharger sur le recruteur de la décision montre un manque de conviction sur votre propre valeur.","✅ Vous prenez le contrôle : vous reliez votre profil aux enjeux du poste + vous retournez votre soi-disant faiblesse (moins d'expérience) en atout (motivation, adaptabilité, coût d'acquisition du savoir plus récent).","Parler de dynamisme et de prix comme avantages est réducteur et peut sembler désespéré."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Qu'est-ce que vous savez de notre entreprise ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "C'est une grande entreprise de conseil connue. J'ai vu votre offre d'emploi et ça m'a intéressé.",
        "Accenture est le leader mondial du conseil et des services numériques, présent dans 120 pays. J'ai suivi votre récente acquisition dans le cloud et votre engagement vers le net zéro d'ici 2025. Ce qui m'attire particulièrement, c'est votre approche [spécifique au département ciblé].",
        "Je n'ai pas eu le temps de me renseigner en détail, mais je suis prêt à apprendre rapidement."
      ],
      best:1,
      why:["Une réponse vague sur une grande entreprise connue montre que vous n'avez pas préparé. C'est la question la plus prévisible — ne pas y répondre est éliminatoire.","✅ Données factuelles + actualité récente + lien avec le poste ciblé = vous montrez que vous avez préparé ET que vous avez déjà réfléchi à votre contribution.","Dire qu'on n'a pas eu le temps de se renseigner est rédhibitoire. Si vous n'avez pas pu préparer un entretien, pourquoi ferez-vous mieux sur le poste ?"],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Avez-vous des questions pour moi ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Non, tout est clair pour moi.",
        "Oui : quels sont les principaux défis que rencontre l'équipe actuellement ? Et comment se mesure le succès sur ce poste à 6 mois ?",
        "Est-ce qu'il y a un bon restaurant près des bureaux ? Je voudrais savoir pour mes pauses déjeuner."
      ],
      best:1,
      why:["Ne pas avoir de questions signale un manque de curiosité et d'engagement. C'est l'occasion de prouver que vous êtes préparé et sérieux — ne la ratez pas.","✅ Questions orientées sur les enjeux du poste et les critères de succès = vous montrez que vous pensez déjà à votre performance. Ça rassure et ça différencie.","Des questions pratiques (restaurant, parking, horaires) en fin d'entretien sont prématurées et donnent une mauvaise image de vos priorités."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"Comment gérez-vous les désaccords avec votre manager ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je fais toujours ce que mon manager décide sans remettre en question.",
        "Quand je suis en désaccord, je demande un moment d'échange, j'expose mon point de vue avec des faits et j'écoute sa perspective. Si on reste en désaccord, je peux accepter de suivre sa décision tout en notant mon désaccord formellement si l'enjeu est important.",
        "Je ne suis pas quelqu'un qui supporte l'autorité aveugle — je dis ce que je pense quand je pense."
      ],
      best:1,
      why:["Obéir sans jamais remettre en question signale un manque de leadership et d'esprit critique. Le recruteur cherche quelqu'un qui peut apporter de la valeur, pas juste exécuter.","✅ Feedback basé sur les faits + écoute + capacité à accept la décision finale = maturité professionnelle. Le 'désaccord noté formellement' montre que vous savez vous protéger tout en respectant la hiérarchie.","'Je ne supporte pas l'autorité aveugle' peut sonner arrogant. Même si c'est votre valeur, formulez-le avec plus de nuance."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Vous avez postulé à plusieurs entreprises concurrentes. Pourquoi Accenture en priorité ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je postule partout, vous êtes dans ma liste.",
        "Chez Accenture, ce qui m'attire spécifiquement c'est [culture, projet, technologie, marché] qui correspond à [mes compétences et projet]. C'est pourquoi je considère ce poste comme ma priorité dans ma recherche.",
        "Franchement, c'est la première offre qui a répondu — ça joue."
      ],
      best:1,
      why:["Dire que vous postulez 'partout' démotive le recruteur. Pourquoi investir dans quelqu'un qui n'a pas de préférence ?","✅ Vous donnez une raison spécifique et sincère. Le recruteur veut sentir qu'il n'est pas interchangeable. Personnalisez — même si c'est la même logique que pour d'autres entreprises.","Dire que c'est parce qu'ils ont répondu en premier est totalement honnête mais terrible pour votre image."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Quel est votre style de management si vous avez une équipe à gérer ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je suis très directif — je préfère contrôler chaque étape pour éviter les erreurs.",
        "Je m'adapte au niveau de chaque collaborateur : directif au départ pour donner le cadre, puis je délègue progressivement en donnant de l'autonomie. Je maintiens un feedback régulier et je valorise les réussites.",
        "Je laisse totalement libre mon équipe — chacun sait mieux que moi ce qu'il a à faire."
      ],
      best:1,
      why:["Un style uniquement directif génère de la dépendance et étouffe l'initiative. Dans un contexte de compétences fortes, c'est contre-productif.","✅ Le management situationnel (adapter son style au profil du collaborateur) est la référence. Vous montrez maturité, flexibilité et attention aux individus.","Le laisser-faire total peut fonctionner avec des experts très autonomes mais est risqué dans beaucoup de contextes. Sans structure de feedback, vous perdez la visibilité sur les résultats."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes en période d'essai depuis 2 mois. Votre manager vous reproche un manque d'initiative. Comment réagissez-vous ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je me tais et décide de changer d'entreprise.",
        "Je remercie pour ce feedback, je demande des exemples concrets pour comprendre précisément ce qui est attendu, et je propose un plan d'actions avec des jalons à 2 semaines.",
        "Je conteste le retour — j'ai pourtant fait tout ce qu'on m'a demandé."
      ],
      best:1,
      why:["Partir sans chercher à comprendre prive d'une opportunité de correction. La période d'essai est faite pour apprendre — y compris d'un feedback difficile.","✅ Accueillir le feedback sans défensivité + chercher à comprendre précisément + proposer un plan = vous montrez que vous êtes capable de vous adapter et de progresser sous pression.","Contester un feedback d'un manager en période d'essai sans données concrètes est risqué. Même si vous avez raison, la forme compte."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Quelles sont vos principales qualités ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je suis organisé, rigoureux et travailleur.",
        "Je suis particulièrement fort en [qualité 1 avec exemple chiffré] et [qualité 2 avec exemple concret]. Ces deux atouts m'ont permis de [résultat tangible].",
        "Je suis quelqu'un de très sympa et tout le monde m'aime bien."
      ],
      best:1,
      why:["Lister des adjectifs génériques (organisé, rigoureux) sans preuve ne convainct pas. Chaque qualité citée doit être appuyée d'un exemple.","✅ Qualité + preuve concrète + résultat = une réponse mémorable. Le recruteur ne se souviendra pas des mots — il se souviendra des histoires.","'Je suis sympa' est une qualité sociale, pas professionnelle. Ça ne dit rien sur votre valeur dans le poste."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Comment gérez-vous le fait de travailler avec des collègues plus expérimentés que vous ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "C'est intimidant, j'essaie de rester discret pour ne pas paraître incompétent.",
        "C'est une opportunité. J'observe, je pose des questions ciblées, je valorise leurs expertises et je cherche à apporter ma propre valeur ajoutée sur les sujets où je suis compétent.",
        "J'affirme mes positions même si les autres ont plus d'expérience — c'est important de se faire respecter."
      ],
      best:1,
      why:["Rester discret par peur d'être jugé incompétent est une posture d'évitement. Elle vous empêche d'apprendre et de contribuer.","✅ Humilité + curiosité + contribution ciblée = vous montrez que vous savez apprendre des autres tout en restant acteur. C'est la posture idéale d'un bon collaborateur.","Affirmer ses positions sans tenir compte de l'expérience des autres peut être perçu comme de l'arrogance. L'assertivité se fait avec nuance et ouverture."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Un client important se plaint de vous auprès de votre responsable. Comment réagissez-vous ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je conteste immédiatement la version du client auprès de mon manager.",
        "Je demande à rencontrer mon manager pour comprendre le contenu exact de la plainte, j'analyse la situation objectivement et je propose un plan de correction. Si possible, je propose de m'excuser directement auprès du client.",
        "J'ignore — les clients se plaignent souvent pour rien."
      ],
      best:1,
      why:["Contester sans d'abord comprendre vous met sur la défensive immédiatement. Même si vous avez raison, la forme compte.","✅ Écouter + analyser + agir + réparer = gestion professionnelle d'un conflit client. La démarche montre que vous prenez la relation client au sérieux et que vous savez gérer l'adversité.","Ignorer une plainte client est très risqué. Un client insatisfait non traité peut devenir un problème majeur pour l'entreprise."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On vous propose de télétravailler 4 jours sur 5. Comment vous positionnez-vous ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je préfère être 5/5 au bureau pour être plus visible.",
        "4 jours de télétravail me convient si les attendus sont clairs, la communication maintenue et les journées en présentiel bien utilisées pour les synergies d'équipe. J'ai déjà fonctionné ainsi avec succès.",
        "5/5 à distance, ça ne me pose aucun problème du tout."
      ],
      best:1,
      why:["Être au bureau pour la 'visibilité' révèle une logique présentéiste dépassée. La performance, pas la présence, est ce qui compte vraiment.","✅ Accepter avec conditions claires = maturité et professionnalisme. Mentionner une expérience positive du télétravail rassure sur votre autonomie.","5/5 à distance sans nuance peut inquiéter sur votre besoin de lien d'équipe et votre capacité à collaborer physiquement si nécessaire."],
      skills:{posture:2,clarte:3,strategie:2}
    },
    {
      context:"Votre manager démissionne soudainement. Comment réagissez-vous ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "Je profite de l'instabilité pour chercher une autre opportunité moi aussi.",
        "Je maintiens mon niveau de performance, je sécurise les dossiers en cours, je communique clairement avec mon équipe et je me rends disponible pour faciliter la transition.",
        "Je postule immédiatement à son poste, même si je ne suis pas prêt."],
      best:1,
      why:["Partir en profitant d'une période instable est compréhensible mais stratégiquement risqué. C'est aussi un signal sur votre engagement réel.","✅ Maintenir la performance + sécuriser les dossiers + faciliter la transition = vous montrez du leadership naturel sans sur-jouer l'ambition. C'est ce que les vrais leaders font.","Postuler à un poste pour lequel vous n'êtes pas prêt peut être perçu comme de l'opportunisme. Mieux vaut exprimer votre intérêt à moyen terme."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Que pensez-vous de travailler en open space ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je déteste l'open space, j'ai besoin de calme pour me concentrer.",
        "L'open space favorise la collaboration spontanée, même si la concentration demande parfois des ajustements. J'ai appris à gérer les distractions avec des plages horaires dédiées et des outils adaptés.",
        "J'adore ça ! Plus il y a de monde autour de moi, mieux je travaille."
      ],
      best:1,
      why:["Dire que vous détestez l'open space peut être honnête, mais si le poste est en open space, c'est éliminatoire. Formulez différemment vos besoins.","✅ Reconnaître les avantages de l'open space + montrer votre adaptabilité = vous prouvez que vous pouvez fonctionner dans des conditions variées sans vous plaindre.","Prétendre adorer le bruit et l'agitation quand ce n'est pas vrai peut se retourner contre vous — et vous allez passer 8h/jour dans cet environnement."],
      skills:{posture:2,clarte:3,strategie:2}
    },
    {
      context:"On vous demande d'accomplir une tâche contraire à vos valeurs éthiques. Que faites-vous ?",
      persona:"Sophie Martin — RH Accenture",
      opts:[
        "J'obéis sans mot dire — je préfère garder mon poste.",
        "Je demande d'abord à comprendre le contexte complet. Si la demande reste incompatible avec mes valeurs, j'en parle clairement à mon manager et je propose une alternative. Si aucune solution n'est trouvée, je remonte à la hiérarchie ou aux instances compétentes.",
        "Je démissionne immédiatement sans discussion."
      ],
      best:1,
      why:["Obéir contre ses valeurs sans rien dire vous expose personnellement et moralement. Certaines directives peuvent aussi vous engager légalement.","✅ Chercher à comprendre + alerter + proposer une alternative = démarche professionnelle et éthique. C'est la posture d'un salarié responsable qui sait dire non de façon constructive.","Démissionner immédiatement sans dialogue est radical. Dans la plupart des cas, un dialogue interne peut résoudre le problème — sans perdre son emploi."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On vous demande de prendre en charge un projet en urgence — votre manager est absent. Comment réagissez-vous ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je refuse de prendre des décisions sans avoir toutes les informations.",
        "Je récupère le maximum d'informations disponibles, je priorise les actions urgentes, je communique clairement et je documente tout.",
        "Je prends toutes les décisions seul — c'est l'occasion de montrer mon initiative."
      ],
      best:1,
      why:["Refuser d'agir en situation d'urgence parce que les informations sont incomplètes est une paralysie professionnelle.","✅ Récupérer l'information + prioriser + communiquer + documenter = posture d'un professionnel fiable en situation dégradée. Leadership sans excès.","Tout décider seul sans en référer peut créer des problèmes si vos décisions dépassent votre périmètre. L'initiative oui — l'excès, non."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"On a appris que vous étiez en recherche. Votre direction actuelle vous propose de rester avec une augmentation de 10%. Pourquoi continuer cet entretien avec nous ?",
      persona:"Sophie Martin — Responsable RH, Accenture",
      opts:[
        "Une augmentation de 10% est intéressante, donc je vais sûrement rester chez mon employeur actuel. Je préfère ne pas prendre de risque inutile. Merci pour votre temps.",
        "L'augmentation est appréciable, mais mon envie de changement vient d'un manque d'évolution et de missions, pas seulement du salaire. Une contre-offre tardive ne résout pas ce problème de fond. C'est pour ça que je poursuis ce process avec vous.",
        "Je ne sais pas encore, je vais comparer les deux offres financièrement. Le salaire reste le critère principal pour moi. Je vous redirai si je continue le process."
      ],
      best:1,
      why:["Accepter de rester uniquement pour l'argent sans interroger les raisons initiales de votre recherche envoie un signal de manque de clarté sur vos motivations — et inquiète le recruteur sur votre engagement réel.","✅ Distinguer le problème de fond (évolution, missions) de la solution proposée (argent) montre une réflexion mature. Le recruteur comprend que votre démarche est sincère et pas opportuniste.","Réduire la décision au seul critère financier peut donner l'impression que vous négociez les deux employeurs l'un contre l'autre — une posture qui fragilise la confiance."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"Le poste implique de déménager à Lyon. On peut éventuellement discuter d'une prime d'installation. Qu'est-ce que vous attendez de notre part ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Je n'ai pas vraiment réfléchi à un montant précis, on verra ce que vous proposez. Je vous fais confiance pour être correct. Ce n'est pas le critère principal pour moi.",
        "Pour un déménagement de cette ampleur, je pense à une prime couvrant les frais réels — déménageur, caution, frais d'agence — autour de 2 à 3 mois de loyer. Je peux vous transmettre une estimation détaillée si vous le souhaitez.",
        "Il me faudrait au minimum 8000€ pour accepter ce déménagement. C'est non négociable pour moi. Sinon je ne peux pas envisager ce poste."
      ],
      best:1,
      why:["Ne pas avoir réfléchi au montant peut sembler souple, mais ça laisse l'employeur fixer seul les règles — vous risquez d'obtenir moins que ce que le déménagement coûte réellement.","✅ Justifier un montant par des coûts réels et documentés est l'approche la plus crédible en négociation. Vous demandez ce qui est nécessaire, pas un chiffre arbitraire.","Annoncer un montant fixe et non négociable sans justification peut bloquer la discussion alors qu'un chiffrage transparent aurait pu convaincre facilement."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Juste par curiosité — vous comptez avoir des enfants dans les prochaines années ?",
      persona:"Sophie Martin — Responsable RH, Accenture",
      opts:[
        "Non, pas dans l'immédiat, je me concentre sur ma carrière pour le moment. Ça ne devrait pas changer dans les prochaines années. Vous pouvez compter sur ma disponibilité.",
        "Je ne vois pas le lien direct entre cette question et les missions du poste. Je suis pleinement disponible et engagée pour ce rôle. Je préfère qu'on revienne aux aspects professionnels de l'entretien.",
        "Cette question est illégale, je ne suis pas obligée de répondre et je trouve ça déplacé. Je m'interroge sur le sérieux de votre process de recrutement. On peut passer à autre chose ?"
      ],
      best:1,
      why:["Répondre directement à une question discriminatoire — même pour rassurer — légitime la pratique et peut être utilisé contre vous quelle que soit votre réponse future.","✅ Rappeler poliment l'absence de lien avec le poste, réaffirmer sa disponibilité et recentrer l'échange est la réponse la plus professionnelle : ferme sans être conflictuelle.","Dénoncer frontalement la question est légitime sur le fond, mais le ton accusateur peut braquer l'interlocuteur et nuire à la suite de l'entretien sans bénéfice réel pour vous."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"En fait, le salaire pour ce poste est plutôt 38k que les 42-45k annoncés sur l'offre. Ça change quelque chose pour vous ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Non ça ne change rien, je reste intéressé(e) par le poste de toute façon. Le salaire n'est pas si important pour moi. On peut continuer l'entretien normalement.",
        "L'écart avec l'annonce m'interroge — je m'étais positionné sur la fourchette indiquée. Pouvez-vous m'expliquer cette différence ? Selon votre réponse, on pourra voir si un compromis est possible sur d'autres éléments de la rémunération.",
        "Si c'est en dessous de la fourchette annoncée, je préfère arrêter l'entretien ici. Ce n'est pas honnête de votre part. Je ne vais pas perdre plus de temps sur ce poste."
      ],
      best:1,
      why:["Minimiser l'écart pour ne pas froisser l'interlocuteur vous prive d'une vraie discussion — vous risquez d'accepter un poste sous vos attentes sans même négocier.","✅ Demander une explication tout en restant ouvert à un compromis (variable, avantages, évolution) garde la porte ouverte et montre votre professionnalisme face à une situation délicate.","Quitter l'entretien immédiatement, même si l'écart est frustrant, ferme toute possibilité de négociation alors qu'un ajustement sur d'autres éléments aurait pu compenser."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Honnêtement, votre réponse ne me convainc pas du tout. Vous pouvez être plus précis ?",
      persona:"Sophie Martin — Responsable RH, Accenture",
      opts:[
        "Désolé(e), je ne sais pas trop quoi ajouter de plus, j'ai dit l'essentiel. Je peux reformuler si ça aide. C'est compliqué de tout détailler en entretien.",
        "Vous avez raison, je peux être plus précis. Sur ce projet précis, j'ai géré X livrables avec une équipe de Y personnes et obtenu Z résultat mesurable. Est-ce que ça répond mieux à votre question ?",
        "Je pense que ma réponse était suffisamment claire, je ne vois pas ce qu'il faudrait ajouter. Peut-être qu'on n'est pas sur la même longueur d'onde. On peut passer à la question suivante."
      ],
      best:1,
      why:["S'excuser sans réellement préciser laisse le recruteur sans nouvelle information — le doute reste entier et la situation ne s'améliore pas.","✅ Accueillir le retour sans se braquer puis reformuler avec du concret (chiffres, actions, résultats) transforme une objection en opportunité de briller. C'est la meilleure réaction sous pression.","Camper sur sa position sans rien ajouter peut être perçu comme une fermeture au feedback — une qualité pourtant essentielle en entreprise."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Avant même de parler du poste, on va vous demander de signer une clause de non-concurrence de 2 ans sur tout le secteur. C'est notre standard.",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "D'accord, pas de problème, je signerai ce qu'il faut le moment venu. Je ne veux pas que ça bloque le process. On peut continuer l'entretien.",
        "Une clause aussi large peut limiter sérieusement ma mobilité future. Avant de l'envisager, j'aimerais comprendre sa portée exacte et discuter d'une contrepartie financière si elle s'applique. On peut en parler en détail si l'offre se concrétise ?",
        "Non, je ne signerai jamais une clause de non-concurrence aussi large. C'est hors de question pour moi. Si c'est imposé, je préfère arrêter le process maintenant."
      ],
      best:1,
      why:["Accepter par avance sans comprendre la portée de la clause vous expose à une vraie restriction de carrière plus tard — sans avoir négocié quoi que ce soit.","✅ Demander des précisions et évoquer une contrepartie financière (la clause de non-concurrence doit légalement être compensée) est la réponse d'un candidat informé, sans braquer l'employeur à ce stade.","Refuser catégoriquement avant même d'avoir une offre concrète peut clore prématurément un process intéressant, alors que la clause est souvent négociable une fois l'offre sur la table."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On a appelé une de vos références. Elle nous a dit que vous aviez du mal à respecter les délais. Vous voulez réagir ?",
      persona:"Sophie Martin — Responsable RH, Accenture",
      opts:[
        "C'est faux, cette personne ne m'aime pas, elle dit n'importe quoi sur moi. Je conteste totalement ce qu'elle a dit. Vous devriez vérifier avec d'autres personnes.",
        "Je suis surpris(e) par ce retour. Sur le projet en question, les délais ont effectivement été tendus, mais c'était lié à des dépendances externes que j'ai documentées à l'époque. Je peux vous donner le contexte complet si ça vous aide.",
        "C'est possible, j'ai pu avoir du retard sur certains projets, c'est vrai que je ne suis pas le plus rapide. Je travaille là-dessus. Je ne sais pas quoi dire de plus."
      ],
      best:1,
      why:["Attaquer frontalement la référence sans apporter de contexte vous fait paraître sur la défensive et peut renforcer le doute du recruteur plutôt que le dissiper.","✅ Reconnaître le retour sans paniquer, puis apporter un contexte factuel et documenté, transforme une accusation en discussion nuancée. Vous montrez votre maturité face à la critique.","Valider la critique sans nuance ni contexte peut confirmer l'inquiétude du recruteur sans rien apporter pour la rassurer."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Pour être transparent : la personne que vous remplaceriez a été licenciée pour insuffisance professionnelle. Ça vous inquiète ?",
      persona:"Léa Fontaine — DRH Capgemini",
      opts:[
        "Non, pas du tout, je suis sûr(e) de mes capacités, ça ne sera pas un problème pour moi. Je n'ai pas peur de la pression. On peut passer à autre chose.",
        "Merci pour la transparence. Ça m'amène à vous poser une question : quels étaient précisément les attendus non atteints, et quel accompagnement est prévu pour la prise de poste ? Ça m'aidera à bien démarrer.",
        "Ça m'inquiète un peu, oui. Si la personne précédente a échoué, ça veut peut-être dire que le poste est difficile à tenir. Je ne sais pas si je suis prêt(e) à prendre ce risque."
      ],
      best:1,
      why:["Balayer l'information sans poser de question peut donner l'impression que vous ne mesurez pas les enjeux réels du poste — un excès de confiance qui inquiète parfois plus qu'il ne rassure.","✅ Remercier pour la transparence et poser des questions précises sur les attendus et l'accompagnement montre que vous voulez comprendre la situation pour mieux réussir — exactement ce qu'un recruteur veut entendre après un échec.","Exprimer une inquiétude sans la transformer en question constructive laisse le recruteur sans élément pour vous rassurer, et peut faire douter de votre motivation."],
      skills:{posture:2,clarte:3,strategie:3}
    }
  ],

    demandeur:[
    {
      context:"Votre CV montre 9 mois sans activité. Comment vous avez occupé cette période ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "J'ai eu du mal à trouver, le marché est compliqué en ce moment, les recruteurs ne répondent pas.",
        "J'ai mis ce temps à profit : j'ai suivi une formation en logistique, obtenu le CACES, et j'ai aidé bénévolement une association. J'ai aussi structuré ma recherche pour cibler des postes vraiment adaptés à mon profil.",
        "J'avais des contraintes personnelles qui m'ont ralenti, mais c'est réglé maintenant."
      ],
      best:1,
      why:["Blâmer le marché ou les recruteurs donne une image négative et passive. C'est exactement ce qu'un employeur ne veut pas entendre.","✅ Montrer des actions concrètes (formation, certification, engagement) pendant le chômage transforme une faiblesse en force. Vous êtes resté actif et stratégique.","Les 'contraintes personnelles' vagues inquiètent sans rien expliquer. Le recruteur imagine le pire. Soyez spécifique ou formulez positivement."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Pourquoi la logistique ? Vous veniez d'un autre secteur avant.",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "C'est un secteur qui recrute beaucoup, donc les chances de trouver sont meilleures.",
        "Mon expérience précédente en [secteur] m'a appris la rigueur opérationnelle et la gestion des délais — des compétences directement transférables. La logistique m'attire car c'est concret, dynamique, et j'ai pris le temps de me former pour y entrer sérieusement.",
        "Franchement, j'explore différentes pistes, la logistique en fait partie."
      ],
      best:2,
      why:["Choisir un secteur 'parce que ça recrute' montre que vous n'êtes pas vraiment motivé — vous êtes juste disponible. Un recruteur cherche quelqu'un qui veut CE poste.","Relier votre expérience passée aux compétences demandées + montrer une démarche active (formation) = vous construisez un récit cohérent et convaincant.","✅ Dire que vous 'explorez des pistes' confirme que ce n'est pas votre priorité. Pas rassurant pour un poste à pourvoir."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On travaille en horaires décalés ici — 6h-14h ou 14h-22h en rotation. C'est ok pour vous ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Euh… je préférerais des horaires fixes si possible, j'ai des contraintes le matin.",
        "Oui, je m'y suis renseigné en postulant. Je suis disponible sur les deux créneaux et j'ai organisé mon quotidien en conséquence.",
        "Je verrai une fois en poste, en général je m'adapte."
      ],
      best:1,
      why:["Exprimer une préférence pour des horaires fixes sur un poste décalé dès le premier entretien signale un problème de disponibilité — potentiellement éliminatoire.","✅ Confirmer que vous avez lu les conditions AVANT de postuler montre du sérieux. Préciser que vous vous êtes organisé rassure définitivement.","'Je verrai une fois en poste' est vague et peu engageant. Ça ne lève pas le doute sur votre disponibilité réelle."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"Votre dernier salaire c'était combien ? Et qu'est-ce que vous visez ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Je gagnais 1 800 € net, donc je vise au moins pareil.",
        "Mon objectif est d'être aligné avec la grille du poste et le marché local pour ce niveau. Ce qui compte pour moi c'est de démarrer sur une base juste et d'évoluer selon mes résultats.",
        "Je suis flexible, vous proposez quoi ?"
      ],
      best:1,
      why:["Révéler votre ancien salaire vous enferme — le recruteur peut se servir de ce chiffre comme plafond. Et 'au moins pareil' ne montre pas d'ambition.","✅ Répondre sans révéler le passé, en ancrant sur le marché et en ouvrant sur l'évolution = vous restez crédible tout en gardant le pouvoir de négociation.","Demander 'vous proposez quoi' vous met en position passive. Le recruteur s'attend à ce que vous ayez une idée de votre valeur."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"On a eu d'autres candidats plus expérimentés. Pourquoi je devrais vous choisir vous ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Je suis motivé et j'apprends vite, vous ne serez pas déçu.",
        "Parce que je combine une formation récente adaptée à ce poste, une vraie connaissance du terrain, et une capacité à m'investir pleinement dès le départ. Un candidat plus expérimenté peut avoir des habitudes à défaire — moi j'arrive avec l'envie de construire ici.",
        "Je ne sais pas vraiment, je pense que vous devez décider selon vos critères."],
      best:0,
      why:["✅ 'Motivé et j'apprends vite' est la réponse la plus commune et la plus creuse. Tout le monde le dit. Ça ne vous différencie pas.","Transformer le désavantage (moins d'expérience) en avantage (fraîcheur, formation récente, engagement total) est une technique de vente habile. Vous retournez l'objection.","Abandonner la réponse à l'appréciation du recruteur montre un manque de confiance. Vous avez le droit de vous défendre — c'est même attendu."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"On peut vous faire une offre rapidement. Mais vous avez d'autres entretiens prévus cette semaine ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Non, j'attends votre réponse en priorité.",
        "Oui, j'ai un entretien jeudi — mais si votre offre correspond à ce qu'on a discuté, je suis prêt à donner une réponse rapide.",
        "Oui, plein, mais c'est votre poste qui m'intéresse vraiment !"
      ],
      best:0,
      why:["✅ Mentir ou exagérer votre intérêt exclusif vous prive d'un levier. Ça peut aussi paraître désespéré si le recruteur perçoit que vous n'avez pas de processus.","Être honnête sur un processus concurrent + conditionner votre réponse rapide à la qualité de l'offre = vous êtes professionnel et vous créez une légère urgence.","'Plein d'entretiens' peut sembler excessif ou peu crédible. L'honnêteté maîtrisée est plus efficace que l'enthousiasme forcé."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes en fin de droits ARE dans 2 mois. Ça ne vous rend pas trop anxieux(se) pour notre entretien ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Si, honnêtement je suis stressé(e) et j'ai vraiment besoin de ce poste.",
        "Je gère ma recherche avec méthode indépendamment de mes droits. Ce délai me confirme qu'il faut avancer vite, mais ça ne change pas mes critères de sélection — et votre poste coche toutes les cases.",
        "Non, pas du tout — j'ai des économies et ça ne presse pas vraiment."
      ],
      best:1,
      why:["Révéler votre anxiété financière au recruteur le met dans une position de force pour vous proposer un salaire sous-marché. Ne jamais négocier depuis la peur.","✅ Vous montrez réalisme + maîtrise + cohérence dans vos critères. La fin de droits crée de l'urgence chez vous mais vous refusez de vous brader. C'est de la force.","Minimiser une situation réelle avec 'ça ne presse pas' manque de crédibilité. Et le recruteur pourrait ne pas sentir l'urgence de vous répondre."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Votre CV montre des missions très courtes — 3 mois, 5 mois. Comment vous expliquez ça ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "J'avais du mal à m'intégrer dans les équipes, c'est compliqué parfois.",
        "Ces missions courtes étaient soit des remplacements à durée déterminée, soit des contextes qui ont changé (restructuration, fin de projet). Dans chaque cas, j'ai livré les résultats attendus — je peux vous en parler si vous voulez.",
        "Je cherchais le poste parfait, donc je n'ai pas gardé les postes qui ne correspondaient pas 100%."
      ],
      best:1,
      why:["Parler de difficultés d'intégration est un signal d'alarme immédiat pour un recruteur. Évitez tout ce qui suggère des problèmes relationnels.","✅ Contextualiser les courtes durées avec des raisons objectives (CDD, restructuration) + rassurer sur la qualité des résultats = vous désarmez l'objection sans mentir.","Dire que vous quittiez des postes qui n'étaient pas 'parfaits' peut sembler prétentieux et difficile à satisfaire."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous postulez à ce poste mais il est en dessous de votre niveau. Pourquoi ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Parce que je n'ai pas trouvé mieux et que j'ai besoin de travailler.",
        "Je cherche une stabilité dans un secteur qui correspond à mes valeurs plutôt qu'un titre. Ce poste me permet de contribuer rapidement et de construire sur le long terme dans votre entreprise.",
        "Je préfère ne pas répondre à cette question."
      ],
      best:1,
      why:["'J'ai besoin de travailler' est honnête mais positionne mal. Le recruteur va douter de votre engagement à rester dès qu'une meilleure offre se présente.","✅ Valoriser la stabilité et le projet de long terme rassure l'employeur sur votre engagement. Vous retournez la supposée faiblesse en choix assumé.","Refuser de répondre crée de la méfiance. C'est une question légitime qui mérite une réponse réfléchie."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Si vous étiez embauché(e), que feriez-vous les 30 premiers jours ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Je ferais connaissance avec l'équipe et j'observerais le fonctionnement.",
        "Je structurerais mes 30 premiers jours en 3 temps : comprendre (écouter, observer, lire la documentation), contribuer (m'impliquer sur des petites tâches avec résultats visibles) et valider (faire un point avec mon manager sur mes observations et priorités).",
        "Je mettrais en place mes propres méthodes de travail pour optimiser le poste dès le départ."
      ],
      best:1,
      why:["'Observer et faire connaissance' est vague. Ça ne montre pas de méthode ni d'engagement à produire des résultats rapidement.","✅ Un plan structuré en 3 temps montre que vous avez réfléchi à votre intégration. C'est la réponse d'un professionnel organisé qui pense résultats dès le premier jour.","Imposer ses méthodes dès le début sans comprendre le contexte est une erreur classique. L'écoute d'abord, l'action ensuite."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez un trou de 14 mois dans votre CV. Qu'est-ce qui s'est passé vraiment ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "J'avais des soucis personnels, je préfère ne pas en parler.",
        "C'était une période de recentrage : j'ai d'abord soigné un proche, puis j'en ai profité pour suivre une formation en ligne et clarifier mon projet professionnel. Aujourd'hui je suis prêt(e) à m'engager pleinement.",
        "Honnêtement je ne savais pas quoi faire, alors j'ai attendu que ça se débloque."
      ],
      best:1,
      why:["'Je préfère ne pas en parler' crée de la méfiance. Le recruteur imagine le pire. Soyez transparent sans sur-expliquer.","✅ Une raison humaine (soin à un proche) + action proactive (formation) + projection positive = vous humanisez le trou et montrez que vous avez utilisé ce temps activement.","'J'attendais que ça se débloque' montre une posture passive. Ce n'est pas la posture d'un candidat engagé."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Ce poste est en CDI mais avec une période d'essai de 4 mois. Ça vous pose un problème ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "4 mois c'est long, je préférerais 2 mois.",
        "Non, une période d'essai est normale et me convient. Elle me permet aussi de valider que ce poste et cette entreprise correspondent à mes attentes. C'est un engagement mutuel.",
        "J'ai besoin de la sécurité du CDI immédiatement — la période d'essai m'inquiète."
      ],
      best:1,
      why:["Négocier la durée de la période d'essai d'entrée est malvenu et donne l'impression que vous anticipez un problème.","✅ Présenter la période d'essai comme un engagement bilatéral montre maturité et confiance en vous. Vous ne la subissez pas — vous la choisissez aussi.","Exprimer une peur de la période d'essai signale un manque de confiance en votre capacité à vous intégrer."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Votre dernier poste vous a licencié. C'est vous ou les circonstances ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "C'est injuste, ils m'ont licencié sans raison valable.",
        "C'était un licenciement économique lié à une restructuration — mon poste a été supprimé. Je garde de très bonnes relations avec mon ancien employeur qui peut en témoigner.",
        "Il y avait des difficultés avec mon manager, disons que ça ne s'est pas bien passé."
      ],
      best:1,
      why:["Qualifier le licenciement d'injuste sans preuves positionne mal. Le recruteur va anticiper que vous ferez pareil si les choses ne se passent pas bien chez eux.","✅ Un licenciement économique est objectif et fréquent. Le mentionner clairement avec la preuve d'une bonne relation conservée rassure totalement le recruteur.","Évoquer des difficultés avec un manager est un signal d'alarme. Même si c'est vrai, la façon de le formuler est cruciale."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"Vous êtes disponible immédiatement. Ça ne vous fait pas peur que ça joue contre vous ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Si, un peu — les recruteurs pensent souvent que ça signifie qu'on n'est pas demandé.",
        "La disponibilité immédiate est un avantage opérationnel pour l'employeur. Ce qui compte, c'est la valeur que j'apporte — et je suis prêt à le démontrer dès le premier jour.",
        "Non du tout, c'est la norme quand on cherche un emploi."
      ],
      best:2,
      why:["Valider l'objection potentielle du recruteur n'est pas stratégique. Vous amplifiez une préoccupation qu'il n'avait peut-être pas.","Retourner la disponibilité en avantage + recentrer sur la valeur = vous contrôlez le récit. La disponibilité immédiate est un avantage — pas une honte.","✅ 'C'est la norme' banalise sans valoriser. L'objectif est de transformer votre situation en atout."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous avez 52 ans. Est-ce que votre âge peut poser un problème dans notre équipe jeune ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "C'est une question discriminatoire, je refuse d'y répondre.",
        "Mon expérience est un complément à l'équipe, pas un obstacle. J'ai travaillé avec des profils junior et senior — ce qui compte, c'est la complémentarité. Et j'ai suivi régulièrement des formations pour rester à niveau sur les nouvelles pratiques.",
        "Vous avez raison de vous poser la question — ça pourrait être un sujet. On verra."
      ],
      best:1,
      why:["Même si la question est potentiellement discriminatoire, refuser de répondre crée une tension inutile. Traitez-la avec assurance et bonne grâce.","✅ Valoriser la complémentarité + rassurer sur votre actualisation = vous désarmez la préoccupation sans vous défendre. Vous montrez confiance et ouverture.","Valider la préoccupation de l'employeur sans y répondre est la pire des postures. Vous vous mettez vous-même en doute."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Qu'est-ce qui vous a attiré dans notre annonce spécifiquement ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Les conditions de travail et le salaire m'ont semblé corrects.",
        "Ce qui m'a particulièrement attiré, c'est [élément précis de l'annonce] parce que ça correspond à [ma compétence/mon projet]. Et l'aspect [second point] m'a confirmé que votre entreprise prend au sérieux [valeur ou enjeu que vous partagez].",
        "Honnêtement, j'ai postulé à plusieurs offres similaires — la vôtre est dans le lot."
      ],
      best:1,
      why:["'Conditions correctes et salaire' révèle que vous avez postulé sans vraiment lire l'annonce. Pas engageant.","✅ Citer des éléments précis de l'annonce et les relier à votre profil montre que vous avez préparé ET que vous avez une vraie raison de vouloir CE poste.","Dire que vous avez postulé en masse est dévastateur pour votre image. Même si c'est vrai, ne le révélez jamais."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On cherche quelqu'un qui restera au moins 3 ans. Vous pouvez vous engager sur ça ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Bien sûr, je signe pour 3 ans — pas de problème.",
        "Si le poste correspond à ce qu'on a discuté et que je peux y construire quelque chose de solide, la durée n'est pas un problème. Ce que je cherche, c'est un projet dans lequel m'investir vraiment.",
        "Je ne peux pas m'engager sur une durée — l'avenir est incertain."],
      best:0,
      why:["✅ S'engager sur une durée précise sans condition est risqué pour vous. Et les recruteurs expérimentés savent que ce genre de promesse verbale ne vaut rien légalement.","Conditionner votre engagement à la qualité du projet = vous êtes honnête et stratégique. Aucun recruteur sérieux ne peut vous en tenir rigueur.","Refuser de s'engager sur une durée sans rien proposer en échange laisse le recruteur dans l'incertitude totale."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Vous avez pris des formations en ligne pendant votre recherche. Elles ne sont pas reconnues par les employeurs, non ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Vous avez peut-être raison, mais c'est ce que j'ai pu faire.",
        "Les certifications que j'ai obtenues sont reconnues par les professionnels du secteur — notamment [nom de la certification]. De plus, ce qui compte, c'est ce que j'ai appliqué concrètement : voici ce que j'ai réalisé avec ces nouvelles compétences.",
        "Je ne savais pas qu'elles n'étaient pas reconnues, c'est embêtant."],
      best:1,
      why:["Acquiescer à la critique sans se défendre vous affaiblit. Même si la formation est en ligne, elle a une valeur que vous devez défendre.","✅ Nommer la certification + preuves d'application concrète = vous transformez l'objection en démonstration de compétence réelle. Ce qui compte, c'est ce que vous savez faire.","Valider l'objection du recruteur sans ressource alternative vous désarme totalement."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Comment vous expliquez que vous n'ayez pas trouvé d'emploi depuis 11 mois ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Le marché est très dur en ce moment, les recruteurs ne répondent pas.",
        "J'ai fait le choix d'être sélectif — je cherche un poste qui correspond vraiment à mon projet, pas juste une sortie rapide du chômage. Entre-temps, j'ai [formation / projet / bénévolat]. Je considère que c'est un investissement, pas un échec.",
        "Franchement, j'ai eu du mal à me motiver au début, mais maintenant ça va."],
      best:1,
      why:["Blâmer le marché ou les recruteurs positionne en victime passive. Ce n'est jamais la bonne posture.","✅ Revendiquer une recherche sélective + montrer une activité productive = vous retournez un fait potentiellement négatif en signe de maturité et de projet clair.","'Du mal à me motiver' est une information que vous n'avez pas à donner. Ça affaiblit votre image d'emblée."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous avez travaillé dans une très grande entreprise. Pourquoi vouloir rejoindre une PME de 30 personnes ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Parce que je n'ai pas trouvé dans les grands groupes.",
        "Dans un grand groupe, j'ai appris les process et la rigueur. Maintenant, je cherche un environnement où j'ai plus d'impact direct, où je peux voir le résultat de mon travail et contribuer à la croissance d'une structure avec de vrais enjeux de développement.",
        "Les grandes entreprises ont trop de bureaucratie — j'en avais assez."],
      best:1,
      why:["'Je n'ai pas trouvé' révèle que la PME est un plan B. Pas motivant pour un recruteur.","✅ Valoriser ce que la PME offre (impact, agilité, contribution à la croissance) montre un choix positif et assumé. Ça rassure l'employeur sur votre engagement.","Critiquer les grandes entreprises peut sembler arrogant ou négatif. Mieux vaut parler de ce que vous cherchez plutôt que ce que vous fuyez."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On vous propose un CDD de 6 mois renouvelable. Vous n'auriez pas préféré un CDI direct ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Honnêtement oui, le CDI c'est ce que je cherche.",
        "Je comprends cette proposition. Un CDD me permet aussi de valider que ce poste est le bon avant de m'engager sur le long terme — ça me convient si les conditions sont claires et si l'objectif de stabilisation est partagé.",
        "Non, la durée du contrat n'a aucune importance pour moi."],
      best:1,
      why:["Dire que vous préférez un CDI n'est pas une erreur, mais ça ne répond pas à la vraie question : pourquoi vous êtes là malgré ça.","✅ Retourner le CDD en validation mutuelle = vous êtes constructif et stratégique. Ça positionne le CDD comme un tremplin, pas comme un manque.","Prétendre que la nature du contrat est sans importance peut sembler insouciant ou peu fiable."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez eu un problème avec votre dernier employeur. Ça s'est terminé comment ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Ça s'est mal terminé, je préfère ne pas en parler.",
        "On a eu un désaccord professionnel sur la direction d'un projet. On a choisi de nous séparer à l'amiable avec un protocole transactionnel. J'en retiens des apprentissages importants sur la communication en contexte de tension.",
        "C'était leur faute — l'entreprise avait de vrais problèmes de management."],
      best:1,
      why:["Refuser d'expliquer laisse le recruteur imaginer le pire. Mieux vaut une réponse neutre et maîtrisée.","✅ Nommer le conflit sans le dramatiser + protocole à l'amiable + apprentissage = vous gérez le sujet avec maturité et sans projeter de la toxicité.","Blâmer l'entreprise est l'un des pires signaux qu'un candidat peut envoyer. Le recruteur se demande immédiatement ce que vous direz de lui demain."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Si votre recherche dure encore 3 mois et que ce poste vous est proposé entre-temps — vous le prenez ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Oui, évidemment — n'importe quel poste à ce stade.",
        "Si les conditions correspondent à ce qu'on a discuté et que le projet est celui que vous m'avez décrit — oui, absolument. Ce n'est pas une décision de désespoir, c'est un choix réfléchi.",
        "Je ne sais pas, je verrai ce que j'ai comme offres à ce moment-là."],
      best:1,
      why:["'N'importe quel poste' positionne la décision dans la peur, pas dans le choix. Le recruteur doute de votre engagement réel pour CE poste.","✅ Conditionner à la qualité de l'offre + affirmer que c'est un choix réfléchi = vous êtes en position de force même dans l'incertitude.","'Je verrai' laisse l'employeur dans l'incertitude. Pas engageant pour quelqu'un qui veut vous faire une offre."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous savez piloter nos logiciels métiers ? On utilise [logiciel X spécifique].",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Non, jamais utilisé — c'est un problème ?",
        "Je ne l'ai pas utilisé directement, mais j'ai travaillé avec [logiciel similaire] qui a la même logique. En général, je suis à jour sur un nouveau logiciel métier en 1-2 semaines. Si vous avez de la documentation, je peux commencer avant même ma prise de poste.",
        "Oui, bien sûr — je maîtrise tout ce type d'outils."],
      best:0,
      why:["✅ 'Non, c'est un problème ?' rejette la balle sans rien proposer. Vous n'avez aucun plan de contingence.","Analogie avec un outil similaire + rapidité d'apprentissage + initiative d'apprendre avant la prise de poste = vous transformez une lacune en preuve de proactivité.","Mentir sur une maîtrise technique vous expose à une vérification rapide. Toujours être honnête sur vos compétences techniques."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez postulé il y a 3 semaines et personne n'a rappelé. Comment vous gérez ça ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "J'attends encore — relancer c'est agaçant pour le recruteur.",
        "Je fais une relance courte et professionnelle par email : je rappelle ma candidature, réaffirme ma motivation et demande si le processus est toujours en cours.",
        "J'abandonne — s'ils ne rappellent pas, ce n'est pas pour moi."
      ],
      best:1,
      why:["Attendre indéfiniment sans relancer vous laisse dans l'incertitude alors qu'une relance polie est généralement bien perçue.","✅ Une relance après 10-15 jours est standard et montre votre intérêt et professionnalisme. Email court, courtois, orienté vers l'avenir.","Abandonner sans relancer est prématuré. Les recruteurs sont souvent débordés — une relance respectueuse suffit à rouvrir la communication."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez refusé une offre similaire il y a 2 mois selon votre dossier. Pourquoi, et qu'est-ce qui garantit que vous n'allez pas refuser celle-ci aussi ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "J'avais mes raisons à l'époque, c'est personnel. Je ne veux pas trop entrer dans les détails. Ça ne devrait pas se reproduire normalement.",
        "J'ai refusé car le poste impliquait un trajet de plus d'une heure non compatible avec ma situation à l'époque. Cette offre correspond mieux à mes contraintes actuelles, et je suis pleinement engagé(e) si elle se concrétise.",
        "C'est vrai, j'ai refusé, mais c'était une erreur, j'aurais dû accepter. Je prendrai n'importe quel poste maintenant, peu importe les conditions. Je ne veux plus refuser quoi que ce soit."
      ],
      best:1,
      why:["Rester vague sur les raisons d'un refus précédent laisse planer le doute — le recruteur n'a aucun élément pour évaluer si la situation actuelle est vraiment différente.","✅ Expliquer la raison concrète du refus passé et montrer en quoi cette offre y répond spécifiquement rassure sur votre cohérence et votre engagement réel.","Dire que vous accepteriez 'n'importe quel poste' peut sembler rassurant sur le moment, mais ça inquiète aussi sur votre motivation réelle pour CE poste précis."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Si c'est oui pour vous, on vous appelle demain à 8h pour un démarrage lundi. Vous êtes vraiment prêt(e) à ce rythme ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Oui, complètement, je n'ai aucune contrainte, je peux démarrer dès que vous voulez. Pas de souci de mon côté. Vous pouvez compter sur moi à 100%.",
        "Oui, je suis disponible pour démarrer lundi. J'ai juste besoin de confirmer les documents administratifs nécessaires (contrat, visite médicale) pour que tout soit en ordre dès le premier jour. Je m'organise dès votre appel.",
        "Lundi c'est vraiment très rapide, j'aurais besoin d'au moins une semaine pour m'organiser. Je ne peux pas garantir lundi précisément. Peut-être la semaine suivante serait plus sûr."
      ],
      best:1,
      why:["Confirmer sans aucune réserve peut sembler rassurant, mais ça occulte les aspects pratiques (contrat, documents) qui peuvent réellement retarder un démarrage si on n'y pense pas.","✅ Confirmer la disponibilité tout en anticipant les aspects administratifs montre que vous êtes à la fois motivé et organisé — exactement ce qu'un recruteur veut voir avant un démarrage rapide.","Demander plus de temps sans raison précise peut faire perdre l'opportunité à un autre candidat plus réactif, alors qu'un démarrage rapide était probablement gérable avec un peu d'anticipation."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Le poste est à 40 minutes de chez vous et il n'y a pas de transport en commun direct. Ça ne va pas être un frein avec le temps ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Non, ça ne me dérange pas du tout, je ferai avec, j'ai l'habitude. Ce n'est pas un problème pour moi. Vous n'avez pas à vous inquiéter.",
        "J'ai anticipé cette contrainte : je covoiture avec une personne de mon entourage qui travaille dans la même zone, et en dernier recours j'ai un véhicule personnel. Ce n'est pas un frein pour moi à moyen terme.",
        "Honnêtement, c'est un peu loin, mais je n'ai pas trop le choix avec ma situation actuelle. J'espère que ça s'arrangera avec le temps. On verra comment ça se passe."
      ],
      best:1,
      why:["Minimiser le trajet sans donner de solution concrète peut inquiéter le recruteur sur la durabilité de votre engagement — les trajets longs sont une cause fréquente de départs précoces.","✅ Présenter une solution concrète et déjà anticipée (covoiturage, véhicule) rassure sur votre capacité à tenir le poste dans la durée, sans minimiser la contrainte réelle.","Admettre une gêne sans solution laisse le recruteur avec un doute légitime sur votre capacité à tenir ce rythme sur plusieurs mois."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre formation initiale n'a rien à voir avec ce poste. Pourquoi ce changement aussi radical, et pourquoi maintenant ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "J'ai juste envie de changer, je m'ennuyais dans mon ancien domaine. C'est le moment pour moi de tenter autre chose. Je verrai bien comment ça se passe.",
        "J'ai découvert ce secteur via une mission bénévole il y a un an, et ça a confirmé un intérêt que je n'avais pas identifié avant. Depuis, j'ai suivi une formation courte et échangé avec des professionnels du métier pour valider ce choix.",
        "C'est vrai que c'est différent, mais je suis sûr(e) que je vais m'adapter rapidement, je suis quelqu'un de très polyvalent. Ça ne devrait pas poser de problème."
      ],
      best:1,
      why:["Une envie de changement sans élément de validation concrète ressemble à une décision impulsive — ça inquiète sur la durabilité de votre motivation dans ce nouveau domaine.","✅ Montrer un déclencheur concret (mission, découverte) suivi d'une démarche de validation (formation, échanges terrain) prouve que le changement est réfléchi, pas une fuite ou un coup de tête.","Affirmer sa polyvalence sans preuve concrète de découverte ou de préparation du secteur ne convainc pas un recruteur qui cherche des garanties sur votre motivation réelle."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Le poste implique des échanges occasionnels avec des clients internationaux en anglais. Votre niveau est suffisant ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Mon anglais est correct, je devrais pouvoir me débrouiller dans la plupart des situations. Ça ne devrait pas être un problème majeur. Je ferai de mon mieux.",
        "Mon anglais est opérationnel à l'écrit et pour des échanges simples, mais j'ai conscience que les situations complexes resteraient un défi. Je suis prêt(e) à suivre une formation rapide si le poste l'exige vraiment.",
        "Honnêtement mon anglais est assez limité, je préfère être transparent là-dessus. Ça pourrait être un vrai problème pour ce poste. Je ne sais pas si je suis le bon profil pour ça."
      ],
      best:1,
      why:["Affirmer que son niveau est 'correct' sans nuance peut créer une désillusion rapide une fois en poste, si la réalité des échanges dépasse vos capacités réelles.","✅ Être honnête sur ses limites tout en proposant une solution concrète (formation) montre votre capacité d'auto-évaluation et votre volonté de progresser — rassurant pour un usage occasionnel de l'anglais.","Une transparence totale sans aucune proposition de solution peut faire perdre une opportunité pour un usage de l'anglais qui reste, par définition, occasionnel."],
      skills:{posture:2,clarte:3,strategie:2}
    },
    {
      context:"Le poste qu'on propose est en intérim, pas en CDI. Je vois sur votre profil que vous cherchez plutôt un CDI. Pourquoi candidater quand même ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Je cherche surtout un CDI, mais bon, en attendant je prends ce qui passe. C'est mieux que rien pour moi en ce moment. On verra si ça débouche sur autre chose.",
        "Je vise effectivement un CDI à terme, mais une mission en intérim me permet de découvrir votre structure et de prouver ma valeur concrètement. Beaucoup d'intérims se transforment en CDI quand la collaboration fonctionne bien — c'est une option que j'assume pleinement.",
        "Honnêtement je n'avais pas vu que c'était en intérim, j'aurais peut-être pas postulé sinon. Je suis un peu déçu(e). Je vais réfléchir si je continue le process."
      ],
      best:1,
      why:["Présenter l'intérim comme un pis-aller ('en attendant je prends ce qui passe') peut donner l'impression que vous ne serez pas pleinement investi sur la mission.","✅ Assumer l'intérim comme une stratégie volontaire (découvrir, prouver sa valeur, ouvrir la porte à une transformation en CDI) montre une posture positive et stratégique plutôt que résignée.","Exprimer sa déception en plein entretien peut être sincère, mais ça fragilise immédiatement votre candidature sans rien apporter de constructif à la discussion."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On a vu que vous aviez aussi postulé chez un concurrent récemment pour un poste similaire, et que ça n'a pas abouti. Qu'est-ce qui s'est passé ?",
      persona:"Julie Moreau — RH PME Industrielle",
      opts:[
        "Je préfère ne pas trop en parler, c'est un peu délicat. Ça n'a juste pas matché avec eux. On peut passer à autre chose si possible ?",
        "Le process s'est bien déroulé, mais le poste avait finalement un périmètre différent de ce qui était annoncé, et ça ne correspondait plus à ce que je recherchais. Votre offre correspond davantage à mon projet, c'est pour ça que je suis là aujourd'hui avec autant de conviction.",
        "Ils ne m'ont jamais répondu après le dernier entretien, j'imagine que ça n'a pas été retenu. Je ne sais pas vraiment pourquoi. C'est frustrant mais bon, on continue."
      ],
      best:1,
      why:["Éviter le sujet peut sembler prudent, mais ça laisse le recruteur imaginer le pire — un échec embarrassant plutôt qu'une simple inadéquation de poste.","✅ Expliquer factuellement la raison (périmètre différent) et relier ça positivement à l'offre actuelle transforme un sujet délicat en argument en faveur de votre candidature actuelle.","Évoquer un silence ou un rejet sans explication peut renforcer un doute sur votre profil, sans rien apporter pour le dissiper."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On a vu sur votre profil LinkedIn que vous postulez à des postes très différents — vendeur, logisticien, agent administratif. C'est un peu confus, vous cherchez quoi exactement ?",
      persona:"Marc Dufour — Responsable d'agence",
      opts:[
        "Je postule un peu partout pour multiplier mes chances, je ne suis pas trop difficile. L'important pour moi c'est de retravailler vite. Je m'adapte à ce qui se présente.",
        "Ces postes partagent un point commun : le contact client et l'organisation, deux compétences que je veux mettre en avant après mon expérience en logistique. Ce poste précis correspond le mieux à ce que je recherche aujourd'hui, c'est pourquoi j'y mets le plus d'énergie.",
        "C'est vrai que ça peut paraître confus, je suis moi-même un peu perdu(e) sur ce que je veux faire exactement. Je teste plusieurs pistes en même temps. Ça va sûrement se préciser avec le temps."
      ],
      best:1,
      why:["Dire qu'on postule 'un peu partout' sans logique apparente peut faire douter de votre motivation réelle pour CE poste précis — vous semblez être une candidature de secours plutôt qu'un choix assumé.","✅ Faire ressortir un fil conducteur cohérent entre vos candidatures (compétences transférables) tout en valorisant ce poste précis rassure sur votre démarche et votre motivation ciblée.","Admettre son propre flou peut être honnête, mais ça n'aide pas le recruteur à se projeter avec vous — un minimum de structure dans votre discours est nécessaire pour convaincre."],
      skills:{posture:2,clarte:3,strategie:2}
    }
  ],

    reconversion:[
    {
      context:"Bonjour. Vous souhaitez donc un bilan de compétences. Qu'est-ce qui vous a amené à cette démarche aujourd'hui ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je suis fatigué de mon travail actuel, j'en peux plus, j'ai besoin de changer.",
        "Depuis 2 ans, je ressens un décalage entre mes valeurs et ce que mon poste me demande au quotidien. Je souhaite utiliser ce bilan pour clarifier mes forces, identifier des métiers qui y correspondent, et construire un plan d'action réaliste.",
        "On m'a dit que le CPF finançait ça, donc j'ai voulu en profiter avant que ça change."
      ],
      best:1,
      why:["Exprimer de la fatigue et de la frustration sans projet révèle un état émotionnel, pas une démarche. La conseillère ne peut pas vous aider si vous n'avez pas de direction.","✅ Vous montrez de la lucidité (décalage identifié), un objectif clair (clarifier + plan) et un usage intentionnel du dispositif. C'est exactement ce qui valide un bilan sérieux.","Utiliser le CPF 'avant que ça change' est un mauvais signal — la conseillère voit immédiatement que ce n'est pas une vraie démarche. Elle peut refuser l'accompagnement."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"Vers quel type de métier vous pensez vouloir vous orienter ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne sais pas encore, c'est justement pour ça que je viens vous voir.",
        "J'ai deux pistes concrètes : la formation pour adultes et le management de transition. Les deux valorisent mon expertise métier et me donnent plus d'autonomie. Je veux valider si c'est réaliste et comment y accéder.",
        "Tout ce qui est dans le digital, c'est l'avenir de toute façon."
      ],
      best:1,
      why:["'Je ne sais pas' est honnête mais incomplet. Un bilan fonctionne mieux si vous arrivez avec des hypothèses à tester — même floues. Sans ça, l'accompagnement sera plus long et moins ciblé.","✅ Avoir 2 pistes concrètes à valider est la posture idéale pour un bilan. Vous ne cherchez pas une solution magique — vous voulez un cadre pour décider. La conseillère peut travailler efficacement.","'Tout ce qui est dans le digital' est trop vague et suiviste. Ça montre que vous n'avez pas réfléchi à vos compétences transférables."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre projet de devenir formateur — vous avez évalué la différence de revenus ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Pas encore en détail, mais le salaire n'est pas ma priorité absolue maintenant.",
        "Oui, j'ai fait des projections. En démarrant en salarié dans un organisme, on est entre 28-35k. En indépendant après 2-3 ans, la fourchette monte. J'ai calculé que je peux tenir 18 mois avec mes économies si besoin.",
        "Je suppose que ça paie moins au début mais ça s'améliore avec le temps."
      ],
      best:1,
      why:["'Le salaire n'est pas ma priorité' sans avoir fait les calculs montre une idéalisation de la reconversion. Les conseillers entendent ça souvent — et ça cache souvent une mauvaise surprise dans 6 mois.","✅ Avoir fait des projections chiffrées et calculé son autonomie financière démontre une maturité de projet. La conseillère peut valider et affiner — pas repartir de zéro avec vous.","Les suppositions sans chiffres montrent que la réflexion économique n'est pas faite. Un projet sérieux se prépare avec des données réelles."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"Votre entourage, comment ils accueillent votre projet de reconversion ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Ma famille a peur pour la sécurité financière, mais je ne les écoute pas trop sur ce sujet.",
        "Ma compagne est inquiète sur l'aspect financier — on en a parlé honnêtement et on a fixé ensemble des conditions : si dans 18 mois le projet ne décolle pas, je réévalue. Elle est partante dans ce cadre.",
        "Tout le monde me soutient à 100%, pas de problème de ce côté."
      ],
      best:1,
      why:["Ignorer les inquiétudes de l'entourage est un signal de fragilité. Si vous avancez sans alignement familial, les tensions risquent de saboter votre projet.","✅ Avoir eu la vraie conversation difficile ET fixé des conditions claires montre une maturité relationnelle et un projet robuste. La conseillère sait que votre environnement ne va pas s'effondrer.","Un soutien total et sans nuance est rarement réaliste. Ça peut indiquer que vous n'avez pas posé les vraies questions — ou que vous évitez le sujet."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous avez pensé à des formations concrètes pour accéder au métier visé ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Pas encore, j'espérais que vous m'aidiez à identifier ça pendant le bilan.",
        "Oui, j'ai identifié 3 certifications : le Titre Professionnel Formateur Pro d'Adultes (RNCP 35634), une formation certifiante en ingénierie pédagogique, et un DU en ligne. J'ai comparé les durées et les coûts CPF.",
        "J'ai vu quelques options sur Mon Compte Formation, mais je n'ai pas encore choisi."
      ],
      best:0,
      why:["✅ Ne pas avoir exploré les formations montre que vous n'avez pas encore fait le travail préparatoire. Le bilan sera plus long et moins efficace.","Arriver avec des formations identifiées, leur référence RNCP et les coûts démontre un travail sérieux. La conseillère peut immédiatement valider, affiner ou compléter — ce n'est pas elle qui fait le travail à votre place.","Avoir 'vu des options' sans avoir choisi est un niveau intermédiaire. Acceptable, mais moins fort qu'une recherche aboutie."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Si à l'issue du bilan, les résultats ne confirment pas votre projet actuel — comment vous réagiriez ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je serais déçu(e), j'ai beaucoup investi dans ce projet émotionnellement.",
        "Ce serait une information précieuse. Le bilan aurait alors rempli son rôle — m'éviter une erreur coûteuse. Je suis venu(e) pour une décision éclairée, pas pour validation d'un choix déjà fait.",
        "Je continuerai quand même, je suis convaincu(e) que c'est le bon chemin."
      ],
      best:1,
      why:["Être 'déçu' est humain, mais en faire une réponse principale montre que l'investissement émotionnel prend le dessus sur la lucidité. Le bilan devient alors une simple validation.","✅ Accepter que les résultats puissent contredire votre hypothèse de départ montre une vraie maturité de démarche. C'est exactement l'esprit d'un bilan — et c'est ce que cherche à vérifier la conseillère.","Annoncer qu'on continue 'de toute façon' invalide le bilan lui-même. Pourquoi investir du temps et de l'argent CPF si la décision est déjà prise ?"],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous abandonnez une carrière de 12 ans. Votre entourage doit vous prendre pour un fou ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Oui, tout le monde me dit que c'est une erreur, mais je n'écoute pas.",
        "Mon entourage est partagé — certains questionnent, d'autres soutiennent. J'ai pris le temps d'expliquer mon raisonnement, et ceux qui comprennent ma démarche sont convaincus par la logique du projet. Je ne cherche pas l'unanimité, je cherche la cohérence.",
        "Tout le monde me soutient à 100% — ma famille trouve ça courageux."
      ],
      best:1,
      why:["'Je n'écoute pas' peut sembler impulsif et fermé. Une reconversion réussie intègre aussi les feedback de l'entourage dans la réflexion.","✅ Reconnaître les questionnements + expliquer votre démarche + chercher la cohérence = maturité et ancrage dans la réalité. Vous n'êtes ni dans l'enthousiasme aveugle ni dans la résistance.","Un soutien unanime est peu crédible. Et ça peut indiquer que vous n'avez pas exposé les vraies difficultés de votre projet à votre entourage."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Vous venez pour une reconversion mais votre dossier de demande est vague. Quel est vraiment votre projet ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je cherche quelque chose de plus épanouissant, j'aime aider les gens.",
        "Je vise le métier de [métier cible] parce qu'il combine [compétence 1 que j'ai] et [domaine qui m'attire]. J'ai fait des recherches sur les formations, les débouchés et j'ai rencontré 3 professionnels du secteur. Ce bilan doit confirmer mon analyse et préciser le meilleur chemin de formation.",
        "Je ne sais pas encore — c'est pour ça que je suis là."
      ],
      best:2,
      why:["'J'aime aider les gens' sans plus de précision décrit la motivation de 80% des gens qui changent de carrière. Trop vague pour construire un projet solide.","Un projet nommé + une logique argumentée + une démarche déjà engagée (rencontres terrain) = vous montrez que vous êtes dans une reconversion réfléchie, pas dans la fuite.","✅ Arriver sans projet avec 'c'est pour ça que je suis là' est honnête mais peut indiquer que vous n'avez pas fait le travail préliminaire."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous visez un métier où vous aurez un salaire 30% inférieur au début. Vous avez évalué ça ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je n'y ai pas réfléchi en détail — je verrai en fonction des offres.",
        "Oui. J'ai calculé mon budget minimal viable, j'ai 8 mois d'économies de sécurité et j'ai identifié que dans ce secteur, la montée en compétences permet d'atteindre mon niveau de revenus actuel en 2-3 ans. C'est un investissement temporaire avec une logique à long terme.",
        "L'argent n'est pas ma priorité — le bonheur professionnel est plus important."
      ],
      best:1,
      why:["Ne pas avoir évalué l'impact financier est une lacune sérieuse dans un projet de reconversion. Ça suggère que la réflexion n'est pas aboutie.","✅ Budget minimal calculé + épargne de sécurité + trajectoire de revenu projetée = vous avez fait le travail sérieux. Votre projet est ancré dans la réalité économique.","'L'argent n'est pas ma priorité' est naïf. Les contraintes financières sont réelles et peuvent ruiner une reconversion si elles ne sont pas anticipées."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Qu'est-ce qui vous a fait rester dans votre ancien métier aussi longtemps si vous étiez malheureux ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne savais pas quoi faire d'autre, j'avais peur de sauter dans le vide.",
        "Ce n'était pas une situation de malheur mais d'insatisfaction progressive. J'ai mis du temps à comprendre ce que je voulais vraiment — et ce bilan fait partie de cette démarche de clarification. Partir trop vite aurait été une erreur.","J'avais un bon salaire et c'était confortable — jusqu'à ce que je ne puisse plus."],
      best:1,
      why:["Parler de 'peur du vide' est honnête mais peut suggérer que vous manquez de courage décisionnel. Formulez différemment.","✅ Distinguer insatisfaction progressive de malheur + valoriser le temps de réflexion = vous montrez que votre démarche est mûrie, pas impulsive. La patience est une force.","'Bon salaire mais je n'ai plus pu' suggère une rupture émotionnelle plutôt qu'une décision réfléchie. Le conseiller va approfondir sur la stabilité de votre décision."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Vous avez déjà des expériences dans le domaine cible que vous mentionnez dans votre dossier ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Non, pas vraiment — c'est pour ça que je veux me reconvertir.",
        "Oui — j'ai fait du bénévolat comme [rôle] pendant 8 mois, j'ai suivi 3 MOOC sur [sujets] et j'ai ombré un professionnel du secteur pendant une journée. Ces expériences ont confirmé mon intérêt et m'ont donné une vision réaliste du métier.",
        "J'ai regardé des vidéos et lu des articles — je me sens prêt."],
      best:1,
      why:["'Pas vraiment d'expériences' affaiblit votre projet. Si vous n'avez pas encore exploré le domaine, comment êtes-vous sûr que c'est le bon choix ?","✅ Bénévolat + formation + observation terrain = vous avez déjà commencé à tester votre projet. C'est exactement ce qu'une conseillère veut entendre.","Vidéos et articles sont un début, mais pas suffisants pour confirmer un projet de reconversion sérieux. L'immersion terrain est indispensable."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre formation de reconversion dure 18 mois. Qu'est-ce qui vous garantit de tenir jusqu'au bout ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Rien — on ne peut pas garantir l'avenir, mais je suis motivé.",
        "J'ai identifié les obstacles potentiels : financiers (budget prévu), personnels (soutien de ma famille), professionnels (retour au rythme étudiant). Pour chacun, j'ai un plan de contingence. Et la clarté de mon objectif final est mon moteur principal.",
        "Je suis quelqu'un de très persévérant, ça ne m'a jamais posé problème."],
      best:1,
      why:["'Rien ne garantit' est honnête mais montre que vous n'avez pas anticipé les risques. Un projet sérieux intègre toujours un plan de gestion des obstacles.","✅ Identifier les risques + plan de contingence + clarté de l'objectif = vous montrez une organisation rigoureuse et un engagement réel. La conseillère est rassurée sur la durabilité de votre projet.","'Je suis persévérant' est une affirmation sans preuve. Donnez des exemples concrets ou anticipez les vrais obstacles."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous souhaitez devenir indépendant dans votre nouveau métier. C'est réaliste selon vous ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Oui, tout le monde peut être indépendant si on veut vraiment.",
        "C'est réaliste à condition de construire en 2 temps : d'abord quelques années en structure pour acquérir l'expertise et le réseau, puis démarrer en indépendant avec une base de clients et des preuves concrètes de compétence.",
        "Je veux être indépendant le plus vite possible — dès ma première année."],
      best:1,
      why:["'Tout le monde peut' est naïf. Le statut indépendant nécessite une expertise prouvée, un réseau et souvent plusieurs années d'expérience salariale d'abord.","✅ Un plan en 2 temps (salarié d'abord, indépendant ensuite) montre du réalisme et de la stratégie. C'est la trajectoire la plus solide pour la majorité des reconversions vers l'indépendance.","Vouloir être indépendant dès la première année sans expérience dans le domaine est très risqué. La conseillère va questionner la viabilité économique."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Qu'est-ce qui vous a déclenché concrètement la décision de vous reconvertir ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Un burn-out il y a 18 mois qui m'a tout remis en question.",
        "Il y a eu un moment précis : [événement spécifique — un projet, une rencontre, une lecture]. Ça a cristallisé une réflexion qui couvait depuis 2-3 ans. Ce n'était pas une rupture mais une prise de conscience que le moment d'agir était venu.",
        "Franchement, je ne me rappelle plus exactement — ça s'est fait progressivement."],
      best:1,
      why:["Mentionner un burn-out peut inquiéter sur votre résistance et votre santé. Formulez la crise de façon plus neutre ou ne l'exposez pas dans sa forme brute.","✅ Un déclencheur précis + réflexion de fond = vous montrez que votre projet est ancré dans une vraie trajectoire, pas dans une réaction émotionnelle ponctuelle. C'est rassurant.","Ne pas se souvenir du déclencheur suggère un manque de clarté sur votre propre projet. La conseillère va douter de la solidité de votre motivation."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Vous êtes prêt à reprendre les bancs de l'école à 40 ans avec des étudiants de 22 ans ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "C'est un peu bizarre comme idée, mais je ferai avec.",
        "Oui — et je le vois comme un atout. Ma maturité et mon expérience professionnelle sont des ressources pour les jeunes étudiants, et leur énergie et leurs méthodes actuelles m'apportent aussi beaucoup. C'est une dynamique complémentaire.",
        "J'espère qu'ils m'accepteront malgré mon âge."],
      best:2,
      why:["'Faire avec' montre une résignation, pas un choix. Si vous vous projetez dans cette situation comme un inconfort à tolérer, c'est un signal d'alarme.","Voir votre âge comme un atout dans le groupe + valoriser la complémentarité = vous transformez un fait potentiellement difficile en opportunité. C'est une posture positive et réaliste.","✅ 'Espérer qu'ils m'acceptent' positionne en victime de votre âge. C'est vous qui choisissez d'être là — abordez ça avec confiance."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Comment vous assurez-vous que votre projet de reconversion n'est pas une fuite de quelque chose ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je suis sûr que non — j'ai vraiment envie de ce nouveau métier.",
        "C'est une question que je me suis posé sérieusement. J'ai distingué ce que je fuyais (certaines conditions de travail spécifiques) de ce que j'allais vers (des missions qui utilisent mes vraies forces). Ce bilan est justement là pour valider cette distinction.",
        "Je n'y ai pas réfléchi sous cet angle — comment je saurais ?"],
      best:1,
      why:["'Je suis sûr que non' sans analyse n'est pas convaincant. La certitude sans examen est le signe d'un projet non questionné.","✅ Distinguer 'fuite de' vs 'marche vers' + utiliser le bilan comme outil de validation = vous avez intégré le bon questionnement dans votre démarche. La conseillère est rassurée sur votre lucidité.","Ne pas avoir réfléchi à cette distinction est une vraie lacune. C'est la question centrale d'un bilan de compétences."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Votre nouveau métier visé demande 2 ans de formation à plein temps. Comment vous financez ça ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je verrai comment m'en sortir — j'ai quelques économies.",
        "J'ai fait les calculs : CPF disponible (environ Xk€), ARE si démission reconversion validée, épargne personnelle couvrant 18 mois de charges. Il me manque environ Yk€ que je cherche via [bourse/aide régionale/financement employeur]. Je viens avec un dossier, pas juste une envie.",
        "Je compte sur ma famille pour m'aider financièrement."],
      best:2,
      why:["'Je verrai comment m'en sortir' signale que le projet n'est pas ancré dans la réalité économique. Une reconversion coûte de l'argent — ignorez ça et vous risquez l'abandon en cours de route.","Plan de financement détaillé + sources identifiées + lacune reconnue avec plan = vous montrez une maturité économique réelle. La conseillère peut vous aider à combler le gap.","✅ Compter sur la famille est une option mais pas un plan. Le conseiller va questioner la viabilité si c'est votre seule source."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Qu'est-ce que vous ferez si votre reconversion ne fonctionne pas comme prévu ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne veux pas penser à ça — ça doit fonctionner.",
        "J'ai un plan B : mes compétences actuelles me permettent de revenir dans mon domaine d'origine si nécessaire. Et le pire scénario reste que j'ai acquis de nouvelles compétences valorisables. Je ne mise pas tout sans filet.",
        "Je n'ai pas de plan B — c'est ça ou rien."],
      best:1,
      why:["Ne pas penser aux échecs possibles est une posture d'évitement. Un projet solide intègre toujours les scénarios négatifs dans sa réflexion.","✅ Plan B identifié + compétences de repli = vous gérez le risque sans paniquer. Vous montrez maturité et prudence, pas faiblesse. Ça rassure la conseillère.","'C'est ça ou rien' peut sembler courageux mais c'est souvent le signe d'une position émotionnelle fragile. Ça peut aussi vous rendre moins résistant aux obstacles."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Votre partenaire n'est pas convaincu(e) par votre projet. Comment vous gérez ça ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ferai ce projet avec ou sans son accord — c'est ma vie.",
        "C'est un sujet que je prends au sérieux. On a eu plusieurs discussions pour que mon partenaire comprenne les enjeux réels. Il/elle a des craintes légitimes, principalement financières. On travaille sur un plan qui répond à ces inquiétudes tout en me permettant d'avancer.",
        "Mon partenaire finira par accepter — il/elle le fait toujours."],
      best:2,
      why:["Passer outre l'accord du partenaire pour une reconversion majeure crée souvent des tensions qui compromettent la réussite du projet lui-même.","Reconnaître la légitimité des craintes + travailler un plan répondant aux inquiétudes = vous gérez le projet de reconversion avec intelligence relationnelle. C'est aussi une preuve de maturité.","✅ 'Il/elle finira par accepter' montre un rapport déséquilibré et peut signaler que la décision n'est pas vraiment co-construite."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"Vous avez mentionné vouloir travailler avec des enfants dans votre nouveau métier. Vous savez que c'est épuisant ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je sais que ça peut être difficile, mais j'aime tellement les enfants que ça compensera.",
        "J'ai fait un stage d'observation de 3 jours en école primaire et j'ai assisté 2 après-midis en centre de loisirs. J'ai vu la réalité — c'est physiquement et émotionnellement intense. Ça n'a pas changé ma décision, ça l'a ancrée dans la réalité.",
        "Je ne m'en suis pas encore rendu compte concrètement, mais je suis prêt."],
      best:1,
      why:["'J'aime tellement les enfants' sans expérience concrète du milieu professionnel est naïf. L'amour des enfants ne prépare pas à la réalité du métier.","✅ Expérience terrain qui confirme la décision = preuve que votre projet est validé dans la réalité, pas seulement dans votre tête. C'est exactement ce que recherche la conseillère.","'Je suis prêt sans l'avoir vécu' n'est pas rassurant. La conseillère va insister sur la nécessité d'une immersion avant de valider le financement."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Comment vous voyez-vous dans 10 ans dans ce nouveau métier ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne sais pas encore — d'abord je dois commencer.",
        "Dans 10 ans, je me vois avec [expertise spécifique] développée, peut-être avec des responsabilités de [coordination/formation/création de structure]. Ce métier a des trajectoires claires que j'ai identifiées en parlant avec des professionnels.",
        "Je veux juste être heureux au travail — le reste, on verra."],
      best:1,
      why:["'D'abord commencer' montre un manque de vision à long terme. Un projet de reconversion sans projection à 10 ans est souvent fragile.","✅ Projection concrète + trajectoires identifiées via rencontres terrain = vous avez réfléchi au métier comme un système, pas comme un point d'entrée. La conseillère voit un projet mature.","'Être heureux' est un objectif, pas un plan. Sans vision professionnelle à long terme, la reconversion risque de décevoir quand les premières difficultés arrivent."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous passez d'un CDI avec avantages à une formation puis un démarrage incertain. Vous avez vraiment mesuré ce que vous abandonnez ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je sais que je laisse des choses confortables, mais c'est le prix à payer.",
        "Oui, j'ai listé précisément : le salaire actuel, la mutuelle, les congés, la stabilité. Et je les ai mis en face de ce que je vais gagner : sens, développement de mes vraies compétences, perspectives de progression. Le bilan est positif sur le moyen terme.",
        "Honnêtement, je pense surtout à ce que je vais gagner, pas à ce que je perds."],
      best:2,
      why:["'C'est le prix à payer' est une résignation, pas un choix conscient. Si vous n'avez pas clairement évalué les pertes, vous risquez une déception.","Lister les pertes + lister les gains + bilan comparé = vous avez fait une analyse coût-bénéfice consciente. Votre décision est informée et réversible si les conditions changent.","✅ Penser seulement aux gains sans mesurer les pertes crée des angles morts qui deviennent des frustrations à mi-chemin."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Votre réseau professionnel actuel va être caduc dans votre nouveau secteur. Comment vous allez en reconstruire un ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je compte sur ma personnalité pour créer de nouvelles relations naturellement.",
        "J'ai déjà commencé : je suis 3 associations professionnelles du secteur cible, j'ai participé à 2 événements sectoriels et j'ai rejoint un groupe LinkedIn actif. Mon réseau dans le nouveau secteur compte déjà 15 contacts dont 3 qui pourraient être des relais clés.",
        "Les réseaux se construisent — ça prendra le temps qu'il faudra."],
      best:1,
      why:["'Compter sur sa personnalité' n'est pas une stratégie. Le réseau professionnel se construit avec méthode, pas seulement avec du charme.","✅ Actions concrètes déjà engagées + quantification des contacts + identification de relais clés = vous avez déjà commencé à construire votre réseau avant même de démarrer. Impressionnant.","'Ça prendra le temps qu'il faudra' sans plan est passif. Le networking stratégique est une compétence qui s'apprend et se pratique volontairement."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez choisi 3 formations différentes dans votre dossier. Pourquoi hésiter autant ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne sais pas laquelle choisir — elles se ressemblent.",
        "Ce ne sont pas des hésitations mais des hypothèses à valider. Chaque formation correspond à un niveau d'engagement différent et j'ai besoin que ce bilan m'aide à confirmer quelle trajectoire correspond le mieux à mon profil et mes contraintes réelles.",
        "J'ai mis plusieurs options pour voir ce que vous me conseillez."],
      best:2,
      why:["'Je ne sais pas' ne montre pas de démarche de réflexion. Si les formations se ressemblent, c'est que vous n'avez pas encore fait le travail de différenciation.","Hypothèses à valider + logique de progression + utiliser le bilan comme outil de décision = vous êtes dans la bonne posture. Le bilan sert à choisir, pas à fuir la décision.","✅ Mettre des options 'pour voir' montre que vous n'avez pas fait votre travail préliminaire de sélection. La conseillère va devoir faire le travail à votre place."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Quel métier cible réellement votre bilan — et pourquoi ce choix précis et pas un autre ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je ne suis pas encore fixé(e) — c'est justement pour ça que je fais le bilan.",
        "Je vise [métier précis] parce que ça combine [compétence que je maîtrise] et [dimension qui m'attire] — j'ai validé ce choix par des rencontres terrain et une formation courte de découverte.",
        "Je veux faire quelque chose qui aide les gens — j'ai plusieurs pistes mais rien de défini."
      ],
      best:1,
      why:["Arriver sans aucun projet au bilan est possible, mais si vous avez une piste, la formuler clairement accélère le processus et permet un travail plus ciblé.","✅ Un métier nommé + une logique argumentée + une validation terrain = vous montrez que vous avez déjà travaillé sérieusement votre projet. Le bilan peut aller plus loin.","'Aider les gens' sans précision ne permet pas de travailler. 80% des personnes en reconversion donnent cette réponse — elle ne vous distingue pas et ne vous aide pas à avancer."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous visez un métier en tension mais avec des conditions de travail physiques exigeantes, et vous avez 45 ans. C'est réaliste selon vous ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Oui, je suis en pleine forme, l'âge n'est pas un problème pour moi. Je suis sûr(e) de pouvoir tenir le rythme. Ça ne m'inquiète pas du tout.",
        "J'ai conscience que la dimension physique est un vrai sujet à mon âge. J'ai déjà échangé avec des professionnels en poste depuis 10-15 ans pour comprendre comment ils tiennent dans la durée, et j'ai identifié des adaptations possibles si besoin.",
        "C'est vrai que ça m'inquiète un peu si je suis honnête. Je ne sais pas si je vais vraiment pouvoir tenir sur la durée. Peut-être que je devrais revoir mon projet."
      ],
      best:1,
      why:["Balayer la question physique sans aucune nuance peut indiquer que vous n'avez pas vraiment anticipé ce défi réel — un excès de confiance qui inquiète plus qu'il ne rassure un conseiller expérimenté.","✅ Reconnaître le défi tout en montrant une démarche d'anticipation concrète (témoignages terrain, adaptations identifiées) prouve une réflexion mature et lucide — exactement ce qu'un bon bilan doit révéler.","Douter ouvertement de son propre projet face à la première objection peut signaler un manque de conviction qui fragilise tout le travail de bilan déjà engagé."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre dossier de demande de transition mentionne votre projet, mais aucune démarche concrète déjà entreprise. Pourquoi ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je n'avais pas vraiment pensé à faire des démarches avant d'avoir le financement validé. Je voulais d'abord être sûr(e) que ça allait passer. C'est peut-être une erreur de ma part.",
        "Vous avez raison, je n'ai pas assez documenté mes démarches dans le dossier. En réalité, j'ai déjà fait une journée d'immersion et discuté avec deux professionnels du métier — je vais compléter le dossier avec ces éléments.",
        "Je pensais que ce n'était pas obligatoire de faire des démarches avant le bilan. Le conseiller m'avait dit que le bilan suffisait pour commencer. Je ne savais pas qu'il en fallait plus."
      ],
      best:1,
      why:["Attendre la validation du financement avant d'agir inverse l'ordre logique — les financeurs veulent justement voir des preuves d'engagement avant de s'engager eux-mêmes.","✅ Reconnaître le manque dans le dossier tout en révélant des démarches déjà réalisées (même non documentées) montre que le travail existe réellement — il suffit de mieux le formaliser.","Rejeter la responsabilité sur une information reçue ailleurs, même si c'est vrai, ne résout pas le problème actuel et peut sembler être une façon d'éviter sa propre responsabilité."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre projet de reconversion implique de déménager dans une autre région. Vous avez anticipé l'impact sur votre famille ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Pas encore vraiment, on verra ça si le projet se concrétise. Pour l'instant je me concentre sur la formation. C'est une étape à la fois.",
        "Oui, j'en ai déjà parlé avec mon entourage : on a identifié les contraintes principales — scolarité des enfants, emploi du conjoint — et envisagé un calendrier qui laisse le temps de s'organiser sans précipitation.",
        "C'est vrai que ça inquiète un peu ma famille, mais c'est mon projet avant tout, ils devront s'adapter. Je ne veux pas que ça freine ma décision. C'est moi qui dois avancer."
      ],
      best:1,
      why:["Repousser la réflexion familiale à plus tard alors que le déménagement est une condition du projet risque de créer un blocage tardif, une fois des engagements déjà pris.","✅ Avoir déjà ouvert le dialogue et identifié les contraintes concrètes avec un calendrier réaliste montre que le projet est pensé dans sa globalité, pas seulement du point de vue professionnel.","Minimiser l'impact sur la famille en présentant le projet comme uniquement personnel peut créer des tensions qui finissent par compromettre le projet lui-même, faute d'adhésion collective."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous voulez tester le métier visé en parallèle de votre emploi actuel avant de vous lancer. Comment vous organisez ça concrètement ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je n'ai pas encore de plan précis, je verrai au fur et à mesure comment m'organiser. L'idée me semble bonne en théorie. Je trouverai du temps quand il faudra.",
        "Je prévois des missions freelance le week-end dans le nouveau domaine, une formation courte en soirée, et un objectif clair : valider en 6 mois si le métier me convient avant de quitter mon poste actuel.",
        "Je vais juste démissionner directement et me lancer à fond, c'est la seule façon de vraiment tester selon moi. Tester à côté ne me semble pas sérieux. Je préfère y aller cash."
      ],
      best:1,
      why:["Une intention sans plan concret reste un vœu — sans organisation claire, le 'test' risque de ne jamais vraiment avoir lieu faute de temps disponible.","✅ Un plan structuré avec missions concrètes, formation et délai de validation défini est la méthode test & learn qui réduit le risque de la reconversion — exactement ce qu'un conseiller veut entendre.","Démissionner sans avoir testé le métier au préalable est le scénario le plus risqué — l'inverse de ce que le test & learn est censé éviter."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"Le jury VAE vous demande des preuves de compétences que vous n'avez pas documentées dans votre dossier. Comment vous réagissez ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je leur dis que je ne les ai pas et que ça devrait suffire avec ce que j'ai déjà fourni. Je ne vois pas pourquoi il en faudrait plus. J'espère qu'ils comprendront ma situation.",
        "Je reconnais le manque et je propose des preuves alternatives — témoignages d'anciens responsables, exemples détaillés à l'oral, documents complémentaires que je peux fournir dans les jours suivants si le jury l'accepte.",
        "Je panique un peu et je n'ai pas vraiment de réponse à leur donner sur le moment. Je dis que je ne sais pas. J'espère que ça ne compromet pas tout mon dossier."
      ],
      best:1,
      why:["Affirmer que les preuves existantes 'devraient suffire' sans rien proposer de plus laisse le jury sans solution — le silence sur le manque ne le fait pas disparaître.","✅ Reconnaître le manque tout en proposant immédiatement des alternatives concrètes (témoignages, détails oraux, documents complémentaires) montre votre capacité à réagir avec ressources — rassurant pour le jury.","Paniquer sans réponse construite, même légitime sous le coup de l'émotion, prive le jury d'éléments qui auraient pu être trouvés avec un minimum de recul."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Vous hésitez entre deux reconversions complètement différentes. Je suis censée vous aider à trancher — qu'est-ce que vous attendez de moi exactement ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "J'aimerais que vous me disiez laquelle est la meilleure option pour moi. Vous avez l'expérience, vous devez savoir mieux que moi. Je ferai ce que vous me conseillez.",
        "J'aimerais qu'on compare objectivement les deux pistes sur des critères concrets — revenus, formation nécessaire, marché de l'emploi local — pour m'aider à trancher avec des éléments factuels plutôt qu'avec mon seul instinct.",
        "Je ne sais pas vraiment, j'espérais que le bilan me donnerait la réponse automatiquement. Je n'ai pas vraiment de méthode pour choisir moi-même. C'est pour ça que je viens vous voir."
      ],
      best:1,
      why:["Demander au conseiller de décider à votre place transfère une responsabilité qui doit rester la vôtre — le bilan vous outille, il ne décide pas pour vous.","✅ Proposer une grille de critères concrets à comparer ensemble est la posture la plus constructive : vous restez décideur tout en utilisant l'expertise du conseiller pour structurer votre réflexion.","Attendre que le bilan 'donne la réponse' automatiquement reflète une passivité qui ne prépare pas à la suite — une reconversion réussie demande une appropriation active du choix final."],
      skills:{posture:2,clarte:2,strategie:3}
    },
    {
      context:"Le métier que vous visez est identifié comme fortement menacé par l'IA dans les 5 prochaines années. Vous avez anticipé ce risque ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Je n'avais pas vraiment pensé à ça, mais je ne pense pas que ça va aller si vite que ça. Je préfère ne pas trop m'inquiéter de ce risque. On verra dans 5 ans.",
        "J'ai effectivement regardé cette question — je vise une spécialisation moins automatisable, la dimension relationnelle et le conseil sur-mesure, justement pour me positionner sur ce qui restera difficilement remplaçable par l'IA à moyen terme.",
        "Si c'est vraiment menacé, je devrais peut-être complètement abandonner ce projet et chercher autre chose. Ça remet tout en question pour moi. Je ne sais plus quoi penser."
      ],
      best:1,
      why:["Ignorer le risque en espérant qu'il n'arrivera pas rapidement n'est pas une stratégie — c'est un pari risqué sur un projet qui demande souvent plusieurs années d'investissement.","✅ Avoir identifié une niche moins automatisable au sein du même métier montre une anticipation stratégique réelle — vous transformez une menace générale en angle de différenciation personnel.","Abandonner le projet à la première objection sur l'avenir du métier est une réaction excessive qui ignore que de nombreux métiers évoluent sans disparaître complètement."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez déjà tenté une reconversion il y a 3 ans qui n'a pas abouti. Qu'est-ce qui sera différent cette fois ?",
      persona:"Isabelle Renard — Conseillère CPF",
      opts:[
        "Cette fois je suis vraiment motivé(e), contrairement à la dernière fois où je n'étais pas assez sérieux(se). Je sais que ça va marcher cette fois. J'ai juste plus envie.",
        "La dernière fois, je m'étais lancé sans financement sécurisé et sans avoir testé le métier au préalable — j'ai dû arrêter en cours de formation pour des raisons financières. Cette fois, j'ai un plan de financement complet et j'ai déjà fait une immersion terrain.",
        "Honnêtement je ne sais pas trop ce qui sera différent, j'espère juste que ça ira mieux cette fois. Peut-être que c'était juste pas le bon moment avant. Je vais réessayer en croisant les doigts."
      ],
      best:1,
      why:["Invoquer uniquement la motivation comme différence, sans identifier ce qui a concrètement échoué avant, ne garantit rien — la motivation seule n'avait probablement pas manqué la première fois non plus.","✅ Identifier la cause concrète de l'échec précédent (financement, absence de test) et montrer ce qui est différent cette fois (plan, immersion) prouve un apprentissage réel de l'expérience passée — la meilleure garantie possible.","Espérer que 'ça ira mieux' sans comprendre ce qui a vraiment échoué expose au risque de répéter exactement la même erreur."],
      skills:{posture:2,clarte:3,strategie:3}
    }
  ],

    freelance:[
    {
      context:"Bonjour, j'ai 20 minutes. J'ai vu votre profil. Dites-moi : vous avez fait quoi exactement sur React ces 2 dernières années ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "J'ai travaillé sur plusieurs projets React, des applications web, du front-end, des composants, ce genre de choses.",
        "J'ai livré 3 projets React en production : une SaaS RH (15k utilisateurs), un dashboard analytics avec recharts, et une PWA e-commerce. En mode hooks, context API, et j'ai migré une base legacy de class components vers fonctionnel.",
        "J'ai une bonne expertise React, je suis à l'aise avec le framework et ses écosystèmes."
      ],
      best:1,
      why:["Parler de 'plusieurs projets' sans détailler, c'est aussi vague que rien. Un CTO pressé a besoin de faits, pas de catégories génériques.","✅ Chiffres concrets (15k users), noms de stack (recharts, hooks, context), et preuve d'expertise avancée (migration legacy) — vous parlez le langage d'un tech. Décisif en 20 secondes.","'Bonne expertise' et 'à l'aise' sans preuve sont des affirmations auto-déclarées. N'importe qui peut le dire — personne ne le croit sans exemples."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre TJM c'est combien ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Ça dépend du projet, je suis flexible sur le prix.",
        "Mon TJM est de 550 € pour une mission de plus de 2 mois. Pour des missions courtes ou ponctuelles, je monte à 650 €. Je peux vous présenter mes références et un devis détaillé.",
        "Je suis autour de 400-500 €, négociable selon les conditions."
      ],
      best:1,
      why:["'Je suis flexible' est perçu comme de l'insécurité ou de l'amateurisme. Les freelances sérieux connaissent leur valeur et la défendent.","✅ Annoncer un TJM clair avec une logique (durée de mission) + proposer des références et un devis = posture professionnelle complète. Thomas voit quelqu'un de structuré.","Une fourchette basse 'négociable' vous positionne d'emblée en dessous du marché. Si vous commencez bas, vous n'irez pas vers le haut."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"On a besoin de vous dès lundi. Vous êtes dispo ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Oui pas de problème, je me libère pour vous.",
        "Je peux démarrer lundi sous réserve de signature du contrat et des détails techniques d'onboarding aujourd'hui ou demain. Vous avez un contrat de prestation prêt ?",
        "Lundi c'est court, j'ai d'autres engagements mais je peux essayer d'arranger."
      ],
      best:2,
      why:["Dire 'je me libère pour vous' signale que vous n'avez pas d'autres missions — vous perdez du pouvoir et vous prenez des risques (annulation sans préavis, pas de contrat signé).","Confirmer la disponibilité MAIS conditionner à la contractualisation est la réponse d'un freelance professionnel. Vous protégez votre temps et vous cadrez la relation dès le départ.","✅ Tergiverser sur la disponibilité peut faire douter de votre engagement. Si vous êtes dispo, dites-le — mais encadrez."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"3 mois de mission, mais on pourrait avoir besoin de vous prolonger. Comment vous gérez ça ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Super, plus c'est long mieux c'est, je suis partant pour une prolongation.",
        "Je suis ouvert à la prolongation, mais ça se cadre contractuellement avec un avenant. Je préfère qu'on en parle à J-30 pour que chacun puisse s'organiser.",
        "Ça dépend, si j'ai d'autres missions à cette période je ne peux pas promettre."
      ],
      best:2,
      why:["Être enthousiaste sans mentionner le cadre contractuel montre un manque d'expérience freelance. Les prolongations sans avenant créent des litiges.","Ouverture + cadre juridique (avenant) + délai de prévenance = vous gérez votre activité comme un pro. Thomas sait qu'il travaille avec quelqu'un de sérieux.","✅ Une réponse conditionnelle flotte dans le vide. Vous ne vous engagez pas et vous ne proposez pas de solution. Peu rassurant."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez des références ? Des clients avec qui on pourrait vérifier votre travail ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Oui bien sûr, je vous enverrai quelques contacts si on avance.",
        "Absolument. Je vous transmets 2 contacts dès aujourd'hui : le CTO de [client A] qui a supervisé la SaaS RH, et le Product Owner de [client B] pour la PWA. Je peux aussi vous montrer des extraits de code sur GitHub (repo privé, accès sur demande).",
        "J'ai des références mais je préfère garder l'identité de mes clients confidentielle."
      ],
      best:1,
      why:["'Si on avance' est flou et passif. Vous retardez une étape que Thomas veut valider maintenant. Ça freine la décision.","✅ Proposer des références immédiates + un accès code (GitHub) donne à Thomas tout ce dont il a besoin pour décider vite. Vous réduisez les frictions à zéro.","La confidentialité totale sur les références est un signal d'alarme. Même en restant général, vous pouvez proposer quelqu'un à contacter."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Dernière question : qu'est-ce qui vous différencie d'un autre développeur React sur le marché ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je suis sérieux, disponible et je livre dans les délais.",
        "Ce qui me différencie : je ne livre pas que du code — je comprends le produit. Sur mes missions, j'ai régulièrement identifié des problèmes UX ou métier en avance, ce qui a évité 2 refactors coûteux. Et je travaille de façon autonome — vous n'avez pas à me manager.",
        "J'ai beaucoup d'expérience et je m'adapte à tous les contextes techniques."
      ],
      best:1,
      why:["'Sérieux et disponible' est la réponse la plus commune — et la plus oubliable. Tout le monde dit ça. Vous n'avez aucun avantage distinctif.","✅ Vous allez au-delà du code (vision produit + prévention de problèmes + autonomie) et vous chiffrez l'impact (2 refactors évités). Un freelance qui pense comme un partenaire business, pas comme un exécutant — c'est ce que recherche Thomas.","'Beaucoup d'expérience' sans exemple précis et 's'adapte' sans preuve = affirmations creuses. Un autre candidat peut dire exactement la même chose."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On a eu un mauvais freelance avant vous — il ne répondait pas aux messages. Comment vous fonctionnez ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je réponds toujours aux messages, c'est une question de respect.",
        "Sur mes missions, je propose un point de communication structuré : un canal défini (Slack/email), des réponses sous 2h en heures ouvrables, un résumé hebdomadaire d'avancement. Vous savez toujours où j'en suis sans devoir me relancer.",
        "Vous pouvez me contacter quand vous voulez, 7j/7 si besoin."
      ],
      best:1,
      why:["'Je réponds toujours' est vague et difficile à vérifier. La promesse sans méthode ne rassure pas quelqu'un qui a déjà été déçu.","✅ Canal défini + délai de réponse précis + résumé hebdomadaire = vous proposez un protocole concret. Le client peut visualiser comment ça va fonctionner. C'est rassurant.","Promettre d'être disponible 7j/7 peut sembler excessif et peut aussi indiquer une absence de cadre pro. Mieux vaut des horaires clairs que de la disponibilité totale."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes cher. On a des profils à 250€/j sur Malt. Pourquoi vous payer 550€ ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je peux faire un effort, je descendrais à 450€ si vous prenez la mission.",
        "Les profils à 250€/j sont souvent des juniors ou des profils offshore. Mon TJM reflète 7 ans d'expertise React, des projets en production avec des millions d'utilisateurs, et une autonomie qui réduit votre coût de management. Le coût total d'une mission mal exécutée dépasse largement la différence de TJM.",
        "Mon tarif est non négociable — c'est ma valeur de marché."
      ],
      best:1,
      why:["Baisser son TJM dès la première objection vous positionne comme quelqu'un qui ne croit pas en sa valeur — et établit un mauvais précédent.","✅ Défendre son tarif en contextualisant la comparaison + chiffrant le coût d'une mauvaise mission = vous vendez de la valeur, pas de la disponibilité. C'est la posture d'un expert confiant.","'Non négociable' sans justification peut paraître arrogant. Toujours expliquer pourquoi votre tarif est ce qu'il est."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"La mission commence dans 2 semaines. Vous aurez le temps de prendre connaissance du projet ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "Je ferai de mon mieux avec le temps disponible.",
        "2 semaines c'est suffisant si vous me partagez maintenant la documentation technique et les accès en lecture aux dépôts. Je peux faire une lecture approfondie en dehors de la mission et arriver avec mes premières questions structurées dès le jour 1.",
        "Non, 2 semaines c'est très court — il me faudrait au moins un mois."],
      best:2,
      why:["'Je ferai de mon mieux' est vague et peut inquiéter sur votre rigueur de préparation.","Demander les ressources en amont + proposer une préparation proactive + arriver avec des questions structurées = vous montrez que vous êtes déjà dans l'état d'esprit de la mission. Rassurant.","✅ Exiger un délai plus long sans proposer d'alternative peut faire perdre la mission à quelqu'un de plus agile."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Avez-vous déjà géré une crise sur un projet — un bug critique en production par exemple ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Oui, une fois — mais le bug venait d'un autre dev, pas de moi.",
        "Oui — sur [projet], une API externe a cassé en production un vendredi soir. J'ai isolé le problème en 30 minutes, déployé un fallback en attendant le correctif, communiqué à toutes les 2h avec le client, et livré le fix définitif le lendemain matin. Zéro données perdues.",
        "Non, j'ai la chance de ne jamais avoir eu de bugs critiques."],
      best:1,
      why:["Rejeter la faute sur un autre dev montre que vous n'êtes pas dans une posture de propriété collective du code. Pas rassurant.","✅ Timeline précise + isolation + fallback + communication + résolution = vous montrez exactement comment vous gérez une crise. C'est ce qu'un CTO veut entendre — quelqu'un qui résout les problèmes, pas quelqu'un qui en est immunisé.","Prétendre ne jamais avoir eu de bugs critiques n'est pas crédible après plusieurs années d'expérience."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes sur 2 missions en parallèle. Comment vous gérez votre temps ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "J'essaie de gérer au mieux, ça dépend des semaines.",
        "Chaque mission a ses créneaux dédiés et ses jalons clairs. Je communique en amont sur mes disponibilités et je ne prends jamais de second client si ça compromet les engagements du premier. Si un pic de charge se présente, je préviens immédiatement et on s'adapte.",
        "Je suis très organisé — ça n'a jamais posé de problème."],
      best:1,
      why:["'J'essaie de gérer' sans méthode inquiète. Ça suggère que vous improvise au fil des urgences.","✅ Créneaux dédiés + engagement de transparence + prévention proactive des conflits de charge = vous êtes un freelance qui se gère comme un professionnel. Ça rassure.","'Ça n'a jamais posé de problème' sans méthode explicite n'est pas convaincant. Et si ça posait problème demain ?"],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On aimerait que vous intégriez notre Slack et nos rituels d'équipe. C'est compatible avec votre statut freelance ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "Non, je préfère rester externe et travailler de façon indépendante.",
        "Oui, je peux m'intégrer dans votre flux de communication tant que mes contributions restent liées aux livrables définis. J'ai fait ça sur d'autres missions — ça améliore la collaboration. Notons juste que la participation aux rituels est incluse dans le scope pour éviter toute ambiguïté de facturation.",
        "Bien sûr, je suis disponible pour toutes vos réunions et rituels sans limite."],
      best:1,
      why:["Refuser l'intégration aux outils peut créer de la friction inutile. La collaboration fluide est dans l'intérêt des deux parties.","✅ Ouverture à l'intégration + protection de votre statut via cadrage du scope + clarification facturation = vous collaborez sans vous laisser glisser vers la présomption de salariat.","S'engager à 'toutes les réunions sans limite' sans cadrage ouvre la voie au scope creep et potentiellement à la requalification."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre portfolio montre des projets anciens. Vous avez quoi de récent ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je n'ai pas eu le temps de mettre à jour mon portfolio.",
        "Mon portfolio public ne montre que les projets dont j'ai l'autorisation de diffuser. Mes missions récentes sont sous NDA mais je peux vous décrire précisément les stacks, les problèmes résolus et les résultats — et proposer un entretien technique pour valider mes compétences actuelles.",
        "Les projets anciens montrent quand même une expertise solide — les technos changent peu."],
      best:1,
      why:["'Je n'ai pas eu le temps' est la pire réponse. Un portfolio est votre vitrine — ne pas le maintenir est un signal de désinvestissement.","✅ NDA contextualisé + alternative concrète (description + entretien tech) = vous gérez la contrainte de confidentialité professionnellement tout en proposant une validation alternative. Très solide.","Prétendre que les technos changent peu est dangereux en 2025. Le marché tech évolue vite — et cette réponse peut sembler defensif et déconnecté."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On a besoin que vous formiez notre équipe interne sur React en parallèle de votre mission de dev. C'est ok ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "D'accord — ça fait partie de mon engagement client.",
        "Je peux inclure de la transmission de connaissances, mais c'est une activité distincte de la mission de développement. Elle a un tarif et un scope séparés. Si vous le souhaitez, je peux vous faire une proposition pour un accompagnement structuré — workshops, code reviews, documentation — en complément.",
        "Non, je suis développeur, pas formateur — ce n'est pas ma mission."],
      best:0,
      why:["✅ Accepter de former en plus de dev sans facturation séparée vous engage sur une charge de travail non prévue et non rémunérée.","Identifier la formation comme une prestation distincte + proposer un scope et tarif séparés = vous valorisez votre expertise sans bloquer la collaboration. C'est de la gestion de scope professionnelle.","Refuser catégoriquement peut sembler rigide et peut faire perdre une opportunité de mission complémentaire intéressante."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous avez une autre offre en cours. On doit attendre combien de temps pour votre décision ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Donnez-moi 2 semaines, je dois peser les options.",
        "Je peux vous donner une réponse définitive dans 48-72h. Si vous souhaitez accélérer, une confirmation des conditions discutées suffit pour que je me positionne rapidement. Je ne mets pas les clients en attente inutilement.",
        "Je choisis qui me paye le mieux — faites votre meilleure offre."],
      best:2,
      why:["2 semaines est trop long dans un contexte startup. Vous risquez de perdre la mission ou d'irriter le client.","Délai court et raisonnable + condition claire pour accélérer = vous gérez le timing avec professionnalisme. Vous créez de l'urgence sans pressure inutile.","✅ 'Qui paye le mieux' est honnête mais brutal. Ça positionne la relation comme purement transactionnelle — pas idéal pour la confiance."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Ce projet est une opportunité unique mais le budget est serré. On ne peut pas aller au-delà de 400€/j.",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "400€ c'est très bas — je ne peux pas descendre en dessous de mon TJM.",
        "400€/j est sous mon TJM habituel. Si le projet est vraiment intéressant et la durée suffisante, on peut explorer une structure différente : TJM réduit en échange d'un engagement plus long, ou un accord sur une revalorisation après les 2 premiers mois. Qu'est-ce qui est flexible de votre côté ?",
        "D'accord pour 400€ — l'expérience vaut le sacrifice."],
      best:1,
      why:["Refuser net sans exploration peut faire rater une bonne mission. Mais baisser sans condition vous sous-value aussi.","✅ Reconnaître la contrainte + proposer des structures alternatives (durée, revalorisation) + questionner les marges de manœuvre = vous négociez intelligemment. C'est de la valeur pour les deux parties.","Accepter 'pour l'expérience' établit un mauvais précédent et signale un manque de confiance en votre valeur marchande."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Vous êtes expert backend mais la mission nécessite aussi du frontend. Comment vous gérez ça ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je peux tout faire — je suis full-stack.",
        "Mon expertise principale est backend. Sur le frontend, je suis opérationnel sur [technologies spécifiques] mais moins rapide que sur mon cœur de métier. Si la mission nécessite du frontend avancé, il serait plus efficient d'avoir un spécialiste en complément, ou je peux prendre en charge la partie backend pur pour en faire plus.",
        "Je ferai du frontend si nécessaire — j'apprends vite."],
      best:1,
      why:["Se déclarer 'full-stack' sans qualification est souvent perçu comme une surestimation. Les CTOs sont méfiants avec ce terme.","✅ Honnêteté sur ses limites + niveau réel précisé + proposition alternative = vous êtes quelqu'un sur qui on peut compter pour dire la vérité. Ça crée de la confiance.","'J'apprends vite' sur un domaine pour lequel vous êtes payé à la journée ne rassure pas sur la qualité du livrable."],
      skills:{posture:3,clarte:2,strategie:2}
    },
    {
      context:"On aimerait que vous soyez au bureau 3 jours par semaine. Ça vous convient ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "Non, je travaille uniquement en remote — c'est une condition non négociable.",
        "Je comprends le besoin de présence physique pour la collaboration. 3 jours sur 5 est plus que ce que je pratique généralement. Je peux m'engager sur 1-2 jours en présentiel ciblés sur les réunions clés et les phases de lancement — avec du remote pour la production. Qu'est-ce qui est vraiment essentiel pour vous ?",
        "Pas de problème — je peux être là tous les jours si besoin."],
      best:0,
      why:["✅ Refuser catégoriquement une demande raisonnable sans alternative peut vous faire perdre la mission.","Reconnaître le besoin + proposer un compromis ciblé (jours à fort impact) + questionner les priorités réelles = vous collaborez sans vous laisser imposer des conditions qui impactent votre modèle de travail.","Accepter 'tous les jours si besoin' efface votre indépendance et peut créer des conflits avec vos autres clients."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre devis n'est pas très détaillé. Comment vous fixez vos prix ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je fixe un TJM et je facture le temps passé — c'est simple.",
        "Mon TJM est basé sur mon expertise sectorielle, les niveaux du marché pour des profils similaires, et la complexité de la mission. Je peux vous fournir un devis détaillé avec les livrables, les jalons et les hypothèses de durée — ça permettra d'aligner nos attentes et de piloter ensemble l'avancement.",
        "Je facture ce que le marché paie pour mon niveau."],
      best:0,
      why:["✅ 'Je facture le temps passé' sans détail sur les livrables n'est pas rassurant pour un client qui veut contrôler son budget.","Justification du tarif + offre de détail + alignement sur les attentes = vous transformez le devis en outil de pilotage collaboratif. Le client se sent partenaire, pas acheteur à l'aveugle.","'Ce que le marché paie' sans plus d'explication ne différencie pas votre valeur et peut sembler évasif."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On vous propose une mission de 6 mois mais avec option de renouvellement pour 18 mois. Comment vous vous positionnez ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "J'accepte les 6 mois — pour la suite on verra.",
        "Un engagement de 6 mois avec option de 18 c'est intéressant pour les deux parties. Pour sécuriser cette durée, je propose de formaliser l'option de renouvellement avec un délai de prévenance de 4 semaines et une condition de revalorisation du TJM au-delà des 6 premiers mois.",
        "Je préfère des missions courtes — 18 mois c'est trop long pour un freelance."],
      best:0,
      why:["✅ Accepter sans formaliser l'option vous expose à une incertitude maximale après 6 mois.","Formaliser l'option + délai de prévenance + condition de revalorisation = vous transformez une promesse vague en accord structuré. C'est de la gestion de relation client sérieuse.","Refuser les missions longues peut sembler pragmatique mais limite votre capacité à construire une relation client de qualité."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Un autre prestataire a dit que votre approche technique est dépassée. Que répondez-vous ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "C'est faux — je suis toujours à la pointe.",
        "C'est une affirmation sans contexte. Je suis toujours mes domaines d'expertise via [veille concrète : newsletters, conférences, contributions open source]. Si votre prestataire a un point de vue précis sur un choix technique spécifique, je suis prêt à en discuter sur des faits — c'est la seule façon de progresser.",
        "Il n'a probablement pas les mêmes standards que moi."],
      best:1,
      why:["'C'est faux' sans argument ne défend rien et peut sembler défensif.","✅ Contextualiser l'accusation + démontrer votre veille + proposer un débat factuel = vous répondez avec confiance et ouverture. Vous ne vous défendez pas — vous vous positionnez.","Critiquer l'autre prestataire vous positionne dans un jeu de territoire peu professionnel."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Vous avez signé un devis mais le projet a doublé en scope. Comment vous gérez ça ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "J'absorbe — pour garder le client, je ne veux pas paraître difficile.",
        "Le scope initial est documenté dans le devis signé. Ce qui dépasse ce périmètre fait l'objet d'un avenant — c'est une pratique standard qui protège les deux parties. Je vais identifier précisément ce qui a changé et vous proposer un avenant avec les délais et coûts correspondants.",
        "Je facturerai simplement le temps supplémentaire sans prévenir."],
      best:2,
      why:["Absorber le scope creep vous under-valorise et crée un ressentiment qui finit par détruire la relation client.","Référencer le devis signé + avenant formel + protection bilatérale = vous gérez le scope comme un professionnel. C'est dans l'intérêt du client autant que le vôtre.","✅ Facturer sans prévenir est la meilleure façon de perdre un client. La communication est toujours préférable à la surprise."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"Qu'est-ce que vous cherchez vraiment dans vos missions — au-delà de l'argent ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "La liberté — ne pas avoir de chef et faire ce que je veux.",
        "Ce qui m'anime, c'est la résolution de problèmes complexes avec un impact mesurable. Je cherche des projets où ma contribution change réellement quelque chose — une performance améliorée, un produit qui passe à l'échelle, une équipe qui monte en compétences. L'argent est important, mais c'est le marqueur de la valeur créée, pas la fin en soi.",
        "Honnêtement, j'optimise pour la rémunération — c'est logique pour un freelance."],
      best:1,
      why:["'Faire ce que je veux' est une réponse honnête mais peu séduisante pour un client qui veut un partenaire, pas un individualiste.","✅ Impact mesurable + résolution de problèmes complexes + développement d'équipe = vous parlez le langage d'un professionnel qui pense valeur. C'est exactement le type de partenaire qu'un bon client cherche.","Optimiser pour la rémunération en premier semble honnête mais peut décourager des clients qui veulent de l'engagement au-delà du TJM."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"On vous propose une mission dans un domaine que vous maîtrisez mais avec une stack technique que vous ne connaissez pas. Comment vous positionnez-vous ?",
      persona:"Thomas Girard — CTO startup",
      opts:[
        "Je refuse — je ne travaille que sur des stacks que je maîtrise parfaitement.",
        "Je suis honnête sur ma courbe d'apprentissage estimée, je propose une phase de montée en compétences documentée et je m'engage sur les jalons. Si le délai est trop court, on ajuste le scope.",
        "J'accepte sans mentionner l'inconnu — j'apprendrai en mission, ça s'est toujours bien passé."
      ],
      best:0,
      why:["✅ Refuser toutes les missions hors zone de confort vous enferme dans votre spécialité. Les meilleures opportunités sont souvent à la frontière.","Honnêteté sur la courbe d'apprentissage + plan de montée en compétences + engagement sur les jalons = vous gérez le risque de façon professionnelle. Le client sait à quoi s'attendre.","Accepter sans dire que vous ne connaissez pas la stack expose votre client à une surprise désagréable en cours de mission."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Votre client vous demande un rapport de fin de mission. Qu'est-ce que vous y mettez ?",
      persona:"Nadia Chawki — Product Manager scale-up",
      opts:[
        "Je liste les tâches réalisées et les fichiers livrés.",
        "Je documente : objectifs initiaux vs résultats obtenus, livrables et leur état, décisions prises et leur raisonnement, points d'attention pour la suite, et recommandations pour continuer sans moi.",
        "Je n'en fais pas — les livrables parlent d'eux-mêmes."
      ],
      best:2,
      why:["Une liste de tâches n'est pas un rapport. Elle ne contextualise pas, ne valorise pas votre travail, et ne prépare pas la suite.","Un rapport complet compare les objectifs aux résultats + documente les décisions + prépare la continuité. C'est votre dernière opportunité de montrer votre valeur et de sécuriser un renouvellement.","✅ Ne pas faire de rapport de fin de mission est une opportunité manquée. C'est souvent ce qui décide un client à vous rappeler ou non."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Ça fait 8 mois qu'on travaille ensemble. Vous voulez passer votre TJM de 500 à 580 €. Pourquoi je devrais accepter ?",
      persona:"Élodie Mercier — Directrice marketing, PME retail",
      opts:[
        "Le coût de la vie augmente, donc je pense que c'est légitime de réévaluer mon tarif après plusieurs mois. C'est une pratique courante chez les indépendants. J'espère que vous comprendrez ma démarche.",
        "Depuis 8 mois, j'ai pris en charge des sujets hors périmètre initial — refonte du tunnel de conversion, formation de votre équipe interne. Cette revalorisation reflète la valeur réellement livrée, pas l'inflation. On peut en reparler ensemble si besoin.",
        "C'est le tarif que je facture à mes nouveaux clients désormais. Il me semble logique de m'aligner avec vous aussi. Sinon je risque de devoir réduire le temps consacré à votre projet."
      ],
      best:1,
      why:["L'argument du coût de la vie est recevable mais faible isolé — il ne parle pas de valeur, seulement de pouvoir d'achat. Un client négocie facilement contre ce type d'argument.","✅ Documenter précisément ce qui a été livré au-delà du périmètre initial transforme la demande d'augmentation en juste rattrapage de valeur, pas en caprice tarifaire. C'est l'argument le plus solide en renégociation.","Comparer à 'mes nouveaux clients' peut sembler légitime, mais sans lien avec la valeur livrée à CE client précis, ça ressemble à un alignement administratif plutôt qu'à une négociation argumentée."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"Désolé, la trésorerie est un peu tendue ce mois-ci. Je vous paie dès que je peux, promis.",
      persona:"Karim Benali — Fondateur e-commerce",
      opts:[
        "Pas de souci, prenez votre temps, je sais que c'est compliqué pour les jeunes entreprises. On verra ça quand vous pourrez. Pas de stress de mon côté.",
        "Je comprends la contrainte de trésorerie, mais cette facture est due depuis 45 jours et nos CGV prévoient des pénalités de retard. Pouvons-nous fixer une date précise cette semaine, même pour un paiement partiel ?",
        "Si je ne suis pas payé d'ici 5 jours, j'arrête immédiatement toute prestation en cours. Je ne peux pas continuer à travailler sans visibilité sur le paiement. C'est une question de principe pour moi."
      ],
      best:1,
      why:["Accepter d'attendre indéfiniment sans date précise, c'est se mettre en position de créancier oublié. La gentillesse sans cadre ne sécurise rien.","✅ Rappeler le cadre contractuel (délai, pénalités) tout en proposant une solution concrète (date, paiement partiel) garde la relation professionnelle intacte tout en faisant avancer le dossier. C'est ferme et constructif.","Une menace d'arrêt immédiat est un levier réel mais à garder en dernier recours, après une tentative de cadrage. Dégainer trop vite peut couper une relation client encore récupérable."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On a besoin de récupérer 100% des droits sur le code et les designs, y compris vos composants réutilisables. C'est inclus dans le forfait, non ?",
      persona:"Julien Roche — Lead produit fintech",
      opts:[
        "Oui bien sûr, c'est inclus, je vous transfère tout sans distinction. Mes composants et mon code vous appartiennent intégralement. Pas de souci de mon côté.",
        "Les livrables spécifiques à votre projet vous appartiennent dès le paiement intégral. Mes composants réutilisables développés avant cette mission restent ma propriété, avec une licence d'usage illimitée pour vous. Une cession totale aurait un coût additionnel.",
        "Non, je garde tous les droits, vous avez seulement un droit d'usage limité à 1 an. Au-delà, il faudra renégocier une licence. C'est ma politique standard avec tous mes clients."
      ],
      best:1,
      why:["Céder sans distinction tout ce que vous avez créé — y compris vos outils et composants construits avant cette mission — vous prive d'un capital de travail précieux pour vos futures missions.","✅ Distinguer le spécifique (cédé) du réutilisable (licencié) est la pratique professionnelle standard. Ça protège votre patrimoine technique sans bloquer le client, qui obtient bien ce dont il a besoin.","Refuser toute cession et limiter à 1 an peut sembler protecteur, mais c'est disproportionné pour les livrables spécifiques au projet — le client a payé pour les utiliser durablement."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Tant que vous y êtes, vous pouvez aussi ajouter le module de reporting et l'export PDF ? Ce n'est pas grand-chose en plus.",
      persona:"Sophie Lambert — Directrice opérations, scale-up SaaS",
      opts:[
        "Pas de problème, je l'intègre dans la foulée. Ça ne devrait pas prendre beaucoup de temps. Je vous tiens au courant de l'avancement.",
        "Ce module de reporting et l'export PDF ne faisaient pas partie du périmètre initial du devis. Je peux l'estimer et vous faire un avenant chiffré — comptez environ 3 jours. On valide ensemble avant que je démarre ?",
        "Non, ça sort complètement du cadre, il faudra ouvrir une nouvelle mission. Je ne peux pas l'intégrer avant au moins 2 mois. Mon planning actuel ne le permet pas."
      ],
      best:1,
      why:["Dire oui systématiquement aux demandes hors scope, même 'petites', normalise le glissement de périmètre — et vous travaillez gratuitement sans vous en rendre compte.","✅ Documenter, chiffrer via un avenant et valider avant de démarrer protège votre temps tout en restant accommodant. Le client garde le choix, vous gardez le cadre.","Refuser brutalement et renvoyer à une mission lointaine peut frustrer un client par ailleurs satisfait, alors qu'un avenant rapide aurait suffi à traiter la demande sans perdre la relation."],
      skills:{posture:3,clarte:3,strategie:2}
    },
    {
      context:"On veut que vous travailliez exclusivement pour nous pendant la durée du contrat, sans autres clients. C'est une condition pour signer.",
      persona:"Vincent Hamon — DG, PME industrielle",
      opts:[
        "D'accord, j'accepte l'exclusivité, ça simplifiera les choses. Je me concentre uniquement sur votre mission. Pas de problème pour moi.",
        "Je peux envisager l'exclusivité, mais elle doit être compensée financièrement — typiquement 20 à 30% de majoration du TJM — et limitée dans le temps et le périmètre. Ça protège mon statut d'indépendant multi-clients.",
        "Non, l'exclusivité est hors de question, je ne signe jamais ce type de clause. C'est une ligne rouge pour moi. Je préfère décliner la mission plutôt que d'accepter."
      ],
      best:1,
      why:["Accepter l'exclusivité sans compensation ni limite, c'est renoncer à une partie de votre activité sans contrepartie — un risque financier et juridique (requalification en salariat).","✅ Poser une condition de compensation et de limitation dans le temps protège votre activité tout en laissant une porte ouverte à la négociation. C'est la réponse d'un professionnel qui connaît ses droits.","Refuser catégoriquement sans proposer d'alternative peut faire perdre une mission intéressante, alors qu'une exclusivité encadrée et compensée aurait pu satisfaire les deux parties."],
      skills:{posture:3,clarte:2,strategie:3}
    },
    {
      context:"On va arrêter la mission plus tôt que prévu, le projet est mis en pause côté direction. Vous pouvez partir dès la semaine prochaine ?",
      persona:"Camille Roussel — Head of Product, média en ligne",
      opts:[
        "Pas de souci, je libère le planning dès la semaine prochaine sans problème. Je m'adapte à votre situation. Pas de question particulière de mon côté.",
        "Notre contrat prévoit un préavis de 30 jours en cas d'arrêt anticipé. Je peux être flexible sur la transition, mais discutons soit du respect du préavis, soit d'une indemnité compensatoire si vous voulez écourter.",
        "C'est impossible, je refuse tout arrêt anticipé, le contrat va jusqu'au bout. Je ne peux pas accepter cette rupture. Il faudra honorer l'intégralité de la durée prévue."
      ],
      best:1,
      why:["Accepter un départ immédiat sans évoquer le préavis contractuel vous fait perdre un revenu prévu et normalise les ruptures sans compensation pour vos futurs clients.","✅ Rappeler la clause de préavis tout en proposant de la flexibilité (transition ou indemnité) défend vos intérêts sans braquer le client. C'est ferme sur le principe, souple sur la forme.","Refuser catégoriquement tout arrêt anticipé peut être contre-productif si le projet est réellement arrêté côté client — mieux vaut négocier une indemnité que s'accrocher à un contrat que le client ne peut plus honorer."],
      skills:{posture:2,clarte:3,strategie:3}
    },
    {
      context:"Une agence nous propose la même prestation à 30% moins cher, avec un délai plus court. Pourquoi je continuerais avec vous ?",
      persona:"Antoine Berger — Directeur technique, agence de communication",
      opts:[
        "Si c'est une question de prix, je peux m'aligner sur leur tarif pour garder la mission. Je préfère baisser plutôt que de perdre le contrat. Dites-moi le montant exact qu'ils proposent.",
        "Une agence répartit le travail entre plusieurs profils, souvent moins seniors, avec des coûts de structure. Avec moi, vous avez un interlocuteur unique et zéro temps de réapprentissage. Le coût réel d'un changement dépasse souvent l'écart de TJM affiché.",
        "Si vous trouvez mieux ailleurs, allez-y, je ne vais pas me justifier. C'est votre décision. Je n'ai pas vocation à concurrencer sur le prix."
      ],
      best:1,
      why:["S'aligner immédiatement sur un prix concurrent dévalue votre expertise et envoie le signal que votre tarif initial n'était pas justifié.","✅ Argumenter sur la valeur réelle (continuité, connaissance du produit, absence de coût de réapprentissage) déplace la conversation du prix vers la valeur totale — c'est la réponse la plus solide face à une comparaison tarifaire.","Une réponse désinvolte peut sembler confiante, mais sans argumentation, elle laisse le client sans raison concrète de rester — il risque de partir par défaut."],
      skills:{posture:3,clarte:3,strategie:3}
    },
    {
      context:"Pour le renouvellement du contrat, notre service achats impose désormais un paiement à 60 jours au lieu de 30. C'est notre politique groupe, non négociable.",
      persona:"Nora Benyamina — Responsable achats, grand groupe",
      opts:[
        "D'accord, j'accepte les 60 jours, ce n'est pas grave. Je m'adapte à votre politique groupe. Pas de problème pour moi.",
        "Je comprends la politique groupe, mais un délai de 60 jours impacte directement ma trésorerie d'indépendant. Je propose un compromis : je maintiens mon tarif si on reste à 30 jours, ou j'applique une majoration de 5% sinon.",
        "Je refuse, je n'accepte jamais plus de 30 jours, c'est une ligne rouge absolue. Sans cet accord, je ne peux pas signer le renouvellement. Il faudra trouver un autre prestataire."
      ],
      best:1,
      why:["Accepter sans contrepartie un allongement du délai de paiement, c'est financer gratuitement la trésorerie du client — un coût caché qui pèse souvent plus qu'on ne l'imagine.","✅ Proposer un compromis chiffré (maintien du tarif si 30 jours, ou majoration si 60 jours) transforme une contrainte imposée en négociation équilibrée. Vous montrez que vous comprenez l'enjeu tout en protégeant votre activité.","Une ligne rouge absolue sans solution alternative peut bloquer un renouvellement avec un client important pour une question qui se négocie souvent avec un peu de souplesse."],
      skills:{posture:3,clarte:2,strategie:3}
    }
  ]

};
