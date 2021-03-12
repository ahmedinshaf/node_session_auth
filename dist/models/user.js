"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// import { Schema, Document, Model } from 'mongoose';
var mongoose_1 = __importStar(require("mongoose"));
var bcryptjs_1 = require("bcryptjs");
var crypto_1 = require("crypto");
var config_1 = require("../config");
var UserSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    password: String,
    verifiedAt: Date
}, {
    timestamps: true
});
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified('password')) return [3 /*break*/, 2];
                    _a = this;
                    return [4 /*yield*/, bcryptjs_1.hash(this.password, config_1.BCRYPT_WORK_FACTOR)];
                case 1:
                    _a.password = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
});
UserSchema.methods.matchesPassword = function (password) {
    var user = this;
    return bcryptjs_1.compare(password, user.password);
};
UserSchema.methods.verificationUrl = function () {
    var user = this;
    var token = crypto_1.createHash('sha1').update(user.email).digest('hex');
    var expires = Date.now() + config_1.EMAIL_VERIFICATION_TIMEOUT;
    var url = config_1.APP_ORIGIN + "/email/verify?id=" + this.id + "&token=" + token + "&expires=" + expires;
    var signature = exports.User.signVerificationUrl(url);
    return url + "&signature=" + signature;
};
UserSchema.statics.signVerificationUrl = function (url) { return crypto_1.createHmac('sha256', config_1.APP_SECRET).update(url).digest('hex'); };
UserSchema.statics.hasValidVerificationUrl = function (path, query) {
    var url = "" + config_1.APP_ORIGIN + path;
    var original = url.slice(0, url.lastIndexOf('&'));
    var signature = exports.User.signVerificationUrl(original);
    return crypto_1.timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) && +query.expires > Date.now();
};
UserSchema.set('toJSON', {
    transform: function (doc, _a, options) {
        var __v = _a.__v, password = _a.password, rest = __rest(_a, ["__v", "password"]);
        return rest;
    }
});
exports.User = mongoose_1.default.model('User', UserSchema);
