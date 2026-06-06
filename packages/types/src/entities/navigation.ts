import type { ID, Timestamp } from '../utils.js'

export interface NavItem {
  id: ID
  label: string
  url?: string
  pageId?: ID
  target: '_self' | '_blank'
  order: number
  parentId?: ID
  children?: NavItem[]
}

export interface NavMenu {
  id: ID
  name: string
  handle: string // e.g. 'main', 'footer'
  items: NavItem[]
  createdAt: Timestamp
  updatedAt: Timestamp
}
