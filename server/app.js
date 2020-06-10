require('dotenv').config();
require('./database/connectToDB')();
const express = require('express');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.json({ extend: false }));

module.exports = app;
