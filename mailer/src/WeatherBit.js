import axios from 'axios';
import moment from 'moment';

const getTodaysDate = () => moment().format('YYYY-MM-DD');
const getYesterdaysDate = () =>
  moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

const BASE_URL = 'https://api.weatherbit.io/v2.0/';
const API_KEY = '64e21cbc5bcf43efa04dd674cf6f84cb';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    units: 'I',
    country: 'US'
  }
});

const cache = {};

const getCurrentWeather = async city => {
  const res = await instance.get('/current', {
    params: { city }
  });
  const data = res.data;
  return data.data[0];
};

const getHistoricalWeather = async city => {
  const res = await instance.get('/history/daily', {
    params: { city, start_date: getYesterdaysDate(), end_date: getTodaysDate() }
  });
  const data = res.data;
  return data.data[0];
};

export const getWeatherStatus = async city => {
  const todaysDate = getTodaysDate();

  // Check cache if we have data
  if (cache[city] && cache[city].date === todaysDate) return cache[city];

  // If not, update cache
  const [current, historical] = await Promise.all([getCurrentWeather(city), getHistoricalWeather(city)]);

  const tempDiff = current.temp - (historical.max_temp - historical.min_temp) / 2;
  const isSunny = current.weather.code >= 800 || current.weather.code <= 803;
  const isRainy = current.weather.code >= 200 || current.weather.code <= 623;

  const result = {
    city,
    date: todaysDate,
    temp: current.temp,
    tempDiff,
    isSunny,
    isRainy,
    iconCode: current.weather.icon
  };
  cache[city] = result;
  return result;
};
