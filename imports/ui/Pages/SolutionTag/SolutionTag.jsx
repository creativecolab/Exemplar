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
import UserSolutions from '../../../api/userSolutions.js';

class SolutionTag extends Component {
  constructor(props) {
    super(props);

    var startTime = new Date().getTime();
    Meteor.call('sessions.updateSolutionTagTime', { time: startTime, id: props.sessionID });
    var sess = Sessions.findOne({ _id: props.sessionID });
    var description = UserSolutions.findOne({ _id: sess.user_solution_id }).description;
    var selected = UserSolutions.findOne({ _id: sess.user_solution_id }).usefulness_arr;

    this.state = {
      categoriesSelected: selected, // change to + .user_labels_arr
      session: sess,
      description: description,
    }
  }

  deleteHandler = (event, id) => {
    event.preventDefault();
    if (event.target.className === "deleteGreen" || event.target.className === "deleteWhite") {
      Meteor.call('categories.delete', id);
    }
  }

  categoryClicked = (id) => {
    var newArr = this.state.categoriesSelected;
    var idx = newArr.indexOf(id);
    if(idx === -1) {
      Meteor.call('categories.increment', id, (err) => {
        if(err) {
          throw new Meteor.Error(err);
        } else {
          Meteor.call('userSolutions.updateUsefulness', {id: this.state.session.user_solution_id, catId: id}, (e) => {
            if(e) {
              throw new Meteor.Error(e);
            }
          });
        }
      });

      newArr.push(id);
    } else {
      Meteor.call('categories.decrement', id, (err, result) => {
        if(err) {
          throw new Meteor.Error(err);
        } else {
          Meteor.call('userSolutions.updateUsefulness', {id: this.state.session.user_solution_id, catId: id}, (e) => {
            if(e) {
              throw new Meteor.Error(e);
            }
          });
        }
      });

      newArr.splice(idx, 1);
    }

    this.setState({ categoriesSelected: newArr });
  }

  displayCategories = () => {
    // var conditionCategories = [];
    var retVal = [];

    // if (this.state.session.condition === 'neither') {
    //   conditionCategories = Categories.find({ created_by: Meteor.userId(), deleted: false }).fetch();
    // } else {
    //   conditionCategories = Categories.find({ deleted: false, $or: [{ condition: this.state.session.condition }, { created_by: Meteor.userId() }] }).fetch();
    // }

    // WILL NEED TO CHANGE THIS TO CONDITION CATEGORIES
    this.props.categories.map((category) => {
      var selected;
      if (this.state.categoriesSelected.indexOf(category._id) === -1) {
        selected = false;
      } else {
        selected = true;
      }
      retVal.push(
        <Category 
          key={category._id} 
          category={category} 
          categoryClicked={this.categoryClicked} 
          selected={selected} 
          own={Meteor.userId() === category.created_by} 
          deleteHandler={this.deleteHandler} 
          fromRead={selected ? false : true} 
        />
      );
    });

    return <div style={{ padding: '10px' }}>{retVal}</div>
  }

  render() {
    return (
      <div className="App">
        <div id="ReadExCat">
          {this.state.description}

          {this.displayCategories()}
        </div>
        {/* <Container fluid="true">
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
                    <Example sessionID={this.props.sessionID} example={this.props.examples[0]} clicked={true} className="exampleCardClicked" />
                  </div>
                </Container>
              </div>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    // examples: Examples.find({ created_by: Meteor.userId() }, {
    //   sort: { created_at: -1 }
    // }).fetch(),
    categories: Categories.find({}).fetch(),
    categoryInstances: CategoryInstances.find({}).fetch(),
    sessions: Sessions.find({}).fetch(),
    user: Meteor.user(),
    userSolutions: UserSolutions.find({}).fetch()
  }
})(SolutionTag); 