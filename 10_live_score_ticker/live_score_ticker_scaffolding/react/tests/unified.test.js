import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';

function renderApp() {
  return render(<App />);
}

function advance(ms) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

const speedSelect = () => screen.getByLabelText('Speed');
const chooseSpeed = (text) => {
  const option = within(speedSelect()).getByRole('option', { name: text });
  fireEvent.change(speedSelect(), { target: { value: option.value } });
};
const selectedText = () => speedSelect().options[speedSelect().selectedIndex].textContent;
const score = (n) => screen.getByText(`Score: ${n}`);
const click = (name) => fireEvent.click(screen.getByRole('button', { name }));

describe('live_score_ticker_unified_test_suite', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('renders_the_heading_score_status_buttons_and_the_default_speed', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Live Score Ticker' })).toBeInTheDocument();
    expect(score(0)).toBeInTheDocument();
    expect(screen.getByText('Status: Running')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unmount Ticker' })).toBeInTheDocument();
    expect(selectedText()).toBe('Slow (2s)');
    const options = Array.from(speedSelect().options).map((o) => o.textContent);
    expect(options).toEqual(['Slow (2s)', 'Fast (1s)']);
  });

  test('at_slow_speed_the_score_goes_up_every_two_seconds', () => {
    renderApp();
    advance(1999);
    expect(score(0)).toBeInTheDocument();
    advance(1);
    expect(score(1)).toBeInTheDocument();
    advance(4000);
    expect(score(3)).toBeInTheDocument();
  });

  test('at_fast_speed_the_score_goes_up_every_second', () => {
    renderApp();
    chooseSpeed('Fast (1s)');
    advance(1000);
    expect(score(1)).toBeInTheDocument();
    advance(3000);
    expect(score(4)).toBeInTheDocument();
  });

  test('pause_stops_the_score_and_updates_the_status_and_the_button', () => {
    renderApp();
    advance(2000);
    expect(score(1)).toBeInTheDocument();

    click('Pause');
    expect(screen.getByText('Status: Paused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resume' })).toBeInTheDocument();
    advance(10000);
    expect(score(1)).toBeInTheDocument();
  });

  test('resume_continues_counting_from_the_same_score', () => {
    renderApp();
    advance(4000);
    expect(score(2)).toBeInTheDocument();
    click('Pause');
    advance(6000);

    click('Resume');
    expect(screen.getByText('Status: Running')).toBeInTheDocument();
    expect(score(2)).toBeInTheDocument();
    advance(2000);
    expect(score(3)).toBeInTheDocument();
  });

  test('changing_speed_while_running_restarts_the_timer_with_a_full_new_interval', () => {
    renderApp();
    advance(1500);
    expect(score(0)).toBeInTheDocument();

    chooseSpeed('Fast (1s)');
    advance(999);
    expect(score(0)).toBeInTheDocument();
    advance(1);
    expect(score(1)).toBeInTheDocument();
  });

  test('changing_speed_while_paused_does_not_tick_and_the_new_speed_is_used_on_resume', () => {
    renderApp();
    click('Pause');
    chooseSpeed('Fast (1s)');
    advance(5000);
    expect(score(0)).toBeInTheDocument();

    click('Resume');
    advance(1000);
    expect(score(1)).toBeInTheDocument();
  });

  test('re_rendering_for_other_reasons_never_starts_a_second_timer', () => {
    const { rerender } = renderApp();
    advance(1000);
    rerender(<App />);
    advance(500);
    rerender(<App />);
    advance(500);
    expect(score(1)).toBeInTheDocument();
    advance(2000);
    rerender(<App />);
    expect(score(2)).toBeInTheDocument();
  });

  test('unmounting_clears_the_timer_without_console_errors_and_mounting_gives_a_fresh_ticker', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderApp();
    advance(4000);
    expect(score(2)).toBeInTheDocument();

    click('Unmount Ticker');
    expect(screen.getByText('Ticker unmounted.')).toBeInTheDocument();
    expect(screen.queryByText(/^Score:/)).not.toBeInTheDocument();
    advance(20000);
    expect(errorSpy).not.toHaveBeenCalled();

    click('Mount Ticker');
    expect(score(0)).toBeInTheDocument();
    advance(2000);
    expect(score(1)).toBeInTheDocument();
  });

  test('a_remounted_ticker_follows_the_current_paused_and_speed_values', () => {
    renderApp();
    click('Pause');
    chooseSpeed('Fast (1s)');
    click('Unmount Ticker');
    click('Mount Ticker');

    expect(screen.getByText('Status: Paused')).toBeInTheDocument();
    expect(score(0)).toBeInTheDocument();
    advance(5000);
    expect(score(0)).toBeInTheDocument();

    click('Resume');
    advance(1000);
    expect(score(1)).toBeInTheDocument();
  });
});
