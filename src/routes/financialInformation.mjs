import { Router } from 'express';
import { validateFinancialInformation, showFinancialInformation } from '../controllers/financialInformation/get/get.mjs';
import { createFinancialInformation } from '../controllers/financialInformation/create/create.mjs';
import { updateFinancialInformation } from '../controllers/financialInformation/update/update.mjs';
import { deleteFinancialInformation } from '../controllers/financialInformation/delete/delete.mjs';
export const financialInformationRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     FinancialInformation:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId: 
 *           type: string
 *           example: uidd
 *         monthlyIncome: 
 *           type: number
 *           example: 2
 *         maxAllowableExpenses:
 *           type: number
 *           example: 2
 *         openingBalances:
 *           type: number
 *           example: 2
 *         initialDebts:
 *           type: number
 *           example: 3 
 *         savingsGoal:
 *           type: number
 *           example: 3
 *         percentageOptimum:
 *           type: number
 *           example: 3
 * /api/v1/financialInformation/create:
 *   post:
 *     summary: Returns a financialInformation create.
 *     description: Create a new financialInformation in the database. 
 *     security:
 *       - BearerAuth: [] # Si usas autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
 *     tags:
 *       - FinancialInformation
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
 *                     $ref: "#/components/schemas/FinancialInformation"
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
 *       400:
 *         description: Error in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in database query"
 *       413:
 *         description: The body of the request is too large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The body of the request is too large BODY LENGHT >1000"
 */
financialInformationRouter.post('/financialInformation/create', createFinancialInformation);
/**
 * @openapi
 * /api/v1/financialInformation/delete:
 *   delete:
 *     summary: Returns a financialInformation delete.
 *     description: Delete financialInformation in the database. 
 *     security:
 *       - BearerAuth: [] # Si usas autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
 *     tags:
 *       - FinancialInformation
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
 *                     $ref: "#/components/schemas/FinancialInformation"
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
 *       400:
 *         description: Error in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in database query"
 *       413:
 *         description: The body of the request is too large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The body of the request is too large BODY LENGHT >1000"
 */
financialInformationRouter.delete('/financialInformation/delete', deleteFinancialInformation);
/**
 * @openapi
 * /api/v1/financialInformation/get/{key}/{value}:
 *   post:
 *     summary: Returns all financialInformations in database.
 *     description: all financialInformation api.
 *     security:
 *       - BearerAuth: [] # Si usas autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
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
 *       - FinancialInformation
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
 *       400:
 *         description: Error in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in database query"
 *       413:
 *         description: The body of the request is too large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The body of the request is too large BODY LENGHT >1000"
 */
financialInformationRouter.get('/financialInformation/get/:key?/:value?', validateFinancialInformation, showFinancialInformation);
/**
 * @openapi
 * /api/v1/financialInformation/update/{key}/{value}:
 *   patch:
 *     summary: Return update financialInformation in database.
 *     description: update financialInformation in database.
 *     security:
 *       - BearerAuth: [] # Si usas autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
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
 *       - FinancialInformation
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
 *       400:
 *         description: Error in database query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error in database query"
 *       413:
 *         description: The body of the request is too large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The body of the request is too large BODY LENGHT >1000"
 */
financialInformationRouter.patch('/financialInformation/update/:key?/:value?', validateFinancialInformation, updateFinancialInformation);
export default financialInformationRouter;