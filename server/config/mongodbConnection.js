const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const uri = process.env.ATLAS_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const DB = client.db("social-media");

module.exports = { client, DB };
