const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  birthday: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
