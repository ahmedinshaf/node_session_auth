"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_OPTIONS = exports.SESSION_ABSOLUTE_TIMEOUT = exports.SESSION_IDLE_TIMEOUT = exports.SESSION_NAME = exports.SESSION_SECRET = void 0;
var app_1 = require("./app");
var ONE_HOUR = 1000 * 60 * 60;
var THIRTY_MINUTES = ONE_HOUR / 2;
var SIX_HOURS = ONE_HOUR * 6;
var env = process.env;
exports.SESSION_SECRET = (_a = env.SESSION_SECRET, _a === void 0 ? 'please keep this secret, mate' : _a), exports.SESSION_NAME = (_b = env.SESSION_NAME, _b === void 0 ? 'sid' : _b), exports.SESSION_IDLE_TIMEOUT = (_c = env.SESSION_IDLE_TIMEOUT, _c === void 0 ? THIRTY_MINUTES : _c);
exports.SESSION_ABSOLUTE_TIMEOUT = +(env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS);
exports.SESSION_OPTIONS = {
    secret: exports.SESSION_SECRET,
    name: exports.SESSION_NAME,
    cookie: {
        maxAge: +exports.SESSION_IDLE_TIMEOUT,
        secure: app_1.IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
