const { UserModel } = require("../model/userModel");
const {
  Api404,
  Api500,
  MongooseError,
} = require("../errors/ApiErrors");
const mongoose = require("mongoose");

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      throw new Api404("No users found");
    }
    return res.json(users);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
exports.GetUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid user id");

  try {
    const user = await UserModel.findById(id);
    if (!user) throw new Api404("Could not find user");
    return res.json(user);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
exports.CreateUser = async (req, res) => {
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  await user.save();
  return res.json({ _id: user._id });
};
exports.UpdateUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).send();
  } catch (e) {
    throw new Api500("Database error");
  }
};
exports.DeleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid user id");

  try {
    const deletedUser = await UserModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedUser) throw new Api404("Could not find user");
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
