import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Examples from './examples';

export default Sessions = new Mongo.Collection('sessions');
Meteor.methods({
  /**********************************************************/
  /*                  Session methods                       */
  /**********************************************************/
  // Initialize session
  'sessions.insert'() {
    return Sessions.insert({
      condition: 'deep',   // TODO UPDATE LATER
      user_id: Meteor.userId(),
      created_at: new Date(),
      finished_at: null,
      user_problem_before: null,
      user_problem_after: null,
      user_solution_before: null,
      user_solution_after: null,
      // problem_before_time: null,
      // problem_after_time: null,
      tagging_time: null,
      solution_tagging_time: null,
      // ideation_time: null,
      // tagging_own_time: null
    });
  
    // return id;
  },

  'sessions.logout'(id) {
    Sessions.update({ _id: id}, {
      $set: { finished_at: new Date() }
    });
  },
  /**********************************************************/
  /*            Updates to user inputted text               */
  /**********************************************************/
  'sessions.updateProblemBefore'({id, response}) {
    check(response, String); // Meteor.Error(400, 'Match Failed') Thrown to client
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sessions.update({ _id: id }, {
      $set: { user_problem_before: response },
    });
  },

  'sessions.updateProblemAfter'({id, response}) {
    check(response, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sessions.update({ _id: id }, {
      $set: { user_problem_after: response },
    });
  },

  'sessions.updateSolutionBefore'({id, response}) {
    check(response, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sessions.update({ _id: id }, {
      $set: { user_solution_before: response },
    });
  },

  'sessions.updateSolutionAfter'({id, response, condition}) {
    check(response, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sessions.update({ _id: id }, {
      $set: { user_solution_after: response },
    });
    // Catch this case later! Might be in the same session and click insert again!
    Examples.insert({ 
      condition: condition, 
      description: response, 
      image: null, 
      url: null, 
      created_by: Meteor.userId(),
      created_at: new Date()
    });
  },
  /**********************************************************/
  /*                  Updates to Time                       */
  /**********************************************************/
    'sessions.updateTagTime'({time, id}) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Sessions.update({ _id: id }, {
          $set: { tagging_time: time },
        });
        // return id;
    },
    'sessions.updateSolutionTagTime'({time, id}) {
      if (!this.userId) {
          throw new Meteor.Error('not-authorized');
      }
      Sessions.update({ _id: id }, {
        $set: { solution_tagging_time: time },
      });
      // return id;
  },

})