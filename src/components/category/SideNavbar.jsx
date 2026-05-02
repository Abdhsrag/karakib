const menuItems = [
  { icon: 'history_edu', label: 'التحف' },
  { icon: 'local_florist', label: 'المزهريات' },
  { icon: 'light', label: 'الثريات' },
  { icon: 'wallpaper', label: 'ورق الحائط' },
  { icon: 'table_bar', label: 'الطاولات' },
]

export default function SideNavBar() {
  return (
    <aside
      className="cat-sidebar"
      style={{
        display: 'none',
        background: '#FAF7F2',
        width: '288px',
        height: '100%',
        position: 'fixed',
        right: 0,
        top: '73px',
        bottom: 0,
        zIndex: 60,
        borderLeft: '1px solid #fecdd3',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.05)',
        flexDirection: 'column',
        marginTop: 5
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: '32px 0',
          textAlign: 'center',
          borderBottom: '1px solid #fff1f2',
        }}
      >
        <div
          style={{
            fontFamily: 'inherit',
            fontSize: '30px',
            fontWeight: 700,
            color: '#C47A2C',
          }}
        >
          كراكيب
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#78716c',
            fontFamily: 'inherit',
            marginTop: '8px',
          }}
        >
          عالم من الفخامة
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, overflowY: 'auto' }}>
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 24px',
              color: '#57534e',
              textDecoration: 'none',
              transition: 'all 0.2s',
              borderTop: index === 0 ? '1px solid #fff1f2' : undefined,
              borderBottom: '1px solid #fff1f2',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.color = '#C47A2C'
              e.currentTarget.style.paddingRight = '32px'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#57534e'
              e.currentTarget.style.paddingRight = '24px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              {item.icon}
            </span>
            <span
              style={{
                fontFamily: 'inherit',
                fontSize: '16px',
                lineHeight: '1.6',
              }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  )
}