import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Categories = new Mongo.Collection('categories');

Meteor.methods({
  'categories.increment'(label) {
    // check(label, String);
    Categories.update({ label: label }, {
      $inc: { selected_counts: 1},
    });
  }
})