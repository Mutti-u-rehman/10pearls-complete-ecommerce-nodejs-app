const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
class User {
  constructor(_username, _email, _cart) {
    this.username = _username;
    this.email = _email;
    this.cart = _cart;
  }

  save() {
    const _db = getDb();
    return _db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(
      (cp) => cp._id === product._id
    );

    if (cartProduct === -1) {
      const updateCart = {
        items: [{ ...product, quantity: 1 }],
      };
    }

    this.updateCart(this._id, updatedCart);
  }

  static async updateCart(id, updatedCart) {
    const _db = getDb();
    _db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { cart: updatedCart }}
        );
  }

  static async findById(userId) {
    const _db = getDb();
    return _db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;