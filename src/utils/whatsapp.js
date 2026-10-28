import { SITE } from '../config/site.js';

// Enquiries stay optional: the feature is only live once a valid number is configured in config/site.js.
export const isWhatsAppConfigured = () => /^\d{8,15}$/.test(SITE.whatsappNumber);

export function productUrl(product) {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#/product/${product.slug}`;
}

export function whatsappLink(product) {
  const message = product
    ? `Hello ${SITE.name}, I would like to enquire about "${product.name}".\n${productUrl(product)}`
    : `Hello ${SITE.name}, I would like to make an enquiry.`;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
