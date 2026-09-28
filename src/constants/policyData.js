// Every word of the policy page lives here so the page stays layout-only.
//
// ⚠ The specific numbers below — return window, warranty length, refund
// timelines, the 48-hour damage report — are sensible defaults, NOT facts I
// took from your files. Read them and change them to whatever you actually
// honour before this page goes live. They are all in this one file.


export const POLICY_UPDATED = "Last updated: 26 August 2026";

export const POLICY_SECTIONS = [
  { id: "faq", label: "FAQ" },
  { id: "shipping", label: "Shipping Policy" },
  { id: "returns", label: "Return & Exchange Policy" },
  { id: "cancellation", label: "Cancellation Policy" },
  { id: "refund", label: "Refund Policy" },
  { id: "warranty", label: "Warranty Policy" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "cookies", label: "Cookie Policy" },
];

// Frequently asked questions about Panchaloga metal, customization, care, and orders.
export const POLICY_FAQS = [
  {
    id: "metal-composition",
    q: "What is the metal composition of Panchaloga impon?",
    a: "Panchaloga is composed of Copper, Zinc, Tin, Silver, and Brass. It is a traditional metal alloy used in Indian jewellery craftsmanship.",
  },
  {
    id: "ring-color-fade",
    q: "Do Panchaloga rings color fade or tarnish?",
    a: "It depends on your usage. All rings are delivered with buffing mirror polished finish as raw metal without any coating. After start using, it changes to antique finish and remains antique only with daily usage. If rings are kept on shelves without usage, the copper content starts to tarnish and fade. You can repolish it with vibhuti powder or colgate powder to remove tarnish.",
  },
  {
    id: "chain-color-warranty",
    q: "Do Panchaloga chains have color warranty?",
    a: "All SABAA chains are provided with a 6-month warranty on color. All chains have a micro-coating (unlike rings). So you need to remove them while taking a bath and use gently only. Rough use is not advisable to increase the life of the chain color.",
  },
  {
    id: "customize-ring",
    q: "Can I customize a Panchaloga ring with my name or initials?",
    a: "Yes. Depending on the selected ring design, you can personalize your Panchaloga ring with a name, initials, date, short word, or other suitable engraving.",
  },
  {
    id: "engrave-options",
    q: "What can I engrave on a customized ring?",
    a: "You can typically engrave names, initials, special dates, meaningful words, or short messages. The available character limit may vary depending on the ring size and design.",
  },
  {
    id: "symbol-ring",
    q: "Can I add a symbol or religious design to the ring?",
    a: "Yes, selected customized designs may allow symbols, initials, zodiac signs, religious symbols, or other motifs. Please check the customization options available for the particular product.",
  },
  {
    id: "font-choice",
    q: "Can I choose the font for the engraving?",
    a: "Font options are given on the ordering page for the customization process. SABAA will use an engraving style that provides good visibility and durability while complementing the ring design.",
  },
  {
    id: "customize-details",
    q: "How do I provide my customization details?",
    a: "After selecting the customized ring, enter your required engraving or personalization details in the designated customization field during the ordering process. Select size, fonts, and enamel color in the order pages.",
  },
  {
    id: "ring-size-selection",
    q: "How do I select the correct ring size?",
    a: "Please refer to SABAA's Ring Size Guide before placing your order. Since customized rings are made specifically according to the selected details and size, we recommend checking your ring size carefully before ordering.",
  },
  {
    id: "size-change",
    q: "Can I change the ring size after placing a customized order?",
    a: "Size changes may not be possible once customization or production has started.",
  },
  {
    id: "preview",
    q: "Can I see a preview of my customized ring before production?",
    a: "Preview availability depends on the product and customization option. If a preview is provided, production will proceed after the required confirmation.",
  },
  {
    id: "production-time",
    q: "How long does it take to make a customized Panchaloga ring?",
    a: "Customized rings may require 7-10 days and additional processing time depending on the designs.",
  },
  {
    id: "cancel-customized",
    q: "Can I cancel a customized ring order?",
    a: "Yes, you can cancel the order. However, the advance payment cannot be refunded.",
  },
  {
    id: "return-customized",
    q: "Can I return or exchange a customized Panchaloga ring?",
    a: "There is no return or exchange accepted unless there is any damage on the delivered product. For support contact **sabajewelarts@gmail.com** or WhatsApp: **7871900355**.",
  },
  {
    id: "unique-ring",
    q: "Is every customized Panchaloga ring unique?",
    a: "Yes. Since the ring is personalized according to your selected details, each customized piece has its own individual character.",
  },
  {
    id: "panchaloga-gold",
    q: "Is Panchaloga the same as gold?",
    a: "No. There is no gold content in this ring. Panchaloga is a traditional metal alloy used in Indian jewellery and spiritual craftsmanship. A Panchaloga ring is different from solid gold jewellery and should not be represented as gold jewellery unless specifically stated.",
  },
  {
    id: "engraving-fade",
    q: "Will the engraving fade over time?",
    a: "No. We engrave to the depth and it maintains till the lifetime of usage, depending on friction and care.",
  },
  {
    id: "care-customized",
    q: "How should I care for my customized Panchaloga ring?",
    a: "Use it daily to avoid tarnish. Clean with vibhuthi or colgate powder to polish whenever required.",
  },
  {
    id: "gift-ring",
    q: "Can I order customized Panchaloga rings as gifts?",
    a: "Yes. Customized Panchaloga rings can be a meaningful gift for birthdays, anniversaries, weddings, religious occasions, or other special moments.",
  },
  {
    id: "couple-rings",
    q: "Can I customize rings for couples?",
    a: "Yes, depending on the available designs. You can consider matching rings with names, initials, dates, or complementary engravings for couples.",
  },
  {
    id: "multiple-rings",
    q: "Can I order multiple customized rings with different names?",
    a: "No, limited to 1 item at a time per order.",
  },
  {
    id: "wrong-details",
    q: "What happens if I enter the wrong name or engraving details?",
    a: "Please carefully verify all customization details before placing your order. Once production has started, changes may not be possible. For support contact **sabajewelarts@gmail.com** or WhatsApp: **7871900355**.",
  },
  {
    id: "contact-customization",
    q: "How can I contact SABAA regarding a customized ring?",
    a: "For questions about customization, sizing, design, or an existing order, contact SABAA customer support through our website. For support contact **sabajewelarts@gmail.com** or WhatsApp: **7871900355**. Our team will assist you with the available customization options.",
  },
];

export const POLICY_BLOCKS = [
  {
    id: "shipping",
    eyebrow: "Safe & Secure Delivery",
    title: "Shipping & Delivery Policy",
    intro:
      "At SABAA, we are committed to delivering your jewellery safely, securely, and within the estimated delivery time. This Shipping & Delivery Policy explains how we process, dispatch, and deliver orders placed through the SABAA website. By placing an order on our website, you agree to the terms described in this policy.",
    blocks: [
      {
        id: "order-processing",
        title: "Order Processing",
        body: "Once your order is successfully placed and payment is confirmed, our team will begin processing your order.\nOrders are generally processed within 7–10 business days, unless a different processing time is mentioned on the product page.\nProcessing time may vary depending on:\n• Product availability.\n• Order volume.\n• Product customization.\n• Ring size selection.\n• Special engraving or personalization.\n• Promotional periods and holidays.\nFor customized jewellery, additional processing time may be required because the product is prepared specifically according to your requirements.\nThe estimated processing time for customized products will be communicated on the product page or during the ordering process.",
      },
      {
        id: "shipping-india",
        title: "Shipping Within India",
        body: "SABAA currently ships orders to locations across India, subject to courier service availability.\nOnce your order has been dispatched, it will be handed over to our logistics/courier partner for delivery.\nThe estimated delivery time is generally:\n• Processing Time: 4–4 business days\n• Transit Time: 3–5 business days\nTherefore, most orders may be delivered within approximately 4–10 business days from the date of order confirmation.\nDelivery timelines are estimates and may vary depending on the destination, courier service, weather conditions, public holidays, and other circumstances beyond our control.",
      },
      {
        id: "shipping-charges",
        title: "Shipping Charges",
        body: "Shipping charges, if applicable, will be displayed during checkout before you complete your purchase.\nWe may offer:\n• Free shipping on selected orders.\n• Free shipping above a specified order value.\n• Promotional shipping offers from time to time.\n• Standard shipping charges for orders below the applicable threshold.\nAny applicable shipping charges will be clearly displayed before payment is completed.",
      },
      {
        id: "order-tracking",
        title: "Order Tracking",
        body: "Once your order has been dispatched, we will provide tracking information through the contact details provided during checkout, such as your registered mobile number or email address.\nYou can use the tracking information to monitor the status of your shipment.\nPlease allow some time for the tracking information to become active after the parcel has been handed over to the courier partner.",
      },
      {
        id: "delivery-address",
        title: "Delivery Address",
        body: "Customers are responsible for providing an accurate and complete delivery address at the time of placing an order.\nPlease ensure that the following details are correct:\n• Full name.\n• House/Flat/Building number.\n• Street/Area.\n• City.\n• State.\n• PIN code.\n• Contact telephone number.\nSABAA will not be responsible for delivery delays or failed deliveries caused by incorrect, incomplete, or inaccurate address or contact information provided by the customer.",
      },
      {
        id: "changing-address",
        title: "Changing the Delivery Address",
        body: "If you need to change your delivery address after placing an order, please contact our customer support team as soon as possible.\nAddress changes may be accommodated only if the order has not yet been processed or dispatched.\nOnce an order has been dispatched, we may not be able to change the delivery address.",
      },
      {
        id: "delivery-attempts",
        title: "Delivery Attempts",
        body: "Our courier partner will generally make delivery attempts at the address provided by the customer.\nIf the recipient is unavailable, the courier company may make additional delivery attempts or contact the recipient using the registered phone number.\nIf delivery cannot be completed because of:\n• Customer unavailability.\n• Incorrect address.\n• Incorrect phone number.\n• Refusal to accept the parcel.\n• Inability to contact the recipient.\n• Other circumstances attributable to the recipient,\nthe shipment may be returned to SABAA.\nAny applicable re-shipping charges may be payable by the customer before the order is dispatched again.",
      },
      {
        id: "delayed-deliveries",
        title: "Delayed Deliveries",
        body: "Although we make every reasonable effort to deliver orders within the estimated timeline, delivery delays may occasionally occur due to circumstances beyond our control.\nThese may include:\n• Severe weather conditions.\n• Natural disasters.\n• Transportation disruptions.\n• Courier service delays.\n• Public holidays.\n• Strikes or operational disruptions.\n• Incorrect address information.\n• Remote or difficult-to-reach locations.\n• Government restrictions or regulatory requirements.\n• High order volumes during sales and festive seasons.\n• Other unforeseen circumstances.\nIf your order is significantly delayed, please contact our customer support team with your order number so that we can assist you.",
      },
      {
        id: "remote-locations",
        title: "Delivery to Remote Locations",
        body: "Delivery availability and timelines may vary for remote, rural, or difficult-to-service locations.\nIf our courier partner does not service the address provided, SABAA may contact you to arrange an alternative delivery address or provide another suitable solution.",
      },
      {
        id: "damaged-packages",
        title: "Damaged or Tampered Packages",
        body: "We take appropriate precautions while packing jewellery orders for shipment.\nWhen receiving your package, we recommend checking the outer packaging for visible signs of:\n• Damage.\n• Tampering.\n• Open or broken seals.\n• Missing or altered packaging.\nIf the package appears damaged or tampered with, please take photographs or a video of the package before opening it and contact SABAA customer support as soon as possible.\nFor damaged, missing, or incorrect products, photographic/video evidence may be requested to help us investigate the issue with the courier partner.",
      },
      {
        id: "wrong-missing",
        title: "Wrong or Missing Product",
        body: "If you receive a product that is different from what you ordered, or if any item is missing from your package, please contact us within **48 hours** of delivery.\nPlease provide:\n• Order number.\n• Photographs/videos of the package.\n• Photographs/videos of the product received.\n• Description of the issue.\nOur team will review the issue and provide an appropriate resolution in accordance with our Return & Refund Policy.",
      },
      {
        id: "customized-orders",
        title: "Customized Jewellery Orders",
        body: "Customized products, including personalized Panchaloga rings, engraved rings, name rings, and other personalized jewellery, may require additional production time.\nThe estimated processing period for customized products will be mentioned on the relevant product page or communicated to the customer.\nBecause customized products are made specifically according to the customer's requirements, they may be subject to different cancellation, return, exchange, and refund conditions.\nPlease review our Return & Refund Policy before placing an order for a customized product.",
      },
      {
        id: "sales-seasons",
        title: "Orders During Sales and Festive Seasons",
        body: "During major sales, festivals, special promotions, and peak shopping periods, order processing and delivery may take longer than usual due to increased order volumes.\nAny extended delivery estimates will be communicated on the website or through the relevant order communication where applicable.",
      },
      {
        id: "cod-orders",
        title: "Cash on Delivery Orders",
        body: "If Cash on Delivery (COD) is available for your location and selected product, the applicable COD option will be displayed during checkout.\nCOD availability may vary depending on:\n• Delivery location.\n• Order value.\n• Product category.\n• Courier service availability.\n• Other operational conditions.\nThe customer may be required to provide a valid mobile number for order confirmation.",
      },
      {
        id: "international-shipping",
        title: "International Shipping",
        body: "SABAA may offer international shipping to selected countries.\nInternational shipping availability, charges, delivery timelines, and applicable restrictions may vary depending on the destination country.\nWhere international shipping is available, applicable shipping charges will be displayed during checkout or communicated before order confirmation.\nCustomers are responsible for complying with applicable import regulations in their destination country.",
      },
      {
        id: "customs-duties",
        title: "Customs, Duties and Taxes for International Orders",
        body: "For international shipments, the destination country may impose customs duties, import taxes, local taxes, handling fees, or other charges.\nUnless explicitly stated otherwise at checkout, such charges are generally the responsibility of the customer.\nSABAA does not control the customs regulations, duties, taxes, or clearance procedures of the destination country.\nCustomers are advised to check their country's applicable import requirements before placing an international order.",
      },
      {
        id: "delivery-confirmation",
        title: "Delivery Confirmation",
        body: "An order will generally be considered delivered when the courier partner's tracking system records the shipment as delivered to the address provided by the customer.\nIf you believe an order has been incorrectly marked as delivered but you have not received it, please contact SABAA customer support immediately.\nWe may coordinate with the courier partner to investigate the shipment status.",
      },
      {
        id: "failed-deliveries",
        title: "Failed or Returned Deliveries",
        body: "If a shipment is returned to SABAA because of an incorrect address, repeated delivery failure, refusal to accept the package, or inability to contact the recipient, we may contact the customer regarding re-shipment.\nAdditional shipping charges may apply for re-shipping the order.\nIf the customer does not respond within a reasonable period, the order may be handled in accordance with our applicable cancellation and refund terms.",
      },
      {
        id: "cancellation-dispatch",
        title: "Order Cancellation Before Dispatch",
        body: "If you wish to cancel an order, please contact us as soon as possible.\nCancellation requests can generally be processed only before the order has entered processing, customization, packing, or dispatch.\nOnce an order has been customized or dispatched, cancellation may not be possible.\nFor customized products, cancellation conditions may differ from standard products.\nPlease refer to our Cancellation & Refund Policy for complete details.",
      },
      {
        id: "delivery-not-guaranteed",
        title: "Delivery Estimates Are Not Guaranteed",
        body: "All delivery timelines displayed on the SABAA website are estimated timelines unless expressly stated otherwise.\nDelivery dates may vary due to factors outside SABAA's reasonable control.\nWe will make reasonable efforts to process and dispatch your order within the stated timeframe and to assist with courier-related delays where possible.",
      },
      {
        id: "customer-responsibility",
        title: "Customer Responsibility",
        body: "Customers are responsible for:\n• Providing accurate delivery information.\n• Being available to receive the shipment.\n• Providing a valid contact number.\n• Checking the package upon delivery.\n• Informing SABAA promptly about any delivery-related issue.\n• Following applicable instructions provided by the courier partner.",
      },
      {
        id: "contact-shipping",
        title: "Contact Us",
        body: "If you have any questions regarding your shipment or delivery, please contact SABAA customer support.\nSABAA\n• 📧 Email: **sabajewelarts@gmail.com**\n• 📞 WhatsApp: **7871900355**\n• Website: www.sabaa.in\n• Business Address: SABAA, 54 Gandhinagar, Vilvanagar, Semmandalam, Cuddalore 607001\nWhen contacting us regarding an order, please provide your Order ID so that our team can assist you more quickly.",
      },
      {
        id: "changes-shipping",
        title: "Changes to This Shipping Policy",
        body: "SABAA reserves the right to update or modify this Shipping & Delivery Policy from time to time.\nAny changes will be published on this page with the revised **Last Updated** date.\nWe encourage customers to review this page periodically for the latest information.",
      },
    ],
  },
  {
    id: "returns",
    eyebrow: "No Return and No Exchange",
    title: "Return & Exchange Policy",
    intro:
      "At SABAA, every jewellery piece is carefully inspected and packed before dispatch. To maintain hygiene, quality, and product integrity, we follow a No Return and No Exchange Policy. Please read the following policy carefully before placing your order.",
    blocks: [
      {
        id: "no-return",
        title: "No Return or Exchange",
        body: "SABAA does not accept returns or exchanges for products that have been successfully delivered.\nWe kindly request that you carefully review the following before placing your order:\n• Product design and specifications.\n• Ring size, where applicable.\n• Quantity.\n• Colour or finish, where applicable.\n• Customization details, if applicable.\n• Delivery address.\n• Other product details displayed on the product page.\nOnce an order is placed, please ensure that the selected product and size are correct.\nWe strongly recommend checking our Ring Size Guide before purchasing a ring.",
      },
      {
        id: "customized",
        title: "Customized Products",
        body: "Customized and personalized jewellery is made specifically according to the customer's selected requirements.\nTherefore, customized products cannot be returned or exchanged due to a change of mind, incorrect size selection, incorrect customization details provided by the customer, or any other personal preference.\nCustomers are requested to carefully verify all customization details before completing their order.\nThis may include:\n• Name or initials.\n• Engraving.\n• Date.\n• Size.\n• Design.\n• Other personalization details.",
      },
      {
        id: "damaged",
        title: "Damaged or Incorrect Items",
        body: "Although we take care to inspect and securely pack every order, an item may occasionally be damaged during transit or an incorrect item may be delivered.\nIf you receive:\n• A damaged product.\n• A wrong product.\n• A product different from what you ordered.\n• A missing item from your order.\nplease contact SABAA immediately after delivery.\nFor verification, you must provide a clear, continuous unboxing video without cuts or edits, showing:\n1. The unopened package.\n2. The shipping label.\n3. The process of opening the package.\n4. The product received.\n5. Any visible damage or discrepancy.\nThe unboxing video is required to verify the condition of the package and product at the time of delivery.",
      },
      {
        id: "report",
        title: "How to Report a Damaged or Incorrect Item",
        body: "If you receive a damaged or incorrect item:\nStep 1: Record a clear, continuous unboxing video while opening the package.\nStep 2: Do not discard the original packaging.\nStep 3: Contact us on WhatsApp at **7871900355**.\nStep 4: Share the unboxing video along with your Order ID and a brief description of the issue.\nStep 5: Our team will review the information and verify the issue.\nIf the claim is approved after verification, SABAA may arrange an exchange or another appropriate resolution, depending on the nature of the issue and product availability.",
      },
      {
        id: "video",
        title: "Unboxing Video Requirement",
        body: "The unboxing video is an important part of our verification process.\nThe video should be:\n• Clear and understandable.\n• Continuous from the unopened package to the product being revealed.\n• Without cuts, edits, or interruptions.\n• Showing the shipping label clearly.\n• Showing the condition of the outer package.\n• Showing the product received.\nClaims without the required unboxing video may not be eligible for an exchange or other resolution.",
      },
      {
        id: "time-limit",
        title: "Time Limit for Reporting Issues",
        body: "Any damaged, incorrect, or missing-item claim must be reported within 24 to 48 hours of delivery.\nClaims submitted after the specified period may not be considered.\nWe therefore recommend inspecting your package and product immediately after delivery.",
      },
      {
        id: "approval",
        title: "Exchange Approval",
        body: "An exchange is not automatic.\nAll damaged or incorrect-item claims will be reviewed by our team based on the information and evidence provided.\nIf the claim is approved:\n• We will communicate the next steps.\n• The eligible product may be exchanged subject to availability.\n• Additional instructions regarding the return of the incorrect or damaged item, if required, will be provided by our team.\nThe final resolution will be determined after verification of the claim.",
      },
      {
        id: "not-eligible",
        title: "Cases Not Eligible for Exchange",
        body: "An exchange may not be provided in cases including, but not limited to:\n• Change of mind.\n• Incorrect ring size selected by the customer.\n• Incorrect customization details provided by the customer.\n• Normal signs of wear or usage.\n• Damage caused after delivery.\n• Improper handling or storage.\n• Damage caused by chemicals, perfumes, cosmetics, or cleaning products.\n• Damage caused by accidental impact.\n• Products altered or modified after delivery.\n• Claims submitted without the required unboxing video.\n• Claims submitted after the applicable reporting period.\n• Products that have been used, modified, or damaged by the customer.",
      },
      {
        id: "refund",
        title: "Refunds",
        body: "As SABAA follows a **No Return and No Exchange Policy**, refunds are generally not provided for delivered products.\nIf a product is confirmed by SABAA to have been incorrectly supplied or damaged during transit, the appropriate resolution will be determined after verification.\nWhere a refund is approved in an exceptional case, it will be processed according to the applicable payment method and SABAA's internal processing timelines.",
      },
      {
        id: "availability",
        title: "Product Availability for Exchange",
        body: "If an exchange is approved for an eligible damaged or incorrect item, the replacement will be subject to product availability.\nIf the exact product is unavailable, SABAA may contact the customer to discuss an appropriate alternative resolution.",
      },
      {
        id: "packaging",
        title: "Original Packaging",
        body: "Customers should retain the original product packaging until they have confirmed that the order has been received correctly and without damage.\nOriginal packaging may be required if an exchange or other resolution is approved.",
      },
      {
        id: "note",
        title: "Important Note for Customers",
        body: "Before placing your order, please carefully check:\n• Product\n• Ring Size\n• Quantity\n• Customization Details\n• Delivery Address\n• Contact Number\nOnce your order is placed, changes may not be possible if processing, customization, packing, or dispatch has already begun.",
      },
      {
        id: "contact",
        title: "Contact Us",
        body: "For assistance regarding a damaged or incorrect item, please contact us:\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nWhen contacting us, please include your Order ID and the required unboxing video so that our team can review your request.",
      },
      {
        id: "changes",
        title: "Changes to This Policy",
        body: "SABAA reserves the right to update or modify this Return & Exchange Policy from time to time.\nAny changes will be published on this page with the revised **Last Updated** date.\nCustomers are encouraged to review this policy before placing an order.",
      },
    ],
  },
  {
    id: "cancellation",
    eyebrow: "Order Cancellation",
    title: "Cancellation Policy",
    intro:
      "At SABAA, we begin processing orders after receiving the customer's order confirmation and payment. Customers are requested to carefully review their product selection, size, customization details, and delivery information before placing an order. Please read the following Cancellation Policy carefully before completing your purchase.",
    blocks: [
      {
        id: "order-cancellation",
        title: "Order Cancellation",
        body: "Customers may request cancellation of their order after placing the order, subject to the order's processing status.\nHowever, **any advance amount paid at the time of placing the order is non-refundable.**\nCancellation of an order does not make the customer eligible for a refund of the advance payment.",
      },
      {
        id: "cancellation-advance",
        title: "Cancellation After Advance Payment",
        body: "If you place an order by paying an advance amount and later decide to cancel the order, you may request cancellation.\nHowever:\n• The advance amount already paid will not be refunded.\n• This applies even if the order has not yet been dispatched, subject to applicable law.\nWe therefore recommend confirming all order details carefully before making payment.",
      },
      {
        id: "customized-cancel",
        title: "Customized Orders",
        body: "Customized and personalized jewellery may be processed specifically according to the customer's requirements.\nExamples include:\n• Customized Panchaloga rings.\n• Name or initial engraving.\n• Personalized text.\n• Customized designs.\n• Special sizes.\n• Made-to-order jewellery.\nOnce customization or production has started, cancellation may not be possible.\nIn all cases, any advance amount paid for a customized order is **non-refundable**, subject to applicable law.",
      },
      {
        id: "cancellation-processing",
        title: "Cancellation After Order Processing Has Started",
        body: "Once an order has entered any of the following stages:\n• Processing.\n• Customization.\n• Production.\n• Quality checking.\n• Packing.\n• Dispatch.\ncancellation may not be possible.\nIf cancellation is accepted at this stage, the advance amount already paid will remain non-refundable.",
      },
      {
        id: "cancellation-before",
        title: "Cancellation Before Dispatch",
        body: "You may contact SABAA to request cancellation before your order is dispatched.\nOur team will check the current status of your order.\nIf cancellation is possible, the order will be cancelled; however, **the advance payment will not be refunded.**",
      },
      {
        id: "cancellation-after",
        title: "Cancellation After Dispatch",
        body: "Once an order has been dispatched, it cannot normally be cancelled through SABAA.\nIf you no longer wish to receive the shipment, please contact our customer support team immediately.\nRefusing or failing to accept a shipment does not automatically entitle the customer to a refund.\nAny applicable resolution will be handled in accordance with SABAA's **Return & Exchange Policy and Refund Policy**, subject to applicable law.",
      },
      {
        id: "request-cancellation",
        title: "How to Request Cancellation",
        body: "To request cancellation, please contact SABAA as soon as possible through:\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nPlease provide:\n• Order ID.\n• Customer name.\n• Registered mobile number.\n• Reason for cancellation, if applicable.\nOur team will verify the order status and confirm whether the cancellation request can be processed.",
      },
      {
        id: "no-refund-advance",
        title: "No Refund of Advance Payment",
        body: "Please note that cancellation and refund are two separate matters.\n• **Cancellation:** The order may be stopped, where possible.\n• **Refund:** The advance amount paid for the order is **non-refundable**.\nTherefore, even if SABAA accepts a cancellation request, the advance amount already paid will not be returned, subject to applicable law.",
      },
      {
        id: "customer-before",
        title: "Customer Responsibility Before Ordering",
        body: "Before placing an order, customers are requested to carefully verify:\n• Product selection\n• Product size\n• Ring size\n• Quantity\n• Customization details\n• Name/engraving details\n• Delivery address\n• Contact number\n• Order information\nOnce the order is confirmed and payment is made, cancellation may result in the loss of the advance amount.",
      },
      {
        id: "cancelled-by-sabaa",
        title: "Orders Cancelled by SABAA",
        body: "In certain circumstances, SABAA may need to cancel an order due to reasons such as:\n• Product unavailability.\n• Pricing or listing errors.\n• Technical errors.\n• Payment issues.\n• Delivery restrictions.\n• Suspicious or fraudulent transactions.\n• Circumstances beyond our reasonable control.\nIf SABAA cancels an order, any refund, if applicable, will be handled in accordance with applicable law and the circumstances of the order.",
      },
      {
        id: "exceptional-circumstances",
        title: "Exceptional Circumstances",
        body: "SABAA may review cancellation or refund requests in exceptional circumstances.\nAny such decision will be made after reviewing the specific circumstances of the order and applicable legal requirements.\nNothing in this policy is intended to exclude or restrict any consumer right or remedy that cannot legally be excluded or restricted under applicable law.",
      },
      {
        id: "contact-cancellation",
        title: "Contact Us",
        body: "For cancellation requests or assistance regarding your order, please contact us:\nSABAA\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nPlease keep your **Order ID** ready when contacting our customer support team.",
      },
      {
        id: "changes-cancellation",
        title: "Changes to This Cancellation Policy",
        body: "SABAA reserves the right to update or modify this Cancellation Policy from time to time.\nAny changes will be published on this page with the revised **Last Updated** date.\nCustomers are encouraged to review this policy before placing an order.",
      },
    ],
  },
  {
    id: "refund",
    eyebrow: "Refund Terms",
    title: "Refund Policy",
    intro:
      "At SABAA, we carefully process, inspect, and pack every jewellery order before dispatch. As our products are specially handled and prepared for customers, we follow the refund terms outlined below. Please read this Refund Policy carefully before placing an order.",
    blocks: [
      {
        id: "no-refund",
        title: "No Refund Policy",
        body: "**SABAA does not provide refunds for advance payments or for products after they have been successfully delivered.**\nOnce an order is confirmed and an advance/payment has been received, the amount paid is **non-refundable**, except where a refund is specifically approved by SABAA in accordance with applicable law and the terms of this policy.\nSimilarly, once a product has been delivered to the customer, no refund will be provided for reasons including:\n• Change of mind.\n• Personal preference.\n• Incorrect product selection.\n• Incorrect ring size selected by the customer.\n• Failure to check product details before ordering.\n• Customization details incorrectly provided by the customer.\n• Product no longer required.\n• Product not meeting personal expectations where the product supplied matches the order.\nCustomers are therefore requested to carefully verify all product details before completing their purchase.",
      },
      {
        id: "advance-non-refund",
        title: "Advance Payments Are Non-Refundable",
        body: "Any advance amount paid toward an order is **non-refundable**.\nThis includes advance payments made for:\n• Product orders.\n• Customized jewellery.\n• Personalized rings.\n• Engraved products.\n• Special orders.\n• Made-to-order products.\n• Other products or services where an advance payment has been requested.\nOnce the order has been confirmed, the advance amount cannot be claimed back due to a change of mind or cancellation by the customer.",
      },
      {
        id: "no-refund-delivery",
        title: "No Refund After Product Delivery",
        body: "Once an order has been delivered successfully, SABAA does not accept refund requests.\nCustomers are advised to inspect the product immediately upon delivery.\nIf the product received is damaged or incorrect, please follow the procedure described in our **Return & Exchange Policy**.",
      },
      {
        id: "damaged-incorrect",
        title: "Damaged or Incorrect Products",
        body: "If you receive a product that is damaged or different from the product you ordered, please contact SABAA immediately.\nFor verification, you are required to provide a **clear, continuous unboxing video without cuts or edits.**\nThe video should clearly show:\n1. The unopened package.\n2. The shipping label.\n3. The complete opening of the package.\n4. The product received.\n5. Any damage or discrepancy.\nPlease retain the original packaging until the issue has been resolved.\nAfter reviewing the evidence, SABAA will determine whether the claim qualifies for an exchange or another appropriate resolution.\n**A refund is not automatically applicable even when a damaged or incorrect item is reported.**",
      },
      {
        id: "customized-refund",
        title: "Customized and Personalized Products",
        body: "Customized products are prepared according to the customer's specific requirements.\nThese may include:\n• Name engraving.\n• Initials.\n• Dates.\n• Personalized text.\n• Customized designs.\n• Customized ring sizes.\n• Other personalization requests.\nAdvance payments for customized products are **non-refundable**, and customized products are not eligible for refunds after delivery.\nCustomers must carefully verify all customization information before confirming the order.",
      },
      {
        id: "size-refund",
        title: "Incorrect Size Selected by Customer",
        body: "Customers are responsible for selecting the correct size before placing an order.\nAn incorrect ring size selected by the customer does not qualify for a refund.\nPlease refer to the SABAA Ring Size Guide before placing a ring order.\nFor customized rings, size changes may not be possible after production has started.",
      },
      {
        id: "cancellation-refund",
        title: "Cancellation and Refund",
        body: "If you wish to cancel an order, please contact SABAA as soon as possible.\nCancellation may not be possible once the order has entered processing, customization, packing, or dispatch.\nAny advance amount already paid remains **non-refundable**, subject to applicable law.\nFor complete information about cancellations, please refer to our applicable **Cancellation & Refund Policy** or contact our customer support team.",
      },
      {
        id: "exceptional-refund",
        title: "Refunds for Exceptional Circumstances",
        body: "In exceptional circumstances, SABAA may determine that a refund is appropriate after reviewing the specific circumstances of an order.\nAny such refund will be subject to:\n• Verification of the issue.\n• The applicable product and order terms.\n• Payment-method restrictions.\n• Applicable law.\n• SABAA's approval.\nAn exceptional refund approved by SABAA does not create an obligation to provide refunds in other cases.",
      },
      {
        id: "payment-issues",
        title: "Payment Processing Issues",
        body: "If an amount has been deducted from your bank account, card, UPI, or other payment method but the order was not successfully created or confirmed, please contact us with the relevant transaction details.\nWe will verify the payment status and coordinate with the applicable payment service provider where necessary.\nAny reversal or refund in such cases will be subject to payment-provider processing and applicable banking timelines.",
      },
      {
        id: "duplicate-payments",
        title: "Duplicate Payments",
        body: "If you believe that you have accidentally made a duplicate payment for the same order, please contact SABAA immediately.\nOur team will verify the transaction and determine the appropriate resolution after confirming the payment status.",
      },
      {
        id: "refund-processing",
        title: "Refund Processing Time",
        body: "Where a refund is specifically approved by SABAA, the processing time may depend on:\n• Payment method.\n• Bank or financial institution.\n• Payment gateway.\n• Transaction verification.\n• Other payment-processing requirements.\nThe amount may take additional time to appear in the customer's account after SABAA initiates the refund.",
      },
      {
        id: "original-method",
        title: "Refund to Original Payment Method",
        body: "Where applicable, approved refunds will generally be processed through the original payment method used to place the order.\nSABAA may request additional information where necessary to verify the transaction and process the refund securely.",
      },
      {
        id: "fraudulent",
        title: "Fraudulent or Unauthorized Transactions",
        body: "SABAA reserves the right to investigate transactions that appear fraudulent, unauthorized, suspicious, or inconsistent with our terms.\nWhere necessary, we may delay processing, cancel an order, or take other appropriate action in accordance with applicable law and payment-provider requirements.",
      },
      {
        id: "customer-refund-responsibility",
        title: "Customer Responsibility",
        body: "Before placing an order, customers are responsible for carefully checking:\n• Product name and design.\n• Product description.\n• Ring size.\n• Quantity.\n• Customization details.\n• Delivery address.\n• Contact number.\n• Order details.\nOnce the order is confirmed, changes or cancellations may not be possible.",
      },
      {
        id: "contact-refund",
        title: "Contact Us",
        body: "If you have any questions regarding our Refund Policy or your order, please contact SABAA:\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nWhen contacting us regarding an order, please provide your **Order ID** so our team can assist you efficiently.",
      },
      {
        id: "changes-refund",
        title: "Changes to This Refund Policy",
        body: "SABAA reserves the right to update or modify this Refund Policy from time to time.\nAny changes will be published on this page with the revised **Last Updated** date.\nCustomers are encouraged to review this policy before placing an order.",
      },
    ],
  },
  {
    id: "warranty",
    eyebrow: "Quality & Craftsmanship",
    title: "Warranty Policy",
    intro:
      "At SABAA, we take pride in the quality and craftsmanship of our Panchaloga jewellery. Our products are made using different finishing and coating processes depending on the product category. Therefore, warranty coverage and durability may vary between Panchaloga rings and Panchaloga chains. Please read the following Warranty Policy carefully before purchasing.",
    blocks: [
      {
        id: "panchaloga-ring",
        title: "Panchaloga Ring – Lifetime Colour Guarantee",
        body: "SABAA Panchaloga rings are made from **raw Panchaloga metal without an external colour coating.**\nBecause the ring does not depend on a surface coating for its antique appearance, the antique colour is designed to be long-lasting and comes with a **lifetime colour guarantee** under **normal daily use**.\n**What the Lifetime Colour Guarantee Covers:**\n• Applies when the ring is used under normal and reasonable daily-use conditions.\n• Covers premature or significant colour changes under normal daily wear.\nNote: The natural appearance of Panchaloga metal may vary slightly depending on individual usage and environmental conditions.",
      },
      {
        id: "body-heat",
        title: "Body Heat and Natural Colour Changes",
        body: "Panchaloga is a natural metal alloy, and its surface appearance can interact differently with individual skin conditions.\nIn rare cases, some customers may notice a **greenish or darker colour developing on the inside of the ring**, particularly where the ring remains in continuous contact with the skin.\nThis can be influenced by factors such as:\n• Individual body chemistry.\n• Body heat.\n• Sweat and perspiration.\n• Skin moisture.\n• Natural oils on the skin.\n• Environmental conditions.\n• Prolonged continuous contact with the skin.\nThis is a **rare occurrence** and may vary from person to person.\nA greenish or darker inner surface does not necessarily indicate that the ring is defective.\nThe frequency of this occurrence may be uncommon; individual experiences can vary.",
      },
      {
        id: "ring-care",
        title: "Panchaloga Ring – Normal Wear and Care",
        body: "Although Panchaloga rings are designed for everyday use, proper care can help maintain their appearance.\nWe recommend:\n• Keep the ring clean and dry.\n• Avoid prolonged exposure to chemicals.\n• Remove the ring when using strong cleaning products.\n• Avoid direct contact with perfumes and cosmetic products where possible.\n• Wipe the ring gently with a soft, dry cloth.\n• Store the ring in a dry place when not in use.\nThe lifetime colour guarantee applies to **normal daily use** and does not cover damage caused by misuse, chemical exposure, physical damage, or improper handling.",
      },
      {
        id: "chain-warranty",
        title: "Panchaloga Chain & other jewellery – 6-Month Colour Warranty",
        body: "SABAA Panchaloga chains, pendants, earrings and other jewels are finished with a **micro-coating** to provide their intended appearance and finish.\nBecause the chain has a surface coating, its durability depends on how the jewellery is used and maintained.\n**Warranty Coverage:**\nSABAA provides a **6-month colour warranty** for Panchaloga chains under fair and **normal daily use**.",
      },
      {
        id: "chain-conditions",
        title: "Conditions for Panchaloga Chain, earrings & pendants Warranty",
        body: "The 6-month warranty applies when the chain is used carefully and under reasonable everyday conditions.\nTo help protect the coating, customers should:\n• Avoid rough or heavy use.\n• Remove the chain while bathing.\n• Avoid prolonged exposure to water.\n• Avoid contact with perfumes and cosmetics.\n• Avoid swimming while wearing the chain.\n• Avoid contact with soaps, shampoos, detergents, and cleaning chemicals.\n• Avoid unnecessary friction or scratching.\n• Store the chain safely when not in use.",
      },
      {
        id: "chain-fading",
        title: "Chain and jewel Colour Fading Within 6 Months",
        body: "If the colour of a Panchaloga chain **fades before** **six months** under fair and **normal daily use**, the product may be eligible for a warranty replacement.\n**Eligibility and Verification:**\nWarranty eligibility will be determined after inspection and verification by SABAA.\n**If Approved:**\nIf approved, SABAA may provide a **replacement chain**, subject to product availability and the terms of this Warranty Policy.",
      },
      {
        id: "not-covered",
        title: "What Is Not Covered Under Chain and jewel Warranty?",
        body: "The 6-month colour warranty does not cover colour changes or damage resulting from:\n• Rough or heavy usage.\n• Wearing the chain while bathing.\n• Swimming or prolonged water exposure.\n• Excessive sweating or prolonged moisture.\n• Perfume or cosmetic exposure.\n• Soap, shampoo, detergent, or chemical exposure.\n• Scratches or physical damage.\n• Improper handling.\n• Accidental damage.\n• Unauthorized alteration or modification.\n• Normal signs of wear caused by usage.\nThe warranty specifically relates to **colour/finish performance under fair use** and does not cover physical damage to the jewellery.",
      },
      {
        id: "replacement-process",
        title: "Warranty Replacement Process",
        body: "If you believe your Panchaloga chain qualifies for warranty replacement, please contact SABAA with your:\n• **Order ID**\n• Customer name\n• Registered mobile number\n• Clear photographs/videos of the product\n• Description of the issue\nOur team may request additional information or photographs/videos to assess the condition of the jewellery.\nAfter verification, SABAA will confirm whether the product qualifies for warranty replacement.",
      },
      {
        id: "claim-approval",
        title: "Warranty Claim Approval",
        body: "A warranty claim is subject to verification by the SABAA team.\nSubmitting a warranty request does not automatically guarantee approval.\nWe may assess:\n• Product condition.\n• Date of purchase.\n• Order details.\n• Nature of colour change.\n• Usage conditions.\n• Signs of water, chemical, or cosmetic exposure.\n• Physical damage.\n• Compliance with the recommended care instructions.\nThe final warranty decision will be communicated after the assessment.",
      },
      {
        id: "proof-purchase",
        title: "Proof of Purchase",
        body: "A valid **Order ID** is required to process a warranty claim.\nCustomers are requested to retain their order confirmation, invoice, or other purchase information for future reference.\nWarranty claims without sufficient order information may require additional verification.",
      },
      {
        id: "warranty-period",
        title: "Warranty Period",
        body: "Panchaloga Ring:\n• **Lifetime colour guarantee** under **normal daily use**, subject to the terms and conditions of this policy.\nPanchaloga Chain:\n• **6-month colour warranty** under fair and **normal daily use**.\n**When the Warranty Begins:**\nThe applicable warranty period begins from the date of **purchase/order confirmation** unless otherwise specified on the relevant product page.",
      },
      {
        id: "warranty-separate",
        title: "Warranty Is Not a Return or Refund Policy",
        body: "This Warranty Policy is **separate** from SABAA's **Return & Exchange Policy** and **Refund Policy**.\n**What This Warranty Does NOT Provide:**\n• A general right to return a product.\n• A general right to request a refund.\n**For More Information:**\nPlease refer to our respective policies for information regarding returns, exchanges, refunds, and cancellations.",
      },
      {
        id: "customer-notice",
        title: "Important Customer Notice",
        body: "Before purchasing Panchaloga jewellery, please understand that **metal appearance can naturally vary** based on:\n• Usage\n• Skin contact\n• Body chemistry\n• Moisture\n• Environmental conditions\n**Panchaloga Chains:**\nThe **micro-coating** requires proper care to maintain its appearance.\n**Panchaloga Rings:**\nThe **lifetime colour guarantee** applies to **normal daily use**, but individual skin and body conditions may occasionally cause changes in the inner surface of the ring.",
      },
      {
        id: "contact-warranty",
        title: "Contact Us for Warranty Claims",
        body: "For warranty assistance, please contact SABAA with your **Order ID**.\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nOur customer support team will review your request and guide you through the warranty process.",
      },
      {
        id: "changes-warranty",
        title: "Changes to This Warranty Policy",
        body: "SABAA reserves the right to update or modify this Warranty Policy from time to time.\nAny changes will be published on this page with the revised **Last Updated** date.\nCustomers are encouraged to review the Warranty Policy before purchasing SABAA jewellery.",
      },
    ],
  },
  {
    id: "privacy",
    eyebrow: "Your information",
    title: "Privacy Policy",
    intro:
      "We collect what we need to make your jewellery and get it to you, and nothing beyond that. We do not sell your data.",
    blocks: [
      {
        id: "collect",
        title: "What we collect",
        body: "Your name, delivery address, phone number and email; your order and payment status; and anything you send us for a customized piece — photographs, fingerprints, voice recordings or artwork.",
      },
      {
        id: "why",
        title: "Why we collect it",
        body: "To make the piece you ordered, to deliver it, to handle returns and warranty claims, and to reply when you contact us. We use your number to send order and dispatch updates.",
      },
      {
        id: "custom",
        title: "Your design files",
        body: "Photographs, voice recordings and fingerprint scans you send for engraving are treated as personal and confidential. We use them only to produce your piece, and we do not publish them or use them in our marketing without asking you first.",
      },
      {
        id: "share",
        title: "Who we share it with",
        body: "Only with the parties who make delivery possible — the courier handling your parcel and the payment gateway processing your payment — and with authorities where the law requires it.",
      },
      {
        id: "rights",
        title: "Access and deletion",
        body: "Write to sabaajewelarts@gmail.com to see what we hold about you, correct it, or ask us to delete it. We keep order and invoice records for as long as tax and accounting law requires.",
      },
      {
        id: "security",
        title: "Security",
        body: "Payment card details are handled by the payment gateway and never stored on our systems. Access to customer records is limited to the people who need it to fulfil your order.",
      },
    ],
  },
  {
    id: "terms",
    eyebrow: "Legal Agreement",
    title: "Terms & Conditions",
    intro:
      "Welcome to SABAA. These Terms & Conditions govern your access to and use of the SABAA website and the purchase of products through our Website. By accessing our Website, browsing our products, creating an account, or placing an order, you agree to be bound by these Terms & Conditions. Please read them carefully before using our Website or placing an order. If you do not agree with these Terms & Conditions, please do not use our Website.",
    blocks: [
      {
        id: "about-sabaa",
        title: "About SABAA",
        body: "SABAA is a jewellery brand offering Panchaloga/Impon jewellery and other jewellery products through our online platform.\nThese Terms & Conditions apply to all visitors, customers, and users of the SABAA Website.\nFor the purposes of these Terms:\n• \"SABAA,\" \"we,\" \"us,\" or \"our\" refers to SABAA.\n• \"Customer,\" \"you,\" or \"your\" refers to any person accessing the Website or purchasing products from SABAA.\n• \"Website\" refers to the SABAA website and its related pages, services, and online shopping facilities.\n• \"Product\" refers to jewellery and other products displayed or sold through the Website.",
      },
      {
        id: "eligibility",
        title: "Eligibility",
        body: "By using the SABAA Website or placing an order, you confirm that:\n• The information you provide is accurate and complete.\n• You have the legal capacity to enter into a purchase transaction.\n• You will use the Website only for lawful purposes.\n• You will not misuse or attempt to interfere with the Website or its services.\nIf you are purchasing a product on behalf of another person, you confirm that you are authorized to provide the required information and complete the purchase.",
      },
      {
        id: "website-info",
        title: "Website Information",
        body: "We make reasonable efforts to ensure that the information displayed on our Website is accurate and up to date.\nHowever, there may occasionally be:\n• Typographical errors.\n• Product information errors.\n• Pricing errors.\n• Image variations.\n• Availability changes.\n• Technical errors.\n• Display differences between devices.\nSABAA reserves the right to correct errors, update information, or modify product details when necessary.",
      },
      {
        id: "product-images",
        title: "Product Images and Appearance",
        body: "We make reasonable efforts to display product images as accurately as possible.\nHowever, the actual appearance of a product may vary slightly depending on:\n• Screen settings.\n• Display resolution.\n• Lighting conditions.\n• Photography.\n• Natural variations in metal.\n• Product finishing.\nSuch minor variations do not necessarily indicate a product defect.",
      },
      {
        id: "panchaloga",
        title: "Panchaloga Jewellery",
        body: "Panchaloga/Impon jewellery is made using metal alloys traditionally associated with Indian jewellery craftsmanship.\nThe appearance of Panchaloga jewellery may naturally vary depending on factors such as:\n• Usage.\n• Skin contact.\n• Body chemistry.\n• Moisture.\n• Sweat.\n• Environmental conditions.\n• Exposure to chemicals.\nCustomers are encouraged to read the applicable **Warranty Policy** and product-care instructions before purchasing.",
      },
      {
        id: "availability",
        title: "Product Availability",
        body: "All products displayed on the Website are **subject to availability**.\nSABAA may:\n• Limit the quantity available for purchase.\n• Discontinue a product.\n• Change product specifications.\n• Remove a product from the Website.\n• Temporarily make a product unavailable.\nIf a product becomes unavailable after an order has been placed, SABAA will contact the customer and provide an appropriate resolution in accordance with applicable law and the circumstances of the order.",
      },
      {
        id: "pricing-terms",
        title: "Product Prices",
        body: "All product prices displayed on the Website are **subject to change** without prior notice.\nThe price applicable to your order will generally be the price displayed at the time the order is successfully placed, subject to correction of any obvious pricing or technical errors.\nApplicable taxes, shipping charges, or other charges, if any, will be displayed during checkout where applicable.",
      },
      {
        id: "orders-terms",
        title: "Orders",
        body: "When you place an order through the SABAA Website, you are making a request to purchase the selected product.\nAn order may be subject to:\n• Product availability.\n• Payment confirmation.\n• Address verification.\n• Fraud and security checks.\n• Other operational requirements.\nSABAA reserves the right to refuse or cancel an order in appropriate circumstances, including where there is a genuine technical, pricing, payment, availability, or security issue.",
      },
      {
        id: "order-confirmation",
        title: "Order Confirmation",
        body: "After successfully placing an order, you may receive an order confirmation through email, SMS, WhatsApp, or another available communication channel.\nAn order confirmation does not necessarily guarantee that the product will be available if an unexpected inventory or technical issue occurs.\nIf an order cannot be fulfilled, SABAA will contact the customer and provide an appropriate resolution in accordance with applicable law.",
      },
      {
        id: "customer-info",
        title: "Customer Information",
        body: "Customers are responsible for providing **accurate information** when placing an order.\nThis includes:\n• Full name.\n• Mobile number.\n• Email address.\n• Delivery address.\n• PIN code.\n• Product selection.\n• Ring size.\n• Customization details.\n• Other information required to complete the order.\nSABAA will not be responsible for delivery problems caused by incorrect or incomplete information provided by the customer.\nPlease refer to our **Privacy Policy** for information about how personal information is collected and used.",
      },
      {
        id: "ring-size-terms",
        title: "Ring Size",
        body: "Customers are responsible for selecting the **correct ring size** before placing an order.\nWe strongly recommend referring to the SABAA **Ring Size Guide** before completing your purchase.\nAn incorrect ring size selected by the customer does not automatically qualify for a return, exchange, or refund.\nCustomized rings may have additional restrictions because they are made according to the customer's specifications.",
      },
      {
        id: "customized-terms",
        title: "Customized and Personalized Products",
        body: "Certain SABAA products may be customized according to customer requirements.\nCustomization may include:\n• Names.\n• Initials.\n• Dates.\n• Engravings.\n• Personalized text.\n• Special designs.\n• Selected sizes.\nCustomers are responsible for carefully checking all customization information before submitting an order.\nOnce customization or production has started, changes or cancellation may not be possible.\nCustomized products are subject to SABAA's **Return & Exchange Policy**, **Refund Policy**, **Cancellation Policy**, and **Warranty Policy**, as applicable.",
      },
      {
        id: "advance-payment",
        title: "Advance Payment",
        body: "Certain products or orders may require full or partial advance payment.\nOnce an advance payment has been made, the amount paid is generally **non-refundable**, subject to applicable law and the terms of the applicable policy.\nCustomers should carefully verify product details, size, customization, quantity, and delivery information before making payment.",
      },
      {
        id: "payment-terms",
        title: "Payment",
        body: "SABAA may provide different payment methods through third-party payment service providers.\nAvailable payment methods may include, depending on availability:\n• Credit cards.\n• Debit cards.\n• UPI.\n• Net banking.\n• Wallets.\n• Cash on Delivery.\n• Other payment methods displayed during checkout.\nPayment transactions may be subject to the terms and privacy policies of the applicable payment service provider.\nSABAA does not generally store complete card details or payment PINs on its own systems.",
      },
      {
        id: "cancellation-terms",
        title: "Cancellation",
        body: "Customers may request cancellation after placing an order, subject to the order's processing status.\nHowever, **any advance amount already paid is non-refundable,** subject to applicable law.\nOnce an order has entered processing, customization, production, packing, or dispatch, cancellation may not be possible.\nPlease refer to our **Cancellation Policy** for complete details.",
      },
      {
        id: "shipping-delivery",
        title: "Shipping and Delivery",
        body: "SABAA will make reasonable efforts to process and dispatch orders within the estimated timeframe displayed on the Website.\nDelivery times may vary depending on:\n• Delivery location.\n• Courier availability.\n• Weather.\n• Public holidays.\n• Logistics disruptions.\n• Peak shopping periods.\n• Incorrect address information.\n• Other circumstances beyond our reasonable control.\nPlease refer to our **Shipping & Delivery Policy** for complete information.",
      },
      {
        id: "no-return-exchange",
        title: "No Return and No Exchange",
        body: "SABAA follows a **No Return and No Exchange Policy**, except where SABAA determines that an eligible damaged or incorrect product qualifies for an exchange after verification, subject to applicable law.\nCustomers should carefully check:\n• Product.\n• Size.\n• Quantity.\n• Customization.\n• Delivery address.\nbefore placing an order.\nPlease refer to our **Return & Exchange Policy** for complete details.",
      },
      {
        id: "refunds-terms",
        title: "Refunds",
        body: "SABAA generally does not provide refunds for:\n• Advance payments.\n• Change of mind.\n• Incorrect product selection.\n• Incorrect ring size selected by the customer.\n• Incorrect customization details provided by the customer.\n• Products successfully delivered in accordance with the order.\nAny exceptional refund will be subject to verification, applicable law, and SABAA's **Refund Policy**.\nPlease refer to our **Refund Policy** for complete details.",
      },
      {
        id: "warranty-terms",
        title: "Warranty",
        body: "Certain SABAA products may be covered by a specific warranty.\nThe applicable warranty depends on the product category and the terms stated in our **Warranty Policy**.\nFor example, Panchaloga rings and Panchaloga chains may have different warranty conditions because they use different finishing processes.\nWarranty claims require appropriate verification and may require the customer to provide an **Order ID**, photographs, videos, or other relevant information.",
      },
      {
        id: "product-care",
        title: "Product Care",
        body: "Customers are responsible for following the recommended care instructions for their jewellery.\nDepending on the product, customers may be advised to avoid:\n• Harsh chemicals.\n• Perfumes.\n• Cosmetics.\n• Cleaning agents.\n• Prolonged exposure to water.\n• Swimming while wearing jewellery.\n• Rough handling.\n• Excessive friction.\nFailure to follow recommended care instructions may affect product appearance and warranty eligibility.",
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        body: "All content available on the SABAA Website, including but not limited to:\n• Logos.\n• Brand names.\n• Product photographs.\n• Product descriptions.\n• Graphics.\n• Website design.\n• Text.\n• Videos.\n• Illustrations.\n• Marketing content.\nis owned by or licensed to SABAA and may be protected by applicable intellectual-property laws.\nYou may not copy, reproduce, modify, distribute, publish, sell, or commercially exploit our content without prior written permission.",
      },
      {
        id: "prohibited-use",
        title: "Prohibited Use",
        body: "You agree not to use the SABAA Website to:\n• Commit or facilitate unlawful activity.\n• Attempt unauthorized access.\n• Introduce malicious software.\n• Interfere with website operations.\n• Copy or scrape website content for unauthorized commercial purposes.\n• Misrepresent your identity.\n• Submit fraudulent orders.\n• Abuse promotional offers.\n• Attempt to bypass website security.\n• Use automated systems in a manner that disrupts our Website.\nSABAA may take appropriate action against misuse of the Website, subject to applicable law.",
      },
      {
        id: "user-content",
        title: "Customer Reviews and User Content",
        body: "If the Website allows customers to submit reviews, photographs, comments, or other content, you agree that:\n• The information submitted should be truthful and lawful.\n• You should not submit content that infringes another person's rights.\n• You should not submit abusive, defamatory, fraudulent, or unlawful content.\n• You should not include unnecessary personal or sensitive information.\nBy submitting content, you grant SABAA permission to use, reproduce, display, and publish the submitted content for legitimate business and marketing purposes, subject to applicable law and our **Privacy Policy**.",
      },
      {
        id: "third-party",
        title: "Third-Party Links and Services",
        body: "Our Website may contain links to third-party websites or use third-party services, including payment gateways, courier services, analytics providers, social media platforms, and other service providers.\nSABAA does not control third-party websites and is not responsible for their content, availability, privacy practices, or terms.\nCustomers should review the applicable third-party terms and privacy policies before using those services.",
      },
      {
        id: "website-availability",
        title: "Website Availability",
        body: "We aim to keep the SABAA Website available and functioning properly.\nHowever, we do not guarantee that the Website will always be:\n• Available without interruption.\n• Free from technical errors.\n• Free from bugs.\n• Free from security vulnerabilities.\n• Compatible with every device or browser.\nThe Website may occasionally be unavailable due to maintenance, technical problems, updates, or circumstances beyond our reasonable control.",
      },
      {
        id: "limitation-liability",
        title: "Limitation of Liability",
        body: "To the extent permitted by applicable law, SABAA will not be responsible for losses arising from circumstances beyond our reasonable control.\nThis may include:\n• Courier delays.\n• Internet or network failures.\n• Payment gateway failures.\n• Natural disasters.\n• Government restrictions.\n• Technical disruptions.\n• Unauthorized third-party actions.\nNothing in these Terms & Conditions is intended to exclude or restrict any liability or consumer right that cannot legally be excluded or restricted.",
      },
      {
        id: "force-majeure",
        title: "Force Majeure",
        body: "SABAA will not be responsible for delays or failures caused by circumstances beyond our reasonable control, including:\n• Natural disasters.\n• Floods.\n• Fire.\n• Severe weather.\n• Epidemics or pandemics.\n• Strikes.\n• Transportation disruptions.\n• Government restrictions.\n• War or civil disturbances.\n• Internet or infrastructure failures.\n• Other unforeseen events.\nWhere possible, we will take reasonable steps to minimize the impact on customers.",
      },
      {
        id: "privacy-terms",
        title: "Privacy",
        body: "Your use of the SABAA Website is also subject to our **Privacy Policy**.\nPlease review the **Privacy Policy** to understand how we collect, use, store, and protect personal information.",
      },
      {
        id: "cookies-terms",
        title: "Cookies",
        body: "SABAA may use cookies and similar technologies to operate and improve the Website, understand visitor activity, provide functionality, and support marketing where applicable.\nPlease refer to our **Cookie Policy** for more information.",
      },
      {
        id: "governing-law",
        title: "Governing Law",
        body: "These Terms & Conditions shall be governed by and interpreted in accordance with the applicable laws of India, unless otherwise required by applicable law.\nAny dispute will be subject to the jurisdiction of the courts having appropriate jurisdiction over SABAA's applicable place of business, subject to applicable law.",
      },
      {
        id: "consumer-rights",
        title: "Consumer Rights",
        body: "Nothing in these Terms & Conditions is intended to remove, restrict, or limit any consumer right or legal remedy that cannot lawfully be excluded or restricted under applicable law.\nWhere any provision of these Terms conflicts with a mandatory requirement of applicable law, the applicable legal requirement will prevail to the extent of that conflict.",
      },
      {
        id: "changes-terms",
        title: "Changes to These Terms & Conditions",
        body: "SABAA may update these Terms & Conditions from time to time.\nChanges may be made to reflect:\n• New products or services.\n• Changes to our business.\n• Changes to our policies.\n• Website updates.\n• Changes in applicable laws or regulations.\nThe revised Terms & Conditions will be published on this page with an updated **Last Updated** date.\nYour continued use of the Website after the updated Terms & Conditions are published may constitute acceptance of the revised terms, to the extent permitted by applicable law.",
      },
      {
        id: "contact-terms",
        title: "Contact Us",
        body: "If you have any questions regarding these Terms & Conditions, your order, or our policies, please contact SABAA.\nSABAA\n• 📞 WhatsApp: **7871900355**\n• 📧 Email: **sabajewelarts@gmail.com**\nWhen contacting us about an order, please provide your **Order ID** so our team can assist you efficiently.",
      },
    ],
  },
  {
    id: "cookies",
    eyebrow: "How We Remember You",
    title: "Cookie Policy",
    intro:
      "At SABAA, we respect your privacy and are committed to providing you with a safe, transparent, and seamless browsing experience. This Cookie Policy explains how SABAA uses cookies and similar technologies when you visit or use our website. By continuing to browse or use our Website, you acknowledge that cookies and similar technologies may be used as described in this Cookie Policy. Where required by applicable law, we will request your consent before placing non-essential cookies on your device. This Cookie Policy should be read together with our Privacy Policy, Terms & Conditions, and other applicable policies available on our Website.",
    blocks: [
      {
        id: "what-cookies",
        title: "What Are Cookies?",
        body: "Cookies are small text files that are stored on your computer, smartphone, tablet, or other device when you visit a website.\nCookies help websites recognize your device, remember your preferences, improve website functionality, understand how visitors use the website, and provide a better overall user experience.\nCookies may be:\n• **Session Cookies:** These are temporary cookies that remain on your device only while you are browsing the Website and are generally deleted when you close your browser.\n• **Persistent Cookies:** These remain on your device for a specified period or until you delete them manually.\n• **First-Party Cookies:** These are placed directly by SABAA.\n• **Third-Party Cookies:** These are placed by third-party services that operate on or through our Website.",
      },
      {
        id: "why-cookies",
        title: "Why Does SABAA Use Cookies?",
        body: "We may use cookies and similar technologies for several purposes, including:\n• To operate and maintain our Website.\n• To remember your preferences and settings.\n• To keep products in your shopping cart.\n• To facilitate checkout and online transactions.\n• To improve website performance and functionality.\n• To understand how visitors interact with our Website.\n• To analyze website traffic and usage patterns.\n• To identify technical issues and improve our services.\n• To provide relevant marketing and advertising.\n• To measure the effectiveness of advertising campaigns.\n• To provide personalized content and experiences where permitted.\n• To help prevent fraud, abuse, and unauthorized activity.\n• To improve the security of our Website.",
      },
      {
        id: "types-cookies",
        title: "Types of Cookies We Use",
        body: "The cookies used on the SABAA Website may generally fall into the following categories.",
      },
      {
        id: "necessary-cookies",
        title: "Strictly Necessary Cookies",
        body: "These cookies are essential for the Website to function properly. Without these cookies, certain services and features may not be available.\nThey may be used for purposes such as:\n• Maintaining your shopping cart.\n• Processing orders.\n• Managing login sessions.\n• Maintaining website security.\n• Remembering essential preferences.\n• Enabling checkout functionality.\n• Preventing fraudulent or unauthorized activity.\n• Supporting basic website navigation.\nBecause these cookies are necessary for the operation of the Website, they may not be disabled through certain cookie-management tools.",
      },
      {
        id: "functional-cookies",
        title: "Functional Cookies",
        body: "Functional cookies allow the Website to remember choices you make and provide enhanced functionality.\nFor example, these cookies may remember:\n• Language preferences.\n• Region or location preferences.\n• Display preferences.\n• Recently viewed products.\n• Other preferences selected while browsing.\nDisabling these cookies may cause certain features of the Website to work less effectively.",
      },
      {
        id: "analytics-cookies",
        title: "Analytics and Performance Cookies",
        body: "We may use analytics and performance cookies to understand how visitors use our Website.\nThese cookies may help us understand:\n• Number of visitors to our Website.\n• Pages that receive the most visits.\n• How visitors navigate through the Website.\n• Time spent on different pages.\n• Website performance.\n• Sources from which visitors arrive at our Website.\n• Errors or technical issues experienced by visitors.\nThe information collected through these cookies helps us improve the design, functionality, content, and overall performance of the SABAA Website.\nWhere applicable, analytics information may be collected and processed by third-party analytics providers on our behalf.",
      },
      {
        id: "marketing-cookies",
        title: "Marketing and Advertising Cookies",
        body: "We may use marketing and advertising cookies to understand your interests and show you relevant advertisements, where permitted by applicable law.\nThese cookies may be used to:\n• Measure advertising effectiveness.\n• Understand which products or pages you have viewed.\n• Deliver relevant advertisements.\n• Limit the number of times you see the same advertisement.\n• Measure conversions from advertising campaigns.\n• Help us understand customer journeys across digital platforms.\nThird-party advertising platforms may place cookies or similar technologies on your device when you interact with our Website or advertisements.",
      },
      {
        id: "social-cookies",
        title: "Social Media Cookies",
        body: "Our Website may contain links, buttons, plugins, or embedded content from social media platforms.\nWhen you interact with these features, the relevant social media provider may place cookies or similar technologies on your device.\nThese technologies may allow the social media provider to:\n• Recognize your device.\n• Measure interactions.\n• Personalize content or advertisements.\n• Track activity across websites and services, subject to the provider's own privacy practices.\nWe recommend reviewing the privacy and cookie policies of the relevant social media platforms for more information.",
      },
      {
        id: "third-party-cookies",
        title: "Third-Party Cookies",
        body: "Some cookies may be placed by third-party service providers that support our Website and business operations.\nDepending on the services we use, these providers may include:\n• Website analytics providers.\n• Payment service providers.\n• Advertising platforms.\n• Social media platforms.\n• Customer support providers.\n• Security and fraud-prevention services.\n• E-commerce and website technology providers.\nThird-party cookies are controlled by the respective third parties and may be subject to their own privacy and cookie policies.\nSABAA does not control the cookies placed by third parties. We recommend reviewing the relevant third party's privacy documentation for more information about how they collect and process information.",
      },
      {
        id: "info-collected",
        title: "Information Collected Through Cookies",
        body: "Depending on the type of cookie and technology being used, cookies may collect information such as:\n• IP address or approximate location information.\n• Browser type.\n• Device type.\n• Operating system.\n• Website pages visited.\n• Products viewed.\n• Date and time of visits.\n• Referring website.\n• Clicks and interactions.\n• Website preferences.\n• Shopping and browsing activity.\n• Advertising interactions.\nCookies generally do not directly identify you by name. However, certain information collected through cookies may be associated with other information you provide to us, where permitted by applicable law.",
      },
      {
        id: "how-use-info",
        title: "How We Use Cookie Information",
        body: "Information collected through cookies may be used to:\n1. Provide and maintain our Website.\n2. Improve website navigation and functionality.\n3. Remember your preferences.\n4. Improve product discovery and shopping experiences.\n5. Process and manage online orders.\n6. Monitor website performance.\n7. Analyze visitor behavior and trends.\n8. Improve our products and services.\n9. Detect and prevent fraudulent activity.\n10. Maintain website security.\n11. Deliver or measure marketing communications.\n12. Personalize your experience where permitted.\n13. Understand the effectiveness of our advertising campaigns.",
      },
      {
        id: "cookie-consent",
        title: "Cookie Consent",
        body: "Where required by applicable law, SABAA will ask for your consent before using non-essential cookies.\nWhen you first visit our Website, you may see a cookie banner or consent management tool that allows you to:\n• Accept applicable cookies.\n• Reject non-essential cookies.\n• Customize your cookie preferences.\n• Change your preferences at a later time.\nYour choices may be stored through a cookie or similar technology so that we can remember your preferences.\nYou may change or withdraw your consent at any time, subject to applicable law and the functionality of our cookie-management system.",
      },
      {
        id: "manage-cookies",
        title: "How to Manage Cookies",
        body: "You can control or delete cookies through your web browser settings.\nMost browsers allow you to:\n• View cookies stored on your device.\n• Delete existing cookies.\n• Block cookies.\n• Allow cookies only from selected websites.\n• Block third-party cookies.\n• Receive notifications before cookies are stored.\nPlease note that disabling certain cookies may affect the functionality of our Website. For example, certain shopping, checkout, login, or personalization features may not work correctly.\nFor more information, please refer to your browser's help or privacy settings.",
      },
      {
        id: "mobile-cookies",
        title: "Cookies on Mobile Devices",
        body: "If you access the SABAA Website through a mobile phone or tablet, similar technologies may be used to provide functionality, analytics, security, and advertising services.\nYour device settings and browser may provide options to control tracking and advertising technologies.",
      },
      {
        id: "personal-info",
        title: "Do Cookies Collect Personal Information?",
        body: "Cookies themselves generally contain information that identifies a browser or device rather than directly identifying an individual.\nHowever, information collected through cookies may sometimes be combined with other information that you provide to us, such as when you create an account, place an order, or contact us.\nWhere this occurs, we will handle such information in accordance with our **Privacy Policy** and applicable data-protection laws.",
      },
      {
        id: "data-security",
        title: "Data Security",
        body: "We take reasonable measures to protect information collected through our Website from unauthorized access, misuse, alteration, disclosure, or destruction.\nHowever, no method of transmitting information over the internet or storing information electronically can be guaranteed to be completely secure.",
      },
      {
        id: "data-retention",
        title: "Data Retention",
        body: "The length of time cookies remain on your device depends on whether they are session or persistent cookies and on the purpose for which they are used.\nSome cookies are deleted automatically when you close your browser, while others remain for a defined period unless you delete them earlier.\nThird-party providers may retain information collected through their technologies according to their own policies and applicable legal requirements.",
      },
      {
        id: "children-privacy",
        title: "Children's Privacy",
        body: "Our Website is not intended to knowingly collect personal information from children where such collection is prohibited by applicable law.\nWe encourage parents and guardians to supervise children's online activities.\nIf you believe that a child has provided personal information to us in circumstances where it should not have been collected, please contact us so that we can take appropriate action.",
      },
      {
        id: "international-visitors",
        title: "International Visitors",
        body: "SABAA may have customers and visitors from different countries.\nDepending on your location, different privacy and cookie laws may apply to your use of our Website. Where required, we may provide additional cookie controls, notices, or consent mechanisms based on your location.",
      },
      {
        id: "changes-cookie",
        title: "Changes to This Cookie Policy",
        body: "We may update this Cookie Policy from time to time to reflect:\n• Changes in our Website.\n• Changes in the cookies and technologies we use.\n• Changes in third-party service providers.\n• Changes in applicable laws or regulations.\n• Changes to our business practices.\nWhen we update this Cookie Policy, we will revise the **Last Updated** date at the top of this page.\nWe encourage you to review this page periodically to remain informed about how we use cookies.",
      },
      {
        id: "contact-cookie",
        title: "Contact Us",
        body: "If you have questions, concerns, or requests regarding this Cookie Policy or our use of cookies, please contact us:\nSABAA\n• 📧 Email: **sabajewelarts@gmail.com**\n• 📞 WhatsApp: **7871900355**\nFor privacy-related requests, please mention **Cookie Policy / Privacy Request** in the subject line of your communication.",
      },
    ],
  },
];
