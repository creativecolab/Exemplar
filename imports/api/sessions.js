import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default Sessions = new Mongo.Collection('sessions');

Meteor.methods({
    'sessions.updateTagTime'({time, id}) {
        // console.log(time + "LOL");
        // console.log(id);
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        
        Sessions.update({ _id: id }, {
            $set: { tagging_time: time },
        });

        return id;
    },
})