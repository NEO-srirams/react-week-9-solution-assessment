import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const emailInput = () => screen.getByLabelText('Email');
const frequencySelect = () => screen.getByLabelText('Frequency');
const agreeBox = () => screen.getByLabelText('I agree to receive emails');
const subscribeButton = () => screen.getByRole('button', { name: 'Subscribe' });
const selectedText = (select) => select.options[select.selectedIndex].textContent;

describe('newsletter_subscription_form_unified_test_suite', () => {
  test('renders_the_newsletter_heading_and_all_controls', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Newsletter' })).toBeInTheDocument();
    expect(emailInput()).toBeInTheDocument();
    expect(frequencySelect()).toBeInTheDocument();
    expect(agreeBox()).toBeInTheDocument();
    expect(subscribeButton()).toBeInTheDocument();
    const options = Array.from(frequencySelect().options).map((o) => o.textContent);
    expect(options).toEqual(['Daily', 'Weekly', 'Monthly']);
  });

  test('initial_state_is_empty_weekly_unchecked_and_subscribe_is_disabled', () => {
    renderApp();
    expect(emailInput()).toHaveValue('');
    expect(selectedText(frequencySelect())).toBe('Weekly');
    expect(agreeBox()).not.toBeChecked();
    expect(subscribeButton()).toBeDisabled();
  });

  test('preview_asks_for_an_email_while_the_field_is_empty', () => {
    renderApp();
    expect(screen.getByText('Enter your email to see a preview.')).toBeInTheDocument();
  });

  test('preview_updates_live_with_the_typed_email_and_default_frequency', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    expect(
      screen.getByText('You will get Weekly emails at sam@example.com.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Enter your email to see a preview.')).not.toBeInTheDocument();
  });

  test('changing_the_dropdown_updates_the_preview_immediately', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    await userEvent.selectOptions(frequencySelect(), 'Monthly');
    expect(
      screen.getByText('You will get Monthly emails at sam@example.com.')
    ).toBeInTheDocument();
    await userEvent.selectOptions(frequencySelect(), 'Daily');
    expect(
      screen.getByText('You will get Daily emails at sam@example.com.')
    ).toBeInTheDocument();
  });

  test('subscribe_needs_both_a_real_email_and_the_agreement', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    expect(subscribeButton()).toBeDisabled();

    await userEvent.clear(emailInput());
    await userEvent.click(agreeBox());
    expect(subscribeButton()).toBeDisabled();

    fireEvent.change(emailInput(), { target: { value: '   ' } });
    expect(subscribeButton()).toBeDisabled();

    await userEvent.type(emailInput(), 'sam@example.com');
    expect(subscribeButton()).toBeEnabled();
  });

  test('clicking_subscribe_shows_the_confirmation_with_the_typed_email', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    await userEvent.click(agreeBox());
    await userEvent.click(subscribeButton());
    expect(
      screen.getByText('Subscribed! Check your inbox at sam@example.com.')
    ).toBeInTheDocument();
  });

  test('editing_the_email_after_subscribing_hides_the_confirmation', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    await userEvent.click(agreeBox());
    await userEvent.click(subscribeButton());
    expect(screen.getByText(/^Subscribed!/)).toBeInTheDocument();

    await userEvent.type(emailInput(), 'x');
    expect(screen.queryByText(/^Subscribed!/)).not.toBeInTheDocument();
  });

  test('changing_frequency_or_agreement_after_subscribing_hides_the_confirmation', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'sam@example.com');
    await userEvent.click(agreeBox());
    await userEvent.click(subscribeButton());
    expect(screen.getByText(/^Subscribed!/)).toBeInTheDocument();

    await userEvent.selectOptions(frequencySelect(), 'Daily');
    expect(screen.queryByText(/^Subscribed!/)).not.toBeInTheDocument();

    await userEvent.click(subscribeButton());
    expect(screen.getByText(/^Subscribed!/)).toBeInTheDocument();

    await userEvent.click(agreeBox());
    expect(screen.queryByText(/^Subscribed!/)).not.toBeInTheDocument();
    expect(subscribeButton()).toBeDisabled();
  });

  test('all_three_inputs_stay_in_sync_with_the_state_they_control', async () => {
    renderApp();
    await userEvent.type(emailInput(), 'abc');
    expect(emailInput()).toHaveValue('abc');

    await userEvent.selectOptions(frequencySelect(), 'Daily');
    expect(selectedText(frequencySelect())).toBe('Daily');

    await userEvent.click(agreeBox());
    expect(agreeBox()).toBeChecked();
    await userEvent.click(agreeBox());
    expect(agreeBox()).not.toBeChecked();
  });
});
