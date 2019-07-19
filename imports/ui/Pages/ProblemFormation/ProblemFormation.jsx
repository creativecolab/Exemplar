/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Typed from 'typed.js';
import '../Start/Start.css';
import { withTracker } from 'meteor/react-meteor-data';

class ProblemFormation extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const currentText = "To begin, please fill in the blank: how might we solve";
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="text">
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        {currentText}:
                                         <input className="problemInput" type="text" placeholder="____[transportation problem]____" value={this.state.value} onChange={this.handleChange} />
                                    </label>
                                </form>
                            </div>
                            <div className="next">
                                <a href="/Interm1">
                                    <Button id="nextButton" variant="success" onSelect={this.handleSubmit} >Next</Button>
                                </a>
                            </div>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
      user: Meteor.user(),
    }
  })(ProblemFormation);
