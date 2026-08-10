import { z } from 'zod'
import type { Customer, CustomerFormValues } from '../types/customer'

const emptyStringToUndefined = (value: unknown) =>
  value === '' ? undefined : value

const phonePattern = /^[0-9+\-().\s]{7,20}$/

export const customerFormSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z
    .string()
    .trim()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido'),
  phone: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .regex(phonePattern, 'Ingresa un teléfono válido')
      .optional(),
  ),
  company: z.preprocess(emptyStringToUndefined, z.string().trim().optional()),
  status: z.enum(['lead', 'active', 'inactive']).default('lead'),
  notes: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .max(500, 'Las notas no pueden superar los 500 caracteres')
      .optional(),
  ),
}) satisfies z.ZodType<CustomerFormValues>

export type CustomerFormSchemaInput = z.input<typeof customerFormSchema>

export const customerSchema = customerFormSchema.extend({
  id: z.string().min(1),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
}) satisfies z.ZodType<Customer>
