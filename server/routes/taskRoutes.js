const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // every route below this line requires a valid token

router.route('/').post(createTask).get(getTasks);
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = router;