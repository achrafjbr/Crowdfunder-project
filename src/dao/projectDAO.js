import Investement from '../models/Investement.js';
import Project from '../models/Project.js'


const addProject= async(project)=> await Project.create(project);


const deleteProject= async(id)=>await Project.findOneAndDelete({_id:id});

const getProjects=async()=>await Project.find();

const modifyProject=(id,body)=>Project.findByIdAndUpdate(id,body,{new:true});

// consulter la liste des investisseurs d’un projet avec (nom, montant investie, pourcentage du capital)
const getProjectInvestors=(id)=>Investement.find({project:id}).populate('investor');

 const projectDao ={
    addProject,
    modifyProject,                                                                                                                                                                                                                                             
    deleteProject,
    getProjects,
    getProjectInvestors,
 }

 export default projectDao;