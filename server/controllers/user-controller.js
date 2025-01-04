const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const cloudinary = require("../config/cloudinary");

exports.signin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ msg: "UserName , email and password required !" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User is already registered ! Please Login." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      res.status(400).json({ msg: "Error in password hashing" });
    }
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    if (!result) {
      res.status(400).json({ msg: "Error while saving user !" });
    }
    const accessToken = jwt.sign(
      {
        token: result._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    if (!accessToken) {
      res.status(400).json({ msg: "Error while saving Access Token !" });
    }
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res
      .status(201)
      .json({ msg: `User Signed in Successfully ! Hello ${result?.userName}` });
    // res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json({ msg: "Error in Signin !", err: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required !" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ msg: "Please Signup first !" });
    }
    const passwordMatched = await bcrypt.compare(password, userExists.password);
    if (!passwordMatched) {
      res.status(400).json({ msg: "Incorrect Credentials !" });
    }
    const accessToken = jwt.sign(
      { token: userExists._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    if (!accessToken) {
      return res.status(400).json({ msg: "Token not generated in login !" });
    }

    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ msg: "User Logged in Successfully !" });
  } catch (err) {
    res.status(400).json({ msg: "Error in Login !", err: err.message });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Id is required !" });
    }
    const user = await User.findById(id)
      .select("-password")
      .populate("followers")
      .populate({
        path: "threads",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      })
      .populate({ path: "replies", populate: { path: "admin" } })
      .populate({
        path: "reposts",
        populate: [{ path: "likes" }, { path: "comments" }, { path: "admin" }],
      });
    res.status(200).json({ msg: "User Details Fetched !", user });
  } catch (err) {
    res.status(400).json({ msg: "Error in user details !", err: err.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "Id is required !" });
    }
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(400).json({ msg: "User don`t Exist !" });
    }
    if (userExists.followers.includes(req.user._id)) {
      await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
      return res.status(201).json({ msg: `Unfollowed ${userExists.userName}` });
    }
    await User.findByIdAndUpdate(
      userExists._id,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );
    return res.status(201).json({ msg: `Following ${userExists.userName}` });
  } catch (err) {
    res.status(400).json({ msg: "Error in followUser !", err: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userExists = await User.findById(req.user._id);
    if (!userExists) {
      return res.status(400).json({ msg: "No Such User !" });
    }
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ msg: "Error in formidable !", err: err });
      }
      console.log(files);
      if (fields.text) {
        await User.findByIdAndUpdate(
          req.user._id,
          { bio: fields.text },
          { new: true }
        );
      }
      if (files.media) {
        if (userExists.public_id) {
          await cloudinary.uploader.destroy(
            userExists.public_id,
            (error, result) => {
              console.log({ error, result });
            }
          );
        }
      }
      const uploadedImage = await cloudinary.uploader.upload(
        files.media.filepath,
        {
          folder: "Threads_clone/Profiles",
        }
      );
      if (!uploadedImage) {
        return res.status(400).json({ msg: "Error while uploading Pic !" });
      }
      await User.findByIdAndUpdate(
        req.user._id,
        {
          profilePic: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        },
        { new: true }
      );
    });
    res.status(201).json({ msg: "Profile updated successfully !" });
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Error in update profile !", err: err.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { query } = req.params;
    const users = await User.find({
      $or: [
        { userName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ msg: "Searched !", users });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "error in SearchUser !", error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: Date.now(),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({ msg: "You Logged out !" });
  } catch (err) {
    res.status(400).json({ msg: "Error in Logout !" });
  }
};

exports.myInfo = async (req, res) => {
  try {
    res.status(200).json({ me: req.user });
  } catch (err) {
    res.status(400).json({ msg: "Error in myInfo!" });
  }
};
