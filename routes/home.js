const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const ensureAuthenticated = require("../middlewares/auth");

router.post("/submit-complaint", homeController.submitForm);
router.get("/services", ensureAuthenticated.home, homeController.services);
router.get("/contact", ensureAuthenticated.home, homeController.contact);
router.get("/about", ensureAuthenticated.home, homeController.about);
router.get("/", ensureAuthenticated.home , homeController.home);

module.exports = router;