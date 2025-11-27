import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBreakpoints } from './useBreakpoints'

describe('useBreakpoints', () => {
  let originalInnerWidth: number

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
  })

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
  }

  it('should return correct values for viewport width < 375px', () => {
    setWindowWidth(300)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isViewportWidthUnder375).toBe(true)
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it('should return correct values for mobile viewport (375px - 599px)', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isViewportWidthUnder375).toBe(false)
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isTabletPortrait).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it('should return correct values for tablet portrait (600px - 1023px)', () => {
    setWindowWidth(800)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isTabletPortrait).toBe(true)
    expect(result.current.isTabletLandscape).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it('should return correct values for tablet landscape (1024px - 1279px)', () => {
    setWindowWidth(1100)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isTabletPortrait).toBe(false)
    expect(result.current.isTabletLandscape).toBe(true)
    expect(result.current.isDesktop).toBe(false)
  })

  it('should return correct values for desktop small (1280px - 1439px)', () => {
    setWindowWidth(1300)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isDesktopS).toBe(true)
    expect(result.current.isDesktopL).toBe(false)
  })

  it('should return correct values for desktop large (>= 1440px)', () => {
    setWindowWidth(1600)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isDesktopS).toBe(false)
    expect(result.current.isDesktopL).toBe(true)
  })

  it('should update values on window resize', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useBreakpoints())

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(true)

    // Change window width
    setWindowWidth(1300)
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isDesktop).toBe(true)
  })

  it('should handle exact breakpoint boundaries', () => {
    // Test at exact 600px (sm breakpoint)
    setWindowWidth(600)
    const { result: result600 } = renderHook(() => useBreakpoints())
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result600.current.isMobile).toBe(false)
    expect(result600.current.isTablet).toBe(true)

    // Test at exact 1024px (md breakpoint)
    setWindowWidth(1024)
    const { result: result1024 } = renderHook(() => useBreakpoints())
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result1024.current.isTabletPortrait).toBe(false)
    expect(result1024.current.isTabletLandscape).toBe(true)

    // Test at exact 1280px (lg breakpoint)
    setWindowWidth(1280)
    const { result: result1280 } = renderHook(() => useBreakpoints())
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result1280.current.isTablet).toBe(false)
    expect(result1280.current.isDesktop).toBe(true)

    // Test at exact 1440px (xl breakpoint)
    setWindowWidth(1440)
    const { result: result1440 } = renderHook(() => useBreakpoints())
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result1440.current.isDesktopS).toBe(false)
    expect(result1440.current.isDesktopL).toBe(true)
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useBreakpoints())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    )
  })
})
