import investemendDao from "../dao/investementDAO.js";




const invest = async(projectId, investorId, investementAmount) => {
    await investemendDao.invest(projectId, investorId, investementAmount);
}


const invesincrementInvestorBalance = async()=>{
     await investemendDao.incrementInvestorBalance();
}
const getOpenProject = async()=>{
      await investemendDao.getOpenProject();
}
// project and who's invested in.
const getProjectDetails = async()=>{
    await investemendDao.getProjectDetails();
}
const getInvestementDetailsOfProject = async()=>{
      await investemendDao.getInvestementDetailsOfProject();
}
//voir pour chaque projet : (le montant investi, le pourcentage détenu)
const getInvestedAmountAndPercetage= async()=>{
    await investemendDao.getInvestedAmountAndPercetage();
}


const investementService = {
    invest,
    invesincrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
}

export default investementService;