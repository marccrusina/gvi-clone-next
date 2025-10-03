import type { Metadata } from 'next'
import './globals.css'
import QueryProvider from './components/QueryProvider'

export const metadata: Metadata = {
  title: 'GVI Clone - NextJS',
  description: 'GVI clone that uses NextJS',
  keywords: ['GVI', 'NextJS', 'Tanstack Query', 'React', 'TypeScript'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
