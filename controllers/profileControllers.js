const User =require('../models/userModel')
const getUsersPage = async (req,res)=>{
    try {
        const users = await User.find().lean();
        res.render('user/users',{
            title: "Barcha foydalanuvchilar",
            users,
            regUser: req.session.user
        })
    } catch (error) {
        
    }
}
const getProfilePage = async (req,res)=>{
    try {
        const user = await User.findOne({username: req.params.username})
        .populate('articles',['_id','title'])
        .lean()
        const itsme = user._id===req.session.user._id
        if(user){
            res.render('user/profile',{
                title: user.firstName+' '+user.lastName,
                user: user,
                itsme,
                regUser: req.session.user
            })
        }
        else{
            res.render('user/profile',{
                title: 'Foydalanuvchi topilamdi!!!',
            })
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    getProfilePage,getUsersPage
}