import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import './Example.css'

class Example extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="exampleContainer" onClick={this.props.clickHandler ? ((event) => this.props.clickHandler(event, this.props.example._id)) : null}>
        <Card text="white" className={this.props.clicked ? "exampleCardClicked" : "exampleCard"}>
          <Card.Body>
            <Card.Text>
              {this.props.example.description}
            </Card.Text>
          </Card.Body>
        </Card>
        {!this.props.clicked ? 
          <div className="exampleGradient"><span></span></div>
          :
          null
        }
      </div>
    )
  }
}

export default Example;