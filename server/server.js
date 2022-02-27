const express = require('express');
//import ApolloServer
const {ApolloServer} = require('apollo-server-express');

//import the typedefs and resolvers
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //creates the apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  //Start the server
  await server.start();

  //integrate apollo server with express application as middleware
  server.applyMiddleware({app});

  //log test site
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//start it up bb
startServer();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.once('open',() => {
  app.listen(PORT,()=>{
    console.log(`API server running of port ${PORT}! Yeah!`);
  });
});