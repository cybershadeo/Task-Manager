const { TaskRepository } = require('../repositories/taskRepository');
const { ValidationError, UnauthorizedError, NotFoundError } = require('../utils/customErrors');


class TaskService {
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    //@create task
    //@
    async createTasks( title, description, priority, dueDate, status, userId ) {
        if(!title) {
            throw new ValidationError('Title is required');
        }

        if(dueDate && new Date(dueDate) < new Date()) {
            throw new ValidationError('Due date cannot be in the past');
        }

        const task = await this.taskRepository.storeTask({
            userId,
            title: title,
            description: description,
            priority: priority,
            dueDate: new Date (dueDate),
            status: status
        });


        return {
            taskId: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status
        };
    }
    
    async updateTask( taskId, userId, updates ) {

        const existingTask = await this.taskRepository.findTaskById(taskId);
        if(!existingTask) {
            throw new NotFoundError('Task not found');
        }

        if(existingTask.userId !== userId ) {
            throw new UnauthorizedError('Unauthorized');
        }


        return  await this.taskRepository.updateUserTask( taskId, updates);
    }

    async getTaskById( taskId, userId) {
        return await this.taskRepository.getTaskById(taskId);
    }

    async getAllTask( userId ) {
        return await this.taskRepository.getAllTasks(userId);
    }

    async deleteTasks( userId, taskId) {
        
        const existingTask = await this.taskRepository.findTaskById(taskId);

        if(!existingTask) {
            throw new NotFoundError('Task not found');
        }

        if(existingTask.userId !== userId ) {
            throw new UnauthorizedError('Unauthorized');
        }

        return await this.taskRepository.deleteTask(taskId);
    }
}

module.exports = { TaskService }