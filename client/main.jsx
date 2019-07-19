import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ExemplarRouter from '../imports/client/routes.jsx';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<ExemplarRouter />, document.getElementById('react-target'));
});
