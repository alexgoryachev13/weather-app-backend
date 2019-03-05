const WeatherForecast = require('../models/WeatherForecast');
const OpenWeatherClient = require('../lib/openWeatherClient');
const City = require('../models/City');
const omit = require('lodash/omit');

module.exports = async () => {
  try {
    const cities = await City.find().lean();
    const {
      codes,
      codeToObjectIdMatch
    } = cities.reduce((acc, city) => {
      acc.codes.push(city.code);
      acc.codeToObjectIdMatch[city.code] = city._id;
      return acc;
    }, { codes: [], codeToObjectIdMatch: {} });

    const weatherList = await OpenWeatherClient.getCurrentWeather({ cityCodes: codes });

    const insertList = weatherList.map(item => {
      const newItem = omit(item, ['cityName', 'cityCode']);
      newItem.city = codeToObjectIdMatch[item.cityCode]
      return newItem;
    });

    await WeatherForecast.insertMany(insertList);
    console.log('New weather data');
  } catch(err) {
    console.log(err);
  }
}