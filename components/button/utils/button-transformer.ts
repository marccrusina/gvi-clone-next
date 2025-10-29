import type {
  ApiButtonData,
  ButtonFillType,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  LinkProps,
} from '../types/button'

/**
 * Transform variant from various API naming conventions
 */
const transformVariant = (
  apiData: ApiButtonData,
): ButtonVariant | undefined => {
  const variantValue =
    apiData.variant ||
    apiData.type ||
    apiData.style ||
    apiData.appearance ||
    apiData.theme

  if (!variantValue) return undefined

  const normalizedVariant = String(variantValue).toLowerCase()

  // Handle CTA style patterns (cta-fill-primary, etc.)
  if (normalizedVariant.includes('cta-')) {
    if (normalizedVariant.includes('primary')) return 'primary'
    if (normalizedVariant.includes('secondary')) return 'secondary'
    if (normalizedVariant.includes('tertiary')) return 'tertiary'
    if (normalizedVariant.includes('quaternary')) return 'quaternary'
  }

  // Map common API values to component variants
  const variantMap: Record<string, ButtonVariant> = {
    primary: 'primary',
    main: 'primary',
    default: 'primary',
    cta: 'primary',
    'call-to-action': 'primary',
    action: 'primary',

    secondary: 'secondary',
    outline: 'secondary',
    ghost: 'secondary',
    subtle: 'secondary',

    tertiary: 'tertiary',
    text: 'tertiary',
    link: 'tertiary',
    minimal: 'tertiary',

    quaternary: 'quaternary',
    alternative: 'quaternary',
    alt: 'quaternary',
  }

  return variantMap[normalizedVariant]
}

/**
 * Transform fill type from API data
 */
const transformFillType = (
  apiData: ApiButtonData,
): ButtonFillType | undefined => {
  const fillValue = apiData.style || apiData.variant || apiData.appearance

  if (!fillValue) return undefined

  const normalizedFill = String(fillValue).toLowerCase()

  // Handle CTA styles (cta-fill-primary, cta-outline-secondary)
  if (normalizedFill.includes('cta-')) {
    if (normalizedFill.includes('outline')) return 'outline'
    if (normalizedFill.includes('fill')) return 'fill'
  }

  // Map common API values to fill types
  if (
    normalizedFill.includes('outline') ||
    normalizedFill.includes('border') ||
    normalizedFill.includes('ghost')
  ) {
    return 'outline'
  }

  if (
    normalizedFill.includes('fill') ||
    normalizedFill.includes('solid') ||
    normalizedFill.includes('primary')
  ) {
    return 'fill'
  }

  return undefined
}

/**
 * Transform size from API data
 */
const transformSize = (apiData: ApiButtonData): ButtonSize | undefined => {
  const sizeValue = apiData.size

  if (!sizeValue) return undefined

  const normalizedSize = String(sizeValue).toLowerCase()

  // Map common API values to component sizes
  const sizeMap: Record<string, ButtonSize> = {
    small: 'small',
    sm: 'small',
    xs: 'small',
    mini: 'small',

    medium: 'medium',
    md: 'medium',
    normal: 'medium',
    default: 'medium',

    large: 'big',
    big: 'big',
    lg: 'big',
    xl: 'big',
    huge: 'big',
  }

  return sizeMap[normalizedSize]
}

/**
 * Transform fullwidth property from various naming conventions
 */
const transformFullwidth = (apiData: ApiButtonData): boolean => {
  return Boolean(
    apiData.fullWidth ||
      apiData.full_width ||
      apiData.isFullWidth ||
      (typeof apiData.width === 'string' && apiData.width === 'full') ||
      (typeof apiData.width === 'boolean' && apiData.width),
  )
}

/**
 * Transform external link flag
 */
const transformExternal = (apiData: ApiButtonData): boolean => {
  // Handle GrandVision target object structure
  if (typeof apiData.target === 'object' && apiData.target) {
    return Boolean(
      apiData.target.openInNewWindow ||
        apiData.target.type === 'CMExternalPage',
    )
  }

  return Boolean(
    apiData.external ||
      apiData.isExternal ||
      apiData.is_external ||
      apiData.target === '_blank',
  )
}

/**
 * Check if URL is external
 */
const isExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    // If URL parsing fails, assume it's internal
    return false
  }
}

/**
 * Transform link/URL to the expected format
 */
const transformTo = (apiData: ApiButtonData): LinkProps | string => {
  let url = apiData.href || apiData.url || apiData.link || apiData.formattedUrl

  // Handle complex target object (e.g., GrandVision API)
  if (typeof apiData.target === 'object' && apiData.target) {
    url = url || apiData.target.formattedUrl || apiData.target.href
  }

  // Fallback to '#' if no URL found
  url = url || '#'

  // Determine if external link
  const isExternal =
    isExternalUrl(url) ||
    apiData.external ||
    apiData.isExternal ||
    (typeof apiData.target === 'string' && apiData.target === '_blank') ||
    (typeof apiData.target === 'object' &&
      apiData.target?.type === 'CMExternalPage')

  // If we need LinkProps object (external or has target info)
  if (isExternal || apiData.target || apiData.external || apiData.isExternal) {
    const linkProps: LinkProps = {
      href: url,
    }

    // Handle string target
    if (typeof apiData.target === 'string') {
      linkProps.target = apiData.target
    }
    // Handle external links
    else if (isExternal) {
      linkProps.target = '_blank'
    }

    // Add rel="noopener noreferrer" for external links
    if (isExternal || linkProps.target === '_blank') {
      linkProps.rel = 'noopener noreferrer'
    }

    return linkProps
  }

  // Return simple string for internal links
  return url
}

/**
 * Map icon string to React component (placeholder)
 * This should be expanded based on your icon system (e.g., Lucide, Heroicons, etc.)
 */
const mapIconString = (_iconString: string): React.ReactNode | undefined => {
  // TODO: Implement actual icon mapping based on your icon system
  // For now, return undefined - this will be expanded when you implement icons

  // Example implementation:
  // const iconMap: Record<string, React.ReactNode> = {
  //   'arrow-right': <ArrowRightIcon />,
  //   'download': <DownloadIcon />,
  //   // ... etc
  // }
  // return iconMap[iconString.toLowerCase()]

  return undefined
}

/**
 * Transform icon data (placeholder - needs actual icon mapping logic)
 */
const transformIcons = (
  apiData: ApiButtonData,
): {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
} => {
  const icons: { startIcon?: React.ReactNode; endIcon?: React.ReactNode } = {}

  // Handle explicit start/end icons
  if (apiData.startIcon) {
    icons.startIcon = mapIconString(apiData.startIcon)
  }

  if (apiData.endIcon) {
    icons.endIcon = mapIconString(apiData.endIcon)
  }

  // Handle icon with position
  if (apiData.icon) {
    const position = apiData.iconPosition || apiData.icon_position || 'start'
    const mappedIcon = mapIconString(apiData.icon)

    if (position === 'start' || position === 'left') {
      icons.startIcon = mappedIcon
    } else if (position === 'end' || position === 'right') {
      icons.endIcon = mappedIcon
    }
  }

  return icons
}

/**
 * Transform loading state
 */
const transformLoading = (apiData: ApiButtonData): boolean => {
  return Boolean(apiData.loading || apiData.isLoading || apiData.is_loading)
}

/**
 * Transform data element ID for tracking
 */
const transformDataElementId = (apiData: ApiButtonData): string | undefined => {
  return (
    apiData.dataId ||
    apiData.data_id ||
    apiData.trackingId ||
    apiData.tracking_id ||
    apiData.elementId ||
    apiData.element_id ||
    apiData.id
  )
}

/**
 * Main transformation function - transforms API button data into Button component props
 * Handles various naming conventions and data structures from different APIs
 */
export const transformButtonProps = (
  apiData: ApiButtonData,
): Partial<ButtonProps> => {
  const props: Partial<ButtonProps> = {}

  // Transform all properties
  props.variant = transformVariant(apiData)
  props.fillType = transformFillType(apiData)
  props.size = transformSize(apiData)
  props.fullwidth = transformFullwidth(apiData)
  props.external = transformExternal(apiData)
  props.to = transformTo(apiData)
  props.loading = transformLoading(apiData)
  props.dataElementId = transformDataElementId(apiData)

  // Transform icons
  const icons = transformIcons(apiData)
  props.startIcon = icons.startIcon
  props.endIcon = icons.endIcon

  return props
}

/**
 * Utility function to transform multiple buttons at once
 */
export const transformMultipleButtonProps = (
  apiButtons: ApiButtonData[],
): Partial<ButtonProps>[] => {
  return apiButtons.map((button) => transformButtonProps(button))
}

/**
 * Utility function to transform and merge with default props
 */
export const transformButtonPropsWithDefaults = (
  apiData: ApiButtonData,
  defaults: Partial<ButtonProps> = {},
): Partial<ButtonProps> => {
  const transformed = transformButtonProps(apiData)
  return { ...defaults, ...transformed }
}
