const UserModel = require("../models/user");

const resolvers = {
  Query: {
    searchUsers: async (_, { query }) => {
      const users = await UserModel.search(query);
      return users;
    },
    getUserById: async (_, { id }) => {
      const user = await UserModel.getUserById(id);
      return user;
    },
  },
  Mutation: {
    register: async (_, args) => {
      // console.log(args);
      const result = await UserModel.register(args.newUser);
      const data = await UserModel.findRegister(result.insertedId);
      return data;
    },
    login: async (_, args) => {
      // console.log(args);
      const { email, password } = args.credentials;
      const data = await UserModel.login({ email, password });
      // console.log(data);
      const token = data.token;
      const _id = data._id;
      return {
        token,
        _id,
      };
    },
  },
};

module.exports = resolvers;
