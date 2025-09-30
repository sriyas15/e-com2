import asyncHandler from './asyncHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const protect = asyncHandler(async(req,res,next)=>{

    const token = req.cookies?.jwt;

    if( !token ){
        res.status(401);
        throw new Error("Not authorized, token missing");
    }

    try{
        const decode = jwt.verify( token,process.env.JWT_SECRET_KEY );

        const user = await User.findById( decode.id ).select("-password");

        if(!user){
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();
    }
    catch(e){
        res.status(401);
        throw new Error("Not authorized, token failed");
    }

}) 