const { postResolvers } = require("./post.resolvers");
const { commentResolvers } = require("./comment.resolvers");
const { userResolvers } = require("./user.resolvers");

module.exports = {
  Query: {
    ...postResolvers.Query,
    ...commentResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
