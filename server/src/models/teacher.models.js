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
        section:{
            type: [String],
            default: undefined
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
        },
        subjects:{
            type: [String],
            required: true
        },
        section:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }]
    },
    {
        timestamps: true
    }
);

teacherSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = bcrypt.hash(this.password,10);
    next();
});

teacherSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

teacherSchema.methods.generateAccessToken = function() {
    return jwt.sign({_id: this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

teacherSchema.methods.generateRefreshToken = function() {
    return jwt.sign({_id: this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

export const Teacher = mongoose.model("Teacher",teacherSchema);