import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'; 

export default CategoryInstances = new Mongo.Collection('categoryInstances');

Meteor.methods({
  'categoryInstances.delete'({catID, exID}) {
    check(catID, String);
    check(exID, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    CategoryInstances.update({ category_id: catID, example_id: exID, deleted: false }, {
      $set: { deleted: true },
    });
  },

  'categoryInstances.insert'({catID, exampleID, sessionID}) {
    check(catID, String);
    check(exampleID, String);
    check(sessionID, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    
    return CategoryInstances.insert({
      user_id: this.userId,
      category_id: catID,
      example_id: exampleID,
      session_id: sessionID,
      created_at: new Date(),
      deleted: false,
    });
  },
})
