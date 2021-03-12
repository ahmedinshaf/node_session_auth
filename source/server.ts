import http from 'http';
import express from 'express';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import logging from './config/logging';

import mongoose from 'mongoose';
import { createApp } from './app';
import { MONGO_URI, MONGO_OPTIONS, REDIS_OPTIONS } from './config';

const NAMESPACE = 'Stablo API';
var router = express.Router();

/** Connect to Mongo */
mongoose
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);
const store = new RedisStore({ client });
const app = createApp(store);
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

router.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
// app.get('/', (req, res) => res.send('Hello'));
// app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRoutes);

const httpServer = http.createServer(app);

httpServer.listen(3000, () => logging.info(NAMESPACE, `Server is running `));
