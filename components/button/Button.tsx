import clsx from 'clsx'
import type { ButtonProps } from '@/components/Button/types/button'
import '@/styles/button.scss'

export default function Button({
  variant,
  fillType,
  fullwidth,
  external,
  to,
  loading,
  labelText,
  size,
  ...children
}: ButtonProps) {
  const sizeKey = size === 'big' ? 'big' : size

  const classes = clsx(
    'btn',
    `btn--${variant}`,
    `btn--${fillType}`,
    `btn--${sizeKey}`,
    {
      'btn--full': fullwidth,
      'is-loading': loading,
      // 'is-disabled': disabled,
    },
  )

  return (
    <button type="button" className={classes}>
      {/* {labelText || children} */}
      {labelText}
    </button>
  )
}
