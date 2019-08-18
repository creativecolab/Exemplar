/* eslint-disable */
import './Instruction.css';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 3 Pages bounce from this one: DesignBrief, Reading Insructions, Tagging Instructions
// Router link should be Start, Examples, SolutionTag (Instructions/0/1/2/)

const instr_text = {
    Overview: "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.",
    Examples: "You will be presented with a set of existing solutions for the general issue of transportation. You have 10 minutes to carefully read through the example solutions and complete your task (described on the next screen).",
    SolutionTag: "Your task is to organize the examples by tagging them with categories. You may either use existing categories or create your own.",
};

const page = ["/DesignBrief", "/Examples/1", "/SolutionTag"];

class Instruction extends Component {
    constructor(props) {
        super(props);
        // Save the last page
        Meteor.call('sessions.updatePage', props.sessionID, this.props.match.url);
        this.state = {
            text: '',
            nextPage: '',
            buttonName: '',
        };
    }

    getText = () => {
        const pageId = this.props.match.params.pageId;
        let text = "";
        let nextPage = "";
        let buttonName = "Next";
        switch (pageId) {
            case "0": {
                text = instr_text.Overview;
                nextPage = page[0];
                // buttonName = "Begin";
            } break;
            case "1": {
                text = instr_text.Examples;
                nextPage = page[1];
            } break;
            case "2": {
                text = instr_text.SolutionTag;
                nextPage = page[2];
                // buttonName = "Tutorial";
            } break;
            default: {

            } break;
        }
        this.setState({ text: text, nextPage: nextPage, buttonName: buttonName });
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.match !== prevProps.match) {
            this.getText();
        }
    }
    componentWillReceiveProps() {
        Meteor.call('sessions.updatePage', this.props.sessionID, this.props.match.url);
    }

    componentDidMount() {
        this.getText();
    }

    render() {
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="text">
                                {this.state.text}
                            </div>
                            <div className="next">
                                {/* {this.props.match.params.pageId === "2" ?
                                    <Link to={"/Instructions/1"}>
                                        <Button id="prevButton" variant="success" >Previous</Button>
                                    </Link>
                                    : null
                                } */}
                                <Link to={this.state.nextPage}>
                                    <Button id="nextButton" variant="success" >{this.state.buttonName}</Button>
                                </Link>
                            </div>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Instruction;
