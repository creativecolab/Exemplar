import { List } from 'immutable';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';
import Categories from '../../../api/categories.js';

class Category extends Component {

    render() {
        return (null);
    }
}

export default withTracker(() => {
    return {
        categories: Categories.find({}).fetch(),
    }
})(Category);
