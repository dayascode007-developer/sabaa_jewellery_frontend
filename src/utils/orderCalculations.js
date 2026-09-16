export const calculateOrderSummary = (itemsTotal, discountAmount = 0, shippingConfig) => {
  if (!shippingConfig) {
    console.error("shippingConfig is missing in calculateOrderSummary");
    return {
      subtotal: itemsTotal,
      discount: discountAmount,
      shippingCost: 0,
      freeDelivery: false,
      grandTotal: itemsTotal - discountAmount,
    };
  }

  const { deliveryCharge: DELIVERY, freeDeliveryAbove: FREE_DELIVERY_ABOVE } = shippingConfig;

  const subtotalAfterDiscount = itemsTotal - discountAmount;
  const freeDelivery = subtotalAfterDiscount >= FREE_DELIVERY_ABOVE;
  const shippingCost = freeDelivery ? 0 : DELIVERY;
  const grandTotal = itemsTotal - discountAmount + shippingCost;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_ABOVE - subtotalAfterDiscount);

  return {
    subtotal: itemsTotal,
    discount: discountAmount,
    shippingCost,
    freeDelivery,
    grandTotal,
    amountNeededForFreeDelivery,
  };
};
