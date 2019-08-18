import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default UserSolutions = new Mongo.Collection('userSolutions');

Meteor.methods({
  'userSolutions.insert'(description) {
    check(description, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return UserSolutions.insert({
      description: description,
      user_labels_arr: [],
      usefulness_arr: []
    });
  },
  
  'userSolutions.updateUsefulness'({id, catId}) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    var usefulnessArr = UserSolutions.findOne({ _id: id }).usefulness_arr;
    if(usefulnessArr.indexOf(catId) === -1) {
      UserSolutions.update({ _id: id}, {
        $push: {usefulness_arr: catId}
      });
    } else {
      UserSolutions.update({ _id: id}, {
        $pull: {usefulness_arr: catId}
      });
    }
  }
});