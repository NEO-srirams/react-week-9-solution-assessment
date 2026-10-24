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

const textarea = () => screen.getByLabelText('Your Text');
const typeText = (value) => fireEvent.change(textarea(), { target: { value } });
const restartButton = () => screen.getByRole('button', { name: 'Restart' });

describe('typing_speed_test_unified_test_suite', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('renders_the_heading_the_hint_the_textarea_the_time_and_the_buttons', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Typing Speed Test' })).toBeInTheDocument();
    expect(screen.getByText('Start typing to begin. You have 10 seconds.')).toBeInTheDocument();
    expect(textarea()).toBeEnabled();
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();
    expect(restartButton()).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unmount Test' })).toBeInTheDocument();
    expect(screen.queryByText(/^Words:/)).not.toBeInTheDocument();
  });

  test('the_timer_does_not_start_when_the_component_mounts', () => {
    renderApp();
    advance(5000);
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();
    expect(textarea()).toBeEnabled();
  });

  test('the_timer_starts_on_the_first_character_and_counts_down_every_second', () => {
    renderApp();
    typeText('a');
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();
    advance(1000);
    expect(screen.getByText('Time left: 9s')).toBeInTheDocument();
    advance(2000);
    expect(screen.getByText('Time left: 7s')).toBeInTheDocument();
  });

  test('typing_more_or_deleting_everything_neither_restarts_nor_stops_the_timer', () => {
    renderApp();
    typeText('a');
    advance(2000);
    expect(screen.getByText('Time left: 8s')).toBeInTheDocument();

    typeText('ab');
    advance(1000);
    expect(screen.getByText('Time left: 7s')).toBeInTheDocument();

    typeText('');
    advance(1000);
    expect(screen.getByText('Time left: 6s')).toBeInTheDocument();

    typeText('x');
    advance(1000);
    expect(screen.getByText('Time left: 5s')).toBeInTheDocument();
  });

  test('when_time_is_up_the_textarea_is_disabled_and_the_time_stays_at_zero', () => {
    renderApp();
    typeText('hello');
    advance(10000);
    expect(screen.getByText('Time left: 0s')).toBeInTheDocument();
    expect(textarea()).toBeDisabled();

    advance(5000);
    expect(screen.getByText('Time left: 0s')).toBeInTheDocument();
  });

  test('the_result_line_shows_the_word_count_and_wpm', () => {
    renderApp();
    typeText('one two three');
    advance(10000);
    expect(screen.getByText('Words: 3 | WPM: 18')).toBeInTheDocument();

    fireEvent.click(restartButton());
    typeText('  one   two ');
    advance(10000);
    expect(screen.getByText('Words: 2 | WPM: 12')).toBeInTheDocument();
  });

  test('the_result_is_hidden_until_the_time_is_up', () => {
    renderApp();
    typeText('one two three');
    advance(9999);
    expect(screen.queryByText(/^Words:/)).not.toBeInTheDocument();
    advance(1);
    expect(screen.getByText(/^Words:/)).toBeInTheDocument();
  });

  test('restart_clears_the_text_resets_the_time_hides_the_result_and_enables_the_textarea', () => {
    renderApp();
    typeText('one two');
    advance(10000);
    expect(textarea()).toBeDisabled();

    fireEvent.click(restartButton());
    expect(textarea()).toBeEnabled();
    expect(textarea()).toHaveValue('');
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();
    expect(screen.queryByText(/^Words:/)).not.toBeInTheDocument();
  });

  test('restart_stops_a_running_timer_and_a_new_test_starts_on_the_next_first_character', () => {
    renderApp();
    typeText('a');
    advance(3000);
    expect(screen.getByText('Time left: 7s')).toBeInTheDocument();

    fireEvent.click(restartButton());
    advance(5000);
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();

    typeText('b');
    advance(1000);
    expect(screen.getByText('Time left: 9s')).toBeInTheDocument();
  });

  test('unmounting_clears_the_running_timer_without_console_errors', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderApp();
    typeText('a');
    advance(2000);

    fireEvent.click(screen.getByRole('button', { name: 'Unmount Test' }));
    expect(screen.getByText('Test unmounted.')).toBeInTheDocument();
    advance(20000);
    expect(errorSpy).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Mount Test' }));
    expect(screen.getByText('Time left: 10s')).toBeInTheDocument();
  });
});
