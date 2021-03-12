"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var config_1 = require("./config");
var middleware_1 = require("./middleware");
var project_1 = __importDefault(require("./routes/project"));
var auth_1 = __importDefault(require("./routes/auth"));
// import { home, login, register, verify, reset } from './routes';
// import { notFound, serverError, active } from './middleware';
var createApp = function (store) {
    var app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_session_1.default(__assign(__assign({}, config_1.SESSION_OPTIONS), { store: store })));
    app.get('/', function (req, res) { return res.send('Hello'); });
    app.use('/api/projects', project_1.default);
    app.use('/api/auth', auth_1.default);
    app.use(middleware_1.notFound);
    app.use(middleware_1.serverError);
    return app;
};
exports.createApp = createApp;
