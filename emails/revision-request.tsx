import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://cvpro.lbframe.com'

export function RevisionRequestEmail({
  customerEmail,
  orderId,
  productName,
  message,
}: {
  customerEmail: string
  orderId: string
  productName: string
  message?: string
}) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D' }}>
            Révision demandée
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Le client <strong>{customerEmail}</strong> a demandé une révision pour :
          </Text>
          <Text style={{ color: '#0D0D0D', fontSize: '16px', fontWeight: '600' }}>
            {productName}
          </Text>
          {message && (
            <Text style={{ color: '#374151', fontSize: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '12px 16px', marginTop: '16px' }}>
              &ldquo;{message}&rdquo;
            </Text>
          )}
          <Button
            href={`${APP_URL}/admin/orders/${orderId}`}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Voir la commande →
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            CV Pro · Admin · cvpro@lbframe.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
