const path = require("path");
const { Sequelize, Model } = require("sequelize");
const { DataTypes } = require("sequelize");

// TODO - create the new sequelize connection
// connecting to a database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  //   logging: false
});
module.exports = {
  sequelize,
  Sequelize,
};

// TODO - import the models
const User = require("./User");
const Cheese = require("./Cheese");
const Board = require("./Board");



