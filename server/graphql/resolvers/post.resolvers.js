const { GraphQLDateTime } = require("graphql-iso-date");
const { PrismaClient } = require("@prisma/client");
const checkAuth = require("../../util/checkAuth");

const prisma = new PrismaClient();

const postResolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        const posts = await prisma.posts.findMany();
        return posts;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    getPost: async (parent, args, context, info) => {
      const { id } = args;
      try {
        const post = await prisma.posts.findUnique({
          where: {
            id: Number(id),
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
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
    createPost: async (parent, args, context, info) => {
      const user = checkAuth(context);
      
      const { title, postText, username } = args.post;
      try {
        const post = await prisma.posts.create({
          data: {
            title,
            postText,
            username,
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
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

module.exports = { postResolvers };
