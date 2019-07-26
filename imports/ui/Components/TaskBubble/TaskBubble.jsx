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
            var totalTime = 2;
            var time = new Date().getTime();

            return (
                <div id='taskbubble'>
                    Your task is to look through the examples to the right, and tag them with existing or new categories.
                    <br /> <br />
                    <span id="catTagged">{this.props.numNotTag} examples have not been tagged.</span>
                    {<Clock startTime={time} pageId={this.props.pageId} totalTime={totalTime} />}
                </div>
            )
        }
    }
}

// export default TaskBubble;
export default TaskBubble;