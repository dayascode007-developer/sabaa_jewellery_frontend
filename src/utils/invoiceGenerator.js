// Generate and download invoice as PDF
export const downloadInvoicePDF = (order) => {
  const logoUrl = "/invoice.webp";
  // Print to PDF
  const printWindow = window.open("", "", "height=900,width=1000");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice ${order.purchase_id || order.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
          }
          .invoice-container {
            max-width: 1000px;
            margin: 20px auto;
            padding: 30px;
            border: 1px solid #ddd;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
          }
          .header-left {
            flex: 1;
          }
          .header-left h1 {
            font-size: 28px;
            font-weight: 700;
            color: #430121;
            margin-bottom: 3px;
          }
          .order-info {
            display: flex;
            gap: 40px;
            margin-top: 5px;
          }
          .order-info span {
            font-size: 13px;
            color: #666;
          }
          .header-right {
            text-align: right;
          }
          .company-details {
            font-size: 11px;
            color: #999;
            margin-bottom: 8px;
            line-height: 1.5;
          }
          .print-btn {
            display: inline-block;
            background: #ffc107;
            color: #333;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            margin-top: 10px;
          }
          .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .section {
            padding: 15px;
            background: #fafafa;
            border-radius: 4px;
          }
          .section h3 {
            font-size: 12px;
            font-weight: 700;
            color: #430121;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .section p {
            font-size: 13px;
            color: #333;
            margin-bottom: 4px;
            line-height: 1.5;
          }
          .order-summary-section {
            padding: 15px;
            background: #fafafa;
            border-radius: 4px;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 13px;
          }
          .summary-item-label {
            color: #666;
          }
          .summary-item-value {
            color: #333;
            font-weight: 500;
          }
          .summary-total {
            border-top: 1px solid #ddd;
            padding-top: 10px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            color: #430121;
          }
          .products-section {
            margin-top: 30px;
          }
          .products-section h3 {
            font-size: 14px;
            font-weight: 700;
            color: #430121;
            margin-bottom: 15px;
            text-transform: uppercase;
          }
          .product-item {
            display: flex;
            gap: 15px;
            padding: 15px;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
            margin-bottom: 15px;
          }
          .product-image {
            width: 80px;
            height: 80px;
            background: #f0f0f0;
            border-radius: 4px;
            flex-shrink: 0;
          }
          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
          .product-details {
            flex: 1;
          }
          .product-name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
          }
          .product-seller {
            font-size: 12px;
            color: #999;
            margin-bottom: 6px;
          }
          .product-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .product-price {
            font-size: 14px;
            font-weight: 600;
            color: #430121;
          }
          .product-qty {
            font-size: 12px;
            color: #666;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #f0f0f0;
            text-align: center;
            font-size: 11px;
            color: #999;
          }
          @media print {
            body {
              background: #fff;
            }
            .invoice-container {
              box-shadow: none;
              border: none;
              margin: 0;
              padding: 20px;
            }
            .print-btn {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        ${generateInvoiceHTML(order, logoUrl)}
      </body>
    </html>
  `);
  printWindow.document.close();
};

const generateInvoiceHTML = (order, logoUrl) => {
  const orderDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Get all items for subtotal calculation
  const items = order.items || (order.item ? [order.item] : []);

  // Calculate items subtotal from individual items
  let calculatedSubtotal = 0;
  items.forEach((item) => {
    calculatedSubtotal +=
      parseFloat(item.sale_price || item.price || 0) * (item.quantity || 1);
  });

  // Use provided subtotal if available, otherwise use calculated
  const itemsSubtotal = order.subtotal
    ? parseFloat(order.subtotal)
    : calculatedSubtotal;
  const discount = parseFloat(order.discount_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  const advancePayment = order.payment_method === "cod" ? 120 : 0;

  // Calculate totals dynamically
  const subtotalBeforeDiscount = itemsSubtotal + shipping;
  const grandTotal = subtotalBeforeDiscount - discount;

  return `
    <div class="invoice-container">
      <div class="header-top">
        <div class="header-left">
          <h1>Order Summary</h1>
          <div class="order-info">
            <span><strong>Order placed</strong> ${orderDate}</span>
            <span><strong>Order number</strong> ${
              order.purchase_id || order.id
            }</span>
          </div>
        </div>
        <div class="header-right">
          <img src="${logoUrl}" alt="Sabaa Logo" style="height: 60px; margin-bottom: 10px;">
          <div class="company-details">
            <strong>SABAA JEWEL ARTS</strong><br>
            GST: 33BHPPV7845F1ZQ<br>
            NAKSHATH INTERNATIONAL<br>
            <button class="print-btn" onclick="window.print()">Print</button>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="section">
          <h3>Ship to</h3>
          <p><strong>${order.address?.name || "N/A"}</strong></p>
          <p>${order.address?.house || ""} ${order.address?.area || ""}</p>
          ${order.address?.landmark ? `<p>${order.address.landmark}</p>` : ""}
          <p>${order.address?.city || ""}</p>
          <p>${order.address?.state || ""} ${order.address?.pincode || ""}</p>
          <p>India</p>
        </div>

        <div class="section">
          <h3>Payment method</h3>
          <p>${
            order.payment_method === "cod"
              ? "Pay on Delivery"
              : "Online Payment"
          }</p>
        </div>

        <div class="order-summary-section">
          <h3>Order Summary</h3>
          ${
            advancePayment > 0
              ? `
            <div class="summary-item">
              <span class="summary-item-label">Advance Payment:</span>
              <span class="summary-item-value">₹${advancePayment.toFixed(
                2
              )}</span>
            </div>
          `
              : ""
          }
          <div class="summary-item">
            <span class="summary-item-label">Item(s) Subtotal:</span>
            <span class="summary-item-value">₹${itemsSubtotal.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-item-label">Shipping:</span>
            <span class="summary-item-value">₹${shipping.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-item-label">Total:</span>
            <span class="summary-item-value">₹${subtotalBeforeDiscount.toFixed(
              2
            )}</span>
          </div>
          ${
            discount > 0
              ? `
            <div class="summary-item">
              <span class="summary-item-label">Promotion Applied:</span>
              <span class="summary-item-value" style="color: #d9534f;">-₹${discount.toFixed(
                2
              )}</span>
            </div>
          `
              : ""
          }
          <div class="summary-total">
            <span>Grand Total:</span>
            <span>₹${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="products-section">
        <h3>Product Ordered</h3>
        ${
          items.length > 0
            ? items
                .map(
                  (item) => `
          <div class="product-item">
            <div class="product-image">
              ${
                item.image
                  ? `<img src="${item.image}" alt="${item.title}">`
                  : '<div style="background: #f0f0f0;"></div>'
              }
            </div>
            <div class="product-details">
              <div class="product-name">${item.title}</div>
              ${item.purchase_id ? `<div class="product-seller" style="color: #430121; font-weight: 600;">Purchase ID: ${item.purchase_id}</div>` : ''}
              <div class="product-seller">Sold by: Sabaa Jewel Arts</div>
              <div class="product-bottom">
                <span class="product-price">₹${(
                  item.sale_price ||
                  item.price ||
                  0
                ).toFixed(2)}</span>
                <span class="product-qty">Item Quantity: ${
                  item.quantity || 1
                }</span>
              </div>
            </div>
          </div>
        `
                )
                .join("")
            : "<p>No items</p>"
        }
      </div>

      <div class="footer">
        <p>Thank you for your order! | Sabaa Jewel Arts | www.sabaajewelarts.com</p>
      </div>
    </div>
  `;
};
