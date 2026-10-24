import { useState } from 'react';
import './EventRegistrationForm.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_VALUES = { name: '', email: '', phone: '', tickets: '' };
const NOT_TOUCHED = { name: false, email: false, phone: false, tickets: false };

function validate(values) {
  const errors = {};

  if (values.name.trim() === '') errors.name = 'Full name is required.';

  const email = values.email.trim();
  if (email === '') errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';

  const phone = values.phone.trim();
  if (phone === '') errors.phone = 'Phone is required.';
  else if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone must be exactly 10 digits.';

  const tickets = values.tickets.trim();
  if (!/^\d+$/.test(tickets) || Number(tickets) < 1 || Number(tickets) > 5) {
    errors.tickets = 'Tickets must be between 1 and 5.';
  }

  return errors;
}

function EventRegistrationForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [touched, setTouched] = useState(NOT_TOUCHED);
  const [attempted, setAttempted] = useState(false);
  const [registered, setRegistered] = useState(false);

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;
  const visibleError = (field) => (touched[field] || attempted ? errors[field] || '' : '');

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setRegistered(false);
    };
  }

  function handleBlur(field) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);
    setRegistered(!hasErrors);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setTouched(NOT_TOUCHED);
    setAttempted(false);
    setRegistered(false);
  }

  return (
    <div className="event-registration">
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="reg-name">Full Name</label>
        <input
          id="reg-name"
          type="text"
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
        />
        <span className="error">{visibleError('name')}</span>

        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="text"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
        />
        <span className="error">{visibleError('email')}</span>

        <label htmlFor="reg-phone">Phone</label>
        <input
          id="reg-phone"
          type="text"
          value={values.phone}
          onChange={handleChange('phone')}
          onBlur={handleBlur('phone')}
        />
        <span className="error">{visibleError('phone')}</span>

        <label htmlFor="reg-tickets">Tickets</label>
        <input
          id="reg-tickets"
          type="number"
          value={values.tickets}
          onChange={handleChange('tickets')}
          onBlur={handleBlur('tickets')}
        />
        <span className="error">{visibleError('tickets')}</span>

        <div className="actions">
          <button type="submit">Register</button>
          <button type="button" className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {registered && (
        <p className="confirmation">
          {`Registration complete for ${values.name.trim()}. Tickets: ${values.tickets}.`}
        </p>
      )}
    </div>
  );
}

export default EventRegistrationForm;
