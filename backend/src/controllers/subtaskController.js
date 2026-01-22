const asyncHandler = require('express-async-handler');
const { SubtaskService } = require('../services/subtaskService');
const { subtask } = require('../config/prisma');

const subtaskService = new SubtaskService();

const createSubtask = asyncHandler( async ( req, res) => {
    
    const { taskId,title, completed } = req.body;
    
    const newSubtask = await subtaskService.createSubtasks( title, completed, taskId);

    res.status(201).json({
        success: true,
        data: newSubtask
    });
});

const getAllSubtask = asyncHandler( async (req, res) => {
    const userId = req.user && req.user.id;
    const taskId = req.params.taskId;

    const currentSubtask = await subtaskService.getSubtasks( userId, taskId);

    res.status(200).json({
        success: true,
        data: currentSubtask
    });
});


const getUserSubtask = asyncHandler( async (req, res) => {
    const userId = req.user && req.user.id;
    const subtaskId = req.params.subtaskId;
    

    const currentSubtask = await subtaskService.getSubtaskById(userId, subtaskId);

    res.status(200).json({
        success: true,
        data: currentSubtask
    });
});



const updateUserSubtask = asyncHandler( async (req, res) => {
    const userId = req.user &&  req.user.id;
    const subtaskId = req.params.subtaskId;
    const updates = req.body;

    const currentSubtask = await subtaskService.updateSubtask(userId, subtaskId, updates);

    res.status(200).json({
        success: true,
        data: currentSubtask
    });
});

const deleteUserSubtask = asyncHandler( async (req, res) => {
    const userId = req.user && req.user.id;
    const subtaskId = req.params.subtaskId;

    const currentSubtask = await subtaskService.deleteSubtask( userId, subtaskId);

    res.status(200).json({
        success: true,
        data: currentSubtask 
    });
});

module.exports = { createSubtask, getAllSubtask, getUserSubtask, updateUserSubtask, deleteUserSubtask }
