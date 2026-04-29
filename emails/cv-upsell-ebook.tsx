import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const EBOOK_URL = 'https://cvpro.lbframe.com/agent-ia-emploi'

export function CvUpsellEbookEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ton CV est prêt. Tu veux aller plus loin ?
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Le CV optimisé c&apos;est la base. Mais les candidats qui décrochent le plus d&apos;entretiens font aussi autre chose : ils utilisent l&apos;IA pour chaque étape.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            <strong>L&apos;Agent IA Emploi</strong> — 50 prompts copier-coller pour piloter toute ta recherche avec l&apos;IA. Lettre de motivation, préparation entretien, suivi des candidatures, relances.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            <strong>9€.</strong> PDF livré instantanément par email.
          </Text>
          <Button
            href={EBOOK_URL}
            style={{
              backgroundColor: '#1A3CFF',
              borderRadius: '10px',
              color: '#ffffff',
              display: 'inline-block',
              fontSize: '15px',
              fontWeight: '700',
              padding: '14px 28px',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            Découvrir L&apos;Agent IA Emploi →
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            CV Pro · Un service LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
