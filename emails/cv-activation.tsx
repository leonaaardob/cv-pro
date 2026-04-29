import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

interface CvActivationEmailProps {
  orderId: string
}

export function CvActivationEmail({ orderId: _ }: CvActivationEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            3 choses à faire avec ton CV réécrit
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Ton CV est optimisé pour les ATS. Voici comment l'utiliser au maximum :
          </Text>
          {[
            {
              n: '1.',
              t: 'Mets à jour ton profil LinkedIn',
              d: "Colle les nouvelles formulations de ton CV dans ton résumé et tes expériences. Les recruteurs cherchent les mêmes mots que les ATS.",
            },
            {
              n: '2.',
              t: 'Adapte pour chaque offre',
              d: "Repère les 3 à 5 mots-clés de chaque annonce et vérifie qu'ils apparaissent dans ton CV. 5 minutes par candidature, taux de réponse doublé.",
            },
            {
              n: '3.',
              t: 'Résultat pas satisfaisant ?',
              d: "Tu peux demander une révision depuis ton espace client. C'est gratuit, illimité, sans justification à donner.",
            },
          ].map(({ n, t, d }) => (
            <div key={n} style={{ marginBottom: '16px' }}>
              <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: '0 0 4px' }}>
                {n} {t}
              </Text>
              <Text style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                {d}
              </Text>
            </div>
          ))}
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
