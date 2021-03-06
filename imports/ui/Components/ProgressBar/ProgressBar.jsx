import React, { Component } from 'react'
import './ProgressBar.css';

// TODO: Align Pg Label to proper circle

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    console.log("ProgressBar Page: " + this.props.match.url);
  }

  determinePgLabel = () => {
    switch (this.props.match.params.currPg) {
      case "Instruction": {
        let returnVal = "";
        switch (this.props.match.params.pageId) {
          case "0": returnVal = "Start"; break;
          case "1": returnVal = "Examples"; break;
          case "2": returnVal = "SolutionTag"; break;
        }
        return returnVal;
      } break;
      case "DesignBrief": {
        return "Design Brief";
      } break;
      case "Examples": {
        return "Examples";
      } break;
      case "Ideate": {
        return "Ideate";
      } break;
      case "SolutionTag": {
        return "Usefulness";
      } break;
      case "End": {
        return "End";
      } break;
      default: {
        return "";
      } break;
    }
  }

  determinePgLabelPosition = (currentLabel) => {
    switch (currentLabel) {
      case "Start": {
        return '-89vw';
      } break;
      case "DesignBrief": {
        return '-53vw';
      } break;
      case "Examples": {
        return '-17vw';
      } break;
      case "Ideate": {
        return '17vw';
      } break;
      case "SolutionTag": {
        return '53vw';
      } break;
      case "End": {
        return '89vw';
      } break;
      default: {
        return "";
      } break;
    }
  }

  render() {
    var currentLabel = this.determinePgLabel();
    var styleLabel = {
      marginLeft: this.determinePgLabelPosition(currentLabel)
    }
    return (
      <div id="ProgressBarContainer">
        <div id="ProgressBar">
          <div className={this.props.match.params.currPg === "Start" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "DesignBrief" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Examples" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Ideate" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "Usefulness" ? "circleFilled" : "circle"}></div>
          <div className="line"></div>
          <div className={this.props.match.params.currPg === "End" ? "circleFilled" : "circle"}></div>
        </div>

        <div id="ProgressBarLabel" style={styleLabel}>
          {currentLabel}
        </div>
      </div>
    )
  }
}
