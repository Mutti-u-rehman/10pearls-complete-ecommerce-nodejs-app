/**
 * we import ObjectId from mongodb and If we have to multiple date type
 * of BSON then we can import complete mongodb and then we can access each
 * type in from one object
 */ 
const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId
  }

  /**
   * Saving current data based on Id
   * We decide the operation need to be performed 
   * update or add product
   */
  save() {
    const _db = getDb();
    let dbOp = _db.collection('products'); // db options

    if (this._id) {
      // update the product
      dbOp = dbOp.updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = dbOp.insertOne(this);
    }

    return dbOp;
  }

  /**
   * Get all product from Database
   * @returns Products
   */
  static async fetchAll() {
  const _db = getDb();
  return _db
    .collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log("Fetch All products:");
      return products;
    })
    .catch(err => {
      console.log("Error on fetch all products: ",err);
    });
  }

  /**
   * Fetch a single product based on Id
   * @param {ObjectId} prodId 
   * @returns Single Product
   */
  static async findById(prodId) {
    const _db = getDb();
    return _db
      .collection('products')
      .find({_id: new ObjectId(prodId)})
      .next()
      .then(products => {
        console.log("Fetch One product Based on Id");
        return products;
      })
      .catch(err => {
        console.log("Error on fetch all products: ",err);
      });
  }

  static async deleteById(prodId) {
    const _db = getDb();
    return _db
      .collection('products')
      .deleteOne({_id: new ObjectId(prodId)})
      .then(result => {
        console.log("Delete product Based on Id");
        return result;
      })
      .catch(err => {
        console.log("Error on Delelte product: ",err);
      });
  }
}

module.exports = Product;
