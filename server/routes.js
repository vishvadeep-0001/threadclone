const express = require("express");
const { signin, login, userDetails, followUser, updateProfile, searchUser, logout, myInfo } = require("./controllers/user-controller");
const auth = require("./middleware/auth");
const { addPost, allPost, deletePost, likePost, repost, singlePost } = require("./controllers/post-controller");
const { addComment } = require("./controllers/comment-controller");

const router = express.Router();

//User ---
router.post("/signin", signin);
router.post("/login", login);

router.get("/user/:id", auth, userDetails);
router.put("/user/follow/:id", auth, followUser);
router.put("/update", auth, updateProfile);
router.get("/users/search/:query", auth, searchUser);

// Logout ---
router.post("/logout", auth, logout);
router.get("/me", auth, myInfo);

// Post ---
router.post("/post", auth, addPost);
router.get("/post", auth, allPost);
router.delete("/post/:id", auth, deletePost); 
router.put("/post/like/:id", auth, likePost);
router.put("/repost/:id", auth, repost);
router.get("/post/:id", auth, singlePost);

// Comment --- 
router.post("/comment/:id", auth, addComment)

module.exports = router;
