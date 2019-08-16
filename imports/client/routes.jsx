import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components
import ProgressBar from '../ui/Components/ProgressBar/ProgressBar.jsx';
import DesignBrief from '../ui/Components/DesignBrief/DesignBrief.jsx';

// Pages
import Start from '../ui/Pages/Start/Start.jsx';
import Login from '../ui/Pages/Login/Login.jsx';
import Logout from '../ui/Pages/Logout/Logout.jsx';
import Problem from '../ui/Pages/ProblemFormation/ProblemFormation.jsx';
import Solution from '../ui/Pages/Solution/Solution.jsx';
import Tag from '../ui/Pages/Tag/Tag.jsx';
import Tutorial from '../ui/Pages/Tutorial/Tutorial.jsx';
import SolutionTag from '../ui/Pages/SolutionTag/SolutionTag.jsx';
import Read from '../ui/Pages/Read/Read.jsx';
import Sessions from '../api/sessions.js';

import { withTracker } from 'meteor/react-meteor-data';


class Routes extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     sessionID: null,
        // }
    }

    // Add a loading page when it is rendering session ID first time!

    login = (sessionID) => {
        // this.setState({ sessionID: sessionID });
        // set state for last screen they were on
    }

    logout = () => {
        // this.setState({ sessionID: null });
    }

    render() {

        const {sessionID} = this.props;

        return (
            <HashRouter>
                {/* {sessionID ? <ProgressBar /> : null} */}
                {sessionID ?
                        <Route path="/:currPg" render={(props) => <ProgressBar {...props} login={this.login} />}/> : null
                    }
                <Switch>
                    {sessionID ?
                        <Redirect exact path="/" to="/Start/0" /> // Replace "/Start..." with lastPg
                        :
                        <Route exact path="/" render={(props) => <Login {...props} login={this.login} />} />
                    }

                    {sessionID ?
                        <Route exact path="/DesignBrief" render={(props) => <DesignBrief {...props} login={this.login} />} />
                        :
                        <Redirect path="/DesignBrief" to="/DesignBrief" />
                    }

                    {sessionID ?
                        <Route path='/Start/:pageId' render={(props) => <Start {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Start/:pageId" to="/" />
                    }

                    {sessionID ?
                        <Route path='/Examples/:pageId' render={(props) => <Read {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Examples/:pageId" to="/" />
                    }

                    {sessionID ?
                        <Route path='/Tutorial' render={(props) => <Tutorial {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Tutorial" to="/" />
                    }

                    {sessionID ?
                        <Route path='/Tag' render={(props) => <Tag {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Tag" to="/" />
                    }


                    {sessionID ?
                        <Route path='/Problem/:pageId' render={(props) => <Problem {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Problem/:pageId" to="/" />
                    }

                    {sessionID ?
                        <Route path='/Solution/:pageId' render={(props) => <Solution {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/Solution/:pageId" to="/" />
                    }

                    {sessionID ?
                        <Route path='/SolutionTag' render={(props) => <SolutionTag {...props} sessionID={sessionID} />} />
                        :
                        <Redirect path="/SolutionTag" to="/" />
                    }

                    {sessionID ?
                        <Route path='/End' render={(props) => <Logout {...props} sessionID={sessionID} logout={this.logout} />} />
                        :
                        <Redirect path="/End" to="/" />
                    }
                </Switch>
            </HashRouter>
        )
    }
}

export default withTracker(() => {
    const session = Sessions.findOne({ user_id: Meteor.userId(), finished_at: null })
    if (session) return {sessionID: session._id};
    return {}
})(Routes);