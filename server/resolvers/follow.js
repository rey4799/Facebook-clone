const FollowModel = require('../models/follow');

const followResolvers = {
  Mutation: {
    followUser: async (_, { input }) => {
      const follow = await FollowModel.followUser(input);
      const data = await FollowModel.followCreate(follow.insertedId)
      console.log(follow);
      return data;
    }
  },
  Query: {
    findFollowing: async (_, { id }) => {
      const result = await FollowModel.findFollowing(id);
      // console.log(result);
      return result
    },
    findFollower: async (_, { id }) => {
      const result = await FollowModel.findFollower(id);
      // console.log(result);
      return result
    },
  },
};

module.exports = followResolvers;
