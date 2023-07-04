"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const authRoutes_1 = __importDefault(require("./authRoutes"));
const routes_1 = __importDefault(require("./routes"));
exports.appRoutes = {
    authRoutes: authRoutes_1.default,
    routes: routes_1.default
};
//# sourceMappingURL=index.js.map