'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { homeContent } from '@/tanstack-query/api/home-content'
import { componentLogger } from '@/libs/simple-logger'

export default function HomeContent() {
  const { data: content, error } = useSuspenseQuery(homeContent)

  useEffect(() => {
    // Only log on client side to prevent hydration mismatches
    if (typeof window !== 'undefined') {
      componentLogger.logComponentMount('HomeContent', {
        hasData: !!content,
        dataKeys: content ? Object.keys(content) : [],
      })
    }
  }, [content])

  useEffect(() => {
    if (error) {
      // Only log on client side to prevent hydration mismatches
      if (typeof window !== 'undefined') {
        componentLogger.logComponentError('HomeContent', error as Error, {
          queryKey: 'home-content',
        })
      }
    }
  }, [error])

  return (
    <div>
      <h2>Home Content</h2>
      <br />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  )
}
