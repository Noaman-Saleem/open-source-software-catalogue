const express = require("express");
const router = express.Router();

const {
  createSoftware,
  getSoftware,
  getCategory,
} = require("../controllers/software");
const { goToHomePage } = require("../controllers/home");

router.route("/").post(createSoftware).get(goToHomePage);
router.route("/:category").get(getCategory);
// router.route("/:category/:software/:id").get(getSoftware);

module.exports = router;
