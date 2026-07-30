const navItems = [
  { label: 'الرئيسية', bsIcon: 'bi bi-house-door-fill', active: true },
  { label: 'الأقسام', bsIcon: 'bi bi-grid', active: false },
  { label: 'المفضلة', bsIcon: 'bi bi-heart', active: false },
  { label: 'السلة', bsIcon: 'bi bi-bag', active: false },
  { label: 'حسابي', bsIcon: 'bi bi-person', active: false },
]

function NavItem({ label, bsIcon, active }) {
  return (
    <a
      className={`flex flex-col items-center justify-center w-1/5 hover:bg-rose-50/30 transition-transform duration-300 ease-out rounded-lg py-1 ${
        active
          ? 'text-[#C47A2C] scale-110'
          : 'text-stone-400 hover:text-[#C47A2C]'
      }`}
      href="#"
    >
      <i className={`${bsIcon} text-xl mb-1`} />
      <span className="text-[10px] font-serif">{label}</span>
    </a>
  )
}

export default function BottomNavBar() {
  return (
    <nav className="bg-white fixed bottom-0 w-full z-50 rounded-t-xl border-t border-rose-50 shadow-[0_-5px_25px_rgba(212,175,55,0.08)] md:hidden">
      <div className="flex flex-row-reverse justify-around items-center h-16 px-2 pb-safe">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </nav>
  )
}