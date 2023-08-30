import { Request, Response } from 'express';
import { taskModel } from '../../../config/schema';
import { createTask } from '../../../controllers/task.controller'; 
jest.mock('../../../config/schema'); 

describe('createTask', () => {
  it('should create and return a new task', async () => {
    const mockTaskData = { task: 'Mock Task' };
    const mockNewTask = { _id: 'newTaskId', ...mockTaskData };
    const mockRequest = {
      body: mockTaskData
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (taskModel.create as jest.Mock).mockResolvedValue(mockNewTask);

    await createTask(mockRequest, mockResponse);

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
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockError = new Error('Mock error');
    (taskModel.create as jest.Mock).mockRejectedValue(mockError);

    await createTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Mock error'
    });
  });
});
