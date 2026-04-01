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

const getProjects=async(_, response)=>{
   try {
     const result = await projectService.getProjects();
    return response.status(result.statusCode).json(result); 
   } catch (error) {
    response.status(500).json({ 
            statusCode: 500,
            message: error.message,
    });
   }
}


const deleteProject=async(request, response)=>{
   const {id} = request.params;
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
    const {id} = request.params;
    const body = request.body;
    console.log(id);
    console.log(body);
    
  try {
    const result = await projectService.modifyProject(id,body)
    return response.status(result.statusCode).json(result); 
   } catch (error) {
    response.status(500).json({ 
            statusCode: 500,
            message: error.message,
    });
   }
}

const getProjectInvestors=async(request, response)=>{
    const {id} = request.params; // [id] project id
    try {
        const result = await projectService.getProjectInvestors(id);
        return response.status(result.statusCode).json(result); 
    } catch (error) {
         response.status(500).json({ 
            statusCode: 500,
            message: error.message,
    });
    }
}


export {
    addProject,
    modifyProject,
    deleteProject,
    getProjectInvestors,
    getProjects,
}
