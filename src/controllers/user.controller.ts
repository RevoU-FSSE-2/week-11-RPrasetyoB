import { Request, Response, json } from 'express';
import { userModel } from '../config/schema';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_Sign } from '../config/jwt';
import { log } from 'console';

//get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find({})
 
    return res.status(200).json({
      success: true,
      message: "success get all user",
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({
      success: false,
      message: "failed to get all users"
    });
  }
};

//get one user by id
const getOneUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await userModel.findById(id);
      if(!user) {
        return res.status(404).json({
          message: "user not found"
        })
      }
        
      return res.status(200).json({
        success: true,
        message: "success get user",
        user: user,
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400).json({
        success: false,
        message: "failed to get user"
      });
    }
  };

  //create user
  const regUser = async (req : Request, res: Response) => {
    try {
      const { username, password, role } = req.body;
  
      if (!username) {
        return res.status(400).json({
          success: false,
          message: "Username cannot be empty"
        });
      }
  
      if (role !== "approver" && role !== "maker") {
        return res.status(400).json({
          success: false,
          message: "Possible role only maker and approver"
        });
      }
  
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long"
        });
      }

      if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must contain both alphabetic and numeric characters"
        });
    }
  
      const existingUser = await userModel.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already exists"
        });
      }
  
      const hashedPass = await bcrypt.hash(password, 10);
  
      const newUser = await userModel.create({ username, role, password: hashedPass });
  
      return res.status(200).json({
        success: true,
        message: "Registration success",
        data: newUser
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

// Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)    

    const loggedUser = req.body.username
    const role = user.role

    if (isPasswordCorrect) {
      const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_Sign);
      return res.status(200).json({
        success: true,
        message: "User successfully logged in",
        user: loggedUser, role,
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deletedUser = await userModel.findByIdAndDelete(id);

    if(deletedUser) {
        return res.status(201).json({
            success: true,
            message: 'user deleted successfully',
            data: {id}
        })
    } else {
        return res.status(404).json({
            success: false,
            message: "failed to delete a user",
            data: "Not found"
        })
    }
  } catch (err) {
    console.error('Error delete transaction:', err);
    return res.status(500).json({
        message: 'An error occurred while deleting the user'
    });
  }
};

//update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    
    const userId = req.params.id;
    const updates = req.body;
    const { username, password, role } = req.body;

    
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
    console.log(username)
    
    if (!username) {
       return res.status(400).json({
         success: false,
         message: "Username cannot be empty"
       });
     }

    if (role !== "approver" && role !== "maker") {
      return res.status(400).json({
        success: false,
        message: "Possible role only maker and approver"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      });
    }

    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      return res.status(400).json({
          success: false,
          message: "Password must contain both alphabetic and numeric characters"
      });
    }

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: {
          _id: userId,
          username: username, role,
          passwordUpdated: !!updates.password
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: 'Not found'
      });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the user'
    });
  }
};


const userController = { getAllUsers, getOneUser, regUser, loginUser, deleteUser, updateUser }
export default userController
