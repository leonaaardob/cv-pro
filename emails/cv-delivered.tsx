import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

export function CvDeliveredEmail({ orderId }: { orderId: string }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Ton CV réécrit est prêt
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Ton CV a été réécrit par notre équipe. Tu peux maintenant le télécharger depuis ton espace client.
          </Text>
          <Button
            href={`${APP_URL}/dashboard/${orderId}`}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Télécharger mon CV
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
