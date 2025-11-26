'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import '@/styles/button.scss'
import type { ButtonProps } from '@/components/button/types/button'

export default function Button({
  variant,
  fillType,
  fullwidth,
  external,
  to,
  loading,
  labelText,
  size,
  onClick,
  ...children
}: ButtonProps) {
  const router = useRouter()
  const sizeKey = size === 'big' ? 'big' : size

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)

    if (to) {
      // Prevent default if onClick handler is provided and might prevent navigation
      // But allow navigation to proceed

      // Handle string URL
      if (typeof to === 'string') {
        const isExternalUrl = external || /^(https?:\/\/|\/\/)/.test(to)

        if (isExternalUrl) {
          const newWindow = window.open(to, '_blank')
          // Security: prevent the new page from accessing window.opener
          if (newWindow) {
            newWindow.opener = null
          }
        } else {
          router.push(to)
        }
        return
      }

      // Handle LinkProps object
      if (typeof to === 'object' && to.href) {
        const isExternalUrl = external || /^(https?:\/\/|\/\/)/.test(to.href)

        if (isExternalUrl || to.target === '_blank') {
          const newWindow = window.open(to.href, to.target || '_blank')
          // Security: prevent the new page from accessing window.opener
          if (newWindow) {
            newWindow.opener = null
          }
        } else {
          router.push(to.href)
        }
      }
    }
  }

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
    <button type="button" className={classes} onClick={handleClick}>
      {labelText || (children as React.ReactNode)}
    </button>
  )
}
