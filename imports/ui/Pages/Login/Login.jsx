import './Login.css';
import React, { Component } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import Sessions from '../../../api/sessions.js';

class Login extends Component {
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
                var contSess = Sessions.findOne({ user_id: Meteor.userId(), finished_at: null });
                if(contSess) {
                    this.props.login(contSess._id);
                    // Pass last pg to router
                } else {
                    Meteor.call('sessions.insert', (err, result) => {
                        if(err) {
                            throw new Meteor.Error(err);
                        } else {
                            this.props.login(result);
                        }
                    })
                }
            }
        });
    }

    // Handle Account Creation
    handleCreate = (e) => {
        e.preventDefault();
        var email = this.state.email;
        var registerData = {
            username: email.substring(0, email.lastIndexOf("@")),
            email: email,
            password: this.state.password,
            profile: { curr_session_id: null },
        }
        this.setState({ error: '' });
        Accounts.createUser(registerData, (err) => {
            if (Meteor.user()) {
                // console.log(Meteor.userId());
            } else {
                console.log("ERROR: " + err.reason);
            }
        });
    }
    
    render() {
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="Login">
                                <div id="loginErr">{this.state.error ? "Please create an account" : null}</div>
                                <form onSubmit={this.handleLogin}>
                                    <Form.Group controlId="email" bssize="large">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            required
                                            autoComplete={"username"}
                                            type="email"
                                            onChange={this.handleChange}
                                            value={this.state.email}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" bssize="large">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            autoComplete={"current-password"}
                                            type="password"
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                        />
                                    </Form.Group>
                                    <Button
                                        block
                                        varient="success"
                                        size="sm"
                                        disabled={!this.validateForm}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
                                <br />
                                <br />
                                <Button
                                    block
                                    id="createAccount"
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

export default withTracker(() => {
    return {
        sessions: Sessions.find({}).fetch(),
        user: Meteor.user()
    }
})(Login);