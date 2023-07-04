"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signup);
router.post('/signin', authController_1.signin);
router.get('/profile', verifyToken_1.TokenValidation, authController_1.profile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map