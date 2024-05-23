import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import ClinicController from '../controllers/clinicController';
import bookingController from '../controllers/bookingController';
import historyController from '../controllers/historyController';
import fileController from '../controllers/fileController';
import {checkUserJWT, } from '../middleware/JWTAction';



const router = express.Router();


// const checkUserLogin = (req, res, next) => {
//     if (!req.cookies.token) {
//         return res.status(401).json({
//             errCode: 1,
//             message: 'Unauthorized'
//         });
//     }
//     next();
// }

let initWebRoutes = (app) => {
    // router.get("/", homeController.getHomePage);
    // router.get("/create-user", homeController.getSignUpPage);
    // router.post("/post-info-user", homeController.postSignUp);
    // router.get("/get-info-user", homeController.getUserInfo);
    // router.get("/edit-CRUD/", homeController.getEditUser);
    // router.post("/put-CRUD", homeController.putUser);
    // router.get("/delete-CRUD", homeController.deleteUser);
    //Auth
    router.post("/api/login", authController.handleLoginAPI);
    router.post("/api/authentication", authController.handleIsAuthAPI);
    router.post("/api/signup", authController.handleSignupAPI);
    router.post("/api/logout", authController.handleLogoutAPI);
    //User
    router.get("/api/get-user", userController.handleGetUserByIdAPI);
    router.get("/api/get-all-users", userController.handleGetAllUsersAPI);
    router.put("/api/update-user", userController.handleUpdateUserAPI);
    router.delete("/api/delete-user", userController.handleDeleteUserAPI);
    router.post("/api/create-new-user", userController.handleCreateNewUserAPI);
    //Clinic
    router.get("/api/get-clinic", ClinicController.handleGetClinicByIdAPI);
    router.get("/api/get-all-clinics", ClinicController.handleGetAllClinicsAPI);
    router.post("/api/add-new-clinic", ClinicController.handleAddClinicAPI);
    router.delete("/api/delete-clinic", ClinicController.handleDeleteClinicAPI);
    router.put("/api/update-clinic",ClinicController.handleUpdateClinicAPI);
    //Booking
    router.get("/api/get-booking", bookingController.handleGetBookingByIdAPI);
    router.get("/api/get-all-bookings", bookingController.handleGetAllBookingsAPI);
    router.get("/api/get-booking-by-customer-id", bookingController.handleGetBookingByCustomerIdAPI);
    
    router.post("/api/add-booking", bookingController.handleAddBookingAPI);
    router.post("/api/search-booking", bookingController.handleSearchBookingAPI);

    router.put("/api/update-booking", bookingController.handleUpdateBookingAPI);
    router.delete("/api/delete-booking", bookingController.handleDeleteBookingAPI);
    //History
    router.post("/api/add-history", historyController.handleAddHistoryAPI);
    router.get("/api/get-all-history", historyController.handleGetAllHistoryAPI);
    router.put("/api/update-history", historyController.handleUpdateHistoryAPI);
    router.delete("/api/delete-history", historyController.handleDeleteHistoryAPI);

    //Upload file
    router.post("/api/upload-file", fileController.handleUploadFileAPI);

    
    return app.use("/", router);


}
module.exports = initWebRoutes;

