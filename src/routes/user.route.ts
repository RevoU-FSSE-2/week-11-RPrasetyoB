import express from 'express'
const userRoutes = express.Router()
import userController from '../controllers/user.controller'


userRoutes.get('/v1/user', userController.getAllUsers)
userRoutes.get('/v1/user/:id', userController.getOneUser)
userRoutes.post('/v1/auth/register', userController.regUser)
userRoutes.post('/v1/auth/login', userController.loginUser)
userRoutes.delete('/v1/user/:id', userController.deleteUser)
userRoutes.patch('/v1/user/:id', userController.updateUser)

export default userRoutes