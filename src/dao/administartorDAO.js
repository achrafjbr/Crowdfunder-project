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
const getOwnersWallet1 =async(projectOwner)=>{
    

   const projects = await Project.find({owner:projectOwner}).populate('owner');
   const projectsData = projects.map(  project=>  ({id:project.id, title:project.title}));
    if(projectsData.length<=0)return errorMessage(404, "No data found");

    projectsData.map( async ({id,title}) =>  
    {
             await Investement.find({project:id}).populate('investor')
            .then((investors)=>{
                console.log('investors',investors);
                
                let amountCollected = 0;
                for (let index = 0; index < investors.length; index++) {
                    if(investors.length>0){
                amountCollected += investors[index].amount;
                projectAndAmountsCollected.push({project:title,amountCollected});
                    }
                

            console.log("projectAndAmountsCollected",projectAndAmountsCollected)
      
           } 
            });
           
    });
    
    return successMessage(200,data);
}


const getOwnersWallet = async (projectOwner) => {
  const projects = await Project.find({ owner: projectOwner }).lean();

  if (projects.length === 0) {
    return errorMessage(404, "No data found");
  }

  const result = await Promise.all(
    projects.map(async (project) => {
      const investments = await Investement
        .find({ project: project._id })
        .lean();

        console.log('Investement',investments);
        

      const amountCollected = investments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );

      return {
        projectId: project._id,
        title: project.title,
        amountCollected,
      };
    })
  );

  return successMessage(200, result);
};

const adminDao = {
    getAllInvestors,
    getAllIProjectOwners,
    getInvestorsWallet,
    getOwnersWallet,
}

export default adminDao;