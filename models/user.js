const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const _db = getDb();
    return _db.collection("users").insertOne(this);
  }

  addToCart(product) {

    if (this.cart && this.cart.length > 0) {
      const cartProduct = this.cart.items.findIndex(
        (cp) => cp._id === product._id
      );
  
      if (cartProduct === -1) {
        const updateCart = {
          items: [{ productId: new ObjectId(product._id), quantity: 1 }],
        };
      }
    }

    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const _db = getDb();
    _db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) }, 
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