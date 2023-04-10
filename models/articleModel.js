const {Schema,model} = require('mongoose')
const {Schema,model} = require('mongoose')

const articleModel = new Schema({
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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visits: {
        type: Number,
        default: 1
    }
},
{ timestamps: true })
module.exports = model('Article',articleModel)