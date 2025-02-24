import {Router} from 'express';
import { signUp } from '../controllers/user.controller';
const userRouter=Router();

userRouter
.post('/signup',signUp)

export default userRouter;