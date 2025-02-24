import { Request,Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcryptjs';
import { decodedRefreshToken, genAccessToken, genRefreshToken, isVerifiedRefreshToken, resolveAccessToken } from "../utils/tokens";

//-------------------------------------Sign Up Controller Start ---------------------------------------------------
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
//-------------------------------------Sign Up Controller End ---------------------------------------------------


//-------------------------------------Login In Controller Start ---------------------------------------------------
export const loginUser=async(req:Request,res:Response)=>{
   try {
        const {email,password}=req.body;
        if(email&&password){
            const user=await User.findOne({email}).select('+password');
            if(!user){
                res.status(400)
                .json({
                    success:false,
                    error:'user not exists',
                })
                return;
            }

            // const isCorrectPassword=await user.comparePassword(password);
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if(!isCorrectPassword){
                res.status(400)
                .json({
                    success:false,
                    error:'wrong email or password'
                })
            }
            const accessToken=await genAccessToken(user.name,user.email,user.password);
            const refreshToken=await genRefreshToken(user.name,user.email);
            user.refreshToken=String(refreshToken);
            await user.save();
            res.status(200)
            .json({
             success:true,
             message:"User Login successful",
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
            res.status(400)
            .json({
                success:false,
                error:'please provide email or password'
            })
            return;
        }
   } catch (error:any) {
        res.status(400)
        .json({
            success:false,
            error:error.message,
        })
   }
}
//-------------------------------------Login In Controller End ---------------------------------------------------


//-------------------------------------Delete User Controller Start ---------------------------------------------------
export const deleteUser=async(req:Request,res:Response)=>{
   try {
    const {refreshToken}=req.body;
    const isVerified=await isVerifiedRefreshToken(String(refreshToken));
    if(!isVerified){
        res.status(400)
        .json({
            success:false,
            error:'error in deleting user'
        })
        return;
    }
    const decodedToken=await decodedRefreshToken(refreshToken);
    const email=JSON.parse(JSON.stringify(decodedToken)).email;
    await User.deleteOne({email});
    res.status(200)
        .json({
         success:true,
         message:"User Deletion successful",
        })
    }   catch (error:any) {
        res.status(400)
        .json({
            success:false,
            error:error.message,
        })
   }
}
//-------------------------------------Delete User Controller End---------------------------------------------------
