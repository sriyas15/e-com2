import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:"user"
    }
    
},{timestamps:true}
);

userSchema.pre( "save",async function(next){

    if(!this.isModified("password"))
        next();

    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.getToken = function(){

    return jwt.sign({ id:this._id },process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRES_IN
    })
};

userSchema.methods.matchPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}



const User = mongoose.model("User",userSchema);
export default User;  