import { Request,Response } from "express";
import User from "../models/user.model";
import { genAccessToken, genRefreshToken, resolveAccessToken } from "../utils/tokens";

export const signUp=async(req:Request,res:Response)=>{
    try {
        const {email,password,name}=req.body;
        if(email && password && name){
            
            // if user exists
            const ifUserExists=await User.findOne({email});
            if(ifUserExists){
                res.status(400)
                .json({
                 success:false,
                 message:"User already exists",
                })
                return;
            }

            const user=new User({email,password,name});
            const refreshToken=await genRefreshToken(name,email);
            user.refreshToken=String(refreshToken);
            await user.save();
            const id=user._id;
            const accessToken=await genAccessToken(name,email,String(id));

            const resolvedToken=await resolveAccessToken(String(accessToken));
            console.log(resolvedToken);
            
            res.status(201)
            .json({
             success:true,
             message:"User Signup successful",
             accessToken:{
                key:"accessToken",
                value: accessToken
             },
             refreshToken:{
                key:"refreshToken",
                value:refreshToken
             }
            })
        }else{
         res.status(400).json({
             success:false,
             message:'Please provide all the required fields',
         })
        }
      } catch (error:any) {
        res.status(400)
        .json({
            success:false,
            error:error.message,
        })
      }
}