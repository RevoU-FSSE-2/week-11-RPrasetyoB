import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
      type: String,
      required: true,
      unique: true
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
  },{
    versionKey: false
  });
  
export const userModel = mongoose.model('users', userSchema);

const taskSchema = new mongoose.Schema({
    task: {
        type : String,
        required : true
    },
    status : {
        type: String,
        default: "Not started",
        enum: ['Not started', 'In progress', 'In review', 'Done / Approved', 'Need revision/ Rejected']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},{
    versionKey: false,
    timestamps: {
        createdAt: false,
        updatedAt: true
    }    
})

export const taskModel = mongoose.model("tasks", taskSchema);