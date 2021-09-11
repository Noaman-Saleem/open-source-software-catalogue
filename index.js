require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

//Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//DB Connection
const connectDB = require("./db/connect");

// routers
const homeRouter = require("./routes/home");
const softwareRouter = require("./routes/software");
const catagoryRouter = require("./routes/category");

// Import error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(homeRouter);
app.use(softwareRouter);
// app.use(catagoryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
