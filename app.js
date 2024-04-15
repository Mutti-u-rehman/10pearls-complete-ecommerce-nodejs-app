
const path = require('path');

// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });
const connectionString = process.env.ATLAS_URI;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(connectionString.slice(1, connectionString.length - 2)) // removing single quotes
  .then((result) => {
    app.listen(3000);
    console.log('connnection successfull');
  })
  .catch((err) => {
    console.log(err);
  });
