import { Router } from "express";
import {isAuthenticated, authRoles} from '../middlewares/authentication.js';
import { addProject, deleteProject, getProjectInvestors, getProjects, modifyProject } from "../controllers/ProjectController.js"
const projetRouter = Router();

projetRouter.use(isAuthenticated);

projetRouter.post('/', authRoles('OWNER'), addProject);
projetRouter.get('/',authRoles('OWNER'), getProjects);
projetRouter.get('/investors',authRoles('OWNER'),getProjectInvestors);
projetRouter.delete('/',authRoles('OWNER'), deleteProject);
projetRouter.put('/',authRoles('OWNER'),modifyProject);


export default projetRouter;