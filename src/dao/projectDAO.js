import Project from '../models/Project.js'


const addProject= async(project)=> await Project.create(project);


const deleteProject= async(id)=>await Project.findOneAndDelete({_id:id});

const getProjects=async()=>await Project.find();

const modifyProject=()=>{}
const getProjectInvestors=()=>{}

 const projectDao ={
    addProject,
    modifyProject,                                                                                                                                                                                                                                             
    deleteProject,
    getProjects,
    getProjectInvestors,
 }

 export default projectDao;