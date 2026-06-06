import type { ID, Timestamp } from '../utils.js'

export type FieldType =
  | 'text'
  | 'richtext'
  | 'number'
  | 'boolean'
  | 'date'
  | 'email'
  | 'url'
  | 'select'
  | 'multiselect'
  | 'relation'
  | 'media'
  | 'json'

export interface CollectionField {
  name: string
  label: string
  type: FieldType
  required?: boolean
  unique?: boolean
  default?: unknown
  options?: string[] // for select/multiselect
  relationTo?: string // collection name for relation fields
}

export interface Collection {
  id: ID
  name: string // slug-style: 'products'
  label: string // display: 'Products'
  labelSingular: string
  fields: CollectionField[]
  timestamps: boolean
  drafts: boolean
  auth: boolean
  access: {
    read: 'public' | 'authenticated' | 'admin'
    create: 'public' | 'authenticated' | 'admin'
    update: 'authenticated' | 'admin'
    delete: 'admin'
  }
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CollectionEntry {
  id: ID
  collectionId: ID
  data: Record<string, unknown>
  status?: 'draft' | 'published'
  createdAt: Timestamp
  updatedAt: Timestamp
}
