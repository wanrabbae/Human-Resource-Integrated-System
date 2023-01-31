require("dotenv").config();

// import sequelize
const Sequelize = require("sequelize");

// create connection
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    // dialectOptions: {
    //   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    // }
  }
);

// const db = new Sequelize('afkaarunaschool_hris', 'afkaarunaschool_backendhris', 'backendhris', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// export connection
module.exports = db;
