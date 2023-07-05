"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointsController_1 = require("../controllers/pointsController");
const trucksController_1 = require("../controllers/trucksController");
const routesController_1 = require("../controllers/routesController");
const express_1 = require("express");
const ordersController_1 = require("../controllers/ordersController");
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
// orders Router
routes.get('/orders', ordersController_1.getAllOrdersController);
routes.post('/createOrder', ordersController_1.createOrderController);
routes.put('/updateOrder/:id', ordersController_1.updateOrderController);
routes.delete('/deleteOrder/:id', ordersController_1.deleteOrderController);
exports.default = routes;
//# sourceMappingURL=routes.js.map