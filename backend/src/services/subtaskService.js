const { SubtaskRepository } = require('../repositories/subtaskRepository');
const { ValidationError, UnauthorizedError, NotFoundError } = require('../utils/customErrors');

class SubtaskService {
    constructor() {
        this.subtaskRepository = new SubtaskRepository();
    }


    async createSubtasks( title, completed, taskId ) {
        if(!title) {
            throw new ValidationError('Title is required');
        }
        
        const subtask = await this.subtaskRepository.storeSubtask({
            taskId,
            title: title,
            completed: completed
        });

        return {
            subtaskId: subtask.id,
            title: subtask.title,
            completed: subtask.completed 
        };
    }
    
    async getSubtasks(userId) {
        const subtasks = await this.subtaskRepository.getAllSubtasks(userId);
        return subtasks;
    }

    async getSubtaskById(userId, subtaskId) {
        return await this.subtaskRepository.getSubtaskById(userId, subtaskId);
    }

    async updateSubtask(userId, subtaskId, updates) {
        const existingSubtask = await this.subtaskRepository.findSubtaskById(subtaskId);
        if(!existingSubtask) {
            throw new NotFoundError('Subtask not found');
        }

        return await this.subtaskRepository.updateSubtask( subtaskId, updates);
    }  
    
    async deleteSubtask(userId, subtaskId) {
        const existingSubtask = await this.subtaskRepository.findSubtaskById(subtaskId);

        if(!existingSubtask) {
            throw new NotFoundError('Subtask not found');
        }

        return await this.subtaskRepository.deleteSubtask(subtaskId);
    }
}

module.exports = { SubtaskService }