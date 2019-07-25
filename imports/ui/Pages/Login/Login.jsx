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
                var sessionID = Sessions.insert({
                    condition: 'deep',   // UPDATE LATER
                    user_id: Meteor.userId(),
                    created_at: new Date(),
                    finished_at: null,
                    user_problem_before: null,
                    user_problem_after: null,
                    problem_before_time: null,
                    problem_after_time: null,
                    tagging_time: null,
                    ideation_time: null,
                    tagging_own_time: null
                  });
                this.props.login(sessionID);
                // this.props.history.push('/Start/0');
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