import { Router } from 'express';
import { getAllNotification, validateNotification, showNotification } from '../controllers/notification/get/get.mjs';
import { createNotification } from '../controllers/notification/create/create.mjs';
import { updateNotification } from '../controllers/notification/update/update.mjs';
import { deleteNotification } from '../controllers/notification/delete/delete.mjs';
export const notificationRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - name
 *         - group
 *         - description
 *         - percentageOptimum
 *         - methods
 *       properties:
 *         name: 
 *           type: string
 *           example: savings
 *         group: 
 *           type: string
 *           example: savings
 *         description:
 *           type: string
 *           example: savings group required
 *         percentageOptimum:
 *           type: number
 *           example: 11
 *         methods:
 *           type: string 
 * /api/v1/notification/create:
 *   post:
 *     summary: Returns a notification create.
 *     description: Create a new notification in the database. 
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
 *       - Notification
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
 *                     $ref: "#/components/schemas/Notification"
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
notificationRouter.post('/notification/', createNotification);
/**
 * @openapi
 * /api/v1/notification/delete:
 *   delete:
 *     summary: Returns a notification delete.
 *     description: Delete notification in the database. 
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
 *       - Notification
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
 *                     $ref: "#/components/schemas/Notification"
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
notificationRouter.delete('/notification/delete', deleteNotification);
/**
 * @openapi
 * /api/v1/notification/get/{key}/{value}:
 *   post:
 *     summary: Returns all notifications in database.
 *     description: all notification api.
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
 *       - Notification
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
notificationRouter.get('/notification/get/:key?/:value?', validateNotification, showNotification);
/**
 * @openapi
 * /api/v1/notification/update/{key}/{value}:
 *   patch:
 *     summary: Return update notification in database.
 *     description: update notification in database.
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
 *       - Notification
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
notificationRouter.patch('/notification/update/:key?/:value?', validateNotification, updateNotification);
export default notificationRouter;