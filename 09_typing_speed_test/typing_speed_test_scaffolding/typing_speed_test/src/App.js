import { useState } from 'react';
import TypingTest from './components/TypingTest/TypingTest';
import './App.css';

function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <div className="typing-test-app">
      <h1>Typing Speed Test</h1>
      {mounted ? <TypingTest /> : <p>Test unmounted.</p>}
      <button type="button" className="toggle" onClick={() => setMounted((m) => !m)}>
        {mounted ? 'Unmount Test' : 'Mount Test'}
      </button>
    </div>
  );
}

export default App;
