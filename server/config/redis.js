const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

redisClient.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.connect();

module.exports = redisClient;
