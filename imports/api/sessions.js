import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Sessions = new Mongo.Collection('sessions');

Meteor.methods({
  'sessions.updateProblemBefore'(response) {
    check(response, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(this.user.profile.curr_session_id);
    console.log("HERE");
  },
})