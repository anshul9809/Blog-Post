const User = require("../models/blogUser");
const Blog = require("../models/posts");
const passport = require("passport");


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

        const existingUser = await User.findOne({email: req.body.email});
        if(!existingUser){
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
                //to directly log the user in after registration
                console.log("Result is ", result);
                req.login(newUser, async (err)=>{
                    if(!newUser.hasMoreInfo){
                        return res.redirect("/users/moreInfo");
                    }
                    else{
                        return res.redirect("/users");
                    }
                });
            }
        }
        else{

            req.flash("error", "User already exists");
            return res.redirect("/users/login");
        }
    }
    catch(error){
        console.log("error in catch ", error);
        req.flash("error", "Error while creating the new user");
        return res.redirect("/users/signup")
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


//for getting more info from user
module.exports.moreInfo = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/users/login");
    }
    else{
        return res.render("users/userInfo");
    }
}

//function to update some info of user
module.exports.addMoreInfo = async (req,res)=>{
    if(!req.isAuthenticated()){
        return res.flash("error","Please Login");
        return res.redirect("/users/login");
    }
    else{
        let userId = res.locals.user._id;
        let data = req.body;
        let socialMedia = [];
        const { fb, instagram, twitter } = req.body;
        try{
        // Check which social media links are provided and add them to the array
            if (fb) {
                socialMedia.push({ platform: 'Facebook', link: fb });
            }
            if (instagram) {
                socialMedia.push({ platform: 'Instagram', link: instagram });
            }
            if (twitter) {
                socialMedia.push({ platform: 'Twitter', link: twitter });
            }
            console.log("socialMedia is ", socialMedia);
            let user = await User.updateOne({_id:userId},{$set:{name:data.name,socialMedia:socialMedia, typeOfBlogs: data.typeOfBlogs, hasMoreInfo: true}});
            if(!user){
                throw new Error('Error in finding user');
            }
            console.log("updated user is ", user);
            req.flash("success", "Info updated successfully");
            return res.redirect("/users/");

        }
        catch(error){
            console.log("error in upation ", error);
        }
    }
}