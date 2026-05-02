const navItems = [
  { label: 'الرئيسية', icon: 'home', active: false, fill: false },
  { label: 'الأقسام', icon: 'category', active: true, fill: true },
  { label: 'المفضلة', icon: 'favorite', active: false, fill: false },
  { label: 'السلة', icon: 'shopping_bag', active: false, fill: false },
  { label: 'حسابي', icon: 'person', active: false, fill: false },
]

function NavItem({ label, icon, active, fill }) {
  return (
    <a
      href="#"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        padding: '8px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: active ? '#C47A2C' : '#a8a29e',
        transform: active ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = '#C47A2C'
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = '#a8a29e'
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: '24px',
          marginBottom: '4px',
          fontVariationSettings: fill ? "'FILL' 1" : undefined,
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: '10px', fontFamily: 'inherit' }}>
        {label}
      </span>
    </a>
  )
}

export default function CategoriesBottomNav() {
  return (
    <nav
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#ffffff',
        borderRadius: '16px 16px 0 0',
        borderTop: '1px solid #fff1f2',
        boxShadow: '0 -5px 25px rgba(212,175,55,0.08)',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '64px',
        padding: '0 8px',
      }}
    >
      {navItems.map((item) => (
        <NavItem key={item.label} {...item} />
      ))}
    </nav>
  )
}