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
    var category = Categories.findOne({ label: label }, { fields: {created_by: 1 } });
    var createdByArr = category.created_by;
    var createdAtArr = category.created_at;
    createdByArr.push(Meteor.userId());
    createdAtArr.push(new Date());

    Categories.update({ label: label }, {
      $set: { created_by: createdByArr, created_at: createdAtArr },
    });

    return Categories.findOne({ label: label })._id;
  },

  'categories.insert'(label) {
    check(label, String);

    // if(!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    var created_by_arr = [];
    created_by_arr.push(Meteor.userId());

    return Categories.insert({
      label: label,
      condition: null,
      created_by: created_by_arr,
      created_at: new Date(),
    });
  },
})