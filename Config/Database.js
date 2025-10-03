const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tuf", "root", "Pooonam@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports ={sequelize};
