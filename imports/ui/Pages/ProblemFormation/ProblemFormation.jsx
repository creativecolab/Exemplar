/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';

// import Typed from 'react-typed';
import '../Start/Start.css';
import './ProblemFormation.css';

const text = {
    After: "After reading through the example solutions, what are some transportation-related issues that come to mind now?",
    Before: "The transportation domain contains many problems that need to be addressed. What are some issues that come to mind when you think about transportation?"
};

const page = ["/Solution/Before", "/Solution/After"];

class ProblemFormation extends Component {
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

    // This Is the autoamtic typer that can let people know this is clickable
    //     <Typed
    //     strings={[
    //         'Transportation Problem',
    //         'Issues with traffic',
    //         'Global headers']}
    //     typeSpeed={40}
    //     backSpeed={50}
    //     attr="placeholder"
    //     loop >
    //     <input type="text" />
    // </Typed>

    getText = () => {
        const pageId = this.props.match.params.pageId;
        let nextPage = "";
        let currentText = "";

        switch (pageId) {
            case "After": {
                nextPage = page[1];
                currentText = text.After;
            }
                break;
            case "Before": {
                nextPage = page[0];
                currentText = text.Before;
            }
                break;
        }
        this.setState({
            nextPage: nextPage,
            currentText: currentText,
        });
    }

    componentDidUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            this.getText();
        }
    }

    componentDidMount() {
        this.getText();
    }

    handleChange(event) {
        const value = event.target.value.trim();
        var isDisabled = value ? false : true;
        this.setState({ value: event.target.value, isDisabled: isDisabled });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Catch invalid inputs here TODO
        const currentPage = this.props.match.params.pageId;
        if (currentPage === 'Before') {
            Meteor.call('sessions.updateProblemBefore', { id: this.props.sessionID, response: this.state.value });
        } else if (currentPage === 'After') {
            Meteor.call('sessions.updateProblemAfter', { id: this.props.sessionID, response: this.state.value });
        }
        this.props.history.push(this.state.nextPage);
    }

    render() {
        const placeholderText = "List transportation issues here";
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
                                        <Button
                                            type="submit"
                                            id="nextButton"
                                            variant="success"
                                            disabled={this.state.isDisabled}
                                        >
                                            Submit
                                        </Button>
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
})(ProblemFormation);
