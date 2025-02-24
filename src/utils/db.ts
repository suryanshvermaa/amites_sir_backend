import mongoose from 'mongoose';
import 'dotenv/config';
const mongoUri=process.env.MONGO_URI!;
const user=process.env.MONGO_USER;
const pass=process.env.MONGO_PASS;
const dbConnect=async()=>{
    try {
        await mongoose.connect(mongoUri,{user,pass});
        console.log('db connected successfully');
    } catch (error:any) {
        console.log(error.message);
    }
}
export default dbConnect;