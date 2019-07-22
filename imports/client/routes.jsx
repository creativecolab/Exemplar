import React from 'react';
import { Router, Route, Switch } from 'react-router';
import History from 'history';

// route components
import App from '../ui/App.jsx';

// Pages
import Start from '../ui/Pages/Start/Start.jsx';
import Login from '../ui/Pages/Login/Login.jsx';
import Logout from '../ui/Pages/Logout/Logout.jsx';
import Problem from '../ui/Pages/ProblemFormation/ProblemFormation.jsx';
import Solution from '../ui/Pages/Solution/Solution.jsx';

const browserHistory = History.createBrowserHistory();

export const renderRoutes = () => (
   <Router history={browserHistory}>
       <Switch>
           <Route exact path='/' component={Login}/>
           <Route path='/Start/:pageId' component={Start} />
           <Route path='/Tag' component={App} />
           <Route path='/Problem/:pageId' component={Problem} />
           <Route path='/Solution' component={Solution} />
           <Route path='/End' component={Logout} />
       </Switch>
   </Router>
);
