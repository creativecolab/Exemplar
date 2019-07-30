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
import './SolutionTag.css';

// Collections Import
import Categories from '../../../api/categories.js';
import Examples from '../../../api/examples.js';
import CategoryInstances from '../../../api/categoryInstances.js';
import Sessions from '../../../api/sessions.js';

class SolutionTag extends Component {
  constructor(props) {
    super(props);

    var startTime = new Date().getTime();
    Meteor.call('sessions.updateSolutionTagTime', { time: startTime, id: props.sessionID });
    var sess = Sessions.findOne({ _id: props.sessionID });

    this.state = {
      exampleClicked: null,
      categoriesSelected: [],
      examples: [],
      session: sess,
    }
  }

  deleteHandler = (event, id) => {
    event.preventDefault();
    if (event.target.className === "deleteGreen" || event.target.className === "deleteWhite") {
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

    conditionCategories.map((category) => {
      var selected;
      if (this.state.categoriesSelected.indexOf(category._id) === -1) {
        selected = false;
      } else {
        selected = true;
      }
      retVal.push(<Category key={category._id} category={category} selected={selected} own={Meteor.userId() === category.created_by} deleteHandler={this.deleteHandler} />);
    });

    return <div style={{ padding: '10px' }}>{retVal}</div>
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
                        />
                        : null}
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
              <div className="Place">
                <Container fluid="true" style={{ position: "relative", paddingLeft: '20px', paddingTop: '10px' }}>
                  <div id="userExample">
                    <Example sessionID={this.props.sessionID} example={this.props.examples[0]} clicked={true} clickHandler={null} />
                  </div>
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
    examples: Examples.find({ created_by: Meteor.userId() }, {
      sort: { created_at: -1 }
    }).fetch(),
    categories: Categories.find({}).fetch(),
    categoryInstances: CategoryInstances.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    user: Meteor.user(),
  }
})(SolutionTag); 