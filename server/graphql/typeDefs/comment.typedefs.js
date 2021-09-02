const CommentType = `
    scalar DateTime

    type Comment {
        id : ID
        commentBody : String
        createdAt : DateTime
        updatedAt : DateTime
        postId : ID
    }

    type Query {
        getComments(postId:ID) : [Comment]
    }

    input CommentInput {
        commentBody : String
        postId : ID
    }

    type Mutation {
        createComment(comment : CommentInput) : Comment
    }
`;

module.exports = { CommentType };
