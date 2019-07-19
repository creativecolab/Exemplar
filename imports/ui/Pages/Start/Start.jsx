/* eslint-disable */
import './Start.css';
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
            } break;
            default: {

            } break;
        }
        this.setState({ text: text, nextPage: nextPage, buttonName: buttonName });
        // TODO ADD IN PREVIOUS BUTTON FOR START 2 and START 4
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
                                <a href={nextPage}>
                                    <Button id="nextButton" variant="success" >{this.state.buttonName}</Button>
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
export default Start;
