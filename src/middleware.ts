import { Request,Response,NextFunction } from "express"
import { isVerifiedRefreshToken } from "./utils/tokens";
export const userAuthMiddleWare=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const refreshToken=req.body.accessToken;
        if(!refreshToken){
            res.status(400)
            .json({
                success:false,
                message:"refresh token verification failed",
            })
        }
        const isVerified=await isVerifiedRefreshToken(refreshToken);
        if(isVerified) next();
        else{
            res.status(400)
            .json({
                success:false,
                message:"refresh token verification failed",
            })
        }
    } catch (error:any) {
        res.status(400)
            .json({
                success:false,
                message:"refresh token verification failed",
            })
    }
}