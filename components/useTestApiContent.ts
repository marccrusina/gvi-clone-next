'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { testApiContent } from '@/tanstack-query/api/test-api-content'
import { testApiContentStore } from '@/stores/test-api-content-store'
import { componentLogger } from '@/libs/simple-logger'

interface UseTestApiContentOptions {
  componentName?: string
  enableLogging?: boolean
}

export const useTestApiContent = (options: UseTestApiContentOptions = {}) => {
  const { componentName = 'TestApiContent', enableLogging = true } = options

  // Use TanStack Query to trigger the fetch
  const { data: content, error } = useSuspenseQuery(testApiContent)

  // Sync store with TanStack Query data after successful fetch
  useEffect(() => {
    if (content) {
      testApiContentStore.setSuccess(content as Record<string, unknown>)
    }
  }, [content])

  // Sync store with TanStack Query error after failed fetch
  useEffect(() => {
    if (error) {
      testApiContentStore.setError(error as Error)
    }
  }, [error])

  // Log component error
  useEffect(() => {
    if (error && enableLogging && typeof window !== 'undefined') {
      componentLogger.error(componentName, error as Error, {
        description: 'Error fetching test API content',
        queryKey: 'test-api-content',
      })
    }
  }, [error, componentName, enableLogging])
}
