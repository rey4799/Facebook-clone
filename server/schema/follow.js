const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type FollowingDetail{
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    following: UserFollow
  }

  type FollowerDetail{
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    follower: UserFollow
  }

  type UserFollow {
    _id: ID
    name: String
    username: String
    email: String
    avaUrl: String
  }



  input FollowInput {
    followingId: ID!
    followerId: ID!
  }

  extend type Mutation {
    followUser(input: FollowInput!): Follow
  }

  extend type Query {
    findFollowing(id: ID!): [FollowingDetail]
    findFollower(id: ID!): [FollowerDetail]
  }
`;

module.exports = typeDefs;
