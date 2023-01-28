const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const ATLAS_URI = '';

const mongoConnect = callback => {
  MongoClient.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;