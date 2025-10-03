const { sequelize } = require("../Config/Database");
const { DataTypes } = require("sequelize");
const users = sequelize.define("Users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports = {users};


