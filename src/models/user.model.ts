import mongoose,{Document,Schema} from 'mongoose';

export interface IUser extends Document{
    
}

const UserSchema:Schema<IUser>=new Schema({

})

const User=mongoose.model('User',UserSchema)
export default User;