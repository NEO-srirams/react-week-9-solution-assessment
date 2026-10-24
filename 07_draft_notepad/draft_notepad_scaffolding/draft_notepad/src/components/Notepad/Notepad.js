import { Component } from 'react';
import './Notepad.css';

const STORAGE_KEY = 'notepad-draft';

class Notepad extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      this.setState({ text: saved });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.text === this.state.text) return;

    if (this.state.text === '') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, this.state.text);
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleClear() {
    this.setState({ text: '' });
    localStorage.removeItem(STORAGE_KEY);
  }

  render() {
    const { text } = this.state;
    return (
      <div className="notepad">
        <label htmlFor="draft-text">Your Draft</label>
        <textarea id="draft-text" value={text} onChange={this.handleChange} />
        <p>{`Characters: ${text.length}`}</p>
        <button type="button" onClick={this.handleClear}>
          Clear Draft
        </button>
      </div>
    );
  }
}

export default Notepad;
