// Meta Pixel event helper.
//
// Every call is guarded: fbq is absent during server rendering, before the
// snippet loads, and whenever an ad blocker drops the request — which is a
// meaningful share of real traffic. An unguarded fbq() would throw inside a
// click handler and break the button it was attached to, so a missing pixel
// must never be able to break a purchase.
//
// Meta's standard event names are case-sensitive: "AddToCart" is recognised,
// "addtocart" is treated as a custom event and will not drive optimisation.
// https://developers.facebook.com/docs/meta-pixel/reference

const isReady = () => typeof window !== "undefined" && typeof window.fbq === "function";

/**
 * Fires a standard Meta event.
 *
 * @param {string} event  standard name, e.g. "ViewContent" | "AddToCart" |
 *                        "InitiateCheckout" | "Purchase"
 * @param {object} [data] value/currency/content ids
 */
export const pixelTrack = (event, data = {}) => {
  if (!isReady()) return;
  try {
    window.fbq("track", event, data);
  } catch {
    // Analytics must never interrupt the flow it is measuring.
  }
};

/** Same, for an event name that is not one of Meta's standard ones. */
export const pixelTrackCustom = (event, data = {}) => {
  if (!isReady()) return;
  try {
    window.fbq("trackCustom", event, data);
  } catch {
    /* ignore */
  }
};

/**
 * Builds the payload Meta expects for a product.
 *
 * content_ids must be strings and must match the ids in your Meta catalogue if
 * you run dynamic product ads, or the two cannot be joined up.
 */
export const productPayload = (product, { quantity = 1 } = {}) => ({
  content_type: "product",
  content_ids: [String(product?.id ?? "")],
  content_name: product?.title ?? "",
  value: Number(product?.sale_price ?? product?.regular_price ?? 0),
  currency: "INR",
  ...(quantity > 1 ? { contents: [{ id: String(product?.id ?? ""), quantity }] } : {}),
});
