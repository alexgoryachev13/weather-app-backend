const mongoose = require('mongoose');
const { Schema } = mongoose;

const WeatherForecast = new Schema({
  temperature: { type: Number, required: true },
  pressure: { type: Number },
  humidity: { type: Number },
  date: { type: Date, required: true },
  city: { type: Schema.ObjectId, ref: 'City', required: true },
});

module.exports = mongoose.model('WeatherForecast', WeatherForecast);
