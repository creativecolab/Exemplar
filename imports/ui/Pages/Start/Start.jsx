/* eslint-disable */
import './Start.css';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const data = {
    textIntro: "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.",
    textInterm1: "You will be presented with a set of existing solutions for the general issue of transportation. You have 10 minutes to carefully read through the example solutions and complete your task (described on the next screen).",
    textInterm2: "Your task is to organize the examples by tagging them with categories. You may either use existing categories or create your own.",
    textInterm3: "Your next task requires you to organize your solution in relation to the previously provided example solutions. Again, use the existing categories or create your own to tag your idea/solution."
};

const page = ["/Problem/Before", "/Start/2", "/Tutorial", "/SolutionTag"];

class Start extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.url)
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
                text = data.textIntro;
                nextPage = page[0];
                buttonName = "Begin";
            } break;
            case "1": {
                text = data.textInterm1;
                nextPage = page[1];
            } break;
            case "2": {
                text = data.textInterm2;
                nextPage = page[2];
                buttonName = "Tutorial";
            } break;
            case "3": {
                text = data.textInterm3;
                nextPage = page[3];
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

    componentDidMount() {
        this.getText();
    }

    render() {
        var currentText = this.state.text;
        var nextPage = this.state.nextPage;
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="text">
                                {currentText}
                            </div>
                            <div className="next">
                                {this.props.match.params.pageId === "2" ?
                                    <Link to={"/Start/1"}>
                                        <Button id="prevButton" variant="success" >Previous</Button>
                                    </Link>
                                    : null
                                }
                                <Link to={nextPage}>
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
export default Start;
