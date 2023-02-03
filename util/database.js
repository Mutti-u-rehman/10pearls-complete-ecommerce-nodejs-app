const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = process.env.ATLAS_URI;

let _db_client;

const mongoConnect = callback => {
  MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!');
      _db_client = client;
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db_client) {
    return _db_client;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;