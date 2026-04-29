export default function Article() {
  return (
    <div className="prose-content">
      <p>
        Avant d'atterrir sur le bureau d'un recruteur, ton CV doit passer une première épreuve : le logiciel ATS (Applicant Tracking System). Ces outils scannent, analysent et classent les candidatures automatiquement. Si ton CV ne parle pas leur langage, il est éliminé — peu importe tes compétences réelles.
      </p>

      <h2>Qu'est-ce qu'un ATS et comment ça fonctionne ?</h2>
      <p>
        Un ATS est un logiciel utilisé par les entreprises pour gérer les candidatures. Il analyse chaque CV entrant et lui attribue un score basé sur la correspondance avec les mots-clés de l'offre. Les CV avec un score insuffisant n'atteignent jamais un lecteur humain.
      </p>
      <p>
        En France, plus de 80% des entreprises de plus de 250 salariés utilisent un ATS. Parmi les plus courants : Workday, Taleo, Greenhouse, Lever, BambooHR.
      </p>

      <h2>Les 5 erreurs qui font échouer les CV face aux ATS</h2>

      <h3>1. Utiliser des tableaux et des colonnes</h3>
      <p>
        La plupart des ATS ne peuvent pas lire correctement les mises en page complexes. Un CV en deux colonnes, avec des tableaux ou des zones de texte flottantes, sera souvent mal analysé — les informations finissent au mauvais endroit, ou sont tout simplement ignorées.
      </p>
      <p><strong>Solution :</strong> utilise une mise en page simple, une seule colonne, du texte pur.</p>

      <h3>2. Stocker les informations dans des images ou des en-têtes</h3>
      <p>
        Certains candidats mettent leur nom, email ou téléphone dans un en-tête graphique. Les ATS ne lisent généralement pas ces zones. Résultat : ton dossier arrive sans coordonnées.
      </p>

      <h3>3. Utiliser des noms de section non standards</h3>
      <p>
        Si tu intitules ta section de compétences "Ce que je sais faire" plutôt que "Compétences", l'ATS peut ne pas la reconnaître. Reste sur les titres standards : Expériences, Compétences, Formation, Langues.
      </p>

      <h3>4. Ne pas inclure les mots-clés de l'offre</h3>
      <p>
        C'est l'erreur la plus fréquente et la plus coûteuse. Un ATS compare le contenu de ton CV avec les termes utilisés dans l'offre. Si l'offre parle de "gestion de projet" et que tu as écrit "coordination de projet", le match est partiel ou nul.
      </p>

      <h3>5. Utiliser des abréviations non standard</h3>
      <p>
        "Mgmt" pour management, "Dev" pour développement — les abréviations peuvent créer des non-correspondances. Utilise les termes complets, ou les deux formes : "développement (dev)".
      </p>

      <h2>Comment optimiser ton CV pour les ATS : le guide pratique</h2>

      <h3>Étape 1 : Analyse l'offre et extrais les mots-clés</h3>
      <p>
        Lis attentivement l'offre et identifie les termes répétés. Ces répétitions signalent les priorités du recruteur — et ce que l'ATS recherche. Note les compétences techniques, les titres de poste, les outils mentionnés.
      </p>

      <h3>Étape 2 : Intègre ces mots-clés naturellement</h3>
      <p>
        Ne copie pas les mots-clés en vrac à la fin de ton CV. Intègre-les dans tes descriptions d'expériences, de façon naturelle. "J'ai dirigé un projet de transformation digitale" plutôt qu'une liste sèche de buzzwords.
      </p>

      <h3>Étape 3 : Utilise les deux formes des titres</h3>
      <p>
        Pour les acronymes et abréviations courants dans ton secteur, utilise les deux formes au moins une fois : "Intelligence Artificielle (IA)", "Directeur des Ressources Humaines (DRH)".
      </p>

      <h3>Étape 4 : Adapte le format</h3>
      <p>
        Sauvegarde ton CV en PDF si l'offre l'accepte. Certains ATS préfèrent le format Word — vérifie les instructions de candidature.
      </p>

      <h2>Tester ton CV avec l'IA</h2>
      <p>
        Tu peux demander à une IA de comparer ton CV avec une offre d'emploi et d'identifier les mots-clés manquants. Voici le prompt exact :
      </p>
      <blockquote>
        "Analyse cette offre d'emploi et ce CV. Liste les 10 mots-clés manquants dans le CV qui apparaissent dans l'offre. Propose une reformulation pour chaque expérience afin de les intégrer naturellement."
      </blockquote>
      <p>
        Ce type d'optimisation prend environ 2 heures si tu le fais toi-même. C'est aussi ce que fait CV Pro en 30 minutes.
      </p>

      <h2>En résumé</h2>
      <p>
        Un CV optimisé pour les ATS n'est pas moins humain — il est juste plus lisible par les machines qui gardent la porte. Le fond reste le plus important : tes vraies compétences, tes vraies expériences. L'optimisation ATS permet simplement d'être lu par un humain avant d'être jugé.
      </p>
    </div>
  )
}
