const { NUMBER, BelongsToMany, HasMany } = require("sequelize");
const { Board } = require("./Board");
const { sequelize } = require("./db");
const { Cheese } = require("./Cheese");
const { User } = require("./User");

//one to may association

User.hasMany(Board);
Board.belongsTo(User); 

//1 Board can have many cheeses
Board.belongsToMany(Cheese, { through: "cheeseboard" });
Cheese.belongsToMany(Board, { through: "cheeseboard" }); 

module.exports = {
  Board,
  Cheese,
  User };
