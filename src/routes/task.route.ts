import express from 'express'
import authMiddleware from '../midlewares/role.access'
import taskController from '../controllers/task.controller'

const taskRoutes = express.Router()
taskRoutes.get('/v1/tasks', authMiddleware.authRole, taskController.getAllTask)
taskRoutes.get('/v1/tasks/:id', authMiddleware.authRole, taskController.getOneTask)
taskRoutes.post('/v1/tasks', authMiddleware.managerAuth, taskController.createTask)
taskRoutes.patch('/v1/tasks/:id', authMiddleware.authRole, taskController.updateTask)
taskRoutes.delete('/v1/tasks/:id', authMiddleware.managerAuth, taskController.deleteTask)


export default taskRoutes