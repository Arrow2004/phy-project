const User =require('../models/userModel')
const uploadImage = require('../utils/cloudinary')
const getLoginPage =(req,res)=>{
    res.render('user/login',{
        title: 'Hisobga kirish'
    })
}
const getRegisterPage =(req,res)=>{
    res.render('user/signup',{
        title: 'Ro\'yxatdan o\'tish'
    })
}
const login = async (req,res)=>{
    try {
        const userExist = await User.findOne({email: req.body.email})
        if(userExist && userExist.password===req.body.password){
            req.session.user = userExist;
            req.session.isLogged = true;
            res.redirect('/profile/'+userExist.username)
        }else{
            res.redirect('/auth/signup')
        }
    } catch (e) {
        console.log(e)
    }
}
const signup = async (req,res)=>{
    try {
        const userExist = await User.findOne({email: req.body.email})
        const uploadPic = await uploadImage(req.file)
        if(!userExist && req.body.password==req.body.password2){
            await User.create({
                email: req.body.email,
                profilePic: uploadPic,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                password: req.body.password,
                username: req.body.username,
            })
            res.redirect('/auth/login')
        }else{
            res.redirect('/auth/signup')
        }
    } catch (e) {
        console.log(e)
    }
}
const logout = (req,res)=>{
    req.session.destroy(()=>{
    })
    res.redirect('/')
}
module.exports = {
    getRegisterPage,
    getLoginPage,
    login,
    signup,
    logout
}