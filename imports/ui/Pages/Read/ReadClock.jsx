import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

// Stopwatch component returns the time
export default class ReadClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: new Date().getTime(),
            curTime: new Date().getTime(),
        }
    }
    // Sets the initial timer interval
    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({ curTime: new Date().getTime() }), 1000
        );
    }

    timeElapsed = () => {
        let timeElapsed = parseInt(Math.abs(this.state.curTime - this.props.startTime) / 1000);
        if (this.props.duration <= timeElapsed) {
            return null;
        }
        return timeElapsed;
    }

    // Clears the timer after we move on
    componentWillUnmount() {
        console.log("Unmounted");
        clearInterval(this.timerID);
    }

    render() {
        var timeElapsed = this.timeElapsed();
        var is_disabled = !(timeElapsed == null);
        var currentStatus = this.props.status;
        return (
            <div>
                <Button
                    disabled={is_disabled}
                    onClick={() => this.props.updateStatus(currentStatus)}>
                    {this.props.buttonText}
                </Button>
                {/* <p>Time Elapsed: {timeElapsed}</p> */}
            </div>
        );
    }
}
