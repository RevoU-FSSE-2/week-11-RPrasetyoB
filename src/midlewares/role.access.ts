import express, { Request, Response, NextFunction} from 'express'
import { JWT_Sign } from '../config/jwt'
import jwt from "jsonwebtoken"
import taskController from '../controllers/task.controller'

const authRole = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      res.status(401).json({ error: 'Unauthorized' })
    } else {
      const token = authHeader.split(' ')[1]
      
      try {
        const decodedToken : any  = jwt.verify(token, JWT_Sign)
    
        if (decodedToken.role === 'admin' || decodedToken.role === 'approver') {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while get authorize'
        });
      }
    }
  }

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      res.status(401).json({ error: 'Unauthorized' })
    } else {
      const token = authHeader.split(' ')[1]
      
      try {
        const decodedToken : any  = jwt.verify(token, JWT_Sign)
    
        if (decodedToken.role === 'admin') {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while get authorize'
        });
      }
    }
  }


const authMiddleware  = { authRole, adminAuth }
export default authMiddleware