import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Button, Modal } from 'react-bootstrap';

import './Clock.scss';
// // Shows the modal
// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           30 Seconds Remain to finish
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

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
    // console.log("Tick");
    const { totalTime, startTime } = this.props;
    this.setState({
      timeLeft: totalTime - parseInt(Math.abs(startTime - new Date().getTime()) / 1000)
    });
  }

  // controls what page is next
  pageSelect() {
    if (this.props.pageId === "Before") {
      return (
        <Link to="/Problem/After">
          <Button block id="nextButton" variant="success" >Done</Button>
        </Link>);
    } else if (this.props.pageId === "After") {
      return (
        <Link to="/End">
          <Button block id="nextButton" variant="success" >Logout Page</Button>
        </Link>)
    }
  }
  // onHide(modalOn) {
  //   if(this.state.timeLeft < 30) {
  //     return false;
  //   }
  //   return modalOn
  // }

  render() {
    const { timeLeft } = this.state;
    const warning = timeLeft < 30 ? true : false;
    const clock = new Date(2019, 0, 0, 0, timeLeft / 60, timeLeft % 60);
    const clockString =
    "Time Left: " + clock.getMinutes() + ':' + (clock.getSeconds() < 10 ? '0' + clock.getSeconds() : clock.getSeconds());
    
    // Timer runs out and changes time.
    if (timeLeft < 0) {
      return (
        <Container>
          <br />
          {this.pageSelect()}
        </Container >
      );
    }
    
    return (
      <div className={warning ? "warn-clock" : "clock"}>
        {/* <MyVerticallyCenteredModal
          show={this.onHide(warning)}
        /> */}
        {clockString}
      </div >);
  }
}