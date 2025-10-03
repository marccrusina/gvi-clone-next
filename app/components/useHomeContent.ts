'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { homeContent } from '@/tanstack-query/api/home-content'
import { homeContentStore } from '@/stores/home-content-store'
import { componentLogger } from '@/libs/simple-logger'

interface UseHomeContentOptions {
  componentName?: string
  enableLogging?: boolean
}

export const useHomeContent = (options: UseHomeContentOptions = {}) => {
  const { componentName = 'HomeContent', enableLogging = true } = options

  // Use TanStack Query to trigger the fetch
  const { data: content, error } = useSuspenseQuery(homeContent)

  // Sync store with TanStack Query data after successful fetch
  useEffect(() => {
    if (content) {
      homeContentStore.setSuccess(content as Record<string, unknown>)
    }
  }, [content])

  // Sync store with TanStack Query error after failed fetch
  useEffect(() => {
    if (error) {
      homeContentStore.setError(error as Error)
    }
  }, [error])

  // Log component error
  useEffect(() => {
    if (error && enableLogging && typeof window !== 'undefined') {
      componentLogger.error(componentName, error as Error, {
        description: 'Error fetching home content',
        queryKey: 'home-content',
      })
    }
  }, [error, componentName, enableLogging])
}
