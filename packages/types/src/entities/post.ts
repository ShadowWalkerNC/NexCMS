import type { ID, Timestamp } from '../utils.js'

export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived'

export interface PostCategory {
  id: ID
  name: string
  slug: string
  description?: string
  parentId?: ID
}

export interface PostTag {
  id: ID
  name: string
  slug: string
}

export interface Post {
  id: ID
  title: string
  slug: string
  excerpt?: string
  content: string // HTML or Markdown
  status: PostStatus
  featuredImageId?: ID
  authorId: ID
  categories: PostCategory[]
  tags: PostTag[]
  publishedAt?: Timestamp
  scheduledAt?: Timestamp
  readingTimeMinutes?: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
