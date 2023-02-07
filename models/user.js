const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
class User {
    constructor(_username, _email) {
        this.username = _username;
        this.email = _email;
    }

    save() {
        const _db = getDb();
        return _db.collection('users').insertOne(this);
    }

    static async findById(userId) {
        const _db = getDb();
        return _db.collection('users').findOne({_id: new ObjectId(userId)});
    }
}

module.exports = User;