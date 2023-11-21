import { Router } from 'express';
import {  getAllTransaction , validateTransaction ,showTransaction  } from '../controllers/transaction/get/get.mjs';
import { createTransaction  } from '../controllers/transaction/create/create.mjs';
import { updateTransaction  } from '../controllers/transaction/update/update.mjs';
import { deleteTransaction  } from '../controllers/transaction/delete/delete.mjs';
export const transactionRouter = Router();

transactionRouter.post('/transaction/create', createTransaction );
transactionRouter.delete('/transaction/delete', deleteTransaction );
transactionRouter.post('/transaction/all', getAllTransaction );
transactionRouter.post('/transaction/get/:key?/:value?', validateTransaction , showTransaction );
transactionRouter.patch('/transaction/update/:key?/:value?', validateTransaction , updateTransaction );
export default transactionRouter;