import { Router } from 'express';
import { createUser } from '../controllers/user/create/create.mjs';
import { loginUser, getAllUser, validateUser } from '../controllers/user/get/get.mjs';
import { updateUser } from '../controllers/user/update/update.mjs';
import { deleteUser } from '../controllers/user/delete/delete.mjs';
import validateToken from '../middleware/jwt.mjs';
export const userRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - numberPhone
 *         - role  
 *       properties:
 *         username: 
 *           type: string
 *           example: example21
 *         password: 
 *           type: string
 *           example: password123
 *         email:
 *           type: email
 *           example: textExample@example.com
 *         numberPhone:
 *           type: number
 *           example: 1111111111
 *         role:
 *           type: number
 *           example: 1
 * /api/v0.10.0/user/create:
 *   post:
 *     summary: Returns a user create.
 *     description: Create a new user in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - User
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
 *                     $ref: "#/components/schemas/User"
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
userRouter.post('/user/create', createUser);
/**
 * @openapi
 * /api/v0.10.0/user/login:
 *   post:
 *     summary: Returns a token user.
 *     description: login user api. 
 *     tags:
 *       - User
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
 */
userRouter.post('/user/login', loginUser);
/**
 * @openapi
 * /api/v0.10.0/user/delete:
 *   delete:
 *     summary: Returns a user delete.
 *     description: Delete user in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - User
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
 *                     $ref: "#/components/schemas/User"
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
userRouter.delete('/user/delete', validateToken, deleteUser);
/**
 * @openapi
 * /api/v0.10.0/user/all:
 *   post:
 *     summary: Returns all users in database.
 *     description: all user api.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - User
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
userRouter.post('/user/all', validateToken, getAllUser);
/**
 * @openapi
 * /api/v0.10.0/user/update/{key}/{value}:
 *   patch:
 *     summary: Return update user in database.
 *     description: update user in database.
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
 *       - User
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
userRouter.patch('/user/update/:key?/:value?', validateToken, validateUser, updateUser);
export default userRouter;