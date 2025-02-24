import jwt from "jsonwebtoken";
import User from "../models/user.model";
export const genAccessToken=(name:string,email:string,id:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const accessToken=await jwt.sign({name,email,id},process.env.JWT_SECRET!,{expiresIn:'15m'});
            resolve(accessToken);
        } catch (error:any) {
            reject(error.message)
        }
    })
}

export const genRefreshToken=(name:string,email:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const refreshToken=await jwt.sign({name,email},process.env.JWT_SECRET!,{expiresIn:'2h'});
            resolve(refreshToken);
        } catch (error:any) {
            reject(error.message)
        }
    })
}

export const resolveAccessToken=(token:string)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET!);
            if(!decodedToken) reject('access token verification failed');
            const idOfUser=JSON.parse(JSON.stringify(decodedToken)).id;
            resolve(idOfUser);
        } catch (error:any) {
            reject(error.message);
        }
    })
}

export const isVerifiedRefreshToken=(token:string):Promise<boolean>=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET!);
            if(!decodedToken) reject(false);
            const emailOfUser=JSON.parse(JSON.stringify(decodedToken)).email;
            const tokenVerified=await User.findOne({email:emailOfUser});
            if(tokenVerified?.refreshToken==token) resolve(true);
            else reject(false);
        } catch (error:any) {
            reject(false);
        }
    })
}
