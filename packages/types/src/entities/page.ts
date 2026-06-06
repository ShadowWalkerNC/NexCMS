import type { ID, Timestamp } from '../utils.js'

export type PageStatus = 'draft' | 'published' | 'scheduled' | 'archived'

export interface PageBlock {
  id: string
  type: string
  data: Record<string, unknown>
  order: number
}

export interface PageSeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
  schema?: Record<string, unknown>
}

export interface Page {
  id: ID
  title: string
  slug: string
  status: PageStatus
  blocks: PageBlock[]
  seo: PageSeo
  templateId?: string
  parentId?: ID
  order: number
  publishedAt?: Timestamp
  scheduledAt?: Timestamp
  authorId: ID
  createdAt: Timestamp
  updatedAt: Timestamp
}
