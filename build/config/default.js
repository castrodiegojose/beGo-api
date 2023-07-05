"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGO_URI,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE__API_KEY
};
exports.default = config;
//# sourceMappingURL=default.js.map