import { Meteor } from 'meteor/meteor';
import Examples from '/imports/api/examples';
import Categories from '/imports/api/categories';
import Data from '/imports/Data/Data.json';
import CategoryInstances from '/imports/api/categoryInstances.js';
import Sessions from '/imports/api/sessions.js';
import { Accounts } from 'meteor/accounts-base';

function insertExample(condition, description, image, url) {
  Examples.insert({ condition, description, image, url, created_by: 'admin', created_at: null });
}

function insertCategory(label, condition, created_by) {
  Categories.insert({ label, condition, created_by, selected_count: 0, created_at: null });
}

Meteor.startup(() => {
  Accounts.onCreateUser((options, user) => {
    var sessionID = Sessions.insert({
      condition: 'neither',   // UPDATE LATER
      user_id: user._id,
      created_at: new Date(),
      finished_at: null,
      user_response_before: null,
      user_response_after: null,
      response_before_time: null,
      response_after_time: null,
      tagging_time: null,
      generation_time: null,
      tagging_own_time: null
    });

    const customizedUser = user;
  
    if (options.profile) {
      customizedUser.profile = options.profile;
    }

    customizedUser.curr_session_id = sessionID;
  
    return customizedUser; 
  })

  if (Examples.find().count() === 0) {
    insertExample(
      null,
      'Incorporate a local bike sharing company into an existing transit trip planning app so smartphone users can identify the availability of bikes or docking stations near their transit stops, and pay for bike rentals.',
      null,
      null
    );

    insertExample(
      null,
      'City public transit system partners with a private autonomous vehicle company to provide AV rides from people who get off the metro.',
      null,
      null
    );

    insertExample(
      null,
      'Private individuals volunteer their vehicles as part of a carpool service from the subway station. A supporting mobile application finds and matches riders to carpools and the subway police verify the matchings by ensuring the right rider gets into the right carpool vehicle.',
      null,
      null
    );

    insertExample(
      null,
      "A door-to-bus smartphone app (also available through call center) books and catches a ride on transportation hub. It's $1 to connect to a designated bus stop within the zone or $3 connect anywhere within the zone.",
      null,
      null
    );

    insertExample(
      null,
      'App-training workshops run by city’s senior commission in libraries and recreation centers around the city to train seniors to use smartphone apps that draws transportation connections between transit and ride-sharing services.',
      null,
      null
    );

    insertExample(
      null,
      'Funding that supports eligible lower socio-economic class riders to access 23 free rides per month from Uber or United Taxi between 9 p.m. and 6 a.m., from any starting point to any destination.',
      null,
      null
    );

    insertExample(
      null,
      'City residents will be able to use a smartphone app to reserve a seat on one of ten 14-passenger vans that allow numerous prospective riders to enter their itineraries in real-time and come up with a route that accommodates all of them within the zone.',
      null,
      null
    );

    insertExample(
      null,
      'Service that offer cab rides to anyone from 8 p.m. to 3 a.m. on Friday and Saturday nights for $3 departing from a metro station by dialing or boarding an unoccupied cab at the kiosk.',
      null,
      null
    );

    insertExample(
      null,
      'A fixed-space car-sharing that allows users to pick up a car and drop it off at a designated parking space within the district, with parking meters prepaid by the car-sharing provider.',
      null,
      null
    );

    insertExample(
      null,
      'Rental service of undocked electric scooters that max out at 15 mph and are alternatives to a long walk, a bike ride or a short drive to an area without parking.',
      null,
      null
    );

    insertExample(
      null,
      'City transit agency partners with the bike-share operator that people who have a transit farecard, now have access to unlimited bike-share trips of 15 minutes or less.',
      null,
      null
    );

    insertExample(
      null,
      'A map tool that makes data on mixed mobility options available at any given location and generates a 0-100 rating, emphasizing the benefit of having multiple modes, and measures data that reflect how reliable, frequent, and accessible these modes are.',
      null,
      null
    );

    insertExample(
      null,
      'High school students receive memberships or reduced-fee memberships for shared-bike pass and lower the age limit that required to wear helmets from 16 to 15 or 14.',
      null,
      null
    );

    insertExample(
      null,
      "Electric car ridesharing program that brings 100 electric car sharing vehicles and 200 charging stations to the city's poorest neighborhoods.",
      null,
      null
    );

    insertExample(
      null,
      'The app users can identify the availability of bikes or docking stations near their transit stops and pay for bike rentals on an existing transit trip planning app that incorporated a local bike sharing company.',
      null,
      null
    );

    insertExample(
      null,
      'People who get off the metro now have access to rides offered by autonomous vehicles, thanks to the partnership between city public transit system and a private autonomous vehicle company.',
      null,
      null
    );

    insertExample(
      null,
      'For those who either want to bike longer or harder distances or have a medical condition, product company develops a bike powered by batteries, called e-bikes .',
      null,
      null
    );
  }

  if (Categories.find().count() === 0) {
    Data.tags.forEach(element => {
      insertCategory(
        element.label, element.condition, element.created_by
      );
    });
  }
  console.log(Categories.find().count());
});
