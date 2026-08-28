const Task = require('../models/Task');

const getMe = async (req, res) => {
  try {
    const [completed, pending, inProgress, total] = await Promise.all([
      Task.countDocuments({ userId: req.user._id, status: 'Completed' }),
      Task.countDocuments({ userId: req.user._id, status: 'Pending' }),
      Task.countDocuments({ userId: req.user._id, status: 'In Progress' }),
      Task.countDocuments({ userId: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          collegeName: req.user.collegeName,
        },
        stats: { total, completed, pending, inProgress },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const { fullName, collegeName } = req.body;
    if (fullName) req.user.fullName = fullName;
    if (collegeName) req.user.collegeName = collegeName;
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated.',
      data: {
        user: {
          id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          collegeName: req.user.collegeName,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMe, updateMe };