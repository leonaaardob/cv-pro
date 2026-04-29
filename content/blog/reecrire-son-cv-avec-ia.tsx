import Link from 'next/link'

export default function Article() {
  return (
    <div className="prose-content">
      <p>
        En 20 minutes, une IA peut transformer un CV terne en un document percutant. Mais mal utilisée, elle produit exactement l&apos;inverse : un CV générique, interchangeable, que les recruteurs reconnaissent au premier paragraphe. La différence entre les deux, c&apos;est la méthode.
      </p>
      <p>
        Ce guide te montre comment utiliser ChatGPT, Claude ou d&apos;autres IA pour réécrire ton CV de façon efficace — avec les prompts exacts à copier-coller.
      </p>

      <h2>Pourquoi réécrire son CV avec l&apos;IA ?</h2>
      <p>
        L&apos;IA excelle dans quatre domaines précis quand il s&apos;agit de CV.
      </p>
      <p>
        <strong>Des formulations plus percutantes.</strong> Elle transforme "j&apos;ai participé à des projets" en "j&apos;ai piloté 3 projets de refonte UX, livrés en avance sur les délais fixés". Elle sait trouver les verbes d&apos;action, les structures de phrase qui accrochent.
      </p>
      <p>
        <strong>Une meilleure compatibilité ATS.</strong> Les logiciels de tri automatique des candidatures cherchent des mots-clés précis. L&apos;IA peut analyser une offre et t&apos;aider à intégrer naturellement les termes attendus.
      </p>
      <p>
        <strong>La correction orthographique et grammaticale.</strong> Pas de fautes, des tournures fluides — ça semble basique mais c&apos;est souvent là que les CV accrochent.
      </p>
      <p>
        <strong>La cohérence du ton.</strong> Sur un CV rédigé sur plusieurs années, le style change. L&apos;IA peut harmoniser l&apos;ensemble pour que tout semble écrit d&apos;une seule main.
      </p>

      <h2>Avant de commencer : ce que l&apos;IA ne peut pas faire pour toi</h2>
      <p>
        Soyons honnêtes : l&apos;IA a des limites importantes qu&apos;il faut comprendre avant de te lancer.
      </p>
      <p>
        <strong>Elle ne connaît pas tes vraies réalisations.</strong> L&apos;IA ne sait pas que tu as sauvé ce projet en catastrophe un vendredi soir, que tu as formé 12 personnes en 3 mois, ou que tu as négocié un budget de zéro à 50 000 euros. Elle ne peut travailler qu&apos;avec ce que tu lui fournis. Si tu lui donnes du vague, elle produira du vague amélioré — toujours vague.
      </p>
      <p>
        <strong>Elle ne connaît pas le poste si tu ne lui montres pas l&apos;offre.</strong> Une réécriture générique sans contexte cible produira un CV générique. Pour que l&apos;IA travaille bien, elle a besoin de l&apos;offre d&apos;emploi complète — pas juste le titre du poste.
      </p>
      <p>
        <strong>Elle peut inventer des chiffres.</strong> Certains modèles ont tendance à "compléter" avec des données plausibles mais fausses. Vérifie toujours que les chiffres qui apparaissent dans le résultat viennent bien de toi.
      </p>

      <h2>Méthode en 4 étapes</h2>

      <h3>Étape 1 : Collecter ses matières premières</h3>
      <p>
        Avant de toucher à l&apos;IA, fais une liste exhaustive de tout ce que tu as fait dans chaque poste. Sans filtre. Sans te demander si c&apos;est "assez impressionnant". Note les missions, les projets, les résultats — même approximatifs, même partiels.
      </p>
      <p>
        Pour chaque expérience, essaie de répondre à ces questions : Qu&apos;est-ce que j&apos;ai fait concrètement ? Combien de personnes ai-je managées ou formées ? Quels outils ai-je utilisés ? Quel était l&apos;impact mesurable de mon travail ? Qu&apos;est-ce qui aurait été différent si je n&apos;avais pas été là ?
      </p>
      <p>
        Ce travail prend du temps. C&apos;est normal. C&apos;est lui qui détermine la qualité de ce que l&apos;IA va produire.
      </p>

      <h3>Étape 2 : Préparer le contexte pour l&apos;IA</h3>
      <p>
        L&apos;IA a besoin de deux choses pour travailler correctement : tes expériences brutes (issues de l&apos;étape 1) et l&apos;offre d&apos;emploi complète que tu vises.
      </p>
      <p>
        Copie l&apos;offre entière — pas juste les 3 premières lignes. Les ATS et les recruteurs lisent tout, et les mots-clés importants se cachent parfois dans les derniers paragraphes. Colle ensuite tes notes d&apos;expérience brutes.
      </p>
      <p>
        Plus tu es précis dans ce que tu donnes, plus le résultat sera précis.
      </p>

      <h3>Étape 3 : Le prompt de réécriture</h3>
      <p>
        Voici le prompt de base à adapter selon ton contexte :
      </p>
      <blockquote>
        "Tu es un expert en rédaction de CV pour le marché français. Je vais te donner une offre d&apos;emploi et mes expériences professionnelles brutes. Ton rôle est de réécrire mes expériences en bullet points percutants, en utilisant des verbes d&apos;action, des résultats quantifiés quand je t&apos;en fournis, et les mots-clés de l&apos;offre intégrés naturellement. Ne complète pas les chiffres que je n&apos;ai pas mentionnés. Voici l&apos;offre : [COLLE L&apos;OFFRE]. Voici mes expériences brutes : [COLLE TES NOTES]."
      </blockquote>

      <h3>Étape 4 : Affiner et personnaliser</h3>
      <p>
        N&apos;accepte jamais le premier jet. Lis le résultat à voix haute. Est-ce que c&apos;est toi qui parles ? Est-ce que chaque phrase est vraie ? Est-ce que les formules sonnent naturelles ou comme du texte généré ?
      </p>
      <p>
        Demande à l&apos;IA de reformuler les passages qui semblent trop lisses ou trop génériques. Indique-lui exactement ce qui ne convient pas : "Cette phrase est trop vague, j&apos;ai besoin de quelque chose de plus concret", "Ce ton est trop formel, rends-le plus direct."
      </p>

      <h2>Les prompts exacts à copier-coller</h2>

      <h3>Prompt 1 : réécriture d&apos;une expérience professionnelle</h3>
      <blockquote>
        "Réécris cette expérience professionnelle en 4 bullet points maximum. Commence chaque bullet par un verbe d&apos;action fort (piloté, développé, mis en place, optimisé...). Intègre ces mots-clés de l&apos;offre : [LISTE DES MOTS-CLÉS]. N&apos;invente aucun chiffre — utilise uniquement ce que je t&apos;ai fourni. Expérience brute : [TON TEXTE]."
      </blockquote>

      <h3>Prompt 2 : résumé / accroche personnelle</h3>
      <blockquote>
        "Écris une accroche professionnelle de 3 à 4 lignes pour un CV. Elle doit être spécifique au poste de [TITRE DU POSTE], mentionner [TON NOMBRE] d&apos;années d&apos;expérience dans [TON SECTEUR], et se terminer par une phrase qui indique ce que j&apos;apporte concrètement à l&apos;employeur. Évite les formules creuses comme &apos;dynamique&apos;, &apos;passionné&apos; ou &apos;orienté résultats&apos;. Voici mon parcours en bref : [TES 3-4 POINTS CLÉS]."
      </blockquote>

      <h3>Prompt 3 : liste de compétences ciblée</h3>
      <blockquote>
        "À partir de cette offre d&apos;emploi et de mon parcours, génère une liste de 8 à 12 compétences à inclure dans mon CV. Classe-les par ordre d&apos;importance pour ce poste. Ne mets que des compétences que j&apos;ai réellement mentionnées dans mon parcours. Offre : [OFFRE]. Mon parcours : [TES EXPÉRIENCES]."
      </blockquote>

      <h2>Les erreurs à éviter</h2>

      <h3>Accepter le premier jet sans vérifier les faits</h3>
      <p>
        C&apos;est l&apos;erreur la plus dangereuse. Si l&apos;IA a inventé ou exagéré quelque chose, tu te retrouves avec un CV inexact. En entretien, tu devras défendre chaque ligne — assure-toi que tout est vrai et que tu peux développer chaque point.
      </p>

      <h3>Laisser les formules génériques</h3>
      <p>
        <strong>"Dynamique et motivé"</strong>, <strong>"orienté résultats"</strong>, <strong>"excellent communicant"</strong> — ces expressions sont les drapeaux rouges du CV généré par IA. Elles ne disent rien sur toi spécifiquement. Retire-les systématiquement et remplace-les par des faits concrets.
      </p>

      <h3>Oublier d&apos;adapter pour chaque offre</h3>
      <p>
        Un même CV envoyé à 50 entreprises différentes, c&apos;est rarement efficace. La force de l&apos;IA, c&apos;est précisément de pouvoir adapter rapidement un CV de base à une offre spécifique. Utilise-la pour ça plutôt que de chercher un CV universel.
      </p>

      <h3>Négliger la mise en forme après réécriture</h3>
      <p>
        L&apos;IA travaille sur le texte, pas sur le design. Après la réécriture, vérifie que les longueurs de bullet points sont cohérentes, que rien ne déborde sur la page, que la hiérarchie visuelle reste claire.
      </p>

      <h2>Combien de temps ça prend vraiment ?</h2>
      <p>
        Soyons honnêtes sur les durées réelles. Voici ce que ça représente si tu le fais bien toi-même, sans raccourcis :
      </p>
      <p>
        Collecter tes matières premières (étape 1) : <strong>45 minutes à 1h30</strong> selon le nombre d&apos;expériences et le temps écoulé depuis.
      </p>
      <p>
        Préparer le contexte, lancer les prompts, affiner : <strong>45 minutes à 1h</strong>.
      </p>
      <p>
        Relecture finale, corrections, mise en forme : <strong>30 minutes</strong>.
      </p>
      <p>
        Total honnête : <strong>2 à 3 heures</strong> pour un bon résultat. Pas 20 minutes. Mais c&apos;est quand même 2 à 3 fois plus rapide qu&apos;une réécriture manuelle complète.
      </p>
      <p>
        Si tu veux gagner ce temps, c&apos;est exactement ce que CV Pro fait en 30 minutes — en guidant chaque étape et en générant un document prêt à envoyer.
      </p>

      <h2>Pour aller plus loin</h2>
      <p>
        La réécriture par IA ne sert à rien si le résultat n'est pas compatible avec les logiciels de tri automatique. Avant d'envoyer, assure-toi que ton CV passe les filtres ATS — notre article{' '}
        <Link href="/blog/comment-optimiser-son-cv-pour-les-ats">Comment optimiser son CV pour passer les filtres ATS</Link>{' '}
        te donne la méthode complète. Pour les détails sur l'intégration des mots-clés, consulte aussi notre guide{' '}
        <Link href="/bible-agent-ia-cv/mots-cles-cv">Les mots-clés qui font passer un CV</Link>{' '}
        et{' '}
        <Link href="/bible-agent-ia-cv/quantifier-resultats-cv">Comment quantifier ses résultats sur un CV</Link>.
      </p>

      <h2>Conclusion</h2>
      <p>
        Réécrire son CV avec l&apos;IA, c&apos;est possible et efficace — à condition de ne pas déléguer les parties qui ne peuvent venir que de toi. L&apos;IA est un outil de mise en forme et de formulation. Les faits, les chiffres, la vérité de ton parcours : c&apos;est ton travail de les apporter.
      </p>
      <p>
        Le meilleur CV généré par IA est celui où on ne voit pas que c&apos;est une IA qui l&apos;a écrit. Pour ça, la méthode compte autant que l&apos;outil.
      </p>
    </div>
  )
}
