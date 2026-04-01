import Investement from "../models/Investement.js";
import Project from "../models/Project.js";
import User from "../models/User.js"
import { errorMessage, successMessage } from "../utils/error.js";
import projectDao from "./projectDAO.js";

const getProjectById =async(projectId)=> await Project.findOne({_id:projectId})
const closeProject=async(projectId)=>await Project
.findOneAndUpdate(
    {_id:projectId},
    {status:'closed'},
    {new:true},
);

const incrementInvestorBalance =(userId,balance)=>User.findOneAndUpdate(
        {_id:userId},
        {balance:balance},
        {new:true},
    );

const invest = async(projectId, investorId, investementAmount) => {
    const {title,capital,status,owner} = await getProjectById(projectId);

    if(status == 'closed'){
    return errorMessage(404,  
        {title:title,
        status:status,
        capital:capital,
        owner:owner});
    }

    const fiftyPercentProjectCapital = capital*50/100;
    console.log("fiftyPercentProjectCapital",fiftyPercentProjectCapital);
    if(investementAmount>fiftyPercentProjectCapital)
        {return errorMessage(403, 'limit exceeded');}

    const investorsAmountList = await Investement.find({project:projectId})
    .populate('investor', "amount");

    let totalInvestementAmount = 0;
    //Get total amount of investements.
    for (let index = 0; index < investorsAmountList.length; index++) {
         totalInvestementAmount += investorsAmountList[index].amount;}

    // the remain amount to acheive capital:
    const remainder = capital - totalInvestementAmount;
    
    if(remainder<investementAmount)
        {return errorMessage(403, 'Exceeded the remaining capital limit');}

    // Otherwise add the investement...
    const investemenetData = await Investement.create({
        investor:investorId,
        project:projectId,
        amount:investementAmount},);

    //Close project if the investement acheive the capital.
        if(totalInvestementAmount+investementAmount == investemenetData.amount)
            {
               const newProject = await closeProject(projectId);
               const newProjectData = {...newProject, status:status}
               return successMessage(201,'project has been closed auto', newProjectData)
            }
    
    // return the project
    return successMessage(201,'success', 
        {title:title,
        status:status,
        capital:capital,
        owner:owner,});
    
    
}

const getOpenProject = ()=>Project.find({status:'open'}).exec();

// project and who's invested in.
const getProjectDetails = async(projectId)=>
await Project
  .find({ project: projectId })
  .populate("owner");

const getInvestementDetailsOfProject = async(projectId)=>{
    await Investement
  .find({ project: projectId })
  .populate("investor");
}
//voir pour chaque projet : (le montant investi, le pourcentage détenu)
const getInvestedAmountAndPercetage= ()=>{}

const investemendDao ={
    invest,
    incrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
}

export default investemendDao

