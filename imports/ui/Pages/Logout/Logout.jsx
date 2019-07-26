/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../Start/Start.css';

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout = (e) => {
        e.preventDefault();
        Meteor.logout((err) => {
            if (err) {
                console.log(err.reason);
            } else {
                this.props.logout();
            }
        });
        // console.log(this.props.history);
        return;
    }

    render() {
        const textEnd = "You have completed all tasks. Thank you for participating!";
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="text">
                                {textEnd}
                            </div>
                            <div className="next">
                                <Button id="nextButton" variant="success" onClick={this.handleLogout}>Logout</Button>
                            </div>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Logout;
