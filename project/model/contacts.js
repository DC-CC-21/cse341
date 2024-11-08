/**
 * Module for interacting with the contacts collection in the MongoDB
 * database.
 */
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

/**
 * Contacts collection.
 * @type {Object}
 */
const contacts = {};


/**
 * Get all contacts from the database.
 * @returns {Promise<Array<Object>>} - An array of all the contacts in the
 * database.
 */
contacts.getAll = async function () {
  try {
    // Connect to the database.
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");

    // Find all the documents in the collection.
    const result = await collection.find({}).toArray();

    // Close the connection to the database.
    client.close();

    return result;
  } catch (e) {
    console.log(e);
  }

  return null;
};


/**
 * Get a specific contact by id.
 * @param {string} id - The id of the contact to retrieve.
 * @returns {Promise<Object>} - The contact with the given id.
 */
contacts.getById = async function (id) {
  try {
    // Connect to the database.
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");

    // Create an ObjectId from the given id string.
    const objectId = ObjectId.createFromHexString(id);

    // Find the document with the given ObjectId.
    const result = await collection.findOne({ _id: objectId });

    // Close the connection to the database.
    client.close();

    return result;
  } catch (e) {
    console.log(e);
  }

  return null;
};

module.exports = contacts;

