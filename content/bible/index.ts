export interface GuideMeta {
  slug: string
  title: string
  description: string
  theme: 1 | 2 | 3 | 4 | 5
  readTime: number
  date?: string
}

export interface Parcours {
  id: string
  title: string
  profile: string
  description: string
  guides: string[]
}

export const THEMES: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'CV & ATS', color: 'text-blue-700', bg: 'bg-blue-50' },
  2: { label: 'Lettre de motivation', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  3: { label: 'LinkedIn', color: 'text-sky-700', bg: 'bg-sky-50' },
  4: { label: 'Entretiens', color: 'text-violet-700', bg: 'bg-violet-50' },
  5: { label: 'Stratégie', color: 'text-orange-700', bg: 'bg-orange-50' },
}

export const guides: GuideMeta[] = [
  // ── Thème 1 : CV & ATS ──────────────────────────────────────────────────
  { slug: 'ats-comment-ca-fonctionne', title: 'Comment fonctionne un ATS ?', description: "Comprendre les logiciels de tri automatique pour ne plus jamais être éliminé avant qu'un humain lise ton CV.", theme: 1, readTime: 5 },
  { slug: 'mots-cles-cv', title: 'Les mots-clés qui font passer un CV', description: "Quels termes les recruteurs et leurs logiciels cherchent vraiment, et comment les intégrer sans forcer.", theme: 1, readTime: 4 },
  { slug: 'format-cv-colonnes', title: 'Une ou deux colonnes sur son CV ?', description: "Le débat tranché : quand le double-colonne tue ta candidature et quand il aide.", theme: 1, readTime: 3 },
  { slug: 'cv-chronologique-fonctionnel-hybride', title: 'CV chronologique, fonctionnel ou hybride ?', description: "Quel format choisir selon ton parcours, tes gaps et le poste visé.", theme: 1, readTime: 4 },
  { slug: 'titre-cv', title: 'Écrire un titre de CV qui accroche', description: "La première ligne que le recruteur lit — voici comment en faire une accroche, pas un simple intitulé.", theme: 1, readTime: 3 },
  { slug: 'resume-professionnel-cv', title: 'Le résumé professionnel en 3 phrases', description: "Comment écrire une accroche qui dit qui tu es, ce que tu fais, et pourquoi ça compte — en 3 phrases maximum.", theme: 1, readTime: 4 },
  { slug: 'quantifier-resultats-cv', title: 'Comment quantifier ses résultats sur un CV', description: "Transformer \"j'ai géré des projets\" en chiffres concrets que les recruteurs retiennent.", theme: 1, readTime: 5 },
  { slug: 'section-competences-cv', title: 'Organiser sa section compétences', description: "Quoi mettre, comment hiérarchiser, et les pièges à éviter dans la section la plus souvent mal faite.", theme: 1, readTime: 4 },
  { slug: 'longueur-cv-pages', title: '1 page ou 2 pages pour son CV ?', description: "La règle définitive selon ton niveau d'expérience, ton secteur et le poste visé.", theme: 1, readTime: 3 },
  { slug: 'fautes-cv-a-eviter', title: 'Les fautes qui éliminent un CV', description: "Les erreurs de fond et de forme qui font fermer l'onglet — et comment les repérer avant d'envoyer.", theme: 1, readTime: 4 },
  { slug: 'cv-pdf-ou-word', title: 'PDF ou Word pour son CV ?', description: "Le choix qui peut tout changer selon le canal de candidature.", theme: 1, readTime: 3 },
  { slug: 'adapter-cv-offre', title: 'Adapter son CV à chaque offre', description: "Méthode rapide pour personnaliser un CV de base en 15 minutes sans repartir de zéro.", theme: 1, readTime: 5 },
  { slug: 'photo-cv', title: 'Photo sur son CV : oui ou non ?', description: "Quand la photo aide, quand elle nuit, et ce que dit vraiment la pratique française.", theme: 1, readTime: 3 },
  { slug: 'loisirs-interets-cv', title: 'Loisirs sur un CV : utile ou piège ?', description: "Comment décider quoi inclure et comment formuler pour que ça renforce ta candidature.", theme: 1, readTime: 3 },
  { slug: 'verbes-action-cv', title: "Les verbes d'action pour un CV percutant", description: "50 verbes classés par catégorie pour remplacer \"j'ai participé à\" et \"j'ai été responsable de\".", theme: 1, readTime: 4 },
  { slug: 'periode-chomage-cv', title: 'Expliquer une période de chômage sur son CV', description: "Comment traiter les gaps sans les cacher ni les sur-expliquer — et quoi dire si le recruteur pose la question.", theme: 1, readTime: 4 },
  { slug: 'cv-reconversion', title: 'CV de reconversion : valoriser un autre secteur', description: "Comment présenter un parcours atypique pour qu'il soit vu comme un atout plutôt qu'une anomalie.", theme: 1, readTime: 5 },
  { slug: 'cv-premier-emploi', title: "Premier emploi : compenser l'absence d'expérience", description: "Ce qu'on peut vraiment mettre quand on sort d'école, et comment le formuler pour convaincre.", theme: 1, readTime: 5 },
  { slug: 'cv-senior', title: 'CV senior : éviter l\'effet "surqualifié"', description: "Comment présenter 20 ans d'expérience sans effrayer les recruteurs.", theme: 1, readTime: 5 },
  { slug: 'cv-avec-ia', title: "Utiliser l'IA pour réécrire son CV", description: "Méthode complète pour utiliser ChatGPT ou Claude efficacement — avec les prompts qui évitent les pièges habituels.", theme: 1, readTime: 6 },

  // ── Thème 2 : Lettre de motivation ───────────────────────────────────────
  { slug: 'lettre-motivation-encore-utile', title: 'La lettre de motivation est-elle encore utile ?', description: "Les chiffres récents sur ce que les recruteurs font vraiment des lettres de motivation en 2026.", theme: 2, readTime: 4 },
  { slug: 'structure-lettre-motivation', title: 'La structure en 3 paragraphes qui fonctionne', description: "Le modèle simple et efficace que les recruteurs connaissent — et comment le rendre mémorable malgré tout.", theme: 2, readTime: 4 },
  { slug: 'debut-original-lettre', title: 'Commencer sans "Je me permets de vous adresser"', description: "10 façons concrètes d'ouvrir une lettre sans tomber dans les formules que tout le monde utilise.", theme: 2, readTime: 3 },
  { slug: 'accroche-lettre-motivation', title: "L'accroche parfaite pour une lettre de motivation", description: "Comment rédiger la première phrase qui donne envie de lire la suite — avec des exemples par secteur.", theme: 2, readTime: 4 },
  { slug: 'montrer-sa-motivation', title: 'Montrer sa motivation sans être banal', description: "Comment prouver qu'on veut vraiment ce poste sans écrire \"je suis très motivé par cette opportunité\".", theme: 2, readTime: 4 },
  { slug: 'personnaliser-lettre-motivation', title: 'Personnaliser sa lettre pour chaque entreprise', description: "Ce qu'on recherche vraiment quand on parle de personnalisation — et comment le faire en 20 minutes.", theme: 2, readTime: 4 },
  { slug: 'lettre-courte-ou-longue', title: 'Lettre courte ou lettre longue ?', description: "La longueur idéale selon le type de poste, le secteur et le canal de candidature.", theme: 2, readTime: 3 },
  { slug: 'email-candidature-spontanee', title: 'Email de candidature spontanée qui reçoit une réponse', description: "La structure et les éléments qui font qu'un email spontané est traité plutôt qu'archivé sans être lu.", theme: 2, readTime: 4 },
  { slug: 'email-relance-candidature', title: 'Email de relance après candidature', description: "Quand relancer, comment le formuler, et ce qui distingue une relance efficace d'une relance qui agace.", theme: 2, readTime: 4 },
  { slug: 'lettre-motivation-email', title: 'La lettre de motivation par email', description: "Comment adapter le format quand la lettre est le corps de l'email — et ce que ça change.", theme: 2, readTime: 3 },
  { slug: 'candidature-offre-vague', title: 'Répondre à une offre vague ou floue', description: "Quand l'annonce dit peu, comment faire parler ton profil plutôt que de coller à des critères inexistants.", theme: 2, readTime: 4 },
  { slug: 'lettre-motivation-stage', title: 'Lettre de motivation pour un stage', description: "Les spécificités du stage : ce qui intéresse vraiment les maîtres de stage, au-delà du parcours académique.", theme: 2, readTime: 4 },
  { slug: 'lettre-motivation-reconversion', title: 'Lettre pour une reconversion professionnelle', description: "Comment expliquer un changement de secteur de façon positive sans avoir à se justifier ou s'excuser.", theme: 2, readTime: 5 },
  { slug: 'lettre-retour-expatriation', title: "Lettre de motivation pour un retour d'expatriation", description: "Comment valoriser une expérience à l'étranger pour un retour en France — et les pièges à éviter.", theme: 2, readTime: 4 },
  { slug: 'lettre-sans-experience-secteur', title: 'Lettre sans expérience dans le domaine', description: "Quand on postule dans un secteur qu'on ne connaît pas encore, voici ce qu'on peut quand même apporter.", theme: 2, readTime: 4 },
  { slug: 'lettre-motivation-avec-ia', title: "Écrire sa lettre avec l'IA : méthode complète", description: "Comment utiliser l'IA pour rédiger une lettre personnalisée — sans tomber dans les formules génériques.", theme: 2, readTime: 5 },
  { slug: 'pieges-chatgpt-lettre', title: 'Les pièges de ChatGPT pour les lettres de motivation', description: "Pourquoi les lettres générées par IA se ressemblent toutes — et comment les rendre vraiment différentes.", theme: 2, readTime: 4 },
  { slug: 'eviter-formules-creuses', title: 'Supprimer les formules creuses de sa lettre', description: "Les 15 expressions à bannir définitivement et par quoi les remplacer.", theme: 2, readTime: 3 },
  { slug: 'candidature-spontanee', title: 'Candidature spontanée : guide complet', description: "Quand postuler sans offre, comment se préparer, et ce qui fait qu'une candidature spontanée aboutit réellement.", theme: 2, readTime: 5 },
  { slug: 'conclure-lettre-motivation', title: 'Comment conclure sa lettre de motivation', description: "La dernière impression compte autant que la première — voici comment fermer une lettre de façon mémorable.", theme: 2, readTime: 3 },

  // ── Thème 3 : LinkedIn ───────────────────────────────────────────────────
  { slug: 'linkedin-en-2026', title: 'LinkedIn en 2026 : toujours pertinent ?', description: "Les chiffres actuels et ce que les recruteurs regardent vraiment sur LinkedIn.", theme: 3, readTime: 4 },
  { slug: 'photo-profil-linkedin', title: 'Photo de profil LinkedIn : les règles', description: "Ce qui fait une bonne photo professionnelle — et les erreurs qui font fuir les recruteurs.", theme: 3, readTime: 3 },
  { slug: 'titre-linkedin', title: 'Titre LinkedIn : la formule gagnante', description: "Comment écrire les 220 caractères les plus importants de ton profil pour apparaître dans les recherches.", theme: 3, readTime: 4 },
  { slug: 'a-propos-linkedin', title: 'Section "À propos" LinkedIn : les bonnes pratiques', description: "Pas un CV, pas une liste de mots-clés : ce qu'une vraie section À propos efficace doit dire.", theme: 3, readTime: 5 },
  { slug: 'experiences-linkedin-vs-cv', title: 'Expériences LinkedIn vs CV : ce qui change', description: "Pourquoi copier-coller son CV sur LinkedIn est une erreur — et ce qu'on gagne à différencier les deux.", theme: 3, readTime: 4 },
  { slug: 'competences-linkedin', title: 'Compétences LinkedIn : comment les organiser', description: "Les compétences qui aident ton profil à remonter dans les recherches — et celles qui font perdre de la crédibilité.", theme: 3, readTime: 4 },
  { slug: 'recommandations-linkedin', title: 'Recommandations LinkedIn : comment en obtenir', description: "Comment demander sans gêner, quoi demander exactement, et ce qui fait une recommandation utile.", theme: 3, readTime: 4 },
  { slug: 'visibilite-profil-linkedin', title: 'Visibilité LinkedIn : le guide complet', description: "Comment l'algorithme LinkedIn fonctionne et les réglages concrets pour être trouvé par les recruteurs.", theme: 3, readTime: 5 },
  { slug: 'linkedin-actif-vs-passif', title: 'LinkedIn actif vs passif dans sa recherche', description: "La différence entre attendre d'être contacté et aller chercher activement — et comment alterner les deux.", theme: 3, readTime: 4 },
  { slug: 'open-to-work-linkedin', title: 'Le bandeau "Open to Work" : quand l\'utiliser', description: "Les vrais avantages et inconvénients du bandeau vert, selon que tu sois en poste ou non.", theme: 3, readTime: 3 },
  { slug: 'contacter-recruteur-linkedin', title: 'Contacter un recruteur sur LinkedIn', description: "Comment approcher un recruteur que tu ne connais pas — sans être ignoré ni perçu comme intrusif.", theme: 3, readTime: 4 },
  { slug: 'inmail-linkedin', title: 'InMail LinkedIn : la formule qui génère des réponses', description: "Comment rédiger un message froid qui obtient 3x plus de réponses que la moyenne.", theme: 3, readTime: 4 },
  { slug: 'suivre-entreprises-linkedin', title: 'Suivre les entreprises cibles sur LinkedIn', description: "Comment utiliser LinkedIn pour rester informé des opportunités avant qu'elles soient publiées.", theme: 3, readTime: 3 },
  { slug: 'groupes-linkedin', title: 'Groupes LinkedIn : utiles ou non ?', description: "L'état réel des groupes LinkedIn en 2026 — et les rares situations où ils valent encore le coup.", theme: 3, readTime: 3 },
  { slug: 'poster-sur-linkedin', title: 'Faut-il poster du contenu sur LinkedIn ?', description: "La vérité sur ce que poster apporte vraiment dans une recherche d'emploi — et sur ce que ça ne fait pas.", theme: 3, readTime: 4 },
  { slug: 'linkedin-reconversion', title: 'LinkedIn pour une reconversion professionnelle', description: "Comment repositionner son profil LinkedIn quand on change de secteur ou de métier.", theme: 3, readTime: 5 },
  { slug: 'linkedin-sans-reseau', title: 'LinkedIn sans réseau : partir de zéro', description: "Comment construire un réseau professionnel quand on commence avec 12 connexions.", theme: 3, readTime: 5 },
  { slug: 'linkedin-premium-utile', title: 'LinkedIn Premium : ça vaut le coup ?', description: "Les fonctionnalités qui apportent vraiment quelque chose en recherche d'emploi — et ce qui peut attendre.", theme: 3, readTime: 4 },
  { slug: 'langue-profil-linkedin', title: 'Profil LinkedIn en français ou en anglais ?', description: "Quand garder le français, quand passer à l'anglais, et comment gérer les deux simultanément.", theme: 3, readTime: 3 },
  { slug: 'analytics-linkedin', title: 'Analyser les vues de son profil LinkedIn', description: "Ce que les statistiques LinkedIn te disent vraiment sur l'efficacité de ton profil.", theme: 3, readTime: 3 },

  // ── Thème 4 : Entretiens ─────────────────────────────────────────────────
  { slug: 'preparer-entretien-48h', title: 'Se préparer à un entretien en 48 heures', description: "Le plan précis pour se préparer efficacement quand on n'a pas beaucoup de temps.", theme: 4, readTime: 5 },
  { slug: 'questions-entretien-frequentes', title: 'Les 10 questions les plus fréquentes en entretien', description: "Les questions que presque tout recruteur pose — avec les éléments de réponse qui fonctionnent vraiment.", theme: 4, readTime: 6 },
  { slug: 'parlez-moi-de-vous', title: '"Parlez-moi de vous" : la réponse parfaite', description: "Comment structurer cette question ouverte pour ne pas improviser et donner une impression forte dès le départ.", theme: 4, readTime: 5 },
  { slug: 'methode-star-entretien', title: 'La méthode STAR en entretien', description: "Comment utiliser Situation-Tâche-Action-Résultat pour répondre aux questions comportementales de façon mémorable.", theme: 4, readTime: 5 },
  { slug: 'defauts-en-entretien', title: '"Quels sont vos défauts ?" — que répondre', description: "Comment répondre honnêtement à la question la plus redoutée sans se saborder.", theme: 4, readTime: 4 },
  { slug: 'ou-vous-voyez-vous-5-ans', title: '"Où vous voyez-vous dans 5 ans ?" — la bonne réponse', description: "Ce que le recruteur cherche vraiment avec cette question — et comment y répondre sans paraître naïf.", theme: 4, readTime: 4 },
  { slug: 'recherche-entreprise-entretien', title: 'Comment bien rechercher une entreprise avant un entretien', description: "Ce qu'il faut vraiment connaître — au-delà du site web — pour paraître préparé et intéressé.", theme: 4, readTime: 5 },
  { slug: 'tenue-entretien', title: 'S\'habiller pour un entretien : les codes', description: "Comment choisir sa tenue selon le secteur, le type d'entreprise et le poste visé.", theme: 4, readTime: 3 },
  { slug: 'questions-a-poser-recruteur', title: 'Les questions à poser au recruteur', description: "15 questions qui montrent que tu as réfléchi au poste — et celles à éviter absolument.", theme: 4, readTime: 4 },
  { slug: 'entretien-telephonique', title: "L'entretien téléphonique : comment le préparer", description: "Les spécificités d'un entretien sans visuel — et comment compenser l'absence de langage corporel.", theme: 4, readTime: 4 },
  { slug: 'entretien-video-distanciel', title: "L'entretien vidéo à distance : se préparer", description: "Les réglages techniques, la posture, le décor et tout ce qui fait la différence en visio.", theme: 4, readTime: 4 },
  { slug: 'entretien-technique', title: "L'entretien technique : comment le réussir", description: "Stratégie de préparation pour les entretiens avec exercices pratiques, cas concrets ou tests en live.", theme: 4, readTime: 5 },
  { slug: 'entretien-panel', title: "L'entretien en panel ou devant plusieurs personnes", description: "Comment gérer la dynamique d'un entretien avec plusieurs interlocuteurs simultanément.", theme: 4, readTime: 4 },
  { slug: 'negocier-salaire', title: 'Négocier son salaire en entretien', description: "Quand aborder le sujet, comment répondre à \"quelles sont vos prétentions\", et comment ne pas se brader.", theme: 4, readTime: 6 },
  { slug: 'tests-personnalite-recrutement', title: 'Les tests de personnalité en recrutement', description: "Ce que les tests MBTI, DISC et compagnie évaluent vraiment — et comment les aborder.", theme: 4, readTime: 4 },
  { slug: 'tests-psychotechniques', title: "Tests psychotechniques : comment s'y préparer", description: "Les types de tests les plus courants et les exercices concrets pour s'entraîner.", theme: 4, readTime: 5 },
  { slug: 'gerer-stress-entretien', title: 'Gérer le stress avant un entretien', description: "Des méthodes concrètes pour réduire l'anxiété — pas des platitudes sur la respiration profonde.", theme: 4, readTime: 4 },
  { slug: 'debrief-apres-entretien', title: "Faire son debriefing après un entretien", description: "Comment analyser un entretien passé pour s'améliorer — qu'il se soit bien ou mal passé.", theme: 4, readTime: 3 },
  { slug: 'email-remerciement-entretien', title: "L'email de remerciement après entretien", description: "Si, quand et comment envoyer un email après un entretien sans paraître désespéré.", theme: 4, readTime: 3 },
  { slug: 'rebondir-apres-refus', title: "Rebondir après un refus d'embauche", description: "Comment transformer un refus en opportunité d'apprentissage — et les erreurs à éviter dans les 24 heures suivantes.", theme: 4, readTime: 4 },

  // ── Thème 5 : Stratégie ──────────────────────────────────────────────────
  { slug: 'organiser-recherche-emploi', title: "Organiser sa recherche d'emploi efficacement", description: "Un système simple pour ne pas s'épuiser — candidatures, relances, entretiens, tout ça sans se noyer.", theme: 5, readTime: 5 },
  { slug: 'jobboards-france-2026', title: 'Les meilleurs jobboards en France en 2026', description: "Quels sites valent encore le coup, lesquels sont à ignorer, et comment les utiliser intelligemment.", theme: 5, readTime: 4 },
  { slug: 'candidature-directe-vs-agence', title: 'Candidature directe vs agence de recrutement', description: "Quand passer par un cabinet, quand postuler directement — et pourquoi les deux ne s'opposent pas.", theme: 5, readTime: 4 },
  { slug: 'chasseurs-de-tetes', title: 'Chasseurs de têtes : comment les approcher', description: "Qui ils sont, ce qu'ils cherchent, et comment entrer sur leur radar.", theme: 5, readTime: 5 },
  { slug: 'reseau-professionnel-emploi', title: "Le réseau : la vraie source d'emploi", description: "70 % des postes ne sont pas publiés. Voici comment accéder au marché caché par des connexions réelles.", theme: 5, readTime: 5 },
  { slug: 'ia-et-recherche-emploi', title: "L'IA dans la recherche d'emploi : guide complet", description: "Toutes les façons dont l'IA peut accélérer ta recherche — et les limites à ne pas franchir.", theme: 5, readTime: 6 },
  { slug: 'marche-cache-emploi', title: "Le marché caché de l'emploi", description: "Comment fonctionnent les recrutements qui ne passent jamais par une offre publiée — et comment y accéder.", theme: 5, readTime: 5 },
  { slug: 'alertes-emploi', title: 'Créer des alertes emploi vraiment efficaces', description: "Comment paramétrer des alertes qui remontent les bonnes offres — sans être noyé sous le bruit.", theme: 5, readTime: 3 },
  { slug: 'suivi-candidatures', title: 'Suivre ses candidatures : la méthode', description: "Un système de suivi simple pour ne plus perdre le fil — et savoir exactement quoi relancer et quand.", theme: 5, readTime: 4 },
  { slug: 'strategie-masse-vs-ciblee', title: 'Masse ou ciblée : quelle stratégie ?', description: "Candidater à 200 offres ou choisir 20 cibles — la réponse n'est pas celle qu'on croit.", theme: 5, readTime: 4 },
  { slug: 'reconversion-professionnelle', title: 'Reconversion professionnelle : par où commencer', description: "Les étapes concrètes d'une reconversion réussie — de l'idée à la première offre dans le nouveau secteur.", theme: 5, readTime: 6 },
  { slug: 'reorientation-sans-etudes', title: 'Se réorienter sans reprendre les études', description: "Les alternatives aux formations longues pour changer de cap — et ce qui convainc vraiment les employeurs.", theme: 5, readTime: 5 },
  { slug: 'retour-emploi-pause', title: "Retour à l'emploi après une longue absence", description: "Comment aborder un trou dans le CV après un congé parental, une maladie ou une pause volontaire.", theme: 5, readTime: 5 },
  { slug: 'freelance-tremplin', title: 'Le freelance comme tremplin vers un CDI', description: "Comment une période de freelance peut accélérer une reconversion ou ouvrir des portes inattendues.", theme: 5, readTime: 4 },
  { slug: 'nouvelles-formes-travail', title: 'Les nouvelles formes de travail en 2026', description: "Remote, hybride, job sharing, portfolio career — ce qui existe et comment ça change la recherche d'emploi.", theme: 5, readTime: 4 },
  { slug: 'negocier-package-salarial', title: 'Négocier un package salarial complet', description: "Au-delà du fixe : RTT, télétravail, intéressement, voiture de fonction — comment négocier l'ensemble.", theme: 5, readTime: 5 },
  { slug: 'choisir-entre-plusieurs-offres', title: "Choisir entre plusieurs offres d'emploi", description: "Un cadre pour prendre la bonne décision quand on a plusieurs options sur la table.", theme: 5, readTime: 4 },
  { slug: 'reussir-periode-essai', title: 'Réussir sa période d\'essai', description: "Les 90 premiers jours sont les plus importants. Ce qui se joue et comment l'aborder stratégiquement.", theme: 5, readTime: 5 },
  { slug: 'quitter-emploi-toxique', title: 'Quitter un emploi toxique', description: "Comment partir proprement — sans brûler les ponts, sans perdre de droits, et sans laisser ça te définir.", theme: 5, readTime: 4 },
  { slug: 'plan-de-carriere', title: 'Construire son plan de carrière sur 5 ans', description: "Comment penser à long terme dans un monde incertain — une méthode qui laisse de la place à l'imprévu.", theme: 5, readTime: 5 },
]

export const parcours: Parcours[] = [
  {
    id: 'premier-emploi',
    title: 'Je cherche mon premier emploi',
    profile: "Léa, 23 ans — sortie d'école de commerce",
    description: "Pas d'expérience significative ? Voici le parcours adapté pour convaincre malgré tout.",
    guides: [
      'cv-premier-emploi',
      'section-competences-cv',
      'loisirs-interets-cv',
      'lettre-motivation-encore-utile',
      'lettre-motivation-stage',
      'accroche-lettre-motivation',
      'linkedin-sans-reseau',
      'titre-linkedin',
      'questions-entretien-frequentes',
      'defauts-en-entretien',
      'jobboards-france-2026',
      'organiser-recherche-emploi',
    ],
  },
  {
    id: 'reconversion',
    title: 'Je me reconvertis',
    profile: "Marc, 36 ans — chef de projet IT qui devient product manager",
    description: "Tu changes de secteur ou de métier. Ces guides t'aident à valoriser ce que tu sais déjà.",
    guides: [
      'cv-reconversion',
      'adapter-cv-offre',
      'lettre-motivation-reconversion',
      'montrer-sa-motivation',
      'linkedin-reconversion',
      'methode-star-entretien',
      'reconversion-professionnelle',
      'reorientation-sans-etudes',
      'freelance-tremplin',
      'reseau-professionnel-emploi',
    ],
  },
  {
    id: 'retour-emploi',
    title: "Je reviens après une pause",
    profile: "Sophie, 43 ans — retour après 2 ans de congé parental",
    description: "Un trou dans le CV ne ferme pas les portes. Ces guides te montrent comment le présenter et rebondir.",
    guides: [
      'retour-emploi-pause',
      'periode-chomage-cv',
      'ats-comment-ca-fonctionne',
      'lettre-sans-experience-secteur',
      'linkedin-actif-vs-passif',
      'open-to-work-linkedin',
      'gerer-stress-entretien',
      'email-relance-candidature',
      'suivi-candidatures',
      'organiser-recherche-emploi',
    ],
  },
  {
    id: 'evolution',
    title: 'Je vise un meilleur poste',
    profile: "Thomas, 40 ans — manager commercial qui vise directeur",
    description: "Tu as de l'expérience et tu veux progresser. Ces guides t'aident à te positionner au niveau supérieur.",
    guides: [
      'cv-senior',
      'quantifier-resultats-cv',
      'verbes-action-cv',
      'a-propos-linkedin',
      'chasseurs-de-tetes',
      'entretien-panel',
      'negocier-salaire',
      'negocier-package-salarial',
      'reseau-professionnel-emploi',
      'plan-de-carriere',
    ],
  },
]

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuidesByTheme(theme: number): GuideMeta[] {
  return guides.filter((g) => g.theme === theme)
}
