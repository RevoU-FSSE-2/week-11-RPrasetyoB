import { Request, Response, json } from 'express';
import { taskModel } from '../config/schema';
import { authRole } from '../midlewares/role.access';



const getAllTask = async (req: Request, res: Response) => {
    try {
        const task = await taskModel.find({ isDeleted: { $exists: false } })
     
        return res.status(200).json({
          success: true,
          message: "success get all transfer's datas",
          user: task
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).json({
          success: false,
          message: "failed to get transfer's data"
        });
    }
}

const getOneTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const task = await taskModel.findById(id);
      if(!task) {
        return res.status(404).json({
          message: "Transfer data not found"
        })
      }
        
      return res.status(200).json({
        success: true,
        message: "success get transfer data",
        user: task,
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json({
        success: false,
        message: "Internal server erro while get Transfer data"
      });
    }
  };

const createTask = async (req: Request, res: Response) => {
    try {
        const { task }= req.body

        const newTask = await taskModel.create({ task })
        return res.status(200).json({
            success: true,
            message: "Task registration success",
            data: newTask
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error})
    }
}

const updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const role = (req as any).user.role
      let validStatus: string[];
  
      if (role === 'manager') {
        validStatus = ['Not started', 'In progress', 'In review', 'Done / Approved', 'Need revision/ Rejected'];
      } else if (role === 'employee') {
        validStatus = ['Not started', 'In progress', 'In review'];
      } else {
        return res.status(400).json({
          message: 'Invalid role provided'
        });
      }
  
      if (validStatus.includes(status)) {
        const updatedStatus = await taskModel.updateOne({ _id: id }, { status: status });
  
        if (updatedStatus.modifiedCount > 0) {
          return res.status(200).json({
            success: true,
            message: 'Successfully updated status',
            data: {
              status: status
            }
          });
        } else {
          return res.status(404).json({
            success: false,
            message: 'No update status found for the provided ID'
          });
        }
      } else {
        return res.status(400).json({
          message: `Status can only be updated to: ${validStatus.join(', ')}`
        });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the status'
      });
    }
  };

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTask = await taskModel.findByIdAndUpdate(id,{ $set: { isDeleted: true }}, { new: true });

        if (deletedTask) {
            return res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
                data: deletedTask
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
    } catch (err) {
        console.error('Error soft deleting transfer:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while soft deleting transfer data'
        });
    }
};


const taskController = { createTask, getAllTask, updateTask, getOneTask, deleteTask }
export default taskController