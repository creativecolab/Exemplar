import React, { Component } from 'react'
import Clock from '../Clock/Clock.jsx';
import './Information.css';

export default class Information extends Component {
    render() {
        var time = new Date().getTime();
        return (
            <div className="clock">
                {<Clock big startTime={time} totalTime={600} />}
                {/* Examples shown and examples untagged */}
            </div>
        )
    }
}


