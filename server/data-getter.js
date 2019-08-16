/* This File contains multiple functions that various apis use to get certain data in csv format */
/* 
  Goal: Obtain details of the interactions of each participant in a session.
  Does so from the information saved by the "teamHistory" matrix in the queried session.
*/

export function getResponses(sess_id) {
    const session = Sessions.findOne({ _id: sess_id });

    if (!session) {
        return 'No session named ' + sess_id + ' yet!';
    }

    // Data will change
    const { condition, user_id, user_problem_before, user_problem_after } = session;

    if (!session.finished_at) {
        return 'No data for the session ' + sess_id + ' yet';
    }

    // let ret = 'participant,all_interactions,people_interacted_with,num_interactions,num_unique_interactions\n';
    // let csv = 'condition,' + session.condition + '';
    const rows = [
        ["condition", "user_id", "user_problem_before", "user_problem_after"],
        [ condition, user_id, user_problem_before, user_problem_after ],
    ];
    
    // data:text/csv;charset=utf-8,
    let csvContent = "" 
        + rows.map(e => e.join(",")).join("\n");

    return csvContent;

    // participants.forEach((participant) => {
    //     participant_interactions = teamHistory[participant];
    //     participant_ratings = Users.findOne({ pid: participant }).preferences
    //     let i_actions = ',{';
    //     let uniq_i_actions = '[';
    //     let total_interactions = 0;
    //     let unique_interactions = 0;
    //     for (var person in participant_interactions) {
    //         if (participant_interactions.hasOwnProperty(person)) {
    //             if (participant_interactions[person] !== 0) {
    //                 // change num to avg rating between each dude
    //                 let avg_rating = getAverageRating(participant, participant_ratings, person, Users.findOne({ pid: person }).preferences, activities);
    //                 i_actions += person + ': ' + avg_rating + '; ';
    //                 uniq_i_actions += person + '; ';
    //                 total_interactions = total_interactions + participant_interactions[person];
    //                 unique_interactions = unique_interactions + 1;

    //             }
    //         }
    //     }
    //     i_actions = i_actions.slice(0, -2);
    //     i_actions += '},';
    //     uniq_i_actions = uniq_i_actions.slice(0, -2);
    //     uniq_i_actions += '],';
    //     ret += participant + i_actions + uniq_i_actions + total_interactions + ',' + unique_interactions + '\n';
    // });

    // return ret;

}