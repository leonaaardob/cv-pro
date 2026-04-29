import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function EbookNurturingEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Est-ce que tu as eu des réponses ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Tu as le guide depuis quelques jours. J&apos;espère que les prompts t&apos;ont été utiles.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Si tu as eu des retours positifs sur ton CV ou décroché des entretiens, réponds-moi — ça nous aide à savoir ce qui marche vraiment.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Et si tu galères encore, on est là aussi. Un simple retour suffit.
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
