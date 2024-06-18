const { DB } = require("../config/mongodbConnection");
const { ObjectId } = require("mongodb");

class FollowModel {
  static async followUser({ followingId, followerId }) {
    const collection = DB.collection("follow");
    // console.log(followerId, followingId);

    if (followingId === followerId) {
      throw new Error("You cannot follow yourself");
    }
    const existingFollow = await collection.findOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(followerId),
    });
    if (existingFollow) {
      throw new Error("Already following");
    }

    const result = await collection.insertOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(followerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result;
  }
  static async followCreate(id) {
    const collection = DB.collection("follow");
    const result = await collection.findOne(id);
    return result;
  }

  static async findFollowing(id) {
    const collection = DB.collection("follow");

    const result = await collection
      .aggregate([
        {
          $match: {
            followerId: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "following",
          },
        },
        {
          $unwind: {
            path: "$following",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "following.password": 0,
          },
        },
      ])
      .toArray();
    return result;
  }

  static async findFollower(id) {
    const collection = DB.collection("follow");

    const result = await collection
      .aggregate([
        {
          $match: {
            followingId: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "follower",
          },
        },
        {
          $unwind: {
            path: "$follower",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            "follower.password": 0,
          },
        },
      ])
      .toArray();
    return result;
  }
}

module.exports = FollowModel;
