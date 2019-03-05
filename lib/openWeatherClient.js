const axios = require('axios');

const ONE_SECOND = 1000;

const { API_URL, API_KEY } = require('../config').openWeather;

const buildUrl = (baseUrl) => `${baseUrl}/group`;
const parseItem = (item) => {
  const main = item.main;

  return {
    temperature: main.temp,
    pressure: main.pressure,
    humidity: main.humidity,
    cityCode: item.id,
    cityName: item.name,
    date: item.dt * ONE_SECOND,
  };
};

class OpenWeatherClient { 
  constructor(apiKey, apiUrl) {
    this._apiKey = apiKey;
    this._apiUrl = apiUrl;
  }

  async getCurrentWeather({ cityCodes }) {
    const ids = cityCodes.join(',');

    const response = await axios.get(
      buildUrl(this._apiUrl),
      {
        params: {
          id: ids,
          appid: this._apiKey,
          units: 'metric',
        }
      }
    );

    const rawDataList = response.data.list;

    return rawDataList.map(parseItem);
  }
}

module.exports = new OpenWeatherClient(API_KEY, API_URL);

