const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Downloads the invoice PDF for an order straight from the backend, which
 * builds the same document that is emailed to the customer. No print dialog.
 *
 * @param {object} order  the order row; needs at least id (and purchase_id for
 *                        the file name)
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export const downloadOrderInvoice = async (order) => {
  try {
    const token =
      typeof window === "undefined" ? null : localStorage.getItem("authToken");
    if (!token) throw new Error("Please log in again to download your invoice.");

    const response = await fetch(`${API_URL}/api/customer/invoice/${order.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      // Errors come back as JSON even though the success case is a PDF.
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || "Could not download the invoice.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // A temporary link is the only way to name a downloaded blob.
    const link = document.createElement("a");
    link.href = url;
    link.download = `INV-${order.purchase_id || order.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Give the browser a moment to start the download before releasing it.
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);

    return { ok: true };
  } catch (error) {
    console.error("Invoice download failed:", error.message);
    return { ok: false, error: error.message };
  }
};
