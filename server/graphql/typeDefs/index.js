const { PostType } = require("./post.typedefs");
const { CommentType } = require("./comment.typedefs");
const { UserType } = require("./user.typedefs");

const typeDefs = [PostType, CommentType, UserType];
module.exports = {
  typeDefs,
};
