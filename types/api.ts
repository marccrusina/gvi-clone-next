export interface ApiContentData {
  [key: string]: unknown
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export interface UseApiContentHookOptions {
  componentName?: string
  enableLogging?: boolean
}
