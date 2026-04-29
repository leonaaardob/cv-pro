import { Resend } from 'resend'
import { MagicLinkEmail } from '@/emails/magic-link'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { CvDeliveredEmail } from '@/emails/cv-delivered'
import { AccountDeletedEmail } from '@/emails/account-deleted'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'CV Pro <noreply@cvpro.lbframe.com>'

export async function sendMagicLinkEmail({ to, magicLinkUrl }: { to: string; magicLinkUrl: string }) {
  await resend.emails.send({
    from: FROM,
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
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Commande confirmée — CV Pro',
    react: OrderConfirmationEmail({ productName, orderId, magicLinkUrl }),
  })
}

export async function sendCvDeliveredEmail({
  to,
  orderId,
}: {
  to: string
  orderId: string
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Ton CV réécrit est prêt — CV Pro',
    react: CvDeliveredEmail({ orderId }),
  })
}

export async function sendAccountDeletedEmail({ to }: { to: string }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Ton compte CV Pro a été supprimé',
    react: AccountDeletedEmail(),
  })
}
