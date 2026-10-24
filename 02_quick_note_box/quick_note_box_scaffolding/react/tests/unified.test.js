import { Profiler } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderApp() {
  return render(<App />);
}

const titleInput = () => screen.getByLabelText('Title');
const noteInput = () => screen.getByLabelText('Note');
const addButton = () => screen.getByRole('button', { name: 'Add Note' });

async function addNote(title, note) {
  if (title) await userEvent.type(titleInput(), title);
  if (note) await userEvent.type(noteInput(), note);
  await userEvent.click(addButton());
}

describe('quick_note_box_unified_test_suite', () => {
  test('renders_the_heading_fields_count_and_empty_message', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Quick Notes' })).toBeInTheDocument();
    expect(titleInput()).toBeInTheDocument();
    expect(noteInput()).toBeInTheDocument();
    expect(addButton()).toBeInTheDocument();
    expect(screen.getByText('Total notes: 0')).toBeInTheDocument();
    expect(screen.getByText('No notes yet.')).toBeInTheDocument();
  });

  test('typing_changes_nothing_else_on_the_page_until_add_note_is_clicked', async () => {
    renderApp();
    await userEvent.type(titleInput(), 'Groceries');
    await userEvent.type(noteInput(), 'Buy milk');
    expect(screen.getByText('Total notes: 0')).toBeInTheDocument();
    expect(screen.getByText('No notes yet.')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('adding_a_note_appends_title_colon_note_to_the_list', async () => {
    renderApp();
    await addNote('Groceries', 'Buy milk');
    expect(screen.getByRole('listitem')).toHaveTextContent('Groceries: Buy milk');
    expect(screen.getByText('Total notes: 1')).toBeInTheDocument();
  });

  test('the_empty_message_disappears_after_the_first_note', async () => {
    renderApp();
    await addNote('Groceries', 'Buy milk');
    expect(screen.queryByText('No notes yet.')).not.toBeInTheDocument();
  });

  test('both_inputs_are_cleared_after_a_note_is_added', async () => {
    renderApp();
    await addNote('Groceries', 'Buy milk');
    expect(titleInput()).toHaveValue('');
    expect(noteInput()).toHaveValue('');
  });

  test('the_count_and_order_follow_every_added_note', async () => {
    renderApp();
    await addNote('First', 'one');
    await addNote('Second', 'two');
    const items = screen.getAllByRole('listitem').map((li) => li.textContent);
    expect(items).toEqual(['First: one', 'Second: two']);
    expect(screen.getByText('Total notes: 2')).toBeInTheDocument();
  });

  test('a_missing_title_shows_the_error_and_adds_nothing', async () => {
    renderApp();
    await addNote('', 'Only a note');
    expect(screen.getByText('Both fields are required.')).toBeInTheDocument();
    expect(screen.getByText('Total notes: 0')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('a_missing_note_shows_the_error_and_adds_nothing', async () => {
    renderApp();
    await addNote('Only a title', '');
    expect(screen.getByText('Both fields are required.')).toBeInTheDocument();
    expect(screen.getByText('Total notes: 0')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('whitespace_only_values_count_as_empty_and_the_error_clears_after_a_good_add', async () => {
    renderApp();
    await userEvent.type(titleInput(), '   ');
    await userEvent.type(noteInput(), 'text');
    await userEvent.click(addButton());
    expect(screen.getByText('Both fields are required.')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    await userEvent.clear(titleInput());
    await userEvent.type(titleInput(), 'Real title');
    await userEvent.click(addButton());
    expect(screen.queryByText('Both fields are required.')).not.toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent('Real title: text');
  });

  test('typing_causes_no_re_render_because_the_inputs_are_uncontrolled', async () => {
    const onRender = jest.fn();
    render(
      <Profiler id="quick-notes" onRender={onRender}>
        <App />
      </Profiler>
    );
    const rendersAfterMount = onRender.mock.calls.length;

    await userEvent.type(titleInput(), 'Groceries');
    await userEvent.type(noteInput(), 'Buy milk');

    expect(onRender.mock.calls.length).toBe(rendersAfterMount);
  });
});
