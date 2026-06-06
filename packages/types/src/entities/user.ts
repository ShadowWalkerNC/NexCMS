import type { ID, Timestamp } from '../utils.js'

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer'

export interface User {
  id: ID
  email: string
  name: string
  role: UserRole
  avatarUrl?: string
  isActive: boolean
  lastLoginAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type UserPublic = Pick<User, 'id' | 'name' | 'avatarUrl'>
