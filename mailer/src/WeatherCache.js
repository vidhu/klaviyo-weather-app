import redis from 'redis';
import { promisify } from 'util';
import moment from 'moment';

const getTodaysDate = () => moment().format('YYYY-MM-DD');

const client = redis.createClient('redis://redis:6379');
const getAsync = promisify(client.get).bind(client);

const cache = {};

const getCityWeather = async city => {
  // Check local cache if we have data
  if (cache[city] && cache[city].date === getTodaysDate()) {
    console.log(`[L-Cache hit]: ${city}`); // Local Cache
    return cache[city];
  }

  // Check redis cache
  const dataString = await getAsync(`weather:${city}`);
  if (dataString !== null) {
    console.log(`[R-Cache hit]: ${city}`); // Redis Cache
    return JSON.parse(dataString);
  }
  return null;
};

const cacheCityWeather = cityWeather => {
  cache[cityWeather.city] = cityWeather;
  client.set(`weather:${cityWeather.city}`, JSON.stringify(cityWeather), redis.print);
};

export default {
  getCityWeather,
  cacheCityWeather
};
