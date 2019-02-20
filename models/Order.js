// The sequelize library is imported from node
const Sequelize = require('sequelize');
// The sequelize database object connection  is imported
const db = require('../config/db');

// A sequelize model is defined on the database object
const Order = db.define('order',{

   //Attributes of the model are defined here
   id: {
    type: Sequelize.INTEGER,
    primaryKey:true
   },
   amount: {
       // The data type of the attribute is defined here    
       type: Sequelize.INTEGER
   },
   fullfilled: {
    type: Sequelize.STRING
   },
   customer_id: {
    type: Sequelize.INTEGER
},
}
);

// This line exports the Order Sequelize model
module.exports = Order;