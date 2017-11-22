const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = require('./uri');

MongoClient.connect(MONGODB_URI, (err, db) => {
  console.log(db);
  db.collection('wumble', function(err, collection) {
    if (err) throw err;
    collection.insert({firstName: 'Steve'});
    collection.find().toArray(function(err, items) {
      if (err) throw err;
      console.log(items);
    });
  })
  if (err) throw err;
});