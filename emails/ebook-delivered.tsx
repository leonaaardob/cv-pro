import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Section,
} from '@react-email/components'

interface EbookDeliveredEmailProps {
  downloadUrl: string
}

export function EbookDeliveredEmail({ downloadUrl }: EbookDeliveredEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '24px', fontWeight: '900', margin: '0 0 8px' }}>
            Ton guide est prêt 🎯
          </Heading>
          <Text style={{ color: '#71717a', fontSize: '15px', margin: '0 0 24px' }}>
            50 prompts pour piloter ta recherche d'emploi avec l'IA — disponibles maintenant.
          </Text>

          <Section style={{ marginBottom: '32px' }}>
            <Button
              href={downloadUrl}
              style={{
                backgroundColor: '#1A3CFF',
                borderRadius: '10px',
                color: '#ffffff',
                display: 'inline-block',
                fontSize: '15px',
                fontWeight: '700',
                padding: '14px 28px',
                textDecoration: 'none',
              }}
            >
              Télécharger L'Agent IA Emploi →
            </Button>
          </Section>

          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />

          <Text style={{ color: '#71717a', fontSize: '13px', margin: '0 0 8px' }}>
            Ce lien est valable <strong>7 jours</strong>. Pense à sauvegarder le PDF.
          </Text>
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: '0' }}>
            Un service LB FRAME ·{' '}
            <a href="mailto:commande@lbframe.com" style={{ color: '#a1a1aa' }}>
              commande@lbframe.com
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
