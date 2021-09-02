const UserType = `
    scalar DateTime

    type User {
        id : ID
        username : String
        password : String
        token : String
        createdAt : DateTime
        updatedAt : DateTime
    }

    type Query {
        getUser(user:UserInput) : User
    }

    input UserInput {
        username : String
        password : String
    }

    type Mutation {
        createUser(user : UserInput) : User
        loginUser(user : UserInput) : User
    }
`;

module.exports = { UserType };
