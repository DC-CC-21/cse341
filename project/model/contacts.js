/**
 * Module for interacting with the contacts collection in the MongoDB
 * database.
 */
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

/**
 * Get all contacts from the database.
 * @returns {Promise<Array<Object>>} - An array of all the contacts in the
 * database.
 */
exports.getAll = async function () {
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
exports.getById = async function (id) {
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

/**
 * Create a new contact in the database.
 * @param {Object} data - The information of the contact to create.
 * @returns {Promise<string>} - The id of the newly created contact.
 */
exports.createNew = async function (data) {
  try {
    // Connect to the database.
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");

    // Create a new document in the collection.
    const result = await collection.insertOne(data);

    // Close the connection to the database.
    client.close();

    // Return the id of the newly created contact.
    return result.insertedId;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Update a specific contact by id.
 * @param {string} id - The id of the contact to update.
 * @param {Object} data - The information of the contact to update.
 * @returns {Promise<boolean>} - True if the contact was updated, false otherwise.
 */
exports.update = async function (id, data) {
  try {
    // Connect to the database.
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");

    // Create an ObjectId from the given id string.
    const objectId = ObjectId.createFromHexString(id);

    // Find the document with the given ObjectId.
    await collection.updateOne(
      { _id: objectId },
      {
        // Update the fields of the document.
        $set: data
      }
    );

    // Close the connection to the database.
    client.close();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 * Delete a specific contact by id.
 * @param {string} id - The id of the contact to delete.
 * @returns {Promise<boolean>} - True if the contact was deleted, false otherwise.
 */
exports.delete = async function (id) {
  try {
    // Connect to the database.
    await client.connect();
    const db = client.db("cse341");
    const collection = db.collection("project");

    // Create an ObjectId from the given id string.
    const objectId = ObjectId.createFromHexString(id);

    // Delete the document with the given ObjectId.
    const result = await collection.deleteOne({ _id: objectId });

    // Close the connection to the database.
    client.close();

    return result.deletedCount === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};