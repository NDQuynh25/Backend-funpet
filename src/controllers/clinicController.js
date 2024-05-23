
import clinicService from '../services/clinicService';


let handleGetClinicByIdAPI = async (req, res) => {
    try {
        let id = req.query.id;
        
        let result = await clinicService.getClinicById(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

let handleGetAllClinicsAPI = async (req, res) => {
    try {
        let result = await clinicService.getAllClinics();
        
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


let handleAddClinicAPI = async (req, res) => {

    try {
        
        let data = req.body;
        let result = await clinicService.addClinic(data);
        // Trả về kết quả cho client
        return res.status(200).json(result);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    
}




let handleDeleteClinicAPI = async (req, res) => {
    try {
        let id = req.body.id;
        console.log("Delete Clinic ID: ", id);
        let result = await clinicService.deleteClinic(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
let handleUpdateClinicAPI = async (req, res) => {
    
    try {
        let data = req.body;
        console.log("Update Clinic Data: ", data)
        let result = await clinicService.updateClinic(data);
        
        return res.status(200).json(result);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    
}

module.exports = {
    handleGetClinicByIdAPI: handleGetClinicByIdAPI,
    handleGetAllClinicsAPI: handleGetAllClinicsAPI,
    handleAddClinicAPI: handleAddClinicAPI,
    handleDeleteClinicAPI: handleDeleteClinicAPI,
    handleUpdateClinicAPI: handleUpdateClinicAPI
}