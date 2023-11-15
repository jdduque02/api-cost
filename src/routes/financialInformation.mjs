import { Router } from 'express';
import {  getAllFinancialInformation , validateFinancialInformation ,showFinancialInformation  } from '../controllers/financialInformation/get/get.mjs';
import { createFinancialInformation  } from '../controllers/financialInformation/create/create.mjs';
import { updateFinancialInformation  } from '../controllers/financialInformation/update/update.mjs';
import { deleteFinancialInformation  } from '../controllers/financialInformation/delete/delete.mjs';
export const financialInformationRouter = Router();

financialInformationRouter.post('/financialInformation/create', createFinancialInformation );
financialInformationRouter.delete('/financialInformation/delete', deleteFinancialInformation );
financialInformationRouter.post('/financialInformation/all', getAllFinancialInformation );
financialInformationRouter.post('/financialInformation/get/:key?/:value?', validateFinancialInformation , showFinancialInformation );
financialInformationRouter.patch('/financialInformation/update/:key?/:value?', validateFinancialInformation , updateFinancialInformation );
export default financialInformationRouter;