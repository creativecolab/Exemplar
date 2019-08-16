import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import Clock from '../Clock/Clock.jsx';
import './TaskBubble.css';

class TaskBubble extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentText: '',
            value: '',
            isDisabled: true,
        }
    }

    handleChange = (event) => {
        const value = event.target.value.trim();
        var isDisabled = value ? false : true;
        this.setState({ value: event.target.value, isDisabled: isDisabled });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Catch invalid inputs here TODO
        Meteor.call('userSolutions.insert', this.state.value, (err, result) => {
            if(err) {
                throw new Meteor.Error(err);
            } else {
                Meteor.call('sessions.updateSol', {id: this.props.session._id, sol_id: result}, (e) => {
                    if(e) {
                        throw new Meteor.Error(e);
                    } else {
                        this.props.history.push('/SolutionTag');
                    }
                });
            }
        });
    }

        // const currentPage = this.props.match.params.pageId;
        // if (currentPage === 'Before') {
        //     Meteor.call('sessions.updateProblemBefore', { id: this.props.sessionID, response: this.state.value });
        // } else if (currentPage === 'After') {
        //     Meteor.call('sessions.updateProblemAfter', { id: this.props.sessionID, response: this.state.value });
        // }
        

    render() {
        const placeholderText = "Enter your solution...";
        if (this.props.session === null) {
            return ''
        } else {
            // Set Time for Clock here
            var totalTime = 60;
            var time = this.props.session.solution_tagging_time;
            if (this.props.pageId === "/Tag") {
                totalTime = 180;
                time = this.props.session.tagging_time;
            }

            return (
                <div id='taskbubble'>
                    {this.props.pageId === "/Tag" ?
                        <div>
                            <div>To the right are the examples and labels you just read. Feel free to look through them as you answer the prompt below:</div>
                            <div>
                                <h5>PROMPT</h5> 
                                <p>Define a solution to your problem (below).</p>
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                    {this.state.currentText} <br /><br />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            as='textarea'
                                            placeholder={placeholderText}
                                            aria-describedby="inputGroup"
                                            onChange={this.handleChange}
                                            value={this.state.value}
                                        >
                                        </Form.Control>
                                    </InputGroup>
                                    <div className="next">
                                        <Button
                                            type="submit"
                                            id="nextButton"
                                            variant="success"
                                            disabled={this.state.isDisabled}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                        <br /> <br />
                            {/* <span id="catTagged">{this.props.numNotTag} examples have not been tagged.</span> */}
                        </div> :
                        <div>
                            Your task is to tag your solution with existing or new categories.
                        <br /> <br />
                        </div>}
                    {/* {<Clock startTime={time} pageId={this.props.pageId} totalTime={totalTime} />} */}
                </div>
            )
        }
    }
}

// export default TaskBubble;
export default TaskBubble; 