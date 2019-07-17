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
import CategoryInstances from '../api/categoryInstances.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleClicked: null,
      categoriesSelected: [],
      examples: [],
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
    var exAddedOld = [];
    var exAddedNew = [];
    var exObjs = [];

    this.state.categoriesSelected.map((categoryID, idx) => {
      var instances = CategoryInstances.find({ category_id: categoryID }).fetch();
      instances.map((instance) => {
        var ex = Examples.findOne({ _id: instance.example_id });
        if((exAddedOld.indexOf(ex._id) !== -1) || (idx === 0)) {
          exAddedNew.push(ex._id);
          if(idx === (this.state.categoriesSelected.length - 1)) {
            exObjs.push(ex);
          }
        }
      }); 
      exAddedOld = exAddedNew;
      exAddedNew = [];
    });

    this.setState({ examples: exObjs });
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

    this.props.categories.map((category) => {
      allCategories.push(<Category key={category._id} category={category} categoryClicked={this.categoryClicked} />);
    })
    
    return <div style={{padding: '10px'}}>{allCategories}</div>
  }

  displayExamples = () => {
    var examples = [];
    var retVal = [];
    var currRow = [];

    if((this.state.examples.length === 0) && (this.state.categoriesSelected.length === 0)) {
      examples = this.props.examples;
    } else {
      examples = this.state.examples;
    }
    
    examples.map((example, i) => {
      currRow.push(<Example key={example._id} example={example} clicked={false} exampleClicked={this.exampleClicked} />);
      if (((i % 4) == 3) || (i == (examples.length - 1))) {
        retVal.push(<Row key={"row " + i}>{currRow}</Row>);
        currRow = [];
      }
    });

    return <div>{retVal}</div>
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
                <Container style={{ position: "relative", paddingLeft: "20px"}}>
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
    categoryInstances: CategoryInstances.find({}).fetch(),
  }
})(App);
