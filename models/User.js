const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: 'a girl has no name'
  }
});

module.exports = User = mongoose.model('User', UserSchema, 'users');
