import Investement from "../models/Investement.js";
import Project from "../models/Project.js";
import User from "../models/User.js"
import { errorMessage, successMessage } from "../utils/error.js";
import projectDao from "./projectDAO.js";

const getProjectById =async(projectId)=> await Project.findOne({_id:projectId});

const closeProject=async(projectId)=>await Project.findOneAndUpdate(
    {_id:projectId},
    {status:'closed'},
    {new:true},
);
const openProject=async(projectId)=>await Project.findOneAndUpdate(
    {_id:projectId},
    {status:'open'},
    {new:true},
);
const getProjectOwner = async(owner)=> await Project.findOne({owner:owner}).exec();


const incrementInvestorBalance =async(userId,balance)=>{
    const result = await User.findOneAndUpdate(
        {_id:userId},
        {balance:balance},
        {new:true},
    );    
    if(!result)return errorMessage(404,'No investement found');
        return successMessage(200, result);
}

const invest = async(projectId, investorId, investementAmount) => {
    const {title,capital,status,owner} = await getProjectById(projectId);
    
    const projectData = {
        title:title,
        status:status,
        capital:capital,
        owner:owner,}

    if(status == 'closed'){
    return errorMessage(404,projectData);
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
        if(totalInvestementAmount+investemenetData.amount == capital )
            {
               const newProject = await closeProject(projectId);
               const newProjectData = {...newProject, status:status}
               return successMessage(201,'project has been closed auto', newProjectData)
            }
    
    // return the project
    const projectOwner =  await getProjectOwner(owner);        
    return successMessage(201, {...projectData, owner: projectOwner});
    
}

const getOpenProject = async()=>{
    const result = await Project.findOne({'status':'open'}).exec();
   if(!result)return errorMessage(404,'No open project found');
        return successMessage(200,result);
}

const getProjectDetails = async(projectId)=>{
 //const project = await Project.findOne({_id:projectId}).populate('owner');
    const investments = await Investement
    .find({ project: projectId })
    .populate("investor")
    const result =  {
    //...project,
       investments
    };
    if(!result)return errorMessage(404,'No investement found');
        return successMessage(200, result);
}


const getInvestementDetailsOfProject = async(userId)=>{
  const result = await Investement
  .find({ investor: userId })
  .populate("project")
  .lean();
  if(!result)return errorMessage(404,'No investement found');
        return successMessage(200, result);
}
//voir pour chaque projet : (le montant investi, le pourcentage détenu)
const getInvestedAmountAndPercetage= async(projectId)=>{
    const result = await Investement.find({project:projectId}).populate('investor');
    let totalAmount = 0;
    for (let index = 0; index < result.length; index++) {
         totalAmount += result[index].amount;
        }
        console.log(projectId);
        
        if(!result)return errorMessage(404,'No investement found');
        const {capital} = await getProjectById(projectId);
        const percent = parseFloat((totalAmount/capital).toPrecision(2));
        return successMessage(200, {
            montantInvesti:totalAmount,
            pourcentageDétenu: percent,
        });

}

const investemendDao ={
    invest,
    incrementInvestorBalance,
    getOpenProject,
    getProjectDetails,
    getInvestementDetailsOfProject,
    getInvestedAmountAndPercetage,
    openProject,
}

export default investemendDao

