
import { response } from "express";
import adminService from "../services/administratorService.js"

const getAllInvestors =async(_, response)=>{
    try {
       const result = await adminService.getAllInvestors();
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

const getAllIProjectOwners =async(_,response)=>{
    try {
        const result = await adminService.getAllIProjectOwners();
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

const getInvestorsWallet =async(request,response)=>{
    const investorId = request.params.id;
    console.log(investorId);
    
    try {
     const result = await adminService.getInvestorsWallet(investorId);
        return response.status(result.statusCode).json(result);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

const getOwnersWallet =async(request,response)=>{
        const ownerId = request.params.id;
        console.log('ownerId',ownerId);
        
        try {
          const result = await adminService.getOwnersWallet(ownerId);
            return response.status(result.statusCode).json(result);
        } catch (error) {
            return response.status(500).json(error.message);
        }
}




const adminController = {
    getAllInvestors,
    getAllIProjectOwners,
    getInvestorsWallet,
    getOwnersWallet,
}

export default adminController;