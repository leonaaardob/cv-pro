import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

function createDb() {
  const client = postgres(process.env.DATABASE_URL!)
  return drizzle(client, { schema })
}

type Db = ReturnType<typeof createDb>

declare global {
  // eslint-disable-next-line no-var
  var __db: Db | undefined
}

export const db = globalThis.__db ?? createDb()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db = db
}
