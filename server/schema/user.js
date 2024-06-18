const typeDefs = `#graphql
 type User {
    _id: ID
    name: String
    username: String
    email: String
    avaUrl: String
 }

 type Query {
    users: [User]
    searchUsers(query: String!): [User]
    getUserById(id: ID!): User
 }

 input NewUser {
    name: String!  
    username: String!
    email: String!
    password: String!
    avaUrl: String
 }

input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    _id: ID
  }

  type Mutation {
    register(newUser: NewUser): User
    login(credentials: LoginInput): AuthPayload
  }
`;

module.exports = typeDefs;
