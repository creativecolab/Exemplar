import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
// import { Accounts } from 'meteor/accounts-base';

import ExamplesData from '/imports/Data/ExamplesData.json';
import TagsData from '/imports/Data/TagsData.json';
import { getResponses } from './data-getter';

import Examples from '/imports/api/examples';
import Categories from '/imports/api/categories';
import Sessions from '/imports/api/sessions.js';
import CategoryInstances from '/imports/api/categoryInstances.js';
import Interactions from '/imports/api/interactions.js';

function insertExample(condition, description, image, url, created_by, created_at) {
  Examples.insert({ condition, description, image, url, created_by, created_at });
}

function insertCategory(label, condition, created_by) {
  Categories.insert({ label, condition, created_by: created_by, created_at: null, deleted: false });
}

// Restivus to add ability to call functions and store CSV data
if (Meteor.isServer) {
  console.log("Server up");
  // Global API configuration
  const Api = new Restivus({
    apiPath: "api",
    useDefaultAuth: true,
    prettyJson: true
  });

  Api.addRoute('test', {
    get: function () {
      var urlParam = this.urlParams;
      console.log(urlParam);
      return { urlParam }
    }
  });
  // Gathers all the data from collections into a csv format TODO
  // Sample Gather basic info on session
  // get rid of # tag and enter
  Api.addRoute('responses/:id', {
    get() {
      //  Might need to change this.urlParams since we do it differently...
      const content_disposition = 'attachment; filename=responses_' + this.urlParams.code + '.csv';

      console.log(this.urlParams.id);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': content_disposition
        },
        body: getResponses(this.urlParams.id)
        // if needed u can access this. userid  etc check doc for restivus
      };
    }
  });
  // console.log(Api);
  // console.log(Api._routes[0]);
}

Meteor.startup(() => {
  if (Sessions.find().count() === 0) {
    Meteor.call('sessions.insert', "Admin");
  }
  // Accounts.onCreateUser((options, user) => {
  //   var sessionID = Sessions.insert({
  //     condition: '2',   // FXIME UPDATE LATER
  //     user_id: user._id,
  //     created_at: new Date(),
  //     finished_at: null,
  //     user_solution_id: null,
  //     ex_read_times_arr: {},
  //     // TODO REMOVE BELOW
  //     user_problem_before: null,
  //     user_problem_after: null,
  //     problem_before_time: null,
  //     problem_after_time: null,
  //     tagging_time: null,
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