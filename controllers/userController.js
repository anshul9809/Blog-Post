const User = require("../models/blogUser");
const Blog = require("../models/posts");


//signin and creating the session
module.exports.CreateSession = function (req, res) {
    req.flash("success", "Login Successfull");
    return res.redirect("/users");
};
  
// signing out the user
module.exports.signout = function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        else{
        req.flash("success", "Log Out Successfull");
        return res.redirect('/');
        }
        
    });
};
//creating the new user
module.exports.createUser = async function(req,res){
    try{
        if(req.body.password !== req.body.confirm_password){
            req.flash("error", "Password and confirm password are not same");
            return res.redirect("back");
        }

        const user = await User.findOne({email: req.body.email});
        if(!user){
            const newUser = new User({
                username : req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            let result = await newUser.save();
            if(!result){
                throw Error('Error in saving data to database')
            }
            else{
                req.flash("success", "User created successfully. Please LogIn");
                res.redirect("/users/login");
            }
        }
    }
    catch(error){
        req.flash("error", "Error while creating the new user");
        return res.redirect("back")
    }
}

// rendering the sign In page
module.exports.login = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.render("signin");
    }

    return res.redirect("/");
};


// rendering the sign up page
module.exports.signup = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.render("signup");
    }

    return res.redirect("/");
};



module.exports.home = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/users/login");
    }
    else{
        return res.render("users/home");
    }
}