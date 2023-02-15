
// const path = require('path');

// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });
const connectionString = process.env.ATLAS_URI;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// get MongoDB driver connection
// const dbo = require('./util/conn');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setting user available for all routes 
 * Dummy user setup for now will get user based
 * on Authentication later
 */
app.use((req, res, next) => {
    User
    .findById('63e694d411a30a838a037997')
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => {
        console.log("Error caused at middleware on getting user", err);
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(connectionString)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });