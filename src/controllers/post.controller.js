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
  const { user, title, body, tags } = req.body;

  try {
    const post = await Post.create({
      user,
      title,
      body,
      tags: tags.split(','),
    });

    return res.status(201).json({
      ok: true,
      message: 'Post created successfully',
      data: {
        id: post._id,
        title: post.title,
        body: post.body,
        tags: post.tags,
      }
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    })
  }
}

module.exports = {
  store,
  getById
}