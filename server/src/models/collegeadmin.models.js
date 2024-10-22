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
            unique: true,
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

collegeAdminSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }


    this.password = bcrypt.hash(this.password,10);
    next();
});

collegeAdminSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

collegeAdminSchema.methods.generateAccessToken = function() {
    return jwt.sign({_id: this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
}

collegeAdminSchema.methods.generateRefreshToken = function() {
    return jwt.sign({_id: this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
}

export const CollegeAdmin = mongoose.model("CollegeAdmin",collegeAdminSchema);