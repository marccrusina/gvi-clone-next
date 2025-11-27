import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  apiLogger,
  clientLogger,
  componentLogger,
  logError,
  logInfo,
  serverLogger,
} from './simple-logger'

describe('SimpleLogger', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>
  let localStorageMock: Record<string, string>

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

    // Mock localStorage
    localStorageMock = {}
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, value: string) => {
        localStorageMock[key] = value
      },
      removeItem: (key: string) => {
        delete localStorageMock[key]
      },
      clear: () => {
        localStorageMock = {}
      },
    })
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleErrorSpy.mockRestore()
    consoleInfoSpy.mockRestore()
    vi.unstubAllGlobals()
  })

  describe('info logging', () => {
    it('should log info message', () => {
      apiLogger.info('Test message')
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Test message')
      expect(loggedMessage).toContain('API')
    })

    it('should log info message with metadata', () => {
      apiLogger.info('Test message', { userId: 123, action: 'click' })
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Test message')
      expect(loggedMessage).toContain('userId')
      expect(loggedMessage).toContain('123')
    })
  })

  describe('error logging', () => {
    it('should log error message', () => {
      apiLogger.error('Error occurred')
      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedMessage = consoleErrorSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Error occurred')
    })

    it('should log error with Error object', () => {
      const error = new Error('Test error')
      apiLogger.error('Error occurred', error)
      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedMessage = consoleErrorSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Error occurred')
      expect(loggedMessage).toContain('Test error')
    })

    it('should log error with metadata', () => {
      const error = new Error('Test error')
      apiLogger.error('Error occurred', error, { context: 'API call' })
      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedMessage = consoleErrorSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('context')
    })

    it('should handle non-Error objects', () => {
      apiLogger.error('Error occurred', { message: 'Custom error' })
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('http logging', () => {
    it('should log HTTP request', () => {
      apiLogger.http('GET', '/api/users', 200, 150)
      expect(consoleLogSpy).toHaveBeenCalled()
      const loggedMessage = consoleLogSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('GET')
      expect(loggedMessage).toContain('/api/users')
      expect(loggedMessage).toContain('200')
      expect(loggedMessage).toContain('150')
    })

    it('should log HTTP request with metadata', () => {
      apiLogger.http('POST', '/api/users', 201, 200, { body: 'data' })
      expect(consoleLogSpy).toHaveBeenCalled()
      const loggedMessage = consoleLogSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('POST')
      expect(loggedMessage).toContain('body')
    })
  })

  describe('performance tracking', () => {
    it('should track successful operation', async () => {
      const operation = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10))
        return 'success'
      }

      const result = await apiLogger.trackPerformance(
        'test operation',
        operation,
      )
      expect(result).toBe('success')
      expect(consoleInfoSpy).toHaveBeenCalledTimes(2) // Start and complete
    })

    it('should track failed operation', async () => {
      const operation = async () => {
        throw new Error('Operation failed')
      }

      await expect(
        apiLogger.trackPerformance('test operation', operation),
      ).rejects.toThrow('Operation failed')
      expect(consoleInfoSpy).toHaveBeenCalledWith(
        expect.stringContaining('Starting test operation'),
      )
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('API logging helpers', () => {
    it('should log API call', () => {
      apiLogger.logApiCall('/api/users', 'POST', { data: 'test' })
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('POST')
      expect(loggedMessage).toContain('/api/users')
    })

    it('should log API response with success status', () => {
      apiLogger.logApiResponse('/api/users', 200, 150)
      expect(consoleInfoSpy).toHaveBeenCalled()
    })

    it('should log API response with error status', () => {
      apiLogger.logApiResponse('/api/users', 500, 150)
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('component logging', () => {
    it('should log component info', () => {
      componentLogger.logComponentInfo('MyComponent', { prop: 'value' })
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('MyComponent')
    })

    it('should log component error', () => {
      const error = new Error('Component error')
      componentLogger.logComponentError('MyComponent', error, { info: 'test' })
      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedMessage = consoleErrorSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('MyComponent')
    })
  })

  describe('global logger instances', () => {
    it('should create apiLogger instance', () => {
      expect(apiLogger).toBeDefined()
      apiLogger.info('API test')
      expect(consoleInfoSpy).toHaveBeenCalled()
    })

    it('should create componentLogger instance', () => {
      expect(componentLogger).toBeDefined()
      componentLogger.info('Component test')
      expect(consoleInfoSpy).toHaveBeenCalled()
    })

    it('should create serverLogger instance', () => {
      expect(serverLogger).toBeDefined()
      serverLogger.info('Server test')
      expect(consoleInfoSpy).toHaveBeenCalled()
    })

    it('should create clientLogger instance', () => {
      expect(clientLogger).toBeDefined()
      clientLogger.info('Client test')
      expect(consoleInfoSpy).toHaveBeenCalled()
    })
  })

  describe('utility functions', () => {
    it('should log error using logError utility', () => {
      const error = new Error('Global error')
      logError('Error message', error, { context: 'test' })
      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedMessage = consoleErrorSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Error message')
      expect(loggedMessage).toContain('GLOBAL')
    })

    it('should log info using logInfo utility', () => {
      logInfo('Info message', { data: 'test' })
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Info message')
      expect(loggedMessage).toContain('GLOBAL')
    })
  })

  describe('localStorage integration', () => {
    it('should store logs in localStorage in development mode', () => {
      vi.stubEnv('NODE_ENV', 'development')

      apiLogger.info('Test log storage')

      const storedLogs = JSON.parse(localStorageMock['client-logs'] || '[]')
      expect(storedLogs).toHaveLength(1)
      expect(storedLogs[0].message).toBe('Test log storage')

      vi.unstubAllEnvs()
    })

    it('should limit localStorage to 100 logs', () => {
      vi.stubEnv('NODE_ENV', 'development')

      // Add 150 logs
      for (let i = 0; i < 150; i++) {
        apiLogger.info(`Log ${i}`)
      }

      const storedLogs = JSON.parse(localStorageMock['client-logs'] || '[]')
      expect(storedLogs.length).toBeLessThanOrEqual(100)

      vi.unstubAllEnvs()
    })
  })

  describe('message formatting', () => {
    it('should format message with timestamp', () => {
      apiLogger.info('Format test')
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Timestamp:')
    })

    it('should include context in formatted message', () => {
      apiLogger.info('Context test')
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('Context: API')
    })

    it('should format nested objects in meta', () => {
      apiLogger.info('Nested test', { user: { id: 1, name: 'John' } })
      expect(consoleInfoSpy).toHaveBeenCalled()
      const loggedMessage = consoleInfoSpy.mock.calls[0][0]
      expect(loggedMessage).toContain('user')
    })
  })
})
