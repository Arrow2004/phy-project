const {Schema,model} = require('mongoose')
const userModel = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
},
{ timestamps: true })
module.exports = model('User',userModel)