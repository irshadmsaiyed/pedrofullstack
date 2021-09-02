const { GraphQLDateTime } = require("graphql-iso-date");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const commentResolvers = {
  Query: {
    getComments: async (parent, args, context, info) => {
      const { postId } = args;
      try {
        const comments = await prisma.comments.findMany({
          where: {
            postId: Number(postId),
          },
        });
        return comments;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createComment: async (parent, args, context, info) => {
      const { commentBody, postId } = args.comment;
      try {
        const comment = await prisma.comments.create({
          data: {
            commentBody: commentBody,
            postId: Number(postId),
          },
        });
        return comment;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  DateTime: GraphQLDateTime,
};

module.exports = { commentResolvers };
