import { useState } from 'react';
import './NewsletterForm.css';

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly'];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('Weekly');
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const hasEmail = email.trim() !== '';
  const canSubscribe = hasEmail && agreed;
  const preview = hasEmail
    ? `You will get ${frequency} emails at ${email}.`
    : 'Enter your email to see a preview.';

  function handleSubmit(event) {
    event.preventDefault();
    if (canSubscribe) setSubscribed(true);
  }

  return (
    <div className="newsletter">
      <h1>Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSubscribed(false);
          }}
        />

        <label htmlFor="newsletter-frequency">Frequency</label>
        <select
          id="newsletter-frequency"
          value={frequency}
          onChange={(e) => {
            setFrequency(e.target.value);
            setSubscribed(false);
          }}
        >
          {FREQUENCIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className="agree" htmlFor="newsletter-agree">
          <input
            id="newsletter-agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setSubscribed(false);
            }}
          />
          I agree to receive emails
        </label>

        <p className="preview">{preview}</p>

        <button type="submit" disabled={!canSubscribe}>
          Subscribe
        </button>
      </form>

      {subscribed && (
        <p className="confirmation">{`Subscribed! Check your inbox at ${email}.`}</p>
      )}
    </div>
  );
}

export default NewsletterForm;
