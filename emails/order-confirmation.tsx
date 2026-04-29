import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

export function OrderConfirmationEmail({
  productName,
  orderId,
  magicLinkUrl,
}: {
  productName: string
  orderId: string
  magicLinkUrl: string
}) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Commande confirmée !
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Merci pour ta commande <strong>{productName}</strong>. Ton CV sera réécrit et livré dans ta boîte mail sous 30 minutes.
          </Text>
          <Text style={{ color: '#6b7280', fontSize: '14px', marginTop: '0' }}>
            Numéro de commande : <code style={{ color: '#0D0D0D' }}>{orderId}</code>
          </Text>
          <Button
            href={magicLinkUrl}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Accéder à mon espace →
          </Button>
          <Text style={{ color: '#9ca3af', fontSize: '12px', marginTop: '16px' }}>
            Ce lien te connecte directement — valable 7 jours.
          </Text>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Un service LB FRAME · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
