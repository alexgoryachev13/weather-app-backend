const getWeather = require('./selectors/getWeather');
const moment = require('moment');

module.exports = async (req, res, next) => {
  try {
    const yesterdayDate = moment(new Date()).subtract(1, 'day');
    const period = {
      from: yesterdayDate.startOf('day').toDate(),
      to: yesterdayDate.endOf('day').toDate(),
    }
    const weatherList = await getWeather({ period });

    const response = weatherList.reduce((acc, group) => {
      const city = group._id;
      acc.cities[city._id] = city;
      acc.weather[city._id] = group.list.map(item => ({
        ...item,
        city: city._id,
      }));
      return acc;
    }, { weather: {}, cities: {} });

    return res.json(response)
  } catch(err) {
    res.json({ error });
  }
};
