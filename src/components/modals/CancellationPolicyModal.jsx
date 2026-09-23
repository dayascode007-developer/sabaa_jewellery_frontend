"use client";

import { MdClose } from "react-icons/md";

const MAROON = "#7B1E2B";

export default function CancellationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-white/20 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: MAROON }}>
              Cancellation Policy
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 text-gray-700 space-y-4">
            <p className="text-sm">
              At SABAA, we begin processing orders after receiving the
              customer's order confirmation and payment. Customers are requested
              to carefully review their product selection, size, customization
              details, and delivery information before placing an order.
            </p>

            <p className="text-sm font-medium text-gray-900">
              Please read the following Cancellation Policy carefully before
              completing your purchase.
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                1. Order Cancellation
              </h3>
              <p className="text-sm">
                Customers may request cancellation of their order after placing
                the order, subject to the order's processing status.
              </p>
              <p className="text-sm">
                However, any advance amount paid at the time of placing the
                order is <strong>non-refundable</strong>.
              </p>
              <p className="text-sm">
                Cancellation of an order does not make the customer eligible for
                a refund of the advance payment.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                2. Cancellation After Advance Payment
              </h3>
              <p className="text-sm">
                If you place an order by paying an advance amount and later
                decide to cancel the order, you may request cancellation.
              </p>
              <p className="text-sm">However:</p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>The advance amount already paid will not be refunded.</li>
                <li>
                  This applies even if the order has not yet been dispatched,
                  subject to applicable law.
                </li>
              </ul>
              <p className="text-sm">
                We therefore recommend confirming all order details carefully
                before making payment.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                3. Customized Orders
              </h3>
              <p className="text-sm">
                Customized and personalized jewellery may be processed
                specifically according to the customer's requirements.
              </p>
              <p className="text-sm">Examples include:</p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>Customized Panchaloga rings.</li>
                <li>Name or initial engraving.</li>
                <li>Personalized text.</li>
                <li>Customized designs.</li>
                <li>Special sizes.</li>
                <li>Made-to-order jewellery.</li>
              </ul>
              <p className="text-sm">
                Once customization or production has started, cancellation may
                not be possible.
              </p>
              <p className="text-sm">
                In all cases, any advance amount paid for a customized order is
                <strong>non-refundable</strong>, subject to applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                4. Cancellation After Order Processing Has Started
              </h3>
              <p className="text-sm">
                Once an order has entered any of the following stages:
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>Processing.</li>
                <li>Customization.</li>
                <li>Production.</li>
                <li>Quality checking.</li>
                <li>Packing.</li>
                <li>Dispatch.</li>
              </ul>
              <p className="text-sm">cancellation may not be possible.</p>
              <p className="text-sm">
                If cancellation is accepted at this stage, the advance amount
                already paid will remain <strong>non-refundable</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                5. Cancellation Before Dispatch
              </h3>
              <p className="text-sm">
                You may contact SABAA to request cancellation before your order
                is dispatched.
              </p>
              <p className="text-sm">
                Our team will check the current status of your order.
              </p>
              <p className="text-sm">
                If cancellation is possible, the order will be cancelled;
                however, the advance payment will not be refunded.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                6. Cancellation After Dispatch
              </h3>
              <p className="text-sm">
                Once an order has been dispatched, it cannot normally be
                cancelled through SABAA.
              </p>
              <p className="text-sm">
                If you no longer wish to receive the shipment, please contact
                our customer support team immediately.
              </p>
              <p className="text-sm">
                Refusing or failing to accept a shipment does not automatically
                entitle the customer to a refund.
              </p>
              <p className="text-sm">
                Any applicable resolution will be handled in accordance with
                SABAA's Return & Exchange Policy and Refund Policy, subject to
                applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                7. How to Request Cancellation
              </h3>
              <p className="text-sm">
                To request cancellation, please contact SABAA as soon as
                possible through:
              </p>
              <ul className="text-sm space-y-1 ml-2">
                <li>
                  📞 <strong>WhatsApp:</strong> 7871900140
                </li>
                <li>
                  📧 <strong>Email:</strong> sabajewelarts@gmail.com
                </li>
              </ul>
              <p className="text-sm">Please provide:</p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>Order ID.</li>
                <li>Customer name.</li>
                <li>Registered mobile number.</li>
                <li>Reason for cancellation, if applicable.</li>
              </ul>
              <p className="text-sm">
                Our team will verify the order status and confirm whether the
                cancellation request can be processed.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                8. No Refund of Advance Payment
              </h3>
              <p className="text-sm">
                Please note that cancellation and refund are two separate
                matters.
              </p>
              <p className="text-sm">
                <strong>Cancellation:</strong> The order may be stopped, where
                possible.
              </p>
              <p className="text-sm">
                <strong>Refund:</strong> The advance amount paid for the order
                is <strong>non-refundable</strong>.
              </p>
              <p className="text-sm">
                Therefore, even if SABAA accepts a cancellation request, the
                advance amount already paid will not be returned, subject to
                applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                9. Customer Responsibility Before Ordering
              </h3>
              <p className="text-sm">
                Before placing an order, customers are requested to carefully
                verify:
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>Product selection</li>
                <li>Product size</li>
                <li>Ring size</li>
                <li>Quantity</li>
                <li>Customization details</li>
                <li>Name/engraving details</li>
                <li>Delivery address</li>
                <li>Contact number</li>
                <li>Order information</li>
              </ul>
              <p className="text-sm">
                Once the order is confirmed and payment is made, cancellation
                may result in the loss of the advance amount.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                10. Orders Cancelled by SABAA
              </h3>
              <p className="text-sm">
                In certain circumstances, SABAA may need to cancel an order due
                to reasons such as:
              </p>
              <ul className="text-sm list-disc list-inside space-y-1 ml-2">
                <li>Product unavailability.</li>
                <li>Pricing or listing errors.</li>
                <li>Technical errors.</li>
                <li>Payment issues.</li>
                <li>Delivery restrictions.</li>
                <li>Suspicious or fraudulent transactions.</li>
                <li>Circumstances beyond our reasonable control.</li>
              </ul>
              <p className="text-sm">
                If SABAA cancels an order, any refund, if applicable, will be
                handled in accordance with applicable law and the circumstances
                of the order.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                11. Exceptional Circumstances
              </h3>
              <p className="text-sm">
                SABAA may review cancellation or refund requests in exceptional
                circumstances.
              </p>
              <p className="text-sm">
                Any such decision will be made after reviewing the specific
                circumstances of the order and applicable legal requirements.
              </p>
              <p className="text-sm">
                Nothing in this policy is intended to exclude or restrict any
                consumer right or remedy that cannot legally be excluded or
                restricted under applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">12. Contact Us</h3>
              <p className="text-sm">
                For cancellation requests or assistance regarding your order,
                please contact us:
              </p>
              <div className="ml-2 space-y-1">
                <p className="text-sm">
                  <strong>SABAA</strong>
                </p>
                <p className="text-sm">
                  📞 <strong>WhatsApp:</strong> 7871900140
                </p>
                <p className="text-sm">
                  📧 <strong>Email:</strong> sabajewelarts@gmail.com
                </p>
              </div>
              <p className="text-sm">
                Please keep your Order ID ready when contacting our customer
                support team.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                13. Changes to This Cancellation Policy
              </h3>
              <p className="text-sm">
                SABAA reserves the right to update or modify this Cancellation
                Policy from time to time.
              </p>
              <p className="text-sm">
                Any changes will be published on this page with the revised
                "Last Updated" date.
              </p>
              <p className="text-sm">
                Customers are encouraged to review this policy before placing an
                order.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <p className="text-xs text-gray-600 text-center">
                © {new Date().getFullYear()} SABAA. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium transition-all"
              style={{ backgroundColor: MAROON, color: "white" }}
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
