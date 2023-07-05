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
        return res.status(401).json('Access denied: Invalid token');
    const { valid, payload } = decodeToken(token);
    if (!valid) {
        return res.status(500).send({
            status: "error",
            code: 500,
            message: "Invalid token or expired token",
        });
    }
    req.userId = payload._id;
    next();
};
exports.TokenValidation = TokenValidation;
function decodeToken(token) {
    try {
        const payload = jsonwebtoken_1.default.verify(token, default_1.default.TOKEN_SECRET_KEY || 'tokenwhatever');
        return { valid: true, payload };
    }
    catch (err) {
        const error = err;
        console.error(error);
        return {
            valid: false,
            payload: null,
        };
    }
}
//# sourceMappingURL=verifyToken.js.map