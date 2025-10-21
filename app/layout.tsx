import '@/app/globals.scss'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'
import QueryProvider from '@/components/QueryProvider'
import { contentQuery } from '@/tanstack-query/api/content'
import { getQueryClient } from '@/tanstack-query/get-query-client'

export const metadata: Metadata = {
  title: 'GVI Clone - NextJS',
  description: 'GVI clone that uses NextJS',
  keywords: ['GVI', 'NextJS', 'Tanstack Query', 'React', 'TypeScript'],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(contentQuery)

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  )
}
