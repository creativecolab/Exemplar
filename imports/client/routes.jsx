import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import History from 'history';

// route components
import App from '../ui/App.jsx';

// Pages
import Start from '../ui/Pages/Start/Start.jsx';
import Login from '../ui/Pages/Login/Login.jsx';
import Logout from '../ui/Pages/Logout/Logout.jsx';
import ProblemFormation from '../ui/Pages/ProblemFormation/ProblemFormation.jsx';

const browserHistory = History.createBrowserHistory();

export default class ExemplarRouter extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/Tag' component={App} />
                    <Route path='/Start/:id' component={Start} />
                    <Route path='/End' component={Logout} />
                    {/* <Route exact path='/' render={() => <Login updateSessionID={this.updateSessionID} history={this.state.browserHistory}/> } /> */}
                    {/* <Route path='/Tag' render={(props) => <App {...props} sessionID={this.state.sessionID} />} /> */}
                </Switch>
            </Router>
        )
    }
}

// var state = { sessionID: null };

// updateSessionID = (sessID) => {
//     console.log(this.state);
//     state.sessionID = sessID;
// }

// export const renderRoutes = () => (
    // <Router history={browserHistory}>
    //     <Switch>
    //         {/* <Route exact path='/' component={Login}/> */}
    //         {/* <Route path='/Tag' component={App} /> */}
    //         <Route exact path='/' render={() => <Login updateSessionID={updateSessionID} history={browserHistory}/> } />
    //         <Route path='/Tag' render={() => <App sessionID={state.sessionID} />} />
    //         <Route path='/Start/:id' component={Start} />
    //         <Route path='/End' component={Logout} />
    //     </Switch>
    // </Router>
// );


// const textIntro = "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.";
// const textInterm1 = "You will now have 10 minutes to carefully look through the example solutions for the general issue of transportation. Your task is to tag the examples using the existing categories. You may also make your own categories to use as tags.";
// const textInterm2 = "You will now be asked to generate your own ideas/solutions for the issue of transportation. Particularly, you should generate solutions for the transportation problem that you previously described. The example solutions will be provided, so you may look through them again for inspiration.";


// render={() => <Landing text={textIntro} nextPage={"/ProblemFormation"} buttonName="Begin" />} />
            // <Route path="/ProblemFormation" render={() => <ProblemFormation ButtonName="Next" />} />
            // <Route path='/Interm1' render={() => <Landing text={textInterm1} nextPage={"/Interm2"} buttonName="Next" />} />
            // <Route path='/Interm2' render={() => <Landing text={textInterm2} nextPage={"/End"} buttonName="Next" />} />