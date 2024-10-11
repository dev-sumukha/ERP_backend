import mongoose from "mongoose";

const collegeAdminSchema = new mongoose.Schema(
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
        password:{
            type: String,
            required: true
        },
        collegeAuthority:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "College"
        },
        lastLoggedIn:{
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const CollegeAdmin = mongoose.model("CollegeAdmin",collegeAdminSchema);