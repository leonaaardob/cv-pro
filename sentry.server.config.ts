import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.GLITCHTIP_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === 'production',
})
