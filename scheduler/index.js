const schedule = require('node-schedule');
const getOpenWeatherForecast = require('./getOpenWeatherForecast');

const config = [
  {
    rule: '*/1 * * * *',
    func: getOpenWeatherForecast,
  }
];

function start() {
  return config.map(({ rule, func }) => schedule.scheduleJob(rule, func));
}

function stop(jobs = []) {
  return jobs.map(job => job.cancel());
}

module.exports = { start, stop };
