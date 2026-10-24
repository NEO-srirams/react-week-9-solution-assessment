import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const KEY = 'notepad-draft';

function renderApp() {
  return render(<App />);
}

const draftBox = () => screen.getByLabelText('Your Draft');
const clearButton = () => screen.getByRole('button', { name: 'Clear Draft' });
const toggleButton = (name) => screen.getByRole('button', { name });

describe('draft_notepad_unified_test_suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test('renders_the_heading_the_textarea_the_counter_and_both_buttons', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Draft Notepad' })).toBeInTheDocument();
    expect(draftBox()).toBeInTheDocument();
    expect(screen.getByText('Characters: 0')).toBeInTheDocument();
    expect(clearButton()).toBeInTheDocument();
    expect(toggleButton('Hide Notepad')).toBeInTheDocument();
  });

  test('starts_empty_when_nothing_is_saved', () => {
    renderApp();
    expect(draftBox()).toHaveValue('');
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  test('the_character_line_follows_the_text_length', async () => {
    renderApp();
    await userEvent.type(draftBox(), 'hello world');
    expect(draftBox()).toHaveValue('hello world');
    expect(screen.getByText('Characters: 11')).toBeInTheDocument();
  });

  test('typing_saves_the_draft_to_local_storage_under_notepad_draft', async () => {
    renderApp();
    await userEvent.type(draftBox(), 'hello');
    expect(localStorage.getItem(KEY)).toBe('hello');
    await userEvent.type(draftBox(), '!');
    expect(localStorage.getItem(KEY)).toBe('hello!');
  });

  test('a_saved_draft_is_loaded_into_the_textarea_on_mount', () => {
    localStorage.setItem(KEY, 'saved text');
    renderApp();
    expect(draftBox()).toHaveValue('saved text');
    expect(screen.getByText('Characters: 10')).toBeInTheDocument();
  });

  test('deleting_all_the_text_removes_the_storage_key', async () => {
    renderApp();
    await userEvent.type(draftBox(), 'abc');
    expect(localStorage.getItem(KEY)).toBe('abc');
    await userEvent.clear(draftBox());
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  test('clear_draft_empties_the_textarea_and_removes_the_key', async () => {
    renderApp();
    await userEvent.type(draftBox(), 'something');
    await userEvent.click(clearButton());
    expect(draftBox()).toHaveValue('');
    expect(screen.getByText('Characters: 0')).toBeInTheDocument();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  test('hiding_and_showing_the_notepad_restores_the_saved_draft', async () => {
    renderApp();
    await userEvent.type(draftBox(), 'keep me');

    await userEvent.click(toggleButton('Hide Notepad'));
    expect(screen.queryByLabelText('Your Draft')).not.toBeInTheDocument();

    await userEvent.click(toggleButton('Show Notepad'));
    expect(draftBox()).toHaveValue('keep me');
    expect(screen.getByText('Characters: 7')).toBeInTheDocument();
  });

  test('the_hidden_state_shows_the_message_and_the_show_label', async () => {
    renderApp();
    await userEvent.click(toggleButton('Hide Notepad'));
    expect(screen.getByText('Notepad hidden.')).toBeInTheDocument();
    expect(toggleButton('Show Notepad')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear Draft' })).not.toBeInTheDocument();

    await userEvent.click(toggleButton('Show Notepad'));
    expect(screen.queryByText('Notepad hidden.')).not.toBeInTheDocument();
    expect(toggleButton('Hide Notepad')).toBeInTheDocument();
  });

  test('a_re_render_without_a_text_change_does_not_write_to_storage', async () => {
    const { rerender } = renderApp();
    await userEvent.type(draftBox(), 'abc');

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    rerender(<App />);

    expect(draftBox()).toHaveValue('abc');
    expect(setItemSpy).not.toHaveBeenCalled();
    expect(removeItemSpy).not.toHaveBeenCalled();
  });
});
