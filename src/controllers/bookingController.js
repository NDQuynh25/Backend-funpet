import bookingService from "../services/bookingService";

let handleGetAllBookingsAPI = async (req, res) => {
    try {
        let result = await bookingService.handleGetAllBooking();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

let handleGetBookingByIdAPI = async (req, res) => {
    try {
        let id = req.body.id;
        let result = await bookingService.handleGetBookingById(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

let handleAddBookingAPI = async (req, res) => {
    try {
        let data = req.body;
        console.log('bookingController: ', data);
        let result = await bookingService.handleAddBooking(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
let handleUpdateBookingAPI = async (req, res) => {
    try {
        let data = req.body;
        let result = await bookingService.handleUpdateBooking(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
let handleDeleteBookingAPI = async (req, res) => {
    try {
        let id = req.body.id;
        console.log('id: ', req.body);
        let result = await bookingService.handleDeleteBooking(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
let handleSearchBookingAPI = async (req, res) => {
    try {
        let data = req.body;
        console.log('data: ', data);
        let customerId = data.customerId;
        let startTime = data.bookingDateStart;
        let endTime = data.bookingDateEnd;
        let status = data.status;
        let clinicId = data.clinicId;
        console.log('endTime: ', endTime);
        console.log('startTime: ', startTime);
        let result = await bookingService.handleSearchBooking(customerId, startTime, endTime, status, clinicId);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
let handleGetBookingByCustomerIdAPI = async (req, res) => {
    try {
        let id = req.query.id;
        let result = await bookingService.handleGetBookingByCustomerId(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    handleGetAllBookingsAPI: handleGetAllBookingsAPI,
    handleGetBookingByIdAPI: handleGetBookingByIdAPI,
    handleAddBookingAPI: handleAddBookingAPI,
    handleUpdateBookingAPI: handleUpdateBookingAPI,
    handleDeleteBookingAPI: handleDeleteBookingAPI,
    handleSearchBookingAPI: handleSearchBookingAPI,
    handleGetBookingByCustomerIdAPI: handleGetBookingByCustomerIdAPI

}