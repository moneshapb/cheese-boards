const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("./db");


let Board = sequelize.define("board", {

type: {

type: DataTypes.STRING,

},

description: {
    
    
    type: DataTypes.STRING,


},


rating: {

type: DataTypes.INTEGER,

},


});


module.exports = Board;