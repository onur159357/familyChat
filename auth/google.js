const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//models
const UserSchema = require('../model/User');


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
        callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        const data = profile._json;

        //Unique kontrolü yaparak db ye kaydetmemizi sağlıyor //model içinde User.js
        UserSchema.findOrCreate({ 
            'userName': profile.id 
        },{
            userName :  profile.id,
            name : data.name.givenName,
            surname : data.name.familyName,
            profilePhotoUrl : data.image.url

        }, (err, userName) => {
            return done(err, userName);

        });
    }
     
));

//dönen user ı session a atıyoruz
passport.serializeUser((user, done) => {
    done(null, user);
});
//uygulamanın herhangi bir yerinde session u değiştirmek istediğimizde gerekli olan ifade
passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports = passport;