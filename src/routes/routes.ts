import {Router} from 'express';
import userRouter from './user.routes';
import eventRouter from './event.routes';
import { userAuthMiddleWare } from '../middleware';
const router=Router();

router
.use('/api/v1',userRouter)
.use('/event',userAuthMiddleWare,eventRouter)

export default router;