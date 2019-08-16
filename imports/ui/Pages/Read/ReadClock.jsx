import React, { Component } from 'react'

// Stopwatch component returns the time
export default class ReadClock extends Component {
    constructor(props) {
        super(props);
        if (!this.state) {
            this.state = {
                startTime: new Date().getTime(),
                curTime: null,
            }
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState(
                {
                    curTime: new Date().getTime(),
                }),
            1000
        );
    }

    timeElapsed = () => {
        let timeElapsed = parseInt(Math.abs(this.state.curTime - this.state.startTime) / 1000);
        if (this.props.duration <= timeElapsed && timeElapsed < 10) {
            // this.props.changeNextValueTo(false);
            this.state.enableButton;
            return null;
        }
        return timeElapsed;
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            (this.timeElapsed() == null) ?
                <div>
                    {this.props.btnCmp(false)}
                </div>
                :
                <div>
                    {this.props.btnCmp(true)}
                    <p>Current Time: {this.timeElapsed()}</p>
                </div>
        );
    }
}
