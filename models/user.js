const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart || {items:[]};
    this._id = id;
  }

  /**
   * Saving one user in users database
   * @returns Response of database
   */
  save() {
    const _db = getDb();
    return _db.collection("users").insertOne(this);
  }

  /**
   * Return the Products
   * @returns {items: Array<{productId, quantity }>}
   */
  getCart() {
    const _db = getDb();
    const productIds = this.cart.items.map(cart => cart.productId);
    return _db
    .collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then(products => {
      return products.map(prod => {
        return {
          ...prod,
          quantity: this.cart.items.find(cart => {
            return cart.productId.toString() === prod._id.toString()
          }).quantity
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  /**
   * Product added to the cart
   * @param {Product} product 
   */
  addToCart(product) {
   
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => {
        return cp.productId.toString() === product._id.toString()
      });
   
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
    return _db
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
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;