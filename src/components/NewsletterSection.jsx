import { useId, useState } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Demonstration form: there is no backend, so nothing is stored or sent, and the copy says so.
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const inputId = useId();
  const msgId = useId();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="vel-newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="container-xl">
        <div className="vel-newsletter__inner">
          <h2 id="newsletter-title" className="vel-h2">Be the first to see what blooms next.</h2>
          <p className="vel-newsletter__text">Join the VEL list for new drapes and quiet announcements.</p>
          <form onSubmit={onSubmit} noValidate className="vel-newsletter__form">
            <label htmlFor={inputId} className="vel-sr">Email address</label>
            <input
              id={inputId}
              className="vel-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              aria-invalid={status === 'error'}
              aria-describedby={msgId}
            />
            <button type="submit" className="vel-btn">Subscribe</button>
          </form>
          <p id={msgId} className={`vel-newsletter__msg vel-newsletter__msg--${status}`} role="status">
            {status === 'error' && 'Enter a valid email address, for example name@example.com.'}
            {status === 'success' && 'Thank you. This is a demonstration form, so your email was not saved or sent.'}
            {status === 'idle' && 'Demonstration form: no email is stored or sent until a mailing service is connected.'}
          </p>
        </div>
      </div>
    </section>
  );
}
