const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../models/user-model');

//user.id may jo id ha  wo mongodb jo id create ker raha uski id ha
//not google id. 

passport.serializeUser((user,done)=>{
done(null,user.id);
});

passport.deserializeUser((id,done)=>{

    User.findById(id).then((user)=>{
        done(null,user);
    });

    
    });


passport.use(
    new GoogleStrategy({
        //options for google staregy
        callbackURL:'/auth/google/redirect',
        clientID:keys.Google.clientID,
        clientSecret:keys.Google.clientSecret
        
},(accessToken,refreshToken,profile,done)=>{
    //check if user exist in our db
    console.log(profile);
    User.findOne({googleID:profile.id}).then((currentUser)=>{
        if(currentUser){
            //already have the user
            console.log('user is'+currentUser);
            done(null,currentUser);
        } else{
            //if not, create user in our db
            new User({
                username:profile.displayName,
                googleID:profile.id,
                thumbnail:profile._json.picture
            }).save().then((newUser)=>{
                console.log('new user created'+newUser);
                done(null,newUser);
            });
        }
    }); 
    
    
    // done(null,User);
})
)
