import authService from '../services/authService';
import {checkIsAuthJWT} from '../middleware/JWTAction';


let handleLoginAPI = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let data = await authService.handleUserLogin(email, password);
    if (data.errCode === 0) {
        res.cookie('token', data.token, { maxAge: 3600000, httpOnly: true });
    }
    return res.status(200).json(data);
   
}
let handleIsAuthAPI = async(req, res) => {
    let data = await checkIsAuthJWT(req, res);
    return res.status(200).json(data);
}
let handleSignupAPI = async(req, res) => {
    let data = req.body;
    let result = await authService.handleUserSignup(data);
    return res.status(200).json(result);
}
let handleLogoutAPI = async(req, res) => {
    try {
        let data = await res.clearCookie('token');
        return res.status(200).json({
            errCode: 0,
            message: 'Logout success'
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: 'Internal error'
        });
    }
}

module.exports = {
    handleSignupAPI: handleSignupAPI,
    handleLoginAPI: handleLoginAPI,
    handleIsAuthAPI: handleIsAuthAPI,
    handleLogoutAPI: handleLogoutAPI
}