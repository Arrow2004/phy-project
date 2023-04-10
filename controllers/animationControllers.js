const getHomePage = (req,res)=>{
    res.render('phet/home',{
        title: 'Animatsiya va virtual labaratoriyalar'
    })
}
const getOnePage = (req,res)=>{
    res.render('phet/one',{
        title: 'To\'lqinlar'

    })
}
module.exports = {getHomePage,getOnePage}