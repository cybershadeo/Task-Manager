const { SubtaskRepository } = require('../repositories/subtaskRepository');
const { ValidationError, UnauthorizedError, NotFoundError } = require('../utils/customErrors');

class SubtaskService {
    constructor() {
        this.subtaskRepository = new SubtaskRepository();
    }

    async createSubtasks( title, status, priority, userId, taskId ) {
        if(!title) {
            throw new ValidationError('Title is required');
        }

        const subtask = await this.subtaskRepository.storeSubtask({
            taskId,
            title: title,
            status: status,
            priority: priority
        });

        return {
            subtaskId: subtask.id,
            title: subtask.title,
            status: subtask.status,
            priority: subtask.priority 
        };
    }
    
    async getSubtasks( userId, taskId) {
        return await this.subtaskRepository.getAllSubtasks(taskId);
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