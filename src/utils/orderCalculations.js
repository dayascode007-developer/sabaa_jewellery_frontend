export const calculateOrderSummary = (itemsTotal, discountAmount = 0) => {
  // Cart page: NO shipping calculation
  // Shipping is calculated dynamically during checkout based on payment method
  const grandTotal = itemsTotal - discountAmount;

  return {
    subtotal: itemsTotal,
    discount: discountAmount,
    shippingCost: 0,
    freeDelivery: false,
    grandTotal,
  };
};
