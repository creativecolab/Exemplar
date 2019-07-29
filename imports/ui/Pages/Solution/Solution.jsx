/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import Typed from 'react-typed';
import Textarea from 'react-textarea-autosize';
import {Link} from 'react-router-dom';

import Typing from 'react-typing-animation';

import '../Start/Start.css';
// import './Solution.css';

const text = {
    After: "Using the example solutions as inspiration, provide your own solution that addresses an issue relevant to transportation.",
    Before: "Please generate your own idea/solution that addresses an issue relevant to transportation."
};

const page = ["/Start/1", "/Start/3"];

class Solution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: '',
            currentText: '',
            value: '',
            isDisabled: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getText = () => {
        const pageId = this.props.match.params.pageId;
        let nextPage = "";
        let currentText = "";

        switch (pageId) {
            case "Before": {
                nextPage = page[0];
                currentText = text.Before;
            }
                break;
            case "After": {
                nextPage = page[1];
                currentText = text.After;
            }
                break;
        }
        this.setState({
            nextPage: nextPage,
            currentText: currentText,
        });
    }

    componentDidMount() {
        // this.setState({ currentText: "Please generate your own idea/solution for the general issue of transportation.", nextPage: "Start/3" });
        this.getText();
    }

    componentDidUpdate = (prevProps) => {
        if(this.props !== prevProps) {    
            this.getText();
        }
    }

    handleChange(event) {
        const value = event.target.value.trim();
        var isDisabled = value ? false : true;
        this.setState({ value: event.target.value, isDisabled: isDisabled });
    }

    render() {
        const placeholderText = "Enter your idea/solution";
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="text">
                                <Form onSubmit={this.handleSubmit}>
                                    {this.state.currentText} <br /><br />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            as='textarea'
                                            placeholder={placeholderText}
                                            aria-describedby="inputGroup"
                                            onChange={this.handleChange}
                                            value={this.state.value}
                                        >
                                        </Form.Control>
                                    </InputGroup>   
                                    <div className="next">
                                        <Link to={this.state.nextPage}>
                                            <Button
                                                id="nextButton"
                                                variant="success"
                                                disabled={this.state.isDisabled}
                                            >
                                                Submit
                                             </Button>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default withTracker(() => {
    return {
        user: Meteor.user(),
    }
})(Solution);
