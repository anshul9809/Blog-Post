const express = require("express");
const UserFeedback = require("../models/UserComplaint"); 
module.exports.home = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.render("index");
    }
    return res.redirect("/users");
}

module.exports.about = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.render("about");
    }
    return res.redirect("/users");
}

module.exports.contact = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.render("contact");
    }
    return res.redirect("/users");
}

module.exports.services = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.render("services");
    }
    return res.redirect("/users");
}

module.exports.submitForm = (req,res)=>{
    let data = req.body;
    let newName = req.body.firstName + " " + req.body.lastName;
    try{
        let newComplaint = new UserFeedback({
            name: newName,
            email: req.body.email,
            number: req.body.number,
            subject: req.body.subject,
            role: req.body.role,
            comment: req.body.comments,
        });
        let result = newComplaint.save();
        if(!result){
            throw Error("Error in saving data to db")
        }
        else{
            req.flash("success", "We'll get back to you ASAP");
        }
    }
    catch(error){
        req.flash("error", "We are having some problems with the server. Please wait.");
    }

    res.redirect("/contact");
}