require('./database/connectToDB')();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ extend: false }));

module.exports = app;
