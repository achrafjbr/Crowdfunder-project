import investemendDao from "../dao/investementDAO.js";



// Done
const invest = async(projectId, investorId, investementAmount) =>
    await investemendDao.invest(projectId, investorId, investementAmount);

// Done
const invesincrementInvestorBalance = async(userId,balance)=>
    await investemendDao.incrementInvestorBalance(userId,balance);

// Done
const getOpenProject = async()=>await investemendDao.getOpenProject();

// 
const getProjectDetails = async(projectId)=>await investemendDao.getProjectDetails(projectId);

const getInvestementDetailsOfProject = async(userId)=>await investemendDao.getInvestementDetailsOfProject(userId);

const getInvestedAmountAndPercetage= async(projectId)=>
    await investemendDao.getInvestedAmountAndPercetage(projectId);



const investementService = {
    invest,
    invesincrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
}

export default investementService;