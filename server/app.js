const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

//loads .env file into process.env
dotenv.config();

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Routes
app.use(require('./routes'));

module.exports = app;
