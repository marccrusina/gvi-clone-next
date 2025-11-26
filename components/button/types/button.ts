import type { MouseEventHandler } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
export type ButtonFillType = 'fill' | 'outline'
export type ButtonSize = 'small' | 'medium' | 'big'

export interface LinkProps {
  href: string
  target?: string
  rel?: string
}

export interface ButtonProps {
  variant?: ButtonVariant
  fillType?: ButtonFillType
  fullwidth?: boolean
  size?: ButtonSize
  external?: boolean
  to?: LinkProps | string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  dataElementId?: string
  loading?: boolean
  labelText?: string
}

export interface ApiButtonData {
  id?: string
  label?: string
  text?: string
  title?: string
  type?: string
  style?: string
  variant?: string
  appearance?: string
  theme?: string
  size?: string
  width?: string | boolean
  fullWidth?: boolean
  full_width?: boolean
  isFullWidth?: boolean
  href?: string
  url?: string
  link?: string
  target?:
    | string
    | {
        type?: string
        title?: string
        formattedUrl?: string
        href?: string
        openInNewWindow?: boolean
        [key: string]: unknown
      }
  external?: boolean
  isExternal?: boolean
  is_external?: boolean
  icon?: string
  iconPosition?: 'start' | 'end' | 'left' | 'right'
  icon_position?: 'start' | 'end' | 'left' | 'right'
  startIcon?: string
  endIcon?: string
  action?: string
  onClick?: string
  loading?: boolean
  isLoading?: boolean
  is_loading?: boolean
  disabled?: boolean
  dataId?: string
  data_id?: string
  trackingId?: string
  tracking_id?: string
  elementId?: string
  element_id?: string
  callToActionText?: string
  callToActionEnabled?: boolean
  callToActionHash?: string
  formattedUrl?: string
}
