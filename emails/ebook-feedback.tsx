import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function EbookFeedbackEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ton avis en 30 secondes
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Tu as eu le guide il y a une semaine. Une seule question :
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '17px', fontWeight: '700', lineHeight: '1.5', margin: '0 0 8px' }}>
            Sur une échelle de 0 à 10, est-ce que tu recommanderais L&apos;Agent IA Emploi à quelqu&apos;un en recherche d&apos;emploi ?
          </Text>
          <Text style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Réponds directement à cet email avec ton score (et pourquoi si tu veux). Chaque retour est lu personnellement.
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: 0 }}>
            Leonardo — LB FRAME
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L&apos;Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
