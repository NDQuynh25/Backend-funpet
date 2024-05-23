import db from '../models/index';
import bookingService from './bookingService';
import userService from './userService';


let createNewHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            if (!data || !data.doctorId || !data.bookingId || !data.file) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters'
                });
            }
            else {
                let isDoctor = await checkDoctor(data.doctorId);
                let isBooking = await checkBooking(data.bookingId);
                let isBookinginHistory = await checkBookinginHistory(data.bookingId);
                if (!isDoctor) {
                    reData.errCode = 1;
                    reData.message = "The doctor is not exist";
                    reData.history = {};
                    resolve(reData);
                }
                else if (!isBooking) {
                    reData.errCode = 1;
                    reData.message = "The booking doesn't exist or hasn't been confirmed";
                    reData.history = {};
                    resolve(reData);
                }
                else if (isBookinginHistory) {
                    reData.errCode = 1;
                    reData.message = "The medical appointment is already in the medical history";
                    reData.history = {};
                    resolve(reData);
                }
                else {
                    let history = await db.History.create({
                        doctorId: data.doctorId,
                        bookingId: data.bookingId,
                        description: data.description,
                        file: data.file
                    });
                    if (history) {
                        reData.errCode = 0;
                        reData.message = "Save history success";
                        reData.history = history;
                        resolve(reData);
                    } else {
                        reData.errCode = 2;
                        reData.message = "Save history failed";
                        reData.history = {};
                        resolve(reData);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "The system error";
            reData.history = {};
            reject(reData);
            
        }
    });
}
let updateHistory = (data) => {
    console.log("data", data);
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            if (!data || !data.id || !data.doctorId || !data.bookingId || !data.file) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameters'
                });
            } else {
                let history = await db.History.findOne({
                    where: {
                        id: data.id
                    }
                });
                if (history) {
                    let isDoctor = await checkDoctor(data.doctorId);
                    let isBooking = await checkBooking(data.bookingId);
                    let isBookinginHistory = await checkBookinginHistory(data.bookingId);
                    if (!isDoctor) {
                        reData.errCode = 1;
                        reData.message = "The doctor is not exist";
                        reData.history = {};
                        resolve(reData);
                    }
                    else if (!isBooking) {
                        reData.errCode = 1;
                        reData.message = "The booking doesn't exist or hasn't been confirmed";
                        reData.history = {};
                        resolve(reData);
                    }
                    
                    else {
                        let history = await db.History.update({
                            doctorId: data.doctorId,
                            bookingId: data.bookingId,
                            description: data.description,
                            file: data.file
                        }, {
                            where: {
                                id: data.id
                            }
                        });
                        if (!history) {
                            reData.errCode = 1;
                            reData.message = "Update history failed";
                            reData.history = {};
                            resolve(reData);
                        } else {
                            reData.errCode = 0;
                            reData.message = "Update history success";
                            reData.history = history;
                            resolve(reData);
                        }
                    }
                    resolve(reData);
                } else {
                    reData.errCode = 1;
                    reData.message = "The history is not exist";
                    reData.history = {};
                    resolve(reData);
                }
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "The system error";
            reData.history = {};
            reject(reData);
            
        }

    });
}
let deleteHistory = async(data) => {
    try {
        if (!data || !data.id) {
            return {
                errCode: 1,
                message: 'Missing required parameters'
            };
        }
        let history = await db.History.findOne({
            where: {
                id: data.id
            }
        });
        if (history) {
            let history = await db.History.destroy({
                where: {
                    id: data.id
                }
            });
            if (!history) {
                return {
                    errCode: 1,
                    message: "Delete history failed"
                };
            } else {
                return {
                    errCode: 0,
                    message: "Delete history success"
                };
            }
        } else {
            return {
                errCode: 1,
                message: "The history is not exist"
            };
        }
    }
    catch (error) {
        console.log(error);
    }
}
let getAllHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            let history = await db.History.findAll();
            if (history) {
                reData.errCode = 0;
                reData.message = "Get history success";
                for (let i = 0; i < history.length; i++) {
                    let booking = await bookingService.handleGetBookingById(history[i].bookingId);
                    console.log("booking", booking);
                    if (booking && booking.errCode === 0) {
                        history[i].booking = booking.booking;
                    }
                    let doctor = await userService.handleGetUserById(history[i].doctorId);
                    if (doctor && doctor.errCode === 0) {
                        history[i].doctor = doctor.user;
                    }

                }
                reData.history = history;
                resolve(reData);
            } else {
                reData.errCode = 2;
                reData.message = "Get history failed";
                reData.history = {};
                resolve(reData);
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "The system error";
            reData.history = {};
            reject(reData);
            
        }
    });
}
let checkDoctor = async (doctorId) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            let doctor = await db.User.findOne({
                where: { 
                    id: doctorId, 
                    roleId: '3' 
                }
            });
            if (doctor) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            resolve(false);
            console.log(error);
        }
    });
}
let checkBooking = async (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Booking.findOne({
                where: {
                    id: bookingId,
                    status: '0'
                }
            });
            if (res) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch(error) {
            console.log(error);
            resolve(false); 
        }
    });
}
let checkBookinginHistory = async (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.History.findOne({
                where: {
                    bookingId: bookingId
                }
            });
            if (res) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch(error) {
            console.log(error);
            resolve(false); 
        }
    });
}


export default {
    createNewHistory: createNewHistory,
    getAllHistory: getAllHistory,
    updateHistory: updateHistory,
    deleteHistory: deleteHistory,

}