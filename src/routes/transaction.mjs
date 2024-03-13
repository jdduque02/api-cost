import { Router } from 'express';
import { getAllTransaction, validateTransaction, showTransaction } from '../controllers/transaction/get/get.mjs';
import { createTransaction } from '../controllers/transaction/create/create.mjs';
import { updateTransaction } from '../controllers/transaction/update/update.mjs';
import { deleteTransaction } from '../controllers/transaction/delete/delete.mjs';
export const transactionRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     transaction:
 *       type: object
 *       required:
 *         - name
 *         - groupId
 *         - categoryId
 *         - subcategoryId
 *         - userId
 *       properties:
 *         name: 
 *           type: string
 *           example: savings
 *         categoryId: 
 *           type: string
 *           example: uidd
 *         subcategoryId: 
 *           type: string
 *           example: uidd
 *         userId: 
 *           type: string
 *           example: uidd  
 *         annotation:
 *           type: string
 *           example: savings group required
 * /api/v0.10.0/transaction/create:
 *   post:
 *     summary: Returns a transaction create.
 *     description: Create a new transaction in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - transaction
 *     responses:
 *       201:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 message:
 *                   type: string 
 *                 body:
 *                   type: array 
 *                   items:
 *                     $ref: "#/components/schemas/transaction"
 *       500:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 *       401:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 */
transactionRouter.post('/transaction/create', createTransaction);
/**
 * @openapi
 * /api/v0.10.0/transaction/delete:
 *   delete:
 *     summary: Returns a transaction delete.
 *     description: Delete transaction in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - transaction
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 message:
 *                   type: string 
 *                 body:
 *                   type: array 
 *                   items:
 *                     $ref: "#/components/schemas/transaction"
 *       500:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 *       401:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 */
transactionRouter.delete('/transaction/delete', deleteTransaction);
/**
 * @openapi
 * /api/v0.10.0/transaction/all:
 *   post:
 *     summary: Returns all transactions in database.
 *     description: all transaction api.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - transaction
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 message:
 *                   type: string 
 *                 body:
 *                   type: object
 *       500:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 *       401:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 */
transactionRouter.post('/transaction/all', getAllTransaction);
/**
 * @openapi
 * /api/v0.10.0/transaction/get/{key}/{value}:
 *   post:
 *     summary: Returns all transactions in database.
 *     description: all transaction api.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - transaction
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 message:
 *                   type: string 
 *                 body:
 *                   type: object
 *       500:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 *       401:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 */
transactionRouter.post('/transaction/get/:key?/:value?', validateTransaction, showTransaction);
/**
 * @openapi
 * /api/v0.10.0/transaction/update/{key}/{value}:
 *   patch:
 *     summary: Return update transaction in database.
 *     description: update transaction in database.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - transaction
 *     responses:
 *       200:
 *         description: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 message:
 *                   type: string 
 *                 body:
 *                   type: object
 *       500:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 *       401:
 *          description:
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string 
 *                 body:    
 *                   type: object
 */
transactionRouter.patch('/transaction/update/:key?/:value?', validateTransaction, updateTransaction);
export default transactionRouter;