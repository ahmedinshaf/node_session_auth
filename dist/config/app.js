"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_PROD = exports.APP_ORIGIN = exports.APP_SECRET = exports.APP_PROTOCOL = exports.APP_HOSTNAME = exports.APP_PORT = exports.NODE_ENV = void 0;
exports.NODE_ENV = (_a = process.env, _b = _a.NODE_ENV, _b === void 0 ? 'development' : _b), exports.APP_PORT = (_c = _a.APP_PORT, _c === void 0 ? 3000 : _c), exports.APP_HOSTNAME = (_d = _a.APP_HOSTNAME, _d === void 0 ? 'localhost' : _d), exports.APP_PROTOCOL = (_e = _a.APP_PROTOCOL, _e === void 0 ? 'http' : _e), exports.APP_SECRET = (_f = _a.APP_SECRET, _f === void 0 ? '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0' : _f);
exports.APP_ORIGIN = exports.APP_PROTOCOL + "://" + exports.APP_HOSTNAME + ":" + exports.APP_PORT;
exports.IN_PROD = exports.NODE_ENV === 'production';
