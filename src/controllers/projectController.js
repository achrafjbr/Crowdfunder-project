import projectService from '../services/projectService.js';

const addProject= async(request, response)=>{
    try {
        const project = request.body;
        const {id} = request.user;
        console.log('id',id);
        
        const result = await projectService.addProject({...project, owner:id});
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json({ 
            statusCode: 500,
            message: error.message,
    });
    }
}
const deleteProject=async(request, response)=>{
   const {id} = request.query;
  try {
    const result = await projectService.deleteProject(id);
    return response.status(result.statusCode).json(result); 
  } catch (error) {
    return response.status(500).json({ 
            statusCode: 500,
            message: error.message,
    });
  }

}
const modifyProject= async(request, response)=>{
    const result = await projectService.modifyProject()
}



const getProjects=(request, response)=>{
    projectService.getProjects();
}

const getProjectInvestors=(request, response)=>{
    projectService.getProjectInvestors();
}


export {
    addProject,
    modifyProject,
    deleteProject,
    getProjectInvestors,
    getProjects,
}
