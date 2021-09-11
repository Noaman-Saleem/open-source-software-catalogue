const Software = require("./models/Software");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const software = {
  name: "Matlab",
  category: "Data Analysis",
  description:
    "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
};

const createSoftware = async () => {
  try {
    await Software.create(software);
  } catch (error) {
    console.log(error);
  }
};

createSoftware();
