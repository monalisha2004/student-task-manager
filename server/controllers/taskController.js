const Task = require('../models/Task');

// CREATE
const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, deadline, status } = req.body;

    if (!title || !category || !deadline) {
      return res.status(400).json({ success: false, message: 'Title, category and deadline are required.' });
    }

    const task = await Task.create({
      userId: req.user._id, // comes from the protect middleware
      title,
      description,
      category,
      priority,
      deadline,
      status,
    });

    res.status(201).json({ success: true, message: 'Task created.', data: { task } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ (all of the logged-in user's tasks)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ deadline: 1 });
    res.status(200).json({ success: true, data: { tasks, count: tasks.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ (one task by id)
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    if (String(task.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.status(200).json({ success: true, data: { task } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    if (String(task.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const { title, description, category, priority, deadline, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({ success: true, message: 'Task updated.', data: { task } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    if (String(task.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, message: 'Task deleted.', data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };