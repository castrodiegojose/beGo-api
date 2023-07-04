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
exports.getAllPoints = void 0;
const pointsModel_1 = __importDefault(require("../models/pointsModel"));
const getAllPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const points = yield pointsModel_1.default.find();
    if (!points)
        return res.status(404).json("there are no points founded");
    res.json(points);
});
exports.getAllPoints = getAllPoints;
//# sourceMappingURL=pointsController.js.map