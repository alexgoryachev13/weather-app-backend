const mongoose = require('mongoose');
const { Schema } = mongoose;

const City = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
});

module.exports = mongoose.model('City', City);
