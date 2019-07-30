import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Start/Start.css';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#cacaca", height: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ textAlign: "center" }}>Tutorial Video</h1>

          <video style={{ width: "80vw", border: "3px solid #535353", margin: "0 auto" }} autoPlay controls>
            <source src="./ExemplarTutorial.mp4" />
          </video>
        </div>

        <div style={{ marginTop: "10px", marginRight: "10px"}}>
          <Link to="/Tag/Before">
            <Button>Continue</Button>
          </Link>
        </div>
      </div>
    )
  }
}
