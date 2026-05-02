export default function CategoriesSection() {
  return (
    <section
      style={{
        padding: '48px 0',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        background: '#ffffff',
      }}
    >
      <button
        style={{
          background: '#C47A2C',
          color: '#554300',
          border: '1px solid rgba(212,175,55,0.5)',
          padding: '16px 80px',
          borderRadius: '100px',
          fontFamily: 'inherit',
          fontSize: '20px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.6)'
          e.currentTarget.style.letterSpacing = '0.05em'
          e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(4px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.4)'
          e.currentTarget.style.letterSpacing = 'normal'
          e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)'
        }}
      >
        الفئات الرئيسية
        <span
          className="material-symbols-outlined arrow-icon"
          style={{
            fontSize: '18px',
            transition: 'transform 0.3s',
          }}
        >
          arrow_forward
        </span>
      </button>
    </section>
  )
}