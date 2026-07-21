import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/services/orderService';
import { parseApiError } from '../utils/errorParser';

export default function CheckoutModal({ isOpen, onClose, couponCode }) {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (error && formRef.current) {
      formRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const orderData = {
      client_name: formData.client_name.trim(),
      client_phone: formData.client_phone.trim(),
      client_address: formData.client_address.trim(),
      items: cartItems.map(item => ({
        product_id: Number(item.id),
        quantity: Number(item.quantity)
      }))
    };

    if (formData.notes.trim()) {
      orderData.notes = formData.notes.trim();
    }
    if (couponCode && couponCode.trim()) {
      orderData.coupon_code = couponCode.trim();
    }

    try {
      await createOrder(orderData);
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Order creation failed:', err);
      const responseData = err.response?.data;
      if (responseData?.errors) {
        const allErrors = Object.values(responseData.errors).flat().join(' | ');
        setError(allErrors);
      } else {
        setError(parseApiError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center p-0 md:p-4 bg-transparent backdrop-blur-md">
        <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-8 md:p-10 text-center shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] border border-surface-container max-h-[92vh] md:max-h-none overflow-y-auto flex flex-col items-center justify-center animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl text-accent">check_circle</span>
          </div>
          <h2 className="text-xl md:text-2xl font-display-lg text-primary mb-2 font-bold">تم استلام طلبك بنجاح!</h2>
          <p className="text-on-surface-variant font-body-rg mb-8 text-sm md:text-base">
            سنتواصل معك قريباً لتأكيد تفاصيل الشحن. شكراً لتسوقك من كراكيب.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-white rounded-xl font-title-sm hover:bg-inverse-primary transition-colors font-bold"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center p-0 md:p-4 bg-transparent backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col max-h-[92vh] md:max-h-[90vh] border border-surface-container animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-500">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 md:p-8 border-b border-surface-container bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-inherit font-bold text-primary">إتمام الطلب</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full text-on-surface-variant hover:bg-surface-container transition-all hover:rotate-90"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 min-h-0">

          {error && (
            <div className="bg-error-container text-error p-4 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2 px-1">الاسم بالكامل</label>
            <input
              required
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="w-full px-5 py-3.5 md:py-4 rounded-xl border border-surface-container bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-on-surface placeholder:text-stone-400"
              placeholder="مثال: أحمد محمد"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2 px-1">رقم الهاتف</label>
            <input
              required
              type="tel"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleChange}
              className="w-full px-5 py-3.5 md:py-4 rounded-xl border border-surface-container bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-on-surface placeholder:text-stone-400"
              placeholder="01xxxxxxxxx"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2 px-1">عنوان التوصيل بالتفصيل</label>
            <textarea
              required
              name="client_address"
              value={formData.client_address}
              onChange={handleChange}
              rows="3"
              className="w-full px-5 py-3.5 md:py-4 rounded-xl border border-surface-container bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-on-surface resize-none placeholder:text-stone-400"
              placeholder="المدينة، الحي، الشارع، رقم المبنى..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2 px-1">ملاحظات الطلب (اختياري)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-5 py-3.5 md:py-4 rounded-xl border border-surface-container bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-on-surface resize-none placeholder:text-stone-400"
              placeholder="مثال: التوصيل بعد الساعة ٥ مساءً"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 md:py-5 bg-gradient-to-r from-accent-dark via-accent to-accent-medium text-white rounded-xl font-inherit text-lg md:text-xl font-bold shadow-[0_10px_30px_rgba(196,122,44,0.3)] hover:shadow-[0_15px_40px_rgba(196,122,44,0.4)] transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <span className="animate-spin inline-block w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full" />
            ) : (
              <>
                تأكيد الطلب
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}
