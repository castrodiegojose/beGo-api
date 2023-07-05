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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouteIdForOrder = exports.deleteRouteService = exports.updateRouteService = exports.getRouteByIdService = exports.getAllRoutesService = exports.checkIfRouteExist = exports.createNewRouteService = void 0;
const routesModel_1 = __importDefault(require("../models/routesModel"));
const googleApi_1 = require("../utils/googleApi");
const pointsServices_1 = require("./pointsServices");
const trucksServices_1 = require("./trucksServices");
function createNewRouteService(pointA, pointB) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placeIdFrom = yield (0, pointsServices_1.getPlaceIdByNamePointsService)(pointA);
            const placeIdTo = yield (0, pointsServices_1.getPlaceIdByNamePointsService)(pointB);
            const coordenatesOrigin = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdFrom);
            const coordenatesDestination = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdTo);
            const origin = `${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude},${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude}`;
            const destination = `${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude},${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude}`;
            const distance = yield (0, googleApi_1.calculateRouteDistance)(origin, destination);
            const truckId = yield (0, trucksServices_1.getTruckAvailableService)();
            if (!truckId)
                throw new Error("No truck available");
            const newRouteCreated = yield routesModel_1.default.create({
                pointA,
                pointB,
                coordenatesPointA: {
                    latitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude,
                    longitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude
                },
                coordenatesPointB: {
                    latitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude,
                    longitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude
                },
                distance,
                truckAssigned: truckId
            });
            yield newRouteCreated.save();
            return newRouteCreated;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.createNewRouteService = createNewRouteService;
function checkIfRouteExist(pointA, pointB) {
    return __awaiter(this, void 0, void 0, function* () {
        // const fromName = pointA;
        // const toName = pointB;
        const route = yield routesModel_1.default.find({
            pointA,
            pointB,
        });
        if (route.length !== 0)
            return true;
        return false;
    });
}
exports.checkIfRouteExist = checkIfRouteExist;
function getAllRoutesService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const routes = yield routesModel_1.default.find();
            return routes;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getAllRoutesService = getAllRoutesService;
function getRouteByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const route = yield routesModel_1.default.findById(id);
            return route;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getRouteByIdService = getRouteByIdService;
function updateRouteService(id, pointA, pointB, placeIdFrom, placeIdTo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const coordenatesOrigin = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdFrom);
            const coordenatesDestination = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdTo);
            const origin = `${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude},${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude}`;
            const destination = `${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude},${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude}`;
            const distance = yield (0, googleApi_1.calculateRouteDistance)(origin, destination);
            const updateQuery = {
                pointA,
                pointB,
                coordenatesPointA: {
                    latitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude,
                    longitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude
                },
                coordenatesPointB: {
                    latitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude,
                    longitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude
                },
                distance,
            };
            const routeUpdated = yield routesModel_1.default.findByIdAndUpdate({ _id: id }, updateQuery, { new: true });
            return routeUpdated;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.updateRouteService = updateRouteService;
function deleteRouteService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteRoute = yield routesModel_1.default.deleteOne({ _id: id });
            if (!deleteRoute.acknowledged)
                return false;
            return true;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.deleteRouteService = deleteRouteService;
function getRouteIdForOrder(pickup, dropoff) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let assignRoute;
            assignRoute = (yield routesModel_1.default.findOne({
                pointA: pickup,
                pointB: dropoff
            }));
            return assignRoute;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getRouteIdForOrder = getRouteIdForOrder;
//# sourceMappingURL=routesSerices.js.map