import express from 'express'
import authMiddleware from '../midlewares/role.access'
import taskController from '../controllers/task.controller'

const dataRoutes = express.Router()
dataRoutes.get('/v1/tasks', authMiddleware.authRole, taskController.getAllTask)
dataRoutes.get('/v1/tasks/:id', authMiddleware.authRole, taskController.getOneTask)
dataRoutes.post('/v1/tasks', authMiddleware.adminAuth, taskController.createTask)
dataRoutes.patch('/v1/tasks/:id', authMiddleware.authRole, taskController.taskUpdate)
dataRoutes.delete('/v1/tasks/:id', authMiddleware.adminAuth, taskController.deleteTask)


export default dataRoutes