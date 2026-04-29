import {
  Html, Head, Body, Container, Heading, Text, Button, Hr,
} from '@react-email/components'

const CV_URL = 'https://cvpro.lbframe.com/order'

export function EbookUpsellCv2Email() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ce que les candidats qui trouvent vite font différemment
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            On a traité plus de 200 CVs ces derniers mois. Le point commun des profils qui décrochent le plus d&apos;entretiens : leur CV est réécrit par quelqu&apos;un d&apos;autre.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Pas parce qu&apos;ils ne savent pas écrire. Parce qu&apos;on ne voit pas ses propres angles morts. Un CV réécrit avec un regard extérieur passe toujours mieux.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
            <strong>CV Pro, 12€.</strong> CV réécrit en 30 minutes, livré dans ta boîte mail. Révisions incluses sans limite.
          </Text>
          <Button
            href={CV_URL}
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
            Faire réécrire mon CV pour 12€ →
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
