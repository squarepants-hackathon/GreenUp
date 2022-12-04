const User = require("../model/user-model");

const register = async (req, res) => {
  const { email } = req.body;
  console.log("req.body", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ email });
    }

    const newUser = await new User({
      email,
    });
    await newUser.save();
    console.log("new User", newUser);
    return res.status(200).json({ email });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ err });
  }
};

module.exports = { register };
