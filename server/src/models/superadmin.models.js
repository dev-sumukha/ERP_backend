import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        },
        userName:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        employeeId:{
            type: String,
            unique: true,
            trim: true,
            required: [true,"Password is required"]
        },
        password:{
            type: String,
            required: true,
        },
        collegeList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "College"
        }],
        lastLoggedIn:{
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const SuperAdmin = mongoose.model("SuperAdmin",superAdminSchema);