import React, { Component } from 'react'
import Clock from '../Clock/Clock.jsx';
import './Information.css';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Information extends Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     if (this.props.setTime) {
    //         var time = new Date().getTime();
    //         // if (this.props.user) {
    //         var id = this.props.session_id;
    //         time = Sessions.findOne({ _id: id }, { fields: { tagging_time: 1 } }).tagging_time;
    //         console.log(time);
    //         // }
    //         this.setState({
    //             time: time,
    //             totalTime: 60
    //         })
    //     }
    // }

    render() {
        console.log(this.props.session);
        if (this.props.session === null) {
            console.log("EMPTY");
            console.log(this.props);
            return ''
        }
        else {
            // var id = this.props.user.profile.curr_session_id;
            // console.log(this.props)
            // This find is taking eternity^
            // var time = this.props.session.tagging_time;
            var totalTime = 60;
            var time = new Date().getTime();
            return (
                <div className="clock">
                    {<Clock big startTime={time} totalTime={totalTime} />}
                    {/* Examples shown and examples untagged */}
                </div>
            )
        }
    }
}

// export default Information;
export default withTracker(() => {
    return {
        // sessions: Sessions.find({}).fetch(),
        // user: Meteor.user(),
    }
})(Information);