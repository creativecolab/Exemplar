import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tutorial.css';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tutorialContainer">
        <div id="tutorial">
          <h1>Tutorial Video</h1>

          <video id="tutorialVid" controls>
            <source src="./ExemplarTutorial.mp4" />
          </video>
        </div>

        <div id="tutorialBttn">
          <Link to="/Tag">
            <Button>Continue</Button>
          </Link>
        </div>
      </div>
    )
  }
}
