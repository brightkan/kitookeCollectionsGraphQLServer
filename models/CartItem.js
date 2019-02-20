// The sequelize library is imported from node
const Sequelize = require('sequelize');
// The sequelize database object connection  is imported
const db = require('../config/db');

// A sequelize model is defined on the database object
const CartItem = db.define('cartItem',{

   //Attributes of the model are defined here
   id: {
    type: Sequelize.INTEGER,
    primaryKey:true
   },
   quantity: {
       // The data type of the attribute is defined here    
       type: Sequelize.INTEGER
   },
   customer_id: {
    // The data type of the attribute is defined here    
    type: Sequelize.INTEGER
   },
   order_id: {
    // The data type of the attribute is defined here    
    type: Sequelize.INTEGER
   },
   product_id: {
    type: Sequelize.INTEGER
   }


}
);

// This line exports the Customer Sequelize model
module.exports = CartItem;