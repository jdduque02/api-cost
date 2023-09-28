import { Router } from 'express';
import { createUser } from '../controllers/user/create/create.mjs';
/* import { loginUser } from '../controllers/user/get/get.mjs'; */
export const userRouter = Router();
userRouter.post('/user/create', createUser);
/* userRouter.post('/user/login', loginUser); */
export default userRouter;