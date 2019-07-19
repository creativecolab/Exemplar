import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/client/routes.jsx';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render( renderRoutes(), document.getElementById('react-target'));
});
