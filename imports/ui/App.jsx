/* eslint-disable */
import React, { Component } from 'react';
import $ from 'jquery';
import {Container, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';

import './App.css';
import Category from './Components/Category/Category.jsx';
import Example from './Components/Example/Example.jsx';

import Categories from '../api/categories.js';
import Examples from '../api/examples.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleClicked: null,
      categoriesSelected: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      $(this.refs.intro).slideUp();
    }, 200);
  }

  categoryClicked = (id) => {
    var newArr = this.state.categoriesSelected;
    var idx = newArr.indexOf(id);
    if(idx !== -1) {
      newArr.splice(idx, 1);
    } else { 
      newArr.push(id);
    }
    this.setState({ categoriesSelected: newArr });

    console.log(this.state.categoriesSelected);
  }

  exampleClicked = (event, id) => {
    event.preventDefault();
    var ex = Examples.findOne({ _id: id });
    this.setState({ exampleClicked: ex });
  }

  exampleUnclicked = (event) => {
    event.preventDefault();
    if (event.target.className === "exampleContainer") {
      this.setState({ exampleClicked: null });
    }
  }

  displayCategories = () => {
    // FILTER CATEGORIES HERE
    // Category.find({ condition: 'surface' }).fetch();
    var allCategories = [];

    for(var i = 0; i < this.props.categories.length; i++) {
      allCategories.push(<Category key={this.props.categories[i]._id} category={this.props.categories[i]} categoryClicked={this.categoryClicked} />);
    }
    
    return <div style={{padding: '10px'}}>{allCategories}</div>
  }

  displayExamples = () => {
    var allExamples = [];
    var currRow = [];

    for (var i = 0; i < this.props.examples.length; i++) {
      currRow.push(<Example key={this.props.examples[i]._id} example={this.props.examples[i]} clicked={false} exampleClicked={this.exampleClicked} />);
      if (((i % 4) == 0) || (i == (this.props.examples.length - 1))) {
        allExamples.unshift(<Row key={"row " + i}>{currRow}</Row>);
        currRow = [];
      }
    }

    return <div>{allExamples}</div>
  }

  render() {
    return (
      <div className="App">
        <Container fluid="true">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="LeftPane">
                <div className="LeftPane-header">
                  Categories
                </div>
                {this.displayCategories()}
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="Place">
                <Container style={{ position: "relative" }}>
                  {this.displayExamples()}
                  {this.state.exampleClicked ?
                    <div id="exampleClickedDiv" onClick={(event) => this.exampleUnclicked(event)}>
                      <Example example={this.state.exampleClicked} clicked={true} clickHandler={null} />
                    </div>
                    :
                    null
                  }
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    examples: Examples.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  }
})(App);
