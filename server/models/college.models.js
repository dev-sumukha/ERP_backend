import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
    {
        collegeName:{
            type: String,
            required: true,
            trim: true
        },
        collegeCode:{
            type: String,
            required: true,
            trim: true,
            lowercase: [false,"Department code should be in uppercase only"],
            maxlength: 5
        },
        departments:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Department"
        }],
        collegeAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CollegeAdmin"
        },  
        studentsList:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        studentsCount:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const College = mongoose.model("College",collegeSchema);