/* eslint-disable */
// Meteor Imports
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// React and JS imports
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components Import
import Category from '../../Components/Category/Category.jsx';
import Example from '../../Components/Example/Example.jsx';
import TaskBubble from '../../Components/TaskBubble/TaskBubble.jsx';
import './Tag.css';

// Collections Import
import Categories from '../../../api/categories.js';
import Examples from '../../../api/examples.js';
import CategoryInstances from '../../../api/categoryInstances.js';
import Sessions from '../../../api/sessions.js';

class Tag extends Component {
  constructor(props) {
    super(props);

    
    var startTime = new Date().getTime();
    Meteor.call('sessions.updateTagTime', { time: startTime, id: props.sessionID });
    var sess = Sessions.findOne({ _id: props.sessionID });

    this.state = {
      exampleClicked: null,
      categoriesSelected: [],
      examples: [],
      session: sess,
    }
  }

  findFilteredExamples = () => {
    var exAddedOld = [];
    var exAddedNew = [];
    var exObjs = [];

    this.state.categoriesSelected.map((categoryID, idx) => {
      var instances = CategoryInstances.find({ category_id: categoryID, deleted: false }).fetch();
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

  categoryClicked = (id) => {
    var newArr = this.state.categoriesSelected;
    var idx = newArr.indexOf(id);
    if (idx !== -1) {
      newArr.splice(idx, 1);
    } else {
      newArr.push(id);
    }
    this.setState({ categoriesSelected: newArr });
    this.findFilteredExamples();
  }

  exampleClicked = (event, id) => {
    event.preventDefault();
    var ex = Examples.findOne({ _id: id });
    this.setState({ exampleClicked: ex });
  }

  exampleUnclicked = (event) => {
    event.preventDefault();
    if (event.target.id === "exampleClickedDiv") {
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
    if (event.target.className === "deleteGreen" || event.target.className === "deleteWhite") {
      var newArr = this.state.categoriesSelected;
      var idx = newArr.indexOf(id);
      if (idx !== -1) {
        newArr.splice(idx, 1);
      }
      this.setState({ categoriesSelected: newArr });

      this.findFilteredExamples();
      
      Meteor.call('categories.delete', id);
    }
  }

  displayCategories = () => {
    var conditionCategories = [];
    var retVal = [];

    if (this.state.session.condition === 'neither') {
      conditionCategories = Categories.find({ created_by: Meteor.userId(), deleted: false }).fetch();
    } else {
      conditionCategories = Categories.find({ deleted: false, $or: [{ condition: this.state.session.condition }, { created_by: Meteor.userId() }] }).fetch();
    }

    this.props.categories.map((category) => {
      var selected;
      if (this.state.categoriesSelected.indexOf(category._id) === -1) {
        selected = false;
      } else {
        selected = true;
      }
      retVal.push(<Category key={category._id} category={category} categoryClicked={this.categoryClicked} selected={selected} own={Meteor.userId() === category.created_by} deleteHandler={this.deleteHandler} />);
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
      currRow.push(<Example key={example._id} sessionID={this.props.sessionID} example={example} clicked={false} exampleClicked={this.exampleClicked} className="exampleCard" />);
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
        if ((instance.user_id === Meteor.userId()) && (exTagged.indexOf(instance.example_id) === -1) && (instance.session_id === this.state.session._id) && (!instance.deleted)) {
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
                      {this.state.session ?
                        <TaskBubble
                          session={this.state.session}
                          pageId={this.props.match.url}
                          numNotTag={this.calcUntaggedExamples()}
                          history={this.props.history}
                        />
                        : null}
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className={this.state.exampleClicked ? "PlaceClicked" : "Place"}>
                <Container style={{ position: "relative", paddingLeft: '20px', paddingTop: '10px' }}>
                  <div className="LeftPane-header">
                    <span>Categories</span>
                    <span id='clear' onClick={this.clearFilters}>Clear all</span>
                  </div>
                  {this.displayCategories()}
                  {/* <div id="rightHeader">
                    <span id="searchBar">Search for keywords, categories, etc.</span>
                    <div id="catShown">{(this.state.examples.length === 0) && (this.state.categoriesSelected.length === 0) ? this.props.examples.length : this.state.examples.length} examples are being shown.</div>
                  </div> */}
                  {this.displayExamples()}
                  {this.state.exampleClicked ?
                    <div id="exampleClickedDiv" onClick={(event) => this.exampleUnclicked(event)}>
                      <Example sessionID={this.props.sessionID} example={this.state.exampleClicked} clicked={true} showCategories={true} className="exampleCardClicked" />
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
    examples: Examples.find({ created_by: "admin" }).fetch(),
    categories: Categories.find({}).fetch(),
    categoryInstances: CategoryInstances.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    user: Meteor.user(),
  }
})(Tag); 