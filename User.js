const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("./db");


let User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
    
    },
    email: {
        type: DataTypes.STRING,
        unique: true,

    },

});

module.exports = {User
};





