import { Router } from 'express';
import { getAllCategory, validateCategory, showCategory } from '../controllers/category/get/get.mjs';
import { createCategory } from '../controllers/category/create/create.mjs';
import { updateCategory } from '../controllers/category/update/update.mjs';
import { deleteCategory } from '../controllers/category/delete/delete.mjs';
export const categoryRouter = Router();

categoryRouter.post('/category/create', createCategory);
categoryRouter.delete('/category/delete', deleteCategory);
categoryRouter.post('/category/all', getAllCategory);
categoryRouter.post('/category/get/:key?/:value?', validateCategory, showCategory);
categoryRouter.patch('/category/update/:key?/:value?', validateCategory, updateCategory);
export default categoryRouter;