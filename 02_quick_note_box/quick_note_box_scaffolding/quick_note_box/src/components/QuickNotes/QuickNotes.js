import { useRef, useState } from 'react';
import './QuickNotes.css';

function QuickNotes() {
  const titleRef = useRef(null);
  const noteRef = useRef(null);
  const nextId = useRef(1);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const title = titleRef.current.value.trim();
    const note = noteRef.current.value.trim();

    if (title === '' || note === '') {
      setError('Both fields are required.');
      return;
    }

    const id = nextId.current;
    nextId.current += 1;
    setNotes((prev) => [...prev, { id, text: `${title}: ${note}` }]);
    setError('');
    titleRef.current.value = '';
    noteRef.current.value = '';
  }

  return (
    <div className="quick-notes">
      <h1>Quick Notes</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="note-title">Title</label>
        <input id="note-title" type="text" ref={titleRef} />

        <label htmlFor="note-body">Note</label>
        <textarea id="note-body" ref={noteRef} />

        <button type="submit">Add Note</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>{`Total notes: ${notes.length}`}</p>

      {notes.length === 0 ? (
        <p className="empty">No notes yet.</p>
      ) : (
        <ul>
          {notes.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuickNotes;
