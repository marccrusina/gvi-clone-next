'use client'

import { useHomeContent } from '@/hooks/use-home-content'

export default function HomeContent() {
  const { data, isLoading, error, isError } = useHomeContent({
    storeId: '110201',
    langId: '-4',
  })

  if (isLoading) {
    return <div>Loading home content...</div>
  }

  if (isError) {
    return <div>Error loading content: {error?.message}</div>
  }

  return (
    <div>
      <h2>Home Content</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
