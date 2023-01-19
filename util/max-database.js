const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = process.env.ATLAS_URI;

let _db;
const mongoConnect = callback => {
  MongoClient.connect(connectionString)
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback(client);
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
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;