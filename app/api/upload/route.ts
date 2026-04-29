import { NextRequest, NextResponse } from 'next/server'
import { uploadToR2, buildCvKey } from '@/lib/r2'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Invalid file type. Only PDF and Word files accepted.' }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 400 })

  const ext = file.name.split('.').pop() ?? 'pdf'
  const uploadUuid = randomUUID()
  const key = buildCvKey(uploadUuid, 'original', ext)

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    await uploadToR2(key, buffer, file.type)
  } catch (err) {
    console.error('[upload] R2 error:', err)
    return NextResponse.json({ error: 'Upload failed. Check R2 configuration.' }, { status: 500 })
  }

  return NextResponse.json({ key, uploadUuid })
}
