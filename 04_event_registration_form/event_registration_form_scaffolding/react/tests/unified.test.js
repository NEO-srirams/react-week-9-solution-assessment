import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const nameInput = () => screen.getByLabelText('Full Name');
const emailInput = () => screen.getByLabelText('Email');
const phoneInput = () => screen.getByLabelText('Phone');
const ticketsInput = () => screen.getByLabelText('Tickets');
const registerButton = () => screen.getByRole('button', { name: 'Register' });
const resetButton = () => screen.getByRole('button', { name: 'Reset' });

const setValue = (input, value) => fireEvent.change(input, { target: { value } });
const blur = (input) => fireEvent.blur(input);

const MSG = {
  name: 'Full name is required.',
  emailRequired: 'Email is required.',
  emailInvalid: 'Enter a valid email address.',
  phoneRequired: 'Phone is required.',
  phoneInvalid: 'Phone must be exactly 10 digits.',
  tickets: 'Tickets must be between 1 and 5.',
};

function fillValidForm() {
  setValue(nameInput(), 'Meena');
  setValue(emailInput(), 'meena@example.com');
  setValue(phoneInput(), '9876543210');
  setValue(ticketsInput(), '2');
}

describe('event_registration_form_unified_test_suite', () => {
  test('renders_the_heading_all_fields_and_both_buttons', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Event Registration' })).toBeInTheDocument();
    expect(nameInput()).toBeInTheDocument();
    expect(emailInput()).toBeInTheDocument();
    expect(phoneInput()).toBeInTheDocument();
    expect(ticketsInput()).toBeInTheDocument();
    expect(registerButton()).toBeEnabled();
    expect(resetButton()).toBeInTheDocument();
  });

  test('an_error_stays_hidden_until_the_field_is_blurred', () => {
    renderApp();
    setValue(emailInput(), 'abc');
    expect(screen.queryByText(MSG.emailInvalid)).not.toBeInTheDocument();

    blur(emailInput());
    expect(screen.getByText(MSG.emailInvalid)).toBeInTheDocument();
  });

  test('blurring_an_empty_field_shows_its_required_error', () => {
    renderApp();
    blur(nameInput());
    expect(screen.getByText(MSG.name)).toBeInTheDocument();
    blur(emailInput());
    expect(screen.getByText(MSG.emailRequired)).toBeInTheDocument();
    blur(phoneInput());
    expect(screen.getByText(MSG.phoneRequired)).toBeInTheDocument();
    blur(ticketsInput());
    expect(screen.getByText(MSG.tickets)).toBeInTheDocument();
  });

  test('email_must_look_like_name_at_domain_dot_com', () => {
    renderApp();
    blur(emailInput());
    for (const bad of ['abc', 'a@b', 'a b@c.com', '@c.com']) {
      setValue(emailInput(), bad);
      expect(screen.getByText(MSG.emailInvalid)).toBeInTheDocument();
    }
    setValue(emailInput(), 'a@b.com');
    expect(screen.queryByText(MSG.emailInvalid)).not.toBeInTheDocument();
    expect(screen.queryByText(MSG.emailRequired)).not.toBeInTheDocument();
  });

  test('phone_must_be_exactly_ten_digits', () => {
    renderApp();
    blur(phoneInput());
    for (const bad of ['12345', '12345abcde', '123456789012']) {
      setValue(phoneInput(), bad);
      expect(screen.getByText(MSG.phoneInvalid)).toBeInTheDocument();
    }
    setValue(phoneInput(), '9876543210');
    expect(screen.queryByText(MSG.phoneInvalid)).not.toBeInTheDocument();
  });

  test('tickets_must_be_a_whole_number_from_1_to_5', () => {
    renderApp();
    blur(ticketsInput());
    for (const bad of ['0', '6', '2.5']) {
      setValue(ticketsInput(), bad);
      expect(screen.getByText(MSG.tickets)).toBeInTheDocument();
    }
    for (const good of ['1', '3', '5']) {
      setValue(ticketsInput(), good);
      expect(screen.queryByText(MSG.tickets)).not.toBeInTheDocument();
    }
  });

  test('register_with_invalid_fields_shows_every_error_and_no_confirmation', async () => {
    renderApp();
    await userEvent.click(registerButton());
    expect(screen.getByText(MSG.name)).toBeInTheDocument();
    expect(screen.getByText(MSG.emailRequired)).toBeInTheDocument();
    expect(screen.getByText(MSG.phoneRequired)).toBeInTheDocument();
    expect(screen.getByText(MSG.tickets)).toBeInTheDocument();
    expect(screen.queryByText(/^Registration complete/)).not.toBeInTheDocument();
  });

  test('visible_errors_follow_the_field_live_once_register_was_clicked', async () => {
    renderApp();
    await userEvent.click(registerButton());
    setValue(nameInput(), 'Meena');
    expect(screen.queryByText(MSG.name)).not.toBeInTheDocument();
    expect(screen.getByText(MSG.emailRequired)).toBeInTheDocument();

    setValue(emailInput(), 'bad');
    expect(screen.getByText(MSG.emailInvalid)).toBeInTheDocument();
  });

  test('a_valid_registration_shows_the_confirmation_and_editing_hides_it', async () => {
    renderApp();
    fillValidForm();
    await userEvent.click(registerButton());
    expect(screen.getByText('Registration complete for Meena. Tickets: 2.')).toBeInTheDocument();

    setValue(nameInput(), 'Meenakshi');
    expect(screen.queryByText(/^Registration complete/)).not.toBeInTheDocument();
  });

  test('reset_clears_values_errors_touched_state_and_the_confirmation', async () => {
    renderApp();
    await userEvent.click(registerButton());
    expect(screen.getByText(MSG.name)).toBeInTheDocument();

    await userEvent.click(resetButton());
    expect(nameInput()).toHaveValue('');
    expect(emailInput()).toHaveValue('');
    expect(phoneInput()).toHaveValue('');
    expect(ticketsInput()).toHaveValue(null);
    expect(screen.queryByText(MSG.name)).not.toBeInTheDocument();
    expect(screen.queryByText(MSG.emailRequired)).not.toBeInTheDocument();

    setValue(emailInput(), 'abc');
    expect(screen.queryByText(MSG.emailInvalid)).not.toBeInTheDocument();

    fillValidForm();
    await userEvent.click(registerButton());
    expect(screen.getByText(/^Registration complete/)).toBeInTheDocument();
    await userEvent.click(resetButton());
    expect(screen.queryByText(/^Registration complete/)).not.toBeInTheDocument();
  });
});
