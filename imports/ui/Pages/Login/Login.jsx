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
            mturkId: '',
            error: ''
        };
    }

    handleChange = ({ target }) => {
        this.setState({ mturkId: target.value });
        // TODO Future: MTURK VALIDATION OF REAL WORKER ID
        // var input = target.value.trim().length;
        // this.setState({ error: (input > 0 && input < 15) ? '' : 'invalid input'});
    }

    // Handle Login
    handleLogin = (e) => {
        e.preventDefault();
        let user = this.state.mturkId;
        let password = this.hashCode(this.state.mturkId);
        // If account does not exist create account, will not create if it already exists
        this.createAccount(user, password);
        // Account Exists: login with that account or previous account
        this.loginUser(user, password);
    }

    // Login account
    loginUser = (user, password) => {
        console.log(user);
        Meteor.loginWithPassword(user, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                // Continue old session or Start new one if does not exist
                var contSess = Sessions.findOne({ user_id: Meteor.userId(), finished_at: null });
                if (contSess) {
                    console.log('Session found:' + contSess);
                } else {
                    console.log('Session NOT found, creating new one');
                    Meteor.call('sessions.insert', Meteor.userId(), (err, result) => {
                        if (err) {
                            throw new Meteor.Error(err);
                        } else {
                            console.log(result);
                        }
                    })
                }
            }
        });
    }

    // Account Creation
    createAccount = (user, password) => {
        var registerData = {
            username: user,
            password: password,
            profile: { curr_session_id: this.props.curr_session_id },
        }
        Accounts.createUser(registerData, (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }

    // Hashes the password based on username TODO FIXME HASH THE CODE VIA STRING
    hashCode(s) {
        let h;
        for (let i = 0; i < s.length; i++) {
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        }
        return h.toString();
    }

    render() {
        return (
            <div className="Landing">
                <Container fluid="true">
                    <Row>
                        <Col md={4} ></Col>
                        <Col md={4} className="box" >
                            <div className="Login">
                                <div id="loginErr">{this.state.error ? "Mturk Id should be your 14 character userId" : null}</div>
                                <form onSubmit={this.handleLogin}>
                                    <Form.Group controlId="mturkId" bssize="large">
                                        <Form.Label>Please enter your MturkId:</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            required
                                            type="mturkId"
                                            onChange={this.handleChange}
                                            value={this.state.mturkId}
                                        />
                                    </Form.Group>
                                    <Button
                                        block
                                        varient="success"
                                        size="sm"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
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