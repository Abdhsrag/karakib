const navItems = [
  { label: 'الرئيسية', icon: 'home', active: true, fill: true },
  { label: 'الأقسام', icon: 'category', active: false, fill: false },
  { label: 'المفضلة', icon: 'favorite', active: false, fill: false },
  { label: 'السلة', icon: 'shopping_bag', active: false, fill: false },
  { label: 'حسابي', icon: 'person', active: false, fill: false },
]

function NavItem({ label, icon, active, fill }) {
  return (
    <a
      className={`flex flex-col items-center justify-center w-1/5 hover:bg-rose-50/30 transition-transform duration-300 ease-out rounded-lg py-1 ${
        active
          ? 'text-[#C47A2C] scale-110'
          : 'text-stone-400 hover:text-[#C47A2C]'
      }`}
      href="#"
    >
      <span
        className="material-symbols-outlined mb-1"
        style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {icon}
      </span>
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