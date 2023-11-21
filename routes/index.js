const express = require("express");
const router = express.Router();


router.use("/users", require("./user"));
router.use("/", require("./home"));

module.exports = router;