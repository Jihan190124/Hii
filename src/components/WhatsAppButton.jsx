import { MessageCircle } from 'lucide-react';
import { isWhatsAppConfigured, whatsappLink } from '../utils/whatsapp.js';

export default function WhatsAppButton({ product, block = false, label = 'Enquire on WhatsApp' }) {
  const configured = isWhatsAppConfigured();
  const cls = `vel-btn vel-btn--ghost ${block ? 'vel-btn--block' : ''}`;

  if (!configured) {
    return (
      <div>
        <button type="button" className={cls} disabled aria-describedby="wa-note">
          <MessageCircle size={16} aria-hidden="true" /> {label}
        </button>
        <p id="wa-note" className="vel-note">
          WhatsApp enquiries are switched off until a business number is set in <code>src/config/site.js</code>.
        </p>
      </div>
    );
  }
  return (
    <a className={cls} href={whatsappLink(product)} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={16} aria-hidden="true" /> {label}
    </a>
  );
}
