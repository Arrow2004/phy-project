const mongoose = require('mongoose');

const connectToDb = async ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('Database connected to '+mongoose.connection.host)
    }).catch(e=>{
        console.log(e)
    })
}
module.exports = connectToDb;