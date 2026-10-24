import { act, fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

function renderApp() {
  return render(<App />);
}

function advance(ms) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

const showButton = () => screen.getByRole('button', { name: 'Show Notification' });
const closeButton = () => screen.getByRole('button', { name: 'Close' });
const toast = () => screen.queryByText('Saved successfully!');
const showToast = () => fireEvent.click(showButton());

describe('auto_dismiss_toast_unified_test_suite', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('renders_the_heading_the_button_and_a_zero_count_with_no_toast', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument();
    expect(showButton()).toBeEnabled();
    expect(screen.getByText('Toasts shown: 0')).toBeInTheDocument();
    expect(toast()).not.toBeInTheDocument();
  });

  test('show_notification_displays_the_toast_and_increases_the_count', () => {
    renderApp();
    showToast();
    expect(toast()).toBeInTheDocument();
    expect(closeButton()).toBeInTheDocument();
    expect(screen.getByText('Toasts shown: 1')).toBeInTheDocument();
  });

  test('the_show_button_is_disabled_while_a_toast_is_visible', () => {
    renderApp();
    showToast();
    expect(showButton()).toBeDisabled();
  });

  test('the_toast_is_still_visible_just_before_three_seconds', () => {
    renderApp();
    showToast();
    advance(2999);
    expect(toast()).toBeInTheDocument();
  });

  test('the_toast_disappears_by_itself_after_three_seconds_and_the_button_is_enabled_again', () => {
    renderApp();
    showToast();
    advance(3000);
    expect(toast()).not.toBeInTheDocument();
    expect(showButton()).toBeEnabled();
  });

  test('the_close_button_removes_the_toast_immediately', () => {
    renderApp();
    showToast();
    fireEvent.click(closeButton());
    expect(toast()).not.toBeInTheDocument();
    expect(showButton()).toBeEnabled();
  });

  test('closing_early_clears_the_old_timer_so_a_new_toast_keeps_its_full_three_seconds', () => {
    renderApp();
    showToast();
    advance(1000);
    fireEvent.click(closeButton());
    showToast(); // new toast, its own timer ends at t = 4000

    advance(2000); // t = 3000, when the OLD timer would have fired
    expect(toast()).toBeInTheDocument();
    advance(999); // t = 3999
    expect(toast()).toBeInTheDocument();
    advance(1); // t = 4000
    expect(toast()).not.toBeInTheDocument();
  });

  test('every_time_a_toast_is_shown_the_counter_goes_up', () => {
    renderApp();
    showToast();
    advance(3000);
    showToast();
    fireEvent.click(closeButton());
    showToast();
    expect(screen.getByText('Toasts shown: 3')).toBeInTheDocument();
  });

  test('closing_a_toast_early_causes_no_console_errors_later', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderApp();
    showToast();
    advance(1000);
    fireEvent.click(closeButton());
    expect(toast()).not.toBeInTheDocument();
    advance(10000);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  test('the_timer_is_a_3000ms_timeout_started_on_mount_and_cleared_when_the_toast_closes', () => {
    const setSpy = jest.spyOn(window, 'setTimeout');
    const clearSpy = jest.spyOn(window, 'clearTimeout');
    renderApp();
    showToast();

    const callIndex = setSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
    expect(callIndex).toBeGreaterThan(-1);
    const timerId = setSpy.mock.results[callIndex].value;

    fireEvent.click(closeButton());
    expect(clearSpy).toHaveBeenCalledWith(timerId);
  });
});
