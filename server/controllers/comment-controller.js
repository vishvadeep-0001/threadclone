const User = require("../models/user-model")
const Post = require("../models/post-model")
const Comment = require("../models/comment-model")




exports.addComment = async(req, res)=>{
    try {
    const {id} = req.params;
    const {text} = req.body;
    
    if(!id){
        return res.status(400).json({msg: "Id is require !"})
    }
    if(!text){
        return res.status(400).json({msg: "Text is required !"})
    }

    const postExist = await Post.findById(id);
    if(!postExist){
        return res.status(400).json({msg: "Post does'nt exist"});
    }

    const comment = new Comment({
        text,
        admin: req.user._id,
        post: postExist._id
    });

    const newComment = await comment.save();
    await Post.findByIdAndUpdate(id, {
        $push: {comments : newComment._id}
    }, {new:true})
    await User.findByIdAndUpdate(req.user._id, {
        $push: {replies: newComment._id}
    }, {new:true})

    res.status(201).json({msg: "Commented !"})

    } catch (err) {
        res.status(400).json({msg: "Error in add Comment !", err: err.message})
    }
}