exports = async function(phone, key, imageURL, imageType){
  const contests = context.services
    .get('mongodb-atlas')
    .db('data')
    .collection('contests');
  const contest_id = BSON.ObjectId('5c0eb1151c9d440000212c19');
  
  const bucket = 'stitchcraft-contest-entries';
  try {
    const imageData = await context.functions.execute('urlToStream', imageURL);
    const { ETag } = await context.services
      .get('aws')
      .s3()
      .PutObject({
        ACL: 'public-read',
        Bucket: bucket,
        Key: key,
        Body: imageData,
        ContentType: imageType
      });
    const entry = {
      key,
      phone,
      image: {
        bucket,
        key,
        type: imageType,
        ETag
      },
      votes: []
    };
    
    return contests.updateOne({_id: contest_id}, {$push: {entries: entry}});
  } catch (e) {
    console.log(e);
  }
};