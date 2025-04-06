import { Router } from 'express';
import { createUser } from '../controllers/user/create/create.mjs';
import { loginUser, showUser, validateUser } from '../controllers/user/get/get.mjs';
import { updateUser } from '../controllers/user/update/update.mjs';
import { deleteUser } from '../controllers/user/delete/delete.mjs';
import { validateToken } from '../middleware/jwt.mjs';
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
 *           type: string
 *           format: email
 *           example: textExample@example.com
 *         numberPhone:
 *           type: string
 *           example: "1111111111"
 *         role:
 *           type: string
 *           example: "1"
 * 
 * /api/v1/user/create:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     security:
 *       - BearerAuth: [] # Si usas autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 5Tt2o@example.com
 *               numberPhone:
 *                 type: number
 *                 example: 1234567890
 *               role:
 *                 type: number
 *                 example: 1
 *     tags:
 *       - User
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string 
 *                   example: "User created successfully"
 *                 body:
 *                   type: object 
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *       500:
 *         description: Internal server error
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
 *                   example: "Internal server error"
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *                   example: "Unauthorized - Invalid token"
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

userRouter.post('/user/', createUser);
/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     summary: Authenticate user and return a token.
 *     description: This API allows a user to log in by providing credentials.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 body:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized - Invalid credentials
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
 *                   example: "Invalid username or password"
 *       400:
 *         description: error on data base query
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
 *                   example: "error on data base query"
 *       500:
 *         description: Internal server error
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
 *                   example: "Server error"
 *                 body:    
 *                   type: object
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
userRouter.post('/user/login', loginUser);
/**
 * @openapi
 * /api/v1/user/delete:
 *   delete:
 *     summary: Deletes a user
 *     description: Deletes a user from the database.
 *     security:
 *       - BearerAuth: [] # Para autenticación con JWT
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parameter:
 *                 type: string
 *                 example: "id"
 *               value:
 *                 type: string
 *                 example: "1"
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string 
 *                   example: "User deleted successfully"
 *                 body:
 *                   type: array 
 *                   items:
 *                     $ref: "#/components/schemas/User"
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 *                   example: "Unauthorized - Invalid token"
 *       500:
 *         description: Internal server error
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
 *                   example: "Internal server error"
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
userRouter.delete('/user/delete/:key?/:value?', validateToken, deleteUser);
/**
 * @openapi
 * /api/v1/user/get/{key}/{value}:
 *   post:
 *     summary: Returns all users in database.
 *     description: all user api.
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
userRouter.get('/user/get/:key?/:value?', validateUser, showUser);
/**
 * @openapi
 * /api/v1/user/update/{key}/{value}:
 *   patch:
 *     summary: Return update user in database.
 *     description: update user in database.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numberPhone:
 *                 type: number
 *                 example: 1234567890
 *               email:
 *                 type: string
 *                 example: "5Tt2o@example.com"
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
userRouter.patch('/user/update/:key?/:value?', validateToken, validateUser, updateUser);
export default userRouter;