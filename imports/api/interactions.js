import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Interactions = new Mongo.Collection('interactions');

Meteor.methods({
  // 'interactions.insert'({sessionID, type}) {
  //   check(sessionID, String);
  //   check(type, String);

  //   if(!this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   var exampleID, categoryID, instanceID;
  //   if(type === "exampleClicked") {

  //   }

  //   Interactions.insert({
  //     session_id: sessionID,
  //     user_id: this.userId,
  //     type: type,
  //     created_at: new Date(),
  //     example_id:
  //     category_id:
  //     instance_id:
  //   });
  // },
})