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
        } else if(props.fromRead) {
            className = "categoryContainerRead";
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
        if((event.target.className === 'categoryContainer') || (event.target.className === 'categoryContainerClicked') || (event.target.className === 'lightLabel')) {
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
                <span className={this.props.fromRead ? "darkLabel" : "lightLabel"}>{this.props.category.label}</span>
                {this.props.own || this.props.fromEx ? <span className={this.props.selected ? "deleteWhite" : "deleteGreen"} onClick={(event) => {this.props.deleteHandler(event, this.props.category._id)}}>X</span> : null}
            </div>
        )
    }
}

export default Category;
