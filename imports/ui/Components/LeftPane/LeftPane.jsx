import React, { Component } from 'react';
import Category from '../Category/Category.jsx';
import './LeftPane.css';

class LeftPane extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.category);
  }

  render() {
    return (
      <div className="LeftPane">
        <div className="LeftPane-header">
          Categories
        </div>
        <Category category={this.props.category} />
      </div>
    );
  }
}

export default LeftPane;
