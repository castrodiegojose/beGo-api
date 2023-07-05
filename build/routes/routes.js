"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointsController_1 = require("../controllers/pointsController");
const trucksController_1 = require("../controllers/trucksController");
const routesController_1 = require("../controllers/routesController");
const express_1 = require("express");
const routes = (0, express_1.Router)();
// points Router
routes.get('/points', pointsController_1.getAllPointsController);
// trucks Router
routes.get('/trucks', trucksController_1.getAllTrucksController);
// route Router
routes.get('/routes', routesController_1.getAllRoutesController);
routes.get('/route/:id', routesController_1.getRouteByIdController);
routes.post('/createRoute', routesController_1.createRouteController);
routes.put('/updateRoute/:id', routesController_1.updateRouteController);
routes.delete('/deleteRoute/:id', routesController_1.deleteRouteController);
exports.default = routes;
//# sourceMappingURL=routes.js.map