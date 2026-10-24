import { useState } from 'react';
import Notepad from './components/Notepad/Notepad';
import './App.css';

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="draft-notepad-app">
      <h1>Draft Notepad</h1>
      {visible ? <Notepad /> : <p>Notepad hidden.</p>}
      <button type="button" className="toggle" onClick={() => setVisible((v) => !v)}>
        {visible ? 'Hide Notepad' : 'Show Notepad'}
      </button>
    </div>
  );
}

export default App;
