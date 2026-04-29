import {
  Html, Head, Body, Container, Heading, Text, Section, Hr,
} from '@react-email/components'

export function EbookTipEmail() {
  return (
    <Html lang="fr">
      <Head />
      <Body style={{ backgroundColor: '#f4f4f5', fontFamily: 'sans-serif', margin: 0, padding: '40px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '520px', margin: '0 auto', padding: '40px' }}>
          <Heading style={{ color: '#0D0D0D', fontSize: '22px', fontWeight: '900', margin: '0 0 16px' }}>
            Ce prompt a aidé 3 candidats à décrocher un entretien
          </Heading>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Dans le guide, le prompt #7 (Optimisation ATS) est celui qui a le plus fort impact immédiat. Voici comment l&apos;utiliser :
          </Text>
          <Section style={{ backgroundColor: '#f8fafc', borderLeft: '3px solid #1A3CFF', borderRadius: '4px', padding: '16px 20px', marginBottom: '20px' }}>
            <Text style={{ color: '#0D0D0D', fontSize: '14px', fontFamily: 'monospace', margin: 0, lineHeight: '1.6' }}>
              &ldquo;Analyse cette offre d&apos;emploi et ce CV. Liste les 10 mots-clés manquants dans le CV qui apparaissent dans l&apos;offre. Propose une reformulation pour chaque expérience pour les intégrer naturellement.&rdquo;
            </Text>
          </Section>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Résultat : un CV qui parle exactement le même langage que l&apos;ATS du recruteur. La plupart des candidats passent à côté de ça.
          </Text>
          <Text style={{ color: '#3f3f46', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Bonne chasse,<br />L&apos;équipe LB FRAME
          </Text>
          <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
            L&apos;Agent IA Emploi · LB FRAME
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
