import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
    {
        sectionName:{
            type: String,
        },
        year:{
            type: Number,
            required: true
        },
        students:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }],
        teacher:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
        attendance:[{
            student:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
            date:{
                type: Date,
                default: undefined
            },
            status:{
                type: String,
                enum: ["Present","Absent"],
                required: true
            }
        }]
    }
);

export const Section = mongoose.model("Section",sectionSchema);