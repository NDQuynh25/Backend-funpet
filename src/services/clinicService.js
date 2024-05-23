
import db from '../models/index';


let getClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (id == null || id == undefined) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.clinic = {};
            resolve(reData);
        }
        else {
            try {
                let clinic = await db.Clinic.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                });
                if (clinic) {
                    reData.errCode = 0;
                    reData.message = "Get clinic success";
                    reData.clinic = clinic;
                    resolve(reData);
                    
                }
                else {
                    console.log('clinic:', clinic);
                    reData.errCode = 1;
                    reData.message = "Clinic doesn't exist";
                    reData.clinic = {};
                    resolve(reData);
                }
            } catch (error) {
                reject(error);
            }
        }
    })
}
let getAllClinics = () => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            let data = await db.Clinic.findAll();
            if (!data) {
                reData.errCode = 1;
                reData.message = "Get all clinics failed";
                reData.clinic = {}
                resolve(reData);
            }
            reData.errCode = 0;
            reData.message = "Get all clinics success";
            reData.clinic = data;
            resolve(reData);
        } catch (error) {
            reject(error);
        }
    });
}
let addClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        console.log('Data from client: ', data);

        // Kiểm tra xem các thông tin cần thiết đã được cung cấp chưa
        if (!data.clinicName || !data.address || !data.status || !data.image || !data.license) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.clinic = {};
            resolve(reData);
            return;
        }
        try {
            // Tạo người dùng mới trong cơ sở dữ liệu
            let clinic = await db.Clinic.create({
                name: data.clinicName,
                address: data.address,
                description: data.description,
                status: data.status,
                image: data.image,
                license: data.license,
                createdAt: new Date(),
                updatedAt: new Date()
            }, { raw: true });
            
            if (!clinic) {
                reData.errCode = 2;
                reData.message = "Error adding clinic";
                reData.clinic = {};
                resolve(reData);
            }
            reData.errCode = 0;
            reData.message = "Add clinic success";
            reData.clinic = clinic;
            resolve(reData);
        } catch (error) {
            console.log('Error adding clinic:', error);
            reData.errCode = 2;
            reData.message = "Error adding clinic";
            reData.clinic = {};
            resolve(reData);
        }
    });
}

let deleteClinic = (id) => {
    
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!id) {
            resolve({
                errCode: 1,
                errMessage: "Missing required parameter"
            });
        }
        else {
            try {
                let checkClinic = await db.Clinic.findOne({
                    where: {
                        id: id,
                    },
                    raw: true, 
                });
                if (checkClinic) {
                    try {
                        let clinic = await db.Clinic.destroy({
                            where: { id: id }
                        });
                        if (clinic) {
                            reData.errCode = 0;
                            reData.message = "Delete clinic success";
                            let res = await fileService.handleDeleteFile(checkClinic.image);
                            console.log('res:', res);
                            resolve(reData);
                        }
        
                  
                    } catch (error) {
                        reject(error);
                    }
                }
            } catch (error) {
                reject(error);
            }
            
            
            
        }
    });
}
let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!data.id) {
            reData.errCode = 1;
            reData.message = `Clinic doesn't exist`;
            resolve(reData);
        }
        else {
            try {
                let checkId = await db.Clinic.findOne({
                    where: {
                        id: data.id,
                    },
                    raw: true, 
                });
                if (checkId) {
                    try {
                        if (!data.clinicName || !data.address || !data.status || !data.image || !data.license) {
                            reData.errCode = 1;
                            reData.message = "Missing required parameter";
                            resolve(reData);
                        }
                        else {
                            let t = await db.sequelize.transaction();
                            try {
                                let clinic = await db.Clinic.update({
                                    name: data.clinicName,
                                    address: data.address,
                                    description: data.description,
                                    status: data.status,
                                    image: data.image,
                                    license: data.license,
                                    updatedAt: new Date()
                                }, {
                                    where: { id: data.id }
                                }, { 
                                    transaction: t 
                                });

                                if (!clinic) {
                                    t.rollback();
                                    reData.errCode = 2;
                                    reData.message = "Update clinic failed";
                                    resolve(reData);
                                }
                               
                                t.commit();
                                reData.errCode = 0;
                                reData.message = "Update clinic success";
                                resolve(reData);
                                

                            } catch (error) {
                                t.rollback();
                                reData.errCode = 2;
                                reData.message = "Update clinic failed";
                                resolve(reData);
                            }
                            
                        }
                    } catch (error) {
                        console.log('Error update clinic:', error);
                        reData.errCode = 2;
                        reData.message = "Update clinic failed";
                        resolve(reData);

                    }
                }
                else {
                    reData.errCode = 1;
                    reData.message = "Clinic doesn't exist";
                    resolve(reData);
                }
            } catch (error) {
                console.log('Error update clinic:', error);
                reData.errCode = 2;
                reData.message = "Update clinic failed";
                resolve(reData);
            }
        }
    });
}

export default {
    getClinicById: getClinicById,
    getAllClinics: getAllClinics,
    addClinic: addClinic,
    deleteClinic: deleteClinic,
    updateClinic: updateClinic
}
