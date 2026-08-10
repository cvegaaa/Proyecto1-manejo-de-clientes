import { describe, expect, it } from 'vitest'
import { customerFormSchema, customerSchema } from './customerSchema'

describe('customerFormSchema', () => {
  it('accepts a valid payload', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'ana@example.com',
      phone: '+52 55 1234 5678',
      company: 'Acme Inc',
      status: 'active',
      notes: 'Cliente frecuente',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'not-an-email',
      status: 'lead',
    })

    expect(result.success).toBe(false)
  })

  it('rejects a name shorter than 2 characters', () => {
    const result = customerFormSchema.safeParse({
      name: 'A',
      email: 'ana@example.com',
      status: 'lead',
    })

    expect(result.success).toBe(false)
  })

  it('defaults status to "lead" when omitted', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'ana@example.com',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe('lead')
    }
  })

  it('treats empty optional fields as undefined', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'ana@example.com',
      phone: '',
      company: '',
      notes: '',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.phone).toBeUndefined()
      expect(result.data.company).toBeUndefined()
      expect(result.data.notes).toBeUndefined()
    }
  })

  it('rejects notes longer than 500 characters', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'ana@example.com',
      notes: 'a'.repeat(501),
    })

    expect(result.success).toBe(false)
  })

  it('rejects a loosely-invalid phone format', () => {
    const result = customerFormSchema.safeParse({
      name: 'Ana Torres',
      email: 'ana@example.com',
      phone: 'abc',
    })

    expect(result.success).toBe(false)
  })
})

describe('customerSchema', () => {
  it('accepts a full customer entity', () => {
    const result = customerSchema.safeParse({
      id: 'customer-1',
      name: 'Ana Torres',
      email: 'ana@example.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    expect(result.success).toBe(true)
  })

  it('rejects a non-ISO createdAt', () => {
    const result = customerSchema.safeParse({
      id: 'customer-1',
      name: 'Ana Torres',
      email: 'ana@example.com',
      status: 'active',
      createdAt: 'not-a-date',
      updatedAt: new Date().toISOString(),
    })

    expect(result.success).toBe(false)
  })
})
