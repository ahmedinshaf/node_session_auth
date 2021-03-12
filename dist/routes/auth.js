"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var authentication_1 = __importDefault(require("../controllers/authentication"));
var middleware_1 = require("../middleware");
var router = express_1.default.Router();
router.post('/register', middleware_1.guest, middleware_1.asyncWrap(authentication_1.default.register));
router.post('/login', middleware_1.guest, middleware_1.asyncWrap(authentication_1.default.login));
router.post('/logout', middleware_1.auth, middleware_1.asyncWrap(authentication_1.default.logout));
module.exports = router;
