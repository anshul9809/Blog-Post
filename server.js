require("dotenv").config();
const express = require("express");
const port = 8000;
const path = require("path");
const routes = require("./routes/index");
const db = require("./config/mongoose");
const flashmiddleware = require("./middlewares/flashMiddleware");
const auth = require("./middlewares/auth");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportLocalStrategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));

//setting view engine
app.set('view engine', "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(
    session({
      name: "Blog-post",
      secret:process.env.SECRET_KEY,
      saveUninitialized: false,
      resave: false,
      cookie:{
            maxAge: 1000*60*100
        },
        store: MongoStore.create(
            {
            mongoUrl:'mongodb+srv://mongo:mongo@anshulcluster.k7iipbc.mongodb.net/',
            autoRemove: 'disabled',
            mongooseConnection:db,
            collectionName:"sessions"
            },
            function(error){
            console.log(error || "connect mongodb setup is ok");
            }
        )
    })
);

//for Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//setting the flash messages
app.use(flash());
app.use(flashmiddleware.setFlash);

app.use("/", routes);


app.listen(port, (err)=>{
    if(err){
        console.log("error in server: ", err);
        return
    }
    console.log("server running at port ", port);
});