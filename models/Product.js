// The sequelize library is imported from node
const Sequelize = require('sequelize');
// The sequelize database object connection  is imported
const db = require('../config/db');

// A sequelize model is defined on the database object
const Product = db.define('product',{

   //Attributes of the model are defined here
   id: {
    type: Sequelize.INTEGER,
    primaryKey:true
   },
   name: {
       // The data type of the attribute is defined here    
       type: Sequelize.STRING
   },
   price: {
    type: Sequelize.INTEGER
   },
   imageUrl: {
    type: Sequelize.STRING
   },
   description:{
       type: Sequelize.STRING
   },
   brand:{
       type: Sequelize.STRING
   }
}
);

// This line exports the Product Sequelize model
module.exports = Product;