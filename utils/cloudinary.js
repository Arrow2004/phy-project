const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadImage = async (file)=>{
    return new Promise((res, rej) =>{
        const uploadPic = cloudinary.uploader.upload_stream(
            {
                folder: "demo"
            },
            (error, result) => {
                    if (error) rej(error);
                    res(result.url)
            }
        )
        streamifier.createReadStream(file.buffer).pipe(uploadPic)
    })
}
module.exports = uploadImage