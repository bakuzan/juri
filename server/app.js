const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

//loads .env file into process.env
dotenv.config();

const app = express();
const router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client ## /^\/(?!api)/g
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Register server queries prefixed with /api
app.use('/api', router);

module.exports = app;
