const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadImage = async (fileName)=>{
    const uploadPic = await cloudinary.uploader.upload(path.resolve(process.cwd(),'tmp',fileName),{public_id: "phy-physic"})
    fs.unlinkSync(path.resolve(process.cwd(),'tmp',fileName))
    return uploadPic.url;
}
module.exports = uploadImage