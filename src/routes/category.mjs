import { Router } from 'express';
import {  getAllCategory, validateCategory,showCategory } from '../controllers/category/get/get.mjs';
import { createCategory } from '../controllers/category/create/create.mjs';
import { updateCategory } from '../controllers/category/update/update.mjs';
import { deleteCategory } from '../controllers/category/delete/delete.mjs';
import validateToken from '../middleware/jwt.mjs';
export const categoryRouter = Router();

categoryRouter.post('/category/create',validateToken, createCategory);
categoryRouter.delete('/user/delete', validateToken, deleteCategory);
categoryRouter.post('/user/all', validateToken, getAllCategory);
categoryRouter.post('/user/get/:key?/:value?', validateToken, validateCategory, showCategory);
categoryRouter.patch('/user/update/:key?/:value?', validateToken, validateCategory, updateCategory);
export default categoryRouter;