import db from '../models/index';
import clinicService from './clinicService';
import userService from './userService';
const { Op } = require('sequelize');


let handleGetAllBooking = async() => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        try {
            let data = await db.Booking.findAll();
            if (!data) {
                reData.errCode = 1;
                reData.message = "Get all booking failed";
                reData.booking = {}
                resolve(reData);
            }
            else {
                reData.errCode = 0;
                reData.message = "Get all booking success";
                for (let i = 0; i < data.length; i++) {
                    let clinic = await clinicService.getClinicById(data[i].clinicId);
                    let customer = await userService.handleGetUserById(data[i].customerId);
                    data[i].clinic = clinic.clinic;
                    data[i].customer = customer.user;
                }
                reData.booking = data;
                resolve(reData);
            }
        } catch (error) {
            console.log(error);

            reData.errCode = 1;
            reData.message = "Get all booking failed";
            reData.booking = {};
            resolve(reData);
            
        }
    });
}

let handleGetBookingById = (id) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!id) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.booking = {};
            resolve(reData);
        }
        try {
            let data = await db.Booking.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (!data) {
                reData.errCode = 1;
                reData.message = "Booking doesn't exist";
                reData.booking = {};
                resolve(reData);
            } else {
                reData.errCode = 0;
                reData.message = "Get booking success";
                
                let clinic = await clinicService.getClinicById(data.clinicId);
                let customer = await userService.handleGetUserById(data.customerId);
                data.clinic = clinic.clinic;
                data.customer = customer.user;
                reData.booking = data;
                resolve(reData);
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "Get booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });
}

let handleAddBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!data || !data.status || !data.customerId || !data.clinicId || !data.bookingDate || !data.description) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.booking = {};
            resolve(reData);
        }
        try {
            console.log("checkCustomerId: ", checkCustomerId(data.customerId));
            let isCustomer = await checkCustomerId(data.customerId);
            let isClinic = await checkClinicId(data.clinicId);
            if (isCustomer == false) {
                reData.errCode = 1;
                reData.message = "Customer doesn't exist";
                reData.booking = {};
                resolve(reData);
            }
            else if (isClinic == false) {
                reData.errCode = 1;
                reData.message = "Clinic doesn't exist";
                reData.booking = {};
                resolve(reData);
            } else {
                let booking = await db.Booking.create({
                    status: data.status,
                    customerId: data.customerId,
                    clinicId: data.clinicId,
                    bookingDate: data.bookingDate,
                    description: data.description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                if (!booking) {
                    reData.errCode = 1;
                    reData.message = "Add booking failed";
                    reData.booking = {};
                    resolve(reData);
                }
                reData.errCode = 0;
                reData.message = "Add booking success";
                reData.booking = booking;
                resolve(reData);
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 1;
            reData.message = "Add booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });
}
let handleUpdateBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        console.log("data: ", data);
        if (!data || !data.id || !data.status || !data.customerId || !data.clinicId || !data.bookingDate || !data.description) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.booking = {};
            resolve(reData);
        }
        try {
            let checkId = await db.Booking.findOne({
                where: {
                    id: data.id,
                },
            });
            if (checkId) {
                let isCustomer = await checkCustomerId(data.customerId);
                let isClinic = await checkClinicId(data.clinicId);
                if (isCustomer) {
                    if (isClinic) {
                        let booking = await db.Booking.update({
                            status: data.status,
                            customerId: data.customerId,
                            clinicId: data.clinicId,
                            bookingDate: data.bookingDate,
                            description: data.description,
                            updatedAt: new Date(),
                        }, {
                            where: {
                                id: data.id,
                            },
                        });
                        if (!booking) {
                            reData.errCode = 2;
                            reData.message = "Update booking failed";
                            reData.booking = {};
                            resolve(reData);
                        } else {
                            reData.errCode = 0;
                            reData.message = "Update booking success";
                            reData.booking = booking;
                            resolve(reData);
                        }
                    } else {
                        reData.errCode = 1;
                        reData.message = "Clinic doesn't exist";
                        reData.booking = {};
                        resolve(reData);
                    }
                } else {
                    reData.errCode = 1;
                    reData.message = "Customer doesn't exist";
                    reData.booking = {};
                    resolve(reData);
                }
            } else {
                reData.errCode = 1;
                reData.message = "Booking doesn't exist";
                reData.booking = {};
                resolve(reData);
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "Update booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });
}

let handleDeleteBooking = (id) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!id) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.booking = {};
            resolve(reData);
        }
        try {
            let checkId = await db.Booking.findOne({
                where: {
                    id: id,
                },
            });
            if (checkId) {
                let booking = await db.Booking.destroy({
                    where: {
                        id: id,
                    },
                });
                if (!booking) {
                    reData.errCode = 2;
                    reData.message = "Delete booking failed";
                    reData.booking = {};
                    resolve(reData);
                } else {
                    reData.errCode = 0;
                    reData.message = "Delete booking success";
                    reData.booking = booking;
                    resolve(reData);
                }
            } else {
                reData.errCode = 1;
                reData.message = "Booking doesn't exist";
                reData.booking = {};
                resolve(reData);
            }
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "Delete booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });
}

let checkClinicId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (clinic) {
                console.log("checkClinicId: ", true)
                resolve(true);
            }
            else {
                console.log("checkClinicId: ", false)
                resolve(false);
            }
        } catch (error) {
            console.log(error);
            resolve(false);
        }
    });
}
let checkCustomerId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: id,
                },
                raw: true,
            });
            if (user) {
                console.log("checkCustomerId: ", true)
                resolve(true);
            }
            else {
                console.log("checkCustomerId: ", false)
                resolve(false);
            }
        } catch (error) {
            console.log(error);
            resolve(false);
        }
    });
}
let handleSearchBooking = (customerId, startTime, endTime, status, clinicId) => {
    
    return new Promise(async (resolve, reject) => {
        let whereCondition = {
        };
        if (customerId !== "" && customerId !== undefined && customerId !== null) {
            whereCondition.customerId = customerId;
        }
        if (startTime !== "" && startTime !== undefined && startTime !== null) {
            if (whereCondition.bookingDate !== undefined) {
                whereCondition.bookingDate[Op.gte] = startTime;
            } else {
                whereCondition.bookingDate = {
                    [Op.gte]: startTime,
                };
            }
           
        }
        if (endTime !== "" && endTime !== undefined && endTime !== null) {
            if (whereCondition.bookingDate !== undefined) {
                whereCondition.bookingDate[Op.lte] = endTime;
            } else {
                whereCondition.bookingDate = {
                    [Op.lte]: endTime,
                };
            }
        }
        
        if (status !== "" && status !== undefined && status !== null && status !== "ALL") {
            whereCondition.status = status;
        }
        if (clinicId !== "" && clinicId !== undefined && clinicId !== null && clinicId !== "ALL") {
            whereCondition.clinicId = clinicId;
        }

        
        let reData = {};
        try {
            let data = await db.Booking.findAll({
                where: whereCondition,
            });
            if (!data) {
                reData.errCode = 1;
                reData.message = "Search booking failed";
                reData.booking = {};
                resolve(reData);
            } else {

                reData.errCode = 0;
                reData.message = "Search booking success";
                for (let i = 0; i < data.length; i++) {
                    try {
                        let clinic = await clinicService.getClinicById(data[i].clinicId);
                        data[i].clinic = clinic.clinic;
                    } catch (error) {
                        console.log(error);
                        reData.errCode = 2;
                        reData.message = "Search booking failed";
                        reData.booking = {};
                        resolve(reData);
                    }
                }
                reData.booking = data;
                console.log("data: ", data);
                resolve(reData);
            }
           
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "Search booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });

} 

let handleGetBookingByCustomerId = (id) => {
    return new Promise(async (resolve, reject) => {
        let reData = {};
        if (!id) {
            reData.errCode = 1;
            reData.message = "Missing required parameter";
            reData.booking = {};
            resolve(reData);
        }
        try {
            let data = await db.Booking.findAll({
                where: {
                    customerId: id,
                },
                raw: true,
            });
            if (!data) {
                reData.errCode = 1;
                reData.message = "Booking doesn't exist";
                reData.booking = {};
                resolve(reData);
            } else {
                reData.errCode = 0;
                reData.message = "Get booking success";
                for (let i = 0; i < data.length; i++) {
                    try {
                        let clinic = await clinicService.getClinicById(data[i].clinicId);
                        data[i].clinic = clinic.clinic;
                    
                    } catch (error) {
                        console.log(error);
                        reData.errCode = 2;
                        reData.message = "Get booking failed";
                        reData.booking = {};
                        resolve(reData);
                    }
                }
                reData.booking = data;
                resolve(reData);
            }
            
        } catch (error) {
            console.log(error);
            reData.errCode = 2;
            reData.message = "Get booking failed";
            reData.booking = {};
            resolve(reData);
        }
    });
}


export default {
    handleGetAllBooking: handleGetAllBooking,
    handleGetBookingById: handleGetBookingById,
    handleAddBooking: handleAddBooking,
    handleUpdateBooking: handleUpdateBooking,
    handleDeleteBooking: handleDeleteBooking,
    handleSearchBooking: handleSearchBooking,
    handleGetBookingByCustomerId: handleGetBookingByCustomerId,


}