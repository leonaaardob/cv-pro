import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const CV_URL = 'https://cvpro.lbframe.com/order'

export function EbookUpsellCv1Email() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Tu as le guide. Il te manque peut-être une chose.
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            L&apos;Agent IA Emploi te donne tous les prompts pour réécrire ton CV toi-même. C&apos;est une des meilleures façons de le faire — si tu as 2 heures devant toi.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Si tu veux que ce soit fait en 30 minutes — sans t&apos;en occuper — c&apos;est ce qu&apos;on fait chez CV Pro pour 12€.
          </Text>
          <Text style={{ color: '#71717a', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', margin: '0 0 24px' }}>
            2 heures de travail vs 30 minutes et 12€. Tu choisis.
          </Text>
          <Button
            href={CV_URL}
            style={{
              backgroundColor: '#0D0D0D',
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
            Faire réécrire mon CV en 30 min →
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L&apos;Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
