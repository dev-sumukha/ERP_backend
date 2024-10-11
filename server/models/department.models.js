import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        departmentName:{
            type: String,
            required: true,
            trim: true
        },
        departmentCode:{
            type: String,
            required: true,
            trim: true,
            lowercase: [false,"Department code should be in uppercase only"],
            maxlength: 5
        },
        collegeDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "College"
        }
    },
    {
        timestamps: true
    }
);

export const Department = mongoose.model("Department",departmentSchema);