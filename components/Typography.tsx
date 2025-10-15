import type { ElementType, ReactNode } from 'react'
import styles from '../styles/typography.module.scss'

interface TypographyProps {
  children: ReactNode
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline'
  component?: ElementType
  className?: string
  color?:
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | 'inherit'
  align?: 'left' | 'center' | 'right' | 'justify'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  gutterBottom?: boolean
  noWrap?: boolean
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  component,
  className = '',
  color = 'textPrimary',
  align = 'left',
  weight = 'regular',
  gutterBottom = false,
  noWrap = false,
}) => {
  // Determine the default component based on variant
  const getDefaultComponent = () => {
    if (component) return component

    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return variant
      case 'caption':
      case 'overline':
        return 'span'
      default:
        return 'p'
    }
  }

  const Component = getDefaultComponent()

  const classes = [
    styles.typography,
    styles[variant],
    styles[`color-${color}`],
    styles[`align-${align}`],
    styles[`weight-${weight}`],
    gutterBottom && styles.gutterBottom,
    noWrap && styles.noWrap,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Component className={classes}>{children}</Component>
}

export default Typography
