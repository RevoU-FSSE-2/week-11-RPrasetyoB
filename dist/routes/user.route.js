"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
userRoutes.get('/v1/user', user_controller_1.default.getAllUsers);
userRoutes.get('/v1/user/:id', user_controller_1.default.getOneUser);
userRoutes.post('/v1/auth/register', user_controller_1.default.regUser);
userRoutes.post('/v1/auth/login', user_controller_1.default.loginUser);
userRoutes.delete('/v1/user/:id', user_controller_1.default.deleteUser);
userRoutes.patch('/v1/user/:id', user_controller_1.default.updateUser);
exports.default = userRoutes;
