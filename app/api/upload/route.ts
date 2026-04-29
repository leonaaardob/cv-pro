// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Invalid file type. Only PDF and Word files accepted.' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 400 })

  const ext = file.name.split('.').pop() ?? 'pdf'
  const uploadUuid = randomUUID()
  const key = buildCvKey(session.user.id, uploadUuid, 'original', ext)

  const buffer = Buffer.from(await file.arrayBuffer())
  await uploadToR2(key, buffer, file.type)

  return NextResponse.json({ key, uploadUuid })
}
