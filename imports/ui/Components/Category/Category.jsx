import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';

class Category extends Component {
    constructor(props) {
        super(props);

        var className;
        if(props.selected && props.clickable) {
            className = "categoryContainerClicked";
        } else if(!props.selected && props.clickable) {
            className = "categoryContainer";
        } else if(!props.clickable && props.preview) {
            className = "categoryContainerPreview";
        } else if(!props.clickable && !props.preview) {
            className = "categoryContainerNoClick";
        }
        
        this.state = {
            selected: false,
            style: className,
        }
    }
  
    clicked = (event, id) => {
        event.preventDefault();
        this.props.categoryClicked(id);
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props) {
            var className;
            if(this.props.selected && this.props.clickable) {
                className = "categoryContainerClicked";
            } else if(!this.props.selected && this.props.clickable) {
                className = "categoryContainer";
            } else if(!this.props.clickable && this.props.preview) {
                className = "categoryContainerPreview";
            } else if(!this.props.clickable && !this.props.preview) {
                className = "categoryContainerNoClick";
            }
            this.setState({ style: className });
        }
    }

    render() {
        return (
            <div className={this.state.style} onClick={this.props.categoryClicked ? ((event) => this.clicked(event, this.props.category._id)) : null}>
                {this.props.category.label}
            </div>
        )
    }
}

export default Category;
