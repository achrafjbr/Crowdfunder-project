import { Router } from "express";
import {isAuthenticated, authRoles} from '../middlewares/authentication.js';
import { addProject, deleteProject, getProjectInvestors, getProjects, modifyProject } from "../controllers/ProjectController.js"
const projetRouter = Router();

projetRouter.use(isAuthenticated);


/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - capital
 *         - status
 *         - initialInvestement
 *         - owner
 *       properties:
 *         title:
 *           type: string
 *           description: The project name
 *         description:
 *           type: string
 *           description: The project description
 *         capital:
 *           type: number
 *           description: The project capital
 *         status:
 *           type: string
 *           description: The project status
 *         initialInvestement:
 *           type: number
 *           description: Initial investment
 *         owner:
 *           type: string
 *           description: Owner ID
 *       example:
 *         title: Health-care
 *         description: Buying medicine products
 *         capital: 1000000
 *         status: open
 *         initialInvestement: 20000
 *         owner: 65f1a2c9d1234567890abcd
 */

/**
 * @swagger
 * /api/v1/project:
 *   post:
 *     summary: Add a project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 */
projetRouter.post('/', authRoles('OWNER'), addProject);
projetRouter.get('/',authRoles('OWNER'), getProjects);
projetRouter.get('/investors/:id',authRoles('OWNER'),getProjectInvestors);
projetRouter.delete('/:id',authRoles('OWNER'), deleteProject);
projetRouter.put('/:id',authRoles('OWNER'),modifyProject);


export default projetRouter;