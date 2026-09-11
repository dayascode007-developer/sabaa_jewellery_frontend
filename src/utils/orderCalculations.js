export const calculateOrderSummary = (itemsTotal, discountAmount = 0, shippingConfig) => {
  const { deliveryCharge: DELIVERY, freeDeliveryAbove: FREE_DELIVERY_ABOVE } = shippingConfig;

  const subtotalAfterDiscount = itemsTotal - discountAmount;
  const freeDelivery = subtotalAfterDiscount >= FREE_DELIVERY_ABOVE;
  const deliveryChargeAmount = freeDelivery ? 0 : DELIVERY;
  const grandTotal = itemsTotal - discountAmount + deliveryChargeAmount;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_ABOVE - subtotalAfterDiscount);

  return {
    itemsTotal,
    discountAmount,
    deliveryCharge: deliveryChargeAmount,
    freeDelivery,
    grandTotal,
    amountNeededForFreeDelivery,
  };
};
