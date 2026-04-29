export default function GuidePDFouWord() {
  return (
    <div className="prose-guide">
      <p>
        PDF ou Word ? La réponse simple est : PDF par défaut, Word quand c&apos;est explicitement demandé. Mais la réalité est plus nuancée, et faire le mauvais choix peut coûter cher selon le contexte de candidature.
      </p>

      <h2>Le PDF : avantages et limites</h2>
      <p>
        Le PDF est le format privilégié pour la majorité des candidatures directes. Il garantit que votre mise en page sera identique sur tous les écrans et systèmes d&apos;exploitation — un recruteur sur Mac verra exactement la même chose qu&apos;un recruteur sur Windows. Vos polices, vos espacements, vos alignements restent intacts.
      </p>
      <p>
        Cependant, tous les ATS ne lisent pas les PDF de la même façon. Un PDF "natif" (créé depuis Word ou LibreOffice) est généralement bien traité. Un PDF "image" (créé en scannant un document papier) est illisible pour un ATS — le texte n&apos;est pas extractible.
      </p>

      <h2>Le Word (.docx) : quand l&apos;utiliser</h2>
      <p>
        Le format Word offre une meilleure compatibilité garantie avec les ATS, car c&apos;est le format que la plupart de ces systèmes préfèrent nativement. Il est également nécessaire dans ces situations :
      </p>
      <ul>
        <li>L&apos;offre d&apos;emploi demande explicitement un fichier Word</li>
        <li>Vous passez par un cabinet de recrutement qui reformatera votre CV à leurs couleurs</li>
        <li>La plateforme de candidature en ligne n&apos;accepte que les fichiers .doc ou .docx</li>
      </ul>
      <p>
        Le risque avec le Word : si vous l&apos;envoyez directement à un recruteur, votre mise en page peut s&apos;altérer selon la version de Word qu&apos;il utilise. Ce qui est parfait chez vous peut ressembler à un puzzle déconstruit chez lui.
      </p>

      <h2>Comment vérifier que votre PDF est lisible par un ATS</h2>
      <p>
        Le test le plus fiable est manuel : ouvrez votre PDF dans un lecteur standard (Adobe Reader ou le lecteur intégré de votre navigateur), sélectionnez tout le texte (Ctrl+A), copiez-le et collez-le dans un éditeur de texte brut. Si le texte apparaît dans un ordre logique et lisible, votre PDF est compatible ATS. Si le texte est déconstruit, mélangé ou incompréhensible, votre CV a un problème structurel.
      </p>

      <h2>Le cas des plateformes en ligne</h2>
      <p>
        Sur LinkedIn, Welcome to the Jungle, ou Indeed, vous téléchargez votre CV sur la plateforme. Ces plateformes ont leurs propres parseurs qui extraient le contenu de votre fichier. Le format recommandé varie selon la plateforme, mais le PDF natif et le .docx standard sont acceptés partout. Évitez les formats exotiques : .pages, .odt, ou les PDF créés depuis des applications de design comme Canva ou Figma — ces derniers génèrent souvent des PDFs graphiques difficiles à parser.
      </p>

      <h2>Un conseil pratique</h2>
      <p>
        Maintenez deux versions de votre CV : un fichier source en Word (ou Google Docs) que vous mettez à jour facilement, et un export PDF généré depuis ce même fichier pour les envois. Ne créez jamais votre version "définitive" en PDF sans disposer du fichier source modifiable — vous perdrez un temps considérable lors des prochaines mises à jour.
      </p>

      <blockquote>
        PDF natif pour les envois directs, Word (.docx) quand la plateforme ou le recruteur le demande. Et conservez toujours votre fichier source — jamais seulement le PDF final.
      </blockquote>
    </div>
  )
}
