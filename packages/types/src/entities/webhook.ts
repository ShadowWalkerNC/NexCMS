import type { ID, Timestamp } from '../utils.js'

export type WebhookEvent =
  | 'page.published'
  | 'page.updated'
  | 'post.published'
  | 'media.uploaded'
  | 'user.created'
  | 'form.submitted'
  | 'order.created'

export interface Webhook {
  id: ID
  url: string
  events: WebhookEvent[]
  secret?: string
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
