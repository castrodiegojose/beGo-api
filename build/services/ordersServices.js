"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getOrderByRouteIdService = exports.getOrderByIdService = exports.deletedOrderService = exports.getAllOrdersService = exports.updateOrderService = exports.checkOrderStatusService = exports.createOrderService = void 0;
const orderModel_1 = __importStar(require("../models/orderModel"));
const routesSerices_1 = require("./routesSerices");
function createOrderService(type, description, pickup, dropoff) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const truckId = await getTruckByNameService(truckName);
            const route = yield (0, routesSerices_1.getRouteIdForOrder)(pickup, dropoff);
            const status = orderModel_1.Status.Taken;
            const newOrderCreated = yield orderModel_1.default.create({
                type,
                description,
                route: route._id,
                status,
                truck: route.truckAssigned,
            });
            yield newOrderCreated.save();
            return newOrderCreated;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.createOrderService = createOrderService;
function checkOrderStatusService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield orderModel_1.default.findById(id);
            if (order.status === orderModel_1.Status.InProgress) {
                return true;
            }
            return false;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.checkOrderStatusService = checkOrderStatusService;
function updateOrderService(id, type, description, pickup, dropoff, newStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const route = yield (0, routesSerices_1.getRouteIdForOrder)(pickup, dropoff);
            const updateQuery = {
                type,
                description,
                route: route._id,
                status: newStatus,
                truck: route.truckAssigned
            };
            const orderUpdated = yield orderModel_1.default.findOneAndUpdate({ _id: id }, updateQuery, { new: true });
            return orderUpdated;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.updateOrderService = updateOrderService;
function getAllOrdersService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield orderModel_1.default.find();
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getAllOrdersService = getAllOrdersService;
function deletedOrderService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteOrder = yield orderModel_1.default.deleteOne({ _id: id });
            if (!deleteOrder.acknowledged)
                return false;
            return true;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.deletedOrderService = deletedOrderService;
function getOrderByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield orderModel_1.default.findById(id);
            return order;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getOrderByIdService = getOrderByIdService;
function getOrderByRouteIdService(routeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield orderModel_1.default.findOne({
                route: routeId,
            });
            return order;
        }
        catch (err) {
            console.error(`Data base error: ${err}`);
        }
    });
}
exports.getOrderByRouteIdService = getOrderByRouteIdService;
//# sourceMappingURL=ordersServices.js.map