const express = require("express");
const passport = require("passport");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/signout", UserController.signout);
router.get("/login", UserController.login);
router.get("/signup", UserController.signup);
router.post("/create", UserController.createUser);
router.get("/", UserController.home);


//using passport for authenication
router.post(
    "/create-session",
    passport.authenticate("local", { 
        failureRedirect: "/users/login",
        successFlash: true,            
        failureFlash: true,
        successFlash: 'Succesful!',
        failureFlash: 'Invalid username or password.'

    }),
    UserController.CreateSession
);

module.exports = router;
