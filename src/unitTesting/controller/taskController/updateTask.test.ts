import { Request, Response } from 'express';
import { taskModel } from '../../../config/schema';
import { updateTask } from '../../../controllers/task.controller';

jest.mock('../../../config/schema');

describe('updateTask', () => {
  it('should successfully update task status for manager role', async () => {
    const mockRequest = {
      params: { id: 'mockTaskId' },
      body: { status: 'In progress' },
      user: { role: 'manager' }
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (taskModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

    await updateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'Successfully updated status',
      data: {
        status: 'In progress'
      }
    });
  });

  it('should return 404 if no task status is updated', async () => {
    const mockRequest = {
      params: { id: 'mockTaskId' },
      body: { status: 'In progress' },
      user: { role: 'manager' }
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (taskModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 0 });

    await updateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'No update status found for the provided ID'
    });
  });

  it('should return 400 if status update is not valid', async () => {
    const mockRequest = {
      params: { id: 'mockTaskId' },
      body: { status: 'Invalid Status' },
      user: { role: 'manager' }
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await updateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Status can only be updated to: Not started, In progress, In review, Done / Approved, Need revision/ Rejected'
    });
  });

  it('should return 500 on internal server error', async () => {
    const mockRequest = {
      params: { id: 'mockTaskId' },
      body: { status: 'In progress' },
      user: { role: 'manager' }
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockError = new Error('Mock error');
    (taskModel.updateOne as jest.Mock).mockRejectedValue(mockError);

    await updateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'An error occurred while updating the status or TransferId wrong format'
    });
  });
});
