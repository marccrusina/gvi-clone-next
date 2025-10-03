import HomeContent from '@/components/HomeContent'
import { getQueryClient } from '@/tanstack-query/get-query-client'
import { homeContent } from '@/tanstack-query/api/home-content'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default async function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(homeContent)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent />
    </HydrationBoundary>
  )
}
