"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointsController_1 = require("../controllers/pointsController");
const trucksController_1 = require("../controllers/trucksController");
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/points', pointsController_1.getAllPoints);
routes.get('/trucks', trucksController_1.getAllTrucks);
exports.default = routes;
//# sourceMappingURL=routes.js.map