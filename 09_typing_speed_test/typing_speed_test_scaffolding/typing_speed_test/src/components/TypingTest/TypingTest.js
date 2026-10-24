import { Component } from 'react';
import './TypingTest.css';

const TEST_SECONDS = 10;

function countWords(text) {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
}

class TypingTest extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', timeLeft: TEST_SECONDS, finished: false };
    this.timerId = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const firstCharacterTyped = prevState.text === '' && this.state.text !== '';
    if (firstCharacterTyped && this.timerId === null && !this.state.finished) {
      this.timerId = setInterval(this.tick, 1000);
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  tick() {
    this.setState(
      (prev) => {
        if (prev.finished) return null;
        const timeLeft = prev.timeLeft - 1;
        return timeLeft <= 0 ? { timeLeft: 0, finished: true } : { timeLeft };
      },
      () => {
        if (this.state.finished) this.stopTimer();
      }
    );
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleRestart() {
    this.stopTimer();
    this.setState({ text: '', timeLeft: TEST_SECONDS, finished: false });
  }

  render() {
    const { text, timeLeft, finished } = this.state;
    const words = countWords(text);

    return (
      <div className="typing-test">
        <p className="hint">Start typing to begin. You have 10 seconds.</p>
        <label htmlFor="typing-text">Your Text</label>
        <textarea
          id="typing-text"
          value={text}
          disabled={finished}
          onChange={this.handleChange}
        />
        <p>{`Time left: ${timeLeft}s`}</p>
        {finished && <p className="result">{`Words: ${words} | WPM: ${words * 6}`}</p>}
        <button type="button" onClick={this.handleRestart}>
          Restart
        </button>
      </div>
    );
  }
}

export default TypingTest;
