// Import the Sequelize constructor from the library
const Sequelize = require("sequelize");

require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Create connection to the database using JawsDB
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create connection to the database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
