"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pointsSchema = new mongoose_1.Schema({
    location: {
        name: { type: String },
        locationId: { type: String },
    }
});
exports.default = (0, mongoose_1.model)('Point', pointsSchema);
//# sourceMappingURL=pointsModel.js.map