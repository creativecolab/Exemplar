import { Meteor } from 'meteor/meteor';
import Categories from '/imports/api/categories';

function insertCategory(label, condition, created_by, selected_count, created_at) {
  Categories.insert({ label, condition, created_by, selected_count, created_at });
}

Meteor.startup(() => {

  if (Categories.find().count() === 0) {
    insertCategory(
      'bike',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'app',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'car',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'scooter',
      'surface',
      'admin',
      0,
      new Date(),
    );


    insertCategory(
      'carpool',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'cab',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'rideshare',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'sharing/share',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'bus',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'cost',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'vehicle',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'low-income',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'late night',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'safe/safety',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'membership',
      'surface',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'paid service',
      'deep',
      'admin',
      0,
      new Date(),
    );
    insertCategory(
      'eligibility/benefits',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'efficient',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'privileged riders',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'bike',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'bike',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'bike',
      'deep',
      'admin',
      0,
      new Date(),
    );

    insertCategory(
      'bike',
      'deep',
      'admin',
      0,
      new Date(),
    );
  }
});
