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
exports.getPlaceIdByNamePointsService = exports.getAllPointsService = void 0;
const pointsModel_1 = __importDefault(require("../models/pointsModel"));
function getAllPointsService() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield pointsModel_1.default.find();
    });
}
exports.getAllPointsService = getAllPointsService;
;
function getPlaceIdByNamePointsService(namePoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const point = yield pointsModel_1.default.findOne({ "location.name": namePoint });
        console.log(point.location);
        const placeId = point ? point.location.placeId : undefined;
        return placeId;
    });
}
exports.getPlaceIdByNamePointsService = getPlaceIdByNamePointsService;
//# sourceMappingURL=pointsServices.js.map