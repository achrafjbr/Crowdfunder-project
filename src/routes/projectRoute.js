import { Router } from "express";
import {isAuthenticated, authRoles} from '../middlewares/authentication.js';
import { addProject } from "../controllers/ProjectController.js"

const projetRouter = Router();

projetRouter.use(isAuthenticated);

projetRouter.post('/addProject',addProject);