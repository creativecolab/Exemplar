import React, { Component } from 'react';
import Category from './Category/Category.jsx';
import './LeftPane.css';

class LeftPane extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleAdd(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="LeftPane">
        <div className="LeftPane-header">
          Categories
        </div>
        <Category />
      </div>
    );
  }
}

export default LeftPane;
