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
    for(var i = 0; i < instances.length; i++) {
      var curr = Categories.findOne({ _id: instances[i].category_id });
      allCategories.push(<Category key={curr._id} category={curr} categoryClicked={this.categoryClicked} />);
    }
    
    return <div>{allCategories}</div>
  }

  handleNewCategoryChange = (event) => {
    const newVal = event.target.value;
    this.setState({ newCategoryVal: newVal });
  }

  createInstance = (catID) => {
    this.setState({ newCategoryVal: '' });
    Meteor.call('categoryInstances.insert', {catID: catID, exampleID: this.props.example._id});
  }

  addNew = (event) => {
    event.preventDefault();

    if(Categories.findOne({ label: this.state.newCategoryVal })) {
      Meteor.call('categories.increment', this.state.newCategoryVal, (err, result) => {
        if(err) {
          throw new Meteor.Error('call to categories.increment produced an error');
        } else {
          this.createInstance(result);
        }
      });
    } else {
      Meteor.call('categories.insert', this.state.newCategoryVal, (err, result) => {
        if(err) {
          throw new Meteor.Error('call to categories.insert produced an error');
        } else {
          this.createInstance(result);
        }
      });
    }
  }

  render() {
    return (
      <div className="exampleContainer" onClick={this.props.exampleClicked ? ((event) => this.props.exampleClicked(event, this.props.example._id)) : null}>
        <Card text="white" className={this.props.clicked ? "exampleCardClicked" : "exampleCard"}>
          <Card.Body>
            <Card.Text>
              {this.props.example.description}
            </Card.Text>
            <div className="exampleCategoryContainer">
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