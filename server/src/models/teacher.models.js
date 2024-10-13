import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
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
        employeeId:{
            type: String,
            trim: true,
        },
        dateOfBirth:{
            type: Date,
            required: true
        },
        permanentAddress:{
            type:String,
            required: true
        },
        aadharNumber:{
            type: Number,
            required: true,
            unique: true,
            min: [12,"Please enter complete Aadhar card number"]
        },
        dateOfJoining:{
            type: Date,
            required: true
        },
        college:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "College"
        },
        department:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        }
    },
    {
        timestamps: true
    }
);

export const Teacher = mongoose.model("Teacher",teacherSchema);