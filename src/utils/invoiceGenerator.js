// Generate and download invoice as PDF
export const downloadInvoicePDF = (order, customerName) => {
  const element = document.createElement("div");
  element.innerHTML = generateInvoiceHTML(order, customerName);
  element.style.display = "none";
  document.body.appendChild(element);

  // Print to PDF
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice ${order.id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .invoice-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 40px;
            border: 1px solid #ddd;
            background: #fff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #430121;
            padding-bottom: 20px;
          }
          .company-info h1 {
            color: #430121;
            font-size: 28px;
            margin-bottom: 5px;
          }
          .company-info p {
            color: #666;
            font-size: 12px;
          }
          .invoice-title {
            text-align: right;
          }
          .invoice-title h2 {
            color: #430121;
            font-size: 24px;
            margin-bottom: 5px;
          }
          .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .invoice-details h3 {
            color: #430121;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .invoice-details p {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }
          .products-table th {
            background-color: #430121;
            color: white;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            font-weight: bold;
          }
          .products-table td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          .products-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .summary {
            width: 100%;
            margin-bottom: 40px;
          }
          .summary-row {
            display: flex;
            justify-content: flex-end;
            padding: 10px 0;
            font-size: 14px;
          }
          .summary-row.total {
            border-top: 2px solid #430121;
            border-bottom: 2px solid #430121;
            padding: 15px 0;
            font-weight: bold;
            color: #430121;
            font-size: 16px;
          }
          .summary-label {
            width: 150px;
            text-align: right;
            margin-right: 20px;
          }
          .summary-value {
            width: 100px;
            text-align: right;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            font-size: 12px;
            color: #666;
            margin-top: 40px;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .invoice-container {
              max-width: 100%;
              margin: 0;
              padding: 0;
              border: none;
            }
          }
        </style>
      </head>
      <body>
        ${generateInvoiceHTML(order, customerName)}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

const generateInvoiceHTML = (order, customerName) => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `
    <div class="invoice-container">
      <div class="header">
        <div class="company-info">
          <h1>Sabaa</h1>
          <p>Jewel Arts</p>
          <p>Since 1984</p>
        </div>
        <div class="invoice-title">
          <h2>INVOICE</h2>
          <p><strong>${order.id}</strong></p>
        </div>
      </div>

      <div class="invoice-details">
        <div>
          <h3>Bill To</h3>
          <p><strong>${customerName}</strong></p>
          <p>${order.shipTo}</p>
        </div>
        <div>
          <h3>Invoice Details</h3>
          <p><strong>Invoice Date:</strong> ${currentDate}</p>
          <p><strong>Order Date:</strong> ${order.date}</p>
          <p><strong>Due Date:</strong> ${order.arriving}</p>
        </div>
      </div>

      <table class="products-table">
        <thead>
          <tr>
            <th style="width: 50%;">Product</th>
            <th style="width: 15%; text-align: center;">Quantity</th>
            <th style="width: 20%; text-align: right;">Price</th>
            <th style="width: 15%; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.products
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td style="text-align: center;">${product.qty}</td>
              <td style="text-align: right;">₹${(parseFloat(order.total.replace("₹", "")) / product.qty).toFixed(2)}</td>
              <td style="text-align: right;">${order.total}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-row">
          <div class="summary-label">Subtotal:</div>
          <div class="summary-value">${order.total}</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Shipping:</div>
          <div class="summary-value">FREE</div>
        </div>
        <div class="summary-row">
          <div class="summary-label">Tax (GST):</div>
          <div class="summary-value">₹0.00</div>
        </div>
        <div class="summary-row total">
          <div class="summary-label">TOTAL:</div>
          <div class="summary-value">${order.total}</div>
        </div>
      </div>

      <div class="footer">
        <p>Thank you for your order! | Sabaa Jewel Arts | www.sabaajewelarts.com</p>
        <p>Invoice #${order.id} | Generated on ${currentDate}</p>
      </div>
    </div>
  `;
};
