import projectDao from '../dao/projectDAO.js'
import { DIMessage, ErrorMessage, SuccessMessage } from '../utils/error.js';
import { errorMessage, successMessage } from '../utils/error.js';

const addProject= async (project)=>{
    const projectData = await projectDao.addProject(project);
        if(!projectData){return errorMessage(500,'Something went wrong, try again');}
    else{return successMessage(201,projectData);}
}

const deleteProject= async(id)=>{
    const projectData = await projectDao.deleteProject(id);
    if(!projectData){return errorMessage(500,'Something went wrong, try again');}
    else{return successMessage(200,projectData);}
    

}

const getProjects=async()=>{
  const projectData  = await projectDao.getProjects();
    if(!projectData){return errorMessage(404,'No project found');}
    else{return successMessage(200,projectData);}
}

const modifyProject= async(id,body)=>{
    const projectData = await  projectDao.modifyProject(id,body);
    if(!projectData){return errorMessage(500,'Something went wrong, try again...');}
    else{return successMessage(200,projectData);}
}
const getProjectInvestors=async(id)=>{
  const projectData = await  projectDao.getProjectInvestors(id);
    if(!projectData){return errorMessage(400,[]);}
    else{return successMessage(200,projectData);}
}


const prjectService = {
 addProject,
 modifyProject,
 deleteProject,
 getProjects,
 getProjectInvestors,
}
export default prjectService