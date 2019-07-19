/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
// import Typed from 'react-typed';
import '../Start/Start.css';
import './ProblemFormation.css';

class ProblemFormation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            nextLink: '',
            currentText: '',
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

    componentDidMount() {
        const name = this.props.match.params.name;
        let nextLink = "";
        let currentText = "";
        console.log(name);
        switch (name) {
            case "After": {
                nextLink = "Problem/After";
                currentText = "After reading through the example solutions, would you like to refine your inital problem?";
            }
                break;
            case "Before": {
                nextLink = "Start/1";
                currentText = "The transportation domain contains many problems that need to be addressed. Pick one transportation problem you feel is important and fill in the blank.";
            }
                break;
        }
        this.setState({
            name: name,
            nextLink: nextLink,
            currentText: currentText,
        });
    }

    handleChange(event) {
        console.log(this.state.value);
        var isDisabled = !(this.state.value.length >= 0);
        this.setState({ value: event.target.value, isDisabled: isDisabled });
    }

    render() {
        const placeholderText = "transportation problem";
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
                                        <InputGroup.Prepend>
                                            <div className="wrapper">
                                                <InputGroup.Text id="inputGroup" style={{ "alignItems": "none", padding: "none !important" }}>How might we solve:</InputGroup.Text>
                                            </div>
                                        </InputGroup.Prepend>
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
                                        <a href={this.state.nextLink}>
                                            <Button
                                                id="nextButton"
                                                variant="success"
                                                disabled={this.state.isDisabled}
                                            >
                                                Submit
                                             </Button>
                                        </a>
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
