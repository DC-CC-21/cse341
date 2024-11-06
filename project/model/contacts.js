const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const contacts = {};

contacts.getAll = async function () {
  try {
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");
    const result = await collection.find({}).toArray();
    client.close();
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
};
contacts.getById = async function (id) {
  try {
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    client.close();
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
};

module.exports = contacts;
