import { Router } from "express";
import adminController from "../controllers/administratorController.js";
const administratorRouter = Router(); 



administratorRouter.get('/investors',adminController.getAllInvestors);
administratorRouter.get('/project-owners',adminController.getAllIProjectOwners);
administratorRouter.get('/investors-wallet/:id',adminController.getInvestorsWallet);
administratorRouter.get('/owners-wallet/:id',adminController.getInvestorsWallet);



export default administratorRouter;