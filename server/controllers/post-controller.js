const User = require("../models/user-model");
const Post = require("../models/post-model");
const Comment = require("../models/comment-model");
const cloudinary = require("../config/cloudinary");
const formidable = require("formidable");

exports.addPost = async (req, res) => {
  try {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ msg: "Error in form parse !" });
      }
      const post = new Post();
      if (fields.text) {
        post.text = fields.text;
      }
      if (files.media) {
        const uploadedImage = await cloudinary.uploader.upload(
          files.media.filepath,
          { folder: "Threads_clone/Posts" }
        );
        if (!uploadedImage) {
          return res.stauts(400).json({
            msg: "Error while uploading Image !",
          });
        }
        post.media = uploadedImage.secure_url;
        post.public_id = uploadedImage.public_id;
      }
      post.admin = req.user._id;
      const newPost = await post.save();
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { threads: newPost._id },
        },
        { new: true }
      );
      res.status(201).json({ msg: "Post created !", newPost });
    });
  } catch (err) {
    res.status(400).json({ msg: "error in addpost!", err: err.message });
  }
};

exports.allPost = async (req, res) => {
  try {
    const { page } = req.query;
    let PageNumber = page;

    if (!page || page === undefined) {
      PageNumber = 1;
    }
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((PageNumber - 1) * 3)
      .limit(3)
      .populate("admin")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "admin",
          model: "user",
        },
      });
    res.status(200).json({ msg: "Post Fetched !", posts });
  } catch (err) {
    res.stauts(400).json({ msg: "Error in all Post !", err: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Id is required !" });
    }
    const postExist = await Post.findById(id);

    if (!postExist) {
      return res.status(400).json({ msg: "Post not found!" });
    }

    const userId = req.user._id.toString();
    const adminId = postExist.admin._id.toString();

    if (userId !== adminId) {
      return res
        .status(400)
        .json({ msg: "You're not authorize to delete this post !" });
    }

    if (postExist.media) {
      await cloudinary.uploader.destroy(
        postExist.public_id,
        (error, result) => {
          console.log({ error, result });
        }
      );
    }

    await Comment.deleteMany({ _id: { $in: postExist.comments } });

    await User.updateMany({
      $or: [{ threads: id }, { reposts: id }, { replies: id }],
    },
    {
      $pull: {
        thread: id,
        reposts: id,
        replies: id 
      }
    },
    {new : true }
  );

  await Post.findByIdAndDelete(id);
  res.status(200).json({msg: "Post Deleted !"})

  } catch (err) {
    res.status(400).json({ msg: "Error in delete post !", err: err.message });
  }
};

exports.
