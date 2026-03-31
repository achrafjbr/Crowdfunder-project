import projectDao from '../dao/projectDAO.js'
import { DIMessage, ErrorMessage, SuccessMessage } from '../utils/error.js';

const addProject= async (project)=>{
    console.log('project',project);
    
    const projectData = await projectDao.addProject(project);
    if(!projectData)
        return new DIMessage()
    .message(new ErrorMessage(500,'Something went wrong, try again'));

    return new DIMessage().message(new SuccessMessage(201,'Success',projectData));
}

const deleteProject= async(id)=>{
    const projectData = await projectDao.deleteProject(id);
    if(!projectData)
        return new DIMessage()
    .message(new ErrorMessage(500,'Something went wrong, try again'));
    return new DIMessage().message(new SuccessMessage(200,'Success',projectData));
}
const getProjects=()=>{projectDao.getProjects();}

const modifyProject= async()=>{
   projectDao.modifyProject();
}
const getProjectInvestors=()=>{projectDao.getProjectInvestors();}


const prjectService = {
 addProject,
 modifyProject,
 deleteProject,
 getProjects,
 getProjectInvestors,
}
export default prjectService