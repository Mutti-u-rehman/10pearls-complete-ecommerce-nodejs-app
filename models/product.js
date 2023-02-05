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
    const client = getDb();
    return client
      .db('completeNodeJs')
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
    const client = getDb();
    return client
      .db('completeNodeJs')
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
