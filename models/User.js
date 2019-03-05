const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
  googleId: { type: String, required: true },
});

module.exports = mongoose.model('User', User);
