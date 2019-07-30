import React, { Component } from 'react'
import Clock from '../Clock/Clock.jsx';
import './TaskBubble.css';

class TaskBubble extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.session === null) {
            return ''
        } else {
            // Set Time for Clock here
            var totalTime = 5;
            var time = this.props.session.solution_tagging_time;
            if (this.props.pageId === "/Tag") {
                totalTime = 600;
                time = this.props.session.tagging_time;
            }

            return (
                <div id='taskbubble'>
                    {this.props.pageId === "/Tag" ?
                        <div>
                            Your task is to look through the examples to the right, and tag them with existing or new categories.
                        <br /> <br />
                            <span id="catTagged">{this.props.numNotTag} examples have not been tagged.</span>
                        </div> :
                        <div>
                            Your task is to tag your solution with existing or new categories.
                        <br /> <br />
                        </div>}
                    {<Clock startTime={time} pageId={this.props.pageId} totalTime={totalTime} />}
                </div>
            )
        }
    }
}

// export default TaskBubble;
export default TaskBubble; 