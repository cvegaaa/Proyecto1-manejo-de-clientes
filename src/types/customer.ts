export type CustomerStatus = 'lead' | 'active' | 'inactive'

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: CustomerStatus
  notes?: string
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type CustomerFormValues = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt'
>
