const User = require("../models/User");

exports.getCurrentUser = async (req, res) => {
  res.json(req.user);
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
