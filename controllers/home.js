const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Software = require("../models/Software");

const goToHomePage = async (req, res) => {
  // res.send("Home page");
  const softwares = await Software.find({});

  //Add dashed name and category to each software
  const modifiesSoftware = [];
  for (let software of softwares) {
    //Adding - inplace of spaces in software.category
    const strCategory = software.category;
    const newCategory = strCategory.split(" ").join("-");
    //Adding - inplace of spaces in software.name
    const strName = software.name;
    const newName = strName.split(" ").join("-");
    software = { ...software._doc, newCategory, newName };
    modifiesSoftware.push(software);
    // console.log(modifiesSoftware);
  }

  res.status(StatusCodes.OK).render("home", { modifiesSoftware });
};

module.exports = {
  goToHomePage,
};
