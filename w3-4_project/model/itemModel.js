const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemName: String,
  price: Number,
  description: String,
  tags: [String],

});

const ItemModel = mongoose.model("items", ItemSchema);

module.exports = {
  ItemSchema,
  ItemModel,
};
