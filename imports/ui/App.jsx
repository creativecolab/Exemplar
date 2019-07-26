/* eslint-disable */
// Meteor Imports
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// React and JS imports
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Components Import
import Category from './Components/Category/Category.jsx';
import Example from './Components/Example/Example.jsx';
import TaskBubble from './Components/TaskBubble/TaskBubble.jsx';
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
      session: null,
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   $(this.refs.intro).slideUp();
    // }, 200);
  }

  componentDidUpdate() {
    // Timing here records the time the user got on the page
    if (this.props.user && !this.state.session) {
      var sess = Sessions.findOne({ _id: this.props.user.profile.curr_session_id });
      this.setState({ session: sess });
      var startTime = new Date().getTime()
      Meteor.call('sessions.updateTagTime', { time: startTime, id: sess._id });
      console.log("Session update and time!");
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

  clearFilters = (event) => {
    event.preventDefault();
    this.setState({ categoriesSelected: [] });
    this.setState({ examples: [] });
  }

  deleteHandler = (event, id) => {
    event.preventDefault();
    if(event.target.className === "delete") {
      Meteor.call('categories.delete', id);
    }
  }

  displayCategories = () => {
    var conditionCategories = [];
    var retVal = [];

    if (this.state.session) {
      if (this.state.session.condition === 'neither') {
        conditionCategories = Categories.find({ created_by: Meteor.userId(), deleted: false }).fetch();
      } else {
        conditionCategories = Categories.find({ deleted: false, $or: [{ condition: this.state.session.condition }, { created_by: Meteor.userId() }] }).fetch();
      }
    }

    conditionCategories.map((category) => {
      var selected;
      if (this.state.categoriesSelected.indexOf(category._id) === -1) {
        selected = false;
      } else {
        selected = true;
      }
      retVal.push(<Category key={category._id} category={category} categoryClicked={this.categoryClicked} selected={selected} own={Meteor.userId() === category.created_by} deleteHandler={this.deleteHandler}/>);
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

  calcUntaggedExamples = () => {
    var exTagged = [];
    if (this.state.session) {
      var allInstances = CategoryInstances.find({}).fetch();
      allInstances.map((instance) => {
        if ((instance.user_id === Meteor.userId()) && (exTagged.indexOf(instance.example_id) === -1) && (instance.session_id === this.state.session._id)) {
          exTagged.push(instance.example_id);
        }
      });
    }

    return this.props.examples.length - exTagged.length;
  }

  render() {
    return (
      <div className="App">
        <Container fluid="true">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="LeftPane">
                <Container fluid="true">
                  <Row>
                    <Col>
                      <div id="Nav">
                        {this.state.session ? <TaskBubble session={this.state.session} pageId={this.props.match.params.pageId} numNotTag={this.calcUntaggedExamples()} /> : null}
                      </div>
                    </Col>
                  </Row>
                </Container>
                <div className="LeftPane-header">
                  <span>Categories</span>
                  <span id='clear' onClick={this.clearFilters}>Clear all</span>
                </div>
                {this.displayCategories()}
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className={this.state.exampleClicked ? "PlaceClicked" : "Place"}>
                <Container style={{ position: "relative", paddingLeft: '20px', paddingTop: '10px' }}>
                  <div id="rightHeader">
                    <span id="searchBar">Search for keywords, categories, etc.</span>
                    <span id="catShown">{(this.state.examples.length === 0) && (this.state.categoriesSelected.length === 0) ? this.props.examples.length : this.state.examples.length} examples are being shown.</span>
                    {/* <span id="numContainer">
                      <div id="catShown">{(this.state.examples.length === 0) && (this.state.categoriesSelected.length === 0) ? this.props.examples.length : this.state.examples.length} examples are being shown.</div>
                      <div id="catTagged">{this.calcTaggedExamples()} examples have been tagged.</div>
                    </span> */}
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