import mongoose,{Document,Schema} from 'mongoose';
import { IUser } from './user.model';

export interface IEvent extends Document{
    name:string;
    date:Date;
    user:IUser;
    description:string;
}

const EventSchema:Schema<IEvent>=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    user:{
        type:String,
        ref:'User',
        required:true
    },
},{timestamps:true})

const Event=mongoose.model('Event',EventSchema)
export default Event;