const express=require('express');
const authRoutes=require('./routes/auth-routes');
const profileRoutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport-setup')
const mongoose=require('mongoose');
const keys=require('./config/keys');
const cookieSession=require('cookie-session');
const app=express();
const passport=require('passport');

//set up view engine
app.set('view-engine','ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI,()=>{
console.log('connected to mongoDB')
});


//set up routes
//also caleed middleware authroutes kay ander hamari dosri
//routes majood ha aur wo /auth/ kay baad lagay gi
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


//create home route
app.get('/',(req,res)=>{
    res.render('home.ejs',{user:req.user});
});


app.listen(3003,()=>{
    console.log('listining to port 3003')
});