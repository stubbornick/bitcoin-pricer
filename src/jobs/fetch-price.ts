/* eslint-disable no-console */
import 'dotenv/config';

import axios from 'axios';
import * as Redis from 'ioredis';

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = Number.parseInt(process.env.REDIS_PORT, 10) || 6379;
const redisPriceKey = process.env.REDIS_PRICE_KEY || 'price';
const updateInterval = Number.parseInt(process.env.UPDATE_INTERVAL, 10) || 60*1000;
const cryptocompareApiKey = process.env.CRYPTOCOMPARE_API_KEY;

const fetchPrice = async (redis) => {
  try {
    const { data } = await axios.get(
      'https://min-api.cryptocompare.com/data/price',
      {
        params: {
          fsym: 'BTC',
          tsyms: 'USD,JPY,EUR',
          api_key: cryptocompareApiKey,
        },
      },
    );

    console.log(`Saving price (${JSON.stringify(data)}) to ${redisPriceKey}`);
    await redis.set(redisPriceKey, JSON.stringify(data));
  } catch(error) {
    console.error('Price fetching error:', error);
  }
};

const main = async () => {
  const redis = new Redis(redisPort, redisHost);

  await new Promise((resolve, reject) => {
    redis.once('ready', resolve);
    redis.once('error', reject);
  });

  redis.on('error', (error) => console.error('Redis Error:', error));

  setInterval(() => fetchPrice(redis), updateInterval);
  await fetchPrice(redis);
};

main().catch((error) => console.error('FATAL ERROR:', error));
