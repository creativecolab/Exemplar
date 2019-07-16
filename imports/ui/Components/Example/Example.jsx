import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Autosuggest from 'react-autosuggest'; // TODO + search

import './Example.css';
import Category from '../Category/Category.jsx';
import Categories from '../../../api/categories.js';
import CategoryInstances from '../../../api/categoryInstances.js';

class Example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      newCategoryVal: ''
    }
  }

  displayCategories = () => {
    var allCategories = [];

    var instances = CategoryInstances.find({ example_id: this.props.example._id }).fetch();
    for(var i = 0; i < this.props.categories.length; i++) {
      allCategories.push(<Category key={this.props.categories[i]._id} category={this.props.categories[i]} categoryClicked={this.categoryClicked} />);
    }
    
    return <div>{allCategories}</div>
  }

  handleNewCategoryChange = (event) => {
    const newVal = event.target.value;
    this.setState({ newCategoryVal: newVal });
  }

  addNew = (event) => {
    event.preventDefault();
    if(Categories.find({ label: this.state.newCategoryVal })) {
      Meteor.call('categories.increment', this.state.newCategoryVal);
    } else {
      // Meteor.call('categories.insert', this.state.newCategoryVal); // TODO Determine what else needs to be passed to create new Categories - condition -- should be null. user?
    }

    // Meteor.call('categoryInstances.insert', ) TODO Determine what needs to be passed to create new CategoryInstances - example_id, category_id (from above)
  }

  render() {
    return (
      <div className="exampleContainer" onClick={this.props.exampleClicked ? ((event) => this.props.exampleClicked(event, this.props.example._id)) : null}>
        <Card text="white" className={this.props.clicked ? "exampleCardClicked" : "exampleCard"}>
          <Card.Body>
            <Card.Text>
              {this.props.example.description}
            </Card.Text>
            <div>
              {this.displayCategories()}
              <form id="newCategory" onSubmit={this.addNew}>
                <input id="newCategoryInput" type="text" value={this.state.newCategoryVal} placeholder="add a new category..." onChange={this.handleNewCategoryChange} />
              </form>
            </div>
          </Card.Body>
        </Card>
        {!this.props.clicked ? 
          <div className="exampleGradient"><span></span></div>
          :
          null
        }
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    categories: Categories.find({}).fetch(),
    categoryInstances: CategoryInstances.find({}).fetch(),
  }
})(Example);