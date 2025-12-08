const express = require('express');
const { authUser } = require('../middleware/authentication')
const { createTask, updateUserTask, getUserTask, getUserTasks, deleteUserTask } = require('../controllers/taskController');
const { route } = require('./userRoutes');


const router = express.Router();

router.post('/', authUser, createTask);
router.put('/:taskId', authUser, updateUserTask);
router.get('/', authUser, getUserTasks)
router.get('/:taskId', authUser, getUserTask);
router.delete('/:taskId', authUser, deleteUserTask);

module.exports = router;
