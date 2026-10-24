import { Component } from 'react';
import './Toast.css';

const DISMISS_AFTER_MS = 3000;

class Toast extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  componentDidMount() {
    this.timerId = setTimeout(() => {
      this.props.onClose();
    }, DISMISS_AFTER_MS);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    return (
      <div className="toast">
        <span>Saved successfully!</span>
        <button type="button" onClick={this.props.onClose}>
          Close
        </button>
      </div>
    );
  }
}

export default Toast;
