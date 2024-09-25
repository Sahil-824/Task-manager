const Task = require('../models/Task'); // Import Task Model
const io = require('../index'); // Import the Socket.IO instance

// Create a Task
const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = new Task({
    title,
    description,
    status,
    userId: req.user.id
  });

  try {
    const savedTask = await task.save();
    io.emit('taskUpdated', savedTask); // Emit the new task to all clients
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a Task
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      status
    }, { new: true });

    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit('taskUpdated', task); // Emit the updated task to all clients
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    io.emit('taskUpdated', task); // Emit the deleted task to all clients
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask
};
