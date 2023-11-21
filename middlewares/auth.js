const express = require("express");

module.exports.home = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect("/users/");
}