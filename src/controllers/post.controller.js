const { default: mongoose } = require("mongoose");
const { sendEmail } = require("../middlewares/sendGridMail.middleware");
const Post = require("../models/post.model");
const User = require("../models/user.model");

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate("accepted")
      .select("title body user tags");

    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      ok: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const store = async (req, res) => {
  const { user, title, body, tags, price, accepted } = req.body;

  try {
    const post = await Post.create({
      user,
      title,
      body,
      price,
      tags /* : tags.split(',') */,
      accepted,
    });

    return res.status(201).json({
      ok: true,
      message: "Post created successfully",
      data: {
        id: post._id,
        title: post.title,
        body: post.body,
        price: post.price,
        tags: post.tags,
        accepted: post.accepted,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const getPostAccepted = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({
    accepted: { $exists: true },
    user: mongoose.Types.ObjectId(id),
  }).populate({
    path: "accepted",
    select: "firstName lastName email",
  });

  return res.status(200).json({
    posts,
  });
};

const getPostAcceptedPending = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({
    accepted: { $exists: false },
    user: mongoose.Types.ObjectId(id),
  });
  return res.status(200).json({
    posts,
  });
};

const getAllPostsForProfesional = async (req, res) => {
  const posts = await Post.find({ accepted: { $exists: false } }).populate({
    path: "user",
    select: "firstName lastName email",
  });

  return res.status(200).json({
    posts,
  });
};
const getAllPostsForProfessionalAcepted = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({
    accepted: mongoose.Types.ObjectId(id),
  }).populate({
    path: "user",
    select: "firstName lastName email",
  });
  return res.status(200).json({
    posts,
  });
};

const getAllPostsForUsuario = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({ user: mongoose.Types.ObjectId(id) }).populate(
    {
      path: "accepted",
      select: "firstName lastName email",
    }
  );
  return res.status(200).json({
    posts,
  });
};
const UpdatePostOffered = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: `user not found with id: ${id}` });
    }
    const UserCLient = await User.findById(updatedPost.user);
    const ProfesionalClient = await User.findById(updatedPost.accepted);
    await sendEmail(UserCLient, ProfesionalClient);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  store,
  getById,
  getPostAccepted,
  getPostAcceptedPending,
  getAllPostsForProfesional,
  getAllPostsForUsuario,
  UpdatePostOffered,
  getAllPostsForProfessionalAcepted,
};
