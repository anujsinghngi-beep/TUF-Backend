const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/Database");

const Subcategory = sequelize.define("SubCategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: false,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

module.exports = {Subcategory};
