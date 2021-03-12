"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.resendEmailSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = void 0;
var joi_1 = require("./joi");
var config_1 = require("../config");
var id = joi_1.Joi.objectId().required();
var email = joi_1.Joi.string().email().min(8).max(254).lowercase().trim().required();
var name = joi_1.Joi.string().min(3).max(128).trim().required();
var password = joi_1.Joi.string()
    .min(8)
    .max(config_1.BCRYPT_MAX_BYTES, 'utf8')
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required();
var passwordConfirmation = joi_1.Joi.valid(joi_1.Joi.ref('password')).required();
exports.registerSchema = joi_1.Joi.object({
    email: email,
    name: name,
    password: password,
    passwordConfirmation: passwordConfirmation
});
exports.loginSchema = joi_1.Joi.object({
    email: email,
    password: password
});
exports.verifyEmailSchema = joi_1.Joi.object({
    id: id,
    token: joi_1.Joi.string().length(config_1.EMAIL_VERIFICATION_TOKEN_BYTES).required(),
    expires: joi_1.Joi.date().timestamp().required(),
    signature: joi_1.Joi.string().length(config_1.EMAIL_VERIFICATION_SIGNATURE_BYTES).required()
});
exports.resendEmailSchema = joi_1.Joi.object({
    email: email
});
exports.forgotPasswordSchema = joi_1.Joi.object({
    email: email
});
exports.resetPasswordSchema = joi_1.Joi.object({
    query: joi_1.Joi.object({
        id: id,
        token: joi_1.Joi.string()
            .length(config_1.PASSWORD_RESET_BYTES * 2)
            .required()
    }),
    body: joi_1.Joi.object({
        password: password,
        passwordConfirmation: passwordConfirmation
    })
});
