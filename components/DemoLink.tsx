import Link from 'next/link'

interface DemoLinkProps {
  href: string
  icon: string
  title: string
}

/**
 * Reusable demo link component for navigation to different component demos
 */
export default function DemoLink({ href, icon, title }: DemoLinkProps) {
  return (
    <Link
      href={href}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {icon} {title}
    </Link>
  )
}
