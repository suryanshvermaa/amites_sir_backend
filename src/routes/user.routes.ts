import {Router} from 'express';
import { loginUser, signUp } from '../controllers/user.controller';
const userRouter=Router();

userRouter
.post('/signup',signUp)
.post('/login',loginUser)

export default userRouter;