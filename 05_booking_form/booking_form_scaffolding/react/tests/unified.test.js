import { Profiler } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const guestInput = () => screen.getByLabelText('Guest Name');
const nightsInput = () => screen.getByLabelText('Nights');
const requestsInput = () => screen.getByLabelText('Special Requests');
const bookButton = () => screen.getByRole('button', { name: 'Book Now' });

async function setNights(value) {
  await userEvent.clear(nightsInput());
  if (value !== '') await userEvent.type(nightsInput(), value);
}

describe('booking_form_unified_test_suite', () => {
  test('renders_the_heading_pricing_and_the_default_total', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Room Booking' })).toBeInTheDocument();
    expect(guestInput()).toBeInTheDocument();
    expect(requestsInput()).toBeInTheDocument();
    expect(nightsInput()).toHaveValue(1);
    expect(screen.getByText('Price per night: $80')).toBeInTheDocument();
    expect(screen.getByText('Total: $80')).toBeInTheDocument();
  });

  test('the_total_updates_live_as_the_nights_change', async () => {
    renderApp();
    await setNights('3');
    expect(screen.getByText('Total: $240')).toBeInTheDocument();
    await setNights('14');
    expect(screen.getByText('Total: $1120')).toBeInTheDocument();
  });

  test('invalid_nights_show_the_error_and_a_zero_total', async () => {
    renderApp();
    for (const bad of ['0', '15', '2.5', '']) {
      await setNights(bad);
      expect(screen.getByText('Nights must be between 1 and 14.')).toBeInTheDocument();
      expect(screen.getByText('Total: $0')).toBeInTheDocument();
    }
    await setNights('2');
    expect(screen.queryByText('Nights must be between 1 and 14.')).not.toBeInTheDocument();
    expect(screen.getByText('Total: $160')).toBeInTheDocument();
  });

  test('book_now_needs_a_guest_name_and_valid_nights', async () => {
    renderApp();
    expect(bookButton()).toBeDisabled();

    await userEvent.type(guestInput(), '   ');
    expect(bookButton()).toBeDisabled();

    await userEvent.clear(guestInput());
    await userEvent.type(guestInput(), 'Anita');
    expect(bookButton()).toBeEnabled();

    await setNights('0');
    expect(bookButton()).toBeDisabled();
    await setNights('3');
    expect(bookButton()).toBeEnabled();
  });

  test('booking_shows_the_confirmation_lines', async () => {
    renderApp();
    await userEvent.type(guestInput(), 'Anita');
    await setNights('3');
    await userEvent.click(bookButton());
    expect(screen.getByText('Booking confirmed for Anita')).toBeInTheDocument();
    expect(screen.getByText('Nights: 3')).toBeInTheDocument();
    expect(screen.getByText('Amount due: $240')).toBeInTheDocument();
  });

  test('the_special_requests_text_is_read_when_booking', async () => {
    renderApp();
    await userEvent.type(guestInput(), 'Anita');
    await userEvent.type(requestsInput(), 'Late check-in');
    await userEvent.click(bookButton());
    expect(screen.getByText('Requests: Late check-in')).toBeInTheDocument();
  });

  test('empty_special_requests_show_none', async () => {
    renderApp();
    await userEvent.type(guestInput(), 'Anita');
    await userEvent.type(requestsInput(), '   ');
    await userEvent.click(bookButton());
    expect(screen.getByText('Requests: None')).toBeInTheDocument();
  });

  test('only_the_requests_box_is_cleared_after_booking', async () => {
    renderApp();
    await userEvent.type(guestInput(), 'Anita');
    await setNights('3');
    await userEvent.type(requestsInput(), 'Late check-in');
    await userEvent.click(bookButton());

    expect(requestsInput()).toHaveValue('');
    expect(guestInput()).toHaveValue('Anita');
    expect(nightsInput()).toHaveValue(3);
  });

  test('changing_the_guest_name_or_nights_hides_the_confirmation', async () => {
    renderApp();
    await userEvent.type(guestInput(), 'Anita');
    await userEvent.click(bookButton());
    expect(screen.getByText('Booking confirmed for Anita')).toBeInTheDocument();

    await userEvent.type(guestInput(), 'x');
    expect(screen.queryByText(/^Booking confirmed/)).not.toBeInTheDocument();

    await userEvent.click(bookButton());
    expect(screen.getByText(/^Booking confirmed/)).toBeInTheDocument();
    await setNights('4');
    expect(screen.queryByText(/^Booking confirmed/)).not.toBeInTheDocument();
  });

  test('typing_in_special_requests_causes_no_re_render_because_it_is_uncontrolled', async () => {
    const onRender = jest.fn();
    render(
      <Profiler id="booking" onRender={onRender}>
        <App />
      </Profiler>
    );
    const rendersAfterMount = onRender.mock.calls.length;

    await userEvent.type(requestsInput(), 'Quiet room please');

    expect(onRender.mock.calls.length).toBe(rendersAfterMount);
  });
});
