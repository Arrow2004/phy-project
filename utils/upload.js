const multer  = require('multer')
const path = require('path')

//Set storage
const storage = multer.diskStorage({
    destination: '/tmp',
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

//Inital
const upload = multer({
    storage,
    limits: {fileSize: 10000000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType= fileTypes.test(file.mimetype)
    if(mimeType && extname){
        return cb(null, true)
    }else{
        return cb('Error: You can upload only image files')
    }
}
module.exports = upload;