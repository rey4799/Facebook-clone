const typeDefs = `#graphql
 type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: ID
    name: String
    username: String
    email: String
  }

type PostUser{
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    author: User
}

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }

  input NewComment {
    postId: ID!
    content: String!
  }

  input NewLike {
    postId: ID!
  }

  extend type Query {
    posts: [PostUser]
    postById(id: ID!): PostUser
  }

  extend type Mutation {
    addPost(newPost: NewPost!): Post
    commentPost(newComment: NewComment!): Post
    likePost(newLike: NewLike!): Post
  }
`;

module.exports = typeDefs;
