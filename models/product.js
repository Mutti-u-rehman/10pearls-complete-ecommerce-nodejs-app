const getDb = require('../util/conn').getDb;
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    db.collection("products")
      .insertOne(this)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    return db.collection('prodcuts').find().toArray()
    .then(products => {
      return products;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Product;