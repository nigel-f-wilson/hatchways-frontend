const Sequelize = require("sequelize");

// const db = new Sequelize("sqlite::memory:");
// const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
//   logging: false
// });

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });
const db = new Sequelize('messenger', 'postgres', 'scioto7', {
    host: 'localhost',
    dialect: 'postgres' 
});

module.exports = db;
