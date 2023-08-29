"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = void 0;
const schema_1 = require("../config/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
//get all user
const getAllUsers = async (req, res) => {
    try {
        const user = await schema_1.userModel.find({});
        return res.status(200).json({
            success: true,
            message: "success get all user",
            user: user
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).json({
            success: false,
            message: "failed to get all users"
        });
    }
};
//get one user by id
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await schema_1.userModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "success get user",
            user: user,
        });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400).json({
            success: false,
            message: "failed to get user"
        });
    }
};
//create user
const regUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username cannot be empty"
            });
        }
        if (role !== "employee") {
            return res.status(400).json({
                success: false,
                message: "Possible role only Employee"
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain both alphabetic and numeric characters"
            });
        }
        const existingUser = await schema_1.userModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const newUser = await schema_1.userModel.create({ username, password: hashedPass, role });
        return res.status(200).json({
            success: true,
            message: "Registration success",
            data: newUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await schema_1.userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        const loggedUser = req.body.username;
        const role = user.role;
        if (isPasswordCorrect) {
            const token = jsonwebtoken_1.default.sign({ username: user.username, id: user._id, role: user.role }, jwt_1.JWT_Sign);
            return res.status(200).json({
                success: true,
                message: "User successfully logged in",
                user: loggedUser, role,
                token: token,
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
// Delete user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await schema_1.userModel.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(201).json({
                success: true,
                message: 'user deleted successfully',
                data: { id }
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "failed to delete a user",
                data: "Not found"
            });
        }
    }
    catch (err) {
        console.error('Error delete transaction:', err);
        return res.status(500).json({
            message: 'An error occurred while deleting the user'
        });
    }
};
exports.deleteUser = deleteUser;
//update user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const { username, password, role } = req.body;
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username cannot be empty"
            });
        }
        if (role !== "approver" && role !== "maker") {
            return res.status(400).json({
                success: false,
                message: "Possible role only maker and approver"
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain both alphabetic and numeric characters"
            });
        }
        if (updates.password) {
            updates.password = await bcrypt_1.default.hash(updates.password, 10);
        }
        const updatedUser = await schema_1.userModel.findByIdAndUpdate(userId, updates, { new: true });
        console.log(username);
        if (updatedUser) {
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: {
                    _id: userId,
                    username: username, role,
                    passwordUpdated: !!updates.password
                }
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: 'Not found'
            });
        }
    }
    catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the user'
        });
    }
};
exports.updateUser = updateUser;
const userController = { getAllUsers, getOneUser, regUser, loginUser, deleteUser: exports.deleteUser, updateUser: exports.updateUser };
exports.default = userController;
