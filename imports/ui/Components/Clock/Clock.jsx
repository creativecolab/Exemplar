import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CircularProgressbar from 'react-circular-progressbar';

import './Clock.scss';

export default class Clock extends Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    // use a state to track the time left
    if (!this.state) {
      this.state = {
        timeLeft: props.totalTime - parseInt(Math.abs(props.startTime - new Date().getTime()) / 1000),
      };
    }
  }

  // set up timer to tick every second
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // decrease every second
  tick() {
    const { totalTime, startTime } = this.props;
    this.setState({
      timeLeft: totalTime - parseInt(Math.abs(startTime - new Date().getTime()) / 1000)
    });
  }

  render() {
    const { timeLeft } = this.state;

    // console.log(timeLeft);
    // console.log(this.props.startTime);
    if (timeLeft < 0) {
      return '';
    }
    const clock = new Date(2019, 0, 0, 0, timeLeft / 60, timeLeft % 60);
    // console.log(clock.getTime());
    const clockString =
      "Time Left: " + clock.getMinutes() + ':' + (clock.getSeconds() < 10 ? '0' + clock.getSeconds() : clock.getSeconds());

    return <>{clockString}</>;
  }
}