"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../controllers/taskController"));
const taskRoutes = (0, express_1.Router)();
taskRoutes.get("/", taskController_1.default.getAllTasks);
taskRoutes.post("/", taskController_1.default.createTask);
taskRoutes.get("/:id", taskController_1.default.getTask);
taskRoutes.put("/:id", taskController_1.default.updateTask);
taskRoutes.delete("/:id", taskController_1.default.deleteTask);
exports.default = taskRoutes;
