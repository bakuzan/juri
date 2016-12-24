const express = require('express');
const malSearch = require('./controllers/mal-search');
const content = require('./controllers/content-search');

const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Query fired! : ', req.url);
    next(); // next route
});

//MAL route
router.get('/api/mal-search/:type', malSearch);

// Content Site Route
router.get('/api/content-search/:type/:age', content.search);
router.get('/api/content-site-list', content.siteList);

module.exports = router;
