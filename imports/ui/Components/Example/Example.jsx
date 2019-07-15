import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import './Example.css'

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    }
  }

  clicked = () => {
    var oldVal = this.state.clicked;
    this.setState({ clicked: !oldVal });
    console.log(this.state);
  }

  render() {
    return (
      <div className="exampleContainer" onClick={this.clicked}>
        <Card text="white" className={this.state.clicked ? "exampleCardClicked" : "exampleCard"}>
          <Card.Body>
            <Card.Text>
              {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.state.clicked ? 
          null
          :
          <div id="gradient"><span></span></div>
        }
      </div>
    )
  }
}

export default Example;