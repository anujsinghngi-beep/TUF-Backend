const express = require("express");
const { sequelize } = require("./Config/Database");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

const User = require("./Routers/UserRouter");
const Topic = require("./Routers/TopicRoute");
const SubCategory = require("./Routers/SubCategoryRoute");


app.use(express.json());
app.use("/user", User);
app.use("/topic",Topic);
app.use('/subCategory', SubCategory);

let a = '';


sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Listening to port number ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to the Database...");
  });
