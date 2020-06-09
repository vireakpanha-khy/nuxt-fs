require('./database/connectToDB')();
const express = require('express');

const app = express();
app.use(express.json({ extend: false }));

module.exports = app;
