import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Autosuggest from 'react-autosuggest';

import './Example.css';
import Category from '../Category/Category.jsx';
import Categories from '../../../api/categories.js';
import CategoryInstances from '../../../api/categoryInstances.js';

class Example extends Component {
  constructor(props) {
    super(props);

    var sess = Sessions.find({ user_id: Meteor.userId(), finished_at: null }).fetch();

    this.state = {
      newCategoryVal: '',
      labels: [],
      suggestions: [],
      session: (sess[0] ? sess[0] : null),
    }
  }

  componentDidMount = () => {
    var catLabels = [];
    if(this.state.session) {
      this.props.categories.map((category) => {
        if((this.state.session.condition === category.condition) || (category.created_by === Meteor.userId())) {
          console.log("ADDING");
          catLabels.push(category.label);
        }
      });
    }
    this.setState({ labels: catLabels });
  }

  displayCategories = () => {
    var allCategories = [];
    var categoriesAdded = [];

    // console.log(this.state.session); 
    if(this.state.session) {
      var instances = CategoryInstances.find({ example_id: this.props.example._id, user_id: Meteor.userId() }).fetch();
      instances.map((instance) => {
        var category = Categories.findOne({ _id: instance.category_id });
        if((categoriesAdded.indexOf(category._id) === -1) || (categoriesAdded.length === 0)) {
          categoriesAdded.push(category._id);
          allCategories.push(<Category key={category._id} category={category} categoryClicked={null} />)
        }
      });
    }

    return <div>{allCategories}</div>
  }

  handleNewCategoryChange = (event, { newValue, method }) => {
    this.setState({ newCategoryVal: newValue });
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    console.log(this.state.labels);
    return inputLength === 0 ? [] : this.state.labels.filter((label) =>
      label.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = (suggestion) => { return suggestion;}

  renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
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
    Meteor.call('categoryInstances.insert', {catID: catID, exampleID: this.props.example._id, sessionID: this.state.session._id});
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
              {this.props.example.description}
            </Card.Text>
            <div className="exampleCategoryContainer">
              {this.displayCategories()}
              <form id="newCategory" onSubmit={this.addNew}>
                {/* <input id="newCategoryInput" type="text" value={this.state.newCategoryVal} placeholder="add a new category..." onChange={this.handleNewCategoryChange} /> */}
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