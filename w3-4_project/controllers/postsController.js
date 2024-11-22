const { PostsModel } = require("../model/postsModel");
const {
  Api404,
  Api500,
  MongooseError,
} = require("../errors/ApiErrors");
const mongoose = require("mongoose");

exports.GetAllPosts = async (req, res) => {
  try {
    const posts = await PostsModel.find();
    if (!posts) {
      throw new Api404("No posts found");
    }
    return res.json(posts);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};

exports.GetPostsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid post id");

  try {
    const post = await PostsModel.findById(id);
    if (!post) throw new Api404("Could not find post");
    return res.json(post);
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};

exports.CreatePost = async (req, res) => {
  const post = new PostsModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  await post.save();
  return res.json({ _id: post._id });
};

exports.UpdatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid post id");
  try {
    await PostsModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).send();
  } catch (e) {
    return res.status(500).send("Error updating post");
  }
};

exports.DeletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new MongooseError("Invalid post id");

  try {
    const deletedPost = await PostsModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPost) throw new Api404("Could not find post");
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Api404) throw error;
    throw new Api500("Database error");
  }
};
