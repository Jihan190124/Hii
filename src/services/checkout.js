// Integration seam for a real checkout. Nothing here takes payment or places an order.
//
// To go live later, replace `buildOrderDraft` consumers with calls to your provider, for example:
//   1. POST the draft to your backend or a serverless function.
//   2. The backend validates prices against the catalogue, calculates shipping and tax,
//      creates a payment session with the chosen provider, and returns a redirect URL.
//   3. Redirect the customer, then confirm the order from the provider's webhook, never from the browser.
export function buildOrderDraft(lines) {
  return {
    status: 'draft',
    currency: 'INR',
    items: lines.map(({ product, qty }) => ({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: qty,
    })),
    subtotal: lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0),
  };
}

// Information a real checkout still needs. Shown on the demo checkout page.
export const CHECKOUT_REQUIREMENTS = [
  'A payment provider account and server-side payment session creation',
  'Shipping destinations, rates and delivery estimates',
  'Tax configuration for the regions you sell to',
  'Customer address and contact capture, with validation',
  'An order-management backend and order confirmation emails',
  'Returns, privacy and terms policies reviewed for your business',
];
