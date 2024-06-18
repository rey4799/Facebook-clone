const { DB } = require("../config/mongodbConnection");
const { ObjectId } = require("mongodb");
const redisClient = require("../config/redis");

class PostModel {
  static async addPost({ content, tags, imgUrl, authorId }) {
    if (!content || !authorId) {
      throw new Error("Content and authorId are required");
    }

    const collection = DB.collection("posts");

    const result = await collection.insertOne({
      content,
      tags,
      imgUrl,
      authorId: new ObjectId(authorId),
      comments: [],
      likes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await redisClient.del("posts");
    return result;
  }

  static async findPost(id) {
    const collection = DB.collection("posts");
    const result = await collection.findOne(id);
    return result;
  }

  static async commentPost({ postId, username, content }) {
    const collection = DB.collection("posts");

    const comment = {
      content,
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: comment } }
    );
    await redisClient.del("posts");
    return await collection.findOne({ _id: new ObjectId(postId) });
  }

  static async likePost({ postId, username }) {
    const collection = DB.collection("posts");

    const post = await collection.findOne({
      _id: new ObjectId(postId),
      "likes.username": username,
    });

    if (post) {
      throw new Error("User has already liked this post");
    }

    const like = {
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { likes: like } }
    );
    await redisClient.del("posts");
    return await collection.findOne({ _id: new ObjectId(postId) });
  }

  static async getPosts() {
    const collection = DB.collection("posts");
    return await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            _id: 1,
            content: 1,
            tags: 1,
            imgUrl: 1,
            comments: 1,
            likes: 1,
            createdAt: 1,
            updatedAt: 1,
            author: {
              _id: "$author._id",
              name: "$author.name",
              username: "$author.username",
              email: "$author.email",
              avaUrl: "$author.avaUrl",
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();
  }

  static async getPostById(id) {
    const collection = DB.collection("posts");
    const post = await collection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $project: {
            _id: 1,
            content: 1,
            tags: 1,
            imgUrl: 1,
            comments: 1,
            likes: 1,
            createdAt: 1,
            updatedAt: 1,
            author: {
              _id: "$author._id",
              name: "$author.name",
              username: "$author.username",
              email: "$author.email",
              avaUrl: "$author.avaUrl",
            },
          },
        },
      ])
      .toArray();

    if (!post || post.length === 0) {
      throw new Error("Post not found");
    }

    return post;
  }
}

module.exports = PostModel;
