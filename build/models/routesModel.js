"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const routeSchema = new mongoose_1.Schema({
    pointA: { type: String },
    pointB: { type: String },
    route: {
        from: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        to: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        distance: { type: String },
    }
});
exports.default = (0, mongoose_1.model)('Route', routeSchema);
//# sourceMappingURL=routesModel.js.map