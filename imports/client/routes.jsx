import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

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

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: null,
        }
    }

    login = (sessionID) => {
        this.setState({ sessionID: sessionID });
    }

    logout = () => {
        this.setState({ sessionID: null });
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    {this.state.sessionID ?
                        <Redirect exact path="/" to="/Start/0" />
                        :
                        <Route exact path="/" render={(props) => <Login {...props} login={this.login} />} />
                    }

                    {this.state.sessionID ?
                        <Route path='/Start/:pageId' render={(props) => <Start {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Start/:pageId" to="/" />
                    }

                    {this.state.sessionID ?
                        <Route path='/Read/:pageId' render={(props) => <Read {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Read/:pageId" to="/" />
                    }

                    {this.state.sessionID ?
                        <Route path='/Tutorial' render={(props) => <Tutorial {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Tutorial" to="/" />
                    }

                    {this.state.sessionID ?
                        <Route path='/Tag' render={(props) => <Tag {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Tag" to="/" />
                    }


                    {this.state.sessionID ?
                        <Route path='/Problem/:pageId' render={(props) => <Problem {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Problem/:pageId" to="/" />
                    }

                    {this.state.sessionID ?
                        <Route path='/Solution/:pageId' render={(props) => <Solution {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/Solution/:pageId" to="/" />
                    }

                    {this.state.sessionID ?
                        <Route path='/SolutionTag' render={(props) => <SolutionTag {...props} sessionID={this.state.sessionID} />} />
                        :
                        <Redirect path="/SolutionTag" to="/" />
                    }
                    
                    {this.state.sessionID ?
                        <Route path='/End' render={(props) => <Logout {...props} sessionID={this.state.sessionID} logout={this.logout} />} />
                        :
                        <Redirect path="/End" to="/" />
                    }
                </Switch>
            </HashRouter>
        )
    }
}

// export const renderRoutes = () => (
//    <Router history={browserHistory}>
//        <Switch>
//            <Route exact path='/' component={Login}/>
//            <Route path='/Start/:pageId' component={Start} />
        //    <Route path='/Tag' component={App} />
        //    <Route path='/Problem/:pageId' component={Problem} />
        //    <Route path='/Solution' component={Solution} />
        //    <Route path='/End' component={Logout} />
//        </Switch>
//    </Router>
// );
