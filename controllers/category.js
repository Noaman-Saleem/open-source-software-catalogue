const { StatusCodes } = require("http-status-codes");
const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  const category = await Category.find({});
  res.status(StatusCodes.OK).render("home", { category });
};

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).redirect("/");
};

module.exports = {
  getAllCategories,
  createCategory,
};
