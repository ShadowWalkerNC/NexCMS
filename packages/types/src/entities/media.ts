import type { ID, Timestamp } from '../utils.js'

export type MediaType = 'image' | 'video' | 'audio' | 'document' | 'other'

export interface Media {
  id: ID
  filename: string
  originalName: string
  mimeType: string
  type: MediaType
  size: number // bytes
  width?: number // images/video
  height?: number // images/video
  url: string
  thumbnailUrl?: string
  folderId?: ID
  altText?: string
  caption?: string
  uploadedById: ID
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface MediaFolder {
  id: ID
  name: string
  parentId?: ID
  createdAt: Timestamp
}
