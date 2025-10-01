# Logging System Documentation

This project uses Winston for comprehensive logging across the application.

## Features

- **Structured Logging**: JSON format for better log analysis
- **Multiple Transports**: Console, file rotation, error-specific logs
- **Performance Tracking**: Built-in timing for operations
- **Context-Aware**: Different loggers for different parts of the app
- **Environment-Aware**: Different log levels for dev vs production

## Log Levels

- `error` (0): Error conditions
- `warn` (1): Warning conditions
- `info` (2): Informational messages
- `http` (3): HTTP request logging
- `debug` (4): Debug-level messages

## Usage Examples

### Basic Logging

```typescript
import { logInfo, logError, logWarning } from '@/lib/logger-utils'

// Simple logging
logInfo('User logged in', { userId: '123' })
logError('Database connection failed', error)
logWarning('Rate limit approaching', { current: 90, limit: 100 })
```

### Context-Specific Logging

```typescript
import { createLogger } from '@/lib/logger-utils'

const userLogger = createLogger('USER')
const apiLogger = createLogger('API')

// Component logging
userLogger.info('User profile updated', { userId: '123' })
userLogger.error('Profile update failed', error, { userId: '123' })

// API logging
apiLogger.logApiCall('/api/users', 'POST', { userId: '123' })
apiLogger.logApiResponse('/api/users', 201, 150, { dataSize: 1024 })
```

### Performance Tracking

```typescript
import { apiLogger } from '@/lib/logger-utils'

// Track async operations
const result = await apiLogger.trackPerformance(
  'Database Query',
  async () => {
    return await database.query('SELECT * FROM users')
  },
  { table: 'users', operation: 'SELECT' }
)
```

### Component Logging

```typescript
import { componentLogger } from '@/lib/logger-utils'
import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    componentLogger.logComponentMount('MyComponent', { props })

    return () => {
      componentLogger.logComponentUnmount('MyComponent')
    }
  }, [])

  // Error boundary logging
  useEffect(() => {
    if (error) {
      componentLogger.logComponentError('MyComponent', error, { errorInfo })
    }
  }, [error])
}
```

## Log Files

- `logs/combined-YYYY-MM-DD.log`: All logs
- `logs/error-YYYY-MM-DD.log`: Error logs only
- Files rotate daily and are kept for 14 days
- Maximum file size: 20MB

## Configuration

The logger is configured in `lib/logger.ts`:

- **Development**: Debug level, colored console output
- **Production**: Info level, structured JSON logs
- **File Rotation**: Daily rotation with 14-day retention
- **Error Separation**: Errors logged to separate files

## Middleware

Request logging is handled by `middleware.ts`:

- Logs all incoming requests
- Tracks response times
- Includes user agent, IP, and referrer
- Adds request IDs for tracing

## Best Practices

1. **Use appropriate log levels**:

   - `debug`: Development debugging
   - `info`: General information
   - `warn`: Potential issues
   - `error`: Actual errors

2. **Include context**:

   ```typescript
   logger.info('User action', { userId, action, timestamp })
   ```

3. **Don't log sensitive data**:

   ```typescript
   // ❌ Bad
   logger.info('User data', { password: user.password })

   // ✅ Good
   logger.info('User data', { userId: user.id, email: user.email })
   ```

4. **Use structured logging**:

   ```typescript
   // ❌ Bad
   logger.info(`User ${userId} performed ${action}`)

   // ✅ Good
   logger.info('User action', { userId, action })
   ```

5. **Track performance for critical operations**:
   ```typescript
   await logger.trackPerformance('Database Query', async () => {
     return await db.query(sql)
   })
   ```

