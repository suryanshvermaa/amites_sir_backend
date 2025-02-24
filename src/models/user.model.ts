import mongoose,{Document,Schema} from 'mongoose';
import bcrypt from "bcrypt";

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    comparePassword:(password:string)=>Promise<boolean>;
    isAdmin:boolean;
    refreshToken:string;
}

const UserSchema:Schema<IUser>=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    refreshToken:{
        type:String,
        required:true
    },
},{timestamps:true})

UserSchema.pre<IUser>('save',async function(next){
    if(!this.isModified('password')) next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.comparePassword=async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',UserSchema)
export default User;