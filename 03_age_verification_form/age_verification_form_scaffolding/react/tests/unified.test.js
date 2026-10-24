import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const nameInput = () => screen.getByLabelText('Full Name');
const ageInput = () => screen.getByLabelText('Age');
const verifyButton = () => screen.getByRole('button', { name: 'Verify' });

async function verify(name, age) {
  await userEvent.clear(nameInput());
  await userEvent.clear(ageInput());
  if (name) await userEvent.type(nameInput(), name);
  if (age) await userEvent.type(ageInput(), age);
  await userEvent.click(verifyButton());
}

describe('age_verification_form_unified_test_suite', () => {
  test('renders_the_heading_both_fields_and_the_verify_button', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Age Verification' })).toBeInTheDocument();
    expect(nameInput()).toBeInTheDocument();
    expect(ageInput()).toBeInTheDocument();
    expect(verifyButton()).toBeInTheDocument();
  });

  test('no_error_is_shown_while_typing_before_verify_is_clicked', async () => {
    renderApp();
    await userEvent.type(nameInput(), 'Al');
    await userEvent.type(ageInput(), '5');
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/must be/i)).not.toBeInTheDocument();
  });

  test('verifying_an_empty_form_shows_both_required_errors', async () => {
    renderApp();
    await userEvent.click(verifyButton());
    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Age is required.')).toBeInTheDocument();
    expect(screen.queryByText(/^Verified:/)).not.toBeInTheDocument();
  });

  test('a_name_with_only_spaces_is_treated_as_empty', async () => {
    renderApp();
    await userEvent.type(nameInput(), '    ');
    await userEvent.type(ageInput(), '25');
    await userEvent.click(verifyButton());
    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
  });

  test('a_name_shorter_than_three_characters_shows_the_minimum_length_error', async () => {
    renderApp();
    await verify('Al', '25');
    expect(screen.getByText('Full name must be at least 3 characters.')).toBeInTheDocument();
    expect(screen.queryByText('Age must be between 18 and 60.')).not.toBeInTheDocument();
  });

  test('ages_below_18_or_above_60_show_the_range_error', async () => {
    renderApp();
    await verify('Ravi', '17');
    expect(screen.getByText('Age must be between 18 and 60.')).toBeInTheDocument();

    await verify('Ravi', '61');
    expect(screen.getByText('Age must be between 18 and 60.')).toBeInTheDocument();
    expect(screen.queryByText(/^Verified:/)).not.toBeInTheDocument();
  });

  test('a_decimal_age_is_invalid', async () => {
    renderApp();
    await verify('Ravi', '20.5');
    expect(screen.getByText('Age must be between 18 and 60.')).toBeInTheDocument();
    expect(screen.queryByText(/^Verified:/)).not.toBeInTheDocument();
  });

  test('the_boundary_ages_18_and_60_are_both_accepted', async () => {
    renderApp();
    await verify('Ravi', '18');
    expect(screen.getByText('Verified: Ravi (18)')).toBeInTheDocument();

    await verify('Ravi', '60');
    expect(screen.getByText('Verified: Ravi (60)')).toBeInTheDocument();
  });

  test('a_valid_form_shows_the_result_with_the_name_trimmed', async () => {
    renderApp();
    fireEvent.change(nameInput(), { target: { value: '  Ravi  ' } });
    fireEvent.change(ageInput(), { target: { value: '25' } });
    await userEvent.click(verifyButton());
    expect(screen.getByText('Verified: Ravi (25)')).toBeInTheDocument();
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });

  test('fixing_the_fields_and_verifying_again_clears_the_old_errors', async () => {
    renderApp();
    await verify('Al', '10');
    expect(screen.getByText('Full name must be at least 3 characters.')).toBeInTheDocument();
    expect(screen.getByText('Age must be between 18 and 60.')).toBeInTheDocument();

    await verify('Alice', '30');
    expect(screen.queryByText('Full name must be at least 3 characters.')).not.toBeInTheDocument();
    expect(screen.queryByText('Age must be between 18 and 60.')).not.toBeInTheDocument();
    expect(screen.getByText('Verified: Alice (30)')).toBeInTheDocument();
  });
});
