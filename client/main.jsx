import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Routes from '../imports/client/routes.jsx';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render( <Routes />, document.getElementById('react-target'));
});
