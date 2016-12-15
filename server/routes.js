const express = require('express');
const mal = require('./mal-search');
const paths = require('../src/constants/paths');

const router = express.Router(); 

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Query fired! : ', req.url);
    next(); // next route
});

//MAL route
router.get(paths.query.malSearch, mal.search);

// Content Site Routes

// Always return the main index.html, so react-router render the route in the client ## /^\/(?!api)/g
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = router;
