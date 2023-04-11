//Kutubxonalarni yuklash
const express = require('express');
const path = require('path');
const env= require('dotenv').config()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const hbsHelpers = require('./utils/hbsHelpers')
const app = express();
const connectToDb = require('./config/db')()
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
//BodyParser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(flash())

//sessiyalar
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))
//Shablonizatorlarni o'rnatish
app.engine('.hbs',exphbs.engine({extname: '.hbs'}))
app.set('view engine','.hbs')
app.set('views',path.join(__dirname,'/views'))

//
hbsHelpers(Handlebars)
//Statik papkani o'rnatish
app.use(express.static(path.join(process.cwd(),'public')))
//Routelarni ulash
app.use('/article',require('./routes/articleRoutes'));
app.use('/auth',require('./routes/authRoutes'));
app.use('/profile',require('./routes/profileRoutes'));
app.use('/contest',require('./routes/contestRoutes'));
app.use('/virtual',require('./routes/animationRoutes'));
app.use('/',require('./routes/home'))
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`))
module.exports = app
