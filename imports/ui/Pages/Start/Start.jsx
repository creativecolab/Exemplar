/* eslint-disable */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Start.css';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            nextPage: '',
            buttonName: '',
        };
    }
    componentDidMount() {
        const data = {
            textIntro: "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.",
            textInterm1: "You will now have 10 minutes to carefully look through the example solutions for the general issue of transportation. Your task is to tag the examples using the existing categories. You may also make your own categories to use as tags.",
            textInterm2: "You will now be asked to generate your own ideas/solutions for the issue of transportation. Particularly, you should generate solutions for the transportation problem that you previously described. The example solutions will be provided, so you may look through them again for inspiration.",
        };

        const page = ["/Problem/Before", "/Start/2", "/Tag"];
        const id = this.props.match.params.id;
        let text = "";
        let nextPage = "";
        let buttonName = "Next";
        switch (id) {
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
            } break;
            default: {

            } break;
        }
        this.setState({ text: text, nextPage: nextPage, buttonName: buttonName });
    }

    render() {
        console.log(Meteor.user());
        console.log("Current User ID" + Meteor.userId());
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
                                <a href={nextPage}>
                                    <Button id="nextButton" variant="success" >{this.state.buttonName}</Button>
                                </a>
                                {/* {console.log(this.props)}
                                <Link to={{ pathname: this.state.nextPage, state: {sessionID: this.props.location.state.sessionID},  }}>
                                    <Button id="nextButton" variant="success" >{this.state.buttonName}</Button>
                                </Link> */}
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
