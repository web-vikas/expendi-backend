const Circle = require("../models/Circle");

exports.createCircle = async (req, res) => {
  try {
    const { name } = req.body;
    const circle = await Circle.create({
      name,
      creatorId: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(circle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCircles = async (req, res) => {
  try {
    const circles = await Circle.find({ members: req.user._id });
    res.json(circles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({ error: "User not found" });
    }

    const circle = await Circle.findById(id);
    if (!circle) {
      return res.status(404).json({ error: "Circle not found" });
    }

    if (circle.members.includes(userToAdd._id)) {
      return res
        .status(400)
        .json({ error: "User is already a member of this circle" });
    }

    circle.members.push(userToAdd._id);
    await circle.save();

    res.json(circle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteCircle = async (req, res) => {
  try {
    const { id } = req.params;
    const circle = await Circle.findById(id);

    if (!circle) {
      return res.status(404).json({ error: 'Circle not found' });
    }

    if (circle.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this circle' });
    }

    await Circle.findByIdAndDelete(id);
    res.json({ message: 'Circle deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};