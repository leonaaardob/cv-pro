import { describe, it, expect } from 'vitest'
import { buildCvKey } from '@/lib/r2'

describe('buildCvKey', () => {
  it('builds original key with pdf extension', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'original', 'pdf')
    expect(key).toBe('cvs/user-123/uuid-456/original.pdf')
  })

  it('builds rewritten key', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'rewritten', 'docx')
    expect(key).toBe('cvs/user-123/uuid-456/rewritten.docx')
  })

  it('sanitizes extension to lowercase', () => {
    const key = buildCvKey('user-123', 'uuid-456', 'original', 'PDF')
    expect(key).toBe('cvs/user-123/uuid-456/original.pdf')
  })
})
