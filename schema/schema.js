const graphql = require('graphql')
const { GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList,
      GraphQLNonNull} = graphql;


// Sequelize Models 
const Product = require('../models/Product');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Customer = require('../models/Customer');

// ObjectTypes
// CustomerType
const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: {type: GraphQLID},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        phoneNumber:{type: GraphQLString},
        address: {type: GraphQLString},
        orders:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                //return a list of orders that belongs to an instance of customer
                return Order.findAll({
                    where: {
                        customer_id: parent.id
                    }
                })
            }
        },
        ordersUnfullfilled:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                //return a list of orders that belongs to an instance of customer
                return Order.findAll({
                    where: {
                        customer_id: parent.id,
                        fullfilled: "false"
                    }
                })
            }
        },
        ordersfullfilled:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                //return a list of orders that belongs to an instance of customer
                return Order.findAll({
                    where: {
                        customer_id: parent.id,
                        fullfilled: "true"
                    }
                })
            }
        }

    })

});

// ProductType
const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLInt},
        imageUrl:{type: GraphQLString},
        brand: {type: GraphQLString},
        description: {type: GraphQLString},

    })

});

// OrderType
const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: {type: GraphQLID},
        amount: {type: GraphQLInt},
        fullfilled: {type: GraphQLString },
        cartItems:{
            type: new GraphQLList(CartItemType),
            resolve(parent,args){
                //Return a list of cart items that match the order           
                return CartItem.findAll({
                    where: {
                        order_id:parent.id
                    }
                })
            }
        },
        customer:{
            type: CustomerType,
            resolve(parent,args){
                //Return the customer of the order instance
                return Customer.findByPk(parent.customer_id)
            }
        }
    })

});

// CartItemType
const CartItemType = new GraphQLObjectType({
    name: "CartItem",
    fields: () => ({
        id: {type: GraphQLID},
        quantity: {type: GraphQLInt},
        product:{
            type: ProductType,
            resolve(parent,args){
                //return a product that matches the cart item
                return Product.findByPk(parent.product_id)
            }
        }
    })

});

///////////////////////////////////////////////////////////////////
// ROOTQUERY
//RootQuery
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    // fields are for all Object types to be queried
    fields: {
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parent,args){
                //We want to return a list of all customers
                return Customer.findAll();
            }
        },
        customer:{
            type: CustomerType,
            args:{id: {type:GraphQLID}},
            resolve(parent,args){
                //Return a customer object whose id matches the id provided by the client
                return Customer.findByPk(args.id)
            }
        },
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                return Product.findAll();
            }

        },
        product:{
            type: ProductType,
            args:{id: {type: GraphQLID}},
            resolve(parent,args){
                //Return a product object whose id matches the id provided by the client
                return Product.findByPk(args.id)
            }
        },
        orders:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                // return orders;
                return Order.findAll();
            }
        },
        ordersUnfullfilled:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                return Order.findAll({
                    where: {
                        fullfilled: "false"
                    }
                })
            }
        },
        ordersfullfilled:{
            type: new GraphQLList(OrderType),
            resolve(parent,args){
                return Order.findAll({
                    where: {
                        fullfilled: "true"
                    }
                })
            }
        },
        order:{
            type: OrderType,
            args: {id: {type : GraphQLID}},
            resolve(parent,args){
                //Return an order object whose id matches the id provided by the client
                return Order.findByPk(args.id)
            }
        },
        cartItems: {
            type: new GraphQLList(CartItemType),
            resolve(parent,args){
                //return cartItems;
                return CartItem.findAll()
            }
        }
    }


 });


//Export our schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: Mutation
})