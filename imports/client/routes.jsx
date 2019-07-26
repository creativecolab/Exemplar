import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// route components
import App from '../ui/App.jsx';

// Pages
import Start from '../ui/Pages/Start/Start.jsx';
import Login from '../ui/Pages/Login/Login.jsx';
import Logout from '../ui/Pages/Logout/Logout.jsx';
import Problem from '../ui/Pages/ProblemFormation/ProblemFormation.jsx';
import Solution from '../ui/Pages/Solution/Solution.jsx';


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

    render() {
        return (
            <HashRouter>
                {/* {this.state.sessionID ? 
                        <Redirect exact path="/" to="/State/0" />
                        : */}
                {/* <Route exact path="/" render={(props) => <Login {...props} login={this.login} />} /> */}
                {/* } */}
                <Switch>
                    {this.state.sessionID ?
                        <Redirect exact path="/" to="/Start/0" />
                        :
                        <Route exact path="/" render={(props) => <Login {...props} login={this.login} />} />
                    }
                    <Route path='/Start/:pageId' render={(props) => <Start {...props} sessionID={this.state.sessionID} />} />
                    <Route path='/Tag/:pageId' render={(props) => <App {...props} sessionID={this.state.sessionID} />} />
                    <Route path='/Problem/:pageId' render={(props) => <Problem {...props} sessionID={this.state.sessionID} />} />
                    <Route path='/Solution' render={(props) => <Solution {...props} sessionID={this.state.sessionID} />} />
                    <Route path='/End' render={(props) => <Logout {...props} sessionID={this.state.sessionID} />} />
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
