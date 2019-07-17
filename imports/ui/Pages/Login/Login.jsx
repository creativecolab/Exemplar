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

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = ({ target }) => {
        this.setState({ [target.type]: target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    handleCreate = (e) => {
        e.preventDefault();
        var registerData = {
            email: this.state.email,
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
    // logout(e) {
    //     e.preventDefault();
    //     Meteor.logout((err) => {
    //         if (err) {
    //             console.log(err.reason);
    //         } else {
    //             this.props.history.push('/');
    //         }
    //     });
    //     this.props.history.push('/');
    //     return;
    // }

    render() {
        console.log(Meteor.users);
        console.log("Current User ID" + Meteor.userId());
        //  + " finding vincent: " + Accounts.findUserByEmail("vincentchu5407@gmail.com"));
        console.log(this.state.email);
        console.log(this.state.password);
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="Login">
                                <form onSubmit={this.handleSubmit}>
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
                                        bssize="large"
                                        disabled={!this.validateForm}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
                                <br />
                                <Button
                                    block
                                    bssize="large"
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