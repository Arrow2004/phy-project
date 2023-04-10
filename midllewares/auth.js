const protected = (req,res,next)=>{
    if(!req.session.isLogged){
        return res.redirect('/auth/login')
    }
    next()
}

const guest = (req,res,next)=>{
    if(req.session.isLogged){
        return res.redirect('/')
    }
    next()
}
module.exports = {
    protected,
    guest
}