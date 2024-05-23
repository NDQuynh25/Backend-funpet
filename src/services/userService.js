
import db from '../models/index';
import bcrypt from 'bcrypt';

let checkUserEmail = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail},
                raw: true,

            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

//CRUD
let handleGetUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId === null || userId === undefined) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter',
                });
            }
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            });
            if (user) {
                resolve({
                    errCode: 0,
                    message: 'OK',
                    user: user,
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User not found',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}
let handleGetUser =  async(userId) => {
    return new Promise(async (resolve, reject) => {
        let data = {}
        try {
            
            let user = ''
            if (userId === "ALL") {
                try {
                    user = await db.User.findAll({
                        raw: true,
                        attributes: {
                            exclude: ['password'] //get all attributes except password
                        }
                    });
                    data.errCode = 0;
                    data.message = 'OK';
                    data.user = user;
                } catch (error) {
                    data.errCode = 1;
                    data.message = 'Error from the database';
                    console.log(error);
                }
                
            }
            else if (userId !== null && userId !== undefined) { //get user by id, avoid null and undefind errors
                try {
                    user = await db.User.findOne({
                        where: {id: userId},
                        raw: true,
                        attributes: {
                            exclude: ['password']
                        }
                    })
                    data.errCode = 0;
                    data.message = 'OK';
                    data.user = user;
                } catch (error) {
                    data.errCode = 1;
                    data.message = 'Error from the database';
                    console.log(error);
                }
                
            }
            else {
                // return error if missing required parameter
                data.errCode = 1;
                data.message = 'Missing required parameter';
            }
            
            resolve(data)
        } catch (e) {
            reject(e);
        }
    });
}

let handleCreateNewUser = async(data) => {
    return new Promise (async (resolve, reject) => {
        let reData = {}
        if (!data || !data.email || !data.password || !data.confirmPassword) {
            reData.errCode = 1;
            reData.message = 'Do not leave email and password blank';
            resolve(reData);
        }
        else {
            if (data.password !== data.confirmPassword) {
                reData.errCode = 1;
                reData.message = 'Confirm password is not correct';
                resolve(reData);
            }
            else {
                try {
                    let checkEmail = await checkUserEmail(data.email);
                    if (checkEmail) {
                        reData.errCode = 2;
                        reData.message = 'Your email is already in used, please try another email';
                        resolve(reData);
                    }
                    else {
                        console.log(data);
                        let user = await db.User.create({
                            email: data.email,
                            password: await bcrypt.hashSync(data.password, 10),// hash password
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            gender: data.gender ,
                            roleId: data.roleId,
                            image: data.image,
                            description: data.description,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            
                        });
                        reData.errCode = 0;
                        reData.message = 'Create new user successfully';
                        delete user.dataValues.password;
                        reData.user = user;
                        resolve(reData);
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
     
    });
}
let handleUpdateUser = async(data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {}
        try {
            if (!data.id) {
                reData.errCode = 1;
                reData.message = `User doesn't exist`;
                resolve(reData);
            }
            else {
             
                try {
                    let checkId = await db.User.findOne({
                        where: {
                            id: data.id,
                        },
                        raw: true,
                       
                    });
                    if (checkId) {
                        try {
                            let user = await db.User.update({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                address: data.address,
                                phoneNumber: data.phoneNumber,
                                gender: data.gender,
                                roleId: data.roleId,
                                image: data.image,
                                description: data.description,
                                updatedAt: new Date(),
                            }, {
                                where: {id: data.id},
                            
                            });
                            if (user) {
                                let userData = await db.User.findOne({
                                    where: {id: data.id},
                                    raw: true,
                                });
                                if (userData) {
                                    delete userData.password;
                                    reData.user = userData;
                                    reData.errCode = 0;
                                    reData.message = 'Update user successfully';
                                    resolve(reData);
                                }
                                else {
                                    reData.errCode = 1;
                                    reData.message = 'Error from the database';
                                    resolve(reData);
                                }
                            }
                        }
                        catch (e) {
                            reData.errCode = 1;
                            reData.message = 'Error from the database';
                            console.log(e);
                            resolve(reData);
                        }
                        
                    }
                    else {
                        reData.errCode = 2;
                        reData.message = 'Cannot find user to update';
                        resolve(reData);
                    }

                } catch (e) {
                    reData.errCode = 1;
                    reData.message = 'Error from the database';
                    console.log(e);
                    resolve(reData);
                }
                
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
let handleDeleteUser = async(userId) => {
    return new Promise(async (resolve, reject) => {
        let reData = {}
        try {
            console.log(userId);
            if (!userId) {
                reData.errCode = 1;
                reData.message = 'Missing required parameter';
                resolve(reData);
            }
            else {
                let foundUser = await db.User.findOne({ //Check if the user exists
                    where: {id: userId},
                    raw: true,
                });
                if (foundUser) {
                    await db.User.destroy({
                        where: {id: userId},
                        
                    });
                    reData.errCode = 0;
                    reData.message = 'Delete user successfully';
                    resolve(reData);
                }
                else {
                    reData.errCode = 2;
                    reData.message = 'Cannot find user to delete';
                    resolve(reData);
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
   
    //CRUD
    handleGetUserById: handleGetUserById,
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
}