import {Router} from 'express';
import { deleteUser, loginUser, signUp } from '../controllers/user.controller';
import { userAuthMiddleWare } from '../middleware';
const userRouter=Router();

userRouter
.post('/signup',signUp)
.post('/login',loginUser)
.delete('/delete-user',userAuthMiddleWare,deleteUser)

export default userRouter;