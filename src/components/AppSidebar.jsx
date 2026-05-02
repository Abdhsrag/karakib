const menuItems = [
  { icon: 'home', label: 'الرئيسية', page: 'home' },
  { icon: 'category', label: 'الأقسام', page: 'categories' },
  { icon: 'gavel', label: 'الشروط والأحكام', page: 'terms' },
]

export default function AppSidebar({ isOpen, onClose, currentPage, onNavigate }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-300px',
          width: '280px',
          height: '100%',
          background: '#FAF7F2',
          zIndex: 100,
          boxShadow: isOpen ? '-10px 0 40px rgba(0,0,0,0.1)' : 'none',
          transition: 'right 0.35s ease-in-out, box-shadow 0.35s',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #fecdd3',
          }}
        >
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: '22px',
              fontWeight: 700,
              color: '#C47A2C',
              letterSpacing: '0.05em',
            }}
          >
            كراكيب
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#78716c',
              padding: '4px',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6B4F3A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#78716c')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {menuItems.map((item) => {
            const isActive = currentPage === item.page
            return (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page)
                  onClose()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  padding: '14px 24px',
                  border: 'none',
                  background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                  color: isActive ? '#C47A2C' : '#57534e',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s',
                  textAlign: 'right',
                  borderRight: isActive ? '3px solid #C47A2C' : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#ffffff'
                    e.currentTarget.style.color = '#C47A2C'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#57534e'
                  }
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '22px',
                    fontVariationSettings: isActive ? "'FILL' 1" : undefined,
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #fecdd3',
            fontSize: '12px',
            color: '#a8a29e',
            fontFamily: 'inherit',
            textAlign: 'center',
          }}
        >
          © ٢٠٢٦ كراكيب
        </div>
      </aside>
    </>
  )
}