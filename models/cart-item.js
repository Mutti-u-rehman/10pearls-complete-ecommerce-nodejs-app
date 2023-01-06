const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const cartItem = sequelize.define('cartItem', {
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
    },
  quantity: Sequelize.INTEGER
});

module.exports = cartItem;