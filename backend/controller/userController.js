import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";


export const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = user.getToken();

    res.cookie( "jwt",token,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        message:"Registered a new user",
    });

});

export const login = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;

    if( !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    let user = await User.findOne({ email }).select("+password");

    if(!user){
       return res.status(401).json({message:"Invalid Email"});
    }

    if( user && (await user.matchPassword(password))){

        const token = user.getToken();

        res.cookie( "jwt",token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            user,
            token,
            message:"Logged In"
        })
    }else{
       return res.status(401).json({message:"Invalid Password"});
    }


})
