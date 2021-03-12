import { RedisOptions } from 'ioredis';

const REDIS_PORT = 11190;
const REDIS_HOST = 'redis-11190.c228.us-central1-1.gce.cloud.redislabs.com';
const REDIS_PASSWORD = 'aFlQh215oUwrwnhkIMJi1G0PwlbujJTV';

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    connectTimeout: 10000
};
