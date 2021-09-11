const express = require("express");
const router = express.Router();

const { goToHomePage } = require("../controllers/home");

router.route("/").get(goToHomePage);

module.exports = router;
