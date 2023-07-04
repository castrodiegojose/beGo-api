"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./db/config"));
const default_1 = __importDefault(require("./config/default"));
const routes_1 = require("./routes");
const verifyToken_1 = require("./middleware/verifyToken");
// connecting mongoDB
(0, config_1.default)();
const app = (0, express_1.default)();
// middleware
app.use(body_parser_1.default.json());
//routes
app.use('/api/auth', routes_1.appRoutes.authRoutes);
app.use('/api', verifyToken_1.TokenValidation, routes_1.appRoutes.routes);
// server
const PORT = default_1.default.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT} 🚀`);
});
//# sourceMappingURL=server.js.map