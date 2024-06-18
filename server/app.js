const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { verifyToken } = require("./helpers/jwt");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const userTypeDef = require("./schema/user");
const followTypeDef = require("./schema/follow");
const postTypeDef = require("./schema/post");

const userResolver = require("./resolvers/user");
const followResolver = require("./resolvers/follow");
const postResolver = require("./resolvers/post");

const server = new ApolloServer({
  typeDefs: [userTypeDef, followTypeDef, postTypeDef],
  resolvers: [userResolver, followResolver, postResolver],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req }) => {
    return {
      authentication: async () => {
        const authorization = req.headers.authorization || "";
        // console.log(authorization);
        if (!authorization) {
          throw new GraphQLError("Unauthorized", {
            extensions: {
              Code: "UNAUTHORIZED",
            },
          });
        }
        const token = authorization.split(" ")[1];
        // console.log(token);
        if (!token) {
          throw new GraphQLError("Unauthorized Token", {
            extensions: {
              Code: "UNAUTHORIZED",
            },
          });
        }

        try {
          const user = await verifyToken(token);
          return { user };
        } catch (err) {
          throw new GraphQLError("Invalid token", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
