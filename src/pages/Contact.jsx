import { useId, useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { SITE } from '../config/site.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  usePageTitle('Contact');
  const uid = useId();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
    setSent(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!EMAIL.test(values.email.trim())) next.email = 'Enter a valid email address, for example name@example.com.';
    if (values.message.trim().length < 10) next.message = 'Write a message of at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setValues({ name: '', email: '', message: '' });
    }
  };

  const details = [
    { icon: Mail, label: 'Email', value: SITE.contact.email },
    { icon: Phone, label: 'Phone', value: SITE.contact.phone },
    { icon: MapPin, label: 'Studio', value: SITE.contact.address },
    { icon: Clock, label: 'Hours', value: SITE.contact.hours },
  ];

  const field = (key, label, props = {}) => (
    <div className="vel-field">
      <label htmlFor={`${uid}-${key}`}>{label}</label>
      {key === 'message' ? (
        <textarea id={`${uid}-${key}`} className="vel-input" rows={5} value={values[key]} onChange={set(key)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${uid}-${key}-err` : undefined} />
      ) : (
        <input id={`${uid}-${key}`} className="vel-input" value={values[key]} onChange={set(key)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${uid}-${key}-err` : undefined} {...props} />
      )}
      {errors[key] && <p id={`${uid}-${key}-err`} className="vel-field__error">{errors[key]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader title="Contact" intro="Questions about a saree, a drape or an order? Write to us." />
      <section className="vel-section vel-section--flush">
        <div className="container-xl">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-lg-6">
              <form onSubmit={onSubmit} noValidate className="vel-form">
                {field('name', 'Name', { type: 'text', autoComplete: 'name' })}
                {field('email', 'Email', { type: 'email', inputMode: 'email', autoComplete: 'email' })}
                {field('message', 'Message')}
                <button type="submit" className="vel-btn">Send message</button>
                <p className={`vel-form__status ${sent ? 'is-success' : ''}`} role="status">
                  {sent
                    ? 'Thank you. This is a demonstration form, so your message was not sent.'
                    : 'Demonstration form: messages are not sent until a backend or email service is connected.'}
                </p>
              </form>
            </div>

            <div className="col-12 col-lg-5 offset-lg-1">
              <h2 className="vel-h3">Studio details</h2>
              <ul className="vel-contact">
                {details.map(({ icon: Icon, label, value }) => (
                  <li key={label}>
                    <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      <strong>{label}</strong>
                      {value ? <span>{value}</span> : <span className="vel-tbc">To be added</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <WhatsAppButton label="Message on WhatsApp" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
