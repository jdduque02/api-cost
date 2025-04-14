import { Router } from 'express';
import {  validateFinancialObjective, showFinancialObjective } from '../controllers/financialObjective/get/get.mjs';
import { createFinancialObjective } from '../controllers/financialObjective/create/create.mjs';
import { updateFinancialObjective } from '../controllers/financialObjective/update/update.mjs';
import { removeFinancialObjective } from '../controllers/financialObjective/delete/delete.mjs';
export const financialObjectiveRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     FinancialObjetive:
 *       type: object
 *       required:
 *         - categoryId
 *         - subcategoryId
 *         - name
 *         - userId
 *         - typeFinancialObjective
 *         - dueDate
 *         - payments
 *         - owner 
 *       properties:
 *         categoryId: 
 *           type: string
 *           example: uidd
 *         subcategoryId: 
 *           type: string
 *           example: uidd
 *         name:
 *           type: string
 *           example: 2
 *         userId:
 *           type: string
 *           example: uidd
 *         typeFinancialObjective:
 *           type: string
 *           example: 3 
 *         totalAmount:
 *           type: number
 *           example: 3
 *         currentBalance:
 *           type: number
 *           example: 3
 *         dueDate:
 *           type: string
 *         owner:
 *           type: string
 *           example: user12
 *         endDateFinancialObjective:
 *           type: date
 *         payments:
 *           type: array
 *           items:
 *              type: string
 *           example: [Daypayment, amountPaid]
 *         frequency:
 *           type: string
 *           example: daily
 *           enum:  ['daily', 'weekly', 'year', 'quarter']          
 *         interest:
 *           type: number
 *           example: 2
 *         fees:
 *           type: number
 *           example: 2
 *         valueMonthlyFee:
 *           type: number
 *           example: 2    
 * /api/v1/financialObjective/create:
 *   post:
 *     summary: Returns a financialObjective create.
 *     description: Create a new financialObjective in the database. 
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
 *       - FinancialObjetive
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
 *                     $ref: "#/components/schemas/FinancialObjetive"
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
financialObjectiveRouter.post('/financialObjective/', createFinancialObjective);
/**
 * @openapi
 * /api/v1/financialObjetive/delete:
 *   delete:
 *     summary: Returns a financialObjetive delete.
 *     description: Delete financialObjetive in the database. 
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
 *       - FinancialObjetive
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
 *                     $ref: "#/components/schemas/FinancialObjetive"
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
financialObjectiveRouter.delete('/financialObjective/delete/:key?/:value?',validateFinancialObjective, removeFinancialObjective);
/**
 * @openapi
 * /api/v1/financialObjetive/get/{key}/{value}:
 *   post:
 *     summary: Returns all financialInformations in database.
 *     description: all financialObjetive api.
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
 *       - FinancialObjetive
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
financialObjectiveRouter.get('/financialObjective/get/:key?/:value?', validateFinancialObjective, showFinancialObjective);
/**
 * @openapi
 * /api/v1/financialObjetive/update/{key}/{value}:
 *   patch:
 *     summary: Return update financialObjetive in database.
 *     description: update financialObjetive in database.
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
 *       - FinancialObjetive
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
financialObjectiveRouter.patch('/financialObjective/update/:key?/:value?', validateFinancialObjective, updateFinancialObjective);
export default financialObjectiveRouter;