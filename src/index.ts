import express,{Request,Response} from 'express';
import 'dotenv/config';
import dbConnect from "./utils/db"
import router from './routes/routes';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//db connect
dbConnect().catch((err:any)=>{
    console.log("error: db connection");
})

app.use('/',router);
//health route
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).send('healthy');
})

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server is running on port',port);
})