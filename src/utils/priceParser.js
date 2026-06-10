/**
 * Robust helper to parse price values (numbers or formatted Arabic/English strings)
 * into a valid float number.
 */
export const parsePrice = (priceVal) => {
  if (priceVal === undefined || priceVal === null) return 0;
  
  let str = String(priceVal).trim();
  
  // Replace Arabic Indic digits (٠-٩) with Western digits (0-9)
  str = str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  
  // Clean everything except digits and decimal point
  str = str.replace(/[^0-9.]/g, '');
  
  const parsed = parseFloat(str);
  return isNaN(parsed) ? 0 : parsed;
};
