// Loads the configuration from config.env to process.env
require('dotenv').config({ path: './config.env' });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// get MongoDB driver connection
// const dbo = require('./util/conn');
const mongoConnect = require('./util/database').mongoConnect;

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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

    next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(PORT, () => 
  {
      console.log(`Server is running on port: ${PORT}`);
  })
});

// dbo.connectToServer(function (err) {
//     if (err) {
//         console.error(err);
//         process.exit();
//     }

//     // start express server
//     app.listen(PORT, () => {
//         console.log(`Server is running on port: ${PORT}`);
//     })
// });
