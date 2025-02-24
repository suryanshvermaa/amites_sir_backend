import { Request,Response,NextFunction } from "express"
import { decodedRefreshToken,isVerifiedRefreshToken } from "./utils/tokens";
import { JwtPayload } from "jsonwebtoken";
export interface AuthRequest extends Request{
    user?:string|JwtPayload;
}

export const userAuthMiddleWare=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const refreshToken=req.body.refreshToken;
        const accessToken=req.body.accessToken;
        if(!refreshToken||!accessToken){
            res.status(400)
            .json({
                success:false,
                message:"refresh token not found",
            }) 
        }
        const isVerified=await isVerifiedRefreshToken(refreshToken);
        if(isVerified){
            const decodedToken=await decodedRefreshToken(refreshToken);
            req.user=decodedToken;
            next();
        }
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