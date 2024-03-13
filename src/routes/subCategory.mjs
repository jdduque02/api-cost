import { Router } from 'express';
import { getAllSubCategory, validateSubCategory, showSubCategory } from '../controllers/subCategory/get/get.mjs';
import { createSubCategory } from '../controllers/subCategory/create/create.mjs';
import { updateSubCategory } from '../controllers/subCategory/update/update.mjs';
import { deleteSubCategory } from '../controllers/subCategory/delete/delete.mjs';
export const subCategoryRouter = Router();
/**
 * @openapi
 * components:
 *   schemas:
 *     subCategory:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - categoryId
 *         - userId
 *       properties:
 *         name: 
 *           type: string
 *           example: savings
 *         categoryId: 
 *           type: string
 *           example: uidd
 *         description:
 *           type: string
 *           example: savings group required
 *         userId:
 *           type: string
 *           example: uidd
 * /api/v0.10.0/subCategory/create:
 *   post:
 *     summary: Returns a subCategory create.
 *     description: Create a new subCategory in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - subCategory
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
 *                     $ref: "#/components/schemas/subCategory"
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
subCategoryRouter.post('/subCategory/create', createSubCategory);
/**
 * @openapi
 * /api/v0.10.0/subCategory/delete:
 *   delete:
 *     summary: Returns a subCategory delete.
 *     description: Delete subCategory in the database. 
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - subCategory
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
 *                     $ref: "#/components/schemas/subCategory"
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
subCategoryRouter.delete('/subCategory/delete', deleteSubCategory);
/**
 * @openapi
 * /api/v0.10.0/subCategory/all:
 *   post:
 *     summary: Returns all subCategorys in database.
 *     description: all subCategory api.
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     tags:
 *       - subCategory
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
subCategoryRouter.post('/subCategory/all', getAllSubCategory);
/**
 * @openapi
 * /api/v0.10.0/subCategory/get/{key}/{value}:
 *   post:
 *     summary: Returns all subCategorys in database.
 *     description: all subCategory api.
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
 *       - subCategory
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
subCategoryRouter.post('/subCategory/get/:key?/:value?', validateSubCategory, showSubCategory);
/**
 * @openapi
 * /api/v0.10.0/subCategory/update/{key}/{value}:
 *   patch:
 *     summary: Return update subCategory in database.
 *     description: update subCategory in database.
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
 *       - subCategory
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
subCategoryRouter.patch('/subCategory/update/:key?/:value?', validateSubCategory, updateSubCategory);
export default subCategoryRouter;