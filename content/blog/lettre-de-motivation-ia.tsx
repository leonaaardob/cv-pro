export default function Article() {
  return (
    <div className="prose-content">
      <p>
        Tape "lettre de motivation" dans ChatGPT et tu obtiens quelque chose qui commence par "C&apos;est avec un grand intérêt que je vous soumets ma candidature pour le poste de...". Exactement comme 90% des autres lettres générées par IA cette semaine. Le recruteur le reconnaît en 5 secondes.
      </p>
      <p>
        Le problème n&apos;est pas l&apos;IA. C&apos;est la façon dont on l&apos;utilise. Voici comment faire la différence.
      </p>

      <h2>Le problème avec les lettres de motivation générées par IA</h2>
      <p>
        Quand tu demandes à une IA de générer une lettre de motivation sans lui donner de contexte précis, elle produit un texte statistiquement moyen — c&apos;est littéralement comme ça que les modèles de langage fonctionnent. Elle assemble les tournures les plus fréquentes dans les lettres de motivation qu&apos;elle a vues.
      </p>
      <p>
        Résultat : <strong>des formules creuses</strong> ("Ma motivation et mon dynamisme seront des atouts pour votre équipe"), <strong>un ton trop formel</strong> qui sonne comme un modèle Word des années 2000, et <strong>aucune personnalisation réelle</strong> — les mêmes phrases pourraient s&apos;appliquer à n&apos;importe quelle candidature dans n&apos;importe quel secteur.
      </p>
      <p>
        Le recruteur qui lit 50 lettres par semaine le voit tout de suite. Pas parce qu&apos;il détecte l&apos;IA — mais parce que la lettre ne dit rien sur toi ni sur l&apos;entreprise en particulier.
      </p>

      <h2>Ce qui fait une vraie bonne lettre de motivation</h2>
      <p>
        Une lettre de motivation efficace repose sur trois éléments que l&apos;IA seule ne peut pas générer.
      </p>
      <p>
        <strong>Une accroche qui prouve que tu as lu l&apos;offre EN DÉTAIL.</strong> Pas juste le titre du poste — les détails, les missions spécifiques, le contexte de l&apos;équipe ou de l&apos;entreprise. Une accroche qui aurait pu être écrite pour cette offre et aucune autre.
      </p>
      <p>
        <strong>Un fait concret dans les 3 premières lignes.</strong> Pas "j&apos;ai de l&apos;expérience en gestion de projet" — mais "j&apos;ai livré 4 projets en moins de 6 mois dans un contexte de ressources réduites". Le recruteur doit avoir quelque chose de concret à tenir dans les premières secondes.
      </p>
      <p>
        <strong>Une seule raison vraiment convaincante de te choisir.</strong> Les lettres qui listent 8 qualités différentes ne convainquent personne. Une lettre forte dit une chose, bien. Identifie l&apos;argument qui te distingue vraiment pour ce poste précis — et construis autour.
      </p>

      <h2>La méthode en 3 temps</h2>

      <h3>1. Analyser l&apos;offre en profondeur</h3>
      <p>
        Avant d&apos;écrire une ligne, lis l&apos;offre deux fois. La première fois pour comprendre le poste. La seconde fois pour détecter ce que le recruteur cherche <strong>vraiment</strong> — pas juste les mots-clés techniques, mais le type de problème qu&apos;il veut résoudre.
      </p>
      <p>
        Une offre qui dit "nous cherchons quelqu&apos;un capable de structurer nos processus" ne veut pas juste un profil organisé — elle veut quelqu&apos;un qui a déjà géré du chaos. Une offre qui mentionne "environnement en forte croissance" cherche quelqu&apos;un qui tient sous la pression, pas quelqu&apos;un qui aime les startups en général.
      </p>

      <h3>2. Identifier ton argument unique</h3>
      <p>
        Pose-toi cette question : parmi tous les candidats qui postulent à cette offre, <strong>quelle est la seule chose que je suis le seul à pouvoir dire ?</strong>
      </p>
      <p>
        Ce n&apos;est pas forcément la chose la plus impressionnante de ton parcours. C&apos;est la chose la plus pertinente pour ce poste, que les autres candidats n&apos;auront probablement pas. Une expérience sectorielle rare, une combinaison de compétences inhabituelle, un projet qui ressemble exactement à ce que l&apos;entreprise veut faire.
      </p>

      <h3>3. Utiliser l&apos;IA pour la structure, pas pour le contenu</h3>
      <p>
        Une fois que tu as ton argument unique et tes faits concrets, l&apos;IA devient utile. Elle peut t&apos;aider à structurer ton propos, à reformuler maladroitement, à trouver le bon niveau de langue. Mais le contenu — les faits, les chiffres, la personnalisation — doit venir de toi.
      </p>

      <h2>Les prompts qui fonctionnent</h2>

      <h3>Générer une accroche percutante</h3>
      <blockquote>
        "Écris une accroche de 2 à 3 lignes pour une lettre de motivation. Elle doit faire référence à un élément spécifique de cette offre : [CITE UN ÉLÉMENT PRÉCIS DE L&apos;OFFRE]. Elle doit intégrer ce fait concret de mon parcours : [TON FAIT]. Elle ne doit pas commencer par &apos;C&apos;est avec un grand intérêt&apos; ni par &apos;Je me permets de vous contacter&apos;. Offre complète : [OFFRE]."
      </blockquote>

      <h3>Développer l&apos;argument principal</h3>
      <blockquote>
        "Développe en 3 à 4 phrases le paragraphe central d&apos;une lettre de motivation. Mon argument principal est : [TON ARGUMENT UNIQUE]. Les éléments factuels à intégrer sont : [TES FAITS ET CHIFFRES]. L&apos;entreprise cherche : [CE QUE TU AS COMPRIS DE L&apos;OFFRE]. Le ton doit être direct et confiant, sans être arrogant."
      </blockquote>

      <h3>Rédiger la conclusion</h3>
      <blockquote>
        "Écris une conclusion de 2 lignes pour cette lettre de motivation. Elle doit proposer une prochaine étape concrète (entretien, appel), sans formule de politesse excessive. Évite &apos;Dans l&apos;attente de votre réponse&apos; et toute formule qui rend le candidat passif. Contexte du poste : [TITRE DU POSTE] chez [ENTREPRISE]."
      </blockquote>

      <h2>Ce que l&apos;IA doit faire vs ce que tu dois faire</h2>
      <p>
        La frontière est simple une fois qu&apos;on la comprend.
      </p>
      <p>
        <strong>L&apos;IA s&apos;occupe de :</strong> la structure et l&apos;enchaînement des idées, la reformulation quand une phrase est maladroite, la correction orthographique et grammaticale, l&apos;ajustement du niveau de langue selon le secteur.
      </p>
      <p>
        <strong>Toi tu fournis :</strong> les faits concrets et les chiffres réels, la compréhension de ce que l&apos;entreprise cherche vraiment, ton argument unique pour ce poste précis, le ton authentique — la façon dont tu parles vraiment de ton travail.
      </p>
      <p>
        Une bonne lettre de motivation générée avec l&apos;IA devrait lire comme si tu l&apos;avais écrite toi-même un très bon jour. Pas comme un document produit en 2 minutes.
      </p>

      <h2>Un exemple concret : avant / après</h2>
      <p>
        Pour un poste de chef de projet digital dans une PME en croissance :
      </p>
      <p>
        <strong>Avant (lettre IA générique) :</strong> "Passionné par le digital et doté d&apos;une solide expérience en gestion de projet, je suis convaincu que mes compétences correspondent parfaitement aux attentes de votre poste. Mon dynamisme et ma capacité d&apos;adaptation seront des atouts pour votre équipe."
      </p>
      <p>
        <strong>Après (avec la méthode) :</strong> "Vous cherchez quelqu&apos;un capable de cadrer des projets dans un environnement qui change vite — c&apos;est exactement le contexte dans lequel j&apos;ai travaillé ces 3 dernières années. J&apos;ai livré 5 projets de refonte en 18 mois chez [Entreprise], dont deux avec des périmètres qui ont doublé en cours de route. Ce que j&apos;ai appris à faire : tenir un cap quand tout bouge autour."
      </p>
      <p>
        La différence n&apos;est pas stylistique — c&apos;est une question de contenu. La deuxième version dit quelque chose de précis sur une personne précise, pour un poste précis.
      </p>

      <h2>Conclusion</h2>
      <p>
        L&apos;IA ne peut pas rendre ta lettre unique à ta place. Elle peut en revanche t&apos;aider à l&apos;exprimer clairement, à l&apos;organiser, à corriger ce qui accroche. Le travail de fond — comprendre l&apos;offre, identifier ton argument, trouver le fait qui te distingue — reste le tien.
      </p>
      <p>
        Bonne nouvelle : ce travail prend 30 minutes si tu l&apos;aborde avec méthode. Et il fait toute la différence.
      </p>
    </div>
  )
}
