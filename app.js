const express = require("express");
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

// set view engine
app.set('view engine','ejs');

// cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 dia de cookie
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// mongodb
mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log("Connected")
    })
    .catch(error => console.log(error))

// routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.get('/',(req,res) => {    
    res.render('home',{
        user: req.user
    });
});

const port = 3000;

app.listen(port,() => {
    console.log(`Server on port ${port}`)
});