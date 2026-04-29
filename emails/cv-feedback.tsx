import {
  Html, Head, Body, Container, Heading, Text, Hr,
} from '@react-email/components'

export function CvFeedbackEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Est-ce que ça se passe bien ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Ton CV réécrit est entre tes mains depuis hier. On aimerait savoir si tu es satisfait(e).
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Réponds directement à cet email — ton retour nous aide à améliorer le service et, si quelque chose ne va pas, on s&apos;en occupe immédiatement.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Bonne recherche,
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '15px', fontWeight: '700', margin: 0 }}>
            L&apos;équipe CV Pro
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
