const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("./db");


let cheese = sequelize.define("cheese", {

    title:{
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.STRING,
    },


});




module.exports = cheese;