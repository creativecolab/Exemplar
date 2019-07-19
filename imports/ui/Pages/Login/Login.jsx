import React, { Component } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    // Validate Login
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = ({ target }) => {
        this.setState({ [target.type]: target.value });
    }

    // Handle Login
    handleLogin = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/Start/0');
            }
        });
        console.log(this.props.history);
    }

    // Handle Account Creation
    handleCreate = (e) => {
        e.preventDefault();
        var email = this.state.email;
        var registerData = {
            username: email.substring(0, email.lastIndexOf("@")),
            email: email,
            password: this.state.password,
        }
        Accounts.createUser(registerData, (err) => {
            if (Meteor.user()) {
                console.log(Meteor.userId());
            } else {
                console.log("ERROR: " + err.reason);
            }
        });
    }


    // Modal TODO


    render() {
        console.log(Meteor.user());
        console.log("Current User ID" + Meteor.userId());
        console.log(Meteor.users.find({ _id: this.userId }));
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="Login">
                                <form onSubmit={this.handleLogin}>
                                    <Form.Group controlId="email" bssize="large">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            required
                                            type="email"
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" bssize="large">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                        />
                                    </Form.Group>
                                    <Button
                                        block
                                        size="sm"
                                        disabled={!this.validateForm}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
                                <br />
                                <Button
                                    block
                                    size="sm"
                                    onClick={this.handleCreate}
                                    type="submit"
                                >
                                    Create Account
                                    </Button>
                            </div>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}