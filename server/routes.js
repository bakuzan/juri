const express = require('express');
const malSearch = require('./mal-search');

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Query fired! : ', req.url);
    next(); // next route
});

//MAL route
router.get('/api/mal-search/:type', malSearch);

// Content Site Routes
router.get('/api/site-search/:type/:age', (req, res) => { console.log('site serach needs implementing!'); });

module.exports = router;
