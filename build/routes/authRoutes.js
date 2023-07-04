"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/signup', authController_1.signup);
authRoutes.post('/signin', authController_1.signin);
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map