const asyncHandler = require('express-async-handler');
const { TaskService } = require('../services/taskService');
const { user } = require('../config/prisma');

const taskService = new TaskService();

const createTask = asyncHandler (async ( req, res) => {

  const userId = req.user && req.user.id;
  const  { title, description, priority, dueDate, status } = req.body;

  const newTask = await taskService.createTasks( title, description, priority, dueDate, status, userId);

  //return the json response
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task: newTask
  });  
});


const updateUserTask = asyncHandler (async ( req, res) => {

  const taskId = req.params.taskId;
  const userId = req.user && req.user.id;
  const updates = req.body;

  const currentTask = await taskService.updateTask( taskId, userId, updates );

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    task: currentTask
  });
});


const getUserTask = asyncHandler (async ( req, res) => {

  const taskId = req.params.taskId;
  const userId = req.user && req.user.id;
  
  const currentTask = await taskService.getTaskById( taskId, userId );

  res.status(200).json({
    success: true,
    message: 'Here is there task',
    task:currentTask
  });
});

const getUserTasks = asyncHandler (async ( req, res) => {

  const userId = req.user && req.user.id;

  const currentTask = await taskService.getAllTask( userId );

  res.status(200).json({
    success: true,
    task: currentTask
  });
});

const deleteUserTask = asyncHandler (async (req, res) => {

  const userId = req.user && req.user.id;
  const taskId = req.params.taskId;

  const currentTask = await taskService.deleteTasks( userId, taskId);

  res.status(200).json({
    success: true,
    message: 'Deleted successfully',
    task: currentTask
  })
})

module.exports = { createTask, updateUserTask, getUserTask, getUserTasks, deleteUserTask }