import { Router } from "express";
import {isAuthenticated, authRoles} from '../middlewares/authentication.js';
import { addProject, deleteProject, getProjectInvestors, getProjects, modifyProject } from "../controllers/ProjectController.js"
const projetRouter = Router();

projetRouter.use(isAuthenticated);

projetRouter.post('/', authRoles('OWNER'), addProject);
projetRouter.get('/',authRoles('OWNER'), getProjects);
projetRouter.get('/investors/:id',authRoles('OWNER'),getProjectInvestors);
projetRouter.delete('/:id',authRoles('OWNER'), deleteProject);
projetRouter.put('/:id',authRoles('OWNER'),modifyProject);


export default projetRouter;