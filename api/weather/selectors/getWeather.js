const WeatherForecast = require('../../../models/WeatherForecast');

module.exports = ({ period }) => {
  const weatherList = WeatherForecast
    .aggregate()
    .match({ date: { $gte: period.from, $lte: period.to } })
    .sort({ date: 'asc '})
    .lookup({ from: 'cities', localField: 'city', foreignField: '_id', as: 'city' })
    .unwind('city')
    .project({ __v: 0, 'city.__v': 0 })
    .group({ _id: '$city', list: { $push: '$$ROOT' }  })
    .exec();
  
  return weatherList;
}