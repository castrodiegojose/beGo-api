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
exports.deleteOrderController = exports.getAllOrdersController = exports.updateOrderController = exports.createOrderController = void 0;
const ordersServices_1 = require("../services/ordersServices");
const orderModel_1 = require("../models/orderModel");
const trucksServices_1 = require("../services/trucksServices");
const routesSerices_1 = require("../services/routesSerices");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, description, pickup, dropoff } = req.body;
    if (!type || !description || !pickup || !dropoff) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "There are not any points defined"
        });
    }
    if (!Object.values(orderModel_1.Type).includes(type)) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "Invalid parameter 'type', it must be 'Express', 'Custom' or 'Standard'"
        });
    }
    if (!(yield (0, routesSerices_1.checkIfRouteExist)(pickup, dropoff))) {
        const availableTrucks = yield (0, trucksServices_1.getTruckAvailableService)();
        if (!availableTrucks) {
            return res.status(202).send({
                status: "success",
                code: 202,
                message: "No Trucks Available"
            });
        }
        yield (0, routesSerices_1.createNewRouteService)(pickup, dropoff);
    }
    const newOrder = yield (0, ordersServices_1.createOrderService)(type, description, pickup, dropoff);
    res.status(200).send({
        status: "success",
        code: 200,
        data: newOrder
    });
});
exports.createOrderController = createOrderController;
const updateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { type, description, pickup, dropoff, newStatus } = req.body;
    if (!id) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "Missing parameter 'id'"
        });
    }
    const orderExists = yield (0, ordersServices_1.getOrderByIdService)(id);
    if (!orderExists) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "No order found"
        });
    }
    if (!Object.values(orderModel_1.Type).includes(type)) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "Invalid parameter 'type', it must be 'Express', 'Custom' or 'Standard'"
        });
    }
    if (newStatus) {
        if (!Object.values(orderModel_1.Status).includes(newStatus)) {
            return res.status(400).send({
                status: "error",
                code: 400,
                message: "Invalid parameter 'status', it must be 'Taken', 'In_Progress', 'Completed' or 'Cancelled'"
            });
        }
    }
    if (yield (0, ordersServices_1.checkOrderStatusService)(id)) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "Order in progress cannot be updated"
        });
    }
    if (!(yield (0, routesSerices_1.checkIfRouteExist)(pickup, dropoff))) {
        const availableTrucks = yield (0, trucksServices_1.getTruckAvailableService)();
        if (!availableTrucks) {
            return res.status(202).send({
                status: "success",
                code: 202,
                message: "No Trucks Available"
            });
        }
        yield (0, routesSerices_1.createNewRouteService)(pickup, dropoff);
    }
    const updatedOrder = yield (0, ordersServices_1.updateOrderService)(id, type, description, pickup, dropoff, newStatus);
    res.status(200).send({
        status: "success",
        code: 200,
        data: updatedOrder
    });
});
exports.updateOrderController = updateOrderController;
const getAllOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, ordersServices_1.getAllOrdersService)();
    if (!orders) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "There are no orders"
        });
    }
    res.status(200).send({
        status: "success",
        code: 200,
        data: orders
    });
});
exports.getAllOrdersController = getAllOrdersController;
const deleteOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({
            status: "error",
            code: 400,
            message: "Missing parameter 'id'"
        });
    }
    const existingOrder = yield (0, ordersServices_1.getOrderByIdService)(id);
    if (!existingOrder) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "There is not route defined"
        });
    }
    if (existingOrder.status === orderModel_1.Status.InProgress) {
        return res.status(404).send({
            status: "error",
            code: 404,
            message: "Order in progress cannot be deleted"
        });
    }
    if (!(yield (0, ordersServices_1.deletedOrderService)(id))) {
        return res.status(202).send({
            status: "success",
            code: 202,
            data: `The data base does not response`
        });
    }
    res.status(200).send({
        status: "success",
        code: 200,
        data: `Order id:${id} deleted`
    });
});
exports.deleteOrderController = deleteOrderController;
//# sourceMappingURL=ordersController.js.map