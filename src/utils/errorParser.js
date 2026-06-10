const fieldLabels = {
  client_name: 'الاسم / Name',
  client_phone: 'رقم الهاتف / Phone',
  client_address: 'العنوان / Address',
  notes: 'الملاحظات / Notes',
  name: 'الاسم / Name',
  title: 'العنوان / Title',
  price: 'السعر / Price',
  stock: 'المخزون / Stock',
  description: 'الوصف / Description',
  subcategory_id: 'القسم الفرعي / Subcategory',
  category_id: 'القسم الرئيسي / Category',
  main_image: 'الصورة الرئيسية / Main Image',
  sec_image: 'الصورة الثانية / Secondary Image',
  image: 'الصورة / Image',
  code: 'الكود / Code',
  discount_type: 'نوع الخصم / Discount Type',
  discount_amount: 'قيمة الخصم / Discount Amount',
  min_order_value: 'أقل قيمة للطلب / Min Order Value',
  max_uses: 'أقصى استخدام / Max Uses',
  expires_at: 'تاريخ الانتهاء / Expiry Date',
  is_active: 'الحالة / Status',
  username: 'اسم المستخدم / Username',
  password: 'كلمة المرور / Password',
  product_id: 'المنتج / Product',
  quantity: 'الكمية / Quantity',
  coupon_code: 'كود الكوبون / Coupon Code',
  action_taken: 'الإجراء / Action Taken',
  status: 'الحالة / Status',
  email: 'البريد الإلكتروني / Email',
};

function formatFieldName(loc) {
  if (!Array.isArray(loc) || loc.length < 2) return null;

  const rawField = loc[loc.length - 1];
  if (typeof rawField === 'string') {
    return fieldLabels[rawField] || rawField.replace(/_/g, ' ');
  }

  if (typeof rawField === 'number' && loc.length >= 3) {
    const parent = loc[loc.length - 2];
    const parentLabel = fieldLabels[parent] || parent;
    return `${parentLabel} #${rawField + 1}`;
  }

  return null;
}

export function parseApiError(err) {
  const data = err?.response?.data;
  if (!data) {
    if (err?.code === 'ERR_NETWORK') return 'تعذر الاتصال بالخادم / Network error';
    return err?.message || 'حدث خطأ غير متوقع / Unexpected error';
  }

  if (Array.isArray(data.detail)) {
    return data.detail.map((e) => {
      const fieldName = formatFieldName(e.loc);
      const prefix = fieldName ? `${fieldName}: ` : '';
      return `${prefix}${e.msg}`;
    }).join(' | ');
  }

  if (typeof data.detail === 'string') return data.detail;

  if (typeof data === 'string') return data;

  return data.message || err?.message || 'حدث خطأ غير متوقع / Unexpected error';
}
