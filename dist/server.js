"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var connect_redis_1 = __importDefault(require("connect-redis"));
var express_session_1 = __importDefault(require("express-session"));
var ioredis_1 = __importDefault(require("ioredis"));
var logging_1 = __importDefault(require("./config/logging"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = require("./app");
var config_1 = require("./config");
var NAMESPACE = 'Stablo API';
var router = express_1.default.Router();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.MONGO_URI, config_1.MONGO_OPTIONS)
    .then(function (result) {
    logging_1.default.info(NAMESPACE, 'Mongo Connected');
})
    .catch(function (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
});
var RedisStore = connect_redis_1.default(express_session_1.default);
var client = new ioredis_1.default(config_1.REDIS_OPTIONS);
var store = new RedisStore({ client: client });
var app = app_1.createApp(store);
/** Log the request */
app.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
router.use(express_1.default.json());
/** Rules of our API */
app.use(function (req, res, next) {
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
var PORT = process.env.PORT || 3000;
var httpServer = http_1.default.createServer(app);
httpServer.listen(PORT, function () { return logging_1.default.info(NAMESPACE, "Server is running "); });
