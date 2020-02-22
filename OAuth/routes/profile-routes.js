const router=require('express').Router();

const authCheck=(req,res,next)=>{
if (!req.user) {
    //if user is not logged in
    res.redirect('/auth/login')
}
else{
    //if user is loggin in
    next();
}
};


router.get('/',authCheck,(req,res)=>{
//res.send('you are logged in.this is your profile:'+ req.user.username);
//user apni marzi ki property banai ha koi bhi naam ho sakta ha

res.render('profile.ejs',{user: req.user});
});
module.exports=router;