import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { getProductById } from '../api/services/productService'
import { createOrder } from '../api/services/orderService'
import { adaptProduct } from '../adapters/productAdapter'
import { parseApiError } from '../utils/errorParser'

export default function ProductDetailModal({ product: initialProduct, onClose }) {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(initialProduct?.image || initialProduct?.main_img_url)
  const [quantity, setQuantity] = useState(1)
  
  // View state: 'details' or 'order'
  const [view, setView] = useState('details')
  
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const data = await getProductById(initialProduct.id)
        const adapted = adaptProduct(data)
        setProduct(adapted)
        setSelectedImage(adapted.image)
    } catch (err) {
      console.error('Failed to fetch product details:', err)
      setProduct(initialProduct)
    } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [initialProduct.id])

  // Direct Order State
  const [orderForm, setOrderForm] = useState({
    client_name: '',
    client_phone: '',
    client_address: '',
    notes: ''
  })
  const [orderStatus, setOrderStatus] = useState(null) // 'submitting', 'success', 'error'
  const [orderError, setOrderError] = useState(null)
  const orderContentRef = useRef(null)

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    setOrderStatus('submitting')
    try {
      const payload = {
        ...orderForm,
        items: [{ product_id: product.id, quantity }]
      }
      await createOrder(payload)
      setOrderStatus('success')
    } catch (err) {
      console.error(err)
      setOrderStatus('error')
      setOrderError(parseApiError(err))
      if (orderContentRef.current) {
        orderContentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  if (!product) return null

  const images = [product.image, product.sec_image].filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center p-0 md:p-6 bg-transparent backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-white rounded-t-3xl md:rounded-3xl shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[90vh] md:min-h-[600px] border border-surface-container animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-500">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-surface-container/80 backdrop-blur-sm text-on-surface hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative bg-surface-container-highest flex flex-col h-[35vh] md:h-auto flex-shrink-0">
          <div className="relative w-full h-full flex-grow">
            <img
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
              src={selectedImage}
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 z-10">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImage === img
                      ? 'border-2 border-primary shadow-lg scale-105'
                      : 'border border-outline shadow-md opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    alt={`view ${index + 1}`}
                    className="w-full h-full object-cover"
                    src={img}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between bg-white overflow-y-auto flex-grow min-h-0">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-on-surface-variant">
              جاري التحميل...
            </div>
          ) : view === 'details' ? (
            <>
              <div className="space-y-6">
                <div>
                  <h2 className="font-inherit text-2xl md:text-4xl font-bold text-on-background mb-3 leading-snug">
                    {product.title}
                  </h2>
                  <div className="flex items-baseline gap-4 border-b border-surface-container pb-6">
                    <span className="font-inherit text-xl md:text-2xl font-black text-primary">
                      {String(product.price).includes('ج.م') ? product.price : `${product.price} ج.م`}
                    </span>
                  </div>
                </div>

                <div className="text-on-surface-variant font-body-rg leading-relaxed text-sm md:text-base">
                  <p>{product.description}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-label-xs font-label-xs text-on-surface-variant text-xs md:text-sm">الكمية:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="w-12 text-center text-body-rg font-semibold text-on-surface text-sm md:text-base">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 text-secondary bg-secondary-container/20 px-3 py-2 rounded-lg w-fit">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="text-xs font-semibold">
                    {(product.stock > 0 || product.inStock) ? `متوفر في المخزون` : 'متوفر'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-surface-container-high space-y-3 flex-shrink-0">
                <button
                  onClick={() => {
                    addToCart({ ...product, quantity })
                    onClose()
                  }}
                  className="w-full bg-primary text-white text-title-sm font-title-sm py-3.5 md:py-4 rounded-lg hover:bg-inverse-primary transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_5px_15px_-5px_rgba(196,122,44,0.4)]"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  إضافة إلى السلة
                </button>

                <button
                  onClick={() => setView('order')}
                  className="w-full bg-surface-container-low text-on-surface border border-outline-variant text-body-rg font-body-rg py-3.5 md:py-4 rounded-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">flash_on</span>
                  طلب مباشر سريع
                </button>
              </div>
            </>
          ) : (
            // --- DIRECT ORDER VIEW ---
            <div ref={orderContentRef} className="flex-1 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setView('details')} className="text-on-surface-variant hover:text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined rtl:rotate-180">arrow_back</span>
                </button>
                <h2 className="text-lg md:text-xl font-bold text-on-surface">طلب مباشر</h2>
              </div>

              {orderStatus === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h3 className="text-lg text-on-surface font-bold">تم إرسال طلبك بنجاح!</h3>
                  <p className="text-on-surface-variant text-sm">سنتواصل معك قريباً لتأكيد الطلب.</p>
                  <button onClick={onClose} className="mt-6 px-8 py-3 bg-primary text-white rounded-lg font-bold">إغلاق</button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">الاسم الكامل</label>
                      <input 
                        required
                        type="text" 
                        value={orderForm.client_name}
                        onChange={e => setOrderForm({...orderForm, client_name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">رقم الهاتف</label>
                      <input 
                        required
                        type="tel" 
                        value={orderForm.client_phone}
                        onChange={e => setOrderForm({...orderForm, client_phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="رقم الهاتف للتواصل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">العنوان بالتفصيل</label>
                      <textarea 
                        required
                        rows="2"
                        value={orderForm.client_address}
                        onChange={e => setOrderForm({...orderForm, client_address: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        placeholder="المحافظة، المدينة، الشارع، رقم المبنى"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1">ملاحظات إضافية (اختياري)</label>
                      <input 
                        type="text" 
                        value={orderForm.notes}
                        onChange={e => setOrderForm({...orderForm, notes: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="أي ملاحظات حول الطلب أو التوصيل"
                      />
                    </div>
                    {orderStatus === 'error' && (
                      <p className="text-error text-sm">{orderError || 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.'}</p>
                    )}
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-surface-container-high flex-shrink-0">
                    <button 
                      type="submit" 
                      disabled={orderStatus === 'submitting'}
                      className="w-full bg-primary text-white text-title-sm py-3.5 md:py-4 rounded-lg hover:bg-inverse-primary transition-all duration-300 font-bold disabled:opacity-50"
                    >
                      {orderStatus === 'submitting' ? 'جاري الإرسال...' : 'تأكيد الطلب'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}