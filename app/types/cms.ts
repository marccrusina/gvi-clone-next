export interface HomeContentParams {
  storeId: string
  langId: string
}

// TODO: replace with exact metadata from the response
export interface HomeContentResponse {
  id: string
  title?: string
  content?: Record<string, unknown>[]
  metadata?: {
    lastModified: string
    version: string
  }
  // Add more fields as needed
}

export interface CMSError {
  message: string
  code?: string
  status?: number
}
