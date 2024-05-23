import userService from '../services/userService';
let handleGetUserByIdAPI = async(req, res) => {
    try {
        let userId = req.body.id;
        console.log(userId);
        let data = await userService.handleGetUserById(userId);
        return res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
let handleGetAllUsersAPI = async(req, res) => {
    let userId = req.query.id;
    console.log(userId);
  
    let data = await userService.handleGetUser(userId);
    return res.status(200).json(data);
}
let handleUpdateUserAPI = async(req, res) => {
    let data = req.body;
    console.log(data);
    let result = await userService.handleUpdateUser(data);
    return res.status(200).json(result);
}
let handleDeleteUserAPI = async(req, res) => {
    let userId = req.body.id;
    console.log(req.body);
    let result = await userService.handleDeleteUser(userId);
    return res.status(200).json(result);
}
let handleCreateNewUserAPI = async(req, res) => {
    let data = req.body;
    console.log(data);
    let result = await userService.handleCreateNewUser(data);

    return res.status(200).json(result);
}
module.exports = {
    handleGetUserByIdAPI: handleGetUserByIdAPI,
    handleGetAllUsersAPI: handleGetAllUsersAPI,
    handleUpdateUserAPI: handleUpdateUserAPI,
    handleDeleteUserAPI: handleDeleteUserAPI,
    handleCreateNewUserAPI: handleCreateNewUserAPI,

}