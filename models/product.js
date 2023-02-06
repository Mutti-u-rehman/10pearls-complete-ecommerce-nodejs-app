/**
 * we import ObjectId from mongodb and If we have to multiple date type
 * of BSON then we can import complete mongodb and then we can access each
 * type in from one object
 */ 
const { ObjectId } = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const _db = getDb();
    return _db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log('result:', result);
      })
      .catch(err => {
        console.log(err);
      });
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
      console.log("Fetch All products");
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
}

module.exports = Product;
