const PostModel = require("../models/post");
const redisClient = require("../config/redis")

const postResolvers = {
  Query: {
    posts: async () => {
      const postCache = await redisClient.get("posts")
      if (postCache) {
        return JSON.parse(postCache)
      }
      const result = await PostModel.getPosts();
      console.log(result);
      await redisClient.set("posts", JSON.stringify(result))
      return result
    },
    postById: async (_, { id }) => {
      const result = await PostModel.getPostById(id);
      // console.log(result[0]);
      return result[0]
    },
  },
  Mutation: {
    addPost: async (_, { newPost }, context) => {
      const contextValue = await context.authentication();
      // console.log(contextValue);
      if (!contextValue.user) {
        throw new Error("Authentication required"); 
      }
      newPost.authorId = contextValue.user._id;
      const result = await PostModel.addPost(newPost);
      const data = await PostModel.findPost(result.insertedId)

      return data
    },
    commentPost: async (_, { newComment }, context) => {
      const contextValue = await context.authentication();
      if (!contextValue.user) {
        throw new Error("Authentication required");
      }
      newComment.username = contextValue.user.username;
      return await PostModel.commentPost(newComment);
    },
    likePost: async (_, { newLike }, context) => {
      const contextValue = await context.authentication();
      if (!contextValue.user) {
        throw new Error("Authentication required");
      }
      newLike.username = contextValue.user.username;
      try {
        return await PostModel.likePost(newLike);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = postResolvers;
