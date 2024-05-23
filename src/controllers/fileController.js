import fileService from '../services/fileService';
import multer from 'multer';

let upload = multer();
let handleUploadFileAPI = async (req, res) => {
    try {
        upload.fields([{ name: 'file', maxCount: 1 }])(req, res, async function(err) {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(400).json(
                    {
                        errCode: 1,
                        message: 'Error uploading file'
                    }
                );
            }

            // After the FormData is processed, you can access the fields in req.body and files in req.files

            if (!req.files || !req.files['file']) {
                return res.status(200).json({ 
                    errCode: 1, 
                    message: 'Pease select a file to upload'
                });
            }
            let file = req.files['file'][0]; // Get file
    
            let result = await fileService.handleUploadFile(file);

            // Return the result to the client
            return res.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
module.exports = {
    handleUploadFileAPI: handleUploadFileAPI
}