import { Meteor } from 'meteor/meteor';
import Categories from '../imports/api/categories.js';
import Data from '/imports/Data/Data.json';

function insertCategory(label, condition, created_by) {
  Categories.insert({ label, condition, created_by, selected_count: 0, created_at: (new Date()) });
}

Meteor.startup(() => {
  // const options = {
  //   "projection": { "created_by": 1 },
  // };
  // console.log(Categories.find({},options));
  console.log(Categories.find().count());
  // TODO check if all the current items in DB are admin or not to be displayed.
  if (Categories.find().count() === 0) {
    console.log("adsasdasdas");
    Data.tags.forEach(element => {
      insertCategory(
        element.label, element.condition, element.created_by
      );
    });
  }
  console.log(Categories.find().count());
});
