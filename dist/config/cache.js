"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_OPTIONS = void 0;
var REDIS_PORT = 11190;
var REDIS_HOST = 'redis-11190.c228.us-central1-1.gce.cloud.redislabs.com';
var REDIS_PASSWORD = 'aFlQh215oUwrwnhkIMJi1G0PwlbujJTV';
exports.REDIS_OPTIONS = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    connectTimeout: 10000
};
