const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = Number.parseInt(process.env.REDIS_PORT, 10) || 6379;
export const redisUrl = `redis://${redisHost}:${redisPort}`;
export const redisPriceKey = process.env.REDIS_PRICE_KEY || 'price';
export const redisPricePushKey = process.env.REDIS_PRICE_PUSH_KEY || 'push-price';