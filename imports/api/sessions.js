import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Sessions = new Mongo.Collection('sessions');

Meteor.methods({
  'sessions.insert'(userID) {
    check(userID, String);

    var sess_id = Sessions.insert({
      condition: 'neither',   // UPDATE LATER
      user_id: userID,
      created_at: new Date(),
      finished_at: null,
      user_response_before: null,
      user_response_after: null,
      response_before_time: null,
      response_after_time: null,
      tagging_time: null,
      generation_time: null,
      tagging_own_time: null
    });

    Meteor.users.update({ _id: this.userId }, {$set: {curr_session_id: sess_id}});

    return sess_id;
  },
});