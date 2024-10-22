import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

superAdminSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = bcrypt.hash(this.password,10);
    next();
});

superAdminSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

superAdminSchema.methods.generateAccessToken = function() {
    return jwt.sign({_id: this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

superAdminSchema.methods.generateRefreshToken = function() {
    return jwt.sign({_id: this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

export const SuperAdmin = mongoose.model("SuperAdmin",superAdminSchema);