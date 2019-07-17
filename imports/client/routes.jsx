import React from 'react';
import { Router, Route, Switch } from 'react-router';
import History from 'history';

// route components
import App from '../ui/App.jsx';

// Pages
import Landing from '../ui/Pages/Landing/Landing.jsx';
import Login from '../ui/Pages/Login/Login.jsx';
import ProblemFormation from '../ui/Pages/ProblemFormation/ProblemFormation.jsx';

const browserHistory = History.createBrowserHistory();

// Text render each page
const textIntro = "You will be given some examples of ideas/solutions that revolve around the theme of transportation. Please look through the examples carefully as you will be asked to generate your own solutions for the issue of transportation and may find it helpful to use the examples as inspirations.";
const textInterm1 = "You will now have 10 minutes to carefully look through the example solutions for the general issue of transportation. Your task is to tag the examples using the existing categories. You may also make your own categories to use as tags.";
const textInterm2 = "You will now be asked to generate your own ideas/solutions for the issue of transportation. Particularly, you should generate solutions for the transportation problem that you previously described. The example solutions will be provided, so you may look through them again for inspiration.";
const textEnd = "You have completed all tasks. Thank you for participating!";



export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/Tag' component={App} />
            {/* RENAME APP TO TAG? */}
            <Route path='/Start' render={() => <Landing text={textIntro} nextPage={"/ProblemFormation"} buttonName="Begin" />} />
            <Route path="/ProblemFormation" render={() => <ProblemFormation ButtonName="Next" />} />
            <Route path='/Interm1' render={() => <Landing text={textInterm1} nextPage={"/Interm2"} buttonName="Next" />} />
            <Route path='/Interm2' render={() => <Landing text={textInterm2} nextPage={"/End"} buttonName="Next" />} />
            <Route path='/End' render={() => <Landing text={textEnd} buttonName="Logout" />} />
        </Switch>
    </Router>
);  