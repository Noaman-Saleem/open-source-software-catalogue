const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const goToHomePage = async (req, res) => {
  // res.status(StatusCodes.OK).send("home");
  res.status(StatusCodes.OK).render("home");
};

module.exports = {
  goToHomePage,
};
