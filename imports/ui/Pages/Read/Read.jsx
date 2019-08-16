import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

// Components Import
import Category from '../../Components/Category/Category.jsx';
import ReadClock from './ReadClock.jsx';
import './Read.css';

// Collections Import
import Categories from '../../../api/categories.js';
import Examples from '../../../api/examples.js';
import CategoryInstances from '../../../api/categoryInstances.js';
import Sessions from '../../../api/sessions.js';

class Read extends Component {
  constructor(props) {
    super(props);

    var sess = Sessions.findOne({ _id: props.sessionID });

    this.state = {
      session: sess,
      exIdx: props.match.params.pageId,
      status: "img",
      duration: 5
    }
  }

  // Tells which example to show (of the 15) based on page id ( the number in the url )
  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.pageId !== prevProps.match.params.pageId) {
      this.setState({ exIdx: this.props.match.params.pageId, status: "img" });
    }
  }

  // Updates the text,image,labels displayed. Called by ReadClock
  updateStatus = (status) => {
    if (status === "img") {
      this.setState({ status: "description" });
    } else if (status === "description") {
      this.setState({ status: "labels" });
    } else {
      this.setState({ status: "img" });
    }
  }

  displayCategories = () => {
    var allCategories = [];
    var categoriesAdded = [];

    var instances = CategoryInstances.find({ example_id: this.props.examples[parseInt(this.state.exIdx, 10) - 1]._id, user_id: Meteor.userId(), deleted: false, session_id: this.props.sessionID }).fetch();
    instances.map((instance) => {
      var category = Categories.findOne({ _id: instance.category_id });
      if (!category.deleted) {
        if ((categoriesAdded.indexOf(category._id) === -1) || (categoriesAdded.length === 0)) {
          categoriesAdded.push(category._id);
          allCategories.push(<Category key={category._id} category={category} categoryClicked={null} fromRead={true} deleteHandler={this.deleteHandler} />)
        }
      }
    });

    return <div id="ReadCat">{allCategories}</div>
  }

  // Displays the next image, text, and labels
  displayNextElement = () => {
    let currentStatus = this.state.status;
    // Render Next Element or Next Example/Page depending on the currentStatus
    switch (currentStatus) {
      case "img":
      case "description":
        return (
          <ReadClock
            duration={this.state.duration}
            updateStatus={this.updateStatus}
            status={this.state.status}
            buttonText={"Continue"}
            startTime={new Date().getTime()}
          />);
      case "labels":
        {
          let nextLink, nextText;
          // Declare the nextLink and ButtonText
          if (parseInt(this.state.exIdx, 10) === (this.props.examples.length)) {
            nextLink = "/Tag";
            nextText = "Next"
          } else {
            nextLink = "/Examples/" + (parseInt(this.state.exIdx, 10) + 1);
            nextText = "Done"
          }
          return (
            <div>
              <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length} examples</span>
              <span id="ReadBttn">
                <Link to={nextLink}>
                  <ReadClock
                    duration={this.state.duration}
                    updateStatus={this.updateStatus}
                    status={this.state.status}
                    buttonText={nextText}
                    startTime={new Date().getTime()}
                  />
                </Link>
              </span>
            </div>
          );
        }
    }
  }

  render() {
    return (
      <div id="Read">
        {/* Image */}
        <img
          src={this.props.examples[parseInt(this.state.exIdx, 10) - 1].image}
          alt={this.props.examples[parseInt(this.state.exIdx, 10) - 1].description}
          id={this.state.status === "img" ? "ReadImgOnly" : "ReadImg"}
        />
        {/* Description */}
        {this.state.status !== "img" ?
          <p id="ReadDescription">{this.props.examples[parseInt(this.state.exIdx, 10) - 1].description}</p>
          :
          null
        }
        {/* Labels */}
        {this.state.status === "labels" ?
          <div>{this.displayCategories()}</div>
          :
          null
        }
        {/* Continue Button */}
        <div id="ReadFooter">{this.displayNextElement()}</div>
      </div>
    )
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
})(Read);
