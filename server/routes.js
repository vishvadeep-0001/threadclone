const express = require("express");
const { signin, login, userDetails, followUser, updateProfile, searchUser, logout, myInfo } = require("./controllers/user-controller");
const auth = require("./middleware/auth");
const { addPost } = require("./controllers/post-controller");

const router = express.Router();

router.post("/signin", signin);
router.post("/login", login);

router.get("/user/:id", auth, userDetails);
router.put("/user/follow/:id", auth, followUser);
router.put("/update", auth, updateProfile);
router.get("/users/search/:query", auth, searchUser);

// Logout ---
router.post("/logout", auth, logout);
router.get("/me", auth, myInfo);

router.post("/post", auth, addPost);




module.exports = router;
