import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
}

export default withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: false,
  sourcemaps: { disable: true },
  webpack: {
    autoInstrumentServerFunctions: true,
    autoInstrumentAppDirectory: true,
    autoInstrumentMiddleware: false,
    treeshake: {
      removeDebugLogging: true,
    },
  },
})
