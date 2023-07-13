

module.exports.checkAuth = function (req,res,next){

    if(req.session.userid){
        next()
        return;
    }

    res.redirect('/auth/login')
  
}