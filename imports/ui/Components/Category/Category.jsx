import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);

        var className;
        if(props.selected) {
            className = "categoryContainerClicked";
        } else if(props.preview) {
            className = "categoryContainerPreview";
        } else {
            className = "categoryContainer";
        }
        
        this.state = {
            selected: false,
            style: className,
        }
    }
  
    clicked = (event, id) => {
        event.preventDefault();
        if((event.target.className === 'categoryContainer') || (event.target.className === 'categoryContainerClicked')) {
            this.props.categoryClicked(id);
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) {
            var className;
            if(this.props.selected) {
                className = "categoryContainerClicked";
            } else if(this.props.preview) {
                className = "categoryContainerPreview";
            } else {
                className = "categoryContainer";
            }
            this.setState({ style: className });
        }
    }

    render() {
        return (
            <div className={this.state.style} onClick={this.props.categoryClicked ? ((event) => this.clicked(event, this.props.category._id)) : null}>
                {this.props.category.label}
                {this.props.own ? <span className="delete" onClick={(event) => {this.props.deleteHandler(event, this.props.category._id)}}>X</span> : null}
            </div>
        )
    }
}

export default Category;
