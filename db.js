const path = require("path");
const { Sequelize, Model } = require("sequelize");
//create the new sequelize connection
// connecting to a database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
  logging: false,
});

module.exports = {
  sequelize,
  Sequelize,
};






