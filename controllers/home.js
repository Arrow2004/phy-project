const Article = require('../models/articleModel')
const home = async (req,res)=>{
    const articles = await Article.find({}).sort({visits: -1}).limit(3).lean()
    res.render('home',{
        title: "Asosiy sahifa",
        regUser: req.session.user,
        user: req.session.user,
        isLogged: req.session.isLogged,
        articles
    })
}
module.exports = {home}