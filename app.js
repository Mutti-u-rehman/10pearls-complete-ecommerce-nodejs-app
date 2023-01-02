const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database.js');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setting user available for all routes 
 */
app.use((req, res, next) => {
    User
    .findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log("Error caused at middleware on getting user", err);
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/**
 * setting Association here regarding table in DB
 * when we sync, it will create references in between tables
 */
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

/**
 * this will create tables if not exsit with all associations as per models
 * also this will create User with default value if not exit any
 */
sequelize
    .sync()  // .sync({ force: true}) if we want overwrite
    .then((result) => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user) {
            return User.create({name: "Mutti u rehman", email: 'mutti.dev@gmail.com'});
        }
        return user;
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
