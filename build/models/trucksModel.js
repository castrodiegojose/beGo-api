"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const trucksSchema = new mongoose_1.Schema({
    model: { type: String },
    make: { type: String },
    year: { type: Number },
    color: { type: String },
    transportWeight: { type: Number },
    created_at: { type: Number },
});
exports.default = (0, mongoose_1.model)('Truck', trucksSchema);
//# sourceMappingURL=trucksModel.js.map