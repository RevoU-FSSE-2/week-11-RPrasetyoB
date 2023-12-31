import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    }
  },{
    versionKey: false
  });
  
export const userModel = mongoose.model('users', userSchema);

const taskSchema = new mongoose.Schema({
    task: {
        type : String,
        required : true
    },
    status: {
        type: String,
        default: "Not started",
        enum: ['Not started', 'In progress', 'In review', 'Done / Approved', 'Need revision/ Rejected']
    },
    isDeleted: {
        type: Boolean
    }
},{
    timestamps: {
        currentTime: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    versionKey: false
})

export const taskModel = mongoose.model("tasks", taskSchema);