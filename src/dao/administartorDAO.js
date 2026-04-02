import Investement from "../models/Investement.js"
import Project from "../models/Project.js";
import User from "../models/User.js";
import { errorMessage, successMessage } from "../utils/error.js";

//consulter la liste de tous les investisseurs
const getAllInvestors =async()=>{
    const investors = await Project.find({role:'INVESTOR'}).select('name email role').lean();
    if(!investors)return errorMessage(404,'No investor found');
        return successMessage(200, investors);
}

//consulter la liste de tous les porteurs de projets
const getAllIProjectOwners =async()=>{
    const owners = await User.find({ role: "OWNER" })
                                    .select("name email role")
                                    .lean();
        if(!owners)return errorMessage(404,'No owner found');
    return successMessage(200, owners);   
}

//consulter le portefeuille d’un investisseur (projets financés, total des investissements)
const getInvestorsWallet =async(investorId)=>{
        const data = await Investement.find({investor:investorId})
        .populate('investor')
        .populate('project');

        if(!data) return errorMessage(404,'No investement found');
        const projectInvestedIn = [];
        let totalInvestement = 0;
        // extract project title &  investement amount amount
        for (let index = 0; index < data.length; index++) {

            const {project:{title}, amount} = data[index];

            totalInvestement +=amount;

            !projectInvestedIn.includes(title) && projectInvestedIn.push(title); 
        }
    return successMessage(200, {
        totalInvestement:totalInvestement,
        projectInvestedIn,
    }); 
}

//consulter le portefeuille d’un porteur de projet (projets créés, montants levés)
const getOwnersWallet =async(projectOwner)=>{
   const projects = await Project.find({owner:projectOwner})
    .populate('owner');
    projects.map(async project=> {
        const projectId = project.id;
        const {amount} = await Investement.find({project:projectId}).populate('investor');
        console.log(amount)
    });
}

const adminDao = {
    getAllInvestors,
    getAllIProjectOwners,
    getInvestorsWallet,
    getOwnersWallet,
}

export default adminDao;