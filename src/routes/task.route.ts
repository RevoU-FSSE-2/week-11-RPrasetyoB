import express from 'express'
import authMiddleware from '../midlewares/role.access'
import taskController from '../controllers/task.controller'

const taskRoutes = express.Router()
taskRoutes.get('/v1/tasks', authMiddleware.authRole, taskController.getAllTask)
taskRoutes.get('/v1/tasks/:id', authMiddleware.authRole, taskController.getOneTask)
taskRoutes.post('/v1/tasks', authMiddleware.adminAuth, taskController.createTask)
taskRoutes.patch('/v1/tasks/:id', authMiddleware.authRole, taskController.taskUpdate)
taskRoutes.delete('/v1/tasks/:id', authMiddleware.adminAuth, taskController.deleteTask)


export default taskRoutes