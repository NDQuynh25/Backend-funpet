
import db from "../models/index.js";
import CRUDServices from "../services/CRUD-Service.js";

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("home.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
    
};
let getSignUpPage = (req, res) => {
    return res.render("signup.ejs");
};
let postSignUp = async (req, res) => {
    await CRUDServices.createNewUser(req.body);
    return res.send("Post SignUp");
}
let getUserInfo = async (req, res) => {
    let data = await CRUDServices.getUserInfo();
    console.log(data);
    return res.render("display-get-users.ejs", { 
        dataUser: data
    });
}
let getEditUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        
        return res.render("edit-user.ejs", {
            userData: userData
        });
    } else {
        console.log("User not found");
        return res.send("User not found");
    }
}
let putUser = async (req, res) => {
    await CRUDServices.updateUserData(req.body);
    let data = await CRUDServices.getUserInfo();
    return res.render("display-get-users.ejs", {
        dataUser: data
    });

}
let deleteUser = async (req, res) => {
    await CRUDServices.deleteUserData(req.query.id);
    let data = await CRUDServices.getUserInfo();
    return res.render("display-get-users.ejs", {
        dataUser: data
    });
}

module.exports = {
    getHomePage: getHomePage,
    getSignUpPage: getSignUpPage,
    postSignUp: postSignUp,
    getUserInfo: getUserInfo,
    getEditUser: getEditUser,
    putUser: putUser,
    deleteUser: deleteUser,
};