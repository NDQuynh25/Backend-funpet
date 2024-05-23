import db from '../models/index';
import bcrypt from 'bcrypt';

import JWTAction from '../middleware/JWTAction';





const handleUserLogin = (email, password) => {
    let userData = {};
    
    return new Promise(async(resolve, reject) => {
        try {
            if (!email || !password) {
                userData.errCode = 1;
                userData.message = 'Missing input parameter';
                userData.token = null;
                userData.user = null;
                resolve(userData);
            }
            else {
                // check email
                let user = await db.User.findOne({
                    
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    // check password
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        // login success, create token
                        
                        let token = JWTAction.createJWT({
                            id: user.id,
                            email: user.email,
                            roleId: user.roleId,
                            isAuthenticated: true,
                            
                        });
                        
                        userData.errCode = 0;
                        userData.message = 'Login success';
                        userData.token = token;

                        
                        // delete password before return data
                        delete user.password;
                        userData.user = user;
                        
                        resolve(userData);
                    }
                    else {
                        userData.errCode = 2;
                        userData.message = 'Wrong password';
                        userData.token = null;
                        userData.user = null;
                        resolve(userData);
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = 'Email not found';
                    userData.token = null;
                    userData.user = null;
                    resolve(userData);
                }
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
const handleAutoLogin = (token) => {
    let userData = {};
    return new Promise(async(resolve, reject) => {
        try {
            if (!token) {
                userData.errCode = 1;
                userData.message = 'Missing token';
                userData.user = null;
                resolve(userData);
            } else {
                let decoded = JWTAction.verifyToken(token);
                if (decoded && decoded.email) {
                    let user = await db.User.findOne({
                        attributes: {
                            exclude: ['password']
                        
                        },
                        where: {email: decoded.email},
                        raw: true,
                    });
                    if (user) {
                        userData.errCode = 0;
                        userData.message = 'Login success';
                        userData.user = user;
                        resolve(userData);
                    } else {
                        userData.errCode = 2;
                        userData.message = 'User not found';
                        userData.user = null;
                        resolve(userData);
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = 'Invalid token';
                    userData.user = null;
                    resolve(userData);
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}




let handleUserSignup = (data) => {
    let userData = {};
    return new Promise(async(resolve, reject) => {
        try {
            console.log(data);
            if (!data.email || !data.password || !data.name) {
                userData.errCode= 1;
                userData.message= 'Missing required parameter';
                resolve(userData);
            } else {
                let check = await checkUserEmail(data.email);
                if (check === true) {
                    userData.errCode= 2;
                    userData.message= 'Your email is already in used, please try another email';
                    resolve(userData);
                    
                } else {
                    let hashPassword = await bcrypt.hashSync(data.password, 10); // hash password
                    await db.User.create({
                        email: data.email,
                        password: hashPassword,
                        lastName: data.name,
                    });
                    let user = await db.User.findOne({
                        attributes: ['email', 'roleId', 'lastName', 'createdAt', 'updatedAt'],
                        where: {email: data.email},
                        raw: true,
                    });
                    if (user) {
                        userData.errCode= 0;
                        userData.message= 'Registered successfully';
                        userData.user = user;
                        userData.token = 
                        resolve(userData);
                    } else {
                        userData.
                        resolve({
                            errCode: 3,
                            message: 'Registration failed',
                        });
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

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
module.exports = {
    handleUserLogin: handleUserLogin,
    handleAutoLogin: handleAutoLogin,
    handleUserSignup: handleUserSignup,
}