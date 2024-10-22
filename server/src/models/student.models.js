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

studentSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    this.password = bcrypt.hash(this.password,10);
    next();
});

studentSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

studentSchema.methods.generateAccessToken = function() {
    jwt.sign({_id: this._id})
}

studentSchema.methods.generateRefreshToken = function() {
    
}

export const Student = mongoose.model("Student",studentSchema);