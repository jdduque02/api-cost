import { Router } from 'express';
import {  getAllFinancialObjective , validateFinancialObjective ,showFinancialObjective  } from '../controllers/financialObjective/get/get.mjs';
import { createFinancialObjective  } from '../controllers/financialObjective/create/create.mjs';
import { updateFinancialObjective  } from '../controllers/financialObjective/update/update.mjs';
import { deleteFinancialObjective  } from '../controllers/financialObjective/delete/delete.mjs';
export const financialObjectiveRouter = Router();

financialObjectiveRouter.post('/financialObjective/create', createFinancialObjective );
financialObjectiveRouter.delete('/financialObjective/delete', deleteFinancialObjective );
financialObjectiveRouter.post('/financialObjective/all', getAllFinancialObjective );
financialObjectiveRouter.post('/financialObjective/get/:key?/:value?', validateFinancialObjective , showFinancialObjective );
financialObjectiveRouter.patch('/financialObjective/update/:key?/:value?', validateFinancialObjective , updateFinancialObjective );
export default financialObjectiveRouter;