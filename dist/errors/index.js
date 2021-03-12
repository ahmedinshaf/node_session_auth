"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HttpError;
}(Error));
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(message) {
        if (message === void 0) { message = 'Bad Request'; }
        var _this = _super.call(this, message) || this;
        _this.status = 400;
        return _this;
    }
    return BadRequest;
}(HttpError));
exports.BadRequest = BadRequest;
var Unauthorized = /** @class */ (function (_super) {
    __extends(Unauthorized, _super);
    function Unauthorized(message) {
        if (message === void 0) { message = 'Unauthorized'; }
        var _this = _super.call(this, message) || this;
        _this.status = 401;
        return _this;
    }
    return Unauthorized;
}(HttpError));
exports.Unauthorized = Unauthorized;
