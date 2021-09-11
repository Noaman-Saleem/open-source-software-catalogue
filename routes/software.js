const express = require("express");
const router = express.Router();

const {
  createSoftware,
  getSoftware,
  getCategory,
} = require("../controllers/software");
const { goToHomePage } = require("../controllers/home");

router.route("/").get(goToHomePage).post(createSoftware);

//All softwares of a same category
router.route("/:category").get(getCategory);

//Go to specific software
router.route("/:category/:software/:id").get(getSoftware);

module.exports = router;
