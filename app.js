// const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const mongoConnect = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setting user available for all routes
 */
app.use((req, res, next) => {
  // User
  // .findByPk(1)
  // .then(user => {
  //     req.user = user;
  //     next();
  // })
  // .catch(err => {
  //     console.log("Error caused at middleware on getting user", err);
  // });
});
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
