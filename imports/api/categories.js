import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import CategoryInstances from './categoryInstances.js';

export default Categories = new Mongo.Collection('categories');

Meteor.methods({
  'categories.increment'(id) {
    check(id, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Categories.update({ _id: id }, {
      $inc: { selected_count: 1},
    });

    return id;
  },

  'categories.delete'(id) {
    check(id, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Categories.update({ _id: id }, {
      $set: { deleted: true },
    });

    CategoryInstances.update({ category_id: id}, {
      $set: { deleted: true },
    }, {multi: true})
  },

  'categories.insert'(label) {
    check(label, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Categories.insert({
      label: label,
      condition: null,
      created_by: this.userId,
      selected_count: 1,
      created_at: new Date(),
      deleted: false,
    });
  },
})