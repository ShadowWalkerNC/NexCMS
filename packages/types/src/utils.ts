/** Make selected keys required */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

/** Pagination cursor result */
export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

/** Standard API success envelope */
export interface ApiSuccess<T = unknown> {
  success: true
  data: T
}

/** Standard API error envelope */
export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

export type ID = string // UUID v4
export type Timestamp = string // ISO 8601
