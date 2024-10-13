import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
        USN:{
            type: String,
            trim: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true
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
        yearOfJoining:{
            type: Number,
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
    }
);

export const Student = mongoose.model("Student",studentSchema);