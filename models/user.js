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

  /**
   * Product added to the cart
   * @param {Product} product 
   */
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId === product._id);
   
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }
    

    const updatedCart = {
      items: updateCartItems,
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