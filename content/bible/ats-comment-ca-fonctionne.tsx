export default function GuideATS() {
  return (
    <div className="prose-guide">
      <p>
        Un ATS (Applicant Tracking System) est un logiciel utilisé par la majorité des grandes entreprises et des cabinets de recrutement pour trier, classer et gérer les candidatures reçues. Avant qu&apos;un recruteur humain lise votre CV, un algorithme l&apos;a déjà analysé — et potentiellement éliminé.
      </p>

      <h2>Ce que fait concrètement un ATS</h2>
      <p>
        L&apos;ATS commence par extraire le texte brut de votre document. Il identifie ensuite les sections (expériences, formation, compétences) et compare le contenu avec les critères définis par le recruteur : titres de postes, compétences techniques, diplômes, années d&apos;expérience, mots-clés de l&apos;offre.
      </p>
      <p>
        Chaque CV reçoit un score de pertinence. Ce score détermine si votre candidature remonte dans la liste ou tombe dans un dossier archivé que personne ne consultera jamais. Dans les grandes structures, seuls les CV dépassant un certain seuil sont transmis aux recruteurs.
      </p>

      <h2>Ce qu&apos;un ATS lit bien — et ce qu&apos;il manque</h2>
      <p>
        Les ATS lisent très bien le texte structuré dans un seul bloc de lecture continue. En revanche, ils échouent souvent sur :
      </p>
      <ul>
        <li>Les tableaux et les mises en page complexes en colonnes</li>
        <li>Les en-têtes et pieds de page (vos coordonnées peuvent disparaître)</li>
        <li>Les textes dans des zones de texte flottantes ou des formes graphiques</li>
        <li>Les fichiers image (un CV scanné ou en JPG n&apos;est pas lisible)</li>
        <li>Les polices non standard ou les caractères spéciaux décoratifs</li>
      </ul>

      <h2>Comment le scoring fonctionne en pratique</h2>
      <p>
        Le recruteur configure l&apos;ATS avec des critères pondérés. Par exemple : "développeur Python" vaut 20 points, "expérience en fintech" vaut 15 points, "diplôme Bac+5" vaut 10 points. Un candidat qui cumule 60 points sur 80 possibles passera le filtre ; un candidat à 35 points sera automatiquement écarté.
      </p>
      <p>
        Les synonymes posent un problème réel. Si l&apos;offre parle de "gestion de projet" et que votre CV mentionne "pilotage de projets", certains ATS ne feront pas le lien. D&apos;où l&apos;importance d&apos;utiliser la terminologie exacte de l&apos;offre.
      </p>

      <h2>Conseils pratiques pour passer le filtre ATS</h2>
      <ul>
        <li>Utilisez un format de fichier Word (.docx) ou PDF natif — jamais un PDF issu d&apos;une image</li>
        <li>Structurez votre CV avec des sections clairement nommées : "Expériences professionnelles", "Formation", "Compétences"</li>
        <li>Reprenez les mots-clés de l&apos;offre tels qu&apos;ils sont écrits, sans paraphraser</li>
        <li>Évitez les tableaux à deux colonnes pour les expériences et formations</li>
        <li>Placez vos coordonnées dans le corps du document, pas dans l&apos;en-tête Word</li>
        <li>Testez votre CV en le copiant dans Notepad : si le texte est lisible et ordonné, l&apos;ATS le lira correctement</li>
      </ul>

      <blockquote>
        Un CV conçu uniquement pour être beau visuellement peut être invisible pour un ATS. L&apos;objectif est de trouver l&apos;équilibre entre lisibilité humaine et lisibilité machine.
      </blockquote>
    </div>
  )
}
