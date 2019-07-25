/* eslint-disable */
import './Start.css';
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const data = {
    textIntro: "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.",
    textInterm1: "You will now have 10 minutes to carefully look through the example solutions for the general issue of transportation. Your task is to tag the examples using the existing categories. You may also make your own categories to use as tags.",
    textInterm2: "You will now be asked to generate your own ideas/solutions for the issue of transportation. Particularly, you should generate solutions for the transportation problem that you previously described. The example solutions will be provided, so you may look through them again for inspiration.",
    textInterm3: "You will once again be presented with the example solutions, as well as your own solution. Your next task requires you to organize your solution in relation to the provided example solutions.",
    textInterm4: "Again, use the existing categories or create your own to tag your idea/solution. Feel free to add tags to the provided examples if you feel they somehow relate to your own idea/solution."
};

const page = ["/Problem/Before", "/Start/2", "/Tag", "/Start/4"];

class Start extends Component {
    constructor(props) {
        super(props);
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
            } break;
            case "3": {
                text = data.textInterm3;
                nextPage = page[3];
            } break;
            case "4": {
                text = data.textInterm4;
                nextPage = page[2];
            } break;
            default: {

            } break;
        }
        this.setState({ text: text, nextPage: nextPage, buttonName: buttonName });
        // TODO ADD IN PREVIOUS BUTTON FOR START 2 and START 4
    }
    
    componentDidUpdate = (prevProps) => {
        if(this.props.match !== prevProps.match) {
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
