exports = async function(key, from){
  const contests = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('contests');
  const contest_id = BSON.ObjectId('5c0eb1151c9d440000212c19');
  
  try {
    const { entries } = await contests.findOne({_id: contest_id});
    const newEntries = entries.map(entry => {
      if (entry.key.toUpperCase() === key.toUpperCase()) {
         if(entry.votes.indexOf(from) === -1) {
           entry.votes = [...entry.votes, from];
         }
      }
      return entry;
    });
    
    return contests
      .updateOne({_id: contest_id}, {$set: {entries: newEntries}});
  } catch (e) {
    console.log(e);
  }
};