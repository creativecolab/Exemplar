import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Sessions = new Mongo.Collection('sessions');
Meteor.methods({
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

  'sessions.updateSolutionAfter'({id, response}) {
    check(response, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Sessions.update({ _id: id }, {
      $set: { user_solution_after: response },
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
        // ideation_time: null,
        // tagging_own_time: null
      });

      // return id;
  },
})