const { DB } = require("../config/mongodbConnection");
const validator = require("validator");
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

class UserModel {
  static async register({ name, username, email, password, avaUrl }) {
    const collection = DB.collection("users");
    // console.log(name, username, email, password);
    // Validasi
    if (!username || !email || !password || !name) {
      throw new Error("Username, email, name and password are required");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }
    if (password.length < 5) {
      throw new Error("Password must be at least 5 characters long");
    }

    const existingUser = await collection.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const result = await collection.insertOne({
      name,
      username,
      email,
      avaUrl,
      password: hashPass(password),
    });
    // console.log(result);
    return result;
  }
  static async findRegister(data) {
    const collection = DB.collection("users");
    const result = await collection.findOne(data);
    return result;
  }

  static async login({ email, password }) {
    const collection = DB.collection("users");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await collection.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = comparePass(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = createToken({ _id: user._id, username: user.username });

    return { token, _id: user._id };
  }

  static async search(query) {
    const collection = DB.collection("users");
    const regex = new RegExp(query, "i"); // 'i' for case-insensitive
    const users = await collection
      .find({
        $or: [{ name: regex }, { username: regex }],
      })
      .toArray();
    return users;
  }

  static async getUserById(id) {
    const collection = DB.collection("users");

    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = UserModel;
