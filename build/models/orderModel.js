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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Type = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// import { ITruck } from "./trucksModel";
// import { IRoute } from "./routesModel";
var Type;
(function (Type) {
    Type["Standard"] = "Standard";
    Type["Express"] = "Express";
    Type["Custom"] = "Custom";
})(Type = exports.Type || (exports.Type = {}));
var Status;
(function (Status) {
    Status["Taken"] = "Taken";
    Status["InProgress"] = "In_Progress";
    Status["Completed"] = "Completed";
    Status["Cancelled"] = "Cancelled";
})(Status = exports.Status || (exports.Status = {}));
;
const ordersSchema = new mongoose_1.Schema({
    type: { type: String, enum: Object.values(Type) },
    description: { type: String },
    route: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Route",
        required: true
    },
    status: { type: String, enum: Object.values(Status) },
    truck: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Truck",
        required: true,
    }
});
exports.default = (0, mongoose_1.model)('Order', ordersSchema);
//# sourceMappingURL=orderModel.js.map