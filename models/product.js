const { resolve } = require('path');

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
}

module.exports = Product;
