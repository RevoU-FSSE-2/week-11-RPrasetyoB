import express from 'express'
import authMiddleware from '../middlewares/role.access'
import { getAllTask, getOneTask, createTask, updateTask, deleteTask } from '../controllers/task.controller'

const taskRoutes = express.Router()
taskRoutes.get('/v1/tasks', authMiddleware.authRole, getAllTask)
taskRoutes.get('/v1/tasks/:id', authMiddleware.authRole, getOneTask)
taskRoutes.post('/v1/tasks', authMiddleware.managerAuth, createTask)
taskRoutes.patch('/v1/tasks/:id', authMiddleware.authRole, updateTask)
taskRoutes.delete('/v1/tasks/:id', authMiddleware.managerAuth, deleteTask)


export default taskRoutes