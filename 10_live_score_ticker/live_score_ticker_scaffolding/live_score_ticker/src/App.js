import { useState } from 'react';
import ScoreTicker from './components/ScoreTicker/ScoreTicker';
import './App.css';

const SPEEDS = [
  { id: 'slow', label: 'Slow (2s)', intervalMs: 2000 },
  { id: 'fast', label: 'Fast (1s)', intervalMs: 1000 },
];

function App() {
  const [paused, setPaused] = useState(false);
  const [speedId, setSpeedId] = useState('slow');
  const [mounted, setMounted] = useState(true);

  const speed = SPEEDS.find((item) => item.id === speedId);

  return (
    <div className="score-ticker-app">
      <h1>Live Score Ticker</h1>

      {mounted ? (
        <ScoreTicker paused={paused} intervalMs={speed.intervalMs} />
      ) : (
        <p>Ticker unmounted.</p>
      )}

      <p>{`Status: ${paused ? 'Paused' : 'Running'}`}</p>

      <div className="controls">
        <button type="button" onClick={() => setPaused((p) => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>

        <label htmlFor="ticker-speed">Speed</label>
        <select
          id="ticker-speed"
          value={speedId}
          onChange={(e) => setSpeedId(e.target.value)}
        >
          {SPEEDS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <button type="button" onClick={() => setMounted((m) => !m)}>
          {mounted ? 'Unmount Ticker' : 'Mount Ticker'}
        </button>
      </div>
    </div>
  );
}

export default App;
