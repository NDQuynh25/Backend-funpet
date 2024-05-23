require('dotenv').config();
import jwt from 'jsonwebtoken';


const createJWT = (payload) => {
    
    let key = process.env.JWT_SECRET;
    let expiresIn = process.env.JWT_EXPIRES_IN;

    let token = null;
    //create token
    try {
        token = jwt.sign(payload, key, {expiresIn: expiresIn});
    } catch (error) {
        console.log(error);
    }
    
    console.log(token);
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    //verify token
    try {
        
        let decoded = jwt.verify(token, key);
        data = decoded;
    }
    catch (error) {
        console.log(error);
    }
    return data;
}
const checkIsAuthJWT = (req, res, next) => {
    let data = {isAuthenticated: false}
    try {
        let cookies = req.cookies;
        
        if (cookies && cookies.token) {
            let token = cookies.token;
            let decoded = verifyToken(token);
            console.log("decoded", decoded);
            if (decoded) {
                data.isAuthenticated = true;
                data.data = decoded;
                data.errCode = 0;
                data.message = "Authorized";
            }
            else {
                data.user = {};
                data.errCode = 1;
                data.message = "Your login session has ended, please log in again";
            }
        } else {
            data.user = {};
            data.errCode = 1;
            data.message = "Your login session has ended, please log in again";
        }
    } catch (error) {
        console.log(error);
        data.errCode = 1;
        data.message = "Your login session has ended, please log in again";
    }
    return data;
    
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.token) {
       
        let decoded = verifyToken(token);
        if (decoded) {
            console.log("decoded", decoded);
            next();
        }
        else {
            console.log('Not authorized to access this resource');
            return res.status(401).json({
                errCode: 1,
                message: 'Not authorized to access this resource'
            });
        }
    } else {
        console.log('Unauthorized');
        return res.status(401).json({
            errCode: 1,
            message: 'Unauthorized'
        });
    
    }
    
}





module.exports = {
    createJWT : createJWT,
    verifyToken : verifyToken,
    checkUserJWT : checkUserJWT,
    checkIsAuthJWT : checkIsAuthJWT

}