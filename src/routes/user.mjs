import { Router } from 'express';

import { createUser } from '../controllers/user/create/create.mjs';
export const userRouter = Router();
userRouter.post('user/create/', createUser);
export default userRouter;