const { GraphQLDateTime } = require("graphql-iso-date");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const prisma = new PrismaClient();

function generateToken(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "secretkeydemo",
    { expiresIn: "1h" }
  );

  return token;
}

const userResolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      const { username, password } = args.user;

      try {
        const user = await prisma.users.findFirst({
          where: {
            username: username,
          },
        });

        if (!user) throw new UserInputError("User doesn't exist");

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword)
          throw new UserInputError("Wrong username and password combination");

        return user;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { username, password } = args.user;

      try {
        const hashPassword = await bcrypt.hash(password, 12);

        const user = await prisma.users.create({
          data: {
            username: username,
            password: hashPassword,
          },
        });

        const token = generateToken(user);

        return { id: user.id, username: user.username, token };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    loginUser: async (parent, args, context, info) => {
      const { username, password } = args.user;

      try {
        const user = await prisma.users.findFirst({
          where: {
            username: username,
          },
        });

        if (!user) throw new UserInputError("User doesn't exist");

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword)
          throw new UserInputError("Wrong username and password combination");

        const token = generateToken(user);

        return { id: user.id, username: user.username, token };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  DateTime: GraphQLDateTime,
};

module.exports = { userResolvers };
