import { Router } from 'express';
import {  getAllSubCategory , validateSubCategory ,showSubCategory  } from '../controllers/subCategory/get/get.mjs';
import { createSubCategory  } from '../controllers/subCategory/create/create.mjs';
import { updateSubCategory  } from '../controllers/subCategory/update/update.mjs';
import { deleteSubCategory  } from '../controllers/subCategory/delete/delete.mjs';
export const subCategoryRouter = Router();

subCategoryRouter.post('/subCategory/create', createSubCategory );
subCategoryRouter.delete('/subCategory/delete', deleteSubCategory );
subCategoryRouter.post('/subCategory/all', getAllSubCategory );
subCategoryRouter.post('/subCategory/get/:key?/:value?', validateSubCategory , showSubCategory );
subCategoryRouter.patch('/subCategory/update/:key?/:value?', validateSubCategory , updateSubCategory );
export default subCategoryRouter;