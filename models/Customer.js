// The sequelize library is imported from node
const Sequelize = require('sequelize');
// The sequelize database object connection  is imported
const db = require('../config/db');

// A sequelize model is defined on the database object
const Customer = db.define('customer',{

   //Attributes of the model are defined here
   id: {
    type: Sequelize.INTEGER,
    primaryKey:true
   },
   firstname: {
       // The data type of the attribute is defined here    
       type: Sequelize.STRING
   },
   lastname: {
    // The data type of the attribute is defined here    
    type: Sequelize.STRING
   },
   phoneNumber: {
    // The data type of the attribute is defined here    
    type: Sequelize.STRING
   },
   address: {
    type: Sequelize.STRING
   }

}
);

// This line exports the Customer Sequelize model
module.exports = Customer;