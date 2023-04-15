const getHomePage = (req,res)=>{
    res.render('phet/home',{
        title: 'Animatsiya va virtual labaratoriyalar',
        regUser: req.session.user
    })
}
const getOnePage = (req,res)=>{
    res.render('phet/one',{
        title: 'To\'lqinlar',
        regUser: req.session.user

    })
}
module.exports = {getHomePage,getOnePage}