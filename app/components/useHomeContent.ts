'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { homeContent } from '@/tanstack-query/api/home-content'
import { homeContentStore } from '@/stores/home-content-store'
import { componentLogger } from '@/libs/simple-logger'
import type { HomeContentData } from '@/stores/home-content-store'

interface UseHomeContentOptions {
  componentName?: string
  enableLogging?: boolean
}

interface UseHomeContentReturn {
  content: HomeContentData | null
  error: Error | null
}

export const useHomeContent = (
  options: UseHomeContentOptions = {}
): UseHomeContentReturn => {
  const { componentName = 'HomeContent', enableLogging = true } = options

  // Use TanStack Query to trigger the fetch
  const { data: content, error } = useSuspenseQuery(homeContent)

  // Sync store with TanStack Query data
  useEffect(() => {
    if (content) {
      homeContentStore.setSuccess(content)
    }
  }, [content])

  // Sync store with TanStack Query error
  useEffect(() => {
    if (error) {
      homeContentStore.setError(error as Error)
    }
  }, [error])

  // Log component mount
  useEffect(() => {
    if (enableLogging && typeof window !== 'undefined') {
      componentLogger.logComponentMount(componentName, {
        hasData: !!content,
        dataKeys: content ? Object.keys(content) : [],
      })
    }
  }, [content, componentName, enableLogging])

  // Log component error
  useEffect(() => {
    if (error && enableLogging && typeof window !== 'undefined') {
      componentLogger.logComponentError(componentName, error as Error, {
        queryKey: 'home-content',
      })
    }
  }, [error, componentName, enableLogging])

  return {
    content: content ?? null,
    error: error ?? null,
  }
}
