const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Software = require("../models/Software");

const goToHomePage = async (req, res) => {
  const softwares = await Software.find({});

  //################Deleting Space and insert - between each word##################
  const modifiedSoftware = [];
  for (let software of softwares) {
    const strCategory = software.category;
    const newStrCategory = strCategory.split(" ").join("-");

    const strName = software.name;
    const newStrName = strName.split(" ").join("-");

    cat = newStrCategory;
    naam = newStrName;
    // console.log({ ...software._doc });
    modifiedSoftware.push({ ...software._doc, cat, naam });
  }
  // console.log(modifiedSoftware);

  //Initialize arrays of distinct Cayegories simple
  const arr = modifiedSoftware.map((p) => p.category);
  // console.log(arr);
  const s = new Set(arr); // a set removes duplications, but it's still a set
  const unique = [...s]; //  Use the spread operator to transform a set into an Array
  // console.log(unique);
  //  unique: ["graphic design", "data analysis", "web development"];

  const dashedUnique = [];
  for (let category of unique) {
    const strCategory = category;
    const dashedStrCategory = strCategory.split(" ").join("-");
    dashedUnique.push(dashedStrCategory);
  }

  const success = [unique, dashedUnique];
  // console.log(modifiedSoftware);

  res.status(StatusCodes.OK).render("home", { modifiedSoftware, success });
};

// const goToHomePage = async (req, res) => {
//   // res.send("Home page");
//   const softwares = await Software.find({});

//   //Add dashed name and category to each software
//   const modifiesSoftware = [];
//   for (let software of softwares) {
//     //Adding - inplace of spaces in software.category
//     const strCategory = software.category;
//     const newCategory = strCategory.split(" ").join("-");
//     //Adding - inplace of spaces in software.name
//     const strName = software.name;
//     const newName = strName.split(" ").join("-");
//     software = { ...software._doc, newCategory, newName };
//     // software = { ...software._doc, newCategory };
//     modifiesSoftware.push(software);
//   }
//   // console.log(modifiesSoftware);

//   //Initialize arrays of distinct Cayegories simple and dashed
//   const arr = modifiesSoftware.map((p) => p.category);
//   // console.log(arr);
//   const s = new Set(arr); // a set removes duplications, but it's still a set
//   const unique = [...s]; //  Use the spread operator to transform a set into an Array
//   // console.log(unique);
//   //  unique: ["graphic design", "data analysis", "web development"];

//   const arr2 = modifiesSoftware.map((p) => p.newCategory);
//   // console.log(arr2);
//   const s2 = new Set(arr2); // a set removes duplications, but it's still a set
//   const unique2 = [...s2]; //  Use the spread operator to transform a set into an Array
//   // console.log(unique2);
//   // unique2: ["graphic-design", "data-analysis", "web-development"];

//   const uniqueArray = [{ unique, unique2 }];
//   // [
//   //   {
//   //     unique: ["graphic design", "data analysis", "web development"],
//   //     unique2: ["graphic-design", "data-analysis", "web-development"],
//   //   },
//   // ];

//   // console.log(uniqueArray);
//   // console.log(uniqueArray[0].unique.length);
//   res.status(StatusCodes.OK).render("home", { modifiesSoftware, uniqueArray });
// };

module.exports = {
  goToHomePage,
};
