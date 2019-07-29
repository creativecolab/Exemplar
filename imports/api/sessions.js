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

  'sessions.updateProblemBefore'(response) {
    check(response, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(this.user.profile.curr_session_id);
    console.log("HERE");
  },

  'sessions.updateTagTime'({time, id}) {
      if (!this.userId) {
          throw new Meteor.Error('not-authorized');
      }
      Sessions.update({ _id: id }, {
        $set: { tagging_time: time },
      });

      // return id;
  },

  'sessions.insert'() {
    return Sessions.insert({
      condition: 'deep',   // UPDATE LATER
      user_id: Meteor.userId(),
      created_at: new Date(),
      finished_at: null,
      user_problem_before: null,
      user_problem_after: null,
      problem_before_time: null,
      problem_after_time: null,
      tagging_time: null,
      ideation_time: null,
      tagging_own_time: null
    });
  }
})