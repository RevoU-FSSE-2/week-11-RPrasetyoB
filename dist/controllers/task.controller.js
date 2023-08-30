"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getOneTask = exports.updateTask = exports.getAllTask = exports.createTask = void 0;
const schema_1 = require("../config/schema");
const getAllTask = async (req, res) => {
    try {
        const task = await schema_1.taskModel.find({ isDeleted: { $exists: false } });
        return res.status(200).json({
            success: true,
            message: "success get all transfer's datas",
            user: task
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "failed to get transfer's data"
        });
    }
};
exports.getAllTask = getAllTask;
const getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await schema_1.taskModel.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Transfer data not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "success get transfer data",
            user: task,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Internal server erro while get Transfer data or TransferId wrong format"
        });
    }
};
exports.getOneTask = getOneTask;
const createTask = async (req, res) => {
    try {
        const { task } = req.body;
        const newTask = await schema_1.taskModel.create({ task });
        return res.status(200).json({
            success: true,
            message: "Task registration success",
            data: newTask
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const role = req.user.role;
        let validStatus;
        if (role === 'manager') {
            validStatus = ['Not started', 'In progress', 'In review', 'Done / Approved', 'Need revision/ Rejected'];
        }
        else if (role === 'employee') {
            validStatus = ['Not started', 'In progress', 'In review'];
        }
        else {
            return res.status(400).json({
                message: 'Invalid role provided'
            });
        }
        if (validStatus.includes(status)) {
            const updatedStatus = await schema_1.taskModel.updateOne({ _id: id }, { status: status });
            if (updatedStatus.modifiedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Successfully updated status',
                    data: {
                        status: status
                    }
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: 'No update status found for the provided ID'
                });
            }
        }
        else {
            return res.status(400).json({
                message: `Status can only be updated to: ${validStatus.join(', ')}`
            });
        }
    }
    catch (err) {
        console.log('Error updating status:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the status or TransferId wrong format'
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await schema_1.taskModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
        if (deletedTask) {
            return res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
                data: deletedTask
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
    }
    catch (err) {
        console.log('Error soft deleting transfer:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while soft deleting transfer data or TransferId wrong format'
        });
    }
};
exports.deleteTask = deleteTask;
