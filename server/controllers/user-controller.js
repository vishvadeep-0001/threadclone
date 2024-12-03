const User = require("../models/user-model");

exports.signin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ msg: "UserName , email and password required !" });
    } 
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({msg: "User is already registered ! Please Login."});
    }










    // res.status(200).json(req.body);
  } catch (err) {
    res.status(400).json({ msg: "Error in Signin !", err: err.message });
  }
};
