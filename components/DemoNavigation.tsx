import DemoLink from './DemoLink'

export default function DemoNavigation() {
  return (
    <div
      style={{
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <h3 style={{ 
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🧪 Component System Demos
      </h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <DemoLink
          href="/button-transformer"
          icon="🔄"
          title="Button Transformer Demo"
        />
        {/* Future component demos can be easily added here */}
      </div>

      <p style={{ 
        fontSize: '14px', 
        color: '#6b7280', 
        margin: '0',
        lineHeight: '1.5'
      }}>
        Test universal component transformers with GrandVision-realistic API examples
      </p>
    </div>
  )
}
