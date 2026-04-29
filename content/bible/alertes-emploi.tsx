export default function GuideAlertesEmploi() {
  return (
    <div className="prose-guide">
      <p>
        Une alerte emploi mal configurée est une source de bruit inutile. Une alerte bien conçue vous fait gagner du temps chaque semaine et vous permet de postuler en premier sur les offres qui correspondent vraiment à votre profil. La différence tient à quelques choix de mots-clés et de paramètres.
      </p>

      <h2>Pourquoi être rapide compte</h2>
      <p>
        Les études sur les comportements de recrutement montrent que les candidatures reçues dans les 48 premières heures après la publication d&apos;une offre ont deux à trois fois plus de chances d&apos;être lues que celles reçues après une semaine. Configurer des alertes en temps réel vous place en tête de file — avant que les recruteurs soient submergés.
      </p>

      <h2>Stratégie de mots-clés pour vos alertes</h2>
      <p>
        Le mot-clé unique est rarement efficace. "Marketing" renvoie des milliers de résultats non pertinents. Voici comment affiner :
      </p>
      <ul>
        <li><strong>Combinez titre de poste + secteur :</strong> "Responsable marketing" + "SaaS B2B" ou "Chef de projet" + "construction"</li>
        <li><strong>Testez les variantes :</strong> créez des alertes distinctes pour "Directeur commercial", "Head of Sales", et "Responsable des ventes" — les trois désignent parfois le même poste selon l&apos;entreprise</li>
        <li><strong>Intégrez des compétences clés :</strong> une alerte sur "Python" + "data engineer" + "Lyon" sera bien plus précise que "data engineer Lyon"</li>
        <li><strong>Excluez les termes parasites :</strong> sur LinkedIn et Indeed, utilisez les opérateurs booléens (NOT, -) pour éliminer les offres hors sujet (ex. : "chef de projet -télécoms" si vous ne souhaitez pas ce secteur)</li>
      </ul>

      <h2>Configurer les alertes plateforme par plateforme</h2>
      <h3>LinkedIn</h3>
      <p>
        Effectuez une recherche avec vos critères, puis cliquez sur "Créer une alerte". Sélectionnez la fréquence "Quotidienne" plutôt qu&apos;hebdomadaire — vous recevrez les offres le matin même de leur publication. LinkedIn permet aussi de filtrer par type de contrat, niveau d&apos;expérience, et lieu précis.
      </p>

      <h3>Indeed</h3>
      <p>
        Indeed envoie des alertes par email dès qu&apos;une nouvelle offre correspond à vos critères. Affinez la localisation avec un rayon kilométrique (utile si vous êtes flexible) et activez l&apos;option "offres récentes uniquement" pour éviter les offres expirées qui remontent dans les résultats.
      </p>

      <h3>France Travail</h3>
      <p>
        Utilisez les codes ROME (référentiel des métiers) pour créer des alertes précises sur France Travail. Un code ROME correspond à un profil de métier — un conseiller peut vous aider à identifier les bons codes si vous n&apos;êtes pas familier avec cet outil.
      </p>

      <h3>APEC</h3>
      <p>
        L&apos;APEC propose des alertes par email configurables avec plusieurs critères simultanés. Elle est particulièrement utile pour les postes cadres dans les PME qui ne publient que sur cette plateforme.
      </p>

      <h2>Gérer le volume sans être débordé</h2>
      <p>
        Créez une adresse email dédiée à votre recherche d&apos;emploi ou un dossier spécifique dans votre boîte mail. Consultez vos alertes deux fois par jour maximum — matin et début d&apos;après-midi. Toute alerte qui génère régulièrement des offres non pertinentes doit être affinée ou supprimée.
      </p>

      <blockquote>
        Une bonne alerte emploi ne se configure pas en deux minutes. Testez, ajustez, et affinez pendant les deux premières semaines. Une fois calibrée correctement, elle devient un flux de valeur automatique qui travaille pour vous chaque jour.
      </blockquote>
    </div>
  )
}
