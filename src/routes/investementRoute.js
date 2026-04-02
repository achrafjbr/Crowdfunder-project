import { Router } from "express";
import {invest,
    invesincrementInvestorBalance,
     getOpenProject,
     getInvestementDetailsOfProject,
     getProjectDetails,
     getInvestedAmountAndPercetage} from '../controllers/investementController.js'
import { authRoles, isAuthenticated } from "../middlewares/authentication.js";
const investementRouter  = Router();

investementRouter.use(isAuthenticated);

investementRouter.post('/',authRoles('INVESTOR'),invest);
investementRouter.post('/raise-balance',authRoles('INVESTOR'),invesincrementInvestorBalance)
investementRouter.get('/open-projects',authRoles('INVESTOR'),getOpenProject);
investementRouter.get('/project-details/:id',authRoles('INVESTOR'),getProjectDetails);
investementRouter.get('/investement-project-details',authRoles('INVESTOR'),getInvestementDetailsOfProject);
//voir pour chaque projet : (le montant investi, le pourcentage détenu)
investementRouter.get('/amount-percent-project/:id',authRoles('INVESTOR'),getInvestedAmountAndPercetage);





export default investementRouter;