const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../Config/Database");

const Topics = sequelize.define("Topics", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique:true
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
});

module.exports ={Topics}