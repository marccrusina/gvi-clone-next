'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { componentLogger } from '@/libs/simple-logger'
import { contentStore } from '@/stores/content-store'
import { contentQuery } from '@/tanstack-query/api/content'
import type { UseApiContentHookOptions } from '@/types/api'

export const useContent = (options: UseApiContentHookOptions = {}) => {
  const { componentName = 'ApiContent', enableLogging = true } = options

  // Use TanStack Query to trigger the fetch
  const { data: content, error, isLoading } = useQuery(contentQuery)

  // Sync store with TanStack Query data after successful fetch
  useEffect(() => {
    if (content) {
      contentStore.setSuccess(content as Record<string, unknown>)
    }
  }, [content])

  // Sync store with TanStack Query error after failed fetch
  useEffect(() => {
    if (error) {
      contentStore.setError(error as Error)
    }
  }, [error])

  // Sync loading state
  useEffect(() => {
    if (isLoading) {
      contentStore.setLoading()
    }
  }, [isLoading])

  // Log component error
  useEffect(() => {
    if (error && enableLogging && typeof window !== 'undefined') {
      componentLogger.error(componentName, error as Error, {
        description: 'Error fetching content',
        queryKey: 'content',
      })
    }
  }, [error, componentName, enableLogging])
}
