import { Response } from "express";
import { AuthRequest } from "../middleware";
import Event from "../models/event.model";

export const createEvent=async(req:AuthRequest,res:Response)=>{
   try {
    const user=req.user;
    const userId=JSON.parse(JSON.stringify(user)).id;
    const {name,description,date}=req.body;
    if(!name||!description||!date){
        res.status(400)
        .json({
          success:false,
          error:'all fields are required',
        })
        return;
    }
    const event=new Event({name,description,date,user:userId});
    await event.save();
    res.status(400)
     .json({
       success:true,
       message:'event created succesfully',
     })
   } catch (error:any) {
     res.status(400)
     .json({
       success:false,
       error:error.message,
     })
   }
}