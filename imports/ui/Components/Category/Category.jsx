import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: false,
        }
    }

    clicked = (event, id) => {
        event.preventDefault();
        this.setState({ selected: !this.state.selected });
        this.props.categoryClicked(id);
    }

    render() {
        return (
            <div className={this.state.selected ? "categoryContainerClicked" : "categoryContainer"} onClick={this.props.categoryClicked ? ((event) => this.clicked(event, this.props.category._id)) : null}>
                {this.props.category.label}
            </div>
        )
    }
}

export default Category;
