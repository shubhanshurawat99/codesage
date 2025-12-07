const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-16750.c52.us-east-1-4.ec2.cloud.redislabs.com',
        port: 16750
    }
});

module.exports = redisClient;
