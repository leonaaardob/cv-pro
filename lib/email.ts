import { render } from '@react-email/render'
import { MagicLinkEmail } from '@/emails/magic-link'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { CvDeliveredEmail } from '@/emails/cv-delivered'
import { AccountDeletedEmail } from '@/emails/account-deleted'

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
