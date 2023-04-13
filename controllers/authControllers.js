const User =require('../models/userModel')
const uploadImage = require('../utils/cloudinary')
const getLoginPage =(req,res)=>{
    res.render('user/login',{
        title: 'Hisobga kirish',
        regError: req.flash('loginError')
    })
}
const getRegisterPage =(req,res)=>{
    res.render('user/signup',{
        title: 'Ro\'yxatdan o\'tish',
        regError: req.flash('regError')
    })
}
const login = async (req,res)=>{
    try {
        const userExist = await User.findOne({email: req.body.email})
        if(userExist){
            if(userExist.password===req.body.password){
                req.session.user = userExist;
                req.session.isLogged = true;
                res.redirect('/profile/'+userExist.username)
            }else{
                req.flash('loginError',`Login yoki parol xato!!!`)
                res.redirect('/auth/login')
            }
        }else{
            req.flash('loginError',`Bunday foydalanuvchi topilmadi!!!`)
                res.redirect('/auth/login')
        }
        
    } catch (e) {
        console.log(e)
    }
}
const signup = async (req,res)=>{
    try {
        const userExist = await User.findOne({email: req.body.email})
        const uploadPic = await uploadImage(req.file)
        if(!userExist){
            if(req.body.password==req.body.password2){
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
                req.flash('regError','Qandaydur xatolik yuz berdi');
                res.redirect('/auth/signup')
            }
        }else{
            req.flash('regError','Bunday foydalanuvchi mavjud');
            return res.redirect('/auth/signup')
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