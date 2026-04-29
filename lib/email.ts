import { render } from '@react-email/render'
import { MagicLinkEmail } from '@/emails/magic-link'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { CvDeliveredEmail } from '@/emails/cv-delivered'
import { AccountDeletedEmail } from '@/emails/account-deleted'
import { RevisionRequestEmail } from '@/emails/revision-request'
import { EbookDeliveredEmail } from '@/emails/ebook-delivered'
import { CvActivationEmail } from '@/emails/cv-activation'
import { CvFeedbackEmail } from '@/emails/cv-feedback'
import { CvUpsellEbookEmail } from '@/emails/cv-upsell-ebook'
import { EbookUpsellCv1Email } from '@/emails/ebook-upsell-cv-1'
import { EbookTipEmail } from '@/emails/ebook-tip'
import { EbookNurturingEmail } from '@/emails/ebook-nurturing'
import { EbookFeedbackEmail } from '@/emails/ebook-feedback'
import { EbookUpsellCv2Email } from '@/emails/ebook-upsell-cv-2'

const FROM = 'CV Pro <noreply@cvpro.lbframe.com>'

async function sendEmail({ to, subject, react }: { to: string; subject: string; react: React.ReactElement }) {
  if (process.env.SMTP_HOST) {
    const nodemailer = await import('nodemailer')
    const transport = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 1025),
      secure: false,
    })
    const html = await render(react)
    await transport.sendMail({ from: FROM, to, subject, html })
  } else {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({ from: FROM, to, subject, react })
  }
}

export async function sendMagicLinkEmail({ to, magicLinkUrl }: { to: string; magicLinkUrl: string }) {
  await sendEmail({
    to,
    subject: 'Ton lien de connexion CV Pro',
    react: MagicLinkEmail({ magicLinkUrl }),
  })
}

export async function sendOrderConfirmationEmail({
  to,
  productName,
  orderId,
  magicLinkUrl,
}: {
  to: string
  productName: string
  orderId: string
  magicLinkUrl: string
}) {
  await sendEmail({
    to,
    subject: 'Commande confirmée — CV Pro',
    react: OrderConfirmationEmail({ productName, orderId, magicLinkUrl }),
  })
}

export async function sendCvDeliveredEmail({ to, orderId }: { to: string; orderId: string }) {
  await sendEmail({
    to,
    subject: 'Ton CV réécrit est prêt — CV Pro',
    react: CvDeliveredEmail({ orderId }),
  })
}

export async function sendAccountDeletedEmail({ to }: { to: string }) {
  await sendEmail({
    to,
    subject: 'Ton compte CV Pro a été supprimé',
    react: AccountDeletedEmail(),
  })
}

export async function sendEbookDeliveredEmail({
  to,
  downloadUrl,
}: {
  to: string
  downloadUrl: string
}) {
  await sendEmail({
    to,
    subject: "L'Agent IA Emploi — Ton guide est prêt",
    react: EbookDeliveredEmail({ downloadUrl }),
  })
}

export async function sendRevisionNotificationEmail({
  to,
  customerEmail,
  orderId,
  productName,
  message,
}: {
  to: string
  customerEmail: string
  orderId: string
  productName: string
  message?: string
}) {
  await sendEmail({
    to,
    subject: `Révision demandée — ${productName}`,
    react: RevisionRequestEmail({ customerEmail, orderId, productName, message }),
  })
}

type SequenceParams = Record<string, string>

const SEQUENCE_TEMPLATES: Record<string, {
  subject: string
  render: (params: SequenceParams) => React.ReactElement
}> = {
  'cv-activation': {
    subject: '3 choses à faire avec ton CV réécrit',
    render: (p) => CvActivationEmail({ orderId: p.orderId ?? '' }),
  },
  'cv-feedback': {
    subject: 'Est-ce que ça se passe bien ?',
    render: () => CvFeedbackEmail(),
  },
  'cv-upsell-ebook': {
    subject: 'Tu veux aller plus loin dans ta recherche ?',
    render: () => CvUpsellEbookEmail(),
  },
  'ebook-upsell-cv-1': {
    subject: 'Tu as le guide. Il te manque peut-être une chose.',
    render: () => EbookUpsellCv1Email(),
  },
  'ebook-tip': {
    subject: 'Ce prompt a aidé 3 candidats à décrocher un entretien',
    render: () => EbookTipEmail(),
  },
  'ebook-nurturing': {
    subject: 'Est-ce que tu as eu des réponses ?',
    render: () => EbookNurturingEmail(),
  },
  'ebook-feedback': {
    subject: 'Ton avis en 30 secondes',
    render: () => EbookFeedbackEmail(),
  },
  'ebook-upsell-cv-2': {
    subject: 'Ce que les candidats qui trouvent vite font différemment',
    render: () => EbookUpsellCv2Email(),
  },
}

export async function sendSequenceEmail(
  to: string,
  template: string,
  params: SequenceParams,
): Promise<void> {
  const config = SEQUENCE_TEMPLATES[template]
  if (!config) {
    console.error('Unknown sequence email template:', template)
    return
  }
  await sendEmail({ to, subject: config.subject, react: config.render(params) })
}
