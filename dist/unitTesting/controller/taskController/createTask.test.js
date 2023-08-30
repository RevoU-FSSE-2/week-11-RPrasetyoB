"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../../config/schema");
const task_controller_1 = require("../../../controllers/task.controller");
jest.mock('../../../config/schema');
describe('createTask', () => {
    it('should create and return a new task', async () => {
        const mockTaskData = { task: 'Mock Task' };
        const mockNewTask = Object.assign({ _id: 'newTaskId' }, mockTaskData);
        const mockRequest = {
            body: mockTaskData
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        schema_1.taskModel.create.mockResolvedValue(mockNewTask);
        await (0, task_controller_1.createTask)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            message: "Task registration success",
            data: mockNewTask
        });
    });
    it('should return 500 on internal server error', async () => {
        const mockTaskData = { task: 'Mock Task' };
        const mockRequest = {
            body: mockTaskData
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockError = new Error('Mock error');
        schema_1.taskModel.create.mockRejectedValue(mockError);
        await (0, task_controller_1.createTask)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Mock error'
        });
    });
});
