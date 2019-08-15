import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Examples from '/imports/api/examples';
import Categories from '/imports/api/categories';
import ExamplesData from '/imports/Data/ExamplesData.json';
import TagsData from '/imports/Data/TagsData.json';

import Sessions from '/imports/api/sessions.js';
import CategoryInstances from '/imports/api/categoryInstances.js';
import Interactions from '/imports/api/interactions.js';

function insertExample(condition, description, image, url, created_by, created_at) {
  Examples.insert({ condition, description, image, url, created_by, created_at });
}

function insertCategory(label, condition, created_by) {
  Categories.insert({ label, condition, created_by: created_by, created_at: null, deleted: false });
}

Meteor.startup(() => {
  // Accounts.onCreateUser((options, user) => {
  //   var sessionID = Sessions.insert({
  //     condition: 'deep',   // UPDATE LATER
  //     user_id: user._id,
  //     created_at: new Date(),
  //     finished_at: null,
  //     user_problem_before: null,
  //     user_problem_after: null,
  //     problem_before_time: null,
  //     problem_after_time: null,
  //     tagging_time: null,
  //     ideation_time: null,
  //     tagging_own_time: null
  //   });

  //   const customizedUser = user;
  
  //   if (options.profile) {
  //     customizedUser.profile = options.profile;
  //   }

  //   customizedUser.profile.curr_session_id = sessionID;
  
  //   return customizedUser; 
  // })

  if (Examples.find().count() === 0) {
    ExamplesData.examples.forEach(element => {
      insertExample(
        element.condition, element.description, element.image, null, element.created_by, element.created_at
      );
    });
  }

  if (Categories.find().count() === 0) {
    TagsData.tags.forEach(element => {
      insertCategory(
        element.label, element.condition, element.created_by
      );
    });
  }
  console.log(Categories.find().count());
});