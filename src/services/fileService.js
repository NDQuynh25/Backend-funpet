

// import  admin  from '../config/.js';

import cloudinary from '../config/cloudinary.js';

let handleUploadFile = async (file) => {
    return new Promise(async (resolve, reject) => {
        if (file) {
            try {
                console.log('file:', file);
                // Chuẩn bị buffer cần upload
                const buffer = file.buffer;

                // Tạo một readable stream từ buffer (nếu cần)
                const streamifier = require('streamifier');
                const stream = streamifier.createReadStream(buffer);
                
                // Upload buffer lên Cloudinary
                const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                    if (error) {
                        console.error('Error uploading image:', error);
                        reject({
                            errCode: 1,
                            message: 'Error uploading image'
                        });
                    } else {
                        console.log('Image uploaded successfully:', result);
                        resolve({
                            errCode: 0,
                            message: 'Image uploaded successfully',
                            url: result.secure_url
                        });
                    }
                });
                
                // Pipe dữ liệu từ readable stream (nếu cần) vào writable stream
                if (stream) {
                    stream.pipe(uploadStream);
                } else {
                    // Nếu không có readable stream, trực tiếp ghi dữ liệu buffer vào writable stream
                    uploadStream.write(buffer);
                    uploadStream.end(); // Kết thúc writable stream sau khi ghi dữ liệu xong
                }      
            } catch (error) {
                console.log('Error ', error);
                reject({
                    errCode: 1, 
                    message: error
                });
            }
        } else {
            reject({
                errCode: 1,
                message: 'Please select a file to upload'
            });
        }
    });
}




let handleDeleteFile = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tách public_id từ URL
            const parts = url.split('/');
            const publicId = parts[parts.length - 1].split('.')[0]; // Giả sử public_id chính là phần cuối cùng của đường dẫn URL trước dấu '.'
            // Gọi API để xóa ảnh với public_id tương ứng
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error('Error deleting image:', error);
                    reject({
                        errCode: 1,
                        message: 'Error deleting image'
                    });
                    
                
                } else {
                    resolve({
                        errCode: 0,
                        message: 'Image deleted successfully'
                    });
                    console.log('Image deleted successfully');
                }
            });
        }
        catch (error) {
            
            console.error('Error deleting image:', error);
            reject({
                errCode: 1,
                message: 'Error deleting image'
            });
        }
    });
}

export default {
    handleUploadFile: handleUploadFile,
    handleDeleteFile: handleDeleteFile
};