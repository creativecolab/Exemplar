/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const currentText = this.props.text;
        const nextPage = this.props.nextPage;
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
                                    <Button id="nextButton" variant="success">{this.props.buttonName}</Button>
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
export default Landing;
