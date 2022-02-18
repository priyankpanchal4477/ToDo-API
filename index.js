const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.dbURL;
const app = express();

// DB Connect
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

// Will handle text/plain requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.text());

// Headers needed for CORS error from frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

// Routes
const routes = require('./routes/index');
app.use('/', routes);

// 404 handling
app.use((req, res) => {
  return res.status(404).json({ status: false, message: "Could not find this route." });
});

// 500 handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
   
  if (error.code >= 100 && error.code < 600)
    res.status(error.code);
  else
    res.status(500);  


  res.json({ status: false, message: error.message || 'An unknown error occurred!' });
});


// Server 
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

module.exports = app;