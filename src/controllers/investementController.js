import investementService from "../services/investementService.js"
import { errorMessage } from "../utils/error.js";


const invest = async(request,response)=>{
    const {
        projectId,
        investementAmount
    } = request.body;
    try {
            const {id} = request.user;
   const result = await investementService.invest(projectId, id, investementAmount);
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json(errorMessage(500,error.message));
    }
}

const invesincrementInvestorBalance = async(request, response)=>{
    const {body:{balance}} = request;
    const userId = request.user.id;
    try {
        const result = await investementService.invesincrementInvestorBalance(userId,balance);
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json(errorMessage(500, error.message));
    }
}

const getOpenProject = async(_,response)=>{
     try {
        const result = await investementService.getOpenProject();        
        return response.status(result.statusCode).json(result);
     } catch (error) {
        return response.status(500).json(errorMessage(500, error.message));
     }
}

const getProjectDetails = async(request,response)=>{
    const projectId = request.params.id;
    console.log(projectId);
    try {
        const result = await investementService.getProjectDetails(projectId);
            return response.status(result.statusCode).json(result);
    } catch (error) {return response.status(500).json(errorMessage(500, error.message));}
}

const getInvestementDetailsOfProject = async(request,response)=>{
    const userId = request.user.id;
    try {
        const result  = await investementService.getInvestementDetailsOfProject(userId);
         return response.status(result.statusCode).json(result);
    } catch (error) {return response.status(500).json(errorMessage(500, error.message));}
}

//voir pour chaque projet : (le montant investi, le pourcentage détenu)
const getInvestedAmountAndPercetage= async(request,response)=>{
    const projectId = request.params.id;
    console.log(projectId);
    
    try {
       const result = await investementService.getInvestedAmountAndPercetage(projectId);
         return response.status(result.statusCode).json(result);
    } catch (error) {
         return response.status(500).json(errorMessage(500, error.message));
    }
}



export  {
    invest,
    invesincrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
}