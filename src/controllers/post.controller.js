const { default: mongoose } = require("mongoose");
const Post = require("../models/post.model");

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('accepted').select('title body user tags');

    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      ok: true,
      data: post
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    })
  }
}

const store = async (req, res) => {
  const { user, title, body, tags, price, accepted} = req.body;

  try {
    const post = await Post.create({
      user,
      title,
      body,
      price,
      tags: tags.split(','),
      accepted
    });

    return res.status(201).json({
      ok: true,
      message: 'Post created successfully',
      data: {
        id: post._id,
        title: post.title,
        body: post.body,
        price: post.price,
        tags: post.tags,
        accepted: post.accepted
      }
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    })
  }
}

const getAllPostsForProfesional = async(req, res) => {
  const posts = await Post.find({"accepted": {$exists:false}});
  return res.status(200).json({
    posts
  })
}

const getAllPostsForUsuario = async(req, res) => {
  const { id } = req.params;
  const posts = await Post.find({user: mongoose.Types.ObjectId(id)});
  return res.status(200).json({
    posts
  })
}

module.exports = {
  store,
  getById,
  getAllPostsForProfesional,
  getAllPostsForUsuario
}