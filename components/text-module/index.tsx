import type React from 'react'
import type { ICMCollection, IPlacement } from '@/types/common'
import { getComponentConfig } from './utils/component-registry'

interface TextModuleProps {
  placement: IPlacement | ICMCollection
  teaserIndex?: number
  isCompact?: boolean
  light?: boolean
  center?: boolean
}

const TextModule: React.FC<TextModuleProps> = ({
  placement,
  teaserIndex,
  isCompact,
  light,
  center,
}) => {
  // Extract the item based on placement type
  const item =
    'items' in placement ? placement.items[0] : placement.teasableItems[0]

  // Get component configuration from registry
  const componentConfig = getComponentConfig(item?.type)

  if (!componentConfig) {
    console.warn(`Component type "${item?.type}" not found in registry`)
    return null
  }

  // Transform data using the transformer function
  const transformedProps = componentConfig.transformer(item, {
    viewType: placement.viewtype,
    teaserIndex,
    isCompact,
    light,
    center,
  }) as unknown as React.ComponentProps<typeof componentConfig.component>

  // Render the component with transformed props
  const Component = componentConfig.component

  return (
    <Component
      {...(typeof transformedProps === 'object' && transformedProps !== null
        ? transformedProps
        : {})}
    />
  )
}

export default TextModule
