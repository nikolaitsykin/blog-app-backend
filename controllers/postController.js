import postModel from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id.trim();
    await postModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        comments: req.body.comments,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create comment",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await postModel.find().limit(100).exec();
    const tags = posts.map((obj) => obj.tags).flat();
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get tags",
    });
  }
};

export const getLastComments = async (req, res) => {
  try {
    const posts = await postModel.find().limit(5).exec();
    const comments = posts
      .map((obj) => obj.comments)
      .flat()
      .slice(0, 5);
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get comments",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel
      .findByIdAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { returnDocument: "after" }
      )
      .populate("user");
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findByIdAndDelete({
      _id: postId,
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update post",
    });
  }
};
