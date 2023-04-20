const {Schema,model} = require('mongoose')
const animationModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
        }
    ],
    body: {
        type: String,
        required: true,
        //minLength: 1000,
    },
    previewPicture: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
        required: true
    }
},
{ timestamps: true })
module.exports = model("Animation",animationModel)