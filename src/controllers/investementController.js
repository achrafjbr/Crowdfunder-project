import investementService from "../services/investementService.js"


const invest = async(request,response)=>{
    const {
        projectId,
        investementAmount
    } = request.body;
    const {id} = request.user;
    await investementService.invest(projectId, id, investementAmount);
}
const invesincrementInvestorBalance = async()=>{
    await investementService.invesincrementInvestorBalance();
}
const getOpenProject = async()=>{
     await investementService.getOpenProject();
}
// project and who's invested in.
const getProjectDetails = async()=>{
    await investementService.getProjectDetails();
}
const getInvestementDetailsOfProject = async()=>{
     await investementService.getInvestementDetailsOfProject();
}
//voir pour chaque projet : (le montant investi, le pourcentage détenu)
const getInvestedAmountAndPercetage= async()=>{
    await investementService.getInvestedAmountAndPercetage();
}



export  {
    invest,
    invesincrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
}