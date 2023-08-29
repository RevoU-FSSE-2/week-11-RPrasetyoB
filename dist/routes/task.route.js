"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_access_1 = __importDefault(require("../midlewares/role.access"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const taskRoutes = express_1.default.Router();
taskRoutes.get('/v1/tasks', role_access_1.default.authRole, task_controller_1.default.getAllTask);
taskRoutes.get('/v1/tasks/:id', role_access_1.default.authRole, task_controller_1.default.getOneTask);
taskRoutes.post('/v1/tasks', role_access_1.default.managerAuth, task_controller_1.default.createTask);
taskRoutes.patch('/v1/tasks/:id', role_access_1.default.authRole, task_controller_1.default.updateTask);
taskRoutes.delete('/v1/tasks/:id', role_access_1.default.managerAuth, task_controller_1.default.deleteTask);
exports.default = taskRoutes;
