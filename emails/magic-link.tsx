import { Html, Head, Body, Container, Heading, Text, Button, Hr } from '@react-email/components'

export function MagicLinkEmail({ magicLinkUrl }: { magicLinkUrl: string }) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '40px' }}>
          <Heading style={{ fontSize: '24px', color: '#0D0D0D', marginBottom: '8px' }}>
            Connexion à CV Pro
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Clique sur le bouton ci-dessous pour te connecter. Ce lien est valable 15 minutes.
          </Text>
          <Button
            href={magicLinkUrl}
            style={{ backgroundColor: '#1A3CFF', color: '#ffffff', borderRadius: '8px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', display: 'block', textAlign: 'center', marginTop: '24px' }}
          >
            Se connecter
          </Button>
          <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />
          <Text style={{ color: '#9ca3af', fontSize: '12px' }}>
            Si tu n'as pas demandé ce lien, ignore cet email. Aucune action n'est requise.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
