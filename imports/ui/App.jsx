/* eslint-disable */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftPane from './Components/LeftPane/LeftPane.jsx';
import Example from './Components/Example/Example.jsx';
import './App.css';
// import $ from "jquery"; 

import Categories from '../api/categories.js';
import { withTracker } from 'meteor/react-meteor-data';


class App extends Component {
  // componentDidMount() {
  //   setTimeout(() => {
  //     $(this.refs.intro).slideUp();
  //   }, 200);
  // }

  displayExamples = () => {
    var i, j;
    var allExamples = [];
    for (i = 0; i < 3; i++) {
      var rowExamples = [];
      for (j = 0; j < 4; j++) {
        rowExamples.push(<Example key={"ex" + j} description="City public transit system partners with a private autonomous vehicle company to provide AV rides from people who get off the metro.City public transit system partners with a private autonomous vehicle company to provide AV rides from people who get off the metro.City public transit system partners with a private autonomous vehicle company to provide AV rides from people who get off the metro." />);
      }
      allExamples.push(<Row key={"row" + i}>{rowExamples}</Row>);
    }
    return <div>{allExamples}</div>
  }

  render() {
    const propCategories = this.props.categories;
    console.log(propCategories);
    console.log(Categories.find());

    return (
      <div className="App">
        <Container fluid="true">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <LeftPane category={propCategories} />
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <div className="Place">
                <Container>
                  {this.displayExamples()}
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withTracker(() => ({
  categories: Categories.find({}).fetch().collection._docs._map
}))(App);
