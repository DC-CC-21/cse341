const { ItemModel } = require("../model/itemModel");
const {
  Api404,
  Api500,
  MongooseError,
} = require("../errors/ApiErrors");
const mongoose = require("mongoose");

exports.GetAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    if (!items) {
      throw new Api404("No items found");
    }
    return res.json(items);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
exports.GetItemById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid item id");

  try {
    const item = await ItemModel.findById(id);
    if (!item) throw new Api404("Could not find item");
    return res.json(item);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
exports.CreateItem = async (req, res) => {
  const item = new ItemModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  await item.save();
  return res.json({ _id: item._id });
};
exports.UpdateItem = async (req, res) => {
  try {
    await ItemModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).send();
  } catch (e) {
    throw new Api500("Database error");
  }
};
exports.DeleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid item id");

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedItem) throw new Api404("Could not find item");
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
