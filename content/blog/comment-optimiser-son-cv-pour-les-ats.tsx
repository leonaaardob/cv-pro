import Link from 'next/link'

export default function Article() {
  return (
    <div className="prose-content">
      <p>
        Avant d'atterrir sur le bureau d'un recruteur, ton CV doit franchir une première barrière invisible : le logiciel ATS (Applicant Tracking System). Ces outils scannent, analysent et classent chaque candidature automatiquement. Si ton CV ne parle pas leur langage, il est éliminé — peu importe tes compétences réelles.
      </p>
      <p>
        En France, plus de 80% des entreprises de plus de 250 salariés utilisent un ATS. Pour les grands groupes du CAC 40, le taux dépasse 95%. Ce n'est pas une tendance qui va s'inverser : les ATS traitent des volumes de candidatures qu'aucune équipe RH ne pourrait gérer manuellement.
      </p>
      <p>
        Ce guide te explique comment fonctionne un ATS, quelles sont les erreurs qui font éliminer les candidats avant qu'un humain ait lu une ligne, et comment optimiser ton CV pour passer ce filtre — sans le rendre robotique.
      </p>

      <h2>Qu'est-ce qu'un ATS et comment ça fonctionne vraiment ?</h2>
      <p>
        Un ATS est un logiciel de gestion des candidatures. Son rôle est double : d'abord organiser le flux des candidatures (réception, classement, communication avec les candidats), ensuite pré-sélectionner automatiquement en attribuant un score à chaque CV.
      </p>
      <p>
        Ce score est calculé à partir de plusieurs critères, dont le plus important est la correspondance avec les mots-clés de l'offre d'emploi. L'ATS compare le texte de ton CV avec le texte de l'offre et identifie les correspondances. Plus tu utilises les mêmes termes que l'offre, plus ton score est élevé.
      </p>
      <p>
        Mais les ATS modernes font plus que comparer des mots. Ils analysent aussi la structure du CV (titres de section, chronologie), la présence d'informations attendues (coordonnées, dates de poste, niveau de diplôme), et parfois le parcours de carrière dans son ensemble (progressions, gaps, cohérence).
      </p>

      <h3>Les principaux ATS utilisés en France</h3>
      <p>
        Pour comprendre ce à quoi ton CV va faire face, voici les systèmes les plus courants en France :
      </p>
      <ul>
        <li><strong>Workday</strong> : utilisé par les grands groupes internationaux (LVMH, BNP Paribas, L'Oréal…). L'un des plus exigeants sur la structure du CV.</li>
        <li><strong>Taleo (Oracle)</strong> : très répandu dans les entreprises du CAC 40. Parse bien les PDF mais mal les mises en forme complexes.</li>
        <li><strong>SAP SuccessFactors</strong> : présent dans beaucoup de grands groupes industriels français.</li>
        <li><strong>Greenhouse</strong> : utilisé par les startups et scale-ups tech. Généralement plus permissif sur le format.</li>
        <li><strong>Lever</strong> : populaire dans les entreprises tech de taille moyenne.</li>
        <li><strong>SmartRecruiters</strong> : adoption croissante en Europe, flexible sur les formats.</li>
        <li><strong>Recruitee</strong> : utilisé par les PME françaises en croissance.</li>
      </ul>
      <p>
        Chaque ATS a ses propres règles de parsing. Workday et Taleo sont notoirement plus stricts sur la structure que Greenhouse ou SmartRecruiters. Sans savoir quel ATS utilise l'entreprise que tu vises, la stratégie la plus sûre est d'optimiser pour le cas le plus strict.
      </p>

      <h2>Les 6 erreurs qui font échouer les CV face aux ATS</h2>

      <h3>1. Utiliser des tableaux et des mises en page complexes</h3>
      <p>
        La plupart des ATS ne peuvent pas lire correctement les mises en page sophistiquées. Un CV en deux colonnes, avec des tableaux, des zones de texte flottantes ou des formes graphiques, sera souvent mal parsé — les informations finissent au mauvais endroit, mélangées, ou carrément ignorées.
      </p>
      <p>
        Ce qui se passe concrètement : le logiciel extrait le texte de gauche à droite et de haut en bas, sans respecter les colonnes visuelles. Ta section "Compétences" placée dans la colonne de gauche peut se retrouver mélangée à tes expériences professionnelles dans la colonne de droite.
      </p>
      <p>
        <strong>Solution :</strong> utilise une mise en page en une seule colonne, du texte pur, des sections clairement délimitées par des titres. C'est aussi plus lisible pour un recruteur humain. Pour en savoir plus sur ce sujet, consulte notre guide{' '}
        <Link href="/bible-agent-ia-cv/format-cv-colonnes">Une ou deux colonnes sur son CV ?</Link>.
      </p>

      <h3>2. Stocker les informations dans des images, en-têtes ou pieds de page</h3>
      <p>
        Certains candidats mettent leur nom, email ou numéro de téléphone dans un en-tête graphique ou dans la zone d'en-tête/pied de page du document Word. Les ATS ne lisent généralement pas ces zones. Résultat : ton dossier arrive sans coordonnées exploitables.
      </p>
      <p>
        Même chose pour les logos d'entreprise, les icônes, les barres de progression pour illustrer tes compétences. Ces éléments sont invisibles pour l'ATS et occupent de la place au détriment du contenu lisible.
      </p>
      <p>
        <strong>Solution :</strong> toutes tes informations importantes — nom, email, téléphone, LinkedIn — doivent être dans le corps du document, en texte brut.
      </p>

      <h3>3. Utiliser des noms de section non standards</h3>
      <p>
        L'ATS cherche des titres de section qu'il connaît. Si tu intitules ta section "Ce que j'ai construit" plutôt que "Expériences professionnelles", ou "Ce que je sais faire" plutôt que "Compétences", le logiciel peut ne pas reconnaître la section et mal classer son contenu.
      </p>
      <p>
        Les titres standards à utiliser : <strong>Expériences professionnelles</strong>, <strong>Compétences</strong>, <strong>Formation</strong> (ou Éducation), <strong>Langues</strong>, <strong>Certifications</strong>. Ces termes sont universellement reconnus.
      </p>

      <h3>4. Ne pas intégrer les mots-clés de l'offre</h3>
      <p>
        C'est l'erreur la plus fréquente et la plus coûteuse. Un ATS compare le contenu de ton CV avec les termes utilisés dans l'offre. Si l'offre parle de "gestion de projet" et que tu as écrit "coordination de projet", le match est partiel ou nul selon l'ATS.
      </p>
      <p>
        Les mots-clés les plus importants sont généralement : les titres de poste (tel que formulé dans l'offre), les compétences techniques spécifiques au secteur, les outils logiciels mentionnés, les diplômes et certifications exigés.
      </p>
      <p>
        <strong>Solution :</strong> lis l'offre en entier, identifie les 10-15 termes les plus importants, et vérifie que chacun apparaît au moins une fois dans ton CV — de façon naturelle, pas en liste en bas de page. Pour une méthode complète sur les mots-clés, voir notre guide{' '}
        <Link href="/bible-agent-ia-cv/mots-cles-cv">Les mots-clés qui font passer un CV</Link>.
      </p>

      <h3>5. Utiliser des abréviations sans les développer</h3>
      <p>
        "Mgmt" pour management, "Dev" pour développement, "Mktg" pour marketing — les abréviations peuvent créer des non-correspondances. L'ATS cherche "développement" et ne trouve que "dev". Résultat : un mot-clé raté.
      </p>
      <p>
        <strong>Solution :</strong> utilise les termes complets, ou les deux formes côte à côte au moins une fois : "développement (dev)", "intelligence artificielle (IA)".
      </p>

      <h3>6. Envoyer un CV en format incompatible</h3>
      <p>
        Le PDF est généralement le format recommandé, mais certains ATS anciens (Taleo notamment) parsent mieux le Word (.docx). Si l'offre ne précise pas de format, envoie les deux ou choisis le PDF — la plupart des ATS modernes le gèrent bien.
      </p>
      <p>
        En revanche, évite absolument : le PDF avec protection par mot de passe (l'ATS ne peut pas l'ouvrir), le PDF généré depuis une image scannée (pas de texte extractible), et les formats exotiques (.pages, .odt).
      </p>
      <p>
        Pour aller plus loin sur ce choix, consulte notre guide{' '}
        <Link href="/bible-agent-ia-cv/cv-pdf-ou-word">PDF ou Word pour son CV ?</Link>
      </p>

      <h2>Comment optimiser ton CV pour les ATS : méthode étape par étape</h2>

      <h3>Étape 1 : Analyse l'offre et extrais les mots-clés</h3>
      <p>
        Lis l'offre deux fois. La première fois pour comprendre le poste. La deuxième fois, un crayon à la main (ou en surlignant), pour identifier les termes qui reviennent, les compétences listées, les outils mentionnés, et le niveau d'expérience attendu.
      </p>
      <p>
        Classe ces termes en trois catégories :
      </p>
      <ul>
        <li><strong>Indispensables</strong> : termes répétés plusieurs fois, exigences clairement formulées ("maîtrise de Excel impérative"), titres de poste dans la description des missions.</li>
        <li><strong>Importants</strong> : compétences listées dans "profil recherché", outils mentionnés, secteurs d'activité.</li>
        <li><strong>Secondaires</strong> : qualités génériques ("rigueur", "autonomie"), termes très généraux.</li>
      </ul>
      <p>
        Concentre-toi sur les indispensables et les importants.
      </p>

      <h3>Étape 2 : Compare avec ton CV actuel</h3>
      <p>
        Pour chaque mot-clé identifié, vérifie s'il apparaît dans ton CV. Pas nécessairement mot pour mot — l'important est que le concept soit couvert avec les termes attendus.
      </p>
      <p>
        Dresse une liste des mots-clés manquants. Ce sont tes points d'optimisation prioritaires.
      </p>

      <h3>Étape 3 : Intègre les mots-clés naturellement</h3>
      <p>
        Ne copie pas les mots-clés en bloc à la fin du CV dans une section "Mots-clés". Cette technique était efficace avec les ATS des années 2010, les ATS modernes la détectent et la pénalisent.
      </p>
      <p>
        Intègre les mots-clés dans tes descriptions d'expériences, de façon naturelle et contextuelle. "J'ai piloté un projet de transformation digitale en utilisant Jira et Confluence" vaut mieux que "Jira, Confluence, gestion de projet, transformation digitale" en bas de page.
      </p>

      <h3>Étape 4 : Structure tes sections avec les titres standards</h3>
      <p>
        Assure-toi que chaque section porte un titre reconnaissable. Si tu avais nommé ta section compétences "Mon arsenal technique", renomme-la "Compétences" ou "Compétences techniques".
      </p>

      <h3>Étape 5 : Utilise les deux formes des termes importants</h3>
      <p>
        Pour les acronymes et abréviations courants dans ton secteur, écris les deux formes au moins une fois : "Intelligence Artificielle (IA)", "Directeur des Ressources Humaines (DRH)", "Chief Marketing Officer (CMO)".
      </p>

      <h3>Étape 6 : Adapte le format au canal de candidature</h3>
      <p>
        Si l'offre demande de postuler via un portail de candidature (c'est souvent là qu'un ATS se cache), envoie un PDF propre. Si tu postules par email directement à un recruteur, un PDF ou un Word sont tous deux appropriés — demande le format préféré si ce n'est pas précisé.
      </p>

      <h2>La structure idéale d'un CV ATS-friendly</h2>
      <p>
        Voici la structure qui passe les ATS les plus stricts tout en restant lisible pour un humain :
      </p>
      <ul>
        <li><strong>En-tête</strong> : Prénom Nom — Titre professionnel — Email — Téléphone — Ville — LinkedIn (en texte, pas en image)</li>
        <li><strong>Résumé professionnel</strong> (optionnel mais recommandé) : 3-4 lignes qui intègrent les mots-clés principaux du poste visé</li>
        <li><strong>Expériences professionnelles</strong> : ordre chronologique inversé, avec titre du poste, nom de l'entreprise, dates, puis bullet points d'accomplissements</li>
        <li><strong>Formation</strong> : diplôme, établissement, année</li>
        <li><strong>Compétences</strong> : liste structurée, sans barres de progression</li>
        <li><strong>Langues</strong> : niveau clairement indiqué (B2, courant, natif…)</li>
        <li><strong>Certifications</strong> (si pertinent)</li>
      </ul>
      <p>
        Pour approfondir chaque section, nos guides{' '}
        <Link href="/bible-agent-ia-cv/resume-professionnel-cv">Le résumé professionnel en 3 phrases</Link>{' '}
        et{' '}
        <Link href="/bible-agent-ia-cv/section-competences-cv">Organiser sa section compétences</Link>{' '}
        vont plus loin.
      </p>

      <h2>Tester ton CV avec l'IA</h2>
      <p>
        Tu peux demander à une IA de comparer ton CV avec une offre d'emploi et d'identifier les mots-clés manquants. Voici trois prompts pratiques :
      </p>

      <h3>Prompt 1 : audit des mots-clés manquants</h3>
      <blockquote>
        "Analyse cette offre d'emploi et ce CV. Liste les 10 mots-clés les plus importants de l'offre qui n'apparaissent pas dans le CV, ou qui y apparaissent sous une formulation différente. Pour chaque mot-clé manquant, propose une reformulation d'une expérience existante pour l'intégrer naturellement. Offre : [COLLE L'OFFRE]. CV : [COLLE TON CV]."
      </blockquote>

      <h3>Prompt 2 : vérification de la structure ATS</h3>
      <blockquote>
        "Analyse ce CV du point de vue de la compatibilité ATS. Identifie les problèmes de structure potentiels : noms de sections non standards, informations dans des zones non lisibles, format problématique, mises en forme à éviter. Propose les corrections nécessaires. CV : [COLLE TON CV]."
      </blockquote>

      <h3>Prompt 3 : score de compatibilité estimé</h3>
      <blockquote>
        "Compare ce CV avec cette offre d'emploi. Estime le taux de correspondance en pourcentage, explique comment tu arrives à ce chiffre, et liste les 5 points qui font le plus baisser le score. Offre : [COLLE L'OFFRE]. CV : [COLLE TON CV]."
      </blockquote>

      <h2>Ce que les ATS n'évaluent pas (et ce qui compte après)</h2>
      <p>
        L'optimisation ATS te fait franchir la première barrière — mais c'est tout. Un CV parfaitement optimisé pour les ATS mais vide de substance ne t'amènera pas loin.
      </p>
      <p>
        Ce qu'un ATS ne peut pas évaluer : la qualité de tes réalisations, la cohérence de ton parcours, ton potentiel, l'impression que tu crées. Ces éléments comptent pour les 30% de candidats qui passent le filtre automatique et arrivent sur le bureau d'un humain.
      </p>
      <p>
        Optimiser pour les ATS, c'est une condition nécessaire — pas suffisante. La vraie différence se joue dans la qualité du contenu :  des expériences quantifiées, une accroche spécifique, des réalisations concrètes. C'est ce dont parle notre guide{' '}
        <Link href="/bible-agent-ia-cv/quantifier-resultats-cv">Comment quantifier ses résultats sur un CV</Link>.
      </p>

      <h2>Checklist rapide avant d'envoyer ton CV</h2>
      <p>
        Avant de cliquer sur "Envoyer", passe ce checklist en revue :
      </p>
      <ul>
        <li>✓ Mise en page simple, une seule colonne</li>
        <li>✓ Pas de tableaux, d'images ni de zones graphiques</li>
        <li>✓ Coordonnées dans le corps du document, pas dans un en-tête/pied de page</li>
        <li>✓ Titres de sections standards (Expériences, Compétences, Formation…)</li>
        <li>✓ Les 5-8 mots-clés principaux de l'offre apparaissent dans le CV</li>
        <li>✓ Acronymes développés au moins une fois</li>
        <li>✓ Format PDF (sauf instruction contraire)</li>
        <li>✓ Titre du poste visé apparaît dans le résumé ou l'en-tête</li>
      </ul>

      <h2>En résumé</h2>
      <p>
        Un CV optimisé pour les ATS n'est pas moins humain — il est simplement lisible par les machines qui gardent la porte. Le fond reste le plus important : tes vraies compétences, tes vraies expériences. L'optimisation ATS permet d'être lu par un humain avant d'être jugé.
      </p>
      <p>
        La bonne nouvelle : cette optimisation prend 1 à 2 heures si tu la fais méthodiquement. C'est aussi exactement ce que CV Pro fait en 30 minutes — analyse de l'offre, intégration des mots-clés, restructuration du contenu.
      </p>
    </div>
  )
}
