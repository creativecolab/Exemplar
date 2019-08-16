import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Components Import
import Category from '../../Components/Category/Category.jsx';
import ReadClock from './ReadClock.jsx';
import Example from '../../Components/Example/Example.jsx';
import TaskBubble from '../../Components/TaskBubble/TaskBubble.jsx';
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
      disabledButton: true,
      session: sess,
      exIdx: props.match.params.pageId,
      status: "img",
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.pageId !== prevProps.match.params.pageId) {
      this.setState({ exIdx: this.props.match.params.pageId, status: "img" });
    }
  }

  updateStatus = () => {
    if (this.state.status === "img") {
      this.setState({ status: "description" });
    } else if (this.state.status === "description") {
      this.setState({ status: "labels" });
    } else {
      this.setState({ status: "img" });
    }
  }

  readNext = (event) => {
    event.preventDefault();
    this.setState({ exIdx: this.state.exIdx + 1 })
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

  changeNextValueTo = (eventResult) => {
    if (this.state.disabledButton && !eventResult) {
      this.setState({ disabledButton: eventResult });
    }
  }

  btnCmp = (disabled) => {
    return (
      <Button
        disabled={disabled}
        onClick={this.props.updateStatus}>
        Continue
      </Button>
    );
  }
  displayButton = () => {
    if (this.state.status !== "labels") {
      return (
<<<<<<< HEAD
        <div>
          <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length} examples</span>
          <span id={"ReadBttn"}>
          <Button 
            // disabled={this.timer()}
            onClick={this.updateStatus}
            
          >
            Continue
          </Button>
          </span>
        </div>
      );
    } else {
      if(parseInt(this.state.exIdx, 10) === (this.props.examples.length)) {
=======
        <ReadClock duration={3} changeNextValueTo={this.changeNextValueTo} btnCmp={this.btnCmp} />)
    }
    else {
      if (parseInt(this.state.exIdx, 10) === (this.props.examples.length)) {
>>>>>>> 137eaa531b82beeb9e82657b0740ebe77bb842eb
        return (
          <div>
            <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length} examples</span>
            <span id="ReadBttn">
              <Link to={"/Tag"}>
                <Button>Done</Button>
              </Link>
            </span>
          </div>
        );
      } else {
        return (
          <div>
            <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length} examples</span>
            <span id="ReadBttn">
              <Link to={"/Examples/" + (parseInt(this.state.exIdx, 10) + 1)}>
                <Button>Next</Button>
              </Link>
            </span>
          </div>
        );
      }
    }
    // parseInt(this.state.exIdx, 10) === (this.props.examples.length) ? 
    //   <div id="ReadFooter">
    //     <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length}</span>
    //     <span id="ReadBttn">
    //       <Link to={"/Tag"}>
    //         <Button>Done</Button>
    //       </Link>
    //     </span>
    //   </div>
    //   :
    //   <div id="ReadFooter">
    //     <span>{parseInt(this.state.exIdx, 10)} out of {this.props.examples.length}</span>
    //     <span id="ReadBttn">
    //       <Link to={"/Examples/" + (parseInt(this.state.exIdx, 10) + 1)}>
    //         <Button>Next</Button>
    //       </Link>
    //     </span>
<<<<<<< HEAD
    //   </div>  
=======
    //   </div>

>>>>>>> 137eaa531b82beeb9e82657b0740ebe77bb842eb
  }

  render() {
    return (
      <div id="Read">
        <img
          src={this.props.examples[parseInt(this.state.exIdx, 10) - 1].image}
          alt={this.props.examples[parseInt(this.state.exIdx, 10) - 1].description}
          id={this.state.status === "img" ? "ReadImgOnly" : "ReadImg"}
        />

        {this.state.status === "description" || this.state.status === "labels" ?
          <p id="ReadDescription">{this.props.examples[parseInt(this.state.exIdx, 10) - 1].description}</p>
          :
          null
        }

        {this.state.status === "labels" ?
          <div>{this.displayCategories()}</div>
          :
          null
        }

        {/* <div id="ReadExCat">
          <Example 
            sessionID={this.props.sessionID} 
            example={this.props.examples[parseInt(this.state.exIdx, 10) - 1]} 
            fromRead={true} 
            showCategories={false} 
            className="readExample"
          />

          {this.displayCategories()}
        </div>*/}

        <div id="ReadFooter">{this.displayButton()}</div>
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
