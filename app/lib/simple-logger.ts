// Simple, universal logger that works in both browser and Node.js
interface LogMeta {
  [key: string]: unknown
}

// Utility to check if we're in a browser environment
const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'

// Removed unused LogEntry interface

class SimpleLogger {
  private context: string
  private isBrowser: boolean

  constructor(context: string) {
    this.context = context
    // Use the global isBrowser check
    this.isBrowser = isBrowser
  }

  private formatMessage(
    level: string,
    message: string,
    meta?: LogMeta
  ): string {
    // Use a consistent timestamp format that won't cause hydration mismatches
    const timestamp = this.isBrowser
      ? new Date().toISOString()
      : new Date().toISOString()

    // Create a multi-line formatted log with proper labels
    const lines = [
      `LOG ENTRY`,
      `┌───────────────────────────────────────────────`,
      `│ Timestamp: ${timestamp}`,
      `│ Level: ${level.toUpperCase()}`,
      `│ Context: ${this.context}`,
      `│ Message: ${message}`,
    ]

    // Add meta information if present
    if (meta && Object.keys(meta).length > 0) {
      lines.push(`│ Meta:`)
      Object.entries(meta).forEach(([key, value]) => {
        const formattedValue =
          typeof value === 'object'
            ? JSON.stringify(value, null, 2)
                .split('\n')
                .map((line) => `│   ${line}`)
                .join('\n')
            : String(value)
        lines.push(`│   ${key}: ${formattedValue}`)
      })
    }

    lines.push(`└───────────────────────────────────────────────`)

    return lines.join('\n')
  }

  private log(level: string, message: string, meta?: LogMeta) {
    const formattedMessage = this.formatMessage(level, message, meta)

    // Use appropriate console method
    switch (level) {
      case 'error':
        console.error(formattedMessage)
        break
      case 'warn':
        console.warn(formattedMessage)
        break
      case 'info':
        console.info(formattedMessage)
        break
      case 'debug':
        console.debug(formattedMessage)
        break
      default:
        console.log(formattedMessage)
    }

    // Store in localStorage for debugging (development only)
    // Only run this on the client side to avoid hydration mismatches
    if (
      this.isBrowser &&
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      try {
        const logs = JSON.parse(localStorage.getItem('client-logs') || '[]')
        logs.push({
          level,
          message,
          timestamp: new Date().toISOString(),
          context: this.context,
          meta,
        })

        // Keep only last 100 logs
        if (logs.length > 100) {
          logs.splice(0, logs.length - 100)
        }

        localStorage.setItem('client-logs', JSON.stringify(logs))
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  debug(message: string, meta?: LogMeta) {
    this.log('debug', message, meta)
  }

  info(message: string, meta?: LogMeta) {
    this.log('info', message, meta)
  }

  warn(message: string, meta?: LogMeta) {
    this.log('warn', message, meta)
  }

  error(message: string, error?: Error | unknown, meta?: LogMeta) {
    this.log('error', message, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...meta,
    })
  }

  http(
    method: string,
    url: string,
    statusCode?: number,
    duration?: number,
    meta?: LogMeta
  ) {
    this.log('http', `${method} ${url}`, {
      method,
      url,
      statusCode,
      duration,
      ...meta,
    })
  }

  async trackPerformance<T>(
    operation: string,
    fn: () => Promise<T>,
    meta?: LogMeta
  ): Promise<T> {
    const start = performance.now()
    this.debug(`Starting ${operation}`, meta)

    try {
      const result = await fn()
      const duration = Math.round(performance.now() - start)
      this.info(`Completed ${operation} in ${duration}ms`, {
        duration,
        ...meta,
      })
      return result
    } catch (error) {
      const duration = Math.round(performance.now() - start)
      this.error(`Failed ${operation} after ${duration}ms`, error, {
        duration,
        ...meta,
      })
      throw error
    }
  }

  logApiCall(url: string, method: string = 'GET', meta?: LogMeta) {
    this.info(`API Call: ${method} ${url}`, meta)
  }

  logApiResponse(
    url: string,
    statusCode: number,
    duration: number,
    meta?: LogMeta
  ) {
    const level = statusCode >= 400 ? 'error' : 'info'
    this.log(level, `API Response: ${url}`, {
      url,
      statusCode,
      duration,
      ...meta,
    })
  }

  logComponentInfo(componentName: string, props?: LogMeta) {
    this.info(`Component info: ${componentName}`, { props })
  }

  logComponentMount(componentName: string, props?: LogMeta) {
    this.debug(`Component mounted: ${componentName}`, { props })
  }

  logComponentUnmount(componentName: string) {
    this.debug(`Component unmounted: ${componentName}`)
  }

  logComponentError(componentName: string, error: Error, errorInfo?: LogMeta) {
    this.error(`Component error in ${componentName}`, error, { errorInfo })
  }
}

// Factory function to create logger instances
export const createLogger = (context: string) => new SimpleLogger(context)

// Global logger instances for common use cases
export const apiLogger = createLogger('API')
export const componentLogger = createLogger('COMPONENT')
export const serverLogger = createLogger('SERVER')
export const clientLogger = createLogger('CLIENT')

// Utility functions for quick logging
export const logError = (
  message: string,
  error?: Error | unknown,
  meta?: LogMeta
) => {
  const logger = new SimpleLogger('GLOBAL')
  logger.error(message, error, meta)
}

export const logInfo = (message: string, meta?: LogMeta) => {
  const logger = new SimpleLogger('GLOBAL')
  logger.info(message, meta)
}

export const logWarning = (message: string, meta?: LogMeta) => {
  const logger = new SimpleLogger('GLOBAL')
  logger.warn(message, meta)
}

export const logDebug = (message: string, meta?: LogMeta) => {
  const logger = new SimpleLogger('GLOBAL')
  logger.debug(message, meta)
}
