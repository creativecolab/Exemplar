import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Autosuggest from 'react-autosuggest';

import './Example.css';
import Category from '../Category/Category.jsx';
import Categories from '../../../api/categories.js';
import CategoryInstances from '../../../api/categoryInstances.js';
import Interactions from '../../../api/interactions.js';

class Example extends Component {
  constructor(props) {
    super(props);  
    
    var sess = Sessions.findOne({ _id: props.sessionID });
    var catLabels = Categories.find({ deleted: false, $or: [{condition: sess.condition}, {created_by: Meteor.userId()}] }).fetch();

    this.state = {
      newCategoryVal: '',
      labels: catLabels,
      suggestions: [],
      session: sess,
      categories: [],
    }
  }

  componentDidUpdate = (prevProps) => {
  if((this.props.categories !== prevProps.categories)) {
      var catLabels = Categories.find({ deleted: false, $or: [{condition: this.state.session.condition}, {created_by: Meteor.userId()}] }).fetch();
      this.setState({ labels: catLabels });
    }
  }

  shortenDescription = () => {
    return this.props.example.description.slice(0, 115) + "...";
  }

  deleteHandler = (event, catID) => {
    event.preventDefault();
    Meteor.call('categoryInstances.delete', { catID: catID, exID: this.props.example._id });
  }

  displayAllCategories = () => {
    var allCategories = [];
    var categoriesAdded = [];

    var instances = CategoryInstances.find({ example_id: this.props.example._id, user_id: Meteor.userId(), deleted: false, session_id: this.props.sessionID }).fetch();
    console.log(instances);
    instances.map((instance) => {
      var category = Categories.findOne({ _id: instance.category_id });
      if(!category.deleted) { 
        if((categoriesAdded.indexOf(category._id) === -1) || (categoriesAdded.length === 0)) {
          categoriesAdded.push(category._id);
          allCategories.push(<Category key={category._id} category={category} categoryClicked={null} fromEx={true} deleteHandler={this.deleteHandler} />)
        }
      }
    });

    return <div>{allCategories}</div>
  }

  displayPreviewCategories = () => {
    var allCategories = [];
    var categoriesAdded = [];

    var instances = CategoryInstances.find({ example_id: this.props.example._id, user_id: Meteor.userId(), deleted: false, session_id: this.props.sessionID }).fetch();
    instances.map((instance) => {
      var category = Categories.findOne({ _id: instance.category_id });
      if(!category.deleted) {
        if((categoriesAdded.indexOf(category._id) === -1) || (categoriesAdded.length === 0)) {
          categoriesAdded.push(category._id);
          allCategories.push(<Category key={category._id} category={category} categoryClicked={null} preview={true} deleteHandler={this.deleteHandler} />)
        }
      }
    });

    return allCategories.length === 0 ? <div style={{ color: 'darkgray', fontSize: '14px' }}>No tags</div> : <div>{allCategories}</div>
  }

  handleNewCategoryChange = (event, { newValue, method }) => {
    if((newValue.length < 25)) {
      this.setState({ newCategoryVal: newValue });
    }
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : this.state.labels.filter((l) => {
      return l.label.toLowerCase().slice(0, inputLength) === inputValue
    });
  };

  getSuggestionValue = (suggestion) => { return suggestion.label;}

  renderSuggestion = (suggestion) => (
    <div>
      {suggestion.label}
    </div>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  createInstance = (catID) => {
    this.setState({ newCategoryVal: '' });
    // Meteor.call('interactions.insert', {sessionID: this.state.session._id, type: "tagAdded"});
    Meteor.call('categoryInstances.insert', {catID: catID, exampleID: this.props.example._id, sessionID: this.state.session._id});
  }

  addNew = (event) => {
    event.preventDefault();

    if(this.state.newCategoryVal === "") return;
    var existingCategory = Categories.findOne({ label: this.state.newCategoryVal, deleted: false, $or: [{condition: this.state.session.condition}, {created_by: Meteor.userId()}] });
    if(existingCategory) {
      Meteor.call('categories.increment', existingCategory._id, (err, result) => {
        if(err) {
          throw new Meteor.Error(err);
        } else {
          this.createInstance(result);
        }
      });
    } else {
      Meteor.call('categories.insert', this.state.newCategoryVal, (err, result) => {
        if(err) {
          throw new Meteor.Error(err);
        } else {
          this.createInstance(result);
        }
      });
    }
  }

  render() {
    const value = this.state.newCategoryVal
    const inputProps = {
      placeholder: 'add a new category...',
      value,
      onChange: this.handleNewCategoryChange
    };

    return (
      <div className="exampleContainer" onClick={this.props.exampleClicked ? ((event) => this.props.exampleClicked(event, this.props.example._id)) : null}>
        <Card text="white" className={this.props.clicked ? "exampleCardClicked" : "exampleCard"}>
          <Card.Body>
            <Card.Text>
              {this.props.clicked ? this.props.example.description : this.shortenDescription()}
            </Card.Text>
            {this.props.clicked ? 
              <div className="exampleCategoryContainer">
                {this.displayAllCategories()}
                <form id="newCategory" onSubmit={this.addNew}>
                  <Autosuggest
                    id="newCategoryInput"
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                  />
                </form>
              </div>
              :
              null
            }
          </Card.Body>
        </Card>
        {!this.props.clicked ? 
          <div className="exampleGradient">
            <div className="preview">{this.displayPreviewCategories()}</div>
          </div>
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
    interactions: Interactions.find({}).fetch(),
    user: Meteor.user(),
  }
})(Example);