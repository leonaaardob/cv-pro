import { Html, Head, Body, Container, Heading, Text, Hr } from '@react-email/components'

export function AccountDeletedEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Compte supprimé
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Ton compte CV Pro et toutes tes données associées (fichiers, commandes) ont été supprimés conformément au RGPD. Cette action est irréversible.
          </Text>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · Si tu n'as pas demandé cette suppression, contacte-nous à cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
