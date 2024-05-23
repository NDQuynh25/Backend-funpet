import historyService from "../services/historyService";

const handleAddHistoryAPI = async (req, res) => {
    try {
        let data = req.body;
        let result = await historyService.createNewHistory(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const handleGetAllHistoryAPI = async (req, res) => {
    try {
        let result = await historyService.getAllHistory();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
const handleUpdateHistoryAPI = async (req, res) => {
    try {
        let data = req.body;
        let result = await historyService.updateHistory(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
const handleDeleteHistoryAPI = async (req, res) => {
    try {
        let data = req.body;
        console.log('data: ', data);
        let result = await historyService.deleteHistory(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export default {
    handleAddHistoryAPI: handleAddHistoryAPI,
    handleGetAllHistoryAPI: handleGetAllHistoryAPI,
    handleUpdateHistoryAPI: handleUpdateHistoryAPI,
    handleDeleteHistoryAPI: handleDeleteHistoryAPI
    
}