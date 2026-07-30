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
            <i className="bi bi-check-circle-fill text-4xl text-accent" />
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center p-0 md:p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col max-h-[94vh] md:max-h-[85vh] border border-surface-container animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-surface-container bg-surface-container/20 sticky top-0 z-10">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-primary">إتمام الطلب</h2>
            <p className="text-[11px] text-on-surface-variant/70">أدخل بيانات التواصل ليصلك الطلب في أسرع وقت</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all hover:rotate-90"
          >
            <i className="bi bi-x-lg text-lg" />
          </button>
        </div>

        {/* Order Quick Summary Header */}
        <div className="bg-primary/5 px-6 py-3 border-b border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="bi bi-bag-check text-primary text-lg" />
            <span className="text-xs font-bold text-primary">ملخص الطلب ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} قطعة)</span>
          </div>
          <span className="text-base font-black text-primary">
            {cartItems.reduce((acc, item) => {
              const rawPrice = String(item.price).replace(/[^0-9.]/g, '');
              return acc + (parseFloat(rawPrice) || 0) * item.quantity;
            }, 0).toLocaleString()} ج.م
          </span>
        </div>

        {/* Form Body */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 md:p-6 space-y-3.5 min-h-0">
          {error && (
            <div className="p-3.5 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-semibold flex items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill text-base shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">الاسم الكامل <span className="text-error">*</span></label>
            <input
              required
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              placeholder="مثال: أحمد محمود"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">رقم الهاتف <span className="text-error">*</span></label>
            <input
              required
              type="tel"
              name="client_phone"
              value={formData.client_phone}
              onChange={handleChange}
              placeholder="01012345678"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">العنوان التفصيلي <span className="text-error">*</span></label>
            <textarea
              required
              rows={2}
              name="client_address"
              value={formData.client_address}
              onChange={handleChange}
              placeholder="المحافظة - المدينة - اسم الشارع - رقم المبنى"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">ملاحظات إضافية (اختياري)</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="أي تفاصيل أو توجيهات خاصة بالاستلام"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-container bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-5 border-t border-surface-container bg-white">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-base md:text-lg shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full" />
            ) : (
              <>
                تأكيد الطلب الآن
                <i className="bi bi-check-circle-fill text-lg" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
