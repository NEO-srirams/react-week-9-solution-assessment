import { useRef, useState } from 'react';
import './BookingForm.css';

const PRICE_PER_NIGHT = 80;

function parseNights(value) {
  const text = value.trim();
  if (!/^\d+$/.test(text)) return null;
  const nights = Number(text);
  return nights >= 1 && nights <= 14 ? nights : null;
}

function BookingForm() {
  const requestsRef = useRef(null);
  const [guestName, setGuestName] = useState('');
  const [nights, setNights] = useState('1');
  const [confirmation, setConfirmation] = useState(null);

  const validNights = parseNights(nights);
  const total = validNights === null ? 0 : validNights * PRICE_PER_NIGHT;
  const canBook = guestName.trim() !== '' && validNights !== null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canBook) return;

    const requests = requestsRef.current.value.trim();
    setConfirmation({
      name: guestName.trim(),
      nights: validNights,
      amount: total,
      requests: requests === '' ? 'None' : requests,
    });
    requestsRef.current.value = '';
  }

  return (
    <div className="booking">
      <h1>Room Booking</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="booking-name">Guest Name</label>
        <input
          id="booking-name"
          type="text"
          value={guestName}
          onChange={(e) => {
            setGuestName(e.target.value);
            setConfirmation(null);
          }}
        />

        <label htmlFor="booking-nights">Nights</label>
        <input
          id="booking-nights"
          type="number"
          value={nights}
          onChange={(e) => {
            setNights(e.target.value);
            setConfirmation(null);
          }}
        />
        <span className="error">
          {validNights === null ? 'Nights must be between 1 and 14.' : ''}
        </span>

        <p>{`Price per night: $${PRICE_PER_NIGHT}`}</p>
        <p className="total">{`Total: $${total}`}</p>

        <label htmlFor="booking-requests">Special Requests</label>
        <textarea id="booking-requests" ref={requestsRef} />

        <button type="submit" disabled={!canBook}>
          Book Now
        </button>
      </form>

      {confirmation && (
        <div className="confirmation">
          <p>{`Booking confirmed for ${confirmation.name}`}</p>
          <p>{`Nights: ${confirmation.nights}`}</p>
          <p>{`Amount due: $${confirmation.amount}`}</p>
          <p>{`Requests: ${confirmation.requests}`}</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
