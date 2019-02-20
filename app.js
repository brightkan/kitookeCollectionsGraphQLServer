const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const db = require('./config/db')
const cors = require('cors')

//allow cross origin requests
app.use(cors())


//Test DB
db.authenticate()
  .then(() => console.log('Database Connected..'))
  .catch(err => console.log('Bright the Error is:' + err))

// Use the graphqlHTTP middleware function to enable graphql \
// on the endpoint pass in schema in object parameter of the graphqlHTTP function
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log("Now listening on port 4000...")
})