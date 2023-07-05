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
exports.getAllTrucksController = void 0;
const trucksServices_1 = require("../services/trucksServices");
const getAllTrucksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trucks = yield (0, trucksServices_1.getAllTrucksService)();
    if (!trucks)
        return res.status(404).json("there are no trucks available");
    res.status(200).send({ status: "success", code: 200, data: trucks });
});
exports.getAllTrucksController = getAllTrucksController;
//# sourceMappingURL=trucksController.js.map