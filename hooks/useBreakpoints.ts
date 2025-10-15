import { useEffect, useState } from 'react'

// Breakpoint values (matching Design system)
const breakpoints = {
  xs: 375, // Mobile (extra small)
  sm: 600, // Tablet Portrait (small)
  md: 1024, // Tablet Landscape (medium)
  lg: 1280, // Desktop (large)
  xl: 1440, // Large Desktop (extra large)
} as const

export interface BreakpointValues {
  isViewportWidthUnder375: boolean
  isMobile: boolean
  isTablet: boolean
  isTabletPortrait: boolean
  isTabletLandscape: boolean
  isDesktop: boolean
  isDesktopS: boolean
  isDesktopL: boolean
}

/**
 * Custom hook for responsive breakpoints
 */
export const useBreakpoints = (): BreakpointValues => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isViewportWidthUnder375: windowWidth < breakpoints.xs, // < 375px (extra small devices)
    isMobile: windowWidth < breakpoints.sm, // < 600px
    isTablet: windowWidth >= breakpoints.sm && windowWidth < breakpoints.lg, // 600-1280px
    isTabletPortrait:
      windowWidth >= breakpoints.sm && windowWidth < breakpoints.md, // 600-1024px
    isTabletLandscape:
      windowWidth >= breakpoints.md && windowWidth < breakpoints.lg, // 1024-1280px
    isDesktop: windowWidth >= breakpoints.lg, // >= 1280px
    isDesktopS: windowWidth >= breakpoints.lg && windowWidth < breakpoints.xl, // 1280-1440px
    isDesktopL: windowWidth >= breakpoints.xl, // >= 1440px
  }
}

export default useBreakpoints
