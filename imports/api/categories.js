import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Categories = new Mongo.Collection('categories');

Meteor.methods({
  'categories.increment'(label) {
    check(label, String);

    // if(!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Categories.update({ label: label }, {
      $inc: { selected_count: 1},
    });

    return Categories.findOne({ label: label })._id;
  },

  'categories.insert'(label) {
    check(label, String);

    // if(!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    return Categories.insert({
      label: label,
      condition: null,
      // created_by: this.userId(),
      selected_count: 1,
      created_at: new Date(),
    });
  },
})