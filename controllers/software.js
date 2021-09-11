const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Software = require("../models/Software");

//@Create New Software
//@ Method POST
//@ Route --> /
const createSoftware = async (req, res) => {
  //################Lower case each letter of every word in Category##################
  const str = req.body.category;

  //split the above string into an array of strings
  //whenever a blank space is encountered
  const arr = str.split(" ");

  //loop through each element of the array and capitalize the first letter.
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].slice(1);
  }

  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const str2 = arr.join(" ");
  console.log(str2);
  //################Lower case each letter of every word##################

  req.body.category = str2;

  // res.send(req.body);
  const software = await Software.create(req.body);
  res.status(StatusCodes.CREATED).send(software);
};

//@ Get All Softwares of same Category
//@ Method GET
//@ Route --> /:category
const getCategory = async (req, res) => {
  //################Deleting - and insert Spaces between each word##################
  const str = req.params.category;
  const newStr = str.split("-").join(" ");
  //################Deleting - and insert Spaces between each word##################
  // console.log(req.params);
  // console.log(newStr);
  const softwares = await Software.find({ category: newStr });

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
  res.status(StatusCodes.OK).render("categoryCollection", { modifiesSoftware });
};

//@ GetSingle Softwares
//@ Method GET
//@ Route --> /:category/:software/:id
const getSoftware = async (req, res) => {
  // console.log(req.params.id);
  const software = await Software.findById(req.params.id);
  // console.log(software);

  res.status(StatusCodes.OK).render("specificSoftware", { software });
};

module.exports = {
  getSoftware,
  createSoftware,
  getCategory,
};
