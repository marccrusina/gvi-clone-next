import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { serverLogger } from '@/lib/simple-logger'

export function middleware(request: NextRequest) {
  const start = Date.now()
  const { pathname, searchParams } = request.nextUrl
  const method = request.method
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown'

  // Log incoming request
  serverLogger.http(method, pathname, undefined, undefined, {
    searchParams: searchParams.toString(),
    userAgent,
    ip,
    referer: request.headers.get('referer'),
  })

  const response = NextResponse.next()

  // Add response headers for logging
  response.headers.set('X-Request-ID', crypto.randomUUID())

  // Log response after processing
  const duration = Date.now() - start
  serverLogger.http(method, pathname, response.status, duration, {
    searchParams: searchParams.toString(),
    userAgent,
    ip,
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
