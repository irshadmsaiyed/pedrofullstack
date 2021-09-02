const PostType = `
    scalar DateTime

    type Post {
        id : ID
        title : String
        postText : String
        username : String
        createdAt : DateTime
        updatedAt : DateTime
    }

    type Query {
        getAllPosts : [Post]
        getPost(id:ID) : Post
    }

    input PostInput {
        title : String
        postText : String
        username : String
    }

    type Mutation {
        createPost(post : PostInput) : Post
    }
`;

module.exports = { PostType };
