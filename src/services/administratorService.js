import adminDao from "../dao/administartorDAO.js";



const getAllInvestors =async()=>
    await adminDao.getAllInvestors();

const getAllIProjectOwners =async()=>await adminDao.getAllIProjectOwners();

const getInvestorsWallet =async(investorId)=>
    await adminDao.getInvestorsWallet(investorId);

const getOwnersWallet =async(ownerId)=>
    await adminDao.getOwnersWallet(ownerId);



const adminService = {
    getAllInvestors,
    getAllIProjectOwners,
    getInvestorsWallet,
    getOwnersWallet,
}

export default adminService;