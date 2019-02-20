// Connecting to movies database and creating a database connection object
const Sequelize = require('sequelize');

module.exports = new Sequelize('kitookedb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});