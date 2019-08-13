import React, { Component } from 'react'
import './ProgressBar.css';

// TODO: Align Pg Label to proper circle

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  determinePgLabel = () => {
    switch (this.props.match.params.currPg) {
      case "DesignBrief": {
        return "Design Brief";
      } break;
      case "Read": {
        return "Read Examples";
      } break;
      case "Ideate": {
        return "Ideate";
      } break;
      case "Usefulness": {
        return "Usefulness";
      } break;
      case "end": {
        return "End";
      } break;
      default: {
        return "";
      } break;
    }
  }

  render() {
    return (
      <div id="ProgressBarContainer">
        <div id="ProgressBar">
          <div className={this.props.match.params.currPg === "DesignBrief" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Read" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Ideate" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Usefulness" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "end" ? "circleFilled" : "circle"}></div>
        </div>

        <div id="ProgressBarLabel">
          {this.determinePgLabel()}
        </div>
      </div>
    )
  }
}
