const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { typeDefs } = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  app.use(express.json());
  app.use(cors());

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
  });
}

startServer();
