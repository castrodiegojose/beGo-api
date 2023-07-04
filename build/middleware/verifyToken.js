"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const default_1 = __importDefault(require("../config/default"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(400).json('Acceso denied');
    const payload = jsonwebtoken_1.default.verify(token, default_1.default.TOKEN_SECRET_KEY || 'tokenwhatever');
    req.userId = payload._id;
    next();
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map