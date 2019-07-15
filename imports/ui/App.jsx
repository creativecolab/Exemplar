/* eslint-disable */
import React, { Component } from 'react';
<<<<<<< HEAD
import { Container, Row, Col } from 'react-bootstrap';
import LeftPane from './Components/LeftPane/LeftPane.jsx';
import Example from './Components/Example/Example.jsx';
import './App.css';
// import $ from "jquery"; 

import Categories from '../api/categories.js';
=======
import $ from 'jquery';
import {Container, Row, Col } from 'react-bootstrap';
>>>>>>> 7a6ff443d544bbc3bc145c3c481dc25fdc92d6ff
import { withTracker } from 'meteor/react-meteor-data';

import './App.css';
import LeftPane from './Components/LeftPane.jsx';
import Example from './Components/Example/Example.jsx';
import Examples from '../api/examples.js';
import Categories from '../api/categories.js'

class App extends Component {
<<<<<<< HEAD
  // componentDidMount() {
  //   setTimeout(() => {
  //     $(this.refs.intro).slideUp();
  //   }, 200);
  // }
=======
  constructor(props) {
    super(props);

    this.state = {
      exampleClicked: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      $(this.refs.intro).slideUp();
    }, 200);
  }

  exampleClicked = (event, id) => {
    event.preventDefault();
    var ex = Examples.findOne({_id: id});
    this.setState({ exampleClicked: ex });
  }

  exampleUnclicked = (event) => {
    console.log(event.target);
    event.preventDefault();
    if(event.target.className === "exampleContainer") {
      this.setState({ exampleClicked: null });
    }
  }
>>>>>>> 7a6ff443d544bbc3bc145c3c481dc25fdc92d6ff

  displayExamples = () => {
    var allExamples = [];
    var currRow = [];

    for (var i = 0; i < this.props.examples.length; i++) {
      currRow.push(<Example key={this.props.examples[i]._id} example={this.props.examples[i]} clicked={false} clickHandler={this.exampleClicked} />);
      if(((i % 4) == 0) || (i == (this.props.examples.length - 1))) {
        allExamples.unshift(<Row key={"row " + i}>{currRow}</Row>);
        currRow = [];
      }
    }

    return <div>{allExamples}</div>
  }

  render() {
<<<<<<< HEAD
    const propCategories = this.props.categories;
    console.log(propCategories);
    console.log(Categories.find());

=======
>>>>>>> 7a6ff443d544bbc3bc145c3c481dc25fdc92d6ff
    return (
      <div className="App">
        <Container fluid="true">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
<<<<<<< HEAD
              <LeftPane category={propCategories} />
=======
              <LeftPane categories={this.props.categories}/>
>>>>>>> 7a6ff443d544bbc3bc145c3c481dc25fdc92d6ff
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="Place">
                <Container style={{position: "relative"}}>
                  {this.displayExamples()}
                  {this.state.exampleClicked ? 
                    <div id="exampleClickedDiv" onClick={(event) => this.exampleUnclicked(event)}>
                      <Example example={this.state.exampleClicked} clicked={true} clickHandler={null}/>
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

<<<<<<< HEAD
export default withTracker(() => ({
  categories: Categories.find({}).fetch().collection._docs._map
}))(App);
=======
export default withTracker(() => {
  return {
    examples: Examples.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  }
})(App);
>>>>>>> 7a6ff443d544bbc3bc145c3c481dc25fdc92d6ff
