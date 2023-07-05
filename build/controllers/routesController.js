"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouteController = exports.updateRouteController = exports.getRouteByIdController = exports.getAllRoutesController = exports.createRouteController = void 0;
const routesSerices_1 = require("../services/routesSerices");
const pointsServices_1 = require("../services/pointsServices");
const createRouteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pointA, pointB } = req.body;
    if (!pointA || !pointB)
        return res.status(404).json("There are not any points defined");
    if (yield (0, routesSerices_1.checkIfRouteExist)(pointA, pointB))
        return res.status(404).json("Route already exists");
    const newRoute = yield (0, routesSerices_1.createNewRouteService)(pointA, pointB);
    res.status(200).send({ status: "success", code: 200, data: newRoute });
});
exports.createRouteController = createRouteController;
const getAllRoutesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const routes = yield (0, routesSerices_1.getAllRoutesService)();
    res.status(200).send({ status: "success", code: 200, data: routes });
});
exports.getAllRoutesController = getAllRoutesController;
const getRouteByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json("Missing parameter 'id'");
    const route = yield (0, routesSerices_1.getRouteByIdService)(id);
    if (!route)
        return res.status(404).json("There is not route defined");
    res.status(200).send({ status: "success", code: 200, data: route });
});
exports.getRouteByIdController = getRouteByIdController;
const updateRouteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pointA, pointB } = req.body;
    if (!pointA || !pointB || !id)
        return res.status(400).json("Some points or id are missing");
    const existingRoute = yield (0, routesSerices_1.getRouteByIdService)(id);
    if (!existingRoute)
        return res.status(404).json("There is not route defined");
    const placeIdFrom = yield (0, pointsServices_1.getPlaceIdByNamePointsService)(pointA);
    const placeIdTo = yield (0, pointsServices_1.getPlaceIdByNamePointsService)(pointB);
    if (!placeIdFrom || !placeIdTo)
        return res.status(404).json("New points does not exist");
    const updatedRoute = yield (0, routesSerices_1.updateRouteService)(id, pointA, pointB, placeIdFrom, placeIdTo);
    res.status(200).send({ status: "success", code: 200, data: updatedRoute });
});
exports.updateRouteController = updateRouteController;
const deleteRouteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json("Missing parameter 'id'");
    const existingRoute = yield (0, routesSerices_1.getRouteByIdService)(id);
    if (!existingRoute)
        return res.status(404).json("There is not route defined");
    if (!(yield (0, routesSerices_1.deleteRouteService)(id)))
        return res.status(202).send({ status: "success", code: 202, data: `The data base does not response` });
    res.status(200).send({ status: "success", code: 200, data: `Route id:${id} deleted` });
});
exports.deleteRouteController = deleteRouteController;
//# sourceMappingURL=routesController.js.map