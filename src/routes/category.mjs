import { Router } from 'express';
import { getAllCategory, validateCategory, showCategory } from '../controllers/category/get/get.mjs';
import { createCategory } from '../controllers/category/create/create.mjs';
import { updateCategory } from '../controllers/category/update/update.mjs';
import { deleteCategory } from '../controllers/category/delete/delete.mjs';
export const categoryRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
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
 * /api/v1/category/create:
 *   post:
 *     summary: Returns a category create.
 *     description: Create a new category in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - Category
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
 *                     $ref: "#/components/schemas/Category"
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
categoryRouter.post('/category/create', createCategory);
/**
 * @openapi
 * /api/v1/category/delete:
 *   delete:
 *     summary: Returns a category delete.
 *     description: Delete category in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - Category
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
 *                     $ref: "#/components/schemas/Category"
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
categoryRouter.delete('/category/delete', deleteCategory);
/**
 * @openapi
 * /api/v1/category/all:
 *   post:
 *     summary: Returns all categorys in database.
 *     description: all category api.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - Category
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
categoryRouter.post('/category/all', getAllCategory);
/**
 * @openapi
 * /api/v1/category/get/{key}/{value}:
 *   post:
 *     summary: Returns all categorys in database.
 *     description: all category api.
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
 *       - Category
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
categoryRouter.post('/category/get/:key?/:value?', validateCategory, showCategory);
/**
 * @openapi
 * /api/v1/category/update/{key}/{value}:
 *   patch:
 *     summary: Return update category in database.
 *     description: update category in database.
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
 *       - Category
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
categoryRouter.patch('/category/update/:key?/:value?', validateCategory, updateCategory);
export default categoryRouter;