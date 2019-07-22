/* eslint-disable */
// Meteor Imports
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// React and JS imports
import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Components Import
import Category from './Components/Category/Category.jsx';
import Example from './Components/Example/Example.jsx';
import './App.css';

// Collections Import
import Categories from '../api/categories.js';
import Examples from '../api/examples.js';
import CategoryInstances from '../api/categoryInstances.js';
import Sessions from '../api/sessions.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleClicked: null,
      categoriesSelected: [],
      examples: [],
      session: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      $(this.refs.intro).slideUp();
    }, 200);
  }

  componentDidUpdate() {
    if (this.props.user) {
      console.log(this.props.user);
    }
  }

  categoryClicked = (id) => {
    var newArr = this.state.categoriesSelected;
    var idx = newArr.indexOf(id);
    if (idx !== -1) {
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
        if ((idx === 0) && (exAddedNew.indexOf(ex._id) === -1)) {
          exAddedNew.push(ex._id);
        } else if ((idx !== 0) && (exAddedOld.indexOf(ex._id) !== -1) && (exAddedNew.indexOf(ex._id) === -1)) {
          exAddedNew.push(ex._id);
        }
      });
      exAddedOld = exAddedNew;
      exAddedNew = [];

      if (idx === (this.state.categoriesSelected.length - 1)) {
        exAddedOld.map((exID) => {
          var ex = Examples.findOne({ _id: exID });
          exObjs.push(ex);
        })
      }
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
    var conditionCategories = [];
    var retVal = [];

    var sess = Sessions.find({ user_id: Meteor.userId(), finished_at: null }).fetch();
    if (sess[0]) { // NOTE: would not have to do this once logging out full implemented
      if (sess[0].condition === 'surface') {
        conditionCategories = Categories.find({ condition: 'surface' }).fetch();
      } else if (sess[0].condition === 'deep') {
        conditionCategories = Categories.find({ condition: 'deep' }).fetch();
      } else if (sess[0].condition === 'both') {
        conditionCategories = Categories.find({ condition: 'both' }).fetch();
      } else if (sess[0].condition === 'neither') {
        conditionCategories = Categories.find({ created_by: Meteor.userId() }).fetch();
      }
    }

    conditionCategories.map((category) => {
      retVal.push(<Category key={category._id} category={category} categoryClicked={this.categoryClicked} />);
    });

    return <div style={{ padding: '10px' }}>{retVal}</div>
  }

  displayExamples = () => {
    var examples = [];
    var retVal = [];
    var currRow = [];

    if ((this.state.examples.length === 0) && (this.state.categoriesSelected.length === 0)) {
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
                <div id="Nav">
                  <a href="/Problem/After">
                    <Button id="nextButton" variant="success" >Done</Button>
                  </a>
                  <a href="/End">
                    <Button id="nextButton" variant="success" >Logout Page</Button>
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className={this.state.exampleClicked ? "PlaceClicked" : "Place"}>
                <Container style={{ position: "relative", paddingLeft: '20px', paddingTop: '10px' }}>
                  <div id="searchBar">
                    Search for keywords, categories, etc.>
                    </div>
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
    sessions: Sessions.find({}).fetch(),
    user: Meteor.user(),
  }
})(App);
