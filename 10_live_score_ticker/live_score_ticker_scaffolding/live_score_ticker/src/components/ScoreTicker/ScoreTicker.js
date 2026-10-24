import { Component } from 'react';
import './ScoreTicker.css';

class ScoreTicker extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 0 };
    this.timerId = null;
  }

  componentDidMount() {
    if (!this.props.paused) this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { paused, intervalMs } = this.props;

    if (paused !== prevProps.paused) {
      if (paused) this.stopTimer();
      else this.startTimer();
    } else if (intervalMs !== prevProps.intervalMs && !paused) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timerId = setInterval(() => {
      this.setState((prev) => ({ score: prev.score + 1 }));
    }, this.props.intervalMs);
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    return <p className="score">{`Score: ${this.state.score}`}</p>;
  }
}

export default ScoreTicker;
