const express = require("express");
const passport = require("passport");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get("/login", UserController.login);
router.get("/signup", UserController.signup)
router.get("/", UserController.home);


//using passport for authenication
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/users/login" }),
    UserController.CreateSession
);

module.exports = router;
