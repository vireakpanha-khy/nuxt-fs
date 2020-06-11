const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  registrationDate: Object
});

module.exports = mongoose.model('User', userSchema);
