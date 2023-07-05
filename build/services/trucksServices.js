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
exports.getTruckAvailableService = exports.getTruckByNameService = exports.getAllTrucksService = void 0;
const trucksModel_1 = __importDefault(require("../models/trucksModel"));
const routesSerices_1 = require("./routesSerices");
function getAllTrucksService() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield trucksModel_1.default.find();
    });
}
exports.getAllTrucksService = getAllTrucksService;
function getTruckByNameService(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const truck = yield trucksModel_1.default.findOne({
                model: name
            });
            return truck._id;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.getTruckByNameService = getTruckByNameService;
function getTruckAvailableService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trucks = yield getAllTrucksService();
            const routes = yield (0, routesSerices_1.getAllRoutesService)();
            if (routes.length === 0) {
                return trucks[0]._id;
            }
            else if (routes.length > 0) {
                const notAvailableTrucksId = routes.map((route) => route.truckAssigned);
                const availableTrucks = yield trucksModel_1.default.find({
                    _id: { $nin: notAvailableTrucksId },
                });
                if (availableTrucks.length === 0) {
                    return null;
                }
                return availableTrucks[0]._id;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.getTruckAvailableService = getTruckAvailableService;
//# sourceMappingURL=trucksServices.js.map