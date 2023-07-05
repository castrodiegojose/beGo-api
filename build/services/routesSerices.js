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
exports.deleteRouteService = exports.updateRouteService = exports.getRouteByIdService = exports.getAllRoutesService = exports.checkIfRouteExist = exports.createNewRouteService = void 0;
const routesModel_1 = __importDefault(require("../models/routesModel"));
const googleApi_1 = require("../utils/googleApi");
function createNewRouteService(pointA, pointB) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const placeIdA = pointA.location.placeId;
            const placeIdB = pointB.location.placeId;
            console.log(placeIdA + " " + placeIdB);
            const coordenatesOrigin = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdA);
            const coordenatesDestination = yield (0, googleApi_1.getCoordinatesForPlaceId)(placeIdB);
            console.log((coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude) + " " + (coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude));
            const origin = `${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude},${coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude}`;
            const destination = `${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude},${coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude}`;
            const distance = yield (0, googleApi_1.calculateRouteDistance)(origin, destination);
            const newRouteCreated = yield routesModel_1.default.create({
                pointA: pointA.location.name,
                pointB: pointB.location.name,
                route: {
                    from: {
                        latitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude,
                        longitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude
                    },
                    to: {
                        latitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude,
                        longitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude
                    },
                    distance,
                }
            });
            console.log(newRouteCreated);
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
        const fromName = pointA.location.name;
        const toName = pointB.location.name;
        const route = yield routesModel_1.default.find({
            pointA: fromName,
            pointB: toName,
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
                route: {
                    from: {
                        latitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.latitude,
                        longitude: coordenatesOrigin === null || coordenatesOrigin === void 0 ? void 0 : coordenatesOrigin.longitude
                    },
                    to: {
                        latitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.latitude,
                        longitude: coordenatesDestination === null || coordenatesDestination === void 0 ? void 0 : coordenatesDestination.longitude
                    },
                    distance,
                }
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
//# sourceMappingURL=routesSerices.js.map