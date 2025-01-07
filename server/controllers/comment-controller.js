const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-model");
const mongoose  = require("mongoose");

// Add Comment ---
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!id) {
      return res.status(400).json({ msg: "Id is require !" });
    }
    if (!text) {
      return res.status(400).json({ msg: "Text is required !" });
    }

    const postExist = await Post.findById(id);
    if (!postExist) {
      return res.status(400).json({ msg: "Post does'nt exist" });
    }

    const comment = new Comment({
      text,
      admin: req.user._id,
      post: postExist._id,
    });

    const newComment = await comment.save();
    await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { replies: newComment._id },
      },
      { new: true }
    );

    res.status(201).json({ msg: "Commented !" });
  } catch (err) {
    res.status(400).json({ msg: "Error in add Comment !", err: err.message });
  }
};

// Delete Comment ---
exports.deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;
    if (!postId || !id) {
      return res.status(400).json({ msg: "Error in delete comment !" });
    }
    const postExist = await Post.findById(postId);
    if (!postExist) {
      return res.status(400).json({
        msg: "No Such Post !",
      });
    }
    const commentExists = await Comment.findById(id);
    if (!commentExists) {
      return res.status(400).json({ msg: "No Such Comment !" });
    }

    const newId = new mongoose.Types.ObjectId(id);

    if (postExist.comments.includes(newId)) {
      const id1 = commentExists.admin._id.toString();
      const id2 = req.user._id.toString();
      if (id1 !== id2) {
        return res
          .status(400)
          .json({ msg: "You are not authrized to delete the comment !" });
      }
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: id },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { replies: id },
        },
        { new: true }
      );
      await Comment.findByIdAndDelete(id);
      return res.status(201).json({msg: "Comment deleted !"})
    }
    res.status(201).json({msg: "This post does'nt include comment !"})
  } catch (err) {
    res.status(400).json({ msg: "Error in Delete comment", err: err.message });
  }
};
