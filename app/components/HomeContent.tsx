'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { homeContent } from '../tanstack-query/api/home-content'

export default function HomeContent() {
  const { data: content } = useSuspenseQuery(homeContent)

  return (
    <div>
      <h2>Home Content</h2>
      <br />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  )
}
