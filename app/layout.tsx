import type { Metadata } from 'next'
import './globals.css'
import TanstackProvider from './tanstack-query/provider'

export const metadata: Metadata = {
  title: 'GVI Clone - NextJS',
  description: 'GVI clone that uses NextJS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  )
}
