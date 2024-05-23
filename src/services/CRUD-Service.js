import bcrypt from 'bcrypt';
import db from '../models/index';
const saltRounds = 10;
let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.User.create({
                email: data.email,
                password: await hashPassword(data.password),
                fullName: data.fullName,
                address: data.address,  
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            
            resolve(console.log('Create a new user successfully'));
        } catch (error) {   
            reject(error);
        }
    });
    
}
let getUserInfo = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true,
               
            });
            resolve(data);

        } catch (error) {
            reject(error);
        }
    });
}
let getUserInfoById = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {id: userId},
                raw: true,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}
let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.User.update({
                fullName: data.fullName,
                address: data.address,  
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            }, {
                where: {id: data.id}
            }); 
            resolve('Update user successfully');
        } catch (error) {
            reject(error);
        }
    });  
}
let deleteUserData = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: {id: userId}
            });
            resolve('Delete user successfully');
        } catch (error) {
            reject(error);
        }
    });
}
let hashPassword = (password) => {
    return new Promise( async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
    
}
module.exports = {
    createNewUser: createNewUser,
    getUserInfo: getUserInfo,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
    hashPassword: hashPassword,
}