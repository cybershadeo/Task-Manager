const express = require('express');
const { authUser } = require('../middleware/authentication');
const { createSubtask, getAllSubtask, getUserSubtask, updateUserSubtask, deleteUserSubtask } = require('../controllers/subtaskController');


const router = express.Router({ mergeParams: true});

router.post('/', authUser, createSubtask);
router.get('/', authUser, getAllSubtask);
router.get('/:subtaskId', authUser, getUserSubtask);
router.put('/:subtaskId', authUser, updateUserSubtask);
router.delete('/:subtaskId', authUser, deleteUserSubtask);


module.exports = router;           