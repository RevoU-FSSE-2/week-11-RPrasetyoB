import { Request, Response, json } from 'express';
import { taskModel } from '../config/schema';


const getAllTask = async (req: Request, res: Response) => {
    try {
        const user = await taskModel.find({ isDeleted: { $exists: false } })
     
        return res.status(200).json({
          success: true,
          message: "success get all transfer's datas",
          user: user
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
      const transfer = await taskModel.findById(id);
      if(!transfer) {
        return res.status(404).json({
          message: "Transfer data not found"
        })
      }
        
      return res.status(200).json({
        success: true,
        message: "success get transfer data",
        user: transfer,
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

        const newTask = await taskModel.create({ task, status : "Not started", createdAt: Date.now  })
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

const taskUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status, role } = req.body;  
        const updatedStatus = await taskModel.updateOne({ _id: id }, { status: status });
        

        if (role === "admin") {
            if (updatedStatus) {
                return res.status(200).json({
                    success: true,
                    message: 'Successfully updated status',
                    data: {
                    status: status                
                    }
                });
            }
        } else if (role === "employee") {
            const validStatus = ['Not started', 'In progress', 'In review']
            if(validStatus.includes(status))
            return res.status(404).json({
                success: true,
                message: 'Successfully updated status',
                status: status
            });
        } else {
            return res.status(400).json({
              message: 'Status can only be updated to "Not started", "In progress", or "In review"',
            });
          }
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the status'
        });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTransfer = await taskModel.findByIdAndUpdate(id,{ $set: { isDeleted: true }}, { new: true });

        if (deletedTransfer) {
            return res.status(200).json({
                success: true,
                message: 'Transfer soft deleted successfully',
                data: deletedTransfer
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Transfer data not found'
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


const taskController = { createTask, getAllTask, taskUpdate, getOneTask, deleteTask }
export default taskController