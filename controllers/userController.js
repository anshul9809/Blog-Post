const user = require("../models/blogUser");
const blog = require("../models/posts");


//signin and creating the session
module.exports.CreateSession = function (req, res) {
    req.flash("success", "Login Successfull");
    return res.redirect("/");
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
        return res.send("not working");
    }
}